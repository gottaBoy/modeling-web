import type { ComputedRef, Ref } from 'vue';
/**
 * Handle overlapping async evaluations.
 *
 * @param cancelCallback The provided callback is invoked when a re-evaluation of the computed value is triggered before the previous one finished
 */
export type AsyncComputedOnCancel = (cancelCallback: () => void) => void;
export interface AsyncComputedOptions<Lazy = boolean> {
    /**
     * Should value be evaluated lazily
     *
     * @default false
     */
    lazy?: Lazy;
    /**
     * Ref passed to receive the updated of async evaluation
     */
    evaluating?: Ref<boolean>;
    /**
     * Use shallowRef
     *
     * @default true
     */
    shallow?: boolean;
    /**
     * The flush option allows for greater control over the timing of a history point, default to `pre`
     *
     * Possible values: `pre`, `post`, `sync`
     *
     * It works in the same way as the flush option in watch and watch effect in vue reactivity
     * @default 'pre'
     */
    flush?: 'pre' | 'post' | 'sync';
    /**
     * Callback when error is caught.
     */
    onError?: (e: unknown) => void;
}
/**
 * Create an asynchronous computed dependency.
 *
 * @see https://vueuse.org/computedAsync
 * @param evaluationCallback     The promise-returning callback which generates the computed value
 * @param initialState           The initial state, used until the first evaluation finishes
 * @param optionsOrRef           Additional options or a ref passed to receive the updates of the async evaluation
 */
export declare function computedAsync<T>(evaluationCallback: (onCancel: AsyncComputedOnCancel) => T | Promise<T>, initialState: T, optionsOrRef: AsyncComputedOptions<true>): ComputedRef<T>;
export declare function computedAsync<T>(evaluationCallback: (onCancel: AsyncComputedOnCancel) => T | Promise<T>, initialState: undefined, optionsOrRef: AsyncComputedOptions<true>): ComputedRef<T | undefined>;
export declare function computedAsync<T>(evaluationCallback: (onCancel: AsyncComputedOnCancel) => T | Promise<T>, initialState: T, optionsOrRef?: Ref<boolean> | AsyncComputedOptions): Ref<T>;
export declare function computedAsync<T>(evaluationCallback: (onCancel: AsyncComputedOnCancel) => T | Promise<T>, initialState?: undefined, optionsOrRef?: Ref<boolean> | AsyncComputedOptions): Ref<T | undefined>;
//# sourceMappingURL=computed-async.d.ts.map