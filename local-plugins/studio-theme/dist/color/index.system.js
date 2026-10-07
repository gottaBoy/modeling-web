System.register([], (function (exports) {
  'use strict';
  return {
    execute: (function () {

      const colorMetadata = exports("metadata", Object.freeze({
          name: '@aibiz/studio-theme',
          version: '0.1.0',
          variant: 'color',
          rootClass: 'studio_dark',
          sourceStatus: 'independent-local-implementation',
          originalSourceRecovered: false,
          nativeCompatibilityVerified: false,
      }));
      const colorPlugin = exports("default", Object.freeze({
          install(app) {
              app.provide('aibiz.studioColorTheme', colorMetadata);
          },
      }));

    })
  };
}));
