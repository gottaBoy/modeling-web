import { computed, defineComponent, PropType } from 'vue';
import { useNamespace, useSemanticNode } from '@ibiz-template/vue3-util';
import { IPanelRawItem } from '@ibiz/model-core';
import { showTitle } from '@ibiz-template/core';
import { AuthCaptchaController } from './auth-captcha.controller';
import './auth-captcha.scss';

/**
 * 人机识别控件
 * @description 登录视图使用，主要是用来加载验证码图片并要求用户输入验证码。
 * @primary
 */
export const AuthCaptcha = defineComponent({
  name: 'IBizAuthCaptcha',
  props: {
    /**
     * @description 人机识别控件模型数据
     */
    modelData: {
      type: Object as PropType<IPanelRawItem>,
      required: true,
    },
    /**
     * @description 人机识别控件控制器
     */
    controller: {
      type: AuthCaptchaController,
      required: true,
    },
  },
  setup(props) {
    const ns = useNamespace('auth-captcha');
    const c = props.controller;
    const { semanticClass, semanticStyle } = useSemanticNode(c);

    /**
     * 类名
     */
    const classArr = computed(() => {
      let result: Array<string | false> = [ns.b(), ns.m(c.model.id)];
      result = [
        ...result,
        ...props.controller.containerClass,
        ns.is('hidden', !props.controller.state.visible),
        ns.is('error', !!c.state.error),
      ];
      return result;
    });

    /**
     * 图片点击
     */
    const onClick = () => {
      if (!c.state.loading) {
        c.loadCaptcha();
      }
    };

    const onChange = () => {
      c.onChange();
      c.validate();
    };

    return {
      c,
      ns,
      classArr,
      onClick,
      onChange,
      semanticClass,
      semanticStyle,
    };
  },
  render() {
    return (
      <div
        class={[this.classArr, this.semanticClass('root')]}
        style={this.semanticStyle('root')}
      >
        <el-input
          v-model={this.c.state.code}
          class={[this.ns.e('captcha'), this.semanticClass('input')]}
          style={this.semanticStyle('input')}
          onInput={this.onChange}
          onBlur={this.onChange}
          placeholder={ibiz.i18n.t('panelComponent.authCaptcha.captcha')}
        />
        <el-image
          v-loading={this.c.state.loading}
          src={this.c.state.image}
          class={[this.ns.e('image'), this.semanticClass('image')]}
          style={this.semanticStyle('image')}
          onClick={this.onClick}
          title={showTitle(ibiz.i18n.t('panelComponent.authCaptcha.refresh'))}
        >
          {{
            error: () => {
              return (
                <div
                  onClick={this.onClick}
                  class={[
                    this.ns.em('image', 'hint'),
                    this.ns.is('loading', this.c.state.loading),
                  ]}
                >
                  {this.c.state.loading
                    ? ibiz.i18n.t('panelComponent.authCaptcha.loading')
                    : ibiz.i18n.t('panelComponent.authCaptcha.loadFailed')}
                </div>
              );
            },
          }}
        </el-image>
        {this.c.state.error && (
          <div
            class={[this.ns.e('error'), this.semanticClass('error')]}
            style={this.semanticStyle('error')}
          >
            {this.c.state.error}
          </div>
        )}
      </div>
    );
  },
});
