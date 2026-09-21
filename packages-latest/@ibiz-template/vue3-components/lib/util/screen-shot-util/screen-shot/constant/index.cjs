'use strict';

require('../icon/index.cjs');
var index = require('../type/index.cjs');
var icon = require('../icon/icon.cjs');

"use strict";
function getDefaultToolbarItems() {
  return [
    {
      icon: icon.BrushIcon,
      type: index.ToolbarItemType.BRUSH,
      text: ibiz.i18n.t("util.screenShotUtil.brush"),
      sizeOpts: [
        {
          value: 2,
          type: "small",
          text: ibiz.i18n.t("util.screenShotUtil.small")
        },
        {
          value: 4,
          type: "medium",
          text: ibiz.i18n.t("util.screenShotUtil.medium")
        },
        {
          value: 8,
          type: "big",
          text: ibiz.i18n.t("util.screenShotUtil.big")
        }
      ],
      size: 2,
      color: "#F53340"
    },
    {
      icon: icon.RectIcon,
      type: index.ToolbarItemType.RECT,
      text: ibiz.i18n.t("util.screenShotUtil.rect"),
      sizeOpts: [
        {
          value: 2,
          type: "small",
          text: ibiz.i18n.t("util.screenShotUtil.small")
        },
        {
          value: 4,
          type: "medium",
          text: ibiz.i18n.t("util.screenShotUtil.medium")
        },
        {
          value: 8,
          type: "big",
          text: ibiz.i18n.t("util.screenShotUtil.big")
        }
      ],
      size: 2,
      color: "#F53340"
    },
    {
      icon: icon.CircleIcon,
      type: index.ToolbarItemType.CIRCLE,
      text: ibiz.i18n.t("util.screenShotUtil.circle"),
      sizeOpts: [
        {
          value: 2,
          type: "small",
          text: ibiz.i18n.t("util.screenShotUtil.small")
        },
        {
          value: 4,
          type: "medium",
          text: ibiz.i18n.t("util.screenShotUtil.medium")
        },
        {
          value: 8,
          type: "big",
          text: ibiz.i18n.t("util.screenShotUtil.big")
        }
      ],
      size: 2,
      color: "#F53340"
    },
    {
      icon: icon.MosaicIcon,
      type: index.ToolbarItemType.MOSAIC,
      text: ibiz.i18n.t("util.screenShotUtil.mosaic"),
      sizeOpts: [
        {
          value: 10,
          type: "small",
          text: ibiz.i18n.t("util.screenShotUtil.small")
        },
        {
          value: 15,
          type: "medium",
          text: ibiz.i18n.t("util.screenShotUtil.medium")
        },
        {
          value: 20,
          type: "big",
          text: ibiz.i18n.t("util.screenShotUtil.big")
        }
      ],
      size: 10
    },
    {
      // 文本注释 - 文字标注
      icon: icon.TextIcon,
      type: index.ToolbarItemType.TEXT,
      text: ibiz.i18n.t("util.screenShotUtil.text"),
      sizeOpts: [
        {
          value: 16,
          type: "small",
          text: ibiz.i18n.t("util.screenShotUtil.small")
        },
        {
          value: 20,
          type: "medium",
          text: ibiz.i18n.t("util.screenShotUtil.medium")
        },
        {
          value: 24,
          type: "big",
          text: ibiz.i18n.t("util.screenShotUtil.big")
        }
      ],
      size: 16,
      color: "#F53340"
    },
    {
      // 箭头工具 - 箭头标注
      icon: icon.ArrowIcon,
      type: index.ToolbarItemType.ARROW,
      text: ibiz.i18n.t("util.screenShotUtil.arrow"),
      sizeOpts: [
        {
          value: 2,
          type: "small",
          text: ibiz.i18n.t("util.screenShotUtil.small")
        },
        {
          value: 4,
          type: "medium",
          text: ibiz.i18n.t("util.screenShotUtil.medium")
        },
        {
          value: 8,
          type: "big",
          text: ibiz.i18n.t("util.screenShotUtil.big")
        }
      ],
      size: 2,
      color: "#F53340"
    },
    {
      // 分割项 - 视觉分隔线（无交互）
      type: index.ToolbarItemType.DIVIDER
    },
    {
      // 回撤
      icon: icon.DrawdownIcon,
      type: index.ToolbarItemType.DRAWDOWN,
      text: ibiz.i18n.t("util.screenShotUtil.drawdown")
    },
    {
      // AI助手 - AI分析/标注
      icon: icon.AIIcon,
      type: index.ToolbarItemType.AI,
      text: "AI"
    },
    {
      // 关闭
      icon: icon.CloseIcon,
      type: index.ToolbarItemType.CLOSE,
      text: ibiz.i18n.t("app.close")
    }
  ];
}

exports.getDefaultToolbarItems = getDefaultToolbarItems;
