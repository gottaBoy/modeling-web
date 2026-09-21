import {
  useNamespace,
  useSemanticNode,
  route2routePath,
  getNestedRoutePath,
  useControlController,
} from '@ibiz-template/vue3-util';
import { defineComponent, PropType, VNode, watch } from 'vue';
import { IAppDETabExplorerView, ITabExpPanel } from '@ibiz/model-core';
import {
  IControlProvider,
  TabExpPanelController,
} from '@ibiz-template/runtime';
import { useRoute } from 'vue-router';
import { isNil } from 'ramda';
import './tab-exp-panel.scss';

export const TabExpPanelControl = defineComponent({
  name: 'IBizTabExpPanelControl',
  props: {
    /**
     * @description 分页面板模型数据
     */
    modelData: { type: Object as PropType<ITabExpPanel>, required: true },
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
     * @description 默认打开分页名称
     */
    defaultTabName: { type: String, required: false },
  },
  setup() {
    const c = useControlController(
      (...args) => new TabExpPanelController(...args),
    );
    const ns = useNamespace(`control-${c.model.controlType!.toLowerCase()}`);
    const { semanticClass, semanticStyle } = useSemanticNode(c);
    const handleTabChange = (): void => {
      c.handleTabChange();
    };

    const tabPosition =
      (c.view.model as IAppDETabExplorerView).tabLayout?.toLowerCase() || 'top';

    const route = useRoute();

    let expViewRoutePath = '';
    if (c.routeDepth) {
      expViewRoutePath = getNestedRoutePath(route, c.routeDepth);
    }

    watch(
      () => route?.fullPath,
      (newVal, oldVal) => {
        if (newVal !== oldVal) {
          const depth = c.routeDepth;
          if (depth) {
            const currentRoutePath = getNestedRoutePath(route, c.routeDepth);
            if (currentRoutePath === expViewRoutePath) {
              const routePath = route2routePath(route);
              const { srfnav } = routePath.pathNodes[depth! - 1];
              if (
                srfnav &&
                c.state.activeName &&
                c.state.activeName !== srfnav
              ) {
                c.state.activeName = srfnav;
                c.handleTabChange();
              }
            }
          }
        }
      },
      { immediate: true },
    );

    return {
      c,
      ns,
      tabPosition,
      semanticClass,
      semanticStyle,
      handleTabChange,
    };
  },
  render() {
    const { isCreated, tabPages, counterData } = this.c.state;
    return (
      <iBizControlBase
        controller={this.c}
        class={this.semanticClass('root')}
        style={this.semanticStyle('root')}
      >
        {isCreated && (
          <el-tabs
            class={[this.ns.e('tabs'), this.semanticClass('content')]}
            style={this.semanticStyle('content')}
            v-model={this.c.state.activeName}
            tabPosition={this.tabPosition}
            onTabChange={this.handleTabChange}
          >
            {tabPages.map(tab => {
              const counterNum = tab.counterId
                ? counterData[tab.counterId]
                : undefined;
              return (
                <el-tab-pane
                  class={this.ns.e('tab-item')}
                  label={tab.caption}
                  name={tab.tabTag}
                >
                  {{
                    label: (): VNode => {
                      return (
                        <span
                          class={[
                            ...tab.class,
                            this.ns.e('item'),
                            this.semanticClass('item', { item: tab }),
                          ]}
                          style={this.semanticStyle('item', { item: tab })}
                        >
                          {this.c.isShowIcon && (
                            <iBizIcon
                              icon={tab.sysImage}
                              style={this.semanticStyle('item.icon', {
                                item: tab,
                              })}
                              class={[
                                this.ns.em('item', 'icon'),
                                this.semanticClass('item.icon', { item: tab }),
                              ]}
                            />
                          )}
                          <span
                            class={[
                              this.ns.em('item', 'caption'),
                              this.semanticClass('item.caption', { item: tab }),
                            ]}
                            style={this.semanticStyle('item.caption', {
                              item: tab,
                            })}
                          >
                            {this.c.isShowCaption && tab.caption}
                          </span>
                          {!isNil(counterNum) && (
                            <iBizBadge
                              class={[
                                this.ns.e('counter'),
                                this.semanticClass('item.counter', {
                                  item: tab,
                                  counter: counterData,
                                }),
                              ]}
                              style={this.semanticStyle('item.counter', {
                                item: tab,
                                counter: counterData,
                              })}
                              value={counterNum}
                              // counterMode={tab.counterMode}
                            />
                          )}
                        </span>
                      );
                    },
                  }}
                </el-tab-pane>
              );
            })}
          </el-tabs>
        )}
      </iBizControlBase>
    );
  },
});
