'use strict';

var runtime = require('@ibiz-template/runtime');
var internalMessageDefault_provider = require('./common/internal-message-default/internal-message-default.provider.cjs');
var internalMessageDefault = require('./common/internal-message-default/internal-message-default.cjs');
var internalMessageJson_provider = require('./internal-message-json/internal-message-json.provider.cjs');
var internalMessageJson = require('./internal-message-json/internal-message-json.cjs');
var internalMessageContainer = require('./common/internal-message-container/internal-message-container.cjs');
var internalMessageHtml = require('./internal-message-html/internal-message-html.cjs');
var internalMessageHtml_provider = require('./internal-message-html/internal-message-html.provider.cjs');
var internalMessageText_provider = require('./internal-message-text/internal-message-text.provider.cjs');
var internalMessageText = require('./internal-message-text/internal-message-text.cjs');
var internalMessageTab = require('./internal-message-tab/internal-message-tab.cjs');

"use strict";
function installInternalMessage(v) {
  v.component(internalMessageContainer.InternalMessageContainer.name, internalMessageContainer.InternalMessageContainer);
  v.component(internalMessageDefault.InternalMessageDefault.name, internalMessageDefault.InternalMessageDefault);
  v.component(internalMessageJson.InternalMessageJSON.name, internalMessageJson.InternalMessageJSON);
  v.component(internalMessageHtml.InternalMessageHTML.name, internalMessageHtml.InternalMessageHTML);
  v.component(internalMessageText.InternalMessageText.name, internalMessageText.InternalMessageText);
  runtime.registerInternalMessageProvider(
    "DEFAULT",
    () => new internalMessageDefault_provider.InternalMessageDefaultProvider()
  );
  runtime.registerInternalMessageProvider(
    "JSON",
    () => new internalMessageJson_provider.InternalMessageJSONtProvider()
  );
  runtime.registerInternalMessageProvider(
    "HTML",
    () => new internalMessageHtml_provider.InternalMessageHTMLtProvider()
  );
  runtime.registerInternalMessageProvider(
    "TEXT",
    () => new internalMessageText_provider.InternalMessageTextProvider()
  );
}

exports.InternalMessageTab = internalMessageTab.InternalMessageTab;
exports.installInternalMessage = installInternalMessage;
