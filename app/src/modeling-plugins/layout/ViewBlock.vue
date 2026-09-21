<script setup lang="ts">
import { computed } from 'vue';
import type { LayoutContent, LayoutItem } from './schema';
import { bounded, displayValue, rawValue } from './preview';
import { layoutT } from './messages';

const props = withDefaults(defineProps<{
  item: LayoutItem;
  content: LayoutContent;
  selectedId: string;
  ancestors?: string[];
}>(), { ancestors: () => [] });
const emit = defineEmits<{ select: [id: string] }>();
const path = computed(() => [...props.ancestors, props.item.id]);
const children = computed(() => props.content.items.filter(item => item.parentId === props.item.id && !path.value.includes(item.id)));
const column = computed(() => props.content.data.columns.find(entry => entry.key === props.item.field));
</script>

<template>
  <section class="layout-view-block" :class="{ 'is-selected': selectedId === item.id, 'is-container': item.type === 'container' }"
    :style="{ gridColumn: `span ${bounded(item.span, 1, 12, 12)}` }" :data-preview-item="item.id" @click.stop="emit('select', item.id)">
    <template v-if="item.type === 'container'">
      <h3>{{ item.label }}</h3>
      <div class="layout-view-grid" :class="{ 'is-stack': item.direction === 'stack' }" :style="{ gap: `${bounded(content.settings.gap, 0, 48, 16)}px` }">
        <ViewBlock v-for="child in children" :key="child.id" :item="child" :content="content" :selected-id="selectedId" :ancestors="path" @select="emit('select', $event)" />
        <p v-if="!children.length" class="layout-empty">{{ layoutT('空容器') }}</p>
      </div>
    </template>
    <template v-else-if="item.type === 'heading'">
      <h3 v-if="item.level === 'heading'">{{ item.text }}</h3>
      <p v-else>{{ item.text }}</p>
    </template>
    <template v-else-if="item.type === 'form'">
      <h3>{{ item.label }}</h3>
      <label class="layout-preview-label"><span>{{ column?.label || layoutT('字段') }}</span>
        <input :key="`${item.field}:${rawValue(content.data.rows[0]?.[String(item.field)])}`"
          :type="column?.type === 'boolean' ? 'checkbox' : column?.type === 'number' ? 'number' : column?.type === 'date' ? 'date' : 'text'"
          :value="rawValue(content.data.rows[0]?.[String(item.field)])" :checked="content.data.rows[0]?.[String(item.field)] === true"
          :disabled="column?.type === 'boolean' && item.readonly === true" :readonly="item.readonly === true" step="any">
      </label>
    </template>
    <template v-else-if="item.type === 'grid'">
      <h3>{{ item.label }}</h3>
      <div class="layout-table-scroll" tabindex="0" :aria-label="String(item.label)">
        <table class="layout-preview-table">
          <thead><tr><th v-for="field in content.data.columns.slice(0, 3)" :key="field.key">{{ field.label }}</th></tr></thead>
          <tbody><tr v-for="(row, index) in content.data.rows.slice(0, bounded(item.limit, 1, 20, 4))" :key="index"><td v-for="field in content.data.columns.slice(0, 3)" :key="field.key">{{ displayValue(row[field.key], field.type) }}</td></tr></tbody>
        </table>
      </div>
      <p v-if="!content.data.columns.length" class="layout-empty">{{ layoutT('暂无字段') }}</p>
      <p v-else-if="!content.data.rows.length" class="layout-empty">{{ layoutT('暂无记录') }}</p>
    </template>
  </section>
</template>
