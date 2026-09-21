export function mergeAppDEUIActionGroup(dst, src) {
    if (!dst || !src) {
        return;
    }
    // 合并界面行为组项
    if (src.uiactionGroupDetails) {
        if (!dst.uiactionGroupDetails) {
            dst.uiactionGroupDetails = [];
        }
        src.uiactionGroupDetails.forEach((item) => {
            dst.uiactionGroupDetails.push(item);
        });
    }
}
