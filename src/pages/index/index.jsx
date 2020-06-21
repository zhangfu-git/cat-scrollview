import Taro, { Component, request } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './index.less'

export default class Index extends Component {

  config = {
    navigationBarTitleText: '示例子'
  }

  componentWillMount () { }

  componentDidMount () {
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    const list = [
      {
        icon: require('./无限.png'),
        desc: '无限加载demo',
        path: '/pages/demo1/index'
      },
      {
        icon: require('./无数据.png'),
        desc: '没有数据demo',
        path: '/pages/demo2/index'
      },
      {
        icon: require('./异常.png'),
        desc: '请求异常demo',
        path: '/pages/demo3/index'
      },
      {
        icon: require('./完成.png'),
        desc: '无更多数据',
        path: '/pages/demo4/index'
      },
      {
        icon: require('./完成.png'),
        desc: '自定义顶部',
        path: '/pages/demo5/index'
      },
      {
        icon: require('./完成.png'),
        desc: '自定义底部',
        path: '/pages/demo6/index'
      }
    ]
    return (
      <View
        className="home"
      >
        {
          list.map((item) => {
            return (
              <View
                key={item.desc}
                className="menu"
                onClick={() => {
                  Taro.navigateTo({
                    url: item.path
                  })
                }}
              >
                <View
                  className="iconBox"
                >
                  <Image
                    className="image"
                    src={item.icon}
                  />
                </View>
                <View
                  className="desc"
                >
                  {item.desc}
                </View>
              </View>
            )
          })
        }
        <View>

        </View>
      </View>
    )
  }
}
