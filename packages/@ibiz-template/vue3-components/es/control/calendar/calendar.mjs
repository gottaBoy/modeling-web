import { isVNode, defineComponent, ref, watch, resolveComponent, createVNode } from 'vue';
import { useControlController, useNamespace, hasEmptyPanelRenderer, IBizCustomRender } from '@ibiz-template/vue3-util';
import { CalendarController } from '@ibiz-template/runtime';
import dayjs from 'dayjs';
import { showTitle } from '@ibiz-template/core';
import { IBizCustomCalendar } from './components/custom-calendar/index.mjs';
import { getWeekRange, isTimeBetween } from './calendar-util.mjs';
import './calendar.css';

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const CalendarControl = /* @__PURE__ */ defineComponent({
  name: "IBizCalendarControl",
  props: {
    modelData: {
      type: Object,
      required: true
    },
    context: {
      type: Object,
      required: true
    },
    params: {
      type: Object,
      default: () => ({})
    },
    provider: {
      type: Object
    },
    mdctrlActiveMode: {
      type: Number,
      default: void 0
    },
    isSimple: {
      type: Boolean,
      required: false
    },
    loadDefault: {
      type: Boolean,
      default: true
    }
  },
  setup() {
    const c = useControlController((...args) => new CalendarController(...args));
    const ns = useNamespace("control-".concat(c.model.controlType.toLowerCase()));
    const calendarRef = ref();
    const curPopover = ref();
    const showDateRange = ref(c.controlParams.showmode === "daterange");
    const popoverValue = ref("");
    const selectDate = (tag) => {
      if (!calendarRef.value)
        return;
      calendarRef.value.selectDate(tag);
    };
    c.evt.on("onActive", () => {
      if (curPopover.value) {
        curPopover.value.hide();
        curPopover.value = void 0;
      }
    });
    const getMondayDate = (date) => {
      const weekDay = date.getDay();
      let startDate;
      if (weekDay === 0) {
        startDate = date.getTime() - 6 * 24 * 60 * 60 * 1e3;
      } else {
        startDate = date.getTime() - (weekDay - 1) * 24 * 60 * 60 * 1e3;
      }
      return dayjs(new Date(startDate)).format("YYYY-MM-DD");
    };
    const timeRangeComparison = (newVal, oldVal) => {
      if (c.model.calendarStyle === "WEEK" || c.model.calendarStyle === "USER") {
        const newMonday = getMondayDate(newVal);
        const oldMonday = getMondayDate(oldVal);
        if (newMonday === oldMonday) {
          return true;
        }
        return false;
      }
      if (c.model.calendarStyle === "DAY") {
        const newDay = dayjs(newVal).format("YYYY-MM-DD");
        const oldDay = dayjs(oldVal).format("YYYY-MM-DD");
        if (newDay === oldDay) {
          return true;
        }
        return false;
      }
      if (c.model.calendarStyle === "MONTH") {
        const oldDateString = dayjs(oldVal).format("YYYY-MM");
        const newDateString = dayjs(newVal).format("YYYY-MM");
        if (oldDateString === newDateString) {
          return true;
        }
        return false;
      }
      return false;
    };
    watch(() => c.state.selectedDate, (newVal, oldVal) => {
      if (timeRangeComparison(newVal, oldVal)) {
        return;
      }
      c.load();
    });
    const calcItemStyle = (data) => {
      return {
        color: data.color,
        backgroundColor: data.bkColor
      };
    };
    const calcCalendarItems = (date) => {
      const weekRange = getWeekRange(date);
      const calendarItems = c.state.items.filter((item) => {
        if (!showDateRange.value) {
          return dayjs(date).isSame(item.beginTime, "day");
        }
        return weekRange.some((_date) => isTimeBetween({
          beginTime: item.beginTime,
          endTime: item.endTime,
          date: _date
        }));
      });
      if (showDateRange.value) {
        calendarItems.sort((a, b) => {
          let result = 0;
          if (dayjs(a.beginTime).isSame(b.beginTime, "day")) {
            result = dayjs(a.endTime).isAfter(b.endTime) ? -1 : 1;
          } else {
            result = dayjs(a.beginTime).isAfter(b.beginTime) ? 1 : -1;
          }
          return result;
        });
      }
      return calendarItems;
    };
    let ContextMenu;
    const iBizRawItem = resolveComponent("IBizRawItem");
    const iBizIcon = resolveComponent("IBizIcon");
    c.evt.on("onMounted", () => {
      if (Object.values(c.contextMenus).length > 0) {
        const importMenu = () => import('@imengyu/vue3-context-menu');
        importMenu().then((value) => {
          ContextMenu = value.default;
          if (ContextMenu.default && !ContextMenu.showContextMenu) {
            ContextMenu = ContextMenu.default;
          }
        });
      }
    });
    const calcContextMenuItems = (toolbarItems, calendarData, evt, menuState) => {
      const result = [];
      toolbarItems.forEach((item) => {
        var _a, _b;
        if (item.itemType === "SEPERATOR") {
          result.push({
            divided: "self"
          });
          return;
        }
        const buttonState = menuState[item.id];
        if (buttonState && !buttonState.visible) {
          return;
        }
        let menuItem = {};
        if (item.showCaption && item.caption) {
          menuItem.label = item.caption;
        }
        if (item.sysImage && item.showIcon) {
          menuItem.icon = createVNode(iBizIcon, {
            "icon": item.sysImage
          }, null);
        }
        if (item.itemType === "DEUIACTION") {
          menuItem.disabled = buttonState.disabled;
          menuItem.clickClose = true;
          const {
            uiactionId
          } = item;
          if (uiactionId) {
            menuItem.onClick = () => {
              c.doUIAction(uiactionId, calendarData, evt, item.appId);
            };
          }
        } else if (item.itemType === "RAWITEM") {
          const {
            rawItem
          } = item;
          if (rawItem) {
            menuItem.label = createVNode(iBizRawItem, {
              "rawItem": item
            }, null);
          }
        } else if (item.itemType === "ITEMS") {
          const group = item;
          if ((_a = group.detoolbarItems) == null ? void 0 : _a.length) {
            menuItem.children = calcContextMenuItems(group.detoolbarItems, calendarData, evt, menuState);
          }
          if (group.uiactionGroup && group.groupExtractMode) {
            const menuItems = (_b = group.uiactionGroup.uiactionGroupDetails) == null ? void 0 : _b.filter((detail) => {
              const detailState = menuState[detail.id];
              return detailState.visible;
            }).map((detail) => {
              const detailState = menuState[detail.id];
              const {
                sysImage
              } = detail;
              return {
                label: detail.showCaption ? detail.caption : void 0,
                icon: detail.showIcon ? createVNode(iBizIcon, {
                  "icon": sysImage
                }, null) : void 0,
                disabled: detailState.disabled,
                clickableWhenHasChildren: true,
                onClick: () => {
                  ContextMenu.closeContextMenu();
                  c.doUIAction(detail.uiactionId, calendarData, evt, detail.appId);
                }
              };
            });
            switch (group.groupExtractMode) {
              case "ITEMS":
                menuItem.children = menuItems;
                break;
              case "ITEMX":
                if (menuItems) {
                  menuItem = menuItems[0];
                  menuItem.children = menuItems.slice(1);
                }
                break;
              case "ITEM":
              default:
                menuItem = void 0;
                if (menuItems) {
                  result.push(...menuItems);
                }
                break;
            }
          }
        }
        if (menuItem) {
          result.push(menuItem);
        }
      });
      return result;
    };
    const onNodeContextmenu = async (item, evt) => {
      evt.preventDefault();
      evt.stopPropagation();
      const {
        sysCalendarItems
      } = c.model;
      const targetCalendarItem = sysCalendarItems == null ? void 0 : sysCalendarItems.find((_item) => {
        return _item.id === item.itemType;
      });
      if (!(targetCalendarItem == null ? void 0 : targetCalendarItem.decontextMenu)) {
        return;
      }
      const contextMenuC = c.contextMenus[targetCalendarItem.decontextMenu.id];
      if (!contextMenuC.model.detoolbarItems) {
        return;
      }
      await contextMenuC.calcButtonState(item.deData || (item.deData ? item : void 0), targetCalendarItem.appDataEntityId);
      const menuState = contextMenuC.state.buttonsState;
      const menus = calcContextMenuItems(contextMenuC.model.detoolbarItems, item, evt, menuState);
      if (!menus.length) {
        return;
      }
      ContextMenu.showContextMenu({
        x: evt.x,
        y: evt.y,
        customClass: ns.b("context-menu"),
        items: menus,
        zIndex: 9999
      });
    };
    return {
      c,
      ns,
      curPopover,
      calendarRef,
      showDateRange,
      popoverValue,
      selectDate,
      calcItemStyle,
      calcCalendarItems,
      onNodeContextmenu
    };
  },
  render() {
    const renderPanelItem = (item, modelData, date) => {
      const {
        context,
        params
      } = this.c;
      const findIndex = this.c.state.selectedData.findIndex((data) => {
        return data.deData.srfkey === item.deData.srfkey;
      });
      const itemClass = [this.ns.b("item"), this.ns.is("active", findIndex !== -1), this.ns.is("begin-time", date && dayjs(date).isSame(item.beginTime, "day")), this.ns.is("hidden", this.showDateRange && !isTimeBetween({
        beginTime: item.beginTime,
        endTime: item.endTime,
        date
      })), this.ns.is("no-begin-time", this.showDateRange && !item.beginTime), this.ns.is("no-end-time", this.showDateRange && !item.endTime), this.ns.is("end-time", date && dayjs(date).isSame(item.endTime, "day"))];
      const style = this.calcItemStyle(item);
      return createVNode(resolveComponent("iBizControlShell"), {
        "class": itemClass,
        "data": item.deData,
        "modelData": modelData,
        "context": context,
        "params": params,
        "style": style,
        "onClick": (e) => {
          e.stopPropagation();
          return this.c.onRowClick(item);
        },
        "onDblclick": (e) => {
          e.stopPropagation();
          return this.c.onDbRowClick(item);
        },
        "onContextmenu": (e) => this.onNodeContextmenu(item, e)
      }, null);
    };
    const renderDefaultItem = (item, date) => {
      const findIndex = this.c.state.selectedData.findIndex((data) => {
        return data.deData.srfkey === item.deData.srfkey;
      });
      const itemClass = [this.ns.b("item"), this.ns.is("active", findIndex !== -1), this.ns.is("begin-time", date && dayjs(date).isSame(item.beginTime, "day")), this.ns.is("hidden", this.showDateRange && !isTimeBetween({
        beginTime: item.beginTime,
        endTime: item.endTime,
        date
      })), this.ns.is("no-begin-time", this.showDateRange && !item.beginTime), this.ns.is("no-end-time", this.showDateRange && !item.endTime), this.ns.is("end-time", date && dayjs(date).isSame(item.endTime, "day"))];
      const style = this.calcItemStyle(item);
      return createVNode("div", {
        "class": itemClass,
        "key": item.deData.srfkey,
        "style": style,
        "title": showTitle(item.tips || item.text),
        "onClick": () => this.c.onRowClick(item),
        "onDblclick": () => this.c.onDbRowClick(item),
        "onContextmenu": (evt) => this.onNodeContextmenu(item, evt)
      }, [this.showDateRange ? date && (dayjs(date).isSame(item.beginTime, "day") || dayjs(date).day() === 0 || !item.beginTime && dayjs(date).isSame(item.endTime, "day")) ? item.text : "" : item.text]);
    };
    const renderCalendarItem = (item, date) => {
      var _a;
      const model = (_a = this.c.model.sysCalendarItems) == null ? void 0 : _a.find((calendarItems) => {
        return item.itemType === calendarItems.itemType;
      });
      const panel = model.layoutPanel;
      return panel ? renderPanelItem(item, panel, date) : renderDefaultItem(item, date);
    };
    const renderCalendarList = (items, date) => {
      if (items.length > 1 && !this.showDateRange) {
        return [renderCalendarItem(items[0], date), createVNode(resolveComponent("el-popover"), {
          "trigger": "click",
          "ref": (el) => {
            if (el && items[0].id === this.popoverValue) {
              this.curPopover = el;
            }
          },
          "onShow": () => {
            this.popoverValue = items[0].id;
          }
        }, {
          reference: () => {
            return createVNode("span", {
              "class": this.ns.b("more")
            }, ["+".concat(items.length - 1, " ").concat(ibiz.i18n.t("app.more"), "...")]);
          },
          default: () => {
            return items.map((item) => {
              return renderCalendarItem(item, date);
            });
          }
        })];
      }
      return items.map((item) => {
        return renderCalendarItem(item, date);
      });
    };
    const renderCalendarItems = (date) => {
      const items = this.calcCalendarItems(date);
      return renderCalendarList(items, date);
    };
    const renderElCalender = () => {
      return createVNode("div", {
        "class": [this.ns.b("content"), this.ns.is("show-date-range", this.showDateRange)]
      }, [createVNode(resolveComponent("el-calendar"), {
        "modelValue": this.c.state.selectedDate,
        "onUpdate:modelValue": ($event) => this.c.state.selectedDate = $event,
        "ref": "calendarRef"
      }, {
        header: ({
          date
        }) => {
          var _a;
          let _slot, _slot2, _slot3, _slot4, _slot5;
          return [createVNode("span", {
            "class": this.ns.b("content-title")
          }, [date]), createVNode("div", {
            "class": this.ns.b("content-header")
          }, [createVNode(resolveComponent("el-date-picker"), {
            "modelValue": this.c.state.selectedDate,
            "onUpdate:modelValue": ($event) => this.c.state.selectedDate = $event,
            "type": "month"
          }, null), createVNode(resolveComponent("el-button-group"), null, {
            default: () => [createVNode(resolveComponent("el-button"), {
              "onClick": () => {
                this.selectDate("prev-year");
              }
            }, _isSlot(_slot = ibiz.i18n.t("control.calendar.lastYear")) ? _slot : {
              default: () => [_slot]
            }), createVNode(resolveComponent("el-button"), {
              "onClick": () => {
                this.selectDate("prev-month");
              }
            }, _isSlot(_slot2 = ibiz.i18n.t("control.calendar.lastMonth")) ? _slot2 : {
              default: () => [_slot2]
            }), createVNode(resolveComponent("el-button"), {
              "onClick": () => {
                this.selectDate("today");
              }
            }, _isSlot(_slot3 = ibiz.i18n.t("control.calendar.today")) ? _slot3 : {
              default: () => [_slot3]
            }), createVNode(resolveComponent("el-button"), {
              "onClick": () => {
                this.selectDate("next-month");
              }
            }, _isSlot(_slot4 = ibiz.i18n.t("control.calendar.nextMonth")) ? _slot4 : {
              default: () => [_slot4]
            }), createVNode(resolveComponent("el-button"), {
              "onClick": () => {
                this.selectDate("next-year");
              }
            }, _isSlot(_slot5 = ibiz.i18n.t("control.calendar.nextYear")) ? _slot5 : {
              default: () => [_slot5]
            })]
          })]), createVNode("div", {
            "class": this.ns.b("legend")
          }, [this.c.model.sysCalendarItems && this.c.model.sysCalendarItems.length > 1 && ((_a = this.c.model.sysCalendarItems) == null ? void 0 : _a.map((calendarItem) => {
            let label = calendarItem.name;
            if (calendarItem.nameLanguageRes) {
              label = ibiz.i18n.t(calendarItem.nameLanguageRes.lanResTag, calendarItem.name);
            }
            return createVNode("div", {
              "class": this.ns.e("calendar-item")
            }, [createVNode("div", {
              "class": this.ns.e("icon"),
              "style": {
                background: calendarItem.bkcolor,
                color: calendarItem.color
              }
            }, null), label]);
          }))])];
        },
        "date-cell": ({
          data
        }) => {
          const {
            date
          } = data;
          return createVNode("div", {
            "class": this.ns.b("day")
          }, [createVNode("p", {
            "class": this.ns.b("date-text")
          }, [date.getDate()]), createVNode("div", {
            "class": this.ns.b("items")
          }, [renderCalendarItems(date)])]);
        }
      })]);
    };
    const renderNoData = () => {
      const {
        isLoaded
      } = this.c.state;
      const noDataSlots = {};
      if (hasEmptyPanelRenderer(this.c)) {
        Object.assign(noDataSlots, {
          customRender: () => createVNode(IBizCustomRender, {
            "controller": this.c
          }, null)
        });
      }
      return isLoaded && createVNode(resolveComponent("iBizNoData"), {
        "text": this.c.model.emptyText,
        "emptyTextLanguageRes": this.c.model.emptyTextLanguageRes,
        "hideNoDataImage": this.c.state.hideNoDataImage
      }, _isSlot(noDataSlots) ? noDataSlots : {
        default: () => [noDataSlots]
      });
    };
    const renderWeekDay = () => {
      const slots = {};
      const {
        sysCalendarItems
      } = this.c.model;
      slots.event = ({
        data
      }) => {
        const targetCalendarItem = sysCalendarItems == null ? void 0 : sysCalendarItems.find((item) => {
          return item.id === data.itemType;
        });
        if (targetCalendarItem && targetCalendarItem.layoutPanel) {
          return renderPanelItem(data, targetCalendarItem.layoutPanel);
        }
        return renderDefaultItem(data);
      };
      return createVNode("div", {
        "class": this.ns.b("content")
      }, [createVNode(IBizCustomCalendar, {
        "modelValue": this.c.state.selectedDate,
        "onUpdate:modelValue": ($event) => this.c.state.selectedDate = $event,
        "showDetail": this.c.state.showDetail,
        "calendarTitle": this.c.state.calendarTitle,
        "ref": "calendarRef",
        "viewType": this.c.model.calendarStyle,
        "events": this.c.state.items,
        "legends": this.c.state.legends,
        "multiple": !this.c.state.singleSelect,
        "selectedData": this.c.state.selectedData,
        "onEventClick": (value) => {
          const {
            data
          } = value;
          this.c.onRowClick(data[0]);
        },
        "onEventDblClick": (value) => {
          const {
            data
          } = value;
          this.c.onDbRowClick(data[0]);
        }
      }, _isSlot(slots) ? slots : {
        default: () => [slots]
      })]);
    };
    const renderTimeLine = () => {
      return createVNode("div", {
        "class": this.ns.b("timeline-content")
      }, [createVNode(resolveComponent("el-timeline"), null, {
        default: () => [this.c.state.items.length > 0 ? this.c.state.items.map((item) => {
          var _a;
          const model = (_a = this.c.model.sysCalendarItems) == null ? void 0 : _a.find((calendarItems) => {
            return item.itemType === calendarItems.itemType;
          });
          return createVNode(resolveComponent("el-timeline-item"), {
            "key": item.id,
            "placement": "top",
            "color": item.bkColor,
            "timestamp": item.beginTime
          }, {
            default: () => [(model == null ? void 0 : model.layoutPanel) ? renderPanelItem(item, model.layoutPanel) : renderDefaultItem(item)]
          });
        }) : renderNoData()]
      })]);
    };
    const renderCalendar = () => {
      switch (this.c.model.calendarStyle) {
        case "TIMELINE":
          return renderTimeLine();
        case "WEEK":
        case "DAY":
        case "USER":
          return renderWeekDay();
        case "MONTH":
        default:
          return renderElCalender();
      }
    };
    return createVNode(resolveComponent("iBizControlNavigation"), {
      "controller": this.c
    }, {
      default: () => [createVNode(resolveComponent("iBizControlBase"), {
        "controller": this.c
      }, {
        default: () => [renderCalendar(), this.c.state.enableNavView && this.c.state.showNavIcon ? !this.c.state.showNavView ? createVNode("ion-icon", {
          "class": this.ns.e("nav-icon"),
          "title": ibiz.i18n.t("component.controlNavigation.showNav"),
          "name": "eye-outline",
          "onClick": () => this.c.onShowNavViewChange()
        }, null) : createVNode("ion-icon", {
          "class": this.ns.e("nav-icon"),
          "title": ibiz.i18n.t("component.controlNavigation.hiddenNav"),
          "name": "eye-off-outline",
          "onClick": () => this.c.onShowNavViewChange()
        }, null) : null]
      })]
    });
  }
});

export { CalendarControl };
