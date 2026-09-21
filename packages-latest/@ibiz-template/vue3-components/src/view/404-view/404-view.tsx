import { useNamespace } from '@ibiz-template/vue3-util';
import { computed, defineComponent, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import './404-view.scss';

export const View404 = defineComponent({
  name: 'IBizView404',
  setup() {
    const ns = useNamespace('404-view');
    const router = useRouter();
    const route = useRoute();
    const gotoIndexView = async () => {
      await router.push('/');
      window.location.reload();
    };

    onMounted(() => ibiz.util.hiddenAppLoading());

    const isTop = computed(() => {
      return route && !route.params.view1;
    });

    return { ns, isTop, gotoIndexView };
  },
  render() {
    return (
      <div class={[this.ns.b(), this.ns.is('top', this.isTop)]}>
        <img
          class={this.ns.b('img')}
          src={`${ibiz.env.assetsUrl}/images/404.png`}
        />
        <div class={this.ns.b('text')}>
          <div class={this.ns.be('text', 'text1')}>
            {ibiz.i18n.t('view.noResourcesView.noResourcePrompt')}
          </div>
          {this.isTop ? (
            <div class={this.ns.be('text', 'text2')}>
              {ibiz.i18n.t('view.noResourcesView.resourceNoExist')}
              <a onClick={this.gotoIndexView}>
                {ibiz.i18n.t('view.common.backHomepage')}
              </a>
              {ibiz.i18n.t('view.common.continueBrowsing')}
            </div>
          ) : null}
        </div>
      </div>
    );
  },
});
