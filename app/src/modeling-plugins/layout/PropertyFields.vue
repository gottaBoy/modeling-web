<script setup lang="ts">
import type { LayoutContent, LayoutItem, PropertySchema } from './schema';
import { propertyOptions } from './operations';
import { layoutT } from './messages';

const props = defineProps<{
  fields: PropertySchema[];
  values: Record<string, unknown>;
  content: LayoutContent;
  selected?: LayoutItem;
}>();
const emit = defineEmits<{ change: [patch: Record<string, unknown>] }>();
const stringValue = (value: unknown) => typeof value === 'string' || typeof value === 'number' ? String(value) : '';
const optionsValue = (value: unknown): string[] => Array.isArray(value) ? value.map(String) : [];

function input(property: PropertySchema, event: Event) {
  const target = event.target as HTMLInputElement;
  const value = property.control === 'number' ? (target.value === '' ? null : Number(target.value))
    : property.control === 'boolean' ? target.checked : target.value;
  emit('change', { [property.key]: value });
}

function updateOption(property: PropertySchema, index: number, value?: string) {
  const options = [...optionsValue(props.values[property.key])];
  if (value === undefined) options.splice(index, 1);
  else options[index] = value;
  const patch: Record<string, unknown> = { [property.key]: options };
  if (property.key === 'options' && props.selected?.type === 'select'
    && props.values.defaultValue !== '' && !options.includes(String(props.values.defaultValue))) {
    patch.defaultValue = options[0] || '';
  }
  emit('change', patch);
}

function addOption(property: PropertySchema) {
  const options = optionsValue(props.values[property.key]);
  let index = options.length + 1;
  while (options.includes(layoutT('选项 {index}', { index }))) index += 1;
  emit('change', { [property.key]: [...options, layoutT('选项 {index}', { index })] });
}
</script>

<template>
  <div class="layout-properties">
    <div v-for="field in fields" :key="field.key" class="layout-property" :class="{ 'is-toggle': field.control === 'boolean' }">
      <template v-if="field.control === 'boolean'">
        <label>
          <input type="checkbox" :data-testid="`property-${field.key}`" :checked="values[field.key] === true" @change="input(field, $event)">
          <span>{{ field.label }}</span>
        </label>
      </template>
      <template v-else-if="field.control === 'options'">
        <div class="layout-property-label">
          <span>{{ field.label }}</span>
          <button type="button" class="layout-icon-button" :title="layoutT('添加选项')" :aria-label="layoutT('添加选项')" @click="addOption(field)"><i class="fa fa-plus" aria-hidden="true" /></button>
        </div>
        <div v-for="(entry, index) in optionsValue(values[field.key])" :key="index" class="layout-option">
          <input type="text" :aria-label="layoutT('选项 {index}', { index: index + 1 })" :value="entry" @change="updateOption(field, index, ($event.target as HTMLInputElement).value)">
          <button type="button" class="layout-icon-button" :title="layoutT('删除选项')" :aria-label="layoutT('删除选项')" :disabled="optionsValue(values[field.key]).length <= 1" @click="updateOption(field, index)"><i class="fa fa-times" aria-hidden="true" /></button>
        </div>
      </template>
      <label v-else>
        <span>{{ field.label }}</span>
        <select v-if="field.control === 'select'" :value="values[field.key]" :data-testid="`property-${field.key}`" @change="input(field, $event)">
          <option v-if="!propertyOptions(field, content, selected).some(option => option.value === values[field.key])" :value="stringValue(values[field.key])" disabled>{{ layoutT('无效选项') }}</option>
          <option v-for="entry in propertyOptions(field, content, selected)" :key="entry.value" :value="entry.value">{{ entry.label }}</option>
        </select>
        <input v-else :type="field.control === 'color' ? 'color' : field.control === 'number' ? 'number' : 'text'"
          :value="stringValue(values[field.key])" :data-testid="`property-${field.key}`"
          :min="field.min" :max="field.max" :step="field.integer ? 1 : 'any'" :required="field.required"
          @change="input(field, $event)">
      </label>
    </div>
  </div>
</template>
