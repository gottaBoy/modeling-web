export const MAX_DOCUMENT_BYTES = 2 * 1024 * 1024;

export function jsonSafetyProblem(value: unknown, depth = 0): { code: string; message: string } | undefined {
  if (depth > 80) return { code: 'too_deep', message: '模型嵌套层级超限' };
  if (typeof value === 'number' && !Number.isFinite(value)) {
    return { code: 'invalid_number', message: '模型不能包含无限或无效数值' };
  }
  if (value && typeof value === 'object') {
    for (const [key, child] of Object.entries(value)) {
      if (['__proto__', 'prototype', 'constructor'].includes(key)) {
        return { code: 'unsafe_key', message: '模型包含不安全的属性名' };
      }
      if (/^(password|authorization|cookie|api[_-]?key|access[_-]?token|secret)$/i.test(key)) {
        return { code: 'secret_field', message: '模型文件不能存储凭证' };
      }
      const problem = jsonSafetyProblem(child, depth + 1);
      if (problem) return problem;
    }
  }
  return undefined;
}
