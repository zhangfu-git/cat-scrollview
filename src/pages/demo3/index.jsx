/**
 * 请求失败 demo
 */
import Taro, { Component } from '@tarojs/taro'
import TaroScrollView from '../../components/TaroScrollView';
import MyItem from '../../components/MyItem/index';

export default class Index extends Component {
  count = 0
  config = {
    navigationBarTitleText: '滚动无限加载'
  }
  state = {
    listData: []
  }
  componentWillMount () { }

  componentDidMount () {
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  getList(params) {
    return Taro.request({
      url: 'https://www.zhihu.com/api/v4/roundtables',
      data: params,
      header: {
        'Content-Type': 'application/json; charset=utf-8'        
      }
    });
  }

  render () {
    const { listData } = this.state;

    return (
      <TaroScrollView
        onRequest={async(params) => {
          const { skip, limit } = params;
          const res = await this.getList({
            limit,
            offset: skip,
          });
          if (res.errMsg !== 'request:ok') {
            return {
              success: false,
              msg: '获取数据失败'
            }
          }
          const data = res.data;
          const dataSource = data.data;
          const paging = data.paging;
          const total = paging.total;
          const success = this.count > 0 ? true : false;
          this.count += 1;
          return {
            success: success,
            skip,
            limit,
            total,
            data: dataSource
          }
        }}
        onChange={(data) => this.setState({ listData: data })}
      >
        {
          listData.map((item) => {
            return (
              <MyItem key={item.id} {...item} />
            )
          })
        }
      </TaroScrollView>
    )
  }
}
