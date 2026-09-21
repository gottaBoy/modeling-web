import { IModal, ViewController } from '@ibiz-template/runtime';
import { IAppSubAppRefView } from '@ibiz/model-core';
import { computed, defineComponent, PropType } from 'vue';
import { useNamespace, useViewController } from '@ibiz-template/vue3-util';
import './sub-app-ref-view.scss';

export const SubAppRefView = defineComponent({
  name: 'IBizSubAppRefView',
  props: {
    context: Object as PropType<IContext>,
    params: { type: Object as PropType<IParams>, default: () => ({}) },
    modelData: { type: Object as PropType<IAppSubAppRefView>, required: true },
    modal: { type: Object as PropType<IModal> },
    state: { type: Object as PropType<IData> },
  },
  setup() {
    const ns = useNamespace('sub-app-ref-view');
    const c = useViewController((...args) => new ViewController(...args));

    const { viewType, sysCss, codeName } = c.model;
    const typeClass = viewType!.toLowerCase();
    const sysCssName = sysCss?.cssName;
    const viewClassNames = [
      ns.b(),
      true && ns.b(typeClass),
      true && ns.m(codeName),
      true && sysCssName,
    ];

    const htmlUrl = computed(() => {
      return (
        ibiz.env.marketAddress || (window as IData).Environment.marketAddress
      );
    });

    const handleClick = () => {
      if (htmlUrl.value) {
        window.open(htmlUrl.value, '_blank');
      }
    };

    return { c, ns, viewClassNames, htmlUrl, handleClick };
  },
  render() {
    return (
      <div class={this.viewClassNames}>
        <el-result class={this.ns.b('result')} icon='info'></el-result>
        {this.c.model.caption && (
          <div class={this.ns.b('caption')}>{this.c.model.caption}</div>
        )}
        {this.c.model.subCaption && (
          <div class={this.ns.b('sub-caption')}>{this.c.model.subCaption}</div>
        )}
        {this.htmlUrl && (
          <el-button
            class={this.ns.b('btn')}
            onClick={this.handleClick}
            size='large'
          >
            {this.c.model.title || ibiz.i18n.t('view.subAppRefView.jump')}
          </el-button>
        )}
      </div>
    );
  },
});
