/**
 * Reconstructed candidate contracts, observed from runtime-model 0.2.2's entry
 * and loader. These are not recovered upstream source declarations.
 */
export interface RuntimeItemData {
  methodName?: string;
  logicName?: string;
  val?: string;
  apiMethod?: string;
  apiDescription?: string;
  apiReturn?: string;
}

export interface RuntimeItem {
  id: string;
  leaf: boolean;
  data: RuntimeItemData;
  iconcls?: string;
  srfkey?: string;
  srfmajortext?: string;
  text?: string;
  isPopoverShow?: boolean;
  isApi?: boolean;
  asyncmode?: boolean;
  checked?: boolean;
  disable?: boolean;
  disableselect?: boolean;
  enablecheck?: boolean;
  expanded?: boolean;
}

export type RuntimeSelection = Partial<RuntimeItem>;

// The observed service accepts arbitrary model/context fields and JSON shapes.
export type RuntimeParameters = Record<string, any>;
export type RuntimeApiConfiguration = Record<
  string,
  {
    description?: string;
    return?: string;
  }
>;

export interface LoadingPanelElement extends HTMLElement {
  show(message?: string): Promise<void>;
  hide(): Promise<void>;
}

export interface LoadingMaskElement extends HTMLElement {
  show(): Promise<void>;
  hide(): Promise<void>;
}

export interface RuntimeResponseError {
  status?: number;
  data?: { message?: string };
  message?: string;
}
