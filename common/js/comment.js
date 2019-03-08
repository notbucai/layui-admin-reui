layui.use(['element', 'jquery', 'Base64', 'form', 'table', '$tool', 'layer', '$api'], function () {
  const element = layui.element;
  const $ = layui.$;
  const form = layui.form;
  const table = layui.table;
  const $tool = layui.$tool;
  const Base64 = layui.Base64;
  const layer = layui.layer;

  const $api = layui.$api;

  element.render('breadcrumb');
  form.render('select');

  const tableIns = table.render({
    elem: "#articleTable",
    page: true, // 开启分页
    cols: [[ // 标题栏
      { field: '_id', title: 'id', width: 120 }, //rowspan即纵向跨越的单元格数
      { field: 'u_id', title: '用户id', width: 120 },
      { field: "a_id", width: 120, title: '文章id' },
      { field: "r_u_id", align: 'center', title: '回复用户id', width: 120 },
      {
        field: "content", align: 'center', title: '内容', templet: function (d) {
          const b = new Base64();
          return b.decode(d.content);
        }
      },
      { field: "c_ip", align: 'center', title: '评论ip', width: 180 },
      {
        field: "is_scope", align: 'center', title: '审核', width: 80, templet: function (d) {
          return String(!!d.is_scope);
        }
      },
      { field: "c_time", align: 'center', title: '评论时间', width: 220 },
      { fixed: 'right', width: 160, align: 'center', toolbar: '#barArticle' },
    ]],
    url: $tool.getContext() + "api/admin/comment/page"
  });

  table.on('tool(test)', function (obj) { //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
    var data = obj.data; //获得当前行数据
    var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
    var tr = obj.tr; //获得当前行 tr 的DOM对象

    if (layEvent === 'detail') { //查看

    } else if (layEvent === 'del') { //删除

      layer.confirm('真的删除行么', function (index) {
        obj.del(); //删除对应行（tr）的DOM结构，并更新缓存
        layer.close(index);
        //向服务端发送删除指令
        $api.deleteComment({ c_id: data._id }, function () {
          layer.msg("删除成功");
        });
      });
    } else if (layEvent === 'audit') { //审核
      layer.load();

      $api.auditComment({ c_id: data._id }, function () {

        layer.closeAll('loading');
        obj.update({
          is_scope: !data.is_scope
        });
        //    框架 BUG ！！！！！！ 无法更新模版
        // $(obj.tr[1]).find("a").first().remove();
        layer.msg("审核成功");
      });

    }
  });


  //监听提交
  form.on('submit(selecForm)', function (data) {
    layer.msg(JSON.stringify(data.field));
    // 表格重新加载
    tableIns.reload({
      where: {
        ...data.field
      }
    });
    return false;
  });


});
