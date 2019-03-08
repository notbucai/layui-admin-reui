layui.use(['form', 'layer', '$api', 'apiIntercept'], () => {
  const form = layui.form;
  const $api = layui.$api;
  const layer = layui.layer;

  form.on('submit(formLogin)', function (data) {

    try {
      $api.login(data.field, function (res, err) {
        layer.msg("登陆成功，正在跳转");
        window.location.href = "/index.html";
      });
    } catch (error) {
      console.log(error);
    }

    return false;
  });

});