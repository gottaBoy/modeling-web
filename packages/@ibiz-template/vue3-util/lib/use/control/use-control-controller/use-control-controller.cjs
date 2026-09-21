'use strict';

var runtime = require('@ibiz-template/runtime');
var vue = require('vue');
var vue$1 = require('../../vue/vue.cjs');
var index = require('../../util/index.cjs');

"use strict";
function watchAndUpdateContextParams(props, control) {
  vue.watch(
    () => ({ context: props.context, params: props.params }),
    (newVal, oldVal) => {
      if (newVal === oldVal) {
        return;
      }
      const changedParams = { ...newVal };
      if (newVal.context === oldVal.context) {
        delete changedParams.context;
      }
      if (newVal.params === oldVal.params) {
        delete changedParams.params;
      }
      control.updateContextParams(changedParams);
      ibiz.log.debug(
        ibiz.i18n.t("vue3Util.use.control.parameterChanges", {
          id: control.model.id
        }),
        newVal
      );
    }
  );
}
function watchAndUpdateState(props, control, excludeFields = []) {
  const excludeKeys = ["context", "params", "modelData", ...excludeFields];
  vue.watch(
    () => {
      const watchProps = {};
      Object.keys(props).forEach((key) => {
        if (!excludeKeys.includes(key)) {
          watchProps[key] = props[key];
        }
      });
      return watchProps;
    },
    (newVal, oldVal) => {
      const changeProps = {};
      Object.keys(newVal).forEach((key) => {
        if (newVal[key] !== (oldVal || {})[key]) {
          changeProps[key] = newVal[key];
        }
      });
      ibiz.log.debug(
        ibiz.i18n.t("vue3Util.use.control.stateChange", {
          name: control.model.name
        }),
        changeProps
      );
      Object.keys(changeProps).forEach((key) => {
        if (changeProps[key] !== void 0) {
          control.state[key] = changeProps[key];
        }
      });
    },
    { immediate: true }
  );
}
function useControlController(fn, opts) {
  const ctx = index.useCtx();
  const props = vue$1.useProps();
  ctx.evt.emit("onForecast", props.modelData.name);
  const provider = props.provider;
  let c;
  if (provider == null ? void 0 : provider.createController) {
    c = provider.createController(
      props.modelData,
      props.context,
      props.params,
      ctx
    );
  } else {
    c = fn(props.modelData, props.context, props.params, ctx);
  }
  if (runtime.MDControlTypes.indexOf(c.model.controlType) !== -1) {
    ibiz.util.record.add(c.ctrlId, c);
  }
  watchAndUpdateContextParams(props, c);
  watchAndUpdateState(props, c, opts == null ? void 0 : opts.excludePropsKeys);
  c.state = vue.reactive(c.state);
  vue.onActivated(() => c.onActivated());
  vue.onDeactivated(() => c.onDeactivated());
  c.force = vue$1.useForce();
  const vue$2 = vue.getCurrentInstance().proxy;
  c.evt.onAll((eventName, event) => {
    vue$2.$emit(eventName.slice(2), event);
  });
  vue$2.$emit("controllerAppear", c);
  c.created();
  vue.onBeforeUnmount(() => {
    c.destroyed();
    if (runtime.MDControlTypes.indexOf(c.model.controlType) !== -1) {
      ibiz.util.record.remove(c.ctrlId);
    }
  });
  return c;
}

exports.useControlController = useControlController;
