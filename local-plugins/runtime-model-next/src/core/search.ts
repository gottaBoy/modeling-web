/** Only "*" is a wildcard; all other user-entered characters are literal. */
export function runtimeSearchExpression(value: string): RegExp {
  const expression = value
    .split('*')
    .map(part => part.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .join('(.*)');
  return new RegExp(expression.toUpperCase());
}
