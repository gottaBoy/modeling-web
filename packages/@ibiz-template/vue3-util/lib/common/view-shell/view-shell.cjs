'use strict';

var vue = require('vue');
var runtime = require('@ibiz-template/runtime');
var core = require('@ibiz-template/core');
var qxUtil = require('qx-util');
var ramda = require('ramda');
require('../../use/index.cjs');
require('./view-shell.css');
var namespace = require('../../use/namespace/namespace.cjs');

"use strict";
const IBizViewShell = /* @__PURE__ */ vue.defineComponent({
  name: "IBizViewShell",
  props: {
    context: {
      type: Object,
      required: true
    },
    params: {
      type: Object
    },
    modelData: {
      type: Object
    },
    viewId: {
      type: String
    }
  },
  setup(props, {
    attrs
  }) {
    const ns = namespace.useNamespace("view-shell");
    const isComplete = vue.ref(false);
    const errMsg = vue.ref("");
    const provider = vue.ref();
    const viewModelData = vue.ref();
    const hasAuthority = vue.ref(true);
    const context = vue.ref(props.context);
    const params = vue.ref(props.params || {});
    let dynaViewCacheKey = "";
    vue.watch(() => ({
      context: props.context,
      params: props.params
    }), (newVal) => {
      context.value = newVal.context;
      params.value = newVal.params ? newVal.params : {};
    });
    const checkViewAuthority = async (viewModel2) => {
      let checkResult = true;
      const {
        accUserMode,
        accessKey
      } = viewModel2;
      const authInfo = ibiz.auth.getAuthInfo();
      if (accUserMode !== void 0) {
        switch (accUserMode) {
          case 1:
            if (authInfo) {
              checkResult = false;
            }
            break;
          case 2:
            if (!authInfo) {
              checkResult = false;
            }
            break;
          case 4:
            if (accessKey) {
              const app = await ibiz.hub.getApp(context.value.srfappid);
              const permitted = app.authority.calcByResCode(accessKey);
              if (!permitted) {
                checkResult = false;
              }
            }
            break;
          default:
            break;
        }
      }
      return checkResult;
    };
    let viewModel;
    const getDynaViewCacheKey = (args) => {
      const copyArgs = ramda.clone(args);
      if (copyArgs.srfdatatype) {
        delete copyArgs.srfdatatype;
      }
      return JSON.stringify(copyArgs);
    };
    const initViewModel = async () => {
      if (props.modelData) {
        viewModel = props.modelData;
      } else {
        viewModel = await ibiz.hub.getAppView(props.viewId);
      }
    };
    const init = async () => {
      try {
        await initViewModel();
        if (!viewModel) {
          throw new core.RuntimeError(ibiz.i18n.t("vue3Util.common.noFoundViewModel"));
        }
        hasAuthority.value = await checkViewAuthority(viewModel);
        if (!hasAuthority.value) {
          return;
        }
        if (viewModel.dynaSysMode === 1) {
          const appDataEntityId = viewModel.appDataEntityId;
          if (!appDataEntityId) {
            throw new core.RuntimeError(ibiz.i18n.t("vue3Util.common.noSupportLoadingDynamic", {
              codeName: viewModel.codeName
            }));
          }
          const loadModelParams = await runtime.calcDynaSysParams(appDataEntityId, context.value, {
            viewParams: params.value,
            appId: viewModel.appId
          });
          if (params.value.srfdatatype) {
            loadModelParams.srfdatatype = params.value.srfdatatype;
          }
          if (params.value.srfwftag) {
            loadModelParams.srfwftag = params.value.srfwftag;
          } else if (appDataEntityId && viewModel.enableWF) {
            if (loadModelParams.srfkey) {
              const noSrfSessionId = ramda.isNil(context.value.srfsessionid) || ramda.isEmpty(context.value.srfsessionid);
              const id = qxUtil.createUUID();
              if (noSrfSessionId) {
                const domain = ibiz.uiDomainManager.create(id);
                context.value.srfsessionid = domain.id;
              }
              const app = ibiz.hub.getApp(viewModel.appId);
              const service = await app.deService.getService(context.value, appDataEntityId);
              const res = await service.get(context.value, params.value || {});
              if (res.ok && res.data) {
                const {
                  srfwftag,
                  processdefinitionkey,
                  taskdefinitionkey
                } = res.data;
                if (srfwftag) {
                  loadModelParams.srfwftag = srfwftag;
                }
                if (["DEWFDYNAEDITVIEW3", "DEWFDYNAEDITVIEW"].includes(viewModel.viewType)) {
                  if (ramda.isNil(params.value.processDefinitionKey)) {
                    params.value.processDefinitionKey = processdefinitionkey;
                  }
                  if (ramda.isNil(params.value.taskDefinitionKey)) {
                    params.value.taskDefinitionKey = taskdefinitionkey;
                  }
                }
              }
              if (noSrfSessionId) {
                ibiz.uiDomainManager.destroy(id);
                context.value.srfsessionid = "";
              }
            }
          }
          const curDynaViewCacheKey = getDynaViewCacheKey(loadModelParams);
          if (curDynaViewCacheKey === dynaViewCacheKey) {
            setTimeout(() => {
              isComplete.value = true;
            });
            return;
          }
          viewModelData.value = await ibiz.hub.loadAppView(viewModel.appId, viewModel.id, loadModelParams);
          dynaViewCacheKey = getDynaViewCacheKey(loadModelParams);
        } else {
          viewModelData.value = viewModel;
        }
        provider.value = await runtime.getViewProvider(viewModel);
      } catch (error) {
        ibiz.log.error(error);
        errMsg.value = error.message;
      } finally {
        isComplete.value = true;
      }
    };
    init();
    const redrawView = async (event) => {
      isComplete.value = false;
      const {
        redrawData
      } = event;
      const {
        isReloadModel
      } = redrawData;
      Object.assign(context.value, redrawData.context);
      Object.assign(params.value, redrawData.params);
      const modal = attrs.modal;
      if (modal) {
        modal.hooks.shouldDismiss.clear();
        modal.hooks.beforeDismiss.clear();
      }
      if (isReloadModel) {
        await init();
      } else {
        setTimeout(() => {
          isComplete.value = true;
        });
      }
    };
    return {
      ns,
      errMsg,
      provider,
      isComplete,
      hasAuthority,
      viewModelData,
      redrawView,
      curContext: context,
      curParams: params
    };
  },
  render() {
    if (this.isComplete && this.provider && this.hasAuthority) {
      return vue.h(vue.resolveComponent(this.provider.component), {
        context: this.curContext,
        params: this.curParams,
        modelData: ramda.clone(this.viewModelData),
        ...this.$attrs,
        provider: this.provider,
        onRedrawView: this.redrawView
      }, this.$slots);
    }
    if (!this.hasAuthority) {
      const provider = runtime.getErrorViewProvider("403");
      if (provider) {
        if (typeof provider.component === "string") {
          return vue.h(vue.resolveComponent(provider.component));
        }
        return vue.h(provider.component);
      }
    }
    return vue.withDirectives(vue.createVNode("div", {
      "class": this.ns.b()
    }, [this.isComplete ? this.errMsg : null]), [[vue.resolveDirective("loading"), !this.isComplete]]);
  }
});

exports.IBizViewShell = IBizViewShell;
