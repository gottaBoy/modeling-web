import { zhCn as zhCn$3 } from '@ibiz-template/runtime';
import { zhCn as zhCn$2 } from '@ibiz-template/vue3-util';
import { zhCn } from '@ibiz-template/model-helper';
import { zhCn as zhCn$1 } from '@ibiz-template/core';

"use strict";
var index = {
  // 应用级
  app: {
    logout: "\u9000\u51FA\u767B\u5F55",
    error: "\u9519\u8BEF",
    success: "\u6210\u529F",
    confirm: "\u786E\u8BA4",
    cancel: "\u53D6\u6D88",
    return: "\u8FD4\u56DE",
    noData: "\u65E0\u6570\u636E",
    refresh: "\u5237\u65B0",
    noSupport: "\u6682\u672A\u652F\u6301",
    add: "\u6DFB\u52A0",
    delete: "\u5220\u9664",
    save: "\u4FDD\u5B58",
    edit: "\u7F16\u8F91",
    complete: "\u5B8C\u6210",
    more: "\u66F4\u591A",
    close: "\u5173\u95ED",
    newlyBuild: "\u65B0\u5EFA",
    reset: "\u91CD\u7F6E",
    search: "\u641C\u7D22",
    advanceSearch: "\u9AD8\u7EA7\u641C\u7D22",
    rememberMe: "\u8BB0\u4F4F\u6211",
    retract: "\u6536\u8D77",
    pleaseEnterAccount: "\u8BF7\u8F93\u5165\u8D26\u53F7",
    pleaseEnterPassword: "\u8BF7\u8F93\u5165\u5BC6\u7801",
    aiError: "\u7CFB\u7EDF\u53D1\u751F\u5F02\u5E38\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5",
    fullscreen: "\u5168\u5C4F",
    cancelFullscreen: "\u53D6\u6D88\u5168\u5C4F",
    tips: "\u63D0\u793A",
    changeLanguage: "\u5207\u6362\u8BED\u8A00\u9700\u8981\u5237\u65B0\u9875\u9762\uFF0C\u786E\u8BA4\u5207\u6362?",
    piece: "\u4E2A"
  },
  // 视图
  view: {
    common: {
      backHomepage: "\u8FD4\u56DE\u9996\u9875",
      continueBrowsing: "\u7EE7\u7EED\u6D4F\u89C8"
    },
    noPermissionView: {
      noPermissionPrompt: "\u62B1\u6B49\uFF0C\u60A8\u6CA1\u6709\u8BBF\u95EE\u8BE5\u9875\u9762\u7684\u6743\u9650",
      noPermission: "\u60A8\u6CA1\u6709\u8BBF\u95EE\u8BE5\u9875\u9762\u7684\u6743\u9650\uFF0C\u8BF7"
    },
    noResourcesView: {
      noResourcePrompt: "\u62B1\u6B49\uFF0C\u60A8\u8BBF\u95EE\u7684\u8D44\u6E90\u4E0D\u5B58\u5728",
      resourceNoExist: "\u60A8\u8981\u627E\u7684\u8D44\u6E90\u4E0D\u5B58\u5728\uFF0C\u8BF7",
      noExistPrompt: "\u5E94\u7528\u89C6\u56FE\u4E0D\u5B58\u5728{code}"
    },
    errorView: {
      noExistPrompt: "\u9519\u8BEF\u89C6\u56FE\u4E0D\u5B58\u5728{code}"
    },
    loginView: {
      passwordLength: "\u5BC6\u7801\u957F\u5EA6\u4E0D\u80FD\u5C11\u4E8E6\u4F4D",
      login: "\u767B\u5F55",
      thirdAuthFail: "\u7B2C\u4E09\u65B9\u767B\u5F55\u6388\u6743\u65F6\u5931\u8D25"
    },
    subAppRefView: {
      jump: "\u8DF3\u8F6C"
    },
    shareView: {
      inviting: "\u9080\u8BF7\u60A8\u52A0\u5165\u4E3B\u9898\u5E94\u7528\uFF01",
      use: "\u5E94\u7528",
      cancel: "\u53D6\u6D88"
    }
  },
  viewEngine: {
    closeRemind: "\u5173\u95ED\u63D0\u9192",
    confirmClosePrompt: "\u8868\u5355\u6570\u636E\u5DF2\u7ECF\u4FEE\u6539\uFF0C\u786E\u5B9A\u8981\u5173\u95ED\uFF1F",
    noExistVersionErr: "\u5F53\u524D\u5DE5\u4F5C\u6D41\u7248\u672C\u4E0D\u5B58\u5728",
    browseMsg: "\u6D4F\u89C8\u4E86",
    editMsg: "\u7F16\u8F91\u4E86",
    updateMsg: "\u66F4\u65B0\u4E86",
    someone: "\u6709\u4EBA",
    refreshPrompt: "\u662F\u5426\u5237\u65B0",
    refreshPagePrompt: "\u6570\u636E\u5DF2\u88AB\u4FEE\u6539\u662F\u5426\u5237\u65B0\u9875\u9762\uFF1F",
    refreshRemind: "\u5237\u65B0\u63D0\u9192",
    confirmRefreshPrompt: "\u8868\u5355\u6570\u636E\u5DF2\u7ECF\u4FEE\u6539\uFF0C\u786E\u5B9A\u8981\u5237\u65B0\uFF1F",
    missingErr: "\u5E94\u7528\u4E0A\u4E0B\u6587\u7F3A\u5C11srfnavctrlid",
    subclassAchieve: "\u5B50\u7C7B\u5B9E\u73B0",
    missingConfigErr: "\u7F3A\u5C11\u914D\u7F6E\u53EBsimplelist\u7684\u5217\u8868\u90E8\u4EF6",
    noFoundLayoutOccupied: "\u672A\u627E\u5230tabexppanel\u5E03\u5C40\u5360\u4F4D",
    noFoundLayoutContainer: "\u672A\u627E\u5230{name}\u5E03\u5C40\u5BB9\u5668",
    noFoundFormModel: "\u627E\u4E0D\u5230\u8868\u5355{name}\u7684\u6A21\u578B",
    missingToolbarModel: "\u7F3A\u5C11\u5DE5\u5177\u680F\u90E8\u4EF6\u6A21\u578B",
    noCollapseTag: "\u672A\u914D\u7F6E\u6298\u53E0\u6807\u8BC6",
    noExpandTag: "\u672A\u914D\u7F6E\u5C55\u5F00\u6807\u8BC6"
  },
  webApp: {
    authGuard: {
      loginFailed: "\u533F\u540D\u7528\u6237\u767B\u5F55\u5931\u8D25",
      noPermission: "\u65E0\u6743\u9650\u8BBF\u95EE\uFF01"
    },
    unauthorizedHandler: {
      noFoundEnvParams: "\u627E\u4E0D\u5230\u73AF\u5883\u53C2\u6570casLoginUrl",
      forbiddenAccess: "\u5F53\u524D\u8D26\u6237\u88AB\u7981\u6B62\u8BBF\u95EE",
      logoutAccount: "\u662F\u5426\u8981\u9000\u51FA\u5F53\u524D\u8D26\u6237\uFF1F"
    }
  },
  // 部件
  control: {
    common: {
      determine: "\u786E\u5B9A",
      retreat: "\u540E\u9000",
      forward: "\u524D\u8FDB",
      noSupportItem: "{name}\u6682\u672A\u652F\u6301",
      noFoundNode: "\u6CA1\u6709\u627E\u5230_uuid\u4E3A{id}\u7684\u8282\u70B9",
      itemsSelected: "\u5DF2\u9009\u4E2D{length}\u9879",
      citeErrMessage: "\u627E\u4E0D\u5230\u8868\u683C\u7EC4\u4EF6\u5F15\u7528",
      noDomErrMessage: "\u627E\u4E0D\u5230\u5BF9\u5E94\u7684\u8868\u683C\u884Cdom\u5143\u7D20",
      noPopErrMessage: "\u62FF\u4E0D\u5230pop\u7EC4\u4EF6\u7684\u5B9E\u4F8B",
      currentNoData: "\u6682\u65E0\u6570\u636E",
      updateSuccess: "\u66F4\u65B0\u6210\u529F",
      newSuccCreated: "\u65B0\u5EFA\u6210\u529F",
      deleteSuccess: "\u5220\u9664\u6210\u529F",
      customTheme: {
        themeColor: "\u4E3B\u9898\u8272",
        light: "\u4EAE\u8272",
        dark: "\u6697\u8272",
        blue: "\u84DD\u8272",
        user1: "\u81EA\u5B9A\u4E491",
        user2: "\u81EA\u5B9A\u4E492",
        user3: "\u81EA\u5B9A\u4E493",
        saveAndShare: "\u5E94\u7528\u81F3\u5168\u5C40",
        resetAndShare: "\u91CD\u7F6E\u81F3\u5168\u5C40",
        resetConfirmation: "\u91CD\u7F6E\u786E\u8BA4",
        resetConfirmationDesc: "\u8BF7\u786E\u5B9A\u662F\u5426\u9700\u8981\u91CD\u7F6E\u5F53\u524D\u9009\u4E2D\u4E3B\u9898\u5E76\u52A0\u8F7D\u5168\u5C40\u9ED8\u8BA4\u6570\u636E?",
        resetConfirmationGlobalDesc: "\u8BF7\u786E\u5B9A\u662F\u5426\u9700\u8981\u91CD\u7F6E\u5168\u5C40\u9ED8\u8BA4\u6570\u636E?",
        closeModelEdit: "\u5173\u95EDjson\u6A21\u578B\u7F16\u8F91",
        modelEdit: "json\u6A21\u578B\u7F16\u8F91",
        adminOperation: "\u7BA1\u7406\u5458\u64CD\u4F5C",
        confirmCopyLink: "\u786E\u8BA4\u62F7\u8D1D\u94FE\u63A5",
        preview: "\u9884\u89C8",
        save: "\u5E94\u7528",
        reset: "\u91CD\u7F6E",
        share: "\u5206\u4EAB",
        app: "\u5E94\u7528",
        font: "\u5B57\u4F53",
        fontSize: "\u5B57\u53F7",
        fontSizeDesc: "\u5E94\u7528\u5B57\u4F53\u5927\u5C0F",
        fontWeight: "\u5B57\u91CD",
        fontWeightDesc: "\u5E94\u7528\u9ED8\u8BA4\u5B57\u91CD",
        other: "\u5176\u4ED6",
        borderRadius: "\u5706\u89D2",
        borderRadiusDesc: "\u6309\u94AE\u3001\u6A21\u6001\u7B49\u5BB9\u5668\u5706\u89D2",
        widthIcon: "\u56FE\u6807\u5C3A\u5BF8",
        widthIconDesc: "\u56FE\u6807\u5C3A\u5BF8\u5927\u5C0F\uFF0C\u63A7\u5236\u6240\u6709\u56FE\u6807\u5927\u5C0F",
        spacing: "\u95F4\u8DDD",
        spacingDesc: "\u5E94\u7528\u95F4\u8DDD\u5927\u5C0F\uFF0C\u5373\u5404\u5143\u7D20\u4E4B\u95F4\u95F4\u9694",
        primaryColor: "\u4E3B\u8981\u989C\u8272",
        primaryColorDesc: "\u4E3B\u8981\u989C\u8272,\u4EC5\u5728\u9700\u8981\u975E\u5E38\u5F3A\u8C03\u7684\u60C5\u51B5\u4E0B\u4F7F\u7528",
        primaryTextColor: "\u4E3B\u8981\u6587\u672C\u989C\u8272",
        primaryTextColorDesc: "\u4E3B\u8981\u989C\u8272\u6587\u5B57\u8272\uFF0C\u548C\u80CC\u666F\u8272\u5F62\u6210\u5BF9\u6BD4",
        primaryHoverColor: "\u4E3B\u8981\u60AC\u6D6E\u989C\u8272",
        primaryHoverColorDesc: "\u4E3B\u8981\u989C\u8272\u60AC\u6D6E\u6001",
        primaryHoverTextColor: "\u4E3B\u8981\u60AC\u6D6E\u6587\u672C\u989C\u8272",
        primaryHoverTextColorDesc: "\u4E3B\u8981\u989C\u8272\u60AC\u6D6E\u6001\u6587\u5B57\u8272\uFF0C\u548C\u80CC\u666F\u8272\u5F62\u6210\u5BF9\u6BD4",
        primaryActiveColor: "\u4E3B\u8981\u6FC0\u6D3B\u989C\u8272",
        primaryActiveColorDesc: "\u4E3B\u8981\u989C\u8272\u6FC0\u6D3B\u6001",
        primaryActiveTextColor: "\u4E3B\u8981\u6FC0\u6D3B\u6587\u672C\u989C\u8272",
        primaryActiveTextColorDesc: "\u4E3B\u8981\u989C\u8272\u6FC0\u6D3B\u6001\u6587\u5B57\u8272\uFF0C\u548C\u80CC\u666F\u8272\u5F62\u6210\u5BF9\u6BD4",
        primaryDisabledColor: "\u4E3B\u8981\u7981\u7528\u989C\u8272",
        primaryDisabledColorDesc: "\u4E3B\u8981\u989C\u8272\u7981\u7528\u6001",
        primaryDisabledTextColor: "\u4E3B\u8981\u7981\u7528\u6587\u672C\u989C\u8272",
        primaryDisabledTextColorDesc: "\u4E3B\u8981\u989C\u8272\u7981\u7528\u6001\u6587\u5B57\u8272\uFF0C\u548C\u80CC\u666F\u8272\u5F62\u6210\u5BF9\u6BD4",
        primaryLightDefaultColor: "\u4E3B\u8981\u6D45\u7248\u989C\u8272",
        primaryLightDefaultColorDesc: "\u6D45\u7248\u4E3B\u8981\u989C\u8272\uFF08\u591A\u7528\u4E8E\u80CC\u666F\uFF09\u3002\u4EC5\u5728\u9700\u8981\u975E\u5E38\u5F3A\u8C03\u7684\u60C5\u51B5\u4E0B\u4F7F\u7528",
        primaryLightHoverColor: "\u4E3B\u8981\u6D45\u7248\u60AC\u6D6E\u8272",
        primaryLightHoverColorDesc: "\u6D45\u7248\u4E3B\u8981\u989C\u8272\u60AC\u6D6E\u6001",
        primaryLightActiveColor: "\u4E3B\u8981\u6D45\u7248\u6FC0\u6D3B\u8272",
        primaryLightActiveColorDesc: "\u6D45\u7248\u4E3B\u8981\u989C\u8272\u6FC0\u6D3B\u6001",
        text: "\u6587\u672C\u989C\u8272",
        mainTextColor: "\u6587\u672C\u4E3B\u8272",
        mianTextColorDesc: "\u6587\u672C\u989C\u8272 - \u6700\u4E3B\u8981",
        minorTextColor: "\u6587\u672C\u7A0D\u6B21\u8272",
        minorTextColorDesc: "\u6587\u672C\u989C\u8272 - \u7A0D\u6B21\u8981",
        secondaryTextColor: "\u6587\u672C\u6B21\u8272",
        secondaryTextColorDesc: "\u6587\u672C\u989C\u8272 - \u6B21\u8981",
        lastTextColor: "\u6587\u672C\u6700\u6B21\u8272",
        lastTextColorDesc: "\u6587\u672C\u989C\u8272 - \u6700\u6B21\u8981",
        linkColor: "\u94FE\u63A5\u989C\u8272",
        textLinkColor: "\u6587\u672C\u94FE\u63A5\u8272",
        textLinkColorDesc: "\u94FE\u63A5\u989C\u8272 - \u6700\u4E3B\u8981",
        textLinkHoverColor: "\u6587\u672C\u94FE\u63A5\u60AC\u6D6E\u8272",
        textLinkHoverColorDesc: "\u94FE\u63A5\u989C\u8272 - \u60AC\u6D6E\u6001",
        textLinkActiveColor: "\u6587\u672C\u94FE\u63A5\u6FC0\u6D3B\u8272",
        textLinkActiveColorDesc: "\u94FE\u63A5\u989C\u8272 - \u6FC0\u6D3B\u6001",
        textLinkVisitedColor: "\u6587\u672C\u94FE\u63A5\u5DF2\u8BBF\u95EE\u8272",
        textLinkVisitedColorDesc: "\u94FE\u63A5\u989C\u8272 - \u5DF2\u8BBF\u95EE",
        bgColor: "\u80CC\u666F\u8272",
        bgColorLowestLayer: "\u80CC\u666F\u8272\u6700\u4E0B\u5C42",
        bgColorLowestLayerDesc: "\u80CC\u666F\u8272 - \u6700\u4E0B\u5C42\uFF08\u5E95\u90E8\u9875\u9762\uFF09",
        bgColorLowerLayer: "\u80CC\u666F\u8272\u6B21\u4E0B\u5C42",
        bgColorLowerLayerDesc: "\u80CC\u666F\u8272 - \u6B21\u4E0B\u5C42\uFF08\u9875\u9762\u4E2D\u9700\u8981\u63D0\u5347\u7684\u5185\u5BB9\uFF09",
        bgColorCenterLayer: "\u80CC\u666F\u8272\u4E2D\u5C42",
        bgColorCenterLayerDesc: "\u80CC\u666F\u8272 - \u4E2D\u95F4\u5C42\uFF08\u6A21\u6001\u7B49\u5BB9\u5668\uFF09",
        bgColorSecondaryUpperLayer: "\u80CC\u666F\u8272\u6B21\u4E0A\u5C42",
        bgColorSecondaryUpperLayerDesc: "\u80CC\u666F\u8272 - \u6B21\u4E0A\u5C42(\u901A\u77E5,Toast\u7B49)",
        bgColorTopLayer: "\u80CC\u666F\u8272\u6700\u4E0A\u5C42",
        bgColorTopLayerDesc: "\u80CC\u666F\u8272 - \u6700\u4E0A\u5C42\uFF08\u7279\u6B8A\uFF09",
        fillColor: "\u586B\u5145\u8272",
        fillDefault: "\u9ED8\u8BA4\u586B\u5145\u8272",
        fillDefaultDesc: "\u586B\u5145\u8272 - \u9ED8\u8BA4\u6001",
        fillHover: "\u60AC\u6D6E\u586B\u5145\u8272",
        fillHoverDesc: "\u586B\u5145\u8272 - \u60AC\u6D6E\u6001",
        fillActive: "\u6FC0\u6D3B\u586B\u5145\u8272",
        fillActiveDesc: "\u586B\u5145\u8272 - \u6FC0\u6D3B\u6001",
        border: "\u8FB9\u6846",
        borderColor: "\u8FB9\u6846\u8272",
        borderColorDesc: "\u9ED8\u8BA4\u63CF\u8FB9\u989C\u8272",
        disabledState: "\u7981\u7528\u6001",
        disabledText: "\u7981\u7528\u6587\u672C\u8272",
        disabledTextDesc: "\u7981\u7528\u6001 - \u6587\u5B57",
        disabledTextBorder: "\u7981\u7528\u63CF\u8FB9\u8272",
        disabledTextBorderDesc: "\u7981\u7528\u6001 - \u63CF\u8FB9",
        disabledBg: "\u7981\u7528\u80CC\u666F\u8272",
        disabledBgDesc: "\u7981\u7528\u6001 - \u80CC\u666F",
        disabledFill: "\u7981\u7528\u586B\u5145\u8272",
        disabledFillDesc: "\u7981\u7528\u6001 - \u586B\u5145",
        sidebar: "\u4FA7\u8FB9\u5BFC\u822A\u680F",
        top: "\u9876\u90E8\u5BFC\u822A\u680F",
        mainColor: "\u5B57\u4F53\u4E3B\u8981\u989C\u8272",
        mainColorDesc: "\u5BFC\u822A\u680F\u5B57\u4F53\u4E3B\u8981\u989C\u8272",
        secondaryColor: "\u5B57\u4F53\u6B21\u8981\u989C\u8272",
        secondaryColorDesc: "\u5BFC\u822A\u680F\u5B57\u4F53\u6B21\u8981\u989C\u8272",
        mainBgColor: "\u80CC\u666F\u4E3B\u8981\u989C\u8272",
        mainBgColorDesc: "\u5BFC\u822A\u680F\u80CC\u666F\u4E3B\u8981\u989C\u8272",
        secondaryBgColor: "\u80CC\u666F\u6B21\u8981\u989C\u8272",
        secondaryBgColorDesc: "\u5BFC\u822A\u680F\u80CC\u666F\u6B21\u8981\u989C\u8272",
        iconMainColor: "\u56FE\u6807\u4E3B\u8981\u989C\u8272",
        iconMainColorDesc: "\u5BFC\u822A\u680F\u56FE\u6807\u4E3B\u8981\u989C\u8272",
        iconSecondaryColor: "\u56FE\u6807\u6B21\u8981\u989C\u8272",
        iconSecondaryColorDesc: "\u5BFC\u822A\u680F\u56FE\u6807\u6B21\u8981\u989C\u8272",
        appMenuColor: "\u83DC\u5355\u5B57\u4F53\u989C\u8272",
        appMenuColorDesc: "\u5BFC\u822A\u680F\u5E94\u7528\u83DC\u5355\u5B57\u4F53\u989C\u8272",
        appMenuHoverColor: "\u83DC\u5355\u60AC\u6D6E\u5B57\u4F53\u8272",
        appMenuHoverColorDesc: "\u5BFC\u822A\u680F\u5E94\u7528\u83DC\u5355\u5B57\u4F53\u60AC\u6D6E\u8272",
        appMenuHoverBgColor: "\u83DC\u5355\u60AC\u6D6E\u80CC\u666F\u8272",
        appMenuHoverBgColorDesc: "\u5BFC\u822A\u680F\u5E94\u7528\u83DC\u5355\u60AC\u6D6E\u80CC\u666F\u8272",
        appMenuActiveColor: "\u83DC\u5355\u9009\u4E2D\u5B57\u4F53\u8272",
        appMenuActiveColorDesc: "\u5BFC\u822A\u680F\u5E94\u7528\u83DC\u5355\u9009\u4E2D\u5B57\u4F53\u8272",
        appMenuActiveBgColor: "\u83DC\u5355\u9009\u4E2D\u80CC\u666F\u8272",
        appMenuActiveBgColorDesc: "\u5BFC\u822A\u680F\u5E94\u7528\u83DC\u5355\u9009\u4E2D\u80CC\u666F\u8272",
        ctrl: "\u63A7\u4EF6",
        grid: "\u8868\u683C",
        gridHeaderBg: "\u8868\u683C\u5934\u80CC\u666F\u8272",
        gridHeaderBgDesc: "\u8868\u683C\u5934\u80CC\u666F\u8272\uFF0C\u4E0E\u8868\u683C\u884C\u80CC\u666F\u533A\u522B",
        gridHeaderColor: "\u8868\u683C\u5934\u5B57\u4F53\u8272",
        gridHeaderColorDesc: "\u8868\u683C\u5934\u5B57\u4F53\u8272\uFF0C\u5305\u62EC\u8868\u683C\u5934\u3001\u8868\u683C\u6392\u5E8F\u6309\u94AE",
        gridRowBg: "\u8868\u683C\u884C\u80CC\u666F\u8272\u4EAE\u8272",
        gridRowBgDesc: "\u8868\u683C\u884C\u80CC\u666F\u8272\u4EAE\u8272\uFF0C\u5373\u8868\u683C\u6591\u9A6C\u7EB9\u4E2D\u7684\u4EAE\u8272",
        gridRowBg2: "\u8868\u683C\u884C\u80CC\u666F\u8272\u6697\u8272",
        gridRowBg2Desc: "\u8868\u683C\u884C\u80CC\u666F\u8272\u6697\u8272\uFF0C\u5373\u8868\u683C\u6591\u9A6C\u7EB9\u4E2D\u7684\u6697\u8272",
        gridRowColor: "\u8868\u683C\u884C\u5B57\u4F53\u8272",
        gridRowColorDesc: "\u8868\u683C\u884C\u6240\u6709\u5B57\u4F53\u8272",
        gridRowHover: "\u8868\u683C\u884C\u60AC\u6D6E\u8272",
        gridRowHoverDesc: "\u8868\u683C\u884C\u60AC\u6D6E\u8272, \u5F53\u67D0\u4E00\u884Chover\u65F6\u80CC\u666F\u8272",
        gridRowSelect: "\u8868\u683C\u884C\u9009\u4E2D\u8272",
        gridRowSelectDesc: "\u8868\u683C\u884C\u9009\u4E2D\u8272\uFF0C\u5F53\u67D0\u4E00\u884C\u9009\u4E2D\u65F6\u80CC\u666F\u8272",
        tree: "\u6811",
        treeTextColor: "\u6811\u89C6\u56FE\u6587\u672C\u8272",
        treeTextColorDesc: "\u6811\u89C6\u56FE\u6587\u672C\u8272\uFF0C\u6811\u8282\u70B9\u57FA\u7840\u6587\u672C\u8272",
        treeBgColor: "\u6811\u89C6\u56FE\u80CC\u666F\u8272",
        treeBgColorDesc: "\u6811\u89C6\u56FE\u80CC\u666F\u8272\uFF0C\u6811\u89C6\u56FE\u90E8\u4EF6\u6574\u4F53\u80CC\u666F\u8272",
        treeDisabledColor: "\u6811\u89C6\u56FE\u7981\u7528\u8272",
        treeDisabledColorDesc: "\u6811\u89C6\u56FE\u7981\u7528\u8272\uFF0C\u6811\u8282\u70B9\u7981\u7528\u6587\u672C\u8272",
        treeHoverColor: "\u6811\u89C6\u56FE\u60AC\u6D6E\u8272",
        treeHoverColorDesc: "\u6811\u89C6\u56FE\u60AC\u6D6E\u8272\uFF0C\u6811\u8282\u70B9\u60AC\u6D6E\u6587\u672C\u8272",
        treeHoverBgColor: "\u6811\u89C6\u56FE\u60AC\u6D6E\u80CC\u666F\u8272",
        treeHoverBgColorDesc: "\u6811\u89C6\u56FE\u60AC\u6D6E\u80CC\u666F\u8272\uFF0C\u6811\u8282\u70B9\u60AC\u6D6E\u80CC\u666F\u8272",
        treeSelectColor: "\u6811\u89C6\u56FE\u9009\u4E2D\u8272",
        treeSelectColorDesc: "\u6811\u89C6\u56FE\u9009\u4E2D\u8272\uFF0C\u6811\u8282\u70B9\u9009\u4E2D\u6587\u672C\u8272",
        treeSelectBgColor: "\u6811\u89C6\u56FE\u9009\u4E2D\u80CC\u666F\u8272",
        treeSelectBgColorDesc: "\u6811\u89C6\u56FE\u9009\u4E2D\u80CC\u666F\u8272\uFF0C\u6811\u8282\u70B9\u9009\u4E2D\u80CC\u666F\u8272"
      },
      loadMore: "\u52A0\u8F7D\u66F4\u591A",
      expandData: "\u5C55\u5F00\u6570\u636E",
      collapseData: "\u6298\u53E0\u6570\u636E"
    },
    menu: {
      noSupportAlign: "\u6682\u672A\u652F\u6301\u83DC\u5355\u65B9\u5411\u4E3A {align}",
      noFoundModel: "\u6CA1\u627E\u5230\u83DC\u5355\u9879\u6A21\u578B{menuKey}",
      noFoundFunction: "{menuKey}\u7684\u9002\u914D\u5668\u6CA1\u6709renderText\u65B9\u6CD5",
      menuSetting: "\u83DC\u5355\u8BBE\u7F6E"
    },
    menuDesign: {
      customMenu: "\u81EA\u5B9A\u4E49\u83DC\u5355",
      reset: "\u6062\u590D\u9ED8\u8BA4",
      save: "\u4FDD\u5B58",
      visible: "\u663E\u793A",
      noMenuItemModel: "\u6CA1\u627E\u5230\u83DC\u5355\u9879\u6A21\u578B{menu}",
      noFoundFunction: "{menu}\u7684\u9002\u914D\u5668\u6CA1\u6709renderText\u65B9\u6CD5"
    },
    calendar: {
      lastYear: "\u53BB\u5E74",
      lastMonth: "\u4E0A\u4E2A\u6708",
      today: "\u4ECA\u5929",
      year: "\u5E74",
      month: "\u6708",
      nextMonth: "\u4E0B\u4E2A\u6708",
      nextYear: "\u660E\u5E74",
      title: "\u5DE5\u4F5C\u65E5\u5386",
      calendardaily: {
        weeks: {
          sunday: "\u661F\u671F\u65E5",
          monday: "\u661F\u671F\u4E00",
          tuesday: "\u661F\u671F\u4E8C",
          wednesday: "\u661F\u671F\u4E09",
          thursday: "\u661F\u671F\u56DB",
          friday: "\u661F\u671F\u4E94",
          saturday: "\u661F\u671F\u516D"
        },
        tip: "\u5168\u5929",
        tomorrow: "\u660E\u5929",
        nextweek: "\u4E0B\u5468",
        selectdate: "\u9009\u62E9\u65E5\u671F"
      },
      calendarmonth: {
        weeks: {
          sunday: "\u65E5",
          monday: "\u4E00",
          tuesday: "\u4E8C",
          wednesday: "\u4E09",
          thursday: "\u56DB",
          friday: "\u4E94",
          saturday: "\u516D"
        }
      },
      calendarweek: {
        weeks: {
          sunday: "\u65E5",
          monday: "\u4E00",
          tuesday: "\u4E8C",
          wednesday: "\u4E09",
          thursday: "\u56DB",
          friday: "\u4E94",
          saturday: "\u516D"
        }
      },
      calendarUser: {
        weeks: {
          monday: "\u5468\u4E00",
          tuesday: "\u5468\u4E8C",
          wednesday: "\u5468\u4E09",
          thursday: "\u5468\u56DB",
          friday: "\u5468\u4E94",
          saturday: "\u5468\u516D",
          sunday: "\u5468\u65E5"
        },
        selectWeekRange: "\u9009\u62E9\u5468\u8303\u56F4",
        weekFormat: "YYYY\u5E74\u7B2Cww\u5468"
      }
    },
    chart: {
      chartPlaceholder: "\u56FE\u8868",
      drillDetail: "\u68C0\u67E5\u660E\u7EC6"
    },
    dashboard: {
      customDashboardContainer: {
        portalCustomPrompt: "\u95E8\u6237\u5B9A\u5236",
        newFilter: "\u65B0\u5EFA\u7B5B\u9009\u90E8\u4EF6"
      },
      dashboardDesign: {
        global: "\u5168\u5C40",
        add: "\u6DFB\u52A0",
        customPortal: "\u81EA\u5B9A\u4E49\u95E8\u6237",
        colNum: "\u5217\u6570",
        cellHeight: "\u5355\u5143\u683C\u9AD8\u5EA6",
        restoreDefault: "\u6062\u590D\u9ED8\u8BA4",
        save: "\u4FDD\u5B58",
        unGroup: "\u672A\u5206\u7C7B"
      },
      filterPortletDesign: {
        ctrlTitleError: "\u90E8\u4EF6\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A",
        ctrlTitle: "\u90E8\u4EF6\u540D\u79F0",
        ctrlPlaceholder: "\u8BF7\u8F93\u5165\u90E8\u4EF6\u540D\u79F0",
        checkTitle: "\u5BF9\u6570\u636E\u96C6\u4E0B\u6240\u6709\u62A5\u8868\u751F\u6548",
        baseSet: "\u57FA\u672C\u8BBE\u7F6E",
        filterTitle: "\u7B5B\u9009\u90E8\u4EF6",
        selectAll: "\u5168\u9009",
        queryConditions: "\u67E5\u8BE2\u6761\u4EF6",
        addQueryConditions: "\u6DFB\u52A0\u67E5\u8BE2\u6761\u4EF6"
      }
    },
    form: {
      noSupportDetailType: "\u6682\u672A\u652F\u6301\u7684\u8868\u5355\u9879\u7C7B\u578B: {detailType} \u6216\u627E\u4E0D\u5230\u5BF9\u5E94\u9002\u914D\u5668",
      formDruipart: {
        saveFirst: "\u8BF7\u5148\u4FDD\u5B58\u4E3B\u6570\u636E",
        defaultText: "\u5173\u7CFB\u754C\u9762"
      },
      formGroupPanel: {
        showMore: "\u663E\u793A\u66F4\u591A"
      },
      formMDctrlForm: {
        noFindProvider: "\u672A\u627E\u5230\u8868\u5355\u7684\u9002\u914D\u5668"
      },
      formMDctrlRepeater: {
        noSupportStyle: "\u6682\u672A\u652F\u6301\u91CD\u590D\u5668\u6837\u5F0F{repeaterStyle}"
      },
      repeaterGrid: {
        promptInformation: "\u662F\u5426\u5220\u9664\u9009\u4E2D\u9879",
        absentOrLoad: "\u4E0D\u5B58\u5728\u6216\u52A0\u8F7D\u4E2D"
      },
      repeaterSingleForm: {
        errorMessage: "\u6CA1\u6709repeatedForm"
      },
      mdCtrlContainer: {
        promptInformation: "\u662F\u5426\u5220\u9664\u9009\u4E2D\u9879",
        noSlot: "\u672A\u63D0\u4F9Bitem\u63D2\u69FD"
      },
      formMDctrl: {
        errorMessage: "\u6682\u672A\u652F\u6301\u5185\u5BB9\u7C7B\u578B\u4E3A{contentType}",
        defaultText: "\u591A\u6570\u636E\u90E8\u4EF6"
      },
      formGroup: {
        fold: "\u6298\u53E0",
        unfold: "\u5C55\u5F00"
      },
      formRawItem: {
        dividerText: "\u5206\u5272\u7EBF(DIVIDER)",
        infoText: "\u5E38\u89C4\u63D0\u793A(INFO)",
        warningText: "\u8B66\u544A\u63D0\u793A(WARNING)",
        errorText: "\u9519\u8BEF\u63D0\u793A(ERROR)",
        defaultText: "\u76F4\u63A5\u5185\u5BB9"
      },
      formTabPnel: {
        all: "\u5168\u90E8"
      },
      compositeFormItemEx: {
        confirmTitle: "\u6E29\u99A8\u63D0\u793A",
        confirmDesc: "\u5F53\u524D\u586B\u5199\u7684\u5185\u5BB9\u5207\u6362\u540E\u5C06\u88AB\u6E05\u7A7A\uFF0C\u8BF7\u786E\u8BA4\u662F\u5426\u7EE7\u7EED\uFF1F"
      }
    },
    gantt: {
      complete: "\u5B8C\u6210\u91CF",
      total: "\u603B\u91CF",
      deadline: "\u622A\u6B62\u65F6\u95F4",
      hideControl: "\u5217\u9009\u62E9"
    },
    kanban: {
      lane: "\u6CF3\u9053",
      collapsed: "\u6298\u53E0",
      expand: "\u5C55\u5F00",
      allCollapsed: "\u5168\u90E8\u6536\u8D77",
      allExpand: "\u5168\u90E8\u5C55\u5F00",
      selectAll: "\u5168\u9009",
      selectedDataCount: "\u5DF2\u9009\u62E9<span>{length}</span>\u6761\u6570\u636E",
      natchOperation: "\u6279\u91CF\u64CD\u4F5C"
    },
    reportPanel: {
      unrealized: "\u6682\u672A\u5B9E\u73B0"
    },
    searchBar: {
      saveGroup: "\u4FDD\u5B58\u5206\u7EC4",
      filter: "\u8FC7\u6EE4",
      filterTree: {
        addItem: "\u6DFB\u52A0\u9879",
        addGroup: "\u6DFB\u52A0\u7EC4",
        switchItem: "\u5207\u6362\u9879",
        switchGroup: "\u5207\u6362\u7EC4",
        addPQL: "\u6DFB\u52A0PQL"
      },
      searchGroups: {
        groupValueRule: "\u5206\u7EC4\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A",
        errorMessage: "\u5206\u7EC4\u540D\u79F0\u4E0D\u80FD\u91CD\u590D\uFF01",
        noEditPrompt: "\u914D\u7F6E\u7684\u5206\u7EC4\u4E0D\u53EF\u7F16\u8F91",
        savePrompt: "\u8BF7\u5148\u4FDD\u5B58\u8BE5\u5206\u7EC4",
        delTitle: "\u786E\u8BA4\u5220\u9664",
        confirmDelPrompt: "\u786E\u8BA4\u5220\u9664\u5206\u7EC4<span>{itemName}</span>\u5417\uFF1F",
        unrecoverablePrompt: "\u5206\u7EC4\u5220\u9664\u540E\u4E0D\u53EF\u6062\u590D",
        newGroup: "\u65B0\u5EFA\u5206\u7EC4",
        groupManage: "\u5206\u7EC4\u7BA1\u7406",
        groupName: "\u5206\u7EC4\u540D\u79F0",
        enterPrompt: "\u8BF7\u8F93\u5165\u5206\u7EC4\u540D\u79F0",
        editGroup: "\u7F16\u8F91\u5206\u7EC4",
        manageTips: "Tips\uFF1A\u7BA1\u7406\u641C\u7D22\u680F\u7684\u5206\u7EC4",
        name: "\u540D\u79F0",
        show: "\u663E\u793A",
        operate: "\u64CD\u4F5C",
        dialogCancel: "\u53D6 \u6D88",
        dialogDetermine: "\u786E \u5B9A"
      },
      quickSearchSelect: {
        searchField: "\u5207\u6362\u641C\u7D22\u5C5E\u6027"
      },
      conditions: {
        eq: "\u7B49\u4E8E(=)",
        not_eq: "\u4E0D\u7B49\u4E8E(<>)",
        gt: "\u5927\u4E8E(>)",
        gt_and_eq: "\u5927\u4E8E\u7B49\u4E8E(>=)",
        lt: "\u5C0F\u4E8E(<)",
        lt_and_eq: "\u5C0F\u4E8E\u7B49\u4E8E(<=)",
        is_null: "\u503C\u4E3A\u7A7A(Nil)",
        is_not_null: "\u503C\u4E0D\u4E3A\u7A7A(NotNil)",
        in: "\u503C\u5728\u8303\u56F4\u4E2D(In)",
        not_in: "\u503C\u4E0D\u5728\u8303\u56F4\u4E2D(NotIn)",
        like: "\u6587\u672C\u5305\u542B(%)",
        left_like: "\u6587\u672C\u5DE6\u5305\u542B(%#)",
        right_like: "\u6587\u672C\u53F3\u5305\u542B(#%)",
        exists: "\u5B58\u5728(EXISTS)",
        not_exists: "\u4E0D\u5B58\u5728(NOTEXISTS)"
      }
    },
    toolbar: {
      exportExcel: {
        exportAll: "\u5BFC\u51FA\u5168\u90E8(\u6700\u5927\u5BFC\u51FA{maxRowCount}\u884C)",
        expCurrentPage: "\u5BFC\u51FA\u5F53\u524D\u9875",
        expCurrentSelect: "\u5BFC\u51FA\u5F53\u524D\u9009\u4E2D",
        page: "\u9875",
        export: "\u5BFC\u51FA"
      }
    },
    tree: {
      noFoundInstance: "\u627E\u4E0D\u5230el-tree\u5B9E\u4F8B\u5BF9\u8C61",
      noSupported: "\u6682\u4E0D\u652F\u6301dropType:{dropType}"
    },
    treeGridEx: {
      noFoundMessage: "\u627E\u4E0D\u5230{id}\u7684\u884C\u6570\u636E\u5BF9\u8C61"
    },
    captionBar: {
      total: "{total} \u6761\u6570\u636E {invisibleNum} \u6761\u4E0D\u53EF\u89C1"
    }
  },
  // 组件
  component: {
    indexSearch: {
      placeholder: "\u641C\u7D22\u5185\u5BB9"
    },
    dataImport: {
      startImport: "\u5F00\u59CB\u5BFC\u5165\uFF0C\u8BE6\u7EC6\u8FDB\u5EA6\u548C\u7ED3\u679C\u8BF7\u770B\u5E94\u7528\u901A\u77E5",
      importSuccess: "\u5171\u8BA1\u5BFC\u5165\u6570\u636E {totalNum} \u6761\uFF0C\u9519\u8BEF[{errorNum}]\uFF0C\u6210\u529F[{successNum}]",
      importData: "\u5BFC\u5165\u6570\u636E",
      clickToUpload: "\u5355\u51FB\u6B64\u533A\u57DF\u8FDB\u884C\u4E0A\u4F20",
      importResults: "\u5BFC\u5165\u7ED3\u679C",
      downloadTemplate: "\u4E0B\u8F7D\u5BFC\u5165\u6A21\u7248\uFF0C\u5E76\u6309\u8981\u6C42\u586B\u5199\uFF1A",
      templateFile: "\u6570\u636E\u5BFC\u5165\u6A21\u677F\u6587\u4EF6",
      template: "\u6A21\u677F",
      continue: "\u7EE7\u7EED\u5BFC\u5165",
      detailedLogs: "\u8BE6\u7EC6\u65E5\u5FD7",
      importError: "\u5BFC\u5165\u9519\u8BEF"
    },
    dataImport2: {
      atLastOne: "\u81F3\u5C11\u9009\u62E9\u4E00\u4E2A\u6620\u5C04\u5C5E\u6027",
      uploadPlease: "\u8BF7\u4E0A\u4F20\u6587\u4EF6",
      fileName: "\u5F53\u524D\u6587\u4EF6\u540D:{fileName}",
      saveMode: "\u5BFC\u5165\u6A21\u5F0F\u4FDD\u5B58",
      reUpload: "\u91CD\u65B0\u4E0A\u4F20\u6587\u4EF6",
      fileUpload: "\u6587\u4EF6\u4E0A\u4F20",
      import: "\u5BFC\u5165",
      selectProperties: "\u8BF7\u9009\u62E9\u5217\u5BFC\u5165\u5C5E\u6027!"
    },
    dataImport2Select: {
      selectMode: "\u9009\u62E9\u5BFC\u5165\u6A21\u5F0F",
      edit: "\u7F16\u8F91"
    },
    dataImport2Table: {
      selectAttribute: "\u9009\u62E9\u5F53\u524D\u5217\u5BF9\u5E94\u7684\u5BFC\u5165\u5C5E\u6027"
    },
    doingNotice: {
      jobInProgress: "\u6709<span class={class}>{num}</span>\u4E2A\u540E\u53F0\u4F5C\u4E1A\u6B63\u5728\u6267\u884C\uFF0C\u8BF7\u7A0D\u540E"
    },
    extendActionTimeLine: {
      processTime: "\u5904\u7406\u65F6\u95F4",
      comments: "\u5BA1\u6279\u610F\u89C1",
      reject: "\u9A73\u56DE"
    },
    mapChart: {
      high: "\u9AD8",
      low: "\u4F4E"
    },
    pagination: {
      display: "\u663E\u793A",
      piece: "\u6761",
      total: "\u5171",
      pieceData: "\u6761\u6570\u636E"
    },
    rawItem: {
      errorConfig: "{type} \u7C7B\u578B\u81EA\u5B9A\u4E49\u53C2\u6570\u914D\u7F6E\u9519\u8BEF",
      noSupportVideo: "\u4F60\u7684\u6D4F\u89C8\u5668\u4E0D\u652F\u6301video\u6807\u7B7E"
    },
    gridSetting: {
      hideControl: "\u5217\u9009\u62E9"
    },
    kanbanSetting: {
      hideGroup: "\u5206\u7EC4\u9009\u62E9"
    },
    ganttSetting: {
      resultDefault: "\u6062\u590D\u9ED8\u8BA4\u503C",
      headerCaption: "\u8868\u5934\u663E\u793A\u5C5E\u6027",
      optionalAttribute: "\u53EF\u9009\u62E9\u5C5E\u6027",
      selectedAttribute: "\u5DF2\u9009\u62E9\u5C5E\u6027",
      limitsize: "\u4E0A\u9650{max}\u4E2A",
      reachedMaximum: "\u5DF2\u8FBE\u6700\u5927\u503C"
    },
    actionToolbar: {
      more: "\u66F4\u591A"
    },
    emojiSelect: {
      frequently: "\u5E38\u7528",
      peoples: "\u60C5\u7EEA",
      nature: "\u81EA\u7136",
      foods: "\u98DF\u7269\u4E0E\u996E\u6599",
      activity: "\u6D3B\u52A8",
      objects: "\u5BF9\u8C61",
      places: "\u65C5\u884C\u4E0E\u5730\u65B9",
      symbols: "\u7B26\u53F7",
      flags: "\u65D7\u5E1C"
    },
    formItemContainer: {
      more: "\u66F4\u591A"
    },
    pqlEditor: {
      noExpression: "\u9519\u8BEF\u7684\u8868\u8FBE\u5F0F\u3002\u8FDE\u63A5\u7B26\u7F3A\u5931\u8868\u8FBE\u5F0F\u3002",
      noConnection: "\u9519\u8BEF\u7684\u8868\u8FBE\u5F0F\u3002\u8868\u8FBE\u5F0F\u7F3A\u5931\u8FDE\u63A5\u7B26\u3002",
      noKey: "\u9519\u8BEF\u7684\u8868\u8FBE\u5F0F\u3002\u8868\u8FBE\u5F0F\u7F3A\u5931\u5DE6\u503C\u3002",
      noOperator: "\u9519\u8BEF\u7684\u8868\u8FBE\u5F0F\u3002\u8868\u8FBE\u5F0F\u7F3A\u5931\u64CD\u4F5C\u7B26\u3002",
      noValue: "\u9519\u8BEF\u7684\u8868\u8FBE\u5F0F\u3002\u8868\u8FBE\u5F0F\u7F3A\u5931\u53F3\u503C\u3002",
      noDelimiter: "\u9519\u8BEF\u7684\u8868\u8FBE\u5F0F\u3002\u8868\u8FBE\u5F0F\u7F3A\u5931\u5206\u5272\u7B26\u3002",
      errorCombination: "\u9519\u8BEF\u7684\u8868\u8FBE\u5F0F\u3002\u9519\u8BEF\u7684\u62EC\u53F7\u7EC4\u5408\u3002",
      errorDelimiter: "\u9519\u8BEF\u7684\u8868\u8FBE\u5F0F\u3002\u9519\u8BEF\u7684\u5206\u5272\u7B26\u3002"
    },
    controlNavigation: {
      showNav: "\u663E\u793A\u5BFC\u822A",
      hiddenNav: "\u9690\u85CF\u5BFC\u822A"
    }
  },
  // 编辑器
  editor: {
    common: {
      entityConfigErr: "\u8BF7\u914D\u7F6E\u5B9E\u4F53\u548C\u5B9E\u4F53\u6570\u636E\u96C6",
      selectViewConfigErr: "\u8BF7\u914D\u7F6E\u6570\u636E\u9009\u62E9\u89C6\u56FE",
      linkViewConfigErr: "\u8BF7\u914D\u7F6E\u6570\u636E\u94FE\u63A5\u89C6\u56FE",
      confirmCancelPrompt: "\u786E\u5B9A\u8981\u53D6\u6D88\u7F16\u8F91\u5417\uFF1F",
      cancelEditPrompt: "\u53D6\u6D88\u7F16\u8F91\u5C06\u65E0\u6CD5\u4FDD\u5B58\u4FEE\u6539\u7684\u5185\u5BB9\uFF0C\u4E14\u4E0D\u80FD\u627E\u56DE\u3002",
      confirmCancel: "\u786E\u8BA4\u53D6\u6D88",
      confirm: "\u786E\u8BA4",
      cancel: "\u53D6\u6D88",
      fullscreen: "\u5168\u5C4F",
      minimize: "\u6700\u5C0F\u5316",
      loadMore: "\u52A0\u8F7D\u66F4\u591A"
    },
    cascader: {
      ibizCascader: {
        title: "\u6807\u9898{index}"
      }
    },
    code: {
      readOnlyPrompt: "\u5F53\u524D\u4E3A\u53EA\u8BFB\u6A21\u5F0F\uFF0C\u4E0D\u53EF\u7F16\u8F91",
      noEditorArea: "\u672A\u627E\u5230\u7F16\u8F91\u5668\u5185\u5BB9\u533A\u57DF",
      noSelStart: "\u672A\u83B7\u53D6\u5230\u5F53\u524D\u9009\u4E2D\u533A\u57DF\u7684\u8D77\u59CB\u4F4D\u7F6E",
      noEditorRect: "\u672A\u83B7\u53D6\u5230\u7F16\u8F91\u5668DOM\u8282\u70B9\u7684\u4F4D\u7F6E\u4FE1\u606F",
      noSelCoords: "\u672A\u8BA1\u7B97\u51FA\u9009\u4E2D\u4F4D\u7F6E\u7684\u6EDA\u52A8\u53EF\u89C6\u5750\u6807",
      editorNotInit: "\u7F16\u8F91\u5668\u672A\u521D\u59CB\u5316",
      functionBody: "\u51FD\u6570\u4F53"
    },
    dateRange: {
      rangeSeparator: "\u81F3"
    },
    dateRangeSelect: {
      day: "\u5929",
      week: "\u5468",
      month: "\u6708",
      quarter: "\u5B63\u5EA6",
      year: "\u5E74",
      static: "\u56FA\u5B9A\u65F6\u95F4",
      dynamic: "\u52A8\u6001\u65F6\u95F4",
      dateUnit: "\u65F6\u95F4\u5355\u4F4D",
      daterange: "\u65F6\u95F4\u8303\u56F4",
      today: "\u4ECA\u5929",
      recently: "\u6700\u8FD1",
      pastTime: "\u8FC7\u53BB",
      future: "\u672A\u6765",
      currentWeek: "\u672C\u5468",
      currentMonth: "\u672C\u6708",
      currentYear: "\u672C\u5E74",
      currentQuarter: "\u672C\u5B63\u5EA6",
      recentlySixMonth: "\u6700\u8FD16\u4E2A\u6708"
    },
    html: {
      wangEditor: {
        customTips: "\u81EA\u5B9A\u4E49\u63D0\u793A",
        emoji: "\u8868\u60C5"
      },
      enableedit: "\u7F16\u8F91",
      expand: "\u653E\u5927",
      reduce: "\u7F29\u5C0F",
      editorNotInit: "\u7F16\u8F91\u5668\u672A\u521D\u59CB\u5316",
      getSelectPositionFail: "\u83B7\u53D6\u9009\u533A\u4F4D\u7F6E\u5931\u8D25"
    },
    markdown: {
      uploadJsonFormatErr: "\u914D\u7F6Euploadparams\u6CA1\u6709\u6309\u6807\u51C6JSON\u683C\u5F0F",
      exportJsonFormatErr: "\u914D\u7F6Eexportparams\u6CA1\u6709\u6309\u6807\u51C6JSON\u683C\u5F0F",
      edit: "\u7F16\u8F91"
    },
    notSupportedEditor: {
      unsupportedType: "\u672A\u652F\u6301\u7684\u7F16\u8F91\u5668\u7C7B\u578B - {type}"
    },
    preset: {
      ibizPresetRawitem: {
        noSupportType: "\u6682\u672A\u652F\u6301{type}"
      }
    },
    textBox: {
      warningMessage: "ip\u683C\u5F0F\u9A8C\u8BC1\u672A\u901A\u8FC7\uFF0C\u7B2C{num}\u6BB5ip\u91CD\u7F6E\u56DE\u65E7\u503C",
      openAiChat: "\u6253\u5F00AI\u804A\u5929"
    },
    upload: {
      uploadFiles: "\u4E0A\u4F20\u6587\u4EF6",
      uploadfolders: "\u4E0A\u4F20\u6587\u4EF6\u5939",
      fileSizeErr: "\u6587\u4EF6\u5927\u5C0F\u4E0D\u80FD\u8D85\u8FC7",
      uploadJsonFormatErr: "\u914D\u7F6Euploadparams\u6CA1\u6709\u6309\u6807\u51C6JSON\u683C\u5F0F",
      exportJsonFormatErr: "\u914D\u7F6Eexportparams\u6CA1\u6709\u6309\u6807\u51C6JSON\u683C\u5F0F",
      cropImg: "\u88C1\u526A\u56FE\u7247",
      cancelUpload: "\u53D6\u6D88\u4E0A\u4F20"
    },
    emojiPicker: {
      addEmoji: "\u6DFB\u52A0\u8868\u60C5"
    },
    colorPicker: {
      systemColor: "\u7CFB\u7EDF\u914D\u8272",
      templateColor: "\u6A21\u677F\u914D\u8272",
      simpleBlue: "\u7B80\u7EA6\u84DD",
      autumnOrange: "\u79CB\u65E5\u6A59",
      Macaroon: "\u9A6C\u5361\u9F99",
      mintGreen: "\u8584\u8377\u7EFF",
      selector: "\u9009\u62E9\u5668",
      textValue: "\u6587\u672C\u503C",
      add: "\u6DFB\u52A0"
    },
    mapPicker: {
      title: "\u8BF7\u9009\u62E9\u5730\u5740",
      searchPlaceholder: "\u8BF7\u8F93\u5165\u5173\u952E\u5B57\u9009\u62E9\u5730\u70B9",
      address: "\u5730\u5740"
    },
    transferPicker: {
      optionalList: "\u53EF\u9009\u5217\u8868",
      selectedList: "\u5DF2\u9009\u5217\u8868"
    },
    treePicker: {
      allowAll: "\u5168\u90E8\u5141\u8BB8",
      allProhibited: "\u5168\u90E8\u7981\u6B62",
      expandAll: "\u5168\u90E8\u5C55\u5F00",
      collapseAll: "\u5168\u90E8\u6536\u8D77"
    },
    signature: {
      undo: "\u64A4\u9500",
      rewrite: "\u91CD\u5199",
      confirm: "\u786E\u8BA4",
      addSignature: "\u70B9\u51FB\u6B64\u5904\u6DFB\u52A0\u7B7E\u540D",
      signaturePrompt: "\u8BF7\u5728\u7A7A\u767D\u533A\u57DF\u5185\u6A2A\u5411\u4E66\u5199"
    }
  },
  panelComponent: {
    authUserinfo: {
      visitor: "\u6E38\u5BA2"
    },
    authSsO: {
      noSupported: "\u6682\u4E0D\u652F\u6301{type}\u767B\u5F55",
      dingLogin: "\u9489\u9489\u767B\u5F55",
      wechatLogin: "\u5FAE\u4FE1\u767B\u5F55"
    },
    coopPos: {
      view: "{username} \u6B63\u5728\u6D4F\u89C8",
      edit: "{username} \u6B63\u5728\u7F16\u8F91",
      update: "{username} \u6B63\u5728\u66F4\u65B0"
    },
    navPosIndex: {
      noSupportPrompt: "\u975E\u8DEF\u7531\u6A21\u5F0F\u5BFC\u822A\u5360\u4F4D\u6682\u672A\u652F\u6301"
    },
    navTabs: {
      closeAll: "\u5173\u95ED\u5168\u90E8\u6807\u7B7E\u9875",
      closeOther: "\u5173\u95ED\u5176\u5B83\u6807\u7B7E\u9875",
      closeLeft: "\u5173\u95ED\u5DE6\u4FA7\u6807\u7B7E\u9875",
      closeRight: "\u5173\u95ED\u53F3\u4FA7\u6807\u7B7E\u9875",
      closeCurrent: "\u5173\u95ED\u5F53\u524D\u6807\u7B7E\u9875"
    },
    navBreadcrumb: {
      home: "\u9996\u9875"
    },
    searchformButtons: {
      errMessage: "\u5F53\u524D\u89C6\u56FE\u91CC\u6CA1\u6709\u627E\u5230\u53EBsearchform\u7684\u641C\u7D22\u8868\u5355",
      enterPrompt: "\u8BF7\u8F93\u5165\u8981\u5B58\u50A8\u7684\u81EA\u5B9A\u4E49\u67E5\u8BE2\u540D\u79F0\uFF1A",
      queryPrompt: "\u5B58\u50A8\u81EA\u5B9A\u4E49\u67E5\u8BE2",
      saveCondition: "\u4FDD\u5B58\u6761\u4EF6"
    },
    shortCut: {
      expandToolbar: "\u5C55\u5F00\u5FEB\u6377\u5DE5\u5177\u680F"
    },
    userMessage: {
      notice: "\u901A\u77E5",
      backendTasks: "\u540E\u53F0\u4F5C\u4E1A",
      allRead: "\u5168\u90E8\u5DF2\u8BFB",
      asyncActionPreview: {
        downloadFailedErr: "\u4E0B\u8F7D\u6587\u4EF6\u5931\u8D25",
        noExistentErr: "\u6587\u4EF6\u6D41\u6570\u636E\u4E0D\u5B58\u5728",
        importDetailPrompt: "\u5BFC\u5165\u6570\u636E\u8BE6\u60C5-{name}",
        parseImportInfoErr: "\u89E3\u6790\u5BFC\u5165\u4FE1\u606F\u5F02\u5E38",
        downloadErrFile: "\u4E0B\u8F7D\u9519\u8BEF\u6587\u4EF6",
        importTime: "\u5BFC\u5165\u65F6\u95F4: ",
        importTotal: "\u5BFC\u5165\u603B\u6761\u6570: ",
        successImport: "\u6210\u529F\u5BFC\u5165\u6570: ",
        ImportFailed: "\u5BFC\u5165\u5931\u8D25\u6570: "
      },
      asyncActionResult: {
        noMessage: "\u65E0\u5904\u7406\u5185\u5BB9",
        taskName: "\u4EFB\u52A1\u540D\u79F0:",
        taskState: "\u4EFB\u52A1\u72B6\u6001:",
        finished: "\u5DF2\u5B8C\u6210",
        processing: "\u6267\u884C\u4E2D",
        beginTime: "\u5F00\u59CB\u6267\u884C\u65F6\u95F4:",
        endTime: "\u7ED3\u675F\u6267\u884C\u65F6\u95F4:",
        exeResult: "\u6267\u884C\u7ED3\u679C:"
      },
      asyncDataExport: {
        exportDetailPrompt: "\u5BFC\u51FA\u6570\u636E\u8BE6\u60C5-{name}",
        excuteTime: "\u6267\u884C\u65F6\u95F4",
        downloadFile: "\u4E0B\u8F7D\u6587\u4EF6",
        executing: "\u6267\u884C\u4E2D......"
      },
      asyncActionTab: {
        noSupportType: "\u5F02\u6B65\u64CD\u4F5C\u7C7B\u578B{type}\u6682\u672A\u652F\u6301",
        noAsyncAction: "\u6682\u65E0\u5F02\u6B65\u64CD\u4F5C"
      },
      internalMessageContainer: {
        markAsRead: "\u6807\u8BB0\u4E3A\u5DF2\u8BFB"
      },
      internalMessageJson: {
        jumpToView: "\u8DF3\u8F6C\u5230\u89C6\u56FE",
        missingHtml: "\u6570\u636E\u7684content\u91CC\u7F3A\u5C11html",
        todo: "\u7ED9\u4F60\u5206\u914D\u4E86\u6D41\u7A0B\u4EFB\u52A1",
        done: "\u5B8C\u6210\u6D41\u7A0B\u4EFB\u52A1"
      },
      internalMessageTab: {
        noSupportType: "\u7AD9\u5185\u6D88\u606F\u7C7B\u578B{type}\u6682\u672A\u652F\u6301",
        notificationYet: "\u6682\u65E0\u901A\u77E5",
        loadMore: "\u52A0\u8F7D\u66F4\u591A({length})",
        onlyShowUnread: "\u53EA\u663E\u793A\u672A\u8BFB"
      },
      internalMessageGroup: {
        expand: "\u5C55\u5F00",
        collapse: "\u6536\u8D77"
      }
    },
    customSetting: {
      theme: "\u81EA\u5B9A\u4E49\u4E3B\u9898",
      menu: "\u81EA\u5B9A\u4E49\u83DC\u5355"
    },
    addinChanged: {
      tip: "\u70B9\u51FB\u5237\u65B0",
      title: "\u7CFB\u7EDF\u63D2\u4EF6\u66F4\u65B0",
      content: "\u7CFB\u7EDF\u63D2\u4EF6\u5DF2\u66F4\u65B0\uFF0C\u5237\u65B0\u9875\u9762\u4EE5\u5E94\u7528\u6700\u65B0\u53D8\u66F4"
    },
    globalSearch: {
      search: "\u641C\u7D22",
      loading: "\u52A0\u8F7D\u4E2D...",
      empty: "\u6CA1\u6709\u5339\u914D\u7684\u7ED3\u679C",
      clearHistory: "\u6E05\u7A7A\u641C\u7D22\u5386\u53F2",
      placeholder: "\u6A21\u578B\u68C0\u7D22(Ctrl+K)",
      moreTips: "\u4EC5\u52A0\u8F7D\u524D{size}\u6761\u6570\u636E\uFF0C\u5171{total}\u6761\u6570\u636E"
    },
    authCaptcha: {
      captcha: "\u9A8C\u8BC1\u7801",
      refresh: "\u70B9\u51FB\u56FE\u7247\u5237\u65B0",
      loading: "\u52A0\u8F7D\u4E2D...",
      loadFailed: "\u52A0\u8F7D\u5931\u8D25"
    }
  },
  util: {
    uploadManager: {
      failed: "\u6587\u4EF6\u4E0A\u4F20\u5931\u8D25",
      title: "\u8FDB\u7A0B\u7BA1\u7406\u5668"
    },
    appUtil: {
      aiTitle: "\u5220\u9664\u5BF9\u8BDD",
      aiDesc: "\u5220\u9664\u540E\uFF0C\u8BE5\u5BF9\u8BDD\u5C06\u4E0D\u53EF\u6062\u590D\u3002\u786E\u8BA4\u5220\u9664\u5417\uFF1F",
      clearTopic: "\u6E05\u7A7A\u4F1A\u8BDD",
      clearTopicDesc: "\u786E\u8BA4\u6E05\u7A7A\u9664\u5F53\u524D\u6FC0\u6D3B\u9879\u5916\u7684\u6240\u6709\u4F1A\u8BDD\u6570\u636E\uFF1F"
    },
    appModal: {
      prev: "\u4E0A\u4E00\u4E2A\u8BB0\u5F55",
      next: "\u4E0B\u4E00\u4E2A\u8BB0\u5F55"
    },
    inlineAiUtil: {
      regenerate: "\u91CD\u65B0\u751F\u6210",
      insertText: "\u63D2\u5165\u6587\u672C",
      replaceText: "\u66FF\u6362\u6587\u672C",
      copyText: "\u590D\u5236\u6587\u672C",
      info: "\u5185\u5BB9\u7531 AI \u751F\u6210\uFF0C\u8BF7\u4ED4\u7EC6\u7504\u522B\u3002",
      stopEdit: "\u7EC8\u6B62\u7F16\u8F91",
      warningTitle: "\u786E\u8BA4\u4E2D\u6B62",
      warningDesc: "\u786E\u8BA4\u4E2D\u6B62\u521B\u4F5C\u5417\uFF1F",
      thinking: "\u6DF1\u5EA6\u601D\u8003\u4E2D",
      thinked: "\u5DF2\u6DF1\u5EA6\u601D\u8003",
      collapseToolCall: "\u6536\u8D77\u5DE5\u5177\u8C03\u7528",
      expandToolCall: "\u5C55\u5F00\u5168\u90E8 {number} \u4E2A\u5DE5\u5177\u8C03\u7528",
      error: "\u53D1\u751F\u9519\u8BEF",
      copy: "\u5DF2\u590D\u5236"
    },
    aiChartUtil: {
      feedback: "\u53CD\u9988",
      description: "\u63CF\u8FF0",
      regardingIssue: "\u9488\u5BF9\u95EE\u9898",
      understandProblem: "\u4E0D\u7406\u89E3\u95EE\u9898",
      forgotContext: "\u9057\u5FD8\u4E86\u4E0A\u6587",
      notFollowingRequire: "\u4E0D\u9075\u5FAA\u8981\u6C42",
      regardingResponse: "\u9488\u5BF9\u56DE\u7B54\u6548\u679C",
      incorrectAswer: "\u56DE\u7B54\u9519\u8BEF",
      logicalConfusion: "\u903B\u8F91\u6DF7\u4E71",
      poorTimeliness: "\u65F6\u6548\u6027\u5DEE",
      poorReadability: "\u53EF\u8BFB\u6027\u5DEE",
      incompleteAnswer: "\u56DE\u7B54\u4E0D\u5B8C\u6574",
      unprofessional: "\u56DE\u7B54\u7B3C\u7EDF\u4E0D\u4E13\u4E1A",
      report: "\u4E3E\u62A5",
      pornographicVulgar: "\u8272\u60C5\u4F4E\u4FD7",
      politicallySensitive: "\u653F\u6CBB\u654F\u611F",
      illegalCriminal: "\u8FDD\u6CD5\u72AF\u7F6A",
      discriminationPrejudice: "\u6B67\u89C6\u6216\u504F\u89C1\u56DE\u7B54",
      violationPrivacy: "\u4FB5\u72AF\u9690\u79C1",
      contentInfringement: "\u5185\u5BB9\u4FB5\u6743",
      placeholder: "\u8BF7\u8F93\u5165"
    },
    screenShotUtil: {
      prepareCanvas: "\u51C6\u5907\u753B\u5E03\u4E2D...",
      small: "\u5C0F",
      medium: "\u4E2D",
      big: "\u5927",
      brush: "\u753B\u7B14",
      rect: "\u77E9\u5F62",
      circle: "\u5706\u5F62",
      mosaic: "\u9A6C\u8D5B\u514B",
      text: "\u6587\u672C\u6CE8\u91CA",
      arrow: "\u7BAD\u5934",
      drawdown: "\u56DE\u64A4"
    },
    printPreviewUtil: {
      title: "\u6253\u5370\u9884\u89C8",
      exportPdfFailed: "\u5BFC\u51FApdf\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5",
      pdfValid: "pdf\u5BFC\u51FA\u5185\u5BB9\u4E0D\u80FD\u4E3A\u7A7A\u4E14\u5FC5\u987B\u662F\u5B57\u7B26\u4E32",
      pdfEmpty: "pdf\u5BFC\u51FA\u5185\u5BB9\u4E0D\u80FD\u4E3A\u7A7A\u767D",
      pdfFontSize: "pdf\u5BFC\u51FA\u5B57\u4F53\u5927\u5C0F\u5FC5\u987B\u57288-72\u4E4B\u95F4",
      pdfFilename: "pdf\u5BFC\u51FA\u6587\u4EF6\u540D\u5FC5\u987B\u4EE5.pdf\u7ED3\u5C3E",
      exportHtmlFailed: "\u5BFC\u51FAhtml\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5",
      startCalcPdf: "\u5F00\u59CB\u5206\u6BB5\u8BA1\u7B97pdf\u6570\u636E...",
      startCalcPdfPage: "\u5F00\u59CB\u8BA1\u7B97 {startPage} - {endPage} \u5206\u9875\u6570\u636E...",
      startMergePdf: "\u6B63\u5728\u805A\u5408\u6570\u636E...",
      startExportPdf: "\u5F00\u59CB\u5BFC\u51FApdf...",
      exportPdfSuccess: "pdf\u5BFC\u51FA\u6210\u529F!",
      startPrintPdf: "\u5F00\u59CB\u6253\u5370{filename}..."
    }
  },
  // runTime
  ...zhCn$3,
  // vue3Util
  ...zhCn$2,
  // core
  ...zhCn$1,
  // modelHelper
  ...zhCn
};

export { index as default };
