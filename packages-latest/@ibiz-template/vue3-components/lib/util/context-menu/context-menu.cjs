'use strict';

var vue = require('vue');

"use strict";
function useContextMenu() {
  const iBizIcon = vue.resolveComponent("IBizIcon");
  const calcUiactionGroupDetail = (detail, menuState, onUIActionClick) => {
    var _a, _b, _c, _d, _e, _f;
    const detailState = menuState[detail.id];
    const { sysImage } = detail;
    const uiactionGroup = detail;
    const caption = ((_a = uiactionGroup.refUIActionGroup) == null ? void 0 : _a.name) || ((_b = uiactionGroup.refUIActionGroup) == null ? void 0 : _b.id) || uiactionGroup.caption;
    const menuItem = {
      label: detail.showCaption ? caption : void 0,
      icon: detail.showIcon ? vue.h(iBizIcon, { icon: sysImage }) : void 0,
      disabled: detailState.disabled,
      clickableWhenHasChildren: true,
      onClick: () => {
        onUIActionClick == null ? void 0 : onUIActionClick(detail);
      }
    };
    if (uiactionGroup.detailType === "DEUIACTIONGROUP" && ((_c = uiactionGroup.refUIActionGroup) == null ? void 0 : _c.dynamicMode) === 1 && ((_e = (_d = uiactionGroup.refUIActionGroup) == null ? void 0 : _d.uiactionGroupDetails) == null ? void 0 : _e.length)) {
      menuItem.children = calcSubUiactionGroupDetails(
        (_f = uiactionGroup.refUIActionGroup) == null ? void 0 : _f.uiactionGroupDetails,
        menuState,
        onUIActionClick
      );
    }
    return menuItem;
  };
  const calcSubUiactionGroupDetails = (uiactionGroupDetails, menuState, onUIActionClick) => {
    return uiactionGroupDetails == null ? void 0 : uiactionGroupDetails.filter((detail) => {
      const detailState = menuState[detail.id];
      return detailState.visible;
    }).map((detail) => {
      return calcUiactionGroupDetail(detail, menuState, onUIActionClick);
    });
  };
  const calcUiactionGroup = (uiactionGroup, menuState, onUIActionClick) => {
    const menuItems = calcSubUiactionGroupDetails(
      uiactionGroup.uiactionGroupDetails,
      menuState,
      onUIActionClick
    );
    return menuItems;
  };
  return {
    calcUiactionGroupDetail,
    calcUiactionGroup
  };
}

exports.useContextMenu = useContextMenu;
