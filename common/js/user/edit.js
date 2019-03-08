layui.use(['element', 'jquery', 'form', '$tool', 'layer', '$api', 'upload', 'laytpl'], function () {
  const element = layui.element;
  const $ = layui.$;
  const form = layui.form;
  const $tool = layui.$tool;
  const layer = layui.layer;
  const $api = layui.$api;
  const upload = layui.upload;
  const laytpl = layui.laytpl;

  /**
   * 初始化视图
   * @param {Object} {id} id
   */
  function initView({ id } = {}) {

    element.render('breadcrumb');

    if (!id) {
      return;
    }

    $api.getUserById({ u_id: id }, function ({ data }) {
      const { _id, u_name, u_email } = data;
      
      $("input[name='_id']").val(_id);
      $("input[name='u_name']").val(u_name);
      $("input[name='u_email']").val(u_email);
      
    });

  }

  initView($tool.getHashQuery());

  form.render();
  form.on('submit(submitUser)', function (data) {
    console.log(data);
    
    layer.load();
    $api.editUserSomeData(data.field, function () {
      
      layer.closeAll('loading'); //关闭loading
      layer.msg("成功");
    });

    return false;
  });


});
