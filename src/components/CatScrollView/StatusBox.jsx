import Loading from './Loading';
import LastPageTips from './LastPageTips';
import NoData from './NoData';
import { View } from '@tarojs/components'

export default function StatusBox(props) {
  const { isLastPage, isLoading, hasData, parentProps={} } = props;
  const { hideLastPageTips } = parentProps;
  return (
    <View>
      {
        !hasData ? <NoData {...parentProps} /> : null
      }
      {
        !hideLastPageTips && hasData && isLastPage && <LastPageTips/>
      }
      {
        hasData && isLoading && <Loading/>
      }
    </View>
  )
}