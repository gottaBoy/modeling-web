type AppBIDrillDetailMeasureItem = {
    name: string;
};
type AppBIDrillDetailDimensionItem = {
    value: unknown;
} & AppBIDrillDetailMeasureItem;
export interface IAppBIDrillDetailData {
    measure: AppBIDrillDetailMeasureItem;
    dimension?: AppBIDrillDetailDimensionItem[];
}
export {};
