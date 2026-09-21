import type { EChartsOption } from 'echarts';
import { locale } from '../i18n';
import type { DataType, LayoutContent, LayoutItem } from './schema';
import { seriesColors } from './schema';
import { layoutT } from './messages';
import { validDate } from './validation';

export function rawValue(value: unknown): string {
  if (value === null || value === undefined) return '';
  if (typeof value === 'object') return JSON.stringify(value);
  return String(value);
}

export function displayValue(value: unknown, type?: DataType): string {
  if (typeof value === 'boolean') return layoutT(value ? '是' : '否');
  if (typeof value === 'number') return formatNumber(value);
  if (type === 'date' && validDate(value)) {
    return new Intl.DateTimeFormat(locale.value, {
      year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'UTC',
    }).format(new Date(`${value}T00:00:00Z`));
  }
  return rawValue(value);
}

export function displayField(content: LayoutContent, field: unknown, value: unknown): string {
  return displayValue(value, content.data.columns.find(column => column.key === field)?.type);
}

export function bounded(value: unknown, min: number, max: number, fallback: number): number {
  return typeof value === 'number' && Number.isFinite(value) ? Math.min(max, Math.max(min, value)) : fallback;
}

export function aggregateValue(rows: Record<string, unknown>[], field: string, mode: unknown): number {
  const values = rows.map(row => row[field]).filter((value): value is number => typeof value === 'number' && Number.isFinite(value));
  if (mode === 'count') return values.length;
  if (!values.length) return 0;
  if (mode === 'min') return values.reduce((a, b) => Math.min(a, b));
  if (mode === 'max') return values.reduce((a, b) => Math.max(a, b));
  const sum = values.reduce((a, b) => a + b, 0);
  return mode === 'avg' ? sum / values.length : sum;
}

export interface ReportResult {
  groups: LayoutItem[];
  measures: LayoutItem[];
  rows: { key: string; groups: unknown[]; values: number[] }[];
  totals: number[];
}

export function buildReport(content: LayoutContent): ReportResult {
  const groups = content.items.filter(item => item.type === 'group');
  const measures = content.items.filter(item => item.type === 'measure');
  const buckets = new Map<string, { groups: unknown[]; rows: Record<string, unknown>[] }>();
  content.data.rows.forEach(row => {
    const values = groups.map(group => row[String(group.field)] ?? null);
    const key = JSON.stringify(values);
    if (!buckets.has(key)) buckets.set(key, { groups: values, rows: [] });
    buckets.get(key)!.rows.push(row);
  });
  const rows = [...buckets.entries()].map(([key, bucket]) => ({
    key, groups: bucket.groups,
    values: measures.map(measure => aggregateValue(bucket.rows, String(measure.field), measure.aggregate)),
  }));
  rows.sort((a, b) => {
    for (let index = 0; index < groups.length; index += 1) {
      const left = a.groups[index];
      const right = b.groups[index];
      const compare = typeof left === 'number' && typeof right === 'number'
        ? left - right : rawValue(left).localeCompare(rawValue(right), locale.value, { numeric: true });
      if (compare) return groups[index].sort === 'desc' ? -compare : compare;
    }
    return 0;
  });
  return { groups, measures, rows, totals: measures.map(measure => aggregateValue(content.data.rows, String(measure.field), measure.aggregate)) };
}

interface ChartSeries {
  id: string;
  name: string;
  color: string;
  values: number[];
}

function chartOption(categories: string[], series: ChartSeries[], settings: Record<string, unknown>): EChartsOption {
  const pie = settings.chartType === 'pie';
  const horizontal = settings.orientation === 'horizontal' && !pie;
  const precision = typeof settings.precision === 'number' ? bounded(settings.precision, 0, 6, 2) : undefined;
  const base: EChartsOption = {
    animation: false,
    aria: {
      enabled: true,
      label: { description: layoutT('图表：{series}；分类：{categories}', {
        series: series.map(entry => layoutT('{name}：{values}', {
          name: entry.name, values: entry.values.map(value => formatNumber(value, precision)).join(', '),
        })).join('; '),
        categories: categories.join(', '),
      }) },
    },
    color: series.map(item => item.color),
    textStyle: { fontFamily: 'Arial, "Microsoft YaHei", sans-serif', fontSize: 12, color: '#39444f' },
    tooltip: {
      trigger: pie ? 'item' : 'axis', confine: true, renderMode: 'richText',
      valueFormatter: value => formatNumber(value, precision),
    },
    legend: { show: settings.legend !== false, type: 'scroll', bottom: 0, left: 'center', textStyle: { color: '#39444f' } },
  };
  if (pie) {
    const count = Math.max(series.length, 1);
    const ring = Math.min(22, 62 / count);
    return {
      ...base,
      legend: { ...base.legend as object, data: categories },
      series: series.map((entry, index) => ({
        id: entry.id, name: entry.name, type: 'pie',
        radius: [`${14 + index * ring}%`, `${14 + (index + 1) * ring - 2}%`],
        center: ['50%', '44%'],
        label: { show: count === 1, formatter: '{b}', overflow: 'truncate', width: 80 },
        labelLine: { show: count === 1 },
        itemStyle: { borderColor: '#ffffff', borderWidth: 2 },
        data: categories.map((name, position) => ({ name, value: entry.values[position], itemStyle: { color: seriesColors[position % seriesColors.length] } })),
      })),
    };
  }
  const categoryAxis = {
    type: 'category' as const, data: categories,
    axisLabel: { interval: 0, width: 72, overflow: 'truncate' as const, hideOverlap: true },
    axisLine: { lineStyle: { color: '#cdd5dd' } }, axisTick: { show: false },
  };
  const valueAxis = {
    type: 'value' as const, splitLine: { lineStyle: { color: '#edf0f3' } },
    axisLabel: { formatter: (value: number) => formatNumber(value, precision) },
  };
  return {
    ...base,
    grid: { left: 16, right: 20, top: 26, bottom: settings.legend === false ? 12 : 46, containLabel: true },
    xAxis: horizontal ? valueAxis : categoryAxis,
    yAxis: horizontal ? categoryAxis : valueAxis,
    series: series.map(entry => ({
      id: entry.id, name: entry.name,
      type: settings.chartType === 'line' ? 'line' : 'bar',
      data: entry.values,
      ...(settings.stacked ? { stack: 'total' } : {}),
      itemStyle: { color: entry.color },
      barMaxWidth: 40,
      symbolSize: 7,
    })),
  };
}

export function buildChartOption(content: LayoutContent): EChartsOption {
  const field = String(content.settings.xField);
  const groups = new Map<string, { label: string; rows: Record<string, unknown>[] }>();
  content.data.rows.forEach(row => {
    const value = row[field] ?? null;
    // Group by typed source values, never translated/formatted display labels.
    const key = JSON.stringify(value);
    if (!groups.has(key)) groups.set(key, {
      label: value === null ? layoutT('空值') : value === '' ? layoutT('空文本') : displayField(content, field, value),
      rows: [],
    });
    groups.get(key)!.rows.push(row);
  });
  return chartOption([...groups.values()].map(group => group.label), content.items.filter(item => item.visible !== false).map((item, index) => ({
    id: item.id, name: item.label,
    color: typeof item.color === 'string' ? item.color : seriesColors[index % seriesColors.length],
    values: [...groups.values()].map(group => aggregateValue(group.rows, String(item.yField), item.aggregate)),
  })), content.settings);
}

export function buildReportOption(content: LayoutContent): EChartsOption {
  const report = buildReport(content);
  return chartOption(
    report.rows.map(row => row.groups.map((value, index) => value === null ? layoutT('空值')
      : value === '' ? layoutT('空文本') : displayField(content, report.groups[index].field, value)).join(' / ') || layoutT('全部')),
    report.measures.map((measure, index) => ({
      id: measure.id, name: measure.label, color: String(measure.color || seriesColors[index % seriesColors.length]),
      values: report.rows.map(row => row.values[index]),
    })),
    content.settings,
  );
}

export function buildPortletOption(content: LayoutContent, item: LayoutItem): EChartsOption {
  return buildChartOption({
    ...content,
    settings: { chartType: item.chartType, xField: item.xField, legend: false },
    items: [{ ...item, yField: item.yField, visible: true }],
  });
}

export function hierarchyRows(items: LayoutItem[]): { item: LayoutItem; depth: number }[] {
  const result: { item: LayoutItem; depth: number }[] = [];
  const seen = new Set<string>();
  const children = new Map<string, LayoutItem[]>();
  const ids = new Set(items.map(item => item.id));
  items.forEach(item => {
    const parent = ids.has(String(item.parentId)) ? String(item.parentId) : '';
    if (!children.has(parent)) children.set(parent, []);
    children.get(parent)!.push(item);
  });
  const visit = (item: LayoutItem, depth: number) => {
    if (seen.has(item.id)) return;
    seen.add(item.id);
    result.push({ item, depth });
    children.get(item.id)?.forEach(child => visit(child, depth + 1));
  };
  children.get('')?.forEach(item => visit(item, 0));
  items.forEach(item => { if (!seen.has(item.id)) visit(item, 0); });
  return result;
}

export function formatNumber(value: unknown, precision?: number): string {
  const digits = precision === undefined ? undefined : Math.trunc(bounded(precision, 0, 20, 0));
  return typeof value === 'number' && Number.isFinite(value)
    ? value.toLocaleString(locale.value, { minimumFractionDigits: digits ?? 0, maximumFractionDigits: digits ?? 20 })
    : rawValue(value);
}

export function csvData(content: LayoutContent): string {
  const cell = (value: unknown) => {
    let text = rawValue(value);
    // CSV opened in a spreadsheet must not execute a formula from local sample data.
    if (/^[=+\-@\t\r]/.test(text)) text = `'${text}`;
    return `"${text.replace(/"/g, '""')}"`;
  };
  return [
    content.data.columns.map(column => cell(column.label)).join(','),
    ...content.data.rows.map(row => content.data.columns.map(column => cell(row[column.key])).join(',')),
  ].join('\r\n');
}
