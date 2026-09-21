export default {
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
                    "caption": "应用登录视图",
                    "halign": "LEFT",
                    "renderMode": "TEXT",
                    "valign": "MIDDLE",
                    "wrapMode": "NOWRAP",
                    "contentType": "RAW",
                    "predefinedType": "STATIC_TEXT",
                    "id": "static_text"
                  },
                  "caption": "文本",
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
              "caption": "容器",
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
                  "caption": "头像",
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
                      "caption": "用户名",
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
                      "caption": "密码",
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
                      "caption": "记住我",
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
                  "caption": "容器",
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
                      "tooltip": "登录",
                      "caption": "登录",
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
                      "tooltip": "重置",
                      "caption": "重置",
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
                  "caption": "容器",
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
              "caption": "容器",
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
          "caption": "容器",
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
      "caption": "容器",
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
  "logicName": "应用登录视图",
  "controlParam": {},
  "modelId": "D9ECA0E6-8AF7-4672-B158-1EB694ACB6FD",
  "modelType": "PSSYSVIEWLAYOUTPANEL",
  "name": "layoutpanel",
  "id": "apploginviewlayout"
}
