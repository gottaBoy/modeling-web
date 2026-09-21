import { clearAll } from 'qx-util';
import { watch, inject, provide, reactive, onActivated, onDeactivated, getCurrentInstance, onBeforeUnmount } from 'vue';
import { useProps, useForce } from '../../vue/vue.mjs';

"use strict";
function watchAndUpdateContextParams(props, view) {
  watch(
    () => ({ context: props.context, params: props.params }),
    (newVal) => {
      view.context.reset({}, newVal.context);
      clearAll(view.params);
      Object.assign(view.params, newVal.params);
      view.handleContextParams();
      ibiz.log.debug(
        ibiz.i18n.t("vue3Util.use.control.parameterChanges", {
          id: view.model.id
        }),
        newVal
      );
    }
  );
}
function watchAndUpdateState(props, view) {
  watch(
    () => {
      return props.state ? { ...props.state } : {};
    },
    (newVal, oldVal) => {
      const changeProps = {};
      Object.keys(newVal).forEach((key) => {
        if (newVal[key] !== (oldVal || {})[key]) {
          changeProps[key] = newVal[key];
        }
      });
      ibiz.log.debug(
        ibiz.i18n.t("vue3Util.use.view.stateChange", {
          name: view.model.name
        }),
        changeProps
      );
      Object.keys(changeProps).forEach((key) => {
        view.state[key] = changeProps[key];
      });
    },
    { immediate: true }
  );
}
function useViewController(fn) {
  const props = useProps();
  const ctx = inject("ctx", void 0);
  ctx == null ? void 0 : ctx.evt.emit("onForecast", props.modelData.name);
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
  ibiz.util.viewStack.add(c.id, c);
  watchAndUpdateContextParams(props, c);
  watchAndUpdateState(props, c);
  provide("ctx", c.ctx);
  c.state = reactive(c.state);
  c.slotProps = reactive(c.slotProps);
  if (props.modal) {
    c.modal = props.modal;
  }
  onActivated(() => {
    c.onActivated();
    ibiz.util.viewStack.active(c.id);
  });
  onDeactivated(() => {
    c.onDeactivated();
    ibiz.util.viewStack.deactivate(c.id);
  });
  c.force = useForce();
  const vue = getCurrentInstance().proxy;
  c.evt.onAll((eventName, event) => {
    vue.$emit(eventName.slice(2), event);
  });
  c.created();
  onBeforeUnmount(() => {
    c.destroyed();
    ibiz.util.viewStack.remove(c.id);
  });
  return c;
}

export { useViewController };
