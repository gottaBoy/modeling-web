import { VNode } from 'vue';

/**
 * 拖拽图标
 */
export const dragIcon = (): VNode => (
  <svg
    viewBox='0 0 16 16'
    xmlns='http://www.w3.org/2000/svg'
    height='1em'
    width='1em'
    preserveAspectRatio='xMidYMid meet'
    focusable='false'
  >
    <g stroke-width='1' fill-rule='evenodd'>
      <g transform='translate(5 1)' fill-rule='nonzero'>
        <path d='M1 2a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm4 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2zM1 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm4 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm-4 4a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm4 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm-4 4a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm4 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2z'></path>
      </g>
    </g>
  </svg>
);

/**
 * 删除图标
 */
export const removeIcon = (): VNode => (
  <svg
    viewBox='0 0 16 16'
    xmlns='http://www.w3.org/2000/svg'
    height='1em'
    width='1em'
    preserveAspectRatio='xMidYMid meet'
    focusable='false'
  >
    <g stroke-width='1' fill-rule='evenodd'>
      <path d='M4.002 3.403V1a1 1 0 0 1 1-1h6.003a1 1 0 0 1 1 1v2.403h3.396a.6.6 0 1 1 0 1.2h-1.395V15a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4.603H.6a.6.6 0 1 1 0-1.2h3.4zm8.804 1.205H3.2V14.8h9.605V4.608zM5.202 1.2v2.155h5.603V1.2H5.202zm.6 6.417a.6.6 0 0 1 1.201 0v4.758a.6.6 0 0 1-1.2 0V7.617zm3.202 0a.6.6 0 0 1 1.2 0v4.758a.6.6 0 0 1-1.2 0V7.617z'></path>
    </g>
  </svg>
);

/**
 * 添加图标
 */
export const addIcon = (): VNode => (
  <svg
    viewBox='0 0 16 16'
    xmlns='http://www.w3.org/2000/svg'
    height='1em'
    width='1em'
    preserveAspectRatio='xMidYMid meet'
    focusable='false'
  >
    <g stroke-width='1' fill-rule='evenodd'>
      <path d='M8.578 7.383V1.602a.601.601 0 1 0-1.2 0v5.781H1.6a.601.601 0 0 0 0 1.203h5.777v5.812a.601.601 0 1 0 1.2 0V8.586H14.4a.601.601 0 0 0 0-1.203H8.578z'></path>
    </g>
  </svg>
);

/**
 * 左箭头图标
 */
export const leftArrowIcon = (): VNode => (
  <svg
    viewBox='0 0 16 16'
    xmlns='http://www.w3.org/2000/svg'
    height='1em'
    width='1em'
    preserveAspectRatio='xMidYMid meet'
    focusable='false'
  >
    <g stroke-width='1' fill-rule='evenodd'>
      <path
        d='M7.028 10.976l5.951-5.952a.6.6 0 0 1 1.024.425V11.4a.6.6 0 0 1-.6.6H7.452a.6.6 0 0 1-.424-1.024z'
        transform='scale(-1 1) rotate(-45 0 32.15)'
      ></path>
    </g>
  </svg>
);

/**
 * 右箭头图标
 */
export const rightArrowIcon = (): VNode => (
  <svg
    viewBox='0 0 16 16'
    xmlns='http://www.w3.org/2000/svg'
    height='1em'
    width='1em'
    preserveAspectRatio='xMidYMid meet'
    focusable='false'
  >
    <g stroke-width='1' fill-rule='evenodd'>
      <path
        d='M3.028 10.976l5.951-5.952a.6.6 0 0 1 1.024.425V11.4a.6.6 0 0 1-.6.6H3.452a.6.6 0 0 1-.424-1.024z'
        transform='rotate(-45 6.003 8)'
      ></path>
    </g>
  </svg>
);
