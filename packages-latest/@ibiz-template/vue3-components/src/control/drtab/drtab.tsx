import {
  useNamespace,
  useSemanticNode,
  route2routePath,
  getNestedRoutePath,
  useControlController,
} from '@ibiz-template/vue3-util';
import {
  ref,
  VNode,
  watch,
  PropType,
  computed,
  onUnmounted,
  defineComponent,
} from 'vue';
import { IAppDETabExplorerView, IDEDRTab } from '@ibiz/model-core';
import { useRoute, useRouter } from 'vue-router';
import {
  hasSubRoute,
  IControlProvider,
  IDRTabPagesState,
} from '@ibiz-template/runtime';
import { isNil } from 'ramda';
import { showTitle } from '@ibiz-template/core';
import { DRTabController } from './drtab.controller';
import { useAppDRTab } from './drtab-control.util';
import { FlowDrtab } from './flow-drtab';
import './drtab.scss';

export const DRTabControl = defineComponent({
  name: 'IBizDrTabControl',
  props: {
    /**
     * @description 数据关系分页栏模型数据
     */
    modelData: { type: Object as PropType<IDEDRTab>, required: true },
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
     * @description 隐藏编辑项
     */
    hideEditItem: { type: Boolean, default: undefined },
  },
  setup() {
    const c: DRTabController = useControlController(
      (...args) => new DRTabController(...args),
    );
    const ns = useNamespace(`control-${c.model.controlType!.toLowerCase()}`);
    const router = useRouter();
    const controlRef = ref();

    const counterData = ref<IData>({});
    const { semanticClass, semanticStyle } = useSemanticNode(c);

    const { visibleItems, moreItems } = useAppDRTab(c, controlRef, counterData);

    const fn = (counter: IData): void => {
      counterData.value = counter;
    };

    const tabPosition =
      (c.view.model as IAppDETabExplorerView).tabLayout?.toLowerCase() || 'top';

    c.evt.on('onCreated', () => {
      if (c.counter) {
        c.counter.onChange(fn, true);
      }
    });

    const activeTab = computed(() => {
      return c.state.drTabPages.find(tab => tab.tag === c.state.activeName);
    });

    onUnmounted(() => {
      c.counter?.offChange(fn);
    });

    c.setRouter(router);

    const emitChange = () => {
      const { activeName } = c.state;
      const drTabItem = c.state.drTabPages.find(
        item => item.tag === activeName,
      );
      if (drTabItem) {
        c.evt.emit('onTabChange', {
          data: drTabItem,
        });
      }
    };

    const handleTabChange = (): void => {
      c.handleTabChange();
      emitChange();
    };

    const onTabChange = (key: string): void => {
      c.state.activeName = key;
      c.handleTabChange();
      emitChange();
    };

    const route = useRoute();

    let expViewRoutePath = '';
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
                // 路由模式下，且有子路由的时候不需要navpos跳转路由，只要做呈现
                const isRoutePushed =
                  !!c.routeDepth && hasSubRoute(c.routeDepth);
                if (
                  srfnav &&
                  c.state.activeName &&
                  c.state.activeName !== srfnav
                ) {
                  c.state.activeName = srfnav as string;

                  c.handleTabChange(isRoutePushed);
                } else if (!srfnav) {
                  // 路由模式下，且没有子路由的时候，需要触发tab变更还原分页
                  const routeNoSub =
                    !!c.routeDepth && !hasSubRoute(c.routeDepth);
                  // 空的时候跳转默认分页
                  const doTabChange =
                    c.state.activeName !== c.state.defaultName || routeNoSub;
                  if (doTabChange) {
                    c.state.activeName = c.state.defaultName;
                    c.handleTabChange(isRoutePushed);
                  }
                }
              }
            }
          }
        },
        { immediate: true },
      );
    }

    const renderDropdownList = (): JSX.Element => {
      return (
        <el-dropdown
          trigger='click'
          onCommand={onTabChange}
          style={semanticStyle('dropdown', { item: activeTab.value })}
          popper-class={[
            semanticClass('popup'),
            ns.be('dropdown-list', 'popper'),
          ]}
          popper-style={semanticStyle('popup')}
          class={[
            ns.b('dropdown-list'),
            ns.e('dropdown'),
            semanticClass('dropdown', { item: activeTab.value }),
          ]}
        >
          {{
            default: (): VNode => (
              <div class={ns.be('dropdown-list', 'trigger')}>
                {activeTab.value?.sysImage && (
                  <iBizIcon
                    class={[
                      ns.em('dropdown', 'icon'),
                      semanticClass('dropdown.icon', { item: activeTab.value }),
                    ]}
                    style={semanticStyle('dropdown.icon', {
                      item: activeTab.value,
                    })}
                    icon={activeTab.value.sysImage}
                  />
                )}
                <div
                  class={[
                    ns.em('dropdown', 'caption'),
                    semanticClass('dropdown.caption', {
                      item: activeTab.value,
                    }),
                  ]}
                  style={semanticStyle('dropdown.caption', {
                    item: activeTab.value,
                  })}
                >
                  {activeTab.value?.caption}
                </div>
                {activeTab.value?.counterId && (
                  <iBizBadge
                    class={[
                      ns.em('dropdown', 'counter'),
                      semanticClass('dropdown.counter', {
                        item: activeTab.value,
                        counter: counterData.value,
                      }),
                    ]}
                    style={semanticStyle('dropdown.counter', {
                      item: activeTab.value,
                      counter: counterData.value,
                    })}
                    value={counterData.value[activeTab.value.counterId]}
                    counterMode={activeTab.value.counterMode}
                  />
                )}
                <ion-icon name='chevron-down-outline'></ion-icon>
              </div>
            ),
            dropdown: () => {
              return (
                <div class={ns.bem('dropdown-list', 'popper', 'content')}>
                  {c.state.drTabPages.map(tab => {
                    if (!tab.hidden) {
                      return (
                        <el-dropdown-item
                          class={[
                            ns.e('item'),
                            semanticClass('item', { item: tab }),
                            ns.bem('dropdown-list', 'popper', 'item'),
                            ns.is('active', tab.tag === c.state.activeName),
                          ]}
                          style={semanticStyle('item', { item: tab })}
                          command={tab.tag}
                          disabled={tab.disabled}
                        >
                          {tab.sysImage && (
                            <iBizIcon
                              icon={tab.sysImage}
                              class={[
                                ns.em('item', 'icon'),
                                semanticClass('item.icon', { item: tab }),
                              ]}
                              style={semanticStyle('item.icon', { item: tab })}
                            />
                          )}
                          <span
                            class={[
                              'caption',
                              ns.em('item', 'caption'),
                              semanticClass('item.caption', { item: tab }),
                            ]}
                            style={semanticStyle('item.caption', { item: tab })}
                          >
                            {tab.caption}
                          </span>
                          {tab.counterId && (
                            <iBizBadge
                              class={[
                                ns.em('item', 'counter'),
                                ns.bem('dropdown-list', 'popper', 'counter'),
                                semanticClass('item.counter', {
                                  item: tab,
                                  counter: counterData.value,
                                }),
                              ]}
                              style={semanticStyle('item.counter', {
                                item: tab,
                                counter: counterData.value,
                              })}
                              value={counterData.value[tab.counterId]}
                              counterMode={tab.counterMode}
                            />
                          )}
                        </el-dropdown-item>
                      );
                    }
                    return null;
                  })}
                </div>
              );
            },
          }}
        </el-dropdown>
      );
    };

    return {
      c,
      ns,
      moreItems,
      activeTab,
      controlRef,
      counterData,
      tabPosition,
      visibleItems,
      semanticClass,
      semanticStyle,
      onTabChange,
      handleTabChange,
      renderDropdownList,
    };
  },
  render() {
    const { isCreated, isCalculatedPermission } = this.c.state;
    if (this.tabPosition === 'flow_noheader' || this.tabPosition === 'flow') {
      return (
        <FlowDrtab
          class={this.semanticClass('root')}
          style={this.semanticStyle('root')}
          semanticClass={this.semanticClass}
          semanticStyle={this.semanticStyle}
          pagesState={this.visibleItems as IData[]}
          drtabpages={this.modelData.dedrtabPages}
          context={this.c.context}
          params={this.c.params}
          showHeader={this.tabPosition === 'flow'}
          counterData={this.counterData}
          activeTab={this.activeTab}
          controller={this.c}
        ></FlowDrtab>
      );
    }
    const moreTab =
      this.moreItems.find(
        (tab: IDRTabPagesState) => tab.tag === this.c.state.activeName,
      ) || {};

    const more = (
      <el-dropdown
        trigger='click'
        style={this.semanticStyle('more')}
        popper-class={[
          this.semanticClass('popup'),
          this.ns.b('more-dropdown-popper'),
        ]}
        popper-style={this.semanticStyle('popup')}
        class={[this.ns.b('more-dropdown'), this.semanticClass('more')]}
      >
        {{
          default: () => {
            return (
              <div
                class={this.ns.be('more-dropdown', 'link')}
                onClick={(e): void => e.stopPropagation()}
              >
                <span>{ibiz.i18n.t('app.more')}</span>
                <svg
                  viewBox='0 0 16 16'
                  xmlns='http://www.w3.org/2000/svg'
                  height='1em'
                  width='1em'
                >
                  <g stroke-width='1' fill-rule='evenodd'>
                    <path d='M7.978 11.997l-.005.006L2.3 6.33l.83-.831 4.848 4.848L12.826 5.5l.83.83-5.673 5.673-.005-.006z'></path>
                  </g>
                </svg>
              </div>
            );
          },
          dropdown: () => {
            return (
              <el-dropdown-menu>
                {{
                  default: () => {
                    return this.moreItems.map((item: IDRTabPagesState) => {
                      return (
                        <el-dropdown-item
                          class={[
                            this.c.state.activeName === item.tag
                              ? this.ns.be('more-dropdown-popper', 'active')
                              : '',
                            this.ns.bem(
                              'more-dropdown-popper',
                              'label',
                              'item',
                            ),
                            this.ns.e('item'),
                            this.semanticClass('item', { item }),
                          ]}
                          style={this.semanticStyle('item', { item })}
                          onClick={() => this.onTabChange(item.tag)}
                        >
                          <span
                            class={[
                              this.ns.be('more-dropdown-popper', 'label'),
                            ]}
                          >
                            <span
                              class={[
                                this.ns.em('item', 'caption'),
                                this.ns.bem(
                                  'more-dropdown-popper',
                                  'label',
                                  'text',
                                ),
                              ]}
                              title={showTitle(item.caption || '')}
                            >
                              {item.caption || ''}
                            </span>
                            {item.counterId &&
                              this.counterData[item.counterId] != null && (
                                <iBizBadge
                                  class={[
                                    this.ns.bem(
                                      'more-dropdown-popper',
                                      'label',
                                      'counter',
                                    ),
                                    this.ns.em('item', 'counter'),
                                    this.semanticClass('item.counter', {
                                      item,
                                      counter: this.counterData,
                                    }),
                                  ]}
                                  style={this.semanticStyle('item.counter', {
                                    item,
                                    counter: this.counterData,
                                  })}
                                  value={this.counterData[item.counterId]}
                                  counterMode={item.counterMode}
                                />
                              )}
                          </span>
                        </el-dropdown-item>
                      );
                    });
                  },
                }}
              </el-dropdown-menu>
            );
          },
        }}
      </el-dropdown>
    );
    return (
      <iBizControlBase
        ref='controlRef'
        controller={this.c}
        class={[
          this.ns.b(),
          this.semanticClass('root'),
          this.moreItems.length > 0 ? this.ns.b('more') : '',
        ]}
        style={this.semanticStyle('root')}
      >
        {isCreated &&
        isCalculatedPermission &&
        this.tabPosition === 'top_dropdownlist' ? (
          this.renderDropdownList()
        ) : (
          <el-tabs
            tabPosition={this.tabPosition}
            v-model={this.c.state.activeName}
            onTabChange={this.handleTabChange}
            style={this.semanticStyle('content')}
            class={[this.ns.e('content'), this.semanticClass('content')]}
          >
            {this.visibleItems.map((tab: IDRTabPagesState) => {
              const counterNum = tab.counterId
                ? this.counterData[tab.counterId]
                : undefined;
              if (!tab.hidden) {
                return (
                  <el-tab-pane
                    class={this.ns.e('tab-item')}
                    label={tab.caption + counterNum}
                    disabled={tab.disabled}
                    name={tab.tag}
                  >
                    {{
                      label: (): JSX.Element => {
                        return (
                          <span
                            class={[
                              this.ns.b('label'),
                              this.ns.e('item'),
                              this.semanticClass('item', { item: tab }),
                            ]}
                            style={this.semanticStyle('item', { item: tab })}
                          >
                            {tab.sysImage && (
                              <iBizIcon
                                class={[
                                  this.ns.be('label', 'icon'),
                                  this.ns.em('item', 'icon'),
                                  this.semanticClass('item.icon', {
                                    item: tab,
                                  }),
                                ]}
                                style={this.semanticStyle('item.icon', {
                                  item: tab,
                                })}
                                icon={tab.sysImage}
                              />
                            )}
                            <span
                              class={[
                                this.ns.be('label', 'text'),
                                this.ns.em('item', 'caption'),
                                this.semanticClass('item.caption', {
                                  item: tab,
                                }),
                              ]}
                              style={this.semanticStyle('item.caption', {
                                item: tab,
                              })}
                            >
                              {tab.caption}
                            </span>
                            {!isNil(counterNum) && (
                              <iBizBadge
                                class={[
                                  this.ns.e('counter'),
                                  this.ns.em('item', 'counter'),
                                  this.semanticClass('item.counter', {
                                    item: tab,
                                    counter: this.counterData,
                                  }),
                                ]}
                                style={this.semanticStyle('item.counter', {
                                  item: tab,
                                  counter: this.counterData,
                                })}
                                value={counterNum}
                                counterMode={tab.counterMode}
                              />
                            )}
                          </span>
                        );
                      },
                    }}
                  </el-tab-pane>
                );
              }
              return null;
            })}
            {this.moreItems.length > 0 && (
              <el-tab-pane label='' name={moreTab.tag}>
                {{
                  label: () => more,
                }}
              </el-tab-pane>
            )}
          </el-tabs>
        )}
      </iBizControlBase>
    );
  },
});
