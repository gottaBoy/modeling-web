import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

export const CANDIDATE_NAME = '@aibiz/model-design-candidate';
export const CANDIDATE_VERSION = '0.1.0';
export const RUNTIME_NAME = '@ibiz-template-plugin/runtime-model';
export const RUNTIME_SOURCES = Object.freeze({
  '0.2.2-local.1': 'modelingweb/local-plugins/runtime-model',
  '0.2.2-local.2': 'modelingweb/local-plugins/runtime-model-next',
});
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
const ideEnhancements = [
  ['model-edit-view.tsx', 'model-edit-readonly-and-save-lifecycle'],
  ['model-edit-document.ts', 'ide-document-history-diff'],
  ['model-edit-messages.ts', 'ide-bilingual-messages'],
  ['model-edit-view.scss', 'ide-workbench-style'],
];

export function modelEditEnhancementInputs() {
  return ideEnhancements.map(([name]) => {
    const path = `enhancements/${name}`;
    const data = readFileSync(fileURLToPath(new URL(`./${path}`, import.meta.url)));
    return { path, bytes: data.length, sha256: hash(data) };
  });
}

const fixes = [
  {
    path: 'src/ui-action/model-edit-provider.ts',
    kind: 'ide-model-edit-readonly',
    changes: [[
      "    const readonly = action.uiactionParamJO?.readonly === 'true';",
      "    const readonly = action.uiactionParamJO?.readonly === 'true' || action.uiactionParamJO?.readonly === true;",
    ]],
  },
  {
    path: 'src/components/model-clipboard-item/model-clipboard-item.tsx',
    diagnostics: 1,
    changes: [
      [
        '            const res = await service.exec(\n              actionMap[props.data.type],',
        "            const action = props.data.type === 'dsl'\n" +
        '              ? undefined : actionMap[props.data.type];\n' +
        '            if (!action) {\n' +
        "              throw new Error('DSL exports require the DSL clipboard component');\n" +
        '            }\n' +
        '            const res = await service.exec(\n              action,',
      ],
    ],
  },
  {
    path: 'src/components/model-tree/model-tree.tsx',
    diagnostics: 1,
    changes: [['        data._data[name] = value;', '        Reflect.set(data._data, name, value);']],
  },
  {
    path: 'src/components/model-tree/service/model-tree-node-data.ts',
    diagnostics: 2,
    changes: [
      ['        target[p] = value;\n        return true;', '        return Reflect.set(target, p, value);'],
      ['        return target[p];', '        return Reflect.get(target, p);'],
    ],
  },
  {
    path: 'src/components/model-tree/service/model-tree.service.ts',
    diagnostics: 3,
    changes: [
      ['    let text = `${key}`;', '    const nodeValue = Reflect.get(data, key);\n    let text = `${key}`;'],
      ['      : data[key].modeltype;', '      : nodeValue.modeltype;'],
      ['    const item = prentNodeData ? data[key] : data[key].model;',
        '    const item = prentNodeData ? nodeValue : nodeValue.model;'],
    ],
  },
  ...[
    ['dsl-model-edit-provider.ts', 3],
    ['dsl-model-export-provider.ts', 6],
    ['dsl-model-import-provider.ts', 6],
  ].map(([name, diagnostics]) => ({
    path: `src/ui-action/${name}`,
    diagnostics,
    changes: [
      ['    let resultParams = {};', '    let resultParams: IData = {};'],
      ['    return Object.entries(input).reduce((acc, [key, value]) => {',
        '    return Object.entries(input).reduce<IData>((acc, [key, value]) => {'],
      ['      const nested = parts.reduce((obj, part) => {',
        '      const nested = parts.reduce<IData>((obj, part) => {'],
      ...(name === 'dsl-model-edit-provider.ts' ? [] : [[
        "        if (['true', 'false'].includes(resultParams[key].toLowerCase())) {\n" +
        "          resultParams[key] = resultParams[key].toLowerCase() === 'true';",
        '        const value = resultParams[key];\n' +
        "        if (typeof value === 'string' && ['true', 'false'].includes(value.toLowerCase())) {\n" +
        "          resultParams[key] = value.toLowerCase() === 'true';",
      ]]),
    ],
  })),
  {
    path: 'src/components/model-edit-view/model-edit-view.tsx',
    kind: 'model-edit-readonly-and-save-lifecycle',
    changes: [
      ["import { defineComponent, PropType, ref } from 'vue';",
        "import { defineComponent, onUnmounted, PropType, ref } from 'vue';"],
      [
        "    const ns = useNamespace('model-edit-view');",
        "    const ns = useNamespace('model-edit-view');\n" +
        '    let destroyed = false;\n' +
        '    onUnmounted(() => { destroyed = true; });',
      ],
      ['    const closeView = () => {\n      props.modal?.dismiss(',
        '    const closeView = () => {\n      if (destroyed) return;\n      props.modal?.dismiss('],
      [
        '    const save = async (isClose: boolean = false) => {\n      try {',
        '    const save = async (isClose: boolean = false) => {\n' +
        '      if (destroyed || props.readonly || loading.value) return;\n' +
        '      try {',
      ],
      ['      isSave.value = true;\n      try {', '      try {'],
      [
        '        const res = await service.exec(\n          \'ImportModelV2\',',
        '        if (destroyed || props.readonly) return;\n' +
        '        const res = await service.exec(\n          \'ImportModelV2\',',
      ],
      [
        '        if (res.status !== 200) {',
        '        if (destroyed) return;\n        if (res.status !== 200) {',
      ],
      [
        '        } else if (isClose) {\n          closeView();\n        }',
        '        } else {\n          isSave.value = true;\n' +
        '          if (isClose && !props.readonly) closeView();\n        }',
      ],
      [
        '        if (res.status === 200 && res.data && res.data.model) {',
        '        if (!destroyed && res.status === 200 && res.data && res.data.model) {',
      ],
      [
        '        const error = err as IData;\n        ibiz.message.error(\n          error?.message',
        '        if (destroyed) return;\n        const error = err as IData;\n' +
        '        ibiz.message.error(\n          error?.message',
      ],
      [
        "        const res = await service.exec(\n          'ExportModelV2',",
        "        if (destroyed) return;\n        const res = await service.exec(\n          'ExportModelV2',",
      ],
      [
        '        const error = err as IData;\n        ibiz.message.error(\n          error.message',
        '        if (destroyed) return;\n        const error = err as IData;\n' +
        '        ibiz.message.error(\n          error.message',
      ],
      [
        "            language='json'\n            isChangeLanguage={false}",
        "            language='json'\n            readonly={this.readonly}\n            isChangeLanguage={false}",
      ],
    ],
  },
  {
    path: 'src/components/design-code-editor/design-code-editor.tsx',
    kind: 'editor-owned-lifecycle-and-readonly',
    changes: [
      [
        '    let monacoEditor: typeof monaco.editor;\n    let codeCompletion: monaco.IDisposable | null;',
        '    let monacoEditor: typeof monaco.editor | undefined;\n' +
        '    let codeCompletion: monaco.IDisposable | null;\n' +
        '    let ownedModel: monaco.editor.ITextModel | null = null;\n' +
        '    let contentListener: monaco.IDisposable | undefined;\n' +
        '    let groovyTokens: monaco.IDisposable | undefined;\n' +
        '    let editorGeneration = 0;\n' +
        '    let destroyed = false;\n\n' +
        '    const disposeEditor = (): void => {\n' +
        '      editorGeneration += 1;\n' +
        '      isLoading.value = false;\n' +
        '      contentListener?.dispose();\n' +
        '      contentListener = undefined;\n' +
        '      codeLensProviderDisposable?.dispose();\n' +
        '      codeLensProviderDisposable = null;\n' +
        '      codeCompletion?.dispose();\n' +
        '      codeCompletion = null;\n' +
        '      groovyTokens?.dispose();\n' +
        '      groovyTokens = undefined;\n' +
        '      const previousEditor = editor;\n' +
        '      const previousModel = ownedModel;\n' +
        '      editor = undefined;\n' +
        '      ownedModel = null;\n' +
        '      previousEditor?.dispose();\n' +
        '      if (previousModel && !previousModel.isDisposed()) previousModel.dispose();\n' +
        '    };',
      ],
      ['        monacoEditor.setTheme(getMonacoTheme(newVal));',
        '        monacoEditor?.setTheme(getMonacoTheme(newVal));'],
      [
        '    const validate = (model: monaco.editor.ITextModel): boolean => {\n      const currentEditor = monacoEditor\n        .getEditors()',
        '    watch(\n' +
        '      () => props.readonly,\n' +
        '      value => editor?.updateOptions({ readOnly: value }),\n' +
        '    );\n\n' +
        '    const validate = (model: monaco.editor.ITextModel): boolean => {\n' +
        '      const currentEditor = monacoEditor?.getEditors()',
      ],
      [
        '    const editorInit = (): void => {\n      if (!editorRef.value) {',
        '    const editorInit = (): void => {\n' +
        '      const generation = ++editorGeneration;\n' +
        '      if (destroyed || !editorRef.value) {',
      ],
      [
        '      nextTick(() => {\n        isLoading.value = true;',
        '      nextTick(() => {\n' +
        '        if (destroyed || generation !== editorGeneration || !editorRef.value) return;\n' +
        '        isLoading.value = true;',
      ],
      [
        '            vs: `${ibiz.env.pluginBaseUrl}/monaco-editor@0.52.2/min/vs`,',
        '            vs: new URL(\n' +
        '              `${ibiz.env.pluginBaseUrl}/monaco-editor@0.52.2/min/vs`,\n' +
        '              document.baseURI,\n' +
        '            ).href,',
      ],
      [
        '          .then(loaderMonaco => {\n            isLoading.value = false;',
        '          .then(loaderMonaco => {\n' +
        '            if (destroyed || generation !== editorGeneration) return;\n' +
        '            isLoading.value = false;',
      ],
      [
        "            loaderMonaco.languages.register({ id: 'groovy' });\n            loaderMonaco.languages.setMonarchTokensProvider('groovy', {",
        "            if (!loaderMonaco.languages.getLanguages().some(language => language.id === 'groovy')) {\n" +
        "              loaderMonaco.languages.register({ id: 'groovy' });\n" +
        '            }\n' +
        "            groovyTokens = loaderMonaco.languages.setMonarchTokensProvider('groovy', {",
      ],
      [
        "              wordWrap: 'on',\n            });",
        "              wordWrap: 'on',\n            });\n" +
        '            ownedModel = editor.getModel();',
      ],
      [
        '            editor.onDidChangeModelContent(() => {',
        '            contentListener = editor.onDidChangeModelContent(() => {',
      ],
      [
        '          .catch(() => {\n            isLoading.value = false;',
        '          .catch(() => {\n' +
        '            if (destroyed || generation !== editorGeneration) return;\n' +
        '            disposeEditor();\n' +
        '            isLoading.value = false;',
      ],
      [
        '      editor?.dispose();\n      editor = undefined;\n      editorInit();',
        '      disposeEditor();\n      editorInit();',
      ],
      [
        '        editor?.dispose();\n        editor = undefined;\n        editorInit();',
        '        disposeEditor();\n        editorInit();',
      ],
      [
        '    let resizeObserver: ResizeObserver | undefined;',
        '    let resizeObserver: ResizeObserver | undefined;\n' +
        '    let observedContainer: HTMLElement | undefined;',
      ],
      [
        "      if (containerRef.value) {\n        containerRef.value.addEventListener(\n          'fullscreenchange',",
        '      if (containerRef.value) {\n' +
        '        observedContainer = containerRef.value;\n' +
        "        observedContainer.addEventListener(\n          'fullscreenchange',",
      ],
      [
        "    onUnmounted(() => {\n      window.removeEventListener('resize', handleResize);\n      containerRef.value?.removeEventListener(",
        '    onUnmounted(() => {\n' +
        '      destroyed = true;\n' +
        '      disposeEditor();\n' +
        "      window.removeEventListener('resize', handleResize);\n" +
        '      observedContainer?.removeEventListener(',
      ],
      [
        '      resizeObserver?.disconnect();\n      codeLensProviderDisposable?.dispose();\n      codeCompletion?.dispose();',
        '      resizeObserver?.disconnect();\n      observedContainer = undefined;',
      ],
    ],
  },
];

function replaceOnce(text, before, after, path) {
  const start = text.indexOf(before);
  assert.ok(start >= 0 && text.indexOf(before, start + before.length) === -1,
    `Expected exactly one pinned source fragment: ${path}`);
  return text.slice(0, start) + after + text.slice(start + before.length);
}

export function patchCandidateSources(files) {
  const patches = [];
  const contents = files.map(file => {
    const fix = fixes.find(item => item.path === file.path);
    if (!fix) return { ...file };
    let text = file.data.toString('utf8');
    for (const [before, after] of fix.changes) text = replaceOnce(text, before, after, fix.path);
    const data = Buffer.from(text);
    patches.push({
      path: fix.path,
      ...(fix.kind ? { kind: fix.kind } : { diagnosticCode: 'TS7053', diagnostics: fix.diagnostics }),
      originalSha256: hash(file.data), candidateSha256: hash(data),
    });
    return { ...file, data, bytes: data.length, sha256: hash(data) };
  });
  assert.equal(patches.length, fixes.length, 'Required source adaptation missing');
  for (const [name, kind] of ideEnhancements) {
    const path = `src/components/model-edit-view/${name}`;
    const data = readFileSync(fileURLToPath(new URL(`./enhancements/${name}`, import.meta.url)));
    const original = files.find(file => file.path === path);
    const index = contents.findIndex(file => file.path === path);
    const enhancement = { path: `enhancements/${name}`, bytes: data.length, sha256: hash(data) };
    const patch = patches.find(item => item.path === path);
    if (patch) Object.assign(patch, { candidateSha256: hash(data), enhancement });
    else patches.push({ path, kind, originalSha256: original ? hash(original.data) : null,
      candidateSha256: hash(data), enhancement });
    const file = { path, data, bytes: data.length, sha256: hash(data) };
    if (index >= 0) contents[index] = file;
    else contents.push(file);
  }
  contents.sort((left, right) => left.path.localeCompare(right.path));
  patches.sort((a, b) => a.path.localeCompare(b.path));
  return { contents, patches, indexDiagnosticsAddressed: 22 };
}

export function candidateManifest(original, links) {
  assert.equal(original.name, '@ibiz-template-plugin/model-design');
  assert.equal(original.version, '0.0.3-alpha.122');
  const runtimes = links.filter(link => link.name === RUNTIME_NAME);
  assert.equal(runtimes.length, 1, 'Exactly one source-built runtime is required');
  const runtime = runtimes[0];
  assert.ok(Object.hasOwn(RUNTIME_SOURCES, runtime.version), 'Unsupported runtime source version');
  assert.equal(runtime.role, 'verified-reconstructed-local-source-build');
  const manifest = {
    ...original,
    name: CANDIDATE_NAME,
    version: CANDIDATE_VERSION,
    private: true,
    scripts: {
      typecheck: 'vue-tsc --noEmit',
      build: 'ibiz-temp build -c && vue-tsc --declaration --emitDeclarationOnly',
    },
    files: ['dist', 'es', 'lib', 'src', 'public'],
    dependencies: { ...original.dependencies, [RUNTIME_NAME]: runtime.version },
    peerDependencies: { ...original.peerDependencies },
    devDependencies: { ...original.devDependencies },
    aibiz: {
      sourceStatus: 'vendored-source-with-independent-local-fixes',
      upstreamReference: `${original.name}@${original.version}`,
      upstreamGitHead: original.gitHead ?? null,
      requestedReference: '@ibiz-template-plugin/model-design@0.0.3-alpha.90',
      originalSourceRecovered: false,
      nativeCompatibilityVerified: false,
      acceptedForProduction: false,
    },
  };
  delete manifest.gitHead;
  delete manifest.publishConfig;
  for (const link of links) {
    if (link.name.startsWith('@ibiz') && Object.hasOwn(manifest.dependencies, link.name)) {
      manifest.dependencies[link.name] = link.version;
    }
  }
  return manifest;
}
