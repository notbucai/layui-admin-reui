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
      initPages($("select[name=p_id]"));
      RenderHeadImg();
      uploadFun();
      initEdit();
      return;
    }

    $api.getArticle({ a_id: id }, function ({ data }) {
      // console.log(data);

      const { title, info, content, a_img, part } = data;
      initPages($("select[name=p_id]"), part && part._id);
      $("#id").val(id);
      $("#title").val(title);
      $("#info").val(info);
      RenderHeadImg(a_img);
      $("#content textarea[name=content]").val(content);

      uploadFun();
      initEdit();
    });

  }
  /**
   * 初始化 头图上传
   * @param {*} imgUrl 图片地址
   */
  function RenderHeadImg(imgUrl) {
    const uploadImgTpl = $('#headImgTeml').html();

    laytpl(uploadImgTpl).render({
      flag: !!imgUrl,
      imgUrl
    }, function (html) {
      $('.uploadImg').html(html);
    });
  }
  /**
   * 初始化 文章分类
   * @param {*} el 
   */
  function initPages(el, key) {
    const select = el;
    console.log(el);

    $api.getParts(function ({ data }) {
      data.forEach(page => {
        if (page.is_part)
          select.append($("<option></option>").text(page.title).val(page._id).attr("selected", page._id && key == page._id));
      });
      form.render('select');
    });
  }

  /**
   *  绑定上传功能
   */
  function uploadFun() {
    var uploadInst = upload.render({
      elem: '#uploadImg', //绑定元素
      accept: "images",
      acceptMime: 'image/*',
      field: "img",
      url: $tool.getContext() + 'api/uploadImg', //上传接口
      before: function (obj) { //obj参数包含的信息，跟 choose回调完全一致，可参见上文。
        layer.load(); //上传loading
        // console.log(123);
      }
      , done: function (res) {
        //上传完毕回调
        RenderHeadImg(res.data.src);
        layer.closeAll('loading'); //关闭loading
        layer.msg("上传成功");
        uploadFun();

      }
      , error: function () {
        //请求异常回调
        layer.closeAll('loading'); //关闭loading
        uploadFun();
      }
    });
  }
  /**
   * 初始化编辑器
   */
  function initEdit() {
    // var editor = new Simditor({
    //   textarea: $('#content')

    // });
    var editor = editormd("content", {
      // width  : "100%",
      // height : "100%",
      path: "/common/editormd/lib/"
    });
  }

  initView($tool.getHashQuery());

  form.on('submit(submitActive)', function (data) {

    layer.load();
    $api.addAndUpdateArticle(data.field, function ({ data }) {
      layer.closeAll('loading'); //关闭loading
      if (!$tool.getHashQuery().id) {
        layer.msg("成功，文章ID: " + data._id);
        window.location.href += "?id=" + data._id
      } else {
        layer.msg("更新成功");
      }

    });

    return false;
  });


});
