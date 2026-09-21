/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import Logger from 'loglevel';
import prefix from 'loglevel-plugin-prefix';
// 重写 methodFactory
const originalFactory = Logger.methodFactory;
const NOOP = (message) => { };
Logger.methodFactory = (methodName, logLevel, loggerName) => {
    var _a, _b;
    const rawMethod = originalFactory(methodName, logLevel, loggerName);
    if (((_a = window.Environment) === null || _a === void 0 ? void 0 : _a.environmentTag) === 'production') {
        if (methodName === 'error' ||
            methodName === 'warn' ||
            methodName === 'debug') {
            return NOOP;
        }
    }
    if (((_b = window.Environment) === null || _b === void 0 ? void 0 : _b.environmentTag) === 'test') {
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
