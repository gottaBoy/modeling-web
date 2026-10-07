System.register([], (function (exports) {
  'use strict';
  return {
    execute: (function () {

      const iconMetadata = exports("metadata", Object.freeze({
          name: '@aibiz/studio-icon',
          version: '0.1.0',
          variant: 'icon',
          rootClass: 'studio_icon',
          sourceStatus: 'independent-local-implementation',
          originalSourceRecovered: false,
          nativeCompatibilityVerified: false,
      }));
      const iconPlugin = exports("default", Object.freeze({
          install(app) {
              app.provide('aibiz.studioIconTheme', iconMetadata);
          },
      }));

    })
  };
}));
