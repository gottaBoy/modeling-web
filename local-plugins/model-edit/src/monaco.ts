export interface Disposable { dispose(): void; }
export interface TextModel extends Disposable { getValue(): string; setValue(value: string): void; }
export interface CodeEditor extends Disposable {
  onDidChangeModelContent(callback: () => void): Disposable;
  updateOptions(options: { readOnly: boolean }): void;
}
export interface MonacoAPI {
  editor: {
    createModel(value: string, language: string): TextModel;
    create(element: HTMLElement, options: {
      model: TextModel; readOnly: boolean; automaticLayout: boolean;
      minimap: { enabled: boolean }; scrollBeyondLastLine: boolean;
    }): CodeEditor;
  };
}
export interface MonacoLoader {
  config(options: { paths: { vs: string } }): void;
  init(): Promise<MonacoAPI>;
}

export function monacoBaseUrl(pluginBaseUrl: string | undefined, baseURI: string): string {
  const base = new URL(baseURI);
  const url = new URL(`${(pluginBaseUrl ?? './plugins').replace(/\/+$/, '')}/monaco-editor@0.52.2/min/vs`, base);
  if (!['http:', 'https:'].includes(url.protocol) || url.origin !== base.origin ||
      url.username || url.password || url.search || url.hash) {
    throw new Error('Monaco requires a same-origin local asset directory.');
  }
  return url.href;
}

export class MonacoSurface {
  private disposed = false;
  private started = false;
  private model?: TextModel;
  private editor?: CodeEditor;
  private listener?: Disposable;
  private value = '';
  private readonly = true;

  constructor(private loader: MonacoLoader, private change: (value: string) => void) {}

  async mount(element: HTMLElement, vs: string): Promise<boolean> {
    if (this.disposed || this.started) return false;
    this.started = true;
    this.loader.config({ paths: { vs } });
    const monaco = await this.loader.init();
    if (this.disposed) return false;
    try {
      this.model = monaco.editor.createModel(this.value, 'json');
      this.editor = monaco.editor.create(element, {
        model: this.model, readOnly: this.readonly, automaticLayout: true,
        minimap: { enabled: false }, scrollBeyondLastLine: false,
      });
      this.listener = this.editor.onDidChangeModelContent(() => {
        if (!this.disposed && !this.readonly && this.model) this.change(this.model.getValue());
      });
      return true;
    } catch (error) {
      this.dispose();
      throw error;
    }
  }

  update(value: string, readonly: boolean): void {
    if (this.disposed) return;
    this.value = value;
    this.readonly = readonly;
    this.editor?.updateOptions({ readOnly: readonly });
    if (this.model && this.model.getValue() !== value) this.model.setValue(value);
  }

  dispose(): void {
    if (this.disposed) return;
    this.disposed = true;
    this.listener?.dispose();
    this.editor?.dispose();
    this.model?.dispose();
    this.listener = undefined;
    this.editor = undefined;
    this.model = undefined;
  }
}
