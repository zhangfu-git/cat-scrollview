import { View, Image } from '@tarojs/components';
import './index.less';

const MyItem = (props) => {
  const { name, banner, visits_count } = props;
  const count = visits_count >= 10000 ? Math.floor(visits_count / 10000) : visits_count;
  return (
    <View
      className="myItem"
    >
      <View
        className="left"
      >
        <Image
          className="image"
          src={banner}
          mode="aspectFill"
        />
      </View>
      <View
        className="right"
      >
        <View
          className="name"
        >
          {name}
        </View>
        <View
          className="tips"
        >
          该圆桌被浏览{count}
        </View>
      </View>
    </View>
  )
}

export default MyItem;