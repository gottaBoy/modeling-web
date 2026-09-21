'use strict';

"use strict";
function calcGridSpanOffset(layoutPos) {
  const {
    layout,
    colXS,
    colSM,
    colMD,
    colLG,
    colXSOffset,
    colSMOffset,
    colMDOffset,
    colLGOffset
  } = layoutPos;
  const _span = colLG || colMD || colSM || colXS;
  const _offset = colLGOffset || colMDOffset || colSMOffset || colXSOffset;
  const spanDefault = layout === "TABLE_24COL" ? 24 : 12;
  const span = !_span || _span === -1 ? 1 : _span / spanDefault;
  const offset = !_offset || _offset === -1 ? 0 : _offset / spanDefault;
  return { span, offset };
}
function calculateXYPositions(items, parentPos) {
  let currentRowWidth = 0;
  let currentY = 0;
  let currentRowHeight = 0;
  items.forEach((item) => {
    if (currentRowWidth + item.x + item.w > parentPos.w) {
      currentY += currentRowHeight;
      currentRowWidth = 0;
      currentRowHeight = 0;
    }
    item.x = currentRowWidth + item.x;
    item.y = currentY;
    currentRowWidth += item.x + item.w - currentRowWidth;
    currentRowHeight = Math.max(currentRowHeight, item.h);
  });
  items.forEach((item) => {
    item.x += parentPos.x;
  });
}
function calculatePositions(items, parentPos) {
  const { dir, align, valign } = parentPos.layout;
  const flexLayoutPos = [];
  const models = (dir == null ? void 0 : dir.includes("reverse")) ? items.toReversed() : items;
  if (dir == null ? void 0 : dir.includes("row")) {
    const W = parseFloat((parentPos.w / models.length).toFixed(1));
    let widthSum = 0;
    let growCount = 0;
    let shrinkCont = 0;
    models.forEach((model) => {
      const { grow, width } = model.layoutPos;
      if (grow || !width) {
        growCount++;
      } else {
        shrinkCont++;
        widthSum += parseFloat((width / 100).toFixed(1));
      }
    });
    const fixedWidthSum = widthSum > W * shrinkCont ? W * shrinkCont : widthSum;
    const remainingWidth = parentPos.w - fixedWidthSum;
    const growWidth = growCount > 0 ? remainingWidth / growCount : 0;
    models.forEach((model) => {
      const { grow, width } = model.layoutPos;
      flexLayoutPos.push({
        x: 0,
        model,
        w: grow || !width ? growWidth : parseFloat((width / 100).toFixed(1))
      });
    });
    const flexW = flexLayoutPos.reduce((sum, element) => sum + element.w, 0);
    const poorW = parentPos.w - flexW;
    switch (align) {
      case "flex-start":
        if (dir === "row-reverse") {
          flexLayoutPos[0].x = poorW;
        }
        break;
      case "flex-end":
        if (dir === "row") {
          flexLayoutPos[0].x = poorW;
        }
        break;
      case "center":
        if (poorW) {
          flexLayoutPos[0].x = poorW / 2;
        }
        break;
      case "space-between":
        if (poorW && flexLayoutPos.length > 1) {
          const x = poorW / (flexLayoutPos.length - 1);
          flexLayoutPos.forEach((f, index) => {
            if (index !== 0) {
              f.x = x;
            }
          });
        }
        break;
      case "space-around":
        if (poorW) {
          const x = poorW / (flexLayoutPos.length * 2);
          flexLayoutPos.forEach((f, index) => {
            if (index === 0) {
              f.x = x;
            } else {
              f.x = x * 2;
            }
          });
        }
        break;
      default:
        break;
    }
  }
  if (dir == null ? void 0 : dir.includes("column")) {
    models.forEach((model) => {
      const { width } = model.layoutPos;
      let x = 0;
      let w = parentPos.w;
      if (width) {
        w = width / 100 > 1 && width / 100 < parentPos.w ? width / 100 : parentPos.w;
      }
      const poorW = parentPos.w - w;
      switch (valign) {
        case "flex-end":
          x = poorW;
          break;
        case "center":
          if (poorW) {
            x = (parentPos.w - w) / 2;
          }
          break;
        default:
          break;
      }
      flexLayoutPos.push({
        x,
        w,
        model
      });
    });
  }
  return flexLayoutPos;
}
function loadDefaultLayoutModel(dashboard, customDashboard) {
  var _a;
  const { layoutRowH, layoutColNum } = customDashboard;
  const app = ibiz.hub.getApp(dashboard.model.appId);
  const recursivePortlePart = (container, parentPos) => {
    const { controls, layout } = container;
    const children = (controls == null ? void 0 : controls.filter((child) => !!child.layoutPos)) || [];
    const portletLayoutPos = [];
    const childrenLayoutPos = [];
    if ((layout == null ? void 0 : layout.layout) === "TABLE_24COL" || (layout == null ? void 0 : layout.layout) === "TABLE_12COL") {
      children.forEach((model) => {
        var _a2;
        const { height } = model.layoutPos;
        const { span, offset } = calcGridSpanOffset(model.layoutPos);
        const w = span * parentPos.w;
        const x = offset * parentPos.w;
        let h = height ? height / layoutRowH : 3;
        if (model.portletType === "CONTAINER" && ((_a2 = model.controls) == null ? void 0 : _a2.length)) {
          const _childrenLayoutPos = recursivePortlePart(model, { w, x });
          h = _childrenLayoutPos.reduce((max, current) => {
            return Math.max(max, current.y + current.h);
          }, -Infinity);
          childrenLayoutPos.push(..._childrenLayoutPos);
        }
        portletLayoutPos.push({
          w,
          x,
          h,
          y: 0,
          model,
          parentId: container.codeName
        });
      });
    } else if ((layout == null ? void 0 : layout.layout) === "FLEX") {
      const flexLayoutPos = calculatePositions(children, {
        ...parentPos,
        layout
      });
      flexLayoutPos.forEach((pos) => {
        var _a2;
        const { x, w, model } = pos;
        const { height } = model.layoutPos;
        let h = height ? height / layoutRowH : 3;
        if (model.portletType === "CONTAINER" && ((_a2 = model.controls) == null ? void 0 : _a2.length)) {
          const _childrenLayoutPos = recursivePortlePart(model, { w, x });
          h = _childrenLayoutPos.reduce((max, current) => {
            return Math.max(max, current.y + current.h);
          }, -Infinity);
          childrenLayoutPos.push(..._childrenLayoutPos);
        }
        portletLayoutPos.push({
          w,
          x,
          h,
          y: 0,
          model,
          parentId: container.codeName
        });
      });
    }
    calculateXYPositions(portletLayoutPos, parentPos);
    portletLayoutPos.forEach((layoutPos) => {
      if (layoutPos.model.portletType === "CONTAINER") {
        const _children = childrenLayoutPos.filter(
          (child) => child.parentId === layoutPos.model.codeName
        );
        _children.forEach((child) => {
          child.x += layoutPos.x;
          child.y += layoutPos.y;
        });
      }
    });
    const modelLayoutPos = portletLayoutPos.filter(
      (layoutPos) => !["CONTAINER", "RAWITEM"].includes(layoutPos.model.portletType)
    );
    modelLayoutPos.push(...childrenLayoutPos);
    return modelLayoutPos;
  };
  const layoutModel = [];
  if ((_a = dashboard.model.controls) == null ? void 0 : _a.length) {
    const modelLayoutPos = recursivePortlePart(dashboard.model, {
      x: 0,
      w: layoutColNum
    });
    modelLayoutPos.forEach((layout) => {
      const { x, y, w, h, model } = layout;
      layoutModel.push({
        x,
        y,
        w,
        h,
        i: model.codeName,
        appName: app.model.name,
        portletName: model.title,
        portletImage: model.sysImage,
        portletCodeName: model.codeName,
        appCodeName: model.appDataEntityId || app.model.pkgcodeName
      });
    });
  }
  return layoutModel;
}

exports.loadDefaultLayoutModel = loadDefaultLayoutModel;
