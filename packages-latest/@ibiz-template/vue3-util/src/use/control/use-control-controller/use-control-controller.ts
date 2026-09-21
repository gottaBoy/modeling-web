/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ControlController,
  IControlController,
  IControlProvider,
  IMDControlController,
  MDControlTypes,
} from '@ibiz-template/runtime';
import {
  getCurrentInstance,
  onActivated,
  onBeforeUnmount,
  onDeactivated,
  reactive,
  watch,
} from 'vue';
import { useForce, useProps } from '../../vue/vue';
import { useCtx } from '../../util';

/**
 * 监听并更新上下文和视图参数（引用不变）
 * @author lxm
 * @date 2023-05-25 01:48:14
 * @param {IData} props
 * @param {IViewController} view
 */
function watchAndUpdateContextParams(
  props: IData,
  control: IControlController,
): void {
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
      // 不改变引用的情况下，重置控制器里的上下文和视图参数。
      // 重新计算上下文和视图参数
      control.updateContextParams(changedParams);
      ibiz.log.debug(
        ibiz.i18n.t('vue3Util.use.control.parameterChanges', {
          id: control.model.id,
        }),
        newVal,
      );
    },
  );
}

/**
 * 监听部件的props并更新部件state状态
 * 排除部分keys,如context,params
 * @author lxm
 * @date 2023-10-27 01:46:23
 * @param {IData} props
 * @param {IControlController} control
 */
function watchAndUpdateState(
  props: IData,
  control: IControlController,
  excludeFields: string[] = [],
): void {
  const excludeKeys = ['context', 'params', 'modelData', ...excludeFields];
  watch(
    () => {
      const watchProps: IData = {};
      Object.keys(props).forEach(key => {
        if (!excludeKeys.includes(key)) {
          watchProps[key] = props[key];
        }
      });
      return watchProps;
    },
    (newVal, oldVal) => {
      const changeProps: IData = {};
      Object.keys(newVal).forEach(key => {
        if (newVal[key] !== (oldVal || {})[key]) {
          changeProps[key] = newVal[key];
        }
      });
      ibiz.log.debug(
        ibiz.i18n.t('vue3Util.use.control.stateChange', {
          name: control.model.name,
        }),
        changeProps,
      );
      Object.keys(changeProps).forEach(key => {
        if (changeProps[key] !== undefined) {
          (control.state as any)[key] = changeProps[key];
        }
      });
    },
    { immediate: true },
  );
}

export interface extraOptions {
  /**
   * 排除监听的props里的key
   * @author lxm
   * @date 2023-11-22 06:11:45
   * @type {string[]}
   */
  excludePropsKeys: string[];
}

/**
 * 初始化部件控制器
 *
 * @author chitanda
 * @date 2022-08-15 17:08:47
 * @export
 * @template T
 * @param {() => T} fn
 * @return {*}  {T}
 */
export function useControlController<T extends IControlController>(
  fn: (...args: ConstructorParameters<typeof ControlController>) => T,
  opts?: Partial<extraOptions>,
): T {
  // 获取上层组件的ctx
  const ctx = useCtx();
  // 获取 props
  const props = useProps();
  // 上下文里提前预告部件
  ctx.evt.emit('onForecast', props.modelData.name!);

  // 实例化部件控制器
  const provider = props.provider as IControlProvider | undefined;
  let c: T;
  if (provider?.createController) {
    // 如果适配器给了创建方法使用适配器的方法
    c = provider.createController(
      props.modelData,
      props.context,
      props.params,
      ctx,
    ) as T;
  } else {
    c = fn(props.modelData, props.context, props.params, ctx);
  }

  // 多数据部件类型往记录导航工具添加当前部件
  if (MDControlTypes.indexOf(c.model.controlType!) !== -1) {
    ibiz.util.record.add(c.ctrlId, c as unknown as IMDControlController);
  }

  watchAndUpdateContextParams(props, c);
  watchAndUpdateState(props, c, opts?.excludePropsKeys);

  c.state = reactive(c.state);

  onActivated(() => c.onActivated());

  onDeactivated(() => c.onDeactivated());

  // 挂载强制更新方法
  c.force = useForce();

  const vue = getCurrentInstance()!.proxy!;
  c.evt.onAll((eventName: string, event: unknown) => {
    vue.$emit(eventName.slice(2), event);
  });

  // vue组件级事件最早的抛出controller
  vue.$emit('controllerAppear', c);

  c.created();

  // 卸载时销毁
  onBeforeUnmount(() => {
    c.destroyed();
    // 多数据部件类型从记录导航工具删除当前部件
    if (MDControlTypes.indexOf(c.model.controlType!) !== -1) {
      ibiz.util.record.remove(c.ctrlId);
    }
  });
  return c;
}
