import {
  PropType,
  defineComponent,
  nextTick,
  onMounted,
  onUnmounted,
  ref,
  watch,
} from 'vue';
import * as monaco from 'monaco-editor';
import loader from '@monaco-editor/loader';
import { useNamespace, useUIStore } from '@ibiz-template/vue3-util';
import { StyleDebugDockController } from '../../controller/style-debug-dock.controller';
import './style-debug-dock.scss';

export const StyleDebugDock = defineComponent({
  name: 'DevToolStyleDebugDock',
  props: {
    controller: {
      type: Object as PropType<StyleDebugDockController>,
      required: true,
    },
  },
  setup(props) {
    const ns = useNamespace('style-debug-dock');
    const { state } = props.controller;
    const { UIStore } = useUIStore();

    const cssEditBox = ref();
    const isLoading = ref(true);

    let editor: monaco.editor.IStandaloneCodeEditor;
    let monacoEditor: typeof monaco.editor;

    // 编辑器主题（与 view-model-viewer 保持一致）
    const getMonacoTheme = (name: string): string => {
      return name === 'dark' ? `vs-${UIStore.theme}` : 'vs';
    };

    watch(
      () => UIStore.theme,
      newVal => {
        monacoEditor?.setTheme(getMonacoTheme(newVal));
      },
    );

    // 外部状态变更（点选/重置/下钻）→ 同步编辑器
    // 值相同时跳过，避免与 onDidChangeModelContent 形成循环
    watch(
      () => state.cssEditorContent,
      newVal => {
        if (editor && newVal !== editor.getValue()) {
          editor.setValue(newVal || '');
        }
      },
    );

    const editorInit = (): void => {
      nextTick(() => {
        loader.config({
          paths: {
            vs: `${ibiz.env.pluginBaseUrl}/monaco-editor@0.45.0/min/vs`,
          },
        });
        loader.init().then(loaderMonaco => {
          isLoading.value = false;
          if (!editor && cssEditBox.value) {
            monacoEditor = loaderMonaco.editor;
            editor = monacoEditor.create(cssEditBox.value, {
              language: 'css',
              theme: getMonacoTheme(UIStore.theme),
              minimap: { enabled: false },
              fontSize: 14,
              lineNumbers: 'on',
              scrollBeyondLastLine: false,
              automaticLayout: true,
              tabSize: 2,
              wordWrap: 'on',
              fontFamily: "'Fira Code', 'Microsoft YaHei', monospace", // 英文用 Fira Code，中文 fallback 到微软雅黑
              lineHeight: 20,
              letterSpacing: 0.5, // 可选：微调字符间距
            });
            editor.setValue(state.cssEditorContent || '');
            // 用户编辑 → 通知控制器；值相同时跳过，避免与 watch 循环
            editor.onDidChangeModelContent(() => {
              const value = editor.getValue();
              if (value !== state.cssEditorContent) {
                props.controller.onEditorInput(value);
              }
            });
          }
        });
      });
    };

    onMounted(() => {
      editorInit();
    });

    onUnmounted(() => {
      editor?.dispose();
    });

    return { ns, state, cssEditBox, isLoading };
  },
  render() {
    const { controller, state, ns } = this;
    return (
      <div class={[ns.b(), ns.is('hidden', !state.isShow)]}>
        <div class={ns.e('dock-accent')}></div>
        <div class={ns.e('panel-content')}>
          <div class={ns.e('header')}>
            <div class={ns.e('left-area')}>
              <div class={ns.e('selector-container')}>
                <div
                  class={[
                    ns.e('picker-button'),
                    ns.is('active', state.isPickerActive),
                  ]}
                  title='开启运行时元素点选模式'
                  onClick={() => controller.togglePicker()}
                >
                  <ion-icon name='navigate-outline'></ion-icon>
                </div>
                <div class={ns.e('selector-input')}>
                  <input
                    type='text'
                    placeholder='输入或点选生成 CSS 选择器...'
                    value={state.selectorInput}
                    onInput={(e: Event) => {
                      state.selectorInput = (
                        e.target as HTMLInputElement
                      ).value;
                    }}
                    onBlur={() => controller.onSelectorCommit()}
                    onKeydown={(e: KeyboardEvent) => {
                      if (e.key === 'Enter') {
                        controller.onSelectorCommit();
                      }
                    }}
                  />
                </div>
              </div>
            </div>
            <div class={ns.e('right-area')}>
              <div
                class={ns.e('close-button')}
                onClick={() => controller.triggerVisible(false)}
              >
                <ion-icon name='close-outline'></ion-icon>
              </div>
            </div>
          </div>

          <div class={ns.e('breadcrumb-section')}>
            <div class={ns.e('dom-breadcrumbs')}>
              {state.breadcrumbs.length > 0 ? (
                state.breadcrumbs.map((crumb, index) => (
                  <div
                    key={crumb.id}
                    class={[ns.e('crumb')]}
                    onClick={() => controller.selectBreadcrumb(crumb)}
                  >
                    <span
                      class={[
                        ns.e('crumb-item'),
                        ns.is('active', index === state.breadcrumbs.length - 1),
                      ]}
                    >
                      {crumb.name}
                    </span>
                    {index < state.breadcrumbs.length - 1 && (
                      <ion-icon name='chevron-forward-outline'></ion-icon>
                    )}
                  </div>
                ))
              ) : (
                <div class={ns.e('empty-placeholder')}>
                  🔍 暂无选定元素，请先捕获或手输路径
                </div>
              )}
            </div>

            <div class={ns.e('children-list')}>
              <div class={ns.e('list-header')}>
                <span class={ns.e('list-title')}>
                  当前组件层级内部子节点 (快捷下钻)
                </span>
                <span class={ns.e('list-count')}>
                  {state.childrenList.length}
                </span>
              </div>
              <div class={ns.e('list-items')}>
                {state.childrenList.length > 0 ? (
                  state.childrenList.map(child => (
                    <div
                      key={child.id}
                      class={[
                        ns.e('list-item'),
                        ns.is('selected', state.selectedChildId === child.id),
                      ]}
                      onClick={() => controller.selectChild(child)}
                    >
                      <span>{child.name}</span>
                    </div>
                  ))
                ) : (
                  <div class={ns.e('empty-placeholder')}>暂无内容...</div>
                )}
              </div>
            </div>
          </div>

          <div class={ns.e('style-editor')}>
            <div class={ns.e('editor-header')}>
              <span class={ns.e('editor-title')}>Styles</span>
            </div>
            <div class={ns.e('editor-body')}>
              <div class={ns.e('css-editor')} v-loading={this.isLoading}>
                <div ref='cssEditBox' class={ns.e('monaco-container')}></div>
              </div>
            </div>
          </div>

          <div class={ns.e('code-exporter')}>
            <div class={ns.e('exporter-header')}>
              <div class={ns.e('exporter-title')}>
                <span>变更样式</span>
              </div>
              <div class={ns.e('header-right')}>
                <div
                  class={ns.e('copy-button')}
                  onClick={() => controller.copyCode()}
                >
                  <ion-icon name='copy-outline'></ion-icon>
                  <span>Copy</span>
                </div>
              </div>
            </div>
            <div class={ns.e('code-block')}>
              <pre>{controller.exportedCode}</pre>
            </div>
          </div>
        </div>
      </div>
    );
  },
});

export default StyleDebugDock;
