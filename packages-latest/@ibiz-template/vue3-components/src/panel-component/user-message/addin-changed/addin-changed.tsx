import { useNamespace } from '@ibiz-template/vue3-util';
import { defineComponent, PropType } from 'vue';
import './addin-changed.scss';
import { showTitle } from '@ibiz-template/core';

export const AddinChanged = defineComponent({
  name: 'IBizAddinChanged',
  props: {
    msg: {
      type: Object as PropType<IData>,
      required: true,
    },
  },
  emits: {
    close: () => true,
  },
  setup() {
    const ns = useNamespace('addin-changed');

    const onClick = () => {
      window.location.reload();
    };

    return { ns, onClick };
  },
  render() {
    return (
      <div
        class={[this.ns.b()]}
        onClick={this.onClick}
        title={showTitle(ibiz.i18n.t('panelComponent.addinChanged.tip'))}
      >
        <div class={this.ns.b('left')}>
          <ion-icon name='list-outline'></ion-icon>
        </div>
        <div class={this.ns.b('center')}>
          <div class={this.ns.e('caption')}>
            {ibiz.i18n.t('panelComponent.addinChanged.title')}
          </div>
          <div class={this.ns.e('content')}>
            {ibiz.i18n.t('panelComponent.addinChanged.content')}
          </div>
        </div>
      </div>
    );
  },
});
