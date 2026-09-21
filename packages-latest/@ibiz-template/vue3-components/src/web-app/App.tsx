import {
  watch,
  onMounted,
  onUnmounted,
  defineComponent,
  onBeforeUnmount,
} from 'vue';
import { Modal, ViewMode } from '@ibiz-template/runtime';
import { AppHooks, route2routePath } from '@ibiz-template/vue3-util';
import { useRoute } from 'vue-router';
import { startAdaptiveScreenWidth } from './adaptive-screen-width';
import './App.scss';

export default defineComponent({
  setup() {
    const route = useRoute();

    watch(
      () => route.fullPath,
      () => {
        const { appContext } = route2routePath(route);
        const srflang = appContext?.srflang;
        const lang = ibiz.i18n.getLang();
        if (srflang && srflang !== lang) {
          localStorage.setItem('language', srflang);
          window.location.reload();
        }
      },
    );

    const modal = new Modal({
      mode: ViewMode.ROUTE,
      viewUsage: 1,
      routeDepth: 1,
    });

    const destroyAppHub = () => {
      // 销毁应用基座
      ibiz.hub.destroy();
    };

    const stopAdaptiveScreenWidth = startAdaptiveScreenWidth();

    // 水印销毁方法
    let watermarkDestroy: void | null | (() => void);
    onMounted(() => {
      AppHooks.initedApp.tapPromise(async ({ context }) => {
        watermarkDestroy?.();
        // 挂载应用水印，默认将水印挂载到body下
        watermarkDestroy = ibiz.util.watermark.mount(
          ibiz.config.watermark,
          undefined,
          { ...context, ...ibiz.appData?.context } as IContext,
        );
      });
    });

    onBeforeUnmount(() => {
      watermarkDestroy?.();
    });

    // 页面卸载
    onUnmounted(() => {
      stopAdaptiveScreenWidth();

      destroyAppHub();
      AppHooks.destoryApp.call(null);
    });

    return { modal };
  },
  render() {
    return <router-view modal={this.modal} />;
  },
});
