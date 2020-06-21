/**
 * 无限加载组件, 学习了proTable数据加载的思想, 给用户一个自定义onRequest回调, 传参数{skip, limit}，受小程序自身的列表渲染限制, 最终的数据通过onChange传递回去
 * reload() 刷新当前 
 */
import Taro from '@tarojs/taro';
import { View, ScrollView } from '@tarojs/components';
import './index.less';
import StatusBox from './StatusBox';
import ErrorTips from './ErrorTips';

class TaroScrollView extends Taro.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLastPage: false, // 是否为最后一页
      isLoading: false,
      hasData: true,    // 是否有数据 (只有skip为0 并且data为空的时候为false)
      isError: false,
      isNeedLogin: false,
    }
    this.params = {
      skip: 0,
      limit: props.pageSize ? props.pageSize: 10, // 默认的limit
    };
    // 记录一个方向
    this.direcation = 1;    // 1为向下、-1为向上
    this.prevScrollTop = 0; // 上一次滚动条的位置
    this.dataSource = [];
    this.currentPageDataLen = 0;
    // 定义时钟
    this.inter = null;
  }
  componentDidMount() {
    this.onRequest();
  }
  // 刷新
  reload() {
    this.setState({
      isError: false,
      hasData: true,
      isLoading: false,
      isLastPage: false,
    }, () => {
      const limit = this.params.limit;
      // 刷新当前也的数据, 需要先清除当前加载
      const lastIndex = this.dataSource.length - this.currentPageDataLen - 1;
      this.dataSource = this.dataSource.slice(0, lastIndex);
      this.onRequest();
    });
  }
  // 重置数据和状态
  reset() {
    this.setState({
      isLastPage: false, // 是否为最后一页
      isLoading: false,
      hasData: true,    // 是否有数据 (只有skip为0 并且data为空的时候为false)
      isError: false,      
    }, () => {
      this.params = {
        skip: 0,
        limit: this.props.pageSize ? this.props.pageSize : 10, // 默认的limit
      };
      this.currentPageDataLen = 0;
      this.dataSource = [];
      this.onRequest();
    });
  }
  // 请求数据，
  async onRequest() {
    if (typeof this.props.onRequest !== 'function') return console.error('请添加onRequest回调函数 on TaroSscrollView component');
    const res = await this.props.onRequest(this.params);
    
    if (!res) throw 'onRequest方法返回对象的格式 {total, limit, skip, data, success } 或者异常情况 {msg, success}'
    
    // 请求失败处理
    if (!res.success) {
      let errorMsg = res.msg || '加载数据失败';
      return this.setState({
        isError: true,
        errorMsg: errorMsg
      })
    }

    let isLastPage = false;
    let isLoading = true;
    let hasData = true;
    let total = res.total, limit = res.limit, skip = res.skip, data = res.data || [];
    
    // 记录当前的数据长度(在刷数据的时候使用)
    this.currentPageDataLen = data.length;

    // 检测无数据
    if (skip === 0 && !data.length) {
      hasData = false;
    }

    // 数据加载完毕处理
    if (total < limit + skip) {
      isLastPage = true;
      isLoading = false;
      // 避免skip为负数,loading状态异常
      this.params.skip = this.params.skip > 0 ? this.params.skip - this.params.limit : 0;
    }

    this.dataSource = [
      ...this.dataSource,
      ...data
    ];

    this.setState({
      isLastPage: isLastPage,
      isLoading: isLoading,
      hasData: hasData,
    }, () => {
      if (!data.length) return;
      // 通知外部dataSource改变
      this.props.onChange && this.props.onChange(this.dataSource);
      if (this.inter) {
        clearTimeout(this.inter);
        this.inter = null;
      }
      this.inter = setTimeout(() => {
        this.setState({
          isLoading: false,
        });
      }, 2000);
    });
    // 这里处理分页数据
  }
  // 滚动到底部
  onScrollToLower() {
    const { isLastPage } = this.state;
    // 只有向下的时候进行数据请求
    if (this.direcation === 1 && !isLastPage) {
      this.setState({
        isLoading: true,
      });
      this.params.skip = this.params.skip + this.params.limit;
      this.onRequest();
    }
    console.log('%c 滚动到底部, 开始加载数据', 'background-color:blue;color:#fff;')
  }
  render() {
    const { isLastPage, isLoading, hasData, isError, isNeedLogin, errorMsg } = this.state;
    return (
      <View
        className="infiniteScroll"
      >
        <View
          className="infiniteScroll_head"
        >
          {this.props.renderHeader}
        </View>
        <View
          className="infiniteScroll_main"
        >
          {
            isError
            ?
            <ErrorTips
              onClick={this.reload.bind(this)}
              msg={errorMsg}
              isNeedLogin={isNeedLogin}
            />
            :
            <ScrollView
              className="infiniteScroll_scrollView"
              scrollY={true}
              scrollWithAnimation
              lowerThreshold={44}
              onScroll={(e) => {
                const scrollTop = e.detail.scrollTop;
                this.direcation = scrollTop - this.prevScrollTop > 0 ? 1 : -1;
                this.prevScrollTop = scrollTop;
              }}
              onScrollToLower={this.onScrollToLower.bind(this)}
            >
              {
                this.props.children
              }
              <StatusBox
                isLastPage={isLastPage}
                isLoading={isLoading}
                hasData={hasData}
                parentProps={this.props}
              />
            </ScrollView>
          }
        </View>
        <View
          className="infiniteScroll_footer"
        >
          {
            this.props.renderFooter
          }
        </View>
      </View>
    )
  }
}

export default TaroScrollView;