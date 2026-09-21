<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import * as echarts from 'echarts';
import type { ECharts, EChartsOption } from 'echarts';

const props = withDefaults(defineProps<{ option: EChartsOption; label: string; height?: number }>(), { height: 340 });
const host = ref<HTMLDivElement>();
let chart: ECharts | undefined;
let observer: ResizeObserver | undefined;
let mounted = false;

function render() {
  if (!mounted || !host.value || host.value.clientWidth === 0 || host.value.clientHeight === 0) return;
  if (!chart) chart = echarts.init(host.value, undefined, { renderer: 'canvas' });
  chart.resize();
  chart.setOption(props.option, { notMerge: true });
}

onMounted(() => {
  mounted = true;
  if (typeof ResizeObserver !== 'undefined') {
    observer = new ResizeObserver(render);
    if (host.value) observer.observe(host.value);
  }
  window.addEventListener('resize', render);
  render();
});
watch(() => [props.option, props.height], () => nextTick(render), { deep: true, flush: 'post' });
onBeforeUnmount(() => {
  mounted = false;
  observer?.disconnect();
  window.removeEventListener('resize', render);
  chart?.dispose();
  chart = undefined;
});
</script>

<template>
  <div ref="host" class="layout-chart" data-testid="chart-preview" role="img" :aria-label="label" :style="{ height: `${height}px` }" />
</template>

<style scoped>
.layout-chart { width: 100%; min-width: 0; overflow: hidden; }
</style>
