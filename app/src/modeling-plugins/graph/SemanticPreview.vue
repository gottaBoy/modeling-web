<script setup lang="ts">
import { computed } from 'vue';
import type { PluginContent } from '../types';
import { isGraphPluginId, isRecord, palettes, records } from './model';
import type { CompileResult } from './semantics';
import { graphT as t } from './messages';

const props = defineProps<{ pluginId: string; result: CompileResult<unknown> }>();
const data = computed<PluginContent>(() => props.result.ok && isRecord(props.result.value) ? props.result.value : {});
const steps = computed(() => records(data.value.steps));
const raw = computed(() => JSON.stringify(props.result.ok ? props.result.value : { issues: props.result.issues }, null, 2));
const json = (value: unknown) => JSON.stringify(value, null, 2);
function operation(kind: unknown): string {
  return isGraphPluginId(props.pluginId)
    ? palettes[props.pluginId].find(entry => entry.kind === kind)?.label ?? String(kind)
    : String(kind);
}
</script>

<template>
  <div class="graph-semantic">
    <ul v-if="!result.ok" class="semantic-errors" role="alert" data-testid="semantic-errors">
      <li v-for="(issue, index) in result.issues" :key="index"><code>{{ issue.path }}</code> {{ issue.message }}</li>
    </ul>
    <template v-else>
      <template v-if="pluginId === 'dataquerydesign'">
        <pre data-testid="sql-preview">{{ data.sql }}</pre>
        <div class="semantic-parameters"><strong>{{ t('绑定参数') }}</strong><code data-testid="query-parameters">{{ JSON.stringify(data.parameters) }}</code></div>
      </template>
      <pre v-else-if="pluginId === 'erdesign'" data-testid="ddl-preview">{{ data.ddl }}</pre>
      <template v-else-if="pluginId === 'valueruledesign'">
        <p class="semantic-result" :class="{ failed: !data.passed }" role="status" data-testid="rule-result">
          <i :class="data.passed ? 'fa fa-check-circle' : 'fa fa-times-circle'" aria-hidden="true" />
          {{ t(data.passed ? '通过' : '未通过') }}
        </p>
        <div class="semantic-table">
          <table :aria-label="t('规则求值结果')">
            <thead><tr><th>{{ t('节点名称') }}</th><th>{{ t('结果') }}</th><th>{{ t('未通过提示') }}</th></tr></thead>
            <tbody><tr v-for="row in records(data.results)" :key="String(row.id)">
              <td>{{ row.label }}</td><td :class="{ failed: !row.passed }">{{ t(row.passed ? '通过' : '未通过') }}</td><td>{{ row.message }}</td>
            </tr></tbody>
          </table>
        </div>
      </template>
      <template v-else>
        <div class="semantic-table">
          <table :aria-label="t('执行明细')">
            <thead><tr><th>{{ t('步骤') }}</th><th>{{ t('操作') }}</th><th>{{ t(pluginId === 'dataflowdesign' ? '行数' : '后续节点') }}</th><th>{{ t('配置') }}</th></tr></thead>
            <tbody><tr v-for="step in steps" :key="String(step.id)">
              <td>{{ step.label ?? step.id }}</td><td>{{ operation(step.operation ?? step.kind) }}</td>
              <td v-if="pluginId === 'dataflowdesign'">{{ step.rowCount }}</td>
              <td v-else><div v-for="(next, index) in records(step.next)" :key="index">
                <span v-if="typeof next.when === 'boolean'">{{ t(next.when ? '成立' : '不成立') }}: </span>{{ next.target }}
              </div></td>
              <td><code>{{ JSON.stringify(step.configuration) }}</code></td>
            </tr></tbody>
          </table>
        </div>
        <section v-for="output in records(data.outputs)" :key="String(output.nodeId)" class="semantic-output">
          <h4>{{ t('数据集') }}: {{ output.dataset }}</h4>
          <p>{{ t('写入方式') }}: {{ t(output.writeMode === 'append' ? '追加' : '覆盖') }} / {{ t('行数') }}: {{ records(output.rows).length }}</p>
          <pre>{{ json(output.rows) }}</pre>
        </section>
      </template>
    </template>
    <details>
      <summary>{{ t('原始语义输出') }}</summary>
      <pre data-testid="semantic-preview">{{ raw }}</pre>
    </details>
  </div>
</template>

<style scoped>
.graph-semantic { min-width: 0; }
.graph-semantic pre { white-space: pre-wrap; overflow-wrap: anywhere; max-height: 320px; overflow-y: auto; padding: 12px; margin: 0 0 10px; color: #344752; background: #f5f7f8; border-left: 3px solid #a8bdc9; font: 12px/1.6 ui-monospace, monospace; }
.semantic-parameters { display: flex; flex-wrap: wrap; align-items: baseline; gap: 12px; margin: 10px 0; overflow-wrap: anywhere; }
.semantic-parameters code { min-width: 0; }
.semantic-result { display: flex; align-items: center; gap: 6px; margin: 0 0 10px; color: #247358; font-weight: 600; }
.failed, .semantic-errors { color: #b1283d; }
.semantic-errors { padding-left: 18px; overflow-wrap: anywhere; max-height: 180px; overflow-y: auto; }
.semantic-table { max-height: 320px; overflow: auto; margin-bottom: 12px; }
.semantic-table table { width: 100%; border-collapse: collapse; table-layout: fixed; }
.semantic-table th, .semantic-table td { padding: 7px 9px; text-align: left; vertical-align: top; border-bottom: 1px solid #dce2e6; overflow-wrap: anywhere; font-size: 12px; }
.semantic-table th { background: #f5f7f8; }
.semantic-output { margin: 12px 0; overflow-wrap: anywhere; }
.semantic-output h4 { font-size: 13px; margin: 0; }
.semantic-output p { margin: 4px 0 8px; }
summary { margin: 8px 0; cursor: pointer; overflow-wrap: anywhere; }
</style>
