export type Encoding = 'data-url' | 'base64';

export interface UploadModel {
  name?: string;
  fileExts?: string;
  maxFileCount?: number;
  maxFileSize?: number;
  editorParams?: Record<string, unknown>;
}

export interface FileConfig {
  encoding: Encoding;
  accept: string;
  maxFileCount: 1;
  maxSizeBytes: number;
  filenameField: string;
  readonly: boolean;
  disabled: boolean;
}

export interface FileDescriptor {
  name: string;
  type: string;
  size: number;
}

export class FileConversionError extends Error {
  constructor(
    public readonly code: 'config' | 'count' | 'type' | 'size' | 'read' | 'aborted',
    message: string,
  ) {
    super(message);
    this.name = 'FileConversionError';
  }
}

function asBoolean(value: unknown): boolean {
  return value === true || value === 1 ||
    (typeof value === 'string' && ['true', '1'].includes(value.trim().toLowerCase()));
}

function numberOption(value: unknown, label: string): number {
  if ((typeof value !== 'number' && typeof value !== 'string') ||
    (typeof value === 'string' && !value.trim())) {
    throw new FileConversionError('config', `Invalid ${label} configuration.`);
  }
  const number = typeof value === 'number' ? value : Number(value);
  if (!Number.isFinite(number) || (number < 0 && number !== -1)) {
    throw new FileConversionError('config', `Invalid ${label} configuration.`);
  }
  return number;
}

export function normalizeAccept(value: unknown): string {
  if (value === undefined || value === null || value === '') return '';
  if (typeof value !== 'string') {
    throw new FileConversionError('config', 'File types must be a string.');
  }
  return value.split(/[,;]/).map(token => {
    let item = token.trim().toLowerCase();
    if (!item) return '';
    if (item === '*' || item === '*.*' || item === '*/*') return '*/*';
    if (item.startsWith('*.')) item = item.slice(1);
    if (/^[a-z0-9!#$&^_.+-]+\/(?:[a-z0-9!#$&^_.+-]+|\*)$/.test(item)) return item;
    if (!item.startsWith('.')) item = `.${item}`;
    if (!/^\.[a-z0-9_.+-]+$/.test(item)) {
      throw new FileConversionError('config', `Invalid file type: ${token.trim()}.`);
    }
    return item;
  }).filter(Boolean).join(',');
}

export function resolveFileConfig(
  model: UploadModel = {},
  editorParams: Record<string, unknown> = model.editorParams || {},
): FileConfig {
  const params = Object.fromEntries(
    Object.entries(editorParams).map(([key, value]) => [key.toLowerCase(), value]),
  );
  const requested = String(params.encoding ?? (asBoolean(params.rawbase64) ? 'base64' : 'data-url')).toLowerCase();
  let encoding: Encoding;
  if (['data-url', 'dataurl'].includes(requested)) encoding = 'data-url';
  else if (['base64', 'raw-base64'].includes(requested)) encoding = 'base64';
  else throw new FileConversionError('config', `Unsupported encoding: ${requested}.`);

  const count = numberOption(params.maxfilecnt ?? model.maxFileCount ?? 1, 'MAXFILECNT');
  if (count !== 1 && count !== -1) {
    throw new FileConversionError('config', 'This scalar editor supports exactly one file.');
  }
  const hasByteLimit = params.maxsizebytes !== undefined && params.maxsizebytes !== null;
  const size = numberOption(
    hasByteLimit ? params.maxsizebytes : params.size ?? params.maxfilesize ?? model.maxFileSize ?? -1,
    'file size',
  );
  const maxSizeBytes = size <= 0 ? Infinity :
    size * (hasByteLimit ? 1 : 1024 * 1024);
  if (size > 0 && !Number.isFinite(maxSizeBytes)) {
    throw new FileConversionError('config', 'File size configuration is too large.');
  }
  if (params.filename !== undefined && typeof params.filename !== 'string') {
    throw new FileConversionError('config', 'The filename field must be a string.');
  }
  const filenameField = (params.filename as string | undefined)?.trim() || '';
  if (filenameField && filenameField.toLowerCase() === model.name?.toLowerCase()) {
    throw new FileConversionError('config', 'The filename field must differ from the value field.');
  }
  return {
    encoding,
    accept: normalizeAccept(params.accept ?? params.fileexts ?? model.fileExts),
    maxFileCount: 1,
    maxSizeBytes,
    filenameField,
    readonly: asBoolean(params.readonly),
    disabled: asBoolean(params.disabled),
  };
}

export function matchesAccept(file: FileDescriptor, accept: string): boolean {
  if (!accept) return true;
  const name = file.name.toLowerCase();
  const type = file.type.toLowerCase();
  return accept.split(',').some(token => {
    if (token === '*/*') return true;
    if (token.startsWith('.')) return name.endsWith(token);
    if (token.endsWith('/*')) return type.startsWith(token.slice(0, -1));
    return type === token;
  });
}

export function validateSelection(
  files: readonly FileDescriptor[],
  config: FileConfig,
): FileDescriptor | undefined {
  if (!files.length) return undefined;
  if (files.length > config.maxFileCount) {
    throw new FileConversionError('count', 'Select only one file.');
  }
  const file = files[0];
  if (!matchesAccept(file, config.accept)) {
    throw new FileConversionError('type', 'This file type is not allowed.');
  }
  if (!Number.isFinite(file.size) || file.size < 0 || file.size > config.maxSizeBytes) {
    throw new FileConversionError('size', 'The file exceeds the configured size limit.');
  }
  return file;
}

export function dataUrlToValue(dataUrl: unknown, encoding: Encoding): string {
  if (typeof dataUrl !== 'string') {
    throw new FileConversionError('read', 'The file reader did not return a data URL.');
  }
  const match = /^data:[^,]*;base64,((?:[a-z0-9+/]{4})*(?:[a-z0-9+/]{2}==|[a-z0-9+/]{3}=)?)$/i.exec(dataUrl);
  if (!match) throw new FileConversionError('read', 'The file reader returned an invalid base64 data URL.');
  return encoding === 'base64' ? match[1] : dataUrl;
}

export function readFileAsValue(
  file: Blob,
  encoding: Encoding,
  signal?: AbortSignal,
  createReader: () => FileReader = () => new FileReader(),
): Promise<string> {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(new FileConversionError('aborted', 'File reading was cancelled.'));
      return;
    }
    let reader: FileReader;
    try {
      reader = createReader();
    } catch {
      reject(new FileConversionError('read', 'FileReader is not available.'));
      return;
    }
    let settled = false;
    const cleanup = () => {
      reader.onload = null;
      reader.onerror = null;
      reader.onabort = null;
      signal?.removeEventListener('abort', cancel);
    };
    const fail = (error: Error) => {
      if (settled) return;
      settled = true;
      cleanup();
      reject(error);
    };
    const cancel = () => {
      fail(new FileConversionError('aborted', 'File reading was cancelled.'));
      reader.abort();
    };
    reader.onload = () => {
      if (settled) return;
      try {
        const value = dataUrlToValue(reader.result, encoding);
        settled = true;
        cleanup();
        resolve(value);
      } catch (error) {
        fail(error as Error);
      }
    };
    reader.onerror = () => fail(new FileConversionError('read', 'The file could not be read.'));
    reader.onabort = () => fail(new FileConversionError('aborted', 'File reading was cancelled.'));
    signal?.addEventListener('abort', cancel, { once: true });
    try {
      reader.readAsDataURL(file);
    } catch {
      fail(new FileConversionError('read', 'The file could not be read.'));
    }
  });
}

export function valueChanges(
  value: string | null,
  filename: string | null,
  filenameField: string,
): [string | null, string?][] {
  return filenameField ? [[value], [filename, filenameField]] : [[value]];
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KiB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MiB`;
}
