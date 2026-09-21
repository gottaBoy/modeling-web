import {
  h,
  ref,
  PropType,
  computed,
  onUnmounted,
  defineComponent,
  resolveComponent,
} from 'vue';
import { GridColumnController } from '@ibiz-template/runtime';
import { useClickOutside, useNamespace } from '@ibiz-template/vue3-util';
import { OnClickOutsideResult, eventPath } from '@ibiz-template/core';
import { IDEGridColumn } from '@ibiz/model-core';
import './grid-column-header.scss';

export const GridColumnHeader = defineComponent({
  name: 'IBizGridColumnHeader',
  props: {
    controller: {
      type: Object as PropType<GridColumnController<IDEGridColumn>>,
      required: true,
    },
    column: {
      type: Object as PropType<IData>,
      required: true,
    },
  },
  setup(props) {
    const ns = useNamespace('grid-column-header');
    const c = props.controller;
    const content = ref<HTMLDivElement>();
    const visible = ref(false);
    const curValue = ref();

    const filterValue = computed(() => {
      const filterName = (c.model as IData).filterEditor?.id?.toLowerCase();
      return filterName ? c.grid.state.columnFilter[filterName] : undefined;
    });

    let funcs: OnClickOutsideResult | undefined;

    /**
     * 显示
     *
     * @return {*}  {void}
     */
    const onShow = (): void => {
      if (funcs) return funcs.proceed();
      funcs = useClickOutside(content, evt => {
        const classList: string[] = [];
        eventPath(evt).forEach(e => {
          if (e && (e as IData).classList) {
            classList.push(...(e as IData).classList);
          }
        });
        if (classList.includes('el-popper')) return;
        visible.value = false;
      });
    };

    /**
     * 隐藏
     *
     */
    const onHide = (): void => {
      // 停止监听
      curValue.value = filterValue.value;
      funcs?.pause();
    };

    /**
     * 过滤值改变
     *
     * @param {unknown} val
     * @param {string} [_name]
     */
    const onFilterChange = (val: unknown, _name?: string): void => {
      curValue.value = val;
    };

    /**
     * 筛选
     *
     */
    const onScreen = (): void => {
      visible.value = false;
      c.handleColumnScreen(curValue.value);
    };

    /**
     * 重置
     *
     */
    const onReset = (): void => {
      curValue.value = undefined;
      onScreen();
    };

    /**
     * 点击
     *
     * @param {MouseEvent} e
     */
    const onClick = (e: MouseEvent): void => {
      e.stopPropagation();
      visible.value = true;
    };

    onUnmounted(() => {
      funcs?.stop();
    });

    return {
      c,
      ns,
      visible,
      content,
      curValue,
      filterValue,
      onShow,
      onHide,
      onReset,
      onClick,
      onScreen,
      onFilterChange,
    };
  },
  render() {
    return (
      <div class={this.ns.b()}>
        <div class={this.ns.e('caption')}>
          <iBizIcon
            class={this.ns.em('caption', 'icon')}
            icon={this.c.model.sysImage}
          ></iBizIcon>
          <span class={this.ns.em('caption', 'label')}>
            {this.c.model.caption}
          </span>
        </div>
        {this.c.filterEditorProvider && (
          <el-popover
            width={220}
            onShow={this.onShow}
            onHide={this.onHide}
            visible={this.visible}
            popper-class={this.ns.e('popover')}
          >
            {{
              reference: () => {
                return (
                  <ion-icon
                    name='funnel'
                    title={ibiz.i18n.t('app.search')}
                    class={[
                      this.ns.em('filter', 'icon'),
                      this.ns.is('active', !!this.filterValue),
                    ]}
                    onClick={this.onClick}
                  ></ion-icon>
                );
              },
              default: () => {
                return (
                  <div ref='content' class={this.ns.em('popover', 'content')}>
                    <div class={this.ns.em('popover', 'editor')}>
                      {h(
                        resolveComponent(
                          this.c.filterEditorProvider!.gridEditor,
                        ),
                        {
                          data: {},
                          autoFocus: true,
                          value: this.curValue,
                          onChange: this.onFilterChange,
                          controller: this.c.filterEditor,
                        },
                      )}
                    </div>
                    <div class={this.ns.em('popover', 'bottom')}>
                      <el-button type='text' onClick={this.onScreen}>
                        {ibiz.i18n.t('app.search')}
                      </el-button>
                      <el-button type='text' onClick={this.onReset}>
                        {ibiz.i18n.t('app.reset')}
                      </el-button>
                    </div>
                  </div>
                );
              },
            }}
          </el-popover>
        )}
      </div>
    );
  },
});
