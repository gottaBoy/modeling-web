'use strict';

var vue = require('vue');
var qs = require('qs');
var vueRouter = require('vue-router');

"use strict";
const TodoRedirect = /* @__PURE__ */ vue.defineComponent({
  setup() {
    const router = vueRouter.useRouter();
    const {
      href
    } = window.location;
    const i = href.lastIndexOf("?");
    const queryStr = decodeURIComponent(href.substring(i + 1, href.length));
    if (!queryStr) {
      throw new Error(ibiz.i18n.t("vue3Util.view.insufficientRedirection"));
    }
    const params = qs.parse(queryStr, {
      delimiter: ";"
    });
    const {
      apptype,
      todotype,
      todoid
    } = params;
    const data = {
      srfapptype: "pc",
      srfapp: ""
    };
    if (!apptype) {
      data.todourltype = "RouterUrl";
    }
    async function getLinkUrl() {
      const res = await ibiz.net.post("/systodos/".concat(todoid, "/getlinkurl"), data);
      let url = res.data.linkurl;
      if (apptype) {
        window.location.href = url;
      } else {
        if (url.indexOf("/") !== 0) {
          url = "/".concat(url);
        }
        url += ";srfwf=".concat(todotype);
        router.push("/index".concat(url));
      }
    }
    getLinkUrl();
  },
  render() {
    return vue.createVNode("div", null, [ibiz.i18n.t("vue3Util.view.toDoList")]);
  }
});

exports.TodoRedirect = TodoRedirect;
