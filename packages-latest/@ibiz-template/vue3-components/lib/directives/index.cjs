'use strict';

var tooltip = require('./tooltip/tooltip.cjs');
var index = require('./common/index.cjs');
var childClass = require('./child-class/child-class.cjs');
var childStyle = require('./child-style/child-style.cjs');

"use strict";
const IBizDirectives = {
  install: (v) => {
    v.use(index.IBizCommon);
    v.directive("tooltip", tooltip.VTooltip);
    v.directive("child-class", childClass.vChildClass);
    v.directive("child-style", childStyle.vChildStyle);
    tooltip.setApp(v);
  }
};

exports.IBizDirectives = IBizDirectives;
