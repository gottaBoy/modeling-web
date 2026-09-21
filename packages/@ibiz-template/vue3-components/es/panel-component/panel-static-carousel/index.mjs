import { withInstall } from '@ibiz-template/vue3-util';
import { registerPanelItemProvider } from '@ibiz-template/runtime';
import { PanelStaticCarousel } from './panel-static-carousel.mjs';
import { PanelStaticCarouselProvider } from './panel-static-carousel.provider.mjs';

"use strict";
const IBizPanelStaticCarousel = withInstall(
  PanelStaticCarousel,
  function(v) {
    v.component(PanelStaticCarousel.name, PanelStaticCarousel);
    registerPanelItemProvider(
      "RAWITEM_STATIC_CAROUSEL",
      () => new PanelStaticCarouselProvider()
    );
  }
);

export { IBizPanelStaticCarousel, IBizPanelStaticCarousel as default };
