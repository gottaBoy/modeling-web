export function formatPath(path: string): string {
  // 合成路径，需要判断模型路径是否从 PSSYSAPPS 开始
  if (path?.indexOf('PSSYSAPPS/') === 0) {
    // 合成路径
    const pos = path.indexOf('/');
    return path.substring(path.indexOf('/', pos + 1));
  }
  return path;
}
