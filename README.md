# cat-scrollview

一款基于 `Taro` 框架开发下拉滚动加载列表组件, 自动化处理下拉加载分页、数据加载完毕、无数据、加载失败等状态，实现快速开发一个小程序列表功能页面

## 特性

- 基于 `Taro` 开发组件
- 自动处理分页
- 自动处理列表加载四大状态：loading状态、无更多数据状态、加载失败状态、无数据状态
## 体验

请使用微信扫一扫以下体验码

![QRCode](https://github.com/zhangfu-git/cat-scrollview/blob/master/qrcode.jpg?raw=true)
## 安装

然后在项目中安装 cat-scrollview

```bash
npm install cat-scrollview
```

## 参数说明
方法 | 返回的参数或者值说明 | 说明
------------ | ------------- | -------------
onRequest() | params为{skip, limit} | 该方法需要return一个对象，例如成功: {success: true, skip, limit, total, data: dataSource }, 失败{success:false, msg: '失败的原因'}用来内容状态处理
onChange() | 列表数据(data) | 无
renderHeader() | 无 | 返回组件
renderFooter() | 无 | 返回组件 
isDidShowReload | boolean | 是否在小程序的componentDidShow触发刷新


可通过ref去调用reload()、reset()进行重置和刷新列表，使用过滤条件改变重新获取列表可以调用reload
## 使用

```js
import catScrollview from 'cat-scrollview';

....
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
    return {
      success: true,
      skip,
      limit,
      total,
      data: dataSource
    }
  }}
  onChange={(data) => this.setStatelistData: data })}
>
  {
    listData.map((item) => {
      return (
        <MyItem key={item.id} {item} />
      )
    })
  }
</TaroScrollView>
```

## 开发计划
* 支持长列表加载
* 整理文档, 支持在线小程序预览

## 贡献

如果你在使用 `cat-scrollview` 时遇到问题，或者有好的建议，欢迎给我们提 `Issue` 或 `Pull Request`。

## License

MIT

[npm-version-image]: https://img.shields.io/npm/v/taro-ui.svg?style=flat-square
[npm-version-url]: https://www.npmjs.com/package/cat-scrollview
