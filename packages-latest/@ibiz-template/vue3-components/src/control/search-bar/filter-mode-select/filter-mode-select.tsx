import { ValueOP } from '@ibiz-template/runtime';
import { defineComponent, computed } from 'vue';

export const FilterModeSelect = defineComponent({
  name: 'IBizFilterModeSelect',
  props: {
    value: String,
    modes: Array<string>,
    disabled: Boolean,
  },
  emits: {
    change: (_mode: string) => true,
  },
  setup(props, { emit }) {
    // 过滤条件
    const FilterModes = [
      {
        valueOP: ValueOP.EQ,
        label: ibiz.i18n.t('control.searchBar.conditions.eq'),
      },
      {
        valueOP: ValueOP.NOT_EQ,
        label: ibiz.i18n.t('control.searchBar.conditions.not_eq'),
      },
      {
        valueOP: ValueOP.GT,
        label: ibiz.i18n.t('control.searchBar.conditions.gt'),
      },
      {
        valueOP: ValueOP.GT_AND_EQ,
        label: ibiz.i18n.t('control.searchBar.conditions.gt_and_eq'),
      },
      {
        valueOP: ValueOP.LT,
        label: ibiz.i18n.t('control.searchBar.conditions.lt'),
      },
      {
        valueOP: ValueOP.LT_AND_EQ,
        label: ibiz.i18n.t('control.searchBar.conditions.lt_and_eq'),
      },
      {
        valueOP: ValueOP.IS_NULL,
        label: ibiz.i18n.t('control.searchBar.conditions.is_null'),
      },
      {
        valueOP: ValueOP.IS_NOT_NULL,
        label: ibiz.i18n.t('control.searchBar.conditions.is_not_null'),
      },
      {
        valueOP: ValueOP.IN,
        label: ibiz.i18n.t('control.searchBar.conditions.in'),
      },
      {
        valueOP: ValueOP.NOT_IN,
        label: ibiz.i18n.t('control.searchBar.conditions.not_in'),
      },
      {
        valueOP: ValueOP.LIKE,
        label: ibiz.i18n.t('control.searchBar.conditions.like'),
      },
      {
        valueOP: ValueOP.LEFT_LIKE,
        label: ibiz.i18n.t('control.searchBar.conditions.left_like'),
      },
      {
        valueOP: ValueOP.RIGHT_LIKE,
        label: ibiz.i18n.t('control.searchBar.conditions.right_like'),
      },
      {
        valueOP: ValueOP.EXISTS,
        label: ibiz.i18n.t('control.searchBar.conditions.exists'),
      },
      {
        valueOP: ValueOP.NOT_EXISTS,
        label: ibiz.i18n.t('control.searchBar.conditions.not_exists'),
      },
    ] as const;

    /** 显示可选的过滤类型 */
    const availableModes = computed(() => {
      if (props.modes?.length) {
        return FilterModes.filter(item => props.modes!.includes(item.valueOP));
      }
      return FilterModes;
    });

    /**
     * 选择变更处理
     * @author lxm
     * @date 2023-10-16 04:54:58
     * @param {string} value
     */
    const onChange = (value: string) => {
      emit('change', value);
    };

    return { availableModes, onChange };
  },
  render() {
    return (
      <el-select
        model-value={this.value}
        disabled={this.disabled}
        teleported={false}
        onChange={(value: string) => {
          this.onChange(value);
        }}
      >
        {this.availableModes.map(mode => {
          return (
            <el-option
              key={mode.valueOP}
              value={mode.valueOP}
              label={mode.label}
            />
          );
        })}
      </el-select>
    );
  },
});
