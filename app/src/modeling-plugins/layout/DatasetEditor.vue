<script setup lang="ts">
import { ref } from 'vue';
import type { DataType, LayoutContent } from './schema';
import { addDataColumn, addDataRow, dataColumnReferences, moveDataRow, removeDataColumn, removeDataRow, renameDataColumn, updateDataCell } from './operations';
import { rawValue } from './preview';
import { layoutT } from './messages';

const props = defineProps<{ content: LayoutContent }>();
const emit = defineEmits<{ change: [content: LayoutContent] }>();
const columnType = ref<DataType>('text');

function cell(index: number, key: string, type: DataType, event: Event) {
  const input = event.target as HTMLInputElement;
  const value = type === 'number' ? (input.value === '' ? null : Number(input.value))
    : type === 'boolean' ? input.checked : type === 'date' && input.value === '' ? null : input.value;
  emit('change', updateDataCell(props.content, index, key, value));
}
</script>

<template>
  <section class="layout-dataset" :aria-label="layoutT('本地样例数据')">
    <div class="layout-data-tools">
      <strong>{{ layoutT('样例数据') }} <span class="layout-muted">{{ layoutT('{count} 行', { count: content.data.rows.length }) }}</span></strong>
      <div class="layout-inline-tools">
        <select v-model="columnType" :aria-label="layoutT('新字段类型')">
          <option value="text">{{ layoutT('文本') }}</option><option value="number">{{ layoutT('数值') }}</option><option value="date">{{ layoutT('日期') }}</option><option value="boolean">{{ layoutT('布尔值') }}</option>
        </select>
        <button type="button" class="layout-command" data-testid="add-data-column" @click="emit('change', addDataColumn(content, columnType))"><i class="fa fa-columns" aria-hidden="true" />{{ layoutT('添加字段') }}</button>
        <button type="button" class="layout-command" data-testid="add-data-row" :disabled="!content.data.columns.length" @click="emit('change', addDataRow(content))"><i class="fa fa-plus" aria-hidden="true" />{{ layoutT('添加记录') }}</button>
      </div>
    </div>
    <div class="layout-table-scroll" tabindex="0" :aria-label="layoutT('数据编辑表')">
      <table class="layout-data-table">
        <thead><tr>
          <th class="layout-row-tools">{{ layoutT('序号') }}</th>
          <th v-for="column in content.data.columns" :key="column.key">
            <div class="layout-column-header">
              <input :value="column.label" :aria-label="layoutT('字段名称 {key}', { key: column.key })" @change="emit('change', renameDataColumn(content, column.key, ($event.target as HTMLInputElement).value))">
              <button type="button" class="layout-icon-button" :disabled="dataColumnReferences(content, column.key).length > 0"
                :title="layoutT(dataColumnReferences(content, column.key).length ? '字段已被组件引用' : '删除字段')" :aria-label="layoutT('删除字段 {label}', { label: column.label })"
                @click="emit('change', removeDataColumn(content, column.key))"><i class="fa fa-trash" aria-hidden="true" /></button>
            </div>
            <code>{{ column.key }}</code>
          </th>
        </tr></thead>
        <tbody><tr v-for="(row, index) in content.data.rows" :key="index">
          <td><div class="layout-inline-tools layout-row-tools">
            <span>{{ index + 1 }}</span>
            <button type="button" class="layout-icon-button" :title="layoutT('上移记录')" :aria-label="layoutT('上移记录')" :disabled="index === 0" @click="emit('change', moveDataRow(content, index, -1))"><i class="fa fa-arrow-up" aria-hidden="true" /></button>
            <button type="button" class="layout-icon-button" :title="layoutT('下移记录')" :aria-label="layoutT('下移记录')" :disabled="index === content.data.rows.length - 1" @click="emit('change', moveDataRow(content, index, 1))"><i class="fa fa-arrow-down" aria-hidden="true" /></button>
            <button type="button" class="layout-icon-button" :title="layoutT('删除记录')" :aria-label="layoutT('删除记录')" @click="emit('change', removeDataRow(content, index))"><i class="fa fa-trash" aria-hidden="true" /></button>
          </div></td>
          <td v-for="column in content.data.columns" :key="column.key">
            <input :type="column.type === 'boolean' ? 'checkbox' : column.type === 'number' ? 'number' : column.type === 'date' ? 'date' : 'text'"
              :value="rawValue(row[column.key])" :checked="row[column.key] === true" step="any"
              :aria-label="layoutT('{label} 第 {index} 行', { label: column.label, index: index + 1 })" @change="cell(index, column.key, column.type, $event)">
          </td>
        </tr></tbody>
      </table>
      <p v-if="!content.data.columns.length" class="layout-empty">{{ layoutT('暂无字段') }}</p>
      <p v-else-if="!content.data.rows.length" class="layout-empty">{{ layoutT('暂无记录') }}</p>
    </div>
  </section>
</template>
