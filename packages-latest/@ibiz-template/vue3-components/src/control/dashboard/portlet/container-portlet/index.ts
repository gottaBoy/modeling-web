import { registerPortletProvider } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { App } from 'vue';
import { ContainerPortlet } from './container-portlet';
import { ContainerPortletProvider } from './container-portlet.provider';

export * from './container-portlet';

export const IBizContainerPortlet = withInstall(
  ContainerPortlet,
  function (v: App) {
    v.component(ContainerPortlet.name, ContainerPortlet);
    // 容器分组
    registerPortletProvider('CONTAINER', () => new ContainerPortletProvider());
  },
);

export default IBizContainerPortlet;
