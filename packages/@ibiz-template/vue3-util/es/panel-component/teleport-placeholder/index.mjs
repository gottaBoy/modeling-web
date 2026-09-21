import { registerPanelItemProvider } from '@ibiz-template/runtime';
import '../../util/index.mjs';
import { TeleportPlaceholder } from './teleport-placeholder.mjs';
import { TeleportPlaceholderProvider } from './teleport-placeholder.provider.mjs';
import { withInstall } from '../../util/install.mjs';

"use strict";
const IBizTeleportPlaceholder = withInstall(
  TeleportPlaceholder,
  function(v) {
    v.component(TeleportPlaceholder.name, TeleportPlaceholder);
    registerPanelItemProvider(
      "RAWITEM_TELEPORT_PLACEHOLDER",
      () => new TeleportPlaceholderProvider()
    );
  }
);

export { IBizTeleportPlaceholder, TeleportPlaceholderProvider, IBizTeleportPlaceholder as default };
