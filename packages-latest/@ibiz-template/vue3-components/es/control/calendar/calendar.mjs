import { isVNode, defineComponent, createVNode, resolveComponent, withDirectives, resolveDirective, ref, computed, watch } from 'vue';
import { hasEmptyPanelRenderer, IBizCustomRender, useControlController, useNamespace, useUIStore, useSemanticNode } from '@ibiz-template/vue3-util';
import { CalendarController } from '@ibiz-template/runtime';
import dayjs from 'dayjs';
import { debounce } from 'lodash-es';
import { showTitle } from '@ibiz-template/core';
import { IBizCustomCalendar } from './components/custom-calendar/index.mjs';
import { IBizCalendarUser2 } from './components/calendar-user2/index.mjs';
import { isTimeBetween, useCalendarLegend, getWeekRange } from './calendar-util.mjs';
import '../../util/index.mjs';
import './calendar.css';
import { useContextMenu } from '../../util/context-menu/context-menu.mjs';

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const CalendarControl = /* @__PURE__ */ defineComponent({
  name: "IBizCalendarControl",
  props: {
    /**
     * @description 日历模型数据
     */
    modelData: {
      type: Object,
      required: true
    },
    /**
     * @description 应用上下文对象
     */
    context: {
      type: Object,
      required: true
    },
    /**
     * @description 视图参数对象
     * @default {}
     */
    params: {
      type: Object,
      default: () => ({})
    },
    /**
     * @description 部件适配器
     */
    provider: {
      type: Object
    },
    /**
     * @description 部件激活模式，值为0：表示无激活,1：表示单击激活,2：表示双击激活
     */
    mdctrlActiveMode: {
      type: Number,
      default: void 0
    },
    /**
     * @description  是否是简单模式，即直接传入数据，不加载数据
     */
    isSimple: {
      type: Boolean,
      required: false
    },
    /**
     * @description 是否默认加载
     * @default true
     */
    loadDefault: {
      type: Boolean,
      default: true
    }
  },
  setup() {
    const c = useControlController((...args) => new CalendarController(...args));
    const ns = useNamespace("control-".concat(c.model.controlType.toLowerCase()));
    const {
      UIStore
    } = useUIStore();
    const {
      semanticClass,
      semanticStyle
    } = useSemanticNode(c);
    const {
      getFontColor,
      getBkColor,
      getActBdrColors
    } = useCalendarLegend(ns);
    const calendarRef = ref();
    const curPopover = ref();
    const showDateRange = ref(c.controlParams.showmode === "daterange");
    const showDateList = ref(c.controlParams.showmode === "expand");
    const childClass = [{
      class: semanticClass("body"),
      selector: ".el-calendar__body"
    }];
    const childStyle = [{
      style: semanticStyle("body"),
      selector: ".el-calendar__body"
    }];
    const infiniteScroll = ref();
    const disabledLodeMore = computed(() => {
      if (c.model.calendarStyle !== "TIMELINE" || c.state.isLoading)
        return true;
      const result = !Object.values(c.loadMoreItems).some((item) => item.curPage < item.totalPage);
      return result;
    });
    const legendType = ["DAY", "WEEK", "MONTH", "USER2"];
    const legends = ref([]);
    const onLegendClick = (item) => {
      item.isShow = !item.isShow;
    };
    const calcLegend = () => {
      legends.value = c.state.legends.map((_item, index) => {
        const tempItem = {
          ..._item,
          isShow: true
        };
        if (!c.model.calendarStyle || !legendType.includes(c.model.calendarStyle))
          return tempItem;
        if (!_item.bkcolor) {
          Object.assign(tempItem, {
            bkcolor: getBkColor(index),
            actBdrColor: getActBdrColors(index)
          });
        }
        if (!_item.color)
          Object.assign(tempItem, {
            color: getFontColor()
          });
        return tempItem;
      });
    };
    watch(() => c.state.legends, () => {
      calcLegend();
    }, {
      deep: true
    });
    watch(() => UIStore.theme, () => {
      calcLegend();
    });
    const handleScrollLoad = async () => {
      if (!infiniteScroll.value || disabledLodeMore.value)
        return;
      const scrollTop = infiniteScroll.value.scrollTop;
      const scrollHeight = infiniteScroll.value.scrollHeight;
      const clientHeight = infiniteScroll.value.clientHeight;
      if (scrollHeight - scrollTop - clientHeight < 10)
        await c.load({
          isLoadMore: true
        });
    };
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
      if (c.model.calendarStyle === "TIMELINE") {
        return dayjs(newVal).isSame(dayjs(oldVal), "millisecond");
      }
      return false;
    };
    watch(() => c.state.selectedDate, (newVal, oldVal) => {
      if (timeRangeComparison(newVal, oldVal))
        return;
      c.load();
    });
    watch(() => c.state.timeRange, () => {
      if (!c.state.isLoaded)
        return;
      c.load();
    });
    const onTimeRangeChange = (date) => {
      c.state.timeRange = date;
    };
    const calcItemStyle = (data) => {
      const _legend = legends.value.find((_item) => _item.id === data.itemType);
      return {
        color: data.color,
        backgroundColor: data.bkColor,
        ["".concat(ns.cssVarBlockName("item-color"))]: data.color,
        ["".concat(ns.cssVarBlockName("item-active-border-color"))]: _legend == null ? void 0 : _legend.actBdrColor,
        ...semanticStyle("item", {
          item: data
        })
      };
    };
    const calcCalendarItems = (date) => {
      const weekRange = getWeekRange(date);
      const calendarItems = c.state.items.filter((item) => {
        const _legend = legends.value.find((legend) => legend.id === item.itemType);
        if (_legend && !_legend.isShow)
          return false;
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
      return calendarItems.map((_item) => {
        const targetLegend = legends.value.find((legendItem) => Object.is(legendItem.id, _item.itemType));
        if (!targetLegend)
          return _item;
        if (!_item.bkColor)
          Object.assign(_item, {
            bkColor: targetLegend.bkcolor
          });
        if (!_item.color)
          Object.assign(_item, {
            color: targetLegend.color
          });
        return _item;
      });
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
    const {
      calcUiactionGroup
    } = useContextMenu();
    const calcContextMenuItems = (toolbarItems, calendarData, evt, menuState) => {
      const result = [];
      toolbarItems.forEach((item) => {
        var _a;
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
            const menuItems = calcUiactionGroup(group.uiactionGroup, menuState, (detail) => {
              ContextMenu.closeContextMenu();
              c.doUIAction(detail.uiactionId, calendarData, evt, detail.appId);
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
      await contextMenuC.calcButtonState(item.deData || (item.deData ? item : void 0), targetCalendarItem.appDataEntityId, {
        view: c.view,
        ctrl: c
      });
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
      legends,
      childClass,
      childStyle,
      semanticClass,
      semanticStyle,
      curPopover,
      calendarRef,
      popoverValue,
      showDateList,
      showDateRange,
      infiniteScroll,
      disabledLodeMore,
      selectDate,
      calcItemStyle,
      onLegendClick,
      handleScrollLoad,
      onTimeRangeChange,
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
      const itemClass = [this.ns.b("item"), this.semanticClass("item", {
        item
      }), this.ns.is("active", findIndex !== -1), this.ns.is("begin-time", date && dayjs(date).isSame(item.beginTime, "day")), this.ns.is("hidden", this.showDateRange && !isTimeBetween({
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
      const itemClass = [this.ns.b("item"), this.semanticClass("item", {
        item
      }), this.ns.be("item", "default"), this.ns.is("active", findIndex !== -1), this.ns.is("begin-time", date && dayjs(date).isSame(item.beginTime, "day")), this.ns.is("hidden", this.showDateRange && !isTimeBetween({
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
      if (items.length > 1 && !this.showDateRange && !this.showDateList) {
        return [renderCalendarItem(items[0], date), createVNode(resolveComponent("el-popover"), {
          "trigger": "click",
          "ref": (el) => {
            if (el && items[0].id === this.popoverValue) {
              this.curPopover = el;
            }
          },
          "popper-class": [this.semanticClass("popup"), this.ns.be("more", "popper")],
          "popper-style": this.semanticStyle("popup"),
          "onShow": () => {
            this.popoverValue = items[0].id;
          }
        }, {
          reference: () => {
            return createVNode("span", {
              "style": this.semanticStyle("more"),
              "class": [this.ns.b("more"), this.semanticClass("more")]
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
        "class": [this.ns.b("content"), this.ns.be("content", "month"), this.semanticClass("content"), this.ns.is("show-date-range", this.showDateRange)],
        "style": this.semanticStyle("content")
      }, [withDirectives(createVNode(resolveComponent("el-calendar"), {
        "ref": "calendarRef",
        "modelValue": this.c.state.selectedDate,
        "onUpdate:modelValue": ($event) => this.c.state.selectedDate = $event,
        "class": this.ns.b("month")
      }, {
        header: ({
          date
        }) => {
          let _slot, _slot2, _slot3, _slot4, _slot5;
          return createVNode("div", {
            "class": [this.ns.e("header"), this.semanticClass("header")],
            "style": this.semanticStyle("header")
          }, [createVNode("span", {
            "class": [this.ns.b("content-title"), this.semanticClass("title")],
            "style": this.semanticStyle("title")
          }, [date]), createVNode("div", {
            "style": this.semanticStyle("legend"),
            "class": [this.ns.b("legend"), this.semanticClass("legend")]
          }, [this.legends && this.legends.length > 1 && this.legends.map((legend) => {
            return createVNode("div", {
              "class": [this.ns.be("legend", "item"), this.semanticClass("legend.item", {
                item: legend
              })],
              "style": this.semanticStyle("legend.item", {
                item: legend
              }),
              "onClick": () => this.onLegendClick(legend)
            }, [createVNode("div", {
              "class": this.ns.bem("legend", "item", "tip"),
              "style": {
                background: legend.isShow ? legend == null ? void 0 : legend.bkcolor : "var(".concat(this.ns.cssVarName("color-disabled-bg"), ")"),
                color: legend == null ? void 0 : legend.color
              }
            }, null), createVNode("div", {
              "class": this.ns.bem("legend", "item", "text")
            }, [legend.name])]);
          })]), createVNode("div", {
            "class": [this.ns.b("toolbar"), this.ns.b("content-header"), this.semanticClass("toolbar")],
            "style": this.semanticStyle("toolbar")
          }, [createVNode(resolveComponent("el-date-picker"), {
            "class": [this.ns.be("toolbar", "picker"), this.semanticClass("toolbar.picker")],
            "style": this.semanticStyle("toolbar.picker"),
            "modelValue": this.c.state.selectedDate,
            "onUpdate:modelValue": ($event) => this.c.state.selectedDate = $event,
            "type": "month"
          }, null), createVNode(resolveComponent("el-button-group"), null, {
            default: () => [createVNode(resolveComponent("el-button"), {
              "class": [this.ns.be("toolbar", "button"), this.semanticClass("toolbar.button")],
              "style": this.semanticStyle("toolbar.button"),
              "onClick": () => {
                this.selectDate("prev-year");
              }
            }, _isSlot(_slot = ibiz.i18n.t("control.calendar.lastYear")) ? _slot : {
              default: () => [_slot]
            }), createVNode(resolveComponent("el-button"), {
              "class": [this.ns.be("toolbar", "button"), this.semanticClass("toolbar.button")],
              "style": this.semanticStyle("toolbar.button"),
              "onClick": () => {
                this.selectDate("prev-month");
              }
            }, _isSlot(_slot2 = ibiz.i18n.t("control.calendar.lastMonth")) ? _slot2 : {
              default: () => [_slot2]
            }), createVNode(resolveComponent("el-button"), {
              "class": [this.ns.be("toolbar", "button"), this.semanticClass("toolbar.button")],
              "style": this.semanticStyle("toolbar.button"),
              "onClick": () => {
                this.selectDate("today");
              }
            }, _isSlot(_slot3 = ibiz.i18n.t("control.calendar.today")) ? _slot3 : {
              default: () => [_slot3]
            }), createVNode(resolveComponent("el-button"), {
              "class": [this.ns.be("toolbar", "button"), this.semanticClass("toolbar.button")],
              "style": this.semanticStyle("toolbar.button"),
              "onClick": () => {
                this.selectDate("next-month");
              }
            }, _isSlot(_slot4 = ibiz.i18n.t("control.calendar.nextMonth")) ? _slot4 : {
              default: () => [_slot4]
            }), createVNode(resolveComponent("el-button"), {
              "class": [this.ns.be("toolbar", "button"), this.semanticClass("toolbar.button")],
              "style": this.semanticStyle("toolbar.button"),
              "onClick": () => {
                this.selectDate("next-year");
              }
            }, _isSlot(_slot5 = ibiz.i18n.t("control.calendar.nextYear")) ? _slot5 : {
              default: () => [_slot5]
            })]
          })])]);
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
      }), [[resolveDirective("child-class"), this.childClass], [resolveDirective("child-style"), this.childStyle]])]);
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
    const renderSlots = () => {
      const {
        sysCalendarItems = []
      } = this.c.model;
      return {
        event: ({
          data
        }) => {
          const model = sysCalendarItems.find((item) => data.itemType === item.itemType);
          if (model == null ? void 0 : model.layoutPanel)
            return renderPanelItem(data, model.layoutPanel);
          return renderDefaultItem(data);
        }
      };
    };
    const renderWeekDay = () => {
      let _slot6;
      return createVNode("div", {
        "class": [this.ns.b("content"), this.semanticClass("content")],
        "style": this.semanticStyle("content")
      }, [createVNode(IBizCustomCalendar, {
        "semanticClass": this.semanticClass,
        "semanticStyle": this.semanticStyle,
        "modelValue": this.c.state.selectedDate,
        "onUpdate:modelValue": ($event) => this.c.state.selectedDate = $event,
        "showDetail": this.c.state.showDetail,
        "calendarTitle": this.c.state.calendarTitle,
        "ref": "calendarRef",
        "viewType": this.c.model.calendarStyle,
        "events": this.c.state.items,
        "legends": this.legends,
        "multiple": !this.c.state.singleSelect,
        "selectedData": this.c.state.selectedData,
        "onEventClick": (value) => {
          const {
            data
          } = value;
          const item = data[0];
          if (item)
            this.c.onRowClick(item);
        },
        "onEventDblClick": (value) => {
          const {
            data
          } = value;
          const item = data[0];
          if (item)
            this.c.onDbRowClick(item);
        },
        "onEventContextmenu": (value) => {
          const {
            data,
            evt
          } = value;
          const item = data[0];
          if (item && evt)
            this.onNodeContextmenu(item, evt);
        }
      }, _isSlot(_slot6 = renderSlots()) ? _slot6 : {
        default: () => [_slot6]
      })]);
    };
    const renderTimeLine = () => {
      return createVNode("div", {
        "ref": "infiniteScroll",
        "style": this.semanticStyle("content"),
        "class": [this.ns.b("timeline-content"), this.semanticClass("content")],
        "onScroll": debounce(this.handleScrollLoad, 300)
      }, [createVNode(resolveComponent("el-timeline"), {
        "class": this.ns.e("timeline")
      }, {
        default: () => [this.c.state.items.length > 0 ? this.c.state.items.map((item) => {
          var _a;
          const model = (_a = this.c.model.sysCalendarItems) == null ? void 0 : _a.find((calendarItems) => {
            return item.itemType === calendarItems.itemType;
          });
          const time = item[this.c.groupTimeField];
          const temptime = time ? dayjs(time).format(this.c.timelineCaptionFormat) : time;
          return createVNode(resolveComponent("el-timeline-item"), {
            "key": item.id,
            "placement": "top",
            "color": item.bkColor,
            "timestamp": temptime
          }, {
            default: () => [(model == null ? void 0 : model.layoutPanel) ? renderPanelItem(item, model.layoutPanel) : renderDefaultItem(item)]
          });
        }) : renderNoData()]
      })]);
    };
    const renderCalendar = () => {
      let _slot7;
      switch (this.c.model.calendarStyle) {
        case "TIMELINE":
          return renderTimeLine();
        case "WEEK":
        case "DAY":
        case "USER":
          return renderWeekDay();
        case "USER2":
          return createVNode("div", {
            "class": [this.ns.b("content"), this.semanticClass("content")],
            "style": this.semanticStyle("content")
          }, [createVNode(IBizCalendarUser2, {
            "legends": this.legends,
            "items": this.c.state.items,
            "semanticClass": this.semanticClass,
            "semanticStyle": this.semanticStyle,
            "timeRange": this.c.state.timeRange,
            "title": this.c.state.calendarTitle,
            "onLegendClick": this.onLegendClick,
            "onTimeRangeChange": this.onTimeRangeChange
          }, _isSlot(_slot7 = renderSlots()) ? _slot7 : {
            default: () => [_slot7]
          })]);
        case "MONTH":
        default:
          return renderElCalender();
      }
    };
    return createVNode(resolveComponent("iBizControlNavigation"), {
      "controller": this.c
    }, {
      default: () => {
        var _a;
        return [createVNode(resolveComponent("iBizControlBase"), {
          "controller": this.c,
          "class": [this.semanticClass("root"), this.ns.e((_a = this.c.model.calendarStyle) == null ? void 0 : _a.toLowerCase())],
          "style": this.semanticStyle("root")
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
        })];
      }
    });
  }
});

export { CalendarControl };
