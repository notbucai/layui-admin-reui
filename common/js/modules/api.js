layui.define(['jquery', '$tool', 'apiIntercept'], function (exports) {

  const $ = layui.$;
  const $tool = layui.$tool;

  /**
   * 
   * @param {String} url 链接
   * @param {*} data 数据
   * @param {Function} cb 回调函数
   */
  function doGet(url, data, cb) {
    $.ajax({
      type: "get",
      url: url,
      data: data,
      dataType: "JSON",
      xhrFields: {
        withCredentials: true
      },
      crossDomain: true,
      success: function (response) {
        cb(response, null);
      },
      error: function (error) {
        cb(null, error);
      }
    });
  }
  /**
   * 基础的post请求
   * @param {String} url 
   * @param {*} data 
   * @param {*} cb 
   */
  function doPOST(url, data, cb) {
    doComplexPOST(url, data, cb);
  }
  /**
   * 详细配置的post
   * @param {String} url 
   * @param {*} data 
   * @param {*} cb 
   * @param {JSON} config 配置项目
   */
  function doComplexPOST(url, data, cb, config) {
    const defaultAjaxConfig = {
      type: "post",
      url: url,
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      dataType: "JSON",
      xhrFields: {
        withCredentials: true
      },
      crossDomain: true,
      success: function (response) {
        cb(response, null);
      },
      error: function (error) {
        cb(null, error);
      }
    }
    const ajaxConfig = $.extend({}, config, defaultAjaxConfig)

    $.ajax(ajaxConfig);
  }

  const AjaxApi = {
    currentUser(cb) {
      doGet($tool.getContext() + "api/admin/user/getCurrentUser", null, cb);
    },
    login(data, cb) {
      doPOST($tool.getContext() + "api/admin/login", data, cb);
    },
    logOut(cb) {
      doGet($tool.getContext() + "api/admin/logout", null, cb);
    },
    deleteArticle({ a_id }, cb) {
      doPOST($tool.getContext() + "api/admin/article/deleteById", { id: a_id }, cb);
    },
    getArticle({ a_id }, cb) {
      doGet($tool.getContext() + "api/admin/article/getArticleById", { id: a_id }, cb);
    },
    getParts(cb) {
      doGet($tool.getContext() + "api/admin/part", null, cb);
    },
    addAndUpdateArticle(data, cb) {
      doPOST($tool.getContext() + "api/admin/article/addAndUpdateById", data, cb);
    },
    deleteComment({ c_id }, cb) {
      doPOST($tool.getContext() + "api/admin/comment/deleteById", { id: c_id }, cb);
    },
    auditComment({ c_id }, cb) {
      doPOST($tool.getContext() + "api/admin/comment/auditCommentById", { id: c_id }, cb);
    },
    addAndUpdatePage(data, cb) {
      doPOST($tool.getContext() + "api/admin/part/addAndUpdate", data, cb);
    },
    deletePage({ p_id }, cb) {
      doPOST($tool.getContext() + "api/admin/part/deleteById", { id: p_id }, cb);
    },
    setAdmin({ u_id }, cb) {
      doPOST($tool.getContext() + "api/admin/user/setAdminById", { id: u_id }, cb);
    },
    deleteUser({ u_id }, cb) {
      doPOST($tool.getContext() + "api/admin/user/deleteById", { id: u_id }, cb);
    },
    getUserById({ u_id }, cb) {
      doGet($tool.getContext() + "api/admin/user/getUserById", { id: u_id }, cb);
    },
    editUserSomeData(data, cb) {
      doPOST($tool.getContext() + "api/admin/user/updateSome", data, cb);
    },
    addAndUpdateLink(data, cb) {
      doPOST($tool.getContext() + "api/admin/link/addAndUpdate", data, cb);
    },
    deleteLink({ l_id }, cb) {
      doPOST($tool.getContext() + "api/admin/link/deleteById", { id: l_id }, cb);
    },

  }

  exports("$api", AjaxApi);

});