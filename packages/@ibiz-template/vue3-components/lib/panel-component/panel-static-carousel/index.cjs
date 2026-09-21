'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue3Util = require('@ibiz-template/vue3-util');
var runtime = require('@ibiz-template/runtime');
var panelStaticCarousel = require('./panel-static-carousel.cjs');
var panelStaticCarousel_provider = require('./panel-static-carousel.provider.cjs');

"use strict";
const IBizPanelStaticCarousel = vue3Util.withInstall(
  panelStaticCarousel.PanelStaticCarousel,
  function(v) {
    v.component(panelStaticCarousel.PanelStaticCarousel.name, panelStaticCarousel.PanelStaticCarousel);
    runtime.registerPanelItemProvider(
      "RAWITEM_STATIC_CAROUSEL",
      () => new panelStaticCarousel_provider.PanelStaticCarouselProvider()
    );
  }
);

exports.IBizPanelStaticCarousel = IBizPanelStaticCarousel;
exports.default = IBizPanelStaticCarousel;
