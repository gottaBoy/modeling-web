/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import Logger from 'loglevel';
import prefix from 'loglevel-plugin-prefix';

// 重写 methodFactory
const originalFactory = Logger.methodFactory;
const NOOP = (message: string) => {};
Logger.methodFactory = (methodName, logLevel, loggerName) => {
  const rawMethod = originalFactory(methodName, logLevel, loggerName);
  if (window.Environment?.environmentTag === 'production') {
    if (
      methodName === 'error' ||
      methodName === 'warn' ||
      methodName === 'debug'
    ) {
      return NOOP;
    }
  }
  if (window.Environment?.environmentTag === 'test') {
    if (methodName === 'error' || methodName === 'warn') {
      return NOOP;
    }
  }
  return rawMethod;
};

const logger = Logger.noConflict();

prefix.reg(logger);

prefix.apply(logger);

export { logger };
