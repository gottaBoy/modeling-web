/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CTX,
  IViewController,
  IViewProvider,
  ViewController,
} from '@ibiz-template/runtime';
import { clearAll } from 'qx-util';
import {
  getCurrentInstance,
  inject,
  onActivated,
  onBeforeUnmount,
  onDeactivated,
  provide,
  reactive,
  watch,
} from 'vue';
import { useForce, useProps } from '../../vue/vue';

/**
 * 监听并更新上下文和视图参数（引用不变）
 * @author lxm
 * @date 2023-05-25 01:48:14
 * @param {IData} props
 * @param {IViewController} view
 */
function watchAndUpdateContextParams(
  props: IData,
  view: IViewController,
): void {
  watch(
    () => ({ context: props.context, params: props.params }),
    newVal => {
      // 不改变引用的情况下，重置控制器里的上下文和视图参数。
      view.context.reset({}, newVal.context);
      clearAll(view.params);
      Object.assign(view.params, newVal.params);
      // 重新计算上下文和视图参数
      view.handleContextParams();
      ibiz.log.debug(
        ibiz.i18n.t('vue3Util.use.control.parameterChanges', {
          id: view.model.id,
        }),
        newVal,
      );
    },
  );
}

/**
 * 监听并更新state
 * @author lxm
 * @date 2023-05-26 03:43:23
 * @param {IData} props
 * @param {IViewController} view
 */
function watchAndUpdateState(props: IData, view: IViewController): void {
  watch(
    () => {
      return props.state ? { ...props.state } : {};
    },
    (newVal, oldVal) => {
      const changeProps: IData = {};
      Object.keys(newVal).forEach(key => {
        if (newVal[key] !== (oldVal || {})[key]) {
          changeProps[key] = newVal[key];
        }
      });
      ibiz.log.debug(
        ibiz.i18n.t('vue3Util.use.view.stateChange', {
          name: view.model.name,
        }),
        changeProps,
      );
      Object.keys(changeProps).forEach(key => {
        (view.state as any)[key] = changeProps[key];
      });
    },
    { immediate: true },
  );
}

/**
 * 初始化视图控制器
 *
 * @description 此视图暂时控制器实例化只用于路由一级视图
 * @author chitanda
 * @date 2022-08-15 15:08:04
 * @export
 * @template T
 * @param {(context: IContext, params: IParams, ctx?: CTX) => T} fn
 * @return {*}  {T}
 */
export function useViewController<T extends IViewController>(
  fn: (...args: ConstructorParameters<typeof ViewController>) => T,
): T {
  // 获取 props
  const props = useProps();
  // 获取上层组件的ctx
  const ctx = inject<CTX | undefined>('ctx', undefined);
  // 上下文里提前预告部件
  ctx?.evt.emit('onForecast', props.modelData.name!);

  // 实例化视图控制器
  const provider = props.provider as IViewProvider | undefined;
  let c: IViewController;
  if (provider?.createController) {
    // 如果适配器给了创建方法使用适配器的方法
    c = provider.createController(
      props.modelData,
      props.context,
      props.params,
      ctx,
    ) as T;
  } else {
    c = fn(props.modelData, props.context, props.params, ctx) as T;
  }

  ibiz.util.viewStack.add(c.id, c);

  watchAndUpdateContextParams(props, c);
  watchAndUpdateState(props, c);

  // 提供自身的ctx给下层组件
  provide('ctx', (c as any).ctx);
  // 让state 响应式
  c.state = reactive(c.state) as any;

  // 让state 响应式
  c.slotProps = reactive(c.slotProps) as any;

  // 从props赋值modal,如果存在的话。
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

  const vue = getCurrentInstance()!.proxy!;
  c.evt.onAll((eventName, event) => {
    vue.$emit(eventName.slice(2), event);
  });

  c.created();

  // 卸载时销毁
  onBeforeUnmount(() => {
    c.destroyed();
    ibiz.util.viewStack.remove(c.id);
  });
  return c as T;
}
