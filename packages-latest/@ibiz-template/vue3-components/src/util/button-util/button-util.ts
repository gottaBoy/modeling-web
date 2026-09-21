/**
 * 将按钮的模型样式类型转换为小写，适配ui框架按钮类型。
 *
 * @param {string | undefined} buttonStyle - 模型按钮样式类型
 * @returns {string}
 */
export function convertBtnType(buttonStyle?: string): string {
  let buttonType = 'default';
  if (
    buttonStyle &&
    ['PRIMARY', 'SUCCESS', 'WARNING', 'DANGER', 'INFO'].includes(buttonStyle)
  )
    buttonType = buttonStyle.toLowerCase();
  if (buttonStyle && ['INVERSE'].includes(buttonStyle)) buttonType = 'text';
  return buttonType;
}
