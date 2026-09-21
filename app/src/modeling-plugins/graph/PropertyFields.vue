<script setup lang="ts">
import { reactive, watch } from 'vue';
import type { PluginContent } from '../types';
import { isRecord, type PropertyField } from './model';
import { graphT as t } from './messages';

const props = defineProps<{ modelValue: PluginContent; fields: PropertyField[] }>();
const emit = defineEmits<{ (event: 'update:modelValue', value: PluginContent): void }>();
const drafts = reactive<Record<string, string>>({});
const errors = reactive<Record<string, string>>({});

watch(() => props.modelValue, () => {
  Object.keys(drafts).forEach(key => {
    if (!errors[key]) delete drafts[key];
  });
});

function change(key: string, value: unknown) {
  const next = { ...props.modelValue, [key]: value };
  if (key === 'valueType' && value !== props.modelValue.valueType) next.value = value === 'number' ? 0 : value === 'boolean' ? true : '';
  emit('update:modelValue', next);
}
function inputValue(event: Event): string {
  return (event.target as HTMLInputElement).value;
}
function numberValue(event: Event): string | number {
  const value = inputValue(event);
  return value.trim() && Number.isFinite(Number(value)) ? Number(value) : '';
}
function list(key: string): unknown[] {
  return Array.isArray(props.modelValue[key]) ? props.modelValue[key] as unknown[] : [];
}
function changeList(key: string, index: number, value: string) {
  change(key, list(key).map((entry, i) => i === index ? value : entry));
}
function addList(key: string) {
  const values = list(key);
  let index = 1;
  while (values.includes(`field_${index}`)) index += 1;
  change(key, [...values, `field_${index}`]);
}
function recordText(key: string): string {
  return drafts[key] ?? JSON.stringify(props.modelValue[key] ?? [], null, 2);
}
function changeRecords(key: string, event: Event) {
  const text = inputValue(event);
  drafts[key] = text;
  try {
    const parsed: unknown = JSON.parse(text);
    if (!Array.isArray(parsed) || !parsed.every(isRecord) || parsed.length > 1000) {
      errors[key] = '样例数据必须为对象数组，最多1000行';
      return;
    }
    delete errors[key];
    delete drafts[key];
    change(key, parsed);
  } catch {
    errors[key] = '样例数据不是有效的JSON';
  }
}
</script>

<template>
  <div class="graph-fields">
    <template v-for="field in fields" :key="field.key">
      <div v-if="!field.when || field.when(modelValue)" class="graph-field">
        <label v-if="field.control === 'boolean'" class="graph-check">
          <input type="checkbox" :aria-label="field.label" :data-testid="`property-${field.key}`"
            :checked="modelValue[field.key] === true" @change="change(field.key, ($event.target as HTMLInputElement).checked)">
          <span>{{ field.label }}</span>
        </label>
        <template v-else-if="field.control === 'list'">
          <div class="graph-field-heading">
            <span>{{ field.label }}</span>
            <button type="button" :aria-label="t('新增{label}', { label: field.label })" :title="t('新增{label}', { label: field.label })"
              :data-testid="`add-property-${field.key}`" @click="addList(field.key)"><i class="fa fa-plus" aria-hidden="true" /></button>
          </div>
          <div v-for="(entry, index) in list(field.key)" :key="index" class="graph-list-field">
            <input :value="entry" :aria-label="t('{label}{index}', { label: field.label, index: index + 1 })" :data-testid="`property-${field.key}-${index}`"
              @change="changeList(field.key, index, inputValue($event))">
            <button type="button" :aria-label="t('删除{label}{index}', { label: field.label, index: index + 1 })" :title="t('删除{label}{index}', { label: field.label, index: index + 1 })"
              @click="change(field.key, list(field.key).filter((_, i) => i !== index))"><i class="fa fa-trash-o" aria-hidden="true" /></button>
          </div>
        </template>
        <label v-else>
          <span>{{ field.label }}</span>
          <select v-if="field.control === 'select'" :value="modelValue[field.key]" :aria-label="field.label"
            :data-testid="`property-${field.key}`" @change="change(field.key, inputValue($event))">
            <option v-for="option in field.options" :key="option.value" :value="option.value">{{ option.label }}</option>
          </select>
          <textarea v-else-if="field.control === 'records'" :value="recordText(field.key)" rows="8" spellcheck="false"
            :aria-label="field.label" :aria-invalid="!!errors[field.key]" :data-testid="`property-${field.key}`"
            @input="drafts[field.key] = inputValue($event)" @change="changeRecords(field.key, $event)" />
          <select v-else-if="field.control === 'value' && modelValue.valueType === 'boolean'" :value="String(modelValue[field.key])"
            :aria-label="field.label" :data-testid="`property-${field.key}`" @change="change(field.key, inputValue($event) === 'true')">
            <option value="true">{{ t('是') }}</option><option value="false">{{ t('否') }}</option>
          </select>
          <input v-else :type="field.control === 'number' || (field.control === 'value' && modelValue.valueType === 'number') ? 'number' : 'text'"
            :value="modelValue[field.key]" step="any" :aria-label="field.label" :data-testid="`property-${field.key}`"
            @change="change(field.key, field.control === 'number' || (field.control === 'value' && modelValue.valueType === 'number') ? numberValue($event) : inputValue($event))">
        </label>
        <p v-if="errors[field.key]" class="graph-field-error" role="alert">{{ t(errors[field.key]) }}</p>
      </div>
    </template>
  </div>
</template>

<style scoped>
.graph-fields { display: grid; gap: 12px; min-width: 0; }
.graph-field, .graph-field label { display: grid; gap: 5px; min-width: 0; }
.graph-field .graph-check { display: flex; gap: 8px; align-items: center; }
.graph-field-heading, .graph-list-field { display: flex; gap: 6px; align-items: center; justify-content: space-between; }
.graph-field input, .graph-field select, .graph-field textarea { box-sizing: border-box; min-width: 0; max-width: 100%; width: 100%; border: 1px solid #cbd2d8; border-radius: 4px; padding: 7px 8px; color: #24313b; background: #fff; font: inherit; }
.graph-field input[type="checkbox"] { width: 16px; height: 16px; margin: 0; }
.graph-field textarea { resize: vertical; font: 12px/1.6 monospace; }
.graph-field-heading > span, .graph-field label > span { overflow-wrap: anywhere; }
.graph-field button { flex: 0 0 30px; width: 30px; height: 30px; border: 1px solid #d5dbdf; border-radius: 4px; color: #425563; background: #fff; cursor: pointer; }
.graph-field button:hover { background: #edf4f8; }
.graph-field-error { color: #b1283d; margin: 0; font-size: 12px; overflow-wrap: anywhere; }
:focus-visible { outline: 2px solid #307fa8; outline-offset: 2px; }
</style>
