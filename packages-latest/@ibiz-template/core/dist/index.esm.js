// ../../node_modules/.pnpm/@microsoft+fetch-event-source@2.0.1/node_modules/@microsoft/fetch-event-source/lib/esm/parse.js
async function getBytes(stream, onChunk) {
  const reader = stream.getReader();
  let result;
  while (!(result = await reader.read()).done) {
    onChunk(result.value);
  }
}
function getLines(onLine) {
  let buffer;
  let position;
  let fieldLength;
  let discardTrailingNewline = false;
  return function onChunk(arr) {
    if (buffer === void 0) {
      buffer = arr;
      position = 0;
      fieldLength = -1;
    } else {
      buffer = concat(buffer, arr);
    }
    const bufLength = buffer.length;
    let lineStart = 0;
    while (position < bufLength) {
      if (discardTrailingNewline) {
        if (buffer[position] === 10) {
          lineStart = ++position;
        }
        discardTrailingNewline = false;
      }
      let lineEnd = -1;
      for (; position < bufLength && lineEnd === -1; ++position) {
        switch (buffer[position]) {
          case 58:
            if (fieldLength === -1) {
              fieldLength = position - lineStart;
            }
            break;
          case 13:
            discardTrailingNewline = true;
          case 10:
            lineEnd = position;
            break;
        }
      }
      if (lineEnd === -1) {
        break;
      }
      onLine(buffer.subarray(lineStart, lineEnd), fieldLength);
      lineStart = position;
      fieldLength = -1;
    }
    if (lineStart === bufLength) {
      buffer = void 0;
    } else if (lineStart !== 0) {
      buffer = buffer.subarray(lineStart);
      position -= lineStart;
    }
  };
}
function getMessages(onId, onRetry, onMessage) {
  let message = newMessage();
  const decoder = new TextDecoder();
  return function onLine(line, fieldLength) {
    if (line.length === 0) {
      onMessage === null || onMessage === void 0 ? void 0 : onMessage(message);
      message = newMessage();
    } else if (fieldLength > 0) {
      const field = decoder.decode(line.subarray(0, fieldLength));
      const valueOffset = fieldLength + (line[fieldLength + 1] === 32 ? 2 : 1);
      const value = decoder.decode(line.subarray(valueOffset));
      switch (field) {
        case "data":
          message.data = message.data ? message.data + "\n" + value : value;
          break;
        case "event":
          message.event = value;
          break;
        case "id":
          onId(message.id = value);
          break;
        case "retry":
          const retry = parseInt(value, 10);
          if (!isNaN(retry)) {
            onRetry(message.retry = retry);
          }
          break;
      }
    }
  };
}
function concat(a, b) {
  const res = new Uint8Array(a.length + b.length);
  res.set(a);
  res.set(b, a.length);
  return res;
}
function newMessage() {
  return {
    data: "",
    event: "",
    id: "",
    retry: void 0
  };
}

// ../../node_modules/.pnpm/@microsoft+fetch-event-source@2.0.1/node_modules/@microsoft/fetch-event-source/lib/esm/fetch.js
var __rest = function(s, e) {
  var t = {};
  for (var p in s)
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};
var EventStreamContentType = "text/event-stream";
var DefaultRetryInterval = 1e3;
var LastEventId = "last-event-id";
function fetchEventSource(input, _a) {
  var { signal: inputSignal, headers: inputHeaders, onopen: inputOnOpen, onmessage, onclose, onerror, openWhenHidden, fetch: inputFetch } = _a, rest = __rest(_a, ["signal", "headers", "onopen", "onmessage", "onclose", "onerror", "openWhenHidden", "fetch"]);
  return new Promise((resolve, reject) => {
    const headers = Object.assign({}, inputHeaders);
    if (!headers.accept) {
      headers.accept = EventStreamContentType;
    }
    let curRequestController;
    function onVisibilityChange() {
      curRequestController.abort();
      if (!document.hidden) {
        create();
      }
    }
    if (!openWhenHidden) {
      document.addEventListener("visibilitychange", onVisibilityChange);
    }
    let retryInterval = DefaultRetryInterval;
    let retryTimer = 0;
    function dispose() {
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.clearTimeout(retryTimer);
      curRequestController.abort();
    }
    inputSignal === null || inputSignal === void 0 ? void 0 : inputSignal.addEventListener("abort", () => {
      dispose();
      resolve();
    });
    const fetch = inputFetch !== null && inputFetch !== void 0 ? inputFetch : window.fetch;
    const onopen = inputOnOpen !== null && inputOnOpen !== void 0 ? inputOnOpen : defaultOnOpen;
    async function create() {
      var _a2;
      curRequestController = new AbortController();
      try {
        const response = await fetch(input, Object.assign(Object.assign({}, rest), { headers, signal: curRequestController.signal }));
        await onopen(response);
        await getBytes(response.body, getLines(getMessages((id) => {
          if (id) {
            headers[LastEventId] = id;
          } else {
            delete headers[LastEventId];
          }
        }, (retry) => {
          retryInterval = retry;
        }, onmessage)));
        onclose === null || onclose === void 0 ? void 0 : onclose();
        dispose();
        resolve();
      } catch (err) {
        if (!curRequestController.signal.aborted) {
          try {
            const interval = (_a2 = onerror === null || onerror === void 0 ? void 0 : onerror(err)) !== null && _a2 !== void 0 ? _a2 : retryInterval;
            window.clearTimeout(retryTimer);
            retryTimer = window.setTimeout(create, interval);
          } catch (innerErr) {
            dispose();
            reject(innerErr);
          }
        }
      }
    }
    create();
  });
}
function defaultOnOpen(response) {
  const contentType = response.headers.get("content-type");
  if (!(contentType === null || contentType === void 0 ? void 0 : contentType.startsWith(EventStreamContentType))) {
    throw new Error("Expected content-type to be ".concat(EventStreamContentType, ", Actual: ").concat(contentType));
  }
}

// src/command/utils/linked-list.ts
var _Node = class _Node {
  constructor(element) {
    this.element = element;
    this.next = _Node.Undefined;
    this.prev = _Node.Undefined;
  }
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
_Node.Undefined = new _Node(void 0);
var Node = _Node;
var LinkedList = class {
  constructor() {
    this._first = Node.Undefined;
    this._last = Node.Undefined;
    this._size = 0;
  }
  get size() {
    return this._size;
  }
  isEmpty() {
    return this._first === Node.Undefined;
  }
  clear() {
    let node = this._first;
    while (node !== Node.Undefined) {
      const { next } = node;
      node.prev = Node.Undefined;
      node.next = Node.Undefined;
      node = next;
    }
    this._first = Node.Undefined;
    this._last = Node.Undefined;
    this._size = 0;
  }
  unshift(element) {
    return this._insert(element, false);
  }
  push(element) {
    return this._insert(element, true);
  }
  _insert(element, atTheEnd) {
    const newNode = new Node(element);
    if (this._first === Node.Undefined) {
      this._first = newNode;
      this._last = newNode;
    } else if (atTheEnd) {
      const oldLast = this._last;
      this._last = newNode;
      newNode.prev = oldLast;
      oldLast.next = newNode;
    } else {
      const oldFirst = this._first;
      this._first = newNode;
      newNode.next = oldFirst;
      oldFirst.prev = newNode;
    }
    this._size += 1;
    let didRemove = false;
    return () => {
      if (!didRemove) {
        didRemove = true;
        this._remove(newNode);
      }
    };
  }
  shift() {
    if (this._first === Node.Undefined) {
      return void 0;
    }
    const res = this._first.element;
    this._remove(this._first);
    return res;
  }
  pop() {
    if (this._last === Node.Undefined) {
      return void 0;
    }
    const res = this._last.element;
    this._remove(this._last);
    return res;
  }
  _remove(node) {
    if (node.prev !== Node.Undefined && node.next !== Node.Undefined) {
      const anchor = node.prev;
      anchor.next = node.next;
      node.next.prev = anchor;
    } else if (node.prev === Node.Undefined && node.next === Node.Undefined) {
      this._first = Node.Undefined;
      this._last = Node.Undefined;
    } else if (node.next === Node.Undefined) {
      this._last = this._last.prev;
      this._last.next = Node.Undefined;
    } else if (node.prev === Node.Undefined) {
      this._first = this._first.next;
      this._first.prev = Node.Undefined;
    }
    this._size -= 1;
  }
  *[Symbol.iterator]() {
    let node = this._first;
    while (node !== Node.Undefined) {
      yield node.element;
      node = node.next;
    }
  }
};

// src/command/utils/util.ts
function once(fn) {
  const _this = this;
  let didCall = false;
  let result;
  return function() {
    if (didCall) {
      return result;
    }
    didCall = true;
    result = fn.apply(_this, arguments);
    return result;
  };
}
function toDisposable(fn) {
  const self = {
    dispose: once(() => {
      fn();
    })
  };
  return self;
}
function debounce(func, wait, immediate) {
  let timer;
  return function(...args) {
    if (timer) {
      clearTimeout(timer);
    }
    if (immediate) {
      const callNow = !timer;
      timer = setTimeout(() => {
        timer = null;
      }, wait);
      if (callNow) {
        func.apply(this, args);
      }
    } else {
      timer = setTimeout(() => {
        func.apply(this, args);
      }, wait);
    }
  };
}
function throttle(fn, wait) {
  let timer = null;
  return function(...args) {
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(this, args);
        timer = null;
      }, wait);
    }
  };
}

// src/command/command-register.ts
var CommandsRegistry = class {
  constructor() {
    /**
     * @description 已经注册的所有指令
     * @private
     * @memberof CommandsRegistry
     */
    this.commands = /* @__PURE__ */ new Map();
  }
  /**
   * @description 注册指令
   * @param {(string | ICommand)} idOrCommand 指令id或者指令对象
   * @param {ICommandHandler} [handler] 指令处理器
   * @param {ICommandOption} [opts] 指令配置参数
   * @returns {*}  {IDisposable} 返回一个可销毁对象，用于取消注册该指令
   * @memberof CommandsRegistry
   */
  registerCommand(idOrCommand, handler, opts) {
    if (!idOrCommand) {
      throw new Error("invalid command");
    }
    if (typeof idOrCommand === "string") {
      if (!handler) {
        throw new Error("invalid command");
      }
      return this.registerCommand({ id: idOrCommand, handler, opts });
    }
    const { id } = idOrCommand;
    let commands2 = this.commands.get(id);
    if (!commands2) {
      commands2 = new LinkedList();
      this.commands.set(id, commands2);
    }
    const removeFn = commands2.unshift(idOrCommand);
    const ret = toDisposable(() => {
      removeFn();
      const command = this.commands.get(id);
      if (command == null ? void 0 : command.isEmpty()) {
        this.commands.delete(id);
      }
    });
    return ret;
  }
  /**
   * @description 指令是否已经注册
   * @param {string} id
   * @returns {*}  {boolean}
   * @memberof CommandsRegistry
   */
  hasCommand(id) {
    return this.commands.has(id);
  }
  /**
   * @description 查找指令
   * @param {string} id
   * @returns {*}  {(ICommand | undefined)}
   * @memberof CommandsRegistry
   */
  getCommand(id) {
    const list = this.commands.get(id);
    if (!list || list.isEmpty()) {
      return void 0;
    }
    return list[Symbol.iterator]().next().value;
  }
  /**
   * @description 获取所有指令
   * @returns {*}  {ICommandsMap}
   * @memberof CommandsRegistry
   */
  getCommands() {
    const result = /* @__PURE__ */ new Map();
    const keys = this.commands.keys();
    for (const key of keys) {
      const command = this.getCommand(key);
      if (command) {
        result.set(key, command);
      }
    }
    return result;
  }
  /**
   * @description 获取指令配置参数
   * @param {string} id
   * @returns {*}  {(ICommandOption | undefined)}
   * @memberof CommandsRegistry
   */
  getCommandOpt(id) {
    const cmd = this.getCommand(id);
    return cmd == null ? void 0 : cmd.opts;
  }
};

// src/command/command.ts
var CommandController = class {
  constructor() {
    /**
     * @description 指令注册器
     * @private
     * @memberof CommandController
     */
    this.commandRegister = new CommandsRegistry();
  }
  /**
   * @description 注册指令
   * @param {string} id 指令id
   * @param {ICommandHandler} handler 指令处理回调
   * @param {ICommandOption} [opts] 指令参数
   * @returns {*}  {IDisposable} 指令释放对象
   * @memberof CommandController
   */
  register(id, handler, opts) {
    return this.commandRegister.registerCommand(id, handler, opts);
  }
  /**
   * @description 执行指令
   * @template T
   * @param {string} id 指令id
   * @param {...unknown[]} args 指令参数
   * @returns {*}  {Promise<T>} 指令返回值
   * @memberof CommandController
   */
  async execute(id, ...args) {
    const command = this.commandRegister.getCommand(id);
    if (command) {
      return command.handler(...args);
    }
    throw new Error(ibiz.i18n.t("core.command.unregisteredCommand", { id }));
  }
  /**
   * @description 判断指令是否存在，没有则直接抛出异常
   * @param {string} id 指令id
   * @param {boolean} [err] 是否抛出异常
   * @returns {*}  {boolean} 是否存在
   * @memberof CommandController
   */
  hasCommand(id, err) {
    const bol = !!this.commandRegister.hasCommand(id);
    if (err === true && bol === true) {
      throw new Error("\u672A\u6CE8\u518C\u6307\u4EE4: ".concat(id, "\uFF0C\u8BF7\u5148\u6CE8\u518C\u6307\u4EE4"));
    }
    return bol;
  }
  /**
   * @description 获取指令参数
   * @param {string} id 指令id
   * @returns {*}  {(ICommandOption | undefined)} 指令参数
   * @memberof CommandController
   */
  getCommandOpts(id) {
    return this.commandRegister.getCommandOpt(id);
  }
};

// src/command/index.ts
var commands = new CommandController();

// src/constant/core/core.ts
var CoreConst = class {
};
/**
 * @description 默认模型服务标识
 * @static
 * @memberof CoreConst
 */
CoreConst.DEFAULT_MODEL_SERVICE_TAG = "default";
/**
 * @description 访问令牌标识
 * @static
 * @memberof CoreConst
 */
CoreConst.TOKEN = "ibzuaa-token";
/**
 * @description 刷新令牌标识
 * @static
 * @memberof CoreConst
 */
CoreConst.REFRESH_TOKEN = "ibzuaa-refresh-token";
/**
 * @description 访问令牌标识过期时间
 * @static
 * @memberof CoreConst
 */
CoreConst.TOKEN_EXPIRES = "ibzuaa-token-expires";
/**
 * @description 认证信息是走记住我模式的 cookie 标识
 * @static
 * @memberof CoreConst
 */
CoreConst.TOKEN_REMEMBER = "ibizuaa-token-remember";
/**
 * @description 是否是匿名用户登录的 cookie 标识
 * @static
 * @memberof CoreConst
 */
CoreConst.IS_ANONYMOUS = "ibizuaa-is-anonymous";
/**
 * @description 存储访问相关数据键的集合名称
 * @static
 */
CoreConst.ACCESS_STORE_AREA_KEYS = "ibizuaa-access-store-area-keys";

// src/constant/util/util.ts
var NOOP = () => {
};

// src/constant/emoji/emoji.ts
var EMOJILIST = [
  "\u{1F600}",
  "\u{1F603}",
  "\u{1F604}",
  "\u{1F601}",
  "\u{1F606}",
  "\u{1F605}",
  "\u{1F602}",
  "\u{1F923}",
  "\u{1F60C}",
  "\u{1F60A}",
  "\u{1F607}",
  "\u{1F642}",
  "\u{1F643}",
  "\u{1F609}",
  "\u{1F60C}",
  "\u{1F60D}",
  "\u{1F618}",
  "\u{1F617}",
  "\u{1F619}",
  "\u{1F61A}",
  "\u{1F60B}",
  "\u{1F61C}",
  "\u{1F61D}",
  "\u{1F61B}",
  "\u{1F911}",
  "\u{1F917}",
  "\u{1F913}",
  "\u{1F60E}",
  "\u{1F921}",
  "\u{1F920}",
  "\u{1F60F}",
  "\u{1F612}",
  "\u{1F61E}",
  "\u{1F614}",
  "\u{1F61F}",
  "\u{1F615}",
  "\u{1F641}",
  "\u2639\uFE0F",
  "\u{1F623}",
  "\u{1F616}",
  "\u{1F62B}",
  "\u{1F629}",
  "\u{1F624}",
  "\u{1F620}",
  "\u{1F621}",
  "\u{1F636}",
  "\u{1F610}",
  "\u{1F611}",
  "\u{1F62F}",
  "\u{1F626}",
  "\u{1F627}",
  "\u{1F62E}",
  "\u{1F632}",
  "\u{1F635}",
  "\u{1F633}",
  "\u{1F631}",
  "\u{1F628}",
  "\u{1F630}",
  "\u{1F622}",
  "\u{1F625}",
  "\u{1F924}",
  "\u{1F62D}",
  "\u{1F613}",
  "\u{1F62A}",
  "\u{1F634}",
  "\u{1F644}",
  "\u{1F914}",
  "\u{1F925}",
  "\u{1F62C}",
  "\u{1F910}",
  "\u{1F922}",
  "\u{1F927}",
  "\u{1F637}",
  "\u{1F912}",
  "\u{1F915}",
  "\u{1F608}",
  "\u{1F47F}",
  "\u{1F479}",
  "\u{1F47A}",
  "\u{1F4A9}",
  "\u{1F47B}",
  "\u{1F480}",
  "\u2620\uFE0F",
  "\u{1F47D}",
  "\u{1F47E}",
  "\u{1F916}",
  "\u{1F383}",
  "\u{1F63A}",
  "\u{1F638}",
  "\u{1F639}",
  "\u{1F63B}",
  "\u{1F63C}",
  "\u{1F63D}",
  "\u{1F640}",
  "\u{1F63F}",
  "\u{1F63E}",
  "\u{1F450}",
  "\u{1F64C}",
  "\u{1F44F}",
  "\u{1F64F}",
  "\u{1F91D}",
  "\u{1F44D}",
  "\u{1F44E}",
  "\u{1F44A}",
  "\u270A",
  "\u{1F91B}",
  "\u{1F91C}",
  "\u{1F91E}",
  "\u270C\uFE0F",
  "\u{1F918}",
  "\u{1F44C}",
  "\u{1F448}",
  "\u{1F449}",
  "\u{1F446}",
  "\u{1F447}",
  "\u261D\uFE0F",
  "\u270B",
  "\u{1F91A}",
  "\u{1F590}",
  "\u{1F596}",
  "\u{1F44B}",
  "\u{1F919}",
  "\u{1F4AA}",
  "\u{1F595}",
  "\u270D\uFE0F",
  "\u{1F933}",
  "\u{1F485}",
  "\u{1F48D}",
  "\u{1F484}",
  "\u{1F48B}",
  "\u{1F444}",
  "\u{1F445}",
  "\u{1F442}",
  "\u{1F443}",
  "\u{1F463}",
  "\u{1F441}",
  "\u{1F440}",
  "\u{1F5E3}",
  "\u{1F464}",
  "\u{1F465}",
  "\u{1F476}",
  "\u{1F466}",
  "\u{1F467}",
  "\u{1F468}",
  "\u{1F469}",
  "\u{1F471}\u200D\u2640",
  "\u{1F471}",
  "\u{1F474}",
  "\u{1F475}",
  "\u{1F472}",
  "\u{1F473}\u200D\u2640",
  "\u{1F473}",
  "\u{1F46E}\u200D\u2640",
  "\u{1F46E}",
  "\u{1F477}\u200D\u2640",
  "\u{1F477}",
  "\u{1F482}\u200D\u2640",
  "\u{1F482}",
  "\u{1F469}\u200D\u2695",
  "\u{1F468}\u200D\u2695",
  "\u{1F469}\u200D\u{1F33E}",
  "\u{1F468}\u200D\u{1F33E}",
  "\u{1F469}\u200D\u{1F373}",
  "\u{1F468}\u200D\u{1F373}",
  "\u{1F469}\u200D\u{1F393}",
  "\u{1F468}\u200D\u{1F393}",
  "\u{1F469}\u200D\u{1F3A4}",
  "\u{1F468}\u200D\u{1F3A4}",
  "\u{1F469}\u200D\u{1F3EB}",
  "\u{1F468}\u200D\u{1F3EB}",
  "\u{1F469}\u200D\u{1F3ED}",
  "\u{1F468}\u200D\u{1F3ED}",
  "\u{1F469}\u200D\u{1F4BB}",
  "\u{1F468}\u200D\u{1F4BB}",
  "\u{1F469}\u200D\u{1F4BC}",
  "\u{1F468}\u200D\u{1F4BC}",
  "\u{1F469}\u200D\u{1F527}",
  "\u{1F468}\u200D\u{1F527}",
  "\u{1F469}\u200D\u{1F52C}",
  "\u{1F468}\u200D\u{1F52C}",
  "\u{1F469}\u200D\u{1F3A8}",
  "\u{1F468}\u200D\u{1F3A8}",
  "\u{1F469}\u200D\u{1F692}",
  "\u{1F468}\u200D\u{1F692}",
  "\u{1F469}\u200D\u{1F680}",
  "\u{1F468}\u200D\u{1F680}",
  "\u{1F936}",
  "\u{1F385}",
  "\u{1F478}",
  "\u{1F934}",
  "\u{1F470}",
  "\u{1F935}",
  "\u{1F47C}",
  "\u{1F930}",
  "\u{1F647}\u200D\u2640",
  "\u{1F647}",
  "\u{1F481}",
  "\u{1F481}\u200D\u2642",
  "\u{1F645}",
  "\u{1F645}\u200D\u2642",
  "\u{1F646}",
  "\u{1F646}\u200D\u2642",
  "\u{1F64B}",
  "\u{1F64B}\u200D\u2642",
  "\u{1F926}\u200D\u2640",
  "\u{1F926}\u200D\u2642",
  "\u{1F937}\u200D\u2640",
  "\u{1F937}\u200D\u2642",
  "\u{1F64E}",
  "\u{1F64E}\u200D\u2642",
  "\u{1F64D}",
  "\u{1F64D}\u200D\u2642",
  "\u{1F487}",
  "\u{1F487}\u200D\u2642",
  "\u{1F486}",
  "\u{1F486}\u200D\u2642",
  "\u{1F574}",
  "\u{1F483}",
  "\u{1F57A}",
  "\u{1F46F}",
  "\u{1F46F}\u200D\u2642",
  "\u{1F6B6}\u200D\u2640",
  "\u{1F6B6}",
  "\u{1F3C3}\u200D\u2640",
  "\u{1F3C3}",
  "\u{1F46B}",
  "\u{1F46D}",
  "\u{1F46C}",
  "\u{1F491}",
  "\u{1F469}\u200D\u2764\uFE0F\u200D\u{1F469}",
  "\u{1F468}\u200D\u2764\uFE0F\u200D\u{1F468}",
  "\u{1F48F}",
  "\u{1F469}\u200D\u2764\uFE0F\u200D\u{1F48B}\u200D\u{1F469}",
  "\u{1F468}\u200D\u2764\uFE0F\u200D\u{1F48B}\u200D\u{1F468}",
  "\u{1F46A}",
  "\u{1F468}\u200D\u{1F469}\u200D\u{1F467}",
  "\u{1F468}\u200D\u{1F469}\u200D\u{1F467}\u200D\u{1F466}",
  "\u{1F468}\u200D\u{1F469}\u200D\u{1F466}\u200D\u{1F466}",
  "\u{1F468}\u200D\u{1F469}\u200D\u{1F467}\u200D\u{1F467}",
  "\u{1F469}\u200D\u{1F469}\u200D\u{1F466}",
  "\u{1F469}\u200D\u{1F469}\u200D\u{1F467}",
  "\u{1F469}\u200D\u{1F469}\u200D\u{1F467}\u200D\u{1F466}",
  "\u{1F469}\u200D\u{1F469}\u200D\u{1F466}\u200D\u{1F466}",
  "\u{1F469}\u200D\u{1F469}\u200D\u{1F467}\u200D\u{1F467}",
  "\u{1F468}\u200D\u{1F468}\u200D\u{1F466}",
  "\u{1F468}\u200D\u{1F468}\u200D\u{1F467}",
  "\u{1F468}\u200D\u{1F468}\u200D\u{1F467}\u200D\u{1F466}",
  "\u{1F468}\u200D\u{1F468}\u200D\u{1F466}\u200D\u{1F466}",
  "\u{1F468}\u200D\u{1F468}\u200D\u{1F467}\u200D\u{1F467}",
  "\u{1F469}\u200D\u{1F466}",
  "\u{1F469}\u200D\u{1F467}",
  "\u{1F469}\u200D\u{1F467}\u200D\u{1F466}",
  "\u{1F469}\u200D\u{1F466}\u200D\u{1F466}",
  "\u{1F469}\u200D\u{1F467}\u200D\u{1F467}",
  "\u{1F468}\u200D\u{1F466}",
  "\u{1F468}\u200D\u{1F467}",
  "\u{1F468}\u200D\u{1F467}\u200D\u{1F466}",
  "\u{1F468}\u200D\u{1F466}\u200D\u{1F466}",
  "\u{1F468}\u200D\u{1F467}\u200D\u{1F467}",
  "\u{1F45A}",
  "\u{1F455}",
  "\u{1F456}",
  "\u{1F454}",
  "\u{1F457}",
  "\u{1F459}",
  "\u{1F458}",
  "\u{1F460}",
  "\u{1F461}",
  "\u{1F462}",
  "\u{1F45E}",
  "\u{1F45F}",
  "\u{1F452}",
  "\u{1F3A9}",
  "\u{1F393}",
  "\u{1F451}",
  "\u26D1",
  "\u{1F392}",
  "\u{1F45D}",
  "\u{1F45B}",
  "\u{1F45C}",
  "\u{1F4BC}",
  "\u{1F453}",
  "\u{1F576}",
  "\u{1F302}",
  "\u2602\uFE0F",
  "\u{1F436}",
  "\u{1F431}",
  "\u{1F42D}",
  "\u{1F439}",
  "\u{1F430}",
  "\u{1F98A}",
  "\u{1F43B}",
  "\u{1F43C}",
  "\u{1F428}",
  "\u{1F42F}",
  "\u{1F981}",
  "\u{1F42E}",
  "\u{1F437}",
  "\u{1F43D}",
  "\u{1F438}",
  "\u{1F435}",
  "\u{1F648}",
  "\u{1F649}",
  "\u{1F64A}",
  "\u{1F412}",
  "\u{1F414}",
  "\u{1F427}",
  "\u{1F426}",
  "\u{1F424}",
  "\u{1F423}",
  "\u{1F425}",
  "\u{1F986}",
  "\u{1F985}",
  "\u{1F989}",
  "\u{1F987}",
  "\u{1F43A}",
  "\u{1F417}",
  "\u{1F434}",
  "\u{1F984}",
  "\u{1F41D}",
  "\u{1F41B}",
  "\u{1F98B}",
  "\u{1F40C}",
  "\u{1F41A}",
  "\u{1F41E}",
  "\u{1F41C}",
  "\u{1F577}",
  "\u{1F578}",
  "\u{1F422}",
  "\u{1F40D}",
  "\u{1F98E}",
  "\u{1F982}",
  "\u{1F980}",
  "\u{1F991}",
  "\u{1F419}",
  "\u{1F990}",
  "\u{1F420}",
  "\u{1F41F}",
  "\u{1F421}",
  "\u{1F42C}",
  "\u{1F988}",
  "\u{1F433}",
  "\u{1F40B}",
  "\u{1F40A}",
  "\u{1F406}",
  "\u{1F405}",
  "\u{1F403}",
  "\u{1F402}",
  "\u{1F404}",
  "\u{1F98C}",
  "\u{1F42A}",
  "\u{1F42B}",
  "\u{1F418}",
  "\u{1F98F}",
  "\u{1F98D}",
  "\u{1F40E}",
  "\u{1F416}",
  "\u{1F410}",
  "\u{1F40F}",
  "\u{1F411}",
  "\u{1F415}",
  "\u{1F429}",
  "\u{1F408}",
  "\u{1F413}",
  "\u{1F983}",
  "\u{1F54A}",
  "\u{1F407}",
  "\u{1F401}",
  "\u{1F400}",
  "\u{1F43F}",
  "\u{1F43E}",
  "\u{1F409}",
  "\u{1F432}",
  "\u{1F335}",
  "\u{1F384}",
  "\u{1F332}",
  "\u{1F333}",
  "\u{1F334}",
  "\u{1F331}",
  "\u{1F33F}",
  "\u2618\uFE0F",
  "\u{1F340}",
  "\u{1F38D}",
  "\u{1F38B}",
  "\u{1F343}",
  "\u{1F342}",
  "\u{1F341}",
  "\u{1F344}",
  "\u{1F33E}",
  "\u{1F490}",
  "\u{1F337}",
  "\u{1F339}",
  "\u{1F940}",
  "\u{1F33B}",
  "\u{1F33C}",
  "\u{1F338}",
  "\u{1F33A}",
  "\u{1F30E}",
  "\u{1F30D}",
  "\u{1F30F}",
  "\u{1F315}",
  "\u{1F316}",
  "\u{1F317}",
  "\u{1F318}",
  "\u{1F311}",
  "\u{1F312}",
  "\u{1F313}",
  "\u{1F314}",
  "\u{1F31A}",
  "\u{1F31D}",
  "\u{1F31E}",
  "\u{1F31B}",
  "\u{1F31C}",
  "\u{1F319}",
  "\u{1F4AB}",
  "\u2B50\uFE0F",
  "\u{1F31F}",
  "\u2728",
  "\u26A1\uFE0F",
  "\u{1F525}",
  "\u{1F4A5}",
  "\u2604",
  "\u2600\uFE0F",
  "\u{1F324}",
  "\u26C5\uFE0F",
  "\u{1F325}",
  "\u{1F326}",
  "\u{1F308}",
  "\u2601\uFE0F",
  "\u{1F327}",
  "\u26C8",
  "\u{1F329}",
  "\u{1F328}",
  "\u2603\uFE0F",
  "\u26C4\uFE0F",
  "\u2744\uFE0F",
  "\u{1F32C}",
  "\u{1F4A8}",
  "\u{1F32A}",
  "\u{1F32B}",
  "\u{1F30A}",
  "\u{1F4A7}",
  "\u{1F4A6}",
  "\u2614\uFE0F",
  "\u{1F34F}",
  "\u{1F34E}",
  "\u{1F350}",
  "\u{1F34A}",
  "\u{1F34B}",
  "\u{1F34C}",
  "\u{1F349}",
  "\u{1F347}",
  "\u{1F353}",
  "\u{1F348}",
  "\u{1F352}",
  "\u{1F351}",
  "\u{1F34D}",
  "\u{1F95D}",
  "\u{1F951}",
  "\u{1F345}",
  "\u{1F346}",
  "\u{1F952}",
  "\u{1F955}",
  "\u{1F33D}",
  "\u{1F336}",
  "\u{1F954}",
  "\u{1F360}",
  "\u{1F330}",
  "\u{1F95C}",
  "\u{1F36F}",
  "\u{1F950}",
  "\u{1F35E}",
  "\u{1F956}",
  "\u{1F9C0}",
  "\u{1F95A}",
  "\u{1F373}",
  "\u{1F953}",
  "\u{1F95E}",
  "\u{1F364}",
  "\u{1F357}",
  "\u{1F356}",
  "\u{1F355}",
  "\u{1F32D}",
  "\u{1F354}",
  "\u{1F35F}",
  "\u{1F959}",
  "\u{1F32E}",
  "\u{1F32F}",
  "\u{1F957}",
  "\u{1F958}",
  "\u{1F35D}",
  "\u{1F35C}",
  "\u{1F372}",
  "\u{1F365}",
  "\u{1F363}",
  "\u{1F371}",
  "\u{1F35B}",
  "\u{1F35A}",
  "\u{1F359}",
  "\u{1F358}",
  "\u{1F362}",
  "\u{1F361}",
  "\u{1F367}",
  "\u{1F368}",
  "\u{1F366}",
  "\u{1F370}",
  "\u{1F382}",
  "\u{1F36E}",
  "\u{1F36D}",
  "\u{1F36C}",
  "\u{1F36B}",
  "\u{1F37F}",
  "\u{1F369}",
  "\u{1F36A}",
  "\u{1F95B}",
  "\u{1F37C}",
  "\u2615\uFE0F",
  "\u{1F375}",
  "\u{1F376}",
  "\u{1F37A}",
  "\u{1F37B}",
  "\u{1F942}",
  "\u{1F377}",
  "\u{1F943}",
  "\u{1F378}",
  "\u{1F379}",
  "\u{1F37E}",
  "\u{1F944}",
  "\u{1F374}",
  "\u{1F37D}",
  "\u26BD\uFE0F",
  "\u{1F3C0}",
  "\u{1F3C8}",
  "\u26BE\uFE0F",
  "\u{1F3BE}",
  "\u{1F3D0}",
  "\u{1F3C9}",
  "\u{1F3B1}",
  "\u{1F3D3}",
  "\u{1F3F8}",
  "\u{1F945}",
  "\u{1F3D2}",
  "\u{1F3D1}",
  "\u{1F3CF}",
  "\u26F3\uFE0F",
  "\u{1F3F9}",
  "\u{1F3A3}",
  "\u{1F94A}",
  "\u{1F94B}",
  "\u26F8",
  "\u{1F3BF}",
  "\u26F7",
  "\u{1F3C2}",
  "\u{1F3CB}\uFE0F\u200D\u2640\uFE0F",
  "\u{1F3CB}",
  "\u{1F93A}",
  "\u{1F93C}\u200D\u2640",
  "\u{1F93C}\u200D\u2642",
  "\u{1F938}\u200D\u2640",
  "\u{1F938}\u200D\u2642",
  "\u26F9\uFE0F\u200D\u2640\uFE0F",
  "\u26F9",
  "\u{1F93E}\u200D\u2640",
  "\u{1F93E}\u200D\u2642",
  "\u{1F3CC}\uFE0F\u200D\u2640\uFE0F",
  "\u{1F3CC}",
  "\u{1F3C4}\u200D\u2640",
  "\u{1F3C4}",
  "\u{1F3CA}\u200D\u2640",
  "\u{1F3CA}",
  "\u{1F93D}\u200D\u2640",
  "\u{1F93D}\u200D\u2642",
  "\u{1F6A3}\u200D\u2640",
  "\u{1F6A3}",
  "\u{1F3C7}",
  "\u{1F6B4}\u200D\u2640",
  "\u{1F6B4}",
  "\u{1F6B5}\u200D\u2640",
  "\u{1F6B5}",
  "\u{1F3BD}",
  "\u{1F3C5}",
  "\u{1F396}",
  "\u{1F947}",
  "\u{1F948}",
  "\u{1F949}",
  "\u{1F3C6}",
  "\u{1F3F5}",
  "\u{1F397}",
  "\u{1F3AB}",
  "\u{1F39F}",
  "\u{1F3AA}",
  "\u{1F939}\u200D\u2640",
  "\u{1F939}\u200D\u2642",
  "\u{1F3AD}",
  "\u{1F3A8}",
  "\u{1F3AC}",
  "\u{1F3A4}",
  "\u{1F3A7}",
  "\u{1F3BC}",
  "\u{1F3B9}",
  "\u{1F941}",
  "\u{1F3B7}",
  "\u{1F3BA}",
  "\u{1F3B8}",
  "\u{1F3BB}",
  "\u{1F3B2}",
  "\u{1F3AF}",
  "\u{1F3B3}",
  "\u{1F3AE}",
  "\u{1F3B0}",
  "\u{1F697}",
  "\u{1F695}",
  "\u{1F699}",
  "\u{1F68C}",
  "\u{1F68E}",
  "\u{1F3CE}",
  "\u{1F693}",
  "\u{1F691}",
  "\u{1F692}",
  "\u{1F690}",
  "\u{1F69A}",
  "\u{1F69B}",
  "\u{1F69C}",
  "\u{1F6F4}",
  "\u{1F6B2}",
  "\u{1F6F5}",
  "\u{1F3CD}",
  "\u{1F6A8}",
  "\u{1F694}",
  "\u{1F68D}",
  "\u{1F698}",
  "\u{1F696}",
  "\u{1F6A1}",
  "\u{1F6A0}",
  "\u{1F69F}",
  "\u{1F683}",
  "\u{1F68B}",
  "\u{1F69E}",
  "\u{1F69D}",
  "\u{1F684}",
  "\u{1F685}",
  "\u{1F688}",
  "\u{1F682}",
  "\u{1F686}",
  "\u{1F687}",
  "\u{1F68A}",
  "\u{1F689}",
  "\u{1F681}",
  "\u{1F6E9}",
  "\u2708\uFE0F",
  "\u{1F6EB}",
  "\u{1F6EC}",
  "\u{1F680}",
  "\u{1F6F0}",
  "\u{1F4BA}",
  "\u{1F6F6}",
  "\u26F5\uFE0F",
  "\u{1F6E5}",
  "\u{1F6A4}",
  "\u{1F6F3}",
  "\u26F4",
  "\u{1F6A2}",
  "\u2693\uFE0F",
  "\u{1F6A7}",
  "\u26FD\uFE0F",
  "\u{1F68F}",
  "\u{1F6A6}",
  "\u{1F6A5}",
  "\u{1F5FA}",
  "\u{1F5FF}",
  "\u{1F5FD}",
  "\u26F2\uFE0F",
  "\u{1F5FC}",
  "\u{1F3F0}",
  "\u{1F3EF}",
  "\u{1F3DF}",
  "\u{1F3A1}",
  "\u{1F3A2}",
  "\u{1F3A0}",
  "\u26F1",
  "\u{1F3D6}",
  "\u{1F3DD}",
  "\u26F0",
  "\u{1F3D4}",
  "\u{1F5FB}",
  "\u{1F30B}",
  "\u{1F3DC}",
  "\u{1F3D5}",
  "\u26FA\uFE0F",
  "\u{1F6E4}",
  "\u{1F6E3}",
  "\u{1F3D7}",
  "\u{1F3ED}",
  "\u{1F3E0}",
  "\u{1F3E1}",
  "\u{1F3D8}",
  "\u{1F3DA}",
  "\u{1F3E2}",
  "\u{1F3EC}",
  "\u{1F3E3}",
  "\u{1F3E4}",
  "\u{1F3E5}",
  "\u{1F3E6}",
  "\u{1F3E8}",
  "\u{1F3EA}",
  "\u{1F3EB}",
  "\u{1F3E9}",
  "\u{1F492}",
  "\u{1F3DB}",
  "\u26EA\uFE0F",
  "\u{1F54C}",
  "\u{1F54D}",
  "\u{1F54B}",
  "\u26E9",
  "\u{1F5FE}",
  "\u{1F391}",
  "\u{1F3DE}",
  "\u{1F305}",
  "\u{1F304}",
  "\u{1F320}",
  "\u{1F387}",
  "\u{1F386}",
  "\u{1F307}",
  "\u{1F306}",
  "\u{1F3D9}",
  "\u{1F303}",
  "\u{1F30C}",
  "\u{1F309}",
  "\u{1F301}",
  "\u231A\uFE0F",
  "\u{1F4F1}",
  "\u{1F4F2}",
  "\u{1F4BB}",
  "\u2328\uFE0F",
  "\u{1F5A5}",
  "\u{1F5A8}",
  "\u{1F5B1}",
  "\u{1F5B2}",
  "\u{1F579}",
  "\u{1F5DC}",
  "\u{1F4BD}",
  "\u{1F4BE}",
  "\u{1F4BF}",
  "\u{1F4C0}",
  "\u{1F4FC}",
  "\u{1F4F7}",
  "\u{1F4F8}",
  "\u{1F4F9}",
  "\u{1F3A5}",
  "\u{1F4FD}",
  "\u{1F39E}",
  "\u{1F4DE}",
  "\u260E\uFE0F",
  "\u{1F4DF}",
  "\u{1F4E0}",
  "\u{1F4FA}",
  "\u{1F4FB}",
  "\u{1F399}",
  "\u{1F39A}",
  "\u{1F39B}",
  "\u23F1",
  "\u23F2",
  "\u23F0",
  "\u{1F570}",
  "\u231B\uFE0F",
  "\u23F3",
  "\u{1F4E1}",
  "\u{1F50B}",
  "\u{1F50C}",
  "\u{1F4A1}",
  "\u{1F526}",
  "\u{1F56F}",
  "\u{1F5D1}",
  "\u{1F6E2}",
  "\u{1F4B8}",
  "\u{1F4B5}",
  "\u{1F4B4}",
  "\u{1F4B6}",
  "\u{1F4B7}",
  "\u{1F4B0}",
  "\u{1F4B3}",
  "\u{1F48E}",
  "\u2696\uFE0F",
  "\u{1F527}",
  "\u{1F528}",
  "\u2692",
  "\u{1F6E0}",
  "\u26CF",
  "\u{1F529}",
  "\u2699\uFE0F",
  "\u26D3",
  "\u{1F52B}",
  "\u{1F4A3}",
  "\u{1F52A}",
  "\u{1F5E1}",
  "\u2694\uFE0F",
  "\u{1F6E1}",
  "\u{1F6AC}",
  "\u26B0\uFE0F",
  "\u26B1\uFE0F",
  "\u{1F3FA}",
  "\u{1F52E}",
  "\u{1F4FF}",
  "\u{1F488}",
  "\u2697\uFE0F",
  "\u{1F52D}",
  "\u{1F52C}",
  "\u{1F573}",
  "\u{1F48A}",
  "\u{1F489}",
  "\u{1F321}",
  "\u{1F6BD}",
  "\u{1F6B0}",
  "\u{1F6BF}",
  "\u{1F6C1}",
  "\u{1F6C0}",
  "\u{1F6CE}",
  "\u{1F511}",
  "\u{1F5DD}",
  "\u{1F6AA}",
  "\u{1F6CB}",
  "\u{1F6CF}",
  "\u{1F6CC}",
  "\u{1F5BC}",
  "\u{1F6CD}",
  "\u{1F6D2}",
  "\u{1F381}",
  "\u{1F388}",
  "\u{1F38F}",
  "\u{1F380}",
  "\u{1F38A}",
  "\u{1F389}",
  "\u{1F38E}",
  "\u{1F3EE}",
  "\u{1F390}",
  "\u2709\uFE0F",
  "\u{1F4E9}",
  "\u{1F4E8}",
  "\u{1F4E7}",
  "\u{1F48C}",
  "\u{1F4E5}",
  "\u{1F4E4}",
  "\u{1F4E6}",
  "\u{1F3F7}",
  "\u{1F4EA}",
  "\u{1F4EB}",
  "\u{1F4EC}",
  "\u{1F4ED}",
  "\u{1F4EE}",
  "\u{1F4EF}",
  "\u{1F4DC}",
  "\u{1F4C3}",
  "\u{1F4C4}",
  "\u{1F4D1}",
  "\u{1F4CA}",
  "\u{1F4C8}",
  "\u{1F4C9}",
  "\u{1F5D2}",
  "\u{1F5D3}",
  "\u{1F4C6}",
  "\u{1F4C5}",
  "\u{1F4C7}",
  "\u{1F5C3}",
  "\u{1F5F3}",
  "\u{1F5C4}",
  "\u{1F4CB}",
  "\u{1F4C1}",
  "\u{1F4C2}",
  "\u{1F5C2}",
  "\u{1F5DE}",
  "\u{1F4F0}",
  "\u{1F4D3}",
  "\u{1F4D4}",
  "\u{1F4D2}",
  "\u{1F4D5}",
  "\u{1F4D7}",
  "\u{1F4D8}",
  "\u{1F4D9}",
  "\u{1F4DA}",
  "\u{1F4D6}",
  "\u{1F516}",
  "\u{1F517}",
  "\u{1F4CE}",
  "\u{1F587}",
  "\u{1F4D0}",
  "\u{1F4CF}",
  "\u{1F4CC}",
  "\u{1F4CD}",
  "\u2702\uFE0F",
  "\u{1F58A}",
  "\u{1F58B}",
  "\u2712\uFE0F",
  "\u{1F58C}",
  "\u{1F58D}",
  "\u{1F4DD}",
  "\u270F\uFE0F",
  "\u{1F50D}",
  "\u{1F50E}",
  "\u{1F50F}",
  "\u{1F510}",
  "\u{1F512}",
  "\u{1F513}",
  "\u2764\uFE0F",
  "\u{1F49B}",
  "\u{1F49A}",
  "\u{1F499}",
  "\u{1F49C}",
  "\u{1F5A4}",
  "\u{1F494}",
  "\u2763\uFE0F",
  "\u{1F495}",
  "\u{1F49E}",
  "\u{1F493}",
  "\u{1F497}",
  "\u{1F496}",
  "\u{1F498}",
  "\u{1F49D}",
  "\u{1F49F}",
  "\u262E\uFE0F",
  "\u271D\uFE0F",
  "\u262A\uFE0F",
  "\u{1F549}",
  "\u2638\uFE0F",
  "\u2721\uFE0F",
  "\u{1F52F}",
  "\u{1F54E}",
  "\u262F\uFE0F",
  "\u2626\uFE0F",
  "\u{1F6D0}",
  "\u26CE",
  "\u2648\uFE0F",
  "\u2649\uFE0F",
  "\u264A\uFE0F",
  "\u264B\uFE0F",
  "\u264C\uFE0F",
  "\u264D\uFE0F",
  "\u264E\uFE0F",
  "\u264F\uFE0F",
  "\u2650\uFE0F",
  "\u2651\uFE0F",
  "\u2652\uFE0F",
  "\u2653\uFE0F",
  "\u{1F194}",
  "\u269B\uFE0F",
  "\u{1F251}",
  "\u2622\uFE0F",
  "\u2623\uFE0F",
  "\u{1F4F4}",
  "\u{1F4F3}",
  "\u{1F236}",
  "\u{1F21A}\uFE0F",
  "\u{1F238}",
  "\u{1F23A}",
  "\u{1F237}\uFE0F",
  "\u2734\uFE0F",
  "\u{1F19A}",
  "\u{1F4AE}",
  "\u{1F250}",
  "\u3299\uFE0F",
  "\u3297\uFE0F",
  "\u{1F234}",
  "\u{1F235}",
  "\u{1F239}",
  "\u{1F232}",
  "\u{1F170}\uFE0F",
  "\u{1F171}\uFE0F",
  "\u{1F18E}",
  "\u{1F191}",
  "\u{1F17E}\uFE0F",
  "\u{1F198}",
  "\u274C",
  "\u2B55\uFE0F",
  "\u{1F6D1}",
  "\u26D4\uFE0F",
  "\u{1F4DB}",
  "\u{1F6AB}",
  "\u{1F4AF}",
  "\u{1F4A2}",
  "\u2668\uFE0F",
  "\u{1F6B7}",
  "\u{1F6AF}",
  "\u{1F6B3}",
  "\u{1F6B1}",
  "\u{1F51E}",
  "\u{1F4F5}",
  "\u{1F6AD}",
  "\u2757\uFE0F",
  "\u2755",
  "\u2753",
  "\u2754",
  "\u203C\uFE0F",
  "\u2049\uFE0F",
  "\u{1F505}",
  "\u{1F506}",
  "\u303D\uFE0F",
  "\u26A0\uFE0F",
  "\u{1F6B8}",
  "\u{1F531}",
  "\u269C\uFE0F",
  "\u{1F530}",
  "\u267B\uFE0F",
  "\u2705",
  "\u{1F22F}\uFE0F",
  "\u{1F4B9}",
  "\u2747\uFE0F",
  "\u2733\uFE0F",
  "\u274E",
  "\u{1F310}",
  "\u{1F4A0}",
  "\u24C2\uFE0F",
  "\u{1F300}",
  "\u{1F4A4}",
  "\u{1F3E7}",
  "\u{1F6BE}",
  "\u267F\uFE0F",
  "\u{1F17F}\uFE0F",
  "\u{1F233}",
  "\u{1F202}\uFE0F",
  "\u{1F6C2}",
  "\u{1F6C3}",
  "\u{1F6C4}",
  "\u{1F6C5}",
  "\u{1F6B9}",
  "\u{1F6BA}",
  "\u{1F6BC}",
  "\u{1F6BB}",
  "\u{1F6AE}",
  "\u{1F3A6}",
  "\u{1F4F6}",
  "\u{1F201}",
  "\u{1F523}",
  "\u2139\uFE0F",
  "\u{1F524}",
  "\u{1F521}",
  "\u{1F520}",
  "\u{1F196}",
  "\u{1F197}",
  "\u{1F199}",
  "\u{1F192}",
  "\u{1F195}",
  "\u{1F193}",
  "0\uFE0F\u20E3",
  "1\uFE0F\u20E3",
  "2\uFE0F\u20E3",
  "3\uFE0F\u20E3",
  "4\uFE0F\u20E3",
  "5\uFE0F\u20E3",
  "6\uFE0F\u20E3",
  "7\uFE0F\u20E3",
  "8\uFE0F\u20E3",
  "9\uFE0F\u20E3",
  "\u{1F51F}",
  "\u{1F522}",
  "#\uFE0F\u20E3",
  "*\uFE0F\u20E3",
  "\u25B6\uFE0F",
  "\u23F8",
  "\u23EF",
  "\u23F9",
  "\u23FA",
  "\u23ED",
  "\u23EE",
  "\u23E9",
  "\u23EA",
  "\u23EB",
  "\u23EC",
  "\u25C0\uFE0F",
  "\u{1F53C}",
  "\u{1F53D}",
  "\u27A1\uFE0F",
  "\u2B05\uFE0F",
  "\u2B06\uFE0F",
  "\u2B07\uFE0F",
  "\u2197\uFE0F",
  "\u2198\uFE0F",
  "\u2199\uFE0F",
  "\u2196\uFE0F",
  "\u2195\uFE0F",
  "\u2194\uFE0F",
  "\u21AA\uFE0F",
  "\u21A9\uFE0F",
  "\u2934\uFE0F",
  "\u2935\uFE0F",
  "\u{1F500}",
  "\u{1F501}",
  "\u{1F502}",
  "\u{1F504}",
  "\u{1F503}",
  "\u{1F3B5}",
  "\u{1F3B6}",
  "\u2795",
  "\u2796",
  "\u2797",
  "\u2716\uFE0F",
  "\u{1F4B2}",
  "\u{1F4B1}",
  "\u2122\uFE0F",
  "\xA9\uFE0F",
  "\xAE\uFE0F",
  "\u3030\uFE0F",
  "\u27B0",
  "\u27BF",
  "\u{1F51A}",
  "\u{1F519}",
  "\u{1F51B}",
  "\u{1F51D}",
  "\u{1F51C}",
  "\u2714\uFE0F",
  "\u2611\uFE0F",
  "\u{1F518}",
  "\u26AA\uFE0F",
  "\u26AB\uFE0F",
  "\u{1F534}",
  "\u{1F535}",
  "\u{1F53A}",
  "\u{1F53B}",
  "\u{1F538}",
  "\u{1F539}",
  "\u{1F536}",
  "\u{1F537}",
  "\u{1F533}",
  "\u{1F532}",
  "\u25AA\uFE0F",
  "\u25AB\uFE0F",
  "\u25FE\uFE0F",
  "\u25FD\uFE0F",
  "\u25FC\uFE0F",
  "\u25FB\uFE0F",
  "\u2B1B\uFE0F",
  "\u2B1C\uFE0F",
  "\u{1F508}",
  "\u{1F507}",
  "\u{1F509}",
  "\u{1F50A}",
  "\u{1F514}",
  "\u{1F515}",
  "\u{1F4E3}",
  "\u{1F4E2}",
  "\u{1F441}\u200D\u{1F5E8}",
  "\u{1F4AC}",
  "\u{1F4AD}",
  "\u{1F5EF}",
  "\u2660\uFE0F",
  "\u2663\uFE0F",
  "\u2665\uFE0F",
  "\u2666\uFE0F",
  "\u{1F0CF}",
  "\u{1F3B4}",
  "\u{1F004}\uFE0F",
  "\u{1F550}",
  "\u{1F551}",
  "\u{1F552}",
  "\u{1F553}",
  "\u{1F554}",
  "\u{1F555}",
  "\u{1F556}",
  "\u{1F557}",
  "\u{1F558}",
  "\u{1F559}",
  "\u{1F55A}",
  "\u{1F55B}",
  "\u{1F55C}",
  "\u{1F55D}",
  "\u{1F55E}",
  "\u{1F55F}",
  "\u{1F560}",
  "\u{1F561}",
  "\u{1F562}",
  "\u{1F563}",
  "\u{1F564}",
  "\u{1F565}",
  "\u{1F566}",
  "\u{1F567}",
  "\u{1F3F3}\uFE0F",
  "\u{1F3F4}",
  "\u{1F3C1}",
  "\u{1F6A9}",
  "\u{1F3F3}\uFE0F\u200D\u{1F308}",
  "\u{1F1E6}\u{1F1EB}",
  "\u{1F1E6}\u{1F1FD}",
  "\u{1F1E6}\u{1F1F1}",
  "\u{1F1E9}\u{1F1FF}",
  "\u{1F1E6}\u{1F1F8}",
  "\u{1F1E6}\u{1F1E9}",
  "\u{1F1E6}\u{1F1F4}",
  "\u{1F1E6}\u{1F1EE}",
  "\u{1F1E6}\u{1F1F6}",
  "\u{1F1E6}\u{1F1EC}",
  "\u{1F1E6}\u{1F1F7}",
  "\u{1F1E6}\u{1F1F2}",
  "\u{1F1E6}\u{1F1FC}",
  "\u{1F1E6}\u{1F1FA}",
  "\u{1F1E6}\u{1F1F9}",
  "\u{1F1E6}\u{1F1FF}",
  "\u{1F1E7}\u{1F1F8}",
  "\u{1F1E7}\u{1F1ED}",
  "\u{1F1E7}\u{1F1E9}",
  "\u{1F1E7}\u{1F1E7}",
  "\u{1F1E7}\u{1F1FE}",
  "\u{1F1E7}\u{1F1EA}",
  "\u{1F1E7}\u{1F1FF}",
  "\u{1F1E7}\u{1F1EF}",
  "\u{1F1E7}\u{1F1F2}",
  "\u{1F1E7}\u{1F1F9}",
  "\u{1F1E7}\u{1F1F4}",
  "\u{1F1E7}\u{1F1F6}",
  "\u{1F1E7}\u{1F1E6}",
  "\u{1F1E7}\u{1F1FC}",
  "\u{1F1E7}\u{1F1F7}",
  "\u{1F1EE}\u{1F1F4}",
  "\u{1F1FB}\u{1F1EC}",
  "\u{1F1E7}\u{1F1F3}",
  "\u{1F1E7}\u{1F1EC}",
  "\u{1F1E7}\u{1F1EB}",
  "\u{1F1E7}\u{1F1EE}",
  "\u{1F1E8}\u{1F1FB}",
  "\u{1F1F0}\u{1F1ED}",
  "\u{1F1E8}\u{1F1F2}",
  "\u{1F1E8}\u{1F1E6}",
  "\u{1F1EE}\u{1F1E8}",
  "\u{1F1F0}\u{1F1FE}",
  "\u{1F1E8}\u{1F1EB}",
  "\u{1F1F9}\u{1F1E9}",
  "\u{1F1E8}\u{1F1F1}",
  "\u{1F1E8}\u{1F1F3}",
  "\u{1F1E8}\u{1F1FD}",
  "\u{1F1E8}\u{1F1E8}",
  "\u{1F1E8}\u{1F1F4}",
  "\u{1F1F0}\u{1F1F2}",
  "\u{1F1E8}\u{1F1EC}",
  "\u{1F1E8}\u{1F1E9}",
  "\u{1F1E8}\u{1F1F0}",
  "\u{1F1E8}\u{1F1F7}",
  "\u{1F1E8}\u{1F1EE}",
  "\u{1F1ED}\u{1F1F7}",
  "\u{1F1E8}\u{1F1FA}",
  "\u{1F1E8}\u{1F1FC}",
  "\u{1F1E8}\u{1F1FE}",
  "\u{1F1E8}\u{1F1FF}",
  "\u{1F1E9}\u{1F1F0}",
  "\u{1F1E9}\u{1F1EF}",
  "\u{1F1E9}\u{1F1F2}",
  "\u{1F1E9}\u{1F1F4}",
  "\u{1F1EA}\u{1F1E8}",
  "\u{1F1EA}\u{1F1EC}",
  "\u{1F1F8}\u{1F1FB}",
  "\u{1F1EC}\u{1F1F6}",
  "\u{1F1EA}\u{1F1F7}",
  "\u{1F1EA}\u{1F1EA}",
  "\u{1F1EA}\u{1F1F9}",
  "\u{1F1EA}\u{1F1FA}",
  "\u{1F1EB}\u{1F1F0}",
  "\u{1F1EB}\u{1F1F4}",
  "\u{1F1EB}\u{1F1EF}",
  "\u{1F1EB}\u{1F1EE}",
  "\u{1F1EB}\u{1F1F7}",
  "\u{1F1EC}\u{1F1EB}",
  "\u{1F1F5}\u{1F1EB}",
  "\u{1F1F9}\u{1F1EB}",
  "\u{1F1EC}\u{1F1E6}",
  "\u{1F1EC}\u{1F1F2}",
  "\u{1F1EC}\u{1F1EA}",
  "\u{1F1E9}\u{1F1EA}",
  "\u{1F1EC}\u{1F1ED}",
  "\u{1F1EC}\u{1F1EE}",
  "\u{1F1EC}\u{1F1F7}",
  "\u{1F1EC}\u{1F1F1}",
  "\u{1F1EC}\u{1F1E9}",
  "\u{1F1EC}\u{1F1F5}",
  "\u{1F1EC}\u{1F1FA}",
  "\u{1F1EC}\u{1F1F9}",
  "\u{1F1EC}\u{1F1EC}",
  "\u{1F1EC}\u{1F1F3}",
  "\u{1F1EC}\u{1F1FC}",
  "\u{1F1EC}\u{1F1FE}",
  "\u{1F1ED}\u{1F1F9}",
  "\u{1F1ED}\u{1F1F3}",
  "\u{1F1ED}\u{1F1F0}",
  "\u{1F1ED}\u{1F1FA}",
  "\u{1F1EE}\u{1F1F8}",
  "\u{1F1EE}\u{1F1F3}",
  "\u{1F1EE}\u{1F1E9}",
  "\u{1F1EE}\u{1F1F7}",
  "\u{1F1EE}\u{1F1F6}",
  "\u{1F1EE}\u{1F1EA}",
  "\u{1F1EE}\u{1F1F2}",
  "\u{1F1EE}\u{1F1F1}",
  "\u{1F1EE}\u{1F1F9}",
  "\u{1F1EF}\u{1F1F2}",
  "\u{1F1EF}\u{1F1F5}",
  "\u{1F38C}",
  "\u{1F1EF}\u{1F1EA}",
  "\u{1F1EF}\u{1F1F4}",
  "\u{1F1F0}\u{1F1FF}",
  "\u{1F1F0}\u{1F1EA}",
  "\u{1F1F0}\u{1F1EE}",
  "\u{1F1FD}\u{1F1F0}",
  "\u{1F1F0}\u{1F1FC}",
  "\u{1F1F0}\u{1F1EC}",
  "\u{1F1F1}\u{1F1E6}",
  "\u{1F1F1}\u{1F1FB}",
  "\u{1F1F1}\u{1F1E7}",
  "\u{1F1F1}\u{1F1F8}",
  "\u{1F1F1}\u{1F1F7}",
  "\u{1F1F1}\u{1F1FE}",
  "\u{1F1F1}\u{1F1EE}",
  "\u{1F1F1}\u{1F1F9}",
  "\u{1F1F1}\u{1F1FA}",
  "\u{1F1F2}\u{1F1F4}",
  "\u{1F1F2}\u{1F1F0}",
  "\u{1F1F2}\u{1F1EC}",
  "\u{1F1F2}\u{1F1FC}",
  "\u{1F1F2}\u{1F1FE}",
  "\u{1F1F2}\u{1F1FB}",
  "\u{1F1F2}\u{1F1F1}",
  "\u{1F1F2}\u{1F1F9}",
  "\u{1F1F2}\u{1F1ED}",
  "\u{1F1F2}\u{1F1F6}",
  "\u{1F1F2}\u{1F1F7}",
  "\u{1F1F2}\u{1F1FA}",
  "\u{1F1FE}\u{1F1F9}",
  "\u{1F1F2}\u{1F1FD}",
  "\u{1F1EB}\u{1F1F2}",
  "\u{1F1F2}\u{1F1E9}",
  "\u{1F1F2}\u{1F1E8}",
  "\u{1F1F2}\u{1F1F3}",
  "\u{1F1F2}\u{1F1EA}",
  "\u{1F1F2}\u{1F1F8}",
  "\u{1F1F2}\u{1F1E6}",
  "\u{1F1F2}\u{1F1FF}",
  "\u{1F1F2}\u{1F1F2}",
  "\u{1F1F3}\u{1F1E6}",
  "\u{1F1F3}\u{1F1F7}",
  "\u{1F1F3}\u{1F1F5}",
  "\u{1F1F3}\u{1F1F1}",
  "\u{1F1F3}\u{1F1E8}",
  "\u{1F1F3}\u{1F1FF}",
  "\u{1F1F3}\u{1F1EE}",
  "\u{1F1F3}\u{1F1EA}",
  "\u{1F1F3}\u{1F1EC}",
  "\u{1F1F3}\u{1F1FA}",
  "\u{1F1F3}\u{1F1EB}",
  "\u{1F1F2}\u{1F1F5}",
  "\u{1F1F0}\u{1F1F5}",
  "\u{1F1F3}\u{1F1F4}",
  "\u{1F1F4}\u{1F1F2}",
  "\u{1F1F5}\u{1F1F0}",
  "\u{1F1F5}\u{1F1FC}",
  "\u{1F1F5}\u{1F1F8}",
  "\u{1F1F5}\u{1F1E6}",
  "\u{1F1F5}\u{1F1EC}",
  "\u{1F1F5}\u{1F1FE}",
  "\u{1F1F5}\u{1F1EA}",
  "\u{1F1F5}\u{1F1ED}",
  "\u{1F1F5}\u{1F1F3}",
  "\u{1F1F5}\u{1F1F1}",
  "\u{1F1F5}\u{1F1F9}",
  "\u{1F1F5}\u{1F1F7}",
  "\u{1F1F6}\u{1F1E6}",
  "\u{1F1F7}\u{1F1EA}",
  "\u{1F1F7}\u{1F1F4}",
  "\u{1F1F7}\u{1F1FA}",
  "\u{1F1F7}\u{1F1FC}",
  "\u{1F1E7}\u{1F1F1}",
  "\u{1F1F8}\u{1F1ED}",
  "\u{1F1F0}\u{1F1F3}",
  "\u{1F1F1}\u{1F1E8}",
  "\u{1F1F5}\u{1F1F2}",
  "\u{1F1FB}\u{1F1E8}",
  "\u{1F1FC}\u{1F1F8}",
  "\u{1F1F8}\u{1F1F2}",
  "\u{1F1F8}\u{1F1F9}",
  "\u{1F1F8}\u{1F1E6}",
  "\u{1F1F8}\u{1F1F3}",
  "\u{1F1F7}\u{1F1F8}",
  "\u{1F1F8}\u{1F1E8}",
  "\u{1F1F8}\u{1F1F1}",
  "\u{1F1F8}\u{1F1EC}",
  "\u{1F1F8}\u{1F1FD}",
  "\u{1F1F8}\u{1F1F0}",
  "\u{1F1F8}\u{1F1EE}",
  "\u{1F1F8}\u{1F1E7}",
  "\u{1F1F8}\u{1F1F4}",
  "\u{1F1FF}\u{1F1E6}",
  "\u{1F1EC}\u{1F1F8}",
  "\u{1F1F0}\u{1F1F7}",
  "\u{1F1F8}\u{1F1F8}",
  "\u{1F1EA}\u{1F1F8}",
  "\u{1F1F1}\u{1F1F0}",
  "\u{1F1F8}\u{1F1E9}",
  "\u{1F1F8}\u{1F1F7}",
  "\u{1F1F8}\u{1F1FF}",
  "\u{1F1F8}\u{1F1EA}",
  "\u{1F1E8}\u{1F1ED}",
  "\u{1F1F8}\u{1F1FE}",
  "\u{1F1F9}\u{1F1FC}",
  "\u{1F1F9}\u{1F1EF}",
  "\u{1F1F9}\u{1F1FF}",
  "\u{1F1F9}\u{1F1ED}",
  "\u{1F1F9}\u{1F1F1}",
  "\u{1F1F9}\u{1F1EC}",
  "\u{1F1F9}\u{1F1F0}",
  "\u{1F1F9}\u{1F1F4}",
  "\u{1F1F9}\u{1F1F9}",
  "\u{1F1F9}\u{1F1F3}",
  "\u{1F1F9}\u{1F1F7}",
  "\u{1F1F9}\u{1F1F2}",
  "\u{1F1F9}\u{1F1E8}",
  "\u{1F1F9}\u{1F1FB}",
  "\u{1F1FA}\u{1F1EC}",
  "\u{1F1FA}\u{1F1E6}",
  "\u{1F1E6}\u{1F1EA}",
  "\u{1F1EC}\u{1F1E7}",
  "\u{1F1FA}\u{1F1F8}",
  "\u{1F1FB}\u{1F1EE}",
  "\u{1F1FA}\u{1F1FE}",
  "\u{1F1FA}\u{1F1FF}",
  "\u{1F1FB}\u{1F1FA}",
  "\u{1F1FB}\u{1F1E6}",
  "\u{1F1FB}\u{1F1EA}",
  "\u{1F1FB}\u{1F1F3}",
  "\u{1F1FC}\u{1F1EB}",
  "\u{1F1EA}\u{1F1ED}",
  "\u{1F1FE}\u{1F1EA}",
  "\u{1F1FF}\u{1F1F2}",
  "\u{1F1FF}\u{1F1FC}"
];
var EMOJIMAP = /* @__PURE__ */ new Map([
  ["JUYwJTlGJTk4JTgw", "\u{1F600}"],
  ["JUYwJTlGJTk4JTgz", "\u{1F603}"],
  ["JUYwJTlGJTk4JTg0", "\u{1F604}"],
  ["JUYwJTlGJTk4JTgx", "\u{1F601}"],
  ["JUYwJTlGJTk4JTg2", "\u{1F606}"],
  ["JUYwJTlGJTk4JTg1", "\u{1F605}"],
  ["JUYwJTlGJTk4JTgy", "\u{1F602}"],
  ["JUYwJTlGJUE0JUEz", "\u{1F923}"],
  ["JUYwJTlGJTk4JThD", "\u{1F60C}"],
  ["JUYwJTlGJTk4JThB", "\u{1F60A}"],
  ["JUYwJTlGJTk4JTg3", "\u{1F607}"],
  ["JUYwJTlGJTk5JTgy", "\u{1F642}"],
  ["JUYwJTlGJTk5JTgz", "\u{1F643}"],
  ["JUYwJTlGJTk4JTg5", "\u{1F609}"],
  ["JUYwJTlGJTk4JThE", "\u{1F60D}"],
  ["JUYwJTlGJTk4JTk4", "\u{1F618}"],
  ["JUYwJTlGJTk4JTk3", "\u{1F617}"],
  ["JUYwJTlGJTk4JTk5", "\u{1F619}"],
  ["JUYwJTlGJTk4JTlB", "\u{1F61A}"],
  ["JUYwJTlGJTk4JThC", "\u{1F60B}"],
  ["JUYwJTlGJTk4JTlD", "\u{1F61C}"],
  ["JUYwJTlGJTk4JTlE", "\u{1F61D}"],
  ["JUYwJTlGJTk4JTlC", "\u{1F61B}"],
  ["JUYwJTlGJUE0JTkx", "\u{1F911}"],
  ["JUYwJTlGJUE0JTk3", "\u{1F917}"],
  ["JUYwJTlGJUE0JTkz", "\u{1F913}"],
  ["JUYwJTlGJTk4JThF", "\u{1F60E}"],
  ["JUYwJTlGJUE0JUEx", "\u{1F921}"],
  ["JUYwJTlGJUE0JUEw", "\u{1F920}"],
  ["JUYwJTlGJTk4JThG", "\u{1F60F}"],
  ["JUYwJTlGJTk4JTky", "\u{1F612}"],
  ["JUYwJTlGJTk4JTlF", "\u{1F61E}"],
  ["JUYwJTlGJTk4JTk0", "\u{1F614}"],
  ["JUYwJTlGJTk4JTlG", "\u{1F61F}"],
  ["JUYwJTlGJTk4JTk1", "\u{1F615}"],
  ["JUYwJTlGJTk5JTgx", "\u{1F641}"],
  ["JUUyJTk4JUI5JUVGJUI4JThG", "\u2639\uFE0F"],
  ["JUYwJTlGJTk4JUEz", "\u{1F623}"],
  ["JUYwJTlGJTk4JTk2", "\u{1F616}"],
  ["JUYwJTlGJTk4JUFC", "\u{1F62B}"],
  ["JUYwJTlGJTk4JUE5", "\u{1F629}"],
  ["JUYwJTlGJTk4JUE0", "\u{1F624}"],
  ["JUYwJTlGJTk4JUEw", "\u{1F620}"],
  ["JUYwJTlGJTk4JUEx", "\u{1F621}"],
  ["JUYwJTlGJTk4JUI2", "\u{1F636}"],
  ["JUYwJTlGJTk4JTkw", "\u{1F610}"],
  ["JUYwJTlGJTk4JTkx", "\u{1F611}"],
  ["JUYwJTlGJTk4JUFG", "\u{1F62F}"],
  ["JUYwJTlGJTk4JUE2", "\u{1F626}"],
  ["JUYwJTlGJTk4JUE3", "\u{1F627}"],
  ["JUYwJTlGJTk4JUFF", "\u{1F62E}"],
  ["JUYwJTlGJTk4JUIy", "\u{1F632}"],
  ["JUYwJTlGJTk4JUI1", "\u{1F635}"],
  ["JUYwJTlGJTk4JUIz", "\u{1F633}"],
  ["JUYwJTlGJTk4JUIx", "\u{1F631}"],
  ["JUYwJTlGJTk4JUE4", "\u{1F628}"],
  ["JUYwJTlGJTk4JUIw", "\u{1F630}"],
  ["JUYwJTlGJTk4JUEy", "\u{1F622}"],
  ["JUYwJTlGJTk4JUE1", "\u{1F625}"],
  ["JUYwJTlGJUE0JUE0", "\u{1F924}"],
  ["JUYwJTlGJTk4JUFE", "\u{1F62D}"],
  ["JUYwJTlGJTk4JTkz", "\u{1F613}"],
  ["JUYwJTlGJTk4JUFB", "\u{1F62A}"],
  ["JUYwJTlGJTk4JUI0", "\u{1F634}"],
  ["JUYwJTlGJTk5JTg0", "\u{1F644}"],
  ["JUYwJTlGJUE0JTk0", "\u{1F914}"],
  ["JUYwJTlGJUE0JUE1", "\u{1F925}"],
  ["JUYwJTlGJTk4JUFD", "\u{1F62C}"],
  ["JUYwJTlGJUE0JTkw", "\u{1F910}"],
  ["JUYwJTlGJUE0JUEy", "\u{1F922}"],
  ["JUYwJTlGJUE0JUE3", "\u{1F927}"],
  ["JUYwJTlGJTk4JUI3", "\u{1F637}"],
  ["JUYwJTlGJUE0JTky", "\u{1F912}"],
  ["JUYwJTlGJUE0JTk1", "\u{1F915}"],
  ["JUYwJTlGJTk4JTg4", "\u{1F608}"],
  ["JUYwJTlGJTkxJUJG", "\u{1F47F}"],
  ["JUYwJTlGJTkxJUI5", "\u{1F479}"],
  ["JUYwJTlGJTkxJUJB", "\u{1F47A}"],
  ["JUYwJTlGJTkyJUE5", "\u{1F4A9}"],
  ["JUYwJTlGJTkxJUJC", "\u{1F47B}"],
  ["JUYwJTlGJTkyJTgw", "\u{1F480}"],
  ["JUUyJTk4JUEwJUVGJUI4JThG", "\u2620\uFE0F"],
  ["JUYwJTlGJTkxJUJE", "\u{1F47D}"],
  ["JUYwJTlGJTkxJUJF", "\u{1F47E}"],
  ["JUYwJTlGJUE0JTk2", "\u{1F916}"],
  ["JUYwJTlGJThFJTgz", "\u{1F383}"],
  ["JUYwJTlGJTk4JUJB", "\u{1F63A}"],
  ["JUYwJTlGJTk4JUI4", "\u{1F638}"],
  ["JUYwJTlGJTk4JUI5", "\u{1F639}"],
  ["JUYwJTlGJTk4JUJC", "\u{1F63B}"],
  ["JUYwJTlGJTk4JUJD", "\u{1F63C}"],
  ["JUYwJTlGJTk4JUJE", "\u{1F63D}"],
  ["JUYwJTlGJTk5JTgw", "\u{1F640}"],
  ["JUYwJTlGJTk4JUJG", "\u{1F63F}"],
  ["JUYwJTlGJTk4JUJF", "\u{1F63E}"],
  ["JUYwJTlGJTkxJTkw", "\u{1F450}"],
  ["JUYwJTlGJTk5JThD", "\u{1F64C}"],
  ["JUYwJTlGJTkxJThG", "\u{1F44F}"],
  ["JUYwJTlGJTk5JThG", "\u{1F64F}"],
  ["JUYwJTlGJUE0JTlE", "\u{1F91D}"],
  ["JUYwJTlGJTkxJThE", "\u{1F44D}"],
  ["JUYwJTlGJTkxJThF", "\u{1F44E}"],
  ["JUYwJTlGJTkxJThB", "\u{1F44A}"],
  ["JUUyJTlDJThB", "\u270A"],
  ["JUYwJTlGJUE0JTlC", "\u{1F91B}"],
  ["JUYwJTlGJUE0JTlD", "\u{1F91C}"],
  ["JUYwJTlGJUE0JTlF", "\u{1F91E}"],
  ["JUUyJTlDJThDJUVGJUI4JThG", "\u270C\uFE0F"],
  ["JUYwJTlGJUE0JTk4", "\u{1F918}"],
  ["JUYwJTlGJTkxJThD", "\u{1F44C}"],
  ["JUYwJTlGJTkxJTg4", "\u{1F448}"],
  ["JUYwJTlGJTkxJTg5", "\u{1F449}"],
  ["JUYwJTlGJTkxJTg2", "\u{1F446}"],
  ["JUYwJTlGJTkxJTg3", "\u{1F447}"],
  ["JUUyJTk4JTlEJUVGJUI4JThG", "\u261D\uFE0F"],
  ["JUUyJTlDJThC", "\u270B"],
  ["JUYwJTlGJUE0JTlB", "\u{1F91A}"],
  ["JUYwJTlGJTk2JTkw", "\u{1F590}"],
  ["JUYwJTlGJTk2JTk2", "\u{1F596}"],
  ["JUYwJTlGJTkxJThC", "\u{1F44B}"],
  ["JUYwJTlGJUE0JTk5", "\u{1F919}"],
  ["JUYwJTlGJTkyJUFB", "\u{1F4AA}"],
  ["JUYwJTlGJTk2JTk1", "\u{1F595}"],
  ["JUUyJTlDJThEJUVGJUI4JThG", "\u270D\uFE0F"],
  ["JUYwJTlGJUE0JUIz", "\u{1F933}"],
  ["JUYwJTlGJTkyJTg1", "\u{1F485}"],
  ["JUYwJTlGJTkyJThE", "\u{1F48D}"],
  ["JUYwJTlGJTkyJTg0", "\u{1F484}"],
  ["JUYwJTlGJTkyJThC", "\u{1F48B}"],
  ["JUYwJTlGJTkxJTg0", "\u{1F444}"],
  ["JUYwJTlGJTkxJTg1", "\u{1F445}"],
  ["JUYwJTlGJTkxJTgy", "\u{1F442}"],
  ["JUYwJTlGJTkxJTgz", "\u{1F443}"],
  ["JUYwJTlGJTkxJUEz", "\u{1F463}"],
  ["JUYwJTlGJTkxJTgx", "\u{1F441}"],
  ["JUYwJTlGJTkxJTgw", "\u{1F440}"],
  ["JUYwJTlGJTk3JUEz", "\u{1F5E3}"],
  ["JUYwJTlGJTkxJUE0", "\u{1F464}"],
  ["JUYwJTlGJTkxJUE1", "\u{1F465}"],
  ["JUYwJTlGJTkxJUI2", "\u{1F476}"],
  ["JUYwJTlGJTkxJUE2", "\u{1F466}"],
  ["JUYwJTlGJTkxJUE3", "\u{1F467}"],
  ["JUYwJTlGJTkxJUE4", "\u{1F468}"],
  ["JUYwJTlGJTkxJUE5", "\u{1F469}"],
  ["JUYwJTlGJTkxJUIxJUUyJTgwJThEJUUyJTk5JTgw", "\u{1F471}\u200D\u2640"],
  ["JUYwJTlGJTkxJUIx", "\u{1F471}"],
  ["JUYwJTlGJTkxJUI0", "\u{1F474}"],
  ["JUYwJTlGJTkxJUI1", "\u{1F475}"],
  ["JUYwJTlGJTkxJUIy", "\u{1F472}"],
  ["JUYwJTlGJTkxJUIzJUUyJTgwJThEJUUyJTk5JTgw", "\u{1F473}\u200D\u2640"],
  ["JUYwJTlGJTkxJUIz", "\u{1F473}"],
  ["JUYwJTlGJTkxJUFFJUUyJTgwJThEJUUyJTk5JTgw", "\u{1F46E}\u200D\u2640"],
  ["JUYwJTlGJTkxJUFF", "\u{1F46E}"],
  ["JUYwJTlGJTkxJUI3JUUyJTgwJThEJUUyJTk5JTgw", "\u{1F477}\u200D\u2640"],
  ["JUYwJTlGJTkxJUI3", "\u{1F477}"],
  ["JUYwJTlGJTkyJTgyJUUyJTgwJThEJUUyJTk5JTgw", "\u{1F482}\u200D\u2640"],
  ["JUYwJTlGJTkyJTgy", "\u{1F482}"],
  ["JUYwJTlGJTkxJUE5JUUyJTgwJThEJUUyJTlBJTk1", "\u{1F469}\u200D\u2695"],
  ["JUYwJTlGJTkxJUE4JUUyJTgwJThEJUUyJTlBJTk1", "\u{1F468}\u200D\u2695"],
  ["JUYwJTlGJTkxJUE5JUUyJTgwJThEJUYwJTlGJThDJUJF", "\u{1F469}\u200D\u{1F33E}"],
  ["JUYwJTlGJTkxJUE4JUUyJTgwJThEJUYwJTlGJThDJUJF", "\u{1F468}\u200D\u{1F33E}"],
  ["JUYwJTlGJTkxJUE5JUUyJTgwJThEJUYwJTlGJThEJUIz", "\u{1F469}\u200D\u{1F373}"],
  ["JUYwJTlGJTkxJUE4JUUyJTgwJThEJUYwJTlGJThEJUIz", "\u{1F468}\u200D\u{1F373}"],
  ["JUYwJTlGJTkxJUE5JUUyJTgwJThEJUYwJTlGJThFJTkz", "\u{1F469}\u200D\u{1F393}"],
  ["JUYwJTlGJTkxJUE4JUUyJTgwJThEJUYwJTlGJThFJTkz", "\u{1F468}\u200D\u{1F393}"],
  ["JUYwJTlGJTkxJUE5JUUyJTgwJThEJUYwJTlGJThFJUE0", "\u{1F469}\u200D\u{1F3A4}"],
  ["JUYwJTlGJTkxJUE4JUUyJTgwJThEJUYwJTlGJThFJUE0", "\u{1F468}\u200D\u{1F3A4}"],
  ["JUYwJTlGJTkxJUE5JUUyJTgwJThEJUYwJTlGJThGJUFC", "\u{1F469}\u200D\u{1F3EB}"],
  ["JUYwJTlGJTkxJUE4JUUyJTgwJThEJUYwJTlGJThGJUFC", "\u{1F468}\u200D\u{1F3EB}"],
  ["JUYwJTlGJTkxJUE5JUUyJTgwJThEJUYwJTlGJThGJUFE", "\u{1F469}\u200D\u{1F3ED}"],
  ["JUYwJTlGJTkxJUE4JUUyJTgwJThEJUYwJTlGJThGJUFE", "\u{1F468}\u200D\u{1F3ED}"],
  ["JUYwJTlGJTkxJUE5JUUyJTgwJThEJUYwJTlGJTkyJUJC", "\u{1F469}\u200D\u{1F4BB}"],
  ["JUYwJTlGJTkxJUE4JUUyJTgwJThEJUYwJTlGJTkyJUJC", "\u{1F468}\u200D\u{1F4BB}"],
  ["JUYwJTlGJTkxJUE5JUUyJTgwJThEJUYwJTlGJTkyJUJD", "\u{1F469}\u200D\u{1F4BC}"],
  ["JUYwJTlGJTkxJUE4JUUyJTgwJThEJUYwJTlGJTkyJUJD", "\u{1F468}\u200D\u{1F4BC}"],
  ["JUYwJTlGJTkxJUE5JUUyJTgwJThEJUYwJTlGJTk0JUE3", "\u{1F469}\u200D\u{1F527}"],
  ["JUYwJTlGJTkxJUE4JUUyJTgwJThEJUYwJTlGJTk0JUE3", "\u{1F468}\u200D\u{1F527}"],
  ["JUYwJTlGJTkxJUE5JUUyJTgwJThEJUYwJTlGJTk0JUFD", "\u{1F469}\u200D\u{1F52C}"],
  ["JUYwJTlGJTkxJUE4JUUyJTgwJThEJUYwJTlGJTk0JUFD", "\u{1F468}\u200D\u{1F52C}"],
  ["JUYwJTlGJTkxJUE5JUUyJTgwJThEJUYwJTlGJThFJUE4", "\u{1F469}\u200D\u{1F3A8}"],
  ["JUYwJTlGJTkxJUE4JUUyJTgwJThEJUYwJTlGJThFJUE4", "\u{1F468}\u200D\u{1F3A8}"],
  ["JUYwJTlGJTkxJUE5JUUyJTgwJThEJUYwJTlGJTlBJTky", "\u{1F469}\u200D\u{1F692}"],
  ["JUYwJTlGJTkxJUE4JUUyJTgwJThEJUYwJTlGJTlBJTky", "\u{1F468}\u200D\u{1F692}"],
  ["JUYwJTlGJTkxJUE5JUUyJTgwJThEJUYwJTlGJTlBJTgw", "\u{1F469}\u200D\u{1F680}"],
  ["JUYwJTlGJTkxJUE4JUUyJTgwJThEJUYwJTlGJTlBJTgw", "\u{1F468}\u200D\u{1F680}"],
  ["JUYwJTlGJUE0JUI2", "\u{1F936}"],
  ["JUYwJTlGJThFJTg1", "\u{1F385}"],
  ["JUYwJTlGJTkxJUI4", "\u{1F478}"],
  ["JUYwJTlGJUE0JUI0", "\u{1F934}"],
  ["JUYwJTlGJTkxJUIw", "\u{1F470}"],
  ["JUYwJTlGJUE0JUI1", "\u{1F935}"],
  ["JUYwJTlGJTkxJUJD", "\u{1F47C}"],
  ["JUYwJTlGJUE0JUIw", "\u{1F930}"],
  ["JUYwJTlGJTk5JTg3JUUyJTgwJThEJUUyJTk5JTgw", "\u{1F647}\u200D\u2640"],
  ["JUYwJTlGJTk5JTg3", "\u{1F647}"],
  ["JUYwJTlGJTkyJTgx", "\u{1F481}"],
  ["JUYwJTlGJTkyJTgxJUUyJTgwJThEJUUyJTk5JTgy", "\u{1F481}\u200D\u2642"],
  ["JUYwJTlGJTk5JTg1", "\u{1F645}"],
  ["JUYwJTlGJTk5JTg1JUUyJTgwJThEJUUyJTk5JTgy", "\u{1F645}\u200D\u2642"],
  ["JUYwJTlGJTk5JTg2", "\u{1F646}"],
  ["JUYwJTlGJTk5JTg2JUUyJTgwJThEJUUyJTk5JTgy", "\u{1F646}\u200D\u2642"],
  ["JUYwJTlGJTk5JThC", "\u{1F64B}"],
  ["JUYwJTlGJTk5JThCJUUyJTgwJThEJUUyJTk5JTgy", "\u{1F64B}\u200D\u2642"],
  ["JUYwJTlGJUE0JUE2JUUyJTgwJThEJUUyJTk5JTgw", "\u{1F926}\u200D\u2640"],
  ["JUYwJTlGJUE0JUE2JUUyJTgwJThEJUUyJTk5JTgy", "\u{1F926}\u200D\u2642"],
  ["JUYwJTlGJUE0JUI3JUUyJTgwJThEJUUyJTk5JTgw", "\u{1F937}\u200D\u2640"],
  ["JUYwJTlGJUE0JUI3JUUyJTgwJThEJUUyJTk5JTgy", "\u{1F937}\u200D\u2642"],
  ["JUYwJTlGJTk5JThF", "\u{1F64E}"],
  ["JUYwJTlGJTk5JThFJUUyJTgwJThEJUUyJTk5JTgy", "\u{1F64E}\u200D\u2642"],
  ["JUYwJTlGJTk5JThE", "\u{1F64D}"],
  ["JUYwJTlGJTk5JThEJUUyJTgwJThEJUUyJTk5JTgy", "\u{1F64D}\u200D\u2642"],
  ["JUYwJTlGJTkyJTg3", "\u{1F487}"],
  ["JUYwJTlGJTkyJTg3JUUyJTgwJThEJUUyJTk5JTgy", "\u{1F487}\u200D\u2642"],
  ["JUYwJTlGJTkyJTg2", "\u{1F486}"],
  ["JUYwJTlGJTkyJTg2JUUyJTgwJThEJUUyJTk5JTgy", "\u{1F486}\u200D\u2642"],
  ["JUYwJTlGJTk1JUI0", "\u{1F574}"],
  ["JUYwJTlGJTkyJTgz", "\u{1F483}"],
  ["JUYwJTlGJTk1JUJB", "\u{1F57A}"],
  ["JUYwJTlGJTkxJUFG", "\u{1F46F}"],
  ["JUYwJTlGJTkxJUFGJUUyJTgwJThEJUUyJTk5JTgy", "\u{1F46F}\u200D\u2642"],
  ["JUYwJTlGJTlBJUI2JUUyJTgwJThEJUUyJTk5JTgw", "\u{1F6B6}\u200D\u2640"],
  ["JUYwJTlGJTlBJUI2", "\u{1F6B6}"],
  ["JUYwJTlGJThGJTgzJUUyJTgwJThEJUUyJTk5JTgw", "\u{1F3C3}\u200D\u2640"],
  ["JUYwJTlGJThGJTgz", "\u{1F3C3}"],
  ["JUYwJTlGJTkxJUFC", "\u{1F46B}"],
  ["JUYwJTlGJTkxJUFE", "\u{1F46D}"],
  ["JUYwJTlGJTkxJUFD", "\u{1F46C}"],
  ["JUYwJTlGJTkyJTkx", "\u{1F491}"],
  [
    "JUYwJTlGJTkxJUE5JUUyJTgwJThEJUUyJTlEJUE0JUVGJUI4JThGJUUyJTgwJThEJUYwJTlGJTkxJUE5",
    "\u{1F469}\u200D\u2764\uFE0F\u200D\u{1F469}"
  ],
  [
    "JUYwJTlGJTkxJUE4JUUyJTgwJThEJUUyJTlEJUE0JUVGJUI4JThGJUUyJTgwJThEJUYwJTlGJTkxJUE4",
    "\u{1F468}\u200D\u2764\uFE0F\u200D\u{1F468}"
  ],
  ["JUYwJTlGJTkyJThG", "\u{1F48F}"],
  [
    "JUYwJTlGJTkxJUE5JUUyJTgwJThEJUUyJTlEJUE0JUVGJUI4JThGJUUyJTgwJThEJUYwJTlGJTkyJThCJUUyJTgwJThEJUYwJTlGJTkxJUE5",
    "\u{1F469}\u200D\u2764\uFE0F\u200D\u{1F48B}\u200D\u{1F469}"
  ],
  [
    "JUYwJTlGJTkxJUE4JUUyJTgwJThEJUUyJTlEJUE0JUVGJUI4JThGJUUyJTgwJThEJUYwJTlGJTkyJThCJUUyJTgwJThEJUYwJTlGJTkxJUE4",
    "\u{1F468}\u200D\u2764\uFE0F\u200D\u{1F48B}\u200D\u{1F468}"
  ],
  ["JUYwJTlGJTkxJUFB", "\u{1F46A}"],
  [
    "JUYwJTlGJTkxJUE4JUUyJTgwJThEJUYwJTlGJTkxJUE5JUUyJTgwJThEJUYwJTlGJTkxJUE3",
    "\u{1F468}\u200D\u{1F469}\u200D\u{1F467}"
  ],
  [
    "JUYwJTlGJTkxJUE4JUUyJTgwJThEJUYwJTlGJTkxJUE5JUUyJTgwJThEJUYwJTlGJTkxJUE3JUUyJTgwJThEJUYwJTlGJTkxJUE2",
    "\u{1F468}\u200D\u{1F469}\u200D\u{1F467}\u200D\u{1F466}"
  ],
  [
    "JUYwJTlGJTkxJUE4JUUyJTgwJThEJUYwJTlGJTkxJUE5JUUyJTgwJThEJUYwJTlGJTkxJUE2JUUyJTgwJThEJUYwJTlGJTkxJUE2",
    "\u{1F468}\u200D\u{1F469}\u200D\u{1F466}\u200D\u{1F466}"
  ],
  [
    "JUYwJTlGJTkxJUE4JUUyJTgwJThEJUYwJTlGJTkxJUE5JUUyJTgwJThEJUYwJTlGJTkxJUE3JUUyJTgwJThEJUYwJTlGJTkxJUE3",
    "\u{1F468}\u200D\u{1F469}\u200D\u{1F467}\u200D\u{1F467}"
  ],
  [
    "JUYwJTlGJTkxJUE5JUUyJTgwJThEJUYwJTlGJTkxJUE5JUUyJTgwJThEJUYwJTlGJTkxJUE2",
    "\u{1F469}\u200D\u{1F469}\u200D\u{1F466}"
  ],
  [
    "JUYwJTlGJTkxJUE5JUUyJTgwJThEJUYwJTlGJTkxJUE5JUUyJTgwJThEJUYwJTlGJTkxJUE3",
    "\u{1F469}\u200D\u{1F469}\u200D\u{1F467}"
  ],
  [
    "JUYwJTlGJTkxJUE5JUUyJTgwJThEJUYwJTlGJTkxJUE5JUUyJTgwJThEJUYwJTlGJTkxJUE3JUUyJTgwJThEJUYwJTlGJTkxJUE2",
    "\u{1F469}\u200D\u{1F469}\u200D\u{1F467}\u200D\u{1F466}"
  ],
  [
    "JUYwJTlGJTkxJUE5JUUyJTgwJThEJUYwJTlGJTkxJUE5JUUyJTgwJThEJUYwJTlGJTkxJUE2JUUyJTgwJThEJUYwJTlGJTkxJUE2",
    "\u{1F469}\u200D\u{1F469}\u200D\u{1F466}\u200D\u{1F466}"
  ],
  [
    "JUYwJTlGJTkxJUE5JUUyJTgwJThEJUYwJTlGJTkxJUE5JUUyJTgwJThEJUYwJTlGJTkxJUE3JUUyJTgwJThEJUYwJTlGJTkxJUE3",
    "\u{1F469}\u200D\u{1F469}\u200D\u{1F467}\u200D\u{1F467}"
  ],
  [
    "JUYwJTlGJTkxJUE4JUUyJTgwJThEJUYwJTlGJTkxJUE4JUUyJTgwJThEJUYwJTlGJTkxJUE2",
    "\u{1F468}\u200D\u{1F468}\u200D\u{1F466}"
  ],
  [
    "JUYwJTlGJTkxJUE4JUUyJTgwJThEJUYwJTlGJTkxJUE4JUUyJTgwJThEJUYwJTlGJTkxJUE3",
    "\u{1F468}\u200D\u{1F468}\u200D\u{1F467}"
  ],
  [
    "JUYwJTlGJTkxJUE4JUUyJTgwJThEJUYwJTlGJTkxJUE4JUUyJTgwJThEJUYwJTlGJTkxJUE3JUUyJTgwJThEJUYwJTlGJTkxJUE2",
    "\u{1F468}\u200D\u{1F468}\u200D\u{1F467}\u200D\u{1F466}"
  ],
  [
    "JUYwJTlGJTkxJUE4JUUyJTgwJThEJUYwJTlGJTkxJUE4JUUyJTgwJThEJUYwJTlGJTkxJUE2JUUyJTgwJThEJUYwJTlGJTkxJUE2",
    "\u{1F468}\u200D\u{1F468}\u200D\u{1F466}\u200D\u{1F466}"
  ],
  [
    "JUYwJTlGJTkxJUE4JUUyJTgwJThEJUYwJTlGJTkxJUE4JUUyJTgwJThEJUYwJTlGJTkxJUE3JUUyJTgwJThEJUYwJTlGJTkxJUE3",
    "\u{1F468}\u200D\u{1F468}\u200D\u{1F467}\u200D\u{1F467}"
  ],
  ["JUYwJTlGJTkxJUE5JUUyJTgwJThEJUYwJTlGJTkxJUE2", "\u{1F469}\u200D\u{1F466}"],
  ["JUYwJTlGJTkxJUE5JUUyJTgwJThEJUYwJTlGJTkxJUE3", "\u{1F469}\u200D\u{1F467}"],
  [
    "JUYwJTlGJTkxJUE5JUUyJTgwJThEJUYwJTlGJTkxJUE3JUUyJTgwJThEJUYwJTlGJTkxJUE2",
    "\u{1F469}\u200D\u{1F467}\u200D\u{1F466}"
  ],
  [
    "JUYwJTlGJTkxJUE5JUUyJTgwJThEJUYwJTlGJTkxJUE2JUUyJTgwJThEJUYwJTlGJTkxJUE2",
    "\u{1F469}\u200D\u{1F466}\u200D\u{1F466}"
  ],
  [
    "JUYwJTlGJTkxJUE5JUUyJTgwJThEJUYwJTlGJTkxJUE3JUUyJTgwJThEJUYwJTlGJTkxJUE3",
    "\u{1F469}\u200D\u{1F467}\u200D\u{1F467}"
  ],
  ["JUYwJTlGJTkxJUE4JUUyJTgwJThEJUYwJTlGJTkxJUE2", "\u{1F468}\u200D\u{1F466}"],
  ["JUYwJTlGJTkxJUE4JUUyJTgwJThEJUYwJTlGJTkxJUE3", "\u{1F468}\u200D\u{1F467}"],
  [
    "JUYwJTlGJTkxJUE4JUUyJTgwJThEJUYwJTlGJTkxJUE3JUUyJTgwJThEJUYwJTlGJTkxJUE2",
    "\u{1F468}\u200D\u{1F467}\u200D\u{1F466}"
  ],
  [
    "JUYwJTlGJTkxJUE4JUUyJTgwJThEJUYwJTlGJTkxJUE2JUUyJTgwJThEJUYwJTlGJTkxJUE2",
    "\u{1F468}\u200D\u{1F466}\u200D\u{1F466}"
  ],
  [
    "JUYwJTlGJTkxJUE4JUUyJTgwJThEJUYwJTlGJTkxJUE3JUUyJTgwJThEJUYwJTlGJTkxJUE3",
    "\u{1F468}\u200D\u{1F467}\u200D\u{1F467}"
  ],
  ["JUYwJTlGJTkxJTlB", "\u{1F45A}"],
  ["JUYwJTlGJTkxJTk1", "\u{1F455}"],
  ["JUYwJTlGJTkxJTk2", "\u{1F456}"],
  ["JUYwJTlGJTkxJTk0", "\u{1F454}"],
  ["JUYwJTlGJTkxJTk3", "\u{1F457}"],
  ["JUYwJTlGJTkxJTk5", "\u{1F459}"],
  ["JUYwJTlGJTkxJTk4", "\u{1F458}"],
  ["JUYwJTlGJTkxJUEw", "\u{1F460}"],
  ["JUYwJTlGJTkxJUEx", "\u{1F461}"],
  ["JUYwJTlGJTkxJUEy", "\u{1F462}"],
  ["JUYwJTlGJTkxJTlF", "\u{1F45E}"],
  ["JUYwJTlGJTkxJTlG", "\u{1F45F}"],
  ["JUYwJTlGJTkxJTky", "\u{1F452}"],
  ["JUYwJTlGJThFJUE5", "\u{1F3A9}"],
  ["JUYwJTlGJThFJTkz", "\u{1F393}"],
  ["JUYwJTlGJTkxJTkx", "\u{1F451}"],
  ["JUUyJTlCJTkx", "\u26D1"],
  ["JUYwJTlGJThFJTky", "\u{1F392}"],
  ["JUYwJTlGJTkxJTlE", "\u{1F45D}"],
  ["JUYwJTlGJTkxJTlC", "\u{1F45B}"],
  ["JUYwJTlGJTkxJTlD", "\u{1F45C}"],
  ["JUYwJTlGJTkyJUJD", "\u{1F4BC}"],
  ["JUYwJTlGJTkxJTkz", "\u{1F453}"],
  ["JUYwJTlGJTk1JUI2", "\u{1F576}"],
  ["JUYwJTlGJThDJTgy", "\u{1F302}"],
  ["JUUyJTk4JTgyJUVGJUI4JThG", "\u2602\uFE0F"],
  ["JUYwJTlGJTkwJUI2", "\u{1F436}"],
  ["JUYwJTlGJTkwJUIx", "\u{1F431}"],
  ["JUYwJTlGJTkwJUFE", "\u{1F42D}"],
  ["JUYwJTlGJTkwJUI5", "\u{1F439}"],
  ["JUYwJTlGJTkwJUIw", "\u{1F430}"],
  ["JUYwJTlGJUE2JThB", "\u{1F98A}"],
  ["JUYwJTlGJTkwJUJC", "\u{1F43B}"],
  ["JUYwJTlGJTkwJUJD", "\u{1F43C}"],
  ["JUYwJTlGJTkwJUE4", "\u{1F428}"],
  ["JUYwJTlGJTkwJUFG", "\u{1F42F}"],
  ["JUYwJTlGJUE2JTgx", "\u{1F981}"],
  ["JUYwJTlGJTkwJUFF", "\u{1F42E}"],
  ["JUYwJTlGJTkwJUI3", "\u{1F437}"],
  ["JUYwJTlGJTkwJUJE", "\u{1F43D}"],
  ["JUYwJTlGJTkwJUI4", "\u{1F438}"],
  ["JUYwJTlGJTkwJUI1", "\u{1F435}"],
  ["JUYwJTlGJTk5JTg4", "\u{1F648}"],
  ["JUYwJTlGJTk5JTg5", "\u{1F649}"],
  ["JUYwJTlGJTk5JThB", "\u{1F64A}"],
  ["JUYwJTlGJTkwJTky", "\u{1F412}"],
  ["JUYwJTlGJTkwJTk0", "\u{1F414}"],
  ["JUYwJTlGJTkwJUE3", "\u{1F427}"],
  ["JUYwJTlGJTkwJUE2", "\u{1F426}"],
  ["JUYwJTlGJTkwJUE0", "\u{1F424}"],
  ["JUYwJTlGJTkwJUEz", "\u{1F423}"],
  ["JUYwJTlGJTkwJUE1", "\u{1F425}"],
  ["JUYwJTlGJUE2JTg2", "\u{1F986}"],
  ["JUYwJTlGJUE2JTg1", "\u{1F985}"],
  ["JUYwJTlGJUE2JTg5", "\u{1F989}"],
  ["JUYwJTlGJUE2JTg3", "\u{1F987}"],
  ["JUYwJTlGJTkwJUJB", "\u{1F43A}"],
  ["JUYwJTlGJTkwJTk3", "\u{1F417}"],
  ["JUYwJTlGJTkwJUI0", "\u{1F434}"],
  ["JUYwJTlGJUE2JTg0", "\u{1F984}"],
  ["JUYwJTlGJTkwJTlE", "\u{1F41D}"],
  ["JUYwJTlGJTkwJTlC", "\u{1F41B}"],
  ["JUYwJTlGJUE2JThC", "\u{1F98B}"],
  ["JUYwJTlGJTkwJThD", "\u{1F40C}"],
  ["JUYwJTlGJTkwJTlB", "\u{1F41A}"],
  ["JUYwJTlGJTkwJTlF", "\u{1F41E}"],
  ["JUYwJTlGJTkwJTlD", "\u{1F41C}"],
  ["JUYwJTlGJTk1JUI3", "\u{1F577}"],
  ["JUYwJTlGJTk1JUI4", "\u{1F578}"],
  ["JUYwJTlGJTkwJUEy", "\u{1F422}"],
  ["JUYwJTlGJTkwJThE", "\u{1F40D}"],
  ["JUYwJTlGJUE2JThF", "\u{1F98E}"],
  ["JUYwJTlGJUE2JTgy", "\u{1F982}"],
  ["JUYwJTlGJUE2JTgw", "\u{1F980}"],
  ["JUYwJTlGJUE2JTkx", "\u{1F991}"],
  ["JUYwJTlGJTkwJTk5", "\u{1F419}"],
  ["JUYwJTlGJUE2JTkw", "\u{1F990}"],
  ["JUYwJTlGJTkwJUEw", "\u{1F420}"],
  ["JUYwJTlGJTkwJTlG", "\u{1F41F}"],
  ["JUYwJTlGJTkwJUEx", "\u{1F421}"],
  ["JUYwJTlGJTkwJUFD", "\u{1F42C}"],
  ["JUYwJTlGJUE2JTg4", "\u{1F988}"],
  ["JUYwJTlGJTkwJUIz", "\u{1F433}"],
  ["JUYwJTlGJTkwJThC", "\u{1F40B}"],
  ["JUYwJTlGJTkwJThB", "\u{1F40A}"],
  ["JUYwJTlGJTkwJTg2", "\u{1F406}"],
  ["JUYwJTlGJTkwJTg1", "\u{1F405}"],
  ["JUYwJTlGJTkwJTgz", "\u{1F403}"],
  ["JUYwJTlGJTkwJTgy", "\u{1F402}"],
  ["JUYwJTlGJTkwJTg0", "\u{1F404}"],
  ["JUYwJTlGJUE2JThD", "\u{1F98C}"],
  ["JUYwJTlGJTkwJUFB", "\u{1F42A}"],
  ["JUYwJTlGJTkwJUFC", "\u{1F42B}"],
  ["JUYwJTlGJTkwJTk4", "\u{1F418}"],
  ["JUYwJTlGJUE2JThG", "\u{1F98F}"],
  ["JUYwJTlGJUE2JThE", "\u{1F98D}"],
  ["JUYwJTlGJTkwJThF", "\u{1F40E}"],
  ["JUYwJTlGJTkwJTk2", "\u{1F416}"],
  ["JUYwJTlGJTkwJTkw", "\u{1F410}"],
  ["JUYwJTlGJTkwJThG", "\u{1F40F}"],
  ["JUYwJTlGJTkwJTkx", "\u{1F411}"],
  ["JUYwJTlGJTkwJTk1", "\u{1F415}"],
  ["JUYwJTlGJTkwJUE5", "\u{1F429}"],
  ["JUYwJTlGJTkwJTg4", "\u{1F408}"],
  ["JUYwJTlGJTkwJTkz", "\u{1F413}"],
  ["JUYwJTlGJUE2JTgz", "\u{1F983}"],
  ["JUYwJTlGJTk1JThB", "\u{1F54A}"],
  ["JUYwJTlGJTkwJTg3", "\u{1F407}"],
  ["JUYwJTlGJTkwJTgx", "\u{1F401}"],
  ["JUYwJTlGJTkwJTgw", "\u{1F400}"],
  ["JUYwJTlGJTkwJUJG", "\u{1F43F}"],
  ["JUYwJTlGJTkwJUJF", "\u{1F43E}"],
  ["JUYwJTlGJTkwJTg5", "\u{1F409}"],
  ["JUYwJTlGJTkwJUIy", "\u{1F432}"],
  ["JUYwJTlGJThDJUI1", "\u{1F335}"],
  ["JUYwJTlGJThFJTg0", "\u{1F384}"],
  ["JUYwJTlGJThDJUIy", "\u{1F332}"],
  ["JUYwJTlGJThDJUIz", "\u{1F333}"],
  ["JUYwJTlGJThDJUI0", "\u{1F334}"],
  ["JUYwJTlGJThDJUIx", "\u{1F331}"],
  ["JUYwJTlGJThDJUJG", "\u{1F33F}"],
  ["JUUyJTk4JTk4JUVGJUI4JThG", "\u2618\uFE0F"],
  ["JUYwJTlGJThEJTgw", "\u{1F340}"],
  ["JUYwJTlGJThFJThE", "\u{1F38D}"],
  ["JUYwJTlGJThFJThC", "\u{1F38B}"],
  ["JUYwJTlGJThEJTgz", "\u{1F343}"],
  ["JUYwJTlGJThEJTgy", "\u{1F342}"],
  ["JUYwJTlGJThEJTgx", "\u{1F341}"],
  ["JUYwJTlGJThEJTg0", "\u{1F344}"],
  ["JUYwJTlGJThDJUJF", "\u{1F33E}"],
  ["JUYwJTlGJTkyJTkw", "\u{1F490}"],
  ["JUYwJTlGJThDJUI3", "\u{1F337}"],
  ["JUYwJTlGJThDJUI5", "\u{1F339}"],
  ["JUYwJTlGJUE1JTgw", "\u{1F940}"],
  ["JUYwJTlGJThDJUJC", "\u{1F33B}"],
  ["JUYwJTlGJThDJUJD", "\u{1F33C}"],
  ["JUYwJTlGJThDJUI4", "\u{1F338}"],
  ["JUYwJTlGJThDJUJB", "\u{1F33A}"],
  ["JUYwJTlGJThDJThF", "\u{1F30E}"],
  ["JUYwJTlGJThDJThE", "\u{1F30D}"],
  ["JUYwJTlGJThDJThG", "\u{1F30F}"],
  ["JUYwJTlGJThDJTk1", "\u{1F315}"],
  ["JUYwJTlGJThDJTk2", "\u{1F316}"],
  ["JUYwJTlGJThDJTk3", "\u{1F317}"],
  ["JUYwJTlGJThDJTk4", "\u{1F318}"],
  ["JUYwJTlGJThDJTkx", "\u{1F311}"],
  ["JUYwJTlGJThDJTky", "\u{1F312}"],
  ["JUYwJTlGJThDJTkz", "\u{1F313}"],
  ["JUYwJTlGJThDJTk0", "\u{1F314}"],
  ["JUYwJTlGJThDJTlB", "\u{1F31A}"],
  ["JUYwJTlGJThDJTlE", "\u{1F31D}"],
  ["JUYwJTlGJThDJTlF", "\u{1F31E}"],
  ["JUYwJTlGJThDJTlC", "\u{1F31B}"],
  ["JUYwJTlGJThDJTlD", "\u{1F31C}"],
  ["JUYwJTlGJThDJTk5", "\u{1F319}"],
  ["JUYwJTlGJTkyJUFC", "\u{1F4AB}"],
  ["JUUyJUFEJTkwJUVGJUI4JThG", "\u2B50\uFE0F"],
  ["JUYwJTlGJThDJTlG", "\u{1F31F}"],
  ["JUUyJTlDJUE4", "\u2728"],
  ["JUUyJTlBJUExJUVGJUI4JThG", "\u26A1\uFE0F"],
  ["JUYwJTlGJTk0JUE1", "\u{1F525}"],
  ["JUYwJTlGJTkyJUE1", "\u{1F4A5}"],
  ["JUUyJTk4JTg0", "\u2604"],
  ["JUUyJTk4JTgwJUVGJUI4JThG", "\u2600\uFE0F"],
  ["JUYwJTlGJThDJUE0", "\u{1F324}"],
  ["JUUyJTlCJTg1JUVGJUI4JThG", "\u26C5\uFE0F"],
  ["JUYwJTlGJThDJUE1", "\u{1F325}"],
  ["JUYwJTlGJThDJUE2", "\u{1F326}"],
  ["JUYwJTlGJThDJTg4", "\u{1F308}"],
  ["JUUyJTk4JTgxJUVGJUI4JThG", "\u2601\uFE0F"],
  ["JUYwJTlGJThDJUE3", "\u{1F327}"],
  ["JUUyJTlCJTg4", "\u26C8"],
  ["JUYwJTlGJThDJUE5", "\u{1F329}"],
  ["JUYwJTlGJThDJUE4", "\u{1F328}"],
  ["JUUyJTk4JTgzJUVGJUI4JThG", "\u2603\uFE0F"],
  ["JUUyJTlCJTg0JUVGJUI4JThG", "\u26C4\uFE0F"],
  ["JUUyJTlEJTg0JUVGJUI4JThG", "\u2744\uFE0F"],
  ["JUYwJTlGJThDJUFD", "\u{1F32C}"],
  ["JUYwJTlGJTkyJUE4", "\u{1F4A8}"],
  ["JUYwJTlGJThDJUFB", "\u{1F32A}"],
  ["JUYwJTlGJThDJUFC", "\u{1F32B}"],
  ["JUYwJTlGJThDJThB", "\u{1F30A}"],
  ["JUYwJTlGJTkyJUE3", "\u{1F4A7}"],
  ["JUYwJTlGJTkyJUE2", "\u{1F4A6}"],
  ["JUUyJTk4JTk0JUVGJUI4JThG", "\u2614\uFE0F"],
  ["JUYwJTlGJThEJThG", "\u{1F34F}"],
  ["JUYwJTlGJThEJThF", "\u{1F34E}"],
  ["JUYwJTlGJThEJTkw", "\u{1F350}"],
  ["JUYwJTlGJThEJThB", "\u{1F34A}"],
  ["JUYwJTlGJThEJThC", "\u{1F34B}"],
  ["JUYwJTlGJThEJThD", "\u{1F34C}"],
  ["JUYwJTlGJThEJTg5", "\u{1F349}"],
  ["JUYwJTlGJThEJTg3", "\u{1F347}"],
  ["JUYwJTlGJThEJTkz", "\u{1F353}"],
  ["JUYwJTlGJThEJTg4", "\u{1F348}"],
  ["JUYwJTlGJThEJTky", "\u{1F352}"],
  ["JUYwJTlGJThEJTkx", "\u{1F351}"],
  ["JUYwJTlGJThEJThE", "\u{1F34D}"],
  ["JUYwJTlGJUE1JTlE", "\u{1F95D}"],
  ["JUYwJTlGJUE1JTkx", "\u{1F951}"],
  ["JUYwJTlGJThEJTg1", "\u{1F345}"],
  ["JUYwJTlGJThEJTg2", "\u{1F346}"],
  ["JUYwJTlGJUE1JTky", "\u{1F952}"],
  ["JUYwJTlGJUE1JTk1", "\u{1F955}"],
  ["JUYwJTlGJThDJUJE", "\u{1F33D}"],
  ["JUYwJTlGJThDJUI2", "\u{1F336}"],
  ["JUYwJTlGJUE1JTk0", "\u{1F954}"],
  ["JUYwJTlGJThEJUEw", "\u{1F360}"],
  ["JUYwJTlGJThDJUIw", "\u{1F330}"],
  ["JUYwJTlGJUE1JTlD", "\u{1F95C}"],
  ["JUYwJTlGJThEJUFG", "\u{1F36F}"],
  ["JUYwJTlGJUE1JTkw", "\u{1F950}"],
  ["JUYwJTlGJThEJTlF", "\u{1F35E}"],
  ["JUYwJTlGJUE1JTk2", "\u{1F956}"],
  ["JUYwJTlGJUE3JTgw", "\u{1F9C0}"],
  ["JUYwJTlGJUE1JTlB", "\u{1F95A}"],
  ["JUYwJTlGJThEJUIz", "\u{1F373}"],
  ["JUYwJTlGJUE1JTkz", "\u{1F953}"],
  ["JUYwJTlGJUE1JTlF", "\u{1F95E}"],
  ["JUYwJTlGJThEJUE0", "\u{1F364}"],
  ["JUYwJTlGJThEJTk3", "\u{1F357}"],
  ["JUYwJTlGJThEJTk2", "\u{1F356}"],
  ["JUYwJTlGJThEJTk1", "\u{1F355}"],
  ["JUYwJTlGJThDJUFE", "\u{1F32D}"],
  ["JUYwJTlGJThEJTk0", "\u{1F354}"],
  ["JUYwJTlGJThEJTlG", "\u{1F35F}"],
  ["JUYwJTlGJUE1JTk5", "\u{1F959}"],
  ["JUYwJTlGJThDJUFF", "\u{1F32E}"],
  ["JUYwJTlGJThDJUFG", "\u{1F32F}"],
  ["JUYwJTlGJUE1JTk3", "\u{1F957}"],
  ["JUYwJTlGJUE1JTk4", "\u{1F958}"],
  ["JUYwJTlGJThEJTlE", "\u{1F35D}"],
  ["JUYwJTlGJThEJTlD", "\u{1F35C}"],
  ["JUYwJTlGJThEJUIy", "\u{1F372}"],
  ["JUYwJTlGJThEJUE1", "\u{1F365}"],
  ["JUYwJTlGJThEJUEz", "\u{1F363}"],
  ["JUYwJTlGJThEJUIx", "\u{1F371}"],
  ["JUYwJTlGJThEJTlC", "\u{1F35B}"],
  ["JUYwJTlGJThEJTlB", "\u{1F35A}"],
  ["JUYwJTlGJThEJTk5", "\u{1F359}"],
  ["JUYwJTlGJThEJTk4", "\u{1F358}"],
  ["JUYwJTlGJThEJUEy", "\u{1F362}"],
  ["JUYwJTlGJThEJUEx", "\u{1F361}"],
  ["JUYwJTlGJThEJUE3", "\u{1F367}"],
  ["JUYwJTlGJThEJUE4", "\u{1F368}"],
  ["JUYwJTlGJThEJUE2", "\u{1F366}"],
  ["JUYwJTlGJThEJUIw", "\u{1F370}"],
  ["JUYwJTlGJThFJTgy", "\u{1F382}"],
  ["JUYwJTlGJThEJUFF", "\u{1F36E}"],
  ["JUYwJTlGJThEJUFE", "\u{1F36D}"],
  ["JUYwJTlGJThEJUFD", "\u{1F36C}"],
  ["JUYwJTlGJThEJUFC", "\u{1F36B}"],
  ["JUYwJTlGJThEJUJG", "\u{1F37F}"],
  ["JUYwJTlGJThEJUE5", "\u{1F369}"],
  ["JUYwJTlGJThEJUFB", "\u{1F36A}"],
  ["JUYwJTlGJUE1JTlC", "\u{1F95B}"],
  ["JUYwJTlGJThEJUJD", "\u{1F37C}"],
  ["JUUyJTk4JTk1JUVGJUI4JThG", "\u2615\uFE0F"],
  ["JUYwJTlGJThEJUI1", "\u{1F375}"],
  ["JUYwJTlGJThEJUI2", "\u{1F376}"],
  ["JUYwJTlGJThEJUJB", "\u{1F37A}"],
  ["JUYwJTlGJThEJUJC", "\u{1F37B}"],
  ["JUYwJTlGJUE1JTgy", "\u{1F942}"],
  ["JUYwJTlGJThEJUI3", "\u{1F377}"],
  ["JUYwJTlGJUE1JTgz", "\u{1F943}"],
  ["JUYwJTlGJThEJUI4", "\u{1F378}"],
  ["JUYwJTlGJThEJUI5", "\u{1F379}"],
  ["JUYwJTlGJThEJUJF", "\u{1F37E}"],
  ["JUYwJTlGJUE1JTg0", "\u{1F944}"],
  ["JUYwJTlGJThEJUI0", "\u{1F374}"],
  ["JUYwJTlGJThEJUJE", "\u{1F37D}"],
  ["JUUyJTlBJUJEJUVGJUI4JThG", "\u26BD\uFE0F"],
  ["JUYwJTlGJThGJTgw", "\u{1F3C0}"],
  ["JUYwJTlGJThGJTg4", "\u{1F3C8}"],
  ["JUUyJTlBJUJFJUVGJUI4JThG", "\u26BE\uFE0F"],
  ["JUYwJTlGJThFJUJF", "\u{1F3BE}"],
  ["JUYwJTlGJThGJTkw", "\u{1F3D0}"],
  ["JUYwJTlGJThGJTg5", "\u{1F3C9}"],
  ["JUYwJTlGJThFJUIx", "\u{1F3B1}"],
  ["JUYwJTlGJThGJTkz", "\u{1F3D3}"],
  ["JUYwJTlGJThGJUI4", "\u{1F3F8}"],
  ["JUYwJTlGJUE1JTg1", "\u{1F945}"],
  ["JUYwJTlGJThGJTky", "\u{1F3D2}"],
  ["JUYwJTlGJThGJTkx", "\u{1F3D1}"],
  ["JUYwJTlGJThGJThG", "\u{1F3CF}"],
  ["JUUyJTlCJUIzJUVGJUI4JThG", "\u26F3\uFE0F"],
  ["JUYwJTlGJThGJUI5", "\u{1F3F9}"],
  ["JUYwJTlGJThFJUEz", "\u{1F3A3}"],
  ["JUYwJTlGJUE1JThB", "\u{1F94A}"],
  ["JUYwJTlGJUE1JThC", "\u{1F94B}"],
  ["JUUyJTlCJUI4", "\u26F8"],
  ["JUYwJTlGJThFJUJG", "\u{1F3BF}"],
  ["JUUyJTlCJUI3", "\u26F7"],
  ["JUYwJTlGJThGJTgy", "\u{1F3C2}"],
  ["JUYwJTlGJThGJThCJUVGJUI4JThGJUUyJTgwJThEJUUyJTk5JTgwJUVGJUI4JThG", "\u{1F3CB}\uFE0F\u200D\u2640\uFE0F"],
  ["JUYwJTlGJThGJThC", "\u{1F3CB}"],
  ["JUYwJTlGJUE0JUJB", "\u{1F93A}"],
  ["JUYwJTlGJUE0JUJDJUUyJTgwJThEJUUyJTk5JTgw", "\u{1F93C}\u200D\u2640"],
  ["JUYwJTlGJUE0JUJDJUUyJTgwJThEJUUyJTk5JTgy", "\u{1F93C}\u200D\u2642"],
  ["JUYwJTlGJUE0JUI4JUUyJTgwJThEJUUyJTk5JTgw", "\u{1F938}\u200D\u2640"],
  ["JUYwJTlGJUE0JUI4JUUyJTgwJThEJUUyJTk5JTgy", "\u{1F938}\u200D\u2642"],
  ["JUUyJTlCJUI5JUVGJUI4JThGJUUyJTgwJThEJUUyJTk5JTgwJUVGJUI4JThG", "\u26F9\uFE0F\u200D\u2640\uFE0F"],
  ["JUUyJTlCJUI5", "\u26F9"],
  ["JUYwJTlGJUE0JUJFJUUyJTgwJThEJUUyJTk5JTgw", "\u{1F93E}\u200D\u2640"],
  ["JUYwJTlGJUE0JUJFJUUyJTgwJThEJUUyJTk5JTgy", "\u{1F93E}\u200D\u2642"],
  ["JUYwJTlGJThGJThDJUVGJUI4JThGJUUyJTgwJThEJUUyJTk5JTgwJUVGJUI4JThG", "\u{1F3CC}\uFE0F\u200D\u2640\uFE0F"],
  ["JUYwJTlGJThGJThD", "\u{1F3CC}"],
  ["JUYwJTlGJThGJTg0JUUyJTgwJThEJUUyJTk5JTgw", "\u{1F3C4}\u200D\u2640"],
  ["JUYwJTlGJThGJTg0", "\u{1F3C4}"],
  ["JUYwJTlGJThGJThBJUUyJTgwJThEJUUyJTk5JTgw", "\u{1F3CA}\u200D\u2640"],
  ["JUYwJTlGJThGJThB", "\u{1F3CA}"],
  ["JUYwJTlGJUE0JUJEJUUyJTgwJThEJUUyJTk5JTgw", "\u{1F93D}\u200D\u2640"],
  ["JUYwJTlGJUE0JUJEJUUyJTgwJThEJUUyJTk5JTgy", "\u{1F93D}\u200D\u2642"],
  ["JUYwJTlGJTlBJUEzJUUyJTgwJThEJUUyJTk5JTgw", "\u{1F6A3}\u200D\u2640"],
  ["JUYwJTlGJTlBJUEz", "\u{1F6A3}"],
  ["JUYwJTlGJThGJTg3", "\u{1F3C7}"],
  ["JUYwJTlGJTlBJUI0JUUyJTgwJThEJUUyJTk5JTgw", "\u{1F6B4}\u200D\u2640"],
  ["JUYwJTlGJTlBJUI0", "\u{1F6B4}"],
  ["JUYwJTlGJTlBJUI1JUUyJTgwJThEJUUyJTk5JTgw", "\u{1F6B5}\u200D\u2640"],
  ["JUYwJTlGJTlBJUI1", "\u{1F6B5}"],
  ["JUYwJTlGJThFJUJE", "\u{1F3BD}"],
  ["JUYwJTlGJThGJTg1", "\u{1F3C5}"],
  ["JUYwJTlGJThFJTk2", "\u{1F396}"],
  ["JUYwJTlGJUE1JTg3", "\u{1F947}"],
  ["JUYwJTlGJUE1JTg4", "\u{1F948}"],
  ["JUYwJTlGJUE1JTg5", "\u{1F949}"],
  ["JUYwJTlGJThGJTg2", "\u{1F3C6}"],
  ["JUYwJTlGJThGJUI1", "\u{1F3F5}"],
  ["JUYwJTlGJThFJTk3", "\u{1F397}"],
  ["JUYwJTlGJThFJUFC", "\u{1F3AB}"],
  ["JUYwJTlGJThFJTlG", "\u{1F39F}"],
  ["JUYwJTlGJThFJUFB", "\u{1F3AA}"],
  ["JUYwJTlGJUE0JUI5JUUyJTgwJThEJUUyJTk5JTgw", "\u{1F939}\u200D\u2640"],
  ["JUYwJTlGJUE0JUI5JUUyJTgwJThEJUUyJTk5JTgy", "\u{1F939}\u200D\u2642"],
  ["JUYwJTlGJThFJUFE", "\u{1F3AD}"],
  ["JUYwJTlGJThFJUE4", "\u{1F3A8}"],
  ["JUYwJTlGJThFJUFD", "\u{1F3AC}"],
  ["JUYwJTlGJThFJUE0", "\u{1F3A4}"],
  ["JUYwJTlGJThFJUE3", "\u{1F3A7}"],
  ["JUYwJTlGJThFJUJD", "\u{1F3BC}"],
  ["JUYwJTlGJThFJUI5", "\u{1F3B9}"],
  ["JUYwJTlGJUE1JTgx", "\u{1F941}"],
  ["JUYwJTlGJThFJUI3", "\u{1F3B7}"],
  ["JUYwJTlGJThFJUJB", "\u{1F3BA}"],
  ["JUYwJTlGJThFJUI4", "\u{1F3B8}"],
  ["JUYwJTlGJThFJUJC", "\u{1F3BB}"],
  ["JUYwJTlGJThFJUIy", "\u{1F3B2}"],
  ["JUYwJTlGJThFJUFG", "\u{1F3AF}"],
  ["JUYwJTlGJThFJUIz", "\u{1F3B3}"],
  ["JUYwJTlGJThFJUFF", "\u{1F3AE}"],
  ["JUYwJTlGJThFJUIw", "\u{1F3B0}"],
  ["JUYwJTlGJTlBJTk3", "\u{1F697}"],
  ["JUYwJTlGJTlBJTk1", "\u{1F695}"],
  ["JUYwJTlGJTlBJTk5", "\u{1F699}"],
  ["JUYwJTlGJTlBJThD", "\u{1F68C}"],
  ["JUYwJTlGJTlBJThF", "\u{1F68E}"],
  ["JUYwJTlGJThGJThF", "\u{1F3CE}"],
  ["JUYwJTlGJTlBJTkz", "\u{1F693}"],
  ["JUYwJTlGJTlBJTkx", "\u{1F691}"],
  ["JUYwJTlGJTlBJTky", "\u{1F692}"],
  ["JUYwJTlGJTlBJTkw", "\u{1F690}"],
  ["JUYwJTlGJTlBJTlB", "\u{1F69A}"],
  ["JUYwJTlGJTlBJTlC", "\u{1F69B}"],
  ["JUYwJTlGJTlBJTlD", "\u{1F69C}"],
  ["JUYwJTlGJTlCJUI0", "\u{1F6F4}"],
  ["JUYwJTlGJTlBJUIy", "\u{1F6B2}"],
  ["JUYwJTlGJTlCJUI1", "\u{1F6F5}"],
  ["JUYwJTlGJThGJThE", "\u{1F3CD}"],
  ["JUYwJTlGJTlBJUE4", "\u{1F6A8}"],
  ["JUYwJTlGJTlBJTk0", "\u{1F694}"],
  ["JUYwJTlGJTlBJThE", "\u{1F68D}"],
  ["JUYwJTlGJTlBJTk4", "\u{1F698}"],
  ["JUYwJTlGJTlBJTk2", "\u{1F696}"],
  ["JUYwJTlGJTlBJUEx", "\u{1F6A1}"],
  ["JUYwJTlGJTlBJUEw", "\u{1F6A0}"],
  ["JUYwJTlGJTlBJTlG", "\u{1F69F}"],
  ["JUYwJTlGJTlBJTgz", "\u{1F683}"],
  ["JUYwJTlGJTlBJThC", "\u{1F68B}"],
  ["JUYwJTlGJTlBJTlF", "\u{1F69E}"],
  ["JUYwJTlGJTlBJTlE", "\u{1F69D}"],
  ["JUYwJTlGJTlBJTg0", "\u{1F684}"],
  ["JUYwJTlGJTlBJTg1", "\u{1F685}"],
  ["JUYwJTlGJTlBJTg4", "\u{1F688}"],
  ["JUYwJTlGJTlBJTgy", "\u{1F682}"],
  ["JUYwJTlGJTlBJTg2", "\u{1F686}"],
  ["JUYwJTlGJTlBJTg3", "\u{1F687}"],
  ["JUYwJTlGJTlBJThB", "\u{1F68A}"],
  ["JUYwJTlGJTlBJTg5", "\u{1F689}"],
  ["JUYwJTlGJTlBJTgx", "\u{1F681}"],
  ["JUYwJTlGJTlCJUE5", "\u{1F6E9}"],
  ["JUUyJTlDJTg4JUVGJUI4JThG", "\u2708\uFE0F"],
  ["JUYwJTlGJTlCJUFC", "\u{1F6EB}"],
  ["JUYwJTlGJTlCJUFD", "\u{1F6EC}"],
  ["JUYwJTlGJTlBJTgw", "\u{1F680}"],
  ["JUYwJTlGJTlCJUIw", "\u{1F6F0}"],
  ["JUYwJTlGJTkyJUJB", "\u{1F4BA}"],
  ["JUYwJTlGJTlCJUI2", "\u{1F6F6}"],
  ["JUUyJTlCJUI1JUVGJUI4JThG", "\u26F5\uFE0F"],
  ["JUYwJTlGJTlCJUE1", "\u{1F6E5}"],
  ["JUYwJTlGJTlBJUE0", "\u{1F6A4}"],
  ["JUYwJTlGJTlCJUIz", "\u{1F6F3}"],
  ["JUUyJTlCJUI0", "\u26F4"],
  ["JUYwJTlGJTlBJUEy", "\u{1F6A2}"],
  ["JUUyJTlBJTkzJUVGJUI4JThG", "\u2693\uFE0F"],
  ["JUYwJTlGJTlBJUE3", "\u{1F6A7}"],
  ["JUUyJTlCJUJEJUVGJUI4JThG", "\u26FD\uFE0F"],
  ["JUYwJTlGJTlBJThG", "\u{1F68F}"],
  ["JUYwJTlGJTlBJUE2", "\u{1F6A6}"],
  ["JUYwJTlGJTlBJUE1", "\u{1F6A5}"],
  ["JUYwJTlGJTk3JUJB", "\u{1F5FA}"],
  ["JUYwJTlGJTk3JUJG", "\u{1F5FF}"],
  ["JUYwJTlGJTk3JUJE", "\u{1F5FD}"],
  ["JUUyJTlCJUIyJUVGJUI4JThG", "\u26F2\uFE0F"],
  ["JUYwJTlGJTk3JUJD", "\u{1F5FC}"],
  ["JUYwJTlGJThGJUIw", "\u{1F3F0}"],
  ["JUYwJTlGJThGJUFG", "\u{1F3EF}"],
  ["JUYwJTlGJThGJTlG", "\u{1F3DF}"],
  ["JUYwJTlGJThFJUEx", "\u{1F3A1}"],
  ["JUYwJTlGJThFJUEy", "\u{1F3A2}"],
  ["JUYwJTlGJThFJUEw", "\u{1F3A0}"],
  ["JUUyJTlCJUIx", "\u26F1"],
  ["JUYwJTlGJThGJTk2", "\u{1F3D6}"],
  ["JUYwJTlGJThGJTlE", "\u{1F3DD}"],
  ["JUUyJTlCJUIw", "\u26F0"],
  ["JUYwJTlGJThGJTk0", "\u{1F3D4}"],
  ["JUYwJTlGJTk3JUJC", "\u{1F5FB}"],
  ["JUYwJTlGJThDJThC", "\u{1F30B}"],
  ["JUYwJTlGJThGJTlD", "\u{1F3DC}"],
  ["JUYwJTlGJThGJTk1", "\u{1F3D5}"],
  ["JUUyJTlCJUJBJUVGJUI4JThG", "\u26FA\uFE0F"],
  ["JUYwJTlGJTlCJUE0", "\u{1F6E4}"],
  ["JUYwJTlGJTlCJUEz", "\u{1F6E3}"],
  ["JUYwJTlGJThGJTk3", "\u{1F3D7}"],
  ["JUYwJTlGJThGJUFE", "\u{1F3ED}"],
  ["JUYwJTlGJThGJUEw", "\u{1F3E0}"],
  ["JUYwJTlGJThGJUEx", "\u{1F3E1}"],
  ["JUYwJTlGJThGJTk4", "\u{1F3D8}"],
  ["JUYwJTlGJThGJTlB", "\u{1F3DA}"],
  ["JUYwJTlGJThGJUEy", "\u{1F3E2}"],
  ["JUYwJTlGJThGJUFD", "\u{1F3EC}"],
  ["JUYwJTlGJThGJUEz", "\u{1F3E3}"],
  ["JUYwJTlGJThGJUE0", "\u{1F3E4}"],
  ["JUYwJTlGJThGJUE1", "\u{1F3E5}"],
  ["JUYwJTlGJThGJUE2", "\u{1F3E6}"],
  ["JUYwJTlGJThGJUE4", "\u{1F3E8}"],
  ["JUYwJTlGJThGJUFB", "\u{1F3EA}"],
  ["JUYwJTlGJThGJUFC", "\u{1F3EB}"],
  ["JUYwJTlGJThGJUE5", "\u{1F3E9}"],
  ["JUYwJTlGJTkyJTky", "\u{1F492}"],
  ["JUYwJTlGJThGJTlC", "\u{1F3DB}"],
  ["JUUyJTlCJUFBJUVGJUI4JThG", "\u26EA\uFE0F"],
  ["JUYwJTlGJTk1JThD", "\u{1F54C}"],
  ["JUYwJTlGJTk1JThE", "\u{1F54D}"],
  ["JUYwJTlGJTk1JThC", "\u{1F54B}"],
  ["JUUyJTlCJUE5", "\u26E9"],
  ["JUYwJTlGJTk3JUJF", "\u{1F5FE}"],
  ["JUYwJTlGJThFJTkx", "\u{1F391}"],
  ["JUYwJTlGJThGJTlF", "\u{1F3DE}"],
  ["JUYwJTlGJThDJTg1", "\u{1F305}"],
  ["JUYwJTlGJThDJTg0", "\u{1F304}"],
  ["JUYwJTlGJThDJUEw", "\u{1F320}"],
  ["JUYwJTlGJThFJTg3", "\u{1F387}"],
  ["JUYwJTlGJThFJTg2", "\u{1F386}"],
  ["JUYwJTlGJThDJTg3", "\u{1F307}"],
  ["JUYwJTlGJThDJTg2", "\u{1F306}"],
  ["JUYwJTlGJThGJTk5", "\u{1F3D9}"],
  ["JUYwJTlGJThDJTgz", "\u{1F303}"],
  ["JUYwJTlGJThDJThD", "\u{1F30C}"],
  ["JUYwJTlGJThDJTg5", "\u{1F309}"],
  ["JUYwJTlGJThDJTgx", "\u{1F301}"],
  ["JUUyJThDJTlBJUVGJUI4JThG", "\u231A\uFE0F"],
  ["JUYwJTlGJTkzJUIx", "\u{1F4F1}"],
  ["JUYwJTlGJTkzJUIy", "\u{1F4F2}"],
  ["JUYwJTlGJTkyJUJC", "\u{1F4BB}"],
  ["JUUyJThDJUE4JUVGJUI4JThG", "\u2328\uFE0F"],
  ["JUYwJTlGJTk2JUE1", "\u{1F5A5}"],
  ["JUYwJTlGJTk2JUE4", "\u{1F5A8}"],
  ["JUYwJTlGJTk2JUIx", "\u{1F5B1}"],
  ["JUYwJTlGJTk2JUIy", "\u{1F5B2}"],
  ["JUYwJTlGJTk1JUI5", "\u{1F579}"],
  ["JUYwJTlGJTk3JTlD", "\u{1F5DC}"],
  ["JUYwJTlGJTkyJUJE", "\u{1F4BD}"],
  ["JUYwJTlGJTkyJUJF", "\u{1F4BE}"],
  ["JUYwJTlGJTkyJUJG", "\u{1F4BF}"],
  ["JUYwJTlGJTkzJTgw", "\u{1F4C0}"],
  ["JUYwJTlGJTkzJUJD", "\u{1F4FC}"],
  ["JUYwJTlGJTkzJUI3", "\u{1F4F7}"],
  ["JUYwJTlGJTkzJUI4", "\u{1F4F8}"],
  ["JUYwJTlGJTkzJUI5", "\u{1F4F9}"],
  ["JUYwJTlGJThFJUE1", "\u{1F3A5}"],
  ["JUYwJTlGJTkzJUJE", "\u{1F4FD}"],
  ["JUYwJTlGJThFJTlF", "\u{1F39E}"],
  ["JUYwJTlGJTkzJTlF", "\u{1F4DE}"],
  ["JUUyJTk4JThFJUVGJUI4JThG", "\u260E\uFE0F"],
  ["JUYwJTlGJTkzJTlG", "\u{1F4DF}"],
  ["JUYwJTlGJTkzJUEw", "\u{1F4E0}"],
  ["JUYwJTlGJTkzJUJB", "\u{1F4FA}"],
  ["JUYwJTlGJTkzJUJC", "\u{1F4FB}"],
  ["JUYwJTlGJThFJTk5", "\u{1F399}"],
  ["JUYwJTlGJThFJTlB", "\u{1F39A}"],
  ["JUYwJTlGJThFJTlC", "\u{1F39B}"],
  ["JUUyJThGJUIx", "\u23F1"],
  ["JUUyJThGJUIy", "\u23F2"],
  ["JUUyJThGJUIw", "\u23F0"],
  ["JUYwJTlGJTk1JUIw", "\u{1F570}"],
  ["JUUyJThDJTlCJUVGJUI4JThG", "\u231B\uFE0F"],
  ["JUUyJThGJUIz", "\u23F3"],
  ["JUYwJTlGJTkzJUEx", "\u{1F4E1}"],
  ["JUYwJTlGJTk0JThC", "\u{1F50B}"],
  ["JUYwJTlGJTk0JThD", "\u{1F50C}"],
  ["JUYwJTlGJTkyJUEx", "\u{1F4A1}"],
  ["JUYwJTlGJTk0JUE2", "\u{1F526}"],
  ["JUYwJTlGJTk1JUFG", "\u{1F56F}"],
  ["JUYwJTlGJTk3JTkx", "\u{1F5D1}"],
  ["JUYwJTlGJTlCJUEy", "\u{1F6E2}"],
  ["JUYwJTlGJTkyJUI4", "\u{1F4B8}"],
  ["JUYwJTlGJTkyJUI1", "\u{1F4B5}"],
  ["JUYwJTlGJTkyJUI0", "\u{1F4B4}"],
  ["JUYwJTlGJTkyJUI2", "\u{1F4B6}"],
  ["JUYwJTlGJTkyJUI3", "\u{1F4B7}"],
  ["JUYwJTlGJTkyJUIw", "\u{1F4B0}"],
  ["JUYwJTlGJTkyJUIz", "\u{1F4B3}"],
  ["JUYwJTlGJTkyJThF", "\u{1F48E}"],
  ["JUUyJTlBJTk2JUVGJUI4JThG", "\u2696\uFE0F"],
  ["JUYwJTlGJTk0JUE3", "\u{1F527}"],
  ["JUYwJTlGJTk0JUE4", "\u{1F528}"],
  ["JUUyJTlBJTky", "\u2692"],
  ["JUYwJTlGJTlCJUEw", "\u{1F6E0}"],
  ["JUUyJTlCJThG", "\u26CF"],
  ["JUYwJTlGJTk0JUE5", "\u{1F529}"],
  ["JUUyJTlBJTk5JUVGJUI4JThG", "\u2699\uFE0F"],
  ["JUUyJTlCJTkz", "\u26D3"],
  ["JUYwJTlGJTk0JUFC", "\u{1F52B}"],
  ["JUYwJTlGJTkyJUEz", "\u{1F4A3}"],
  ["JUYwJTlGJTk0JUFB", "\u{1F52A}"],
  ["JUYwJTlGJTk3JUEx", "\u{1F5E1}"],
  ["JUUyJTlBJTk0JUVGJUI4JThG", "\u2694\uFE0F"],
  ["JUYwJTlGJTlCJUEx", "\u{1F6E1}"],
  ["JUYwJTlGJTlBJUFD", "\u{1F6AC}"],
  ["JUUyJTlBJUIwJUVGJUI4JThG", "\u26B0\uFE0F"],
  ["JUUyJTlBJUIxJUVGJUI4JThG", "\u26B1\uFE0F"],
  ["JUYwJTlGJThGJUJB", "\u{1F3FA}"],
  ["JUYwJTlGJTk0JUFF", "\u{1F52E}"],
  ["JUYwJTlGJTkzJUJG", "\u{1F4FF}"],
  ["JUYwJTlGJTkyJTg4", "\u{1F488}"],
  ["JUUyJTlBJTk3JUVGJUI4JThG", "\u2697\uFE0F"],
  ["JUYwJTlGJTk0JUFE", "\u{1F52D}"],
  ["JUYwJTlGJTk0JUFD", "\u{1F52C}"],
  ["JUYwJTlGJTk1JUIz", "\u{1F573}"],
  ["JUYwJTlGJTkyJThB", "\u{1F48A}"],
  ["JUYwJTlGJTkyJTg5", "\u{1F489}"],
  ["JUYwJTlGJThDJUEx", "\u{1F321}"],
  ["JUYwJTlGJTlBJUJE", "\u{1F6BD}"],
  ["JUYwJTlGJTlBJUIw", "\u{1F6B0}"],
  ["JUYwJTlGJTlBJUJG", "\u{1F6BF}"],
  ["JUYwJTlGJTlCJTgx", "\u{1F6C1}"],
  ["JUYwJTlGJTlCJTgw", "\u{1F6C0}"],
  ["JUYwJTlGJTlCJThF", "\u{1F6CE}"],
  ["JUYwJTlGJTk0JTkx", "\u{1F511}"],
  ["JUYwJTlGJTk3JTlE", "\u{1F5DD}"],
  ["JUYwJTlGJTlBJUFB", "\u{1F6AA}"],
  ["JUYwJTlGJTlCJThC", "\u{1F6CB}"],
  ["JUYwJTlGJTlCJThG", "\u{1F6CF}"],
  ["JUYwJTlGJTlCJThD", "\u{1F6CC}"],
  ["JUYwJTlGJTk2JUJD", "\u{1F5BC}"],
  ["JUYwJTlGJTlCJThE", "\u{1F6CD}"],
  ["JUYwJTlGJTlCJTky", "\u{1F6D2}"],
  ["JUYwJTlGJThFJTgx", "\u{1F381}"],
  ["JUYwJTlGJThFJTg4", "\u{1F388}"],
  ["JUYwJTlGJThFJThG", "\u{1F38F}"],
  ["JUYwJTlGJThFJTgw", "\u{1F380}"],
  ["JUYwJTlGJThFJThB", "\u{1F38A}"],
  ["JUYwJTlGJThFJTg5", "\u{1F389}"],
  ["JUYwJTlGJThFJThF", "\u{1F38E}"],
  ["JUYwJTlGJThGJUFF", "\u{1F3EE}"],
  ["JUYwJTlGJThFJTkw", "\u{1F390}"],
  ["JUUyJTlDJTg5JUVGJUI4JThG", "\u2709\uFE0F"],
  ["JUYwJTlGJTkzJUE5", "\u{1F4E9}"],
  ["JUYwJTlGJTkzJUE4", "\u{1F4E8}"],
  ["JUYwJTlGJTkzJUE3", "\u{1F4E7}"],
  ["JUYwJTlGJTkyJThD", "\u{1F48C}"],
  ["JUYwJTlGJTkzJUE1", "\u{1F4E5}"],
  ["JUYwJTlGJTkzJUE0", "\u{1F4E4}"],
  ["JUYwJTlGJTkzJUE2", "\u{1F4E6}"],
  ["JUYwJTlGJThGJUI3", "\u{1F3F7}"],
  ["JUYwJTlGJTkzJUFB", "\u{1F4EA}"],
  ["JUYwJTlGJTkzJUFC", "\u{1F4EB}"],
  ["JUYwJTlGJTkzJUFD", "\u{1F4EC}"],
  ["JUYwJTlGJTkzJUFE", "\u{1F4ED}"],
  ["JUYwJTlGJTkzJUFF", "\u{1F4EE}"],
  ["JUYwJTlGJTkzJUFG", "\u{1F4EF}"],
  ["JUYwJTlGJTkzJTlD", "\u{1F4DC}"],
  ["JUYwJTlGJTkzJTgz", "\u{1F4C3}"],
  ["JUYwJTlGJTkzJTg0", "\u{1F4C4}"],
  ["JUYwJTlGJTkzJTkx", "\u{1F4D1}"],
  ["JUYwJTlGJTkzJThB", "\u{1F4CA}"],
  ["JUYwJTlGJTkzJTg4", "\u{1F4C8}"],
  ["JUYwJTlGJTkzJTg5", "\u{1F4C9}"],
  ["JUYwJTlGJTk3JTky", "\u{1F5D2}"],
  ["JUYwJTlGJTk3JTkz", "\u{1F5D3}"],
  ["JUYwJTlGJTkzJTg2", "\u{1F4C6}"],
  ["JUYwJTlGJTkzJTg1", "\u{1F4C5}"],
  ["JUYwJTlGJTkzJTg3", "\u{1F4C7}"],
  ["JUYwJTlGJTk3JTgz", "\u{1F5C3}"],
  ["JUYwJTlGJTk3JUIz", "\u{1F5F3}"],
  ["JUYwJTlGJTk3JTg0", "\u{1F5C4}"],
  ["JUYwJTlGJTkzJThC", "\u{1F4CB}"],
  ["JUYwJTlGJTkzJTgx", "\u{1F4C1}"],
  ["JUYwJTlGJTkzJTgy", "\u{1F4C2}"],
  ["JUYwJTlGJTk3JTgy", "\u{1F5C2}"],
  ["JUYwJTlGJTk3JTlF", "\u{1F5DE}"],
  ["JUYwJTlGJTkzJUIw", "\u{1F4F0}"],
  ["JUYwJTlGJTkzJTkz", "\u{1F4D3}"],
  ["JUYwJTlGJTkzJTk0", "\u{1F4D4}"],
  ["JUYwJTlGJTkzJTky", "\u{1F4D2}"],
  ["JUYwJTlGJTkzJTk1", "\u{1F4D5}"],
  ["JUYwJTlGJTkzJTk3", "\u{1F4D7}"],
  ["JUYwJTlGJTkzJTk4", "\u{1F4D8}"],
  ["JUYwJTlGJTkzJTk5", "\u{1F4D9}"],
  ["JUYwJTlGJTkzJTlB", "\u{1F4DA}"],
  ["JUYwJTlGJTkzJTk2", "\u{1F4D6}"],
  ["JUYwJTlGJTk0JTk2", "\u{1F516}"],
  ["JUYwJTlGJTk0JTk3", "\u{1F517}"],
  ["JUYwJTlGJTkzJThF", "\u{1F4CE}"],
  ["JUYwJTlGJTk2JTg3", "\u{1F587}"],
  ["JUYwJTlGJTkzJTkw", "\u{1F4D0}"],
  ["JUYwJTlGJTkzJThG", "\u{1F4CF}"],
  ["JUYwJTlGJTkzJThD", "\u{1F4CC}"],
  ["JUYwJTlGJTkzJThE", "\u{1F4CD}"],
  ["JUUyJTlDJTgyJUVGJUI4JThG", "\u2702\uFE0F"],
  ["JUYwJTlGJTk2JThB", "\u{1F58A}"],
  ["JUYwJTlGJTk2JThC", "\u{1F58B}"],
  ["JUUyJTlDJTkyJUVGJUI4JThG", "\u2712\uFE0F"],
  ["JUYwJTlGJTk2JThD", "\u{1F58C}"],
  ["JUYwJTlGJTk2JThE", "\u{1F58D}"],
  ["JUYwJTlGJTkzJTlE", "\u{1F4DD}"],
  ["JUUyJTlDJThGJUVGJUI4JThG", "\u270F\uFE0F"],
  ["JUYwJTlGJTk0JThE", "\u{1F50D}"],
  ["JUYwJTlGJTk0JThF", "\u{1F50E}"],
  ["JUYwJTlGJTk0JThG", "\u{1F50F}"],
  ["JUYwJTlGJTk0JTkw", "\u{1F510}"],
  ["JUYwJTlGJTk0JTky", "\u{1F512}"],
  ["JUYwJTlGJTk0JTkz", "\u{1F513}"],
  ["JUUyJTlEJUE0JUVGJUI4JThG", "\u2764\uFE0F"],
  ["JUYwJTlGJTkyJTlC", "\u{1F49B}"],
  ["JUYwJTlGJTkyJTlB", "\u{1F49A}"],
  ["JUYwJTlGJTkyJTk5", "\u{1F499}"],
  ["JUYwJTlGJTkyJTlD", "\u{1F49C}"],
  ["JUYwJTlGJTk2JUE0", "\u{1F5A4}"],
  ["JUYwJTlGJTkyJTk0", "\u{1F494}"],
  ["JUUyJTlEJUEzJUVGJUI4JThG", "\u2763\uFE0F"],
  ["JUYwJTlGJTkyJTk1", "\u{1F495}"],
  ["JUYwJTlGJTkyJTlF", "\u{1F49E}"],
  ["JUYwJTlGJTkyJTkz", "\u{1F493}"],
  ["JUYwJTlGJTkyJTk3", "\u{1F497}"],
  ["JUYwJTlGJTkyJTk2", "\u{1F496}"],
  ["JUYwJTlGJTkyJTk4", "\u{1F498}"],
  ["JUYwJTlGJTkyJTlE", "\u{1F49D}"],
  ["JUYwJTlGJTkyJTlG", "\u{1F49F}"],
  ["JUUyJTk4JUFFJUVGJUI4JThG", "\u262E\uFE0F"],
  ["JUUyJTlDJTlEJUVGJUI4JThG", "\u271D\uFE0F"],
  ["JUUyJTk4JUFBJUVGJUI4JThG", "\u262A\uFE0F"],
  ["JUYwJTlGJTk1JTg5", "\u{1F549}"],
  ["JUUyJTk4JUI4JUVGJUI4JThG", "\u2638\uFE0F"],
  ["JUUyJTlDJUExJUVGJUI4JThG", "\u2721\uFE0F"],
  ["JUYwJTlGJTk0JUFG", "\u{1F52F}"],
  ["JUYwJTlGJTk1JThF", "\u{1F54E}"],
  ["JUUyJTk4JUFGJUVGJUI4JThG", "\u262F\uFE0F"],
  ["JUUyJTk4JUE2JUVGJUI4JThG", "\u2626\uFE0F"],
  ["JUYwJTlGJTlCJTkw", "\u{1F6D0}"],
  ["JUUyJTlCJThF", "\u26CE"],
  ["JUUyJTk5JTg4JUVGJUI4JThG", "\u2648\uFE0F"],
  ["JUUyJTk5JTg5JUVGJUI4JThG", "\u2649\uFE0F"],
  ["JUUyJTk5JThBJUVGJUI4JThG", "\u264A\uFE0F"],
  ["JUUyJTk5JThCJUVGJUI4JThG", "\u264B\uFE0F"],
  ["JUUyJTk5JThDJUVGJUI4JThG", "\u264C\uFE0F"],
  ["JUUyJTk5JThEJUVGJUI4JThG", "\u264D\uFE0F"],
  ["JUUyJTk5JThFJUVGJUI4JThG", "\u264E\uFE0F"],
  ["JUUyJTk5JThGJUVGJUI4JThG", "\u264F\uFE0F"],
  ["JUUyJTk5JTkwJUVGJUI4JThG", "\u2650\uFE0F"],
  ["JUUyJTk5JTkxJUVGJUI4JThG", "\u2651\uFE0F"],
  ["JUUyJTk5JTkyJUVGJUI4JThG", "\u2652\uFE0F"],
  ["JUUyJTk5JTkzJUVGJUI4JThG", "\u2653\uFE0F"],
  ["JUYwJTlGJTg2JTk0", "\u{1F194}"],
  ["JUUyJTlBJTlCJUVGJUI4JThG", "\u269B\uFE0F"],
  ["JUYwJTlGJTg5JTkx", "\u{1F251}"],
  ["JUUyJTk4JUEyJUVGJUI4JThG", "\u2622\uFE0F"],
  ["JUUyJTk4JUEzJUVGJUI4JThG", "\u2623\uFE0F"],
  ["JUYwJTlGJTkzJUI0", "\u{1F4F4}"],
  ["JUYwJTlGJTkzJUIz", "\u{1F4F3}"],
  ["JUYwJTlGJTg4JUI2", "\u{1F236}"],
  ["JUYwJTlGJTg4JTlBJUVGJUI4JThG", "\u{1F21A}\uFE0F"],
  ["JUYwJTlGJTg4JUI4", "\u{1F238}"],
  ["JUYwJTlGJTg4JUJB", "\u{1F23A}"],
  ["JUYwJTlGJTg4JUI3JUVGJUI4JThG", "\u{1F237}\uFE0F"],
  ["JUUyJTlDJUI0JUVGJUI4JThG", "\u2734\uFE0F"],
  ["JUYwJTlGJTg2JTlB", "\u{1F19A}"],
  ["JUYwJTlGJTkyJUFF", "\u{1F4AE}"],
  ["JUYwJTlGJTg5JTkw", "\u{1F250}"],
  ["JUUzJThBJTk5JUVGJUI4JThG", "\u3299\uFE0F"],
  ["JUUzJThBJTk3JUVGJUI4JThG", "\u3297\uFE0F"],
  ["JUYwJTlGJTg4JUI0", "\u{1F234}"],
  ["JUYwJTlGJTg4JUI1", "\u{1F235}"],
  ["JUYwJTlGJTg4JUI5", "\u{1F239}"],
  ["JUYwJTlGJTg4JUIy", "\u{1F232}"],
  ["JUYwJTlGJTg1JUIwJUVGJUI4JThG", "\u{1F170}\uFE0F"],
  ["JUYwJTlGJTg1JUIxJUVGJUI4JThG", "\u{1F171}\uFE0F"],
  ["JUYwJTlGJTg2JThF", "\u{1F18E}"],
  ["JUYwJTlGJTg2JTkx", "\u{1F191}"],
  ["JUYwJTlGJTg1JUJFJUVGJUI4JThG", "\u{1F17E}\uFE0F"],
  ["JUYwJTlGJTg2JTk4", "\u{1F198}"],
  ["JUUyJTlEJThD", "\u274C"],
  ["JUUyJUFEJTk1JUVGJUI4JThG", "\u2B55\uFE0F"],
  ["JUYwJTlGJTlCJTkx", "\u{1F6D1}"],
  ["JUUyJTlCJTk0JUVGJUI4JThG", "\u26D4\uFE0F"],
  ["JUYwJTlGJTkzJTlC", "\u{1F4DB}"],
  ["JUYwJTlGJTlBJUFC", "\u{1F6AB}"],
  ["JUYwJTlGJTkyJUFG", "\u{1F4AF}"],
  ["JUYwJTlGJTkyJUEy", "\u{1F4A2}"],
  ["JUUyJTk5JUE4JUVGJUI4JThG", "\u2668\uFE0F"],
  ["JUYwJTlGJTlBJUI3", "\u{1F6B7}"],
  ["JUYwJTlGJTlBJUFG", "\u{1F6AF}"],
  ["JUYwJTlGJTlBJUIz", "\u{1F6B3}"],
  ["JUYwJTlGJTlBJUIx", "\u{1F6B1}"],
  ["JUYwJTlGJTk0JTlF", "\u{1F51E}"],
  ["JUYwJTlGJTkzJUI1", "\u{1F4F5}"],
  ["JUYwJTlGJTlBJUFE", "\u{1F6AD}"],
  ["JUUyJTlEJTk3JUVGJUI4JThG", "\u2757\uFE0F"],
  ["JUUyJTlEJTk1", "\u2755"],
  ["JUUyJTlEJTkz", "\u2753"],
  ["JUUyJTlEJTk0", "\u2754"],
  ["JUUyJTgwJUJDJUVGJUI4JThG", "\u203C\uFE0F"],
  ["JUUyJTgxJTg5JUVGJUI4JThG", "\u2049\uFE0F"],
  ["JUYwJTlGJTk0JTg1", "\u{1F505}"],
  ["JUYwJTlGJTk0JTg2", "\u{1F506}"],
  ["JUUzJTgwJUJEJUVGJUI4JThG", "\u303D\uFE0F"],
  ["JUUyJTlBJUEwJUVGJUI4JThG", "\u26A0\uFE0F"],
  ["JUYwJTlGJTlBJUI4", "\u{1F6B8}"],
  ["JUYwJTlGJTk0JUIx", "\u{1F531}"],
  ["JUUyJTlBJTlDJUVGJUI4JThG", "\u269C\uFE0F"],
  ["JUYwJTlGJTk0JUIw", "\u{1F530}"],
  ["JUUyJTk5JUJCJUVGJUI4JThG", "\u267B\uFE0F"],
  ["JUUyJTlDJTg1", "\u2705"],
  ["JUYwJTlGJTg4JUFGJUVGJUI4JThG", "\u{1F22F}\uFE0F"],
  ["JUYwJTlGJTkyJUI5", "\u{1F4B9}"],
  ["JUUyJTlEJTg3JUVGJUI4JThG", "\u2747\uFE0F"],
  ["JUUyJTlDJUIzJUVGJUI4JThG", "\u2733\uFE0F"],
  ["JUUyJTlEJThF", "\u274E"],
  ["JUYwJTlGJThDJTkw", "\u{1F310}"],
  ["JUYwJTlGJTkyJUEw", "\u{1F4A0}"],
  ["JUUyJTkzJTgyJUVGJUI4JThG", "\u24C2\uFE0F"],
  ["JUYwJTlGJThDJTgw", "\u{1F300}"],
  ["JUYwJTlGJTkyJUE0", "\u{1F4A4}"],
  ["JUYwJTlGJThGJUE3", "\u{1F3E7}"],
  ["JUYwJTlGJTlBJUJF", "\u{1F6BE}"],
  ["JUUyJTk5JUJGJUVGJUI4JThG", "\u267F\uFE0F"],
  ["JUYwJTlGJTg1JUJGJUVGJUI4JThG", "\u{1F17F}\uFE0F"],
  ["JUYwJTlGJTg4JUIz", "\u{1F233}"],
  ["JUYwJTlGJTg4JTgyJUVGJUI4JThG", "\u{1F202}\uFE0F"],
  ["JUYwJTlGJTlCJTgy", "\u{1F6C2}"],
  ["JUYwJTlGJTlCJTgz", "\u{1F6C3}"],
  ["JUYwJTlGJTlCJTg0", "\u{1F6C4}"],
  ["JUYwJTlGJTlCJTg1", "\u{1F6C5}"],
  ["JUYwJTlGJTlBJUI5", "\u{1F6B9}"],
  ["JUYwJTlGJTlBJUJB", "\u{1F6BA}"],
  ["JUYwJTlGJTlBJUJD", "\u{1F6BC}"],
  ["JUYwJTlGJTlBJUJC", "\u{1F6BB}"],
  ["JUYwJTlGJTlBJUFF", "\u{1F6AE}"],
  ["JUYwJTlGJThFJUE2", "\u{1F3A6}"],
  ["JUYwJTlGJTkzJUI2", "\u{1F4F6}"],
  ["JUYwJTlGJTg4JTgx", "\u{1F201}"],
  ["JUYwJTlGJTk0JUEz", "\u{1F523}"],
  ["JUUyJTg0JUI5JUVGJUI4JThG", "\u2139\uFE0F"],
  ["JUYwJTlGJTk0JUE0", "\u{1F524}"],
  ["JUYwJTlGJTk0JUEx", "\u{1F521}"],
  ["JUYwJTlGJTk0JUEw", "\u{1F520}"],
  ["JUYwJTlGJTg2JTk2", "\u{1F196}"],
  ["JUYwJTlGJTg2JTk3", "\u{1F197}"],
  ["JUYwJTlGJTg2JTk5", "\u{1F199}"],
  ["JUYwJTlGJTg2JTky", "\u{1F192}"],
  ["JUYwJTlGJTg2JTk1", "\u{1F195}"],
  ["JUYwJTlGJTg2JTkz", "\u{1F193}"],
  ["MCVFRiVCOCU4RiVFMiU4MyVBMw==", "0\uFE0F\u20E3"],
  ["MSVFRiVCOCU4RiVFMiU4MyVBMw==", "1\uFE0F\u20E3"],
  ["MiVFRiVCOCU4RiVFMiU4MyVBMw==", "2\uFE0F\u20E3"],
  ["MyVFRiVCOCU4RiVFMiU4MyVBMw==", "3\uFE0F\u20E3"],
  ["NCVFRiVCOCU4RiVFMiU4MyVBMw==", "4\uFE0F\u20E3"],
  ["NSVFRiVCOCU4RiVFMiU4MyVBMw==", "5\uFE0F\u20E3"],
  ["NiVFRiVCOCU4RiVFMiU4MyVBMw==", "6\uFE0F\u20E3"],
  ["NyVFRiVCOCU4RiVFMiU4MyVBMw==", "7\uFE0F\u20E3"],
  ["OCVFRiVCOCU4RiVFMiU4MyVBMw==", "8\uFE0F\u20E3"],
  ["OSVFRiVCOCU4RiVFMiU4MyVBMw==", "9\uFE0F\u20E3"],
  ["JUYwJTlGJTk0JTlG", "\u{1F51F}"],
  ["JUYwJTlGJTk0JUEy", "\u{1F522}"],
  ["JTIzJUVGJUI4JThGJUUyJTgzJUEz", "#\uFE0F\u20E3"],
  ["KiVFRiVCOCU4RiVFMiU4MyVBMw==", "*\uFE0F\u20E3"],
  ["JUUyJTk2JUI2JUVGJUI4JThG", "\u25B6\uFE0F"],
  ["JUUyJThGJUI4", "\u23F8"],
  ["JUUyJThGJUFG", "\u23EF"],
  ["JUUyJThGJUI5", "\u23F9"],
  ["JUUyJThGJUJB", "\u23FA"],
  ["JUUyJThGJUFE", "\u23ED"],
  ["JUUyJThGJUFF", "\u23EE"],
  ["JUUyJThGJUE5", "\u23E9"],
  ["JUUyJThGJUFB", "\u23EA"],
  ["JUUyJThGJUFC", "\u23EB"],
  ["JUUyJThGJUFD", "\u23EC"],
  ["JUUyJTk3JTgwJUVGJUI4JThG", "\u25C0\uFE0F"],
  ["JUYwJTlGJTk0JUJD", "\u{1F53C}"],
  ["JUYwJTlGJTk0JUJE", "\u{1F53D}"],
  ["JUUyJTlFJUExJUVGJUI4JThG", "\u27A1\uFE0F"],
  ["JUUyJUFDJTg1JUVGJUI4JThG", "\u2B05\uFE0F"],
  ["JUUyJUFDJTg2JUVGJUI4JThG", "\u2B06\uFE0F"],
  ["JUUyJUFDJTg3JUVGJUI4JThG", "\u2B07\uFE0F"],
  ["JUUyJTg2JTk3JUVGJUI4JThG", "\u2197\uFE0F"],
  ["JUUyJTg2JTk4JUVGJUI4JThG", "\u2198\uFE0F"],
  ["JUUyJTg2JTk5JUVGJUI4JThG", "\u2199\uFE0F"],
  ["JUUyJTg2JTk2JUVGJUI4JThG", "\u2196\uFE0F"],
  ["JUUyJTg2JTk1JUVGJUI4JThG", "\u2195\uFE0F"],
  ["JUUyJTg2JTk0JUVGJUI4JThG", "\u2194\uFE0F"],
  ["JUUyJTg2JUFBJUVGJUI4JThG", "\u21AA\uFE0F"],
  ["JUUyJTg2JUE5JUVGJUI4JThG", "\u21A9\uFE0F"],
  ["JUUyJUE0JUI0JUVGJUI4JThG", "\u2934\uFE0F"],
  ["JUUyJUE0JUI1JUVGJUI4JThG", "\u2935\uFE0F"],
  ["JUYwJTlGJTk0JTgw", "\u{1F500}"],
  ["JUYwJTlGJTk0JTgx", "\u{1F501}"],
  ["JUYwJTlGJTk0JTgy", "\u{1F502}"],
  ["JUYwJTlGJTk0JTg0", "\u{1F504}"],
  ["JUYwJTlGJTk0JTgz", "\u{1F503}"],
  ["JUYwJTlGJThFJUI1", "\u{1F3B5}"],
  ["JUYwJTlGJThFJUI2", "\u{1F3B6}"],
  ["JUUyJTlFJTk1", "\u2795"],
  ["JUUyJTlFJTk2", "\u2796"],
  ["JUUyJTlFJTk3", "\u2797"],
  ["JUUyJTlDJTk2JUVGJUI4JThG", "\u2716\uFE0F"],
  ["JUYwJTlGJTkyJUIy", "\u{1F4B2}"],
  ["JUYwJTlGJTkyJUIx", "\u{1F4B1}"],
  ["JUUyJTg0JUEyJUVGJUI4JThG", "\u2122\uFE0F"],
  ["JUMyJUE5JUVGJUI4JThG", "\xA9\uFE0F"],
  ["JUMyJUFFJUVGJUI4JThG", "\xAE\uFE0F"],
  ["JUUzJTgwJUIwJUVGJUI4JThG", "\u3030\uFE0F"],
  ["JUUyJTlFJUIw", "\u27B0"],
  ["JUUyJTlFJUJG", "\u27BF"],
  ["JUYwJTlGJTk0JTlB", "\u{1F51A}"],
  ["JUYwJTlGJTk0JTk5", "\u{1F519}"],
  ["JUYwJTlGJTk0JTlC", "\u{1F51B}"],
  ["JUYwJTlGJTk0JTlE", "\u{1F51D}"],
  ["JUYwJTlGJTk0JTlD", "\u{1F51C}"],
  ["JUUyJTlDJTk0JUVGJUI4JThG", "\u2714\uFE0F"],
  ["JUUyJTk4JTkxJUVGJUI4JThG", "\u2611\uFE0F"],
  ["JUYwJTlGJTk0JTk4", "\u{1F518}"],
  ["JUUyJTlBJUFBJUVGJUI4JThG", "\u26AA\uFE0F"],
  ["JUUyJTlBJUFCJUVGJUI4JThG", "\u26AB\uFE0F"],
  ["JUYwJTlGJTk0JUI0", "\u{1F534}"],
  ["JUYwJTlGJTk0JUI1", "\u{1F535}"],
  ["JUYwJTlGJTk0JUJB", "\u{1F53A}"],
  ["JUYwJTlGJTk0JUJC", "\u{1F53B}"],
  ["JUYwJTlGJTk0JUI4", "\u{1F538}"],
  ["JUYwJTlGJTk0JUI5", "\u{1F539}"],
  ["JUYwJTlGJTk0JUI2", "\u{1F536}"],
  ["JUYwJTlGJTk0JUI3", "\u{1F537}"],
  ["JUYwJTlGJTk0JUIz", "\u{1F533}"],
  ["JUYwJTlGJTk0JUIy", "\u{1F532}"],
  ["JUUyJTk2JUFBJUVGJUI4JThG", "\u25AA\uFE0F"],
  ["JUUyJTk2JUFCJUVGJUI4JThG", "\u25AB\uFE0F"],
  ["JUUyJTk3JUJFJUVGJUI4JThG", "\u25FE\uFE0F"],
  ["JUUyJTk3JUJEJUVGJUI4JThG", "\u25FD\uFE0F"],
  ["JUUyJTk3JUJDJUVGJUI4JThG", "\u25FC\uFE0F"],
  ["JUUyJTk3JUJCJUVGJUI4JThG", "\u25FB\uFE0F"],
  ["JUUyJUFDJTlCJUVGJUI4JThG", "\u2B1B\uFE0F"],
  ["JUUyJUFDJTlDJUVGJUI4JThG", "\u2B1C\uFE0F"],
  ["JUYwJTlGJTk0JTg4", "\u{1F508}"],
  ["JUYwJTlGJTk0JTg3", "\u{1F507}"],
  ["JUYwJTlGJTk0JTg5", "\u{1F509}"],
  ["JUYwJTlGJTk0JThB", "\u{1F50A}"],
  ["JUYwJTlGJTk0JTk0", "\u{1F514}"],
  ["JUYwJTlGJTk0JTk1", "\u{1F515}"],
  ["JUYwJTlGJTkzJUEz", "\u{1F4E3}"],
  ["JUYwJTlGJTkzJUEy", "\u{1F4E2}"],
  ["JUYwJTlGJTkxJTgxJUUyJTgwJThEJUYwJTlGJTk3JUE4", "\u{1F441}\u200D\u{1F5E8}"],
  ["JUYwJTlGJTkyJUFD", "\u{1F4AC}"],
  ["JUYwJTlGJTkyJUFE", "\u{1F4AD}"],
  ["JUYwJTlGJTk3JUFG", "\u{1F5EF}"],
  ["JUUyJTk5JUEwJUVGJUI4JThG", "\u2660\uFE0F"],
  ["JUUyJTk5JUEzJUVGJUI4JThG", "\u2663\uFE0F"],
  ["JUUyJTk5JUE1JUVGJUI4JThG", "\u2665\uFE0F"],
  ["JUUyJTk5JUE2JUVGJUI4JThG", "\u2666\uFE0F"],
  ["JUYwJTlGJTgzJThG", "\u{1F0CF}"],
  ["JUYwJTlGJThFJUI0", "\u{1F3B4}"],
  ["JUYwJTlGJTgwJTg0JUVGJUI4JThG", "\u{1F004}\uFE0F"],
  ["JUYwJTlGJTk1JTkw", "\u{1F550}"],
  ["JUYwJTlGJTk1JTkx", "\u{1F551}"],
  ["JUYwJTlGJTk1JTky", "\u{1F552}"],
  ["JUYwJTlGJTk1JTkz", "\u{1F553}"],
  ["JUYwJTlGJTk1JTk0", "\u{1F554}"],
  ["JUYwJTlGJTk1JTk1", "\u{1F555}"],
  ["JUYwJTlGJTk1JTk2", "\u{1F556}"],
  ["JUYwJTlGJTk1JTk3", "\u{1F557}"],
  ["JUYwJTlGJTk1JTk4", "\u{1F558}"],
  ["JUYwJTlGJTk1JTk5", "\u{1F559}"],
  ["JUYwJTlGJTk1JTlB", "\u{1F55A}"],
  ["JUYwJTlGJTk1JTlC", "\u{1F55B}"],
  ["JUYwJTlGJTk1JTlD", "\u{1F55C}"],
  ["JUYwJTlGJTk1JTlE", "\u{1F55D}"],
  ["JUYwJTlGJTk1JTlF", "\u{1F55E}"],
  ["JUYwJTlGJTk1JTlG", "\u{1F55F}"],
  ["JUYwJTlGJTk1JUEw", "\u{1F560}"],
  ["JUYwJTlGJTk1JUEx", "\u{1F561}"],
  ["JUYwJTlGJTk1JUEy", "\u{1F562}"],
  ["JUYwJTlGJTk1JUEz", "\u{1F563}"],
  ["JUYwJTlGJTk1JUE0", "\u{1F564}"],
  ["JUYwJTlGJTk1JUE1", "\u{1F565}"],
  ["JUYwJTlGJTk1JUE2", "\u{1F566}"],
  ["JUYwJTlGJTk1JUE3", "\u{1F567}"],
  ["JUYwJTlGJThGJUIzJUVGJUI4JThG", "\u{1F3F3}\uFE0F"],
  ["JUYwJTlGJThGJUI0", "\u{1F3F4}"],
  ["JUYwJTlGJThGJTgx", "\u{1F3C1}"],
  ["JUYwJTlGJTlBJUE5", "\u{1F6A9}"],
  ["JUYwJTlGJThGJUIzJUVGJUI4JThGJUUyJTgwJThEJUYwJTlGJThDJTg4", "\u{1F3F3}\uFE0F\u200D\u{1F308}"],
  ["JUYwJTlGJTg3JUE2JUYwJTlGJTg3JUFC", "\u{1F1E6}\u{1F1EB}"],
  ["JUYwJTlGJTg3JUE2JUYwJTlGJTg3JUJE", "\u{1F1E6}\u{1F1FD}"],
  ["JUYwJTlGJTg3JUE2JUYwJTlGJTg3JUIx", "\u{1F1E6}\u{1F1F1}"],
  ["JUYwJTlGJTg3JUE5JUYwJTlGJTg3JUJG", "\u{1F1E9}\u{1F1FF}"],
  ["JUYwJTlGJTg3JUE2JUYwJTlGJTg3JUI4", "\u{1F1E6}\u{1F1F8}"],
  ["JUYwJTlGJTg3JUE2JUYwJTlGJTg3JUE5", "\u{1F1E6}\u{1F1E9}"],
  ["JUYwJTlGJTg3JUE2JUYwJTlGJTg3JUI0", "\u{1F1E6}\u{1F1F4}"],
  ["JUYwJTlGJTg3JUE2JUYwJTlGJTg3JUFF", "\u{1F1E6}\u{1F1EE}"],
  ["JUYwJTlGJTg3JUE2JUYwJTlGJTg3JUI2", "\u{1F1E6}\u{1F1F6}"],
  ["JUYwJTlGJTg3JUE2JUYwJTlGJTg3JUFD", "\u{1F1E6}\u{1F1EC}"],
  ["JUYwJTlGJTg3JUE2JUYwJTlGJTg3JUI3", "\u{1F1E6}\u{1F1F7}"],
  ["JUYwJTlGJTg3JUE2JUYwJTlGJTg3JUIy", "\u{1F1E6}\u{1F1F2}"],
  ["JUYwJTlGJTg3JUE2JUYwJTlGJTg3JUJD", "\u{1F1E6}\u{1F1FC}"],
  ["JUYwJTlGJTg3JUE2JUYwJTlGJTg3JUJB", "\u{1F1E6}\u{1F1FA}"],
  ["JUYwJTlGJTg3JUE2JUYwJTlGJTg3JUI5", "\u{1F1E6}\u{1F1F9}"],
  ["JUYwJTlGJTg3JUE2JUYwJTlGJTg3JUJG", "\u{1F1E6}\u{1F1FF}"],
  ["JUYwJTlGJTg3JUE3JUYwJTlGJTg3JUI4", "\u{1F1E7}\u{1F1F8}"],
  ["JUYwJTlGJTg3JUE3JUYwJTlGJTg3JUFE", "\u{1F1E7}\u{1F1ED}"],
  ["JUYwJTlGJTg3JUE3JUYwJTlGJTg3JUE5", "\u{1F1E7}\u{1F1E9}"],
  ["JUYwJTlGJTg3JUE3JUYwJTlGJTg3JUE3", "\u{1F1E7}\u{1F1E7}"],
  ["JUYwJTlGJTg3JUE3JUYwJTlGJTg3JUJF", "\u{1F1E7}\u{1F1FE}"],
  ["JUYwJTlGJTg3JUE3JUYwJTlGJTg3JUFB", "\u{1F1E7}\u{1F1EA}"],
  ["JUYwJTlGJTg3JUE3JUYwJTlGJTg3JUJG", "\u{1F1E7}\u{1F1FF}"],
  ["JUYwJTlGJTg3JUE3JUYwJTlGJTg3JUFG", "\u{1F1E7}\u{1F1EF}"],
  ["JUYwJTlGJTg3JUE3JUYwJTlGJTg3JUIy", "\u{1F1E7}\u{1F1F2}"],
  ["JUYwJTlGJTg3JUE3JUYwJTlGJTg3JUI5", "\u{1F1E7}\u{1F1F9}"],
  ["JUYwJTlGJTg3JUE3JUYwJTlGJTg3JUI0", "\u{1F1E7}\u{1F1F4}"],
  ["JUYwJTlGJTg3JUE3JUYwJTlGJTg3JUI2", "\u{1F1E7}\u{1F1F6}"],
  ["JUYwJTlGJTg3JUE3JUYwJTlGJTg3JUE2", "\u{1F1E7}\u{1F1E6}"],
  ["JUYwJTlGJTg3JUE3JUYwJTlGJTg3JUJD", "\u{1F1E7}\u{1F1FC}"],
  ["JUYwJTlGJTg3JUE3JUYwJTlGJTg3JUI3", "\u{1F1E7}\u{1F1F7}"],
  ["JUYwJTlGJTg3JUFFJUYwJTlGJTg3JUI0", "\u{1F1EE}\u{1F1F4}"],
  ["JUYwJTlGJTg3JUJCJUYwJTlGJTg3JUFD", "\u{1F1FB}\u{1F1EC}"],
  ["JUYwJTlGJTg3JUE3JUYwJTlGJTg3JUIz", "\u{1F1E7}\u{1F1F3}"],
  ["JUYwJTlGJTg3JUE3JUYwJTlGJTg3JUFD", "\u{1F1E7}\u{1F1EC}"],
  ["JUYwJTlGJTg3JUE3JUYwJTlGJTg3JUFC", "\u{1F1E7}\u{1F1EB}"],
  ["JUYwJTlGJTg3JUE3JUYwJTlGJTg3JUFF", "\u{1F1E7}\u{1F1EE}"],
  ["JUYwJTlGJTg3JUE4JUYwJTlGJTg3JUJC", "\u{1F1E8}\u{1F1FB}"],
  ["JUYwJTlGJTg3JUIwJUYwJTlGJTg3JUFE", "\u{1F1F0}\u{1F1ED}"],
  ["JUYwJTlGJTg3JUE4JUYwJTlGJTg3JUIy", "\u{1F1E8}\u{1F1F2}"],
  ["JUYwJTlGJTg3JUE4JUYwJTlGJTg3JUE2", "\u{1F1E8}\u{1F1E6}"],
  ["JUYwJTlGJTg3JUFFJUYwJTlGJTg3JUE4", "\u{1F1EE}\u{1F1E8}"],
  ["JUYwJTlGJTg3JUIwJUYwJTlGJTg3JUJF", "\u{1F1F0}\u{1F1FE}"],
  ["JUYwJTlGJTg3JUE4JUYwJTlGJTg3JUFC", "\u{1F1E8}\u{1F1EB}"],
  ["JUYwJTlGJTg3JUI5JUYwJTlGJTg3JUE5", "\u{1F1F9}\u{1F1E9}"],
  ["JUYwJTlGJTg3JUE4JUYwJTlGJTg3JUIx", "\u{1F1E8}\u{1F1F1}"],
  ["JUYwJTlGJTg3JUE4JUYwJTlGJTg3JUIz", "\u{1F1E8}\u{1F1F3}"],
  ["JUYwJTlGJTg3JUE4JUYwJTlGJTg3JUJE", "\u{1F1E8}\u{1F1FD}"],
  ["JUYwJTlGJTg3JUE4JUYwJTlGJTg3JUE4", "\u{1F1E8}\u{1F1E8}"],
  ["JUYwJTlGJTg3JUE4JUYwJTlGJTg3JUI0", "\u{1F1E8}\u{1F1F4}"],
  ["JUYwJTlGJTg3JUIwJUYwJTlGJTg3JUIy", "\u{1F1F0}\u{1F1F2}"],
  ["JUYwJTlGJTg3JUE4JUYwJTlGJTg3JUFD", "\u{1F1E8}\u{1F1EC}"],
  ["JUYwJTlGJTg3JUE4JUYwJTlGJTg3JUE5", "\u{1F1E8}\u{1F1E9}"],
  ["JUYwJTlGJTg3JUE4JUYwJTlGJTg3JUIw", "\u{1F1E8}\u{1F1F0}"],
  ["JUYwJTlGJTg3JUE4JUYwJTlGJTg3JUI3", "\u{1F1E8}\u{1F1F7}"],
  ["JUYwJTlGJTg3JUE4JUYwJTlGJTg3JUFF", "\u{1F1E8}\u{1F1EE}"],
  ["JUYwJTlGJTg3JUFEJUYwJTlGJTg3JUI3", "\u{1F1ED}\u{1F1F7}"],
  ["JUYwJTlGJTg3JUE4JUYwJTlGJTg3JUJB", "\u{1F1E8}\u{1F1FA}"],
  ["JUYwJTlGJTg3JUE4JUYwJTlGJTg3JUJD", "\u{1F1E8}\u{1F1FC}"],
  ["JUYwJTlGJTg3JUE4JUYwJTlGJTg3JUJF", "\u{1F1E8}\u{1F1FE}"],
  ["JUYwJTlGJTg3JUE4JUYwJTlGJTg3JUJG", "\u{1F1E8}\u{1F1FF}"],
  ["JUYwJTlGJTg3JUE5JUYwJTlGJTg3JUIw", "\u{1F1E9}\u{1F1F0}"],
  ["JUYwJTlGJTg3JUE5JUYwJTlGJTg3JUFG", "\u{1F1E9}\u{1F1EF}"],
  ["JUYwJTlGJTg3JUE5JUYwJTlGJTg3JUIy", "\u{1F1E9}\u{1F1F2}"],
  ["JUYwJTlGJTg3JUE5JUYwJTlGJTg3JUI0", "\u{1F1E9}\u{1F1F4}"],
  ["JUYwJTlGJTg3JUFBJUYwJTlGJTg3JUE4", "\u{1F1EA}\u{1F1E8}"],
  ["JUYwJTlGJTg3JUFBJUYwJTlGJTg3JUFD", "\u{1F1EA}\u{1F1EC}"],
  ["JUYwJTlGJTg3JUI4JUYwJTlGJTg3JUJC", "\u{1F1F8}\u{1F1FB}"],
  ["JUYwJTlGJTg3JUFDJUYwJTlGJTg3JUI2", "\u{1F1EC}\u{1F1F6}"],
  ["JUYwJTlGJTg3JUFBJUYwJTlGJTg3JUI3", "\u{1F1EA}\u{1F1F7}"],
  ["JUYwJTlGJTg3JUFBJUYwJTlGJTg3JUFB", "\u{1F1EA}\u{1F1EA}"],
  ["JUYwJTlGJTg3JUFBJUYwJTlGJTg3JUI5", "\u{1F1EA}\u{1F1F9}"],
  ["JUYwJTlGJTg3JUFBJUYwJTlGJTg3JUJB", "\u{1F1EA}\u{1F1FA}"],
  ["JUYwJTlGJTg3JUFCJUYwJTlGJTg3JUIw", "\u{1F1EB}\u{1F1F0}"],
  ["JUYwJTlGJTg3JUFCJUYwJTlGJTg3JUI0", "\u{1F1EB}\u{1F1F4}"],
  ["JUYwJTlGJTg3JUFCJUYwJTlGJTg3JUFG", "\u{1F1EB}\u{1F1EF}"],
  ["JUYwJTlGJTg3JUFCJUYwJTlGJTg3JUFF", "\u{1F1EB}\u{1F1EE}"],
  ["JUYwJTlGJTg3JUFCJUYwJTlGJTg3JUI3", "\u{1F1EB}\u{1F1F7}"],
  ["JUYwJTlGJTg3JUFDJUYwJTlGJTg3JUFC", "\u{1F1EC}\u{1F1EB}"],
  ["JUYwJTlGJTg3JUI1JUYwJTlGJTg3JUFC", "\u{1F1F5}\u{1F1EB}"],
  ["JUYwJTlGJTg3JUI5JUYwJTlGJTg3JUFC", "\u{1F1F9}\u{1F1EB}"],
  ["JUYwJTlGJTg3JUFDJUYwJTlGJTg3JUE2", "\u{1F1EC}\u{1F1E6}"],
  ["JUYwJTlGJTg3JUFDJUYwJTlGJTg3JUIy", "\u{1F1EC}\u{1F1F2}"],
  ["JUYwJTlGJTg3JUFDJUYwJTlGJTg3JUFB", "\u{1F1EC}\u{1F1EA}"],
  ["JUYwJTlGJTg3JUE5JUYwJTlGJTg3JUFB", "\u{1F1E9}\u{1F1EA}"],
  ["JUYwJTlGJTg3JUFDJUYwJTlGJTg3JUFE", "\u{1F1EC}\u{1F1ED}"],
  ["JUYwJTlGJTg3JUFDJUYwJTlGJTg3JUFF", "\u{1F1EC}\u{1F1EE}"],
  ["JUYwJTlGJTg3JUFDJUYwJTlGJTg3JUI3", "\u{1F1EC}\u{1F1F7}"],
  ["JUYwJTlGJTg3JUFDJUYwJTlGJTg3JUIx", "\u{1F1EC}\u{1F1F1}"],
  ["JUYwJTlGJTg3JUFDJUYwJTlGJTg3JUE5", "\u{1F1EC}\u{1F1E9}"],
  ["JUYwJTlGJTg3JUFDJUYwJTlGJTg3JUI1", "\u{1F1EC}\u{1F1F5}"],
  ["JUYwJTlGJTg3JUFDJUYwJTlGJTg3JUJB", "\u{1F1EC}\u{1F1FA}"],
  ["JUYwJTlGJTg3JUFDJUYwJTlGJTg3JUI5", "\u{1F1EC}\u{1F1F9}"],
  ["JUYwJTlGJTg3JUFDJUYwJTlGJTg3JUFD", "\u{1F1EC}\u{1F1EC}"],
  ["JUYwJTlGJTg3JUFDJUYwJTlGJTg3JUIz", "\u{1F1EC}\u{1F1F3}"],
  ["JUYwJTlGJTg3JUFDJUYwJTlGJTg3JUJD", "\u{1F1EC}\u{1F1FC}"],
  ["JUYwJTlGJTg3JUFDJUYwJTlGJTg3JUJF", "\u{1F1EC}\u{1F1FE}"],
  ["JUYwJTlGJTg3JUFEJUYwJTlGJTg3JUI5", "\u{1F1ED}\u{1F1F9}"],
  ["JUYwJTlGJTg3JUFEJUYwJTlGJTg3JUIz", "\u{1F1ED}\u{1F1F3}"],
  ["JUYwJTlGJTg3JUFEJUYwJTlGJTg3JUIw", "\u{1F1ED}\u{1F1F0}"],
  ["JUYwJTlGJTg3JUFEJUYwJTlGJTg3JUJB", "\u{1F1ED}\u{1F1FA}"],
  ["JUYwJTlGJTg3JUFFJUYwJTlGJTg3JUI4", "\u{1F1EE}\u{1F1F8}"],
  ["JUYwJTlGJTg3JUFFJUYwJTlGJTg3JUIz", "\u{1F1EE}\u{1F1F3}"],
  ["JUYwJTlGJTg3JUFFJUYwJTlGJTg3JUE5", "\u{1F1EE}\u{1F1E9}"],
  ["JUYwJTlGJTg3JUFFJUYwJTlGJTg3JUI3", "\u{1F1EE}\u{1F1F7}"],
  ["JUYwJTlGJTg3JUFFJUYwJTlGJTg3JUI2", "\u{1F1EE}\u{1F1F6}"],
  ["JUYwJTlGJTg3JUFFJUYwJTlGJTg3JUFB", "\u{1F1EE}\u{1F1EA}"],
  ["JUYwJTlGJTg3JUFFJUYwJTlGJTg3JUIy", "\u{1F1EE}\u{1F1F2}"],
  ["JUYwJTlGJTg3JUFFJUYwJTlGJTg3JUIx", "\u{1F1EE}\u{1F1F1}"],
  ["JUYwJTlGJTg3JUFFJUYwJTlGJTg3JUI5", "\u{1F1EE}\u{1F1F9}"],
  ["JUYwJTlGJTg3JUFGJUYwJTlGJTg3JUIy", "\u{1F1EF}\u{1F1F2}"],
  ["JUYwJTlGJTg3JUFGJUYwJTlGJTg3JUI1", "\u{1F1EF}\u{1F1F5}"],
  ["JUYwJTlGJThFJThD", "\u{1F38C}"],
  ["JUYwJTlGJTg3JUFGJUYwJTlGJTg3JUFB", "\u{1F1EF}\u{1F1EA}"],
  ["JUYwJTlGJTg3JUFGJUYwJTlGJTg3JUI0", "\u{1F1EF}\u{1F1F4}"],
  ["JUYwJTlGJTg3JUIwJUYwJTlGJTg3JUJG", "\u{1F1F0}\u{1F1FF}"],
  ["JUYwJTlGJTg3JUIwJUYwJTlGJTg3JUFB", "\u{1F1F0}\u{1F1EA}"],
  ["JUYwJTlGJTg3JUIwJUYwJTlGJTg3JUFF", "\u{1F1F0}\u{1F1EE}"],
  ["JUYwJTlGJTg3JUJEJUYwJTlGJTg3JUIw", "\u{1F1FD}\u{1F1F0}"],
  ["JUYwJTlGJTg3JUIwJUYwJTlGJTg3JUJD", "\u{1F1F0}\u{1F1FC}"],
  ["JUYwJTlGJTg3JUIwJUYwJTlGJTg3JUFD", "\u{1F1F0}\u{1F1EC}"],
  ["JUYwJTlGJTg3JUIxJUYwJTlGJTg3JUE2", "\u{1F1F1}\u{1F1E6}"],
  ["JUYwJTlGJTg3JUIxJUYwJTlGJTg3JUJC", "\u{1F1F1}\u{1F1FB}"],
  ["JUYwJTlGJTg3JUIxJUYwJTlGJTg3JUE3", "\u{1F1F1}\u{1F1E7}"],
  ["JUYwJTlGJTg3JUIxJUYwJTlGJTg3JUI4", "\u{1F1F1}\u{1F1F8}"],
  ["JUYwJTlGJTg3JUIxJUYwJTlGJTg3JUI3", "\u{1F1F1}\u{1F1F7}"],
  ["JUYwJTlGJTg3JUIxJUYwJTlGJTg3JUJF", "\u{1F1F1}\u{1F1FE}"],
  ["JUYwJTlGJTg3JUIxJUYwJTlGJTg3JUFF", "\u{1F1F1}\u{1F1EE}"],
  ["JUYwJTlGJTg3JUIxJUYwJTlGJTg3JUI5", "\u{1F1F1}\u{1F1F9}"],
  ["JUYwJTlGJTg3JUIxJUYwJTlGJTg3JUJB", "\u{1F1F1}\u{1F1FA}"],
  ["JUYwJTlGJTg3JUIyJUYwJTlGJTg3JUI0", "\u{1F1F2}\u{1F1F4}"],
  ["JUYwJTlGJTg3JUIyJUYwJTlGJTg3JUIw", "\u{1F1F2}\u{1F1F0}"],
  ["JUYwJTlGJTg3JUIyJUYwJTlGJTg3JUFD", "\u{1F1F2}\u{1F1EC}"],
  ["JUYwJTlGJTg3JUIyJUYwJTlGJTg3JUJD", "\u{1F1F2}\u{1F1FC}"],
  ["JUYwJTlGJTg3JUIyJUYwJTlGJTg3JUJF", "\u{1F1F2}\u{1F1FE}"],
  ["JUYwJTlGJTg3JUIyJUYwJTlGJTg3JUJC", "\u{1F1F2}\u{1F1FB}"],
  ["JUYwJTlGJTg3JUIyJUYwJTlGJTg3JUIx", "\u{1F1F2}\u{1F1F1}"],
  ["JUYwJTlGJTg3JUIyJUYwJTlGJTg3JUI5", "\u{1F1F2}\u{1F1F9}"],
  ["JUYwJTlGJTg3JUIyJUYwJTlGJTg3JUFE", "\u{1F1F2}\u{1F1ED}"],
  ["JUYwJTlGJTg3JUIyJUYwJTlGJTg3JUI2", "\u{1F1F2}\u{1F1F6}"],
  ["JUYwJTlGJTg3JUIyJUYwJTlGJTg3JUI3", "\u{1F1F2}\u{1F1F7}"],
  ["JUYwJTlGJTg3JUIyJUYwJTlGJTg3JUJB", "\u{1F1F2}\u{1F1FA}"],
  ["JUYwJTlGJTg3JUJFJUYwJTlGJTg3JUI5", "\u{1F1FE}\u{1F1F9}"],
  ["JUYwJTlGJTg3JUIyJUYwJTlGJTg3JUJE", "\u{1F1F2}\u{1F1FD}"],
  ["JUYwJTlGJTg3JUFCJUYwJTlGJTg3JUIy", "\u{1F1EB}\u{1F1F2}"],
  ["JUYwJTlGJTg3JUIyJUYwJTlGJTg3JUE5", "\u{1F1F2}\u{1F1E9}"],
  ["JUYwJTlGJTg3JUIyJUYwJTlGJTg3JUE4", "\u{1F1F2}\u{1F1E8}"],
  ["JUYwJTlGJTg3JUIyJUYwJTlGJTg3JUIz", "\u{1F1F2}\u{1F1F3}"],
  ["JUYwJTlGJTg3JUIyJUYwJTlGJTg3JUFB", "\u{1F1F2}\u{1F1EA}"],
  ["JUYwJTlGJTg3JUIyJUYwJTlGJTg3JUI4", "\u{1F1F2}\u{1F1F8}"],
  ["JUYwJTlGJTg3JUIyJUYwJTlGJTg3JUE2", "\u{1F1F2}\u{1F1E6}"],
  ["JUYwJTlGJTg3JUIyJUYwJTlGJTg3JUJG", "\u{1F1F2}\u{1F1FF}"],
  ["JUYwJTlGJTg3JUIyJUYwJTlGJTg3JUIy", "\u{1F1F2}\u{1F1F2}"],
  ["JUYwJTlGJTg3JUIzJUYwJTlGJTg3JUE2", "\u{1F1F3}\u{1F1E6}"],
  ["JUYwJTlGJTg3JUIzJUYwJTlGJTg3JUI3", "\u{1F1F3}\u{1F1F7}"],
  ["JUYwJTlGJTg3JUIzJUYwJTlGJTg3JUI1", "\u{1F1F3}\u{1F1F5}"],
  ["JUYwJTlGJTg3JUIzJUYwJTlGJTg3JUIx", "\u{1F1F3}\u{1F1F1}"],
  ["JUYwJTlGJTg3JUIzJUYwJTlGJTg3JUE4", "\u{1F1F3}\u{1F1E8}"],
  ["JUYwJTlGJTg3JUIzJUYwJTlGJTg3JUJG", "\u{1F1F3}\u{1F1FF}"],
  ["JUYwJTlGJTg3JUIzJUYwJTlGJTg3JUFF", "\u{1F1F3}\u{1F1EE}"],
  ["JUYwJTlGJTg3JUIzJUYwJTlGJTg3JUFB", "\u{1F1F3}\u{1F1EA}"],
  ["JUYwJTlGJTg3JUIzJUYwJTlGJTg3JUFD", "\u{1F1F3}\u{1F1EC}"],
  ["JUYwJTlGJTg3JUIzJUYwJTlGJTg3JUJB", "\u{1F1F3}\u{1F1FA}"],
  ["JUYwJTlGJTg3JUIzJUYwJTlGJTg3JUFC", "\u{1F1F3}\u{1F1EB}"],
  ["JUYwJTlGJTg3JUIyJUYwJTlGJTg3JUI1", "\u{1F1F2}\u{1F1F5}"],
  ["JUYwJTlGJTg3JUIwJUYwJTlGJTg3JUI1", "\u{1F1F0}\u{1F1F5}"],
  ["JUYwJTlGJTg3JUIzJUYwJTlGJTg3JUI0", "\u{1F1F3}\u{1F1F4}"],
  ["JUYwJTlGJTg3JUI0JUYwJTlGJTg3JUIy", "\u{1F1F4}\u{1F1F2}"],
  ["JUYwJTlGJTg3JUI1JUYwJTlGJTg3JUIw", "\u{1F1F5}\u{1F1F0}"],
  ["JUYwJTlGJTg3JUI1JUYwJTlGJTg3JUJD", "\u{1F1F5}\u{1F1FC}"],
  ["JUYwJTlGJTg3JUI1JUYwJTlGJTg3JUI4", "\u{1F1F5}\u{1F1F8}"],
  ["JUYwJTlGJTg3JUI1JUYwJTlGJTg3JUE2", "\u{1F1F5}\u{1F1E6}"],
  ["JUYwJTlGJTg3JUI1JUYwJTlGJTg3JUFD", "\u{1F1F5}\u{1F1EC}"],
  ["JUYwJTlGJTg3JUI1JUYwJTlGJTg3JUJF", "\u{1F1F5}\u{1F1FE}"],
  ["JUYwJTlGJTg3JUI1JUYwJTlGJTg3JUFB", "\u{1F1F5}\u{1F1EA}"],
  ["JUYwJTlGJTg3JUI1JUYwJTlGJTg3JUFE", "\u{1F1F5}\u{1F1ED}"],
  ["JUYwJTlGJTg3JUI1JUYwJTlGJTg3JUIz", "\u{1F1F5}\u{1F1F3}"],
  ["JUYwJTlGJTg3JUI1JUYwJTlGJTg3JUIx", "\u{1F1F5}\u{1F1F1}"],
  ["JUYwJTlGJTg3JUI1JUYwJTlGJTg3JUI5", "\u{1F1F5}\u{1F1F9}"],
  ["JUYwJTlGJTg3JUI1JUYwJTlGJTg3JUI3", "\u{1F1F5}\u{1F1F7}"],
  ["JUYwJTlGJTg3JUI2JUYwJTlGJTg3JUE2", "\u{1F1F6}\u{1F1E6}"],
  ["JUYwJTlGJTg3JUI3JUYwJTlGJTg3JUFB", "\u{1F1F7}\u{1F1EA}"],
  ["JUYwJTlGJTg3JUI3JUYwJTlGJTg3JUI0", "\u{1F1F7}\u{1F1F4}"],
  ["JUYwJTlGJTg3JUI3JUYwJTlGJTg3JUJB", "\u{1F1F7}\u{1F1FA}"],
  ["JUYwJTlGJTg3JUI3JUYwJTlGJTg3JUJD", "\u{1F1F7}\u{1F1FC}"],
  ["JUYwJTlGJTg3JUE3JUYwJTlGJTg3JUIx", "\u{1F1E7}\u{1F1F1}"],
  ["JUYwJTlGJTg3JUI4JUYwJTlGJTg3JUFE", "\u{1F1F8}\u{1F1ED}"],
  ["JUYwJTlGJTg3JUIwJUYwJTlGJTg3JUIz", "\u{1F1F0}\u{1F1F3}"],
  ["JUYwJTlGJTg3JUIxJUYwJTlGJTg3JUE4", "\u{1F1F1}\u{1F1E8}"],
  ["JUYwJTlGJTg3JUI1JUYwJTlGJTg3JUIy", "\u{1F1F5}\u{1F1F2}"],
  ["JUYwJTlGJTg3JUJCJUYwJTlGJTg3JUE4", "\u{1F1FB}\u{1F1E8}"],
  ["JUYwJTlGJTg3JUJDJUYwJTlGJTg3JUI4", "\u{1F1FC}\u{1F1F8}"],
  ["JUYwJTlGJTg3JUI4JUYwJTlGJTg3JUIy", "\u{1F1F8}\u{1F1F2}"],
  ["JUYwJTlGJTg3JUI4JUYwJTlGJTg3JUI5", "\u{1F1F8}\u{1F1F9}"],
  ["JUYwJTlGJTg3JUI4JUYwJTlGJTg3JUE2", "\u{1F1F8}\u{1F1E6}"],
  ["JUYwJTlGJTg3JUI4JUYwJTlGJTg3JUIz", "\u{1F1F8}\u{1F1F3}"],
  ["JUYwJTlGJTg3JUI3JUYwJTlGJTg3JUI4", "\u{1F1F7}\u{1F1F8}"],
  ["JUYwJTlGJTg3JUI4JUYwJTlGJTg3JUE4", "\u{1F1F8}\u{1F1E8}"],
  ["JUYwJTlGJTg3JUI4JUYwJTlGJTg3JUIx", "\u{1F1F8}\u{1F1F1}"],
  ["JUYwJTlGJTg3JUI4JUYwJTlGJTg3JUFD", "\u{1F1F8}\u{1F1EC}"],
  ["JUYwJTlGJTg3JUI4JUYwJTlGJTg3JUJE", "\u{1F1F8}\u{1F1FD}"],
  ["JUYwJTlGJTg3JUI4JUYwJTlGJTg3JUIw", "\u{1F1F8}\u{1F1F0}"],
  ["JUYwJTlGJTg3JUI4JUYwJTlGJTg3JUFF", "\u{1F1F8}\u{1F1EE}"],
  ["JUYwJTlGJTg3JUI4JUYwJTlGJTg3JUE3", "\u{1F1F8}\u{1F1E7}"],
  ["JUYwJTlGJTg3JUI4JUYwJTlGJTg3JUI0", "\u{1F1F8}\u{1F1F4}"],
  ["JUYwJTlGJTg3JUJGJUYwJTlGJTg3JUE2", "\u{1F1FF}\u{1F1E6}"],
  ["JUYwJTlGJTg3JUFDJUYwJTlGJTg3JUI4", "\u{1F1EC}\u{1F1F8}"],
  ["JUYwJTlGJTg3JUIwJUYwJTlGJTg3JUI3", "\u{1F1F0}\u{1F1F7}"],
  ["JUYwJTlGJTg3JUI4JUYwJTlGJTg3JUI4", "\u{1F1F8}\u{1F1F8}"],
  ["JUYwJTlGJTg3JUFBJUYwJTlGJTg3JUI4", "\u{1F1EA}\u{1F1F8}"],
  ["JUYwJTlGJTg3JUIxJUYwJTlGJTg3JUIw", "\u{1F1F1}\u{1F1F0}"],
  ["JUYwJTlGJTg3JUI4JUYwJTlGJTg3JUE5", "\u{1F1F8}\u{1F1E9}"],
  ["JUYwJTlGJTg3JUI4JUYwJTlGJTg3JUI3", "\u{1F1F8}\u{1F1F7}"],
  ["JUYwJTlGJTg3JUI4JUYwJTlGJTg3JUJG", "\u{1F1F8}\u{1F1FF}"],
  ["JUYwJTlGJTg3JUI4JUYwJTlGJTg3JUFB", "\u{1F1F8}\u{1F1EA}"],
  ["JUYwJTlGJTg3JUE4JUYwJTlGJTg3JUFE", "\u{1F1E8}\u{1F1ED}"],
  ["JUYwJTlGJTg3JUI4JUYwJTlGJTg3JUJF", "\u{1F1F8}\u{1F1FE}"],
  ["JUYwJTlGJTg3JUI5JUYwJTlGJTg3JUJD", "\u{1F1F9}\u{1F1FC}"],
  ["JUYwJTlGJTg3JUI5JUYwJTlGJTg3JUFG", "\u{1F1F9}\u{1F1EF}"],
  ["JUYwJTlGJTg3JUI5JUYwJTlGJTg3JUJG", "\u{1F1F9}\u{1F1FF}"],
  ["JUYwJTlGJTg3JUI5JUYwJTlGJTg3JUFE", "\u{1F1F9}\u{1F1ED}"],
  ["JUYwJTlGJTg3JUI5JUYwJTlGJTg3JUIx", "\u{1F1F9}\u{1F1F1}"],
  ["JUYwJTlGJTg3JUI5JUYwJTlGJTg3JUFD", "\u{1F1F9}\u{1F1EC}"],
  ["JUYwJTlGJTg3JUI5JUYwJTlGJTg3JUIw", "\u{1F1F9}\u{1F1F0}"],
  ["JUYwJTlGJTg3JUI5JUYwJTlGJTg3JUI0", "\u{1F1F9}\u{1F1F4}"],
  ["JUYwJTlGJTg3JUI5JUYwJTlGJTg3JUI5", "\u{1F1F9}\u{1F1F9}"],
  ["JUYwJTlGJTg3JUI5JUYwJTlGJTg3JUIz", "\u{1F1F9}\u{1F1F3}"],
  ["JUYwJTlGJTg3JUI5JUYwJTlGJTg3JUI3", "\u{1F1F9}\u{1F1F7}"],
  ["JUYwJTlGJTg3JUI5JUYwJTlGJTg3JUIy", "\u{1F1F9}\u{1F1F2}"],
  ["JUYwJTlGJTg3JUI5JUYwJTlGJTg3JUE4", "\u{1F1F9}\u{1F1E8}"],
  ["JUYwJTlGJTg3JUI5JUYwJTlGJTg3JUJC", "\u{1F1F9}\u{1F1FB}"],
  ["JUYwJTlGJTg3JUJBJUYwJTlGJTg3JUFD", "\u{1F1FA}\u{1F1EC}"],
  ["JUYwJTlGJTg3JUJBJUYwJTlGJTg3JUE2", "\u{1F1FA}\u{1F1E6}"],
  ["JUYwJTlGJTg3JUE2JUYwJTlGJTg3JUFB", "\u{1F1E6}\u{1F1EA}"],
  ["JUYwJTlGJTg3JUFDJUYwJTlGJTg3JUE3", "\u{1F1EC}\u{1F1E7}"],
  ["JUYwJTlGJTg3JUJBJUYwJTlGJTg3JUI4", "\u{1F1FA}\u{1F1F8}"],
  ["JUYwJTlGJTg3JUJCJUYwJTlGJTg3JUFF", "\u{1F1FB}\u{1F1EE}"],
  ["JUYwJTlGJTg3JUJBJUYwJTlGJTg3JUJF", "\u{1F1FA}\u{1F1FE}"],
  ["JUYwJTlGJTg3JUJBJUYwJTlGJTg3JUJG", "\u{1F1FA}\u{1F1FF}"],
  ["JUYwJTlGJTg3JUJCJUYwJTlGJTg3JUJB", "\u{1F1FB}\u{1F1FA}"],
  ["JUYwJTlGJTg3JUJCJUYwJTlGJTg3JUE2", "\u{1F1FB}\u{1F1E6}"],
  ["JUYwJTlGJTg3JUJCJUYwJTlGJTg3JUFB", "\u{1F1FB}\u{1F1EA}"],
  ["JUYwJTlGJTg3JUJCJUYwJTlGJTg3JUIz", "\u{1F1FB}\u{1F1F3}"],
  ["JUYwJTlGJTg3JUJDJUYwJTlGJTg3JUFC", "\u{1F1FC}\u{1F1EB}"],
  ["JUYwJTlGJTg3JUFBJUYwJTlGJTg3JUFE", "\u{1F1EA}\u{1F1ED}"],
  ["JUYwJTlGJTg3JUJFJUYwJTlGJTg3JUFB", "\u{1F1FE}\u{1F1EA}"],
  ["JUYwJTlGJTg3JUJGJUYwJTlGJTg3JUIy", "\u{1F1FF}\u{1F1F2}"],
  ["JUYwJTlGJTg3JUJGJUYwJTlGJTg3JUJD", "\u{1F1FF}\u{1F1FC}"]
]);

// src/constant/http-status-message/http-status-message.ts
var HttpStatusMessageConst = {
  200: "\u670D\u52A1\u5668\u6210\u529F\u8FD4\u56DE\u8BF7\u6C42\u7684\u6570\u636E\u3002",
  201: "\u65B0\u5EFA\u6216\u4FEE\u6539\u6570\u636E\u6210\u529F\u3002",
  202: "\u4E00\u4E2A\u8BF7\u6C42\u5DF2\u7ECF\u8FDB\u5165\u540E\u53F0\u6392\u961F\uFF08\u5F02\u6B65\u4EFB\u52A1\uFF09\u3002",
  204: "\u5220\u9664\u6570\u636E\u6210\u529F\u3002",
  400: "\u53D1\u51FA\u7684\u8BF7\u6C42\u6709\u9519\u8BEF\uFF0C\u670D\u52A1\u5668\u6CA1\u6709\u8FDB\u884C\u65B0\u5EFA\u6216\u4FEE\u6539\u6570\u636E\u7684\u64CD\u4F5C\u3002",
  401: "\u7528\u6237\u6CA1\u6709\u6743\u9650\uFF08\u4EE4\u724C\u3001\u7528\u6237\u540D\u3001\u5BC6\u7801\u9519\u8BEF\uFF09\u3002",
  403: "\u7528\u6237\u5F97\u5230\u6388\u6743\uFF0C\u4F46\u662F\u8BBF\u95EE\u662F\u88AB\u7981\u6B62\u7684\u3002",
  404: "\u53D1\u51FA\u7684\u8BF7\u6C42\u9488\u5BF9\u7684\u662F\u4E0D\u5B58\u5728\u7684\u8BB0\u5F55\uFF0C\u670D\u52A1\u5668\u6CA1\u6709\u8FDB\u884C\u64CD\u4F5C\u3002",
  406: "\u8BF7\u6C42\u7684\u683C\u5F0F\u4E0D\u53EF\u5F97\u3002",
  410: "\u8BF7\u6C42\u7684\u8D44\u6E90\u88AB\u6C38\u4E45\u5220\u9664\uFF0C\u4E14\u4E0D\u4F1A\u518D\u5F97\u5230\u7684\u3002",
  422: "\u5F53\u521B\u5EFA\u4E00\u4E2A\u5BF9\u8C61\u65F6\uFF0C\u53D1\u751F\u4E00\u4E2A\u9A8C\u8BC1\u9519\u8BEF\u3002",
  500: "\u670D\u52A1\u5668\u53D1\u751F\u9519\u8BEF\uFF0C\u8BF7\u68C0\u67E5\u670D\u52A1\u5668\u3002",
  502: "\u7F51\u5173\u9519\u8BEF\u3002",
  503: "\u670D\u52A1\u4E0D\u53EF\u7528\uFF0C\u670D\u52A1\u5668\u6682\u65F6\u8FC7\u8F7D\u6216\u7EF4\u62A4\u3002",
  504: "\u7F51\u5173\u8D85\u65F6\u3002"
};

// src/context/index.ts
import { clone } from "ramda";
var IBizContext = class _IBizContext {
  /**
   * Creates an instance of IBizContext.
   * @param {IData} [context={}] 自身的上下文
   * @param {IContext} [parent] 父的上下文源对象
   * @memberof IBizContext
   */
  constructor(context = {}, parent) {
    Object.defineProperty(this, "_associationContext", {
      enumerable: false,
      configurable: true,
      value: []
    });
    if (parent) {
      this.initWithParent(parent);
    }
    Object.assign(this, context);
  }
  /**
   * @description 初始化上下文，并关联父上下文
   * @private
   * @param {IContext} parent
   * @memberof IBizContext
   */
  initWithParent(parent) {
    const self = this;
    Object.defineProperty(this, "_parent", {
      enumerable: false,
      writable: true,
      value: parent
    });
    Object.defineProperty(this, "_context", {
      enumerable: false,
      writable: true,
      value: {}
    });
    const properties = {};
    const keys = Object.keys(parent);
    keys.forEach((key) => {
      if (Object.prototype.hasOwnProperty.call(this, key)) {
        return;
      }
      properties[key] = {
        enumerable: true,
        configurable: true,
        set(val) {
          if (val == null) {
            self._context[key] = null;
          } else {
            self._context[key] = val;
          }
        },
        get() {
          if (self._context[key] !== void 0) {
            return self._context[key];
          }
          if (self._parent) {
            return self._parent[key];
          }
          return "";
        }
      };
    });
    Object.defineProperties(this, properties);
  }
  /**
   * @description 返回自身独有的上下文，和父有差异的
   * @returns {*}  {IData}
   * @memberof IBizContext
   */
  getOwnContext() {
    const result = {};
    Object.keys(this).forEach((key) => {
      if (!this._parent || !Object.prototype.hasOwnProperty.call(this._parent, key) || Object.prototype.hasOwnProperty.call(this._context, key)) {
        result[key] = this[key];
      }
    });
    return result;
  }
  /**
   * @description 销毁当前上下文对象
   * @memberof IBizContext
   */
  destroy() {
    this._parent = void 0;
    this._context = {};
    this._associationContext.forEach((item) => {
      item.destroy();
    });
  }
  /**
   * @description 在非视图中，需要断开视图上下文联系时。只能使用 clone 创建新的局部上下文
   * @returns {*}  {IBizContext}
   * @memberof IBizContext
   */
  clone() {
    const newContext = new _IBizContext(
      clone(this.getOwnContext()),
      this._parent
    );
    this._associationContext.push(newContext);
    return newContext;
  }
  /**
   * @description 深度克隆，只返回现有数据
   * @returns {*}  {IData}
   * @memberof IBizContext
   */
  deepClone() {
    const result = {};
    Object.keys(this).forEach((key) => {
      result[key] = this[key];
    });
    return result;
  }
  /**
   * @description 在不改变对象引用的情况下，重置上下文,等效于重新实例化，但是引用不变
   * @param {IData} [context={}]
   * @param {IContext} [parent]
   * @memberof IBizContext
   */
  reset(context = {}, parent) {
    this._associationContext.forEach((item) => {
      item.destroy();
    });
    if (this._parent) {
      this._parent = {};
      this._context = {};
    }
    Object.keys(this).forEach((key) => {
      try {
        delete this[key];
      } catch (error) {
      }
    });
    if (parent) {
      this.initWithParent(parent);
    }
    Object.assign(this, context);
  }
  /**
   * @description 上下文只有在视图初始化时，调用 create 方法
   * @static
   * @param {IData} [context]
   * @param {IContext} [parent]
   * @returns {*}  {IBizContext}
   * @memberof IBizContext
   */
  static create(context, parent) {
    return new _IBizContext(context, parent);
  }
};

// src/params/params.ts
var IBizParams = class {
  /**
   * Creates an instance of IBizParams.
   * @param {IParams} [params] 自身的参数
   * @param {IParams} [parent] 父视图参数
   * @memberof IBizParams
   */
  constructor(params, parent) {
    Object.defineProperty(this, "_parent", {
      enumerable: false,
      configurable: true,
      writable: true,
      value: parent
    });
    Object.defineProperty(this, "_params", {
      enumerable: false,
      configurable: true,
      writable: true,
      value: params || {}
    });
    return this.createProxy();
  }
  /**
   * @description 创建代理对象
   * @protected
   * @returns {*}  {IBizParams}
   * @memberof IBizParams
   */
  createProxy() {
    function updateKeyDefine2(target, keys) {
      keys.forEach((key) => {
        if (!Object.prototype.hasOwnProperty.call(target, key)) {
          Object.defineProperty(target, key, {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
        }
      });
    }
    return new Proxy(this, {
      set(target, p, value) {
        if (["_params", "_parent"].includes(p)) {
          target[p] = value;
        } else {
          target._params[p] = value;
        }
        return true;
      },
      get(target, p, _receiver) {
        if (target[p] !== void 0) {
          return target[p];
        }
        if (target._params[p] !== void 0) {
          return target._params[p];
        }
        if (target._parent && target._parent[p] !== void 0) {
          return target._parent[p];
        }
      },
      ownKeys(target) {
        const allKeys = [
          .../* @__PURE__ */ new Set([
            ...Object.keys(target._params),
            ...Object.keys(target._parent || {})
          ])
        ];
        updateKeyDefine2(target, allKeys);
        return allKeys;
      }
    });
  }
  /**
   * @description 在不改变对象引用的情况下，重置视图参数，等效于重新实例化，但是引用不变
   * @param {IParams} [params] 视图参数
   * @param {IParams} [parent] 父视图参数
   * @memberof IBizParams
   */
  reset(params, parent) {
    this._params = params || {};
    this._parent = parent;
  }
  /**
   * @description 销毁视图参数，避免内存泄漏
   * @memberof IBizParams
   */
  destroy() {
    this._params = {};
    this._parent = void 0;
  }
};

// src/interface/api/constant/login-mode/login-mode.ts
var LoginMode = /* @__PURE__ */ ((LoginMode2) => {
  LoginMode2["DEFAULT"] = "DEFAULT";
  LoginMode2["CUSTOM"] = "CUSTOM";
  LoginMode2["CAS"] = "CAS";
  LoginMode2["OAUTH"] = "OAUTH";
  return LoginMode2;
})(LoginMode || {});

// src/interface/api/constant/menu-permission-mode/menu-permission-mode.ts
var MenuPermissionMode = /* @__PURE__ */ ((MenuPermissionMode2) => {
  MenuPermissionMode2["MIXIN"] = "MIXIN";
  MenuPermissionMode2["RESOURCE"] = "RESOURCE";
  MenuPermissionMode2["RT"] = "RT";
  return MenuPermissionMode2;
})(MenuPermissionMode || {});

// src/environment/environment.ts
var Environment = {
  dev: false,
  hub: true,
  enableMqtt: false,
  mqttUrl: "/portal/mqtt/mqtt",
  isEnableMultiLan: false,
  anonymousUser: "",
  anonymousPwd: "",
  enableAnonymous: false,
  accessStoreArea: "COOKIE",
  logLevel: "ERROR",
  baseUrl: "/api",
  appId: "",
  pluginBaseUrl: "http://172.16.240.221",
  isLocalModel: false,
  remoteModelUrl: "/remotemodel",
  assetsUrl: "./assets",
  dcSystem: "",
  // {cat} 会替换模型 IApplication的getDefaultOSSCat 参数 如果没有会截取掉/{cat}
  // getDefaultOSSCat 配置方法 系统应用-高级设置-自定义参数：DefaultOSSCat
  // 配置示例 DefaultOSSCat=cat
  downloadFileUrl: "/ibizutil/download/{cat}",
  uploadFileUrl: "/ibizutil/upload/{cat}",
  defaultOSSCat: "",
  casLoginUrl: "",
  loginMode: "DEFAULT" /* DEFAULT */,
  menuPermissionMode: "MIXIN" /* MIXIN */,
  enablePermission: true,
  routePlaceholder: "-",
  enableWfAllHistory: false,
  isMob: false,
  isSaaSMode: true,
  AppTitle: "",
  AppLabel: "",
  favicon: "./favicon.ico",
  enableTitle: true,
  tokenHeader: "",
  tokenPrefix: "",
  customParams: {},
  oauthOpenAccessId: "",
  enableEncryption: false,
  cookieDomain: "",
  appLoadingTheme: "DEFAULT",
  environmentTag: "development",
  mobMenuShowMode: "DEFAULT",
  appVersion: "",
  devtoolConfig: {
    studioBaseUrl: "https://open.ibizlab.cn/modeldesign/#/",
    v9Mode: false,
    defaultMode: "close"
  },
  enableAI: true,
  aMapSecurityJsCode: "",
  aMapKey: "",
  runContainer: "DYNAENGINE",
  mobWeChatAppId: "",
  isPortalApp: false,
  isEnableMobLoading: false,
  mobLoadingCaption: "",
  mobLoadingDescription: "",
  mobLoadingBackground: "",
  isAdaptiveScreenWidth: false
};

// src/error/http-error/http-error.ts
var HttpError = class extends Error {
  constructor(err) {
    super("HttpError");
    this.name = "HttpError";
    const res = err.response;
    this.response = err.response;
    this.tag = "";
    if (res) {
      if (res.data) {
        const data = res.data;
        this.message = data.message;
        if (!this.message && data.status === 404) {
          this.message = ibiz.i18n.t("core.error.serviceResNotExist");
        }
        if (!this.message && data.status === 403) {
          this.message = ibiz.i18n.t("core.error.serviceResNotPermission");
        }
        if (!this.message) {
          this.message = ibiz.i18n.t("core.error.serviceException");
        }
      } else {
        this.message = res.statusText;
      }
      if (!this.message) {
        this.message = ibiz.i18n.t("core.error.networkAbnormality");
      }
      this.status = res.status;
    } else {
      this.message = err.message || "";
      this.status = 500;
    }
  }
};

// src/error/model-error/model-error.ts
var ModelError = class extends Error {
  /**
   * Creates an instance of ModelError.
   * @param {IData} model 模板未支持的模型
   * @param {string} [msg] 错误信息
   * @memberof ModelError
   */
  constructor(model, msg) {
    super(
      ibiz.i18n.t("core.error.modelMsg", {
        id: model.id,
        msg: msg ? "\uFF1A ".concat(msg) : ""
      })
    );
    this.model = model;
    this.name = ibiz.i18n.t("core.error.unsupportedModels");
  }
};

// src/error/runtime-error/runtime-error.ts
var RuntimeError = class extends Error {
  constructor(message) {
    super(message);
    this.message = message;
    this.name = "Runtime Error";
  }
};

// src/error/runtime-model-error/runtime-model-error.ts
var RuntimeModelError = class extends Error {
  /**
   * Creates an instance of RuntimeModelError.
   * @param {IData} model 丢失配置的模型
   * @param {string} [msg] 缺失配置描述
   * @memberof RuntimeModelError
   */
  constructor(model, msg) {
    super(
      ibiz.i18n.t("core.error.modelMsg", {
        id: model.id,
        msg: msg ? "\uFF1A ".concat(msg) : ""
      })
    );
    this.model = model;
    this.name = ibiz.i18n.t("core.error.modelConfigurationMissing");
  }
};

// src/error/notice-error/notice-error.ts
var NoticeError = class extends Error {
  constructor(message, duration) {
    super(message);
    this.message = message;
    this.duration = duration;
    this.name = "notice Error";
  }
};

// src/error/http-error/entity-error.ts
var EntityError = class extends HttpError {
  constructor(err) {
    super(err);
    this.name = "EntityError";
    this.details = [];
    if (this.response) {
      const { details = [] } = this.response.data;
      this.details = details.map((detail) => {
        return {
          name: detail.fieldname.toLowerCase(),
          logicName: detail.fieldlogicname,
          errorType: detail.fielderrortype,
          errorInfo: detail.fielderrorinfo
        };
      });
    }
  }
};

// src/error/http-error/http-error-factory.ts
var HttpErrorFactory = class {
  static async getInstance(error) {
    const { response } = error;
    if ((response == null ? void 0 : response.data) instanceof Blob) {
      const text = await response.data.text();
      try {
        response.data = JSON.parse(text);
      } catch (e) {
        response.data = { message: text };
      }
    }
    if (!response || !response.data) {
      return new HttpError(error);
    }
    const { type } = response.data;
    switch (type) {
      case "EntityException":
        return new EntityError(error);
      default:
        return new HttpError(error);
    }
  }
};

// src/utils/util/util.ts
import { debounce as debounce2 } from "lodash-es";
import { isNotNil, isNil } from "ramda";

// src/utils/cookie-util/cookie-util.ts
function getAccessStoreAreakeys() {
  try {
    const key = CoreConst.ACCESS_STORE_AREA_KEYS;
    let cookieAlls;
    switch (ibiz.env.accessStoreArea) {
      case "LOCALSTORAGE":
        cookieAlls = localStorage.getItem(key);
        break;
      case "SESSIONSTORAGE":
        cookieAlls = sessionStorage.getItem(key);
        break;
      default:
        break;
    }
    return JSON.parse(cookieAlls || "[]");
  } catch (error) {
    ibiz.log.error(error);
    return [];
  }
}
function setAccessStoreAreakeys(name) {
  try {
    const cookieAlls = [
      ...new Set(getAccessStoreAreakeys().concat([name]))
    ];
    const key = CoreConst.ACCESS_STORE_AREA_KEYS;
    switch (ibiz.env.accessStoreArea) {
      case "LOCALSTORAGE":
        return localStorage.setItem(key, JSON.stringify(cookieAlls));
      case "SESSIONSTORAGE":
        return sessionStorage.setItem(key, JSON.stringify(cookieAlls));
      default:
        break;
    }
  } catch (error) {
    ibiz.log.error(error);
  }
}
function setCookie(name, value, day = 0, isDomain = false, path = "/", childDoMain = "") {
  let domain = "";
  setAccessStoreAreakeys(name);
  switch (ibiz.env.accessStoreArea) {
    case "LOCALSTORAGE":
      return localStorage.setItem(name, value);
    case "SESSIONSTORAGE":
      return sessionStorage.setItem(name, value);
    default:
      if (isDomain) {
        const regExpr = /^(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)$/;
        if (!regExpr.test(window.location.hostname)) {
          const host = window.location.hostname;
          if (host.indexOf(".") !== host.lastIndexOf(".")) {
            domain = ";domain=".concat(host.substring(host.indexOf("."), host.length));
          }
        }
      } else if (childDoMain) {
        domain = ";domain=".concat(childDoMain);
      }
      if (day !== 0) {
        const expires = day * 24 * 60 * 60 * 1e3;
        const date = new Date((/* @__PURE__ */ new Date()).getTime() + expires);
        document.cookie = "".concat(name, "=").concat(escape(
          value
        ), ";path=").concat(path, ";expires=").concat(date.toUTCString()).concat(domain);
      } else {
        document.cookie = "".concat(name, "=").concat(escape(value), ";path=").concat(path).concat(domain);
      }
      break;
  }
}
function setAppCookie(name, value, day = 0) {
  if (ibiz.env.cookieDomain && window.location.href.indexOf(ibiz.env.cookieDomain) !== -1) {
    setCookie(name, value, day, false, "/", ibiz.env.cookieDomain);
  } else {
    setCookie(name, value, day, true);
  }
}
function clearAppCookie(cookieName) {
  if (ibiz.env.cookieDomain && window.location.href.indexOf(ibiz.env.cookieDomain) !== -1) {
    setCookie(cookieName, "", -1, false, "/", ibiz.env.cookieDomain);
  } else {
    setCookie(cookieName, "", -1, true);
  }
}
function getAppCookie(name) {
  const reg = new RegExp("(^| )".concat(name, "=([^;]*)(;|$)"));
  const arr = document.cookie.match(reg);
  switch (ibiz.env.accessStoreArea) {
    case "LOCALSTORAGE":
      return localStorage.getItem(name);
    case "SESSIONSTORAGE":
      return sessionStorage.getItem(name);
    default:
      if (arr && arr.length > 1) {
        return unescape(arr[2]);
      }
      return null;
  }
}
function resetAppCookie() {
  const cookies = document.cookie.split(";");
  const cookieAlls = getAccessStoreAreakeys().concat([
    CoreConst.ACCESS_STORE_AREA_KEYS
  ]);
  switch (ibiz.env.accessStoreArea) {
    case "LOCALSTORAGE":
      for (const name of cookieAlls) {
        localStorage.removeItem(name);
      }
      break;
    case "SESSIONSTORAGE":
      for (const name of cookieAlls) {
        sessionStorage.removeItem(name);
      }
      break;
    default:
      for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split("=");
        document.cookie = "".concat(cookieName, "=").concat(cookieValue, ";expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;domain=").concat(window.location.host);
      }
      break;
  }
}

// src/utils/util/util.ts
function getToken() {
  return getAppCookie(CoreConst.TOKEN);
}
function isOverlap(arr1, arr2) {
  const newArr = Array.from(/* @__PURE__ */ new Set([...arr1, ...arr2]));
  return newArr.length !== arr1.length + arr2.length;
}
function isElementSame(arr1, arr2, field) {
  if (arr1.length !== arr2.length) {
    return false;
  }
  const allElements = field ? [...arr1.map((item) => item[field]), ...arr2.map((item) => item[field])] : [...arr1, ...arr2];
  const newArr = Array.from(new Set(allElements));
  return newArr.length === arr1.length;
}
function debounceAndMerge(func, mergeFunc, wait) {
  let oldParams;
  const debounceFunc = debounce2((...params) => {
    oldParams = void 0;
    return func(...params);
  }, wait);
  return (...args) => {
    let newParams = args;
    if (oldParams) {
      newParams = mergeFunc(oldParams, newParams);
    }
    oldParams = newParams;
    return debounceFunc(...newParams);
  };
}
function debounceAndAsyncMerge(func, mergeFunc, wait) {
  let oldParams;
  let promises = [];
  const debounceFunc = debounce2(async (...params) => {
    oldParams = void 0;
    try {
      const result = await func(...params);
      promises.forEach((promise) => {
        promise.resolve(result);
      });
      promises = [];
      return result;
    } catch (error) {
      promises.forEach((promise) => {
        promise.reject(error);
      });
      promises = [];
    }
  }, wait);
  const fun = async (...args) => {
    let newParams = args;
    if (oldParams) {
      newParams = mergeFunc(oldParams, newParams);
    }
    oldParams = newParams;
    debounceFunc(...newParams);
    return new Promise((resolve, reject) => {
      promises.push({ resolve, reject });
    });
  };
  return fun;
}
function mergeInLeft(l, r2) {
  Object.keys(r2).forEach((key) => {
    if (isNotNil(r2[key])) {
      l[key] = r2[key];
    }
  });
}
function mergeDefaultInLeft(l, r2) {
  Object.keys(r2).forEach((key) => {
    if (isNotNil(r2[key]) && isNil(l[key])) {
      l[key] = r2[key];
    }
  });
}
function compareArr(arr1, arr2, keyField) {
  const all = /* @__PURE__ */ new Set([...arr1, ...arr2]);
  const more = [];
  const less = [];
  const same = [];
  if (keyField) {
    const arr1Keys = arr1.map((item) => item[keyField]);
    const arr2Keys = arr2.map((item) => item[keyField]);
    all.forEach((item) => {
      if (!arr1Keys.includes(item[keyField])) {
        less.push(item);
        return;
      }
      if (!arr2Keys.includes(item[keyField])) {
        more.push(item);
        return;
      }
      same.push(item);
    });
  } else {
    all.forEach((item) => {
      if (!arr1.includes(item)) {
        less.push(item);
        return;
      }
      if (!arr2.includes(item)) {
        more.push(item);
        return;
      }
      same.push(item);
    });
  }
  return {
    more,
    less,
    same
  };
}
function toNumberOrNil(value) {
  if (isNil(value)) {
    return void 0;
  }
  const num = Number(value);
  if (Number.isNaN(num)) {
    return void 0;
  }
  return num;
}
var SvgPattern = /<svg\b[^>]*>[\s\S]*?<\/svg>/;
function isSvg(str) {
  return SvgPattern.test(str);
}
function plus(a, b) {
  let c;
  let d;
  try {
    c = a.toString().split(".")[1].length;
  } catch (f) {
    c = 0;
  }
  try {
    d = b.toString().split(".")[1].length;
  } catch (f) {
    d = 0;
  }
  const e = 10 ** Math.max(c, d);
  return (a * e + b * e) / e;
}
function updateKeyDefine(target, keys) {
  keys.forEach((key) => {
    if (!Object.prototype.hasOwnProperty.call(target, key)) {
      Object.defineProperty(target, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value: void 0
      });
    }
  });
}
function isBase64Image(str) {
  return /^data:image\/[a-zA-Z+]+;base64,([/+=\w\s]+|[^,]+)$/.test(str);
}
function isBase64(str) {
  return /^[A-Za-z0-9+/=]+$/.test(str) && str.length % 4 === 0;
}
function isEmoji(str) {
  return EMOJIMAP.has(str);
}
function strToBase64(str) {
  return btoa(encodeURIComponent(str));
}
function base64ToStr(base64) {
  return decodeURIComponent(atob(base64));
}
function base64ToBlob(base64) {
  const binStr = atob(base64.split(",")[1]);
  const len = binStr.length;
  const arr = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    arr[i] = binStr.charCodeAt(i);
  }
  return new Blob([arr]);
}
function calcOpenModeStyle(value, type) {
  if (value >= 0 && value <= 100) {
    return "".concat(value, "%");
  }
  if (value > 100) {
    return type === "drawer" ? value : "".concat(value, "px");
  }
  ibiz.log.error(ibiz.i18n.t("core.utils.invalidInputValue"));
  return "";
}
function showTitle(str) {
  return ibiz.env.enableTitle ? str : void 0;
}
function fixJsonString(str) {
  let fixedString = str.replace(/'/g, '"');
  fixedString = fixedString.replace(/([{,])\s*([a-zA-Z0-9_]+)\s*:/g, '$1"$2":');
  fixedString = fixedString.replace(/,(\s*[\}\]])/g, "$1");
  fixedString = fixedString.trim();
  try {
    return JSON.parse(fixedString);
  } catch (e) {
    ibiz.log.error(str);
    return null;
  }
}
function getRandomInt(min = 0, max = 1e3) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// src/utils/interceptor/interceptor.ts
var Interceptor = class {
  /**
   * @description 请求之前处理
   * @protected
   * @param {InternalAxiosRequestConfig} config
   * @returns {*}  {Promise<InternalAxiosRequestConfig>}
   * @memberof Interceptor
   */
  async onBeforeRequest(config) {
    return config;
  }
  /**
   * @description 请求失败之后处理
   * @protected
   * @param {Error} error
   * @returns {*}  {Promise<never>}
   * @memberof Interceptor
   */
  onRequestError(error) {
    return Promise.reject(error);
  }
  /**
   * @description 响应成功之后处理
   * @protected
   * @param {AxiosResponse} config
   * @returns {*}  {Promise<AxiosResponse>}
   * @memberof Interceptor
   */
  async onResponseSuccess(config) {
    return config;
  }
  /**
   * @description 响应失败之后处理
   * @protected
   * @param {Error} error
   * @returns {*}  {Promise<never>}
   * @memberof Interceptor
   */
  onResponseError(error) {
    return Promise.reject(error);
  }
  /**
   * @description 使用拦截器
   * @param {AxiosInstance} instance
   * @memberof Interceptor
   */
  use(instance) {
    this.instance = instance;
    this.onBeforeRequest = this.onBeforeRequest.bind(this);
    this.onRequestError = this.onRequestError.bind(this);
    this.onResponseSuccess = this.onResponseSuccess.bind(this);
    this.onResponseError = this.onResponseError.bind(this);
    this.requestTag = instance.interceptors.request.use(
      this.onBeforeRequest,
      this.onRequestError
    );
    this.responseTag = instance.interceptors.response.use(
      this.onResponseSuccess,
      this.onResponseError
    );
  }
  /**
   * @description 移出拦截器
   * @param {AxiosInstance} instance
   * @memberof Interceptor
   */
  eject(instance) {
    if (this.requestTag) {
      instance.interceptors.request.eject(this.requestTag);
    }
    if (this.responseTag) {
      instance.interceptors.response.eject(this.responseTag);
    }
  }
};

// src/utils/interceptor/core-interceptor.ts
var CoreInterceptor = class extends Interceptor {
  /**
   * @description 请求之前处理
   * @protected
   * @param {InternalAxiosRequestConfig} config
   * @returns {*}  {Promise<InternalAxiosRequestConfig>}
   * @memberof CoreInterceptor
   */
  async onBeforeRequest(config) {
    config = await super.onBeforeRequest(config);
    const { headers } = config;
    const token = getToken();
    if (token) {
      headers.set(
        "".concat(ibiz.env.tokenHeader, "Authorization"),
        "".concat(ibiz.env.tokenPrefix, "Bearer ").concat(token)
      );
    }
    let systemId = ibiz.env.dcSystem;
    const { orgData } = ibiz;
    if (orgData) {
      if (orgData.systemid) {
        systemId = orgData.systemid;
      }
      if (orgData.orgid) {
        headers.set("srforgid", orgData.orgid);
      }
    }
    headers.set("srfsystemid", systemId);
    return config;
  }
  /**
   * @description 响应失败之后处理
   * @protected
   * @param {Error} error
   * @returns {*}  {Promise<never>}
   * @memberof CoreInterceptor
   */
  async onResponseError(error) {
    var _a;
    const { config, response } = error;
    if (this.instance && (response == null ? void 0 : response.status) === 401 && config && !config._retry && config.url && // 排除获取系统信息、应用数据、刷新 token 预定义接口
    (config.url.indexOf("/uaa/getbydcsystem/") === -1 || config.url.indexOf("/appdata") !== -1 || config.url.indexOf("/uaa/refresh_token/") !== -1)) {
      try {
        config._retry = true;
        if (ibiz.env.enableAnonymous) {
          const authInfo = ibiz.auth.getAuthInfo();
          const refreshToken = getAppCookie(CoreConst.REFRESH_TOKEN);
          if (authInfo.isAnonymous || !refreshToken) {
            const tempOrgData = ibiz.orgData;
            await ibiz.auth.anonymousLogin();
            ibiz.orgData = tempOrgData;
          } else {
            await ibiz.auth.refreshToken();
          }
        } else {
          await ibiz.auth.refreshToken();
        }
        const res = await ibiz.net.get(
          "/appdata",
          (_a = ibiz.appUtil) == null ? void 0 : _a.getAppContext()
        );
        if (res && res.ok) {
          ibiz.appData = res.data;
        }
        const { headers } = config;
        const token = getToken();
        if (token) {
          headers.set(
            "".concat(ibiz.env.tokenHeader, "Authorization"),
            "".concat(ibiz.env.tokenPrefix, "Bearer ").concat(token)
          );
        }
        let systemId = ibiz.env.dcSystem;
        const { orgData } = ibiz;
        if (orgData) {
          if (orgData.systemid) {
            systemId = orgData.systemid;
          }
          if (orgData.orgid) {
            headers.set("srforgid", orgData.orgid);
          }
        }
        headers.set("srfsystemid", systemId);
        return this.instance(config);
      } catch (err) {
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
};

// src/utils/message-center/base/message-base.ts
import { QXEvent } from "qx-util";
var MessageBase = class {
  /**
   * Creates an instance of MessageBase.
   * @param {MessageBase} [parent]
   * @memberof MessageBase
   */
  constructor(parent) {
    this.parent = parent;
    /**
     * @description 事件对象
     * @protected
     * @type {QXEvent<IMessageCenterEvent>}
     * @memberof MessageBase
     */
    this.evt = new QXEvent(1e3);
  }
  /**
   * @description 推送标准结构消息
   * @param {IPortalMessage} msg
   * @memberof MessageBase
   */
  next(msg) {
    this.evt.emit("all", msg);
    if (this.parent) {
      this.nextParent(msg);
    }
  }
  /**
   * @description 向父级推送消息（私有方法）
   * @protected
   * @param {IPortalMessage} msg
   * @memberof MessageBase
   */
  nextParent(msg) {
    if (this.parent) {
      this.parent.evt.emit("all", msg);
      this.parent.nextParent(msg);
    }
  }
  /**
   * @description 订阅消息
   * @param {(msg: IPortalMessage) => void} cb
   * @memberof MessageBase
   */
  on(cb) {
    this.evt.on("all", cb);
  }
  /**
   * @description 取消订阅消息
   * @param {(msg: IPortalMessage) => void} cb
   * @memberof MessageBase
   */
  off(cb) {
    this.evt.off("all", cb);
  }
};

// src/utils/message-center/base/message-all.ts
var MessageAll = class extends MessageBase {
};

// src/utils/message-center/command/message-command.ts
import { createUUID as createUUID2 } from "qx-util";

// src/utils/message-center/command/command-base/command-base.ts
import { createUUID } from "qx-util";
var CommandBase = class extends MessageBase {
  /**
   * @description 发送指令消息
   * @param {IData} data
   * @param {IPortalMessage['subtype']} subtype
   * @param {string} [triggerKey]
   * @memberof CommandBase
   */
  sendCommand(data, subtype, triggerKey) {
    const msg = {
      messageid: createUUID(),
      messagename: "command",
      type: "COMMAND",
      subtype,
      triggerKey,
      data
    };
    this.next(msg);
  }
};

// src/utils/message-center/command/create/command-create.ts
var CommandCreate = class extends CommandBase {
  /**
   * @description 发送消息
   * @param {IAppDataEntity} data
   * @param {IMsgMetaData} [meta]
   * @memberof CommandCreate
   */
  send(data, meta) {
    this.sendCommand(data, "OBJECTCREATED", meta == null ? void 0 : meta.triggerKey);
  }
};

// src/utils/message-center/command/update/command-update.ts
var CommandUpdate = class extends CommandBase {
  /**
   * @description 发送消息
   * @param {IAppDataEntity} data 实体数据
   * @param {IMsgMetaData} [meta] 元数据
   * @memberof CommandUpdate
   */
  send(data, meta) {
    this.sendCommand(data, "OBJECTUPDATED", meta == null ? void 0 : meta.triggerKey);
  }
};

// src/utils/message-center/command/remove/command-remove.ts
var CommandRemove = class extends CommandBase {
  /**
   * @description 发送消息
   * @param {IAppDataEntity} data 实体数据
   * @param {IMsgMetaData} [meta] 元数据
   * @memberof CommandRemove
   */
  send(data, meta) {
    this.sendCommand(data, "OBJECTREMOVED", meta == null ? void 0 : meta.triggerKey);
  }
};

// src/utils/message-center/command/change/command-change.ts
var CommandChange = class extends CommandBase {
};

// src/utils/message-center/command/async-action/command-async-action.ts
var CommandAsyncAction = class extends CommandBase {
  /**
   * @description 发送消息
   * @param {IPortalAsyncAction} data
   * @memberof CommandAsyncAction
   */
  send(data) {
    this.sendCommand(data, "ASYNCACTION");
  }
};

// src/utils/message-center/command/internal-message/command-internal-message.ts
var CommandInternalMessage = class extends CommandBase {
  /**
   * @description 发送消息
   * @param {IInternalMessage} data
   * @memberof CommandInternalMessage
   */
  send(data) {
    this.sendCommand(data, "INTERNALMESSAGE");
  }
};

// src/utils/message-center/command/mark-open-data/command-mark-open-data.ts
var CommandMarkOpenData = class extends CommandBase {
  /**
   * @description 发送消息
   * @param {IMarkOpenData} data
   * @memberof CommandMarkOpenData
   */
  send(data) {
    this.sendCommand(data, "MARKOPENDATA");
  }
};

// src/utils/message-center/command/add-in-changed/command-add-in-changed.ts
var CommandAddInChanged = class extends CommandBase {
  /**
   * @description 发送消息
   * @param {IAddInChanged} data
   * @memberof CommandAddInChanged
   */
  send(data) {
    this.sendCommand(data, "ADDINCHANGED");
  }
};

// src/utils/message-center/command/message-command.ts
var MessageCommand = class extends MessageBase {
  constructor() {
    super(...arguments);
    /**
     * @description 数据变更指令消息控制器
     * @type {CommandChange}
     * @memberof MessageCommand
     */
    this.change = new CommandChange();
    /**
     * @description 新建数据指令消息控制器
     * @type {CommandCreate}
     * @memberof MessageCommand
     */
    this.create = new CommandCreate(this);
    /**
     * @description 更新数据指令消息控制器
     * @type {CommandUpdate}
     * @memberof MessageCommand
     */
    this.update = new CommandUpdate(this);
    /**
     * @description 删除数据指令消息控制器
     * @type {CommandRemove}
     * @memberof MessageCommand
     */
    this.remove = new CommandRemove(this);
    /**
     * @description 异步指令消息控制器
     * @type {CommandAsyncAction}
     * @memberof MessageCommand
     */
    this.asyncAction = new CommandAsyncAction(this);
    /**
     * @description 站内信消息指令消息控制器
     * @type {CommandInternalMessage}
     * @memberof MessageCommand
     */
    this.internalMessage = new CommandInternalMessage(
      this
    );
    /**
     * @description 协同指令消息控制器
     * @type {CommandMarkOpenData}
     * @memberof MessageCommand
     */
    this.markOpenData = new CommandMarkOpenData(this);
    /**
     * @description 添加变更指令消息控制器
     * @type {CommandAddInChanged}
     * @memberof MessageCommand
     */
    this.addInChanged = new CommandAddInChanged(this);
  }
  /**
   * @description 推送指令消息
   * @param {IPortalMessage} msg
   * @memberof MessageCommand
   */
  next(msg) {
    switch (msg.subtype) {
      case "OBJECTCREATED":
        this.create.next(msg);
        this.change.next(msg);
        break;
      case "OBJECTUPDATED":
        this.update.next(msg);
        this.change.next(msg);
        break;
      case "OBJECTREMOVED":
        this.remove.next(msg);
        this.change.next(msg);
        break;
      case "ASYNCACTION":
        this.asyncAction.next(msg);
        break;
      case "INTERNALMESSAGE":
        this.internalMessage.next(msg);
        break;
      case "MARKOPENDATA":
        this.markOpenData.next(msg);
        break;
      case "ADDINCHANGED":
        this.addInChanged.next(msg);
        break;
      default:
        super.next(msg);
    }
  }
  /**
   * @description 发送消息给父级
   * @protected
   * @param {IPortalMessage} msg
   * @memberof MessageCommand
   */
  nextParent(msg) {
    switch (msg.subtype) {
      case "OBJECTCREATED":
        this.change.next(msg);
        break;
      case "OBJECTUPDATED":
        this.change.next(msg);
        break;
      case "OBJECTREMOVED":
        this.change.next(msg);
        break;
      default:
    }
    super.nextParent(msg);
  }
  /**
   * @description 发送指令消息
   * @param {IData} data
   * @param {IPortalMessage['subtype']} subtype
   * @param {string} [triggerKey]
   * @memberof MessageCommand
   */
  send(data, subtype, triggerKey) {
    const msg = {
      messageid: createUUID2(),
      messagename: "command",
      type: "COMMAND",
      subtype,
      triggerKey,
      data
    };
    this.next(msg);
  }
};

// src/utils/message-center/console/message-console.ts
import { createUUID as createUUID3 } from "qx-util";
var MessageConsole = class extends MessageBase {
  /**
   * @description 发送消息
   * @param {(IData | string)} data
   * @memberof MessageConsole
   */
  send(data) {
    const msg = {
      messageid: createUUID3(),
      messagename: "console",
      type: "CONSOLE",
      data
    };
    this.next(msg);
  }
};

// src/utils/message-center/error/message-error.ts
import { createUUID as createUUID4 } from "qx-util";
var MessageError = class extends MessageBase {
  /**
   * @description 发送消息
   * @param {(IData | string)} data
   * @memberof MessageError
   */
  send(data) {
    const msg = {
      messageid: createUUID4(),
      messagename: "error",
      type: "ERROR",
      data
    };
    this.next(msg);
  }
};

// src/utils/message-center/message-center.ts
var MessageCenter = class {
  constructor() {
    /**
     * @description 所有消息
     * @protected
     * @type {MessageAll}
     * @memberof MessageCenter
     */
    this.all = new MessageAll();
    /**
     * @description 指令消息
     * @type {MessageCommand}
     * @memberof MessageCenter
     */
    this.command = new MessageCommand(this.all);
    /**
     * @description 日志消息
     * @type {MessageConsole}
     * @memberof MessageCenter
     */
    this.console = new MessageConsole(this.all);
    /**
     * @description 错误消息
     * @type {MessageError}
     * @memberof MessageCenter
     */
    this.error = new MessageError(this.all);
  }
  /**
   * @description 发送消息
   * @param {IPortalMessage} msg 消息
   * @memberof MessageCenter
   */
  next(msg) {
    if (msg.type === "COMMAND") {
      this.command.next(msg);
    } else if (msg.type === "CONSOLE") {
      this.console.next(msg);
    } else {
      this.all.next(msg);
    }
  }
  /**
   * @description 订阅消息
   * @param {(msg: IPortalMessage) => void} callback
   * @memberof MessageCenter
   */
  on(callback) {
    this.all.on(callback);
  }
  /**
   * @description 取消订阅
   * @param {(msg: IPortalMessage) => void} callback
   * @memberof MessageCenter
   */
  off(callback) {
    this.all.off(callback);
  }
};

// src/utils/namespace/namespace.ts
var defaultNamespace = "ibiz";
var statePrefix = "is-";
function _bem(namespace, block, blockSuffix, element, modifier) {
  let cls = "".concat(namespace, "-").concat(block);
  if (blockSuffix) {
    cls += "-".concat(blockSuffix);
  }
  if (element) {
    cls += "__".concat(element);
  }
  if (modifier) {
    cls += "--".concat(modifier);
  }
  return cls;
}
var Namespace = class {
  /**
   * Creates an instance of Namespace.
   * @param {string} block 当前命名空间的根模块,例如组件的名称
   * @param {string} [namespace] 指定命名空间，未指定使用默认值 ibiz
   * @memberof Namespace
   */
  constructor(block, namespace) {
    this.block = block;
    this.namespace = namespace || defaultNamespace;
  }
  /**
   * @description namespace-block、namespace-block-blockSuffix
   * @param {string} [blockSuffix='']
   * @returns {*}  {string}
   * @memberof Namespace
   */
  b(blockSuffix = "") {
    return _bem(this.namespace, this.block, blockSuffix, "", "");
  }
  /**
   * @description namespace-block__element
   * @param {string} [element]
   * @returns {*}  {string}
   * @memberof Namespace
   */
  e(element) {
    return element ? _bem(this.namespace, this.block, "", element, "") : "";
  }
  /**
   * @description namespace-block--modifier
   * @param {string} [modifier]
   * @returns {*}  {string}
   * @memberof Namespace
   */
  m(modifier) {
    return modifier ? _bem(this.namespace, this.block, "", "", modifier) : "";
  }
  /**
   * @description namespace-block-blockSuffix__element
   * @param {string} [blockSuffix]
   * @param {string} [element]
   * @returns {*}  {string}
   * @memberof Namespace
   */
  be(blockSuffix, element) {
    return blockSuffix && element ? _bem(this.namespace, this.block, blockSuffix, element, "") : "";
  }
  /**
   * @description namespace-block__element--modifier
   * @param {string} [element]
   * @param {string} [modifier]
   * @returns {*}  {string}
   * @memberof Namespace
   */
  em(element, modifier) {
    return element && modifier ? _bem(this.namespace, this.block, "", element, modifier) : "";
  }
  /**
   * @description namespace-block-blockSuffix--modifier
   * @param {string} [blockSuffix]
   * @param {string} [modifier]
   * @returns {*}  {string}
   * @memberof Namespace
   */
  bm(blockSuffix, modifier) {
    return blockSuffix && modifier ? _bem(this.namespace, this.block, blockSuffix, "", modifier) : "";
  }
  /**
   * @description namespace-block-blockSuffix__element--modifier
   * @param {string} [blockSuffix]
   * @param {string} [element]
   * @param {string} [modifier]
   * @returns {*}  {string}
   * @memberof Namespace
   */
  bem(blockSuffix, element, modifier) {
    return blockSuffix && element && modifier ? _bem(this.namespace, this.block, blockSuffix, element, modifier) : "";
  }
  /**
   * @description 返回状态类
   * @param {string} name
   * @param {boolean} [state]
   * @example
   * ```typescript
   * is('loading', false) => '';
   * is('loading', true) => 'is-loading';
   * ```
   * @returns {*}  {string}
   * @memberof Namespace
   */
  is(name, state) {
    return name && state ? "".concat(statePrefix).concat(name) : "";
  }
  /**
   * @description 生成使用到的 css 变量 style 对象
   * @param {Record<string, string>} object
   * @returns {*}  {Record<string, string>}
   * @memberof Namespace
   */
  cssVar(object) {
    const styles = {};
    for (const key in object) {
      if (object[key]) {
        styles[this.cssVarName(key)] = object[key];
      }
    }
    return styles;
  }
  /**
   * @description 生成使用到的 css block 变量 style 对象
   * @param {Record<string, string>} object
   * @returns {*}  {Record<string, string>}
   * @memberof Namespace
   */
  cssVarBlock(object) {
    const styles = {};
    for (const key in object) {
      if (object[key]) {
        styles[this.cssVarBlockName(key)] = object[key];
      }
    }
    return styles;
  }
  /**
   * @description 生成 css var 变量名称
   * @param {string} name
   * @returns {*}  {string}
   * @memberof Namespace
   */
  cssVarName(name) {
    return "--".concat(this.namespace, "-").concat(name);
  }
  /**
   * @description 生成块 css var 变量名称
   * @param {string} name
   * @returns {*}  {string}
   * @memberof Namespace
   */
  cssVarBlockName(name) {
    return "--".concat(this.namespace, "-").concat(this.block, "-").concat(name);
  }
};

// src/utils/net/http-response.ts
import axios from "axios";
var HttpResponse = class {
  /**
   * Creates an instance of HttpResponse.
   * @param {unknown} [data] 返回的数据
   * @param {number} [status] 状态码 (默认为 200)
   * @param {string} [statusText] 状态描述 (默认为空字符)
   * @param {RawAxiosResponseHeaders | AxiosResponseHeaders} [headers] 响应头
   * @memberof HttpResponse
   */
  constructor(data, status, statusText, headers) {
    /**
     * @description 本地仿造响应
     * @memberof HttpResponse
     */
    this.local = true;
    this.ok = false;
    this.headers = {};
    this.config = {
      headers: new axios.AxiosHeaders()
    };
    this.data = data;
    this.status = status || 200;
    this.statusText = statusText || "";
    if (this.status >= 200 && this.status < 300) {
      this.ok = true;
    }
    if (headers) {
      this.headers = headers;
    }
  }
};

// src/utils/net/net.ts
import axios2 from "axios";
import { merge } from "lodash-es";
import qs from "qs";
import { notNilEmpty } from "qx-util";
import { mergeDeepRight } from "ramda";
var Net = class {
  /**
   * Creates an instance of Net.
   * @param {CreateAxiosDefaults} [config] 创建实例用的默认配置
   * @memberof Net
   */
  constructor(config) {
    /**
     * @description 是否为 http || https 开头
     * @protected
     * @memberof Net
     */
    this.urlReg = /^http[s]?:\/\/[^\s]*/;
    /**
     * @description 请求等待队列，防止重复请求。当有完全相同请求参数的请求时，会等待上一个请求完成后把结果返回给当前请求，不会重复请求（key: 由请求的 config 生成的字符串,用于唯一标识请求，value: 当前正在请求的 Promise）
     * @protected
     * @memberof Net
     */
    this.waitRequest = /* @__PURE__ */ new Map();
    /**
     * @description 注册的拦截器
     * @type {Map<string, Interceptor>}
     * @memberof Net
     */
    this.interceptors = /* @__PURE__ */ new Map();
    this.instance = axios2.create(config);
    this.addInterceptor("Default", new CoreInterceptor());
  }
  get baseUrl() {
    return this.instance.defaults.baseURL || "".concat(ibiz.env.baseUrl, "/").concat(ibiz.env.appId);
  }
  /**
   * @description 添加拦截器
   * @param {string} name 唯一标识
   * @param {Interceptor} interceptor 拦截器
   * @memberof Net
   */
  addInterceptor(name, interceptor) {
    interceptor.use(this.instance);
    this.interceptors.set(name, interceptor);
  }
  /**
   * @description 删除拦截器
   * @param {string} name 唯一标识
   * @memberof Net
   */
  removeInterceptor(name) {
    const interceptor = this.interceptors.get(name);
    if (interceptor) {
      interceptor.eject(this.instance);
      this.interceptors.delete(name);
    }
  }
  /**
   * @description 预置config,绑定动态的配置
   * @readonly
   * @protected
   * @type {AxiosRequestConfig}
   * @memberof Net
   */
  get presetConfig() {
    return {
      // 请求前缀路径
      baseURL: this.baseUrl,
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Accept: "application/json"
      }
    };
  }
  /**
   * @description 从左到右递归合并配置参数（内置第一个合并的预置参数）
   * @protected
   * @param {...AxiosRequestConfig[]} configs
   * @returns {*}  {AxiosRequestConfig}
   * @memberof Net
   */
  mergeConfig(...configs) {
    const config = this.presetConfig;
    if (configs.length === 0) {
      return config;
    }
    const { url } = configs[0];
    if (url && this.urlReg.test(url)) {
      delete config.baseURL;
    }
    return merge(config, ...configs);
  }
  /**
   * @description Post 请求
   * @param {string} url
   * @param {IData} data
   * @param {IParams} [params={}]
   * @param {RawAxiosRequestHeaders} [headers={}]
   * @returns {*}  {Promise<IHttpResponse>}
   * @memberof Net
   */
  async post(url, data, params = {}, headers = {}) {
    url = this.handleAppPresetParam(url, params, data);
    try {
      const response = await this.request(url, {
        method: "post",
        data,
        headers
      });
      return this.doResponseResult(response);
    } catch (error) {
      throw await HttpErrorFactory.getInstance(error);
    }
  }
  /**
   * @description Get 请求
   * @param {string} url
   * @param {IParams} [params={}]
   * @param {RawAxiosRequestHeaders} [headers={}]
   * @param {AxiosRequestConfig} [option={}]
   * @returns {*}  {Promise<IHttpResponse>}
   * @memberof Net
   */
  async get(url, params = {}, headers = {}, option = {}) {
    url = this.attachUrlParam(url, params);
    try {
      const response = await this.request(
        url,
        merge({ method: "get", headers }, option)
      );
      return this.doResponseResult(response);
    } catch (error) {
      throw await HttpErrorFactory.getInstance(error);
    }
  }
  /**
   * @description Delete 请求
   * @param {string} url
   * @param {IParams} [params={}]
   * @param {RawAxiosRequestHeaders} [headers={}]
   * @returns {*}  {Promise<IHttpResponse>}
   * @memberof Net
   */
  async delete(url, params = {}, headers = {}) {
    url = this.handleAppPresetParam(url, params);
    try {
      const response = await this.request(url, { method: "delete", headers });
      return this.doResponseResult(response);
    } catch (error) {
      throw await HttpErrorFactory.getInstance(error);
    }
  }
  /**
   * @description Put 请求
   * @param {string} url
   * @param {IData} data
   * @param {IParams} [params={}]
   * @param {RawAxiosRequestHeaders} [headers={}]
   * @returns {*}  {Promise<IHttpResponse>}
   * @memberof Net
   */
  async put(url, data, params = {}, headers = {}) {
    url = this.handleAppPresetParam(url, params);
    try {
      const response = await this.request(url, {
        method: "put",
        data,
        headers
      });
      return this.doResponseResult(response);
    } catch (error) {
      throw await HttpErrorFactory.getInstance(error);
    }
  }
  /**
   * @description 获取模型数据
   * @param {string} url
   * @param {RawAxiosRequestHeaders} [headers={}]
   * @returns {*}  {Promise<IHttpResponse>}
   * @memberof Net
   */
  async getModel(url, headers = {}) {
    try {
      const response = await this.instance.get(url, {
        headers
      });
      return this.doResponseResult(response);
    } catch (error) {
      throw await HttpErrorFactory.getInstance(error);
    }
  }
  /**
   * @description 基础请求方法，会合并预置配置
   * @param {string} url
   * @param {AxiosRequestConfig} [config={}]
   * @returns {*}  {Promise<IHttpResponse>}
   * @memberof Net
   */
  async request(url, config = {}) {
    const cfg = this.mergeConfig({ url }, config);
    const key = JSON.stringify(cfg);
    try {
      let requestPromise = null;
      if (!this.waitRequest.has(key)) {
        requestPromise = this.instance.request(cfg);
        this.waitRequest.set(key, requestPromise);
      } else {
        requestPromise = this.waitRequest.get(key);
      }
      const response = await requestPromise;
      if (this.waitRequest.has(key)) {
        this.waitRequest.delete(key);
      }
      return this.doResponseResult(response);
    } catch (error) {
      if (this.waitRequest.has(key)) {
        this.waitRequest.delete(key);
      }
      throw await HttpErrorFactory.getInstance(error);
    }
  }
  /**
   * @description 创建标准 axios 请求
   * @param {AxiosRequestConfig<IData>} config
   * @returns {*}  {Promise<AxiosResponse>}
   * @memberof Net
   */
  axios(config) {
    return axios2(config);
  }
  /**
   * @description 触发 sse 请求
   * @param {string} url
   * @param {IParams} params
   * @param {FetchEventSourceInit} [options={}]
   * @returns {*}  {Promise<void>}
   * @memberof Net
   */
  async sse(url, params, options = {}) {
    url = this.attachUrlParam(this.baseUrl + url, params);
    if (!options.headers) {
      options.headers = {};
    }
    const headers = options.headers;
    {
      const token = getToken();
      if (token) {
        headers["".concat(ibiz.env.tokenHeader, "Authorization")] = "".concat(ibiz.env.tokenPrefix, "Bearer ").concat(getToken());
      }
      let systemId = ibiz.env.dcSystem;
      const { orgData } = ibiz;
      if (orgData) {
        if (orgData.systemid) {
          systemId = orgData.systemid;
        }
        if (orgData.orgid) {
          headers.srforgid = orgData.orgid;
        }
      }
      headers.srfsystemid = systemId;
    }
    const config = mergeDeepRight(
      {
        openWhenHidden: true,
        method: "POST"
      },
      options
    );
    await fetchEventSource(url, config);
  }
  /**
   * @description 统一处理请求返回
   * @private
   * @param {AxiosResponse} response
   * @returns {*}  {IHttpResponse}
   * @memberof Net
   */
  doResponseResult(response) {
    const res = response;
    if (res.status >= 200 && res.status <= 299) {
      res.ok = true;
      const resData = res.data;
      if (resData === "" || resData === null) {
        res.data = void 0;
      }
    }
    return res;
  }
  /**
   * @description 处理平台预定义参数
   * @private
   * @param {string} url
   * @param {IParams} params
   * @param {IData} [data={}]
   * @returns {*}  {string}
   * @memberof Net
   */
  handleAppPresetParam(url, params, data = {}) {
    if (data && Object.prototype.hasOwnProperty.call(data, "srfversionid")) {
      params.srfversionid = data.srfversionid;
    }
    if (data && Object.prototype.hasOwnProperty.call(data, "srfmenuitem")) {
      delete data.srfmenuitem;
    }
    if (data && Object.prototype.hasOwnProperty.call(data, "srfexportdataset")) {
      delete data.srfexportdataset;
    }
    if (data && Object.prototype.hasOwnProperty.call(data, "srfexportdatakey")) {
      delete data.srfexportdatakey;
    }
    if (params && Object.prototype.hasOwnProperty.call(params, "srfdefdata")) {
      delete params.srfdefdata;
    }
    if (params) {
      return this.attachUrlParam(url, params);
    }
    return url;
  }
  /**
   * @description url 附加请求参数，并处理路径的字符转换 encode
   * @private
   * @param {string} url
   * @param {IParams} params
   * @returns {*}  {string}
   * @memberof Net
   */
  attachUrlParam(url, params) {
    if (params && Object.prototype.hasOwnProperty.call(params, "srfdefdata")) {
      delete params.srfdefdata;
    }
    if (params && Object.prototype.hasOwnProperty.call(params, "srfmenuitem")) {
      delete params.srfmenuitem;
    }
    {
      const urlSplit = url.split("?");
      urlSplit[0] = urlSplit[0].split("/").map((item) => encodeURIComponent(item)).join("/");
      url = urlSplit.length > 1 ? urlSplit.join("?") : urlSplit[0];
    }
    const strParams = qs.stringify(params);
    if (notNilEmpty(strParams)) {
      if (url.endsWith("?")) {
        url = "".concat(url).concat(strParams);
      } else if (url.indexOf("?") !== -1 && url.endsWith("&")) {
        url = "".concat(url).concat(strParams);
      } else if (url.indexOf("?") !== -1 && !url.endsWith("&")) {
        url = "".concat(url, "&").concat(strParams);
      } else {
        url = "".concat(url, "?").concat(strParams);
      }
    }
    return url;
  }
};

// src/utils/string-util/string-util.ts
import { notNilEmpty as notNilEmpty2 } from "qx-util";
var StringUtil = class {
  /**
   * @description 填充字符串中的数据 用法：传入需要替换的字符串和对象 返回值是string类型
   * @example
   * ```
   * StringUtil.fill('姓名:${context.name},年龄:${data.age}', { name: '张三', age: 10 }, {name: '王二', age: 19}, { name: '李四', age: 25 }); // => '姓名:张三,年龄:25'
   * StringUtil.fill('', { name: '张三', age: 10 }, {name: '王二', age: 19}, { name: '李四', age: 25 }); // => ''
   * ```
   * @static
   * @param {string} str 需填充字符串
   * @param {IContext} [context] 上下文
   * @param {IParams} [params] 参数
   * @param {IData} [data] 数据
   * @return {*}  {string}
   * @memberof StringUtil
   */
  static fill(str, context, params, data) {
    if (notNilEmpty2(str)) {
      if (notNilEmpty2(context)) {
        const strArr = str.match(this.contextReg);
        strArr == null ? void 0 : strArr.forEach((_key) => {
          const key = _key.slice(10, _key.length - 1);
          str = str.replace("${context.".concat(key, "}"), context[key] || "");
        });
      }
      if (notNilEmpty2(params)) {
        const strArr = str.match(this.paramsReg);
        strArr == null ? void 0 : strArr.forEach((_key) => {
          const key = _key.slice(9, _key.length - 1);
          str = str.replace("${params.".concat(key, "}"), params[key] || "");
        });
      }
      if (notNilEmpty2(data)) {
        const strArr = str.match(this.dataReg);
        strArr == null ? void 0 : strArr.forEach((_key) => {
          const key = _key.slice(7, _key.length - 1);
          str = str.replace("${data.".concat(key, "}"), data[key] || "");
        });
      }
    }
    return str;
  }
};
/**
 * @description 上下文替换正则
 * @static
 * @memberof StringUtil
 */
StringUtil.contextReg = /\$\{context.[a-zA-Z_$][a-zA-Z0-9_$]{1,}\}/g;
/**
 * @description 数据替换正则
 * @static
 * @memberof StringUtil
 */
StringUtil.dataReg = /\$\{data.[a-zA-Z_$][a-zA-Z0-9_$]{1,}\}/g;
/**
 * @description 参数替换正则
 * @static
 * @memberof StringUtil
 */
StringUtil.paramsReg = /\$\{params.[a-zA-Z_$][a-zA-Z0-9_$]{1,}\}/g;

// src/utils/url-helper/url-helper.ts
var UrlHelper = class {
  /**
   * @description 路由路径前面的基础路径。如：http://172.16.103.120:30061/portalwebapp/#/index/appportalview?params=123，返回：http://172.16.103.120:30061/portalwebapp/#
   * @readonly
   * @static
   * @type {string}
   * @memberof UrlHelper
   */
  static get routeBase() {
    const hashIndex = window.location.href.lastIndexOf("#/");
    return window.location.href.slice(0, hashIndex + 1);
  }
  /**
   * @description 应用的的基础路径。如：http://172.16.103.120:30061/portalwebapp/#/index/appportalview?params=123，返回：http://172.16.103.120:30061/portalwebapp
   * @readonly
   * @static
   * @type {string}
   * @memberof UrlHelper
   */
  static get appBase() {
    const { origin, pathname } = window.location;
    return "".concat(origin).concat(pathname).replace(/\/$/, "");
  }
  /**
   * @description #开始到末尾，即路由地址。如：http://172.16.103.120:30061/portalwebapp/#/index/appportalview?params=123，返回：/index/appportalview?params=123
   * @readonly
   * @static
   * @type {string}
   * @memberof UrlHelper
   */
  static get routePath() {
    return window.location.hash.replace("#", "");
  }
  /**
   * @description 当前地址的全路径，包含域名和参数。如：http://172.16.103.120:30061/portalwebapp/#/index/appportalview?params=123
   * @readonly
   * @static
   * @type {string}
   * @memberof UrlHelper
   */
  static get fullPath() {
    return window.location.href;
  }
};

// src/utils/event/event.ts
function eventPath(event) {
  const path = event.composedPath && event.composedPath() || event.path;
  if (path != null)
    return path;
  function getParents(node, memo = []) {
    const parentNode = node.parentNode;
    return parentNode ? getParents(parentNode, memo.concat([parentNode])) : memo;
  }
  return [event.target].concat(getParents(event.target));
}
function listenJSEvent(target, eventName, listener, options = {}) {
  target.addEventListener(eventName, listener, options);
  let cleanup = () => {
    target.removeEventListener(eventName, listener, options);
    cleanup = NOOP;
  };
  return () => {
    cleanup();
  };
}
function isEventInside(event, el) {
  return el && (event.target === el || eventPath(event).includes(el));
}

// src/utils/history-list/history-item.ts
var _HistoryItem = class _HistoryItem {
  constructor(data = {}) {
    this.data = data;
    this._prev = _HistoryItem.Undefined;
    this._next = _HistoryItem.Undefined;
  }
  /**
   * @description 克隆整个历史链
   * @returns {*}  {HistoryItem<E>}
   * @memberof HistoryItem
   */
  clone() {
    throw new RuntimeError(ibiz.i18n.t("core.utils.unrealized"));
  }
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
_HistoryItem.Undefined = new _HistoryItem(void 0);
var HistoryItem = _HistoryItem;

// src/utils/history-list/history-list.ts
import { clone as clone2 } from "ramda";
var HistoryList = class _HistoryList {
  /**
   * @description 当前的数据
   * @readonly
   * @type {E}
   * @memberof HistoryList
   */
  get data() {
    return this._cur.data;
  }
  /**
   * Creates an instance of HistoryList.
   * @param {E} data
   * @memberof HistoryList
   */
  constructor(data) {
    this._cur = new HistoryItem(data);
  }
  /**
   * @description 先创建一次历史记录，再赋值
   * @param {IData} data
   * @memberof HistoryList
   */
  assign(data) {
    if (data) {
      this.save();
      Object.assign(this._cur.data, data);
    }
  }
  /**
   * @description 创建一次历史记录
   * @memberof HistoryList
   */
  save() {
    const oldCur = this._cur;
    const data = clone2(oldCur.data);
    const history = new HistoryItem(data);
    history._prev = oldCur;
    oldCur._next._prev = HistoryItem.Undefined;
    this._clear(oldCur._next);
    oldCur._next = history;
    this._cur = history;
  }
  /**
   * @description 上一步
   * @returns {*}  {boolean}
   * @memberof HistoryList
   */
  prev() {
    if (this._cur._prev && this._cur._prev !== HistoryItem.Undefined) {
      this._cur = this._cur._prev;
      return true;
    }
    return false;
  }
  /**
   * @description 下一步
   * @returns {*}  {boolean}
   * @memberof HistoryList
   */
  next() {
    if (this._cur._next && this._cur._next !== HistoryItem.Undefined) {
      this._cur = this._cur._next;
      return true;
    }
    return false;
  }
  /**
   * @description 清空引用，避免内存泄漏
   * @protected
   * @param {HistoryItem<E>} h
   * @memberof HistoryList
   */
  _clear(h) {
    if (h._prev && h._prev !== HistoryItem.Undefined) {
      h._prev._next = HistoryItem.Undefined;
      this._clear(h._prev);
      h._prev = HistoryItem.Undefined;
    }
    if (h._next && h._next !== HistoryItem.Undefined) {
      h._next._prev = HistoryItem.Undefined;
      this._clear(h._next);
      h._next = HistoryItem.Undefined;
    }
    h.data = {};
  }
  /**
   * @description 禁止克隆，直接返回当前实例
   * @protected
   * @returns {*}  {HistoryList<E>}
   * @memberof HistoryList
   */
  clone() {
    const history = new _HistoryList({});
    history._cur = clone2(this._cur);
    return this;
  }
  /**
   * @description 销毁
   * @memberof HistoryList
   */
  destroy() {
    this._clear(this._cur);
  }
};

// src/utils/click-outside/click-outside.ts
var defaultWindow = typeof window !== "undefined" ? window : void 0;
function onClickOutside(target, handler, options = {}) {
  const { window: window2 = defaultWindow, ignore = [], capture = true } = options;
  if (!target)
    throw new RuntimeError(ibiz.i18n.t("core.utils.targetElement"));
  if (!window2)
    throw new RuntimeError(ibiz.i18n.t("core.utils.cannotFindWindow"));
  let shouldListen = true;
  const isOutside = (event) => {
    return ![target, ...ignore].some((el) => {
      return isEventInside(event, el);
    });
  };
  let isPaused = false;
  const pause = () => {
    isPaused = true;
  };
  const proceed = () => {
    isPaused = false;
  };
  let fallback;
  const listener = (event) => {
    if (isPaused)
      return;
    window2.clearTimeout(fallback);
    if (!(shouldListen && isOutside(event)))
      return;
    handler(event);
  };
  const cleanups = [
    listenJSEvent(window2, "click", listener, { passive: true, capture }),
    listenJSEvent(
      window2,
      "pointerdown",
      (e) => {
        if (isPaused)
          return;
        shouldListen = isOutside(e);
      },
      { passive: true }
    ),
    listenJSEvent(
      window2,
      "pointerup",
      (e) => {
        if (isPaused)
          return;
        if (e.button === 0) {
          const path = eventPath(e);
          e.composedPath = () => path;
          fallback = window2.setTimeout(() => listener(e), 50);
        }
      },
      { passive: true }
    )
  ].filter(Boolean);
  const stop = () => cleanups.forEach((fn) => fn());
  return { stop, pause, proceed };
}

// src/utils/color/color.ts
var r = Math.round;
function toRGBA(color) {
  const l = color.length;
  const rgba = [];
  if (color.slice(0, 3).toLowerCase() === "rgb") {
    const d = color.match(/([\d|.%]{1,3})/g);
    rgba[0] = parseInt(d[0], 10);
    rgba[1] = parseInt(d[1], 10);
    rgba[2] = parseInt(d[2], 10);
    rgba[3] = d[3] ? d[3].indexOf("%") !== -1 ? parseInt(d[3], 10) / 100 : parseFloat(d[3]) : 1;
  } else {
    let d;
    if (l < 6)
      d = parseInt(
        String(color[1]) + color[1] + color[2] + color[2] + color[3] + color[3] + (l > 4 ? String(color[4]) + color[4] : ""),
        16
      );
    else
      d = parseInt(color.slice(1), 16);
    rgba[0] = d >> 16 & 255;
    rgba[1] = d >> 8 & 255;
    rgba[2] = d & 255;
    rgba[3] = l === 9 || l === 5 ? r((d >> 24 & 255) / 255 * 1e4) / 1e4 : 1;
  }
  return rgba;
}
function colorBlend(color1, color2, p = 0.5, format = "hex") {
  color1 = color1.trim();
  color2 = color2.trim();
  const c1 = toRGBA(color1);
  const c2 = toRGBA(color2);
  const result = [
    r((1 - p) * c1[0] + p * c2[0]),
    r((1 - p) * c1[1] + p * c2[1]),
    r((1 - p) * c1[2] + p * c2[2]),
    (1 - p) * c1[3] + p * c2[3]
  ];
  if (format === "hex") {
    const hex = [
      result[0].toString(16).padStart(2, "0"),
      result[1].toString(16).padStart(2, "0"),
      result[2].toString(16).padStart(2, "0"),
      result[3] === 0 ? "00" : r(result[3] * 255).toString(16).padStart(2, "0")
    ];
    return "#".concat(hex[0]).concat(hex[1]).concat(hex[2]).concat(hex[3]);
  }
  return "rgb(".concat(result[0], " ").concat(result[1], " ").concat(result[2], " / ").concat(result[3], ")");
}

// src/utils/download-file/download-file.ts
function calcMimeByFileName(fileName) {
  const ext = fileName.includes(".") ? fileName.split(".").pop() : "";
  let mime = "";
  switch (ext) {
    case "wps":
      mime = "application/kswps";
      break;
    case "doc":
      mime = "application/msword";
      break;
    case "docx":
      mime = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
      break;
    case "txt":
      mime = "text/plain";
      break;
    case "zip":
      mime = "application/zip";
      break;
    case "png":
      mime = "image/png";
      break;
    case "gif":
      mime = "image/gif";
      break;
    case "jpeg":
      mime = "image/jpeg";
      break;
    case "jpg":
      mime = "image/jpeg";
      break;
    case "rtf":
      mime = "application/rtf";
      break;
    case "avi":
      mime = "video/x-msvideo";
      break;
    case "gz":
      mime = "application/x-gzip";
      break;
    case "tar":
      mime = "application/x-tar";
      break;
    case "xls":
      mime = "application/vnd.ms-excel";
      break;
    case "xlsx":
      mime = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
      break;
    case "pdf":
      mime = "application/pdf";
      break;
    case "html":
      mime = "text/html";
      break;
    default:
      mime = "";
  }
  return mime;
}
function isImage(fileName) {
  const ext = fileName.includes(".") ? fileName.split(".").pop() : "";
  if (!ext) {
    return false;
  }
  const imageTypes = ["jpeg", "jpg", "gif", "png", "bmp", "svg"];
  return imageTypes.includes(ext);
}
function downloadFileFromBlob(file, fileName) {
  const filetype = calcMimeByFileName(fileName);
  const blob = new Blob([file], { type: filetype });
  const href = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = href;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(href);
}

// src/utils/upload/select-file.ts
import { merge as merge2 } from "lodash-es";
function fileListToArr(fileList) {
  const files = [];
  for (let i = 0; i < fileList.length; i++) {
    files.push(fileList[i]);
  }
  return files;
}
function selectFile(_opts) {
  const opts = merge2(
    {
      multiple: true,
      accept: ""
    },
    _opts
  );
  const input = document.createElement("input");
  input.setAttribute("type", "file");
  input.setAttribute("multiple", "".concat(opts.multiple));
  input.setAttribute("accept", opts.accept);
  let fileCancel = true;
  input.onchange = (e) => {
    const inputEl = e.target;
    const files = inputEl.files ? fileListToArr(inputEl.files) : [];
    if (files.length === 0) {
      return;
    }
    fileCancel = false;
    opts.onSelected(files);
    inputEl.value = "";
  };
  document.body.appendChild(input);
  input.click();
  window.addEventListener(
    "focus",
    () => {
      setTimeout(() => {
        if (fileCancel && opts.onCancel) {
          opts.onCancel();
        }
      }, 300);
    },
    { once: true }
  );
  document.body.removeChild(input);
}

// src/utils/upload/upload-file.ts
import { cloneDeep, isFunction, merge as merge3, round, uniqueId } from "lodash-es";
function uploadFile(_opts) {
  const opts = merge3(
    {
      multiple: true,
      accept: "",
      separate: true,
      beforeUpload: (_fileData, _files) => true,
      finish: (_resultFiles) => {
      },
      success: (_resultFiles, _res) => {
      },
      error: (_resultFiles, _error) => {
      },
      progress: (_files) => {
      }
    },
    _opts
  );
  const onUploadProgress = (event, files) => {
    files.forEach((file) => {
      file.percentage = round(event.progress * 100);
    });
    opts.progress(cloneDeep(files));
  };
  const uploadRequest = async (files, _onProgress) => {
    if (opts.request && isFunction(opts.request)) {
      return opts.request(files);
    }
    const data = new FormData();
    files.forEach((file) => {
      data.append("file", file);
    });
    throw new RuntimeError(ibiz.i18n.t("core.utils.multiApplicationMode"));
  };
  const executeSingleUpload = async (files) => {
    const resultFiles = files.map((file) => {
      return {
        status: "uploading",
        name: file.name,
        uid: uniqueId(),
        percentage: 0
      };
    });
    const pass = opts.beforeUpload(files, resultFiles);
    if (!pass) {
      resultFiles.forEach((file) => {
        file.status = "cancel";
      });
      ibiz.log.debug("\u53D6\u6D88\u4E0A\u4F20", resultFiles);
      return resultFiles;
    }
    try {
      const res = await uploadRequest(files, (event) => {
        onUploadProgress(event, resultFiles);
      });
      resultFiles.forEach((file) => {
        file.status = "finished";
      });
      opts.success(resultFiles, res);
      resultFiles.forEach((file) => {
        file.response = res;
      });
    } catch (error) {
      resultFiles.forEach((file) => {
        file.status = "fail";
      });
      opts.error(resultFiles, error);
      resultFiles.forEach((file) => {
        file.error = error;
      });
      ibiz.log.error(error);
      ibiz.log.error(
        ibiz.i18n.t("core.utils.uploadFailed", {
          file: files.map((file) => file.name).join(",")
        })
      );
    }
    return resultFiles;
  };
  const uploadFiles = async (files) => {
    const uploadSequence = opts.separate ? files.map((file) => [file]) : [files];
    const res = await Promise.allSettled(
      uploadSequence.map(async (sequence) => {
        return executeSingleUpload(sequence);
      })
    );
    const resultFiles = [];
    res.forEach((result) => {
      if (result.status === "fulfilled") {
        resultFiles.push(...result.value);
      }
    });
    opts.finish(resultFiles);
  };
  const select = () => {
    selectFile({
      accept: opts.accept,
      multiple: opts.multiple,
      onSelected: (files) => {
        uploadFiles(files);
      }
    });
  };
  select();
}

// src/utils/sync/await-timeout.ts
async function awaitTimeout(wait, fun, params) {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, wait);
  });
  if (fun) {
    return fun(...params || []);
  }
}

// src/utils/sync/count-latch.ts
var CountLatch = class {
  constructor() {
    this.promise = null;
    this.resolve = null;
    /**
     * @description 计数，当前等待的异步逻辑个数
     * @type {number}
     * @memberof CountLatch
     */
    this.count = 0;
  }
  /**
   * @description 开启promise
   * @private
   * @memberof CountLatch
   */
  startPromise() {
    this.promise = new Promise((resolve) => {
      this.resolve = resolve;
    });
  }
  /**
   * @description 结束promise
   * @private
   * @memberof CountLatch
   */
  endPromise() {
    if (this.resolve) {
      this.resolve();
      this.resolve = null;
      this.promise = null;
    }
  }
  /**
   * @description 上锁，计数加一，第一次计数，开启异步
   * @memberof CountLatch
   */
  lock() {
    this.count += 1;
    if (!this.promise) {
      this.startPromise();
    }
  }
  /**
   * @description 解锁，计数减一，归零时结束异步
   * @memberof CountLatch
   */
  unlock() {
    if (this.count < 1) {
      throw new RuntimeError(ibiz.i18n.t("core.utils.notMatchLockUnlock"));
    }
    this.count -= 1;
    if (this.count === 0) {
      this.endPromise();
    }
  }
  /**
   * @description 等待，计数归零异步结束
   * @returns {*}  {Promise<void>}
   * @memberof CountLatch
   */
  async await() {
    if (this.promise) {
      await this.promise;
    }
  }
};

// src/utils/style/remote-style.ts
async function setRemoteStyle(url) {
  try {
    const res = await ibiz.net.get(url);
    const styleDom = document.createElement("style");
    styleDom.setAttribute("title", "app-style-css");
    styleDom.innerText = res.data;
    document.head.appendChild(styleDom);
  } catch (error) {
    ibiz.log.debug(ibiz.i18n.t("core.utils.remoteStylesheet"), url);
  }
}

// src/utils/recursive/find-recursive-child.ts
import { mergeDeepRight as mergeDeepRight2 } from "ramda";
var IterateOpts = {
  /** 子集合属性数组 */
  childrenFields: ["children"],
  /** 是否跳出当前操作 */
  isBreak: false
};
var ReturnError = new Error("\u4E2D\u65AD\u64CD\u4F5C");
function getChildField(parent, fields) {
  var _a;
  for (const field of fields) {
    if ((_a = parent[field]) == null ? void 0 : _a.length) {
      return parent[field];
    }
  }
}
function getChildFieldObj(parent, fields) {
  for (const field of fields) {
    if (parent[field]) {
      return parent[field];
    }
  }
}
function _recursiveIterate(parent, callback, opts) {
  const { childrenFields } = mergeDeepRight2(IterateOpts, opts || {});
  const children = getChildField(parent, childrenFields);
  if (children == null ? void 0 : children.length) {
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      const result = callback(child, parent);
      if (result) {
        if (opts == null ? void 0 : opts.isBreak) {
          break;
        }
        throw ReturnError;
      }
      recursiveIterate(child, callback, opts);
    }
  }
}
function recursiveIterate(parent, callback, opts) {
  try {
    _recursiveIterate(parent, callback, opts);
  } catch (error) {
    if (error !== ReturnError) {
      throw error;
    }
  }
}
function _recursiveExecute(parent, callback, opts) {
  const { childrenFields } = mergeDeepRight2(IterateOpts, opts || {});
  const children = getChildFieldObj(parent, childrenFields);
  if (children) {
    for (let i = 0; i < Object.values(children).length; i++) {
      const child = Object.values(children)[i];
      const result = callback(child, parent);
      if (result) {
        if (opts == null ? void 0 : opts.isBreak) {
          break;
        }
        throw ReturnError;
      }
      _recursiveExecute(child, callback, opts);
    }
  }
}
function recursiveExecute(parent, callback, opts) {
  try {
    _recursiveExecute(parent, callback, opts);
  } catch (error) {
    if (error !== ReturnError) {
      throw error;
    }
  }
}
var CompareOpts = {
  ...IterateOpts,
  /** 比较的属性 */
  compareField: "name"
};
function findRecursiveChild(parent, key, opts) {
  const { compareField, compareCallback } = mergeDeepRight2(
    CompareOpts,
    opts || {}
  );
  const _compareCallback = compareCallback || ((child) => {
    return child[compareField] === key;
  });
  let find;
  recursiveIterate(
    parent,
    (item) => {
      if (_compareCallback(item, key, compareField)) {
        find = item;
        return true;
      }
    },
    opts
  );
  return find;
}

// src/utils/data-type/data-types.ts
var DataTypes = class {
  /**
   * @description 是否是数值类型
   * @static
   * @param {number} dataType
   * @returns {*}  {boolean}
   * @memberof DataTypes
   */
  static isNumber(dataType) {
    const numberTypes = [
      "BIGINT",
      "BINARY",
      "DECIMAL",
      "FLOAT",
      "INT",
      "MONEY",
      "NUMERIC",
      "REAL",
      "SMALLINT",
      "SMALLMONEY",
      "TINYINT",
      "VARBINARY"
    ];
    return numberTypes.includes(this.toString(dataType));
  }
  /**
   * @description 是否是日期类型数据
   * @static
   * @param {number} dataType
   * @returns {*}  {boolean}
   * @memberof DataTypes
   */
  static isDate(dataType) {
    const dateTypes = ["DATETIME", "SMALLDATETIME", "DATE", "TIME"];
    return dateTypes.includes(this.toString(dataType));
  }
  /**
   * @description 获取字符串数据类型
   * @static
   * @param {number} dataType
   * @returns {*}  {string}
   * @memberof DataTypes
   */
  static toString(dataType) {
    return this.typeMap[dataType];
  }
};
/**
 * @description 数字类型映射字符串类型
 * @static
 * @type {{ [p: number]: string }}
 * @memberof DataTypes
 */
DataTypes.typeMap = {
  0: "UNKNOWN",
  1: "BIGINT",
  2: "BINARY",
  3: "BIT",
  4: "CHAR",
  5: "DATETIME",
  6: "DECIMAL",
  7: "FLOAT",
  8: "IMAGE",
  9: "INT",
  10: "MONEY",
  11: "NCHAR",
  12: "NTEXT",
  13: "NVARCHAR",
  14: "NUMERIC",
  15: "REAL",
  16: "SMALLDATETIME",
  17: "SMALLINT",
  18: "SMALLMONEY",
  19: "SQL_VARIANT",
  20: "SYSNAME",
  21: "TEXT",
  22: "TIMESTAMP",
  23: "TINYINT",
  24: "VARBINARY",
  25: "VARCHAR",
  26: "UNIQUEIDENTIFIER",
  27: "DATE",
  // 纯日期型
  28: "TIME",
  // 纯时间
  29: "BIGDECIMAL"
  // 大数值
};

// src/utils/clone/clone.ts
import { cloneDeepWith, cloneWith, isFunction as isFunction2, isObject } from "lodash-es";
import { mergeDeepRight as mergeDeepRight3 } from "ramda";
function customizeFn(value) {
  if (isObject(value) && isFunction2(value.clone)) {
    return value.clone();
  }
}
var DefaultCloneOpts = {
  deep: true
};
function clone3(value, opts) {
  const options = mergeDeepRight3(DefaultCloneOpts, opts || {});
  if (options.deep) {
    return cloneDeepWith(value, customizeFn);
  }
  return cloneWith(value, customizeFn);
}

// src/utils/bit-mask/bit-mask.ts
function validate(permission) {
  return !!permission && !(permission & permission - 1);
}
function validateAndThrow(permission) {
  const isPowerOf2 = validate(permission);
  if (!isPowerOf2) {
    throw new RuntimeError(
      ibiz.i18n.t("core.utils.powerOfTwo", { permission })
    );
  }
}
function setPermission(allPermissions = 0, permission) {
  validateAndThrow(permission);
  return allPermissions | permission;
}
function removePermission(allPermissions = 0, permission) {
  validateAndThrow(permission);
  return allPermissions & ~permission;
}
function checkPermission(allPermissions = 0, permission) {
  validateAndThrow(permission);
  return (allPermissions & permission) !== 0;
}
var BitMask = {
  validate,
  setPermission,
  removePermission,
  checkPermission
};

// src/locale/en/index.ts
var en = {
  core: {
    command: {
      unregisteredCommand: "Unregistered command: {id}, please register the command first"
    },
    error: {
      networkAbnormality: "Network abnormality, please try again later",
      modelMsg: "\u300C{id}\u300D model {msg}",
      unsupportedModels: "Unsupported models",
      modelConfigurationMissing: "Model Configuration Missing",
      serviceException: "Exception in service handling",
      serviceResNotExist: "Request resource path does not exist",
      serviceResNotPermission: "Requesting resources without permission"
    },
    utils: {
      powerOfTwo: "{permission} is not a power of two.",
      targetElement: "The target element does not exist",
      cannotFindWindow: "Cannot find window",
      unrealized: "unrealized",
      remoteStylesheet: "Failed to load remote stylesheet",
      notMatchLockUnlock: "The lock and unlock counts do not match!",
      multiApplicationMode: "Multi-application mode waiting for reimplementation requests",
      uploadFailed: "{file}Upload failed",
      invalidInputValue: "Invalid input value, must be >= 0"
    },
    noReInstall: "ibiz already exists, no need to re-install it"
  }
};

// src/locale/zh-CN/index.ts
var zhCn = {
  core: {
    command: {
      unregisteredCommand: "\u672A\u6CE8\u518C\u6307\u4EE4: {id}\uFF0C\u8BF7\u5148\u6CE8\u518C\u6307\u4EE4"
    },
    error: {
      networkAbnormality: "\u7F51\u7EDC\u5F02\u5E38\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5",
      modelMsg: "\u300C{id}\u300D\u6A21\u578B {msg}",
      unsupportedModels: "\u672A\u652F\u6301\u7684\u6A21\u578B",
      modelConfigurationMissing: "\u6A21\u578B\u914D\u7F6E\u7F3A\u5931",
      serviceException: "\u670D\u52A1\u5904\u7406\u5F02\u5E38",
      serviceResNotExist: "\u8BF7\u6C42\u8D44\u6E90\u8DEF\u5F84\u4E0D\u5B58\u5728",
      serviceResNotPermission: "\u8BF7\u6C42\u8D44\u6E90\u65E0\u6743\u9650"
    },
    utils: {
      powerOfTwo: "{permission}\u4E0D\u662F2\u7684\u5E42",
      targetElement: "target\u5143\u7D20\u4E0D\u5B58\u5728",
      cannotFindWindow: "\u627E\u4E0D\u5230window",
      unrealized: "\u672A\u5B9E\u73B0",
      remoteStylesheet: "\u672A\u5B9E\u73B0\u52A0\u8F7D\u8FDC\u7A0B\u6837\u5F0F\u8868\u5931\u8D25",
      notMatchLockUnlock: "lock\u548Cunlock\u6B21\u6570\u4E0D\u5339\u914D\uFF01",
      multiApplicationMode: "\u591A\u5E94\u7528\u6A21\u5F0F\u7B49\u5F85\u91CD\u65B0\u5B9E\u73B0\u8BF7\u6C42",
      uploadFailed: "{file}Upload failed",
      invalidInputValue: "\u65E0\u6548\u8F93\u5165\u503C\uFF0C\u5FC5\u987B>=0"
    },
    noReInstall: "ibiz \u5DF2\u7ECF\u5B58\u5728, \u65E0\u9700\u91CD\u590D\u5B89\u88C5"
  }
};

// src/utils/logger/logger.ts
import Logger from "loglevel";
import prefix from "loglevel-plugin-prefix";
var originalFactory = Logger.methodFactory;
var NOOP2 = (message) => {
};
Logger.methodFactory = (methodName, logLevel, loggerName) => {
  var _a, _b;
  const rawMethod = originalFactory(methodName, logLevel, loggerName);
  if (((_a = window.Environment) == null ? void 0 : _a.environmentTag) === "production") {
    if (methodName === "error" || methodName === "warn" || methodName === "debug") {
      return NOOP2;
    }
  }
  if (((_b = window.Environment) == null ? void 0 : _b.environmentTag) === "test") {
    if (methodName === "error" || methodName === "warn") {
      return NOOP2;
    }
  }
  return rawMethod;
};
var logger = Logger.noConflict();
prefix.reg(logger);
prefix.apply(logger);

// src/ibizsys.ts
var IBizSys = class {
  constructor() {
    /**
     * @description 环境变量
     * @memberof IBizSys
     */
    this.env = Environment;
    /**
     * @description 日志输出工具类
     * @type {Logger}
     * @memberof IBizSys
     */
    this.log = logger;
    /**
     * @description 网络请求工具类(发送默认请求)
     * @type {Net}
     * @memberof IBizSys
     */
    this.net = new Net();
    /**
     * @description 指令工具类
     * @type {CommandController}
     * @memberof IBizSys
     */
    this.commands = new CommandController();
    /**
     * @description 消息中心
     * @type {MessageCenter}
     * @memberof IBizSys
     */
    this.mc = new MessageCenter();
  }
  /**
   * @description 注册全局扩展，用于替换预置能力
   * @param {keyof IBizSys} key
   * @param {*} value
   * @memberof IBizSys
   */
  registerExtension(key, value) {
    const self = this;
    self[key] = value;
  }
};

// src/install.ts
function install() {
  if (window.ibiz) {
    throw new Error(ibiz.i18n.t("core.noReInstall"));
  }
  window.ibiz = new IBizSys();
}
export {
  BitMask,
  CommandController,
  CommandsRegistry,
  CoreConst,
  CoreInterceptor,
  CountLatch,
  DataTypes,
  EMOJILIST,
  EMOJIMAP,
  EntityError,
  Environment,
  EventStreamContentType,
  HistoryItem,
  HistoryList,
  HttpError,
  HttpErrorFactory,
  HttpResponse,
  HttpStatusMessageConst,
  IBizContext,
  IBizParams,
  IBizSys,
  Interceptor,
  LinkedList,
  LoginMode,
  MenuPermissionMode,
  MessageCenter,
  ModelError,
  NOOP,
  Namespace,
  Net,
  NoticeError,
  RuntimeError,
  RuntimeModelError,
  StringUtil,
  UrlHelper,
  _recursiveExecute,
  awaitTimeout,
  base64ToBlob,
  base64ToStr,
  calcMimeByFileName,
  calcOpenModeStyle,
  clearAppCookie,
  clone3 as clone,
  colorBlend,
  commands,
  compareArr,
  debounce,
  debounceAndAsyncMerge,
  debounceAndMerge,
  downloadFileFromBlob,
  en,
  eventPath,
  fetchEventSource,
  fileListToArr,
  findRecursiveChild,
  fixJsonString,
  getAppCookie,
  getRandomInt,
  getToken,
  install,
  isBase64,
  isBase64Image,
  isElementSame,
  isEmoji,
  isEventInside,
  isImage,
  isOverlap,
  isSvg,
  listenJSEvent,
  mergeDefaultInLeft,
  mergeInLeft,
  onClickOutside,
  plus,
  recursiveExecute,
  recursiveIterate,
  resetAppCookie,
  selectFile,
  setAppCookie,
  setCookie,
  setRemoteStyle,
  showTitle,
  strToBase64,
  throttle,
  toDisposable,
  toNumberOrNil,
  updateKeyDefine,
  uploadFile,
  zhCn
};
