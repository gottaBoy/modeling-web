import { App } from 'vue';
import { withInstall } from '@ibiz-template/vue3-util';
import { registerPanelItemProvider } from '@ibiz-template/runtime';
import { PanelStaticCarousel } from './panel-static-carousel';
import { PanelStaticCarouselProvider } from './panel-static-carousel.provider';

export const IBizPanelStaticCarousel = withInstall(
  PanelStaticCarousel,
  function (v: App) {
    v.component(PanelStaticCarousel.name, PanelStaticCarousel);
    registerPanelItemProvider(
      'RAWITEM_STATIC_CAROUSEL',
      () => new PanelStaticCarouselProvider(),
    );
  },
);

export default IBizPanelStaticCarousel;
