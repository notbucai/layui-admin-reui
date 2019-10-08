layui.define(['jquery', 'layer'], function (exports) {
  const $ = layui.$;
  const layer = layui.layer;

  (function ($) {
    const _ajax = $.ajax;

    $.ajax = function (opt) {
      //备份opt中error和success方法
      var fn = {
        error: function (XMLHttpRequest, textStatus, errorThrown) { },
        success: function (data, textStatus) { },
        complete: function (XMLHttpRequest, textStatus) { },
        beforeSend: function (XMLHttpRequest) { }
      };
      if (opt.error) { fn.error = opt.error; }
      if (opt.success) { fn.success = opt.success; }
      if (opt.beforeSend) { fn.beforeSend = opt.beforeSend; }
      if (opt.complete) { fn.complete = opt.complete; }
      //扩展增强处理
      var _opt = $.extend(opt, {
        //拦截错误返回
        error: function (xhr, textStatus, errorThrown) {
          if (xhr.status === 401) {
            window.location.href = "/login.html";
            return;
          } else if (xhr.status === 403) {
            //清空session

            // window.parent防止在iframe里面跳转到登录页面
            window.parent.parent.parent.parent.location.href = "/login.html";

            return;
          }
          fn.error(xhr, textStatus, errorThrown);
        },
        //成功返回拦截错误码非'0000'的情况
        success: function (data, textStatus) {
          if ('0000' !== data.code) {//异常的统一处理
            if (data.msg) {
              layer.msg(data.msg);
            }
            return;
          }

          fn.success(data, textStatus);
        },
        beforeSend: function (XMLHttpRequest) {
          //显示遮罩层(2-图标类型,0.7-阴影程度，详细配置见layui官网)
          layer.load(2, { shade: 0 });
          fn.beforeSend(XMLHttpRequest);
        },
        complete: function (XHR, TS) {
          //请求完成后回调函数 (请求成功或失败之后均调用)。去掉遮罩层。
          layer.closeAll('loading');
          fn.complete(XHR, TS);
        },
        // crossDomain: true,
        // xhrFields: { withCredentials: true }

      });
      return _ajax(_opt);

    }

  })($);

  exports('apiIntercept', {});
});