layui.use(['element', 'jquery', 'form', 'table', '$tool', 'layer', '$api', 'laytpl'], function () {
  const element = layui.element;
  const $ = layui.$;
  const form = layui.form;
  const table = layui.table;
  const $tool = layui.$tool;

  const layer = layui.layer;

  const $api = layui.$api;
  const laytpl = layui.laytpl;

  element.render('breadcrumb');

  const tableIns = table.render({
    elem: "#articleTable",
    // page: true, // 开启分页
    cols: [[ // 标题栏
      { field: '_id', title: 'id', width: 200 },
      { field: 'title', title: '栏目标题' },
      { field: "url", title: '栏目链接' },
      { field: "info", title: '栏目备注' },
      {
        field: "is_part", title: '是否是标准目录', templet: function (d) {
          return String(!!d.is_part);
        }
      },
      { fixed: 'right', width: 160, align: 'center', toolbar: '#barArticle' },
    ]],
    url: $tool.getContext() + "api/admin/part"
  });

  table.on('tool(test)', function (obj) { //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
    var data = obj.data; //获得当前行数据
    var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
    var tr = obj.tr; //获得当前行 tr 的DOM对象

    if (layEvent === 'edit') { //查看

      openAddAndUpdate(data, function (data) {
        obj.update(data);
      });

    } else if (layEvent === 'del') { //删除

      layer.confirm('真的删除行么', function (index) {
        obj.del(); //删除对应行（tr）的DOM结构，并更新缓存
        layer.close(index);
        //向服务端发送删除指令
        $api.deletePage({ p_id: data._id }, function () {
          layer.msg("删除成功");
        });
      });
    }
  });
  /**
   * 打开 弹出框 
   * @param {*} data 数据
   * @param {Function} cb 回调函数
   */
  function openAddAndUpdate(data, cb) {

    laytpl($("#openTpl").html()).render(data, function (html) {

      layer.open({
        type: 1,
        title: "添加/修改栏目",
        content: html //这里content是一个普通的String
      });
      form.render("checkbox");
      form.on('submit(SubmitPage)', function ({ field }) {
        field.is_part = (field.is_part == "on");
        // 发送ajax
        $api.addAndUpdatePage(field, function () {
          layer.closeAll('page');
          layer.msg("成功");
          cb && cb(field);
        });
        return false;
      });
    });

  }


  $('#addPage').click(function (e) {
    e.preventDefault();
    openAddAndUpdate({});
  });


});
