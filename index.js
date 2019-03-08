layui.use(['element', 'jquery', 'router', '$api'], function () {
  const element = layui.element;
  const $ = layui.$;
  const $api = layui.$api;
  element.on('nav(nav_left)', function (elem) {
    console.log(elem); //得到当前点击的DOM对象
  });

  $api.currentUser(function ({ data }) {
    console.log(data);
    $("#c_user span").text(data.u_name);
    $("#c_user img").attr("src", data.u_img || "http://q1.qlogo.cn/g?b=qq&nk=1450941858&s=100");
  });

  $("#reload").click(function () {
    window.location.reload();
  });

  $("#logout").click(function (event) {
    event.preventDefault();
    $api.logOut();
  });

});
