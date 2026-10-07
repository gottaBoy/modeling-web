const colorMetadata = Object.freeze({
    name: '@aibiz/studio-theme',
    version: '0.1.0',
    variant: 'color',
    rootClass: 'studio_dark',
    sourceStatus: 'independent-local-implementation',
    originalSourceRecovered: false,
    nativeCompatibilityVerified: false,
});
const colorPlugin = Object.freeze({
    install(app) {
        app.provide('aibiz.studioColorTheme', colorMetadata);
    },
});

export { colorPlugin as default, colorMetadata as metadata };
