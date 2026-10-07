import { Component, Host, Method, Prop, State } from '@stencil/core';
import type { VNode } from '@stencil/core';
import { h } from '../../core/render';

/** Reconstructed loading panel from the observed runtime-model 0.2.2 output. */
@Component({
  tag: 'loading-panel',
  styleUrl: 'loading-panel.css',
  shadow: false,
})
export class LoadingPanel {
  @Prop({ attribute: 'default-show' }) defaultShow = false;
  @State() visible = false;
  @State() message: string | undefined = 'Loading...';

  componentDidLoad(): void {
    this.visible = this.defaultShow;
  }

  @Method()
  async show(message?: string): Promise<void> {
    this.message = message;
    this.visible = true;
  }

  @Method()
  async hide(): Promise<void> {
    this.message = 'Loading...';
    this.visible = false;
  }

  render(): VNode {
    return h(
      Host,
      {
        class: 'loading-panel',
        style: { display: this.visible ? 'flex' : null },
      },
      h(
        'div',
        { class: 'sk-chase' },
        h('div', { class: 'sk-chase-dot' }),
        h('div', { class: 'sk-chase-dot' }),
        h('div', { class: 'sk-chase-dot' }),
        h('div', { class: 'sk-chase-dot' }),
        h('div', { class: 'sk-chase-dot' }),
        h('div', { class: 'sk-chase-dot' }),
      ),
    );
  }
}
