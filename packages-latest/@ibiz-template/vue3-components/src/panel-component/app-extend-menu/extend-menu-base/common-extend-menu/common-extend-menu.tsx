/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { defineComponent, PropType } from 'vue';
import { IAppMenuItem, ILayout } from '@ibiz/model-core';
import { IAppMenuItemProvider } from '@ibiz-template/runtime';
import { useNamespace } from '@ibiz-template/vue3-util';
import './common-extend-menu.scss';
import { ExtendButtonMenu } from '../extend-button-menu/extend-button-menu';
import { ExtendStandardMenu } from '../extend-standard-menu/extend-standard-menu';

/**
 * 扩展基础菜单
 * @primary
 * @description 首页视图扩展基础菜单,通过菜单方向和菜单布局模式决定菜单整体呈现，菜单布局容器模型决定菜单内部呈现（若无值需根据方向做缺省处理）
 * @primary
 */
export const CommonExtendMenu = defineComponent({
  name: 'IBizCommonExtendMenu',
  components: {
    ExtendButtonMenu,
    ExtendStandardMenu,
  },
  props: {
    /**
     * @description 绘制模式，'BUTTON' | 'MENU': 按钮态(仅识别一层) | 常规菜单态
     */
    renderMode: {
      type: String as PropType<'BUTTON' | 'MENU'>,
      required: true,
    },
    /**
     * @description 菜单项数据
     */
    items: {
      type: Object as PropType<IAppMenuItem[]>,
      required: true,
    },
    /**
     * @description 菜单项权限数据
     */
    menuItemsState: {
      type: Object as PropType<{
        [p: string]: { visible: boolean; permitted: boolean };
      }>,
      required: true,
    },
    /**
     * @description 菜单项适配器集合
     */
    providers: {
      type: Object as PropType<{ [key: string]: IAppMenuItemProvider }>,
      required: true,
    },
    /**
     * @description 菜单方向
     */
    position: {
      type: String as PropType<'LEFT' | 'RIGHT' | 'TOP' | 'BOTTOM'>,
      required: true,
    },
    /**
     * @description 菜单布局模式,现阶段仅需识别FLEX（flex布局）和BORDER（边缘布局）
     */
    layoutMode: {
      type: String as PropType<
        'TABLE' | 'TABLE_12COL' | 'TABLE_24COL' | 'FLEX' | 'BORDER' | 'ABSOLUTE'
      >,
      default: 'FLEX',
    },
    /**
     * @description 菜单布局容器模型（按钮形态才识别）
     */
    layout: {
      type: Object as PropType<ILayout>,
    },
  },
  emits: {
    /**
     * @description 项点击事件
     */
    menuItemClick: (item: IAppMenuItem, event: MouseEvent) => true,
  },
  setup(props, { emit }) {
    const ns = useNamespace('common-extend-menu');

    const handleMenuItemClick = (
      menuItem: IAppMenuItem,
      event?: MouseEvent,
    ) => {
      if (!menuItem || menuItem?.itemType === 'RAWITEM') {
        return;
      }
      emit('menuItemClick', menuItem, event!);
    };

    return { ns, handleMenuItemClick };
  },
  render() {
    let content = (
      <ExtendButtonMenu
        items={this.items}
        menuItemsState={this.menuItemsState}
        providers={this.providers}
        position={this.position}
        layoutMode={this.layoutMode}
        layout={this.layout}
        onMenuItemClick={this.handleMenuItemClick}
        {...this.$attrs}
      />
    );
    if (this.renderMode?.toLocaleUpperCase() === 'MENU') {
      content = (
        <ExtendStandardMenu
          items={this.items}
          menuItemsState={this.menuItemsState}
          providers={this.providers}
          position={this.position}
          layoutMode={this.layoutMode}
          layout={this.layout}
          onMenuItemClick={this.handleMenuItemClick}
          {...this.$attrs}
        />
      );
    }
    return <div class={this.ns.b()}>{content}</div>;
  },
});
