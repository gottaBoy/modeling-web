import { Component, Method, State } from '@stencil/core';
import type { VNode } from '@stencil/core';
import { h } from '../../core/render';

/** Reconstructed loading mask; source class was emitted as LoadingPanel$1. */
@Component({
  tag: 'loading-mask',
  styleUrl: 'loading-mask.css',
  shadow: false,
})
export class LoadingMask {
  @State() visible = false;

  @Method()
  async show(): Promise<void> {
    this.visible = true;
  }

  @Method()
  async hide(): Promise<void> {
    this.visible = false;
  }

  render(): VNode {
    return h('div', {
      class: 'loading-mask',
      style: { display: this.visible ? 'flex' : null },
    });
  }
}
