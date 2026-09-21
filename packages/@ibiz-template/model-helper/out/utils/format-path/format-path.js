export function formatPath(path) {
    // 合成路径，需要判断模型路径是否从 PSSYSAPPS 开始
    if ((path === null || path === void 0 ? void 0 : path.indexOf('PSSYSAPPS/')) === 0) {
        // 合成路径
        const pos = path.indexOf('/');
        return path.substring(path.indexOf('/', pos + 1));
    }
    return path;
}
