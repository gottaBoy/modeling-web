import { IBizView } from '@ibiz-template/vue3-util';
import { defineComponent, h, inject } from 'vue';

export function bodyView(name: string, body: unknown): unknown {
  return defineComponent({
    name,
    inheritAttrs: false,
    props: {
      context: Object, params: Object, modelData: { type: Object, required: true },
      modal: Object, state: Object, provider: Object,
    },
    setup(props: any, { attrs }: any) {
      return () => h(IBizView, { ...attrs, ...props }, { default: () => h(body as any) });
    },
  });
}

export function injectedView(): any {
  const ctx = inject<any>('ctx');
  if (!ctx?.view) throw new Error('Independent custom view requires the real host CTX.view.');
  return ctx.view;
}

export function iconButton(icon: string, label: string, action: () => void, extra: any = {}): any {
  return h('button', { type: 'button', title: label, 'aria-label': label, onClick: action, ...extra },
    [h('i', { class: `fa fa-${icon}`, 'aria-hidden': 'true' })]);
}
