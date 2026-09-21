import { App } from 'vue';
import { VTooltip, setApp } from './tooltip/tooltip';
import { IBizCommon } from './common';
import { vChildClass } from './child-class/child-class';
import { vChildStyle } from './child-style/child-style';

export const IBizDirectives = {
  install: (v: App): void => {
    v.use(IBizCommon);
    v.directive('tooltip', VTooltip);
    v.directive('child-class', vChildClass);
    v.directive('child-style', vChildStyle);
    setApp(v);
  },
};
