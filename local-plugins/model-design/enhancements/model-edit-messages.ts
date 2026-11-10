const english = {
  back: 'Back', close: 'Close', save: 'Save', saveClose: 'Save and close',
  loading: 'Loading...', saving: 'Saving...', verifying: 'Verifying...',
  reload: 'Reload', undo: 'Undo', redo: 'Redo', format: 'Format JSON',
  changes: 'Changes', export: 'Download JSON', readonly: 'Read-only',
  modified: 'Modified', saved: 'Saved and verified', clean: 'Unchanged',
  valid: 'Valid JSON object', invalid: 'Invalid JSON object',
  noChanges: 'No changes', path: 'Path', before: 'Before', after: 'After',
  add: 'Added', remove: 'Removed', replace: 'Changed', truncated: 'Change list truncated',
  discardTitle: 'Discard changes?', discard: 'Unsaved model changes will be discarded.',
  loadFailed: 'The model could not be loaded.',
  closeFailed: 'The editor could not be closed.',
  saveFailed: 'The model could not be saved.',
  conflict: 'The server model changed. Reload and compare before saving.',
  unverified: 'The import completed, but readback could not be verified. Reload to check the server model.',
  invalidObject: 'The model must be a valid JSON object.',
};
const chinese: typeof english = {
  back: '\u8fd4\u56de', close: '\u5173\u95ed', save: '\u4fdd\u5b58', saveClose: '\u4fdd\u5b58\u5e76\u5173\u95ed',
  loading: '\u52a0\u8f7d\u4e2d...', saving: '\u4fdd\u5b58\u4e2d...', verifying: '\u6821\u9a8c\u4e2d...',
  reload: '\u91cd\u65b0\u52a0\u8f7d', undo: '\u64a4\u9500', redo: '\u91cd\u505a', format: '\u683c\u5f0f\u5316 JSON',
  changes: '\u4fee\u6539\u5bf9\u6bd4', export: '\u4e0b\u8f7d JSON', readonly: '\u53ea\u8bfb',
  modified: '\u5df2\u4fee\u6539', saved: '\u5df2\u4fdd\u5b58\u5e76\u6821\u9a8c', clean: '\u672a\u4fee\u6539',
  valid: 'JSON \u5bf9\u8c61\u6709\u6548', invalid: 'JSON \u5bf9\u8c61\u65e0\u6548',
  noChanges: '\u6682\u65e0\u4fee\u6539', path: '\u8def\u5f84', before: '\u4fee\u6539\u524d', after: '\u4fee\u6539\u540e',
  add: '\u65b0\u589e', remove: '\u5220\u9664', replace: '\u4fee\u6539', truncated: '\u4fee\u6539\u5217\u8868\u5df2\u622a\u65ad',
  discardTitle: '\u653e\u5f03\u4fee\u6539\uff1f', discard: '\u5c1a\u672a\u4fdd\u5b58\u7684\u6a21\u578b\u4fee\u6539\u5c06\u88ab\u653e\u5f03\u3002',
  loadFailed: '\u6a21\u578b\u52a0\u8f7d\u5931\u8d25\u3002',
  closeFailed: '\u7f16\u8f91\u5668\u5173\u95ed\u5931\u8d25\u3002',
  saveFailed: '\u6a21\u578b\u4fdd\u5b58\u5931\u8d25\u3002',
  conflict: '\u670d\u52a1\u7aef\u6a21\u578b\u5df2\u53d8\u66f4\uff0c\u8bf7\u91cd\u65b0\u52a0\u8f7d\u5e76\u5bf9\u6bd4\u540e\u518d\u4fdd\u5b58\u3002',
  unverified: '\u5bfc\u5165\u5df2\u5b8c\u6210\uff0c\u4f46\u8bfb\u56de\u6821\u9a8c\u672a\u901a\u8fc7\u3002\u8bf7\u91cd\u65b0\u52a0\u8f7d\u786e\u8ba4\u670d\u52a1\u7aef\u6a21\u578b\u3002',
  invalidObject: '\u6a21\u578b\u5fc5\u987b\u662f\u6709\u6548\u7684 JSON \u5bf9\u8c61\u3002',
};
export type ModelEditMessage = keyof typeof english;
export function modelEditText(language: string, key: ModelEditMessage): string {
  return (/^en(?:[-_]|$)/i.test(language) ? english : chinese)[key];
}
