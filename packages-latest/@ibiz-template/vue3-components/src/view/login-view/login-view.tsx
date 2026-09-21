import {
  defineComponent,
  reactive,
  ref,
  resolveComponent,
  h,
  Ref,
  onMounted,
  computed,
  onUnmounted,
} from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import { useRoute } from 'vue-router';
import { IBizContext, LoginMode } from '@ibiz-template/core';
import qs from 'qs';
import { getAppFuncBlockProvider, IViewConfig } from '@ibiz-template/runtime';
import { useFocusByEnter } from '../../util';
import './login-view.scss';

interface LoginData {
  username: string;
  password: string;
}

export const LoginView = defineComponent({
  setup() {
    const ns = useNamespace('login-view');

    const rules = {
      username: [
        {
          required: true,
          message: ibiz.i18n.t('app.pleaseEnterAccount'),
          trigger: 'blur',
        },
      ],
      password: [
        {
          required: true,
          message: ibiz.i18n.t('app.pleaseEnterPassword'),
          trigger: 'blur',
        },
        {
          type: 'string',
          min: 6,
          message: ibiz.i18n.t('view.loginView.passwordLength'),
          trigger: 'blur',
        },
      ],
    };

    const loginData = reactive<LoginData>({
      username: '',
      password: '',
    });

    const formRef = ref<IData | null>(null);

    const route = useRoute();

    const ru = (route.query.ru as string) || '/';
    const redirect = ru.startsWith('/login') ? '/' : ru;

    const hasLoginView = ref(false);

    const loginView: Ref<null | IViewConfig> = ref(null);

    const viewShell = resolveComponent('IBizViewShell');

    const context = IBizContext.create({});

    const params = {};

    const loading = ref(false);

    const isMounted = ref(false);

    const isRemember = ref(false);

    const isAnonymous = ref(true);

    let appTitle = ibiz.env.AppTitle;

    const getTitle = async () => {
      const app = await ibiz.hub.getAppAsync(ibiz.env.appId);
      const model = app.model;
      // 环境变量中的系统标题权重最大
      if (model.caption && !appTitle) {
        appTitle = model.caption;
      }
    };

    // 是否授权登录失败
    const loginFailed = computed(() => {
      return window.location.href.indexOf('srfthird_auth_success=false') >= 0;
    });

    getTitle();

    // 第三方内嵌授权
    const platform = window.navigator.userAgent.toUpperCase();
    const thirdAuth = () => {
      if (platform.indexOf('DINGTALK') !== -1) {
        ibiz.thirdAuth.auth('DINGTALK', 'EMBED');
      } else if (platform.indexOf('WXWORK') !== -1) {
        ibiz.thirdAuth.auth('WXWORK', 'EMBED');
      }
    };

    // 第一次进入时才会执行一次
    if (!loginFailed.value && ibiz.env.loginMode !== LoginMode.OAUTH) {
      thirdAuth();
    }

    ibiz.appData = undefined;
    ibiz.orgData = undefined;

    const onClick = async () => {
      formRef.value!.validate(async (vaild: boolean) => {
        if (vaild) {
          loading.value = true;
          const appFuncBlockProvider = await getAppFuncBlockProvider();
          await appFuncBlockProvider.login({
            loginname: loginData.username,
            password: loginData.password,
            rememberme: isRemember.value,
          });
          loading.value = false;
        }
      });
    };

    // 支持enter登录
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        onClick();
      }
    };

    const { cleanup } = useFocusByEnter(document, [
      'a',
      'input:not([type="checkbox"])',
      'button',
      'textarea',
      'select',
      '[tabindex]:not([tabindex="-1"])',
    ]);

    onMounted(async () => {
      // 第三方容器环境第一次进入不执行后续逻辑
      const search = qs.parse(window.location.search.replace('?', ''));
      if (loginFailed.value) {
        ibiz.message.error(ibiz.i18n.t('view.loginView.thirdAuthFail'));
      }
      if (
        (platform.indexOf('DINGTALK') !== -1 ||
          platform.indexOf('WXWORK') !== -1) &&
        !loginFailed.value
      ) {
        return;
      }
      if (search.isAnonymous === 'true') {
        const bol = await ibiz.auth.anonymousLogin();
        if (bol === true) {
          window.location.hash = redirect;
          window.location.reload();
        }
      } else {
        try {
          const loginViewConfig =
            await ibiz.hub.config.view.get('AppLoginView');
          if (loginViewConfig) {
            loginView.value = loginViewConfig;
            hasLoginView.value = true;
          }
        } catch (err) {
          ibiz.log.warn(err);
        }
        isAnonymous.value = false;
      }
      ibiz.util.hiddenAppLoading();
      isMounted.value = true;
    });

    onUnmounted(() => {
      cleanup();
    });

    return () => {
      if (isMounted.value && isAnonymous.value === false) {
        return hasLoginView.value ? (
          h(viewShell, {
            context,
            params,
            viewId: loginView.value!.id,
          })
        ) : (
          <div class={ns.b()}>
            <div class={ns.b('box')}>
              <header class={ns.b('box-header')}>
                <img src='./assets/images/login-header.png' />
                <span class={ns.b('box-header-title')}>{appTitle}</span>
              </header>
              <main class={ns.b('box-main')}>
                <img
                  class={ns.be('box-main', 'avatar')}
                  src='./assets/images/login-avatar.png'
                />
                <div class={ns.b('box-main-content')}>
                  <el-form model={loginData} rules={rules} ref={formRef}>
                    <el-form-item size='large' prop='username'>
                      <el-input
                        v-model={loginData.username}
                        clearable
                        placeholder={ibiz.i18n.t('app.pleaseEnterAccount')}
                      >
                        {{
                          prefix: () => <ion-icon name='person'></ion-icon>,
                        }}
                      </el-input>
                    </el-form-item>
                    <el-form-item size='large' prop='password'>
                      <el-input
                        type='password'
                        v-model={loginData.password}
                        show-password
                        placeholder={ibiz.i18n.t('app.pleaseEnterPassword')}
                      >
                        {{
                          prefix: () => <ion-icon name='unlock-alt'></ion-icon>,
                        }}
                      </el-input>
                    </el-form-item>
                    <el-checkbox
                      v-model={isRemember.value}
                      label={ibiz.i18n.t('app.rememberMe')}
                    />
                    <el-form-item size='large'>
                      <el-button
                        type='primary'
                        onClick={onClick}
                        size='large'
                        round
                        loading={loading.value}
                        onKeyup={(e: KeyboardEvent) => onKeyUp(e)}
                      >
                        {ibiz.i18n.t('view.loginView.login')}
                      </el-button>
                    </el-form-item>
                  </el-form>
                </div>
              </main>
            </div>
          </div>
        );
      }
      return null;
    };
  },
});
