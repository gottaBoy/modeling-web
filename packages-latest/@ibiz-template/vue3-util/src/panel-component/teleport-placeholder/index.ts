import { registerPanelItemProvider } from '@ibiz-template/runtime';
import { App } from 'vue';
import { withInstall } from '../../util';
import { TeleportPlaceholder } from './teleport-placeholder';
import { TeleportPlaceholderProvider } from './teleport-placeholder.provider';

export { TeleportPlaceholderProvider };

export const IBizTeleportPlaceholder = withInstall(
  TeleportPlaceholder,
  function (v: App) {
    v.component(TeleportPlaceholder.name!, TeleportPlaceholder);
    registerPanelItemProvider(
      'RAWITEM_TELEPORT_PLACEHOLDER',
      () => new TeleportPlaceholderProvider(),
    );
  },
);

export default IBizTeleportPlaceholder;
