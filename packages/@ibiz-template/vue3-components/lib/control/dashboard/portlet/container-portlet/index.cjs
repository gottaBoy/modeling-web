'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var runtime = require('@ibiz-template/runtime');
var vue3Util = require('@ibiz-template/vue3-util');
var containerPortlet = require('./container-portlet.cjs');
var containerPortlet_provider = require('./container-portlet.provider.cjs');

"use strict";
const IBizContainerPortlet = vue3Util.withInstall(
  containerPortlet.ContainerPortlet,
  function(v) {
    v.component(containerPortlet.ContainerPortlet.name, containerPortlet.ContainerPortlet);
    runtime.registerPortletProvider("CONTAINER", () => new containerPortlet_provider.ContainerPortletProvider());
  }
);

exports.ContainerPortlet = containerPortlet.ContainerPortlet;
exports.IBizContainerPortlet = IBizContainerPortlet;
exports.default = IBizContainerPortlet;
