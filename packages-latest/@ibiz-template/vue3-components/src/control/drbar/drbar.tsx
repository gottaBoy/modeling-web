import {
  useNamespace,
  useSemanticNode,
  route2routePath,
  getNestedRoutePath,
  useControlController,
} from '@ibiz-template/vue3-util';
import { defineComponent, onUnmounted, PropType, ref, VNode, watch } from 'vue';
import { IDEDRBar } from '@ibiz/model-core';
import { useRoute, useRouter } from 'vue-router';
import { IControlProvider, IDRBarItemsState } from '@ibiz-template/runtime';
import { DRBarController } from './drbar.controller';
import './drbar.scss';

export const DRBarControl = defineComponent({
  name: 'IBizDrBarControl',
  props: {
    /**
     * @description 数据关系栏模型数据
     */
    modelData: { type: Object as PropType<IDEDRBar>, required: true },
    /**
     * @description 应用上下文对象
     */
    context: { type: Object as PropType<IContext>, required: true },
    /**
     * @description 视图参数对象
     * @default {}
     */
    params: { type: Object as PropType<IParams>, default: () => ({}) },
    /**
     * @description 部件适配器
     */
    provider: { type: Object as PropType<IControlProvider> },
    /**
     * @description  导航数据
     */
    srfnav: { type: String, required: false },
    /**
     * @description  指定el-menu的菜单展示模式（mode）参数
     * @default vertical
     */
    showMode: { type: String, default: 'vertical' },
    /**
     * @description  隐藏编辑项
     */
    hideEditItem: { type: Boolean, default: undefined },
  },
  setup(props) {
    const c: DRBarController = useControlController(
      (...args) => new DRBarController(...args),
    );

    const { semanticClass, semanticStyle } = useSemanticNode(c);
    const ns = useNamespace(`control-${c.model.controlType!.toLowerCase()}`);
    const router = useRouter();

    const counterData = ref<IData>({});
    const fn = (counter: IData) => {
      counterData.value = counter;
    };
    c.evt.on('onCreated', () => {
      if (c.counter) {
        c.counter.onChange(fn, true);
      }
    });

    onUnmounted(() => {
      c.counter?.offChange(fn);
    });

    c.setRouter(router);

    const handleSelect = (key: string): void => {
      c.handleSelectChange(key);
      const drBarItem = c.state.drBarItems.find(item => item.tag === key);
      if (drBarItem) {
        c.evt.emit('onTabChange', {
          data: drBarItem,
        });
      }
    };

    const route = useRoute();

    let expViewRoutePath = '';

    const opens: string[] = [];

    watch(
      () => c.state.isCreated,
      (_newVal, _oldVal) => {
        if (props.showMode !== 'horizontal') {
          const { drBarItems } = c.state;
          drBarItems.forEach(item => {
            opens.push(item.tag);
          });
        }
      },
    );

    if (c.routeDepth) {
      expViewRoutePath = getNestedRoutePath(route, c.routeDepth);
    }

    if (route) {
      watch(
        () => route.fullPath,
        (newVal, oldVal) => {
          if (newVal !== oldVal) {
            const depth = c.routeDepth;
            if (depth) {
              const currentRoutePath = getNestedRoutePath(route, c.routeDepth);
              if (currentRoutePath === expViewRoutePath) {
                const routePath = route2routePath(route);
                const { srfnav } = routePath.pathNodes[depth! - 1];
                c.handleSelectChange(srfnav);
              }
            }
          }
        },
        { immediate: true },
      );
    }

    const renderMenuItems = (item: IDRBarItemsState): VNode | undefined => {
      if (!item.visible) return;
      if (item.children) {
        let subtitle = '';

        // 水平显示的时候，父菜单标题同时显示子菜单选中的子标题
        if (props.showMode === 'horizontal') {
          if (item.tag !== c.state.selectedItem) {
            const find = item.children.find(
              x => x.tag === c.state.selectedItem,
            );
            if (find) {
              subtitle = `-${find.caption}`;
            }
          }
        }
        return (
          <el-sub-menu
            index={item.tag}
            disabled={item.disabled}
            class={[ns.b('group'), semanticClass('group', { item })]}
            style={semanticStyle('group')}
          >
            {{
              default: () =>
                item.children!.map(child => {
                  return renderMenuItems(child);
                }),
              title: () => [
                <iBizIcon
                  icon={item.sysImage}
                  style={semanticStyle('group.icon', { item })}
                  class={[
                    ns.e('icon'),
                    ns.be('group', 'icon'),
                    semanticClass('group.icon', { item }),
                  ]}
                ></iBizIcon>,
                <span
                  style={semanticStyle('group.caption', { item })}
                  class={[
                    ns.e('caption'),
                    ns.be('group', 'caption'),
                    semanticClass('group.caption', { item }),
                  ]}
                >
                  {item.caption}
                  {subtitle}
                </span>,
              ],
            }}
          </el-sub-menu>
        );
      }
      return (
        <el-menu-item
          index={item.tag}
          disabled={item.disabled}
          style={semanticStyle('item', { item })}
          class={[ns.e('item'), semanticClass('item', { item })]}
        >
          <iBizIcon
            icon={item.sysImage}
            class={[
              ns.e('icon'),
              ns.em('item', 'icon'),
              semanticClass('item.icon', { item }),
            ]}
            style={semanticStyle('item.caption', { item })}
          ></iBizIcon>
          <span
            class={[
              ns.em('item', 'caption'),
              semanticClass('item.caption', { item }),
            ]}
            style={semanticStyle('item.caption')}
          >
            {item.caption}
          </span>
          {item.counterId && counterData.value[item.counterId] != null && (
            <iBizBadge
              value={counterData.value[item.counterId]}
              counterMode={item.counterMode}
              class={[
                ns.e('counter'),
                semanticClass('item.counter', {
                  item,
                  counter: counterData.value,
                }),
              ]}
              style={semanticStyle('item.counter')}
            />
          )}
        </el-menu-item>
      );
    };

    return {
      c,
      ns,
      opens,
      semanticClass,
      semanticStyle,
      handleSelect,
      renderMenuItems,
    };
  },
  render() {
    const { isCreated, drBarItems, selectedItem, isCalculatedPermission } =
      this.c.state;

    return (
      <iBizControlBase
        controller={this.c}
        style={this.semanticStyle('root')}
        class={[this.ns.b(), this.semanticClass('root')]}
      >
        {isCreated && isCalculatedPermission && (
          <el-menu
            mode={this.showMode}
            default-active={selectedItem}
            default-openeds={this.opens}
            onSelect={this.handleSelect}
            style={this.semanticStyle('content')}
            class={[this.ns.e('menu'), this.semanticClass('content')]}
          >
            {{
              default: () => {
                return drBarItems.map(item => {
                  return this.renderMenuItems(item);
                });
              },
            }}
          </el-menu>
        )}
      </iBizControlBase>
    );
  },
});
