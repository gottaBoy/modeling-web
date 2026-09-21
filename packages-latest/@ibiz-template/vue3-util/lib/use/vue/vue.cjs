'use strict';

var qxUtil = require('qx-util');
var vue = require('vue');

"use strict";
function useProps() {
  const vue$1 = vue.getCurrentInstance().proxy;
  return vue$1.$props;
}
function getOrigin(val) {
  return vue.isReactive(val) ? vue.toRaw(val) : val;
}
function usePropsWatch(key, callback, options) {
  const props = useProps();
  if (Object.prototype.hasOwnProperty.call(props, key)) {
    vue.watch(
      () => props[key],
      (newVal, oldVal) => {
        callback(getOrigin(newVal), getOrigin(oldVal));
      },
      options
    );
    callback(getOrigin(props[key]), void 0);
  }
}
function useForce() {
  const vue$1 = vue.getCurrentInstance().proxy;
  return (callback) => {
    vue$1.$forceUpdate();
    if (callback && qxUtil.isFunc(callback)) {
      vue$1.$nextTick(() => {
        callback();
      });
    }
  };
}
function useForceTogether(vue, controller) {
  const orignForce = controller.force;
  const selfForce = useForce();
  controller.force = (callback) => {
    orignForce(callback);
    selfForce();
  };
}
function useController(controller) {
  controller.force = useForce();
}
const EmptyVNode = vue.createCommentVNode("EmptyVNode");
function isEmptyVNode(nodes) {
  if (!Array.isArray(nodes)) {
    return nodes === EmptyVNode;
  }
  return nodes.length === 1 && nodes[0] === EmptyVNode;
}
function useFilterAttribute(attrs, filter, filterKeys = ["class", "style"]) {
  const result = {};
  Object.keys(attrs).forEach((key) => {
    if (filter) {
      if (filter(key)) {
        result[key] = attrs[key];
      }
    } else if (!filterKeys.includes(key)) {
      result[key] = attrs[key];
    }
  });
  return result;
}

exports.EmptyVNode = EmptyVNode;
exports.getOrigin = getOrigin;
exports.isEmptyVNode = isEmptyVNode;
exports.useController = useController;
exports.useFilterAttribute = useFilterAttribute;
exports.useForce = useForce;
exports.useForceTogether = useForceTogether;
exports.useProps = useProps;
exports.usePropsWatch = usePropsWatch;
