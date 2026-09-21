/**
 * 获取去除根目录后的相对路径
 *
 * @param webkitRelativePath - WebKit浏览器中的文件相对路径，通常包含完整的目录结构
 * @returns 去除第一级目录后的相对路径字符串，如果输入为空则返回空字符串
 */
export const getRelativePathWithoutRoot = (
  webkitRelativePath: string,
): string => {
  if (!webkitRelativePath) {
    return '';
  }

  const pathParts = webkitRelativePath.split('/');

  if (pathParts.length > 1) {
    pathParts.shift();
    return pathParts.join('/');
  }
  return webkitRelativePath;
};
