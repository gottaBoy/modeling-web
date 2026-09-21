import { MDControlTypes } from '@ibiz-template/runtime';
import { watch, reactive, onActivated, onDeactivated, getCurrentInstance, onBeforeUnmount } from 'vue';
import { useProps, useForce } from '../../vue/vue.mjs';
import { useCtx } from '../../util/index.mjs';

"use strict";
function watchAndUpdateContextParams(props, control) {
  watch(
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
  watch(
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
  const ctx = useCtx();
  const props = useProps();
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
  if (MDControlTypes.indexOf(c.model.controlType) !== -1) {
    ibiz.util.record.add(c.ctrlId, c);
  }
  watchAndUpdateContextParams(props, c);
  watchAndUpdateState(props, c, opts == null ? void 0 : opts.excludePropsKeys);
  c.state = reactive(c.state);
  onActivated(() => c.onActivated());
  onDeactivated(() => c.onDeactivated());
  c.force = useForce();
  const vue = getCurrentInstance().proxy;
  c.evt.onAll((eventName, event) => {
    vue.$emit(eventName.slice(2), event);
  });
  vue.$emit("controllerAppear", c);
  c.created();
  onBeforeUnmount(() => {
    c.destroyed();
    if (MDControlTypes.indexOf(c.model.controlType) !== -1) {
      ibiz.util.record.remove(c.ctrlId);
    }
  });
  return c;
}

export { useControlController };
