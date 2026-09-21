import './style.css';
var Sn = Object.defineProperty;
var kn = (n, e, t) => e in n ? Sn(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var x = (n, e, t) => (kn(n, typeof e != "symbol" ? e + "" : e, t), t);
import Pe from "interactjs";
import Vt from "cherry-markdown";
var Le, b, qt, jt, ne, ct, Yt, Xe, Xt, re = {}, Zt = [], Nn = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i, ze = Array.isArray;
function G(n, e) {
  for (var t in e)
    n[t] = e[t];
  return n;
}
function Gt(n) {
  var e = n.parentNode;
  e && e.removeChild(n);
}
function j(n, e, t) {
  var i, s, o, a = {};
  for (o in e)
    o == "key" ? i = e[o] : o == "ref" ? s = e[o] : a[o] = e[o];
  if (arguments.length > 2 && (a.children = arguments.length > 3 ? Le.call(arguments, 2) : t), typeof n == "function" && n.defaultProps != null)
    for (o in n.defaultProps)
      a[o] === void 0 && (a[o] = n.defaultProps[o]);
  return Se(n, a, i, s, null);
}
function Se(n, e, t, i, s) {
  var o = { type: n, props: e, key: t, ref: i, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, __h: null, constructor: void 0, __v: s == null ? ++qt : s };
  return s == null && b.vnode != null && b.vnode(o), o;
}
function lt() {
  return { current: null };
}
function Y(n) {
  return n.children;
}
function F(n, e) {
  this.props = n, this.context = e;
}
function ge(n, e) {
  if (e == null)
    return n.__ ? ge(n.__, n.__.__k.indexOf(n) + 1) : null;
  for (var t; e < n.__k.length; e++)
    if ((t = n.__k[e]) != null && t.__e != null)
      return t.__d || t.__e;
  return typeof n.type == "function" ? ge(n) : null;
}
function Jt(n) {
  var e, t;
  if ((n = n.__) != null && n.__c != null) {
    for (n.__e = n.__c.base = null, e = 0; e < n.__k.length; e++)
      if ((t = n.__k[e]) != null && t.__e != null) {
        n.__e = n.__c.base = t.__e;
        break;
      }
    return Jt(n);
  }
}
function Ze(n) {
  (!n.__d && (n.__d = !0) && ne.push(n) && !Ee.__r++ || ct !== b.debounceRendering) && ((ct = b.debounceRendering) || Yt)(Ee);
}
function Ee() {
  var n, e, t, i, s, o, a, r, u;
  for (ne.sort(Xe); n = ne.shift(); )
    n.__d && (e = ne.length, i = void 0, s = void 0, o = void 0, r = (a = (t = n).__v).__e, (u = t.__P) && (i = [], s = [], (o = G({}, a)).__v = a.__v + 1, tt(u, a, o, t.__n, u.ownerSVGElement !== void 0, a.__h != null ? [r] : null, i, r == null ? ge(a) : r, a.__h, s), tn(i, a, s), a.__e != r && Jt(a)), ne.length > e && ne.sort(Xe));
  Ee.__r = 0;
}
function Kt(n, e, t, i, s, o, a, r, u, h, p) {
  var l, v, _, d, f, m, w, g, T, C = 0, S = i && i.__k || Zt, O = S.length, L = O, U = e.length;
  for (t.__k = [], l = 0; l < U; l++)
    (d = t.__k[l] = (d = e[l]) == null || typeof d == "boolean" || typeof d == "function" ? null : typeof d == "string" || typeof d == "number" || typeof d == "bigint" ? Se(null, d, null, null, d) : ze(d) ? Se(Y, { children: d }, null, null, null) : d.__b > 0 ? Se(d.type, d.props, d.key, d.ref ? d.ref : null, d.__v) : d) != null ? (d.__ = t, d.__b = t.__b + 1, (g = En(d, S, w = l + C, L)) === -1 ? _ = re : (_ = S[g] || re, S[g] = void 0, L--), tt(n, d, _, s, o, a, r, u, h, p), f = d.__e, (v = d.ref) && _.ref != v && (_.ref && nt(_.ref, null, d), p.push(v, d.__c || f, d)), f != null && (m == null && (m = f), (T = _ === re || _.__v === null) ? g == -1 && C-- : g !== w && (g === w + 1 ? C++ : g > w ? L > U - w ? C += g - w : C-- : C = g < w && g == w - 1 ? g - w : 0), w = l + C, typeof d.type != "function" || g === w && _.__k !== d.__k ? typeof d.type == "function" || g === w && !T ? d.__d !== void 0 ? (u = d.__d, d.__d = void 0) : u = f.nextSibling : u = en(n, f, u) : u = Qt(d, u, n), typeof t.type == "function" && (t.__d = u))) : (_ = S[l]) && _.key == null && _.__e && (_.__e == u && (_.__ = i, u = ge(_)), Ge(_, _, !1), S[l] = null);
  for (t.__e = m, l = O; l--; )
    S[l] != null && (typeof t.type == "function" && S[l].__e != null && S[l].__e == t.__d && (t.__d = S[l].__e.nextSibling), Ge(S[l], S[l]));
}
function Qt(n, e, t) {
  for (var i, s = n.__k, o = 0; s && o < s.length; o++)
    (i = s[o]) && (i.__ = n, e = typeof i.type == "function" ? Qt(i, e, t) : en(t, i.__e, e));
  return e;
}
function Me(n, e) {
  return e = e || [], n == null || typeof n == "boolean" || (ze(n) ? n.some(function(t) {
    Me(t, e);
  }) : e.push(n)), e;
}
function en(n, e, t) {
  return t == null || t.parentNode !== n ? n.insertBefore(e, null) : e == t && e.parentNode != null || n.insertBefore(e, t), e.nextSibling;
}
function En(n, e, t, i) {
  var s = n.key, o = n.type, a = t - 1, r = t + 1, u = e[t];
  if (u === null || u && s == u.key && o === u.type)
    return t;
  if (i > (u != null ? 1 : 0))
    for (; a >= 0 || r < e.length; ) {
      if (a >= 0) {
        if ((u = e[a]) && s == u.key && o === u.type)
          return a;
        a--;
      }
      if (r < e.length) {
        if ((u = e[r]) && s == u.key && o === u.type)
          return r;
        r++;
      }
    }
  return -1;
}
function Mn(n, e, t, i, s) {
  var o;
  for (o in t)
    o === "children" || o === "key" || o in e || $e(n, o, null, t[o], i);
  for (o in e)
    s && typeof e[o] != "function" || o === "children" || o === "key" || o === "value" || o === "checked" || t[o] === e[o] || $e(n, o, e[o], t[o], i);
}
function ut(n, e, t) {
  e[0] === "-" ? n.setProperty(e, t == null ? "" : t) : n[e] = t == null ? "" : typeof t != "number" || Nn.test(e) ? t : t + "px";
}
function $e(n, e, t, i, s) {
  var o;
  e:
    if (e === "style")
      if (typeof t == "string")
        n.style.cssText = t;
      else {
        if (typeof i == "string" && (n.style.cssText = i = ""), i)
          for (e in i)
            t && e in t || ut(n.style, e, "");
        if (t)
          for (e in t)
            i && t[e] === i[e] || ut(n.style, e, t[e]);
      }
    else if (e[0] === "o" && e[1] === "n")
      o = e !== (e = e.replace(/(PointerCapture)$|Capture$/, "$1")), e = e.toLowerCase() in n ? e.toLowerCase().slice(2) : e.slice(2), n.l || (n.l = {}), n.l[e + o] = t, t ? i ? t.u = i.u : (t.u = Date.now(), n.addEventListener(e, o ? ht : dt, o)) : n.removeEventListener(e, o ? ht : dt, o);
    else if (e !== "dangerouslySetInnerHTML") {
      if (s)
        e = e.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
      else if (e !== "width" && e !== "height" && e !== "href" && e !== "list" && e !== "form" && e !== "tabIndex" && e !== "download" && e !== "rowSpan" && e !== "colSpan" && e !== "role" && e in n)
        try {
          n[e] = t == null ? "" : t;
          break e;
        } catch (a) {
        }
      typeof t == "function" || (t == null || t === !1 && e[4] !== "-" ? n.removeAttribute(e) : n.setAttribute(e, t));
    }
}
function dt(n) {
  var e = this.l[n.type + !1];
  if (n.t) {
    if (n.t <= e.u)
      return;
  } else
    n.t = Date.now();
  return e(b.event ? b.event(n) : n);
}
function ht(n) {
  return this.l[n.type + !0](b.event ? b.event(n) : n);
}
function tt(n, e, t, i, s, o, a, r, u, h) {
  var p, l, v, _, d, f, m, w, g, T, C, S, O, L, U, z = e.type;
  if (e.constructor !== void 0)
    return null;
  t.__h != null && (u = t.__h, r = e.__e = t.__e, e.__h = null, o = [r]), (p = b.__b) && p(e);
  e:
    if (typeof z == "function")
      try {
        if (w = e.props, g = (p = z.contextType) && i[p.__c], T = p ? g ? g.props.value : p.__ : i, t.__c ? m = (l = e.__c = t.__c).__ = l.__E : ("prototype" in z && z.prototype.render ? e.__c = l = new z(w, T) : (e.__c = l = new F(w, T), l.constructor = z, l.render = An), g && g.sub(l), l.props = w, l.state || (l.state = {}), l.context = T, l.__n = i, v = l.__d = !0, l.__h = [], l._sb = []), l.__s == null && (l.__s = l.state), z.getDerivedStateFromProps != null && (l.__s == l.state && (l.__s = G({}, l.__s)), G(l.__s, z.getDerivedStateFromProps(w, l.__s))), _ = l.props, d = l.state, l.__v = e, v)
          z.getDerivedStateFromProps == null && l.componentWillMount != null && l.componentWillMount(), l.componentDidMount != null && l.__h.push(l.componentDidMount);
        else {
          if (z.getDerivedStateFromProps == null && w !== _ && l.componentWillReceiveProps != null && l.componentWillReceiveProps(w, T), !l.__e && (l.shouldComponentUpdate != null && l.shouldComponentUpdate(w, l.__s, T) === !1 || e.__v === t.__v)) {
            for (e.__v !== t.__v && (l.props = w, l.state = l.__s, l.__d = !1), e.__e = t.__e, e.__k = t.__k, e.__k.forEach(function(ye) {
              ye && (ye.__ = e);
            }), C = 0; C < l._sb.length; C++)
              l.__h.push(l._sb[C]);
            l._sb = [], l.__h.length && a.push(l);
            break e;
          }
          l.componentWillUpdate != null && l.componentWillUpdate(w, l.__s, T), l.componentDidUpdate != null && l.__h.push(function() {
            l.componentDidUpdate(_, d, f);
          });
        }
        if (l.context = T, l.props = w, l.__P = n, l.__e = !1, S = b.__r, O = 0, "prototype" in z && z.prototype.render) {
          for (l.state = l.__s, l.__d = !1, S && S(e), p = l.render(l.props, l.state, l.context), L = 0; L < l._sb.length; L++)
            l.__h.push(l._sb[L]);
          l._sb = [];
        } else
          do
            l.__d = !1, S && S(e), p = l.render(l.props, l.state, l.context), l.state = l.__s;
          while (l.__d && ++O < 25);
        l.state = l.__s, l.getChildContext != null && (i = G(G({}, i), l.getChildContext())), v || l.getSnapshotBeforeUpdate == null || (f = l.getSnapshotBeforeUpdate(_, d)), Kt(n, ze(U = p != null && p.type === Y && p.key == null ? p.props.children : p) ? U : [U], e, t, i, s, o, a, r, u, h), l.base = e.__e, e.__h = null, l.__h.length && a.push(l), m && (l.__E = l.__ = null);
      } catch (ye) {
        e.__v = null, (u || o != null) && (e.__e = r, e.__h = !!u, o[o.indexOf(r)] = null), b.__e(ye, e, t);
      }
    else
      o == null && e.__v === t.__v ? (e.__k = t.__k, e.__e = t.__e) : e.__e = $n(t.__e, e, t, i, s, o, a, u, h);
  (p = b.diffed) && p(e);
}
function tn(n, e, t) {
  for (var i = 0; i < t.length; i++)
    nt(t[i], t[++i], t[++i]);
  b.__c && b.__c(e, n), n.some(function(s) {
    try {
      n = s.__h, s.__h = [], n.some(function(o) {
        o.call(s);
      });
    } catch (o) {
      b.__e(o, s.__v);
    }
  });
}
function $n(n, e, t, i, s, o, a, r, u) {
  var h, p, l, v = t.props, _ = e.props, d = e.type, f = 0;
  if (d === "svg" && (s = !0), o != null) {
    for (; f < o.length; f++)
      if ((h = o[f]) && "setAttribute" in h == !!d && (d ? h.localName === d : h.nodeType === 3)) {
        n = h, o[f] = null;
        break;
      }
  }
  if (n == null) {
    if (d === null)
      return document.createTextNode(_);
    n = s ? document.createElementNS("http://www.w3.org/2000/svg", d) : document.createElement(d, _.is && _), o = null, r = !1;
  }
  if (d === null)
    v === _ || r && n.data === _ || (n.data = _);
  else {
    if (o = o && Le.call(n.childNodes), p = (v = t.props || re).dangerouslySetInnerHTML, l = _.dangerouslySetInnerHTML, !r) {
      if (o != null)
        for (v = {}, f = 0; f < n.attributes.length; f++)
          v[n.attributes[f].name] = n.attributes[f].value;
      (l || p) && (l && (p && l.__html == p.__html || l.__html === n.innerHTML) || (n.innerHTML = l && l.__html || ""));
    }
    if (Mn(n, _, v, s, r), l)
      e.__k = [];
    else if (Kt(n, ze(f = e.props.children) ? f : [f], e, t, i, s && d !== "foreignObject", o, a, o ? o[0] : t.__k && ge(t, 0), r, u), o != null)
      for (f = o.length; f--; )
        o[f] != null && Gt(o[f]);
    r || ("value" in _ && (f = _.value) !== void 0 && (f !== n.value || d === "progress" && !f || d === "option" && f !== v.value) && $e(n, "value", f, v.value, !1), "checked" in _ && (f = _.checked) !== void 0 && f !== n.checked && $e(n, "checked", f, v.checked, !1));
  }
  return n;
}
function nt(n, e, t) {
  try {
    typeof n == "function" ? n(e) : n.current = e;
  } catch (i) {
    b.__e(i, t);
  }
}
function Ge(n, e, t) {
  var i, s;
  if (b.unmount && b.unmount(n), (i = n.ref) && (i.current && i.current !== n.__e || nt(i, null, e)), (i = n.__c) != null) {
    if (i.componentWillUnmount)
      try {
        i.componentWillUnmount();
      } catch (o) {
        b.__e(o, e);
      }
    i.base = i.__P = null, n.__c = void 0;
  }
  if (i = n.__k)
    for (s = 0; s < i.length; s++)
      i[s] && Ge(i[s], e, t || typeof n.type != "function");
  t || n.__e == null || Gt(n.__e), n.__ = n.__e = n.__d = void 0;
}
function An(n, e, t) {
  return this.constructor(n, t);
}
function ae(n, e, t) {
  var i, s, o, a;
  b.__ && b.__(n, e), s = (i = typeof t == "function") ? null : t && t.__k || e.__k, o = [], a = [], tt(e, n = (!i && t || e).__k = j(Y, null, [n]), s || re, re, e.ownerSVGElement !== void 0, !i && t ? [t] : s ? null : e.firstChild ? Le.call(e.childNodes) : null, o, !i && t ? t : s ? s.__e : e.firstChild, i, a), tn(o, n, a);
}
function In(n, e) {
  var t = { __c: e = "__cC" + Xt++, __: n, Consumer: function(i, s) {
    return i.children(s);
  }, Provider: function(i) {
    var s, o;
    return this.getChildContext || (s = [], (o = {})[e] = this, this.getChildContext = function() {
      return o;
    }, this.shouldComponentUpdate = function(a) {
      this.props.value !== a.value && s.some(function(r) {
        r.__e = !0, Ze(r);
      });
    }, this.sub = function(a) {
      s.push(a);
      var r = a.componentWillUnmount;
      a.componentWillUnmount = function() {
        s.splice(s.indexOf(a), 1), r && r.call(a);
      };
    }), i.children;
  } };
  return t.Provider.__ = t.Consumer.contextType = t;
}
Le = Zt.slice, b = { __e: function(n, e, t, i) {
  for (var s, o, a; e = e.__; )
    if ((s = e.__c) && !s.__)
      try {
        if ((o = s.constructor) && o.getDerivedStateFromError != null && (s.setState(o.getDerivedStateFromError(n)), a = s.__d), s.componentDidCatch != null && (s.componentDidCatch(n, i || {}), a = s.__d), a)
          return s.__E = s;
      } catch (r) {
        n = r;
      }
  throw n;
} }, qt = 0, jt = function(n) {
  return n != null && n.constructor === void 0;
}, F.prototype.setState = function(n, e) {
  var t;
  t = this.__s != null && this.__s !== this.state ? this.__s : this.__s = G({}, this.state), typeof n == "function" && (n = n(G({}, t), this.props)), n && G(t, n), n != null && this.__v && (e && this._sb.push(e), Ze(this));
}, F.prototype.forceUpdate = function(n) {
  this.__v && (this.__e = !0, n && this.__h.push(n), Ze(this));
}, F.prototype.render = Y, ne = [], Yt = typeof Promise == "function" ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, Xe = function(n, e) {
  return n.__v.__b - e.__v.__b;
}, Ee.__r = 0, Xt = 0;
const Dn = "ibiz", Ln = "is-";
function ee(n, e, t, i, s) {
  let o = "".concat(n, "-").concat(e);
  return t && (o += "-".concat(t)), i && (o += "__".concat(i)), s && (o += "--".concat(s)), o;
}
class M {
  /**
   * Creates an instance of Namespace.
   *
   * @author chitanda
   * @date 2022-09-06 12:09:12
   * @param {string} block 当前命名空间的根模块,例如组件的名称
   * @param {string} [namespace] 指定命名空间，未指定使用默认值 ibiz
   */
  constructor(e, t) {
    /**
     * 命名空间
     *
     * @author chitanda
     * @date 2023-11-03 10:11:31
     * @type {string}
     */
    x(this, "namespace");
    this.block = e, this.namespace = t || Dn;
  }
  /**
   * namespace-block
   * namespace-block-blockSuffix
   *
   * @author chitanda
   * @date 2022-09-06 12:09:08
   * @param {string} [blockSuffix='']
   * @return {*}  {string}
   */
  b(e = "") {
    return ee(this.namespace, this.block, e, "", "");
  }
  /**
   * namespace-block__element
   *
   * @author chitanda
   * @date 2022-09-06 12:09:48
   * @param {string} [element]
   * @return {*}  {string}
   */
  e(e) {
    return e ? ee(this.namespace, this.block, "", e, "") : "";
  }
  /**
   * namespace-block--modifier
   *
   * @author chitanda
   * @date 2022-09-06 12:09:37
   * @param {string} [modifier]
   * @return {*}  {string}
   */
  m(e) {
    return e ? ee(this.namespace, this.block, "", "", e) : "";
  }
  /**
   * namespace-block-blockSuffix__element
   *
   * @author chitanda
   * @date 2022-09-06 12:09:52
   * @param {string} [blockSuffix]
   * @param {string} [element]
   * @return {*}  {string}
   */
  be(e, t) {
    return e && t ? ee(this.namespace, this.block, e, t, "") : "";
  }
  /**
   * namespace-block__element--modifier
   *
   * @author chitanda
   * @date 2022-09-06 12:09:19
   * @param {string} [element]
   * @param {string} [modifier]
   * @return {*}  {string}
   */
  em(e, t) {
    return e && t ? ee(this.namespace, this.block, "", e, t) : "";
  }
  /**
   * namespace-block-blockSuffix--modifier
   *
   * @author chitanda
   * @date 2022-09-06 12:09:59
   * @param {string} [blockSuffix]
   * @param {string} [modifier]
   * @return {*}  {string}
   */
  bm(e, t) {
    return e && t ? ee(this.namespace, this.block, e, "", t) : "";
  }
  /**
   * namespace-block-blockSuffix__element--modifier
   *
   * @author chitanda
   * @date 2022-09-06 12:09:37
   * @param {string} [blockSuffix]
   * @param {string} [element]
   * @param {string} [modifier]
   * @return {*}  {string}
   */
  bem(e, t, i) {
    return e && t && i ? ee(this.namespace, this.block, e, t, i) : "";
  }
  /**
   * 返回状态 class
   *
   * is('loading', false) => '';
   * is('loading', true) => 'is-loading';
   *
   * @author chitanda
   * @date 2022-09-06 12:09:57
   * @param {string} name
   * @param {boolean} [state]
   * @return {*}  {string}
   */
  is(e, t) {
    return e && t ? "".concat(Ln).concat(e) : "";
  }
  /**
   * 生成使用到的 css 变量 style 对象
   *
   * @author chitanda
   * @date 2022-09-06 15:09:41
   * @param {Record<string, string>} object
   * @return {*}  {Record<string, string>}
   */
  cssVar(e) {
    const t = {};
    for (const i in e)
      e[i] && (t[this.cssVarName(i)] = e[i]);
    return t;
  }
  /**
   * 生成使用到的 css block 变量 style 对象
   *
   * @author chitanda
   * @date 2022-09-06 15:09:03
   * @param {Record<string, string>} object
   * @return {*}  {Record<string, string>}
   */
  cssVarBlock(e) {
    const t = {};
    for (const i in e)
      e[i] && (t[this.cssVarBlockName(i)] = e[i]);
    return t;
  }
  /**
   * 生成 css var 变量名称
   *
   * @author chitanda
   * @date 2022-09-06 15:09:21
   * @param {string} name
   * @return {*}  {string}
   */
  cssVarName(e) {
    return "--".concat(this.namespace, "-").concat(e);
  }
  /**
   * 生成块 css var 变量名称
   *
   * @author chitanda
   * @date 2022-09-06 15:09:35
   * @param {string} name
   * @return {*}  {string}
   */
  cssVarBlockName(e) {
    return "--".concat(this.namespace, "-").concat(this.block, "-").concat(e);
  }
}
function W(n) {
  if (typeof n != "string")
    throw new TypeError("Path must be a string. Received " + JSON.stringify(n));
}
function pt(n, e) {
  for (var t = "", i = 0, s = -1, o = 0, a, r = 0; r <= n.length; ++r) {
    if (r < n.length)
      a = n.charCodeAt(r);
    else {
      if (a === 47)
        break;
      a = 47;
    }
    if (a === 47) {
      if (!(s === r - 1 || o === 1))
        if (s !== r - 1 && o === 2) {
          if (t.length < 2 || i !== 2 || t.charCodeAt(t.length - 1) !== 46 || t.charCodeAt(t.length - 2) !== 46) {
            if (t.length > 2) {
              var u = t.lastIndexOf("/");
              if (u !== t.length - 1) {
                u === -1 ? (t = "", i = 0) : (t = t.slice(0, u), i = t.length - 1 - t.lastIndexOf("/")), s = r, o = 0;
                continue;
              }
            } else if (t.length === 2 || t.length === 1) {
              t = "", i = 0, s = r, o = 0;
              continue;
            }
          }
          e && (t.length > 0 ? t += "/.." : t = "..", i = 2);
        } else
          t.length > 0 ? t += "/" + n.slice(s + 1, r) : t = n.slice(s + 1, r), i = r - s - 1;
      s = r, o = 0;
    } else
      a === 46 && o !== -1 ? ++o : o = -1;
  }
  return t;
}
function zn(n, e) {
  var t = e.dir || e.root, i = e.base || (e.name || "") + (e.ext || "");
  return t ? t === e.root ? t + i : t + n + i : i;
}
var ve = {
  // path.resolve([from ...], to)
  resolve: function() {
    for (var e = "", t = !1, i, s = arguments.length - 1; s >= -1 && !t; s--) {
      var o;
      s >= 0 ? o = arguments[s] : (i === void 0 && (i = process.cwd()), o = i), W(o), o.length !== 0 && (e = o + "/" + e, t = o.charCodeAt(0) === 47);
    }
    return e = pt(e, !t), t ? e.length > 0 ? "/" + e : "/" : e.length > 0 ? e : ".";
  },
  normalize: function(e) {
    if (W(e), e.length === 0)
      return ".";
    var t = e.charCodeAt(0) === 47, i = e.charCodeAt(e.length - 1) === 47;
    return e = pt(e, !t), e.length === 0 && !t && (e = "."), e.length > 0 && i && (e += "/"), t ? "/" + e : e;
  },
  isAbsolute: function(e) {
    return W(e), e.length > 0 && e.charCodeAt(0) === 47;
  },
  join: function() {
    if (arguments.length === 0)
      return ".";
    for (var e, t = 0; t < arguments.length; ++t) {
      var i = arguments[t];
      W(i), i.length > 0 && (e === void 0 ? e = i : e += "/" + i);
    }
    return e === void 0 ? "." : ve.normalize(e);
  },
  relative: function(e, t) {
    if (W(e), W(t), e === t || (e = ve.resolve(e), t = ve.resolve(t), e === t))
      return "";
    for (var i = 1; i < e.length && e.charCodeAt(i) === 47; ++i)
      ;
    for (var s = e.length, o = s - i, a = 1; a < t.length && t.charCodeAt(a) === 47; ++a)
      ;
    for (var r = t.length, u = r - a, h = o < u ? o : u, p = -1, l = 0; l <= h; ++l) {
      if (l === h) {
        if (u > h) {
          if (t.charCodeAt(a + l) === 47)
            return t.slice(a + l + 1);
          if (l === 0)
            return t.slice(a + l);
        } else
          o > h && (e.charCodeAt(i + l) === 47 ? p = l : l === 0 && (p = 0));
        break;
      }
      var v = e.charCodeAt(i + l), _ = t.charCodeAt(a + l);
      if (v !== _)
        break;
      v === 47 && (p = l);
    }
    var d = "";
    for (l = i + p + 1; l <= s; ++l)
      (l === s || e.charCodeAt(l) === 47) && (d.length === 0 ? d += ".." : d += "/..");
    return d.length > 0 ? d + t.slice(a + p) : (a += p, t.charCodeAt(a) === 47 && ++a, t.slice(a));
  },
  _makeLong: function(e) {
    return e;
  },
  dirname: function(e) {
    if (W(e), e.length === 0)
      return ".";
    for (var t = e.charCodeAt(0), i = t === 47, s = -1, o = !0, a = e.length - 1; a >= 1; --a)
      if (t = e.charCodeAt(a), t === 47) {
        if (!o) {
          s = a;
          break;
        }
      } else
        o = !1;
    return s === -1 ? i ? "/" : "." : i && s === 1 ? "//" : e.slice(0, s);
  },
  basename: function(e, t) {
    if (t !== void 0 && typeof t != "string")
      throw new TypeError('"ext" argument must be a string');
    W(e);
    var i = 0, s = -1, o = !0, a;
    if (t !== void 0 && t.length > 0 && t.length <= e.length) {
      if (t.length === e.length && t === e)
        return "";
      var r = t.length - 1, u = -1;
      for (a = e.length - 1; a >= 0; --a) {
        var h = e.charCodeAt(a);
        if (h === 47) {
          if (!o) {
            i = a + 1;
            break;
          }
        } else
          u === -1 && (o = !1, u = a + 1), r >= 0 && (h === t.charCodeAt(r) ? --r === -1 && (s = a) : (r = -1, s = u));
      }
      return i === s ? s = u : s === -1 && (s = e.length), e.slice(i, s);
    } else {
      for (a = e.length - 1; a >= 0; --a)
        if (e.charCodeAt(a) === 47) {
          if (!o) {
            i = a + 1;
            break;
          }
        } else
          s === -1 && (o = !1, s = a + 1);
      return s === -1 ? "" : e.slice(i, s);
    }
  },
  extname: function(e) {
    W(e);
    for (var t = -1, i = 0, s = -1, o = !0, a = 0, r = e.length - 1; r >= 0; --r) {
      var u = e.charCodeAt(r);
      if (u === 47) {
        if (!o) {
          i = r + 1;
          break;
        }
        continue;
      }
      s === -1 && (o = !1, s = r + 1), u === 46 ? t === -1 ? t = r : a !== 1 && (a = 1) : t !== -1 && (a = -1);
    }
    return t === -1 || s === -1 || // We saw a non-dot character immediately before the dot
    a === 0 || // The (right-most) trimmed path component is exactly '..'
    a === 1 && t === s - 1 && t === i + 1 ? "" : e.slice(t, s);
  },
  format: function(e) {
    if (e === null || typeof e != "object")
      throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof e);
    return zn("/", e);
  },
  parse: function(e) {
    W(e);
    var t = { root: "", dir: "", base: "", ext: "", name: "" };
    if (e.length === 0)
      return t;
    var i = e.charCodeAt(0), s = i === 47, o;
    s ? (t.root = "/", o = 1) : o = 0;
    for (var a = -1, r = 0, u = -1, h = !0, p = e.length - 1, l = 0; p >= o; --p) {
      if (i = e.charCodeAt(p), i === 47) {
        if (!h) {
          r = p + 1;
          break;
        }
        continue;
      }
      u === -1 && (h = !1, u = p + 1), i === 46 ? a === -1 ? a = p : l !== 1 && (l = 1) : a !== -1 && (l = -1);
    }
    return a === -1 || u === -1 || // We saw a non-dot character immediately before the dot
    l === 0 || // The (right-most) trimmed path component is exactly '..'
    l === 1 && a === u - 1 && a === r + 1 ? u !== -1 && (r === 0 && s ? t.base = t.name = e.slice(1, u) : t.base = t.name = e.slice(r, u)) : (r === 0 && s ? (t.name = e.slice(1, a), t.base = e.slice(1, u)) : (t.name = e.slice(r, a), t.base = e.slice(r, u)), t.ext = e.slice(a, u)), r > 0 ? t.dir = e.slice(0, r - 1) : s && (t.dir = "/"), t;
  },
  sep: "/",
  delimiter: ":",
  win32: null,
  posix: null
};
ve.posix = ve;
function Z() {
  return ((1 + Math.random()) * 65536 | 0).toString(16).substring(1);
}
function Ae() {
  return "".concat(Z() + Z(), "-").concat(Z(), "-").concat(Z(), "-").concat(Z(), "-").concat(Z()).concat(Z()).concat(Z());
}
const Hn = /<svg\b[^>]*>[\s\S]*?<\/svg>/;
function it(n) {
  return Hn.test(n);
}
class nn {
  /**
   * 拷贝文本
   *
   * @author zhanghengfeng
   * @date 2023-08-31 11:08:51
   * @param {string} value
   * @return {*}  {boolean}
   */
  static copy(e) {
    return this.inputElement || (this.inputElement = document.createElement("input"), this.inputElement.style.position = "absolute", this.inputElement.style.left = "-9999px", document.body.appendChild(this.inputElement)), this.inputElement.value = e, this.inputElement.select(), document.execCommand("copy");
  }
}
/**
 * input元素，用于存储拷贝的文本
 *
 * @author zhanghengfeng
 * @date 2023-08-31 20:08:06
 * @private
 * @type {(HTMLInputElement | null)}
 */
x(nn, "inputElement", null);
const y = class y {
  /**
   * 检查数据库是否存在
   *
   * @param {string} storeName
   * @return {*}  {Promise<boolean>}
   * @memberof IndexedDBUtil
   */
  static async checkDataBaseExists(e) {
    try {
      return (await indexedDB.databases()).some((i) => i.name === e);
    } catch (t) {
      return console.error("检查数据库是否存在时出错:", t), !1;
    }
  }
  /**
   * 删除数据库
   *
   * @return {*}  {Promise<void>}
   * @memberof IndexedDBUtil
   */
  static async deleteDatabase(e) {
    var t, i;
    return y.lastLink && ((i = (t = y.lastLink).close) == null || i.call(t)), new Promise((s, o) => {
      const a = indexedDB.deleteDatabase(e);
      a.onsuccess = () => {
        s(!0);
      }, a.onerror = () => {
        s(!1);
      }, a.onblocked = () => {
        console.warn("删除数据库 ".concat(e, " 被阻塞，可能有其他连接正在使用该数据库。")), o(new Error("删除数据库 ".concat(e, " 被阻塞")));
      };
    });
  }
  /**
   * 检查是否存在某个库以及库内是否存在某个表
   *
   * @param {string} storeName
   * @param {string} tableName
   * @return {*}
   * @memberof IndexedDBUtil
   */
  static async checkTableExists(e, t) {
    return await y.checkDataBaseExists(e) ? new Promise((s, o) => {
      const a = indexedDB.open(e);
      a.onupgradeneeded = (r) => {
        y.db = r.target.result, y.version = y.db.version;
      }, a.onsuccess = (r) => {
        y.db = r.target.result, y.lastLink = a.result;
        const u = y.db.objectStoreNames.contains(t);
        a.result.close(), s(u);
      }, a.onerror = (r) => {
        o(r.target.error);
      };
    }) : !1;
  }
  /**
   * 创建表
   *
   * @param {string} storeName 库名称
   * @param {(string | null)} keyPath 表主键
   * @param {boolean} [useAutoIncrement=false] 是否使用自增
   * @return {*}  {Promise<void>}
   * @memberof IndexedDBUtil
   */
  static async createTable(e, t, i, s = !1) {
    return new Promise((o) => {
      var r, u;
      y.version += 1, y.lastLink && ((u = (r = y.lastLink).close) == null || u.call(r));
      const a = indexedDB.open(e, y.version);
      a.onupgradeneeded = (h) => {
        if (y.db = h.target.result, !y.db.objectStoreNames.contains(t)) {
          const p = {};
          i ? p.keyPath = i : s && (p.autoIncrement = !0), y.db.createObjectStore(t, p);
        }
      }, a.onsuccess = () => {
        y.lastLink = a.result, a.result.close(), o(!0);
      }, a.onerror = () => {
        o(!1);
      };
    });
  }
  /**
   * 删除表
   *
   * @param {string} storeName 表名称
   * @return {*}  {Promise<void>}
   * @memberof IndexedDBUtil
   */
  static async deleteTable(e, t) {
    return new Promise((i) => {
      var o, a;
      y.version += 1, y.lastLink && ((a = (o = y.lastLink).close) == null || a.call(o));
      const s = indexedDB.open(e, y.version);
      s.onupgradeneeded = (r) => {
        y.db = r.target.result, y.lastLink = s.result, y.db.objectStoreNames.contains(t) && y.db.deleteObjectStore(t);
      }, s.onsuccess = (r) => {
        y.db = r.target.result, y.lastLink = s.result, s.result.close(), i(!0);
      }, s.onerror = () => {
        s.result.close(), i(!1);
      };
    });
  }
  /**
   * 新增数据
   *
   * @param {string} storeName 表名称
   * @param {*} data 新增数据
   * @return {*}  {Promise<void>}
   * @memberof IndexedDBUtil
   */
  static async addData(e, t, i) {
    return new Promise((s, o) => {
      const a = indexedDB.open(e);
      a.onsuccess = (r) => {
        if (y.db = r.target.result, y.lastLink = a.result, y.db.objectStoreNames.contains(t)) {
          const p = y.db.transaction([t], "readwrite").objectStore(t).add(i);
          p.onsuccess = (l) => {
            s(i);
          }, p.onerror = () => {
            s(null);
          };
        }
        a.result.close();
      }, a.onerror = () => {
        a.result.close(), o();
      };
    });
  }
  /**
   * 删除数据
   *
   * @param {string} storeName 表名称
   * @param {IDBValidKey} key 数据键
   * @return {*}  {Promise<void>}
   * @memberof IndexedDBUtil
   */
  static async deleteData(e, t, i) {
    return new Promise((s, o) => {
      const a = indexedDB.open(e);
      a.onsuccess = (r) => {
        if (y.db = r.target.result, y.lastLink = a.result, y.db.objectStoreNames.contains(t)) {
          const p = y.db.transaction([t], "readwrite").objectStore(t).delete(i);
          p.onsuccess = (l) => {
            s(!0);
          }, p.onerror = () => {
            s(!1);
          };
        }
        a.result.close();
      }, a.onerror = () => {
        a.result.close(), o();
      };
    });
  }
  /**
   * 修改数据
   *
   * @param {string} storeName 表名称
   * @param {*} data 需要修改的数据
   * @return {*}  {Promise<void>}
   * @memberof IndexedDBUtil
   */
  static async updateData(e, t, i) {
    return new Promise((s, o) => {
      const a = indexedDB.open(e);
      a.onsuccess = (r) => {
        if (y.db = r.target.result, y.lastLink = a.result, y.db.objectStoreNames.contains(t)) {
          const p = y.db.transaction([t], "readwrite").objectStore(t).put(i);
          p.onsuccess = (l) => {
            s(i);
          }, p.onerror = () => {
            s(i);
          };
        }
        a.result.close();
      }, a.onerror = () => {
        a.result.close(), o();
      };
    });
  }
  /**
   * 读取单条数据
   *
   * @param {string} storeName 表名称
   * @param {IDBValidKey} key 数据主键
   * @return {*}  {Promise<any>}
   * @memberof IndexedDBUtil
   */
  static async getData(e, t, i) {
    return new Promise((s, o) => {
      const a = indexedDB.open(e);
      a.onsuccess = (r) => {
        if (y.db = r.target.result, y.lastLink = a.result, y.db.objectStoreNames.contains(t)) {
          const p = y.db.transaction([t], "readonly").objectStore(t).get(i);
          p.onsuccess = (l) => {
            s(p.result);
          }, p.onerror = () => {
            o(new Error("未找到数据".concat(i)));
          };
        }
        a.result.close();
      }, a.onerror = () => {
        a.result.close(), o();
      };
    });
  }
  /**
   * 读取所有数据
   *
   * @param {string} storeName 表名称
   * @return {*}  {Promise<any[]>}
   * @memberof IndexedDBUtil
   */
  static async getAllData(e, t) {
    return new Promise((i, s) => {
      const o = indexedDB.open(e);
      o.onsuccess = (a) => {
        if (y.db = a.target.result, y.lastLink = o.result, y.db.objectStoreNames.contains(t)) {
          const h = y.db.transaction([t], "readonly").objectStore(t).getAll();
          h.onsuccess = (p) => {
            i(h.result);
          }, h.onerror = () => {
            i([]);
          };
        }
        o.result.close();
      }, o.onerror = () => {
        o.result.close(), s();
      };
    });
  }
};
// 数据库版本
x(y, "version", 1), // 数据库连接句柄
x(y, "db", null), // 上一个连接
x(y, "lastLink");
let q = y;
class On {
  /**
   * Creates an instance of FileUploader.
   * @author tony001
   * @date 2025-02-28 15:02:15
   * @param {FileUploaderOptions<T>} options
   */
  constructor(e) {
    x(this, "options");
    this.options = {
      multiple: !0,
      accept: "*/*",
      maxSize: 5 * 1024 * 1024,
      ...e
    };
  }
  /**
   * 打开文件选择对话框
   */
  openFilePicker() {
    const e = document.createElement("input");
    e.type = "file", e.multiple = this.options.multiple, e.accept = this.options.accept || "", e.onchange = (t) => {
      const i = Array.from(t.target.files || []);
      this.handleFiles(i);
    }, e.click();
  }
  /**
   * 处理选择的文件
   */
  async handleFiles(e) {
    var i, s;
    if (e.length === 0)
      return;
    const t = e.filter((o) => {
      var a, r;
      return this.options.maxSize && o.size > this.options.maxSize ? ((r = (a = this.options).onError) == null || r.call(a, new Error("文件大小超过限制 (".concat(this.formatSize(o.size), " > ").concat(this.formatSize(this.options.maxSize), ")")), o), !1) : !0;
    });
    (s = (i = this.options).onSelect) == null || s.call(i, t), await Promise.all(t.map((o) => this.processFile(o)));
  }
  /**
   * 处理单个文件上传
   */
  async processFile(e) {
    var t, i, s, o, a, r;
    try {
      const u = (p) => {
        var l, v;
        (v = (l = this.options).onProgress) == null || v.call(l, e, p);
      }, h = await this.options.onUpload(e, u);
      (i = (t = this.options).onProgress) == null || i.call(t, e, 100), (o = (s = this.options).onSuccess) == null || o.call(s, h, e);
    } catch (u) {
      (r = (a = this.options).onError) == null || r.call(a, u instanceof Error ? u : new Error("上传失败"), e);
    }
  }
  /**
   * 格式化文件大小
   */
  formatSize(e) {
    if (e === 0)
      return "0 B";
    const t = ["B", "KB", "MB", "GB"], i = Math.floor(Math.log(e) / Math.log(1024));
    return "".concat((e / 1024 ** i).toFixed(2), " ").concat(t[i]);
  }
}
class sn {
  /**
   * 从XML元素中提取CDATA内容
   *
   * @author tony001
   * @date 2025-03-03 15:03:43
   * @private
   * @static
   * @param {(Element | null)} element
   * @return {*}  {(string | null)}
   */
  static getCdataContent(e) {
    if (!e)
      return null;
    const t = Array.from(e.childNodes).find((i) => i.nodeType === i.CDATA_SECTION_NODE);
    return (t == null ? void 0 : t.nodeValue) || e.textContent;
  }
  /**
   *  XML 字符串转数据对象
   *
   * @author tony001
   * @date 2025-03-03 11:03:17
   * @static
   * @param {string} xmlString
   * @return {*}  {IMaterial[]}
   */
  static parse(e) {
    const i = new DOMParser().parseFromString(e, "text/xml");
    return Array.from(i.querySelectorAll("resource")).map((o) => {
      const a = o.getAttribute("type") || "", r = o.querySelector("data"), u = o.querySelector("metadata");
      try {
        const h = this.getCdataContent(r), p = this.getCdataContent(u), l = h ? JSON.parse(h) : {}, v = p ? JSON.parse(p) : {};
        return {
          id: l.id,
          type: a,
          data: l,
          metadata: v
        };
      } catch (h) {
        throw new Error("XML 解析错误: ".concat(h.message));
      }
    });
  }
  /**
   * 混合内容解析
   *
   * @author tony001
   * @date 2025-03-03 13:03:35
   * @static
   * @param {string} input  包含 XML 和其他文本的混合字符串
   * @return {*}  {{
   *     resources: IMaterial[];
   *     remainingText: string;
   *     hasResources: boolean;
   *     error?: string;
   *   }}
   */
  static parseMixedContent(e) {
    const i = /<resources\b[^>]*>[\s\S]*?<\/resources>/i.exec(e);
    if (!i)
      return {
        resources: [],
        remainingText: e,
        hasResources: !1
      };
    const [s] = i, o = i.index, a = o + s.length, r = (e.slice(0, o) + e.slice(a)).replace(/\n/g, "");
    try {
      return {
        resources: this.parse(s),
        remainingText: r,
        hasResources: !0
      };
    } catch (u) {
      return {
        resources: [],
        remainingText: r,
        hasResources: !0,
        error: "资源解析失败: ".concat(u.message)
      };
    }
  }
  /**
   * 数据对象转 XML 字符串
   *
   * @author tony001
   * @date 2025-03-03 11:03:51
   * @static
   * @param {IMaterial[]} resources
   * @return {*}  {string}
   */
  static stringify(e) {
    const t = document.implementation.createDocument(null, null, null), i = t.createElement("resources");
    i.setAttribute("version", "1.0");
    const s = (a) => "\n".concat("  ".repeat(a)), o = 1;
    return e.forEach((a) => {
      i.appendChild(t.createTextNode(s(o)));
      const r = t.createElement("resource");
      r.setAttribute("type", a.type), r.setAttribute("version", "1.0");
      const u = (h, p) => {
        const l = t.createElement(h);
        l.appendChild(t.createTextNode(s(o + 1)));
        const v = t.createCDATASection(JSON.stringify(p));
        return l.appendChild(v), l.appendChild(t.createTextNode(s(o))), l;
      };
      r.appendChild(t.createTextNode(s(o + 1))), r.appendChild(u("data", a.data)), r.appendChild(t.createTextNode(s(o + 1))), r.appendChild(u("metadata", a.metadata)), r.appendChild(t.createTextNode(s(o))), i.appendChild(r);
    }), i.appendChild(t.createTextNode("\n")), t.appendChild(i), new XMLSerializer().serializeToString(t).replace(/></g, ">\n<");
  }
}
class Bn {
  /**
   * 从XML元素中提取CDATA内容
   *
   * @author tony001
   * @date 2025-03-03 15:03:43
   * @private
   * @static
   * @param {(Element | null)} element
   * @return {*}  {(string | null)}
   */
  static getCdataContent(e) {
    if (!e)
      return null;
    const t = Array.from(e.childNodes).find((i) => i.nodeType === i.CDATA_SECTION_NODE);
    return (t == null ? void 0 : t.nodeValue) || e.textContent;
  }
  /**
   *  XML 字符串转数据对象
   *
   * @author tony001
   * @date 2025-03-03 11:03:17
   * @static
   * @param {string} xmlString
   * @return {*}  {IChatSuggestion[]}
   */
  static parse(e) {
    const i = new DOMParser().parseFromString(e, "text/xml");
    return Array.from(i.querySelectorAll("suggestion")).map((o) => {
      const a = o.getAttribute("type") || "", r = o.querySelector("data"), u = o.querySelector("metadata");
      try {
        const h = this.getCdataContent(r), p = this.getCdataContent(u), l = h ? JSON.parse(h) : {}, v = p ? JSON.parse(p) : {};
        return {
          type: a,
          data: l,
          metadata: v
        };
      } catch (h) {
        throw new Error("XML 解析错误: ".concat(h.message));
      }
    });
  }
  /**
   * 混合内容解析
   *
   * @author tony001
   * @date 2025-03-03 13:03:35
   * @static
   * @param {string} input  包含 XML 和其他文本的混合字符串
   * @return {*}  {{
   *     suggestions: IChatSuggestion[];
   *     remainingText: string;
   *     hasSuggestions: boolean;
   *     error?: string;
   *   }}
   */
  static parseMixedContent(e) {
    const i = /<suggestions\b[^>]*>[\s\S]*?<\/suggestions>/i.exec(e);
    if (!i)
      return {
        suggestions: [],
        remainingText: e,
        hasSuggestions: !1
      };
    const [s] = i, o = i.index, a = o + s.length, r = (e.slice(0, o) + e.slice(a)).replace(/\n/g, "");
    try {
      return {
        suggestions: this.parse(s),
        remainingText: r,
        hasSuggestions: !0
      };
    } catch (u) {
      return {
        suggestions: [],
        remainingText: r,
        hasSuggestions: !0,
        error: "资源解析失败: ".concat(u.message)
      };
    }
  }
  /**
   * 数据对象转 XML 字符串
   *
   * @author tony001
   * @date 2025-03-03 11:03:51
   * @static
   * @param {IChatSuggestion[]} suggestions
   * @return {*}  {string}
   */
  static stringify(e) {
    const t = document.implementation.createDocument(null, null, null), i = t.createElement("suggestions");
    i.setAttribute("version", "1.0");
    const s = (a) => "\n".concat("  ".repeat(a)), o = 1;
    return e.forEach((a) => {
      i.appendChild(t.createTextNode(s(o)));
      const r = t.createElement("suggestion");
      r.setAttribute("type", a.type), r.setAttribute("version", "1.0");
      const u = (h, p) => {
        const l = t.createElement(h);
        l.appendChild(t.createTextNode(s(o + 1)));
        const v = t.createCDATASection(JSON.stringify(p));
        return l.appendChild(v), l.appendChild(t.createTextNode(s(o))), l;
      };
      r.appendChild(t.createTextNode(s(o + 1))), r.appendChild(u("data", a.data)), r.appendChild(t.createTextNode(s(o + 1))), r.appendChild(u("metadata", a.metadata)), r.appendChild(t.createTextNode(s(o))), i.appendChild(r);
    }), i.appendChild(t.createTextNode("\n")), t.appendChild(i), new XMLSerializer().serializeToString(t).replace(/></g, ">\n<");
  }
}
function Je(n) {
  return n.x >= 0 && n.x <= 1 && n.y >= 0 && n.y <= 1;
}
function on(n, e, t, i) {
  const s = n / window.innerWidth, o = e / window.innerHeight, a = Math.max(0, Math.min(s, 1 - t)), r = Math.max(0, Math.min(o, 1 - i));
  return {
    x: a,
    y: r
  };
}
var le, k, Re, ft, we = 0, an = [], ke = [], vt = b.__b, mt = b.__r, _t = b.diffed, gt = b.__c, wt = b.unmount;
function He(n, e) {
  b.__h && b.__h(k, n, we || e), we = 0;
  var t = k.__H || (k.__H = { __: [], __h: [] });
  return n >= t.__.length && t.__.push({ __V: ke }), t.__[n];
}
function K(n) {
  return we = 1, Pn(ln, n);
}
function Pn(n, e, t) {
  var i = He(le++, 2);
  if (i.t = n, !i.__c && (i.__ = [t ? t(e) : ln(void 0, e), function(r) {
    var u = i.__N ? i.__N[0] : i.__[0], h = i.t(u, r);
    u !== h && (i.__N = [h, i.__[1]], i.__c.setState({}));
  }], i.__c = k, !k.u)) {
    var s = function(r, u, h) {
      if (!i.__c.__H)
        return !0;
      var p = i.__c.__H.__.filter(function(v) {
        return v.__c;
      });
      if (p.every(function(v) {
        return !v.__N;
      }))
        return !o || o.call(this, r, u, h);
      var l = !1;
      return p.forEach(function(v) {
        if (v.__N) {
          var _ = v.__[0];
          v.__ = v.__N, v.__N = void 0, _ !== v.__[0] && (l = !0);
        }
      }), !(!l && i.__c.props === r) && (!o || o.call(this, r, u, h));
    };
    k.u = !0;
    var o = k.shouldComponentUpdate, a = k.componentWillUpdate;
    k.componentWillUpdate = function(r, u, h) {
      if (this.__e) {
        var p = o;
        o = void 0, s(r, u, h), o = p;
      }
      a && a.call(this, r, u, h);
    }, k.shouldComponentUpdate = s;
  }
  return i.__N || i.__;
}
function D(n, e) {
  var t = He(le++, 3);
  !b.__s && cn(t.__H, e) && (t.__ = n, t.i = e, k.__H.__h.push(t));
}
function P(n) {
  return we = 5, X(function() {
    return { current: n };
  }, []);
}
function X(n, e) {
  var t = He(le++, 7);
  return cn(t.__H, e) ? (t.__V = n(), t.i = e, t.__h = n, t.__V) : t.__;
}
function Fe(n, e) {
  return we = 8, X(function() {
    return n;
  }, e);
}
function rn(n) {
  var e = k.context[n.__c], t = He(le++, 9);
  return t.c = n, e ? (t.__ == null && (t.__ = !0, e.sub(k)), e.props.value) : n.__;
}
function Rn() {
  for (var n; n = an.shift(); )
    if (n.__P && n.__H)
      try {
        n.__H.__h.forEach(Ne), n.__H.__h.forEach(Ke), n.__H.__h = [];
      } catch (e) {
        n.__H.__h = [], b.__e(e, n.__v);
      }
}
b.__b = function(n) {
  k = null, vt && vt(n);
}, b.__r = function(n) {
  mt && mt(n), le = 0;
  var e = (k = n.__c).__H;
  e && (Re === k ? (e.__h = [], k.__h = [], e.__.forEach(function(t) {
    t.__N && (t.__ = t.__N), t.__V = ke, t.__N = t.i = void 0;
  })) : (e.__h.forEach(Ne), e.__h.forEach(Ke), e.__h = [], le = 0)), Re = k;
}, b.diffed = function(n) {
  _t && _t(n);
  var e = n.__c;
  e && e.__H && (e.__H.__h.length && (an.push(e) !== 1 && ft === b.requestAnimationFrame || ((ft = b.requestAnimationFrame) || Fn)(Rn)), e.__H.__.forEach(function(t) {
    t.i && (t.__H = t.i), t.__V !== ke && (t.__ = t.__V), t.i = void 0, t.__V = ke;
  })), Re = k = null;
}, b.__c = function(n, e) {
  e.some(function(t) {
    try {
      t.__h.forEach(Ne), t.__h = t.__h.filter(function(i) {
        return !i.__ || Ke(i);
      });
    } catch (i) {
      e.some(function(s) {
        s.__h && (s.__h = []);
      }), e = [], b.__e(i, t.__v);
    }
  }), gt && gt(n, e);
}, b.unmount = function(n) {
  wt && wt(n);
  var e, t = n.__c;
  t && t.__H && (t.__H.__.forEach(function(i) {
    try {
      Ne(i);
    } catch (s) {
      e = s;
    }
  }), t.__H = void 0, e && b.__e(e, t.__v));
};
var bt = typeof requestAnimationFrame == "function";
function Fn(n) {
  var e, t = function() {
    clearTimeout(i), bt && cancelAnimationFrame(e), setTimeout(n);
  }, i = setTimeout(t, 100);
  bt && (e = requestAnimationFrame(t));
}
function Ne(n) {
  var e = k, t = n.__c;
  typeof t == "function" && (n.__c = void 0, t()), k = e;
}
function Ke(n) {
  var e = k;
  n.__c = n.__(), k = e;
}
function cn(n, e) {
  return !n || n.length !== e.length || e.some(function(t, i) {
    return t !== n[i];
  });
}
function ln(n, e) {
  return typeof e == "function" ? e(n) : e;
}
function Oe() {
  throw new Error("Cycle detected");
}
var Un = Symbol.for("preact-signals");
function st() {
  if (ce > 1)
    ce--;
  else {
    for (var n, e = !1; me !== void 0; ) {
      var t = me;
      for (me = void 0, Qe++; t !== void 0; ) {
        var i = t.o;
        if (t.o = void 0, t.f &= -3, !(8 & t.f) && dn(t))
          try {
            t.c();
          } catch (s) {
            e || (n = s, e = !0);
          }
        t = i;
      }
    }
    if (Qe = 0, ce--, e)
      throw n;
  }
}
var N = void 0, me = void 0, ce = 0, Qe = 0, Ie = 0;
function un(n) {
  if (N !== void 0) {
    var e = n.n;
    if (e === void 0 || e.t !== N)
      return e = { i: 0, S: n, p: N.s, n: void 0, t: N, e: void 0, x: void 0, r: e }, N.s !== void 0 && (N.s.n = e), N.s = e, n.n = e, 32 & N.f && n.S(e), e;
    if (e.i === -1)
      return e.i = 0, e.n !== void 0 && (e.n.p = e.p, e.p !== void 0 && (e.p.n = e.n), e.p = N.s, e.n = void 0, N.s.n = e, N.s = e), e;
  }
}
function A(n) {
  this.v = n, this.i = 0, this.n = void 0, this.t = void 0;
}
A.prototype.brand = Un;
A.prototype.h = function() {
  return !0;
};
A.prototype.S = function(n) {
  this.t !== n && n.e === void 0 && (n.x = this.t, this.t !== void 0 && (this.t.e = n), this.t = n);
};
A.prototype.U = function(n) {
  if (this.t !== void 0) {
    var e = n.e, t = n.x;
    e !== void 0 && (e.x = t, n.e = void 0), t !== void 0 && (t.e = e, n.x = void 0), n === this.t && (this.t = t);
  }
};
A.prototype.subscribe = function(n) {
  var e = this;
  return at(function() {
    var t = e.value, i = 32 & this.f;
    this.f &= -33;
    try {
      n(t);
    } finally {
      this.f |= i;
    }
  });
};
A.prototype.valueOf = function() {
  return this.value;
};
A.prototype.toString = function() {
  return this.value + "";
};
A.prototype.toJSON = function() {
  return this.value;
};
A.prototype.peek = function() {
  return this.v;
};
Object.defineProperty(A.prototype, "value", { get: function() {
  var n = un(this);
  return n !== void 0 && (n.i = this.i), this.v;
}, set: function(n) {
  if (N instanceof Q && function() {
    throw new Error("Computed cannot have side-effects");
  }(), n !== this.v) {
    Qe > 100 && Oe(), this.v = n, this.i++, Ie++, ce++;
    try {
      for (var e = this.t; e !== void 0; e = e.x)
        e.t.N();
    } finally {
      st();
    }
  }
} });
function J(n) {
  return new A(n);
}
function dn(n) {
  for (var e = n.s; e !== void 0; e = e.n)
    if (e.S.i !== e.i || !e.S.h() || e.S.i !== e.i)
      return !0;
  return !1;
}
function hn(n) {
  for (var e = n.s; e !== void 0; e = e.n) {
    var t = e.S.n;
    if (t !== void 0 && (e.r = t), e.S.n = e, e.i = -1, e.n === void 0) {
      n.s = e;
      break;
    }
  }
}
function pn(n) {
  for (var e = n.s, t = void 0; e !== void 0; ) {
    var i = e.p;
    e.i === -1 ? (e.S.U(e), i !== void 0 && (i.n = e.n), e.n !== void 0 && (e.n.p = i)) : t = e, e.S.n = e.r, e.r !== void 0 && (e.r = void 0), e = i;
  }
  n.s = t;
}
function Q(n) {
  A.call(this, void 0), this.x = n, this.s = void 0, this.g = Ie - 1, this.f = 4;
}
(Q.prototype = new A()).h = function() {
  if (this.f &= -3, 1 & this.f)
    return !1;
  if ((36 & this.f) == 32 || (this.f &= -5, this.g === Ie))
    return !0;
  if (this.g = Ie, this.f |= 1, this.i > 0 && !dn(this))
    return this.f &= -2, !0;
  var n = N;
  try {
    hn(this), N = this;
    var e = this.x();
    (16 & this.f || this.v !== e || this.i === 0) && (this.v = e, this.f &= -17, this.i++);
  } catch (t) {
    this.v = t, this.f |= 16, this.i++;
  }
  return N = n, pn(this), this.f &= -2, !0;
};
Q.prototype.S = function(n) {
  if (this.t === void 0) {
    this.f |= 36;
    for (var e = this.s; e !== void 0; e = e.n)
      e.S.S(e);
  }
  A.prototype.S.call(this, n);
};
Q.prototype.U = function(n) {
  if (this.t !== void 0 && (A.prototype.U.call(this, n), this.t === void 0)) {
    this.f &= -33;
    for (var e = this.s; e !== void 0; e = e.n)
      e.S.U(e);
  }
};
Q.prototype.N = function() {
  if (!(2 & this.f)) {
    this.f |= 6;
    for (var n = this.t; n !== void 0; n = n.x)
      n.t.N();
  }
};
Q.prototype.peek = function() {
  if (this.h() || Oe(), 16 & this.f)
    throw this.v;
  return this.v;
};
Object.defineProperty(Q.prototype, "value", { get: function() {
  1 & this.f && Oe();
  var n = un(this);
  if (this.h(), n !== void 0 && (n.i = this.i), 16 & this.f)
    throw this.v;
  return this.v;
} });
function fn(n) {
  return new Q(n);
}
function vn(n) {
  var e = n.u;
  if (n.u = void 0, typeof e == "function") {
    ce++;
    var t = N;
    N = void 0;
    try {
      e();
    } catch (i) {
      throw n.f &= -2, n.f |= 8, ot(n), i;
    } finally {
      N = t, st();
    }
  }
}
function ot(n) {
  for (var e = n.s; e !== void 0; e = e.n)
    e.S.U(e);
  n.x = void 0, n.s = void 0, vn(n);
}
function Wn(n) {
  if (N !== this)
    throw new Error("Out-of-order effect");
  pn(this), N = n, this.f &= -2, 8 & this.f && ot(this), st();
}
function be(n) {
  this.x = n, this.u = void 0, this.s = void 0, this.o = void 0, this.f = 32;
}
be.prototype.c = function() {
  var n = this.S();
  try {
    if (8 & this.f || this.x === void 0)
      return;
    var e = this.x();
    typeof e == "function" && (this.u = e);
  } finally {
    n();
  }
};
be.prototype.S = function() {
  1 & this.f && Oe(), this.f |= 1, this.f &= -9, vn(this), hn(this), ce++;
  var n = N;
  return N = this, Wn.bind(this, n);
};
be.prototype.N = function() {
  2 & this.f || (this.f |= 2, this.o = me, me = this);
};
be.prototype.d = function() {
  this.f |= 8, 1 & this.f || ot(this);
};
function at(n) {
  var e = new be(n);
  try {
    e.c();
  } catch (t) {
    throw e.d(), t;
  }
  return e.d.bind(e);
}
var Be, Ue;
function ue(n, e) {
  b[n] = e.bind(null, b[n] || function() {
  });
}
function De(n) {
  Ue && Ue(), Ue = n && n.S();
}
function mn(n) {
  var e = this, t = n.data, i = I(t);
  i.value = t;
  var s = X(function() {
    for (var o = e.__v; o = o.__; )
      if (o.__c) {
        o.__c.__$f |= 4;
        break;
      }
    return e.__$u.c = function() {
      var a;
      !jt(s.peek()) && ((a = e.base) == null ? void 0 : a.nodeType) === 3 ? e.base.data = s.peek() : (e.__$f |= 1, e.setState({}));
    }, fn(function() {
      var a = i.value.value;
      return a === 0 ? 0 : a === !0 ? "" : a || "";
    });
  }, []);
  return s.value;
}
mn.displayName = "_st";
Object.defineProperties(A.prototype, { constructor: { configurable: !0, value: void 0 }, type: { configurable: !0, value: mn }, props: { configurable: !0, get: function() {
  return { data: this };
} }, __b: { configurable: !0, value: 1 } });
ue("__b", function(n, e) {
  if (typeof e.type == "string") {
    var t, i = e.props;
    for (var s in i)
      if (s !== "children") {
        var o = i[s];
        o instanceof A && (t || (e.__np = t = {}), t[s] = o, i[s] = o.peek());
      }
  }
  n(e);
});
ue("__r", function(n, e) {
  De();
  var t, i = e.__c;
  i && (i.__$f &= -2, (t = i.__$u) === void 0 && (i.__$u = t = function(s) {
    var o;
    return at(function() {
      o = this;
    }), o.c = function() {
      i.__$f |= 1, i.setState({});
    }, o;
  }())), Be = i, De(t), n(e);
});
ue("__e", function(n, e, t, i) {
  De(), Be = void 0, n(e, t, i);
});
ue("diffed", function(n, e) {
  De(), Be = void 0;
  var t;
  if (typeof e.type == "string" && (t = e.__e)) {
    var i = e.__np, s = e.props;
    if (i) {
      var o = t.U;
      if (o)
        for (var a in o) {
          var r = o[a];
          r !== void 0 && !(a in i) && (r.d(), o[a] = void 0);
        }
      else
        t.U = o = {};
      for (var u in i) {
        var h = o[u], p = i[u];
        h === void 0 ? (h = Vn(t, u, p, s), o[u] = h) : h.o(p, s);
      }
    }
  }
  n(e);
});
function Vn(n, e, t, i) {
  var s = e in n && n.ownerSVGElement === void 0, o = J(t);
  return { o: function(a, r) {
    o.value = a, i = r;
  }, d: at(function() {
    var a = o.value.value;
    i[e] !== a && (i[e] = a, s ? n[e] = a : a ? n.setAttribute(e, a) : n.removeAttribute(e));
  }) };
}
ue("unmount", function(n, e) {
  if (typeof e.type == "string") {
    var t = e.__e;
    if (t) {
      var i = t.U;
      if (i) {
        t.U = void 0;
        for (var s in i) {
          var o = i[s];
          o && o.d();
        }
      }
    }
  } else {
    var a = e.__c;
    if (a) {
      var r = a.__$u;
      r && (a.__$u = void 0, r.d());
    }
  }
  n(e);
});
ue("__h", function(n, e, t, i) {
  (i < 3 || i === 9) && (e.__$f |= 2), n(e, t, i);
});
F.prototype.shouldComponentUpdate = function(n, e) {
  var t = this.__$u;
  if (!(t && t.s !== void 0 || 4 & this.__$f) || 3 & this.__$f)
    return !0;
  for (var i in e)
    return !0;
  for (var s in n)
    if (s !== "__source" && n[s] !== this.props[s])
      return !0;
  for (var o in this.props)
    if (!(o in n))
      return !0;
  return !1;
};
function I(n) {
  return X(function() {
    return J(n);
  }, []);
}
function B(n) {
  var e = P(n);
  return e.current = n, Be.__$f |= 4, X(function() {
    return fn(function() {
      return e.current();
    });
  }, []);
}
var qn = 0;
function c(n, e, t, i, s, o) {
  var a, r, u = {};
  for (r in e)
    r == "ref" ? a = e[r] : u[r] = e[r];
  var h = { type: n, props: u, key: t, ref: a, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, __h: null, constructor: void 0, __v: --qn, __source: s, __self: o };
  if (typeof n == "function" && (a = n.defaultProps))
    for (r in a)
      u[r] === void 0 && (u[r] = a[r]);
  return b.vnode && b.vnode(h), h;
}
const jn = () => c("svg", {
  viewBox: "0 0 1024 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  children: c("path", {
    d: "M843.904 783.573333 783.573333 843.904 512.042667 572.373333 240.512 843.904 180.181333 783.573333 451.712 512.042667 180.181333 240.512 240.512 180.181333 512.042667 451.712 783.573333 180.181333 843.904 240.512 572.373333 512.042667 843.904 783.573333Z"
  })
}), Yn = () => c("svg", {
  className: "icon",
  viewBox: "0 0 1024 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  children: c("path", {
    d: "M900.64 379.808l-263.072-256.032c-36.448-35.328-105.76-35.392-142.304 0.096l-327.04 319.904c-56.416 54.72-70.72 76.704-70.72 150.976l0 143.936c0 132.768 26.976 192 186.912 192l131.872 0c81.12 0 128.448-46.656 193.952-111.264l290.016-297.696c18.592-17.984 29.248-43.968 29.248-71.264C929.504 423.36 918.976 397.6 900.64 379.808zM323.008 786.752c-52.928 0-96-43.072-96-96s43.072-96 96-96 96 43.072 96 96S375.936 786.752 323.008 786.752z"
  })
}), Xn = (n) => c("svg", {
  viewBox: "0 0 1024 1024",
  id: "send",
  className: n.className,
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  children: c("path", {
    d: "M931.4 498.9L94.9 79.5c-3.4-1.7-7.3-2.1-11-1.2-8.5 2.1-13.8 10.7-11.7 19.3l86.2 352.2c1.3 5.3 5.2 9.6 10.4 11.3l147.7 50.7-147.6 50.7c-5.2 1.8-9.1 6-10.3 11.3L72.2 926.5c-0.9 3.7-0.5 7.6 1.2 10.9 3.9 7.9 13.5 11.1 21.5 7.2l836.5-417c3.1-1.5 5.6-4.1 7.2-7.1 3.9-8 0.7-17.6-7.2-21.6zM170.8 826.3l50.3-205.6 295.2-101.3c2.3-0.8 4.2-2.6 5-5 1.4-4.2-0.8-8.7-5-10.2L221.1 403 171 198.2l628 314.9-628.2 313.2z"
  })
}), Zn = () => c("svg", {
  viewBox: "0 0 1024 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  children: c("path", {
    d: "M962 197.61H747v-60c0-55.14-44.86-100-100-100H377c-55.14 0-100 44.86-100 100v60H62c-11.05 0-20 8.95-20 20s8.95 20 20 20h60v630.57c0 66.17 53.83 120 120 120h540c66.17 0 120-53.83 120-120V237.61h60c11.05 0 20-8.95 20-20s-8.95-20-20-20zM637.34 457.66v260c0 12.01-10.72 21.63-23.06 19.77-9.84-1.48-16.94-10.25-16.94-20.2V458.09c0-9.95 7.1-18.72 16.94-20.2 12.34-1.86 23.06 7.76 23.06 19.77z m-210.68 0v260c0 11-9 20-20 20s-20-9-20-20v-260c0-11 9-20 20-20s20 9 20 20zM317 137.61c0-33.08 26.92-60 60-60h270c33.08 0 60 26.92 60 60v60H317v-60z"
  })
}), yt = () => c("svg", {
  viewBox: "0 0 1024 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  children: c("path", {
    d: "M511.582491 63.413262C265.134543 63.413262 64.62588 263.921925 64.62588 510.369873s200.508663 446.957635 446.957635 446.957635 446.957635-200.508663 446.957635-446.957635S758.031463 63.413262 511.582491 63.413262zM509.001713 751.859903c-98.517781 0-182.467775-62.623269-214.771505-150.056598l0.327458-0.134053c-2.007727-4.036943-3.38305-8.422833-3.38305-13.237489 0-16.647145 13.494339-30.142507 30.142507-30.142507 13.389962 0 24.358781 8.877181 28.2893 20.955264l0.422625-0.172939c23.269983 65.442478 85.645612 112.503307 158.972665 112.503307 93.106538 0 168.845523-75.738985 168.845523-168.845523s-75.738985-168.845523-168.845523-168.845523c-20.432355 0-39.874149 3.980661-58.013275 10.66899l21.248953 40.742936c2.486634 2.677992 4.0175 6.2831 4.0175 10.243295 0 8.417717-8.404414 14.921851-15.365966 15.07023-0.102331 0-0.206708 0-0.309038 0-0.220011 0-0.427742 0-0.647753-0.013303l-150.579507-6.463202c-5.372358-0.234337-10.229992-3.310396-12.716626-8.093329-2.486634-4.76963-2.236947-10.509355 0.647753-15.055904l80.890308-127.179564c2.8847-4.533246 8.006348-7.151887 13.365402-6.960529 5.372358 0.234337 10.227945 3.312442 12.71458 8.095375l18.580171 35.625382c26.629497-10.855232 55.683207-16.963347 86.168522-16.963347 126.338407 0 229.130537 102.791108 229.130537 229.130537S635.340119 751.859903 509.001713 751.859903z"
  })
}), Gn = () => c("svg", {
  viewBox: "0 0 1024 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  children: c("path", {
    d: "M891.072 822.144V167.36a34.432 34.432 0 0 0-34.432-34.432H201.856C201.856 94.848 232.704 64 270.784 64h620.288C929.152 64 960 94.848 960 132.928v620.288c0 38.08-30.848 68.928-68.928 68.928z m-68.928-551.36v620.288c0 38.08-30.848 68.928-68.928 68.928H132.928A68.928 68.928 0 0 1 64 891.072V270.784c0-38.08 30.848-68.928 68.928-68.928h620.288c38.08 0 68.928 30.848 68.928 68.928z m-137.856 137.856H201.856a34.432 34.432 0 0 0 0 68.864h482.432a34.432 34.432 0 0 0 0-68.864z m0 206.72H201.856a34.432 34.432 0 0 0 0 68.864h482.432a34.432 34.432 0 0 0 0-68.864z"
  })
}), Jn = () => c("svg", {
  viewBox: "0 0 1024 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  children: c("path", {
    d: "M547.4 197.4v46l200.3 0.1L546.1 444l32.4 32.6 201.9-200.7v200.9h46V197.5zM471.4 584.4l-32.6-32.6L243.6 747V547.9h-46v278.7h279v-46H275z"
  })
}), Kn = () => c("svg", {
  viewBox: "0 0 1024 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  children: c("path", {
    d: "M544 480V282.944h52.224l0.064 107.968L763.072 224l36.928 36.928-166.976 166.976 108.032-0.128V480H544zM260.928 800l-36.928-36.928 166.912-166.784-107.968-0.064V544H480v197.056h-52.224l0.064-107.968L260.928 800z"
  })
}), Qn = () => c("svg", {
  viewBox: "0 0 1024 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  children: c("path", {
    d: "M960 544H64a32 32 0 1 1 0-64h896a32 32 0 1 1 0 64"
  })
}), ei = () => c("svg", {
  viewBox: "0 0 1024 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  children: [c("path", {
    d: "M481.0752 263.3728l50.9952 1.024 1.8432-105.8816-50.9952-0.8192z"
  }), c("path", {
    d: "M486.441426 180.895362a66.56 66.56 0 1 0 42.091944-126.290153 66.56 66.56 0 1 0-42.091944 126.290153Z"
  }), c("path", {
    d: "M138.8544 664.3712c-52.8384 0-95.8464-43.008-95.8464-95.8464s43.008-95.8464 95.8464-95.8464M880.0256 472.6784c52.8384 0 95.8464 43.008 95.8464 95.8464s-43.008 95.8464-95.8464 95.8464"
  }), c("path", {
    d: "M507.4944 220.5696c-220.16 0-398.7456 162.816-398.7456 363.7248s178.5856 363.7248 398.7456 363.7248 398.7456-162.816 398.7456-363.7248-178.5856-363.7248-398.7456-363.7248z m0 559.9232c-166.2976 0-301.2608-100.5568-301.2608-224.4608s134.9632-224.4608 301.2608-224.4608S808.7552 432.128 808.7552 556.032 673.792 780.4928 507.4944 780.4928z"
  }), c("path", {
    d: "M319.6928 556.032a47.9232 38.912 90 1 0 77.824 0 47.9232 38.912 90 1 0-77.824 0Z"
  }), c("path", {
    d: "M617.472 556.032a47.9232 38.912 90 1 0 77.824 0 47.9232 38.912 90 1 0-77.824 0Z"
  })]
}), ti = () => c("svg", {
  viewBox: "0 0 18 18",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  children: [c("path", {
    d: "M5.856 17.121a.979.979 0 0 1-.327-.06.839.839 0 0 1-.283-.177.739.739 0 0 1-.187-.255.724.724 0 0 1-.07-.303l-.02-1.609a4.663 4.663 0 0 1-1.446-.455 4.252 4.252 0 0 1-.637-.401c-.199-.146-.385-.31-.553-.492a4.442 4.442 0 0 1-.45-.577 4.303 4.303 0 0 1-.327-.637 3.823 3.823 0 0 1-.206-.686 3.729 3.729 0 0 1-.064-.704V6.478c0-.261.025-.516.077-.771a4.43 4.43 0 0 1 .244-.747 4.062 4.062 0 0 1 .932-1.28c.2-.183.418-.347.65-.493.23-.145.482-.267.739-.364a4.21 4.21 0 0 1 .81-.225c.27-.054.553-.078.835-.078H8.55c.103 0 .2.018.29.054a.7.7 0 0 1 .411.376.667.667 0 0 1-.161.766.736.736 0 0 1-.25.151.764.764 0 0 1-.29.055H5.573c-.186 0-.366.012-.54.049-.18.03-.353.079-.52.145-.167.061-.328.14-.482.237-.148.091-.29.2-.418.316a2.897 2.897 0 0 0-.347.388c-.097.14-.187.286-.257.444a2.473 2.473 0 0 0-.206.977v4.287c0 .17.013.333.051.503a2.549 2.549 0 0 0 .772 1.33 2.721 2.721 0 0 0 .913.559c.167.066.347.115.527.152.18.03.36.048.546.048a.904.904 0 0 1 .61.23.848.848 0 0 1 .194.262.84.84 0 0 1 .07.303l.007.99 1.915-1.293a2.877 2.877 0 0 1 1.64-.492h2.372c.186 0 .366-.018.54-.048.18-.03.353-.08.52-.146.168-.067.329-.146.483-.237.148-.091.29-.2.418-.316.128-.121.244-.249.347-.388a2.8 2.8 0 0 0 .257-.444 2.47 2.47 0 0 0 .206-.977V8.585a.646.646 0 0 1 .225-.492.679.679 0 0 1 .244-.152.814.814 0 0 1 .585 0c.09.03.174.085.244.152a.657.657 0 0 1 .225.492V10.8c0 .261-.032.516-.083.771a4.192 4.192 0 0 1-.245.74c-.109.244-.244.468-.398.687a3.735 3.735 0 0 1-.534.6c-.2.183-.418.347-.65.493a4.134 4.134 0 0 1-.738.364 4.7 4.7 0 0 1-.81.225c-.27.054-.553.079-.836.079h-1.877c-.604 0-1.144.164-1.633.491l-2.54 1.713a.913.913 0 0 1-.514.157z",
    fill: "currentColor"
  }), c("path", {
    d: "M15.866 4.125h-4.174c-.41 0-.741.313-.741.7 0 .387.332.7.741.7h4.174c.41 0 .742-.313.742-.7 0-.387-.332-.7-.742-.7z",
    fill: "currentColor"
  }), c("path", {
    d: "M14.537 2.932c0-.396-.34-.717-.759-.717s-.758.32-.758.717v3.786c0 .396.34.717.758.717.42 0 .76-.321.76-.717V2.932z",
    fill: "currentColor"
  })]
}), ni = () => c("svg", {
  viewBox: "64 64 896 896",
  focusable: "false",
  width: "1em",
  height: "1em",
  fill: "currentColor",
  "aria-hidden": "true",
  children: c("path", {
    d: "M842 454c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8 0 140.3-113.7 254-254 254S258 594.3 258 454c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8 0 168.7 126.6 307.9 290 327.6V884H326.7c-13.7 0-24.7 14.3-24.7 32v36c0 4.4 2.8 8 6.2 8h407.6c3.4 0 6.2-3.6 6.2-8v-36c0-17.7-11-32-24.7-32H548V782.1c165.3-18 294-158 294-328.1zM512 624c93.9 0 170-75.2 170-168V232c0-92.8-76.1-168-170-168s-170 75.2-170 168v224c0 92.8 76.1 168 170 168zm-94-392c0-50.6 41.9-92 94-92s94 41.4 94 92v224c0 50.6-41.9 92-94 92s-94-41.4-94-92V232z"
  })
}), ii = () => c("svg", {
  fill: "currentColor",
  viewBox: "0 0 1000 1000",
  xmlns: "http://www.w3.org/2000/svg",
  xmlnsXlink: "http://www.w3.org/1999/xlink",
  children: Array.from({
    length: 4
  }).map((r, u) => {
    const p = u * (146.66666666666666 + 140), l = 1e3 / 2 - 250 / 2, v = 1e3 / 2 - 500 / 2;
    return c("rect", {
      fill: "currentColor",
      rx: 70,
      ry: 70,
      height: 250,
      width: 140,
      x: p,
      y: l,
      children: [c("animate", {
        attributeName: "height",
        values: "250; 500; 250",
        keyTimes: "0; 0.5; 1",
        dur: "".concat(0.8, "s"),
        begin: "".concat(0.8 / 4 * u, "s"),
        repeatCount: "indefinite"
      }), c("animate", {
        attributeName: "y",
        values: "".concat(l, "; ").concat(v, "; ").concat(l),
        keyTimes: "0; 0.5; 1",
        dur: "".concat(0.8, "s"),
        begin: "".concat(0.8 / 4 * u, "s"),
        repeatCount: "indefinite"
      })]
    }, u);
  })
}), si = (n) => c("svg", {
  className: n.className,
  onClick: n.onClick,
  viewBox: "0 0 1024 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  children: c("path", {
    d: "M128 384a128 128 0 1 1 0 256 128 128 0 0 1 0-256z m768 0a128 128 0 1 1 0 256 128 128 0 0 1 0-256z m-372.4288 0a128 128 0 1 1 0 256 128 128 0 0 1 0-256z"
  })
}), oi = (n) => c("svg", {
  className: n.className,
  viewBox: "0 0 1024 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  children: c("path", {
    d: "M498.33984 607.8464c-10.99776-32.9728-50.09408-73.5232-82.6368-85.74976L150.9376 422.8096c-38.54336-14.4384-36.98688-69.46816 2.27328-81.73568L844.92288 124.90752c33.30048-10.40384 64.57344 20.8896 54.1696 54.1696L682.92608 870.78912a43.2128 43.2128 0 0 1-81.36704 3.25632 121682.5344 121682.5344 0 0 1-103.2192-266.19904z"
  })
}), _n = () => c("svg", {
  className: "icon",
  viewBox: "0 0 1024 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  children: c("path", {
    d: "M972.657609 209.348408C987.158609 209.36839 998.930114 197.571202 998.949999 182.99865 998.969882 168.426097 987.230618 156.59651 972.729617 156.576528L32.457975 155.280806C17.956974 155.260823 6.18547 167.058012 6.165585 181.630564 6.1457 196.203116 17.884965 208.032703 32.385966 208.052686L972.657609 209.348408ZM180.466902 992.356169 180.466902 1019.014859 206.993296 1018.74074 833.361858 1012.267947 859.348284 1011.999407 859.348284 985.883377 859.348284 289.397297C859.348284 274.824732 847.59289 263.011332 833.091874 263.011332 818.590859 263.011332 806.835465 274.824732 806.835465 289.397297L806.835465 985.883377 832.82189 959.498805 206.453329 965.971599 232.979723 992.356169 232.979723 282.67005C232.979723 268.097483 221.224329 256.284085 206.723313 256.284085 192.222298 256.284085 180.466902 268.097483 180.466902 282.67005L180.466902 992.356169ZM656.410257 847.079027C656.410257 861.651593 668.165651 873.464992 682.666667 873.464992 697.167682 873.464992 708.923076 861.651593 708.923076 847.079027L708.923076 372.131659C708.923076 357.559091 697.167682 345.745694 682.666667 345.745694 668.165651 345.745694 656.410257 357.559091 656.410257 372.131659L656.410257 847.079027ZM341.333333 847.079027C341.333333 861.651593 353.08873 873.464992 367.589743 873.464992 382.090758 873.464992 393.846155 861.651593 393.846155 847.079027L393.846155 372.131659C393.846155 357.559091 382.090758 345.745694 367.589743 345.745694 353.08873 345.745694 341.333333 357.559091 341.333333 372.131659L341.333333 847.079027ZM498.871795 847.079027C498.871795 861.651593 510.627189 873.464992 525.128205 873.464992 539.62922 873.464992 551.384614 861.651593 551.384614 847.079027L551.384614 372.131659C551.384614 357.559091 539.62922 345.745694 525.128205 345.745694 510.627189 345.745694 498.871795 357.559091 498.871795 372.131659L498.871795 847.079027ZM392.147755 116.721777C392.147755 102.063669 403.758665 90.363507 418.40134 90.363507L622.925796 90.363507C637.408947 90.363507 649.179381 102.1619 649.179381 116.549585L649.179381 171.644875 701.692203 171.644875 701.692203 116.549585C701.692203 72.986607 666.38105 37.591577 622.925796 37.591577L418.40134 37.591577C374.724427 37.591577 339.634933 72.950804 339.634933 116.721777L339.634933 165.310801 392.147755 165.310801 392.147755 116.721777Z"
  })
}), ai = (n) => c("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  className: n.className,
  viewBox: "0 0 512 512",
  children: c("path", {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: "48",
    d: "M112 184l144 144 144-144"
  })
}), We = (n) => c("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  className: "".concat(n.className, " icon"),
  viewBox: "0 0 512 512",
  children: c("path", {
    d: "M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm108.25 138.29l-134.4 160a16 16 0 01-12 5.71h-.27a16 16 0 01-11.89-5.3l-57.6-64a16 16 0 1123.78-21.4l45.29 50.32 122.59-145.91a16 16 0 0124.5 20.58z"
  })
}), Ve = (n) => c("svg", {
  className: n.className,
  width: "16",
  height: "16",
  viewBox: "0 0 50 50",
  xmlns: "http://www.w3.org/2000/svg",
  children: c("circle", {
    cx: "25",
    cy: "25",
    r: "20",
    stroke: "currentColor",
    strokeWidth: "5",
    fill: "none",
    strokeDasharray: "31.415, 31.415",
    strokeLinecap: "round",
    children: c("animateTransform", {
      attributeName: "transform",
      type: "rotate",
      from: "0 25 25",
      to: "360 25 25",
      dur: "1s",
      repeatCount: "indefinite"
    })
  })
}), ri = () => c("svg", {
  className: "icon",
  viewBox: "0 0 1024 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  width: "18",
  height: "18",
  children: c("path", {
    d: "M704 256v490.666667a170.666667 170.666667 0 0 1-170.666667 170.666666 170.666667 170.666667 0 0 1-170.666666-170.666666V213.333333A106.666667 106.666667 0 0 1 469.333333 106.666667 106.666667 106.666667 0 0 1 576 213.333333v448a42.666667 42.666667 0 0 1-42.666667 42.666667 42.666667 42.666667 0 0 1-42.666666-42.666667V256H426.666667v405.333333a106.666667 106.666667 0 0 0 106.666666 106.666667 106.666667 106.666667 0 0 0 106.666667-106.666667V213.333333a170.666667 170.666667 0 0 0-170.666667-170.666666 170.666667 170.666667 0 0 0-170.666666 170.666666v533.333334a234.666667 234.666667 0 0 0 234.666666 234.666666 234.666667 234.666667 0 0 0 234.666667-234.666666V256h-64z"
  })
}), gn = () => c("svg", {
  className: "icon",
  viewBox: "0 0 1024 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  width: "18",
  height: "18",
  children: [c("path", {
    d: "M842.666667 285.866667l-187.733334-187.733334c-14.933333-14.933333-32-21.333333-53.333333-21.333333H234.666667C194.133333 74.666667 160 108.8 160 149.333333v725.333334c0 40.533333 34.133333 74.666667 74.666667 74.666666h554.666666c40.533333 0 74.666667-34.133333 74.666667-74.666666V337.066667c0-19.2-8.533333-38.4-21.333333-51.2z m-44.8 44.8c-2.133333 2.133333-4.266667 0-8.533334 0h-170.666666c-6.4 0-10.666667-4.266667-10.666667-10.666667V149.333333c0-2.133333 0-6.4-2.133333-8.533333 0 0 2.133333 0 2.133333 2.133333l189.866667 187.733334z m-8.533334 554.666666H234.666667c-6.4 0-10.666667-4.266667-10.666667-10.666666V149.333333c0-6.4 4.266667-10.666667 10.666667-10.666666h311.466666c-2.133333 4.266667-2.133333 6.4-2.133333 10.666666v170.666667c0 40.533333 34.133333 74.666667 74.666667 74.666667h170.666666c4.266667 0 6.4 0 10.666667-2.133334V874.666667c0 6.4-4.266667 10.666667-10.666667 10.666666z",
    fill: "currentColor"
  }), c("path", {
    d: "M640 693.333333H341.333333c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32h298.666667c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32zM640 522.666667H341.333333c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32h298.666667c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32zM341.333333 416h85.333334c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32h-85.333334c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32z",
    fill: "currentColor"
  })]
}), ci = () => c("svg", {
  className: "icon",
  viewBox: "0 0 1024 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  width: "18",
  height: "18",
  children: c("path", {
    d: "M557.248 511.68l135.776-135.744-45.248-45.28L512 466.432l-135.776-135.776-45.248 45.28 135.776 135.744-135.776 135.776 45.248 45.248L512 556.928l135.776 135.776 45.248-45.248-135.776-135.776zM512 64c247.136 0 448 200.864 448 448s-200.864 448-448 448S64 759.136 64 512 264.864 64 512 64z",
    fill: "currentColor"
  })
}), li = () => c("svg", {
  className: "icon",
  viewBox: "0 0 1024 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  width: "18",
  height: "18",
  children: c("path", {
    d: "M512.43945313 904.51953125c-6.06445313 0-12.12890625-1.58203125-17.57812501-4.74609375L136.70703125 689.71484375c-10.63476563-6.24023438-17.13867188-17.66601563-17.13867188-29.97070313s6.50390625-23.73046875 17.13867188-29.97070312l76.37695313-44.91210938L136.97070312 540.125c-10.63476563-6.24023438-17.13867188-17.66601563-17.13867187-29.97070313s6.50390625-23.73046875 17.13867188-29.97070312l73.38867187-43.15429688-73.125-42.890625C126.51171875 387.81054687 120.0078125 376.38476562 120.0078125 364.08007812c0-12.3046875 6.50390625-23.73046875 17.13867188-29.97070312L495.828125 122.99609375c10.8984375-6.41601563 24.34570313-6.41601563 35.24414063 0l358.15429687 210.05859375c10.63476563 6.24023438 17.13867188 17.66601563 17.13867188 29.97070313s-6.50390625 23.73046875-17.13867188 29.97070312l-73.38867188 43.15429688 73.12500001 42.890625c10.63476563 6.24023438 17.13867188 17.66601563 17.13867187 29.97070312s-6.50390625 23.73046875-17.13867187 29.97070313L812.5859375 583.89453125l76.11328125 44.6484375c10.63476563 6.24023438 17.13867188 17.66601563 17.13867188 29.97070313s-6.50390625 23.73046875-17.13867188 29.97070312l-358.59375 211.2890625c-5.44921875 3.1640625-11.6015625 4.74609375-17.66601563 4.74609375zM223.015625 659.65625l289.42382813 169.8046875 290.12695312-170.77148438-58.44726563-34.27734374L530.28125 750.18359375a34.67285156 34.67285156 0 0 1-35.24414063 0L281.7265625 625.02734375 223.015625 659.65625z m76.90429688-104.58984375l212.69531249 124.8046875 290.12695313-170.77148438-55.546875-32.60742187-216.65039063 127.6171875a34.67285156 34.67285156 0 0 1-35.24414062 0L279.00195312 477.28320312l-55.81054687 32.78320313 75.49804688 44.296875c0.43945313 0.26367188 0.79101563 0.52734375 1.23046874 0.703125z m-2.81250001-147.83203125l215.68359376 126.5625 216.12304687-127.17773438c0.3515625-0.26367188 0.703125-0.43945313 1.0546875-0.61523437l72.86132813-42.890625-289.33593751-169.8046875-290.12695312 170.68359375 72.59765625 42.62695313c0.43945313 0.17578125 0.79101563 0.43945313 1.14257813 0.61523437z"
  })
}), ui = (n) => c("svg", {
  className: n.className,
  id: "stop",
  viewBox: "0 0 1025 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  width: "18",
  height: "18",
  children: [c("path", {
    d: "M512.268258 1022.835842c-68.658678 0-135.399619-13.564433-198.369591-40.316509-60.752236-25.809077-115.373446-62.712976-162.346233-109.685763-46.971763-46.971763-83.875662-101.592974-109.685763-162.346233C15.115619 647.517366 1.551186 580.777449 1.551186 512.118771S15.115619 376.719151 41.866671 313.74918c25.810101-60.752236 62.714-115.373446 109.685763-162.346233 46.972787-46.971763 101.593997-83.875662 162.346233-109.685763 62.969971-26.751052 129.710912-40.315485 198.369591-40.315485s135.398595 13.564433 198.368567 40.315485c60.752236 25.810101 115.373446 62.714 162.346233 109.685763 46.971763 46.972787 83.875662 101.593997 109.685763 162.346233 26.752076 62.969971 40.316509 129.710912 40.316509 198.369591s-13.564433 135.398595-40.316509 198.368567c-25.809077 60.75326-62.712976 115.37447-109.685763 162.346233-46.971763 46.972787-101.592974 83.876686-162.346233 109.685763C647.666853 1009.27141 580.925912 1022.835842 512.268258 1022.835842zM512.268258 50.548195c-62.018782 0-122.293887 12.247716-179.152287 36.403219-54.923257 23.333323-104.317532 56.709936-146.810821 99.204249s-75.870926 91.888588-99.204249 146.810821c-24.155503 56.8584-36.403219 117.133505-36.403219 179.152287 0 62.017758 12.247716 122.292863 36.403219 179.152287 23.333323 54.923257 56.709936 104.317532 99.204249 146.811845 42.493289 42.493289 91.888588 75.870926 146.810821 99.204249 56.8584 24.155503 117.133505 36.403219 179.152287 36.403219 62.017758 0 122.292863-12.247716 179.152287-36.403219 54.923257-23.333323 104.317532-56.71096 146.811845-99.204249 42.493289-42.494313 75.870926-91.888588 99.204249-146.811845 24.155503-56.8584 36.403219-117.133505 36.403219-179.152287s-12.247716-122.293887-36.403219-179.152287c-23.334347-54.923257-56.71096-104.317532-99.205273-146.810821-42.493289-42.493289-91.887565-75.870926-146.810821-99.204249C634.561121 62.795911 574.286016 50.548195 512.268258 50.548195z",
    fill: "currentColor"
  }), c("path", {
    d: "M655.434047 694.244421 367.12637 694.244421c-21.046987 0-38.170445-17.123458-38.170445-38.170445L328.955925 367.766298c0-21.046987 17.123458-38.170445 38.170445-38.170445l288.307678 0c21.048011 0 38.170445 17.123458 38.170445 38.170445l0 288.307678C693.604492 677.120962 676.482058 694.244421 655.434047 694.244421zM380.150191 643.050154l262.260035 0L642.410226 380.79012 380.150191 380.79012 380.150191 643.050154z",
    fill: "currentColor"
  })]
}), di = (n) => c("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  className: n.className,
  viewBox: "0 0 512 512",
  children: c("path", {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: "48",
    d: "M112 268l144 144 144-144M256 392V100"
  })
}), hi = () => c("svg", {
  viewBox: "0 0 1024 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  width: "18",
  height: "18",
  children: [c("path", {
    d: "M394.688 126.208a32 32 0 0 1 32-32h170.688a32 32 0 0 1 32 32v138.624h288a32 32 0 0 1 32 32v170.688a32 32 0 0 1-32 32H106.688a32 32 0 0 1-32-32V296.832a32 32 0 0 1 32-32h288V126.208z m64 32v138.624a32 32 0 0 1-32 32h-288v106.688h746.688V328.832h-288a32 32 0 0 1-32-32V158.208H458.688z"
  }), c("path", {
    d: "M138.688 469.376a32 32 0 0 1 32-32h682.688a32 32 0 0 1 32 32v384a32 32 0 0 1-32 32H170.688a32 32 0 0 1-32-32v-384z m64 32v320h618.688v-320H202.688z"
  }), c("path", {
    d: "M341.376 691.52a32 32 0 0 1 32 32V851.2a32 32 0 1 1-64 0v-127.68a32 32 0 0 1 32-32zM512 691.2a32 32 0 0 1 32 32v128a32 32 0 0 1-64 0v-128a32 32 0 0 1 32-32zM682.688 691.52a32 32 0 0 1 32 32V851.2a32 32 0 1 1-64 0v-127.68a32 32 0 0 1 32-32z"
  })]
}), pi = () => c("svg", {
  viewBox: "0 0 1024 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  width: "18",
  height: "18",
  children: c("path", {
    d: "M843.251 424.407l43.828-74.898c10.194-17.946 32.596-22.158 48.956-11.598 16.298 10.499 23.44 32.658 14.223 49.566l-113.11 195.212-61.164-40.044-126.418-82.285c-16.115-11.598-20.632-34.428-10.194-51.702 9.705-17.397 31.009-23.501 47.857-13.734l89.67 59.028C748.576 295.547 615.81 180.667 461.008 180.667c-177.387 0-320.042 148.758-320.042 331.335 0 183.613 143.692 331.334 319.981 331.334 107.861 0.184 208.58-56.158 268.034-149.858 1.099-1.038 1.099-2.075 2.075-2.075 6.348-9.949 17.092-15.871 28.568-15.81 19.35 0 35.648 16.848 35.648 36.93 0 7.508-2.137 14.833-6.104 21.059-72.823 114.698-196.066 183.675-328.099 183.614-216.088 0-391.4-181.478-391.4-405.195 0-223.718 175.312-405.195 391.339-405.195 183.125-0.427 342.016 131.606 382.243 317.601z"
  })
}), fi = () => c("svg", {
  version: "1.1",
  className: "icon",
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg",
  children: c("path", {
    d: "M627.498667 55.168l170.666666 170.666667a42.624 42.624 0 0 1 0 60.330666l-469.333333 469.333334A42.538667 42.538667 0 0 1 298.666667 768H128a42.666667 42.666667 0 0 1-42.666667-42.666667v-170.666666c0-11.306667 4.48-22.186667 12.501334-30.165334l469.333333-469.333333a42.624 42.624 0 0 1 60.330667 0zM896 896a42.666667 42.666667 0 0 1 0 85.333333H128a42.666667 42.666667 0 0 1 0-85.333333h768zM597.333333 145.664l-426.666666 426.666667V682.666667h110.336l426.666666-426.666667L597.333333 145.664z"
  })
}), vi = (n) => c("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  className: n.className,
  viewBox: "0 0 512 512",
  children: c("path", {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: "48",
    d: "M184 112l144 144-144 144"
  })
}), mi = () => c("svg", {
  className: "icon",
  viewBox: "0 0 1024 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  children: c("path", {
    d: "M896 870.4l-128-128c55.467-68.267 89.6-149.333 89.6-238.933 0-98.134-38.4-192-110.933-264.534-149.334-149.333-384-149.333-533.334-4.266-145.066 145.066-145.066 384 0 529.066 72.534 72.534 166.4 110.934 264.534 110.934 89.6 0 174.933-29.867 238.933-89.6l128 128c4.267 4.266 12.8 8.533 21.333 8.533s17.067-4.267 21.334-8.533c17.066-8.534 17.066-29.867 8.533-42.667zM260.267 721.067c-119.467-123.734-119.467-320 0-439.467 59.733-59.733 140.8-89.6 217.6-89.6 81.066 0 157.866 29.867 217.6 89.6 59.733 59.733 89.6 136.533 89.6 217.6 0 81.067-34.134 162.133-89.6 217.6-55.467 59.733-132.267 93.867-217.6 93.867-81.067 0-157.867-34.134-217.6-89.6z"
  })
});
const _i = (n) => {
  const {
    items: e
  } = n, t = I([]), i = new M("chat-thought-chain"), s = I([]);
  D(() => {
    s.value = e.filter((a) => a.description), s.value.length > 0 && s.value.forEach((a, r) => {
      a.done && (t.value = [...t.value, r]);
    });
  }, [e]);
  const o = (a) => {
    t.value.includes(a) ? t.value = t.value.filter((r) => r !== a) : t.value = [...t.value, a];
  };
  return s.value.length === 0 ? null : c("div", {
    className: "".concat(i.b(), " ").concat(i.is("single", s.value.length === 1)),
    children: s.value.map((a, r) => {
      if (!a.description)
        return;
      const u = t.value.includes(r);
      return c("div", {
        className: "".concat(i.e("item"), " ").concat(i.is("collapsed", u)),
        children: [c("div", {
          className: i.e("item-icon"),
          children: a.icon || c("span", {
            children: r
          })
        }), c("div", {
          className: i.e("item-content"),
          children: [c("div", {
            className: i.e("item-title"),
            onClick: () => o(r),
            children: [a.title, c(ai, {
              className: i.e("icon")
            })]
          }), c("div", {
            className: i.e("item-description"),
            children: a.description
          })]
        })]
      }, r);
    })
  });
};
const gi = (n) => {
  const {
    items: e,
    onItemClick: t
  } = n, i = (o, a) => {
    t == null || t(o, a);
  }, s = new M("chat-suggestions");
  return c("div", {
    className: "".concat(s.b()),
    children: e.map((o, a) => c("div", {
      className: "".concat(s.e("item"), " ").concat(s.is("action", o.type === "action")),
      onClick: (r) => i(o, r),
      title: o.metadata.content_name,
      children: [o.metadata.content_name, c(vi, {
        className: "".concat(s.e("item-icon"))
      })]
    }, a))
  });
};
const te = new M("markdown-message"), wi = (n) => {
  const {
    message: e,
    size: t
  } = n, i = I(Ae()), s = I(null), o = X(() => e.state === 20 && e.completed !== !0, [e.state, e.completed]), a = X(() => e.state === 20 && e.completed === !0, [e.state, e.completed]), r = I({
    title: "",
    description: "",
    icon: c(Ve, {})
  }), u = I({
    hasSuggestions: !1,
    suggestions: []
  }), h = (v) => {
    v && v.length > 0 ? u.value = {
      hasSuggestions: !0,
      suggestions: v
    } : u.value = {
      hasSuggestions: !1,
      suggestions: []
    };
  }, p = (v, _) => {
    n.controller.handleSuggestionClick(n.message, v, _);
  }, l = (v) => {
    const _ = v.indexOf("<think>"), d = v.indexOf("</think>");
    let f = "", m = "", w = !1;
    return d === -1 ? (w = !1, f = v.slice(_ + 7), m = "") : (w = !0, f = v.slice(_ + 7, d), m = v.slice(d + 8)), {
      isThoughtCompleted: w,
      thoughtContent: f,
      answerContent: m
    };
  };
  return D(() => {
    if (t >= 0 && s.value) {
      if (e.content.indexOf("<think>") !== -1) {
        const {
          isThoughtCompleted: v,
          thoughtContent: _,
          answerContent: d
        } = l(e.content);
        v ? (r.value.icon = c(We, {}), r.value.title = "思考完成") : e.completed === !0 ? (r.value.icon = c(We, {}), r.value.title = "思考已停止") : (r.value.icon = c(Ve, {}), r.value.title = "思考中..."), r.value.description = _ || "", s.value.setMarkdown(d || "");
      } else
        s.value.setMarkdown(e.content || "");
      h(e.suggestions);
    }
  }, [e, t]), D(() => {
    let v = "";
    if (e.content.indexOf("<think>") !== -1) {
      const {
        isThoughtCompleted: _,
        thoughtContent: d,
        answerContent: f
      } = l(e.content);
      r.value = {
        title: _ ? "思考完成" : e.completed === !0 ? "思考已停止" : "思考中...",
        description: d || "",
        icon: _ || e.completed === !0 ? c(We, {}) : c(Ve, {})
      }, f && (v = f);
    } else
      v = e.content;
    h(e.suggestions), s.value = new Vt({
      id: i,
      value: v || "",
      editor: {
        defaultModel: "previewOnly"
      },
      themeSettings: {
        // 目前应用的主题
        mainTheme: "dark",
        codeBlockTheme: "dark"
      },
      previewer: {
        // 默认禁用
        enablePreviewerBubble: !1
      },
      engine: {
        syntax: {
          table: {
            enableChart: !1,
            externals: ["echarts"]
          }
        }
      }
    });
  }, []), c("div", {
    className: "".concat(te.b(), " ").concat(te.is("loading", o)),
    children: [c("div", {
      className: te.b("header"),
      children: [c("div", {
        className: te.be("header", "caption"),
        children: "AI "
      }), n.children, a ? c("div", {
        className: te.be("header", "timeout"),
        children: "请求超时"
      }) : null]
    }), c("div", {
      className: "".concat(te.b("content"), " pre-wrap-container"),
      children: [c(_i, {
        items: [r.value]
      }), c("div", {
        id: i
      })]
    }), c("div", {
      className: te.b("footer"),
      children: u.value.hasSuggestions ? c(gi, {
        items: u.value.suggestions,
        onItemClick: (v, _) => {
          p(v, _);
        }
      }) : null
    })]
  });
};
const de = new M("ossfile-material"), bi = (n) => {
  const e = B(() => n.material.data.name), t = B(() => n.material.metadata.size), i = B(() => {
    const o = n.material.metadata.state;
    return o === "successed" ? "上传成功" : o === "uploading" ? "上传中" : o === "failed" ? "上传失败" : "未知状态";
  }), s = B(() => {
    switch (n.material.metadata.state) {
      case "successed":
        return "#1890ff";
      case "uploading":
        return "#52c41a";
      case "failed":
        return "#ff4d4f";
      default:
        return "#ff4d4f";
    }
  });
  return c("div", {
    className: de.b(),
    children: [c("div", {
      className: de.b("left"),
      children: c(gn, {})
    }), c("div", {
      className: de.b("right"),
      children: [c("div", {
        className: de.e("name"),
        title: e,
        children: e
      }), c("div", {
        className: de.e("metadata"),
        children: [c("div", {
          children: [t, "B"]
        }), c("div", {
          style: {
            color: s.value
          },
          children: i
        })]
      })]
    })]
  });
};
const he = new M("common-material"), yi = (n) => {
  var i, s, o, a;
  const e = (i = n.controller.opts.questionToolbarItems) == null ? void 0 : i.find((r) => r.id === n.material.metadata.actionId), t = B(() => n.material.metadata.name);
  return c("div", {
    className: he.b(),
    children: [c("div", {
      className: he.b("left"),
      children: e && e.icon ? typeof e.icon == "function" ? e.icon() : ((s = e.icon) == null ? void 0 : s.showIcon) && c(Y, {
        children: (o = e.icon) != null && o.cssClass ? c("i", {
          className: e.icon.cssClass
        }) : (a = e.icon) != null && a.imagePath ? it(e.icon.imagePath) ? c("div", {
          dangerouslySetInnerHTML: {
            __html: e.icon.imagePath
          }
        }) : c("img", {
          src: e.icon.imagePath
        }) : null
      }) : c(li, {})
    }), c("div", {
      className: he.b("right"),
      children: [c("div", {
        className: he.e("name"),
        title: t,
        children: t
      }), c("div", {
        className: he.e("metadata"),
        children: c("div", {
          children: (e == null ? void 0 : e.label) || "素材资源"
        })
      })]
    })]
  });
};
const qe = new M("chat-input-material-item"), wn = (n) => {
  const {
    material: e
  } = n;
  let t = null;
  switch (e.type) {
    case "ossfile":
      t = bi;
      break;
    default:
      t = yi;
  }
  const i = () => {
    n.controller.deleteMaterial(e);
  };
  return c("div", {
    className: "".concat(qe.b(), " ").concat(qe.is("disabled", n.disabled)),
    children: [c("div", {
      className: qe.e("icon"),
      onClick: i,
      children: c(ci, {})
    }), j(t, {
      material: e,
      controller: n.controller
    })]
  });
};
const ie = new M("user-message-question"), Ci = (n) => {
  const e = I(Ae()), t = I(null), i = B(() => n.message.content), s = B(() => sn.parseMixedContent(i.value));
  return D(() => {
    t.value = new Vt({
      id: e,
      value: s.value.remainingText || "",
      editor: {
        defaultModel: "previewOnly"
      },
      themeSettings: {
        // 目前应用的主题
        mainTheme: "dark",
        codeBlockTheme: "dark"
      },
      previewer: {
        // 默认禁用
        enablePreviewerBubble: !1
      },
      engine: {
        syntax: {
          table: {
            enableChart: !1,
            externals: ["echarts"]
          }
        }
      }
    });
  }, [s.value.remainingText]), c("div", {
    className: ie.b(),
    children: [c("div", {
      className: ie.e("user-header"),
      children: [n.children, c("div", {
        className: ie.e("user"),
        children: "我"
      })]
    }), c("div", {
      className: ie.e("content"),
      children: c("div", {
        className: ie.em("content", "body"),
        children: [s.value.hasResources && c("div", {
          className: ie.em("content", "material"),
          children: s.value.resources.map((o) => c(wn, {
            material: o,
            disabled: !0,
            controller: n.controller
          }, o.id))
        }), c("div", {
          className: "pre-wrap-container",
          children: c("div", {
            id: e
          })
        })]
      })
    })]
  });
};
const Ce = new M("error-message"), Ti = (n) => {
  const e = B(() => n.message.content);
  return c("div", {
    className: Ce.b(),
    children: [c("div", {
      className: Ce.b("header"),
      children: [c("div", {
        className: Ce.be("header", "caption"),
        children: "AI "
      }), n.children]
    }), c("div", {
      className: "".concat(Ce.e("content"), " pre-wrap-container"),
      children: c("span", {
        children: e
      })
    })]
  });
};
const Ct = new M("unknown-message"), xi = (n) => c("div", {
  className: Ct.b(),
  children: c("div", {
    className: "".concat(Ct.e("content"), " pre-wrap-container"),
    children: ["暂未支持的消息类型: ", n.message.type]
  })
});
const Si = new M("chat-message-item"), ki = (n) => {
  const {
    message: e,
    size: t
  } = n;
  let i = null;
  switch (e.type) {
    case "DEFAULT":
      i = e.role === "ASSISTANT" ? wi : Ci;
      break;
    case "ERROR":
      i = Ti;
      break;
    default:
      i = xi;
  }
  return c("div", {
    className: Si.b(),
    children: j(i, {
      size: t,
      message: e,
      controller: n.controller,
      children: n.children
    })
  });
};
class V {
  constructor(e) {
    this.msg = e;
  }
  get messageid() {
    return this.msg.messageid;
  }
  get state() {
    return this.msg.state;
  }
  get role() {
    return this.msg.role;
  }
  get type() {
    return this.msg.type;
  }
  get realcontent() {
    let e = this.msg.content;
    if (e.indexOf("<think>") !== -1 && e.indexOf("</think>") === -1 || (e = e.replace(new RegExp("\\<think\\>[^]*?\\<\\/think\\>", "gs"), "").trim(), e.indexOf("<resources>") !== -1 && e.indexOf("</resources>") === -1))
      return "";
    e = e.replace(new RegExp("\\<resources\\>[^]*?\\<\\/resources\\>", "gs"), "").trim();
    const t = e.indexOf("<suggestions>");
    return t !== -1 && (e = e.substring(0, t).trim()), e;
  }
  get content() {
    return this.msg.content;
  }
  get completed() {
    return this.msg.completed;
  }
  get suggestions() {
    return this.msg.suggestions;
  }
  get _origin() {
    return this.msg;
  }
  /**
   * 更新消息
   *
   * @author chitanda
   * @date 2023-10-10 17:10:07
   * @param {IChatMessage} msg
   */
  update(e) {
    e.content || (e.content = ""), e.content.indexOf("<think>") !== -1 && this.msg.content && (this.msg.content = ""), this.msg.content += e.content;
  }
  /**
   * 更新消息完成状态
   *
   * @author tony001
   * @date 2025-02-25 17:02:31
   * @param {boolean} completed
   */
  updateCompleted(e) {
    this.msg.completed = e;
  }
}
class pe {
  constructor(e) {
    this.data = e;
  }
  get appid() {
    return this.data.appid;
  }
  get id() {
    return this.data.id;
  }
  get type() {
    return this.data.type;
  }
  get caption() {
    return this.data.caption;
  }
  get sourceCaption() {
    return this.data.sourceCaption || this.caption;
  }
  get url() {
    return this.data.url;
  }
  get aiChat() {
    return this.data.aiChat;
  }
}
class je {
  constructor(e) {
    this.material = e;
  }
  get id() {
    return this.material.id;
  }
  get type() {
    return this.material.type;
  }
  get metadata() {
    return this.material.metadata;
  }
  get data() {
    return this.material.data;
  }
}
const H = new M("chat-toolbar-item"), Ni = (n) => {
  var f, m, w;
  const {
    model: e,
    data: t,
    className: i,
    disabled: s = !1,
    buttonType: o = "default",
    onClick: a
  } = n, [r, u] = K(!1), h = P(null), p = (g) => typeof g.hidden == "function" ? g.hidden(t) : g.hidden === !0;
  if (p(e))
    return c(Y, {});
  const l = (g) => s ? !0 : typeof g.disabled == "function" ? g.disabled(t) : g.disabled === !0, v = (g) => {
    var T, C, S, O;
    if (typeof g.icon == "function")
      return g.icon();
    if ((T = g.icon) != null && T.showIcon && ((C = g.icon) != null && C.cssClass))
      return c("i", {
        className: g.icon.cssClass
      });
    if ((S = g.icon) != null && S.showIcon && ((O = g.icon) != null && O.imagePath))
      return it(g.icon.imagePath) ? c("div", {
        dangerouslySetInnerHTML: {
          __html: g.icon.imagePath
        }
      }) : c("img", {
        src: g.icon.imagePath
      });
  }, _ = (g) => {
    l(e) || u(!0);
  }, d = (g, T) => {
    l(T) || (u(!1), a(g, T));
  };
  return D(() => {
    const g = (T) => {
      h.current && h.current.contains(T.target) || u(!1);
    };
    return r && document.addEventListener("mousedown", g), () => {
      document.removeEventListener("mousedown", g);
    };
  }, [r]), c("div", {
    className: "".concat(H.b(), " ").concat(H.b(o), " ").concat(e.customClass || "", " ").concat(i || "", " ").concat(H.is("disabled", l(e)), " ").concat(H.is("more", !!((f = e.children) != null && f.length))),
    children: [c("div", {
      title: e.title,
      className: H.e("content"),
      onClick: (g) => d(g, e),
      children: [c("div", {
        className: H.em("content", "icon"),
        children: v(e)
      }), c("div", {
        className: H.em("content", "label"),
        children: e.label
      })]
    }), ((m = e.children) == null ? void 0 : m.length) && c("div", {
      title: "更多",
      className: H.e("more"),
      onClick: _,
      children: c("i", {
        "aria-hidden": "true",
        className: "fa fa-angle-down ".concat(H.em("more", "icon"))
      })
    }), r && c("div", {
      ref: h,
      className: H.b("dropdown"),
      children: (w = e.children) == null ? void 0 : w.map((g, T) => {
        if (!p(g))
          return c("div", {
            title: g.title,
            onClick: (C) => d(C, g),
            className: "".concat(H.be("dropdown", "item"), " ").concat(g.customClass || "", " ").concat(H.is("disabled", l(g))),
            children: [c("div", {
              className: H.bem("dropdown", "item", "icon"),
              children: v(g)
            }), c("div", {
              className: H.bem("dropdown", "item", "label"),
              children: g.label
            })]
          }, T);
      })
    })]
  });
};
const Ei = new M("chat-toolbar"), et = (n) => {
  const {
    controller: e,
    items: t = [],
    data: i,
    type: s,
    className: o,
    mode: a
  } = n, r = rn(rt);
  let u = [];
  const h = [{
    label: "重置对话",
    title: "重置对话",
    icon: () => c(pi, {}),
    onClick: () => {
      e.resetTopic();
    },
    children: [{
      label: "清空对话",
      title: "清空对话",
      icon: () => c(hi, {}),
      onClick: () => {
        e.clearTopic();
      }
    }, {
      label: "新建对话",
      title: "新建对话",
      hidden: a !== "TOPIC",
      icon: () => c(ti, {}),
      onClick: () => {
        r.newTopic && r.newTopic();
      }
    }]
  }], p = [{
    label: "刷新",
    title: "刷新",
    icon: () => c(yt, {}),
    onClick: () => {
      e.refreshMessage(i);
    }
  }, {
    label: "删除",
    title: "删除",
    icon: () => c(Zn, {}),
    onClick: () => {
      e.deleteMessage(i);
    }
  }, {
    label: "复制",
    title: "复制",
    icon: () => c(Gn, {}),
    onClick: () => {
      e.copyMessage(i);
    }
  }];
  r.enableBackFill && p.unshift({
    label: "回填",
    title: "回填",
    icon: () => c(Yn, {}),
    onClick: () => {
      e.backfill(i);
    }
  });
  const l = [{
    label: "刷新",
    title: "刷新",
    icon: () => c(yt, {}),
    onClick: () => {
      e.refreshMessage(i, !0);
    }
  }];
  if (s === "content")
    switch (i.type) {
      case "DEFAULT":
        i.role === "ASSISTANT" ? u = [...p, ...t] : u = [...l];
        break;
      case "ERROR":
        u = [...p, ...t];
        break;
    }
  else
    u = [...h, ...t];
  const v = (d, f) => {
    const m = {
      ...i
    };
    if (i instanceof V ? (Object.assign(m, {
      topic: e.topic
    }), m.msg.realcontent = i.realcontent) : (m.data || (m.data = {}), Object.assign(m.data, {
      messages: e.messages.value
    })), f.onClick && typeof f.onClick == "function")
      f.onClick(d, f, e.context, e.params, m);
    else {
      const w = n.controller.opts.extendToolbarClick;
      w && typeof w == "function" && w(d, f, e.context, e.params, m);
    }
  }, _ = X(() => s === "content" && (i == null ? void 0 : i.state) === 20 && (i == null ? void 0 : i.completed) !== !0, [i == null ? void 0 : i.state, i == null ? void 0 : i.completed]);
  return c("div", {
    className: "".concat(Ei.b(), " ").concat(o || ""),
    children: u.map((d, f) => c(Ni, {
      data: i,
      model: d,
      disabled: _,
      buttonType: s === "content" ? "circle" : "default",
      onClick: v.bind(void 0)
    }, f))
  });
};
function Mi(n, e) {
  let t = null;
  return function(...i) {
    t || (t = setTimeout(() => {
      n.apply(this, i), t = null;
    }, e));
  };
}
const $i = (n) => {
  const e = I(!1), t = I({}), i = new M("chat-back-bottom"), s = I(null), o = () => {
    if (s.value) {
      const u = n.visibilityHeight || 200, h = s.value.scrollHeight - s.value.scrollTop - s.value.offsetHeight;
      e.value = h >= u;
    }
  }, a = () => {
    var u;
    s.value && (s.value.scrollTo({
      top: s.value.scrollHeight,
      behavior: "smooth"
    }), (u = n.onClick) == null || u.call(n));
  }, r = Mi(o, 300);
  return X(() => {
    t.value = {
      right: "".concat(n.right, "px"),
      bottom: "".concat(n.bottom, "px")
    };
  }, [n.right, n.bottom]), D(() => {
    var u;
    if (n.target) {
      const h = (u = document.querySelector(n.target)) != null ? u : void 0;
      h && (s.value = h, h.addEventListener("scroll", r), o());
    }
  }, []), c("div", {
    className: "".concat(i.b(), " ").concat(i.is("visible", e.value)),
    style: t.value,
    onClick: a,
    children: c(di, {
      className: i.e("icon")
    })
  });
};
const Tt = new M("chat-messages"), xt = (n) => {
  const e = P(null), [t, i] = K(!0), s = P(!1), o = n.controller.messages, a = () => {
    const h = e.current;
    h && (s.current = !0, h.scrollTo({
      top: h.scrollHeight,
      behavior: "auto"
    }), setTimeout(() => {
      s.current = !1;
    }, 500));
  };
  D(() => {
    t && a();
  }, [o.value]);
  const r = () => {
    if (!s.current && e.current) {
      const {
        scrollTop: h,
        scrollHeight: p,
        clientHeight: l
      } = e.current, v = p - (h + l) < 50;
      i(v);
    }
  }, u = () => {
    s.current = !0, i(!0);
  };
  return c("div", {
    ref: e,
    className: Tt.b(),
    onScroll: r,
    children: [o.value.map((h) => {
      var l;
      const p = ((l = h.content) == null ? void 0 : l.length) || 0;
      return h.role !== "SYSTEM" ? c(ki, {
        size: p,
        message: h,
        controller: n.controller,
        children: c(et, {
          data: h,
          type: "content",
          items: n.toolbarItems,
          controller: n.controller
        })
      }, h.messageid) : null;
    }), c($i, {
      right: 20,
      bottom: 14,
      target: ".".concat(Tt.b()),
      onClick: u
    })]
  });
};
function Ai(n, e) {
  for (var t in e)
    n[t] = e[t];
  return n;
}
function St(n, e) {
  for (var t in n)
    if (t !== "__source" && !(t in e))
      return !0;
  for (var i in e)
    if (i !== "__source" && n[i] !== e[i])
      return !0;
  return !1;
}
function kt(n) {
  this.props = n;
}
(kt.prototype = new F()).isPureReactComponent = !0, kt.prototype.shouldComponentUpdate = function(n, e) {
  return St(this.props, n) || St(this.state, e);
};
var Nt = b.__b;
b.__b = function(n) {
  n.type && n.type.__f && n.ref && (n.props.ref = n.ref, n.ref = null), Nt && Nt(n);
};
var Ii = b.__e;
b.__e = function(n, e, t, i) {
  if (n.then) {
    for (var s, o = e; o = o.__; )
      if ((s = o.__c) && s.__c)
        return e.__e == null && (e.__e = t.__e, e.__k = t.__k), s.__c(n, e);
  }
  Ii(n, e, t, i);
};
var Et = b.unmount;
function bn(n, e, t) {
  return n && (n.__c && n.__c.__H && (n.__c.__H.__.forEach(function(i) {
    typeof i.__c == "function" && i.__c();
  }), n.__c.__H = null), (n = Ai({}, n)).__c != null && (n.__c.__P === t && (n.__c.__P = e), n.__c = null), n.__k = n.__k && n.__k.map(function(i) {
    return bn(i, e, t);
  })), n;
}
function yn(n, e, t) {
  return n && t && (n.__v = null, n.__k = n.__k && n.__k.map(function(i) {
    return yn(i, e, t);
  }), n.__c && n.__c.__P === e && (n.__e && t.insertBefore(n.__e, n.__d), n.__c.__e = !0, n.__c.__P = t)), n;
}
function Ye() {
  this.__u = 0, this.t = null, this.__b = null;
}
function Cn(n) {
  var e = n.__.__c;
  return e && e.__a && e.__a(n);
}
function Te() {
  this.u = null, this.o = null;
}
b.unmount = function(n) {
  var e = n.__c;
  e && e.__R && e.__R(), e && n.__h === !0 && (n.type = null), Et && Et(n);
}, (Ye.prototype = new F()).__c = function(n, e) {
  var t = e.__c, i = this;
  i.t == null && (i.t = []), i.t.push(t);
  var s = Cn(i.__v), o = !1, a = function() {
    o || (o = !0, t.__R = null, s ? s(r) : r());
  };
  t.__R = a;
  var r = function() {
    if (!--i.__u) {
      if (i.state.__a) {
        var h = i.state.__a;
        i.__v.__k[0] = yn(h, h.__c.__P, h.__c.__O);
      }
      var p;
      for (i.setState({ __a: i.__b = null }); p = i.t.pop(); )
        p.forceUpdate();
    }
  }, u = e.__h === !0;
  i.__u++ || u || i.setState({ __a: i.__b = i.__v.__k[0] }), n.then(a, a);
}, Ye.prototype.componentWillUnmount = function() {
  this.t = [];
}, Ye.prototype.render = function(n, e) {
  if (this.__b) {
    if (this.__v.__k) {
      var t = document.createElement("div"), i = this.__v.__k[0].__c;
      this.__v.__k[0] = bn(this.__b, t, i.__O = i.__P);
    }
    this.__b = null;
  }
  var s = e.__a && j(Y, null, n.fallback);
  return s && (s.__h = null), [j(Y, null, e.__a ? null : n.children), s];
};
var Mt = function(n, e, t) {
  if (++t[1] === t[0] && n.o.delete(e), n.props.revealOrder && (n.props.revealOrder[0] !== "t" || !n.o.size))
    for (t = n.u; t; ) {
      for (; t.length > 3; )
        t.pop()();
      if (t[1] < t[0])
        break;
      n.u = t = t[2];
    }
};
function Di(n) {
  return this.getChildContext = function() {
    return n.context;
  }, n.children;
}
function Li(n) {
  var e = this, t = n.i;
  e.componentWillUnmount = function() {
    ae(null, e.l), e.l = null, e.i = null;
  }, e.i && e.i !== t && e.componentWillUnmount(), e.l || (e.i = t, e.l = { nodeType: 1, parentNode: t, childNodes: [], appendChild: function(i) {
    this.childNodes.push(i), e.i.appendChild(i);
  }, insertBefore: function(i, s) {
    this.childNodes.push(i), e.i.appendChild(i);
  }, removeChild: function(i) {
    this.childNodes.splice(this.childNodes.indexOf(i) >>> 1, 1), e.i.removeChild(i);
  } }), ae(j(Di, { context: e.context }, n.__v), e.l);
}
function zi(n, e) {
  var t = j(Li, { __v: n, i: e });
  return t.containerInfo = e, t;
}
(Te.prototype = new F()).__a = function(n) {
  var e = this, t = Cn(e.__v), i = e.o.get(n);
  return i[0]++, function(s) {
    var o = function() {
      e.props.revealOrder ? (i.push(s), Mt(e, n, i)) : s();
    };
    t ? t(o) : o();
  };
}, Te.prototype.render = function(n) {
  this.u = null, this.o = /* @__PURE__ */ new Map();
  var e = Me(n.children);
  n.revealOrder && n.revealOrder[0] === "b" && e.reverse();
  for (var t = e.length; t--; )
    this.o.set(e[t], this.u = [1, 0, this.u]);
  return n.children;
}, Te.prototype.componentDidUpdate = Te.prototype.componentDidMount = function() {
  var n = this;
  this.o.forEach(function(e, t) {
    Mt(n, t, e);
  });
};
var Hi = typeof Symbol < "u" && Symbol.for && Symbol.for("react.element") || 60103, Oi = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/, Bi = /^on(Ani|Tra|Tou|BeforeInp|Compo)/, Pi = /[A-Z0-9]/g, Ri = typeof document < "u", Fi = function(n) {
  return (typeof Symbol < "u" && typeof Symbol() == "symbol" ? /fil|che|rad/ : /fil|che|ra/).test(n);
};
F.prototype.isReactComponent = {}, ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach(function(n) {
  Object.defineProperty(F.prototype, n, { configurable: !0, get: function() {
    return this["UNSAFE_" + n];
  }, set: function(e) {
    Object.defineProperty(this, n, { configurable: !0, writable: !0, value: e });
  } });
});
var $t = b.event;
function Ui() {
}
function Wi() {
  return this.cancelBubble;
}
function Vi() {
  return this.defaultPrevented;
}
b.event = function(n) {
  return $t && (n = $t(n)), n.persist = Ui, n.isPropagationStopped = Wi, n.isDefaultPrevented = Vi, n.nativeEvent = n;
};
var qi = { enumerable: !1, configurable: !0, get: function() {
  return this.class;
} }, At = b.vnode;
b.vnode = function(n) {
  typeof n.type == "string" && function(e) {
    var t = e.props, i = e.type, s = {};
    for (var o in t) {
      var a = t[o];
      if (!(o === "value" && "defaultValue" in t && a == null || Ri && o === "children" && i === "noscript" || o === "class" || o === "className")) {
        var r = o.toLowerCase();
        o === "defaultValue" && "value" in t && t.value == null ? o = "value" : o === "download" && a === !0 ? a = "" : r === "ondoubleclick" ? o = "ondblclick" : r !== "onchange" || i !== "input" && i !== "textarea" || Fi(t.type) ? r === "onfocus" ? o = "onfocusin" : r === "onblur" ? o = "onfocusout" : Bi.test(o) ? o = r : i.indexOf("-") === -1 && Oi.test(o) ? o = o.replace(Pi, "-$&").toLowerCase() : a === null && (a = void 0) : r = o = "oninput", r === "oninput" && s[o = r] && (o = "oninputCapture"), s[o] = a;
      }
    }
    i == "select" && s.multiple && Array.isArray(s.value) && (s.value = Me(t.children).forEach(function(u) {
      u.props.selected = s.value.indexOf(u.props.value) != -1;
    })), i == "select" && s.defaultValue != null && (s.value = Me(t.children).forEach(function(u) {
      u.props.selected = s.multiple ? s.defaultValue.indexOf(u.props.value) != -1 : s.defaultValue == u.props.value;
    })), t.class && !t.className ? (s.class = t.class, Object.defineProperty(s, "className", qi)) : (t.className && !t.class || t.class && t.className) && (s.class = s.className = t.className), e.props = s;
  }(n), n.$$typeof = Hi, At && At(n);
};
var It = b.__r;
b.__r = function(n) {
  It && It(n), n.__c;
};
var Dt = b.diffed;
b.diffed = function(n) {
  Dt && Dt(n);
  var e = n.props, t = n.__e;
  t != null && n.type === "textarea" && "value" in e && e.value !== t.value && (t.value = e.value == null ? "" : e.value);
};
var _e = /* @__PURE__ */ new Map();
function ji(n) {
  var e = _e.get(n);
  e && e.destroy();
}
function Yi(n) {
  var e = _e.get(n);
  e && e.update();
}
var fe = null;
typeof window > "u" ? ((fe = function(n) {
  return n;
}).destroy = function(n) {
  return n;
}, fe.update = function(n) {
  return n;
}) : ((fe = function(n, e) {
  return n && Array.prototype.forEach.call(n.length ? n : [n], function(t) {
    return function(i) {
      if (i && i.nodeName && i.nodeName === "TEXTAREA" && !_e.has(i)) {
        var s, o = null, a = window.getComputedStyle(i), r = (s = i.value, function() {
          h({ testForHeightReduction: s === "" || !i.value.startsWith(s), restoreTextAlign: null }), s = i.value;
        }), u = (function(l) {
          i.removeEventListener("autosize:destroy", u), i.removeEventListener("autosize:update", p), i.removeEventListener("input", r), window.removeEventListener("resize", p), Object.keys(l).forEach(function(v) {
            return i.style[v] = l[v];
          }), _e.delete(i);
        }).bind(i, { height: i.style.height, resize: i.style.resize, textAlign: i.style.textAlign, overflowY: i.style.overflowY, overflowX: i.style.overflowX, wordWrap: i.style.wordWrap });
        i.addEventListener("autosize:destroy", u), i.addEventListener("autosize:update", p), i.addEventListener("input", r), window.addEventListener("resize", p), i.style.overflowX = "hidden", i.style.wordWrap = "break-word", _e.set(i, { destroy: u, update: p }), p();
      }
      function h(l) {
        var v, _, d = l.restoreTextAlign, f = d === void 0 ? null : d, m = l.testForHeightReduction, w = m === void 0 || m, g = a.overflowY;
        if (i.scrollHeight !== 0 && (a.resize === "vertical" ? i.style.resize = "none" : a.resize === "both" && (i.style.resize = "horizontal"), w && (v = function(C) {
          for (var S = []; C && C.parentNode && C.parentNode instanceof Element; )
            C.parentNode.scrollTop && S.push([C.parentNode, C.parentNode.scrollTop]), C = C.parentNode;
          return function() {
            return S.forEach(function(O) {
              var L = O[0], U = O[1];
              L.style.scrollBehavior = "auto", L.scrollTop = U, L.style.scrollBehavior = null;
            });
          };
        }(i), i.style.height = ""), _ = a.boxSizing === "content-box" ? i.scrollHeight - (parseFloat(a.paddingTop) + parseFloat(a.paddingBottom)) : i.scrollHeight + parseFloat(a.borderTopWidth) + parseFloat(a.borderBottomWidth), a.maxHeight !== "none" && _ > parseFloat(a.maxHeight) ? (a.overflowY === "hidden" && (i.style.overflow = "scroll"), _ = parseFloat(a.maxHeight)) : a.overflowY !== "hidden" && (i.style.overflow = "hidden"), i.style.height = _ + "px", f && (i.style.textAlign = f), v && v(), o !== _ && (i.dispatchEvent(new Event("autosize:resized", { bubbles: !0 })), o = _), g !== a.overflow && !f)) {
          var T = a.textAlign;
          a.overflow === "hidden" && (i.style.textAlign = T === "start" ? "end" : "start"), h({ restoreTextAlign: T, testForHeightReduction: !0 });
        }
      }
      function p() {
        h({ testForHeightReduction: !0, restoreTextAlign: null });
      }
    }(t);
  }), n;
}).destroy = function(n) {
  return n && Array.prototype.forEach.call(n.length ? n : [n], ji), n;
}, fe.update = function(n) {
  return n && Array.prototype.forEach.call(n.length ? n : [n], Yi), n;
});
var Lt = fe, E = /* @__PURE__ */ ((n) => (n.STYLE_CACHE = "ai-chat-style-cache", n.MINIMIZE_STYLY_CHCHE = "ai-chat-minimize-style-cache", n.DATA_BASE_NAME = "ibiz-chat", n.DATA_TABLE_NAME = "history-message", n.DATA_TABLE_KEY_NAME = "id", n))(E || {});
class zt {
  /**
   * 聊天窗触发提问回调
   *
   * @author tony001
   * @date 2025-02-24 14:02:51
   * @param {object} context
   * @param {object} params
   * @param {object} otherParams
   * @param {IChatMessage[]} question 提问历史内容(包含当前提问)
  * @return {*}  {Promise<boolean>} 等待回答
   /**
   * Creates an instance of AiChatController.
   *
   * @author chitanda
   * @date 2023-10-15 19:10:34
   * @param {IChatOptions} opts 聊天配置
   */
  constructor(e) {
    /**
     * 聊天记录
     *
     * @author chitanda
     * @date 2023-10-16 16:10:29
     * @type {Signal<ChatMessage[]>}
     */
    x(this, "messages", J([]));
    /**
     * 素材列表
     *
     * @author tony001
     * @date 2025-02-27 18:02:46
     * @type {Signal<IMaterial[]>}
     */
    x(this, "materials", J([]));
    /**
     * 聊天框输入值
     *
     * @author chitanda
     * @date 2023-10-16 15:10:43
     * @type {Signal<string>}
     */
    x(this, "input", J(""));
    /**
     * 是否加载中
     *
     * @author tony001
     * @date 2025-03-10 18:03:42
     * @type {Signal<boolean>}
     */
    x(this, "isLoading", J(!1));
    /**
     * 视图参数
     *
     * @author tony001
     * @date 2025-02-24 14:02:23
     * @type {object}
     */
    x(this, "context");
    /**
     * 视图参数
     *
     * @author tony001
     * @date 2025-02-24 14:02:32
     * @type {object}
     */
    x(this, "params");
    /**
     * 应用实体标记
     *
     * @author tony001
     * @date 2025-02-24 14:02:10
     * @type {string}
     */
    x(this, "appDataEntityId");
    /**
     * 话题标识
     *
     * @author tony001
     * @date 2025-02-24 18:02:02
     * @type {(string | undefined)}
     */
    x(this, "topicId");
    /**
     * 话题数据
     *
     * @author tony001
     * @date 2025-03-10 16:03:26
     * @type {(ITopic | undefined)}
     */
    x(this, "topic");
    this.opts = e, this.context = e.context, this.params = e.params, this.appDataEntityId = e.appDataEntityId, this.topicId = e.topicId, this.topic = e.topic, this.fecthHistory();
  }
  /**
   * 获取历史记录
   *
   * @author tony001
   * @date 2025-02-24 13:02:52
   * @return {*}  {Promise<boolean>}
   */
  async fecthHistory() {
    if (this.topicId) {
      const t = await q.getData(E.DATA_BASE_NAME, E.DATA_TABLE_NAME, this.topicId);
      if (t && t.data && t.data.length > 0)
        return t.data.forEach((i) => {
          const s = {
            messageid: i.messageid,
            state: i.state,
            type: i.type,
            role: i.role,
            content: i.content,
            suggestions: i.suggestions,
            completed: !0
          };
          this.addMessage(s);
        }), !0;
    }
    return await this.opts.history(this.context, this.params, {
      appDataEntityId: this.appDataEntityId,
      appendCurData: this.opts.appendCurData
    }) && this.opts.appendCurContent && this.addMessage({
      state: 30,
      messageid: Ae(),
      role: "USER",
      type: "DEFAULT",
      content: this.opts.appendCurContent,
      completed: !0
    }), !0;
  }
  /**
   * 更新数据到indexdb
   *
   * @author tony001
   * @date 2025-02-24 18:02:41
   * @return {*}  {Promise<void>}
   */
  async asyncToIndexDB() {
    if (!this.topicId)
      return;
    const e = {
      id: this.topicId,
      data: this.messages.value.map((t) => t._origin),
      timestamp: (/* @__PURE__ */ new Date()).getTime()
    };
    await q.updateData(E.DATA_BASE_NAME, E.DATA_TABLE_NAME, e);
  }
  /**
   * 设置聊天框值
   *
   * @author chitanda
   * @date 2023-10-16 16:10:21
   * @param {string} input
   */
  setInput(e) {
    this.input.value = e || "";
  }
  /**
   * 新增聊天记录
   *
   * @author chitanda
   * @date 2023-10-09 15:10:15
   * @param {IMessage} data
   */
  addMessage(e) {
    const t = this.messages.value.find((i) => i.messageid === e.messageid);
    t ? (t.update(e), this.messages.value = [...this.messages.value]) : this.messages.value = [...this.messages.value, new V(e)], this.asyncToIndexDB();
  }
  /**
   * 更新消息完成状态
   *
   * @author tony001
   * @date 2025-02-25 17:02:19
   * @param {string} id
   * @param {boolean} completed
   */
  async completeMessage(e, t) {
    const i = this.messages.value.find((s) => s.messageid === e);
    i && (i.updateCompleted(t), this.messages.value = [...this.messages.value], await this.asyncToIndexDB());
  }
  /**
   * 替换已经存在的聊天消息
   *
   * @author chitanda
   * @date 2023-10-16 22:10:49
   * @param {IChatMessage} data
   */
  replaceMessage(e) {
    const t = this.messages.value.findIndex((i) => i.messageid === e.messageid);
    t !== -1 ? (this.messages.value[t] = new V(e), this.messages.value = [...this.messages.value]) : this.messages.value = [...this.messages.value, new V(e)], this.asyncToIndexDB(), e.type === "DEFAULT" && this.opts.recommendPrompt && this.opts.recommendPrompt(this.context, this.params, {
      appDataEntityId: this.appDataEntityId,
      message: {
        messages: [e]
      }
    }).then((i) => {
      i && i.content && this.updateRecommendPrompt(e, i.content);
    });
  }
  /**
   * 终止消息
   *
   * @author tony001
   * @date 2025-03-10 14:03:17
   * @param {IChatMessage} data
   */
  async stopMessage(e) {
    const t = this.messages.value.findIndex((i) => i.messageid === e.messageid);
    if (t !== -1) {
      const i = this.messages.value[t];
      e.content = i.content, this.messages.value[t] = new V(e), this.messages.value = [...this.messages.value];
    } else
      this.messages.value = [...this.messages.value, new V(e)];
    await this.asyncToIndexDB();
  }
  /**
   * 数据对象转 XML 字符串
   *
   * @author tony001
   * @date 2025-03-03 11:03:55
   * @return {*}  {string}
   */
  stringlyMaterialResource() {
    let e = "";
    const t = [];
    return this.materials.value && this.materials.value.length > 0 && (this.materials.value.forEach((i) => {
      if (i.type === "ossfile") {
        const s = i.metadata;
        s.state && s.state === "successed" && t.push(i);
      } else
        t.push(i);
    }), this.materials.value = []), t && t.length > 0 && (e = sn.stringify(t)), e;
  }
  /**
   * 提问
   *
   * @author chitanda
   * @date 2023-10-09 20:10:43
   * @return {*}  {Promise<void>}
   */
  async question(e) {
    try {
      this.isLoading.value = !0, this.messages.value.forEach((i, s) => {
        const o = i._origin;
        o.suggestions && (o.suggestions = void 0, this.messages.value[s] = new V(o));
      }), this.messages.value = [...this.messages.value], this.asyncToIndexDB();
      let t = this.stringlyMaterialResource();
      t ? t += "\n".concat(e) : t = e, this.addMessage({
        state: 30,
        messageid: Ae(),
        role: "USER",
        type: "DEFAULT",
        content: t
      }), await this.opts.question(this, this.context, this.params, {
        appDataEntityId: this.appDataEntityId
      }, this.messages.value.filter((i) => i.type !== "ERROR").map((i) => i._origin)), this.opts.action && this.opts.action("question", e), this.isLoading.value = !1;
    } finally {
      this.isLoading.value = !1;
    }
  }
  /**
   * 中断请求
   *
   * @author tony001
   * @date 2025-03-10 14:03:48
   */
  async abortQuestion() {
    try {
      await this.opts.abortQuestion(this);
    } finally {
      this.isLoading.value = !1;
    }
  }
  /**
   * 回填选中的消息
   *
   * @author chitanda
   * @date 2023-10-16 18:10:19
   * @param {IChatMessage} message
   */
  backfill(e) {
    this.opts.action && this.opts.action("backfill", e);
  }
  /**
   *
   * 删除指定消息，如果是用户提问的刷新调用的删除，则需要删除从问题开始到最后的所有记录
   * @param {IChatMessage} message
   * @param {boolean} [isuser=false]
   * @memberof AiChatController
   */
  deleteMessage(e) {
    const t = this.messages.value.findIndex((i) => i.messageid === e.messageid);
    t !== -1 && (this.messages.value.splice(t, 1), this.messages.value = [...this.messages.value]), this.asyncToIndexDB(), this.opts.action && this.opts.action("deletemsg", e);
  }
  /**
   * 刷新当前消息
   *
   * @memberof AiChatController
   */
  async refreshMessage(e, t = !1) {
    this.isLoading.value = !0;
    try {
      const i = this.messages.value.findIndex((s) => s.messageid === e.messageid);
      if (t)
        this.messages.value.splice(i + 1, this.messages.value.length - i - 1), this.messages.value = [...this.messages.value], await this.opts.question(this, this.context, this.params, {
          appDataEntityId: this.appDataEntityId
        }, this.messages.value.filter((s) => s.type !== "ERROR").map((s) => s._origin));
      else if (i === this.messages.value.length - 1)
        this.messages.value.pop(), this.messages.value = [...this.messages.value], await this.opts.question(this, this.context, this.params, {
          appDataEntityId: this.appDataEntityId
        }, this.messages.value.filter((s) => s.type !== "ERROR").map((s) => s._origin));
      else {
        const s = this.messages.value[i - 1].content;
        this.messages.value.splice(i - 1, 2), this.question(s);
      }
      this.asyncToIndexDB(), this.opts.action && this.opts.action("refreshmsg", e);
    } finally {
      this.isLoading.value = !1;
    }
  }
  /**
   * 复制消息
   *
   * @param {IChatMessage} message
   * @memberof AiChatController
   */
  copyMessage(e) {
    const t = e.realcontent;
    nn.copy(t), this.opts.action && this.opts.action("copymsg", e);
  }
  /**
   * 重置对话
   *
   * @memberof AiChatController
   */
  async resetTopic() {
    await this.abortQuestion(), this.topicId && await q.deleteData(E.DATA_BASE_NAME, E.DATA_TABLE_NAME, this.topicId), this.messages.value = [], this.opts.history(this.context, this.params, {
      appDataEntityId: this.appDataEntityId,
      appendCurData: this.opts.appendCurData
    });
  }
  /**
   * 清空对话
   *
   * @author tony001
   * @date 2025-03-18 17:03:57
   */
  async clearTopic() {
    await this.abortQuestion(), this.topicId && await q.deleteData(E.DATA_BASE_NAME, E.DATA_TABLE_NAME, this.topicId), this.messages.value = [];
  }
  /**
   * 新增素材资源
   *
   * @author tony001
   * @date 2025-02-27 18:02:00
   * @param {IMaterial} data
   */
  addMaterial(e) {
    this.materials.value.find((i) => i.id === e.id) ? this.materials.value = [...this.materials.value] : this.materials.value = [...this.materials.value, new je(e)];
  }
  /**
   * 替换素材资源
   *
   * @author tony001
   * @date 2025-02-28 15:02:24
   * @param {string} id
   * @param {IMaterial} data
   */
  replaceMaterial(e, t) {
    const i = this.materials.value.findIndex((s) => s.id === e);
    i !== -1 ? (this.materials.value[i] = new je(t), this.materials.value = [...this.materials.value]) : this.materials.value = [...this.materials.value, new je(t)];
  }
  /**
   * 删除指定素材资源
   *
   * @author tony001
   * @date 2025-02-27 18:02:33
   * @param {IMaterial} data
   */
  deleteMaterial(e) {
    const t = this.materials.value.findIndex((i) => i.id === e.id);
    t !== -1 && (this.materials.value.splice(t, 1), this.materials.value = [...this.materials.value]);
  }
  /**
   * 更新指定消息推荐提示
   *
   * @author tony001
   * @date 2025-03-19 11:03:47
   * @param {IChatMessage} data
   * @param {string} suggestionStr
   */
  updateRecommendPrompt(e, t) {
    if (!t)
      return;
    const i = this.messages.value.findIndex((o) => o.messageid === e.messageid), {
      suggestions: s
    } = Bn.parseMixedContent(t);
    s && s.length > 0 && (e.suggestions = s, i !== -1 ? (this.messages.value[i] = new V(e), this.messages.value = [...this.messages.value]) : this.messages.value = [...this.messages.value, new V(e)], this.asyncToIndexDB());
  }
  /**
   * 处理建议点击
   *
   * @author tony001
   * @date 2025-03-19 12:03:25
   * @param {IChatMessage} message
   * @param {IChatSuggestion} suggestion
   * @param {MouseEvent} event
   * @return {*}  {Promise<void>}
   */
  async handleSuggestionClick(e, t, i) {
    const s = this.messages.value.findIndex((a) => a.messageid === e.messageid);
    if (s !== -1) {
      const a = this.messages.value[s]._origin;
      a.suggestions = void 0, this.messages.value[s] = new V(a), this.messages.value = [...this.messages.value];
    }
    this.asyncToIndexDB();
    const {
      type: o
    } = t;
    switch (o) {
      case "action":
        if (this.opts.extendToolbarClick) {
          const a = t.data.actionid;
          if (!a)
            throw new Error("actionid不能为空");
          const r = {
            ...e
          };
          Object.assign(r, {
            topic: this.topic
          }), r.msg.realcontent = e.realcontent, await this.opts.extendToolbarClick(i, {
            id: a,
            appId: this.context.srfappid
          }, this.context, this.params, r);
        }
        break;
      case "raw":
        await this.question(t.data.content);
        break;
      default:
        throw new Error("不支持".concat(o, "推荐类型"));
    }
  }
}
class Xi {
  /**
   * Creates an instance of AiTopicController.
   * @author tony001
   * @date 2025-02-24 11:02:26
   * @param {ChatController} chat
   */
  constructor(e) {
    /**
     * 话题清单
     *
     * @author tony001
     * @date 2025-02-20 16:02:38
     * @type {Signal<ChatTopic[]>}
     */
    x(this, "topics", J([]));
    /**
     * 激活话题
     *
     * @author tony001
     * @date 2025-02-24 16:02:44
     * @type {(Signal<ITopic | undefined>)}
     */
    x(this, "activedTopic", J(void 0));
    /**
     * 当前话题配置备份
     *
     * @author tony001
     * @date 2025-02-24 16:02:28
     * @public
     * @type {(ITopicOptions | undefined)}
     */
    x(this, "currentTopicOptions");
    this.chat = e;
  }
  /**
   * 获取历史话题
   *
   * @author tony001
   * @date 2025-02-23 16:02:37
   * @return {*}  {Promise<void>}
   */
  async fetchHistory(e) {
    const i = await e.configService(e.appid, "aitopics", e.type).load();
    i && i.length > 0 && i.forEach((s) => {
      this.topics.value = [...this.topics.value, new pe(s)];
    });
  }
  /**
   * 更新当前话题
   *
   * @author tony001
   * @date 2025-02-23 17:02:43
   * @param {ITopicOptions} options
   * @return {*}  {Promise<void>}
   */
  async updateCurrentTopic(e) {
    this.currentTopicOptions = e;
    const t = this.topics.value.findIndex((a) => a.id === e.id), i = new pe(e);
    t !== -1 ? this.topics.value.splice(t, 1, new pe(e)) : this.topics.value = [...this.topics.value, new pe(e)];
    const s = this.topics.value.map((a) => ({
      appid: a.appid,
      id: a.id,
      type: a.type,
      caption: a.caption,
      sourceCaption: a.sourceCaption,
      url: a.url,
      aiChat: a.aiChat
    })), o = e.configService(e.appid, "aitopics", e.type);
    await (o == null ? void 0 : o.save(s)), this.activedTopic.value = i;
  }
  /**
   * 删除话题
   *
   * @author tony001
   * @date 2025-02-24 16:02:03
   * @param {ITopicOptions} options
   * @param {object} context
   * @param {object} params
   * @param {ITopic} data
   * @param {MouseEvent} event
   * @return {*}  {Promise<void>}
   */
  async removeTopic(e, t, i, s, o) {
    var p;
    let a = !0;
    if (e.beforeDelete && (a = await e.beforeDelete(t, i, s, o)), !a)
      return;
    const r = this.topics.value.findIndex((l) => l.id === s.id);
    r !== -1 && (this.topics.value.splice(r, 1), this.topics.value = [...this.topics.value]);
    const u = this.topics.value.map((l) => ({
      appid: l.appid,
      id: l.id,
      type: l.type,
      caption: l.caption,
      sourceCaption: l.sourceCaption,
      url: l.url,
      aiChat: l.aiChat
    })), h = e.configService(e.appid, "aitopics", e.type);
    await (h == null ? void 0 : h.save(u)), await q.deleteData(E.DATA_BASE_NAME, E.DATA_TABLE_NAME, s.id), this.topics.value.length > 0 && s.id === ((p = this.activedTopic.value) == null ? void 0 : p.id) && this.handleTopicChange(this.topics.value[0]);
  }
  /**
   * 更新话题数据
   *
   * @param {ITopicOptions} options 话题配置
   * @param {ChatTopic} _data 话题数据
   * @return {*}  {Promise<void>}
   * @memberof AiTopicController
   */
  async updateTopic(e, t) {
    const i = this.topics.value.map((o) => ({
      appid: o.appid,
      id: o.id,
      type: o.type,
      caption: o.caption,
      sourceCaption: o.sourceCaption,
      url: o.url,
      aiChat: o.aiChat
    })), s = e.configService(e.appid, "aitopics", e.type);
    await (s == null ? void 0 : s.save(i));
  }
  /**
   * 处理选中变化
   *
   * @author tony001
   * @date 2025-02-20 19:02:27
   * @param {ChatTopic} item
   */
  handleTopicChange(e) {
    var t;
    ((t = this.activedTopic.value) == null ? void 0 : t.id) !== e.id && (this.activedTopic.value = e, this.chat.switchAiChatController(e));
  }
  /**
   * 处理话题行为
   *
   * @author tony001
   * @date 2025-02-24 16:02:58
   * @param {string} action
   * @param {ChatTopic} topic
   * @param {MouseEvent} event
   * @return {*}  {Promise<void>}
   */
  async handleTopicAction(e, t, i) {
    var o, a;
    const s = this.topics.value.find((r) => r.id === t.id);
    if (this.currentTopicOptions && s && s.aiChat) {
      const {
        context: r,
        params: u
      } = s.aiChat;
      e === "DELETE" ? await this.removeTopic(this.currentTopicOptions, r, u, s, i) : e === "RENAME" && await this.updateTopic(this.currentTopicOptions, t), (a = (o = this.currentTopicOptions).action) == null || a.call(o, e, r, u, t, i);
    }
  }
  /**
   * 新建对话
   *
   * @author tony001
   * @date 2025-03-18 18:03:49
   * @return {*}  {Promise<void>}
   */
  async newTopic() {
    var u, h;
    const e = this.activedTopic.value;
    if (!e)
      return;
    const t = e.id.split("@")[0], i = this.topics.value.filter((p) => p.id.startsWith(t)), s = {
      appid: e.appid,
      // 源头数据id@当前时间戳
      id: "".concat(t, "@").concat(Date.now()),
      type: e.type,
      // 源头数据标题_当前话题数量(这儿源头数据可能已经被删除)
      caption: "".concat((u = e.sourceCaption) == null ? void 0 : u.split("_")[0], "_").concat(i.length),
      sourceCaption: e.sourceCaption,
      url: e.url,
      aiChat: e.aiChat
    }, o = new pe(s);
    this.topics.value = [...this.topics.value, o];
    const a = this.topics.value.map((p) => ({
      appid: p.appid,
      id: p.id,
      type: p.type,
      caption: p.caption,
      sourceCaption: p.sourceCaption,
      url: p.url,
      aiChat: p.aiChat
    })), r = (h = this.currentTopicOptions) == null ? void 0 : h.configService(s.appid, "aitopics", s.type);
    await (r == null ? void 0 : r.save(a)), this.handleTopicChange(o);
  }
  /**
   * 清空话题
   * - 当前激活项不清空
   * @return {*}  {Promise<void>}
   * @memberof AiTopicController
   */
  async clearTopic() {
    var o;
    const e = this.topics.value.find((a) => {
      var r;
      return a.id === ((r = this.activedTopic.value) == null ? void 0 : r.id);
    });
    if (!this.currentTopicOptions || !e)
      return;
    let t = !0;
    if (this.currentTopicOptions.beforeDelete && (t = await this.currentTopicOptions.beforeDelete(e.aiChat.context, e.aiChat.params, e, void 0, !0)), !t)
      return;
    await Promise.all(this.topics.value.map((a) => {
      if (a.id !== (e == null ? void 0 : e.id))
        return q.deleteData(E.DATA_BASE_NAME, E.DATA_TABLE_NAME, a.id);
    })), this.topics.value = e ? [e] : [];
    const i = (o = this.currentTopicOptions) == null ? void 0 : o.configService(this.currentTopicOptions.appid, "aitopics", this.currentTopicOptions.type), s = this.topics.value.map((a) => ({
      appid: a.appid,
      id: a.id,
      type: a.type,
      caption: a.caption,
      sourceCaption: a.sourceCaption,
      url: a.url,
      aiChat: a.aiChat
    }));
    await (i == null ? void 0 : i.save(s));
  }
}
class Tn {
  constructor(e) {
    this.aiChat = e;
  }
}
class Zi extends Tn {
  /**
   * 执行操作
   *
   * @author tony001
   * @date 2025-02-28 15:02:48
   * @return {*}  {Promise<void>}
   */
  async excuteAction(e, t) {
    let i;
    if (t && t.onClick && typeof t.onClick == "function")
      i = await t.onClick(e, t, this.aiChat.context, this.aiChat.params);
    else {
      const s = this.aiChat.opts.extendToolbarClick;
      s ? i = await s(e, t, this.aiChat.context, this.aiChat.params, {}) : console.error("未找到扩展工具栏点击事件");
    }
    if (i && i.data && i.data.length > 0) {
      const s = i.data[0], o = {
        id: s.id,
        type: s.type,
        data: s.data || {},
        metadata: s.metadata || {}
      };
      t.id && Object.assign(o.metadata, {
        actionId: t.id
      }), this.aiChat.addMaterial(o);
    }
  }
}
class Gi extends Tn {
  /**
   * 执行操作
   *
   * @author tony001
   * @date 2025-02-28 15:02:27
   * @return {*}  {Promise<void>}
   */
  async excuteAction(e, t) {
    const i = this.aiChat.opts.uploader, {
      multiple: s,
      accept: o,
      maxSize: a,
      onSelect: r,
      onUpload: u,
      onSuccess: h,
      onError: p,
      onProgress: l
    } = i, v = {
      multiple: s || !0,
      accept: o || "*/*",
      maxSize: a || 5 * 1024 * 1024,
      onSelect: (d) => {
        r == null || r(d), d.length > 0 && d.forEach((f) => {
          const m = this.buildMaterialObject(f);
          Object.assign(m.metadata, {
            state: "uploading"
          }), this.aiChat.addMaterial(m);
        });
      },
      onUpload: async (d, f) => u(d, f, {
        context: this.aiChat.context,
        params: this.aiChat.params
      }),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onSuccess: (d, f) => {
        const m = {
          id: d.id,
          type: "ossfile",
          data: {
            id: d.id,
            name: d.name
          },
          metadata: {
            ext: d.ext,
            fileext: d.fileext,
            fileid: d.fileid,
            filename: d.filename,
            size: d.size,
            filesize: d.filesize,
            state: "successed"
          }
        };
        this.aiChat.replaceMaterial(f.name, m), h == null || h(d, f);
      },
      onError: (d, f) => {
        const m = this.buildMaterialObject(f);
        Object.assign(m.metadata, {
          state: "failed"
        }), this.aiChat.replaceMaterial(f.name, m), p == null || p(d, f);
      },
      onProgress: (d, f) => {
        l == null || l(d, f);
      }
    };
    new On(v).openFilePicker();
  }
  /**
   * 构建素材对象
   *
   * @author tony001
   * @date 2025-02-28 15:02:12
   * @param {File} file
   * @return {*}  {IMaterial}
   */
  buildMaterialObject(e) {
    return {
      id: e.name,
      type: "ossfile",
      data: {
        name: e.name,
        id: e.name
      },
      metadata: {
        size: e.size,
        type: e.type,
        lastModified: e.lastModified
      }
    };
  }
}
class Ht {
  static getMaterialHelper(e, t) {
    switch (e) {
      case "ossfile":
        return new Gi(t);
      default:
        return new Zi(t);
    }
  }
}
class Ji {
  /**
   * Creates an instance of ChatController.
   * @author tony001
   * @date 2025-02-24 11:02:20
   */
  constructor() {
    /**
     * 聊天框容器
     *
     * @author chitanda
     * @date 2023-10-13 17:10:03
     * @protected
     * @type {HTMLDivElement}
     */
    x(this, "container");
    /**
     * 默认模式（聊天框）和话题模式（支持多话题切换），聊天框为默认模式
     *
     * @author tony001
     * @date 2025-02-20 16:02:50
     * @protected
     * @type {('DEFAULT' | 'TOPIC')}
     */
    x(this, "mode", "DEFAULT");
    /**
     * 是否挂载ai话题
     *
     * @author tony001
     * @date 2025-02-23 16:02:54
     * @protected
     * @type {boolean}
     */
    x(this, "isMountedAiTopic", !1);
    /**
     * 容器配置备份
     *
     * @author tony001
     * @date 2025-02-24 11:02:49
     * @protected
     * @type {(IContainerOptions | undefined)}
     */
    x(this, "backupChatOptions");
    /**
     * 话题控制器
     *
     * @author tony001
     * @date 2025-02-23 16:02:56
     * @public
     * @type {AiTopicController}
     */
    x(this, "aiTopic");
    /**
     * 话题map
     *
     * @private
     * @type {Map<string, AiChatController>}
     * @memberof ChatController
     */
    x(this, "aiTopicMap", /* @__PURE__ */ new Map());
    this.aiTopic = new Xi(this);
  }
  /**
   * 聊天控制器
   *
   * @readonly
   * @type {(AiChatController | undefined)}
   * @memberof ChatController
   */
  get aiChat() {
    var e;
    return this.aiTopicMap.get("".concat((e = this.aiTopic.activedTopic.value) == null ? void 0 : e.id));
  }
  /**
   * 初始化IndexDB
   *
   * @author tony001
   * @date 2025-02-24 18:02:50
   * @return {*}  {Promise<void>}
   */
  async initIndexDB() {
    await q.checkTableExists(E.DATA_BASE_NAME, E.DATA_TABLE_NAME) || await q.createTable(E.DATA_BASE_NAME, E.DATA_TABLE_NAME, E.DATA_TABLE_KEY_NAME, !1);
  }
  /**
   * 创建聊天窗口(会同时显示出来)
   *
   * @author tony001
   * @date 2025-02-24 12:02:58
   * @param {IContainerOptions} opts
   * @return {*}  {Promise<AiChatController>}
   */
  async create(e) {
    var o;
    await this.initIndexDB(), this.backupChatOptions = e, this.close(), this.container = document.createElement("div"), this.container.classList.add("ibiz-ai-chat"), document.body.appendChild(this.container);
    const t = e.chatOptions;
    let i;
    e.mode && e.mode === "TOPIC" ? (this.isMountedAiTopic || (await this.aiTopic.fetchHistory(e.topicOptions), this.isMountedAiTopic = !0), i = e.topicOptions, Object.assign(i, {
      aiChat: {
        caption: t.caption,
        context: t.context,
        params: t.params,
        appDataEntityId: t.appDataEntityId,
        contentToolbarItems: t.contentToolbarItems,
        footerToolbarItems: t.footerToolbarItems,
        questionToolbarItems: t.questionToolbarItems,
        otherToolbarItems: t.otherToolbarItems,
        appendCurData: t.appendCurData,
        appendCurContent: t.appendCurContent
      }
    }), await this.aiTopic.updateCurrentTopic(i)) : this.aiTopic.activedTopic.value = void 0, Object.assign(t, {
      topicId: i == null ? void 0 : i.id,
      topic: i
    });
    const s = new zt(t);
    return this.aiTopicMap.set("".concat(i == null ? void 0 : i.id), s), ae(j(Pt, {
      aiChat: s,
      aiTopic: this.aiTopic,
      mode: e.mode ? e.mode : "DEFAULT",
      containerOptions: e.containerOptions,
      caption: e.mode && e.mode === "TOPIC" ? "AI助手" : t.caption,
      enableBackFill: (o = e.containerOptions) == null ? void 0 : o.enableBackFill,
      contentToolbarItems: t.contentToolbarItems,
      footerToolbarItems: t.footerToolbarItems,
      questionToolbarItems: t.questionToolbarItems,
      close: () => {
        this.close(), t.closed && t.closed(t.context, t.params);
      },
      fullscreen: (a) => {
        t.fullscreen && t.fullscreen(a, t.context, t.params);
      },
      minimize: (a) => {
        t.minimize && t.minimize(a, t.context, t.params);
      }
    }), this.container), s;
  }
  /**
   * 切换聊天控制器
   *
   * @author tony001
   * @date 2025-02-24 11:02:24
   * @param {ChatTopic} topic
   */
  switchAiChatController(e) {
    var s, o, a, r, u;
    const t = {
      ...this.backupChatOptions.chatOptions
    };
    e.aiChat && Object.assign(t, {
      caption: e.aiChat.caption,
      context: e.aiChat.context,
      params: e.aiChat.params,
      contentToolbarItems: e.aiChat.contentToolbarItems,
      footerToolbarItems: e.aiChat.footerToolbarItems,
      questionToolbarItems: e.aiChat.questionToolbarItems,
      otherToolbarItems: e.aiChat.otherToolbarItems,
      appendCurData: e.aiChat.appendCurData,
      appendCurContent: e.aiChat.appendCurContent,
      appDataEntityId: e.aiChat.appDataEntityId,
      topicId: e.id,
      topic: e,
      extendToolbarClick: this.backupChatOptions.chatOptions.extendToolbarClick,
      recommendPrompt: this.backupChatOptions.chatOptions.recommendPrompt
    });
    let i;
    this.aiTopicMap.has("".concat(e.id)) ? i = this.aiTopicMap.get("".concat(e.id)) : (i = new zt(t), this.aiTopicMap.set("".concat(e.id), i)), this.container && (ae(null, this.container), ae(j(Pt, {
      aiChat: i,
      aiTopic: this.aiTopic,
      mode: (s = this.backupChatOptions) != null && s.mode ? this.backupChatOptions.mode : "DEFAULT",
      containerOptions: (o = this.backupChatOptions) == null ? void 0 : o.containerOptions,
      caption: (a = this.backupChatOptions) != null && a.mode && this.backupChatOptions.mode === "TOPIC" ? "AI助手" : t.caption,
      enableBackFill: (u = (r = this.backupChatOptions) == null ? void 0 : r.containerOptions) == null ? void 0 : u.enableBackFill,
      contentToolbarItems: t.contentToolbarItems,
      footerToolbarItems: t.footerToolbarItems,
      questionToolbarItems: t.questionToolbarItems,
      close: () => {
        this.close(), t.closed && t.closed(t.context, t.params);
      },
      fullscreen: (h) => {
        t.fullscreen && t.fullscreen(h, t.context, t.params);
      },
      minimize: (h) => {
        t.minimize && t.minimize(h, t.context, t.params);
      }
    }), this.container));
  }
  /**
   * 隐藏聊天窗口(必须先创建)
   *
   * @author chitanda
   * @date 2023-10-13 17:10:55
   */
  hidden() {
    this.container && (this.container.style.display = "none");
  }
  /**
   * 显示聊天窗窗口(必须先创建)
   *
   * @author chitanda
   * @date 2023-10-13 17:10:29
   */
  show() {
    this.container && (this.container.style.display = "flex");
  }
  /**
   * 关闭聊天窗口
   *
   * @author chitanda
   * @date 2023-10-13 17:10:10
   */
  close() {
    this.container && (ae(null, this.container), this.container.remove(), this.container = void 0);
  }
}
const rs = new Ji();
const Ki = new M("chat-input-material"), Qi = (n) => {
  const e = n.controller.materials;
  return c("div", {
    className: Ki.b(),
    children: e.value.map((t) => c(wn, {
      material: t,
      disabled: !1,
      controller: n.controller
    }, t.id))
  });
};
const xn = ({
  children: n,
  actions: e,
  // 接收行为数据
  content: t,
  position: i = "bottom",
  isOpen: s,
  onToggleOpen: o,
  onAction: a
  // 接收行为事件回调
}) => {
  const r = new M("pop"), u = rn(rt), [h, p] = K(s || !1), l = P(null), v = P(null);
  D(() => {
    s !== void 0 && p(s);
  }, [s]), D(() => (v.current || (v.current = document.createElement("div"), v.current.className = r.b("content-container"), document.body.appendChild(v.current)), () => {
    v.current && document.body.removeChild(v.current);
  }), []), D(() => {
    const d = (f) => {
      l.current && !l.current.contains(f.target) && !f.target.closest(".".concat(r.b())) && !f.target.closest(".ibiz-quick-edit") && !f.target.closest(".ibiz-picker__transfer") && (p(!1), o == null || o(!1));
    };
    return h && document.addEventListener("mousedown", d), () => {
      document.removeEventListener("mousedown", d);
    };
  }, [h, o]);
  const _ = () => {
    if (!l.current)
      return {};
    const d = l.current.getBoundingClientRect(), f = {
      position: "absolute",
      zIndex: u.zIndex + 1
    }, m = {
      bottom: {
        top: d.bottom + window.scrollY,
        left: d.left + window.scrollX
      },
      top: {
        bottom: window.innerHeight - d.top + window.scrollY,
        left: d.left + window.scrollX
      },
      left: {
        top: d.top + window.scrollY,
        right: window.innerWidth - d.left + window.scrollX
      },
      right: {
        top: d.top + window.scrollY,
        left: d.right + window.scrollX
      },
      "top-left": {
        bottom: window.innerHeight - d.top + window.scrollY,
        right: window.innerWidth - d.left + window.scrollX
      }
    };
    return {
      ...f,
      ...m[i]
    };
  };
  return c("span", {
    className: "".concat(r.b("trigger-container")),
    children: [c("span", {
      className: "".concat(r.b("trigger-element")),
      ref: l,
      onClick: (d) => {
        d.stopPropagation();
        const f = !h;
        p(f), o == null || o(f);
      },
      children: n
    }), h && v.current && zi(c("div", {
      className: "".concat(r.b(), " pop-").concat(i),
      style: _(),
      children: t || (e == null ? void 0 : e.map((d) => c("div", {
        title: d.caption,
        className: r.e("item"),
        onMouseDown: (f) => {
          f.stopPropagation(), a == null || a(d.id, f);
        },
        children: [d.icon, c("div", {
          className: r.em("item", "caption"),
          children: d.caption
        })]
      }, d.id)))
    }), v.current)]
  });
};
const $ = new M("chat-input"), Ot = window.SpeechRecognition || window.webkitSpeechRecognition, Bt = (n) => {
  var f;
  const [e, t] = K(!1), i = P(null), s = n.controller.input, o = I(!1), a = P();
  Ot && !a.current && (a.current = new Ot(), a.current.onstart = () => {
    o.value = !0;
  }, a.current.onend = () => {
    o.value = !1;
  }, a.current.onresult = (m) => {
    var g, T, C;
    const w = (C = (T = (g = m.results) == null ? void 0 : g[0]) == null ? void 0 : T[0]) == null ? void 0 : C.transcript;
    w && (s.value = "".concat(s.value).concat(w));
  });
  const r = () => {
    a.current && !o.value && a.current.start();
  }, u = Fe((m) => {
    s.value = m.target.value;
  }, [s]), h = B(() => s.value.length <= 0);
  D(() => (i.current && Lt(i.current), () => {
    i.current && Lt.destroy(i.current);
  }), [i]);
  const p = Fe(async () => {
    var m;
    try {
      const w = s.value;
      s.value = "", await n.controller.question(w);
    } catch (w) {
      console.error(w);
    } finally {
      (m = i.current) == null || m.focus();
    }
  }, [s]), l = Fe(async () => {
    try {
      n.controller.abortQuestion();
    } catch (m) {
      console.error(m);
    }
  }, [s]), v = (m) => {
    m.code === "Enter" && !m.isComposing && (m.stopPropagation(), m.shiftKey === !1 && p());
  }, _ = async (m) => {
    await Ht.getMaterialHelper("ossfile", n.controller).excuteAction(m), t(!1);
  }, d = async (m, w) => {
    await Ht.getMaterialHelper("common", n.controller).excuteAction(m, w), t(!1);
  };
  return c("div", {
    className: $.b("wrapper"),
    children: [c("div", {
      className: $.b("material-wrapper"),
      children: c(Qi, {
        controller: n.controller
      })
    }), c("div", {
      className: $.b("main-wrapper"),
      children: [c("textarea", {
        className: $.e("textarea"),
        type: "text",
        rows: 6,
        autoCorrect: "off",
        autoCapitalize: "off",
        autoComplete: "off",
        value: s,
        onInput: u,
        onKeyDown: v,
        ref: i,
        disabled: n.controller.isLoading.value
      }), c("div", {
        className: $.b("action-wrapper"),
        children: [c("div", {
          className: "".concat($.be("action-wrapper", "action-item"), " ").concat($.is("disabled", n.controller.isLoading.value)),
          title: "上传资料",
          children: c(xn, {
            content: c("div", {
              className: $.b("pop-actions"),
              children: [c("div", {
                className: $.b("pop-action-item"),
                onClick: (m) => {
                  _(m);
                },
                children: [c("span", {
                  className: $.b("pop-action-item-icon"),
                  children: c(gn, {})
                }), c("span", {
                  className: $.b("pop-action-item-title"),
                  children: "文件资料"
                })]
              }), (f = n.questionToolbarItems) == null ? void 0 : f.map((m) => {
                var w, g, T;
                return c("div", {
                  className: $.b("pop-action-item"),
                  onClick: (C) => {
                    d(C, m);
                  },
                  children: [c("span", {
                    className: $.b("pop-action-item-icon"),
                    children: typeof m.icon == "function" ? m.icon() : ((w = m.icon) == null ? void 0 : w.showIcon) && c(Y, {
                      children: (g = m.icon) != null && g.cssClass ? c("i", {
                        className: m.icon.cssClass
                      }) : (T = m.icon) != null && T.imagePath ? it(m.icon.imagePath) ? c("div", {
                        dangerouslySetInnerHTML: {
                          __html: m.icon.imagePath
                        }
                      }) : c("img", {
                        src: m.icon.imagePath
                      }) : null
                    })
                  }), c("span", {
                    className: $.b("pop-action-item-title"),
                    children: m.label
                  })]
                }, m.id);
              })]
            }),
            position: "top-left",
            isOpen: e,
            onToggleOpen: t,
            children: c(ri, {})
          })
        }), c("div", {
          title: o.value ? "语音输入中..." : "语音输入",
          className: "".concat($.be("action-wrapper", "action-item"), " ").concat($.is("disabled", n.controller.isLoading.value)),
          onClick: r,
          children: o.value ? c(ii, {}) : c(ni, {})
        }), n.controller.isLoading.value ? c("div", {
          title: "停止生成",
          className: "".concat($.be("action-wrapper", "action-item")),
          onClick: l,
          children: c(ui, {})
        }) : c("div", {
          title: "发送消息",
          className: "".concat($.be("action-wrapper", "action-item"), " ").concat($.is("disabled", h.value)),
          onClick: p,
          children: c(Xn, {})
        })]
      })]
    })]
  });
};
const R = new M("chat-topic-item"), es = (n) => {
  const {
    controller: e,
    topic: t,
    onClick: i,
    onAction: s
  } = n, o = P(null), a = B(() => {
    var m;
    return ((m = e.activedTopic.value) == null ? void 0 : m.id) === t.id;
  }), [r, u] = K(!1), h = I(!1), p = (f) => {
    f.stopPropagation(), s("LINK", f);
  }, l = (f, m) => {
    f === "DELETE" ? s("DELETE", m) : f === "RENAME" && (h.value = !0, setTimeout(() => {
      var w;
      (w = o.current) == null || w.focus();
    }, 100)), u(!1);
  }, v = (f) => {
    var m;
    f.stopPropagation(), t.data.caption = (m = f.target) == null ? void 0 : m.value;
  }, _ = (f) => {
    f.stopPropagation(), h.value = !1, s("RENAME", f);
  }, d = (f) => {
    f.stopPropagation(), f.key === "Enter" && (h.value = !1);
  };
  return c("div", {
    className: "".concat(R.b(), " ").concat(R.is("active", a.value), " ").concat(R.is("edit", h.value)),
    onClick: i.bind(void 0),
    children: [c("div", {
      className: R.e("caption"),
      title: t.caption,
      children: h.value ? c("input", {
        ref: o,
        value: t.caption,
        onBlur: _,
        onKeyDown: d,
        onClick: (f) => f.stopPropagation(),
        onChange: (f) => v(f),
        className: R.em("caption", "editor")
      }) : c("span", {
        className: R.em("caption", "text"),
        children: t.caption
      })
    }), !h.value && c("div", {
      className: R.e("icon"),
      children: [c("span", {
        title: "跳转主视图",
        className: R.em("icon", "item"),
        onClick: p.bind(void 0),
        children: c(oi, {
          className: R.b("link-icon")
        })
      }), a.value ? null : c(xn, {
        actions: [{
          id: "RENAME",
          caption: "重命名",
          icon: c(fi, {})
        }, {
          id: "DELETE",
          caption: "删除话题",
          icon: c(_n, {})
        }],
        position: "bottom",
        isOpen: r,
        onToggleOpen: u,
        onAction: l.bind(void 0),
        children: c("span", {
          className: R.em("icon", "item"),
          title: "更多",
          children: c(si, {
            className: R.e("more-icon")
          })
        })
      })]
    })]
  });
};
const xe = new M("chat-search"), ts = (n) => {
  const {
    className: e,
    value: t,
    placeholder: i,
    onChange: s
  } = n, [o, a] = K(!1), r = (u) => {
    var h;
    u.stopPropagation(), s == null || s((h = u.target) == null ? void 0 : h.value);
  };
  return c("div", {
    className: "".concat(xe.b(), " ").concat(xe.is("focus", o), " ").concat(e || ""),
    children: [c("div", {
      className: xe.e("prefix"),
      children: c(mi, {})
    }), c("input", {
      value: t,
      className: xe.e("inner"),
      placeholder: i,
      onFocus: () => a(!0),
      onBlur: () => a(!1),
      onChange: (u) => r(u)
    })]
  });
};
const se = new M("chat-topics"), ns = (n) => {
  const e = P(null), t = I(void 0), i = I([]);
  D(() => {
    i.value = n.controller.topics.value.filter((r) => {
      var u, h;
      return (h = r.caption) == null ? void 0 : h.toLowerCase().includes(((u = t.value) == null ? void 0 : u.trim().toLowerCase()) || "");
    });
  }, [n.controller.topics.value]);
  const s = (r) => {
    n.controller.handleTopicChange(r);
  }, o = (r, u, h) => {
    n.controller.handleTopicAction(r, u, h);
  }, a = (r) => {
    t.value = r, i.value = n.controller.topics.value.filter((u) => {
      var h, p;
      return (p = u.caption) == null ? void 0 : p.toLowerCase().includes(((h = t.value) == null ? void 0 : h.trim().toLowerCase()) || "");
    });
  };
  return D(() => {
    const r = e.current;
    if (!r)
      return;
    const u = r.querySelector(".ibiz-chat-topic-item.is-active");
    u == null || u.scrollIntoView({
      behavior: "smooth",
      block: "nearest"
    });
  }, [n.controller.activedTopic.value]), c("div", {
    className: se.b(),
    children: [c("div", {
      className: se.e("header"),
      children: c(ts, {
        value: t.value,
        placeholder: "搜索话题",
        onChange: a.bind(void 0)
      })
    }), c("div", {
      ref: e,
      className: se.e("main"),
      children: i.value && i.value.length > 0 ? i.value.map((r) => c(es, {
        topic: r,
        controller: n.controller,
        onClick: () => s(r),
        onAction: (u, h) => o(u, r, h)
      }, r.id)) : c("div", {
        className: se.e("empty"),
        children: "暂无话题"
      })
    }), c("div", {
      className: se.e("footer"),
      children: c("div", {
        title: "清空会话",
        className: se.e("action"),
        onClick: () => n.controller.clearTopic(),
        children: [c(_n, {}), c("span", {
          children: "清空会话"
        })]
      })
    })]
  });
};
const oe = new M("chat-minimize"), is = (n) => {
  const e = P(null), [t, i] = K(""), [s, o] = K(0), a = P(!1), r = {
    x: (window.innerWidth - 86) / window.innerWidth,
    y: (window.innerHeight - 86) / window.innerHeight
  }, u = B(() => {
    const d = n.controller.messages.value[n.controller.messages.value.length - 1];
    return d ? d.role === "ASSISTANT" && d.state === 20 && d.completed !== !0 : !1;
  }), h = (d) => {
    const f = d.indexOf("<think>"), m = d.indexOf("</think>");
    let w = "", g = "";
    return m === -1 ? (w = d.slice(f + 7), g = "") : (w = d.slice(f + 7, m), g = d.slice(m + 8)), {
      thoughtContent: w,
      answerContent: g
    };
  }, p = B(() => {
    let d = "";
    if (!u.value)
      return i(""), o(0), d;
    const f = n.controller.messages.value[n.controller.messages.value.length - 1];
    if (d = f.content, f.content.indexOf("<think>") !== -1) {
      const {
        thoughtContent: m,
        answerContent: w
      } = h(f.content);
      d = m + w;
    }
    return d;
  }), l = () => {
    Object.assign(e.current.style, {
      left: "".concat(r.x * 100, "%"),
      top: "".concat(r.y * 100, "%")
    }), localStorage.setItem(E.MINIMIZE_STYLY_CHCHE, JSON.stringify(r));
  }, v = () => {
    const d = e.current;
    d && (d.onmousedown = (f) => {
      document.body.style.userSelect = "none";
      const m = f.clientX - d.offsetLeft, w = f.clientY - d.offsetTop, g = Date.now(), T = (S) => {
        const O = 56 / window.innerWidth, L = 56 / window.innerHeight, {
          x: U,
          y: z
        } = on(S.clientX - m, S.clientY - w, O, L);
        Object.assign(r, {
          x: U,
          y: z
        }), requestAnimationFrame(() => {
          l();
        });
      }, C = () => {
        const S = Date.now();
        a.current = S - g > 300, document.body.style.userSelect = "", document.removeEventListener("mousemove", T), document.removeEventListener("mouseup", C);
      };
      document.addEventListener("mousemove", T), document.addEventListener("mouseup", C);
    });
  }, _ = () => {
    a.current || n.onClick();
  };
  return D(() => {
    const d = localStorage.getItem(E.MINIMIZE_STYLY_CHCHE);
    if (d) {
      const f = JSON.parse(d);
      Je(f) && Object.assign(r, f);
    }
    l(), v();
  }, []), D(() => {
    if (s < p.value.length) {
      const d = setTimeout(() => {
        i((f) => f + p.value[s]), o((f) => f + 1);
      }, 100);
      return () => clearTimeout(d);
    }
  }, [s, p.value]), c("div", {
    ref: e,
    title: n.title,
    className: "".concat(oe.b(), " ").concat(oe.is("hidden", !n.isMinimize), " ").concat(oe.is("show-halo", u.value)),
    onClick: _,
    children: c("div", {
      className: "".concat(oe.e("content"), " ").concat(oe.is("show-border", !u.value)),
      children: [t && c("div", {
        className: "".concat(oe.em("content", "popover")),
        children: c("div", {
          className: "typewriter",
          children: t
        })
      }), c(ei, {})]
    })
  });
};
const rt = In({
  zIndex: 10,
  enableBackFill: !0,
  newTopic: () => {
  }
});
var Rt, Ft, Ut, Wt;
class Pt extends F {
  constructor(t) {
    super(t);
    x(this, "ns", new M("chat-container"));
    x(this, "containerRef", lt());
    x(this, "dragHandle", lt());
    /**
     * 窗口样式数据
     *
     * @memberof ChatContainer
     */
    x(this, "data", {
      side: {
        y: 0,
        height: 1,
        width: 750 / window.innerWidth,
        x: (window.innerWidth - 750) / window.innerWidth
      },
      window: {
        y: 0,
        width: 750 / window.innerWidth,
        height: 750 / window.innerHeight,
        x: (window.innerWidth - 750) / window.innerWidth
      },
      minWidth: 500,
      minHeight: 300,
      showMode: "side"
    });
    /**
     * 是否禁止拖动
     * - 拖拽边时应禁止拖动
     * @type {boolean}
     * @memberof ChatContainer
     */
    x(this, "disabled", !1);
    /**
     * 最小化是否在拖拽中
     * - 在拖拽时不应触发点击事件
     * @type {boolean}
     * @memberof ChatContainer
     */
    x(this, "isDragging", !1);
    /**
     * 容器上下文
     *
     * @author tony001
     * @date 2025-03-03 16:03:44
     * @type {ContainerContext}
     */
    x(this, "containerContext", {
      zIndex: ((Rt = this.props.containerOptions) == null ? void 0 : Rt.zIndex) || 10,
      enableBackFill: ((Ft = this.props) == null ? void 0 : Ft.enableBackFill) !== void 0 && ((Ut = this.props) == null ? void 0 : Ut.enableBackFill) !== null ? (Wt = this.props) == null ? void 0 : Wt.enableBackFill : !0,
      newTopic: () => {
        this.props.aiTopic.newTopic();
      }
    });
    this.state = {
      isFullScreen: !1,
      isMinimize: !1
    };
  }
  /**
   * 计算AI窗口样式
   *
   * @return {*}
   * @memberof ChatContainer
   */
  calcWindowStyle() {
    var i, s;
    const t = this.data.showMode === "window" ? this.data.window : this.data.side;
    return {
      left: "".concat(t.x * 100, "%"),
      top: "".concat(t.y * 100, "%"),
      width: "".concat(t.width * 100, "%"),
      height: "".concat(t.height * 100, "%"),
      minWidth: "".concat(this.data.minWidth, "px"),
      minHeight: "".concat(this.data.minHeight, "px"),
      "z-index": ((s = (i = this.props.containerOptions) == null ? void 0 : i.zIndex) == null ? void 0 : s.toString()) || "10"
    };
  }
  /**
   * 计算靠边模式样式
   *
   * @param {('left' | 'right')} side
   * @memberof ChatContainer
   */
  calcSideModeStyle(t) {
    Object.assign(this.data, {
      side: {
        y: 0,
        x: t === "left" ? 0 : (window.innerWidth - 750) / window.innerWidth,
        height: 1,
        width: 750 / window.innerWidth
      },
      showMode: "side"
    });
  }
  /**
   * 设置样式
   *
   * @memberof ChatContainer
   */
  setStyle() {
    Object.assign(this.containerRef.current.style, this.calcWindowStyle()), localStorage.setItem(E.STYLE_CACHE, JSON.stringify(this.data));
  }
  /**
   * 吸附边缘（窗口模式）
   * - 靠近窗口上下边缘(20px) - 自动吸附
   * - 靠近窗口左右边缘(20px) - 靠边模式
   * @memberof ChatContainer
   */
  snapToEdge() {
    const t = 20 / window.innerWidth, i = 20 / window.innerHeight, {
      x: s,
      y: o,
      width: a,
      height: r
    } = this.data.window;
    s < t || s + a > 1 - t ? this.calcSideModeStyle(s < t ? "left" : "right") : (o < i && (this.data.window.y = 0), o + r > 1 - i && (this.data.window.y = 1 - r)), this.setStyle();
  }
  /**
   * 注册对话框拖拽
   *
   * @memberof ChatContainer
   */
  registerDragDialog() {
    this.dragHandle.current.onmousedown = (t) => {
      if (this.state.isFullScreen)
        return;
      document.body.style.userSelect = "none";
      const i = t.clientX - this.containerRef.current.offsetLeft, s = t.clientY - this.containerRef.current.offsetTop, o = (r) => {
        if (this.disabled)
          return;
        this.data.showMode = "window";
        const {
          x: u,
          y: h
        } = on(r.clientX - i, r.clientY - s, this.data.window.width, this.data.window.height);
        Object.assign(this.data.window, {
          x: u,
          y: h
        }), this.setStyle();
      }, a = () => {
        document.body.style.userSelect = "", document.removeEventListener("mousemove", o), document.removeEventListener("mouseup", a), !this.disabled && this.snapToEdge();
      };
      document.addEventListener("mousemove", o), document.addEventListener("mouseup", a);
    };
  }
  /**
   * 注册对话框边界拖拽
   *
   * @memberof ChatContainer
   */
  registerDragDialogBorder() {
    Pe(this.containerRef.current).resizable({
      // 可拖拽的边缘
      edges: {
        top: !0,
        right: !0,
        bottom: !0,
        left: !0
      },
      margin: 6,
      modifiers: [
        // 保持在父对象内部
        Pe.modifiers.restrictEdges({
          outer: document.body
        }),
        // 缩放最小宽度
        Pe.modifiers.restrictSize({
          min: {
            width: this.data.minWidth,
            height: this.data.minHeight
          }
        })
      ],
      inertia: !0,
      listeners: {
        move: (t) => {
          if (this.state.isFullScreen)
            return;
          const i = this.data.showMode === "side" ? this.data.side : this.data.window;
          i.x = t.rect.left / window.innerWidth, i.y = t.rect.top / window.innerHeight, i.width = t.rect.width / window.innerWidth, i.height = t.rect.height / window.innerHeight, this.setStyle();
        },
        start: () => {
          this.disabled = !0, document.body.style.userSelect = "none";
        },
        end: () => {
          this.disabled = !1, document.body.style.userSelect = "";
        }
      }
    });
  }
  /**
   * 处理全屏改变
   *
   * @memberof ChatContainer
   */
  handleFullScreenChange() {
    this.setState({
      isFullScreen: document.fullscreenElement !== null
    });
  }
  componentDidMount() {
    this.handleFullScreenChange = this.handleFullScreenChange.bind(this);
    const t = localStorage.getItem(E.STYLE_CACHE);
    if (t) {
      const i = JSON.parse(t);
      i.side && Je(i.side) && i.window && Je(i.window) && Object.assign(this.data, i);
    }
    this.setStyle(), this.registerDragDialog(), this.registerDragDialogBorder(), document.addEventListener("fullscreenchange", this.handleFullScreenChange);
  }
  componentWillUnmount() {
    document.removeEventListener("fullscreenchange", this.handleFullScreenChange);
  }
  /**
   * 关闭聊天窗口
   *
   * @author chitanda
   * @date 2023-10-15 19:10:31
   */
  close() {
    this.props.close();
  }
  /**
   * 全屏
   *
   * @author ljx
   * @date 2024-05-07 15:10:31
   */
  fullScreen() {
    const t = this.containerRef.current;
    t && (t.requestFullscreen(), this.props.fullscreen(!0));
  }
  /**
   * 关闭全屏
   *
   * @author ljx
   * @date 2024-05-07 15:10:31
   */
  closeFullScreen() {
    this.state.isFullScreen && (document == null || document.exitFullscreen(), this.props.fullscreen(!1), this.setStyle());
  }
  /**
   * 最小化
   *
   * @memberof ChatContainer
   */
  minimize() {
    this.closeFullScreen(), this.setState({
      isMinimize: !0
    }), this.props.minimize(!0);
  }
  /**
   * 退出最小化
   *
   * @memberof ChatContainer
   */
  exitMinimize() {
    this.setState({
      isMinimize: !1
    }), this.props.minimize(!1);
  }
  /**
   * 阻止冒泡
   * - 防止点击头部行为时误触发拖动监听
   * @param {MouseEvent} evt
   * @memberof ChatContainer
   */
  stopPropagation(t) {
    t.stopPropagation();
  }
  render() {
    return c(rt.Provider, {
      value: this.containerContext,
      children: c("div", {
        className: "".concat(this.ns.b()),
        children: [c("div", {
          className: "".concat(this.ns.e("dialog"), " ").concat(this.ns.is("full-screen", this.state.isFullScreen), " ").concat(this.ns.is("hidden", this.state.isMinimize)),
          ref: this.containerRef,
          children: [c("div", {
            ref: this.dragHandle,
            className: this.ns.b("header"),
            children: [c("div", {
              className: this.ns.b("header-caption"),
              children: this.props.caption || "AI助手"
            }), c("div", {
              className: this.ns.b("header-action-wrapper"),
              children: [c("div", {
                title: "最小化",
                className: "".concat(this.ns.be("header-action-wrapper", "action-item"), " ").concat(this.ns.be("header-action-wrapper", "minimize")),
                onMouseDown: this.stopPropagation.bind(this),
                onClick: this.minimize.bind(this),
                children: c(Qn, {})
              }), this.state.isFullScreen ? c("div", {
                title: "退出全屏",
                className: "".concat(this.ns.be("header-action-wrapper", "action-item"), " ").concat(this.ns.be("header-action-wrapper", "close-full-screen")),
                onMouseDown: this.stopPropagation.bind(this),
                onClick: this.closeFullScreen.bind(this),
                children: c(Kn, {})
              }) : c("div", {
                title: "全屏",
                className: "".concat(this.ns.be("header-action-wrapper", "action-item"), " ").concat(this.ns.be("header-action-wrapper", "full-screen")),
                onMouseDown: this.stopPropagation.bind(this),
                onClick: this.fullScreen.bind(this),
                children: c(Jn, {})
              }), c("div", {
                title: "关闭",
                className: "".concat(this.ns.be("header-action-wrapper", "action-item"), " ").concat(this.ns.be("header-action-wrapper", "action-close")),
                onMouseDown: this.stopPropagation.bind(this),
                onClick: this.close.bind(this),
                children: c(jn, {})
              })]
            })]
          }), this.props.mode === "TOPIC" ? c("div", {
            className: "".concat(this.ns.b("main")),
            children: [c("div", {
              className: "".concat(this.ns.be("main", "left")),
              children: c(ns, {
                controller: this.props.aiTopic
              })
            }), c("div", {
              className: "".concat(this.ns.be("main", "right")),
              children: [c("div", {
                className: this.ns.b("content"),
                children: c(xt, {
                  controller: this.props.aiChat,
                  toolbarItems: this.props.contentToolbarItems
                })
              }), c(et, {
                type: "footer",
                mode: this.props.mode,
                data: this.props.aiTopic.activedTopic.value,
                className: "".concat(this.ns.e("toolbar"), " ").concat(this.ns.is("has-materials", this.props.aiChat.materials.value.length > 0)),
                controller: this.props.aiChat,
                items: this.props.footerToolbarItems
              }), c("div", {
                className: this.ns.b("footer"),
                children: c(Bt, {
                  controller: this.props.aiChat,
                  questionToolbarItems: this.props.questionToolbarItems
                })
              })]
            })]
          }) : c("div", {
            className: "".concat(this.ns.be("main", "default")),
            children: [c("div", {
              className: this.ns.b("content"),
              children: c(xt, {
                controller: this.props.aiChat,
                toolbarItems: this.props.contentToolbarItems
              })
            }), c(et, {
              type: "footer",
              mode: this.props.mode,
              data: this.props.aiTopic.activedTopic.value,
              className: "".concat(this.ns.e("toolbar"), " ").concat(this.ns.is("has-materials", this.props.aiChat.materials.value.length > 0)),
              controller: this.props.aiChat,
              items: this.props.footerToolbarItems
            }), c("div", {
              className: this.ns.b("footer"),
              children: c(Bt, {
                controller: this.props.aiChat,
                questionToolbarItems: this.props.questionToolbarItems
              })
            })]
          })]
        }), c(is, {
          title: this.props.caption || "AI助手",
          controller: this.props.aiChat,
          isMinimize: this.state.isMinimize,
          onClick: this.exitMinimize.bind(this)
        })]
      })
    });
  }
}
export {
  Pt as ChatContainer,
  rs as chat
};
