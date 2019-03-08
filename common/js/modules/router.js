layui.define(['jquery', '$tool'], function (exports) {
  const $ = layui.$;
  const $tool = layui.$tool;

  (function () {

    function hashEvent(e) {

      const url = $tool.getHashUrl();

      $("#context").load(`/page/${url}.html`, function () {
        $.getScript(`/common/js/${url}.js`, function () {   //加载成功后，并执行回调函数  
          console.log(url + ".js 加载完成");
        });
      });
    }

    hashEvent();
    $(window).on('hashchange', hashEvent);

  })($);

  exports('router', {});
});


