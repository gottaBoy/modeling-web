/**
 * Reconstructed from runtime-model 0.2.2; original business-class attribution:
 * chitanda, 2021-11-28. Missing-ref errors and negative counts are preserved.
 */
import type { LoadingMaskElement, LoadingPanelElement } from './types';

export class LoadingController {
  loadingCount = 0;
  isLoading = false;
  _ref?: LoadingPanelElement | null;
  _maskref?: LoadingMaskElement | null;

  get ref(): LoadingPanelElement {
    if (!this._ref) {
      this._ref = document.getElementById(
        'loadingPanel',
      ) as LoadingPanelElement | null;
    }
    return this._ref!;
  }

  get maskref(): LoadingMaskElement {
    if (!this._maskref) {
      this._maskref = document.getElementById(
        'rootLoadingMask',
      ) as LoadingMaskElement | null;
    }
    return this._maskref!;
  }

  show(message = 'Loading...'): void {
    if (this.loadingCount === 0) {
      this.isLoading = true;
      this.ref.show(message);
      this.maskref.show();
    }
    this.loadingCount++;
  }

  hide(): void {
    setTimeout(() => {
      this.loadingCount--;
      if (this.loadingCount <= 0) {
        this.ref.hide();
        this.maskref.hide();
        this.isLoading = false;
      }
    }, 0);
  }
}

export const loading = new LoadingController();
