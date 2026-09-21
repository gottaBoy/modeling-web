import { registerPortletProvider } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { ContainerPortlet } from './container-portlet.mjs';
import { ContainerPortletProvider } from './container-portlet.provider.mjs';

"use strict";
const IBizContainerPortlet = withInstall(
  ContainerPortlet,
  function(v) {
    v.component(ContainerPortlet.name, ContainerPortlet);
    registerPortletProvider("CONTAINER", () => new ContainerPortletProvider());
  }
);

export { ContainerPortlet, IBizContainerPortlet, IBizContainerPortlet as default };
