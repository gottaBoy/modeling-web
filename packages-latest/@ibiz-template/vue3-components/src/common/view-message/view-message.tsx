import {
  PropType,
  defineComponent,
  nextTick,
  onMounted,
  ref,
  watch,
} from 'vue';
import { IViewMessage, ViewMsgController } from '@ibiz-template/runtime';
import { useNamespace } from '@ibiz-template/vue3-util';
import { createUUID } from 'qx-util';
import './view-message.scss';

export const ViewMessage = defineComponent({
  name: 'ViewMessage',
  props: {
    messages: {
      type: Array<IViewMessage>,
    },
    scroll: {
      type: Boolean,
      default: false,
    },
    context: {
      type: Object as PropType<IContext>,
      required: false,
    },
    params: {
      type: Object as PropType<IParams>,
      required: false,
    },
    controller: {
      type: Object as PropType<ViewMsgController>,
    },
    semantic: {
      type: Object as PropType<IData>,
      default: () => ({}),
    },
  },
  setup(props) {
    const ns = useNamespace('view-message');

    // 消息类型映射
    const getType = (messageType?: string): string => {
      switch (messageType) {
        case 'WARN':
          return 'warning';
        case 'ERROR':
          return 'error';
        default:
          return 'info';
      }
    };

    // 消息列表
    const items = ref<(IViewMessage & { hidden?: boolean })[]>([]);

    // 默认展示信息索引
    const initialIndex = ref(0);

    // 横向滚动容器唯一标识
    const uuid = ref('');

    // 是否隐藏消息容器
    const isHiddenContainer = ref(false);

    watch(
      () => props.messages,
      () => {
        initialIndex.value = 0;
        uuid.value = createUUID();
        if (Array.isArray(props.messages)) {
          items.value = props.messages
            .filter(
              item =>
                item.title || item.message || (item.layoutPanel && item.data),
            )
            .map(item => {
              return { ...item };
            });
          isHiddenContainer.value = false;
        } else {
          items.value = [];
          isHiddenContainer.value = true;
        }
      },
      { immediate: true },
    );

    const container = ref<HTMLElement | null>(null);

    // 横向滚动容器高度
    const carouselHeight = ref('');

    onMounted(() => {
      nextTick(() => {
        // 初始化横向滚动容器的高度
        const el = container.value as HTMLElement;
        if (!el) {
          return;
        }
        const alertEl = el.querySelector('.el-alert') as HTMLElement;
        if (alertEl) {
          carouselHeight.value = `${alertEl.offsetHeight}px`;
        }
      });
    });

    // 处理消息关闭事件
    const handleAlertClose = (index: number) => {
      // 关闭对应的消息
      items.value[index].hidden = true;
      // 所有消息关闭后，隐藏横向滚动容器
      const isHiddenCarouse = items.value.every(item => item.hidden);
      if (isHiddenCarouse) {
        isHiddenContainer.value = true;
      }
      uuid.value = createUUID();
      const item = items.value[index];
      props.controller?.setMsgRemoveModeStorage(item);
    };

    // 处理激活消息索引变化事件
    const handleChange = (index: number) => {
      initialIndex.value = index;
    };

    return {
      ns,
      getType,
      items,
      container,
      carouselHeight,
      initialIndex,
      uuid,
      isHiddenContainer,
      handleAlertClose,
      handleChange,
    };
  },
  render() {
    // 绘制布局面板
    const renderLayoutPanel = (item: IViewMessage) => {
      return (
        <iBizControlShell
          data={item.data}
          modelData={item.layoutPanel}
          context={this.context}
          params={this.params}
        ></iBizControlShell>
      );
    };

    // 横向滚动展示消息
    const renderScrollMessages = () => {
      return (
        <div
          class={[this.ns.b(), this.isHiddenContainer && this.ns.m('hidden')]}
          ref='container'
        >
          <el-carousel
            key={this.uuid}
            indicatorPosition='none'
            arrow='never'
            height={this.carouselHeight}
            initialIndex={this.initialIndex}
            onChange={this.handleChange}
          >
            {this.items.map((item, i) => {
              if (item.hidden) {
                return;
              }
              const isRenderDefault =
                item.message || (item.layoutPanel && item.data);
              return (
                <el-carousel-item>
                  <el-alert
                    type={this.getType(item.messageType)}
                    class={[
                      this.ns.b('carousel-alert'),
                      this.ns.bm(
                        'carousel-alert',
                        item.title && isRenderDefault ? '' : 'single',
                      ),
                      item.sysCss?.cssName,
                      this.semantic.item?.class,
                    ]}
                    style={this.semantic.item?.style}
                    closable={item.removeMode !== 0}
                    onClose={() => this.handleAlertClose(i)}
                  >
                    {{
                      title: () => {
                        return (
                          <div class={this.ns.be('carousel-alert', 'title')}>
                            {item.title || ''}
                          </div>
                        );
                      },
                      default: () => {
                        if (item.layoutPanel && item.data) {
                          return renderLayoutPanel(item);
                        }
                        return (
                          <div
                            class={this.ns.be('carousel-alert', 'message')}
                            v-html={item.message || ''}
                          ></div>
                        );
                      },
                    }}
                  </el-alert>
                </el-carousel-item>
              );
            })}
          </el-carousel>
        </div>
      );
    };

    // 平铺展示消息
    const renderMessages = () => {
      return (
        <div
          class={[this.ns.b(), this.isHiddenContainer && this.ns.m('hidden')]}
        >
          {this.items.map((item, i) => {
            const isRenderDefault =
              item.message || (item.layoutPanel && item.data);
            return (
              <el-alert
                type={this.getType(item.messageType)}
                class={[
                  this.ns.b('alert'),
                  this.ns.bm(
                    'alert',
                    item.title && isRenderDefault ? '' : 'single',
                  ),
                  this.ns.bm(
                    'alert',
                    !item.title && isRenderDefault ? 'single-message' : '',
                  ),
                  item.sysCss?.cssName,
                  this.semantic.item?.class,
                ]}
                style={this.semantic.item?.style}
                closable={item.removeMode !== 0}
                onClose={() => this.handleAlertClose(i)}
              >
                {{
                  title: () => {
                    return (
                      <div class={this.ns.be('alert', 'title')}>
                        {item.title || ''}
                      </div>
                    );
                  },
                  default: () => {
                    if (item.layoutPanel && item.data) {
                      return renderLayoutPanel(item);
                    }
                    return (
                      <div
                        class={this.ns.be('alert', 'message')}
                        v-html={item.message || ''}
                      ></div>
                    );
                  },
                }}
              </el-alert>
            );
          })}
        </div>
      );
    };

    if (!this.items.length) {
      return;
    }

    if (this.items.length > 1 && this.scroll) {
      return renderScrollMessages();
    }

    return renderMessages();
  },
});
