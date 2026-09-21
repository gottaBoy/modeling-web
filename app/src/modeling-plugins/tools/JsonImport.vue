<script setup lang="ts">
import { computed, ref, shallowRef, watch } from 'vue';
import type { PluginContent, ValidationIssue } from '../types';
import { assertValid, parseModelJson, toolErrorText } from './safe';
import { toolIssue, toolsT } from './messages';

const props = defineProps<{ label: string; value: PluginContent; validate?: (value: PluginContent) => ValidationIssue[] }>();
const emit = defineEmits<{ (event: 'import', model: PluginContent): void }>();
const open = ref(false);
const text = ref('');
const error = shallowRef<unknown>();
const errorMessage = computed(() => error.value ? toolErrorText(error.value, '导入失败') : '');
const reading = ref(false);
let readVersion = 0;
watch(open, visible => {
  readVersion += 1;
  reading.value = false;
  error.value = undefined;
  if (visible) {
    try { text.value = JSON.stringify(props.value, null, 2); } catch (reason) {
      text.value = '';
      error.value = reason;
    }
  }
}, { flush: 'sync' });
async function readFile(event: Event): Promise<void> {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) return;
  const version = ++readVersion;
  reading.value = true;
  try {
    assertValid(file.size > 8 * 1024 * 1024 ? [toolIssue('', '文件不能超过 8 MB')] : []);
    const value = await file.text();
    if (version !== readVersion || !open.value) return;
    text.value = value;
    error.value = undefined;
  } catch (reason) {
    if (version === readVersion && open.value) error.value = reason;
  } finally {
    if (version === readVersion) { input.value = ''; reading.value = false; }
  }
}
function submit(): void {
  if (reading.value) return;
  try {
    const value = parseModelJson(text.value);
    assertValid(props.validate?.(value) ?? []);
    emit('import', value);
    error.value = undefined;
    open.value = false;
  } catch (reason) {
    error.value = reason;
  }
}
</script>

<template>
  <div class="json-import">
    <button type="button" :aria-expanded="open" @click="open = !open">
      <i class="fa fa-upload" aria-hidden="true"></i> {{ label }}
    </button>
    <div v-if="open" class="json-import-input">
      <label>{{ toolsT('JSON 文件') }}<input type="file" accept=".json,application/json" @change="readFile" /></label>
      <label>{{ label }}<textarea v-model="text" :aria-label="label" :disabled="reading" spellcheck="false" rows="10"></textarea></label>
      <p v-if="reading" role="status">{{ toolsT('正在读取文件') }}</p>
      <p v-if="errorMessage" role="alert">{{ errorMessage }}</p>
      <button type="button" :disabled="reading" @click="submit"><i class="fa fa-check" aria-hidden="true"></i> {{ toolsT('确认导入') }}</button>
      <button type="button" @click="open = false">{{ toolsT('取消') }}</button>
    </div>
  </div>
</template>
