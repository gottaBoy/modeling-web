import { watch, PropType, onUnmounted, defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import { IPanelRawItem } from '@ibiz/model-core';
import { AuthWxmpQrcodeController } from './auth-wxmp-qrcode.controller';
import { useNamespace, useSemanticNode } from '../../use';
import './auth-wxmp-qrcode.scss';

/**
 * 微信二维码
 * @primary
 * @description 用于在微信环境加载二维码并登录，需在面板项中配置预定义类型为AUTH_WXMP_QRCODE。
 * @panelitemparams {name:pollingtime,parameterType:number,defaultvalue:2,description:登录轮询时间（秒）}
 * @param {*} props
 * @return {*}
 */
export const AuthWxmpQrcode = defineComponent({
  name: 'IBizAuthWxmpQrcode',
  props: {
    /**
     * @description 微信二维码模型
     */
    modelData: {
      type: Object as PropType<IPanelRawItem>,
      required: true,
    },
    /**
     * @description 微信二维码控制器
     */
    controller: {
      type: Object as PropType<AuthWxmpQrcodeController>,
      required: true,
    },
  },
  setup(props) {
    const ns = useNamespace('auth-wxmp-qrcode');
    const { state } = props.controller;
    const route = useRoute();
    props.controller.setRouter(route);
    const { semanticClass, semanticStyle } = useSemanticNode(props.controller);

    /**
     * 加载二维码
     *
     * @return {*}  {Promise<void>}
     */
    const loadQrcode = async (): Promise<void> => {
      await props.controller.loadQrcode();
    };

    watch(
      () => state.visible,
      () => {
        // 不保活时直接刷新，保活时超时刷新
        if (
          state.visible &&
          ((state.keepAlive && !state.qrcode?.expirein) || !state.keepAlive)
        ) {
          loadQrcode();
        }
      },
      {
        immediate: true,
      },
    );

    onUnmounted(() => {
      props.controller.destroy();
    });

    return { ns, loadQrcode, semanticClass, semanticStyle };
  },
  render() {
    return (
      <div
        class={[this.ns.b(), this.semanticClass('root')]}
        style={this.semanticStyle('root')}
      >
        <div class={this.ns.e('content')}>
          {this.controller.state.qrcode && (
            <img
              class={[this.ns.e('qrcode'), this.semanticClass('content')]}
              style={this.semanticStyle('content')}
              src={this.controller.state.qrcode?.url}
            ></img>
          )}
          {!this.controller.state.qrcode?.expirein && (
            <div
              class={[this.ns.e('mask'), this.semanticClass('mask')]}
              style={this.semanticStyle('mask')}
            >
              <ion-icon
                title={ibiz.i18n.t('vue3Util.panelComponent.refresh')}
                name='reload-outline'
                onClick={this.loadQrcode}
                class={this.ns.em('mask', 'icon')}
              ></ion-icon>
            </div>
          )}
        </div>
        <div
          class={[this.ns.e('caption'), this.semanticClass('caption')]}
          style={this.semanticStyle('caption')}
        >
          {this.controller.state.tips}
        </div>
      </div>
    );
  },
});
