'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

"use strict";
var DEWFDynaActionView = {
  "layoutMode": "FLEX",
  "layout": {
    "layout": "FLEX"
  },
  "rootPanelItems": [
    {
      "rawItem": {
        "rawItemParams": [
          {
            "key": "POSITION",
            "value": "TOP"
          }
        ],
        "predefinedType": "VIEWMSG_POS",
        "id": "viewmsg_pos_top"
      },
      "caption": "\u89C6\u56FE\u6D88\u606F\u5360\u4F4D",
      "itemStyle": "DEFAULT",
      "itemType": "RAWITEM",
      "layoutPos": {
        "shrink": 0,
        "layout": "FLEX"
      },
      "showCaption": true,
      "id": "viewmsg_pos_top"
    },
    {
      "rawItem": {
        "rawItemParams": [
          {
            "key": "POSITION",
            "value": "BODY"
          }
        ],
        "predefinedType": "VIEWMSG_POS",
        "id": "viewmsg_pos_body"
      },
      "caption": "\u89C6\u56FE\u6D88\u606F\u5360\u4F4D",
      "itemStyle": "DEFAULT",
      "itemType": "RAWITEM",
      "layoutPos": {
        "shrink": 0,
        "layout": "FLEX"
      },
      "showCaption": true,
      "id": "viewmsg_pos_body"
    },
    {
      "actionGroupExtractMode": "ITEM",
      "panelItems": [
        {
          "caption": "\u8868\u5355",
          "itemStyle": "DEFAULT",
          "itemType": "CTRLPOS",
          "layoutPos": {
            "shrink": 1,
            "layout": "FLEX"
          },
          "showCaption": true,
          "id": "form"
        }
      ],
      "predefinedType": "VIEWCONTENT",
      "layout": {
        "layout": "FLEX"
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
      "id": "view_content"
    },
    {
      "actionGroupExtractMode": "ITEM",
      "panelItems": [
        {
          "actionType": "UIACTION",
          "buttonStyle": "INFO",
          "buttonType": "PANELBUTTON",
          "uiactionId": "view_cancelaction",
          "renderMode": "BUTTON",
          "tooltip": "\u53D6\u6D88",
          "tooltipLanguageRes": {
            "lanResTag": "COMMON.PRE_LAYOUT_CANCEL"
          },
          "capLanguageRes": {
            "lanResTag": "COMMON.PRE_LAYOUT_CANCEL"
          },
          "caption": "\u53D6\u6D88",
          "itemStyle": "INFO",
          "itemType": "BUTTON",
          "layoutPos": {
            "shrink": 1,
            "layout": "FLEX"
          },
          "showCaption": true,
          "id": "button_cancelaction"
        },
        {
          "actionType": "UIACTION",
          "buttonStyle": "PRIMARY",
          "buttonType": "PANELBUTTON",
          "uiactionId": "view_okaction",
          "renderMode": "BUTTON",
          "tooltip": "\u786E\u5B9A",
          "tooltipLanguageRes": {
            "lanResTag": "COMMON.PRE_LAYOUT_CONFIRM"
          },
          "capLanguageRes": {
            "lanResTag": "COMMON.PRE_LAYOUT_CONFIRM"
          },
          "caption": "\u786E\u5B9A",
          "itemStyle": "PRIMARY",
          "itemType": "BUTTON",
          "layoutPos": {
            "shrink": 1,
            "layout": "FLEX",
            "spacingRight": "OUTERMEDIUM"
          },
          "showCaption": true,
          "id": "button_okaction"
        }
      ],
      "layout": {
        "dir": "row-reverse",
        "layout": "FLEX",
        "valign": "center"
      },
      "dataRegionType": "INHERIT",
      "caption": "\u5BB9\u5668",
      "itemStyle": "DEFAULT",
      "itemType": "CONTAINER",
      "layoutPos": {
        "shrink": 0,
        "layout": "FLEX"
      },
      "id": "view_footer"
    },
    {
      "rawItem": {
        "rawItemParams": [
          {
            "key": "POSITION",
            "value": "BOTTOM"
          }
        ],
        "predefinedType": "VIEWMSG_POS",
        "id": "viewmsg_pos_bottom"
      },
      "caption": "\u89C6\u56FE\u6D88\u606F\u5360\u4F4D",
      "itemStyle": "DEFAULT",
      "itemType": "RAWITEM",
      "layoutPos": {
        "shrink": 0,
        "layout": "FLEX"
      },
      "showCaption": true,
      "id": "viewmsg_pos_bottom"
    }
  ],
  "layoutPanel": true,
  "codeName": "WFDynaActionViewLayout",
  "controlType": "VIEWLAYOUTPANEL",
  "logicName": "\u5B9E\u4F53\u5DE5\u4F5C\u6D41\u52A8\u6001\u64CD\u4F5C\u89C6\u56FE\u5E03\u5C40\u9762\u677F(\u9884\u7F6E\u6A21\u578B)",
  "appDataEntityId": "frontmodel.viewlayoutmodelrepository",
  "controlParam": {},
  "modelId": "EE9AFD2D-5F78-477C-9C3A-86A2F7E7A34E",
  "modelType": "PSSYSVIEWLAYOUTPANEL",
  "name": "layoutpanel",
  "id": "wfdynaactionviewlayout"
};

exports.default = DEWFDynaActionView;
