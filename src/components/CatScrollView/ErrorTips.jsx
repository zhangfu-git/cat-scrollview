import { View, Button } from '@tarojs/components';
import './index.less';

export default function ErrorTips(props) {
  const { isNeedLogin, msg } = props;
  const iconClassName = isNeedLogin ? 'errorTips_403' : 'errorTips_500';

  return (
    <View
      className="errorTips"
    >
      <View
        className={iconClassName}
      >
      </View>
      <View
        className="errorTips_desc"
      >
        {msg}
      </View>
      {
        !isNeedLogin
        ?
        <Button
          className="errorTips_btn"
          onClick={props.onClick}
        >
          重试加载
        </Button>
        : null
      }
    </View>
  )
}