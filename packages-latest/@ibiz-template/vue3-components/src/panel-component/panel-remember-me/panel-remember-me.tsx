import { useNamespace, useSemanticNode } from '@ibiz-template/vue3-util';
import { IPanelContainer } from '@ibiz/model-core';
import { computed, defineComponent, PropType } from 'vue';
import { PanelRememberMeController } from './panel-remember-me.controller';

/**
 * 记住密码
 * @primary
 * @description 登录视图记住密码选项框，勾选后会延长token存储时间。
 */
export const PanelRememberMe = defineComponent({
  name: 'IBizPanelRememberMe',
  props: {
    /**
     * @description 记住我控件模型数据
     */
    modelData: {
      type: Object as PropType<IPanelContainer>,
      required: true,
    },
    /**
     * @description 记住我控件控制器
     */
    controller: {
      type: PanelRememberMeController,
      required: true,
    },
  },
  setup(props) {
    const ns = useNamespace('panel-remember-me');
    const { id } = props.modelData;

    const c = props.controller;
    const { semanticClass, semanticStyle } = useSemanticNode(c);

    // 类名控制
    const classArr = computed(() => {
      let result: Array<string | false> = [ns.b(), ns.m(id)];
      result = [
        ...result,
        ...props.controller.containerClass,
        ns.is('hidden', !props.controller.state.visible),
      ];
      return result;
    });

    // 子类类名透传
    const childClass = [
      {
        class: semanticClass('icon'),
        selector: '.el-checkbox__input',
      },
      {
        class: semanticClass('caption'),
        selector: '.el-checkbox__label',
      },
    ];

    // 子类样式透传
    const childStyle = [
      {
        style: semanticStyle('icon'),
        selector: '.el-checkbox__input',
      },
      {
        style: semanticStyle('caption'),
        selector: '.el-checkbox__label',
      },
    ];

    // 是否记住我
    const isRemember = computed({
      get: () => c.panel.state.data.isRemember,
      set: (val: boolean) => {
        c.panel.state.data.isRemember = val;
      },
    });

    return {
      ns,
      classArr,
      c,
      isRemember,
      semanticClass,
      semanticStyle,
      childClass,
      childStyle,
    };
  },
  render() {
    return (
      <div
        class={[this.classArr, this.semanticClass('root')]}
        style={this.semanticStyle('root')}
      >
        <el-checkbox
          v-child-class={this.childClass}
          v-child-style={this.childStyle}
          v-model={this.isRemember}
          label={ibiz.i18n.t('app.rememberMe')}
        />
      </div>
    );
  },
});
