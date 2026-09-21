'use strict';

"use strict";
const zhCn = {
  vue3Util: {
    common: {
      undefined: "\u672A\u5B9A\u4E49",
      onFoundCorrespondingPart: "\u672A\u5B9A\u4E49\u672A\u627E\u5230\u5BF9\u5E94\u90E8\u4EF6\u7684\u9002\u914D\u5668",
      noFoundViewModel: "\u672A\u627E\u5230\u89C6\u56FE\u6A21\u578B",
      noSupportLoadingDynamic: "{codeName}\u65E0\u5B9E\u4F53,\u6682\u4E0D\u652F\u6301\u52A0\u8F7D\u52A8\u6001\u6A21\u578B"
    },
    control: {
      unsupportedPanel: "\u6682\u672A\u652F\u6301\u7684\u9762\u677F\u9879: {id} - {itemType}"
    },
    panelComponent: {
      noConfiguardDataObject: "\u6CA1\u6709\u914D\u7F6E\u6570\u636E\u5BF9\u8C61\u540D\u79F0",
      noSupportedDataSourceType: "\u6570\u636E\u6E90\u7C7B\u578B{dataSourceType}\u6682\u672A\u652F\u6301",
      noConfiguredEntityLogic: "\u6CA1\u6709\u914D\u7F6E\u5B9E\u4F53\u903B\u8F91",
      noConfiguredEntity: "\u6CA1\u6709\u914D\u7F6E\u5B9E\u4F53",
      noReturnValue: "\u5B9E\u4F53\u903B\u8F91{appDELogicId}\u6CA1\u6709\u8FD4\u56DE\u503C",
      noAttribute: "\u5168\u5C40\u53D8\u91CF\u91CC\u6CA1\u6709{dataName}\u5C5E\u6027",
      noConfiguredScript: "\u6CA1\u6709\u914D\u7F6E\u811A\u672C\u4EE3\u7801",
      noConfiguerdEntityBehanior: "\u6CA1\u6709\u914D\u7F6E\u5B9E\u4F53\u884C\u4E3A",
      sessionView: "\u7ED1\u5B9A\u89C6\u56FE\u7684\u4F1A\u8BDD\u4E0D\u5B58\u5728{dataName}",
      viewStateAttribute: "\u89C6\u56FEstate\u91CC\u6CA1\u6709{dataName}\u5C5E\u6027",
      noImplementMethod: "\u672A\u6267\u884C\u7684\u65B9\u6CD5",
      noProvidedSlot: "\u672A\u63D0\u4F9B{id}\u63D2\u69FD",
      cannotEmpty: "{caption} \u4E0D\u80FD\u4E3A\u7A7A",
      unadaptedLayout: "\u672A\u9002\u914D\u7684\u5E03\u5C40\u5360\u4F4D{layoutPos}",
      placeholderIdentifier: "\u89C6\u56FE{viewCodeName}\u7684\u9762\u677F\u6210\u5458{id}\u7684\u5360\u4F4D\u6807\u8BC6\u662F\uFF1A",
      refresh: "\u5237\u65B0",
      wxQrcodeCaption: "\u8BF7\u4F7F\u7528\u5FAE\u4FE1\u626B\u63CF\u4E8C\u7EF4\u7801\u767B\u5F55"
    },
    plugin: {
      failureConfigurationLoad: "\u914D\u7F6E\u52A0\u8F7D\u5931\u8D25",
      failedRemotePluginLoad: "\u8FDC\u7A0B\u63D2\u4EF6\u52A0\u8F7D\u5931\u8D25, \u8FDC\u7A0B\u63D2\u4EF6\u672A\u627E\u5230[default]\u9ED8\u8BA4\u5BFC\u51FA",
      fileContentFormat: "\u8FDC\u7A0B\u63D2\u4EF6\u52A0\u8F7D\u5931\u8D25, \u672A\u627E\u5230\u6587\u4EF6\u6216\u6587\u4EF6\u5185\u5BB9\u683C\u5F0F\u4E0D\u6B63\u786E"
    },
    use: {
      control: {
        parameterChanges: "{id}\u7684\u4E0A\u4E0B\u6587\u6216\u89C6\u56FE\u53C2\u6570\u53D8\u66F4\uFF1A",
        stateChange: "\u90E8\u4EF6 [{name}] state \u53D8\u66F4"
      },
      focusBlur: {
        noFocus: "\u6CA1\u6709\u805A\u7126\uFF0C\u4E0D\u89E6\u53D1\u5931\u7126"
      },
      view: {
        stateChange: "\u89C6\u56FE [{name}] state \u53D8\u66F4"
      }
    },
    util: {
      noInjected: "\u6CA1\u6709\u6CE8\u5165createVueApp\u65B9\u6CD5",
      convertString: "\u8F6C\u6362\u6210\u5B57\u7B26\u4E32\u5931\u8D25",
      viewIdentifiers: "\u7B2C{depth}\u7EA7\u8DEF\u7531\u4E0D\u5B58\u5728\u89C6\u56FE\u6807\u8BC6",
      noFoundView: "\u627E\u4E0D\u5230\u89C6\u56FE{viewCodeName}",
      routeCorrectly: "\u65E0\u6CD5\u6B63\u786E\u83B7\u53D6route,\u53EF\u80FD\u662F\u4F9D\u8D56\u95EE\u9898"
    },
    view: {
      redirectionProgress: "\u91CD\u5B9A\u5411\u8DF3\u8F6C\u4E2D",
      viewType: "\u89C6\u56FE\u7C7B\u578B{viewType}\u6682\u672A\u652F\u6301",
      noTeleportTag: "\u6CA1\u6709\u627E\u5230\u90E8\u4EF6{name}\u7684teleportTag",
      embeddedRedirectionView: "\u5D4C\u5165\u91CD\u5B9A\u5411\u89C6\u56FE\u4E0D\u652F\u6301url\u8DF3\u8F6C",
      insufficientRedirection: "\u91CD\u5B9A\u5411\u53C2\u6570\u4E0D\u8DB3\u65E0\u6CD5\u8DF3\u8F6C",
      toDoList: "\u5F85\u529E\u5217\u8868\u91CD\u5B9A\u5411"
    }
  }
};

exports.zhCn = zhCn;
