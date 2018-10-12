/*
* Pramas
    template string {1}, {2} and so on is the order of function i18n arguments,
*   that will be replaced by the real param passed to function i18n
* E.G
    // language config
    {
        noParam: 'no other params',
        withOneAdditinalParam: 'hello {1} biubiubiu',
        withTwoAdditionalParams: 'hello {1}, {2} glad to see yo',
    }
    // how to use
*   i18n('noParam'); // no other params
*   i18n('withOneAdditinalParam', 'mistong'); // hello mistong biubiubiu
*   i18n('withTwoAdditionalParams', 'world', 'ameng'); // 'hello world, ament glad to see yo
*/
export default {
  // common for reuse
  loginOut: '退出',
  add: '添加',
  cancel: '取消',
  close: '关闭',
  confirm: '确认',
  finish: '完成',
  delete: '删除',
  icon: 'Icon 图标',
  'empty-data': 'EmptyData 空数据',
  code: 'Code 源码展示',
  demo: 'Demo 组件示例容器',
};
