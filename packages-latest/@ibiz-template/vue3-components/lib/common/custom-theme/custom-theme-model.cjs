'use strict';

"use strict";
const predefineThemeVars = [
  {
    caption: "\u5E94\u7528",
    labelLang: "app",
    children: [
      {
        caption: "\u5B57\u4F53",
        labelLang: "font",
        vars: [
          {
            label: "\u5B57\u53F7",
            value: "--ibiz-font-size-regular",
            labelLang: "fontSize",
            descLang: "fontSizeDesc",
            unit: "px",
            type: "size",
            kindVars: {
              "--ibiz-font-size-small": -2,
              "--ibiz-font-size-header-6": 2,
              "--ibiz-font-size-header-5": 4,
              "--ibiz-font-size-header-4": 6,
              "--ibiz-font-size-header-3": 8,
              "--ibiz-font-size-header-2": 10,
              "--ibiz-font-size-header-1": 12
            }
          },
          {
            label: "\u5B57\u91CD",
            value: "--ibiz-font-weight-regular",
            labelLang: "fontWeight",
            descLang: "fontWeightDesc",
            type: "size",
            kindVars: {
              "--ibiz-font-weight-light": -200,
              "--ibiz-font-weight-bold": 200
            }
          }
        ]
      },
      {
        caption: "\u989C\u8272",
        labelLang: "color",
        children: [
          {
            caption: "\u4E3B\u8981\u989C\u8272",
            labelLang: "primaryColor",
            vars: [
              {
                label: "\u4E3B\u8981\u989C\u8272",
                description: "\u4E3B\u8981\u989C\u8272,\u4EC5\u5728\u9700\u8981\u975E\u5E38\u5F3A\u8C03\u7684\u60C5\u51B5\u4E0B\u4F7F\u7528",
                labelLang: "primaryColor",
                descLang: "primaryColorDesc",
                value: "--ibiz-color-primary"
              },
              {
                label: "\u4E3B\u8981\u6587\u672C\u989C\u8272",
                description: "\u4E3B\u8981\u989C\u8272\u6587\u5B57\u8272\uFF0C\u548C\u80CC\u666F\u8272\u5F62\u6210\u5BF9\u6BD4",
                labelLang: "primaryTextColor",
                descLang: "primaryTextColorDesc",
                value: "--ibiz-color-primary-text"
              },
              {
                label: "\u4E3B\u8981\u60AC\u6D6E\u989C\u8272",
                description: "\u4E3B\u8981\u989C\u8272\u60AC\u6D6E\u6001",
                labelLang: "primaryHoverColor",
                descLang: "primaryHoverColorDesc",
                value: "--ibiz-color-primary-hover"
              },
              {
                label: "\u4E3B\u8981\u60AC\u6D6E\u6587\u672C\u989C\u8272",
                description: "\u4E3B\u8981\u989C\u8272\u60AC\u6D6E\u6001\u6587\u5B57\u8272\uFF0C\u548C\u80CC\u666F\u8272\u5F62\u6210\u5BF9\u6BD4",
                labelLang: "primaryHoverTextColor",
                descLang: "primaryHoverTextColorDesc",
                value: "--ibiz-color-primary-hover-text"
              },
              {
                label: "\u4E3B\u8981\u6FC0\u6D3B\u989C\u8272",
                description: "\u4E3B\u8981\u989C\u8272\u6FC0\u6D3B\u6001",
                labelLang: "primaryActiveColor",
                descLang: "primaryActiveColorDesc",
                value: "--ibiz-color-primary-active"
              },
              {
                label: "\u4E3B\u8981\u6FC0\u6D3B\u6587\u672C\u989C\u8272",
                description: "\u4E3B\u8981\u989C\u8272\u6FC0\u6D3B\u6001\u6587\u5B57\u8272\uFF0C\u548C\u80CC\u666F\u8272\u5F62\u6210\u5BF9\u6BD4",
                labelLang: "primaryActiveTextColor",
                descLang: "primaryActiveTextColorDesc",
                value: "--ibiz-color-primary-active-text"
              },
              {
                label: "\u4E3B\u8981\u7981\u7528\u989C\u8272",
                description: "\u4E3B\u8981\u989C\u8272\u7981\u7528\u6001",
                labelLang: "primaryDisabledColor",
                descLang: "primaryDisabledColorDesc",
                value: "--ibiz-color-primary-disabled"
              },
              {
                label: "\u4E3B\u8981\u7981\u7528\u6587\u672C\u989C\u8272",
                description: "\u4E3B\u8981\u989C\u8272\u7981\u7528\u6001\u6587\u5B57\u8272\uFF0C\u548C\u80CC\u666F\u8272\u5F62\u6210\u5BF9\u6BD4",
                labelLang: "primaryDisabledTextColor",
                descLang: "primaryDisabledTextColorDesc",
                value: "--ibiz-color-primary-disabled-text"
              },
              {
                label: "\u4E3B\u8981\u6D45\u7248\u989C\u8272",
                description: "\u6D45\u7248\u4E3B\u8981\u989C\u8272\uFF08\u591A\u7528\u4E8E\u80CC\u666F\uFF09\u3002\u4EC5\u5728\u9700\u8981\u975E\u5E38\u5F3A\u8C03\u7684\u60C5\u51B5\u4E0B\u4F7F\u7528",
                labelLang: "primaryLightDefaultColor",
                descLang: "primaryLightDefaultColorDesc",
                value: "--ibiz-color-primary-light-default"
              },
              {
                label: "\u4E3B\u8981\u6D45\u7248\u60AC\u6D6E\u8272",
                description: "\u6D45\u7248\u4E3B\u8981\u989C\u8272\u60AC\u6D6E\u6001",
                labelLang: "primaryLightHoverColor",
                descLang: "primaryLightHoverColorDesc",
                value: "--ibiz-color-primary-light-hover"
              },
              {
                label: "\u4E3B\u8981\u6D45\u7248\u6FC0\u6D3B\u8272",
                description: "\u6D45\u7248\u4E3B\u8981\u989C\u8272\u6FC0\u6D3B\u6001",
                labelLang: "primaryLightActiveColor",
                descLang: "primaryLightActiveColorDesc",
                value: "--ibiz-color-primary-light-active"
              }
            ]
          },
          {
            caption: "\u6587\u672C\u989C\u8272",
            labelLang: "text",
            vars: [
              {
                label: "\u6587\u672C\u4E3B\u8272",
                description: "\u6587\u672C\u989C\u8272 - \u6700\u4E3B\u8981",
                labelLang: "mainTextColor",
                descLang: "mianTextColorDesc",
                value: "--ibiz-color-text-0"
              },
              {
                label: "\u6587\u672C\u7A0D\u6B21\u8272",
                description: "\u6587\u672C\u989C\u8272 - \u7A0D\u6B21\u8981",
                labelLang: "minorTextColor",
                descLang: "minorTextColorDesc",
                value: "--ibiz-color-text-1"
              },
              {
                label: "\u6587\u672C\u6B21\u8272",
                description: "\u6587\u672C\u989C\u8272 - \u6B21\u8981",
                labelLang: "secondaryTextColor",
                descLang: "secondaryTextColorDesc",
                value: "--ibiz-color-text-2"
              },
              {
                label: "\u6587\u672C\u6700\u6B21\u8272",
                description: "\u6587\u672C\u989C\u8272 - \u6700\u6B21\u8981",
                labelLang: "lastTextColor",
                descLang: "lastTextColorDesc",
                value: "--ibiz-color-text-3"
              }
            ]
          },
          {
            caption: "\u94FE\u63A5\u989C\u8272",
            labelLang: "linkColor",
            vars: [
              {
                label: "\u6587\u672C\u94FE\u63A5\u8272",
                description: "\u94FE\u63A5\u989C\u8272 - \u6700\u4E3B\u8981",
                labelLang: "textLinkColor",
                descLang: "textLinkColorDesc",
                value: "--ibiz-color-link"
              },
              {
                label: "\u6587\u672C\u94FE\u63A5\u60AC\u6D6E\u8272",
                description: "\u94FE\u63A5\u989C\u8272 - \u60AC\u6D6E\u6001",
                labelLang: "textLinkHoverColor",
                descLang: "textLinkHoverColorDesc",
                value: "--ibiz-color-link-hover"
              },
              {
                label: "\u6587\u672C\u94FE\u63A5\u6FC0\u6D3B\u8272",
                description: "\u94FE\u63A5\u989C\u8272 - \u6FC0\u6D3B\u6001",
                labelLang: "textLinkActiveColor",
                descLang: "textLinkActiveColorDesc",
                value: "--ibiz-color-link-active"
              },
              {
                label: "\u6587\u672C\u94FE\u63A5\u5DF2\u8BBF\u95EE\u8272",
                description: "\u94FE\u63A5\u989C\u8272 - \u5DF2\u8BBF\u95EE",
                labelLang: "textLinkVisitedColor",
                descLang: "textLinkVisitedColorDesc",
                value: "--ibiz-color-link-visited"
              }
            ]
          },
          {
            caption: "\u80CC\u666F\u8272",
            labelLang: "bgColor",
            vars: [
              {
                label: "\u80CC\u666F\u8272\u6700\u4E0B\u5C42",
                description: "\u80CC\u666F\u8272 - \u6700\u4E0B\u5C42\uFF08\u5E95\u90E8\u9875\u9762\uFF09",
                labelLang: "bgColorLowestLayer",
                descLang: "bgColorLowestLayerDesc",
                value: "--ibiz-color-bg-0"
              },
              {
                label: "\u80CC\u666F\u8272\u6B21\u4E0B\u5C42",
                description: "\u80CC\u666F\u8272 - \u6B21\u4E0B\u5C42\uFF08\u9875\u9762\u4E2D\u9700\u8981\u63D0\u5347\u7684\u5185\u5BB9\uFF09",
                labelLang: "bgColorLowerLayer",
                descLang: "bgColorLowerLayerDesc",
                value: "--ibiz-color-bg-1"
              },
              {
                label: "\u80CC\u666F\u8272\u4E2D\u5C42",
                description: "\u80CC\u666F\u8272 - \u4E2D\u95F4\u5C42\uFF08\u6A21\u6001\u7B49\u5BB9\u5668\uFF09",
                labelLang: "bgColorCenterLayer",
                descLang: "bgColorCenterLayerDesc",
                value: "--ibiz-color-bg-2"
              },
              {
                label: "\u80CC\u666F\u8272\u6B21\u4E0A\u5C42",
                description: "\u80CC\u666F\u8272 - \u6B21\u4E0A\u5C42(\u901A\u77E5,Toast\u7B49)",
                labelLang: "bgColorSecondaryUpperLayer",
                descLang: "bgColorSecondaryUpperLayerDesc",
                value: "--ibiz-color-bg-3"
              },
              {
                label: "\u80CC\u666F\u8272\u6700\u4E0A\u5C42",
                description: "\u80CC\u666F\u8272 - \u6700\u4E0A\u5C42\uFF08\u7279\u6B8A\uFF09",
                labelLang: "bgColorTopLayer",
                descLang: "bgColorTopLayerDesc",
                value: "--ibiz-color-bg-4"
              }
            ]
          },
          {
            caption: "\u586B\u5145\u8272",
            labelLang: "fillColor",
            vars: [
              {
                label: "\u9ED8\u8BA4\u586B\u5145\u8272",
                description: "\u586B\u5145\u8272 - \u9ED8\u8BA4\u6001",
                labelLang: "fillDefault",
                descLang: "fillDefaultDesc",
                value: "--ibiz-color-fill-0"
              },
              {
                label: "\u60AC\u6D6E\u586B\u5145\u8272",
                description: "\u586B\u5145\u8272 - \u60AC\u6D6E\u6001",
                labelLang: "fillHover",
                descLang: "fillHoverDesc",
                value: "--ibiz-color-fill-1"
              },
              {
                label: "\u6FC0\u6D3B\u586B\u5145\u8272",
                description: "\u586B\u5145\u8272 - \u6FC0\u6D3B\u6001",
                labelLang: "fillActive",
                descLang: "fillActiveDesc",
                value: "--ibiz-color-fill-2"
              }
            ]
          },
          {
            caption: "\u8FB9\u6846",
            labelLang: "border",
            vars: [
              {
                label: "\u8FB9\u6846\u8272",
                description: "\u9ED8\u8BA4\u63CF\u8FB9\u989C\u8272",
                labelLang: "borderColor",
                descLang: "borderColorDesc",
                value: "--ibiz-color-border"
              }
            ]
          },
          {
            caption: "\u7981\u7528\u6001",
            labelLang: "disabledState",
            vars: [
              {
                label: "\u7981\u7528\u6587\u672C\u8272",
                description: "\u7981\u7528\u6001 - \u6587\u5B57",
                labelLang: "disabledText",
                descLang: "disabledTextDesc",
                value: "--ibiz-color-disabled-text"
              },
              {
                label: "\u7981\u7528\u63CF\u8FB9\u8272",
                description: "\u7981\u7528\u6001 - \u63CF\u8FB9",
                labelLang: "disabledTextBorder",
                descLang: "disabledTextBorderDesc",
                value: "--ibiz-color-disabled-border"
              },
              {
                label: "\u7981\u7528\u80CC\u666F\u8272",
                description: "\u7981\u7528\u6001 - \u80CC\u666F",
                labelLang: "disabledBg",
                descLang: "disabledBgDesc",
                value: "--ibiz-color-disabled-bg"
              },
              {
                label: "\u7981\u7528\u586B\u5145\u8272",
                description: "\u7981\u7528\u6001 - \u586B\u5145",
                labelLang: "disabledFill",
                descLang: "disabledFillDesc",
                value: "--ibiz-color-disabled-fill"
              }
            ]
          }
        ]
      },
      {
        caption: "\u5176\u4ED6",
        labelLang: "other",
        vars: [
          {
            label: "\u95F4\u8DDD",
            value: "--ibiz-spacing-base",
            labelLang: "spacing",
            descLang: "spacingDesc",
            unit: "px",
            type: "size",
            kindVars: {
              "--ibiz-spacing-super-tight": -14,
              "--ibiz-spacing-extra-tight": -12,
              "--ibiz-spacing-tight": -8,
              "--ibiz-spacing-base-tight": -4,
              "--ibiz-spacing-base-loose": 4,
              "--ibiz-spacing-loose": 8,
              "--ibiz-spacing-extra-loose": 16,
              "--ibiz-spacing-super-loose": 24
            }
          },
          {
            label: "\u5706\u89D2",
            value: "--ibiz-border-radius-medium",
            labelLang: "borderRadius",
            descLang: "borderRadiusDesc",
            unit: "px",
            type: "size",
            kindVars: {
              "--ibiz-border-radius-extra-small": -6,
              "--ibiz-border-radius-small": -4,
              "--ibiz-border-radius-large": 4
            }
          },
          {
            label: "\u56FE\u6807\u5C3A\u5BF8",
            value: "--ibiz-width-icon-medium",
            labelLang: "widthIcon",
            descLang: "widthIconDesc",
            unit: "px",
            type: "size",
            kindVars: {
              "--ibiz-width-icon-extra-small": -16,
              "--ibiz-width-icon-small": -4,
              "--ibiz-width-icon-large": 4,
              "--ibiz-width-icon-extra-large": 8
            }
          }
        ]
      }
    ]
  },
  // 导航栏中菜单激活色和悬浮色相反
  {
    caption: "\u9876\u90E8\u5BFC\u822A\u680F",
    labelLang: "top",
    vars: [
      {
        label: "\u5B57\u4F53\u4E3B\u8981\u989C\u8272",
        value: "--ibiz-panel-app-header-horizontal-color",
        defaultValue: "--ibiz-color-primary-text",
        labelLang: "mainColor",
        descLang: "mainColorDesc",
        className: "ibiz-panel-app-header"
      },
      {
        label: "\u5B57\u4F53\u6B21\u8981\u989C\u8272",
        value: "--ibiz-panel-app-header-horizontal-color-1",
        defaultValue: "--ibiz-color-text-5",
        labelLang: "secondaryColor",
        descLang: "secondaryColorDesc",
        className: "ibiz-panel-app-header"
      },
      {
        label: "\u80CC\u666F\u4E3B\u8981\u989C\u8272",
        value: "--ibiz-panel-app-header-horizontal-bg-color",
        defaultValue: "--ibiz-color-primary",
        labelLang: "mainBgColor",
        descLang: "mainBgColorDesc",
        className: "ibiz-panel-app-header"
      },
      {
        label: "\u80CC\u666F\u6B21\u8981\u989C\u8272",
        value: "--ibiz-panel-app-header-horizontal-bg-color-1",
        defaultValue: "--ibiz-color-bg-5",
        labelLang: "secondaryBgColor",
        descLang: "secondaryBgColorDesc",
        className: "ibiz-panel-app-header"
      },
      {
        label: "\u56FE\u6807\u4E3B\u8981\u989C\u8272",
        value: "--ibiz-panel-app-header-horizontal-color-icon-0",
        defaultValue: "--ibiz-color-icon-0",
        labelLang: "iconMainColor",
        descLang: "iconMainColorDesc",
        className: "ibiz-panel-app-header"
      },
      {
        label: "\u56FE\u6807\u6B21\u8981\u989C\u8272",
        value: "--ibiz-panel-app-header-horizontal-color-icon-1",
        defaultValue: "--ibiz-color-icon-1",
        labelLang: "iconSecondaryColor",
        descLang: "iconSecondaryColorDesc",
        className: "ibiz-panel-app-header"
      },
      {
        label: "\u5E94\u7528\u83DC\u5355\u5B57\u4F53\u989C\u8272",
        value: "--ibiz-panel-app-header-horizontal-menu-color",
        defaultValue: "--ibiz-color-text-menu",
        labelLang: "appMenuColor",
        descLang: "appMenuColorDesc",
        className: "ibiz-panel-app-header"
      },
      {
        label: "\u5E94\u7528\u83DC\u5355\u60AC\u6D6E\u5B57\u4F53\u8272",
        value: "--ibiz-panel-app-header-horizontal-active-color",
        defaultValue: "--ibiz-color-primary-active-text",
        labelLang: "appMenuHoverColor",
        descLang: "appMenuHoverColorDesc",
        className: "ibiz-panel-app-header"
      },
      {
        label: "\u5E94\u7528\u83DC\u5355\u60AC\u6D6E\u80CC\u666F\u8272",
        value: "--ibiz-panel-app-header-horizontal-active-bg-color",
        defaultValue: "--ibiz-color-primary-active",
        labelLang: "appMenuHoverBgColor",
        descLang: "appMenuHoverBgColorDesc",
        className: "ibiz-panel-app-header"
      },
      {
        label: "\u5E94\u7528\u83DC\u5355\u9009\u4E2D\u5B57\u4F53\u8272",
        value: "--ibiz-panel-app-header-horizontal-hover-color",
        defaultValue: "--ibiz-color-primary-hover-text",
        labelLang: "appMenuActiveColor",
        descLang: "appMenuActiveColorDesc",
        className: "ibiz-panel-app-header"
      },
      {
        label: "\u5E94\u7528\u83DC\u5355\u9009\u4E2D\u80CC\u666F\u8272",
        value: "--ibiz-panel-app-header-horizontal-hover-bg-color",
        defaultValue: "--ibiz-color-primary-hover",
        labelLang: "appMenuActiveBgColor",
        descLang: "appMenuActiveBgColorDesc",
        className: "ibiz-panel-app-header"
      }
    ]
  },
  {
    caption: "\u4FA7\u8FB9\u5BFC\u822A\u680F",
    labelLang: "sidebar",
    vars: [
      {
        label: "\u5B57\u4F53\u4E3B\u8981\u989C\u8272",
        value: "--ibiz-panel-app-header-color",
        defaultValue: "--ibiz-color-primary-text",
        labelLang: "mainColor",
        descLang: "mainColorDesc",
        className: "ibiz-panel-app-header"
      },
      {
        label: "\u5B57\u4F53\u6B21\u8981\u989C\u8272",
        value: "--ibiz-panel-app-header-color-1",
        defaultValue: "--ibiz-color-text-5",
        labelLang: "secondaryColor",
        descLang: "secondaryColorDesc",
        className: "ibiz-panel-app-header"
      },
      {
        label: "\u80CC\u666F\u4E3B\u8981\u989C\u8272",
        value: "--ibiz-panel-app-header-bg-color",
        defaultValue: "--ibiz-color-primary",
        labelLang: "mainBgColor",
        descLang: "mainBgColorDesc",
        className: "ibiz-panel-app-header"
      },
      {
        label: "\u80CC\u666F\u6B21\u8981\u989C\u8272",
        value: "--ibiz-panel-app-header-bg-color-1",
        defaultValue: "--ibiz-color-bg-5",
        labelLang: "secondaryBgColor",
        descLang: "secondaryBgColorDesc",
        className: "ibiz-panel-app-header"
      },
      {
        label: "\u56FE\u6807\u4E3B\u8981\u989C\u8272",
        value: "--ibiz-panel-app-header-color-icon-0",
        defaultValue: "--ibiz-color-icon-0",
        labelLang: "iconMainColor",
        descLang: "iconMainColorDesc",
        className: "ibiz-panel-app-header"
      },
      {
        label: "\u56FE\u6807\u6B21\u8981\u989C\u8272",
        value: "--ibiz-panel-app-header-color-icon-1",
        defaultValue: "--ibiz-color-icon-1",
        labelLang: "iconSecondaryColor",
        descLang: "iconSecondaryColorDesc",
        className: "ibiz-panel-app-header"
      },
      {
        label: "\u5E94\u7528\u83DC\u5355\u5B57\u4F53\u989C\u8272",
        value: "--ibiz-panel-app-header-menu-color",
        defaultValue: "--ibiz-color-text-menu",
        labelLang: "appMenuColor",
        descLang: "appMenuColorDesc",
        className: "ibiz-panel-app-header"
      },
      {
        label: "\u5E94\u7528\u83DC\u5355\u60AC\u6D6E\u5B57\u4F53\u8272",
        value: "--ibiz-panel-app-header-active-color",
        defaultValue: "--ibiz-color-primary-active-text",
        labelLang: "appMenuHoverColor",
        descLang: "appMenuHoverColorDesc",
        className: "ibiz-panel-app-header"
      },
      {
        label: "\u5E94\u7528\u83DC\u5355\u60AC\u6D6E\u80CC\u666F\u8272",
        value: "--ibiz-panel-app-header-active-bg-color",
        defaultValue: "--ibiz-color-primary-active",
        labelLang: "appMenuHoverBgColor",
        descLang: "appMenuHoverBgColorDesc",
        className: "ibiz-panel-app-header"
      },
      {
        label: "\u5E94\u7528\u83DC\u5355\u9009\u4E2D\u5B57\u4F53\u8272",
        value: "--ibiz-panel-app-header-hover-color",
        defaultValue: "--ibiz-color-primary-hover-text",
        labelLang: "appMenuActiveColor",
        descLang: "appMenuActiveColorDesc",
        className: "ibiz-panel-app-header"
      },
      {
        label: "\u5E94\u7528\u83DC\u5355\u9009\u4E2D\u80CC\u666F\u8272",
        value: "--ibiz-panel-app-header-hover-bg-color",
        defaultValue: "--ibiz-color-primary-hover",
        labelLang: "appMenuActiveBgColor",
        descLang: "appMenuActiveBgColorDesc",
        className: "ibiz-panel-app-header"
      }
    ]
  },
  {
    caption: "\u63A7\u4EF6",
    labelLang: "ctrl",
    children: [
      {
        caption: "\u8868\u683C",
        labelLang: "grid",
        vars: [
          {
            label: "\u8868\u683C\u5934\u5B57\u4F53\u8272",
            value: "--ibiz-control-grid-header-text-color",
            defaultValue: "--ibiz-color-text-2",
            labelLang: "gridHeaderColor",
            descLang: "gridHeaderColorDesc",
            className: "ibiz-control-grid"
          },
          {
            label: "\u8868\u683C\u5934\u80CC\u666F\u8272",
            value: "--ibiz-control-grid-header-bg-color",
            defaultValue: "--ibiz-color-fill-1",
            labelLang: "gridHeaderBg",
            descLang: "gridHeaderBgDesc",
            className: "ibiz-control-grid"
          },
          {
            label: "\u8868\u683C\u884C\u5B57\u4F53\u8272",
            value: "--ibiz-control-grid-text-color",
            defaultValue: "--ibiz-color-text-0",
            labelLang: "gridRowColor",
            descLang: "gridRowColorDesc",
            className: "ibiz-control-grid"
          },
          {
            label: "\u8868\u683C\u884C\u80CC\u666F\u8272\u4EAE\u8272",
            value: "--ibiz-control-grid-row-bg-color",
            defaultValue: "--ibiz-color-bg-1",
            labelLang: "gridRowBg",
            descLang: "gridRowBgDesc",
            className: "ibiz-control-grid"
          },
          {
            label: "\u8868\u683C\u884C\u80CC\u666F\u8272\u6697\u8272",
            value: "--ibiz-control-grid-row-bg-color-2",
            defaultValue: "--ibiz-color-bg-0",
            labelLang: "gridRowBg2",
            descLang: "gridRowBg2Desc",
            className: "ibiz-control-grid"
          },
          {
            label: "\u8868\u683C\u884C\u60AC\u6D6E\u8272",
            value: "--ibiz-control-grid-row-hover-color",
            defaultValue: "--ibiz-grey-1",
            labelLang: "gridRowHover",
            descLang: "gridRowHoverDesc",
            className: "ibiz-control-grid"
          },
          {
            label: "\u8868\u683C\u884C\u9009\u4E2D\u8272",
            value: "--ibiz-control-grid-row-select-color",
            defaultValue: "--ibiz-color-primary-light-default",
            labelLang: "gridRowSelect",
            descLang: "gridRowSelectDesc",
            className: "ibiz-control-grid"
          }
        ]
      },
      {
        caption: "\u6811",
        labelLang: "tree",
        vars: [
          {
            label: "\u6811\u89C6\u56FE\u6587\u672C\u8272",
            value: "--ibiz-control-treeview-text-color",
            defaultValue: "--ibiz-color-text-0",
            labelLang: "treeTextColor",
            descLang: "treeTextColorDesc",
            className: "ibiz-control-treeview"
          },
          {
            label: "\u6811\u89C6\u56FE\u80CC\u666F\u8272",
            value: "--ibiz-control-treeview-bg-color",
            defaultValue: "#00000000",
            labelLang: "treeBgColor",
            descLang: "treeBgColorDesc",
            className: "ibiz-control-treeview"
          },
          {
            label: "\u6811\u89C6\u56FE\u7981\u7528\u8272",
            value: "--ibiz-control-treeview-disabled-color",
            defaultValue: "--ibiz-color-disabled-text",
            labelLang: "treeDisabledColor",
            descLang: "treeDisabledColorDesc",
            className: "ibiz-control-treeview"
          },
          {
            label: "\u6811\u89C6\u56FE\u60AC\u6D6E\u8272",
            value: "--ibiz-control-treeview-row-hover-color",
            defaultValue: "--ibiz-color-text-0",
            labelLang: "treeHoverColor",
            descLang: "treeHoverColorDesc",
            className: "ibiz-control-treeview"
          },
          {
            label: "\u6811\u89C6\u56FE\u60AC\u6D6E\u80CC\u666F\u8272",
            value: "--ibiz-control-treeview-row-hover-bg-color",
            defaultValue: "--ibiz-color-fill-0",
            labelLang: "treeHoverBgColor",
            descLang: "treeHoverBgColorDesc",
            className: "ibiz-control-treeview"
          },
          {
            label: "\u6811\u89C6\u56FE\u9009\u4E2D\u8272",
            value: "--ibiz-control-treeview-row-select-color",
            defaultValue: "--ibiz-color-text-0",
            labelLang: "treeSelectColor",
            descLang: "treeSelectColorDesc",
            className: "ibiz-control-treeview"
          },
          {
            label: "\u6811\u89C6\u56FE\u9009\u4E2D\u80CC\u666F\u8272",
            value: "--ibiz-control-treeview-row-select-bg-color",
            defaultValue: "--ibiz-color-primary-light-default",
            labelLang: "treeSelectBgColor",
            descLang: "treeSelectBgColorDesc",
            className: "ibiz-control-treeview"
          }
        ]
      }
    ]
  }
];

exports.predefineThemeVars = predefineThemeVars;
