export declare class JsonContext {
    contextStack: any[];
    constructor();
    get current(): any;
    get context(): any[];
    get empty(): boolean;
    set(value: any): void;
    reset(): void;
    remove(value: any): void;
}
export declare const ContextValues: {
    OBJECT_KEY: string;
    OBJECT_VALUE: string;
    ARRAY: string;
};
//# sourceMappingURL=JsonContext.d.ts.map