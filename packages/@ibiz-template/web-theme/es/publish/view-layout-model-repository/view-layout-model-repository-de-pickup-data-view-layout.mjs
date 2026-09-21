"use strict";
var DEPickupDataView = {
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
              "caption": "\u641C\u7D22\u8868\u5355",
              "itemStyle": "DEFAULT",
              "itemType": "CTRLPOS",
              "layoutPos": {
                "shrink": 1,
                "layout": "FLEX"
              },
              "showCaption": true,
              "id": "searchform"
            }
          ],
          "layout": {
            "dir": "column",
            "layout": "FLEX"
          },
          "dataRegionType": "INHERIT",
          "itemStyle": "DEFAULT",
          "itemType": "CONTAINER",
          "layoutPos": {
            "shrink": 0,
            "layout": "FLEX"
          },
          "id": "view_searchform"
        }
      ],
      "predefinedType": "PANELPART",
      "layout": {
        "layout": "FLEX"
      },
      "dataRegionType": "INHERIT",
      "caption": "\u5F15\u7528\u5E03\u5C40\u9762\u677F",
      "itemStyle": "DEFAULT",
      "itemType": "CONTAINER",
      "layoutPos": {
        "shrink": 1,
        "layout": "FLEX"
      },
      "showCaption": true,
      "id": "panelpart"
    },
    {
      "caption": "\u6570\u636E\u89C6\u56FE",
      "itemStyle": "DEFAULT",
      "itemType": "CTRLPOS",
      "layoutPos": {
        "grow": 1,
        "shrink": 1,
        "layout": "FLEX"
      },
      "showCaption": true,
      "id": "dataview"
    }
  ],
  "layoutPanel": true,
  "codeName": "PickupDataViewLayout",
  "controlType": "VIEWLAYOUTPANEL",
  "logicName": "\u5B9E\u4F53\u9009\u62E9\u6570\u636E\u89C6\u56FE\u5E03\u5C40\u9762\u677F(\u9884\u7F6E\u6A21\u578B)",
  "appDataEntityId": "frontmodel.viewlayoutmodelrepository",
  "controlParam": {},
  "modelId": "544D9466-A960-4F78-A934-946B7190670A",
  "modelType": "PSSYSVIEWLAYOUTPANEL",
  "name": "layoutpanel",
  "id": "pickupdataviewlayout"
};

export { DEPickupDataView as default };
