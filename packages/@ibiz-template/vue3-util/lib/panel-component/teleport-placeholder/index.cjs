'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var runtime = require('@ibiz-template/runtime');
require('../../util/index.cjs');
var teleportPlaceholder = require('./teleport-placeholder.cjs');
var teleportPlaceholder_provider = require('./teleport-placeholder.provider.cjs');
var install = require('../../util/install.cjs');

"use strict";
const IBizTeleportPlaceholder = install.withInstall(
  teleportPlaceholder.TeleportPlaceholder,
  function(v) {
    v.component(teleportPlaceholder.TeleportPlaceholder.name, teleportPlaceholder.TeleportPlaceholder);
    runtime.registerPanelItemProvider(
      "RAWITEM_TELEPORT_PLACEHOLDER",
      () => new teleportPlaceholder_provider.TeleportPlaceholderProvider()
    );
  }
);

exports.TeleportPlaceholderProvider = teleportPlaceholder_provider.TeleportPlaceholderProvider;
exports.IBizTeleportPlaceholder = IBizTeleportPlaceholder;
exports.default = IBizTeleportPlaceholder;
