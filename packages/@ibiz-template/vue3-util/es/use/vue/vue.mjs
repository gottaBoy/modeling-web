import { isFunc } from 'qx-util';
import { getCurrentInstance, isReactive, toRaw, watch, createCommentVNode } from 'vue';

"use strict";
function useProps() {
  const vue = getCurrentInstance().proxy;
  return vue.$props;
}
function getOrigin(val) {
  return isReactive(val) ? toRaw(val) : val;
}
function usePropsWatch(key, callback, options) {
  const props = useProps();
  if (Object.prototype.hasOwnProperty.call(props, key)) {
    watch(
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
  const vue = getCurrentInstance().proxy;
  return (callback) => {
    vue.$forceUpdate();
    if (callback && isFunc(callback)) {
      vue.$nextTick(() => {
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
const EmptyVNode = createCommentVNode("EmptyVNode");
function isEmptyVNode(nodes) {
  if (!Array.isArray(nodes)) {
    return nodes === EmptyVNode;
  }
  return nodes.length === 1 && nodes[0] === EmptyVNode;
}

export { EmptyVNode, getOrigin, isEmptyVNode, useController, useForce, useForceTogether, useProps, usePropsWatch };
