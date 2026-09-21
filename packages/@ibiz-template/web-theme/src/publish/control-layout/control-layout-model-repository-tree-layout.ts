export default {
  "viewProxyMode": true,
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
              "caption": "搜索栏",
              "itemStyle": "DEFAULT",
              "itemType": "CTRLPOS",
              "layoutPos": {
                "shrink": 1,
                "layout": "FLEX"
              },
              "showCaption": true,
              "id": "searchbar"
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
          "id": "control_searchbar"
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
        "shrink": 0,
        "layout": "FLEX"
      },
      "id": "control_header"
    },
    {
      "actionGroupExtractMode": "ITEM",
      "panelItems": [
        {
          "caption": "树视图",
          "itemStyle": "DEFAULT",
          "itemType": "CTRLPOS",
          "layoutPos": {
            "grow": 1,
            "shrink": 1,
            "layout": "FLEX"
          },
          "showCaption": true,
          "id": "tree"
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
        "grow": 1,
        "shrink": 1,
        "layout": "FLEX"
      },
      "id": "control_tree"
    }
  ],
  "layoutPanel": true,
  "controls": [
    {
      "capLanguageRes": {
        "lanResTag": "DE.LNAME.CONTROLLAYOUTMODELREPOSITORY"
      },
      "caption": "树部件布局",
      "codeName": "TreeLayoutcaptionbar",
      "controlType": "CAPTIONBAR",
      "appDataEntityId": "frontmodel.controllayoutmodelrepository",
      "controlParam": {},
      "name": "captionbar",
      "id": "treelayoutcaptionbar"
    }
  ],
  "codeName": "TreeLayout",
  "controlType": "VIEWLAYOUTPANEL",
  "logicName": "部件-树部件布局面板",
  "appDataEntityId": "frontmodel.controllayoutmodelrepository",
  "controlParam": {},
  "modelId": "E7B84D89-4C67-416C-891B-5DF639AD2F85",
  "modelType": "PSSYSVIEWLAYOUTPANEL",
  "name": "layoutpanel",
  "id": "treelayout"
}
