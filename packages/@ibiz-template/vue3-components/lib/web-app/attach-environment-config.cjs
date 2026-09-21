'use strict';

var qs = require('qs');
var ramda = require('ramda');

"use strict";
const envMap = /* @__PURE__ */ new Map([
  ["baseUrl", "BaseUrl"],
  ["remoteModelUrl", "remoteDynaPath"],
  ["dcSystem", "mockDcSystemId"],
  ["enablePermission", "enablePermissionValid"],
  ["enableTitle", "enableTitle"]
]);
async function attachEnvironmentConfig() {
  const env = window.Environment;
  const query = qs.parse(window.location.search, { ignoreQueryPrefix: true });
  Object.keys(ibiz.env).forEach((key) => {
    const key2 = envMap.has(key) ? envMap.get(key) : key;
    if (env[key2] != null) {
      if (key2 === "customParams") {
        ibiz.env[key] = JSON.parse(env[key2]);
      } else {
        ibiz.env[key] = env[key2];
      }
    }
  });
  if (query) {
    if (query.srfdcsystem) {
      ibiz.env.dcSystem = query.srfdcsystem;
    }
  }
  if (env.AppLabel) {
    document.title = env.AppLabel;
  }
  if (env.favicon) {
    const favicon = document.getElementById("favicon");
    if (favicon) {
      const fav = env.favicon;
      if (fav.endsWith(".png")) {
        favicon.type = "image/png";
      } else if (fav.endsWith(".ico")) {
        favicon.type = "image/x-icon";
      } else if (fav.endsWith(".gif")) {
        favicon.type = "image/gif";
      } else if (fav.endsWith(".svg")) {
        favicon.type = "image/svg+xml";
      }
      favicon.href = fav;
    }
  }
  if (env.globalConfig) {
    ibiz.env.globalConfig = env.globalConfig;
    ibiz.config = ramda.mergeDeepRight(ibiz.config, env.globalConfig);
  }
  ibiz.log.setLevel(ibiz.env.logLevel);
}

exports.attachEnvironmentConfig = attachEnvironmentConfig;
