layui.config({
  // dir: '/node_modules/layui-src/dist/' //layui.js 所在路径（注意，如果是script单独引入layui.js，无需设定该参数。），一般情况下可以无视
  // version: true, //一般用于更新模块缓存，默认不开启。设为true即让浏览器不缓存。也可以设为一个固定的值，如：201610
  // debug: true, //用于开启调试模式，默认false，如果设为true，则JS模块的节点会保留在页面
  base: '/common/js/modules/' //设定扩展的Layui模块的所在目录，一般用于外部模块扩展
}).extend({
  '$api': 'api',
  '$tool': 'tool',
});

const runEnv = "blog";

const $config = {
  apiContext: runEnv == 'dev' ? 'http://easy-mock.ncgame.cc/mock/5c7281fbf274710a8d216195/layuiAdminDemo/' : 'http://127.0.0.1:3188/'
}