import { View } from '@tarojs/components';
import './index.less';

const Header = (props) => {
  return (
    <View
      className="header"
    >
      <View className="menu" onClick={props.onReload}>刷新</View>
      <View className="menu" onClick={props.onReset}>重置状态</View>
    </View>
  )
}

export default Header;