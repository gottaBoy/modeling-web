/* eslint-disable vue/no-mutating-props */
import { useNamespace, useSemanticNode } from '@ibiz-template/vue3-util';
import { defineComponent, h, PropType } from 'vue';
import { IDBFilterPortletPart } from '@ibiz/model-core';
import {
  FilterPortletController,
  IFilterNode,
  IFilterNodeField,
  IFilterNodeGroup,
} from '@ibiz-template/runtime';
import { FilterPortletItem } from './filter-portlet-item/filter-portlet-item';
import './filter-portlet.scss';

export const FilterPortlet = defineComponent({
  name: 'IBizFilterPortlet',
  props: {
    modelData: {
      type: Object as PropType<IDBFilterPortletPart>,
      required: true,
    },
    controller: {
      type: FilterPortletController,
      required: true,
    },
  },
  setup(props) {
    const c = props.controller;
    const ns = useNamespace(
      `portlet-${props.modelData.portletType?.toLowerCase()}`,
    );
    const { semanticClass, semanticStyle } = useSemanticNode(
      props.controller.dashboard,
    );

    // 重置
    const handleReset = () => {
      c.resetFilter();
    };

    // 查询
    const handleSearch = () => {
      c.search();
    };

    /**
     * 绘制项
     *
     * @author tony001
     * @date 2024-07-25 17:07:03
     * @param {IData} field
     * @return {*}
     */
    const renderFilterItem = (filterNode: IFilterNodeField, index: number) => {
      const field = c.jsonSchemaFields.find(
        x => x.appDEFieldId === filterNode.field,
      );
      if (field) {
        return h(FilterPortletItem, {
          field,
          filterNode,
          context: c.context,
          params: c.params,
          onChange: (data: IFilterNodeField) => {
            (c.state.filterNode as IFilterNodeGroup).children[index] = data;
          },
        });
      }
    };

    const renderFilter = () => {
      if (!c.state.filterNode) {
        return;
      }
      const children: IFilterNode[] =
        (c.state.filterNode as IFilterNodeGroup).children || [];
      return children.map((node: IFilterNode, index: number) => {
        return renderFilterItem(node as IFilterNodeField, index);
      });
    };

    return {
      ns,
      handleReset,
      handleSearch,
      renderFilter,
      semanticClass,
      semanticStyle,
    };
  },

  render() {
    const classArr: string[] = [
      this.ns.b(),
      this.ns.m(this.modelData.codeName),
      ...this.controller.containerClass,
    ];
    return (
      <iBizPortletLayout controller={this.controller} class={classArr}>
        <div
          class={this.semanticClass('portlet.filter', {
            filter: this.controller,
          })}
          style={this.semanticStyle('portlet.filter', {
            filter: this.controller,
          })}
        >
          <div class={this.ns.e('left')}>{this.renderFilter()}</div>
          <div class={this.ns.e('right')}>
            <el-button onClick={this.handleReset}>
              {ibiz.i18n.t('app.reset')}
            </el-button>
            <el-button onClick={this.handleSearch}>
              {ibiz.i18n.t('app.search')}
            </el-button>
          </div>
        </div>
      </iBizPortletLayout>
    );
  },
});
