import {
  defineComponent,
  h,
  PropType,
  ref,
  resolveComponent,
  VNode,
} from 'vue';
import {
  OverlayContainer,
  useNamespace,
  useUIStore,
} from '@ibiz-template/vue3-util';
import {
  IDrawerOptions,
  IModalData,
  IOverlayContainer,
  Modal,
  ViewMode,
} from '@ibiz-template/runtime';
import { isNumber } from 'lodash-es';
import './app-drawer-component.scss';
import { calcOpenModeStyle } from '@ibiz-template/core';

export const AppDrawerComponent = defineComponent({
  props: {
    opts: {
      type: Object as PropType<IDrawerOptions>,
      default: () => ({}),
    },
  },
  setup(props, ctx) {
    const ns = useNamespace('drawer');

    const isShow = ref(false);

    let data: IData;

    const { zIndex } = useUIStore();
    const drawerZIndex = zIndex.increment();

    // 处理抽屉size
    const size = ref<number | string>('100%');
    const { width, height, placement } = props.opts;
    // 上下看高度
    if (placement === 'top' || placement === 'bottom') {
      if (isNumber(height)) {
        size.value = calcOpenModeStyle(height, 'drawer');
      } else {
        size.value = '100%';
      }
    }
    // 左右看宽度
    if (placement === 'left' || placement === 'right') {
      if (isNumber(width)) {
        size.value = calcOpenModeStyle(width, 'drawer');
      } else {
        size.value = 800;
      }
    }

    const modal = new Modal({
      mode: ViewMode.DRAWER,
      viewUsage: 2,
      dismiss: (_data: IModalData) => {
        zIndex.decrement();
        isShow.value = false;
        data = _data;
      },
    });

    // 自身的所有关闭方式最终都走这个
    const onBeforeClose = async (done: () => void) => {
      const isClose = await modal.dismiss();
      if (isClose) {
        done();
      }
    };

    // 外部函数式调用
    const dismiss = (_data?: IModalData) => {
      modal.dismiss(_data);
    };

    const present = () => {
      isShow.value = true;
    };

    // 完全关闭后调用销毁
    const onClosed = () => {
      ctx.emit('dismiss', data);
    };

    let direction = '';

    switch (props.opts.placement) {
      case 'left':
        direction = 'ltr';
        break;
      case 'top':
        direction = 'ttb';
        break;
      case 'bottom':
        direction = 'btt';
        break;
      default:
        direction = 'rtl';
    }

    return {
      ns,
      isShow,
      size,
      direction,
      drawerZIndex,
      modal,
      dismiss,
      present,
      onClosed,
      onBeforeClose,
    };
  },
  render() {
    const option = this.opts || {};

    return h(
      resolveComponent('el-drawer'),
      {
        modelValue: this.isShow,
        lockScroll: true,
        size: this.size,
        class: this.ns.b(),
        zIndex: this.drawerZIndex,
        direction: this.direction,
        beforeClose: this.onBeforeClose,
        onClosed: this.onClosed,
        ...option,
      },
      this.$slots.default?.(this.modal),
    );
  },
});

/**
 * 创建抽屉
 *
 * @author chitanda
 * @date 2022-12-29 15:12:57
 * @export
 * @param {() => VNode} render
 * @param {(IDrawerOptions | undefined)} [opts]
 * @return {*}  {IOverlayContainer}
 */
export function createDrawer(
  render: () => VNode,
  opts?: IDrawerOptions | undefined,
): IOverlayContainer {
  return new OverlayContainer(AppDrawerComponent, render, opts);
}
