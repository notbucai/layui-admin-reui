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
    page: true, // 开启分页
    cols: [[ // 标题栏
      { field: '_id', title: 'id', width: 160 },
      { field: 'u_name', title: '用户名', width: 160 },
      { field: 'nickname', title: '昵称', width: 160 },
      { field: 'u_img', title: '头像', width: 160 },
      { field: "u_email", title: '邮箱' },
      { field: "reg_time", title: '注册时间' },
      { field: "login_time", title: '登陆时间' },
      { field: "login_ip", title: '登陆ip', width: 120 },
      {
        field: "is_admin", title: '管理员', width: 100, templet: function (d) {
          return String(!!d.is_admin)
        }
      },
      { fixed: 'right', width: 220, align: 'center', toolbar: '#barArticle' },
    ]],
    url: $tool.getContext() + "api/admin/user"
  });

  table.on('tool(test)', function (obj) { //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
    var data = obj.data; //获得当前行数据
    var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
    var tr = obj.tr; //获得当前行 tr 的DOM对象

    if (layEvent === 'setAdmin') { //查看
      console.log(data.is_admin);

      $api.setAdmin({
        u_id: data._id,
        flag: !data.is_admin
      }, function () {
        obj.update({
          is_admin: !data.is_admin
        });
      });

    } else if (layEvent === 'del') { //删除

      layer.confirm('真的删除行么', function (index) {

        layer.close(index);
        //向服务端发送删除指令
        $api.deleteUser({ u_id: data._id }, function () {
          layer.msg("删除成功");
          obj.del(); //删除对应行（tr）的DOM结构，并更新缓存
        });
      });
    }
  });

  function openAddAndUpdate(data, cb) {
    laytpl($("#openTpl").html()).render(data, function (html) {
      layer.open({
        type: 1,
        title: "添加/修改栏目",
        content: html //这里content是一个普通的String
      });
      form.on('submit(SubmitPage)', function ({ field }) {
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


  form.on('submit(selectForm)', function (data) {

    tableIns.reload({
      where: { ...data.field },
      page: {
        curr: 1 //重新从第 1 页开始
      }
    });
    return false;
  });


});
