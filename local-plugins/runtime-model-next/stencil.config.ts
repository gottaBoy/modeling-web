import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'ibiz-runtime-model',
  sourceMap: true,
  buildEs5: false,
  bundles: [
    {
      components: [
        'ibiz-model-runtime',
        'loading-mask',
        'ibiz-model-runtime-list',
        'loading-panel',
      ],
    },
  ],
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
  ],
};
