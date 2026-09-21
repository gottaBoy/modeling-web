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
          "rawItem": {
            "caption": "排序栏（SORTBAR）",
            "halign": "LEFT",
            "valign": "MIDDLE",
            "wrapMode": "NOWRAP",
            "contentType": "RAW",
            "predefinedType": "SORTBAR",
            "id": "sortbar"
          },
          "caption": "排序栏",
          "itemStyle": "DEFAULT",
          "itemType": "RAWITEM",
          "layoutPos": {
            "grow": 1,
            "shrink": 1,
            "layout": "FLEX"
          },
          "showCaption": true,
          "id": "sortbar"
        },
        {
          "caption": "搜索栏",
          "itemStyle": "DEFAULT",
          "itemType": "CTRLPOS",
          "layoutPos": {
            "shrink": 0,
            "layout": "FLEX",
            "spacingBottom": "OUTERSMALL",
            "spacingLeft": "OUTERSMALL",
            "spacingRight": "OUTERSMALL",
            "spacingTop": "OUTERSMALL"
          },
          "showCaption": true,
          "id": "searchbar"
        }
      ],
      "layout": {
        "align": "space-between",
        "dir": "row",
        "layout": "FLEX"
      },
      "dataRegionType": "INHERIT",
      "caption": "容器",
      "itemStyle": "DEFAULT",
      "itemType": "CONTAINER",
      "layoutPos": {
        "shrink": 0,
        "layout": "FLEX",
        "spacingBottom": "OUTERSMALL"
      },
      "id": "control_header"
    },
    {
      "actionGroupExtractMode": "ITEM",
      "panelItems": [
        {
          "caption": "数据视图",
          "itemStyle": "DEFAULT",
          "itemType": "CTRLPOS",
          "layoutPos": {
            "grow": 1,
            "shrink": 1,
            "layout": "FLEX"
          },
          "showCaption": true,
          "id": "dataview"
        },
        {
          "actionGroupExtractMode": "ITEM",
          "panelItems": [
            {
              "rawItem": {
                "caption": "分页栏（PAGINGBAR）",
                "halign": "LEFT",
                "renderMode": "PARAGRAPH",
                "valign": "MIDDLE",
                "wrapMode": "NOWRAP",
                "contentType": "RAW",
                "predefinedType": "PAGINGBAR",
                "id": "pagingbar"
              },
              "caption": "分页栏",
              "itemStyle": "DEFAULT",
              "itemType": "RAWITEM",
              "layoutPos": {
                "shrink": 0,
                "layout": "FLEX"
              },
              "showCaption": true,
              "id": "pagingbar"
            }
          ],
          "layout": {
            "dir": "row-reverse",
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
          "id": "container"
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
      "id": "control_content"
    }
  ],
  "layoutPanel": true,
  "controls": [
    {
      "capLanguageRes": {
        "lanResTag": "DE.LNAME.CONTROLLAYOUTMODELREPOSITORY"
      },
      "caption": "数据视图部件布局",
      "codeName": "DataViewLayoutcaptionbar",
      "controlType": "CAPTIONBAR",
      "appDataEntityId": "frontmodel.controllayoutmodelrepository",
      "controlParam": {},
      "name": "captionbar",
      "id": "dataviewlayoutcaptionbar"
    }
  ],
  "codeName": "CardLayout",
  "controlType": "VIEWLAYOUTPANEL",
  "logicName": "部件-数据视图部件布局面板",
  "appDataEntityId": "frontmodel.controllayoutmodelrepository",
  "controlParam": {},
  "modelId": "84218AD7-144D-4C11-BC8A-2AFC0324EC7E",
  "modelType": "PSSYSVIEWLAYOUTPANEL",
  "name": "layoutpanel",
  "id": "cardlayout"
}
