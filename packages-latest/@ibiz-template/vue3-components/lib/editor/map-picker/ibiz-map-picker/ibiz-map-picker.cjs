'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var ramda = require('ramda');
var index = require('../../../node_modules/.pnpm/@amap_amap-jsapi-loader@1.0.1_patch_hash_73bpcwbs2m5ip4qppmz6a7epsa/node_modules/@amap/amap-jsapi-loader/dist/index.cjs');
var ibizMapUtil = require('./ibiz-map-util.cjs');
require('./ibiz-map-picker.css');

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
}
const IBizMapPicker = /* @__PURE__ */ vue.defineComponent({
  name: "IBizMapPicker",
  props: vue3Util.getMapPickerProps(),
  emits: vue3Util.getEditorEmits(),
  setup(props, {
    emit
  }) {
    var _a;
    const ns = vue3Util.useNamespace("map-picker");
    const c = props.controller;
    const {
      semanticClass,
      semanticStyle
    } = vue3Util.useSemanticNode(c);
    const childClass = [{
      class: semanticClass("editor.input"),
      selector: ".el-input__inner"
    }, {
      class: semanticClass("editor.input.suffix"),
      selector: ".el-input__suffix"
    }];
    const dialogChildClass = [{
      class: semanticClass("editor.search"),
      selector: ".el-input__inner"
    }, {
      class: semanticClass("editor.search.suffix"),
      selector: ".el-input__suffix"
    }, {
      class: semanticClass("editor.markerList"),
      selector: ".".concat(ns.e("preset-markers-inner"))
    }, {
      class: semanticClass("editor.markerList.item"),
      selector: ".".concat(ns.e("preset-marker"))
    }, {
      class: semanticClass("editor.map"),
      selector: ".".concat(ns.b("dialog-map-container"))
    }, {
      class: semanticClass("editor.marker"),
      selector: ".amap-marker"
    }, {
      class: semanticClass("editor.marker.label"),
      selector: ".amap-content-body"
    }, {
      class: semanticClass("editor.marker.label"),
      selector: ".".concat(ns.b("dialog-map-marker-text"))
    }, {
      class: semanticClass("editor.marker.index"),
      selector: ".".concat(ns.b("dialog-map-marker-index"))
    }];
    const childStyle = [{
      style: semanticStyle("editor.input"),
      selector: ".el-input__inner"
    }, {
      style: semanticStyle("editor.input.suffix"),
      selector: ".el-input__suffix"
    }];
    const dialogChildStyle = [{
      style: semanticStyle("editor.search"),
      selector: ".el-input__inner"
    }, {
      style: semanticStyle("editor.search.suffix"),
      selector: ".el-input__suffix"
    }, {
      style: semanticStyle("editor.markerList"),
      selector: ".".concat(ns.e("preset-markers-inner"))
    }, {
      style: semanticStyle("editor.markerList.item"),
      selector: ".".concat(ns.e("preset-marker"))
    }, {
      style: semanticStyle("editor.map"),
      selector: ".".concat(ns.b("dialog-map-container"))
    }, {
      style: semanticStyle("editor.marker"),
      selector: ".amap-marker"
    }, {
      style: semanticStyle("editor.marker.label"),
      selector: ".amap-content-body"
    }, {
      style: semanticStyle("editor.marker.label"),
      selector: ".".concat(ns.b("dialog-map-marker-text"))
    }, {
      style: semanticStyle("editor.marker.index"),
      selector: ".".concat(ns.b("dialog-map-marker-index"))
    }];
    const editorItem = (_a = c.model.editorItems) == null ? void 0 : _a.map((x) => x.id).join(",");
    const inputRef = vue.ref();
    const searchInputRef = vue.ref();
    const mapContainerRef = vue.ref();
    const searchResultContainerRef = vue.ref();
    const dialogVisible = vue.ref(false);
    const isLoading = vue.ref(false);
    const searchValue = vue.ref("");
    const showPresetMarker = vue.ref(false);
    const customMarkers = vue.ref([]);
    const showFormDefaultContent = vue.computed(() => {
      if (props.controlParams && props.controlParams.editmode === "hover" && !props.readonly) {
        return true;
      }
      return false;
    });
    let map;
    let marker;
    let poiPicker;
    const addressInfo = {
      address: "",
      longitude: null,
      latitude: null
    };
    const clearMarker = () => {
      if (marker) {
        const {
          lng,
          lat
        } = marker.getPosition();
        const index = customMarkers.value.findIndex((x) => {
          const point = x.getPosition();
          return point.lng === lng && point.lat === lat;
        });
        if (index !== -1) {
          marker.setContent(c.presetMarkers[index].content);
        } else {
          marker.setMap(null);
        }
        marker = void 0;
      }
    };
    const addMarker = (lng, lat) => {
      const AMap = window.AMap;
      if (!AMap) {
        return;
      }
      clearMarker();
      marker = new AMap.Marker({
        position: [lng, lat]
      });
    };
    const getAddress = (lng, lat) => {
      const AMap = window.AMap;
      if (!AMap) {
        return;
      }
      if (!marker) {
        return;
      }
      const geocoder = new AMap.Geocoder({});
      const currentMarker = marker;
      geocoder.getAddress([lng, lat], (status, result) => {
        if (!marker || marker !== currentMarker) {
          return;
        }
        if (status === "complete" && result.info === "OK" && result.regeocode) {
          const regeocode = result.regeocode;
          const address = regeocode.formattedAddress;
          const markerContent = document.createElement("div");
          const markerImg = document.createElement("img");
          markerImg.style.width = "25px";
          markerImg.src = c.markerIcon;
          markerContent.appendChild(markerImg);
          const markerText = document.createElement("span");
          markerText.className = ns.b("dialog-map-marker-text");
          markerText.textContent = address;
          markerContent.appendChild(markerText);
          const extData = currentMarker.getExtData();
          if (extData && ramda.isNotNil(extData.index)) {
            const markerIndex = document.createElement("span");
            markerIndex.className = ns.b("dialog-map-marker-index");
            markerIndex.textContent = extData.index;
            markerContent.appendChild(markerIndex);
          }
          marker.setContent(markerContent);
          marker.setMap(map);
          addressInfo.address = address;
          addressInfo.longitude = lng;
          addressInfo.latitude = lat;
          searchValue.value = address;
        }
      });
    };
    const loadMap = async () => {
      try {
        isLoading.value = true;
        window._AMapSecurityConfig = {
          securityJsCode: ibiz.env.aMapSecurityJsCode
        };
        await index.default.load({
          key: ibiz.env.aMapKey,
          version: "2.0",
          plugins: ["AMap.PlaceSearch", "AMap.Geocoder"],
          AMapUI: {
            version: "1.1",
            plugins: ["misc/PoiPicker"]
          }
        });
      } finally {
        isLoading.value = false;
      }
    };
    const initMap = () => {
      const AMap = window.AMap;
      if (!AMap) {
        return;
      }
      if (!mapContainerRef.value) {
        return;
      }
      const params = {
        viewMode: "3D",
        zoom: 11
      };
      if (c.defaultCenter.length > 0) {
        params.center = c.defaultCenter;
      }
      map = new AMap.Map(mapContainerRef.value, params);
      if (c.defaultCity) {
        map == null ? void 0 : map.setCity(c.defaultCity);
      }
      map == null ? void 0 : map.on("click", (e) => {
        const lnglat = e.lnglat;
        const lng = lnglat.lng;
        const lat = lnglat.lat;
        if (lng != null && lat != null) {
          addMarker(lng, lat);
          getAddress(lng, lat);
        }
      });
      map == null ? void 0 : map.on("complete", () => {
        showPresetMarker.value = true;
      });
      if (c.presetMarkers.length > 0) {
        c.presetMarkers.forEach((point, index) => {
          const presetMarker = new AMap.Marker({
            position: [point.longitude, point.latitude],
            extData: {
              index: index + 1
            },
            ...point
          });
          customMarkers.value.push(presetMarker);
          presetMarker.on("click", (event) => {
            const lnglat = event.lnglat;
            const lng = lnglat.lng;
            const lat = lnglat.lat;
            if (lng != null && lat != null) {
              clearMarker();
              marker = presetMarker;
              getAddress(lng, lat);
            }
          });
          map == null ? void 0 : map.add(presetMarker);
        });
      }
      const AMapUI = window.AMapUI;
      if (!AMapUI) {
        return;
      }
      if (!searchInputRef.value || !searchResultContainerRef.value) {
        return;
      }
      AMapUI.loadUI(["misc/PoiPicker"], function(PoiPicker) {
        if (!searchInputRef.value || !searchResultContainerRef.value || !PoiPicker) {
          return;
        }
        poiPicker = new PoiPicker({
          input: searchInputRef.value,
          placeSearchOptions: {
            map
          },
          searchResultsContainer: searchResultContainerRef.value
        });
        poiPicker == null ? void 0 : poiPicker.on("poiPicked", function(poiResult) {
          var _a2, _b;
          clearMarker();
          const item = poiResult.item;
          if (item) {
            addressInfo.address = item.name;
            addressInfo.longitude = (_a2 = item.location) == null ? void 0 : _a2.lng;
            addressInfo.latitude = (_b = item.location) == null ? void 0 : _b.lat;
            searchValue.value = item.name;
            if (poiResult.source !== "search") {
              poiPicker == null ? void 0 : poiPicker.searchByKeyword(item.name);
            }
          }
        });
      });
    };
    const handleShow = () => {
      var _a2;
      dialogVisible.value = true;
      (_a2 = inputRef.value) == null ? void 0 : _a2.blur();
      vue.nextTick(async () => {
        var _a3;
        if (!window.AMap) {
          await loadMap();
        }
        if (!map || !((_a3 = mapContainerRef.value) == null ? void 0 : _a3.children.length)) {
          map == null ? void 0 : map.destroy();
          initMap();
        }
        searchValue.value = props.value || "";
        if (editorItem) {
          const [longitudeName, latitudeName] = editorItem.split(",");
          if (props.data) {
            const longitude = props.data[longitudeName];
            const latitude = props.data[latitudeName];
            if (longitude && latitude) {
              map == null ? void 0 : map.setCenter([longitude, latitude], true);
              addMarker(longitude, latitude);
              getAddress(longitude, latitude);
            }
          }
        }
      });
    };
    const handleConfirm = () => {
      dialogVisible.value = false;
      if (editorItem) {
        const [longitudeName, latitudeName] = editorItem.split(",");
        if (longitudeName) {
          emit("change", addressInfo.longitude != null ? addressInfo.longitude : null, longitudeName);
        }
        if (latitudeName) {
          emit("change", addressInfo.latitude != null ? addressInfo.latitude : null, latitudeName);
        }
      }
      emit("change", addressInfo.address || "");
    };
    const handleClose = () => {
      if (poiPicker) {
        poiPicker.clearSuggest();
        poiPicker.clearSearchResults();
      }
      searchValue.value = "";
      addressInfo.address = "";
      addressInfo.longitude = null;
      addressInfo.latitude = null;
      clearMarker();
    };
    const handleClear = () => {
      if (editorItem) {
        const [longitudeName, latitudeName] = editorItem.split(",");
        if (longitudeName) {
          emit("change", null, longitudeName);
        }
        if (latitudeName) {
          emit("change", null, latitudeName);
        }
      }
      emit("change", "");
    };
    const handleSearchClear = () => {
      searchValue.value = "";
      addressInfo.address = "";
      addressInfo.longitude = null;
      addressInfo.latitude = null;
      clearMarker();
    };
    vue.onUnmounted(() => {
      map == null ? void 0 : map.destroy();
    });
    const renderPresetMarkers = () => {
      if (!c.presetMarkers.length)
        return null;
      return vue.createVNode("div", {
        "class": [ns.e("preset-markers"), ns.is("active", showPresetMarker.value)]
      }, [vue.createVNode("div", {
        "class": ns.e("preset-markers-inner")
      }, [c.presetMarkers.map((point, index) => {
        const title = ibizMapUtil.getAddressTitle(point.title);
        return vue.createVNode("div", {
          "class": [ns.e("preset-marker")],
          "onClick": () => {
            clearMarker();
            marker = customMarkers.value[index];
            getAddress(point.longitude, point.latitude);
          }
        }, [vue.createVNode("div", {
          "class": ns.e("preset-marker-index"),
          "style": {
            backgroundImage: "url(".concat(c.markerIcon, ")")
          }
        }, [vue.createVNode("span", null, [index + 1])]), vue.createVNode("div", {
          "class": ns.e("preset-marker-content")
        }, [vue.createVNode("div", {
          "class": ns.e("preset-marker-title")
        }, [title]), vue.createVNode("div", {
          "class": ns.e("preset-marker-address"),
          "title": point.title
        }, [ibiz.i18n.t("editor.mapPicker.address"), vue.createTextVNode(": "), point.title])]), point.icon ? vue.createVNode("img", {
          "src": point.icon,
          "alt": point.title
        }, null) : null]);
      })])]);
    };
    return {
      c,
      ns,
      inputRef,
      isLoading,
      childClass,
      childStyle,
      searchValue,
      dialogVisible,
      semanticClass,
      semanticStyle,
      searchInputRef,
      mapContainerRef,
      dialogChildClass,
      dialogChildStyle,
      showFormDefaultContent,
      searchResultContainerRef,
      handleShow,
      handleClose,
      handleClear,
      handleConfirm,
      handleSearchClear,
      renderPresetMarkers
    };
  },
  render() {
    const icon = vue.createVNode("svg", {
      "xmlns": "http://www.w3.org/2000/svg",
      "viewBox": "0 0 1024 1024"
    }, [vue.createVNode("path", {
      "fill": "currentColor",
      "d": "m466.752 512-90.496-90.496a32 32 0 0 1 45.248-45.248L512 466.752l90.496-90.496a32 32 0 1 1 45.248 45.248L557.248 512l90.496 90.496a32 32 0 1 1-45.248 45.248L512 557.248l-90.496 90.496a32 32 0 0 1-45.248-45.248z"
    }, null), vue.createVNode("path", {
      "fill": "currentColor",
      "d": "M512 896a384 384 0 1 0 0-768 384 384 0 0 0 0 768m0 64a448 448 0 1 1 0-896 448 448 0 0 1 0 896"
    }, null)]);
    let content;
    if (this.readonly) {
      content = this.value;
    } else {
      content = [vue.withDirectives(vue.createVNode(vue.resolveComponent("el-input"), {
        "class": this.ns.b("input"),
        "ref": "inputRef",
        "model-value": this.value,
        "placeholder": this.c.placeHolder,
        "disabled": this.disabled,
        "onFocus": this.handleShow
      }, {
        suffix: () => {
          if (!this.value || this.disabled)
            return;
          return vue.createVNode("i", {
            "class": "el-icon el-input__icon el-input__clear",
            "onClick": (e) => {
              e.stopPropagation();
              this.handleClear();
            }
          }, [icon]);
        }
      }), [[vue.resolveDirective("child-class"), this.childClass], [vue.resolveDirective("child-style"), this.childStyle]]), vue.createVNode(vue.resolveComponent("el-dialog"), {
        "class": [this.ns.b("dialog"), this.semanticClass("editor.popup")],
        "style": this.semanticStyle("editor.popup"),
        "modelValue": this.dialogVisible,
        "onUpdate:modelValue": ($event) => this.dialogVisible = $event,
        "title": ibiz.i18n.t("editor.mapPicker.title"),
        "append-to-body": true,
        "align-center": true,
        "width": "80%",
        "onClose": this.handleClose
      }, {
        default: () => {
          return vue.withDirectives(vue.createVNode("div", {
            "class": this.ns.b("dialog-content")
          }, [vue.createVNode("div", {
            "class": "el-input el-input--suffix ".concat(this.ns.b("dialog-search-input"), " ").concat(this.isLoading ? "is-disabled" : "")
          }, [vue.createVNode("div", {
            "class": "el-input__wrapper",
            "tabindex": "-1"
          }, [vue.withDirectives(vue.createVNode("input", {
            "ref": "searchInputRef",
            "class": "el-input__inner",
            "type": "text",
            "autocomplete": "off",
            "tabindex": "0",
            "placeholder": ibiz.i18n.t("editor.mapPicker.searchPlaceholder"),
            "disabled": this.isLoading,
            "onUpdate:modelValue": ($event) => this.searchValue = $event
          }, null), [[vue.vModelText, this.searchValue]]), this.searchValue ? vue.createVNode("span", {
            "class": "el-input__suffix"
          }, [vue.createVNode("span", {
            "class": "el-input__suffix-inner"
          }, [vue.createVNode("i", {
            "class": "el-icon el-input__icon el-input__clear",
            "onClick": (e) => {
              e.stopPropagation();
              this.handleSearchClear();
            }
          }, [icon])])]) : null, this.renderPresetMarkers()])]), vue.withDirectives(vue.createVNode("div", {
            "class": this.ns.b("dialog-map-content")
          }, [vue.createVNode("div", {
            "class": this.ns.b("dialog-map-container"),
            "ref": "mapContainerRef"
          }, null), vue.createVNode("div", {
            "class": this.ns.b("dialog-search-result-container"),
            "ref": "searchResultContainerRef"
          }, null)]), [[vue.resolveDirective("loading"), this.isLoading]])]), [[vue.resolveDirective("child-class"), this.dialogChildClass], [vue.resolveDirective("child-style"), this.dialogChildStyle]]);
        },
        footer: () => {
          let _slot;
          return vue.createVNode("div", {
            "class": this.ns.b("dialog-footer")
          }, [vue.createVNode(vue.resolveComponent("el-button"), {
            "type": "primary",
            "class": [this.ns.be("dialog-footer", "button"), this.semanticClass("editor.button")],
            "style": this.semanticStyle("editor.button"),
            "disabled": this.isLoading,
            "onClick": this.handleConfirm
          }, _isSlot(_slot = ibiz.i18n.t("editor.common.confirm")) ? _slot : {
            default: () => [_slot]
          })]);
        }
      })];
    }
    const formDefaultContent = vue.createVNode("div", {
      "class": this.ns.b("form-default-content")
    }, [this.value ? this.value : vue.createVNode(vue.resolveComponent("iBizEditorEmptyText"), {
      "showPlaceholder": this.c.emptyShowPlaceholder,
      "placeHolder": this.c.placeHolder
    }, null)]);
    return vue.createVNode("div", {
      "class": [this.ns.b(), this.semanticClass("editor.root"), this.disabled ? this.ns.m("disabled") : "", this.readonly ? this.ns.m("readonly") : "", this.ns.is("show-default", this.showFormDefaultContent)],
      "style": this.semanticStyle("editor.root")
    }, [this.showFormDefaultContent && formDefaultContent, content]);
  }
});

exports.IBizMapPicker = IBizMapPicker;
