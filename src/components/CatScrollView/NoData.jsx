import { View } from '@tarojs/components';
import './index.less';

export default function NoData(props) {
  return (
    <View
      className="noData"
    >
      <View
        className="noData_image"
      />
      <View
        className="noData_desc"
      >
        暂无数据
      </View>
    </View>
  )
}