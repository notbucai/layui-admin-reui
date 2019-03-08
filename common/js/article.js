layui.use(['element', 'jquery', 'form', 'table', '$tool', 'layer', '$api'], function () {
  layui.$.support.cors = true;
  const element = layui.element;
  const $ = layui.$;
  const form = layui.form;
  const table = layui.table;
  const $tool = layui.$tool;

  const layer = layui.layer;

  const $api = layui.$api;

  element.render('breadcrumb');
  form.render('select');
  /**
 * 初始化 文章分类
 * @param {*} el 
 */
  function initPages(el, key) {
    const select = el;

    $api.getParts(function ({ data }) {
      console.log(data);
      
      data.forEach(page => {
        if(page.is_part)
          select.append($("<option></option>").text(page.title).val(page._id).attr("selected", page.url && key === page.url));
      });
      form.render('select');
    });
  }
  initPages($("select[name='p_id']"));
  const tableIns = table.render({
    elem: "#articleTable",
    page: true, // 开启分页
    cols: [[ // 标题栏
      { field: '_id', title: 'id', width: 120 }, //rowspan即纵向跨越的单元格数
      { field: 'title', title: '标题', width: 200 },
      { field: "info", align: 'center', title: '简介' },
      {
        field: "user", align: 'center', title: '作者', width: 120, templet: function (d) {
          return d.user && d.user.u_name
        }
      },
      {
        field: "part", align: 'center', title: '栏目', width: 180, templet: function (d) {
          return d.part && d.part.title || "未分类";
        }
      },
      {
        field: "hits", align: 'center', title: '点击', width: 80,
      },
      {
        field: "comment_size", align: 'center', title: '评论', width: 80,
      },
      {
        field: "add_time", align: 'center', title: '添加时间',
      },
      { fixed: 'right', width: 160, align: 'center', toolbar: '#barArticle' },
    ]],
    url: $tool.getContext() + "api/admin/article/page"
  });

  table.on('tool(test)', function (obj) { //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
    var data = obj.data; //获得当前行数据
    var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
    var tr = obj.tr; //获得当前行 tr 的DOM对象

    if (layEvent === 'detail') { //查看
      //do somehing
      layer.open({
        title: '提示',
        content: '请直接复制文章id(' + data._id + ') 然后你懂的'
      });

    } else if (layEvent === 'del') { //删除
      layer.confirm('真的删除行么', function (index) {
        obj.del(); //删除对应行（tr）的DOM结构，并更新缓存
        layer.close(index);
        //向服务端发送删除指令
        $api.deleteArticle({ a_id: data._id }, function () {
          layer.msg("删除成功");
        });
      });
    } else if (layEvent === 'edit') { //编辑
      //do something
      layer.msg("不可编辑");
      //同步更新缓存对应的值
      // obj.update({
      //   username: '123'
      //   , title: 'xxx'
      // });

    }
  });


  //监听提交
  form.on('submit(selecForm)', function (data) {
    layer.msg(JSON.stringify(data.field));
    // {"id":"","title":"","author":"","page_url":""}
    // 表格重新加载
    tableIns.reload({
      where: {
        ...data.field
      }
    });
    return false;
  });


});
