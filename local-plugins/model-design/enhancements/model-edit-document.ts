export type JsonModel = Record<string, unknown>;
export interface ModelChange {
  path: string;
  kind: 'add' | 'remove' | 'replace';
  before: string;
  after: string;
}

export function parseModel(text: string): JsonModel {
  const value: unknown = JSON.parse(text, (_key, item: unknown) => {
    if (typeof item === 'number' && !Number.isFinite(item)) throw new Error('FINITE_NUMBER_REQUIRED');
    return item;
  });
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new Error('OBJECT_REQUIRED');
  }
  return value as JsonModel;
}

function canonical(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(canonical).join(',')}]`;
  if (value && typeof value === 'object') {
    return `{${Object.keys(value).sort().map(key =>
      `${JSON.stringify(key)}:${canonical(Reflect.get(value, key))}`).join(',')}}`;
  }
  return JSON.stringify(value);
}

export function sameModel(left: unknown, right: unknown): boolean {
  return canonical(left) === canonical(right);
}

const pointer = (key: string): string => key.replace(/~/g, '~0').replace(/\//g, '~1');
const preview = (value: unknown): string => {
  if (value === undefined) return '';
  const text = JSON.stringify(value);
  return text.length > 240 ? `${text.slice(0, 237)}...` : text;
};

export class ModelEditDocument {
  value = '';
  baseline = '';
  private history: string[] = [];
  private future: string[] = [];

  get dirty(): boolean { return this.value !== this.baseline; }
  get canUndo(): boolean { return this.history.length > 0; }
  get canRedo(): boolean { return this.future.length > 0; }

  reset(model: JsonModel): void {
    this.value = JSON.stringify(model, null, 4);
    this.baseline = this.value;
    this.history = [];
    this.future = [];
  }

  setText(text: string): void {
    if (text === this.value) return;
    this.history = [...this.history.slice(-49), this.value];
    this.future = [];
    this.value = text;
  }

  undo(): void {
    if (!this.canUndo) return;
    this.future.push(this.value);
    this.value = this.history.pop()!;
  }

  redo(): void {
    if (!this.canRedo) return;
    this.history = [...this.history.slice(-49), this.value];
    this.value = this.future.pop()!;
  }

  format(): void { this.setText(JSON.stringify(parseModel(this.value), null, 4)); }
  matchesBaseline(model: JsonModel): boolean { return sameModel(parseModel(this.baseline), model); }

  changes(limit = 200): { entries: ModelChange[]; truncated: boolean } {
    if (!Number.isSafeInteger(limit) || limit < 1 || limit > 1000) throw new Error('Invalid diff limit');
    const before = parseModel(this.baseline);
    const after = parseModel(this.value);
    const entries: ModelChange[] = [];
    let truncated = false;
    const visit = (left: unknown, right: unknown, path: string, depth: number): void => {
      if (sameModel(left, right)) return;
      if (entries.length === limit) { truncated = true; return; }
      const objects = left && right && typeof left === 'object' && typeof right === 'object';
      if (objects && !Array.isArray(left) && !Array.isArray(right) && depth < 32) {
        for (const key of new Set([...Object.keys(left), ...Object.keys(right)])) {
          visit(Object.prototype.hasOwnProperty.call(left, key) ? Reflect.get(left, key) : undefined,
            Object.prototype.hasOwnProperty.call(right, key) ? Reflect.get(right, key) : undefined,
            `${path}/${pointer(key)}`, depth + 1);
        }
        return;
      }
      entries.push({ path: path || '/', kind: left === undefined ? 'add' : right === undefined ? 'remove' : 'replace',
        before: preview(left), after: preview(right) });
    };
    visit(before, after, '', 0);
    return { entries, truncated };
  }
}
