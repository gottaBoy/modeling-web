import { h, VNode, PropType, defineComponent, resolveComponent } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import { IDEFormDetail } from '@ibiz/model-core';
import {
  IModal,
  ScriptFactory,
  SearchFormController,
  filterPresetAttrs,
  findChildFormDetails,
} from '@ibiz-template/runtime';
import './advance-search.scss';

export const AdvanceSearch = defineComponent({
  name: 'IBizAdvanceSearch',
  props: {
    controller: {
      type: Object as PropType<SearchFormController>,
      required: true,
    },
    modal: { type: Object as PropType<IModal> },
  },
  setup(props) {
    const ns = useNamespace('advance-search');
    const c = props.controller;

    /**
     * 绘制成员的attrs
     * @param {IDEFormDetail} model
     * @return {*}  {IParams}
     */
    const renderAttrs = (model: IDEFormDetail): IParams => {
      const attrs: IParams = {};
      filterPresetAttrs(model.controlAttributes).forEach(item => {
        if (item.attrName && item.attrValue) {
          attrs[item.attrName!] = ScriptFactory.execSingleLine(
            item.attrValue!,
            {
              ...c.getEventArgs(),
              data: c.data,
            },
          );
        }
      });
      return attrs;
    };

    /**
     * 按照类型绘制表单成员
     * @param {IDEFormDetail} detail
     * @return {*}  {(VNode | VNode[] | undefined)}
     */
    const renderByDetailType = (
      detail: IDEFormDetail,
    ): VNode | VNode[] | undefined => {
      const { hidden, userTag } = detail as IParams;
      // 根据用户标记判断表单项是否为常驻项，必须要启用高级搜索
      if (hidden || userTag === 'permanent') return;
      const detailId = detail.id!;
      // 子插槽
      const childSlots: IData = {};
      const childDetails = findChildFormDetails(detail);
      if (childDetails.length) {
        // 容器成员绘制子成员
        childSlots.default = (): (VNode[] | VNode | undefined)[] =>
          childDetails.map(child => {
            return renderByDetailType(child);
          });
      }
      // 根据适配器绘制表单成员
      const provider = c.providers[detailId];
      if (!provider) {
        return (
          <div>
            {ibiz.i18n.t('control.form.noSupportDetailType', {
              detailType: detail.detailType,
            })}
          </div>
        );
      }
      const component = resolveComponent(provider.component) as string;
      return h(
        component,
        {
          modelData: detail,
          controller: c.details[detailId],
          key: detail.id,
          attrs: renderAttrs(detail),
        },
        childSlots,
      );
    };

    return {
      ns,
      renderByDetailType,
    };
  },
  render() {
    return (
      <div class={this.ns.b()}>
        <div class={this.ns.e('header')}>
          <span>{ibiz.i18n.t('app.advanceSearch')}</span>
        </div>
        <div class={this.ns.e('search-form')}>
          <iBizFormPage
            modelData={this.controller.model}
            controller={this.controller}
          >
            {this.controller.model.deformPages?.map(page => {
              return this.renderByDetailType(page);
            })}
          </iBizFormPage>
        </div>
        <div class={this.ns.e('footer')}>
          <el-button type='primary' onClick={() => this.controller.search()}>
            {ibiz.i18n.t('app.search')}
          </el-button>
          <el-button type='primary' onClick={() => this.controller.reset()}>
            {ibiz.i18n.t('app.reset')}
          </el-button>
        </div>
      </div>
    );
  },
});
