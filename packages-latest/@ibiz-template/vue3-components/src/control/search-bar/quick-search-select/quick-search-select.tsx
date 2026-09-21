import { IQuickSearchItem, SearchBarController } from '@ibiz-template/runtime';
import { useNamespace } from '@ibiz-template/vue3-util';
import { defineComponent } from 'vue';
import './quick-search-select.scss';

export const QuickSearchSelect = defineComponent({
  name: 'IBizQuickSearchSelect',
  props: {
    controller: { type: SearchBarController, required: true },
  },
  setup(props) {
    const ns = useNamespace('quick-search-select');

    const onItemClick = (item: IQuickSearchItem) => {
      const key = item.fieldName;
      const { quickSearchFieldNames } = props.controller.state;
      const index = quickSearchFieldNames.indexOf(key);
      if (index === -1) {
        quickSearchFieldNames.push(key);
      } else {
        if (quickSearchFieldNames.length <= 1) return;
        quickSearchFieldNames.splice(index, 1);
      }
      props.controller.calcQuickSearchPlaceHolder();
    };
    return { ns, onItemClick };
  },
  render() {
    const { state } = this.controller;
    return (
      <el-dropdown
        onCommand={this.onItemClick}
        trigger='click'
        hide-on-click={false}
        class={[this.ns.b()]}
        popper-class={[this.ns.b('popover')]}
      >
        {{
          default: () => (
            <div
              title={ibiz.i18n.t(
                'control.searchBar.quickSearchSelect.searchField',
              )}
              class={this.ns.e('icon')}
            >
              <ion-icon name='settings-outline' />
            </div>
          ),
          dropdown: () => (
            <el-dropdown-menu>
              {state.quickSearchItems.map(item => {
                const isSelected = state.quickSearchFieldNames.includes(
                  item.fieldName,
                );
                return (
                  <el-dropdown-item
                    class={[
                      this.ns.be('popover', 'item'),
                      isSelected && this.ns.bem('popover', 'item', 'selected'),
                    ]}
                    command={item}
                  >
                    {item.label}
                  </el-dropdown-item>
                );
              })}
            </el-dropdown-menu>
          ),
        }}
      </el-dropdown>
    );
  },
});
