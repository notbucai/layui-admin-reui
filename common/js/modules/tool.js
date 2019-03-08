layui.define([], function (exports) {

  const $tool = {
    getContext() {
      return $config.apiContext;
    },
    getHashUrl() {
      const hash = window.location.hash || "#home";

      const url = /^#([\/A-z0-9\_]+[^\?])/.test(hash) ? RegExp.$1 : "home";

      console.log(url, hash);

      return url;
    },
    getHashQuery() {
      const hash = window.location.hash || "#home";
      const query = /\?(.*?)$/.test(hash) ? RegExp.$1 : "";

      const _qs = query ? query.split('&') : [];
      const _q = {};

      _qs.forEach(item => {
        try {
          const [key, value] = item.split("=");
          _q[key] = value;
        } catch (error) {
          console.error(error);
        }

      });

      return _q;
    }
  }

  exports("$tool", $tool);

});