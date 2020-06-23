import { View, Text } from '@tarojs/components';
import './index.less';

export default function Loading() {
  return (
    <View
      className="tips"
    >
      <Text className="loading"></Text>
      正在加载
    </View>
  )
}