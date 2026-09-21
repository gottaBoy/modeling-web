import {
  defineComponent,
  onMounted,
  PropType,
  reactive,
  ref,
  VNode,
} from 'vue';
import {
  OverlayContainer,
  useNamespace,
  useUIStore,
} from '@ibiz-template/vue3-util';
import {
  IModalData,
  IFloatWindowOptions,
  IOverlayContainer,
  Modal,
  ViewMode,
} from '@ibiz-template/runtime';
import interact from 'interactjs';
import './app-float-window-component.scss';

export const AppFloatWindowComponent = defineComponent({
  props: {
    opts: {
      type: Object as PropType<IFloatWindowOptions>,
      default: () => ({}),
    },
  },
  setup(props, ctx) {
    const ns = useNamespace('float-window');

    const containerRef = ref<HTMLDivElement>();

    const isShow = ref(false);

    let data: IData;

    const { zIndex } = useUIStore();
    const modalZIndex = zIndex.increment();

    // 合并options
    const options = ref<IFloatWindowOptions>({
      width: 500,
      height: 600,
      x: 100,
      y: 100,
    });

    if (props.opts) {
      Object.assign(options.value, props.opts);
    }

    const state = reactive({
      x: window.innerWidth - 600,
      y: 100,
      width: 500,
      height: 600,
      minWidth: 300,
      minHeight: 300,
    });

    const calcStyle = () => {
      return {
        left: `${state.x}px`,
        top: `${state.y}px`,
        height: `${state.height}px`,
        width: `${state.width}px`,
        zIndex: modalZIndex,
      };
    };

    const setStyle = () => {
      Object.assign(containerRef.value!, calcStyle());
    };

    onMounted(() => {
      const dragHandles = containerRef.value!.getElementsByClassName(
        ns.b('drag-handle'),
      );
      const dragHandle = (
        dragHandles[0] ? dragHandles[0] : containerRef.value!
      ) as HTMLDivElement;
      // 注册窗口拖拽
      interact(dragHandle).draggable({
        modifiers: [
          interact.modifiers.restrictRect({
            restriction: document.body,
            endOnly: true,
          }),
        ],
        cursorChecker: () => {
          return 'move';
        },
        listeners: {
          move: event => {
            // 计算偏移量保持位置
            state.x += event.dx;
            state.y += event.dy;
            setStyle();
          },
        },
      });
      // 注册窗口大小变更
      interact(containerRef.value!).resizable({
        // 可拖拽的边缘
        edges: {
          top: true,
          right: true,
          bottom: true,
          left: true,
        },
        margin: 6,
        modifiers: [
          // 保持在父对象内部
          interact.modifiers.restrictEdges({ outer: document.body }),
          // 缩放最小宽度
          interact.modifiers.restrictSize({
            min: { width: state.minWidth, height: state.minHeight },
          }),
        ],
        inertia: true,
        listeners: {
          move: event => {
            state.x += event.deltaRect.left;
            state.y += event.deltaRect.top;
            // 更新宽高
            state.width = event.rect.width;
            state.height = event.rect.height;
            setStyle();
          },
        },
      });
    });

    const modal = new Modal({
      mode: ViewMode.MODAL,
      viewUsage: 2,
      dismiss: (_data: IData) => {
        zIndex.decrement();
        isShow.value = false;
        data = _data;
      },
    });

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

    return {
      ns,
      isShow,
      options,
      modalZIndex,
      modal,
      calcStyle,
      present,
      dismiss,
      onClosed,
      containerRef,
    };
  },
  render() {
    return (
      <div
        class={[
          this.ns.b(),
          this.ns.is('show', this.isShow),
          this.options.windowClass,
        ]}
        style={this.calcStyle()}
        z-index={this.modalZIndex}
        ref='containerRef'
      >
        <div class={this.ns.b('header')}>
          <div class={this.ns.be('header', 'caption')}></div>
          <div class={this.ns.b('actions')}>
            <i
              class={this.ns.b('action-item')}
              onClick={() => {
                this.dismiss();
              }}
            ></i>
          </div>
        </div>
        <div class={this.ns.b('content')}>
          {this.$slots.default?.(this.modal)}+
        </div>
      </div>
    );
  },
});

/**
 * 创建全局悬浮窗口
 *
 * @author chitanda
 * @date 2023-10-11 21:10:55
 * @export
 * @param {() => VNode} render
 * @param {IFloatWindowOptions} [opts]
 * @return {*}  {IOverlayContainer}
 */
export function createFloatWindow(
  render: () => VNode,
  opts?: IFloatWindowOptions,
): IOverlayContainer {
  return new OverlayContainer(AppFloatWindowComponent, render, opts);
}
