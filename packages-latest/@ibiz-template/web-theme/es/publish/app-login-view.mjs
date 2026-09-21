"use strict";
var AppLoginView = {
  "layoutMode": "FLEX",
  "layout": {
    "layout": "FLEX"
  },
  "rootPanelItems": [
    {
      "actionGroupExtractMode": "ITEM",
      "panelItems": [
        {
          "actionGroupExtractMode": "ITEM",
          "panelItems": [
            {
              "actionGroupExtractMode": "ITEM",
              "panelItems": [
                {
                  "rawItem": {
                    "caption": "\u5E94\u7528\u767B\u5F55\u89C6\u56FE",
                    "halign": "LEFT",
                    "renderMode": "TEXT",
                    "valign": "MIDDLE",
                    "wrapMode": "NOWRAP",
                    "contentType": "RAW",
                    "predefinedType": "STATIC_TEXT",
                    "id": "static_text"
                  },
                  "caption": "\u6587\u672C",
                  "itemStyle": "DEFAULT",
                  "itemType": "RAWITEM",
                  "layoutPos": {
                    "shrink": 1,
                    "layout": "FLEX"
                  },
                  "showCaption": true,
                  "id": "static_text"
                }
              ],
              "layout": {
                "layout": "FLEX"
              },
              "dataRegionType": "INHERIT",
              "caption": "\u5BB9\u5668",
              "itemStyle": "DEFAULT",
              "itemType": "CONTAINER",
              "layoutPos": {
                "shrink": 1,
                "layout": "FLEX"
              },
              "id": "container4"
            },
            {
              "actionGroupExtractMode": "ITEM",
              "panelItems": [
                {
                  "actionGroupExtractMode": "ITEM",
                  "layout": {
                    "layout": "FLEX"
                  },
                  "dataRegionType": "INHERIT",
                  "caption": "\u5934\u50CF",
                  "itemStyle": "DEFAULT",
                  "itemType": "CONTAINER",
                  "layoutPos": {
                    "shrink": 1,
                    "layout": "FLEX"
                  },
                  "id": "container6"
                },
                {
                  "actionGroupExtractMode": "ITEM",
                  "panelItems": [
                    {
                      "editor": {
                        "editorParams": {
                          "autocomplete": "true"
                        },
                        "editorType": "TEXTBOX",
                        "predefinedType": "AUTH_USERID",
                        "valueType": "SIMPLE",
                        "editable": true,
                        "id": "auth_userid"
                      },
                      "viewFieldName": "username",
                      "allowEmpty": true,
                      "caption": "\u7528\u6237\u540D",
                      "itemStyle": "DEFAULT",
                      "itemType": "FIELD",
                      "layoutPos": {
                        "shrink": 1,
                        "layout": "FLEX",
                        "spacingBottom": "INNERLARGE"
                      },
                      "id": "auth_userid"
                    },
                    {
                      "editor": {
                        "editorParams": {
                          "autocomplete": "true"
                        },
                        "editorType": "PASSWORD",
                        "predefinedType": "AUTH_PASSWORD",
                        "valueType": "SIMPLE",
                        "editable": true,
                        "id": "auth_password"
                      },
                      "viewFieldName": "password",
                      "allowEmpty": true,
                      "caption": "\u5BC6\u7801",
                      "itemStyle": "DEFAULT",
                      "itemType": "FIELD",
                      "layoutPos": {
                        "shrink": 1,
                        "layout": "FLEX",
                        "spacingBottom": "INNERLARGE"
                      },
                      "id": "auth_password"
                    },
                    {
                      "actionGroupExtractMode": "ITEM",
                      "predefinedType": "REMEMBER_ME",
                      "layout": {
                        "layout": "FLEX"
                      },
                      "dataRegionType": "INHERIT",
                      "capLanguageRes": {
                        "lanResTag": "COMMON.PRE_LAYOUT_REMEMBER_ME"
                      },
                      "caption": "\u8BB0\u4F4F\u6211",
                      "itemStyle": "DEFAULT",
                      "itemType": "CONTAINER",
                      "layoutPos": {
                        "shrink": 1,
                        "layout": "FLEX"
                      },
                      "id": "container7"
                    }
                  ],
                  "layout": {
                    "layout": "FLEX"
                  },
                  "dataRegionType": "INHERIT",
                  "caption": "\u5BB9\u5668",
                  "itemStyle": "DEFAULT",
                  "itemType": "CONTAINER",
                  "layoutPos": {
                    "shrink": 1,
                    "layout": "FLEX"
                  },
                  "id": "container2"
                },
                {
                  "actionGroupExtractMode": "ITEM",
                  "panelItems": [
                    {
                      "actionType": "UIACTION",
                      "buttonStyle": "DEFAULT",
                      "buttonType": "PANELBUTTON",
                      "uiactionId": "app_login",
                      "renderMode": "BUTTON",
                      "tooltip": "\u767B\u5F55",
                      "tooltipLanguageRes": {
                        "lanResTag": "COMMON.PRE_LAYOUT_LOGIN"
                      },
                      "capLanguageRes": {
                        "lanResTag": "COMMON.PRE_LAYOUT_LOGIN"
                      },
                      "caption": "\u767B\u5F55",
                      "itemStyle": "DEFAULT",
                      "itemType": "BUTTON",
                      "layoutPos": {
                        "shrink": 1,
                        "layout": "FLEX"
                      },
                      "showCaption": true,
                      "id": "auth_loginbutton"
                    },
                    {
                      "actionType": "UIACTION",
                      "buttonStyle": "DEFAULT",
                      "buttonType": "PANELBUTTON",
                      "uiactionId": "data_cancelchanges",
                      "renderMode": "BUTTON",
                      "tooltip": "\u91CD\u7F6E",
                      "tooltipLanguageRes": {
                        "lanResTag": "COMMON.PRE_LAYOUT_RESET"
                      },
                      "capLanguageRes": {
                        "lanResTag": "COMMON.PRE_LAYOUT_RESET"
                      },
                      "caption": "\u91CD\u7F6E",
                      "itemStyle": "DEFAULT",
                      "itemType": "BUTTON",
                      "layoutPos": {
                        "shrink": 1,
                        "layout": "FLEX"
                      },
                      "showCaption": true,
                      "id": "auth_resetinput"
                    }
                  ],
                  "layout": {
                    "align": "space-around",
                    "dir": "row",
                    "layout": "FLEX",
                    "valign": "center"
                  },
                  "dataRegionType": "INHERIT",
                  "caption": "\u5BB9\u5668",
                  "contentHeight": 80,
                  "height": 80,
                  "itemStyle": "DEFAULT",
                  "itemType": "CONTAINER",
                  "layoutPos": {
                    "shrink": 1,
                    "height": 80,
                    "heightMode": "PX",
                    "layout": "FLEX"
                  },
                  "id": "container3"
                }
              ],
              "layout": {
                "layout": "FLEX"
              },
              "dataRegionType": "INHERIT",
              "caption": "\u5BB9\u5668",
              "itemStyle": "DEFAULT",
              "itemType": "CONTAINER",
              "layoutPos": {
                "shrink": 1,
                "layout": "FLEX"
              },
              "id": "container5"
            }
          ],
          "layout": {
            "layout": "FLEX"
          },
          "dataRegionType": "INHERIT",
          "caption": "\u5BB9\u5668",
          "itemStyle": "DEFAULT",
          "itemType": "CONTAINER",
          "layoutPos": {
            "shrink": 1,
            "layout": "FLEX"
          },
          "id": "container1"
        }
      ],
      "predefinedType": "APPLOGINVIEW",
      "layout": {
        "align": "center",
        "layout": "FLEX",
        "valign": "center"
      },
      "dataRegionType": "INHERIT",
      "caption": "\u5BB9\u5668",
      "itemStyle": "DEFAULT",
      "itemType": "CONTAINER",
      "layoutPos": {
        "grow": 1,
        "shrink": 1,
        "layout": "FLEX"
      },
      "id": "container"
    }
  ],
  "layoutPanel": true,
  "codeName": "AppLoginViewLayout",
  "controlType": "VIEWLAYOUTPANEL",
  "logicName": "\u5E94\u7528\u767B\u5F55\u89C6\u56FE",
  "controlParam": {},
  "modelId": "D9ECA0E6-8AF7-4672-B158-1EB694ACB6FD",
  "modelType": "PSSYSVIEWLAYOUTPANEL",
  "name": "layoutpanel",
  "id": "apploginviewlayout"
};

export { AppLoginView as default };
