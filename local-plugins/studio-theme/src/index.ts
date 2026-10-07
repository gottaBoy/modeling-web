interface ThemeHost {
  provide(key: string, value: StudioThemeMetadata): unknown;
}

interface StudioThemeMetadata {
  readonly name: string;
  readonly version: '0.1.0';
  readonly variant: 'color' | 'icon';
  readonly rootClass: 'studio_dark' | 'studio_icon';
  readonly sourceStatus: 'independent-local-implementation';
  readonly originalSourceRecovered: false;
  readonly nativeCompatibilityVerified: false;
}

export const colorMetadata: Readonly<StudioThemeMetadata> = Object.freeze({
  name: '@aibiz/studio-theme',
  version: '0.1.0',
  variant: 'color',
  rootClass: 'studio_dark',
  sourceStatus: 'independent-local-implementation',
  originalSourceRecovered: false,
  nativeCompatibilityVerified: false,
});

export const iconMetadata: Readonly<StudioThemeMetadata> = Object.freeze({
  name: '@aibiz/studio-icon',
  version: '0.1.0',
  variant: 'icon',
  rootClass: 'studio_icon',
  sourceStatus: 'independent-local-implementation',
  originalSourceRecovered: false,
  nativeCompatibilityVerified: false,
});

export const colorPlugin = Object.freeze({
  install(app: ThemeHost): void {
    app.provide('aibiz.studioColorTheme', colorMetadata);
  },
});

export const iconPlugin = Object.freeze({
  install(app: ThemeHost): void {
    app.provide('aibiz.studioIconTheme', iconMetadata);
  },
});
