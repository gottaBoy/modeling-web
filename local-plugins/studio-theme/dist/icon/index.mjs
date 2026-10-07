const iconMetadata = Object.freeze({
    name: '@aibiz/studio-icon',
    version: '0.1.0',
    variant: 'icon',
    rootClass: 'studio_icon',
    sourceStatus: 'independent-local-implementation',
    originalSourceRecovered: false,
    nativeCompatibilityVerified: false,
});
const iconPlugin = Object.freeze({
    install(app) {
        app.provide('aibiz.studioIconTheme', iconMetadata);
    },
});

export { iconPlugin as default, iconMetadata as metadata };
