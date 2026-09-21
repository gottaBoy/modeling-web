import type { PluginContent, ValidationIssue } from '../types';
import { toolsT } from './messages';
import {
  assertValid, checked, cloneJson, nextId, nonempty, recordAt, recordsAt,
  resolvePointer, uniqueIds, validateWith,
} from './safe';

export const taskStatuses = [
  { value: 'todo', get label() { return toolsT('待处理'); } },
  { value: 'doing', get label() { return toolsT('进行中'); } },
  { value: 'blocked', get label() { return toolsT('受阻'); } },
  { value: 'done', get label() { return toolsT('已完成'); } },
];

export function validateCollaboration(content: PluginContent): ValidationIssue[] {
  return validateWith(content, (value, issues) => {
    recordAt(value.model, '/model');
    const tasks = recordsAt(value.tasks, '/tasks');
    uniqueIds(tasks, '/tasks');
    tasks.forEach((task, index) => {
      const path = `/tasks/${index}`;
      if (!nonempty(task.title)) issues.push({ path: `${path}/title`, message: '任务标题不能为空' });
      if (typeof task.assignee !== 'string') issues.push({ path: `${path}/assignee`, message: '负责人必须是文本' });
      if (!taskStatuses.some(status => status.value === task.status)) issues.push({ path: `${path}/status`, message: '未知任务状态' });
      const comments = recordsAt(task.comments, `${path}/comments`);
      uniqueIds(comments, `${path}/comments`);
      comments.forEach((comment, commentIndex) => {
        if (!nonempty(comment.author) || !nonempty(comment.body)) {
          issues.push({ path: `${path}/comments/${commentIndex}`, message: '评论作者和内容不能为空' });
        }
      });
      if (!Array.isArray(task.modelRefs) || task.modelRefs.some(ref => typeof ref !== 'string')) {
        issues.push({ path: `${path}/modelRefs`, message: '模型引用必须是 JSON Pointer 数组' });
      } else {
        if (new Set(task.modelRefs).size !== task.modelRefs.length) {
          issues.push({ path: `${path}/modelRefs`, message: '模型引用重复' });
        }
        task.modelRefs.forEach((ref, refIndex) => {
          try {
            if (!resolvePointer(value.model, ref).found) throw new Error('missing');
          } catch {
            issues.push({ path: `${path}/modelRefs/${refIndex}`, message: '模型引用不存在或不安全' });
          }
        });
      }
    });
  });
}

export function createCollaboration(): PluginContent {
  return { model: { getPSDataEntities: [] }, tasks: [] };
}

export function filterTasks(content: PluginContent, query = '', status = ''): PluginContent[] {
  const value = checked(content, validateCollaboration);
  assertValid(typeof query !== 'string' || typeof status !== 'string' ||
    (status !== '' && !taskStatuses.some(item => item.value === status))
    ? [{ path: '/filter', message: '任务筛选条件无效' }] : []);
  const needle = query.trim().toLocaleLowerCase();
  return recordsAt(value.tasks, '/tasks').filter(task => {
    const comments = recordsAt(task.comments, '/comments').flatMap(item => [item.author, item.body]);
    const text = [task.id, task.title, task.assignee, ...comments].join(' ').toLocaleLowerCase();
    return (!status || task.status === status) && text.includes(needle);
  });
}

export function addTask(content: PluginContent, input: PluginContent = {}): PluginContent {
  const value = checked(content, validateCollaboration);
  const tasks = recordsAt(value.tasks, '/tasks');
  const id = nextId(tasks, 'task');
  tasks.push({ id, title: `模型协作任务 ${tasks.length + 1}`, assignee: '', status: 'todo', comments: [], modelRefs: [], ...cloneJson(input) });
  return checked(value, validateCollaboration);
}

export function updateTask(content: PluginContent, id: string, patch: PluginContent): PluginContent {
  const value = checked(content, validateCollaboration);
  const tasks = recordsAt(value.tasks, '/tasks');
  const index = tasks.findIndex(task => task.id === id);
  const safePatch = cloneJson(patch);
  assertValid(index < 0 ? [{ path: '/tasks', message: '任务不存在' }] : []);
  assertValid(safePatch.id !== undefined && safePatch.id !== id ? [{ path: '/tasks/id', message: '任务标识不可修改' }] : []);
  tasks[index] = { ...tasks[index], ...safePatch };
  return checked(value, validateCollaboration);
}

export function deleteTask(content: PluginContent, id: string): PluginContent {
  const value = checked(content, validateCollaboration);
  const tasks = recordsAt(value.tasks, '/tasks');
  assertValid(!tasks.some(task => task.id === id) ? [{ path: '/tasks', message: '任务不存在' }] : []);
  value.tasks = tasks.filter(task => task.id !== id);
  return value;
}

export function addTaskComment(content: PluginContent, id: string, author: string, body: string): PluginContent {
  const value = checked(content, validateCollaboration);
  const task = recordsAt(value.tasks, '/tasks').find(item => item.id === id);
  assertValid(!task ? [{ path: '/tasks', message: '任务不存在' }] : []);
  const comments = recordsAt(task!.comments, '/comments');
  return updateTask(value, id, { comments: [...comments, { id: nextId(comments, 'comment'), author, body }] });
}
