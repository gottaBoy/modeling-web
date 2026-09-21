import { Ref, defineComponent, onMounted, ref } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import { useRoute } from 'vue-router';
import './share-view.scss';

export const ShareView = defineComponent({
  setup() {
    const ns = useNamespace('share-view');

    const route = useRoute();

    const loading = ref(false);

    const isMounted = ref(false);

    const shareUser: Ref<IData> = ref({});

    let shareTheme: IData = {};

    let shareThemeId = '';

    const getShareTheme = async () => {
      const { userId } = shareUser.value;
      shareTheme = await ibiz.util.theme.getShareTheme(userId, shareThemeId);
      if (shareTheme) {
        ibiz.util.theme.previewCustomTheme(
          shareTheme.themeTag,
          shareTheme.themeVars,
        );
      }
    };

    onMounted(async () => {
      const params: IData = route.query;
      shareThemeId = window.atob(params.shareThemeId);
      shareUser.value = {
        userId: params.shareUserId,
        userName: params.shareUserName,
      };
      ibiz.util.hiddenAppLoading();
      await ibiz.util.theme.initCustomTheme(false);
      await getShareTheme();
      isMounted.value = true;
    });

    const handleApply = async () => {
      // await ibiz.util.theme.saveCustomTheme(
      //   shareTheme.themeTag,
      //   shareTheme.themeVars,
      // );
      // router.push('/');
    };

    const handleCancel = () => {
      // ibiz.util.theme.resetCustomTheme();
      // router.push('/');
    };

    return { ns, loading, isMounted, shareUser, handleApply, handleCancel };
  },
  render() {
    if (!this.isMounted) {
      return;
    }
    return (
      <div class={this.ns.b()}>
        <div class={this.ns.b('box')}>
          <header class={this.ns.b('box-header')}>
            <img src='./assets/images/login-header.png' />
            <div class={this.ns.b('box-header-title')}>
              <div>{this.shareUser.userName}</div>
              {ibiz.i18n.t('view.shareView.inviting')}
            </div>
          </header>
          <main class={this.ns.b('box-main')}>
            <div class={this.ns.b('box-main-content')}>
              <el-button
                onClick={this.handleApply}
                size='large'
                round
                loading={this.loading}
              >
                {ibiz.i18n.t('view.shareView.use')}
              </el-button>
              <el-button onClick={this.handleCancel} size='large' round>
                {ibiz.i18n.t('view.shareView.cancel')}
              </el-button>
            </div>
          </main>
        </div>
      </div>
    );
  },
});
