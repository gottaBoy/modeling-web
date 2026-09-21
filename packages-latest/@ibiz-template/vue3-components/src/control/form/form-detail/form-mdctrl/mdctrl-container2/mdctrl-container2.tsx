import { FormMDCtrlFormController } from '@ibiz-template/runtime';
import { useNamespace, useSemanticNode } from '@ibiz-template/vue3-util';
import {
  PropType,
  defineComponent,
  onMounted,
  onUnmounted,
  ref,
  watch,
} from 'vue';
import draggable from 'vuedraggable';
import './mdctrl-container2.scss';
import { showTitle } from '@ibiz-template/core';
import {
  addIcon,
  dragIcon,
  leftArrowIcon,
  removeIcon,
  rightArrowIcon,
} from './icon';

export const MDCtrlContainer2 = defineComponent({
  name: 'IBizMDCtrlContainer2',
  components: {
    draggable,
  },
  props: {
    controller: {
      type: FormMDCtrlFormController,
      required: true,
    },
    items: {
      type: Array as PropType<IData[]>,
      default: () => [],
    },
  },
  setup(props) {
    const ns = useNamespace('mdctrl-container2');
    const ns2 = useNamespace('form-mdctrl');
    const { semanticClass, semanticStyle } = useSemanticNode(
      props.controller.form,
    );

    // 当前选中项
    const currentItem = ref('');

    watch(
      () => props.items,
      () => {
        if (!currentItem.value) {
          currentItem.value = props.items[0]?.id || '';
        }
      },
      {
        immediate: true,
      },
    );

    // 拖拽中的项
    const draggingKey = ref('');

    // 容器组件
    const container = ref<IData>();

    // 是否展示左箭头
    const isShowLeftArrow = ref(false);

    // 是否展示右箭头
    const isShowRightArrow = ref(false);

    // 是否展示border
    const isShowBorder = ref(true);

    // 元素大小变化监视器
    let resizeObserver: ResizeObserver;

    // 更新箭头可视性
    const updateArrowVisible = () => {
      if (container.value) {
        const el = container.value.$el as HTMLElement;
        if (el) {
          isShowLeftArrow.value = el.scrollLeft > 0;
          isShowRightArrow.value =
            el.scrollLeft < el.scrollWidth - el.offsetWidth;
          isShowBorder.value = el.offsetWidth > el.scrollWidth;
        }
      }
    };

    onMounted(() => {
      if (container.value && container.value.$el) {
        resizeObserver = new ResizeObserver(entries => {
          entries.forEach(() => {
            updateArrowVisible();
          });
        });
        resizeObserver.observe(container.value.$el);
      }
    });

    onUnmounted(() => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    });

    // 处理项选中
    const handleSelect = (e: MouseEvent, item: IData) => {
      e.stopPropagation();
      currentItem.value = item.id;
    };

    // 处理项添加
    const handleAdd = (e: MouseEvent) => {
      e.stopPropagation();
      props.controller.create();
      currentItem.value = props.items[props.items.length - 1]?.id || '';
    };

    // 处理项删除
    const handleRemove = async (e: MouseEvent, item: IData) => {
      e.stopPropagation();
      await props.controller.remove(item.id);
      if (currentItem.value === item.id) {
        currentItem.value = props.items[0]?.id || '';
      }
      updateArrowVisible();
    };

    // 处理箭头点击
    const handleArrowClick = (e: MouseEvent, direction: 'left' | 'right') => {
      e.stopPropagation();
      if (container.value) {
        const el = container.value.$el as HTMLElement;
        if (el) {
          const children = Array.from(el.children || []) as HTMLElement[];
          const child = children.find(item =>
            item.classList.contains(ns.b('header-item')),
          );
          if (child) {
            const width = child.offsetWidth;
            if (direction === 'right') {
              el.scrollLeft += width;
            }
            if (direction === 'left') {
              el.scrollLeft -= width;
            }
          }
          updateArrowVisible();
        }
      }
    };

    // 处理拖拽开始
    const handleDragStart = (item: IData) => {
      draggingKey.value = item.id;
    };

    // 处理拖拽结束
    const handleDragEnd = () => {
      draggingKey.value = '';
      props.controller.updateData();
      updateArrowVisible();
    };

    return {
      ns,
      ns2,
      currentItem,
      draggingKey,
      container,
      isShowLeftArrow,
      isShowRightArrow,
      isShowBorder,
      handleSelect,
      handleAdd,
      handleRemove,
      handleArrowClick,
      handleDragStart,
      handleDragEnd,
      semanticClass,
      semanticStyle,
    };
  },
  render() {
    return (
      <div class={this.ns.b()}>
        <div class={[this.ns.b('header')]}>
          <draggable
            ref='container'
            class={[this.ns.b('header-content')]}
            list={this.items}
            ghostClass={this.ns.bm('header-item', 'ghost')}
            itemKey='id'
          >
            {{
              item: ({ element }: { element: IData }) => {
                return (
                  <div
                    class={[
                      this.ns.b('header-item'),
                      this.draggingKey && this.ns.bm('header-item', 'dragging'),
                      this.draggingKey === element.id &&
                        this.ns.bm('header-item', 'drag'),
                      this.currentItem === element.id &&
                        this.ns.bm('header-item', 'active'),
                    ]}
                    onDragstart={() => {
                      this.handleDragStart(element);
                    }}
                    onDragend={() => {
                      this.handleDragEnd();
                    }}
                    onClick={(e: MouseEvent) => {
                      this.handleSelect(e, element);
                    }}
                  >
                    <div class={this.ns.be('header-item', 'drag-icon')}>
                      {dragIcon()}
                    </div>
                    <div class={this.ns.be('header-item', 'text')}>
                      {element.title}
                    </div>
                    {this.controller.enableDelete && (
                      <div
                        class={[
                          this.ns2.b('button'),
                          this.ns.be('header-item', 'btn'),
                          this.semanticClass('mdctrl.button', {
                            mdctrl: this.controller,
                            tag: 'remove',
                          }),
                        ]}
                        style={this.semanticStyle('mdctrl.button', {
                          mdctrl: this.controller,
                          tag: 'remove',
                        })}
                        title={showTitle(ibiz.i18n.t('app.delete'))}
                        onClick={(e: MouseEvent) => {
                          this.handleRemove(e, element);
                        }}
                      >
                        {removeIcon()}
                      </div>
                    )}
                  </div>
                );
              },
              footer: () => {
                return [
                  this.controller.enableCreate && (
                    <div
                      class={[
                        this.ns.b('header-item'),
                        this.ns2.b('button'),
                        this.semanticClass('mdctrl.button', {
                          mdctrl: this.controller,
                          tag: 'create',
                        }),
                        !this.isShowBorder &&
                          this.ns.bm('header-item', 'hidden-border'),
                      ]}
                      style={this.semanticStyle('mdctrl.button', {
                        mdctrl: this.controller,
                        tag: 'create',
                      })}
                      onClick={(e: MouseEvent) => {
                        this.handleAdd(e);
                      }}
                    >
                      <div class={this.ns.be('header-item', 'icon')}>
                        {addIcon()}
                      </div>
                      <div class={this.ns.be('header-item', 'text')}>
                        {ibiz.i18n.t('app.add')}
                      </div>
                    </div>
                  ),
                  this.isShowLeftArrow && (
                    <div
                      class={this.ns.b('header-left-arrow')}
                      onClick={(e: MouseEvent) => {
                        this.handleArrowClick(e, 'left');
                      }}
                    >
                      {leftArrowIcon()}
                    </div>
                  ),
                  this.isShowRightArrow && (
                    <div
                      class={this.ns.b('header-right-arrow')}
                      onClick={(e: MouseEvent) => {
                        this.handleArrowClick(e, 'right');
                      }}
                    >
                      {rightArrowIcon()}
                    </div>
                  ),
                ];
              },
            }}
          </draggable>
        </div>

        <div class={this.ns.b('content')}>
          {this.items.map(item => {
            return (
              <div
                key={item.id}
                class={this.ns.b('content-item')}
                style={{
                  display: item.id !== this.currentItem ? 'none' : '',
                }}
              >
                {this.$slots.item?.({ data: item })}
              </div>
            );
          })}
        </div>
      </div>
    );
  },
});
