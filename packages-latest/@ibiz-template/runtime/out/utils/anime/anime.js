import anime from 'animejs';
/**
 * 默认参数
 *
 * @author zk
 * @date 2024-01-22 01:01:17
 * @protected
 */
const defaultOptions = {
    // 动画时间
    duration: 1000,
    // 循环执行
    loop: false,
    // 运行速度曲线
    easing: 'easeInOutSine',
};
/**
 * 处理动画开始事件
 *
 * @author zk
 * @date 2024-01-24 03:01:34
 * @export
 * @param {anime.AnimeParams} AnimeParams
 * @param {anime.AnimeParams} extraOptions
 * @return {*}  {anime.AnimeParams}
 */
function handleBefore(AnimeParams, extraOptions) {
    const params = {};
    // 处理动画开始事件
    if (extraOptions.complete && AnimeParams.complete) {
        const optionComplete = extraOptions.complete;
        const animeComplete = AnimeParams.complete;
        params.complete = (ins) => {
            optionComplete(ins);
            animeComplete(ins);
        };
    }
    return Object.assign(Object.assign(Object.assign({}, AnimeParams), extraOptions), params);
}
/**
 * 元素移动动画
 *
 * @author zk
 * @date 2024-01-24 03:01:17
 * @export
 * @param {HTMLElement} moveElement
 * @param {HTMLElement} toElement
 * @param {anime.AnimeParams} [extraOpts={}]
 * @return {*}  {Promise<boolean>}
 */
export function moveToTarget(moveElement, targetElement, extraOpts = {}) {
    const { left: toLeft, top: toTop } = moveElement.getBoundingClientRect();
    const { left: clientX, top: clientY } = targetElement.getBoundingClientRect();
    const x = clientX - toLeft;
    const y = clientY - toTop;
    return new Promise(resolve => {
        const opts = Object.assign(Object.assign({ targets: moveElement, translateX: x, translateY: y }, defaultOptions), { 
            // 完成回调
            complete: () => {
                resolve(true);
            } });
        const options = handleBefore(opts, extraOpts);
        anime(options);
    });
}
/**
 * 目标调整大小
 *
 * @author zk
 * @date 2024-01-24 03:01:09
 * @export
 * @param {HTMLElement} targets
 * @param {anime.AnimeParams} [extraOpts={}]
 * @return {*}  {Promise<boolean>}
 */
export function resize(targets, extraOpts = {}) {
    return new Promise(resolve => {
        const opts = Object.assign(Object.assign({ scale: [1, 0.8, 1], targets }, defaultOptions), { 
            // 完成回调
            complete: () => {
                resolve(true);
            } });
        const options = handleBefore(opts, extraOpts);
        anime(options);
    });
}
