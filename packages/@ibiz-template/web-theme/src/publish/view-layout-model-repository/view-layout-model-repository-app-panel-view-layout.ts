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
          "caption": "面板部件",
          "itemStyle": "DEFAULT",
          "itemType": "CTRLPOS",
          "layoutPos": {
            "shrink": 1,
            "heightMode": "FULL",
            "layout": "FLEX",
            "widthMode": "FULL"
          },
          "showCaption": true,
          "id": "panel"
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
        "shrink": 1,
        "heightMode": "FULL",
        "layout": "FLEX",
        "widthMode": "FULL"
      },
      "id": "page_container"
    }
  ],
  "layoutPanel": true,
  "controls": [
    {
      "capLanguageRes": {
        "lanResTag": "DE.LNAME.VIEWLAYOUTMODELREPOSITORY"
      },
      "caption": "应用面板视图布局面板",
      "codeName": "AppPanelViewLayoutcaptionbar",
      "controlType": "CAPTIONBAR",
      "appDataEntityId": "frontmodel.viewlayoutmodelrepository",
      "controlParam": {},
      "name": "captionbar",
      "id": "apppanelviewlayoutcaptionbar"
    }
  ],
  "codeName": "Usr0411453122",
  "controlType": "VIEWLAYOUTPANEL",
  "logicName": "应用面板视图布局面板布局面板",
  "appDataEntityId": "frontmodel.viewlayoutmodelrepository",
  "controlParam": {},
  "modelId": "156BD126-E52E-4B5B-8095-1CF76252B9C7",
  "modelType": "PSSYSVIEWLAYOUTPANEL",
  "name": "layoutpanel",
  "id": "usr0411453122"
}
