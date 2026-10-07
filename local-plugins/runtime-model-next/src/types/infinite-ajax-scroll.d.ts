/**
 * Minimal typed surface actually used here, checked against IAS 3.0.0's
 * constructor/defaults/spinner modules. The package ships no declarations.
 */
declare module '@webcreate/infinite-ajax-scroll' {
  export interface InfiniteAjaxScrollOptions {
    scrollContainer: HTMLElement;
    item: string;
    next: () => boolean;
    spinner?: HTMLElement;
  }

  export default class InfiniteAjaxScroll {
    constructor(container: HTMLElement, options: InfiniteAjaxScrollOptions);
  }
}
