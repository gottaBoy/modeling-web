import './style.css';
var Ef = Object.defineProperty;
var Af = (n, e, t) => e in n ? Ef(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var _ = (n, e, t) => (Af(n, typeof e != "symbol" ? e + "" : e, t), t);
import Nr from "interactjs";
import so from "cherry-markdown";
import { isUndefined as If, cloneDeep as Fc } from "lodash-es";
import { QXEvent as Of } from "qx-util";
var ci = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, _n = function(n) {
  return n && n.Math === Math && n;
}, Ue = (
  // eslint-disable-next-line es/no-global-this -- safe
  _n(typeof globalThis == "object" && globalThis) || _n(typeof window == "object" && window) || // eslint-disable-next-line no-restricted-globals -- safe
  _n(typeof self == "object" && self) || _n(typeof ci == "object" && ci) || _n(typeof ci == "object" && ci) || // eslint-disable-next-line no-new-func -- fallback
  function() {
    return this;
  }() || Function("return this")()
), oo = {}, Tt = function(n) {
  try {
    return !!n();
  } catch (e) {
    return !0;
  }
}, Df = Tt, Mt = !Df(function() {
  return Object.defineProperty({}, 1, { get: function() {
    return 7;
  } })[1] !== 7;
}), $f = Tt, ao = !$f(function() {
  var n = (function() {
  }).bind();
  return typeof n != "function" || n.hasOwnProperty("prototype");
}), Rf = ao, ui = Function.prototype.call, lo = Rf ? ui.bind(ui) : function() {
  return ui.apply(ui, arguments);
}, Vc = {}, Hc = {}.propertyIsEnumerable, jc = Object.getOwnPropertyDescriptor, Pf = jc && !Hc.call({ 1: 2 }, 1);
Vc.f = Pf ? function(e) {
  var t = jc(this, e);
  return !!t && t.enumerable;
} : Hc;
var Wc = function(n, e) {
  return {
    enumerable: !(n & 1),
    configurable: !(n & 2),
    writable: !(n & 4),
    value: e
  };
}, Uc = ao, qc = Function.prototype, ws = qc.call, Lf = Uc && qc.bind.bind(ws, ws), Xe = Uc ? Lf : function(n) {
  return function() {
    return ws.apply(n, arguments);
  };
}, Kc = Xe, zf = Kc({}.toString), Bf = Kc("".slice), Jc = function(n) {
  return Bf(zf(n), 8, -1);
}, Ff = Xe, Vf = Tt, Hf = Jc, Er = Object, jf = Ff("".split), Gc = Vf(function() {
  return !Er("z").propertyIsEnumerable(0);
}) ? function(n) {
  return Hf(n) === "String" ? jf(n, "") : Er(n);
} : Er, Xc = function(n) {
  return n == null;
}, Wf = Xc, Uf = TypeError, Yc = function(n) {
  if (Wf(n))
    throw new Uf("Can't call method on " + n);
  return n;
}, qf = Gc, Kf = Yc, ar = function(n) {
  return qf(Kf(n));
}, Ar = typeof document == "object" && document.all, nt = typeof Ar > "u" && Ar !== void 0 ? function(n) {
  return typeof n == "function" || n === Ar;
} : function(n) {
  return typeof n == "function";
}, Jf = nt, Qn = function(n) {
  return typeof n == "object" ? n !== null : Jf(n);
}, Ir = Ue, Gf = nt, Xf = function(n) {
  return Gf(n) ? n : void 0;
}, co = function(n, e) {
  return arguments.length < 2 ? Xf(Ir[n]) : Ir[n] && Ir[n][e];
}, Yf = Xe, Zf = Yf({}.isPrototypeOf), Qf = Ue, aa = Qf.navigator, la = aa && aa.userAgent, ep = la ? String(la) : "", Zc = Ue, Or = ep, ca = Zc.process, ua = Zc.Deno, da = ca && ca.versions || ua && ua.version, ha = da && da.v8, Ke, zi;
ha && (Ke = ha.split("."), zi = Ke[0] > 0 && Ke[0] < 4 ? 1 : +(Ke[0] + Ke[1]));
!zi && Or && (Ke = Or.match(/Edge\/(\d+)/), (!Ke || Ke[1] >= 74) && (Ke = Or.match(/Chrome\/(\d+)/), Ke && (zi = +Ke[1])));
var tp = zi, fa = tp, np = Tt, ip = Ue, rp = ip.String, Qc = !!Object.getOwnPropertySymbols && !np(function() {
  var n = Symbol("symbol detection");
  return !rp(n) || !(Object(n) instanceof Symbol) || // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
  !Symbol.sham && fa && fa < 41;
}), sp = Qc, eu = sp && !Symbol.sham && typeof Symbol.iterator == "symbol", op = co, ap = nt, lp = Zf, cp = eu, up = Object, tu = cp ? function(n) {
  return typeof n == "symbol";
} : function(n) {
  var e = op("Symbol");
  return ap(e) && lp(e.prototype, up(n));
}, dp = String, hp = function(n) {
  try {
    return dp(n);
  } catch (e) {
    return "Object";
  }
}, fp = nt, pp = hp, mp = TypeError, nu = function(n) {
  if (fp(n))
    return n;
  throw new mp(pp(n) + " is not a function");
}, gp = nu, vp = Xc, yp = function(n, e) {
  var t = n[e];
  return vp(t) ? void 0 : gp(t);
}, Dr = lo, $r = nt, Rr = Qn, bp = TypeError, wp = function(n, e) {
  var t, i;
  if (e === "string" && $r(t = n.toString) && !Rr(i = Dr(t, n)) || $r(t = n.valueOf) && !Rr(i = Dr(t, n)) || e !== "string" && $r(t = n.toString) && !Rr(i = Dr(t, n)))
    return i;
  throw new bp("Can't convert object to primitive value");
}, iu = { exports: {} }, pa = Ue, Cp = Object.defineProperty, uo = function(n, e) {
  try {
    Cp(pa, n, { value: e, configurable: !0, writable: !0 });
  } catch (t) {
    pa[n] = e;
  }
  return e;
}, kp = Ue, xp = uo, ma = "__core-js_shared__", ga = iu.exports = kp[ma] || xp(ma, {});
(ga.versions || (ga.versions = [])).push({
  version: "3.49.0",
  mode: "global",
  copyright: "© 2013–2025 Denis Pushkarev (zloirock.ru), 2025–2026 CoreJS Company (core-js.io). All rights reserved.",
  license: "https://github.com/zloirock/core-js/blob/v3.49.0/LICENSE",
  source: "https://github.com/zloirock/core-js"
});
var ho = iu.exports, va = ho, ru = function(n, e) {
  return va[n] || (va[n] = e || {});
}, Sp = Yc, Tp = Object, su = function(n) {
  return Tp(Sp(n));
}, Mp = Xe, _p = su, Np = Mp({}.hasOwnProperty), Kt = Object.hasOwn || function(e, t) {
  return Np(_p(e), t);
}, Ep = Xe, Ap = 0, Ip = Math.random(), Op = Ep(1.1.toString), ou = function(n) {
  return "Symbol(" + (n === void 0 ? "" : n) + ")_" + Op(++Ap + Ip, 36);
}, Dp = Ue, $p = ru, ya = Kt, Rp = ou, Pp = Qc, Lp = eu, ln = Dp.Symbol, Pr = $p("wks"), zp = Lp ? ln.for || ln : ln && ln.withoutSetter || Rp, au = function(n) {
  return ya(Pr, n) || (Pr[n] = Pp && ya(ln, n) ? ln[n] : zp("Symbol." + n)), Pr[n];
}, Bp = lo, ba = Qn, wa = tu, Fp = yp, Vp = wp, Hp = au, jp = TypeError, Wp = Hp("toPrimitive"), Up = function(n, e) {
  if (!ba(n) || wa(n))
    return n;
  var t = Fp(n, Wp), i;
  if (t) {
    if (e === void 0 && (e = "default"), i = Bp(t, n, e), !ba(i) || wa(i))
      return i;
    throw new jp("Can't convert object to primitive value");
  }
  return e === void 0 && (e = "number"), Vp(n, e);
}, qp = Up, Kp = tu, lu = function(n) {
  var e = qp(n, "string");
  return Kp(e) ? e : e + "";
}, Jp = Ue, Ca = Qn, Cs = Jp.document, Gp = Ca(Cs) && Ca(Cs.createElement), cu = function(n) {
  return Gp ? Cs.createElement(n) : {};
}, Xp = Mt, Yp = Tt, Zp = cu, uu = !Xp && !Yp(function() {
  return Object.defineProperty(Zp("div"), "a", {
    get: function() {
      return 7;
    }
  }).a !== 7;
}), Qp = Mt, em = lo, tm = Vc, nm = Wc, im = ar, rm = lu, sm = Kt, om = uu, ka = Object.getOwnPropertyDescriptor;
oo.f = Qp ? ka : function(e, t) {
  if (e = im(e), t = rm(t), om)
    try {
      return ka(e, t);
    } catch (i) {
    }
  if (sm(e, t))
    return nm(!em(tm.f, e, t), e[t]);
};
var kn = {}, am = Mt, lm = Tt, du = am && lm(function() {
  return Object.defineProperty(function() {
  }, "prototype", {
    value: 42,
    writable: !1
  }).prototype !== 42;
}), cm = Qn, um = String, dm = TypeError, lr = function(n) {
  if (cm(n))
    return n;
  throw new dm(um(n) + " is not an object");
}, hm = Mt, fm = uu, pm = du, di = lr, xa = lu, mm = TypeError, Lr = Object.defineProperty, gm = Object.getOwnPropertyDescriptor, zr = "enumerable", Br = "configurable", Fr = "writable";
kn.f = hm ? pm ? function(e, t, i) {
  if (di(e), t = xa(t), di(i), typeof e == "function" && t === "prototype" && "value" in i && Fr in i && !i[Fr]) {
    var r = gm(e, t);
    r && r[Fr] && (e[t] = i.value, i = {
      configurable: Br in i ? i[Br] : r[Br],
      enumerable: zr in i ? i[zr] : r[zr],
      writable: !1
    });
  }
  return Lr(e, t, i);
} : Lr : function(e, t, i) {
  if (di(e), t = xa(t), di(i), fm)
    try {
      return Lr(e, t, i);
    } catch (r) {
    }
  if ("get" in i || "set" in i)
    throw new mm("Accessors not supported");
  return "value" in i && (e[t] = i.value), e;
};
var vm = Mt, ym = kn, bm = Wc, hu = vm ? function(n, e, t) {
  return ym.f(n, e, bm(1, t));
} : function(n, e, t) {
  return n[e] = t, n;
}, fu = { exports: {} }, ks = Mt, wm = Kt, pu = Function.prototype, Cm = ks && Object.getOwnPropertyDescriptor, fo = wm(pu, "name"), km = fo && (function() {
}).name === "something", xm = fo && (!ks || ks && Cm(pu, "name").configurable), Sm = {
  EXISTS: fo,
  PROPER: km,
  CONFIGURABLE: xm
}, Tm = Xe, Mm = nt, xs = ho, _m = Tm(Function.toString);
Mm(xs.inspectSource) || (xs.inspectSource = function(n) {
  return _m(n);
});
var Nm = xs.inspectSource, Em = Ue, Am = nt, Sa = Em.WeakMap, Im = Am(Sa) && /native code/.test(String(Sa)), Om = ru, Dm = ou, Ta = Om("keys"), mu = function(n) {
  return Ta[n] || (Ta[n] = Dm(n));
}, po = {}, $m = Im, gu = Ue, Rm = Qn, Pm = hu, Vr = Kt, Hr = ho, Lm = mu, zm = po, Ma = "Object already initialized", Ss = gu.TypeError, Bm = gu.WeakMap, Bi, Bn, Fi, Fm = function(n) {
  return Fi(n) ? Bn(n) : Bi(n, {});
}, Vm = function(n) {
  return function(e) {
    var t;
    if (!Rm(e) || (t = Bn(e)).type !== n)
      throw new Ss("Incompatible receiver, " + n + " required");
    return t;
  };
};
if ($m || Hr.state) {
  var Ye = Hr.state || (Hr.state = new Bm());
  Ye.get = Ye.get, Ye.has = Ye.has, Ye.set = Ye.set, Bi = function(n, e) {
    if (Ye.has(n))
      throw new Ss(Ma);
    return e.facade = n, Ye.set(n, e), e;
  }, Bn = function(n) {
    return Ye.get(n) || {};
  }, Fi = function(n) {
    return Ye.has(n);
  };
} else {
  var Yt = Lm("state");
  zm[Yt] = !0, Bi = function(n, e) {
    if (Vr(n, Yt))
      throw new Ss(Ma);
    return e.facade = n, Pm(n, Yt, e), e;
  }, Bn = function(n) {
    return Vr(n, Yt) ? n[Yt] : {};
  }, Fi = function(n) {
    return Vr(n, Yt);
  };
}
var Hm = {
  set: Bi,
  get: Bn,
  has: Fi,
  enforce: Fm,
  getterFor: Vm
}, mo = Xe, jm = Tt, Wm = nt, hi = Kt, Ts = Mt, Um = Sm.CONFIGURABLE, qm = Nm, vu = Hm, Km = vu.enforce, Jm = vu.get, _a = String, Ai = Object.defineProperty, Gm = mo("".slice), Xm = mo("".replace), Ym = mo([].join), Zm = Ts && !jm(function() {
  return Ai(function() {
  }, "length", { value: 8 }).length !== 8;
}), Qm = String(String).split("String"), e1 = fu.exports = function(n, e, t) {
  Gm(_a(e), 0, 7) === "Symbol(" && (e = "[" + Xm(_a(e), /^Symbol\(([^)]*)\).*$/, "$1") + "]"), t && t.getter && (e = "get " + e), t && t.setter && (e = "set " + e), (!hi(n, "name") || Um && n.name !== e) && (Ts ? Ai(n, "name", { value: e, configurable: !0 }) : n.name = e), Zm && t && hi(t, "arity") && n.length !== t.arity && Ai(n, "length", { value: t.arity });
  try {
    t && hi(t, "constructor") && t.constructor ? Ts && Ai(n, "prototype", { writable: !1 }) : n.prototype && (n.prototype = void 0);
  } catch (r) {
  }
  var i = Km(n);
  return hi(i, "source") || (i.source = Ym(Qm, typeof e == "string" ? e : "")), n;
};
Function.prototype.toString = e1(function() {
  return Wm(this) && Jm(this).source || qm(this);
}, "toString");
var t1 = fu.exports, n1 = nt, i1 = kn, r1 = t1, s1 = uo, o1 = function(n, e, t, i) {
  i || (i = {});
  var r = i.enumerable, s = i.name !== void 0 ? i.name : e;
  if (n1(t) && r1(t, s, i), i.global)
    r ? n[e] = t : s1(e, t);
  else {
    try {
      i.unsafe ? n[e] && (r = !0) : delete n[e];
    } catch (o) {
    }
    r ? n[e] = t : i1.f(n, e, {
      value: t,
      enumerable: !1,
      configurable: !i.nonConfigurable,
      writable: !i.nonWritable
    });
  }
  return n;
}, yu = {}, a1 = Math.ceil, l1 = Math.floor, c1 = Math.trunc || function(e) {
  var t = +e;
  return (t > 0 ? l1 : a1)(t);
}, u1 = c1, bu = function(n) {
  var e = +n;
  return e !== e || e === 0 ? 0 : u1(e);
}, d1 = bu, h1 = Math.max, f1 = Math.min, p1 = function(n, e) {
  var t = d1(n);
  return t < 0 ? h1(t + e, 0) : f1(t, e);
}, m1 = bu, g1 = Math.min, v1 = function(n) {
  var e = m1(n);
  return e > 0 ? g1(e, 9007199254740991) : 0;
}, y1 = v1, wu = function(n) {
  return y1(n.length);
}, b1 = ar, w1 = p1, C1 = wu, Na = function(n) {
  return function(e, t, i) {
    var r = b1(e), s = C1(r);
    if (s === 0)
      return !n && -1;
    var o = w1(i, s), a;
    if (n && t !== t) {
      for (; s > o; )
        if (a = r[o++], a !== a)
          return !0;
    } else
      for (; s > o; o++)
        if ((n || o in r) && r[o] === t)
          return n || o || 0;
    return !n && -1;
  };
}, k1 = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: Na(!0),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: Na(!1)
}, x1 = Xe, jr = Kt, S1 = ar, T1 = k1.indexOf, M1 = po, Ea = x1([].push), Cu = function(n, e) {
  var t = S1(n), i = 0, r = [], s;
  for (s in t)
    !jr(M1, s) && jr(t, s) && Ea(r, s);
  for (; e.length > i; )
    jr(t, s = e[i++]) && (~T1(r, s) || Ea(r, s));
  return r;
}, go = [
  "constructor",
  "hasOwnProperty",
  "isPrototypeOf",
  "propertyIsEnumerable",
  "toLocaleString",
  "toString",
  "valueOf"
], _1 = Cu, N1 = go, E1 = N1.concat("length", "prototype");
yu.f = Object.getOwnPropertyNames || function(e) {
  return _1(e, E1);
};
var ku = {};
ku.f = Object.getOwnPropertySymbols;
var A1 = co, I1 = Xe, O1 = yu, D1 = ku, $1 = lr, R1 = I1([].concat), P1 = A1("Reflect", "ownKeys") || function(e) {
  var t = O1.f($1(e)), i = D1.f;
  return i ? R1(t, i(e)) : t;
}, Aa = Kt, L1 = P1, z1 = oo, B1 = kn, F1 = function(n, e, t) {
  for (var i = L1(e), r = B1.f, s = z1.f, o = 0; o < i.length; o++) {
    var a = i[o];
    !Aa(n, a) && !(t && Aa(t, a)) && r(n, a, s(e, a));
  }
}, V1 = Tt, H1 = nt, j1 = /#|\.prototype\./, ei = function(n, e) {
  var t = U1[W1(n)];
  return t === K1 ? !0 : t === q1 ? !1 : H1(e) ? V1(e) : !!e;
}, W1 = ei.normalize = function(n) {
  return String(n).replace(j1, ".").toLowerCase();
}, U1 = ei.data = {}, q1 = ei.NATIVE = "N", K1 = ei.POLYFILL = "P", J1 = ei, fi = Ue, G1 = oo.f, X1 = hu, Y1 = o1, Z1 = uo, Q1 = F1, e0 = J1, t0 = function(n, e) {
  var t = n.target, i = n.global, r = n.stat, s, o, a, l, c, u;
  if (i ? o = fi : r ? o = fi[t] || Z1(t, {}) : o = fi[t] && fi[t].prototype, o)
    for (a in e) {
      if (c = e[a], n.dontCallGetSet ? (u = G1(o, a), l = u && u.value) : l = o[a], s = e0(i ? a : t + (r ? "." : "#") + a, n.forced), !s && l !== void 0) {
        if (typeof c == typeof l)
          continue;
        Q1(c, l);
      }
      (n.sham || l && l.sham) && X1(c, "sham", !0), Y1(o, a, c, n);
    }
}, n0 = Jc, i0 = Xe, r0 = function(n) {
  if (n0(n) === "Function")
    return i0(n);
}, Ia = r0, s0 = nu, o0 = ao, a0 = Ia(Ia.bind), l0 = function(n, e) {
  return s0(n), e === void 0 ? n : o0 ? a0(n, e) : function() {
    return n.apply(e, arguments);
  };
}, c0 = l0, u0 = Gc, d0 = su, h0 = wu, Oa = function(n) {
  var e = n === 1;
  return function(t, i, r) {
    for (var s = d0(t), o = u0(s), a = h0(o), l = c0(i, r), c, u; a-- > 0; )
      if (c = o[a], u = l(c, a, s), u)
        switch (n) {
          case 0:
            return c;
          case 1:
            return a;
        }
    return e ? -1 : void 0;
  };
}, f0 = {
  // `Array.prototype.findLast` method
  // https://github.com/tc39/proposal-array-find-from-last
  findLast: Oa(0),
  // `Array.prototype.findLastIndex` method
  // https://github.com/tc39/proposal-array-find-from-last
  findLastIndex: Oa(1)
}, xu = {}, p0 = Cu, m0 = go, g0 = Object.keys || function(e) {
  return p0(e, m0);
}, v0 = Mt, y0 = du, b0 = kn, w0 = lr, C0 = ar, k0 = g0;
xu.f = v0 && !y0 ? Object.defineProperties : function(e, t) {
  w0(e);
  for (var i = C0(t), r = k0(t), s = r.length, o = 0, a; s > o; )
    b0.f(e, a = r[o++], i[a]);
  return e;
};
var x0 = co, S0 = x0("document", "documentElement"), T0 = lr, M0 = xu, Da = go, _0 = po, N0 = S0, E0 = cu, A0 = mu, $a = ">", Ra = "<", Ms = "prototype", _s = "script", Su = A0("IE_PROTO"), Wr = function() {
}, Tu = function(n) {
  return Ra + _s + $a + n + Ra + "/" + _s + $a;
}, Pa = function(n) {
  n.write(Tu("")), n.close();
  var e = n.parentWindow.Object;
  return n = null, e;
}, I0 = function() {
  var n = E0("iframe"), e = "java" + _s + ":", t;
  return n.style.display = "none", N0.appendChild(n), n.src = String(e), t = n.contentWindow.document, t.open(), t.write(Tu("document.F=Object")), t.close(), t.F;
}, pi, Ii = function() {
  try {
    pi = new ActiveXObject("htmlfile");
  } catch (e) {
  }
  Ii = typeof document < "u" ? document.domain && pi ? Pa(pi) : I0() : Pa(pi);
  for (var n = Da.length; n--; )
    delete Ii[Ms][Da[n]];
  return Ii();
};
_0[Su] = !0;
var O0 = Object.create || function(e, t) {
  var i;
  return e !== null ? (Wr[Ms] = T0(e), i = new Wr(), Wr[Ms] = null, i[Su] = e) : i = Ii(), t === void 0 ? i : M0.f(i, t);
}, D0 = au, $0 = O0, R0 = kn.f, Ns = D0("unscopables"), Es = Array.prototype;
Es[Ns] === void 0 && R0(Es, Ns, {
  configurable: !0,
  value: $0(null)
});
var P0 = function(n) {
  Es[Ns][n] = !0;
}, L0 = t0, z0 = f0.findLast, B0 = P0;
L0({ target: "Array", proto: !0 }, {
  findLast: function(e) {
    return z0(this, e, arguments.length > 1 ? arguments[1] : void 0);
  }
});
B0("findLast");
var F0 = Ue, V0 = Xe, H0 = function(n, e) {
  return V0(F0[n].prototype[e]);
}, j0 = H0;
j0("Array", "findLast");
var cr, R, Mu, _u, Ot, La, Nu, Eu, Au, vo, As, Is, Iu, Fn = {}, Ou = [], W0 = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i, ti = Array.isArray;
function st(n, e) {
  for (var t in e)
    n[t] = e[t];
  return n;
}
function yo(n) {
  n && n.parentNode && n.parentNode.removeChild(n);
}
function ke(n, e, t) {
  var i, r, s, o = {};
  for (s in e)
    s == "key" ? i = e[s] : s == "ref" ? r = e[s] : o[s] = e[s];
  if (arguments.length > 2 && (o.children = arguments.length > 3 ? cr.call(arguments, 2) : t), typeof n == "function" && n.defaultProps != null)
    for (s in n.defaultProps)
      o[s] === void 0 && (o[s] = n.defaultProps[s]);
  return Oi(n, o, i, r, null);
}
function Oi(n, e, t, i, r) {
  var s = { type: n, props: e, key: t, ref: i, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: r == null ? ++Mu : r, __i: -1, __u: 0 };
  return r == null && R.vnode != null && R.vnode(s), s;
}
function za() {
  return { current: null };
}
function We(n) {
  return n.children;
}
function ze(n, e) {
  this.props = n, this.context = e;
}
function mn(n, e) {
  if (e == null)
    return n.__ ? mn(n.__, n.__i + 1) : null;
  for (var t; e < n.__k.length; e++)
    if ((t = n.__k[e]) != null && t.__e != null)
      return t.__e;
  return typeof n.type == "function" ? mn(n) : null;
}
function Du(n) {
  var e, t;
  if ((n = n.__) != null && n.__c != null) {
    for (n.__e = n.__c.base = null, e = 0; e < n.__k.length; e++)
      if ((t = n.__k[e]) != null && t.__e != null) {
        n.__e = n.__c.base = t.__e;
        break;
      }
    return Du(n);
  }
}
function Os(n) {
  (!n.__d && (n.__d = !0) && Ot.push(n) && !Vi.__r++ || La != R.debounceRendering) && ((La = R.debounceRendering) || Nu)(Vi);
}
function Vi() {
  for (var n, e, t, i, r, s, o, a = 1; Ot.length; )
    Ot.length > a && Ot.sort(Eu), n = Ot.shift(), a = Ot.length, n.__d && (t = void 0, i = void 0, r = (i = (e = n).__v).__e, s = [], o = [], e.__P && ((t = st({}, i)).__v = i.__v + 1, R.vnode && R.vnode(t), bo(e.__P, t, i, e.__n, e.__P.namespaceURI, 32 & i.__u ? [r] : null, s, r == null ? mn(i) : r, !!(32 & i.__u), o), t.__v = i.__v, t.__.__k[t.__i] = t, Pu(s, t, o), i.__e = i.__ = null, t.__e != r && Du(t)));
  Vi.__r = 0;
}
function $u(n, e, t, i, r, s, o, a, l, c, u) {
  var d, f, p, m, v, y, g, b = i && i.__k || Ou, w = e.length;
  for (l = U0(t, e, b, l, w), d = 0; d < w; d++)
    (p = t.__k[d]) != null && (f = p.__i == -1 ? Fn : b[p.__i] || Fn, p.__i = d, y = bo(n, p, f, r, s, o, a, l, c, u), m = p.__e, p.ref && f.ref != p.ref && (f.ref && wo(f.ref, null, p), u.push(p.ref, p.__c || m, p)), v == null && m != null && (v = m), (g = !!(4 & p.__u)) || f.__k === p.__k ? l = Ru(p, l, n, g) : typeof p.type == "function" && y !== void 0 ? l = y : m && (l = m.nextSibling), p.__u &= -7);
  return t.__e = v, l;
}
function U0(n, e, t, i, r) {
  var s, o, a, l, c, u = t.length, d = u, f = 0;
  for (n.__k = new Array(r), s = 0; s < r; s++)
    (o = e[s]) != null && typeof o != "boolean" && typeof o != "function" ? (l = s + f, (o = n.__k[s] = typeof o == "string" || typeof o == "number" || typeof o == "bigint" || o.constructor == String ? Oi(null, o, null, null, null) : ti(o) ? Oi(We, { children: o }, null, null, null) : o.constructor == null && o.__b > 0 ? Oi(o.type, o.props, o.key, o.ref ? o.ref : null, o.__v) : o).__ = n, o.__b = n.__b + 1, a = null, (c = o.__i = q0(o, t, l, d)) != -1 && (d--, (a = t[c]) && (a.__u |= 2)), a == null || a.__v == null ? (c == -1 && (r > u ? f-- : r < u && f++), typeof o.type != "function" && (o.__u |= 4)) : c != l && (c == l - 1 ? f-- : c == l + 1 ? f++ : (c > l ? f-- : f++, o.__u |= 4))) : n.__k[s] = null;
  if (d)
    for (s = 0; s < u; s++)
      (a = t[s]) != null && !(2 & a.__u) && (a.__e == i && (i = mn(a)), zu(a, a));
  return i;
}
function Ru(n, e, t, i) {
  var r, s;
  if (typeof n.type == "function") {
    for (r = n.__k, s = 0; r && s < r.length; s++)
      r[s] && (r[s].__ = n, e = Ru(r[s], e, t, i));
    return e;
  }
  n.__e != e && (i && (e && n.type && !e.parentNode && (e = mn(n)), t.insertBefore(n.__e, e || null)), e = n.__e);
  do
    e = e && e.nextSibling;
  while (e != null && e.nodeType == 8);
  return e;
}
function Hi(n, e) {
  return e = e || [], n == null || typeof n == "boolean" || (ti(n) ? n.some(function(t) {
    Hi(t, e);
  }) : e.push(n)), e;
}
function q0(n, e, t, i) {
  var r, s, o, a = n.key, l = n.type, c = e[t], u = c != null && (2 & c.__u) == 0;
  if (c === null && n.key == null || u && a == c.key && l == c.type)
    return t;
  if (i > (u ? 1 : 0)) {
    for (r = t - 1, s = t + 1; r >= 0 || s < e.length; )
      if ((c = e[o = r >= 0 ? r-- : s++]) != null && !(2 & c.__u) && a == c.key && l == c.type)
        return o;
  }
  return -1;
}
function Ba(n, e, t) {
  e[0] == "-" ? n.setProperty(e, t == null ? "" : t) : n[e] = t == null ? "" : typeof t != "number" || W0.test(e) ? t : t + "px";
}
function mi(n, e, t, i, r) {
  var s, o;
  e:
    if (e == "style")
      if (typeof t == "string")
        n.style.cssText = t;
      else {
        if (typeof i == "string" && (n.style.cssText = i = ""), i)
          for (e in i)
            t && e in t || Ba(n.style, e, "");
        if (t)
          for (e in t)
            i && t[e] == i[e] || Ba(n.style, e, t[e]);
      }
    else if (e[0] == "o" && e[1] == "n")
      s = e != (e = e.replace(Au, "$1")), o = e.toLowerCase(), e = o in n || e == "onFocusOut" || e == "onFocusIn" ? o.slice(2) : e.slice(2), n.l || (n.l = {}), n.l[e + s] = t, t ? i ? t.u = i.u : (t.u = vo, n.addEventListener(e, s ? Is : As, s)) : n.removeEventListener(e, s ? Is : As, s);
    else {
      if (r == "http://www.w3.org/2000/svg")
        e = e.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
      else if (e != "width" && e != "height" && e != "href" && e != "list" && e != "form" && e != "tabIndex" && e != "download" && e != "rowSpan" && e != "colSpan" && e != "role" && e != "popover" && e in n)
        try {
          n[e] = t == null ? "" : t;
          break e;
        } catch (a) {
        }
      typeof t == "function" || (t == null || t === !1 && e[4] != "-" ? n.removeAttribute(e) : n.setAttribute(e, e == "popover" && t == 1 ? "" : t));
    }
}
function Fa(n) {
  return function(e) {
    if (this.l) {
      var t = this.l[e.type + n];
      if (e.t == null)
        e.t = vo++;
      else if (e.t < t.u)
        return;
      return t(R.event ? R.event(e) : e);
    }
  };
}
function bo(n, e, t, i, r, s, o, a, l, c) {
  var u, d, f, p, m, v, y, g, b, w, C, x, S, M, A, E, H, U = e.type;
  if (e.constructor != null)
    return null;
  128 & t.__u && (l = !!(32 & t.__u), s = [a = e.__e = t.__e]), (u = R.__b) && u(e);
  e:
    if (typeof U == "function")
      try {
        if (g = e.props, b = "prototype" in U && U.prototype.render, w = (u = U.contextType) && i[u.__c], C = u ? w ? w.props.value : u.__ : i, t.__c ? y = (d = e.__c = t.__c).__ = d.__E : (b ? e.__c = d = new U(g, C) : (e.__c = d = new ze(g, C), d.constructor = U, d.render = J0), w && w.sub(d), d.props = g, d.state || (d.state = {}), d.context = C, d.__n = i, f = d.__d = !0, d.__h = [], d._sb = []), b && d.__s == null && (d.__s = d.state), b && U.getDerivedStateFromProps != null && (d.__s == d.state && (d.__s = st({}, d.__s)), st(d.__s, U.getDerivedStateFromProps(g, d.__s))), p = d.props, m = d.state, d.__v = e, f)
          b && U.getDerivedStateFromProps == null && d.componentWillMount != null && d.componentWillMount(), b && d.componentDidMount != null && d.__h.push(d.componentDidMount);
        else {
          if (b && U.getDerivedStateFromProps == null && g !== p && d.componentWillReceiveProps != null && d.componentWillReceiveProps(g, C), !d.__e && d.shouldComponentUpdate != null && d.shouldComponentUpdate(g, d.__s, C) === !1 || e.__v == t.__v) {
            for (e.__v != t.__v && (d.props = g, d.state = d.__s, d.__d = !1), e.__e = t.__e, e.__k = t.__k, e.__k.some(function(ae) {
              ae && (ae.__ = e);
            }), x = 0; x < d._sb.length; x++)
              d.__h.push(d._sb[x]);
            d._sb = [], d.__h.length && o.push(d);
            break e;
          }
          d.componentWillUpdate != null && d.componentWillUpdate(g, d.__s, C), b && d.componentDidUpdate != null && d.__h.push(function() {
            d.componentDidUpdate(p, m, v);
          });
        }
        if (d.context = C, d.props = g, d.__P = n, d.__e = !1, S = R.__r, M = 0, b) {
          for (d.state = d.__s, d.__d = !1, S && S(e), u = d.render(d.props, d.state, d.context), A = 0; A < d._sb.length; A++)
            d.__h.push(d._sb[A]);
          d._sb = [];
        } else
          do
            d.__d = !1, S && S(e), u = d.render(d.props, d.state, d.context), d.state = d.__s;
          while (d.__d && ++M < 25);
        d.state = d.__s, d.getChildContext != null && (i = st(st({}, i), d.getChildContext())), b && !f && d.getSnapshotBeforeUpdate != null && (v = d.getSnapshotBeforeUpdate(p, m)), E = u, u != null && u.type === We && u.key == null && (E = Lu(u.props.children)), a = $u(n, ti(E) ? E : [E], e, t, i, r, s, o, a, l, c), d.base = e.__e, e.__u &= -161, d.__h.length && o.push(d), y && (d.__E = d.__ = null);
      } catch (ae) {
        if (e.__v = null, l || s != null)
          if (ae.then) {
            for (e.__u |= l ? 160 : 128; a && a.nodeType == 8 && a.nextSibling; )
              a = a.nextSibling;
            s[s.indexOf(a)] = null, e.__e = a;
          } else {
            for (H = s.length; H--; )
              yo(s[H]);
            Ds(e);
          }
        else
          e.__e = t.__e, e.__k = t.__k, ae.then || Ds(e);
        R.__e(ae, e, t);
      }
    else
      s == null && e.__v == t.__v ? (e.__k = t.__k, e.__e = t.__e) : a = e.__e = K0(t.__e, e, t, i, r, s, o, l, c);
  return (u = R.diffed) && u(e), 128 & e.__u ? void 0 : a;
}
function Ds(n) {
  n && n.__c && (n.__c.__e = !0), n && n.__k && n.__k.forEach(Ds);
}
function Pu(n, e, t) {
  for (var i = 0; i < t.length; i++)
    wo(t[i], t[++i], t[++i]);
  R.__c && R.__c(e, n), n.some(function(r) {
    try {
      n = r.__h, r.__h = [], n.some(function(s) {
        s.call(r);
      });
    } catch (s) {
      R.__e(s, r.__v);
    }
  });
}
function Lu(n) {
  return typeof n != "object" || n == null || n.__b && n.__b > 0 ? n : ti(n) ? n.map(Lu) : st({}, n);
}
function K0(n, e, t, i, r, s, o, a, l) {
  var c, u, d, f, p, m, v, y = t.props, g = e.props, b = e.type;
  if (b == "svg" ? r = "http://www.w3.org/2000/svg" : b == "math" ? r = "http://www.w3.org/1998/Math/MathML" : r || (r = "http://www.w3.org/1999/xhtml"), s != null) {
    for (c = 0; c < s.length; c++)
      if ((p = s[c]) && "setAttribute" in p == !!b && (b ? p.localName == b : p.nodeType == 3)) {
        n = p, s[c] = null;
        break;
      }
  }
  if (n == null) {
    if (b == null)
      return document.createTextNode(g);
    n = document.createElementNS(r, b, g.is && g), a && (R.__m && R.__m(e, s), a = !1), s = null;
  }
  if (b == null)
    y === g || a && n.data == g || (n.data = g);
  else {
    if (s = s && cr.call(n.childNodes), y = t.props || Fn, !a && s != null)
      for (y = {}, c = 0; c < n.attributes.length; c++)
        y[(p = n.attributes[c]).name] = p.value;
    for (c in y)
      if (p = y[c], c != "children") {
        if (c == "dangerouslySetInnerHTML")
          d = p;
        else if (!(c in g)) {
          if (c == "value" && "defaultValue" in g || c == "checked" && "defaultChecked" in g)
            continue;
          mi(n, c, null, p, r);
        }
      }
    for (c in g)
      p = g[c], c == "children" ? f = p : c == "dangerouslySetInnerHTML" ? u = p : c == "value" ? m = p : c == "checked" ? v = p : a && typeof p != "function" || y[c] === p || mi(n, c, p, y[c], r);
    if (u)
      a || d && (u.__html == d.__html || u.__html == n.innerHTML) || (n.innerHTML = u.__html), e.__k = [];
    else if (d && (n.innerHTML = ""), $u(e.type == "template" ? n.content : n, ti(f) ? f : [f], e, t, i, b == "foreignObject" ? "http://www.w3.org/1999/xhtml" : r, s, o, s ? s[0] : t.__k && mn(t, 0), a, l), s != null)
      for (c = s.length; c--; )
        yo(s[c]);
    a || (c = "value", b == "progress" && m == null ? n.removeAttribute("value") : m != null && (m !== n[c] || b == "progress" && !m || b == "option" && m != y[c]) && mi(n, c, m, y[c], r), c = "checked", v != null && v != n[c] && mi(n, c, v, y[c], r));
  }
  return n;
}
function wo(n, e, t) {
  try {
    if (typeof n == "function") {
      var i = typeof n.__u == "function";
      i && n.__u(), i && e == null || (n.__u = n(e));
    } else
      n.current = e;
  } catch (r) {
    R.__e(r, t);
  }
}
function zu(n, e, t) {
  var i, r;
  if (R.unmount && R.unmount(n), (i = n.ref) && (i.current && i.current != n.__e || wo(i, null, e)), (i = n.__c) != null) {
    if (i.componentWillUnmount)
      try {
        i.componentWillUnmount();
      } catch (s) {
        R.__e(s, e);
      }
    i.base = i.__P = null;
  }
  if (i = n.__k)
    for (r = 0; r < i.length; r++)
      i[r] && zu(i[r], e, t || typeof n.type != "function");
  t || yo(n.__e), n.__c = n.__ = n.__e = void 0;
}
function J0(n, e, t) {
  return this.constructor(n, t);
}
function Ie(n, e, t) {
  var i, r, s, o;
  e == document && (e = document.documentElement), R.__ && R.__(n, e), r = (i = typeof t == "function") ? null : t && t.__k || e.__k, s = [], o = [], bo(e, n = (!i && t || e).__k = ke(We, null, [n]), r || Fn, Fn, e.namespaceURI, !i && t ? [t] : r ? null : e.firstChild ? cr.call(e.childNodes) : null, s, !i && t ? t : r ? r.__e : e.firstChild, i, o), Pu(s, n, o);
}
function Bu(n) {
  function e(t) {
    var i, r;
    return this.getChildContext || (i = /* @__PURE__ */ new Set(), (r = {})[e.__c] = this, this.getChildContext = function() {
      return r;
    }, this.componentWillUnmount = function() {
      i = null;
    }, this.shouldComponentUpdate = function(s) {
      this.props.value != s.value && i.forEach(function(o) {
        o.__e = !0, Os(o);
      });
    }, this.sub = function(s) {
      i.add(s);
      var o = s.componentWillUnmount;
      s.componentWillUnmount = function() {
        i && i.delete(s), o && o.call(s);
      };
    }), t.children;
  }
  return e.__c = "__cC" + Iu++, e.__ = n, e.Provider = e.__l = (e.Consumer = function(t, i) {
    return t.children(i);
  }).contextType = e, e;
}
cr = Ou.slice, R = { __e: function(n, e, t, i) {
  for (var r, s, o; e = e.__; )
    if ((r = e.__c) && !r.__)
      try {
        if ((s = r.constructor) && s.getDerivedStateFromError != null && (r.setState(s.getDerivedStateFromError(n)), o = r.__d), r.componentDidCatch != null && (r.componentDidCatch(n, i || {}), o = r.__d), o)
          return r.__E = r;
      } catch (a) {
        n = a;
      }
  throw n;
} }, Mu = 0, _u = function(n) {
  return n != null && n.constructor == null;
}, ze.prototype.setState = function(n, e) {
  var t;
  t = this.__s != null && this.__s != this.state ? this.__s : this.__s = st({}, this.state), typeof n == "function" && (n = n(st({}, t), this.props)), n && st(t, n), n != null && this.__v && (e && this._sb.push(e), Os(this));
}, ze.prototype.forceUpdate = function(n) {
  this.__v && (this.__e = !0, n && this.__h.push(n), Os(this));
}, ze.prototype.render = We, Ot = [], Nu = typeof Promise == "function" ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, Eu = function(n, e) {
  return n.__v.__b - e.__v.__b;
}, Vi.__r = 0, Au = /(PointerCapture)$|Capture$/i, vo = 0, As = Fa(!1), Is = Fa(!0), Iu = 0;
var G0 = 0;
function h(n, e, t, i, r, s) {
  e || (e = {});
  var o, a, l = e;
  if ("ref" in l)
    for (a in l = {}, e)
      a == "ref" ? o = e[a] : l[a] = e[a];
  var c = { type: n, props: l, key: t, ref: o, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: --G0, __i: -1, __u: 0, __source: r, __self: s };
  if (typeof n == "function" && (o = n.defaultProps))
    for (a in o)
      l[a] === void 0 && (l[a] = o[a]);
  return R.vnode && R.vnode(c), c;
}
const X0 = "ibiz", Y0 = "is-";
function Nt(n, e, t, i, r) {
  let s = "".concat(n, "-").concat(e);
  return t && (s += "-".concat(t)), i && (s += "__".concat(i)), r && (s += "--".concat(r)), s;
}
class P {
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
    _(this, "namespace");
    this.block = e, this.namespace = t || X0;
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
    return Nt(this.namespace, this.block, e, "", "");
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
    return e ? Nt(this.namespace, this.block, "", e, "") : "";
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
    return e ? Nt(this.namespace, this.block, "", "", e) : "";
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
    return e && t ? Nt(this.namespace, this.block, e, t, "") : "";
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
    return e && t ? Nt(this.namespace, this.block, "", e, t) : "";
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
    return e && t ? Nt(this.namespace, this.block, e, "", t) : "";
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
    return e && t && i ? Nt(this.namespace, this.block, e, t, i) : "";
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
    return e && t ? "".concat(Y0).concat(e) : "";
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
function Ze(n) {
  if (typeof n != "string")
    throw new TypeError("Path must be a string. Received " + JSON.stringify(n));
}
function Va(n, e) {
  for (var t = "", i = 0, r = -1, s = 0, o, a = 0; a <= n.length; ++a) {
    if (a < n.length)
      o = n.charCodeAt(a);
    else {
      if (o === 47)
        break;
      o = 47;
    }
    if (o === 47) {
      if (!(r === a - 1 || s === 1))
        if (r !== a - 1 && s === 2) {
          if (t.length < 2 || i !== 2 || t.charCodeAt(t.length - 1) !== 46 || t.charCodeAt(t.length - 2) !== 46) {
            if (t.length > 2) {
              var l = t.lastIndexOf("/");
              if (l !== t.length - 1) {
                l === -1 ? (t = "", i = 0) : (t = t.slice(0, l), i = t.length - 1 - t.lastIndexOf("/")), r = a, s = 0;
                continue;
              }
            } else if (t.length === 2 || t.length === 1) {
              t = "", i = 0, r = a, s = 0;
              continue;
            }
          }
          e && (t.length > 0 ? t += "/.." : t = "..", i = 2);
        } else
          t.length > 0 ? t += "/" + n.slice(r + 1, a) : t = n.slice(r + 1, a), i = a - r - 1;
      r = a, s = 0;
    } else
      o === 46 && s !== -1 ? ++s : s = -1;
  }
  return t;
}
function Z0(n, e) {
  var t = e.dir || e.root, i = e.base || (e.name || "") + (e.ext || "");
  return t ? t === e.root ? t + i : t + n + i : i;
}
var On = {
  // path.resolve([from ...], to)
  resolve: function() {
    for (var e = "", t = !1, i, r = arguments.length - 1; r >= -1 && !t; r--) {
      var s;
      r >= 0 ? s = arguments[r] : (i === void 0 && (i = process.cwd()), s = i), Ze(s), s.length !== 0 && (e = s + "/" + e, t = s.charCodeAt(0) === 47);
    }
    return e = Va(e, !t), t ? e.length > 0 ? "/" + e : "/" : e.length > 0 ? e : ".";
  },
  normalize: function(e) {
    if (Ze(e), e.length === 0)
      return ".";
    var t = e.charCodeAt(0) === 47, i = e.charCodeAt(e.length - 1) === 47;
    return e = Va(e, !t), e.length === 0 && !t && (e = "."), e.length > 0 && i && (e += "/"), t ? "/" + e : e;
  },
  isAbsolute: function(e) {
    return Ze(e), e.length > 0 && e.charCodeAt(0) === 47;
  },
  join: function() {
    if (arguments.length === 0)
      return ".";
    for (var e, t = 0; t < arguments.length; ++t) {
      var i = arguments[t];
      Ze(i), i.length > 0 && (e === void 0 ? e = i : e += "/" + i);
    }
    return e === void 0 ? "." : On.normalize(e);
  },
  relative: function(e, t) {
    if (Ze(e), Ze(t), e === t || (e = On.resolve(e), t = On.resolve(t), e === t))
      return "";
    for (var i = 1; i < e.length && e.charCodeAt(i) === 47; ++i)
      ;
    for (var r = e.length, s = r - i, o = 1; o < t.length && t.charCodeAt(o) === 47; ++o)
      ;
    for (var a = t.length, l = a - o, c = s < l ? s : l, u = -1, d = 0; d <= c; ++d) {
      if (d === c) {
        if (l > c) {
          if (t.charCodeAt(o + d) === 47)
            return t.slice(o + d + 1);
          if (d === 0)
            return t.slice(o + d);
        } else
          s > c && (e.charCodeAt(i + d) === 47 ? u = d : d === 0 && (u = 0));
        break;
      }
      var f = e.charCodeAt(i + d), p = t.charCodeAt(o + d);
      if (f !== p)
        break;
      f === 47 && (u = d);
    }
    var m = "";
    for (d = i + u + 1; d <= r; ++d)
      (d === r || e.charCodeAt(d) === 47) && (m.length === 0 ? m += ".." : m += "/..");
    return m.length > 0 ? m + t.slice(o + u) : (o += u, t.charCodeAt(o) === 47 && ++o, t.slice(o));
  },
  _makeLong: function(e) {
    return e;
  },
  dirname: function(e) {
    if (Ze(e), e.length === 0)
      return ".";
    for (var t = e.charCodeAt(0), i = t === 47, r = -1, s = !0, o = e.length - 1; o >= 1; --o)
      if (t = e.charCodeAt(o), t === 47) {
        if (!s) {
          r = o;
          break;
        }
      } else
        s = !1;
    return r === -1 ? i ? "/" : "." : i && r === 1 ? "//" : e.slice(0, r);
  },
  basename: function(e, t) {
    if (t !== void 0 && typeof t != "string")
      throw new TypeError('"ext" argument must be a string');
    Ze(e);
    var i = 0, r = -1, s = !0, o;
    if (t !== void 0 && t.length > 0 && t.length <= e.length) {
      if (t.length === e.length && t === e)
        return "";
      var a = t.length - 1, l = -1;
      for (o = e.length - 1; o >= 0; --o) {
        var c = e.charCodeAt(o);
        if (c === 47) {
          if (!s) {
            i = o + 1;
            break;
          }
        } else
          l === -1 && (s = !1, l = o + 1), a >= 0 && (c === t.charCodeAt(a) ? --a === -1 && (r = o) : (a = -1, r = l));
      }
      return i === r ? r = l : r === -1 && (r = e.length), e.slice(i, r);
    } else {
      for (o = e.length - 1; o >= 0; --o)
        if (e.charCodeAt(o) === 47) {
          if (!s) {
            i = o + 1;
            break;
          }
        } else
          r === -1 && (s = !1, r = o + 1);
      return r === -1 ? "" : e.slice(i, r);
    }
  },
  extname: function(e) {
    Ze(e);
    for (var t = -1, i = 0, r = -1, s = !0, o = 0, a = e.length - 1; a >= 0; --a) {
      var l = e.charCodeAt(a);
      if (l === 47) {
        if (!s) {
          i = a + 1;
          break;
        }
        continue;
      }
      r === -1 && (s = !1, r = a + 1), l === 46 ? t === -1 ? t = a : o !== 1 && (o = 1) : t !== -1 && (o = -1);
    }
    return t === -1 || r === -1 || // We saw a non-dot character immediately before the dot
    o === 0 || // The (right-most) trimmed path component is exactly '..'
    o === 1 && t === r - 1 && t === i + 1 ? "" : e.slice(t, r);
  },
  format: function(e) {
    if (e === null || typeof e != "object")
      throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof e);
    return Z0("/", e);
  },
  parse: function(e) {
    Ze(e);
    var t = { root: "", dir: "", base: "", ext: "", name: "" };
    if (e.length === 0)
      return t;
    var i = e.charCodeAt(0), r = i === 47, s;
    r ? (t.root = "/", s = 1) : s = 0;
    for (var o = -1, a = 0, l = -1, c = !0, u = e.length - 1, d = 0; u >= s; --u) {
      if (i = e.charCodeAt(u), i === 47) {
        if (!c) {
          a = u + 1;
          break;
        }
        continue;
      }
      l === -1 && (c = !1, l = u + 1), i === 46 ? o === -1 ? o = u : d !== 1 && (d = 1) : o !== -1 && (d = -1);
    }
    return o === -1 || l === -1 || // We saw a non-dot character immediately before the dot
    d === 0 || // The (right-most) trimmed path component is exactly '..'
    d === 1 && o === l - 1 && o === a + 1 ? l !== -1 && (a === 0 && r ? t.base = t.name = e.slice(1, l) : t.base = t.name = e.slice(a, l)) : (a === 0 && r ? (t.name = e.slice(1, o), t.base = e.slice(1, l)) : (t.name = e.slice(a, o), t.base = e.slice(a, l)), t.ext = e.slice(o, l)), a > 0 ? t.dir = e.slice(0, a - 1) : r && (t.dir = "/"), t;
  },
  sep: "/",
  delimiter: ":",
  win32: null,
  posix: null
};
On.posix = On;
function dt() {
  return ((1 + Math.random()) * 65536 | 0).toString(16).substring(1);
}
function Pe() {
  return "".concat(dt() + dt(), "-").concat(dt(), "-").concat(dt(), "-").concat(dt(), "-").concat(dt()).concat(dt()).concat(dt());
}
function gi(n) {
  const e = n.lastIndexOf("@");
  return e === -1 ? n : n.substring(0, e);
}
const Q0 = /<svg\b[^>]*>[\s\S]*?<\/svg>/;
function ni(n) {
  return Q0.test(n);
}
const eg = "topic", tg = "inline", ng = "temp", ig = "unknow";
function Fu(n, e) {
  let t = "";
  switch (n) {
    case "TOPIC":
      t += eg;
      break;
    case "INLINE":
      t += tg;
      break;
    case "TEMP":
      t += ng;
      break;
    default:
      t += ig;
      break;
  }
  return t += "@".concat(e || Pe(), "@").concat((/* @__PURE__ */ new Date()).getTime()), t;
}
function rg(n) {
  const e = {};
  n.startsWith("?") && (n = n.substring(1));
  const t = n.split("&");
  for (let i = 0; i < t.length; i++) {
    const [r, s] = t[i].split("=");
    e[r] = s;
  }
  return e;
}
function sg(n) {
  const e = new URL(n), t = {}, i = {};
  let r = "";
  if (e.searchParams.size > 0) {
    const c = e.searchParams.get("srfnavctx");
    if (c) {
      try {
        Object.assign(t, JSON.parse(c));
      } catch (u) {
        console.error("srfnavctx 参数解析失败");
      }
      e.searchParams.delete("srfnavctx");
    }
    e.searchParams.forEach((u, d) => {
      i[d] = u;
    });
  } else if (e.search) {
    const c = rg(e.search), u = c.srfnavctx;
    if (u) {
      try {
        const d = decodeURIComponent(u);
        Object.assign(t, JSON.parse(d));
      } catch (d) {
        console.error("srfnavctx 参数解析失败");
      }
      delete c.srfnavctx;
    }
    Object.keys(c).forEach((d) => {
      i[d] = c[d];
    });
  }
  const o = (e.pathname || e.hostname).replace("//", "").split("/"), [a, l] = o;
  return l ? r = l : r = a, {
    context: t,
    params: i,
    typeId: r
  };
}
function Vn(n) {
  const e = new DOMParser().parseFromString(n, "text/html");
  function t(r) {
    if (r.nodeType === Node.TEXT_NODE)
      return r.textContent || "";
    if (r.nodeType !== Node.ELEMENT_NODE)
      return "";
    const s = r, o = s.tagName.toLowerCase(), a = Array.from(s.childNodes).map((l) => t(l)).join("");
    switch (o) {
      case "p":
        return "".concat(a, "\n");
      case "br":
        return "\n";
      case "img": {
        const l = s.getAttribute("src") || "", c = s.getAttribute("alt") || "";
        return l ? "\n![".concat(c, "](").concat(l, ")\n") : "";
      }
      default:
        return r.textContent || "";
    }
  }
  return Array.from(e.body.childNodes).map(t).join("").replace(/\n+/g, "\n").replace(/^\n|\n$/g, "");
}
function og(n) {
  let e = "";
  const i = n.replace(
    /!\[([^\]]*)\]\(([^)]+)\)/g,
    '<img src="$2" alt="$1">'
  ).split("\n"), r = [];
  let s = "";
  for (const o of i) {
    const a = o.trim();
    if (!a) {
      s && (r.push("<p>".concat(s, "</p>")), s = "");
      continue;
    }
    a.startsWith("<img") && a.endsWith(">") ? (s && (r.push("<p>".concat(s, "</p>")), s = ""), r.push(a)) : s ? s += "<br>".concat(a) : s = a;
  }
  return s && r.push("<p>".concat(s, "</p>")), e = r.join(""), e;
}
class xn {
  /**
   * @description 拷贝文本
   * @static
   * @param {string} value
   * @returns {*}  {boolean}
   * @memberof TextUtil
   */
  static copy(e) {
    return this.element || (this.element = document.createElement("textarea"), this.element.style.position = "absolute", this.element.style.left = "-9999px", document.body.appendChild(this.element)), this.element.value = e, this.element.select(), document.execCommand("copy");
  }
}
/**
 * @description textarea元素，用于存储拷贝的文本
 * @static
 * @type {(HTMLTextAreaElement | null)}
 * @memberof TextUtil
 */
_(xn, "element", null);
const O = class O {
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
    return O.lastLink && ((i = (t = O.lastLink).close) == null || i.call(t)), new Promise((r, s) => {
      const o = indexedDB.deleteDatabase(e);
      o.onsuccess = () => {
        r(!0);
      }, o.onerror = () => {
        r(!1);
      }, o.onblocked = () => {
        console.warn(
          "删除数据库 ".concat(e, " 被阻塞，可能有其他连接正在使用该数据库。")
        ), s(new Error("删除数据库 ".concat(e, " 被阻塞")));
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
    return await O.checkDataBaseExists(e) ? new Promise((r, s) => {
      const o = indexedDB.open(e);
      o.onupgradeneeded = (a) => {
        O.db = a.target.result, O.version = O.db.version;
      }, o.onsuccess = (a) => {
        O.db = a.target.result, O.lastLink = o.result;
        const l = O.db.objectStoreNames.contains(t);
        o.result.close(), r(l);
      }, o.onerror = (a) => {
        s(a.target.error);
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
  static async createTable(e, t, i, r = !1) {
    return new Promise((s) => {
      var a, l;
      O.version += 1, O.lastLink && ((l = (a = O.lastLink).close) == null || l.call(a));
      const o = indexedDB.open(e, O.version);
      o.onupgradeneeded = (c) => {
        if (O.db = c.target.result, !O.db.objectStoreNames.contains(t)) {
          const u = {};
          i ? u.keyPath = i : r && (u.autoIncrement = !0), O.db.createObjectStore(t, u);
        }
      }, o.onsuccess = () => {
        O.lastLink = o.result, o.result.close(), s(!0);
      }, o.onerror = () => {
        s(!1);
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
      var s, o;
      O.version += 1, O.lastLink && ((o = (s = O.lastLink).close) == null || o.call(s));
      const r = indexedDB.open(e, O.version);
      r.onupgradeneeded = (a) => {
        O.db = a.target.result, O.lastLink = r.result, O.db.objectStoreNames.contains(t) && O.db.deleteObjectStore(t);
      }, r.onsuccess = (a) => {
        O.db = a.target.result, O.lastLink = r.result, r.result.close(), i(!0);
      }, r.onerror = () => {
        r.result.close(), i(!1);
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
    return new Promise((r, s) => {
      const o = indexedDB.open(e);
      o.onsuccess = (a) => {
        if (O.db = a.target.result, O.lastLink = o.result, O.db.objectStoreNames.contains(t)) {
          const u = O.db.transaction(
            [t],
            "readwrite"
          ).objectStore(t).add(i);
          u.onsuccess = (d) => {
            r(i);
          }, u.onerror = () => {
            r(null);
          };
        }
        o.result.close();
      }, o.onerror = () => {
        o.result.close(), s();
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
    return new Promise((r, s) => {
      const o = indexedDB.open(e);
      o.onsuccess = (a) => {
        if (O.db = a.target.result, O.lastLink = o.result, O.db.objectStoreNames.contains(t)) {
          const u = O.db.transaction(
            [t],
            "readwrite"
          ).objectStore(t).delete(i);
          u.onsuccess = (d) => {
            r(!0);
          }, u.onerror = () => {
            r(!1);
          };
        }
        o.result.close();
      }, o.onerror = () => {
        o.result.close(), s();
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
    return new Promise((r, s) => {
      const o = indexedDB.open(e);
      o.onsuccess = (a) => {
        if (O.db = a.target.result, O.lastLink = o.result, O.db.objectStoreNames.contains(t)) {
          const u = O.db.transaction(
            [t],
            "readwrite"
          ).objectStore(t).put(i);
          u.onsuccess = (d) => {
            r(i);
          }, u.onerror = () => {
            r(i);
          };
        }
        o.result.close();
      }, o.onerror = () => {
        o.result.close(), s();
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
    return new Promise((r, s) => {
      const o = indexedDB.open(e);
      o.onsuccess = (a) => {
        if (O.db = a.target.result, O.lastLink = o.result, O.db.objectStoreNames.contains(t)) {
          const u = O.db.transaction(
            [t],
            "readonly"
          ).objectStore(t).get(i);
          u.onsuccess = (d) => {
            r(u.result);
          }, u.onerror = () => {
            s(new Error("未找到数据".concat(i)));
          };
        }
        o.result.close();
      }, o.onerror = () => {
        o.result.close(), s();
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
    return new Promise((i, r) => {
      const s = indexedDB.open(e);
      s.onsuccess = (o) => {
        if (O.db = o.target.result, O.lastLink = s.result, O.db.objectStoreNames.contains(t)) {
          const c = O.db.transaction(
            [t],
            "readonly"
          ).objectStore(t).getAll();
          c.onsuccess = (u) => {
            i(c.result);
          }, c.onerror = () => {
            i([]);
          };
        }
        s.result.close();
      }, s.onerror = () => {
        s.result.close(), r();
      };
    });
  }
};
// 数据库版本
_(O, "version", 1), // 数据库连接句柄
_(O, "db", null), // 上一个连接
_(O, "lastLink");
let at = O;
class ag {
  /**
   * Creates an instance of FileUploader.
   * @author tony001
   * @date 2025-02-28 15:02:15
   * @param {FileUploaderOptions<T>} options
   */
  constructor(e) {
    _(this, "options");
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
    var i, r;
    if (e.length === 0)
      return;
    const t = e.filter((s) => {
      var o, a;
      return this.options.maxSize && s.size > this.options.maxSize ? ((a = (o = this.options).onError) == null || a.call(
        o,
        new Error(
          "文件大小超过限制 (".concat(this.formatSize(
            s.size
          ), " > ").concat(this.formatSize(this.options.maxSize), ")")
        ),
        s
      ), !1) : !0;
    });
    (r = (i = this.options).onSelect) == null || r.call(i, t), await Promise.all(t.map((s) => this.processFile(s)));
  }
  /**
   * 处理单个文件上传
   */
  async processFile(e) {
    var t, i, r, s, o, a;
    try {
      const l = (u) => {
        var d, f;
        (f = (d = this.options).onProgress) == null || f.call(d, e, u);
      }, c = await this.options.onUpload(e, l);
      (i = (t = this.options).onProgress) == null || i.call(t, e, 100), (s = (r = this.options).onSuccess) == null || s.call(r, c, e);
    } catch (l) {
      (a = (o = this.options).onError) == null || a.call(
        o,
        l instanceof Error ? l : new Error("上传失败"),
        e
      );
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
class un {
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
    const t = Array.from(e.childNodes).find(
      (i) => i.nodeType === i.CDATA_SECTION_NODE
    );
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
    return Array.from(i.querySelectorAll("resource")).map((s) => {
      const o = s.getAttribute("type") || "", a = s.querySelector("data"), l = s.querySelector("metadata");
      try {
        const c = this.getCdataContent(a), u = this.getCdataContent(l), d = c ? JSON.parse(c) : {}, f = u ? JSON.parse(u) : {};
        return { id: d.id, type: o, data: d, metadata: f };
      } catch (c) {
        throw new Error("XML 解析错误: ".concat(c.message));
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
    if (!e)
      return {
        resources: [],
        remainingText: "",
        hasResources: !1
      };
    const i = /<resources\b[^>]*>[\s\S]*?<\/resources>/i.exec(e);
    if (!i)
      return {
        resources: [],
        remainingText: e,
        hasResources: !1
      };
    const [r] = i, s = i.index, o = s + r.length, a = (e.slice(0, s) + e.slice(o)).replace(/\n/g, "").replace(/(!\[[^\]]*\]\([^)]+\))/g, "\n$1\n").replace(/\n+/g, "\n").replace(/^\n|\n$/g, "");
    try {
      return {
        resources: this.parse(r),
        remainingText: a,
        hasResources: !0
      };
    } catch (l) {
      return {
        resources: [],
        remainingText: a,
        hasResources: !0,
        error: "资源解析失败: ".concat(l.message)
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
    const r = (o) => "\n".concat("  ".repeat(o)), s = 1;
    return e.forEach((o) => {
      i.appendChild(t.createTextNode(r(s)));
      const a = t.createElement("resource");
      a.setAttribute("type", o.type), a.setAttribute("version", "1.0");
      const l = (c, u) => {
        const d = t.createElement(c);
        d.appendChild(t.createTextNode(r(s + 1)));
        const f = t.createCDATASection(JSON.stringify(u));
        return d.appendChild(f), d.appendChild(t.createTextNode(r(s))), d;
      };
      a.appendChild(
        t.createTextNode(r(s + 1))
      ), a.appendChild(l("data", o.data)), a.appendChild(
        t.createTextNode(r(s + 1))
      ), a.appendChild(l("metadata", o.metadata)), a.appendChild(t.createTextNode(r(s))), i.appendChild(a);
    }), i.appendChild(t.createTextNode("\n")), t.appendChild(i), new XMLSerializer().serializeToString(t).replace(/></g, ">\n<");
  }
}
class lg {
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
    const t = Array.from(e.childNodes).find(
      (i) => i.nodeType === i.CDATA_SECTION_NODE
    );
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
    return Array.from(i.querySelectorAll("suggestion")).map((s) => {
      const o = s.getAttribute("type") || "", a = s.querySelector("data"), l = s.querySelector("metadata");
      try {
        const c = this.getCdataContent(a), u = this.getCdataContent(l), d = c ? JSON.parse(c) : {}, f = u ? JSON.parse(u) : {};
        return { type: o, data: d, metadata: f };
      } catch (c) {
        throw new Error("XML 解析错误: ".concat(c.message));
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
    const [r] = i, s = i.index, o = s + r.length, a = (e.slice(0, s) + e.slice(o)).replace(/\n/g, "");
    try {
      return {
        suggestions: this.parse(r),
        remainingText: a,
        hasSuggestions: !0
      };
    } catch (l) {
      return {
        suggestions: [],
        remainingText: a,
        hasSuggestions: !0,
        error: "资源解析失败: ".concat(l.message)
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
    const r = (o) => "\n".concat("  ".repeat(o)), s = 1;
    return e.forEach((o) => {
      i.appendChild(t.createTextNode(r(s)));
      const a = t.createElement("suggestion");
      a.setAttribute("type", o.type), a.setAttribute("version", "1.0");
      const l = (c, u) => {
        const d = t.createElement(c);
        d.appendChild(t.createTextNode(r(s + 1)));
        const f = t.createCDATASection(JSON.stringify(u));
        return d.appendChild(f), d.appendChild(t.createTextNode(r(s))), d;
      };
      a.appendChild(
        t.createTextNode(r(s + 1))
      ), a.appendChild(l("data", o.data)), a.appendChild(
        t.createTextNode(r(s + 1))
      ), a.appendChild(
        l("metadata", o.metadata)
      ), a.appendChild(t.createTextNode(r(s))), i.appendChild(a);
    }), i.appendChild(t.createTextNode("\n")), t.appendChild(i), new XMLSerializer().serializeToString(t).replace(/></g, ">\n<");
  }
}
function $s(n) {
  return n.x >= 0 && n.x <= 1 && n.y >= 0 && n.y <= 1;
}
function Vu(n, e, t, i) {
  const r = n / window.innerWidth, s = e / window.innerHeight, o = Math.max(0, Math.min(r, 1 - t)), a = Math.max(0, Math.min(s, 1 - i));
  return { x: o, y: a };
}
class Hu {
  /**
   * 解析工具调用字符串
   * @param toolCallString
   * @returns
   */
  static parse(e) {
    const t = e.replace(/<think>[\s\S]*?<\/think>/g, "").replace(/<chatstep>[\s\S]*?<\/chatstep>/g, ""), i = (t.match(/<tool_call>/g) || []).length, r = (t.match(/<\/tool_call>/g) || []).length, s = i === r, o = new RegExp(
      "<tool_call>\\s*({[\\s\\S]*?})\\s*</tool_call>",
      "g"
    ), a = t.matchAll(o), l = [];
    for (const c of a)
      try {
        const u = JSON.parse(c[1]), d = {
          name: u.name,
          parameters: u.parameters,
          error: u.error || !1,
          type: u.type
        };
        if (u.result) {
          let f = u.result;
          try {
            ["desc_oss_image", "fetch_chunks"].includes(u.type) && (f = JSON.parse(u.result));
          } catch (p) {
            console.error("解析 ".concat(d.type, " 工具调用失败:"), p);
          } finally {
            Object.assign(d, {
              result: f
            });
          }
        }
        l.push(d);
      } catch (u) {
        console.error("解析工具调用失败:", u);
      }
    return { completed: s, toolCalls: l };
  }
}
class ju {
  /**
   * 解析聊天步骤字符串
   * @param chatStepString
   * @returns
   */
  static parse(e) {
    const t = (e.match(/<chatstep>/g) || []).length, i = (e.match(/<\/chatstep>/g) || []).length, r = t === i, s = new RegExp(
      "<chatstep>\\s*({[\\s\\S]*?})\\s*</chatstep>",
      "g"
    ), o = e.matchAll(s), a = [];
    for (const l of o)
      try {
        const c = JSON.parse(l[1]), u = {
          title: c.title,
          content: c.content,
          status: c.status || "success"
        };
        a.push(u);
      } catch (c) {
        console.error("解析完整聊天步骤失败:", c);
      }
    if (!r) {
      const l = [];
      let c = 0;
      for (; (c = e.indexOf("<chatstep>", c)) !== -1; )
        l.push(c), c += 10;
      const u = [];
      for (c = 0; (c = e.indexOf("</chatstep>", c)) !== -1; )
        u.push(c), c += 11;
      const d = l.filter((f) => !u.find(
        (m) => m > f
      ));
      for (let f = 0; f < d.length; f++)
        a.push({
          title: "",
          content: "",
          status: "pending"
        });
    }
    return a;
  }
}
class cg {
  /**
   * 解析界面操作字符串
   * @param chatStepString
   * @returns
   */
  static parse(e) {
    let t = [];
    const i = e.indexOf("<chatuiaction>"), r = e.indexOf("</chatuiaction>");
    if (i === -1 || r === -1)
      return t;
    let s = e.substring(i, r + 17);
    s = s.replace(/\\r/g, "\r").replace(/\\n/g, "\n");
    const o = new RegExp(
      "<chatuiaction>\\s*({[\\s\\S]*?})\\s*</chatuiaction>",
      "g"
    ), a = s.matchAll(o);
    for (const l of a)
      try {
        const c = l[1].replace(/\\/g, "").replace(/"\[/g, "[").replace(/\]"/g, "]").replace(/\n/g, ""), u = JSON.parse(c);
        u && u.content && u.content.length > 0 && (t = [...u.content]);
      } catch (c) {
        console.error("解析完整聊天界面操作失败:", c);
      }
    return t;
  }
}
var Ht, Y, Ur, Ha, gn = 0, Wu = [], te = R, ja = te.__b, Wa = te.__r, Ua = te.diffed, qa = te.__c, Ka = te.unmount, Ja = te.__;
function ii(n, e) {
  te.__h && te.__h(Y, n, gn || e), gn = 0;
  var t = Y.__H || (Y.__H = { __: [], __h: [] });
  return n >= t.__.length && t.__.push({}), t.__[n];
}
function V(n) {
  return gn = 1, ug(Uu, n);
}
function ug(n, e, t) {
  var i = ii(Ht++, 2);
  if (i.t = n, !i.__c && (i.__ = [t ? t(e) : Uu(void 0, e), function(a) {
    var l = i.__N ? i.__N[0] : i.__[0], c = i.t(l, a);
    l !== c && (i.__N = [c, i.__[1]], i.__c.setState({}));
  }], i.__c = Y, !Y.__f)) {
    var r = function(a, l, c) {
      if (!i.__c.__H)
        return !0;
      var u = i.__c.__H.__.filter(function(f) {
        return !!f.__c;
      });
      if (u.every(function(f) {
        return !f.__N;
      }))
        return !s || s.call(this, a, l, c);
      var d = i.__c.props !== a;
      return u.forEach(function(f) {
        if (f.__N) {
          var p = f.__[0];
          f.__ = f.__N, f.__N = void 0, p !== f.__[0] && (d = !0);
        }
      }), s && s.call(this, a, l, c) || d;
    };
    Y.__f = !0;
    var s = Y.shouldComponentUpdate, o = Y.componentWillUpdate;
    Y.componentWillUpdate = function(a, l, c) {
      if (this.__e) {
        var u = s;
        s = void 0, r(a, l, c), s = u;
      }
      o && o.call(this, a, l, c);
    }, Y.shouldComponentUpdate = r;
  }
  return i.__N || i.__;
}
function L(n, e) {
  var t = ii(Ht++, 3);
  !te.__s && ko(t.__H, e) && (t.__ = n, t.u = e, Y.__H.__h.push(t));
}
function dg(n, e) {
  var t = ii(Ht++, 4);
  !te.__s && ko(t.__H, e) && (t.__ = n, t.u = e, Y.__h.push(t));
}
function F(n) {
  return gn = 5, De(function() {
    return { current: n };
  }, []);
}
function hg(n, e, t) {
  gn = 6, dg(function() {
    if (typeof n == "function") {
      var i = n(e());
      return function() {
        n(null), i && typeof i == "function" && i();
      };
    }
    if (n)
      return n.current = e(), function() {
        return n.current = null;
      };
  }, t == null ? t : t.concat(n));
}
function De(n, e) {
  var t = ii(Ht++, 7);
  return ko(t.__H, e) && (t.__ = n(), t.__H = e, t.__h = n), t.__;
}
function Ga(n, e) {
  return gn = 8, De(function() {
    return n;
  }, e);
}
function Co(n) {
  var e = Y.context[n.__c], t = ii(Ht++, 9);
  return t.c = n, e ? (t.__ == null && (t.__ = !0, e.sub(Y)), e.props.value) : n.__;
}
function fg() {
  for (var n; n = Wu.shift(); )
    if (n.__P && n.__H)
      try {
        n.__H.__h.forEach(Di), n.__H.__h.forEach(Rs), n.__H.__h = [];
      } catch (e) {
        n.__H.__h = [], te.__e(e, n.__v);
      }
}
te.__b = function(n) {
  Y = null, ja && ja(n);
}, te.__ = function(n, e) {
  n && e.__k && e.__k.__m && (n.__m = e.__k.__m), Ja && Ja(n, e);
}, te.__r = function(n) {
  Wa && Wa(n), Ht = 0;
  var e = (Y = n.__c).__H;
  e && (Ur === Y ? (e.__h = [], Y.__h = [], e.__.forEach(function(t) {
    t.__N && (t.__ = t.__N), t.u = t.__N = void 0;
  })) : (e.__h.forEach(Di), e.__h.forEach(Rs), e.__h = [], Ht = 0)), Ur = Y;
}, te.diffed = function(n) {
  Ua && Ua(n);
  var e = n.__c;
  e && e.__H && (e.__H.__h.length && (Wu.push(e) !== 1 && Ha === te.requestAnimationFrame || ((Ha = te.requestAnimationFrame) || pg)(fg)), e.__H.__.forEach(function(t) {
    t.u && (t.__H = t.u), t.u = void 0;
  })), Ur = Y = null;
}, te.__c = function(n, e) {
  e.some(function(t) {
    try {
      t.__h.forEach(Di), t.__h = t.__h.filter(function(i) {
        return !i.__ || Rs(i);
      });
    } catch (i) {
      e.some(function(r) {
        r.__h && (r.__h = []);
      }), e = [], te.__e(i, t.__v);
    }
  }), qa && qa(n, e);
}, te.unmount = function(n) {
  Ka && Ka(n);
  var e, t = n.__c;
  t && t.__H && (t.__H.__.forEach(function(i) {
    try {
      Di(i);
    } catch (r) {
      e = r;
    }
  }), t.__H = void 0, e && te.__e(e, t.__v));
};
var Xa = typeof requestAnimationFrame == "function";
function pg(n) {
  var e, t = function() {
    clearTimeout(i), Xa && cancelAnimationFrame(e), setTimeout(n);
  }, i = setTimeout(t, 35);
  Xa && (e = requestAnimationFrame(t));
}
function Di(n) {
  var e = Y, t = n.__c;
  typeof t == "function" && (n.__c = void 0, t()), Y = e;
}
function Rs(n) {
  var e = Y;
  n.__c = n.__(), Y = e;
}
function ko(n, e) {
  return !n || n.length !== e.length || e.some(function(t, i) {
    return t !== n[i];
  });
}
function Uu(n, e) {
  return typeof e == "function" ? e(n) : e;
}
var mg = Symbol.for("preact-signals");
function xo() {
  if (dn > 1)
    dn--;
  else {
    for (var n, e = !1; Dn !== void 0; ) {
      var t = Dn;
      for (Dn = void 0, Ps++; t !== void 0; ) {
        var i = t.o;
        if (t.o = void 0, t.f &= -3, !(8 & t.f) && Ju(t))
          try {
            t.c();
          } catch (r) {
            e || (n = r, e = !0);
          }
        t = i;
      }
    }
    if (Ps = 0, dn--, e)
      throw n;
  }
}
var j = void 0;
function qu(n) {
  var e = j;
  j = void 0;
  try {
    return n();
  } finally {
    j = e;
  }
}
var Dn = void 0, dn = 0, Ps = 0, ji = 0;
function Ku(n) {
  if (j !== void 0) {
    var e = n.n;
    if (e === void 0 || e.t !== j)
      return e = { i: 0, S: n, p: j.s, n: void 0, t: j, e: void 0, x: void 0, r: e }, j.s !== void 0 && (j.s.n = e), j.s = e, n.n = e, 32 & j.f && n.S(e), e;
    if (e.i === -1)
      return e.i = 0, e.n !== void 0 && (e.n.p = e.p, e.p !== void 0 && (e.p.n = e.n), e.p = j.s, e.n = void 0, j.s.n = e, j.s = e), e;
  }
}
function ye(n, e) {
  this.v = n, this.i = 0, this.n = void 0, this.t = void 0, this.W = e == null ? void 0 : e.watched, this.Z = e == null ? void 0 : e.unwatched, this.name = e == null ? void 0 : e.name;
}
ye.prototype.brand = mg;
ye.prototype.h = function() {
  return !0;
};
ye.prototype.S = function(n) {
  var e = this, t = this.t;
  t !== n && n.e === void 0 && (n.x = t, this.t = n, t !== void 0 ? t.e = n : qu(function() {
    var i;
    (i = e.W) == null || i.call(e);
  }));
};
ye.prototype.U = function(n) {
  var e = this;
  if (this.t !== void 0) {
    var t = n.e, i = n.x;
    t !== void 0 && (t.x = i, n.e = void 0), i !== void 0 && (i.e = t, n.x = void 0), n === this.t && (this.t = i, i === void 0 && qu(function() {
      var r;
      (r = e.Z) == null || r.call(e);
    }));
  }
};
ye.prototype.subscribe = function(n) {
  var e = this;
  return Mo(function() {
    var t = e.value, i = j;
    j = void 0;
    try {
      n(t);
    } finally {
      j = i;
    }
  }, { name: "sub" });
};
ye.prototype.valueOf = function() {
  return this.value;
};
ye.prototype.toString = function() {
  return this.value + "";
};
ye.prototype.toJSON = function() {
  return this.value;
};
ye.prototype.peek = function() {
  var n = j;
  j = void 0;
  try {
    return this.value;
  } finally {
    j = n;
  }
};
Object.defineProperty(ye.prototype, "value", { get: function() {
  var n = Ku(this);
  return n !== void 0 && (n.i = this.i), this.v;
}, set: function(n) {
  if (n !== this.v) {
    if (Ps > 100)
      throw new Error("Cycle detected");
    this.v = n, this.i++, ji++, dn++;
    try {
      for (var e = this.t; e !== void 0; e = e.x)
        e.t.N();
    } finally {
      xo();
    }
  }
} });
function X(n, e) {
  return new ye(n, e);
}
function Ju(n) {
  for (var e = n.s; e !== void 0; e = e.n)
    if (e.S.i !== e.i || !e.S.h() || e.S.i !== e.i)
      return !0;
  return !1;
}
function Gu(n) {
  for (var e = n.s; e !== void 0; e = e.n) {
    var t = e.S.n;
    if (t !== void 0 && (e.r = t), e.S.n = e, e.i = -1, e.n === void 0) {
      n.s = e;
      break;
    }
  }
}
function Xu(n) {
  for (var e = n.s, t = void 0; e !== void 0; ) {
    var i = e.p;
    e.i === -1 ? (e.S.U(e), i !== void 0 && (i.n = e.n), e.n !== void 0 && (e.n.p = i)) : t = e, e.S.n = e.r, e.r !== void 0 && (e.r = void 0), e = i;
  }
  n.s = t;
}
function Jt(n, e) {
  ye.call(this, void 0), this.x = n, this.s = void 0, this.g = ji - 1, this.f = 4, this.W = e == null ? void 0 : e.watched, this.Z = e == null ? void 0 : e.unwatched, this.name = e == null ? void 0 : e.name;
}
Jt.prototype = new ye();
Jt.prototype.h = function() {
  if (this.f &= -3, 1 & this.f)
    return !1;
  if ((36 & this.f) == 32 || (this.f &= -5, this.g === ji))
    return !0;
  if (this.g = ji, this.f |= 1, this.i > 0 && !Ju(this))
    return this.f &= -2, !0;
  var n = j;
  try {
    Gu(this), j = this;
    var e = this.x();
    (16 & this.f || this.v !== e || this.i === 0) && (this.v = e, this.f &= -17, this.i++);
  } catch (t) {
    this.v = t, this.f |= 16, this.i++;
  }
  return j = n, Xu(this), this.f &= -2, !0;
};
Jt.prototype.S = function(n) {
  if (this.t === void 0) {
    this.f |= 36;
    for (var e = this.s; e !== void 0; e = e.n)
      e.S.S(e);
  }
  ye.prototype.S.call(this, n);
};
Jt.prototype.U = function(n) {
  if (this.t !== void 0 && (ye.prototype.U.call(this, n), this.t === void 0)) {
    this.f &= -33;
    for (var e = this.s; e !== void 0; e = e.n)
      e.S.U(e);
  }
};
Jt.prototype.N = function() {
  if (!(2 & this.f)) {
    this.f |= 6;
    for (var n = this.t; n !== void 0; n = n.x)
      n.t.N();
  }
};
Object.defineProperty(Jt.prototype, "value", { get: function() {
  if (1 & this.f)
    throw new Error("Cycle detected");
  var n = Ku(this);
  if (this.h(), n !== void 0 && (n.i = this.i), 16 & this.f)
    throw this.v;
  return this.v;
} });
function So(n, e) {
  return new Jt(n, e);
}
function Yu(n) {
  var e = n.u;
  if (n.u = void 0, typeof e == "function") {
    dn++;
    var t = j;
    j = void 0;
    try {
      e();
    } catch (i) {
      throw n.f &= -2, n.f |= 8, To(n), i;
    } finally {
      j = t, xo();
    }
  }
}
function To(n) {
  for (var e = n.s; e !== void 0; e = e.n)
    e.S.U(e);
  n.x = void 0, n.s = void 0, Yu(n);
}
function gg(n) {
  if (j !== this)
    throw new Error("Out-of-order effect");
  Xu(this), j = n, this.f &= -2, 8 & this.f && To(this), xo();
}
function Sn(n, e) {
  this.x = n, this.u = void 0, this.s = void 0, this.o = void 0, this.f = 32, this.name = e == null ? void 0 : e.name;
}
Sn.prototype.c = function() {
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
Sn.prototype.S = function() {
  if (1 & this.f)
    throw new Error("Cycle detected");
  this.f |= 1, this.f &= -9, Yu(this), Gu(this), dn++;
  var n = j;
  return j = this, gg.bind(this, n);
};
Sn.prototype.N = function() {
  2 & this.f || (this.f |= 2, this.o = Dn, Dn = this);
};
Sn.prototype.d = function() {
  this.f |= 8, 1 & this.f || To(this);
};
Sn.prototype.dispose = function() {
  this.d();
};
function Mo(n, e) {
  var t = new Sn(n, e);
  try {
    t.c();
  } catch (r) {
    throw t.d(), r;
  }
  var i = t.d.bind(t);
  return i[Symbol.dispose] = i, i;
}
var ur, qr;
function Tn(n, e) {
  R[n] = e.bind(null, R[n] || function() {
  });
}
function Wi(n) {
  qr && qr(), qr = n && n.S();
}
function Zu(n) {
  var e = this, t = n.data, i = $(t);
  i.value = t;
  var r = De(function() {
    for (var s = e.__v; s = s.__; )
      if (s.__c) {
        s.__c.__$f |= 4;
        break;
      }
    return e.__$u.c = function() {
      var o, a = e.__$u.S(), l = r.value;
      a(), _u(l) || ((o = e.base) == null ? void 0 : o.nodeType) !== 3 ? (e.__$f |= 1, e.setState({})) : e.base.data = l;
    }, So(function() {
      var o = i.value.value;
      return o === 0 ? 0 : o === !0 ? "" : o || "";
    });
  }, []);
  return r.value;
}
Zu.displayName = "_st";
Object.defineProperties(ye.prototype, { constructor: { configurable: !0, value: void 0 }, type: { configurable: !0, value: Zu }, props: { configurable: !0, get: function() {
  return { data: this };
} }, __b: { configurable: !0, value: 1 } });
Tn("__b", function(n, e) {
  if (typeof e.type == "string") {
    var t, i = e.props;
    for (var r in i)
      if (r !== "children") {
        var s = i[r];
        s instanceof ye && (t || (e.__np = t = {}), t[r] = s, i[r] = s.peek());
      }
  }
  n(e);
});
Tn("__r", function(n, e) {
  Wi();
  var t, i = e.__c;
  i && (i.__$f &= -2, (t = i.__$u) === void 0 && (i.__$u = t = function(r) {
    var s;
    return Mo(function() {
      s = this;
    }), s.c = function() {
      i.__$f |= 1, i.setState({});
    }, s;
  }())), ur = i, Wi(t), n(e);
});
Tn("__e", function(n, e, t, i) {
  Wi(), ur = void 0, n(e, t, i);
});
Tn("diffed", function(n, e) {
  Wi(), ur = void 0;
  var t;
  if (typeof e.type == "string" && (t = e.__e)) {
    var i = e.__np, r = e.props;
    if (i) {
      var s = t.U;
      if (s)
        for (var o in s) {
          var a = s[o];
          a !== void 0 && !(o in i) && (a.d(), s[o] = void 0);
        }
      else
        t.U = s = {};
      for (var l in i) {
        var c = s[l], u = i[l];
        c === void 0 ? (c = vg(t, l, u, r), s[l] = c) : c.o(u, r);
      }
    }
  }
  n(e);
});
function vg(n, e, t, i) {
  var r = e in n && n.ownerSVGElement === void 0, s = X(t);
  return { o: function(o, a) {
    s.value = o, i = a;
  }, d: Mo(function() {
    var o = s.value.value;
    i[e] !== o && (i[e] = o, r ? n[e] = o : o ? n.setAttribute(e, o) : n.removeAttribute(e));
  }) };
}
Tn("unmount", function(n, e) {
  if (typeof e.type == "string") {
    var t = e.__e;
    if (t) {
      var i = t.U;
      if (i) {
        t.U = void 0;
        for (var r in i) {
          var s = i[r];
          s && s.d();
        }
      }
    }
  } else {
    var o = e.__c;
    if (o) {
      var a = o.__$u;
      a && (o.__$u = void 0, a.d());
    }
  }
  n(e);
});
Tn("__h", function(n, e, t, i) {
  (i < 3 || i === 9) && (e.__$f |= 2), n(e, t, i);
});
ze.prototype.shouldComponentUpdate = function(n, e) {
  var t = this.__$u, i = t && t.s !== void 0;
  for (var r in e)
    return !0;
  if (this.__f || typeof this.u == "boolean" && this.u === !0) {
    if (!(i || 2 & this.__$f || 4 & this.__$f) || 1 & this.__$f)
      return !0;
  } else if (!(i || 4 & this.__$f) || 3 & this.__$f)
    return !0;
  for (var s in n)
    if (s !== "__source" && n[s] !== this.props[s])
      return !0;
  for (var o in this.props)
    if (!(o in n))
      return !0;
  return !1;
};
function $(n) {
  return De(function() {
    return X(n);
  }, []);
}
function ve(n) {
  var e = F(n);
  return e.current = n, ur.__$f |= 4, De(function() {
    return So(function() {
      return e.current();
    });
  }, []);
}
const Qu = () => /* @__PURE__ */ h("svg", { viewBox: "0 0 1024 1024", version: "1.1", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ h("path", { d: "M843.904 783.573333 783.573333 843.904 512.042667 572.373333 240.512 843.904 180.181333 783.573333 451.712 512.042667 180.181333 240.512 240.512 180.181333 512.042667 451.712 783.573333 180.181333 843.904 240.512 572.373333 512.042667 843.904 783.573333Z" }) }), yg = () => /* @__PURE__ */ h(
  "svg",
  {
    className: "icon",
    viewBox: "0 0 1024 1024",
    version: "1.1",
    xmlns: "http://www.w3.org/2000/svg",
    children: /* @__PURE__ */ h("path", { d: "M900.64 379.808l-263.072-256.032c-36.448-35.328-105.76-35.392-142.304 0.096l-327.04 319.904c-56.416 54.72-70.72 76.704-70.72 150.976l0 143.936c0 132.768 26.976 192 186.912 192l131.872 0c81.12 0 128.448-46.656 193.952-111.264l290.016-297.696c18.592-17.984 29.248-43.968 29.248-71.264C929.504 423.36 918.976 397.6 900.64 379.808zM323.008 786.752c-52.928 0-96-43.072-96-96s43.072-96 96-96 96 43.072 96 96S375.936 786.752 323.008 786.752z" })
  }
), ed = (n) => /* @__PURE__ */ h(
  "svg",
  {
    viewBox: "0 0 1024 1024",
    id: "send",
    className: n.className,
    version: "1.1",
    xmlns: "http://www.w3.org/2000/svg",
    children: /* @__PURE__ */ h("path", { d: "M931.4 498.9L94.9 79.5c-3.4-1.7-7.3-2.1-11-1.2-8.5 2.1-13.8 10.7-11.7 19.3l86.2 352.2c1.3 5.3 5.2 9.6 10.4 11.3l147.7 50.7-147.6 50.7c-5.2 1.8-9.1 6-10.3 11.3L72.2 926.5c-0.9 3.7-0.5 7.6 1.2 10.9 3.9 7.9 13.5 11.1 21.5 7.2l836.5-417c3.1-1.5 5.6-4.1 7.2-7.1 3.9-8 0.7-17.6-7.2-21.6zM170.8 826.3l50.3-205.6 295.2-101.3c2.3-0.8 4.2-2.6 5-5 1.4-4.2-0.8-8.7-5-10.2L221.1 403 171 198.2l628 314.9-628.2 313.2z" })
  }
), bg = () => /* @__PURE__ */ h("svg", { viewBox: "0 0 1024 1024", version: "1.1", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ h("path", { d: "M962 197.61H747v-60c0-55.14-44.86-100-100-100H377c-55.14 0-100 44.86-100 100v60H62c-11.05 0-20 8.95-20 20s8.95 20 20 20h60v630.57c0 66.17 53.83 120 120 120h540c66.17 0 120-53.83 120-120V237.61h60c11.05 0 20-8.95 20-20s-8.95-20-20-20zM637.34 457.66v260c0 12.01-10.72 21.63-23.06 19.77-9.84-1.48-16.94-10.25-16.94-20.2V458.09c0-9.95 7.1-18.72 16.94-20.2 12.34-1.86 23.06 7.76 23.06 19.77z m-210.68 0v260c0 11-9 20-20 20s-20-9-20-20v-260c0-11 9-20 20-20s20 9 20 20zM317 137.61c0-33.08 26.92-60 60-60h270c33.08 0 60 26.92 60 60v60H317v-60z" }) }), Ls = () => /* @__PURE__ */ h("svg", { viewBox: "0 0 1024 1024", version: "1.1", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ h("path", { d: "M511.582491 63.413262C265.134543 63.413262 64.62588 263.921925 64.62588 510.369873s200.508663 446.957635 446.957635 446.957635 446.957635-200.508663 446.957635-446.957635S758.031463 63.413262 511.582491 63.413262zM509.001713 751.859903c-98.517781 0-182.467775-62.623269-214.771505-150.056598l0.327458-0.134053c-2.007727-4.036943-3.38305-8.422833-3.38305-13.237489 0-16.647145 13.494339-30.142507 30.142507-30.142507 13.389962 0 24.358781 8.877181 28.2893 20.955264l0.422625-0.172939c23.269983 65.442478 85.645612 112.503307 158.972665 112.503307 93.106538 0 168.845523-75.738985 168.845523-168.845523s-75.738985-168.845523-168.845523-168.845523c-20.432355 0-39.874149 3.980661-58.013275 10.66899l21.248953 40.742936c2.486634 2.677992 4.0175 6.2831 4.0175 10.243295 0 8.417717-8.404414 14.921851-15.365966 15.07023-0.102331 0-0.206708 0-0.309038 0-0.220011 0-0.427742 0-0.647753-0.013303l-150.579507-6.463202c-5.372358-0.234337-10.229992-3.310396-12.716626-8.093329-2.486634-4.76963-2.236947-10.509355 0.647753-15.055904l80.890308-127.179564c2.8847-4.533246 8.006348-7.151887 13.365402-6.960529 5.372358 0.234337 10.227945 3.312442 12.71458 8.095375l18.580171 35.625382c26.629497-10.855232 55.683207-16.963347 86.168522-16.963347 126.338407 0 229.130537 102.791108 229.130537 229.130537S635.340119 751.859903 509.001713 751.859903z" }) }), wg = () => /* @__PURE__ */ h(
  "svg",
  {
    className: "icon",
    viewBox: "0 0 1024 1024",
    version: "1.1",
    xmlns: "http://www.w3.org/2000/svg",
    width: "16",
    height: "16",
    children: [
      /* @__PURE__ */ h("path", { d: "M746.932 698.108", fill: "#A9B7B7" }),
      /* @__PURE__ */ h(
        "path",
        {
          d: "M925.731 288.698c-1.261-1.18-3.607-3.272-6.902-6.343-5.486-5.112-11.615-10.758-18.236-16.891-18.921-17.526-38.003-35.028-56.046-51.397-2.038-1.848-2.038-1.835-4.077-3.682-24.075-21.795-44.156-39.556-58.996-52.076-8.682-7.325-15.517-12.807-20.539-16.426-3.333-2.402-6.043-4.13-8.715-5.396-3.365-1.595-6.48-2.566-10.905-2.483C729.478 134.227 720 143.77 720 155.734l0 42.475 0 42.475 0 84.95L720 347l21.205 0L890 347l0 595L358.689 942C323.429 942 295 913.132 295 877.922L295 177l361.205 0c11.736 0 21.25-9.771 21.25-21.5s-9.514-21.5-21.25-21.5l-382.5 0L252 134l0 21.734L252 813l-52.421 0C166.646 813 140 786.928 140 754.678L140 72l566.286 0C739.29 72 766 98.154 766 130.404L766 134l40 0 0-3.596C806 76.596 761.271 33 706.286 33L119.958 33 100 33l0 19.506 0 702.172C100 808.463 144.642 852 199.579 852L252 852l0 25.922C252 936.612 299.979 984 358.689 984l552.515 0L932 984l0-21.237L932 325.635 932 304l0.433 0C932.432 299 930.196 292.878 925.731 288.698zM762 304l0-63.315L762 198.21l0-0.273c14 11.479 30.3 26.369 49.711 43.942 2.022 1.832 2.136 1.832 4.157 3.665 17.923 16.259 36.957 33.492 55.779 50.926 2.878 2.666 5.713 5.531 8.391 7.531L762 304.001z",
          fill: "currentColor"
        }
      ),
      /* @__PURE__ */ h(
        "path",
        {
          d: "M816.936 436 407.295 436c-10.996 0-19.91 8.727-19.91 19.5 0 10.77 8.914 19.5 19.91 19.5l409.641 0c11 0 19.914-8.73 19.914-19.5C836.85 444.727 827.936 436 816.936 436z",
          fill: "currentColor"
        }
      ),
      /* @__PURE__ */ h(
        "path",
        {
          d: "M816.936 553 407.295 553c-10.996 0-19.91 8.727-19.91 19.5 0 10.774 8.914 19.5 19.91 19.5l409.641 0c11 0 19.914-8.726 19.914-19.5C836.85 561.727 827.936 553 816.936 553z",
          fill: "currentColor"
        }
      ),
      /* @__PURE__ */ h(
        "path",
        {
          d: "M816.936 689 407.295 689c-10.996 0-19.91 8.729-19.91 19.503 0 10.769 8.914 19.497 19.91 19.497l409.641 0c11 0 19.914-8.729 19.914-19.497C836.85 697.729 827.936 689 816.936 689z",
          fill: "currentColor"
        }
      )
    ]
  }
), td = () => /* @__PURE__ */ h("svg", { viewBox: "0 0 1024 1024", version: "1.1", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ h("path", { d: "M547.4 197.4v46l200.3 0.1L546.1 444l32.4 32.6 201.9-200.7v200.9h46V197.5zM471.4 584.4l-32.6-32.6L243.6 747V547.9h-46v278.7h279v-46H275z" }) }), nd = () => /* @__PURE__ */ h("svg", { viewBox: "0 0 1024 1024", version: "1.1", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ h("path", { d: "M544 480V282.944h52.224l0.064 107.968L763.072 224l36.928 36.928-166.976 166.976 108.032-0.128V480H544zM260.928 800l-36.928-36.928 166.912-166.784-107.968-0.064V544H480v197.056h-52.224l0.064-107.968L260.928 800z" }) }), Cg = () => /* @__PURE__ */ h("svg", { viewBox: "0 0 1024 1024", version: "1.1", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ h("path", { d: "M960 544H64a32 32 0 1 1 0-64h896a32 32 0 1 1 0 64" }) }), kg = () => /* @__PURE__ */ h("svg", { viewBox: "0 0 1024 1024", version: "1.1", xmlns: "http://www.w3.org/2000/svg", children: [
  /* @__PURE__ */ h("path", { d: "M481.0752 263.3728l50.9952 1.024 1.8432-105.8816-50.9952-0.8192z" }),
  /* @__PURE__ */ h("path", { d: "M486.441426 180.895362a66.56 66.56 0 1 0 42.091944-126.290153 66.56 66.56 0 1 0-42.091944 126.290153Z" }),
  /* @__PURE__ */ h("path", { d: "M138.8544 664.3712c-52.8384 0-95.8464-43.008-95.8464-95.8464s43.008-95.8464 95.8464-95.8464M880.0256 472.6784c52.8384 0 95.8464 43.008 95.8464 95.8464s-43.008 95.8464-95.8464 95.8464" }),
  /* @__PURE__ */ h("path", { d: "M507.4944 220.5696c-220.16 0-398.7456 162.816-398.7456 363.7248s178.5856 363.7248 398.7456 363.7248 398.7456-162.816 398.7456-363.7248-178.5856-363.7248-398.7456-363.7248z m0 559.9232c-166.2976 0-301.2608-100.5568-301.2608-224.4608s134.9632-224.4608 301.2608-224.4608S808.7552 432.128 808.7552 556.032 673.792 780.4928 507.4944 780.4928z" }),
  /* @__PURE__ */ h("path", { d: "M319.6928 556.032a47.9232 38.912 90 1 0 77.824 0 47.9232 38.912 90 1 0-77.824 0Z" }),
  /* @__PURE__ */ h("path", { d: "M617.472 556.032a47.9232 38.912 90 1 0 77.824 0 47.9232 38.912 90 1 0-77.824 0Z" })
] }), xg = () => /* @__PURE__ */ h("svg", { viewBox: "0 0 18 18", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
  /* @__PURE__ */ h(
    "path",
    {
      d: "M5.856 17.121a.979.979 0 0 1-.327-.06.839.839 0 0 1-.283-.177.739.739 0 0 1-.187-.255.724.724 0 0 1-.07-.303l-.02-1.609a4.663 4.663 0 0 1-1.446-.455 4.252 4.252 0 0 1-.637-.401c-.199-.146-.385-.31-.553-.492a4.442 4.442 0 0 1-.45-.577 4.303 4.303 0 0 1-.327-.637 3.823 3.823 0 0 1-.206-.686 3.729 3.729 0 0 1-.064-.704V6.478c0-.261.025-.516.077-.771a4.43 4.43 0 0 1 .244-.747 4.062 4.062 0 0 1 .932-1.28c.2-.183.418-.347.65-.493.23-.145.482-.267.739-.364a4.21 4.21 0 0 1 .81-.225c.27-.054.553-.078.835-.078H8.55c.103 0 .2.018.29.054a.7.7 0 0 1 .411.376.667.667 0 0 1-.161.766.736.736 0 0 1-.25.151.764.764 0 0 1-.29.055H5.573c-.186 0-.366.012-.54.049-.18.03-.353.079-.52.145-.167.061-.328.14-.482.237-.148.091-.29.2-.418.316a2.897 2.897 0 0 0-.347.388c-.097.14-.187.286-.257.444a2.473 2.473 0 0 0-.206.977v4.287c0 .17.013.333.051.503a2.549 2.549 0 0 0 .772 1.33 2.721 2.721 0 0 0 .913.559c.167.066.347.115.527.152.18.03.36.048.546.048a.904.904 0 0 1 .61.23.848.848 0 0 1 .194.262.84.84 0 0 1 .07.303l.007.99 1.915-1.293a2.877 2.877 0 0 1 1.64-.492h2.372c.186 0 .366-.018.54-.048.18-.03.353-.08.52-.146.168-.067.329-.146.483-.237.148-.091.29-.2.418-.316.128-.121.244-.249.347-.388a2.8 2.8 0 0 0 .257-.444 2.47 2.47 0 0 0 .206-.977V8.585a.646.646 0 0 1 .225-.492.679.679 0 0 1 .244-.152.814.814 0 0 1 .585 0c.09.03.174.085.244.152a.657.657 0 0 1 .225.492V10.8c0 .261-.032.516-.083.771a4.192 4.192 0 0 1-.245.74c-.109.244-.244.468-.398.687a3.735 3.735 0 0 1-.534.6c-.2.183-.418.347-.65.493a4.134 4.134 0 0 1-.738.364 4.7 4.7 0 0 1-.81.225c-.27.054-.553.079-.836.079h-1.877c-.604 0-1.144.164-1.633.491l-2.54 1.713a.913.913 0 0 1-.514.157z",
      fill: "currentColor"
    }
  ),
  /* @__PURE__ */ h(
    "path",
    {
      d: "M15.866 4.125h-4.174c-.41 0-.741.313-.741.7 0 .387.332.7.741.7h4.174c.41 0 .742-.313.742-.7 0-.387-.332-.7-.742-.7z",
      fill: "currentColor"
    }
  ),
  /* @__PURE__ */ h(
    "path",
    {
      d: "M14.537 2.932c0-.396-.34-.717-.759-.717s-.758.32-.758.717v3.786c0 .396.34.717.758.717.42 0 .76-.321.76-.717V2.932z",
      fill: "currentColor"
    }
  )
] }), id = () => /* @__PURE__ */ h(
  "svg",
  {
    viewBox: "64 64 896 896",
    focusable: "false",
    width: "1em",
    height: "1em",
    fill: "currentColor",
    "aria-hidden": "true",
    children: /* @__PURE__ */ h("path", { d: "M842 454c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8 0 140.3-113.7 254-254 254S258 594.3 258 454c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8 0 168.7 126.6 307.9 290 327.6V884H326.7c-13.7 0-24.7 14.3-24.7 32v36c0 4.4 2.8 8 6.2 8h407.6c3.4 0 6.2-3.6 6.2-8v-36c0-17.7-11-32-24.7-32H548V782.1c165.3-18 294-158 294-328.1zM512 624c93.9 0 170-75.2 170-168V232c0-92.8-76.1-168-170-168s-170 75.2-170 168v224c0 92.8 76.1 168 170 168zm-94-392c0-50.6 41.9-92 94-92s94 41.4 94 92v224c0 50.6-41.9 92-94 92s-94-41.4-94-92V232z" })
  }
), rd = () => /* @__PURE__ */ h(
  "svg",
  {
    fill: "currentColor",
    viewBox: "0 0 1000 1000",
    xmlns: "http://www.w3.org/2000/svg",
    xmlnsXlink: "http://www.w3.org/1999/xlink",
    children: Array.from({ length: 4 }).map((a, l) => {
      const u = l * (146.66666666666666 + 140), d = 1e3 / 2 - 250 / 2, f = 1e3 / 2 - 500 / 2;
      return /* @__PURE__ */ h(
        "rect",
        {
          fill: "currentColor",
          rx: 70,
          ry: 70,
          height: 250,
          width: 140,
          x: u,
          y: d,
          children: [
            /* @__PURE__ */ h(
              "animate",
              {
                attributeName: "height",
                values: "250; 500; 250",
                keyTimes: "0; 0.5; 1",
                dur: "".concat(0.8, "s"),
                begin: "".concat(0.8 / 4 * l, "s"),
                repeatCount: "indefinite"
              }
            ),
            /* @__PURE__ */ h(
              "animate",
              {
                attributeName: "y",
                values: "".concat(d, "; ").concat(f, "; ").concat(d),
                keyTimes: "0; 0.5; 1",
                dur: "".concat(0.8, "s"),
                begin: "".concat(0.8 / 4 * l, "s"),
                repeatCount: "indefinite"
              }
            )
          ]
        },
        l
      );
    })
  }
), Sg = (n) => /* @__PURE__ */ h(
  "svg",
  {
    className: n.className,
    onClick: n.onClick,
    viewBox: "0 0 1024 1024",
    version: "1.1",
    xmlns: "http://www.w3.org/2000/svg",
    children: /* @__PURE__ */ h("path", { d: "M128 384a128 128 0 1 1 0 256 128 128 0 0 1 0-256z m768 0a128 128 0 1 1 0 256 128 128 0 0 1 0-256z m-372.4288 0a128 128 0 1 1 0 256 128 128 0 0 1 0-256z" })
  }
), Tg = (n) => /* @__PURE__ */ h(
  "svg",
  {
    className: n.className,
    viewBox: "0 0 1024 1024",
    version: "1.1",
    xmlns: "http://www.w3.org/2000/svg",
    children: /* @__PURE__ */ h("path", { d: "M498.33984 607.8464c-10.99776-32.9728-50.09408-73.5232-82.6368-85.74976L150.9376 422.8096c-38.54336-14.4384-36.98688-69.46816 2.27328-81.73568L844.92288 124.90752c33.30048-10.40384 64.57344 20.8896 54.1696 54.1696L682.92608 870.78912a43.2128 43.2128 0 0 1-81.36704 3.25632 121682.5344 121682.5344 0 0 1-103.2192-266.19904z" })
  }
), sd = () => /* @__PURE__ */ h(
  "svg",
  {
    className: "icon",
    viewBox: "0 0 1024 1024",
    version: "1.1",
    xmlns: "http://www.w3.org/2000/svg",
    children: /* @__PURE__ */ h("path", { d: "M972.657609 209.348408C987.158609 209.36839 998.930114 197.571202 998.949999 182.99865 998.969882 168.426097 987.230618 156.59651 972.729617 156.576528L32.457975 155.280806C17.956974 155.260823 6.18547 167.058012 6.165585 181.630564 6.1457 196.203116 17.884965 208.032703 32.385966 208.052686L972.657609 209.348408ZM180.466902 992.356169 180.466902 1019.014859 206.993296 1018.74074 833.361858 1012.267947 859.348284 1011.999407 859.348284 985.883377 859.348284 289.397297C859.348284 274.824732 847.59289 263.011332 833.091874 263.011332 818.590859 263.011332 806.835465 274.824732 806.835465 289.397297L806.835465 985.883377 832.82189 959.498805 206.453329 965.971599 232.979723 992.356169 232.979723 282.67005C232.979723 268.097483 221.224329 256.284085 206.723313 256.284085 192.222298 256.284085 180.466902 268.097483 180.466902 282.67005L180.466902 992.356169ZM656.410257 847.079027C656.410257 861.651593 668.165651 873.464992 682.666667 873.464992 697.167682 873.464992 708.923076 861.651593 708.923076 847.079027L708.923076 372.131659C708.923076 357.559091 697.167682 345.745694 682.666667 345.745694 668.165651 345.745694 656.410257 357.559091 656.410257 372.131659L656.410257 847.079027ZM341.333333 847.079027C341.333333 861.651593 353.08873 873.464992 367.589743 873.464992 382.090758 873.464992 393.846155 861.651593 393.846155 847.079027L393.846155 372.131659C393.846155 357.559091 382.090758 345.745694 367.589743 345.745694 353.08873 345.745694 341.333333 357.559091 341.333333 372.131659L341.333333 847.079027ZM498.871795 847.079027C498.871795 861.651593 510.627189 873.464992 525.128205 873.464992 539.62922 873.464992 551.384614 861.651593 551.384614 847.079027L551.384614 372.131659C551.384614 357.559091 539.62922 345.745694 525.128205 345.745694 510.627189 345.745694 498.871795 357.559091 498.871795 372.131659L498.871795 847.079027ZM392.147755 116.721777C392.147755 102.063669 403.758665 90.363507 418.40134 90.363507L622.925796 90.363507C637.408947 90.363507 649.179381 102.1619 649.179381 116.549585L649.179381 171.644875 701.692203 171.644875 701.692203 116.549585C701.692203 72.986607 666.38105 37.591577 622.925796 37.591577L418.40134 37.591577C374.724427 37.591577 339.634933 72.950804 339.634933 116.721777L339.634933 165.310801 392.147755 165.310801 392.147755 116.721777Z" })
  }
), Mg = (n) => /* @__PURE__ */ h(
  "svg",
  {
    className: n.className,
    width: "16",
    height: "16",
    viewBox: "0 0 50 50",
    xmlns: "http://www.w3.org/2000/svg",
    children: /* @__PURE__ */ h(
      "circle",
      {
        cx: "25",
        cy: "25",
        r: "20",
        stroke: "currentColor",
        strokeWidth: "5",
        fill: "none",
        strokeDasharray: "31.415, 31.415",
        strokeLinecap: "round",
        children: /* @__PURE__ */ h(
          "animateTransform",
          {
            attributeName: "transform",
            type: "rotate",
            from: "0 25 25",
            to: "360 25 25",
            dur: "1s",
            repeatCount: "indefinite"
          }
        )
      }
    )
  }
), _g = () => /* @__PURE__ */ h(
  "svg",
  {
    className: "icon",
    viewBox: "0 0 1024 1024",
    version: "1.1",
    xmlns: "http://www.w3.org/2000/svg",
    width: "16",
    height: "16",
    children: [
      /* @__PURE__ */ h(
        "path",
        {
          d: "M512 61.44a40.96 40.96 0 0 1 40.96 40.96v122.88a40.96 40.96 0 1 1-81.92 0V102.4A40.96 40.96 0 0 1 512 61.44z",
          fill: "currentColor",
          opacity: ".9"
        }
      ),
      /* @__PURE__ */ h(
        "path",
        {
          d: "M737.28 121.792a40.96 40.96 0 0 1 14.992 55.952l-61.44 106.432a40.96 40.96 0 1 1-70.944-40.96l61.44-106.432a40.96 40.96 0 0 1 55.952-14.992z",
          fill: "currentColor",
          opacity: ".8"
        }
      ),
      /* @__PURE__ */ h(
        "path",
        {
          d: "M902.208 286.72a40.96 40.96 0 0 1-14.992 55.952l-106.432 61.44a40.96 40.96 0 0 1-40.96-70.944l106.432-61.44a40.96 40.96 0 0 1 55.952 14.992z",
          fill: "currentColor",
          opacity: ".76"
        }
      ),
      /* @__PURE__ */ h(
        "path",
        {
          d: "M962.56 512a40.96 40.96 0 0 1-40.96 40.96h-122.88a40.96 40.96 0 1 1 0-81.92h122.88A40.96 40.96 0 0 1 962.56 512z",
          fill: "currentColor",
          opacity: ".7"
        }
      ),
      /* @__PURE__ */ h(
        "path",
        {
          d: "M902.208 737.28a40.96 40.96 0 0 1-55.952 14.992l-106.432-61.44a40.96 40.96 0 1 1 40.96-70.944l106.432 61.44a40.96 40.96 0 0 1 14.992 55.952z",
          fill: "currentColor",
          opacity: ".6"
        }
      ),
      /* @__PURE__ */ h(
        "path",
        {
          d: "M737.28 902.208a40.96 40.96 0 0 1-55.952-14.992l-61.44-106.432a40.96 40.96 0 0 1 70.944-40.96l61.44 106.432a40.96 40.96 0 0 1-14.992 55.952z",
          fill: "currentColor",
          opacity: ".5"
        }
      ),
      /* @__PURE__ */ h(
        "path",
        {
          d: "M512 962.56a40.96 40.96 0 0 1-40.96-40.96v-122.88a40.96 40.96 0 1 1 81.92 0v122.88A40.96 40.96 0 0 1 512 962.56z",
          fill: "currentColor",
          opacity: ".4"
        }
      ),
      /* @__PURE__ */ h(
        "path",
        {
          d: "M286.72 902.208a40.96 40.96 0 0 1-14.992-55.952l61.44-106.432a40.96 40.96 0 1 1 70.944 40.96l-61.44 106.432a40.96 40.96 0 0 1-55.952 14.992z",
          fill: "currentColor",
          opacity: ".3"
        }
      ),
      /* @__PURE__ */ h(
        "path",
        {
          d: "M121.792 737.28a40.96 40.96 0 0 1 14.992-55.952l106.432-61.44a40.96 40.96 0 0 1 40.96 70.944l-106.432 61.44a40.96 40.96 0 0 1-55.952-14.992z",
          fill: "currentColor",
          opacity: ".2"
        }
      ),
      /* @__PURE__ */ h(
        "path",
        {
          d: "M61.44 512a40.96 40.96 0 0 1 40.96-40.96h122.88a40.96 40.96 0 1 1 0 81.92H102.4A40.96 40.96 0 0 1 61.44 512z",
          fill: "currentColor",
          opacity: ".1"
        }
      ),
      /* @__PURE__ */ h(
        "path",
        {
          d: "M121.792 286.72a40.96 40.96 0 0 1 55.952-14.992l106.432 61.44a40.96 40.96 0 1 1-40.96 70.944l-106.432-61.44a40.96 40.96 0 0 1-14.992-55.952z",
          fill: "currentColor",
          opacity: ".04"
        }
      ),
      /* @__PURE__ */ h(
        "path",
        {
          d: "M286.72 121.792a40.96 40.96 0 0 1 55.952 14.992l61.44 106.432a40.96 40.96 0 0 1-70.944 40.96l-61.44-106.432a40.96 40.96 0 0 1 14.992-55.952z",
          fill: "currentColor"
        }
      )
    ]
  }
), od = () => /* @__PURE__ */ h(
  "svg",
  {
    className: "icon",
    viewBox: "0 0 1024 1024",
    version: "1.1",
    xmlns: "http://www.w3.org/2000/svg",
    width: "18",
    height: "18",
    children: /* @__PURE__ */ h("path", { d: "M704 256v490.666667a170.666667 170.666667 0 0 1-170.666667 170.666666 170.666667 170.666667 0 0 1-170.666666-170.666666V213.333333A106.666667 106.666667 0 0 1 469.333333 106.666667 106.666667 106.666667 0 0 1 576 213.333333v448a42.666667 42.666667 0 0 1-42.666667 42.666667 42.666667 42.666667 0 0 1-42.666666-42.666667V256H426.666667v405.333333a106.666667 106.666667 0 0 0 106.666666 106.666667 106.666667 106.666667 0 0 0 106.666667-106.666667V213.333333a170.666667 170.666667 0 0 0-170.666667-170.666666 170.666667 170.666667 0 0 0-170.666666 170.666666v533.333334a234.666667 234.666667 0 0 0 234.666666 234.666666 234.666667 234.666667 0 0 0 234.666667-234.666666V256h-64z" })
  }
), _o = () => /* @__PURE__ */ h(
  "svg",
  {
    className: "icon",
    viewBox: "0 0 1024 1024",
    version: "1.1",
    xmlns: "http://www.w3.org/2000/svg",
    width: "18",
    height: "18",
    children: [
      /* @__PURE__ */ h(
        "path",
        {
          d: "M842.666667 285.866667l-187.733334-187.733334c-14.933333-14.933333-32-21.333333-53.333333-21.333333H234.666667C194.133333 74.666667 160 108.8 160 149.333333v725.333334c0 40.533333 34.133333 74.666667 74.666667 74.666666h554.666666c40.533333 0 74.666667-34.133333 74.666667-74.666666V337.066667c0-19.2-8.533333-38.4-21.333333-51.2z m-44.8 44.8c-2.133333 2.133333-4.266667 0-8.533334 0h-170.666666c-6.4 0-10.666667-4.266667-10.666667-10.666667V149.333333c0-2.133333 0-6.4-2.133333-8.533333 0 0 2.133333 0 2.133333 2.133333l189.866667 187.733334z m-8.533334 554.666666H234.666667c-6.4 0-10.666667-4.266667-10.666667-10.666666V149.333333c0-6.4 4.266667-10.666667 10.666667-10.666666h311.466666c-2.133333 4.266667-2.133333 6.4-2.133333 10.666666v170.666667c0 40.533333 34.133333 74.666667 74.666667 74.666667h170.666666c4.266667 0 6.4 0 10.666667-2.133334V874.666667c0 6.4-4.266667 10.666667-10.666667 10.666666z",
          fill: "currentColor"
        }
      ),
      /* @__PURE__ */ h(
        "path",
        {
          d: "M640 693.333333H341.333333c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32h298.666667c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32zM640 522.666667H341.333333c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32h298.666667c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32zM341.333333 416h85.333334c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32h-85.333334c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32z",
          fill: "currentColor"
        }
      )
    ]
  }
), Ng = () => /* @__PURE__ */ h(
  "svg",
  {
    className: "icon",
    viewBox: "0 0 1024 1024",
    version: "1.1",
    xmlns: "http://www.w3.org/2000/svg",
    width: "18",
    height: "18",
    children: /* @__PURE__ */ h(
      "path",
      {
        d: "M557.248 511.68l135.776-135.744-45.248-45.28L512 466.432l-135.776-135.776-45.248 45.28 135.776 135.744-135.776 135.776 45.248 45.248L512 556.928l135.776 135.776 45.248-45.248-135.776-135.776zM512 64c247.136 0 448 200.864 448 448s-200.864 448-448 448S64 759.136 64 512 264.864 64 512 64z",
        fill: "currentColor"
      }
    )
  }
), Eg = () => /* @__PURE__ */ h(
  "svg",
  {
    className: "icon",
    viewBox: "0 0 1024 1024",
    version: "1.1",
    xmlns: "http://www.w3.org/2000/svg",
    width: "18",
    height: "18",
    children: /* @__PURE__ */ h("path", { d: "M512.43945313 904.51953125c-6.06445313 0-12.12890625-1.58203125-17.57812501-4.74609375L136.70703125 689.71484375c-10.63476563-6.24023438-17.13867188-17.66601563-17.13867188-29.97070313s6.50390625-23.73046875 17.13867188-29.97070312l76.37695313-44.91210938L136.97070312 540.125c-10.63476563-6.24023438-17.13867188-17.66601563-17.13867187-29.97070313s6.50390625-23.73046875 17.13867188-29.97070312l73.38867187-43.15429688-73.125-42.890625C126.51171875 387.81054687 120.0078125 376.38476562 120.0078125 364.08007812c0-12.3046875 6.50390625-23.73046875 17.13867188-29.97070312L495.828125 122.99609375c10.8984375-6.41601563 24.34570313-6.41601563 35.24414063 0l358.15429687 210.05859375c10.63476563 6.24023438 17.13867188 17.66601563 17.13867188 29.97070313s-6.50390625 23.73046875-17.13867188 29.97070312l-73.38867188 43.15429688 73.12500001 42.890625c10.63476563 6.24023438 17.13867188 17.66601563 17.13867187 29.97070312s-6.50390625 23.73046875-17.13867187 29.97070313L812.5859375 583.89453125l76.11328125 44.6484375c10.63476563 6.24023438 17.13867188 17.66601563 17.13867188 29.97070313s-6.50390625 23.73046875-17.13867188 29.97070312l-358.59375 211.2890625c-5.44921875 3.1640625-11.6015625 4.74609375-17.66601563 4.74609375zM223.015625 659.65625l289.42382813 169.8046875 290.12695312-170.77148438-58.44726563-34.27734374L530.28125 750.18359375a34.67285156 34.67285156 0 0 1-35.24414063 0L281.7265625 625.02734375 223.015625 659.65625z m76.90429688-104.58984375l212.69531249 124.8046875 290.12695313-170.77148438-55.546875-32.60742187-216.65039063 127.6171875a34.67285156 34.67285156 0 0 1-35.24414062 0L279.00195312 477.28320312l-55.81054687 32.78320313 75.49804688 44.296875c0.43945313 0.26367188 0.79101563 0.52734375 1.23046874 0.703125z m-2.81250001-147.83203125l215.68359376 126.5625 216.12304687-127.17773438c0.3515625-0.26367188 0.703125-0.43945313 1.0546875-0.61523437l72.86132813-42.890625-289.33593751-169.8046875-290.12695312 170.68359375 72.59765625 42.62695313c0.43945313 0.17578125 0.79101563 0.43945313 1.14257813 0.61523437z" })
  }
), Ag = (n) => /* @__PURE__ */ h(
  "svg",
  {
    className: n.className,
    id: "stop",
    viewBox: "0 0 1025 1024",
    version: "1.1",
    xmlns: "http://www.w3.org/2000/svg",
    width: "18",
    height: "18",
    children: [
      /* @__PURE__ */ h(
        "path",
        {
          d: "M512.268258 1022.835842c-68.658678 0-135.399619-13.564433-198.369591-40.316509-60.752236-25.809077-115.373446-62.712976-162.346233-109.685763-46.971763-46.971763-83.875662-101.592974-109.685763-162.346233C15.115619 647.517366 1.551186 580.777449 1.551186 512.118771S15.115619 376.719151 41.866671 313.74918c25.810101-60.752236 62.714-115.373446 109.685763-162.346233 46.972787-46.971763 101.593997-83.875662 162.346233-109.685763 62.969971-26.751052 129.710912-40.315485 198.369591-40.315485s135.398595 13.564433 198.368567 40.315485c60.752236 25.810101 115.373446 62.714 162.346233 109.685763 46.971763 46.972787 83.875662 101.593997 109.685763 162.346233 26.752076 62.969971 40.316509 129.710912 40.316509 198.369591s-13.564433 135.398595-40.316509 198.368567c-25.809077 60.75326-62.712976 115.37447-109.685763 162.346233-46.971763 46.972787-101.592974 83.876686-162.346233 109.685763C647.666853 1009.27141 580.925912 1022.835842 512.268258 1022.835842zM512.268258 50.548195c-62.018782 0-122.293887 12.247716-179.152287 36.403219-54.923257 23.333323-104.317532 56.709936-146.810821 99.204249s-75.870926 91.888588-99.204249 146.810821c-24.155503 56.8584-36.403219 117.133505-36.403219 179.152287 0 62.017758 12.247716 122.292863 36.403219 179.152287 23.333323 54.923257 56.709936 104.317532 99.204249 146.811845 42.493289 42.493289 91.888588 75.870926 146.810821 99.204249 56.8584 24.155503 117.133505 36.403219 179.152287 36.403219 62.017758 0 122.292863-12.247716 179.152287-36.403219 54.923257-23.333323 104.317532-56.71096 146.811845-99.204249 42.493289-42.494313 75.870926-91.888588 99.204249-146.811845 24.155503-56.8584 36.403219-117.133505 36.403219-179.152287s-12.247716-122.293887-36.403219-179.152287c-23.334347-54.923257-56.71096-104.317532-99.205273-146.810821-42.493289-42.493289-91.887565-75.870926-146.810821-99.204249C634.561121 62.795911 574.286016 50.548195 512.268258 50.548195z",
          fill: "currentColor"
        }
      ),
      /* @__PURE__ */ h(
        "path",
        {
          d: "M655.434047 694.244421 367.12637 694.244421c-21.046987 0-38.170445-17.123458-38.170445-38.170445L328.955925 367.766298c0-21.046987 17.123458-38.170445 38.170445-38.170445l288.307678 0c21.048011 0 38.170445 17.123458 38.170445 38.170445l0 288.307678C693.604492 677.120962 676.482058 694.244421 655.434047 694.244421zM380.150191 643.050154l262.260035 0L642.410226 380.79012 380.150191 380.79012 380.150191 643.050154z",
          fill: "currentColor"
        }
      )
    ]
  }
), Ig = (n) => /* @__PURE__ */ h(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    className: n.className,
    viewBox: "0 0 512 512",
    children: /* @__PURE__ */ h(
      "path",
      {
        fill: "none",
        stroke: "currentColor",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: "48",
        d: "M112 268l144 144 144-144M256 392V100"
      }
    )
  }
), Og = () => /* @__PURE__ */ h(
  "svg",
  {
    viewBox: "0 0 1024 1024",
    version: "1.1",
    xmlns: "http://www.w3.org/2000/svg",
    width: "18",
    height: "18",
    children: [
      /* @__PURE__ */ h("path", { d: "M394.688 126.208a32 32 0 0 1 32-32h170.688a32 32 0 0 1 32 32v138.624h288a32 32 0 0 1 32 32v170.688a32 32 0 0 1-32 32H106.688a32 32 0 0 1-32-32V296.832a32 32 0 0 1 32-32h288V126.208z m64 32v138.624a32 32 0 0 1-32 32h-288v106.688h746.688V328.832h-288a32 32 0 0 1-32-32V158.208H458.688z" }),
      /* @__PURE__ */ h("path", { d: "M138.688 469.376a32 32 0 0 1 32-32h682.688a32 32 0 0 1 32 32v384a32 32 0 0 1-32 32H170.688a32 32 0 0 1-32-32v-384z m64 32v320h618.688v-320H202.688z" }),
      /* @__PURE__ */ h("path", { d: "M341.376 691.52a32 32 0 0 1 32 32V851.2a32 32 0 1 1-64 0v-127.68a32 32 0 0 1 32-32zM512 691.2a32 32 0 0 1 32 32v128a32 32 0 0 1-64 0v-128a32 32 0 0 1 32-32zM682.688 691.52a32 32 0 0 1 32 32V851.2a32 32 0 1 1-64 0v-127.68a32 32 0 0 1 32-32z" })
    ]
  }
), Dg = () => /* @__PURE__ */ h(
  "svg",
  {
    viewBox: "0 0 1024 1024",
    version: "1.1",
    xmlns: "http://www.w3.org/2000/svg",
    width: "18",
    height: "18",
    children: /* @__PURE__ */ h("path", { d: "M843.251 424.407l43.828-74.898c10.194-17.946 32.596-22.158 48.956-11.598 16.298 10.499 23.44 32.658 14.223 49.566l-113.11 195.212-61.164-40.044-126.418-82.285c-16.115-11.598-20.632-34.428-10.194-51.702 9.705-17.397 31.009-23.501 47.857-13.734l89.67 59.028C748.576 295.547 615.81 180.667 461.008 180.667c-177.387 0-320.042 148.758-320.042 331.335 0 183.613 143.692 331.334 319.981 331.334 107.861 0.184 208.58-56.158 268.034-149.858 1.099-1.038 1.099-2.075 2.075-2.075 6.348-9.949 17.092-15.871 28.568-15.81 19.35 0 35.648 16.848 35.648 36.93 0 7.508-2.137 14.833-6.104 21.059-72.823 114.698-196.066 183.675-328.099 183.614-216.088 0-391.4-181.478-391.4-405.195 0-223.718 175.312-405.195 391.339-405.195 183.125-0.427 342.016 131.606 382.243 317.601z" })
  }
), Ya = () => /* @__PURE__ */ h(
  "svg",
  {
    version: "1.1",
    className: "icon",
    viewBox: "0 0 1024 1024",
    xmlns: "http://www.w3.org/2000/svg",
    children: /* @__PURE__ */ h("path", { d: "M627.498667 55.168l170.666666 170.666667a42.624 42.624 0 0 1 0 60.330666l-469.333333 469.333334A42.538667 42.538667 0 0 1 298.666667 768H128a42.666667 42.666667 0 0 1-42.666667-42.666667v-170.666666c0-11.306667 4.48-22.186667 12.501334-30.165334l469.333333-469.333333a42.624 42.624 0 0 1 60.330667 0zM896 896a42.666667 42.666667 0 0 1 0 85.333333H128a42.666667 42.666667 0 0 1 0-85.333333h768zM597.333333 145.664l-426.666666 426.666667V682.666667h110.336l426.666666-426.666667L597.333333 145.664z" })
  }
), Za = (n) => /* @__PURE__ */ h(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    className: n.className,
    viewBox: "0 0 512 512",
    children: /* @__PURE__ */ h(
      "path",
      {
        fill: "none",
        stroke: "currentColor",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: "48",
        d: "M184 112l144 144-144 144"
      }
    )
  }
), $g = () => /* @__PURE__ */ h(
  "svg",
  {
    className: "icon",
    viewBox: "0 0 1024 1024",
    version: "1.1",
    xmlns: "http://www.w3.org/2000/svg",
    children: /* @__PURE__ */ h("path", { d: "M896 870.4l-128-128c55.467-68.267 89.6-149.333 89.6-238.933 0-98.134-38.4-192-110.933-264.534-149.334-149.333-384-149.333-533.334-4.266-145.066 145.066-145.066 384 0 529.066 72.534 72.534 166.4 110.934 264.534 110.934 89.6 0 174.933-29.867 238.933-89.6l128 128c4.267 4.266 12.8 8.533 21.333 8.533s17.067-4.267 21.334-8.533c17.066-8.534 17.066-29.867 8.533-42.667zM260.267 721.067c-119.467-123.734-119.467-320 0-439.467 59.733-59.733 140.8-89.6 217.6-89.6 81.066 0 157.866 29.867 217.6 89.6 59.733 59.733 89.6 136.533 89.6 217.6 0 81.067-34.134 162.133-89.6 217.6-55.467 59.733-132.267 93.867-217.6 93.867-81.067 0-157.867-34.134-217.6-89.6z" })
  }
), ad = () => /* @__PURE__ */ h(
  "svg",
  {
    className: "icon",
    viewBox: "0 0 1024 1024",
    version: "1.1",
    xmlns: "http://www.w3.org/2000/svg",
    stroke: "currentColor",
    width: "1em",
    height: "1em",
    children: /* @__PURE__ */ h("path", { d: "M497.0496 55.7056a38.4 38.4 0 0 1 38.912 0l362.7008 213.2992c11.776 6.912 18.944 19.456 18.944 33.1264v426.6496a38.4 38.4 0 0 1-18.944 33.0752l-362.6496 213.3504a38.4 38.4 0 0 1-38.912 0L134.3488 761.856a38.4 38.4 0 0 1-18.944-33.0752V302.1312a38.4 38.4 0 0 1 18.944-33.1264z m19.456 77.6192L192.3072 324.096v382.72l324.3008 190.7712 324.2496-190.7712V324.096l-324.2496-190.7712zM345.9584 370.3296c7.68 0 14.848 2.2528 20.8384 6.144l149.6576 93.696 149.8624-93.696a38.4512 38.4512 0 0 1 49.1008 58.2656l-1.792 1.792a38.6048 38.6048 0 0 1-6.656 5.12l-152.0128 94.976v170.4448a38.4 38.4 0 0 1-0.1536 3.7376l-0.512 3.7376a38.0928 38.0928 0 0 1-23.04 27.9552 38.0928 38.0928 0 0 1-35.9936-3.5328 38.1952 38.1952 0 0 1-17.0496-31.8976v-170.2912l-152.064-95.1296a38.4 38.4 0 0 1 19.7632-71.3216z" })
  }
), Rg = () => /* @__PURE__ */ h(
  "svg",
  {
    className: "icon",
    viewBox: "0 0 1024 1024",
    version: "1.1",
    xmlns: "http://www.w3.org/2000/svg",
    width: "1em",
    height: "1em",
    fill: "currentColor",
    children: [
      /* @__PURE__ */ h("path", { d: "M512 721.67619c-117.028571 0-209.67619-92.647619-209.67619-209.67619s92.647619-209.67619 209.67619-209.67619 209.67619 92.647619 209.67619 209.67619-92.647619 209.67619-209.67619 209.67619z m0-321.828571c-63.390476 0-112.152381 48.761905-112.152381 112.152381 0 63.390476 48.761905 112.152381 112.152381 112.152381s112.152381-48.761905 112.152381-112.152381c0-63.390476-48.761905-112.152381-112.152381-112.152381z" }),
      /* @__PURE__ */ h("path", { d: "M604.647619 1009.371429l-14.628571-48.761905c-9.752381-34.133333-43.885714-58.514286-78.019048-58.514286s-68.266667 24.380952-78.019048 58.514286l-14.628571 48.761905-48.761905-14.628572C292.571429 975.238095 219.428571 931.352381 160.914286 877.714286l-34.133334-34.133334 34.133334-34.133333c24.380952-29.257143 29.257143-68.266667 9.752381-97.523809-19.504762-34.133333-53.638095-48.761905-92.647619-39.009524l-48.761905 9.752381-9.752381-48.761905c-9.752381-39.009524-14.628571-82.895238-14.628572-121.904762S9.752381 429.104762 19.504762 390.095238l9.752381-48.761905 48.761905 9.752381c34.133333 9.752381 73.142857-4.87619 92.647619-39.009524 19.504762-34.133333 14.628571-73.142857-9.752381-97.523809l-34.133334-34.133333 34.133334-34.133334C219.428571 92.647619 292.571429 48.761905 370.590476 24.380952l48.761905-14.628571 14.628571 43.885714c9.752381 34.133333 43.885714 58.514286 78.019048 58.514286s68.266667-24.380952 78.019048-58.514286l14.628571-43.885714 48.761905 14.628571C731.428571 48.761905 804.571429 92.647619 863.085714 146.285714l34.133334 34.133334-34.133334 34.133333c-24.380952 29.257143-29.257143 68.266667-9.752381 97.523809 19.504762 34.133333 53.638095 48.761905 92.647619 39.009524l48.761905-9.752381 9.752381 48.761905c9.752381 39.009524 14.628571 82.895238 14.628572 121.904762s-4.87619 82.895238-14.628572 121.904762l-9.752381 48.761905-48.761905-9.752381c-34.133333-9.752381-73.142857 4.87619-92.647619 39.009524-19.504762 34.133333-14.628571 73.142857 9.752381 97.523809l34.133334 34.133333-34.133334 34.133334c-58.514286 58.514286-131.657143 97.52381-209.67619 121.904762l-48.761905 9.752381z m-346.209524-175.542858c34.133333 24.380952 68.266667 43.885714 102.4 58.514286 34.133333-48.761905 87.771429-82.895238 151.161905-82.895238s117.028571 34.133333 151.161905 82.895238c34.133333-14.628571 68.266667-34.133333 102.4-58.514286-29.257143-53.638095-29.257143-117.028571 4.87619-170.666666 29.257143-53.638095 87.771429-87.771429 146.285715-87.771429 4.87619-19.504762 4.87619-39.009524 4.87619-58.514286s0-39.009524-4.87619-58.514285c-58.514286-4.87619-117.028571-34.133333-146.285715-87.771429-29.257143-53.638095-34.133333-117.028571-4.87619-170.666666-34.133333-34.133333-68.266667-53.638095-102.4-68.266667-34.133333 48.761905-87.771429 82.895238-151.161905 82.895238s-117.028571-29.257143-151.161905-82.895238c-34.133333 14.628571-68.266667 34.133333-102.4 58.514286 29.257143 53.638095 29.257143 117.028571-4.87619 175.542857-29.257143 53.638095-87.771429 87.771429-146.285715 87.771428-4.87619 19.504762-4.87619 39.009524-4.87619 58.514286s0 39.009524 4.87619 58.514286c58.514286 4.87619 117.028571 34.133333 146.285715 87.771428s34.133333 121.904762 4.87619 175.542857z" })
    ]
  }
), ld = () => /* @__PURE__ */ h(
  "svg",
  {
    className: "icon",
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    width: "1em",
    height: "1em",
    children: /* @__PURE__ */ h(
      "path",
      {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: "2",
        d: "M19 9l-7 7-7-7"
      }
    )
  }
), Pg = () => /* @__PURE__ */ h(
  "svg",
  {
    viewBox: "0 0 1024 1024",
    version: "1.1",
    xmlns: "http://www.w3.org/2000/svg",
    width: "18",
    height: "18",
    children: [
      /* @__PURE__ */ h("path", { d: "M190.193225 471.411583c14.446014 0 26.139334-11.718903 26.139334-26.13831 0-14.44499-11.69332-26.164916-26.139334-26.164916-0.271176 0-0.490164 0.149403-0.73678 0.149403l-62.496379 0.146333c-1.425466-0.195451-2.90005-0.295735-4.373611-0.295735-19.677155 0-35.621289 16.141632-35.621289 36.114522L86.622358 888.550075c0 19.949354 15.96767 35.597753 35.670407 35.597753 1.916653 0 3.808746 0.292666 5.649674 0l61.022819 0.022513c0.099261 0 0.148379 0.048095 0.24764 0.048095 0.097214 0 0.146333-0.048095 0.24457-0.048095l0.73678 0 0-0.148379c13.413498-0.540306 24.174586-11.422144 24.174586-24.960485 0-13.55983-10.760065-24.441669-24.174586-24.981974l0-0.393973-50.949392 0 1.450025-402.275993L190.193225 471.409536z" }),
      /* @__PURE__ */ h("path", { d: "M926.52241 433.948343c-19.283182-31.445176-47.339168-44.172035-81.289398-45.546336-1.77032-0.246617-3.536546-0.39295-5.380544-0.39295l-205.447139-0.688685c13.462616-39.059598 22.698978-85.58933 22.698978-129.317251 0-28.349675-3.193739-55.962569-9.041934-82.542948l-0.490164 0.049119c-10.638291-46.578852-51.736315-81.31498-100.966553-81.31498-57.264215 0-95.466282 48.15065-95.466282 106.126063 0 3.241834-0.294712 6.387477 0 9.532097-2.996241 108.386546-91.240027 195.548698-196.23636 207.513194l0 54.881958-0.785899 222.227314 0 229.744521 10.709923 0 500.025271 0.222057 8.746198-0.243547c19.35686 0.049119 30.239721-4.817726 47.803749-16.116049 16.682961-10.761088 29.236881-25.50079 37.490869-42.156122 2.260483-3.341095 4.028757-7.075139 5.106298-11.20111l77.018118-344.324116c1.056052-4.053316 1.348718-8.181333 1.056052-12.160971C943.643346 476.446249 938.781618 453.944769 926.52241 433.948343zM893.82573 486.837924l-82.983993 367.783411-0.099261-0.049119c-2.555196 6.141884-6.879688 11.596106-12.872169 15.427364-4.177136 2.727111-8.773827 4.351098-13.414521 4.964058-1.49812-0.195451-3.046383 0-4.620227 0l-477.028511-0.540306-0.171915-407.408897c89.323375-40.266076 154.841577-79.670527 188.596356-173.661202 0.072655 0.024559 0.124843 0.049119 0.195451 0.072655 2.99931-9.137101 6.313799-20.73423 8.697079-33.164331 5.551436-29.185716 5.258771-58.123792 5.258771-58.123792-4.937452-37.98001 25.940812-52.965306 44.364417-52.965306 25.304316 0.860601 50.263777 33.656541 50.263777 52.326762 0 0 5.600555 27.563776 5.649674 57.190537 0.048095 37.366026-4.6673 56.847729-4.6673 56.847729l-0.466628 0c-5.872754 30.879288-16.214287 60.138682-30.464849 86.964654l0.36839 0.342808c-2.358721 4.815679-3.709485 10.220782-3.709485 15.943111 0 19.922748 19.088754 21.742187 38.765909 21.742187l238.761895 0.270153c0 0 14.666024 0.465604 14.690584 0.465604l0 0.100284c12.132318-0.638543 24.221658 5.207605 31.100322 16.409738 5.504364 9.016351 6.437619 19.6045 3.486404 28.988218L893.82573 486.837924z" }),
      /* @__PURE__ */ h("path", { d: "M264.827039 924.31872c0.319272 0.024559 0.441045 0.024559 0.295735-0.024559 0.243547-0.048095 0.367367-0.074701-0.295735-0.074701s-0.539282 0.026606-0.271176 0.074701C264.43409 924.343279 264.532327 924.343279 264.827039 924.31872z" })
    ]
  }
), Lg = () => /* @__PURE__ */ h(
  "svg",
  {
    viewBox: "0 0 1024 1024",
    version: "1.1",
    xmlns: "http://www.w3.org/2000/svg",
    width: "18",
    height: "18",
    children: /* @__PURE__ */ h("path", { d: "M190.208 552.576a26.176 26.176 0 0 1 0 52.288L189.44 604.8l-62.464-0.128a35.84 35.84 0 0 1-40-35.84l-0.384-433.28c0-19.968 16-35.648 35.712-35.648 1.92 0 3.84-0.256 5.632 0h62.272v0.128c13.44 0.576 24.192 11.456 24.192 24.96a25.024 25.024 0 0 1-24.192 24.96v0.448h-50.944l1.408 402.24h49.536z m736.32 37.504c-19.264 31.36-47.36 44.16-81.28 45.504a38.656 38.656 0 0 1-5.376 0.384l-205.44 0.704c13.44 39.04 22.656 85.568 22.656 129.28 0 28.416-3.2 56-9.024 82.56h-0.512a103.936 103.936 0 0 1-100.928 81.28c-57.28 0-95.488-48.128-95.488-106.112 0-3.2-0.32-6.4 0-9.536-3.008-108.352-91.264-195.52-196.224-207.488V551.68L254.08 329.6v-229.76h10.688l500.032-0.192 8.704 0.192c19.392 0 30.272 4.864 47.808 16.128 16.704 10.752 29.248 25.536 37.504 42.176 2.304 3.328 4.032 7.04 5.12 11.2l76.992 344.32a37.568 37.568 0 0 1 1.088 12.16c1.536 21.76-3.328 44.288-15.552 64.32z m-32.704-52.928l-83.008-367.744h-0.064a33.408 33.408 0 0 0-26.24-20.352c-1.536 0.192-3.072 0-4.672 0l-477.056 0.512-0.128 407.424c89.28 40.32 154.88 79.68 188.544 173.632h0.256c2.944 9.088 6.272 20.672 8.64 33.088 5.568 29.184 5.312 58.176 5.312 58.176-4.992 37.952 25.92 52.928 44.352 52.928 25.28-0.832 50.24-33.664 50.24-52.288 0 0 5.632-27.584 5.632-57.216 0.064-37.376-4.608-56.832-4.608-56.832h-0.512a307.84 307.84 0 0 0-30.464-87.04l0.384-0.256a36.16 36.16 0 0 1-3.712-16c0-19.84 19.072-21.76 38.784-21.76l238.72-0.192 14.72-0.512v-0.064c12.16 0.64 24.192-5.248 31.104-16.448a35.2 35.2 0 0 0 3.456-28.992h0.32zM267.52 96.768c2.048-0.192 2.816-0.192 1.92 0.128 1.536 0.32 2.304 0.512-1.92 0.512s-3.456-0.192-1.728-0.512c-0.768-0.32-0.192-0.32 1.728-0.128z" })
  }
), Kr = () => /* @__PURE__ */ h("svg", { viewBox: "0 0 1024 1024", version: "1.1", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ h("path", { d: "M413.610667 336.192l226.346666-125.461333-11.114666-76.586667c-5.909333-40.64 43.349333-65.344 72.384-36.309333l241.365333 241.344c29.013333 29.013333 4.373333 78.250667-36.245333 72.405333l-76.458667-10.965333-126.165333 227.029333 2.176 5.12c34.56 84.330667 27.413333 153.962667-30.208 214.549333l-4.416 4.544a42.666667 42.666667 0 0 1-60.330667 0l-139.968-139.968L153.365333 946.730667c-38.528 28.48-86.677333-18.133333-61.44-57.109334l1.706667-2.474666 234.154667-318.442667-136.810667-136.832-4.906667-5.12a42.666667 42.666667 0 0 1 2.496-57.6c62.272-62.293333 139.157333-71.445333 222.122667-34.304l2.922667 1.344zM795.733333 313.024l-68.138666-68.117333-0.96 3.136a42.666667 42.666667 0 0 1-19.52 23.04L435.306667 421.76a42.666667 42.666667 0 0 1-41.216 0.085333c-42.197333-23.146667-76.565333-29.290667-106.581334-18.218666l-2.944 1.173333 129.493334 129.493333a42.666667 42.666667 0 0 1 4.202666 55.466667l-88.661333 120.533333 120.213333-88.853333a42.666667 42.666667 0 0 1 52.821334 1.642667l2.709333 2.496 130.282667 130.282666 1.685333-4.522666c8.917333-27.008 3.242667-58.24-16.704-100.608l-2.944-6.144A42.666667 42.666667 0 0 1 618.666667 605.077333l150.912-271.573333a42.666667 42.666667 0 0 1 23.018666-19.498667l3.157334-0.981333z" }) }), Qa = () => /* @__PURE__ */ h("svg", { viewBox: "0 0 1024 1024", version: "1.1", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ h("path", { d: "M342.464 368.576l73.344 42.368-8.512 7.936a32 32 0 0 1-14.272 7.68l-5.44 0.832-2.88 0.192-19.456 2.24a442.88 442.88 0 0 0-53.504 10.688 245.12 245.12 0 0 0-64.32 25.984l-7.488 4.928 150.144 86.784a32 32 0 0 1 15.808 31.168l-1.024 5.312-61.568 215.168 155.584-160.896a32 32 0 0 1 34.112-7.744l4.928 2.304 152.32 87.872 1.472-8.192c4.992-38.272-7.68-83.456-31.552-128.832l-6.784-12.416a32 32 0 0 1-3.456-23.04l2.56-11.328 78.016 44.992c27.328 61.44 36.672 122.816 15.168 177.856l-5.12 11.84-6.208 11.648a32 32 0 0 1-43.712 11.712l-163.072-94.272-227.2 235.072c-21.632 22.336-57.728 3.84-55.04-24.768l1.28-6.272L336.448 600.96l-163.072-94.08a32 32 0 0 1-14.144-38.464l2.432-5.248c23.936-41.6 71.36-67.84 133.504-84.48 20.48-5.568 41.28-9.6 61.312-12.288l-14.016 2.112zM267.968 218.688l609.664 352a32 32 0 1 1-32 55.424l-609.664-352a32 32 0 1 1 32-55.424z m258.816-106.24a32 32 0 0 1 40.384-42.752l5.056 2.432 295.552 170.624a32 32 0 0 1-12.16 59.52l-83.584 9.984-31.68 138.24-57.984-33.408 32.32-140.992a32 32 0 0 1 21.76-23.424l5.632-1.216 10.56-1.344-129.28-74.624 4.16 9.856a32 32 0 0 1-3.84 31.808l-3.84 4.224L513.92 319.808l-57.984-33.472 104-96.64z" }) }), cd = () => /* @__PURE__ */ h(
  "svg",
  {
    className: "icon",
    viewBox: "0 0 1024 1024",
    version: "1.1",
    xmlns: "http://www.w3.org/2000/svg",
    width: "16",
    height: "16",
    children: [
      /* @__PURE__ */ h("path", { d: "M509.4 900.5c-11.6 0-21-9.4-21-21v-168c0-11.6 9.4-21 21-21s21 9.4 21 21v168c0 11.6-9.4 21-21 21z" }),
      /* @__PURE__ */ h("path", { d: "M509.4 933.3c-5.4 0-10.7-2.1-14.8-6.2-8.2-8.2-8.2-21.5 0-29.7l74.2-74.3c8.2-8.2 21.5-8.2 29.7 0s8.2 21.5 0 29.7l-74.2 74.3c-4.2 4.1-9.6 6.2-14.9 6.2z" }),
      /* @__PURE__ */ h("path", { d: "M509.4 933.3c-5.4 0-10.7-2.1-14.8-6.2l-74.2-74.2c-8.2-8.2-8.2-21.5 0-29.7s21.5-8.2 29.7 0l74.2 74.2c8.2 8.2 8.2 21.5 0 29.7-4.2 4.1-9.6 6.2-14.9 6.2zM742.7 803.1c-56 0-110.1-20.3-152.2-57.2-8.7-7.6-9.6-20.9-1.9-29.6 7.6-8.7 20.9-9.6 29.6-1.9 34.4 30.2 78.6 46.8 124.5 46.8 104.2 0 189-84.8 189-189 0-91.8-65.6-170-156.1-185.9l-16.2-2.8-1.1-16.4c-9.2-131.4-119.5-234.3-251.1-234.3-120.4 0-224.4 85.7-247.3 203.8l-2.7 13.8-13.8 2.8C155.8 371 92.2 448.9 92.2 538.4c0 104.2 84.8 189 189 189 43.1 0 83.6-14.1 117.3-40.9 9.1-7.2 22.3-5.7 29.5 3.4 7.2 9.1 5.7 22.3-3.4 29.5-41.2 32.7-90.7 50-143.4 50-127.4 0-231-103.6-231-231 0-104.8 71.3-196.5 171.4-223.2C253.4 184.3 371.4 90.7 507.2 90.7c148.3 0 273.3 111.8 291.5 257.5 102.3 25.4 175 117.1 175 224 0 127.3-103.6 230.9-231 230.9z" })
    ]
  }
), zg = () => /* @__PURE__ */ h(
  "svg",
  {
    viewBox: "0 0 1024 1024",
    version: "1.1",
    xmlns: "http://www.w3.org/2000/svg",
    width: "16",
    height: "16",
    children: /* @__PURE__ */ h(
      "path",
      {
        d: "M934.4 770.133333L605.866667 181.333333C586.666667 147.2 550.4 128 512 128s-74.666667 21.333333-93.866667 53.333333L89.6 770.133333c-19.2 34.133333-19.2 76.8 0 110.933334S145.066667 938.666667 183.466667 938.666667h657.066666c40.533333 0 74.666667-21.333333 93.866667-57.6 19.2-34.133333 19.2-76.8 0-110.933334zM480 362.666667c0-17.066667 14.933333-32 32-32s29.866667 12.8 32 29.866666V640c0 17.066667-14.933333 32-32 32s-29.866667-12.8-32-29.866667V362.666667zM512 832c-23.466667 0-42.666667-19.2-42.666667-42.666667s19.2-42.666667 42.666667-42.666666 42.666667 19.2 42.666667 42.666666-19.2 42.666667-42.666667 42.666667z",
        fill: "red"
      }
    )
  }
), No = /* @__PURE__ */ h(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "red",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
    style: "margin-left: 6px;",
    children: [
      /* @__PURE__ */ h("path", { d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" }),
      /* @__PURE__ */ h("path", { d: "M12 9v4" }),
      /* @__PURE__ */ h("path", { d: "M12 17h.01" })
    ]
  }
), dr = /* @__PURE__ */ h(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "rgb(0, 185, 107)",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: "lucide lucide-check",
    "aria-hidden": "true",
    style: "margin-left: 6px;",
    children: /* @__PURE__ */ h("path", { d: "M20 6 9 17l-5-5" })
  }
), hr = /* @__PURE__ */ h(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
    style: "margin-left: 6px;",
    children: [
      /* @__PURE__ */ h("rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2" }),
      /* @__PURE__ */ h("path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" })
    ]
  }
), Hn = (n) => /* @__PURE__ */ h(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
    style: n.style,
    children: /* @__PURE__ */ h("path", { d: "m9 18 6-6-6-6" })
  }
), Eo = /* @__PURE__ */ h(
  "svg",
  {
    className: "icon",
    title: "知识库",
    viewBox: "0 0 1024 1024",
    version: "1.1",
    xmlns: "http://www.w3.org/2000/svg",
    width: "16",
    height: "16",
    fill: "currentColor",
    xmlnsXlink: "http://www.w3.org/1999/xlink",
    children: /* @__PURE__ */ h("path", { d: "M849.2 80H267.7c-73.8 0.1-133.6 58.2-133.6 129.9v606.7c0.1 70.3 58.6 127.2 130.9 127.3h584.3c22.5 0 40.8-17.8 40.8-39.7V119.6C890 97.8 871.7 80 849.2 80z m-40.9 784.6H264.8c-27.2 0-49.2-21.5-49.2-47.9s22-47.9 49.2-47.9h543.5v95.8z m0-175.1H264.8c-16.9 0-33.6 3.1-49.2 9.3V209.9c0-27.9 23.3-50.5 52-50.6h276.8v224.4c0 5.9 6.3 9.8 11.6 7.2l67.7-33.8c4.5-2.3 9.8-2.3 14.3 0l67.7 33.8c5.3 2.7 11.6-1.2 11.6-7.2V159.4h91.1l-0.1 530.1z" })
  }
), Bg = /* @__PURE__ */ h(
  "svg",
  {
    className: "icon",
    viewBox: "0 0 1024 1024",
    version: "1.1",
    xmlns: "http://www.w3.org/2000/svg",
    width: "16",
    height: "16",
    children: /* @__PURE__ */ h(
      "path",
      {
        d: "M85.312 85.312h853.376v853.376H85.312V85.312z m85.376 768h579.648L384 487.04l-213.312 213.376v152.96z m682.624-17.664V170.688H170.688v408.96L384 366.336l469.312 469.312z m-179.328-526.336a42.688 42.688 0 1 0 0 85.376 42.688 42.688 0 0 0 0-85.376z m-128 42.688a128 128 0 1 1 256 0 128 128 0 0 1-256 0z",
        fill: "currentColor"
      }
    )
  }
), ud = /* @__PURE__ */ h(
  "svg",
  {
    viewBox: "0 0 79 86",
    version: "1.1",
    xmlns: "http://www.w3.org/2000/svg",
    xmlnsXlink: "http://www.w3.org/1999/xlink",
    children: [
      /* @__PURE__ */ h("defs", { children: [
        /* @__PURE__ */ h(
          "linearGradient",
          {
            id: "linearGradient-1-el-id-655-578",
            x1: "38.8503086%",
            y1: "0%",
            x2: "61.1496914%",
            y2: "100%",
            children: [
              /* @__PURE__ */ h("stop", { stopColor: "var(--el-empty-fill-color-1)", offset: "0%" }),
              /* @__PURE__ */ h("stop", { stopColor: "var(--el-empty-fill-color-4)", offset: "100%" })
            ]
          }
        ),
        /* @__PURE__ */ h(
          "linearGradient",
          {
            id: "linearGradient-2-el-id-655-578",
            x1: "0%",
            y1: "9.5%",
            x2: "100%",
            y2: "90.5%",
            children: [
              /* @__PURE__ */ h("stop", { stopColor: "var(--el-empty-fill-color-1)", offset: "0%" }),
              /* @__PURE__ */ h("stop", { stopColor: "var(--el-empty-fill-color-6)", offset: "100%" })
            ]
          }
        ),
        /* @__PURE__ */ h("rect", { id: "path-3-el-id-655-578", x: "0", y: "0", width: "17", height: "36" })
      ] }),
      /* @__PURE__ */ h(
        "g",
        {
          id: "Illustrations",
          stroke: "none",
          strokeWidth: "1",
          fill: "none",
          fillRule: "evenodd",
          children: /* @__PURE__ */ h("g", { id: "B-type", transform: "translate(-1268.000000, -535.000000)", children: /* @__PURE__ */ h("g", { id: "Group-2", transform: "translate(1268.000000, 535.000000)", children: [
            /* @__PURE__ */ h(
              "path",
              {
                id: "Oval-Copy-2",
                d: "M39.5,86 C61.3152476,86 79,83.9106622 79,81.3333333 C79,78.7560045 57.3152476,78 35.5,78 C13.6847524,78 0,78.7560045 0,81.3333333 C0,83.9106622 17.6847524,86 39.5,86 Z",
                fill: "var(--el-empty-fill-color-3)"
              }
            ),
            /* @__PURE__ */ h(
              "polygon",
              {
                id: "Rectangle-Copy-14",
                fill: "var(--el-empty-fill-color-7)",
                transform: "translate(27.500000, 51.500000) scale(1, -1) translate(-27.500000, -51.500000) ",
                points: "13 58 53 58 42 45 2 45"
              }
            ),
            /* @__PURE__ */ h(
              "g",
              {
                id: "Group-Copy",
                transform: "translate(34.500000, 31.500000) scale(-1, 1) rotate(-25.000000) translate(-34.500000, -31.500000) translate(7.000000, 10.000000)",
                children: [
                  /* @__PURE__ */ h(
                    "polygon",
                    {
                      id: "Rectangle-Copy-10",
                      fill: "var(--el-empty-fill-color-7)",
                      transform: "translate(11.500000, 5.000000) scale(1, -1) translate(-11.500000, -5.000000) ",
                      points: "2.84078316e-14 3 18 3 23 7 5 7"
                    }
                  ),
                  /* @__PURE__ */ h(
                    "polygon",
                    {
                      id: "Rectangle-Copy-11",
                      fill: "var(--el-empty-fill-color-5)",
                      points: "-3.69149156e-15 7 38 7 38 43 -3.69149156e-15 43"
                    }
                  ),
                  /* @__PURE__ */ h(
                    "rect",
                    {
                      id: "Rectangle-Copy-12",
                      fill: "var(--el-empty-fill-color-3)",
                      transform: "translate(46.500000, 25.000000) scale(-1, 1) translate(-46.500000, -25.000000) ",
                      x: "38",
                      y: "7",
                      width: "17",
                      height: "36"
                    }
                  ),
                  /* @__PURE__ */ h(
                    "polygon",
                    {
                      id: "Rectangle-Copy-13",
                      fill: "var(--el-empty-fill-color-2)",
                      transform: "translate(39.500000, 3.500000) scale(-1, 1) translate(-39.500000, -3.500000) ",
                      points: "24 7 41 7 55 -3.63806207e-12 38 -3.63806207e-12"
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ h(
              "rect",
              {
                id: "Rectangle-Copy-15",
                fill: "var(--el-empty-fill-color-2)",
                x: "13",
                y: "45",
                width: "40",
                height: "36"
              }
            ),
            /* @__PURE__ */ h("g", { id: "Rectangle-Copy-17", transform: "translate(53.000000, 45.000000)", children: [
              /* @__PURE__ */ h(
                "use",
                {
                  id: "Mask",
                  fill: "var(--el-empty-fill-color-8)",
                  transform: "translate(8.500000, 18.000000) scale(-1, 1) translate(-8.500000, -18.000000) ",
                  xlinkHref: "#path-3-el-id-655-578"
                }
              ),
              /* @__PURE__ */ h(
                "polygon",
                {
                  id: "Rectangle-Copy",
                  fill: "var(--el-empty-fill-color-9)",
                  mask: "var(--el-empty-fill-color-5)",
                  transform: "translate(12.000000, 9.000000) scale(-1, 1) translate(-12.000000, -9.000000) ",
                  points: "7 0 24 0 20 18 7 16.5"
                }
              )
            ] }),
            /* @__PURE__ */ h(
              "polygon",
              {
                id: "Rectangle-Copy-18",
                fill: "var(--el-empty-fill-color-2)",
                transform: "translate(66.000000, 51.500000) scale(-1, 1) translate(-66.000000, -51.500000) ",
                points: "62 45 79 45 70 58 53 58"
              }
            )
          ] }) })
        }
      )
    ]
  }
), Fg = () => /* @__PURE__ */ h(
  "svg",
  {
    className: "icon",
    viewBox: "0 0 1024 1024",
    version: "1.1",
    xmlns: "http://www.w3.org/2000/svg",
    width: "16",
    height: "16",
    children: [
      /* @__PURE__ */ h(
        "path",
        {
          d: "M516.461 20.457c-274.346 0-496.742 222.394-496.742 496.742s222.394 496.742 496.742 496.742 496.742-222.394 496.742-496.742-222.394-496.742-496.742-496.742zM516.461 964.278c-246.527 0-447.079-200.547-447.079-447.079s200.547-447.079 447.079-447.079 447.079 200.547 447.079 447.079-200.547 447.079-447.079 447.079z",
          fill: ""
        }
      ),
      /* @__PURE__ */ h(
        "path",
        {
          d: "M741.978 291.67c-12.099-12.117-31.79-12.117-43.905 0l-181.633 181.633-181.633-181.633c-12.102-12.117-31.795-12.117-43.905 0-12.117 12.102-12.117 31.79 0 43.905l181.633 181.633-181.633 181.633c-12.117 12.102-12.117 31.79 0 43.905 6.032 6.061 13.984 9.073 21.942 9.073 7.926 0 15.886-3.03 21.942-9.073l181.633-181.633 181.633 181.633c6.061 6.061 14.002 9.073 21.942 9.073s15.886-3.03 21.942-9.073c12.117-12.102 12.117-31.79 0-43.905l-181.669-181.633 181.633-181.633c12.117-12.102 12.117-31.79 0-43.905z",
          fill: ""
        }
      )
    ]
  }
), Vg = () => /* @__PURE__ */ h(
  "svg",
  {
    className: "icon",
    viewBox: "0 0 1024 1024",
    version: "1.1",
    xmlns: "http://www.w3.org/2000/svg",
    width: "16",
    height: "16",
    children: [
      /* @__PURE__ */ h("path", { d: "M512 85.333333C276.48 85.333333 85.333333 276.48 85.333333 512S276.48 938.666667 512 938.666667 938.666667 747.52 938.666667 512 747.52 85.333333 512 85.333333z m0 796.444445c-203.662222 0-369.777778-166.115556-369.777778-369.777778S308.337778 142.222222 512 142.222222 881.777778 308.337778 881.777778 512 715.662222 881.777778 512 881.777778z" }),
      /* @__PURE__ */ h("path", { d: "M678.115556 385.706667L461.937778 591.644444l-116.053334-110.364444c-11.377778-11.377778-29.582222-10.24-39.822222 1.137778-11.377778 11.377778-10.24 29.582222 1.137778 39.822222l135.395556 129.706667c5.688889 5.688889 12.515556 7.964444 19.342222 7.964444s13.653333-2.275556 19.342222-7.964444L716.8 426.666667c11.377778-11.377778 11.377778-28.444444 1.137778-39.822223-10.24-12.515556-28.444444-12.515556-39.822222-1.137777z" })
    ]
  }
), el = () => /* @__PURE__ */ h(
  "svg",
  {
    className: "icon",
    viewBox: "0 0 1024 1024",
    version: "1.1",
    xmlns: "http://www.w3.org/2000/svg",
    width: "16",
    height: "16",
    children: /* @__PURE__ */ h(
      "path",
      {
        d: "M896 170.688c47.104 0 85.312 38.144 85.312 85.312v512c0 47.104-38.208 85.312-85.312 85.312H128A85.312 85.312 0 0 1 42.688 768V256c0-47.168 38.208-85.312 85.312-85.312h768z m-533.312 64H128c-10.496 0-19.2 7.488-20.992 17.472L106.688 256v512c0 10.496 7.552 19.2 17.472 20.992l3.84 0.32h234.688V234.688z m533.312 0H426.688v554.624H896c10.496 0 19.2-7.552 20.992-17.472l0.32-3.84V256c0-10.496-7.552-19.2-17.472-20.992L896 234.624zM298.688 469.248a21.312 21.312 0 0 1 0 42.688h-128a21.312 21.312 0 1 1 0-42.688h128z m0-85.312a21.312 21.312 0 0 1 0 42.688h-128a21.312 21.312 0 1 1 0-42.688h128z m0-85.312a21.312 21.312 0 0 1 0 42.624h-128a21.312 21.312 0 1 1 0-42.688h128z",
        fill: "currentColor"
      }
    )
  }
), tl = () => /* @__PURE__ */ h(
  "svg",
  {
    className: "icon",
    viewBox: "0 0 1024 1024",
    version: "1.1",
    xmlns: "http://www.w3.org/2000/svg",
    width: "16",
    height: "16",
    children: /* @__PURE__ */ h("path", { d: "M204.288 285.696c9.728 0 19.456-3.584 27.136-11.264 48.64-49.152 110.592-84.48 179.712-101.888 20.48-5.12 32.768-26.112 27.648-46.08-5.12-20.48-26.112-32.768-46.08-27.648-82.432 20.992-156.672 62.976-215.04 121.856-14.848 14.848-14.848 38.912 0.512 53.76 7.168 7.68 16.384 11.264 26.112 11.264zM602.112 92.16c-20.48-4.096-40.448 9.728-44.544 30.208-4.096 20.48 9.728 40.448 30.208 44.544 72.192 13.824 138.24 46.08 190.976 94.208 7.168 6.656 16.384 9.728 25.6 9.728 10.24 0 20.48-4.096 28.16-12.288 14.336-15.36 13.312-39.424-2.56-53.76-62.464-57.344-141.824-96.256-227.84-112.64zM948.736 386.56c-6.656-19.968-28.16-30.72-48.128-24.576-19.968 6.656-30.72 28.16-24.576 48.128 10.752 32.768 15.872 67.072 15.872 101.376 0 42.496-8.192 83.456-24.064 122.88-7.68 19.456 1.536 41.472 20.992 49.664 4.608 2.048 9.728 2.56 14.336 2.56 14.848 0 29.184-9.216 35.328-24.064 19.456-48.128 29.184-99.328 29.184-151.552 0.512-41.472-6.144-83.968-18.944-124.416zM775.168 765.952c-52.224 46.592-117.248 77.824-187.904 91.136-20.48 3.584-34.304 23.552-30.208 44.544 3.584 18.432 19.456 31.232 37.376 31.232 2.048 0 4.608 0 7.168-0.512 84.48-15.872 161.792-53.248 224.768-109.056 15.872-13.824 16.896-37.888 3.072-53.76-14.336-16.384-38.4-17.408-54.272-3.584zM415.232 851.968c-2.048-0.512-4.608-1.024-7.68-2.048-13.312-3.584-27.136-5.632-40.96-5.632H166.4l35.328-98.816c4.608-12.8 2.56-27.136-5.632-37.888-12.288-16.896-36.352-20.992-53.248-8.704-9.216 6.656-14.848 16.896-15.36 27.648l-49.152 138.24c-4.608 12.8-2.56 26.624 5.12 37.376 7.68 10.752 20.48 17.408 33.792 17.408h240.128c11.776 0 24.064 1.024 35.84 4.096 6.144 1.536 11.776 2.56 12.8 2.56 16.896 0 32.768-11.776 36.864-29.184 5.12-19.456-7.168-39.936-27.648-45.056zM108.032 651.264c3.584 0 7.168-0.512 10.752-1.536 19.968-5.632 31.744-27.136 26.112-47.104-8.704-29.696-12.8-59.904-12.8-91.136 0-33.792 5.12-66.56 15.36-98.816 6.144-19.968-4.608-41.472-24.576-47.616-19.968-6.144-41.472 4.608-47.616 24.576-12.288 39.424-18.944 80.384-18.944 121.344 0 37.888 5.12 75.776 15.872 112.128 4.096 17.408 19.456 28.16 35.84 28.16z" })
  }
), nl = () => /* @__PURE__ */ h(
  "svg",
  {
    className: "icon",
    viewBox: "0 0 1024 1024",
    version: "1.1",
    xmlns: "http://www.w3.org/2000/svg",
    width: "16",
    height: "16",
    children: /* @__PURE__ */ h("path", { d: "M204.288 285.184c9.728 0 19.456-3.584 27.136-11.264 48.64-49.152 111.104-84.48 179.712-101.888 20.48-5.12 32.768-26.112 27.648-46.08-5.12-20.48-26.112-32.768-46.08-27.648-82.432 20.992-156.672 62.976-215.04 121.856-14.848 14.848-14.848 38.912 0.512 53.76 6.656 7.68 16.384 11.264 26.112 11.264zM602.624 92.16c-20.48-4.096-40.448 9.728-44.544 30.208-4.096 20.48 9.728 40.448 30.208 44.544 72.192 13.824 138.24 46.08 190.976 94.72 7.168 6.656 16.384 9.728 25.6 9.728 10.24 0 20.48-4.096 28.16-12.288 14.336-15.36 13.312-39.424-2.56-53.76-62.976-57.856-141.824-97.28-227.84-113.152zM949.248 386.56c-6.656-19.968-28.16-30.72-48.128-24.576-19.968 6.656-30.72 28.16-24.576 48.128 10.752 32.768 15.872 67.072 15.872 101.888 0 42.496-8.192 83.968-24.064 122.88-7.68 19.456 1.536 41.472 20.992 49.664 4.608 2.048 9.728 2.56 14.336 2.56 14.848 0 29.184-9.216 35.328-24.064 19.456-48.64 29.696-99.328 29.696-151.552 0-42.496-6.656-84.48-19.456-124.928zM775.68 765.952c-52.224 46.592-117.248 77.824-187.904 91.136-20.48 3.584-34.304 23.552-30.72 44.544 3.584 18.432 19.456 31.232 37.376 31.232 2.048 0 4.608 0 7.168-0.512 84.48-15.872 162.304-53.248 224.768-109.056 15.872-13.824 17.408-37.888 3.072-53.76-14.336-15.872-38.4-17.408-53.76-3.584zM415.232 852.48c-2.048-0.512-4.608-1.024-7.68-2.048-13.312-3.584-27.136-5.632-40.96-5.632H166.4l35.328-98.816c4.608-12.8 2.56-27.136-5.632-37.888-12.288-16.896-36.352-20.992-53.248-8.704-9.216 6.656-14.848 16.896-15.36 27.648l-49.664 138.24c-4.608 12.8-2.56 26.624 5.12 37.376 7.68 10.752 20.48 17.408 33.792 17.408h240.64c11.776 0 24.064 1.024 35.84 4.096 6.144 1.536 11.776 2.56 13.312 2.56 16.896 0 32.768-11.776 36.864-29.184 4.608-19.456-8.192-39.936-28.16-45.056zM107.52 651.776c3.584 0 7.168-0.512 10.752-1.536 19.968-5.632 31.744-27.136 26.112-47.104-8.704-29.696-12.8-59.904-12.8-91.136 0-33.792 5.12-67.072 15.36-98.816 6.144-19.968-4.608-41.472-25.088-47.616-19.968-6.144-41.472 4.608-47.616 25.088-12.288 39.424-18.944 80.384-18.944 121.856 0 37.888 5.12 75.776 15.872 112.128 4.608 15.872 19.968 27.136 36.352 27.136zM658.944 390.656c-17.408-11.776-40.96-7.168-52.736 10.752l-141.824 212.48-71.68-71.68c-14.848-14.848-38.912-14.848-53.76 0-14.848 14.848-14.848 38.912 0 53.76l104.96 104.96c7.168 7.168 16.896 11.264 27.136 11.264h3.584c11.264-1.024 21.504-7.168 28.16-16.896l167.424-251.392c10.752-17.92 6.144-41.472-11.264-53.248z" })
  }
), dd = () => /* @__PURE__ */ h(
  "svg",
  {
    className: "icon",
    viewBox: "0 0 1024 1024",
    version: "1.1",
    xmlns: "http://www.w3.org/2000/svg",
    width: "1em",
    height: "1em",
    children: /* @__PURE__ */ h(
      "path",
      {
        d: "M811.097325 675.11798a38.455724 38.455724 0 0 1-54.382232 0L511.992078 430.406848 267.269064 675.11798a38.453744 38.453744 0 0 1-54.383222-54.380252l271.91116-271.899277a38.454734 38.454734 0 0 1 54.383222 0l271.911159 271.899277a38.450773 38.450773 0 0 1 0.005942 54.380252z",
        fill: "currentColor"
      }
    )
  }
), Hg = () => /* @__PURE__ */ h(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    class: "lucide lucide-lightbulb",
    "aria-hidden": "true",
    style: "transition: width, height, 150ms;",
    children: [
      /* @__PURE__ */ h(
        "path",
        {
          fill: "none",
          d: "M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"
        }
      ),
      /* @__PURE__ */ h("path", { d: "M9 18h6" }),
      /* @__PURE__ */ h("path", { d: "M10 22h4" })
    ]
  }
), jg = () => /* @__PURE__ */ h(
  "svg",
  {
    className: "icon",
    viewBox: "0 0 1024 1024",
    version: "1.1",
    xmlns: "http://www.w3.org/2000/svg",
    width: "16",
    height: "16",
    children: /* @__PURE__ */ h(
      "path",
      {
        d: "M671.744 107.666286a128 128 0 1 1 177.371429 183.369143l-87.478858 87.478857L580.608 197.485714l90.477714-90.477714 0.658286 0.658286z m-362.642286 723.382857v0.146286H128V650.093714L535.405714 242.761143l181.028572 181.028571-407.259429 407.259429zM0 896h1024V1024H0v-128z",
        fill: "currentColor"
      }
    )
  }
), Wg = () => /* @__PURE__ */ h(
  "svg",
  {
    className: "icon",
    viewBox: "0 0 1024 1024",
    version: "1.1",
    xmlns: "http://www.w3.org/2000/svg",
    width: "16",
    height: "16",
    children: [
      /* @__PURE__ */ h("path", { d: "M1008.64 993.28h-117.76v-460.8c0-8.704-6.656-15.36-15.36-15.36s-15.36 6.656-15.36 15.36v460.8h-150.016v-209.92c0-8.704-6.656-15.36-15.36-15.36s-15.36 6.656-15.36 15.36v209.92h-150.016v-250.88c0-8.704-6.656-15.36-15.36-15.36s-15.36 6.656-15.36 15.36v250.88H349.696v-296.96c0-8.704-6.656-15.36-15.36-15.36s-15.36 6.656-15.36 15.36v296.96H168.96v-174.08c0-8.704-6.656-15.36-15.36-15.36s-15.36 6.656-15.36 15.36v174.08H30.72V107.52c0-8.704-6.656-15.36-15.36-15.36s-15.36 6.656-15.36 15.36v901.12c0 8.192 6.656 15.36 15.36 15.36h993.28c8.704 0 15.36-7.168 15.36-15.36 0-8.704-6.656-15.36-15.36-15.36z" }),
      /* @__PURE__ */ h("path", { d: "M153.6 450.56c3.584 0 7.168-1.536 10.24-4.096l169.984-155.136 168.96 125.44c2.56 2.048 5.12 3.072 8.192 3.072l184.32 10.24c5.12 0.512 10.24-2.048 13.312-6.656l179.2-256c5.12-7.168 3.072-16.384-3.584-21.504-7.168-5.12-16.384-3.072-21.504 3.584l-174.08 248.832-171.008-9.728-175.616-129.536c-6.144-4.608-14.336-4.096-19.456 1.024l-179.2 163.84c-6.144 5.632-6.656 15.36-1.024 21.504 3.072 3.584 7.168 5.12 11.264 5.12z" })
    ]
  }
), Ug = () => /* @__PURE__ */ h(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    children: [
      /* @__PURE__ */ h("path", { d: "M3 3v18h18" }),
      /* @__PURE__ */ h("path", { d: "M7 16V12" }),
      /* @__PURE__ */ h("path", { d: "M11 16V8" }),
      /* @__PURE__ */ h("path", { d: "M15 16V4" }),
      /* @__PURE__ */ h("path", { d: "M19 16v-6" })
    ]
  }
), qg = () => /* @__PURE__ */ h(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    children: [
      /* @__PURE__ */ h("path", { d: "M12 3v14" }),
      /* @__PURE__ */ h("path", { d: "m5 10 7 7 7-7" }),
      /* @__PURE__ */ h("path", { d: "M5 21h14" })
    ]
  }
), Kg = () => /* @__PURE__ */ h(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    children: [
      /* @__PURE__ */ h("path", { d: "M12 21V7" }),
      /* @__PURE__ */ h("path", { d: "m5 14 7-7 7 7" }),
      /* @__PURE__ */ h("path", { d: "M5 3h14" })
    ]
  }
), Jg = () => /* @__PURE__ */ h(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    children: /* @__PURE__ */ h("path", { d: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" })
  }
), Gg = ({ text: n }) => {
  const [e, t] = V(n), i = F(null);
  return L(() => (i.current && clearTimeout(i.current), i.current = setTimeout(() => {
    t(n);
  }, 100), () => {
    i.current && clearTimeout(i.current);
  }), [n]), /* @__PURE__ */ h("div", { className: "streaming-content", children: e });
}, Xg = {
  disabled: "Disabled",
  enable: "Enable",
  automatic: "Automatic",
  customize: "Customize",
  default: "Default",
  recallSettings: "Recall settings",
  chunkRerank: "Recall and reordering",
  chunkPageIndex: "Data catalog recall",
  maxChunks: "Maximum recall quantity",
  chunkThreshold: "Recall similarity threshold",
  aiAssistant: "AI assistant",
  minimize: "Minimize",
  exitFullscreen: "Exit fullscreen",
  fullscreen: "Fullscreen",
  close: "Close",
  loading: "Loading...",
  agent: "Agent",
  knowledge: "Knowledge",
  knowledgeSearch: "Knowledge search",
  uploadDocument: "Upload document",
  documentation: "Documentation",
  voiceInput: "Voice input",
  voiceInputProgress: "Voice input progress...",
  stopGenerating: "Stop generating",
  sendMessage: "Send message",
  meterialResources: "Meterial resources",
  preview: "Preview",
  uploadSuccess: "Upload success",
  uploading: "Uploading",
  uploadFailed: "Upload failed",
  unknownState: "Unknown state",
  download: "Download",
  thinkThrough: "Think through",
  stopThinking: "Stop thinking",
  thinking: "Thinking",
  requestTimeout: "Request timeout",
  unsupportedMessageType: "Message types not currently supported: {type}",
  me: "Me",
  retry: "Failed to send, please try again",
  expand: "Expand",
  foldUp: "Foldup",
  stepExpand: "Expand the execution steps",
  stepFoldUp: "Execute step contraction",
  expandAll: "Expand all",
  copy: "Copy",
  copyMarkdown: "Copy Markdown",
  copied: "Copied",
  used: "Used",
  second: "Second",
  agentTool: "Intelligent agent tool call execution in progress",
  toolCallContraction: "Tool call contraction",
  toolCallExpansion: "Tool call expansion",
  summaryGeneration: "Intelligent summary generated from {count} original paragraphs",
  guidance: "[Guidance]",
  vector: "(Vector{count})",
  abstract: "[Abstract]",
  hitParagraph: "Hit the {count} sub paragraph",
  noData: "No data",
  knowledgeRetrieval: "Knowledge base retrieval:",
  imageContent: "Image content recognition",
  more: "More",
  resetConversation: "Reset conversation",
  clearConversation: "Clear the conversation",
  refresh: "Refresh",
  delete: "Delete",
  backfill: "Backfill",
  pinTop: "Pin to top",
  unpin: "Unpin",
  rename: "Rename",
  deleteTopic: "Delete topic",
  jumpMainView: "Jump to the main view",
  openSidebar: "Open the sidebar",
  enterSession: "Enter temporary session",
  exitSession: "Exit temporary session",
  collapseSidebar: "Collapse the sidebar",
  newConversation: "New conversation",
  newCreateConversation: "Create new conversation",
  searchTopics: "Search topics",
  noTopic: "No topic at the moment",
  clearSession: "Clear conversation",
  temporarySession: "Temporary session",
  like: "Like",
  downvote: "Downvote",
  search: "Search",
  searchFailed: "Search failed",
  errorOccurred: "An error occurred",
  protocol: "Not currently supporting {protocol} type protocols",
  downloadCannotEmpty: "The download action identifier [downloadactionid] cannot be empty",
  downloadExContext: "Download extension context [downloadContext] parameter parsing exception, correct format such as abc: 123; cde:456",
  userInterrupt: "User interrupt",
  actionIdCannotEmpty: "[actionid] cannot be empty",
  actionExContext: "Exception in parsing the parameter for behavior extension context [action_comtext], correct format: abc: 123; cde:456",
  notSupportingType: "Not supporting {type} recommendation type",
  chunkView: "The document fragment viewing interface does not exist. Please confirm if chunkView is configured",
  chunkEntity: "The document fragment entity identifier does not exist. Please confirm if chunkEntity is configured",
  extensionToolbarClick: "Extension toolbar click event not found",
  temporarySessionFailed: "Temporary session failed, no topic configuration backup configuration",
  reedit: "Re edit",
  cancel: "Cancel",
  questionPrev: "Previous",
  questionNext: "Next",
  questionSubmit: "Done",
  questionInputPlaceholder: "Please enter",
  questionOther: "Other",
  questionNoData: "No questions",
  send: "Send",
  unknownError: "Unknown error",
  statistics: "Statistics",
  totalTokens: "Total tokens",
  inputTokens: "Input tokens",
  outputTokens: "Output tokens",
  toolCallCount: "Tool calls",
  notCounted: "Not counted",
  notCalled: "Not called",
  noResearchContent: "There is currently no research content available",
  light: "Light",
  dark: "Dark",
  generateVisualReport: "Generate visual report",
  sourceMaterial: "Find the source of {docCount} article information",
  searchKeyword: "Search keywords: {keyword}",
  deepResearch: "Depth research report",
  textReport: "Text report",
  deepResearchReport: "In depth research report",
  noTextReportContent: "No text report content available at the moment"
}, Yg = {
  disabled: "禁用",
  enable: "启用",
  automatic: "自动",
  customize: "自定义",
  default: "默认",
  recallSettings: "召回设置",
  chunkRerank: "召回重排",
  chunkPageIndex: "资料目录召回",
  maxChunks: "最大召回数量",
  chunkThreshold: "召回相似度阈值",
  aiAssistant: "AI助手",
  minimize: "最小化",
  exitFullscreen: "退出全屏",
  fullscreen: "全屏",
  close: "关闭",
  loading: "加载中...",
  agent: "智能体",
  knowledge: "知识库",
  knowledgeSearch: "知识库搜索",
  uploadDocument: "上传资料",
  documentation: "文件资料",
  voiceInput: "语音输入",
  voiceInputProgress: "语音输入中...",
  stopGenerating: "停止生成",
  sendMessage: "发送消息",
  meterialResources: "素材资源",
  preview: "预览",
  uploadSuccess: "上传成功",
  uploading: "上传中",
  uploadFailed: "上传失败",
  unknownState: "未知状态",
  download: "下载",
  thinkThrough: "思考完成",
  stopThinking: "思考停止",
  thinking: "思考中",
  requestTimeout: "请求超时",
  unsupportedMessageType: "暂未支持的消息类型: {type}",
  me: "我",
  retry: "未发送成功，请重试",
  expand: "展开",
  foldUp: "收起",
  stepExpand: "执行步骤  展开",
  stepFoldUp: "执行步骤  收缩",
  expandAll: "展开全部",
  copy: "复制",
  copyMarkdown: "复制 Markdown",
  copied: "已复制",
  used: "已用",
  second: "秒",
  agentTool: "智能体工具调用执行中",
  toolCallContraction: "工具调用  收缩",
  toolCallExpansion: "工具调用  展开",
  summaryGeneration: "由{count}个原文段落智能总结生成",
  guidance: "[引导]",
  vector: "(向量{count})",
  abstract: "[摘要]",
  hitParagraph: "命中 {count} 个子段落",
  noData: "无数据",
  knowledgeRetrieval: "知识库检索：",
  imageContent: "图片内容识别",
  more: "更多",
  resetConversation: "重置对话",
  clearConversation: "清空对话",
  refresh: "刷新",
  delete: "删除",
  backfill: "回填",
  pinTop: "置顶",
  unpin: "取消置顶",
  rename: "重命名",
  deleteTopic: "删除话题",
  jumpMainView: "跳转主视图",
  openSidebar: "打开侧边栏",
  enterSession: "进入临时会话",
  exitSession: "退出临时会话",
  collapseSidebar: "收起侧边栏",
  newConversation: "新会话",
  newCreateConversation: "新建对话",
  searchTopics: "搜索话题",
  noTopic: "暂无话题",
  clearSession: "清空会话",
  temporarySession: "临时会话",
  like: "点赞",
  downvote: "点踩",
  search: "搜索",
  searchFailed: "搜索失败",
  errorOccurred: "发生错误",
  protocol: "暂不支持{protocol}类型协议",
  downloadCannotEmpty: "下载行为标识 [downloadactionid] 不能为空",
  downloadExContext: "下载扩展上下文 [downloadContext] 参数解析异常,正确格式如:abc:123;cde:456",
  userInterrupt: "用户中断",
  actionIdCannotEmpty: "行为标识 [actionid] 不能为空",
  actionExContext: "行为扩展上下文 [action_context] 参数解析异常,正确格式如:abc:123;cde:456",
  notSupportingType: "不支持{type}推荐类型",
  chunkView: "文档分片查看界面不存在，请确认chunkView是否配置",
  chunkEntity: "文档分片实体标识不存在，请确认chunkEntity是否配置",
  extensionToolbarClick: "未找到扩展工具栏点击事件",
  temporarySessionFailed: "临时会话失败，无话题配置备份配置",
  reedit: "重新编辑",
  cancel: "取消",
  questionPrev: "上一步",
  questionNext: "下一个",
  questionSubmit: "完成",
  questionInputPlaceholder: "请输入",
  questionOther: "其它",
  questionNoData: "暂无问题",
  send: "发送",
  unknownError: "未知错误",
  statistics: "统计",
  totalTokens: "Token消耗总数",
  inputTokens: "输入Token消耗",
  outputTokens: "输出Token消耗",
  toolCallCount: "工具调用次数",
  notCounted: "未统计",
  notCalled: "未调用",
  noResearchContent: "暂无研究内容",
  light: "亮色",
  dark: "暗色",
  generateVisualReport: "生成可视化报告",
  sourceMaterial: "找到 {docCount} 篇资料来源",
  searchKeyword: "搜索关键词：{keyword}",
  deepResearch: "深度研报",
  textReport: "文本报告",
  deepResearchReport: "深度研究报告",
  noTextReportContent: "暂无文本报告内容"
};
class Zg {
  constructor() {
    /**
     * @description 区域
     * @private
     * @memberof I18n
     */
    _(this, "locale", X(
      "zh-CN"
      /* ZH_CN */
    ));
    /**
     * @description 语言
     * @private
     * @memberof I18n
     */
    _(this, "language", {
      en: Xg,
      "zh-CN": Yg
    });
    /**
     * @description 翻译函数，会自动响应语言变化
     */
    _(this, "t", So(() => {
      const e = this.locale.value;
      return (t, i) => {
        const r = this.language[e][t];
        return r ? typeof r == "function" ? r(i) : i ? r.replace(/\{(\w+)\}/g, (s, o) => i[o] !== void 0 ? String(i[o]) : s) : r : t;
      };
    }));
  }
  /**
   * @description 区域
   * @param {Locale} locale
   * @memberof I18n
   */
  setLocale(e) {
    this.locale.value = e;
  }
  /**
   * @description 设置语言
   * @param {Record<string, any>} language
   * @memberof I18n
   */
  setLanguage(e) {
    Object.keys(e).forEach((t) => {
      this.language.hasOwnProperty(t) ? Object.assign(this.language[t], e[t]) : this.language[t] = e[t];
    });
  }
}
const k = new Zg();
const Ao = (n) => {
  const { item: e } = n, t = new P("chat-think"), i = F(null), r = $(""), s = $(e.collapse || !0), o = $(!1);
  let a;
  const l = (d) => {
    var f;
    d.stopPropagation(), !o.value && (a && clearTimeout(a), o.value = !0, xn.copy(JSON.stringify(e.description, void 0, 2)), (f = n.controller.opts.utils) == null || f.message.success(k.t.value("copied")), a = setTimeout(() => {
      o.value = !1;
    }, 2e3));
  }, c = () => {
    const d = i.current;
    !d || !e.collapse || d.scrollTo({
      top: d.scrollHeight,
      behavior: "auto"
    });
  };
  L(() => {
    if (e.beginTime) {
      const d = e.endTime || Date.now();
      r.value = ((d - e.beginTime) / 1e3).toFixed(1);
    }
    e.done || (c(), e.description && (e.description = e.description.replace(/^\n+/, "").replace(/\n\n/g, "\n"))), If(e.collapse) || (s.value = e.collapse);
  }, [e]);
  const u = () => {
    s.value = !s.value, e.collapse = s.value;
  };
  if (e.description)
    return /* @__PURE__ */ h(
      "div",
      {
        className: "".concat(t.b(), " ").concat(t.is("collapsed", s.value), " ").concat(t.is("loading", !e.done)),
        children: [
          /* @__PURE__ */ h("div", { className: t.e("header"), children: [
            /* @__PURE__ */ h("div", { className: t.e("icon"), children: /* @__PURE__ */ h(Hg, {}) }),
            /* @__PURE__ */ h("div", { className: t.e("title"), onClick: () => u(), children: [
              e.title,
              r.value ? /* @__PURE__ */ h("span", { className: t.e("time"), children: [
                "(",
                k.t.value("used"),
                " ",
                r.value,
                " ",
                k.t.value("second"),
                ")"
              ] }) : null,
              /* @__PURE__ */ h(Hn, {})
            ] })
          ] }),
          /* @__PURE__ */ h("div", { className: t.e("content"), ref: i, children: /* @__PURE__ */ h(Gg, { text: e.description }) }),
          /* @__PURE__ */ h(
            "span",
            {
              title: k.t.value("copy"),
              className: t.e("copy"),
              onClick: (d) => l(d),
              children: o.value ? dr : hr
            }
          )
        ]
      }
    );
};
const Qg = (n) => {
  const { suggestions: e, onSuggestionClick: t, uiactions: i, onUIActionClick: r } = n, s = (l, c) => {
    t == null || t(l, c);
  }, o = (l, c) => {
    r == null || r(l, c);
  }, a = new P("chat-suggestions");
  return /* @__PURE__ */ h("div", { className: "".concat(a.b()), children: [
    e && e.length > 0 && e.map((l, c) => /* @__PURE__ */ h(
      "div",
      {
        className: "".concat(a.e("item"), " ").concat(a.is(
          "action",
          l.type === "action"
        )),
        onClick: (u) => s(l, u),
        title: l.metadata.content_name,
        children: [
          l.metadata.content_name,
          /* @__PURE__ */ h(Za, { className: "".concat(a.e("item-icon")) })
        ]
      },
      c
    )),
    i && i.length > 0 && i.map((l, c) => /* @__PURE__ */ h(
      "div",
      {
        className: "".concat(a.e("item"), " ").concat(a.is("action", l.type === "action")),
        onClick: (u) => o(l, u),
        title: l.metadata.content_name,
        children: [
          l.metadata.content_name,
          /* @__PURE__ */ h(Za, { className: "".concat(a.e("item-icon")) })
        ]
      },
      "action-".concat(c)
    ))
  ] });
};
const e2 = (n) => {
  var u, d;
  const e = new P("default-tool-call"), t = $(!1), i = $(!1);
  let r;
  const s = () => {
    var f;
    t.value = !t.value, (f = n.onCollapseChange) == null || f.call(n, t.value);
  }, o = (f) => {
    var p;
    f.stopPropagation(), !i.value && (r && clearTimeout(r), i.value = !0, xn.copy(JSON.stringify(n.item, void 0, 2)), (p = n.controller.opts.utils) == null || p.message.success(k.t.value("copied")), r = setTimeout(() => {
      i.value = !1;
    }, 2e3));
  };
  L(() => () => {
    r && clearTimeout(r);
  }, []);
  const a = (f) => typeof f == "string" ? f.includes("Failed") || f.includes("Error") || f.includes("ERR_") ? '<span class="error">"'.concat(f, '"</span>') : '<span class="string">"'.concat(f, '"</span>') : typeof f == "number" ? '<span class="number">'.concat(f, "</span>") : typeof f == "boolean" ? '<span class="boolean">'.concat(f, "</span>") : f === null ? '<span class="null">null</span>' : "", l = (f, p = 0) => {
    const m = "  ".repeat(p), v = [];
    if (Array.isArray(f)) {
      if (f.length === 0)
        return ["".concat(m, '<span class="array">[]</span>')];
      v.push("".concat(m, '<span class="array">[</span>')), f.forEach((y, g) => {
        const b = l(y, p + 1), w = g < f.length - 1 ? "," : "";
        typeof y == "object" && y !== null ? (v.push(...b.slice(0, -1)), v.push("".concat(b[b.length - 1]).concat(w))) : v.push("".concat(b[0]).concat(w));
      }), v.push("".concat(m, '<span class="array">]</span>'));
    } else if (typeof f == "object" && f !== null) {
      const y = Object.keys(f);
      if (y.length === 0)
        return ["".concat(m, '<span class="property">{}</span>')];
      v.push("".concat(m, '<span class="property">{</span>')), y.forEach((g, b) => {
        const w = f[g], C = b < y.length - 1 ? "," : "", x = '<span class="json-key">"'.concat(g, '":</span>');
        if (typeof w == "object" && w !== null) {
          const S = l(w, p + 1);
          v.push("".concat(m, "  ").concat(x, " ").concat(S[0].trim())), S.length > 1 && (v.push(...S.slice(1, -1)), v.push("".concat(S[S.length - 1]).concat(C)));
        } else {
          const S = a(w);
          v.push("".concat(m, "  ").concat(x, " ").concat(S).concat(C));
        }
      }), v.push("".concat(m, '<span class="property">}</span>'));
    } else
      v.push("".concat(m).concat(a(f)));
    return v;
  }, c = ve(() => l(n.item, 0).map(
    (p, m) => '<span class="line-number">'.concat(m + 1, "</span>").concat(p)
  ));
  return /* @__PURE__ */ h("div", { className: "".concat(e.b(), " ").concat(n.className || ""), children: [
    /* @__PURE__ */ h("div", { className: e.e("header"), onClick: () => s(), children: [
      /* @__PURE__ */ h("div", { className: e.e("header-left"), children: [
        /* @__PURE__ */ h("div", { className: e.em("header-left", "caption"), children: n.item.name }),
        /* @__PURE__ */ h(
          "div",
          {
            className: e.em("header-left", "desc"),
            title: ((u = n.item.parameters) == null ? void 0 : u.desc) || "",
            children: ((d = n.item.parameters) == null ? void 0 : d.desc) || ""
          }
        )
      ] }),
      /* @__PURE__ */ h("div", { className: e.e("header-right"), children: [
        n.item.error && /* @__PURE__ */ h("span", { style: "color: red;", children: k.t.value("errorOccurred") }),
        n.item.error && No,
        /* @__PURE__ */ h(
          "span",
          {
            title: k.t.value("copy"),
            className: e.e("copy"),
            onClick: (f) => o(f),
            children: i.value ? dr : hr
          }
        ),
        /* @__PURE__ */ h(
          Hn,
          {
            style: {
              "margin-left": " 6px",
              transform: t.value ? "rotate(90deg)" : "rotate(0deg)"
            }
          }
        )
      ] })
    ] }),
    t.value && /* @__PURE__ */ h("div", { className: e.e("content"), children: c.value.map((f, p) => /* @__PURE__ */ h(
      "div",
      {
        className: "code-line",
        dangerouslySetInnerHTML: { __html: f }
      },
      p
    )) })
  ] });
};
const t2 = (n) => {
  var v, y;
  const e = new P("chunk-tool-call"), t = $([]), i = $(!1), r = $(!1);
  let s;
  const o = () => {
    var g;
    i.value = !i.value, (g = n.onCollapseChange) == null || g.call(n, i.value);
  }, a = (g) => {
    var b;
    g.stopPropagation(), !r.value && (s && clearTimeout(s), r.value = !0, xn.copy(JSON.stringify(n.item, void 0, 2)), (b = n.controller.opts.utils) == null || b.message.success(k.t.value("copied")), s = setTimeout(() => {
      r.value = !1;
    }, 2e3));
  }, l = (g) => {
    const b = /\[(.+?)\]\((.+?)\)/g;
    return g.replace(b, (w, C, x) => '<a href="'.concat(x, '">').concat(C, "</a>"));
  };
  L(() => {
    var C;
    const g = Fc(((C = n.item.result) == null ? void 0 : C.chunks) || []), b = g.filter(
      (x) => x.type === "SOURCE"
    ), w = g.filter(
      (x) => x.type !== "SOURCE"
    );
    w.forEach((x) => {
      x.type === "CLUSTER" && (x.children = b.filter((S) => S.pid === x.id), x.isExpand = !1);
    }), t.value = w;
  }, [n.item]), L(() => () => {
    s && clearTimeout(s);
  }, []);
  const c = (g, b) => {
    g.stopPropagation(), b.isExpand = !b.isExpand, t.value = [...t.value];
  }, u = (g) => {
    const b = l(g);
    return /* @__PURE__ */ h(
      "div",
      {
        onClick: (w) => n.onLinkClick(w),
        dangerouslySetInnerHTML: { __html: b }
      }
    );
  }, d = (g) => /* @__PURE__ */ h("div", { className: e.e("footer"), children: [
    g.type === "CLUSTER" && (g.source_count || g.source_count === 0) && /* @__PURE__ */ h("div", { className: e.em("footer", "description"), children: k.t.value("summaryGeneration", { count: g.source_count }) }),
    /* @__PURE__ */ h("div", { className: e.em("footer", "docname"), children: g.docname })
  ] }), f = (g) => {
    var b;
    return /* @__PURE__ */ h(
      "div",
      {
        className: "".concat(e.e("item"), " ").concat(e.em("item", ((b = g.type) == null ? void 0 : b.toLowerCase()) || "default")),
        children: [
          g.type === "KBGUIDANCE" ? /* @__PURE__ */ h("div", { className: e.e("kbguidance"), children: k.t.value("guidance") }) : /* @__PURE__ */ h(
            "div",
            {
              className: e.e("similarity"),
              style: "--percent: ".concat(((g.similarity || 0) * 100).toFixed(2), "%;"),
              children: "SCORE ".concat((g.similarity || 0).toFixed(2))
            }
          ),
          g.original && /* @__PURE__ */ h("div", { className: e.e("original"), children: k.t.value("vector", {
            count: (g.original || 0).toFixed(2)
          }) }),
          /* @__PURE__ */ h("div", { className: e.em("item", "content"), title: g.content, children: u(g.content) })
        ]
      },
      g.id
    );
  }, p = (g) => {
    var b, w;
    return g.type === "CLUSTER" ? /* @__PURE__ */ h("div", { className: "".concat(e.e("chunk"), " ").concat(e.e("cluster")), children: [
      /* @__PURE__ */ h("div", { className: e.em("cluster", "header"), children: [
        /* @__PURE__ */ h(
          "div",
          {
            className: e.e("similarity"),
            style: "--percent: ".concat(((g.similarity || 0) * 100).toFixed(2), "%;"),
            children: "SCORE ".concat((g.similarity || 0).toFixed(2))
          }
        ),
        g.original && /* @__PURE__ */ h("div", { className: e.e("original"), children: k.t.value("vector", {
          count: (g.original || 0).toFixed(2)
        }) }),
        /* @__PURE__ */ h("div", { className: e.em("cluster", "title"), children: k.t.value("abstract") }),
        /* @__PURE__ */ h("div", { className: e.em("cluster", "summary"), title: g.content, children: u(g.content) })
      ] }),
      /* @__PURE__ */ h("div", { className: e.em("cluster", "content"), children: [
        /* @__PURE__ */ h(
          "div",
          {
            className: e.em("cluster", "icon"),
            onClick: (C) => c(C, g),
            children: [
              /* @__PURE__ */ h(
                Hn,
                {
                  style: {
                    transform: g.isExpand ? "rotate(90deg)" : "rotate(0deg)"
                  }
                }
              ),
              k.t.value("hitParagraph", {
                count: ((b = g.children) == null ? void 0 : b.length) || 0
              })
            ]
          }
        ),
        g.isExpand && /* @__PURE__ */ h("div", { className: e.em("cluster", "children"), children: (w = g.children) == null ? void 0 : w.map((C) => f(C)) })
      ] }),
      d(g)
    ] }, g.id) : /* @__PURE__ */ h("div", { className: "".concat(e.e("chunk"), " ").concat(e.e("default")), children: [
      f(g),
      d(g)
    ] }, g.id);
  }, m = () => n.item.error ? /* @__PURE__ */ h("div", { className: "".concat(e.e("error"), " ").concat(e.e("center-text")), children: n.item.result }) : t.value.length > 0 ? t.value.map((g) => p(g)) : /* @__PURE__ */ h("div", { className: "".concat(e.e("center-text")), children: k.t.value("noData") });
  return /* @__PURE__ */ h("div", { className: "".concat(e.b(), " ").concat(n.className || ""), children: [
    /* @__PURE__ */ h("div", { className: e.e("header"), onClick: () => o(), children: [
      /* @__PURE__ */ h("div", { className: e.e("header-left"), children: [
        /* @__PURE__ */ h("div", { className: e.em("header-left", "icon"), children: Eo }),
        /* @__PURE__ */ h("div", { className: e.em("header-left", "caption"), children: k.t.value("knowledgeRetrieval") }),
        /* @__PURE__ */ h(
          "div",
          {
            className: e.em("header-left", "desc"),
            title: (v = n.item.result) == null ? void 0 : v.query,
            children: (y = n.item.result) == null ? void 0 : y.query
          }
        )
      ] }),
      /* @__PURE__ */ h("div", { className: e.e("header-right"), children: [
        n.item.error && /* @__PURE__ */ h("span", { style: "color: red;", children: k.t.value("errorOccurred") }),
        n.item.error && No,
        /* @__PURE__ */ h(
          "span",
          {
            title: k.t.value("copy"),
            className: e.e("copy"),
            onClick: (g) => a(g),
            children: r.value ? dr : hr
          }
        ),
        /* @__PURE__ */ h(
          Hn,
          {
            style: {
              "margin-left": " 6px",
              transform: i.value ? "rotate(90deg)" : "rotate(0deg)"
            }
          }
        )
      ] })
    ] }),
    i.value && /* @__PURE__ */ h("div", { className: e.e("content"), children: m() })
  ] });
};
const n2 = (n) => {
  const e = new P("chat-image-preview");
  return /* @__PURE__ */ h("div", { className: "el-image-viewer__wrapper ".concat(e.b()), children: [
    /* @__PURE__ */ h(
      "div",
      {
        className: "el-image-viewer__mask",
        onClick: (t) => {
          var i;
          return (i = n.onClose) == null ? void 0 : i.call(n, t);
        }
      }
    ),
    /* @__PURE__ */ h(
      "span",
      {
        className: "el-image-viewer__btn el-image-viewer__close",
        onClick: (t) => {
          var i;
          return (i = n.onClose) == null ? void 0 : i.call(n, t);
        },
        children: /* @__PURE__ */ h("i", { className: "el-icon", children: /* @__PURE__ */ h("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 1024 1024", children: /* @__PURE__ */ h(
          "path",
          {
            fill: "currentColor",
            d: "M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"
          }
        ) }) })
      }
    ),
    /* @__PURE__ */ h(
      "div",
      {
        className: "el-image-viewer__canvas",
        onClick: (t) => t.stopPropagation(),
        children: /* @__PURE__ */ h(
          "img",
          {
            src: n.src,
            className: "el-image-viewer__img",
            style: "transform: scale(1) rotate(0deg) translate(0px, 0px);"
          }
        )
      }
    )
  ] });
};
const i2 = (n) => {
  var u, d, f;
  const e = new P("image-tool-call"), t = $(!1), i = $(!1), r = $(!1);
  let s;
  const o = () => {
    var p;
    i.value = !i.value, (p = n.onCollapseChange) == null || p.call(n, i.value);
  }, a = (p) => {
    var m;
    p.stopPropagation(), !r.value && (s && clearTimeout(s), r.value = !0, xn.copy(JSON.stringify(n.item, void 0, 2)), (m = n.controller.opts.utils) == null || m.message.success(k.t.value("copied")), s = setTimeout(() => {
      r.value = !1;
    }, 2e3));
  };
  L(() => () => {
    s && clearTimeout(s);
  }, []);
  const l = () => {
    var p;
    (p = n.item.result) != null && p.image_url && (t.value = !t.value);
  }, c = () => {
    var p, m, v, y;
    return n.item.error ? /* @__PURE__ */ h("div", { className: "".concat(e.e("error"), " ").concat(e.e("center-text")), children: n.item.result }) : (p = n.item.result) != null && p.image_url || (m = n.item.result) != null && m.content ? [
      /* @__PURE__ */ h(
        "img",
        {
          className: e.e("image"),
          src: (v = n.item.result) == null ? void 0 : v.image_url,
          onClick: l
        },
        "image"
      ),
      /* @__PURE__ */ h("div", { className: e.e("description"), children: (y = n.item.result) == null ? void 0 : y.content }, "description")
    ] : /* @__PURE__ */ h("div", { className: "".concat(e.e("center-text")), children: k.t.value("noData") });
  };
  return /* @__PURE__ */ h("div", { className: "".concat(e.b(), " ").concat(n.className || ""), children: [
    /* @__PURE__ */ h("div", { className: e.e("header"), onClick: () => o(), children: [
      /* @__PURE__ */ h("div", { className: e.e("header-left"), children: [
        /* @__PURE__ */ h("div", { className: e.em("header-left", "icon"), children: Bg }),
        /* @__PURE__ */ h("div", { className: e.em("header-left", "caption"), children: k.t.value("imageContent") }),
        /* @__PURE__ */ h(
          "div",
          {
            className: e.em("header-left", "desc"),
            title: ((u = n.item.parameters) == null ? void 0 : u.desc) || "",
            children: ((d = n.item.parameters) == null ? void 0 : d.desc) || ""
          }
        )
      ] }),
      /* @__PURE__ */ h("div", { className: e.e("header-right"), children: [
        n.item.error && /* @__PURE__ */ h("span", { style: "color: red;", children: k.t.value("errorOccurred") }),
        n.item.error && No,
        /* @__PURE__ */ h(
          "span",
          {
            title: k.t.value("copy"),
            className: e.e("copy"),
            onClick: (p) => a(p),
            children: r.value ? dr : hr
          }
        ),
        /* @__PURE__ */ h(
          Hn,
          {
            style: {
              "margin-left": " 6px",
              transform: i.value ? "rotate(90deg)" : "rotate(0deg)"
            }
          }
        )
      ] })
    ] }),
    i.value && /* @__PURE__ */ h("div", { className: e.e("content"), children: c() }),
    t.value && /* @__PURE__ */ h(
      n2,
      {
        src: (f = n.item.result) == null ? void 0 : f.image_url,
        onClose: l
      }
    )
  ] });
};
const r2 = (n) => {
  const e = new P("chat-tool-call-item");
  let t = null;
  switch (n.item.type) {
    case "fetch_chunks":
      t = t2;
      break;
    case "desc_oss_image":
      t = i2;
      break;
    default:
      t = e2;
  }
  return ke(t, {
    item: n.item,
    className: e.b(),
    controller: n.controller,
    onLinkClick: (i) => {
      n.onLinkClick(i);
    },
    onCollapseChange: (i) => {
      var r;
      (r = n.onCollapseChange) == null || r.call(n, i);
    }
  });
};
const Io = (n) => {
  const { items: e, onLinkClick: t, onCollapseChange: i } = n, r = new P("chat-tool-call"), s = $([]), o = $(!1), a = $(!1), l = (d) => {
    t == null || t(d);
  };
  L(() => {
    s.value = e.filter((d) => d), a.value = e.length > 4;
  }, [e]);
  const c = ve(() => a.value && !o.value ? s.value.slice(0, 4) : s.value), u = () => {
    o.value = !o.value;
  };
  return /* @__PURE__ */ h("div", { className: "".concat(r.b()), children: [
    !n.toolcallCompleted && /* @__PURE__ */ h("div", { className: r.e("loading-container"), children: [
      /* @__PURE__ */ h("div", { className: r.e("loading-text"), children: k.t.value("agentTool") }),
      /* @__PURE__ */ h("div", { className: r.e("loading-dot") }),
      /* @__PURE__ */ h("div", { className: r.e("loading-dot") }),
      /* @__PURE__ */ h("div", { className: r.e("loading-dot") })
    ] }),
    n.toolcallCompleted && c.value.map((d, f) => /* @__PURE__ */ h(
      r2,
      {
        item: d,
        controller: n.controller,
        onLinkClick: l,
        onCollapseChange: (p) => i == null ? void 0 : i(p)
      },
      f
    )),
    n.toolcallCompleted && a.value && /* @__PURE__ */ h("div", { className: r.e("toggle"), onClick: u, children: /* @__PURE__ */ h("span", { className: r.e("toggle-label"), children: o.value ? k.t.value("toolCallContraction") : k.t.value("toolCallExpansion") }) })
  ] });
};
const vi = new P("chat-search"), Oo = (n) => {
  const {
    value: e,
    className: t,
    placeholder: i,
    autoFocus: r = !1,
    onChange: s,
    onEnter: o
  } = n, [a, l] = V(!1), c = F(null);
  L(() => {
    var f;
    r && ((f = c.current) == null || f.focus());
  }, []);
  const u = (f) => {
    var p;
    f.stopPropagation(), s == null || s((p = f.target) == null ? void 0 : p.value);
  }, d = (f) => {
    var p;
    f.code === "Enter" && (o == null || o((p = f.target) == null ? void 0 : p.value));
  };
  return /* @__PURE__ */ h(
    "div",
    {
      className: "".concat(vi.b(), " ").concat(vi.is("focus", a), " ").concat(t || ""),
      children: [
        /* @__PURE__ */ h("div", { className: vi.e("prefix"), children: /* @__PURE__ */ h($g, {}) }),
        /* @__PURE__ */ h(
          "input",
          {
            value: e,
            ref: c,
            className: vi.e("inner"),
            placeholder: i,
            onFocus: () => l(!0),
            onBlur: () => l(!1),
            onChange: (f) => u(f),
            onKeyDown: d
          }
        )
      ]
    }
  );
};
const il = new P("chat-loading"), hd = (n) => {
  const { size: e = 24 } = n;
  return /* @__PURE__ */ h("div", { className: il.b(), children: /* @__PURE__ */ h(
    "div",
    {
      className: il.e("spinner"),
      style: { width: "".concat(e, "px"), height: "".concat(e, "px") },
      children: /* @__PURE__ */ h(_g, {})
    }
  ) });
};
const we = new P("chat-single-select"), Do = (n) => {
  var ut;
  const {
    value: e,
    options: t,
    popperStyle: i,
    className: r = "",
    disabled: s = !1,
    showBorder: o = !0,
    enableSearch: a = !1,
    placeholder: l = "请选择",
    icon: c,
    onChange: u,
    onSearch: d
  } = n, f = !!t.length && !s, p = F(null), m = F(null), v = $(""), [y, g] = V(e), [b, w] = V(t), [C, x] = V(!1), [S, M] = V(!1), A = ((ut = t.find((q) => q.value === y)) == null ? void 0 : ut.label) || l;
  L(() => {
    C === !1 && (v.value = "", w(t));
  }, [C]), L(() => {
    g(e);
  }, [e]), L(() => {
    w(t);
  }, [t]), L(() => {
    const q = (le) => {
      var li, oa;
      !f || s || (li = m.current) != null && li.contains(le.target) || ((oa = p.current) != null && oa.contains(le.target) ? x((Nf) => !Nf) : x(!1));
    };
    return document.addEventListener("mousedown", q), () => {
      document.removeEventListener("mousedown", q);
    };
  }, []);
  const E = (q) => {
    g(q.value), u == null || u(q.value), x(!1);
  }, H = (q) => {
    v.value = q;
  }, U = async (q) => {
    try {
      M(!0);
      let le = [];
      d ? le = await d(q) : le = t.filter(
        (li) => li.label.toLowerCase().includes(q.toLowerCase())
      ), w(le);
    } catch (le) {
      w([]), console.error(k.t.value("searchFailed"), le);
    } finally {
      M(!1);
    }
  }, ae = () => S ? /* @__PURE__ */ h(hd, {}) : b.length ? b.map((q) => /* @__PURE__ */ h(
    "li",
    {
      title: q.label,
      onClick: () => E(q),
      className: "".concat(we.em("dropdown", "item"), " ").concat(we.is("active", q.value === y)),
      children: q.label
    },
    q.value
  )) : /* @__PURE__ */ h("li", { className: "el-empty ".concat(we.e("empty")), children: [
    ud,
    /* @__PURE__ */ h("div", { className: we.em("empty", "text"), children: k.t.value("noData") })
  ] });
  return /* @__PURE__ */ h("div", { className: "".concat(we.b(), " ").concat(r), children: [
    /* @__PURE__ */ h(
      "div",
      {
        className: "".concat(we.e("button"), " ").concat(o ? we.em("button", "border") : "", " ").concat(we.is("focus", C)),
        ref: p,
        children: [
          c ? /* @__PURE__ */ h(
            "span",
            {
              className: "".concat(we.em("button", "icon"), " ").concat(we.em("button", "prefix")),
              children: c()
            }
          ) : null,
          /* @__PURE__ */ h("span", { title: A, className: we.em("button", "caption"), children: A }),
          f ? /* @__PURE__ */ h(
            "span",
            {
              className: "".concat(we.em("button", "icon"), " ").concat(we.em("button", "suffix")),
              children: C ? dd() : ld()
            }
          ) : null
        ]
      }
    ),
    C ? /* @__PURE__ */ h("div", { className: we.e("dropdown"), ref: m, style: i, children: [
      a ? /* @__PURE__ */ h("div", { className: we.em("dropdown", "search"), children: /* @__PURE__ */ h(
        Oo,
        {
          placeholder: k.t.value("search"),
          autoFocus: !0,
          value: v.value,
          onEnter: U,
          onChange: H
        }
      ) }) : null,
      /* @__PURE__ */ h("ul", { className: we.em("dropdown", "list"), children: ae() })
    ] }) : null
  ] });
};
const Te = new P("chat-multiple-select"), fd = (n) => {
  const {
    value: e,
    options: t,
    placeholder: i,
    popperStyle: r,
    enableSearch: s = !1,
    icon: o,
    onChange: a,
    onSearch: l
  } = n, c = F(null), u = F(null), d = $(""), [f, p] = V(!1), [m, v] = V(!1), [y, g] = V(e || []), [b, w] = V(t);
  L(() => {
    f === !1 && (d.value = "", w(t));
  }, [f]), L(() => {
    g(e || []);
  }, [e]), L(() => {
    w(t);
  }, [t]), L(() => {
    const E = (H) => {
      var U, ae;
      H.stopPropagation(), !(H.target && ((U = u.current) != null && U.contains(H.target))) && ((ae = c.current) != null && ae.contains(H.target) ? p((ut) => !ut) : p(!1));
    };
    return document.addEventListener("mousedown", E), () => {
      document.removeEventListener("mousedown", E);
    };
  }, []);
  const C = (E) => {
    const U = y.includes(E.value) ? y.filter((ae) => ae !== E.value) : [...y, E.value];
    g(U), a == null || a(U);
  }, x = (E) => {
    d.value = E;
  }, S = async (E) => {
    try {
      v(!0);
      let H = [];
      l ? (v(!0), H = await l(E), v(!1)) : H = t.filter(
        (U) => U.label.toLowerCase().includes(E.toLowerCase())
      ), w(H);
    } catch (H) {
      w([]), console.error(k.t.value("searchFailed"), H);
    } finally {
      v(!1);
    }
  }, M = (E) => {
    var H, U;
    E.target && ((H = u.current) != null && H.contains(E.target) || (U = c.current) != null && U.contains(E.target)) || n.onEnableChange && n.onEnableChange();
  }, A = () => m ? /* @__PURE__ */ h(hd, {}) : b.length ? b.map((E) => /* @__PURE__ */ h(
    "li",
    {
      title: E.label,
      className: Te.em("dropdown", "item"),
      onClick: () => C(E),
      children: [
        /* @__PURE__ */ h(
          "input",
          {
            type: "checkbox",
            value: E.value,
            className: Te.em("dropdown", "item-checkbox"),
            checked: y.includes(E.value)
          }
        ),
        /* @__PURE__ */ h("div", { className: Te.em("dropdown", "item-label"), children: E.label })
      ]
    },
    E.value
  )) : /* @__PURE__ */ h("li", { className: "el-empty ".concat(Te.e("empty")), children: [
    ud,
    /* @__PURE__ */ h("div", { className: Te.em("empty", "text"), children: k.t.value("noData") })
  ] });
  return /* @__PURE__ */ h(
    "div",
    {
      className: "".concat(Te.b(), " ").concat(n.className ? n.className : ""),
      onClick: (E) => M(E),
      children: [
        /* @__PURE__ */ h("div", { className: Te.e("button"), title: i, children: [
          o ? /* @__PURE__ */ h(
            "span",
            {
              className: "".concat(Te.em("button", "icon"), " ").concat(Te.em("button", "prefix")),
              children: o()
            }
          ) : null,
          i ? [
            /* @__PURE__ */ h("span", { className: Te.em("button", "caption"), children: i }, "placeholder"),
            /* @__PURE__ */ h(
              "span",
              {
                ref: c,
                className: "".concat(Te.em("button", "icon"), " ").concat(Te.em("button", "suffix")),
                children: f ? dd() : ld()
              },
              "icon"
            )
          ] : null
        ] }),
        f ? /* @__PURE__ */ h("div", { className: Te.e("dropdown"), ref: u, style: r, children: [
          s ? /* @__PURE__ */ h("div", { className: Te.em("dropdown", "search"), children: /* @__PURE__ */ h(
            Oo,
            {
              placeholder: k.t.value("search"),
              autoFocus: !0,
              value: d.value,
              onEnter: S,
              onChange: x
            }
          ) }) : null,
          /* @__PURE__ */ h("ul", { className: Te.em("dropdown", "list"), children: A() })
        ] }) : null
      ]
    }
  );
};
function pd(n, e) {
  for (var t in e)
    n[t] = e[t];
  return n;
}
function rl(n, e) {
  for (var t in n)
    if (t !== "__source" && !(t in e))
      return !0;
  for (var i in e)
    if (i !== "__source" && n[i] !== e[i])
      return !0;
  return !1;
}
function sl(n, e) {
  this.props = n, this.context = e;
}
(sl.prototype = new ze()).isPureReactComponent = !0, sl.prototype.shouldComponentUpdate = function(n, e) {
  return rl(this.props, n) || rl(this.state, e);
};
var ol = R.__b;
R.__b = function(n) {
  n.type && n.type.__f && n.ref && (n.props.ref = n.ref, n.ref = null), ol && ol(n);
};
var s2 = typeof Symbol < "u" && Symbol.for && Symbol.for("react.forward_ref") || 3911;
function o2(n) {
  function e(t) {
    var i = pd({}, t);
    return delete i.ref, n(i, t.ref || null);
  }
  return e.$$typeof = s2, e.render = n, e.prototype.isReactComponent = e.__f = !0, e.displayName = "ForwardRef(" + (n.displayName || n.name) + ")", e;
}
var a2 = R.__e;
R.__e = function(n, e, t, i) {
  if (n.then) {
    for (var r, s = e; s = s.__; )
      if ((r = s.__c) && r.__c)
        return e.__e == null && (e.__e = t.__e, e.__k = t.__k), r.__c(n, e);
  }
  a2(n, e, t, i);
};
var al = R.unmount;
function md(n, e, t) {
  return n && (n.__c && n.__c.__H && (n.__c.__H.__.forEach(function(i) {
    typeof i.__c == "function" && i.__c();
  }), n.__c.__H = null), (n = pd({}, n)).__c != null && (n.__c.__P === t && (n.__c.__P = e), n.__c.__e = !0, n.__c = null), n.__k = n.__k && n.__k.map(function(i) {
    return md(i, e, t);
  })), n;
}
function gd(n, e, t) {
  return n && t && (n.__v = null, n.__k = n.__k && n.__k.map(function(i) {
    return gd(i, e, t);
  }), n.__c && n.__c.__P === e && (n.__e && t.appendChild(n.__e), n.__c.__e = !0, n.__c.__P = t)), n;
}
function Jr() {
  this.__u = 0, this.o = null, this.__b = null;
}
function vd(n) {
  var e = n.__.__c;
  return e && e.__a && e.__a(n);
}
function yi() {
  this.i = null, this.l = null;
}
R.unmount = function(n) {
  var e = n.__c;
  e && e.__R && e.__R(), e && 32 & n.__u && (n.type = null), al && al(n);
}, (Jr.prototype = new ze()).__c = function(n, e) {
  var t = e.__c, i = this;
  i.o == null && (i.o = []), i.o.push(t);
  var r = vd(i.__v), s = !1, o = function() {
    s || (s = !0, t.__R = null, r ? r(a) : a());
  };
  t.__R = o;
  var a = function() {
    if (!--i.__u) {
      if (i.state.__a) {
        var l = i.state.__a;
        i.__v.__k[0] = gd(l, l.__c.__P, l.__c.__O);
      }
      var c;
      for (i.setState({ __a: i.__b = null }); c = i.o.pop(); )
        c.forceUpdate();
    }
  };
  i.__u++ || 32 & e.__u || i.setState({ __a: i.__b = i.__v.__k[0] }), n.then(o, o);
}, Jr.prototype.componentWillUnmount = function() {
  this.o = [];
}, Jr.prototype.render = function(n, e) {
  if (this.__b) {
    if (this.__v.__k) {
      var t = document.createElement("div"), i = this.__v.__k[0].__c;
      this.__v.__k[0] = md(this.__b, t, i.__O = i.__P);
    }
    this.__b = null;
  }
  var r = e.__a && ke(We, null, n.fallback);
  return r && (r.__u &= -33), [ke(We, null, e.__a ? null : n.children), r];
};
var ll = function(n, e, t) {
  if (++t[1] === t[0] && n.l.delete(e), n.props.revealOrder && (n.props.revealOrder[0] !== "t" || !n.l.size))
    for (t = n.i; t; ) {
      for (; t.length > 3; )
        t.pop()();
      if (t[1] < t[0])
        break;
      n.i = t = t[2];
    }
};
function l2(n) {
  return this.getChildContext = function() {
    return n.context;
  }, n.children;
}
function c2(n) {
  var e = this, t = n.h;
  if (e.componentWillUnmount = function() {
    Ie(null, e.v), e.v = null, e.h = null;
  }, e.h && e.h !== t && e.componentWillUnmount(), !e.v) {
    for (var i = e.__v; i !== null && !i.__m && i.__ !== null; )
      i = i.__;
    e.h = t, e.v = { nodeType: 1, parentNode: t, childNodes: [], __k: { __m: i.__m }, contains: function() {
      return !0;
    }, insertBefore: function(r, s) {
      this.childNodes.push(r), e.h.insertBefore(r, s);
    }, removeChild: function(r) {
      this.childNodes.splice(this.childNodes.indexOf(r) >>> 1, 1), e.h.removeChild(r);
    } };
  }
  Ie(ke(l2, { context: e.context }, n.__v), e.v);
}
function u2(n, e) {
  var t = ke(c2, { __v: n, h: e });
  return t.containerInfo = e, t;
}
(yi.prototype = new ze()).__a = function(n) {
  var e = this, t = vd(e.__v), i = e.l.get(n);
  return i[0]++, function(r) {
    var s = function() {
      e.props.revealOrder ? (i.push(r), ll(e, n, i)) : r();
    };
    t ? t(s) : s();
  };
}, yi.prototype.render = function(n) {
  this.i = null, this.l = /* @__PURE__ */ new Map();
  var e = Hi(n.children);
  n.revealOrder && n.revealOrder[0] === "b" && e.reverse();
  for (var t = e.length; t--; )
    this.l.set(e[t], this.i = [1, 0, this.i]);
  return n.children;
}, yi.prototype.componentDidUpdate = yi.prototype.componentDidMount = function() {
  var n = this;
  this.l.forEach(function(e, t) {
    ll(n, t, e);
  });
};
var d2 = typeof Symbol < "u" && Symbol.for && Symbol.for("react.element") || 60103, h2 = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/, f2 = /^on(Ani|Tra|Tou|BeforeInp|Compo)/, p2 = /[A-Z0-9]/g, m2 = typeof document < "u", g2 = function(n) {
  return (typeof Symbol < "u" && typeof Symbol() == "symbol" ? /fil|che|rad/ : /fil|che|ra/).test(n);
};
ze.prototype.isReactComponent = {}, ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach(function(n) {
  Object.defineProperty(ze.prototype, n, { configurable: !0, get: function() {
    return this["UNSAFE_" + n];
  }, set: function(e) {
    Object.defineProperty(this, n, { configurable: !0, writable: !0, value: e });
  } });
});
var cl = R.event;
function v2() {
}
function y2() {
  return this.cancelBubble;
}
function b2() {
  return this.defaultPrevented;
}
R.event = function(n) {
  return cl && (n = cl(n)), n.persist = v2, n.isPropagationStopped = y2, n.isDefaultPrevented = b2, n.nativeEvent = n;
};
var w2 = { enumerable: !1, configurable: !0, get: function() {
  return this.class;
} }, ul = R.vnode;
R.vnode = function(n) {
  typeof n.type == "string" && function(e) {
    var t = e.props, i = e.type, r = {}, s = i.indexOf("-") === -1;
    for (var o in t) {
      var a = t[o];
      if (!(o === "value" && "defaultValue" in t && a == null || m2 && o === "children" && i === "noscript" || o === "class" || o === "className")) {
        var l = o.toLowerCase();
        o === "defaultValue" && "value" in t && t.value == null ? o = "value" : o === "download" && a === !0 ? a = "" : l === "translate" && a === "no" ? a = !1 : l[0] === "o" && l[1] === "n" ? l === "ondoubleclick" ? o = "ondblclick" : l !== "onchange" || i !== "input" && i !== "textarea" || g2(t.type) ? l === "onfocus" ? o = "onfocusin" : l === "onblur" ? o = "onfocusout" : f2.test(o) && (o = l) : l = o = "oninput" : s && h2.test(o) ? o = o.replace(p2, "-$&").toLowerCase() : a === null && (a = void 0), l === "oninput" && r[o = l] && (o = "oninputCapture"), r[o] = a;
      }
    }
    i == "select" && r.multiple && Array.isArray(r.value) && (r.value = Hi(t.children).forEach(function(c) {
      c.props.selected = r.value.indexOf(c.props.value) != -1;
    })), i == "select" && r.defaultValue != null && (r.value = Hi(t.children).forEach(function(c) {
      c.props.selected = r.multiple ? r.defaultValue.indexOf(c.props.value) != -1 : r.defaultValue == c.props.value;
    })), t.class && !t.className ? (r.class = t.class, Object.defineProperty(r, "className", w2)) : (t.className && !t.class || t.class && t.className) && (r.class = r.className = t.className), e.props = r;
  }(n), n.$$typeof = d2, ul && ul(n);
};
var dl = R.__r;
R.__r = function(n) {
  dl && dl(n), n.__c;
};
var hl = R.diffed;
R.diffed = function(n) {
  hl && hl(n);
  var e = n.props, t = n.__e;
  t != null && n.type === "textarea" && "value" in e && e.value !== t.value && (t.value = e.value == null ? "" : e.value);
};
const jn = ({
  triggerMode: n,
  children: e,
  actions: t,
  // 接收行为数据
  content: i,
  position: r = "bottom",
  isOpen: s,
  onToggleOpen: o,
  onAction: a
  // 接收行为事件回调
}) => {
  const l = new P("pop"), c = Co(_r), [u, d] = V(s || !1), f = F(null), p = F(null), m = F(null);
  L(() => {
    s !== void 0 && d(s);
  }, [s]), L(() => (p.current || (p.current = document.createElement("div"), p.current.className = l.b("content-container"), document.body.appendChild(p.current)), () => {
    p.current && document.body.removeChild(p.current);
  }), []), L(() => {
    const C = (x) => {
      f.current && !f.current.contains(x.target) && !x.target.closest(".".concat(l.b())) && !x.target.closest(".ibiz-quick-edit") && !x.target.closest(".ibiz-picker__transfer") && (d(!1), o == null || o(!1));
    };
    return u && document.addEventListener("mousedown", C), () => {
      document.removeEventListener("mousedown", C);
    };
  }, [u, o]);
  const v = () => {
    if (!f.current)
      return {};
    const C = f.current.getBoundingClientRect(), x = {
      position: "absolute",
      zIndex: c.zIndex + 1
    }, S = {
      bottom: {
        top: C.bottom + window.scrollY,
        left: C.left + window.scrollX
      },
      top: {
        bottom: window.innerHeight - C.top + window.scrollY,
        left: C.left + window.scrollX
      },
      left: {
        top: C.top + window.scrollY,
        right: window.innerWidth - C.left + window.scrollX
      },
      right: {
        top: C.top + window.scrollY,
        left: C.right + window.scrollX
      },
      "top-left": {
        bottom: window.innerHeight - C.top + window.scrollY,
        right: window.innerWidth - C.left + window.scrollX
      }
    };
    return { ...x, ...S[r] };
  }, y = () => {
    m.current && n === "hover" && (clearTimeout(m.current), m.current = null);
  }, g = (C) => {
    if (n === "click") {
      C.stopPropagation();
      const x = !u;
      d(x), o == null || o(x);
    }
  }, b = (C) => {
    if (n === "hover") {
      C.stopPropagation(), y();
      const x = !0;
      d(x), o == null || o(x);
    }
  }, w = () => {
    n === "hover" && (y(), m.current = setTimeout(() => {
      d(!1), o == null || o(!1);
    }, 100));
  };
  return /* @__PURE__ */ h("span", { className: "".concat(l.b("trigger-container")), children: [
    /* @__PURE__ */ h(
      "span",
      {
        className: "".concat(l.b("trigger-element")),
        ref: f,
        onClick: (C) => {
          g(C);
        },
        onMouseEnter: (C) => {
          b(C);
        },
        onMouseLeave: (C) => {
          C.stopPropagation(), w();
        },
        children: e
      }
    ),
    u && p.current && u2(
      /* @__PURE__ */ h(
        "div",
        {
          className: "".concat(l.b(), " pop-").concat(r),
          style: v(),
          onMouseEnter: y,
          onMouseLeave: w,
          children: i || (t == null ? void 0 : t.map((C) => /* @__PURE__ */ h(
            "div",
            {
              className: l.e("item"),
              onMouseDown: (x) => {
                x.stopPropagation(), a == null || a(C.id, x);
              },
              children: [
                C.icon,
                /* @__PURE__ */ h("div", { className: l.em("item", "caption"), children: C.caption })
              ]
            },
            C.id
          )))
        }
      ),
      p.current
    )
  ] });
};
const Q = new P("messsage-toolbar"), C2 = (n) => {
  const { controller: e, message: t, onCopy: i } = n, [r, s] = V(!1), [o, a] = V(!1), l = [
    { id: "markdown", caption: k.t.value("copyMarkdown") },
    { id: "default", caption: k.t.value("copy") }
  ], c = [
    {
      id: "islike",
      label: k.t.value("like"),
      title: k.t.value("like"),
      icon: () => /* @__PURE__ */ h(Pg, {}),
      onClick: () => {
        e.messageLike(t._origin);
      }
    },
    {
      id: "isdislike",
      label: k.t.value("downvote"),
      title: k.t.value("downvote"),
      icon: () => /* @__PURE__ */ h(Lg, {}),
      onClick: () => {
        e.messageDisLike(t._origin);
      }
    }
  ], u = (m, v) => {
    var y;
    (y = v.onClick) == null || y.call(v, m, v, e.context, e.params, t);
  }, d = (m) => {
    var v, y, g, b;
    if (typeof m.icon == "function")
      return m.icon();
    if ((v = m.icon) != null && v.showIcon && ((y = m.icon) != null && y.cssClass))
      return /* @__PURE__ */ h("i", { className: m.icon.cssClass });
    if ((g = m.icon) != null && g.showIcon && ((b = m.icon) != null && b.imagePath))
      return ni(m.icon.imagePath) ? /* @__PURE__ */ h(
        "div",
        {
          dangerouslySetInnerHTML: {
            __html: m.icon.imagePath
          }
        }
      ) : /* @__PURE__ */ h("img", { src: m.icon.imagePath });
  }, f = De(() => t.state === 20 && t.completed !== !0, [t.state, t.completed]), p = e.resourceMode !== "REMOTE" || e.currentTopicDisableStorage;
  return f ? /* @__PURE__ */ h(We, {}) : /* @__PURE__ */ h("div", { className: "".concat(Q.b()), children: [
    /* @__PURE__ */ h(
      jn,
      {
        position: "top",
        triggerMode: "hover",
        isOpen: r,
        actions: l,
        onToggleOpen: s,
        onAction: (m, v) => i(m),
        children: /* @__PURE__ */ h("div", { title: k.t.value("copy"), className: "".concat(Q.e("item")), children: /* @__PURE__ */ h(wg, {}) })
      }
    ),
    !p && c.map((m, v) => {
      const y = m.id === "islike" && t.islike === "1" || m.id === "isdislike" && t.isdislike === "1";
      return /* @__PURE__ */ h(
        "div",
        {
          title: m.title,
          onClick: (g) => u(g, m),
          className: "".concat(Q.e("item"), " ").concat(Q.is("actived", y)),
          children: d(m)
        },
        v
      );
    }),
    t.usage && /* @__PURE__ */ h(
      jn,
      {
        position: "top",
        triggerMode: "hover",
        isOpen: o,
        onToggleOpen: a,
        content: /* @__PURE__ */ h("div", { className: Q.b("statistics"), children: [
          /* @__PURE__ */ h("div", { className: Q.be("statistics", "item"), children: [
            /* @__PURE__ */ h("span", { className: Q.be("statistics", "icon"), children: /* @__PURE__ */ h(Ug, {}) }),
            /* @__PURE__ */ h("span", { className: Q.be("statistics", "label"), children: k.t.value("totalTokens") }),
            /* @__PURE__ */ h("span", { className: Q.be("statistics", "value"), children: t.usage.totaltokens || k.t.value("notCounted") })
          ] }),
          /* @__PURE__ */ h("div", { className: Q.be("statistics", "item"), children: [
            /* @__PURE__ */ h("span", { className: Q.be("statistics", "icon"), children: /* @__PURE__ */ h(qg, {}) }),
            /* @__PURE__ */ h("span", { className: Q.be("statistics", "label"), children: k.t.value("inputTokens") }),
            /* @__PURE__ */ h("span", { className: Q.be("statistics", "value"), children: t.usage.prompttokens || k.t.value("notCounted") })
          ] }),
          /* @__PURE__ */ h("div", { className: Q.be("statistics", "item"), children: [
            /* @__PURE__ */ h("span", { className: Q.be("statistics", "icon"), children: /* @__PURE__ */ h(Kg, {}) }),
            /* @__PURE__ */ h("span", { className: Q.be("statistics", "label"), children: k.t.value("outputTokens") }),
            /* @__PURE__ */ h("span", { className: Q.be("statistics", "value"), children: t.usage.completiontokens || k.t.value("notCounted") })
          ] }),
          /* @__PURE__ */ h("div", { className: Q.be("statistics", "item"), children: [
            /* @__PURE__ */ h("span", { className: Q.be("statistics", "icon"), children: /* @__PURE__ */ h(Jg, {}) }),
            /* @__PURE__ */ h("span", { className: Q.be("statistics", "label"), children: k.t.value("toolCallCount") }),
            /* @__PURE__ */ h("span", { className: Q.be("statistics", "value"), children: t.usage.toolcalls || k.t.value("notCalled") })
          ] })
        ] }),
        children: /* @__PURE__ */ h("div", { title: k.t.value("statistics"), className: "".concat(Q.e("item")), children: /* @__PURE__ */ h(Wg, {}) })
      }
    )
  ] });
}, fl = new P("chat-slider"), k2 = o2(
  (n, e) => {
    const { min: t, max: i, step: r, onChange: s } = n, o = F(null), a = $(n.value), l = Math.max.apply(
      null,
      [t, i, r].map((g) => {
        const b = "".concat(g).split(".")[1];
        return b ? b.length : 0;
      })
    ), c = F({
      dragging: !1,
      startX: 0,
      newPosition: 0,
      startPosition: 0
    }), u = ve(() => "".concat((a.value - t) / (i - t) * 100, "%"));
    L(() => {
      a.value = n.value;
    }, [n.value]);
    const d = (g) => {
      let b, w;
      return g.type.startsWith("touch") ? (w = g.touches[0].clientY, b = g.touches[0].clientX) : (w = g.clientY, b = g.clientX), {
        clientX: b,
        clientY: w
      };
    }, f = async (g) => {
      if (g === null || Number.isNaN(+g))
        return;
      g < 0 ? g = 0 : g > 100 && (g = 100);
      const b = 100 / ((i - t) / r);
      let C = Math.round(g / b) * b * (i - t) * 0.01 + t;
      C = Number.parseFloat(C.toFixed(l)), C !== n.value && s(C);
    }, p = (g) => {
      const { clientX: b } = d(g), w = Number.parseFloat(u.value);
      Object.assign(c.current, {
        dragging: !0,
        startX: b,
        startPosition: w,
        newPosition: w
      });
    }, m = (g) => {
      if (!c.current.dragging)
        return;
      const { clientX: b } = d(g), w = o.current.parentElement.clientWidth, C = (b - c.current.startX) / w * 100;
      c.current.newPosition = c.current.startPosition + C, f(c.current.newPosition);
    }, v = () => {
      c.current.dragging && (c.current.dragging = !1, window.removeEventListener("mousemove", m), window.removeEventListener("touchmove", m), window.removeEventListener("mouseup", v), window.removeEventListener("touchend", v));
    }, y = (g) => {
      g.preventDefault(), p(g), window.addEventListener("mousemove", m), window.addEventListener("touchmove", m), window.addEventListener("mouseup", v), window.addEventListener("touchend", v), o.current.focus();
    };
    return hg(e, () => ({
      state: c,
      onButtonDown: y,
      setPosition: f
    })), /* @__PURE__ */ h(
      "div",
      {
        ref: o,
        className: fl.e("button-wrapper"),
        onMouseDown: y,
        onTouchStart: y,
        style: { left: u.value },
        children: /* @__PURE__ */ h("div", { className: fl.e("button") })
      }
    );
  }
);
const bi = new P("chat-slider"), pl = (n) => {
  const {
    step: e = 1,
    min: t = 0,
    max: i = 100,
    value: r = 0,
    showText: s = !1,
    className: o = "",
    onChange: a
  } = n, l = F(null), c = F(null), u = $(r), d = ve(() => ({
    width: "".concat(100 * (u.value - t) / (i - t), "%"),
    left: "0%"
  }));
  L(() => {
    r !== void 0 && (u.value = r);
  }, [r]);
  const f = (m) => {
    u.value = m, a == null || a(m);
  }, p = (m) => {
    var w, C, x;
    if (!c.current || c.current.state.current.dragging)
      return;
    let v = 0;
    const y = (x = (C = (w = m.touches) == null ? void 0 : w.item(0)) == null ? void 0 : C.clientX) != null ? x : m.clientX, { left: g, width: b } = l.current.getBoundingClientRect();
    v = (y - g) / b * 100, !(v < 0 || v > 100) && (c.current.setPosition(v), setTimeout(() => {
      c.current.onButtonDown(m);
    }, 0));
  };
  return /* @__PURE__ */ h("div", { className: "".concat(bi.b(), " ").concat(o), title: "".concat(u.value), children: [
    /* @__PURE__ */ h(
      "div",
      {
        ref: l,
        className: bi.e("runway"),
        onMouseDown: p,
        onTouchStart: p,
        children: [
          /* @__PURE__ */ h("div", { className: bi.e("bar"), style: d.value }),
          /* @__PURE__ */ h(
            k2,
            {
              min: t,
              max: i,
              step: e,
              ref: c,
              value: u.value,
              onChange: f
            }
          )
        ]
      }
    ),
    s ? /* @__PURE__ */ h("div", { className: bi.e("text"), children: u.value }) : void 0
  ] });
};
const wi = new P("chat-switch"), x2 = (n) => {
  const { value: e, className: t = "", showText: i = !1, onChange: r } = n, [s, o] = V(void 0), [a, l] = V(e);
  L(() => {
    l(e);
  }, [e]);
  const c = () => {
    let u;
    a === void 0 && (u = s === 1 ? 0 : 1), o(a), l(u), r == null || r(u);
  };
  return /* @__PURE__ */ h("div", { className: "".concat(wi.b(), " ").concat(t), children: [
    /* @__PURE__ */ h(
      "div",
      {
        onClick: c,
        className: "".concat(wi.e("wrapper"), " ").concat(wi.is(a === 0 ? "left" : a === 1 ? "right" : "center", !0))
      }
    ),
    i ? /* @__PURE__ */ h("div", { className: wi.e("text"), children: [
      a === 0 ? k.t.value("disabled") : void 0,
      a === 1 ? k.t.value("enable") : void 0
    ] }) : void 0
  ] });
};
const qe = new P("chat-step-item"), S2 = (n) => {
  const { element: e } = n, [t, i] = V(e.title), [r, s] = V(!1), [o, a] = V(!1), [l, c] = V(0), u = $(e.content), d = $([]), f = $({
    title: k.t.value("thinkThrough"),
    description: "",
    done: !0,
    collapse: !0
  }), p = F(null), m = F(null), v = () => {
    let x = "";
    e.title ? x = e.title : u.value && (x = u.value), x = x.replace(/<tool_call>[\s\S]*?<\/tool_call>/g, "");
    const S = x.indexOf("<tool_call>");
    S !== -1 && x.indexOf("</tool_call>") === -1 && (x = x.substring(0, S)), i(x);
  }, y = () => {
    if (m.current) {
      const x = m.current;
      x.style.display = "block";
      const S = x.scrollHeight;
      x.style.display = "-webkit-box";
      const M = x.clientHeight, A = S > M;
      s(!!A);
    }
  }, g = () => {
    if (p.current) {
      const x = p.current;
      c(x.clientHeight);
    }
  }, b = () => {
    let x = "", S = e.content || "";
    const M = S.indexOf("<think>"), A = S.indexOf("</think>");
    M !== -1 && A !== -1 && (x = S.slice(M + 7, A), S = S.slice(A + 8));
    const E = Hu.parse(S).toolCalls || [];
    S = S.replace(/<tool_call>[\s\S]*?<\/tool_call>/g, ""), f.value.description = x || "", u.value = S || "", d.value = E;
  };
  L(() => {
    g(), y(), b(), v();
  }, []), L(() => {
    setTimeout(() => {
      g();
    }, 0);
  }, [n.element.content]);
  const w = () => {
    a(!o), setTimeout(() => {
      g();
    }, 0);
  }, C = (x) => {
    setTimeout(() => {
      g();
    }, 0);
  };
  return /* @__PURE__ */ h(
    "div",
    {
      ref: p,
      className: "".concat(qe.b()),
      style: { "--ibiz-chat-step-item-height": "".concat(l, "px") },
      children: [
        /* @__PURE__ */ h("div", { className: "".concat(qe.e("left")), children: /* @__PURE__ */ h("div", { className: "".concat(qe.e("icon")), children: [
          e.status === "success" && /* @__PURE__ */ h(Vg, {}),
          e.status === "failed" && /* @__PURE__ */ h(Fg, {}),
          e.status === "pending" && /* @__PURE__ */ h(Mg, {})
        ] }) }),
        /* @__PURE__ */ h(
          "div",
          {
            className: "".concat(qe.e("right"), " ").concat(e.status === "pending" ? "is-loadding" : ""),
            children: [
              e.status !== "pending" && /* @__PURE__ */ h("div", { className: "".concat(qe.e("title")), title: t, children: t }),
              e.status !== "pending" && /* @__PURE__ */ h("div", { className: "".concat(qe.e("content")), children: [
                /* @__PURE__ */ h(
                  "div",
                  {
                    ref: m,
                    className: "".concat(qe.e("content-text"), " ").concat(o ? "expanded" : ""),
                    children: [
                      d.value.length > 0 && o && /* @__PURE__ */ h("div", { className: "".concat(qe.e("content-tool-call-container")), children: /* @__PURE__ */ h(
                        Io,
                        {
                          toolcallCompleted: !0,
                          items: d.value,
                          controller: n.controller,
                          onLinkClick: n.onLinkClick,
                          onCollapseChange: C
                        }
                      ) }),
                      f.value.description && o && /* @__PURE__ */ h("div", { className: "".concat(qe.e("content-think-container")), children: /* @__PURE__ */ h(
                        Ao,
                        {
                          item: f.value,
                          controller: n.controller
                        }
                      ) }),
                      u.value || ""
                    ]
                  }
                ),
                r && /* @__PURE__ */ h(
                  "button",
                  {
                    className: "".concat(qe.e("toggle-btn")),
                    onClick: () => {
                      w();
                    },
                    children: o ? k.t.value("foldUp") : k.t.value("expandAll")
                  }
                )
              ] }),
              e.status === "pending" && /* @__PURE__ */ h("div", { className: "".concat(qe.e("loadding-text")), children: k.t.value("loading") })
            ]
          }
        )
      ]
    }
  );
};
const Ci = new P("chat-step"), yd = (n) => {
  const { items: e } = n, t = $(!1), i = $(!0), r = $([]);
  L(() => {
    t.value = e.length > 1, r.value = t.value && !i.value ? [e[e.length - 1]] : e;
  }, [e]);
  const s = () => {
    i.value = !i.value, r.value = t.value && !i.value ? [e[e.length - 1]] : e;
  };
  return /* @__PURE__ */ h("div", { className: "".concat(Ci.b()), children: [
    /* @__PURE__ */ h("div", { className: Ci.e("container"), children: r.value.map((o, a) => /* @__PURE__ */ h(
      S2,
      {
        element: o,
        controller: n.controller,
        onLinkClick: n.onLinkClick
      },
      "".concat(o.title, "_").concat(o.content, "_").concat(a)
    )) }),
    t.value && /* @__PURE__ */ h("div", { className: Ci.e("toggle"), onClick: s, children: /* @__PURE__ */ h("span", { className: Ci.e("toggle-label"), children: i.value ? k.t.value("stepFoldUp") : k.t.value("stepExpand") }) })
  ] });
};
const Zt = new P("ossfile-material"), T2 = (n) => {
  const e = ve(() => n.material.data.name), t = (l) => l >= 1024 * 1024 ? "".concat((l / (1024 * 1024)).toFixed(2), "M") : l >= 1024 ? "".concat((l / 1024).toFixed(2), "K") : "".concat(l, "B"), i = ve(() => {
    const l = n.material.metadata.size;
    return t(l);
  }), r = ve(() => n.material.metadata.state), s = ve(() => {
    const l = n.material.metadata.state;
    return l === "successed" ? k.t.value("uploadSuccess") : l === "uploading" ? k.t.value("uploading") : l === "failed" ? k.t.value("uploadFailed") : k.t.value("unknownState");
  }), o = ve(() => {
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
  }), a = () => {
    const l = n.material.metadata;
    n.controller.opts.uploader.onDownLoad(l, {
      context: n.controller.context,
      params: n.controller.params
    });
  };
  return /* @__PURE__ */ h("div", { className: Zt.b(), children: [
    /* @__PURE__ */ h("div", { className: Zt.b("left"), children: /* @__PURE__ */ h(_o, {}) }),
    /* @__PURE__ */ h("div", { className: Zt.b("right"), children: [
      /* @__PURE__ */ h("div", { className: Zt.e("name"), title: e, children: e }),
      /* @__PURE__ */ h("div", { className: Zt.b("metadata"), children: [
        /* @__PURE__ */ h("div", { children: i }),
        r.value !== "successed" && /* @__PURE__ */ h("div", { style: { color: o.value }, children: s }),
        r.value === "successed" && /* @__PURE__ */ h(
          "div",
          {
            className: Zt.be("metadata", "img"),
            title: k.t.value("download"),
            onClick: a,
            children: /* @__PURE__ */ h(cd, {})
          }
        )
      ] })
    ] })
  ] });
};
const Qt = new P("common-material"), M2 = (n) => {
  var s, o, a, l;
  const e = (s = n.controller.opts.questionToolbarItems) == null ? void 0 : s.find(
    (c) => c.id === n.material.metadata.actionId
  ), t = ve(() => n.material.metadata.name), i = ve(() => n.material.metadata.downloadactionid), r = (c) => {
    const u = n.material.metadata, d = n.controller.opts.extendToolbarClick;
    if (d && typeof d == "function") {
      const f = u.downloadactionid;
      if (!i)
        throw new Error(k.t.value("downloadCannotEmpty"));
      const p = u.downloadAppId, m = { ...n.controller.context };
      if (u.downloadContext)
        try {
          const y = u.downloadContext.split(";").reduce(
            (g, b) => {
              if (b.trim()) {
                const [w, C] = b.split(":");
                w && C && (g[w.trim()] = C.trim());
              }
              return g;
            },
            {}
          );
          y && Object.keys(y).length > 0 && Object.assign(m, y);
        } catch (v) {
          throw new Error(k.t.value("downloadExContext"));
        }
      d(
        c,
        {
          id: f,
          // 是否是插件应用(建议里面定义appid认为是插件应用的界面行为)
          isPluginApp: !!p,
          appId: p || m.srfappid
        },
        m,
        n.controller.params,
        {}
      );
    }
  };
  return /* @__PURE__ */ h("div", { className: Qt.b(), children: [
    /* @__PURE__ */ h("div", { className: Qt.b("left"), children: e && e.icon ? typeof e.icon == "function" ? e.icon() : ((o = e.icon) == null ? void 0 : o.showIcon) && /* @__PURE__ */ h(We, { children: (a = e.icon) != null && a.cssClass ? /* @__PURE__ */ h("i", { className: e.icon.cssClass }) : (l = e.icon) != null && l.imagePath ? ni(e.icon.imagePath) ? /* @__PURE__ */ h(
      "div",
      {
        dangerouslySetInnerHTML: {
          __html: e.icon.imagePath
        }
      }
    ) : /* @__PURE__ */ h("img", { src: e.icon.imagePath }) : null }) : /* @__PURE__ */ h(Eg, {}) }),
    /* @__PURE__ */ h("div", { className: Qt.b("right"), children: [
      /* @__PURE__ */ h("div", { className: Qt.e("name"), title: t, children: t }),
      /* @__PURE__ */ h("div", { className: Qt.b("metadata"), children: [
        /* @__PURE__ */ h("div", { children: (e == null ? void 0 : e.label) || k.t.value("meterialResources") }),
        i && /* @__PURE__ */ h(
          "div",
          {
            className: Qt.be("metadata", "img"),
            title: k.t.value("preview"),
            onClick: r,
            children: /* @__PURE__ */ h(cd, {})
          }
        )
      ] })
    ] })
  ] });
};
const Gr = new P("chat-input-material-item"), fr = (n) => {
  const { material: e } = n;
  let t = null;
  switch (e.type) {
    case "ossfile":
      t = T2;
      break;
    default:
      t = M2;
  }
  const i = () => {
    n.controller.deleteMaterial(e);
  };
  return /* @__PURE__ */ h("div", { className: "".concat(Gr.b(), " ").concat(Gr.is("disabled", n.disabled)), children: [
    /* @__PURE__ */ h("div", { className: Gr.e("icon"), onClick: i, children: /* @__PURE__ */ h(Ng, {}) }),
    ke(t, {
      material: e,
      controller: n.controller
    })
  ] });
};
const Et = new P("markdown-message"), _2 = (n) => {
  const { message: e, size: t } = n, i = F(null), r = $(null), s = $(""), o = $({ resources: [], remainingText: "", hasResources: !1 }), a = (w) => {
    const { resources: C, remainingText: x, hasResources: S, error: M } = un.parseMixedContent(w);
    o.value = {
      resources: C,
      remainingText: x,
      hasResources: S,
      error: M
    };
  }, l = De(() => e.state === 20 && e.completed !== !0, [e.state, e.completed]), c = De(() => e.state === 20 && e.completed === !0, [e.state, e.completed]);
  e.think || (e.think = {
    title: "",
    description: "",
    collapse: !0
  });
  const u = (w, C) => {
    e.think = {
      ...e.think,
      title: w ? k.t.value("thinkThrough") : e.completed === !0 ? k.t.value("stopThinking") : k.t.value("thinking"),
      description: C || "",
      done: w || e.completed === !0
    }, e.think.done || (e.think.beginTime || (e.think.beginTime = Date.now()), e.think.endTime = void 0), e.think.done && !e.think.endTime && (e.think.endTime = Date.now(), e.think.collapse = !0);
  }, d = $({ hasSuggestions: !1, suggestions: [] }), f = (w) => {
    w && w.length > 0 ? d.value = {
      hasSuggestions: !0,
      suggestions: w
    } : d.value = { hasSuggestions: !1, suggestions: [] };
  }, p = (w, C) => {
    n.controller.handleSuggestionClick(n.message, w, C);
  }, m = (w, C) => {
    n.controller.handleUIActionClick(n.message, w, C);
  }, v = (w) => {
    const C = w.indexOf("<think>"), x = w.indexOf("</think>");
    let S = "", M = "", A = !1;
    return x === -1 ? (A = !1, S = w.slice(C + 7), M = "") : (A = !0, S = w.slice(C + 7, x), M = w.slice(x + 8)), { isThoughtCompleted: A, thoughtContent: S, answerContent: M };
  }, y = (w) => {
    const C = w.target, x = C == null ? void 0 : C.closest(
      'a[href^="chunkview://"], a[href^="view://"], a[href^="action://"]'
    );
    if (x) {
      w.preventDefault();
      const S = x.getAttribute("href");
      if (S) {
        let M = "";
        switch (S.startsWith("chunkview://") ? M = "chunkview" : S.startsWith("view://") ? M = "view" : S.startsWith("action://") && (M = "action"), M) {
          case "chunkview":
          case "view":
          case "action":
            n.controller.handlePredefinedClick(
              M,
              S,
              n.message,
              w
            );
            break;
          default:
            console.error(k.t.value("protocol", { protocol: M }));
            break;
        }
      }
      return !1;
    }
  }, g = () => {
    let w = "";
    if (e.metadata && e.metadata.agentid && (w = e.metadata.agentid), w) {
      const C = n.controller.agentList.value.find(
        (x) => x.id === w
      );
      s.value = (C == null ? void 0 : C.caption) || "";
    }
  };
  L(() => {
    let w = "";
    if (e.content && e.content.indexOf("<think>") !== -1) {
      const { isThoughtCompleted: C, thoughtContent: x, answerContent: S } = v(e.content);
      u(C, x), S && a(S);
    } else
      a(e.content);
    w = o.value.remainingText, f(e.suggestions), r.value = new so({
      el: i.current,
      value: w || "",
      editor: {
        defaultModel: "previewOnly"
      },
      // @ts-ignore
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
            // @ts-ignore
            externals: ["echarts"]
          }
        }
      },
      callback: {
        onClickPreview: y
      }
    }), g();
  }, []), L(() => {
    if (t >= 0 && r.value) {
      if (e.content && e.content.indexOf("<think>") !== -1) {
        const { isThoughtCompleted: w, thoughtContent: C, answerContent: x } = v(e.content);
        u(w, C), a(x);
      } else
        a(e.content);
      r.value.setMarkdown(o.value.remainingText || ""), f(e.suggestions);
    }
  }, [e, t]);
  const b = (w) => {
    var x, S;
    const C = (w === "markdown" ? (x = r.value) == null ? void 0 : x.getMarkdown() : (S = i.current) == null ? void 0 : S.innerText) || "";
    n.controller.copyMessage(C, e);
  };
  return /* @__PURE__ */ h("div", { className: "".concat(Et.b(), " ").concat(Et.is("loading", l)), children: [
    /* @__PURE__ */ h("div", { className: Et.b("header"), children: [
      /* @__PURE__ */ h("div", { className: Et.be("header", "caption"), children: [
        "AI",
        s.value && " | ".concat(s.value)
      ] }),
      n.children,
      c ? /* @__PURE__ */ h("div", { className: Et.be("header", "timeout"), children: k.t.value("requestTimeout") }) : null
    ] }),
    /* @__PURE__ */ h("div", { className: "".concat(Et.b("content"), " pre-wrap-container"), children: [
      o.value.hasResources && /* @__PURE__ */ h("div", { className: "content-material-container", children: o.value.resources.map((w) => /* @__PURE__ */ h(
        fr,
        {
          material: w,
          disabled: !0,
          controller: n.controller
        },
        w.id
      )) }),
      e.chatsteps && e.chatsteps.length > 0 && /* @__PURE__ */ h(
        yd,
        {
          items: e.chatsteps || [],
          controller: n.controller,
          onLinkClick: y
        }
      ),
      /* @__PURE__ */ h(
        Io,
        {
          toolcallCompleted: !!e.toolcallcompleted,
          items: e.toolcalls || [],
          controller: n.controller,
          onLinkClick: y
        }
      ),
      /* @__PURE__ */ h(
        Ao,
        {
          item: e.think,
          controller: n.controller
        }
      ),
      /* @__PURE__ */ h("div", { ref: i })
    ] }),
    /* @__PURE__ */ h("div", { className: Et.b("footer"), children: [
      /* @__PURE__ */ h(
        C2,
        {
          onCopy: b,
          message: e,
          controller: n.controller
        },
        "".concat(e.messageid, "_").concat(e.islike, "_").concat(e.isdislike)
      ),
      d.value.hasSuggestions || e.chatuiactions && e.chatuiactions.length > 0 ? /* @__PURE__ */ h(
        Qg,
        {
          uiactions: e.chatuiactions || [],
          suggestions: d.value.suggestions,
          onSuggestionClick: (w, C) => {
            p(w, C);
          },
          onUIActionClick: (w, C) => {
            m(w, C);
          }
        }
      ) : null
    ] })
  ] });
};
function pe(n) {
  this.content = n;
}
pe.prototype = {
  constructor: pe,
  find: function(n) {
    for (var e = 0; e < this.content.length; e += 2)
      if (this.content[e] === n)
        return e;
    return -1;
  },
  // :: (string) → ?any
  // Retrieve the value stored under `key`, or return undefined when
  // no such key exists.
  get: function(n) {
    var e = this.find(n);
    return e == -1 ? void 0 : this.content[e + 1];
  },
  // :: (string, any, ?string) → OrderedMap
  // Create a new map by replacing the value of `key` with a new
  // value, or adding a binding to the end of the map. If `newKey` is
  // given, the key of the binding will be replaced with that key.
  update: function(n, e, t) {
    var i = t && t != n ? this.remove(t) : this, r = i.find(n), s = i.content.slice();
    return r == -1 ? s.push(t || n, e) : (s[r + 1] = e, t && (s[r] = t)), new pe(s);
  },
  // :: (string) → OrderedMap
  // Return a map with the given key removed, if it existed.
  remove: function(n) {
    var e = this.find(n);
    if (e == -1)
      return this;
    var t = this.content.slice();
    return t.splice(e, 2), new pe(t);
  },
  // :: (string, any) → OrderedMap
  // Add a new key to the start of the map.
  addToStart: function(n, e) {
    return new pe([n, e].concat(this.remove(n).content));
  },
  // :: (string, any) → OrderedMap
  // Add a new key to the end of the map.
  addToEnd: function(n, e) {
    var t = this.remove(n).content.slice();
    return t.push(n, e), new pe(t);
  },
  // :: (string, string, any) → OrderedMap
  // Add a key after the given key. If `place` is not found, the new
  // key is added to the end.
  addBefore: function(n, e, t) {
    var i = this.remove(e), r = i.content.slice(), s = i.find(n);
    return r.splice(s == -1 ? r.length : s, 0, e, t), new pe(r);
  },
  // :: ((key: string, value: any))
  // Call the given function for each key/value pair in the map, in
  // order.
  forEach: function(n) {
    for (var e = 0; e < this.content.length; e += 2)
      n(this.content[e], this.content[e + 1]);
  },
  // :: (union<Object, OrderedMap>) → OrderedMap
  // Create a new map by prepending the keys in this map that don't
  // appear in `map` before the keys in `map`.
  prepend: function(n) {
    return n = pe.from(n), n.size ? new pe(n.content.concat(this.subtract(n).content)) : this;
  },
  // :: (union<Object, OrderedMap>) → OrderedMap
  // Create a new map by appending the keys in this map that don't
  // appear in `map` after the keys in `map`.
  append: function(n) {
    return n = pe.from(n), n.size ? new pe(this.subtract(n).content.concat(n.content)) : this;
  },
  // :: (union<Object, OrderedMap>) → OrderedMap
  // Create a map containing all the keys in this map that don't
  // appear in `map`.
  subtract: function(n) {
    var e = this;
    n = pe.from(n);
    for (var t = 0; t < n.content.length; t += 2)
      e = e.remove(n.content[t]);
    return e;
  },
  // :: () → Object
  // Turn ordered map into a plain object.
  toObject: function() {
    var n = {};
    return this.forEach(function(e, t) {
      n[e] = t;
    }), n;
  },
  // :: number
  // The amount of keys in this map.
  get size() {
    return this.content.length >> 1;
  }
};
pe.from = function(n) {
  if (n instanceof pe)
    return n;
  var e = [];
  if (n)
    for (var t in n)
      e.push(t, n[t]);
  return new pe(e);
};
function bd(n, e, t) {
  for (let i = 0; ; i++) {
    if (i == n.childCount || i == e.childCount)
      return n.childCount == e.childCount ? null : t;
    let r = n.child(i), s = e.child(i);
    if (r == s) {
      t += r.nodeSize;
      continue;
    }
    if (!r.sameMarkup(s))
      return t;
    if (r.isText && r.text != s.text) {
      for (let o = 0; r.text[o] == s.text[o]; o++)
        t++;
      return t;
    }
    if (r.content.size || s.content.size) {
      let o = bd(r.content, s.content, t + 1);
      if (o != null)
        return o;
    }
    t += r.nodeSize;
  }
}
function wd(n, e, t, i) {
  for (let r = n.childCount, s = e.childCount; ; ) {
    if (r == 0 || s == 0)
      return r == s ? null : { a: t, b: i };
    let o = n.child(--r), a = e.child(--s), l = o.nodeSize;
    if (o == a) {
      t -= l, i -= l;
      continue;
    }
    if (!o.sameMarkup(a))
      return { a: t, b: i };
    if (o.isText && o.text != a.text) {
      let c = 0, u = Math.min(o.text.length, a.text.length);
      for (; c < u && o.text[o.text.length - c - 1] == a.text[a.text.length - c - 1]; )
        c++, t--, i--;
      return { a: t, b: i };
    }
    if (o.content.size || a.content.size) {
      let c = wd(o.content, a.content, t - 1, i - 1);
      if (c)
        return c;
    }
    t -= l, i -= l;
  }
}
class T {
  /**
  @internal
  */
  constructor(e, t) {
    if (this.content = e, this.size = t || 0, t == null)
      for (let i = 0; i < e.length; i++)
        this.size += e[i].nodeSize;
  }
  /**
  Invoke a callback for all descendant nodes between the given two
  positions (relative to start of this fragment). Doesn't descend
  into a node when the callback returns `false`.
  */
  nodesBetween(e, t, i, r = 0, s) {
    for (let o = 0, a = 0; a < t; o++) {
      let l = this.content[o], c = a + l.nodeSize;
      if (c > e && i(l, r + a, s || null, o) !== !1 && l.content.size) {
        let u = a + 1;
        l.nodesBetween(Math.max(0, e - u), Math.min(l.content.size, t - u), i, r + u);
      }
      a = c;
    }
  }
  /**
  Call the given callback for every descendant node. `pos` will be
  relative to the start of the fragment. The callback may return
  `false` to prevent traversal of a given node's children.
  */
  descendants(e) {
    this.nodesBetween(0, this.size, e);
  }
  /**
  Extract the text between `from` and `to`. See the same method on
  [`Node`](https://prosemirror.net/docs/ref/#model.Node.textBetween).
  */
  textBetween(e, t, i, r) {
    let s = "", o = !0;
    return this.nodesBetween(e, t, (a, l) => {
      let c = a.isText ? a.text.slice(Math.max(e, l) - l, t - l) : a.isLeaf ? r ? typeof r == "function" ? r(a) : r : a.type.spec.leafText ? a.type.spec.leafText(a) : "" : "";
      a.isBlock && (a.isLeaf && c || a.isTextblock) && i && (o ? o = !1 : s += i), s += c;
    }, 0), s;
  }
  /**
  Create a new fragment containing the combined content of this
  fragment and the other.
  */
  append(e) {
    if (!e.size)
      return this;
    if (!this.size)
      return e;
    let t = this.lastChild, i = e.firstChild, r = this.content.slice(), s = 0;
    for (t.isText && t.sameMarkup(i) && (r[r.length - 1] = t.withText(t.text + i.text), s = 1); s < e.content.length; s++)
      r.push(e.content[s]);
    return new T(r, this.size + e.size);
  }
  /**
  Cut out the sub-fragment between the two given positions.
  */
  cut(e, t = this.size) {
    if (e == 0 && t == this.size)
      return this;
    let i = [], r = 0;
    if (t > e)
      for (let s = 0, o = 0; o < t; s++) {
        let a = this.content[s], l = o + a.nodeSize;
        l > e && ((o < e || l > t) && (a.isText ? a = a.cut(Math.max(0, e - o), Math.min(a.text.length, t - o)) : a = a.cut(Math.max(0, e - o - 1), Math.min(a.content.size, t - o - 1))), i.push(a), r += a.nodeSize), o = l;
      }
    return new T(i, r);
  }
  /**
  @internal
  */
  cutByIndex(e, t) {
    return e == t ? T.empty : e == 0 && t == this.content.length ? this : new T(this.content.slice(e, t));
  }
  /**
  Create a new fragment in which the node at the given index is
  replaced by the given node.
  */
  replaceChild(e, t) {
    let i = this.content[e];
    if (i == t)
      return this;
    let r = this.content.slice(), s = this.size + t.nodeSize - i.nodeSize;
    return r[e] = t, new T(r, s);
  }
  /**
  Create a new fragment by prepending the given node to this
  fragment.
  */
  addToStart(e) {
    return new T([e].concat(this.content), this.size + e.nodeSize);
  }
  /**
  Create a new fragment by appending the given node to this
  fragment.
  */
  addToEnd(e) {
    return new T(this.content.concat(e), this.size + e.nodeSize);
  }
  /**
  Compare this fragment to another one.
  */
  eq(e) {
    if (this.content.length != e.content.length)
      return !1;
    for (let t = 0; t < this.content.length; t++)
      if (!this.content[t].eq(e.content[t]))
        return !1;
    return !0;
  }
  /**
  The first child of the fragment, or `null` if it is empty.
  */
  get firstChild() {
    return this.content.length ? this.content[0] : null;
  }
  /**
  The last child of the fragment, or `null` if it is empty.
  */
  get lastChild() {
    return this.content.length ? this.content[this.content.length - 1] : null;
  }
  /**
  The number of child nodes in this fragment.
  */
  get childCount() {
    return this.content.length;
  }
  /**
  Get the child node at the given index. Raise an error when the
  index is out of range.
  */
  child(e) {
    let t = this.content[e];
    if (!t)
      throw new RangeError("Index " + e + " out of range for " + this);
    return t;
  }
  /**
  Get the child node at the given index, if it exists.
  */
  maybeChild(e) {
    return this.content[e] || null;
  }
  /**
  Call `f` for every child node, passing the node, its offset
  into this parent node, and its index.
  */
  forEach(e) {
    for (let t = 0, i = 0; t < this.content.length; t++) {
      let r = this.content[t];
      e(r, i, t), i += r.nodeSize;
    }
  }
  /**
  Find the first position at which this fragment and another
  fragment differ, or `null` if they are the same.
  */
  findDiffStart(e, t = 0) {
    return bd(this, e, t);
  }
  /**
  Find the first position, searching from the end, at which this
  fragment and the given fragment differ, or `null` if they are
  the same. Since this position will not be the same in both
  nodes, an object with two separate positions is returned.
  */
  findDiffEnd(e, t = this.size, i = e.size) {
    return wd(this, e, t, i);
  }
  /**
  Find the index and inner offset corresponding to a given relative
  position in this fragment. The result object will be reused
  (overwritten) the next time the function is called. @internal
  */
  findIndex(e) {
    if (e == 0)
      return ki(0, e);
    if (e == this.size)
      return ki(this.content.length, e);
    if (e > this.size || e < 0)
      throw new RangeError("Position ".concat(e, " outside of fragment (").concat(this, ")"));
    for (let t = 0, i = 0; ; t++) {
      let r = this.child(t), s = i + r.nodeSize;
      if (s >= e)
        return s == e ? ki(t + 1, s) : ki(t, i);
      i = s;
    }
  }
  /**
  Return a debugging string that describes this fragment.
  */
  toString() {
    return "<" + this.toStringInner() + ">";
  }
  /**
  @internal
  */
  toStringInner() {
    return this.content.join(", ");
  }
  /**
  Create a JSON-serializeable representation of this fragment.
  */
  toJSON() {
    return this.content.length ? this.content.map((e) => e.toJSON()) : null;
  }
  /**
  Deserialize a fragment from its JSON representation.
  */
  static fromJSON(e, t) {
    if (!t)
      return T.empty;
    if (!Array.isArray(t))
      throw new RangeError("Invalid input for Fragment.fromJSON");
    return new T(t.map(e.nodeFromJSON));
  }
  /**
  Build a fragment from an array of nodes. Ensures that adjacent
  text nodes with the same marks are joined together.
  */
  static fromArray(e) {
    if (!e.length)
      return T.empty;
    let t, i = 0;
    for (let r = 0; r < e.length; r++) {
      let s = e[r];
      i += s.nodeSize, r && s.isText && e[r - 1].sameMarkup(s) ? (t || (t = e.slice(0, r)), t[t.length - 1] = s.withText(t[t.length - 1].text + s.text)) : t && t.push(s);
    }
    return new T(t || e, i);
  }
  /**
  Create a fragment from something that can be interpreted as a
  set of nodes. For `null`, it returns the empty fragment. For a
  fragment, the fragment itself. For a node or array of nodes, a
  fragment containing those nodes.
  */
  static from(e) {
    if (!e)
      return T.empty;
    if (e instanceof T)
      return e;
    if (Array.isArray(e))
      return this.fromArray(e);
    if (e.attrs)
      return new T([e], e.nodeSize);
    throw new RangeError("Can not convert " + e + " to a Fragment" + (e.nodesBetween ? " (looks like multiple versions of prosemirror-model were loaded)" : ""));
  }
}
T.empty = new T([], 0);
const Xr = { index: 0, offset: 0 };
function ki(n, e) {
  return Xr.index = n, Xr.offset = e, Xr;
}
function Ui(n, e) {
  if (n === e)
    return !0;
  if (!(n && typeof n == "object") || !(e && typeof e == "object"))
    return !1;
  let t = Array.isArray(n);
  if (Array.isArray(e) != t)
    return !1;
  if (t) {
    if (n.length != e.length)
      return !1;
    for (let i = 0; i < n.length; i++)
      if (!Ui(n[i], e[i]))
        return !1;
  } else {
    for (let i in n)
      if (!(i in e) || !Ui(n[i], e[i]))
        return !1;
    for (let i in e)
      if (!(i in n))
        return !1;
  }
  return !0;
}
let J = class zs {
  /**
  @internal
  */
  constructor(e, t) {
    this.type = e, this.attrs = t;
  }
  /**
  Given a set of marks, create a new set which contains this one as
  well, in the right position. If this mark is already in the set,
  the set itself is returned. If any marks that are set to be
  [exclusive](https://prosemirror.net/docs/ref/#model.MarkSpec.excludes) with this mark are present,
  those are replaced by this one.
  */
  addToSet(e) {
    let t, i = !1;
    for (let r = 0; r < e.length; r++) {
      let s = e[r];
      if (this.eq(s))
        return e;
      if (this.type.excludes(s.type))
        t || (t = e.slice(0, r));
      else {
        if (s.type.excludes(this.type))
          return e;
        !i && s.type.rank > this.type.rank && (t || (t = e.slice(0, r)), t.push(this), i = !0), t && t.push(s);
      }
    }
    return t || (t = e.slice()), i || t.push(this), t;
  }
  /**
  Remove this mark from the given set, returning a new set. If this
  mark is not in the set, the set itself is returned.
  */
  removeFromSet(e) {
    for (let t = 0; t < e.length; t++)
      if (this.eq(e[t]))
        return e.slice(0, t).concat(e.slice(t + 1));
    return e;
  }
  /**
  Test whether this mark is in the given set of marks.
  */
  isInSet(e) {
    for (let t = 0; t < e.length; t++)
      if (this.eq(e[t]))
        return !0;
    return !1;
  }
  /**
  Test whether this mark has the same type and attributes as
  another mark.
  */
  eq(e) {
    return this == e || this.type == e.type && Ui(this.attrs, e.attrs);
  }
  /**
  Convert this mark to a JSON-serializeable representation.
  */
  toJSON() {
    let e = { type: this.type.name };
    for (let t in this.attrs) {
      e.attrs = this.attrs;
      break;
    }
    return e;
  }
  /**
  Deserialize a mark from JSON.
  */
  static fromJSON(e, t) {
    if (!t)
      throw new RangeError("Invalid input for Mark.fromJSON");
    let i = e.marks[t.type];
    if (!i)
      throw new RangeError("There is no mark type ".concat(t.type, " in this schema"));
    let r = i.create(t.attrs);
    return i.checkAttrs(r.attrs), r;
  }
  /**
  Test whether two sets of marks are identical.
  */
  static sameSet(e, t) {
    if (e == t)
      return !0;
    if (e.length != t.length)
      return !1;
    for (let i = 0; i < e.length; i++)
      if (!e[i].eq(t[i]))
        return !1;
    return !0;
  }
  /**
  Create a properly sorted mark set from null, a single mark, or an
  unsorted array of marks.
  */
  static setFrom(e) {
    if (!e || Array.isArray(e) && e.length == 0)
      return zs.none;
    if (e instanceof zs)
      return [e];
    let t = e.slice();
    return t.sort((i, r) => i.type.rank - r.type.rank), t;
  }
};
J.none = [];
class qi extends Error {
}
class N {
  /**
  Create a slice. When specifying a non-zero open depth, you must
  make sure that there are nodes of at least that depth at the
  appropriate side of the fragment—i.e. if the fragment is an
  empty paragraph node, `openStart` and `openEnd` can't be greater
  than 1.
  
  It is not necessary for the content of open nodes to conform to
  the schema's content constraints, though it should be a valid
  start/end/middle for such a node, depending on which sides are
  open.
  */
  constructor(e, t, i) {
    this.content = e, this.openStart = t, this.openEnd = i;
  }
  /**
  The size this slice would add when inserted into a document.
  */
  get size() {
    return this.content.size - this.openStart - this.openEnd;
  }
  /**
  @internal
  */
  insertAt(e, t) {
    let i = kd(this.content, e + this.openStart, t);
    return i && new N(i, this.openStart, this.openEnd);
  }
  /**
  @internal
  */
  removeBetween(e, t) {
    return new N(Cd(this.content, e + this.openStart, t + this.openStart), this.openStart, this.openEnd);
  }
  /**
  Tests whether this slice is equal to another slice.
  */
  eq(e) {
    return this.content.eq(e.content) && this.openStart == e.openStart && this.openEnd == e.openEnd;
  }
  /**
  @internal
  */
  toString() {
    return this.content + "(" + this.openStart + "," + this.openEnd + ")";
  }
  /**
  Convert a slice to a JSON-serializable representation.
  */
  toJSON() {
    if (!this.content.size)
      return null;
    let e = { content: this.content.toJSON() };
    return this.openStart > 0 && (e.openStart = this.openStart), this.openEnd > 0 && (e.openEnd = this.openEnd), e;
  }
  /**
  Deserialize a slice from its JSON representation.
  */
  static fromJSON(e, t) {
    if (!t)
      return N.empty;
    let i = t.openStart || 0, r = t.openEnd || 0;
    if (typeof i != "number" || typeof r != "number")
      throw new RangeError("Invalid input for Slice.fromJSON");
    return new N(T.fromJSON(e, t.content), i, r);
  }
  /**
  Create a slice from a fragment by taking the maximum possible
  open value on both side of the fragment.
  */
  static maxOpen(e, t = !0) {
    let i = 0, r = 0;
    for (let s = e.firstChild; s && !s.isLeaf && (t || !s.type.spec.isolating); s = s.firstChild)
      i++;
    for (let s = e.lastChild; s && !s.isLeaf && (t || !s.type.spec.isolating); s = s.lastChild)
      r++;
    return new N(e, i, r);
  }
}
N.empty = new N(T.empty, 0, 0);
function Cd(n, e, t) {
  let { index: i, offset: r } = n.findIndex(e), s = n.maybeChild(i), { index: o, offset: a } = n.findIndex(t);
  if (r == e || s.isText) {
    if (a != t && !n.child(o).isText)
      throw new RangeError("Removing non-flat range");
    return n.cut(0, e).append(n.cut(t));
  }
  if (i != o)
    throw new RangeError("Removing non-flat range");
  return n.replaceChild(i, s.copy(Cd(s.content, e - r - 1, t - r - 1)));
}
function kd(n, e, t, i) {
  let { index: r, offset: s } = n.findIndex(e), o = n.maybeChild(r);
  if (s == e || o.isText)
    return i && !i.canReplace(r, r, t) ? null : n.cut(0, e).append(t).append(n.cut(e));
  let a = kd(o.content, e - s - 1, t, o);
  return a && n.replaceChild(r, o.copy(a));
}
function N2(n, e, t) {
  if (t.openStart > n.depth)
    throw new qi("Inserted content deeper than insertion position");
  if (n.depth - t.openStart != e.depth - t.openEnd)
    throw new qi("Inconsistent open depths");
  return xd(n, e, t, 0);
}
function xd(n, e, t, i) {
  let r = n.index(i), s = n.node(i);
  if (r == e.index(i) && i < n.depth - t.openStart) {
    let o = xd(n, e, t, i + 1);
    return s.copy(s.content.replaceChild(r, o));
  } else if (t.content.size)
    if (!t.openStart && !t.openEnd && n.depth == i && e.depth == i) {
      let o = n.parent, a = o.content;
      return zt(o, a.cut(0, n.parentOffset).append(t.content).append(a.cut(e.parentOffset)));
    } else {
      let { start: o, end: a } = E2(t, n);
      return zt(s, Td(n, o, a, e, i));
    }
  else
    return zt(s, Ki(n, e, i));
}
function Sd(n, e) {
  if (!e.type.compatibleContent(n.type))
    throw new qi("Cannot join " + e.type.name + " onto " + n.type.name);
}
function Bs(n, e, t) {
  let i = n.node(t);
  return Sd(i, e.node(t)), i;
}
function Lt(n, e) {
  let t = e.length - 1;
  t >= 0 && n.isText && n.sameMarkup(e[t]) ? e[t] = n.withText(e[t].text + n.text) : e.push(n);
}
function $n(n, e, t, i) {
  let r = (e || n).node(t), s = 0, o = e ? e.index(t) : r.childCount;
  n && (s = n.index(t), n.depth > t ? s++ : n.textOffset && (Lt(n.nodeAfter, i), s++));
  for (let a = s; a < o; a++)
    Lt(r.child(a), i);
  e && e.depth == t && e.textOffset && Lt(e.nodeBefore, i);
}
function zt(n, e) {
  return n.type.checkContent(e), n.copy(e);
}
function Td(n, e, t, i, r) {
  let s = n.depth > r && Bs(n, e, r + 1), o = i.depth > r && Bs(t, i, r + 1), a = [];
  return $n(null, n, r, a), s && o && e.index(r) == t.index(r) ? (Sd(s, o), Lt(zt(s, Td(n, e, t, i, r + 1)), a)) : (s && Lt(zt(s, Ki(n, e, r + 1)), a), $n(e, t, r, a), o && Lt(zt(o, Ki(t, i, r + 1)), a)), $n(i, null, r, a), new T(a);
}
function Ki(n, e, t) {
  let i = [];
  if ($n(null, n, t, i), n.depth > t) {
    let r = Bs(n, e, t + 1);
    Lt(zt(r, Ki(n, e, t + 1)), i);
  }
  return $n(e, null, t, i), new T(i);
}
function E2(n, e) {
  let t = e.depth - n.openStart, r = e.node(t).copy(n.content);
  for (let s = t - 1; s >= 0; s--)
    r = e.node(s).copy(T.from(r));
  return {
    start: r.resolveNoCache(n.openStart + t),
    end: r.resolveNoCache(r.content.size - n.openEnd - t)
  };
}
class Wn {
  /**
  @internal
  */
  constructor(e, t, i) {
    this.pos = e, this.path = t, this.parentOffset = i, this.depth = t.length / 3 - 1;
  }
  /**
  @internal
  */
  resolveDepth(e) {
    return e == null ? this.depth : e < 0 ? this.depth + e : e;
  }
  /**
  The parent node that the position points into. Note that even if
  a position points into a text node, that node is not considered
  the parent—text nodes are ‘flat’ in this model, and have no content.
  */
  get parent() {
    return this.node(this.depth);
  }
  /**
  The root node in which the position was resolved.
  */
  get doc() {
    return this.node(0);
  }
  /**
  The ancestor node at the given level. `p.node(p.depth)` is the
  same as `p.parent`.
  */
  node(e) {
    return this.path[this.resolveDepth(e) * 3];
  }
  /**
  The index into the ancestor at the given level. If this points
  at the 3rd node in the 2nd paragraph on the top level, for
  example, `p.index(0)` is 1 and `p.index(1)` is 2.
  */
  index(e) {
    return this.path[this.resolveDepth(e) * 3 + 1];
  }
  /**
  The index pointing after this position into the ancestor at the
  given level.
  */
  indexAfter(e) {
    return e = this.resolveDepth(e), this.index(e) + (e == this.depth && !this.textOffset ? 0 : 1);
  }
  /**
  The (absolute) position at the start of the node at the given
  level.
  */
  start(e) {
    return e = this.resolveDepth(e), e == 0 ? 0 : this.path[e * 3 - 1] + 1;
  }
  /**
  The (absolute) position at the end of the node at the given
  level.
  */
  end(e) {
    return e = this.resolveDepth(e), this.start(e) + this.node(e).content.size;
  }
  /**
  The (absolute) position directly before the wrapping node at the
  given level, or, when `depth` is `this.depth + 1`, the original
  position.
  */
  before(e) {
    if (e = this.resolveDepth(e), !e)
      throw new RangeError("There is no position before the top-level node");
    return e == this.depth + 1 ? this.pos : this.path[e * 3 - 1];
  }
  /**
  The (absolute) position directly after the wrapping node at the
  given level, or the original position when `depth` is `this.depth + 1`.
  */
  after(e) {
    if (e = this.resolveDepth(e), !e)
      throw new RangeError("There is no position after the top-level node");
    return e == this.depth + 1 ? this.pos : this.path[e * 3 - 1] + this.path[e * 3].nodeSize;
  }
  /**
  When this position points into a text node, this returns the
  distance between the position and the start of the text node.
  Will be zero for positions that point between nodes.
  */
  get textOffset() {
    return this.pos - this.path[this.path.length - 1];
  }
  /**
  Get the node directly after the position, if any. If the position
  points into a text node, only the part of that node after the
  position is returned.
  */
  get nodeAfter() {
    let e = this.parent, t = this.index(this.depth);
    if (t == e.childCount)
      return null;
    let i = this.pos - this.path[this.path.length - 1], r = e.child(t);
    return i ? e.child(t).cut(i) : r;
  }
  /**
  Get the node directly before the position, if any. If the
  position points into a text node, only the part of that node
  before the position is returned.
  */
  get nodeBefore() {
    let e = this.index(this.depth), t = this.pos - this.path[this.path.length - 1];
    return t ? this.parent.child(e).cut(0, t) : e == 0 ? null : this.parent.child(e - 1);
  }
  /**
  Get the position at the given index in the parent node at the
  given depth (which defaults to `this.depth`).
  */
  posAtIndex(e, t) {
    t = this.resolveDepth(t);
    let i = this.path[t * 3], r = t == 0 ? 0 : this.path[t * 3 - 1] + 1;
    for (let s = 0; s < e; s++)
      r += i.child(s).nodeSize;
    return r;
  }
  /**
  Get the marks at this position, factoring in the surrounding
  marks' [`inclusive`](https://prosemirror.net/docs/ref/#model.MarkSpec.inclusive) property. If the
  position is at the start of a non-empty node, the marks of the
  node after it (if any) are returned.
  */
  marks() {
    let e = this.parent, t = this.index();
    if (e.content.size == 0)
      return J.none;
    if (this.textOffset)
      return e.child(t).marks;
    let i = e.maybeChild(t - 1), r = e.maybeChild(t);
    if (!i) {
      let a = i;
      i = r, r = a;
    }
    let s = i.marks;
    for (var o = 0; o < s.length; o++)
      s[o].type.spec.inclusive === !1 && (!r || !s[o].isInSet(r.marks)) && (s = s[o--].removeFromSet(s));
    return s;
  }
  /**
  Get the marks after the current position, if any, except those
  that are non-inclusive and not present at position `$end`. This
  is mostly useful for getting the set of marks to preserve after a
  deletion. Will return `null` if this position is at the end of
  its parent node or its parent node isn't a textblock (in which
  case no marks should be preserved).
  */
  marksAcross(e) {
    let t = this.parent.maybeChild(this.index());
    if (!t || !t.isInline)
      return null;
    let i = t.marks, r = e.parent.maybeChild(e.index());
    for (var s = 0; s < i.length; s++)
      i[s].type.spec.inclusive === !1 && (!r || !i[s].isInSet(r.marks)) && (i = i[s--].removeFromSet(i));
    return i;
  }
  /**
  The depth up to which this position and the given (non-resolved)
  position share the same parent nodes.
  */
  sharedDepth(e) {
    for (let t = this.depth; t > 0; t--)
      if (this.start(t) <= e && this.end(t) >= e)
        return t;
    return 0;
  }
  /**
  Returns a range based on the place where this position and the
  given position diverge around block content. If both point into
  the same textblock, for example, a range around that textblock
  will be returned. If they point into different blocks, the range
  around those blocks in their shared ancestor is returned. You can
  pass in an optional predicate that will be called with a parent
  node to see if a range into that parent is acceptable.
  */
  blockRange(e = this, t) {
    if (e.pos < this.pos)
      return e.blockRange(this);
    for (let i = this.depth - (this.parent.inlineContent || this.pos == e.pos ? 1 : 0); i >= 0; i--)
      if (e.pos <= this.end(i) && (!t || t(this.node(i))))
        return new Ji(this, e, i);
    return null;
  }
  /**
  Query whether the given position shares the same parent node.
  */
  sameParent(e) {
    return this.pos - this.parentOffset == e.pos - e.parentOffset;
  }
  /**
  Return the greater of this and the given position.
  */
  max(e) {
    return e.pos > this.pos ? e : this;
  }
  /**
  Return the smaller of this and the given position.
  */
  min(e) {
    return e.pos < this.pos ? e : this;
  }
  /**
  @internal
  */
  toString() {
    let e = "";
    for (let t = 1; t <= this.depth; t++)
      e += (e ? "/" : "") + this.node(t).type.name + "_" + this.index(t - 1);
    return e + ":" + this.parentOffset;
  }
  /**
  @internal
  */
  static resolve(e, t) {
    if (!(t >= 0 && t <= e.content.size))
      throw new RangeError("Position " + t + " out of range");
    let i = [], r = 0, s = t;
    for (let o = e; ; ) {
      let { index: a, offset: l } = o.content.findIndex(s), c = s - l;
      if (i.push(o, a, r + l), !c || (o = o.child(a), o.isText))
        break;
      s = c - 1, r += l + 1;
    }
    return new Wn(t, i, s);
  }
  /**
  @internal
  */
  static resolveCached(e, t) {
    let i = ml.get(e);
    if (i)
      for (let s = 0; s < i.elts.length; s++) {
        let o = i.elts[s];
        if (o.pos == t)
          return o;
      }
    else
      ml.set(e, i = new A2());
    let r = i.elts[i.i] = Wn.resolve(e, t);
    return i.i = (i.i + 1) % I2, r;
  }
}
class A2 {
  constructor() {
    this.elts = [], this.i = 0;
  }
}
const I2 = 12, ml = /* @__PURE__ */ new WeakMap();
class Ji {
  /**
  Construct a node range. `$from` and `$to` should point into the
  same node until at least the given `depth`, since a node range
  denotes an adjacent set of nodes in a single parent node.
  */
  constructor(e, t, i) {
    this.$from = e, this.$to = t, this.depth = i;
  }
  /**
  The position at the start of the range.
  */
  get start() {
    return this.$from.before(this.depth + 1);
  }
  /**
  The position at the end of the range.
  */
  get end() {
    return this.$to.after(this.depth + 1);
  }
  /**
  The parent node that the range points into.
  */
  get parent() {
    return this.$from.node(this.depth);
  }
  /**
  The start index of the range in the parent node.
  */
  get startIndex() {
    return this.$from.index(this.depth);
  }
  /**
  The end index of the range in the parent node.
  */
  get endIndex() {
    return this.$to.indexAfter(this.depth);
  }
}
const O2 = /* @__PURE__ */ Object.create(null);
let wt = class Fs {
  /**
  @internal
  */
  constructor(e, t, i, r = J.none) {
    this.type = e, this.attrs = t, this.marks = r, this.content = i || T.empty;
  }
  /**
  The array of this node's child nodes.
  */
  get children() {
    return this.content.content;
  }
  /**
  The size of this node, as defined by the integer-based [indexing
  scheme](https://prosemirror.net/docs/guide/#doc.indexing). For text nodes, this is the
  amount of characters. For other leaf nodes, it is one. For
  non-leaf nodes, it is the size of the content plus two (the
  start and end token).
  */
  get nodeSize() {
    return this.isLeaf ? 1 : 2 + this.content.size;
  }
  /**
  The number of children that the node has.
  */
  get childCount() {
    return this.content.childCount;
  }
  /**
  Get the child node at the given index. Raises an error when the
  index is out of range.
  */
  child(e) {
    return this.content.child(e);
  }
  /**
  Get the child node at the given index, if it exists.
  */
  maybeChild(e) {
    return this.content.maybeChild(e);
  }
  /**
  Call `f` for every child node, passing the node, its offset
  into this parent node, and its index.
  */
  forEach(e) {
    this.content.forEach(e);
  }
  /**
  Invoke a callback for all descendant nodes recursively between
  the given two positions that are relative to start of this
  node's content. The callback is invoked with the node, its
  position relative to the original node (method receiver),
  its parent node, and its child index. When the callback returns
  false for a given node, that node's children will not be
  recursed over. The last parameter can be used to specify a
  starting position to count from.
  */
  nodesBetween(e, t, i, r = 0) {
    this.content.nodesBetween(e, t, i, r, this);
  }
  /**
  Call the given callback for every descendant node. Doesn't
  descend into a node when the callback returns `false`.
  */
  descendants(e) {
    this.nodesBetween(0, this.content.size, e);
  }
  /**
  Concatenates all the text nodes found in this fragment and its
  children.
  */
  get textContent() {
    return this.isLeaf && this.type.spec.leafText ? this.type.spec.leafText(this) : this.textBetween(0, this.content.size, "");
  }
  /**
  Get all text between positions `from` and `to`. When
  `blockSeparator` is given, it will be inserted to separate text
  from different block nodes. If `leafText` is given, it'll be
  inserted for every non-text leaf node encountered, otherwise
  [`leafText`](https://prosemirror.net/docs/ref/#model.NodeSpec.leafText) will be used.
  */
  textBetween(e, t, i, r) {
    return this.content.textBetween(e, t, i, r);
  }
  /**
  Returns this node's first child, or `null` if there are no
  children.
  */
  get firstChild() {
    return this.content.firstChild;
  }
  /**
  Returns this node's last child, or `null` if there are no
  children.
  */
  get lastChild() {
    return this.content.lastChild;
  }
  /**
  Test whether two nodes represent the same piece of document.
  */
  eq(e) {
    return this == e || this.sameMarkup(e) && this.content.eq(e.content);
  }
  /**
  Compare the markup (type, attributes, and marks) of this node to
  those of another. Returns `true` if both have the same markup.
  */
  sameMarkup(e) {
    return this.hasMarkup(e.type, e.attrs, e.marks);
  }
  /**
  Check whether this node's markup correspond to the given type,
  attributes, and marks.
  */
  hasMarkup(e, t, i) {
    return this.type == e && Ui(this.attrs, t || e.defaultAttrs || O2) && J.sameSet(this.marks, i || J.none);
  }
  /**
  Create a new node with the same markup as this node, containing
  the given content (or empty, if no content is given).
  */
  copy(e = null) {
    return e == this.content ? this : new Fs(this.type, this.attrs, e, this.marks);
  }
  /**
  Create a copy of this node, with the given set of marks instead
  of the node's own marks.
  */
  mark(e) {
    return e == this.marks ? this : new Fs(this.type, this.attrs, this.content, e);
  }
  /**
  Create a copy of this node with only the content between the
  given positions. If `to` is not given, it defaults to the end of
  the node.
  */
  cut(e, t = this.content.size) {
    return e == 0 && t == this.content.size ? this : this.copy(this.content.cut(e, t));
  }
  /**
  Cut out the part of the document between the given positions, and
  return it as a `Slice` object.
  */
  slice(e, t = this.content.size, i = !1) {
    if (e == t)
      return N.empty;
    let r = this.resolve(e), s = this.resolve(t), o = i ? 0 : r.sharedDepth(t), a = r.start(o), c = r.node(o).content.cut(r.pos - a, s.pos - a);
    return new N(c, r.depth - o, s.depth - o);
  }
  /**
  Replace the part of the document between the given positions with
  the given slice. The slice must 'fit', meaning its open sides
  must be able to connect to the surrounding content, and its
  content nodes must be valid children for the node they are placed
  into. If any of this is violated, an error of type
  [`ReplaceError`](https://prosemirror.net/docs/ref/#model.ReplaceError) is thrown.
  */
  replace(e, t, i) {
    return N2(this.resolve(e), this.resolve(t), i);
  }
  /**
  Find the node directly after the given position.
  */
  nodeAt(e) {
    for (let t = this; ; ) {
      let { index: i, offset: r } = t.content.findIndex(e);
      if (t = t.maybeChild(i), !t)
        return null;
      if (r == e || t.isText)
        return t;
      e -= r + 1;
    }
  }
  /**
  Find the (direct) child node after the given offset, if any,
  and return it along with its index and offset relative to this
  node.
  */
  childAfter(e) {
    let { index: t, offset: i } = this.content.findIndex(e);
    return { node: this.content.maybeChild(t), index: t, offset: i };
  }
  /**
  Find the (direct) child node before the given offset, if any,
  and return it along with its index and offset relative to this
  node.
  */
  childBefore(e) {
    if (e == 0)
      return { node: null, index: 0, offset: 0 };
    let { index: t, offset: i } = this.content.findIndex(e);
    if (i < e)
      return { node: this.content.child(t), index: t, offset: i };
    let r = this.content.child(t - 1);
    return { node: r, index: t - 1, offset: i - r.nodeSize };
  }
  /**
  Resolve the given position in the document, returning an
  [object](https://prosemirror.net/docs/ref/#model.ResolvedPos) with information about its context.
  */
  resolve(e) {
    return Wn.resolveCached(this, e);
  }
  /**
  @internal
  */
  resolveNoCache(e) {
    return Wn.resolve(this, e);
  }
  /**
  Test whether a given mark or mark type occurs in this document
  between the two given positions.
  */
  rangeHasMark(e, t, i) {
    let r = !1;
    return t > e && this.nodesBetween(e, t, (s) => (i.isInSet(s.marks) && (r = !0), !r)), r;
  }
  /**
  True when this is a block (non-inline node)
  */
  get isBlock() {
    return this.type.isBlock;
  }
  /**
  True when this is a textblock node, a block node with inline
  content.
  */
  get isTextblock() {
    return this.type.isTextblock;
  }
  /**
  True when this node allows inline content.
  */
  get inlineContent() {
    return this.type.inlineContent;
  }
  /**
  True when this is an inline node (a text node or a node that can
  appear among text).
  */
  get isInline() {
    return this.type.isInline;
  }
  /**
  True when this is a text node.
  */
  get isText() {
    return this.type.isText;
  }
  /**
  True when this is a leaf node.
  */
  get isLeaf() {
    return this.type.isLeaf;
  }
  /**
  True when this is an atom, i.e. when it does not have directly
  editable content. This is usually the same as `isLeaf`, but can
  be configured with the [`atom` property](https://prosemirror.net/docs/ref/#model.NodeSpec.atom)
  on a node's spec (typically used when the node is displayed as
  an uneditable [node view](https://prosemirror.net/docs/ref/#view.NodeView)).
  */
  get isAtom() {
    return this.type.isAtom;
  }
  /**
  Return a string representation of this node for debugging
  purposes.
  */
  toString() {
    if (this.type.spec.toDebugString)
      return this.type.spec.toDebugString(this);
    let e = this.type.name;
    return this.content.size && (e += "(" + this.content.toStringInner() + ")"), Md(this.marks, e);
  }
  /**
  Get the content match in this node at the given index.
  */
  contentMatchAt(e) {
    let t = this.type.contentMatch.matchFragment(this.content, 0, e);
    if (!t)
      throw new Error("Called contentMatchAt on a node with invalid content");
    return t;
  }
  /**
  Test whether replacing the range between `from` and `to` (by
  child index) with the given replacement fragment (which defaults
  to the empty fragment) would leave the node's content valid. You
  can optionally pass `start` and `end` indices into the
  replacement fragment.
  */
  canReplace(e, t, i = T.empty, r = 0, s = i.childCount) {
    let o = this.contentMatchAt(e).matchFragment(i, r, s), a = o && o.matchFragment(this.content, t);
    if (!a || !a.validEnd)
      return !1;
    for (let l = r; l < s; l++)
      if (!this.type.allowsMarks(i.child(l).marks))
        return !1;
    return !0;
  }
  /**
  Test whether replacing the range `from` to `to` (by index) with
  a node of the given type would leave the node's content valid.
  */
  canReplaceWith(e, t, i, r) {
    if (r && !this.type.allowsMarks(r))
      return !1;
    let s = this.contentMatchAt(e).matchType(i), o = s && s.matchFragment(this.content, t);
    return o ? o.validEnd : !1;
  }
  /**
  Test whether the given node's content could be appended to this
  node. If that node is empty, this will only return true if there
  is at least one node type that can appear in both nodes (to avoid
  merging completely incompatible nodes).
  */
  canAppend(e) {
    return e.content.size ? this.canReplace(this.childCount, this.childCount, e.content) : this.type.compatibleContent(e.type);
  }
  /**
  Check whether this node and its descendants conform to the
  schema, and raise an exception when they do not.
  */
  check() {
    this.type.checkContent(this.content), this.type.checkAttrs(this.attrs);
    let e = J.none;
    for (let t = 0; t < this.marks.length; t++) {
      let i = this.marks[t];
      i.type.checkAttrs(i.attrs), e = i.addToSet(e);
    }
    if (!J.sameSet(e, this.marks))
      throw new RangeError("Invalid collection of marks for node ".concat(this.type.name, ": ").concat(this.marks.map((t) => t.type.name)));
    this.content.forEach((t) => t.check());
  }
  /**
  Return a JSON-serializeable representation of this node.
  */
  toJSON() {
    let e = { type: this.type.name };
    for (let t in this.attrs) {
      e.attrs = this.attrs;
      break;
    }
    return this.content.size && (e.content = this.content.toJSON()), this.marks.length && (e.marks = this.marks.map((t) => t.toJSON())), e;
  }
  /**
  Deserialize a node from its JSON representation.
  */
  static fromJSON(e, t) {
    if (!t)
      throw new RangeError("Invalid input for Node.fromJSON");
    let i;
    if (t.marks) {
      if (!Array.isArray(t.marks))
        throw new RangeError("Invalid mark data for Node.fromJSON");
      i = t.marks.map(e.markFromJSON);
    }
    if (t.type == "text") {
      if (typeof t.text != "string")
        throw new RangeError("Invalid text node in JSON");
      return e.text(t.text, i);
    }
    let r = T.fromJSON(e, t.content), s = e.nodeType(t.type).create(t.attrs, r, i);
    return s.type.checkAttrs(s.attrs), s;
  }
};
wt.prototype.text = void 0;
class Gi extends wt {
  /**
  @internal
  */
  constructor(e, t, i, r) {
    if (super(e, t, null, r), !i)
      throw new RangeError("Empty text nodes are not allowed");
    this.text = i;
  }
  toString() {
    return this.type.spec.toDebugString ? this.type.spec.toDebugString(this) : Md(this.marks, JSON.stringify(this.text));
  }
  get textContent() {
    return this.text;
  }
  textBetween(e, t) {
    return this.text.slice(e, t);
  }
  get nodeSize() {
    return this.text.length;
  }
  mark(e) {
    return e == this.marks ? this : new Gi(this.type, this.attrs, this.text, e);
  }
  withText(e) {
    return e == this.text ? this : new Gi(this.type, this.attrs, e, this.marks);
  }
  cut(e = 0, t = this.text.length) {
    return e == 0 && t == this.text.length ? this : this.withText(this.text.slice(e, t));
  }
  eq(e) {
    return this.sameMarkup(e) && this.text == e.text;
  }
  toJSON() {
    let e = super.toJSON();
    return e.text = this.text, e;
  }
}
function Md(n, e) {
  for (let t = n.length - 1; t >= 0; t--)
    e = n[t].type.name + "(" + e + ")";
  return e;
}
class jt {
  /**
  @internal
  */
  constructor(e) {
    this.validEnd = e, this.next = [], this.wrapCache = [];
  }
  /**
  @internal
  */
  static parse(e, t) {
    let i = new D2(e, t);
    if (i.next == null)
      return jt.empty;
    let r = _d(i);
    i.next && i.err("Unexpected trailing text");
    let s = F2(B2(r));
    return V2(s, i), s;
  }
  /**
  Match a node type, returning a match after that node if
  successful.
  */
  matchType(e) {
    for (let t = 0; t < this.next.length; t++)
      if (this.next[t].type == e)
        return this.next[t].next;
    return null;
  }
  /**
  Try to match a fragment. Returns the resulting match when
  successful.
  */
  matchFragment(e, t = 0, i = e.childCount) {
    let r = this;
    for (let s = t; r && s < i; s++)
      r = r.matchType(e.child(s).type);
    return r;
  }
  /**
  @internal
  */
  get inlineContent() {
    return this.next.length != 0 && this.next[0].type.isInline;
  }
  /**
  Get the first matching node type at this match position that can
  be generated.
  */
  get defaultType() {
    for (let e = 0; e < this.next.length; e++) {
      let { type: t } = this.next[e];
      if (!(t.isText || t.hasRequiredAttrs()))
        return t;
    }
    return null;
  }
  /**
  @internal
  */
  compatible(e) {
    for (let t = 0; t < this.next.length; t++)
      for (let i = 0; i < e.next.length; i++)
        if (this.next[t].type == e.next[i].type)
          return !0;
    return !1;
  }
  /**
  Try to match the given fragment, and if that fails, see if it can
  be made to match by inserting nodes in front of it. When
  successful, return a fragment of inserted nodes (which may be
  empty if nothing had to be inserted). When `toEnd` is true, only
  return a fragment if the resulting match goes to the end of the
  content expression.
  */
  fillBefore(e, t = !1, i = 0) {
    let r = [this];
    function s(o, a) {
      let l = o.matchFragment(e, i);
      if (l && (!t || l.validEnd))
        return T.from(a.map((c) => c.createAndFill()));
      for (let c = 0; c < o.next.length; c++) {
        let { type: u, next: d } = o.next[c];
        if (!(u.isText || u.hasRequiredAttrs()) && r.indexOf(d) == -1) {
          r.push(d);
          let f = s(d, a.concat(u));
          if (f)
            return f;
        }
      }
      return null;
    }
    return s(this, []);
  }
  /**
  Find a set of wrapping node types that would allow a node of the
  given type to appear at this position. The result may be empty
  (when it fits directly) and will be null when no such wrapping
  exists.
  */
  findWrapping(e) {
    for (let i = 0; i < this.wrapCache.length; i += 2)
      if (this.wrapCache[i] == e)
        return this.wrapCache[i + 1];
    let t = this.computeWrapping(e);
    return this.wrapCache.push(e, t), t;
  }
  /**
  @internal
  */
  computeWrapping(e) {
    let t = /* @__PURE__ */ Object.create(null), i = [{ match: this, type: null, via: null }];
    for (; i.length; ) {
      let r = i.shift(), s = r.match;
      if (s.matchType(e)) {
        let o = [];
        for (let a = r; a.type; a = a.via)
          o.push(a.type);
        return o.reverse();
      }
      for (let o = 0; o < s.next.length; o++) {
        let { type: a, next: l } = s.next[o];
        !a.isLeaf && !a.hasRequiredAttrs() && !(a.name in t) && (!r.type || l.validEnd) && (i.push({ match: a.contentMatch, type: a, via: r }), t[a.name] = !0);
      }
    }
    return null;
  }
  /**
  The number of outgoing edges this node has in the finite
  automaton that describes the content expression.
  */
  get edgeCount() {
    return this.next.length;
  }
  /**
  Get the _n_​th outgoing edge from this node in the finite
  automaton that describes the content expression.
  */
  edge(e) {
    if (e >= this.next.length)
      throw new RangeError("There's no ".concat(e, "th edge in this content match"));
    return this.next[e];
  }
  /**
  @internal
  */
  toString() {
    let e = [];
    function t(i) {
      e.push(i);
      for (let r = 0; r < i.next.length; r++)
        e.indexOf(i.next[r].next) == -1 && t(i.next[r].next);
    }
    return t(this), e.map((i, r) => {
      let s = r + (i.validEnd ? "*" : " ") + " ";
      for (let o = 0; o < i.next.length; o++)
        s += (o ? ", " : "") + i.next[o].type.name + "->" + e.indexOf(i.next[o].next);
      return s;
    }).join("\n");
  }
}
jt.empty = new jt(!0);
class D2 {
  constructor(e, t) {
    this.string = e, this.nodeTypes = t, this.inline = null, this.pos = 0, this.tokens = e.split(/\s*(?=\b|\W|$)/), this.tokens[this.tokens.length - 1] == "" && this.tokens.pop(), this.tokens[0] == "" && this.tokens.shift();
  }
  get next() {
    return this.tokens[this.pos];
  }
  eat(e) {
    return this.next == e && (this.pos++ || !0);
  }
  err(e) {
    throw new SyntaxError(e + " (in content expression '" + this.string + "')");
  }
}
function _d(n) {
  let e = [];
  do
    e.push($2(n));
  while (n.eat("|"));
  return e.length == 1 ? e[0] : { type: "choice", exprs: e };
}
function $2(n) {
  let e = [];
  do
    e.push(R2(n));
  while (n.next && n.next != ")" && n.next != "|");
  return e.length == 1 ? e[0] : { type: "seq", exprs: e };
}
function R2(n) {
  let e = z2(n);
  for (; ; )
    if (n.eat("+"))
      e = { type: "plus", expr: e };
    else if (n.eat("*"))
      e = { type: "star", expr: e };
    else if (n.eat("?"))
      e = { type: "opt", expr: e };
    else if (n.eat("{"))
      e = P2(n, e);
    else
      break;
  return e;
}
function gl(n) {
  /\D/.test(n.next) && n.err("Expected number, got '" + n.next + "'");
  let e = Number(n.next);
  return n.pos++, e;
}
function P2(n, e) {
  let t = gl(n), i = t;
  return n.eat(",") && (n.next != "}" ? i = gl(n) : i = -1), n.eat("}") || n.err("Unclosed braced range"), { type: "range", min: t, max: i, expr: e };
}
function L2(n, e) {
  let t = n.nodeTypes, i = t[e];
  if (i)
    return [i];
  let r = [];
  for (let s in t) {
    let o = t[s];
    o.isInGroup(e) && r.push(o);
  }
  return r.length == 0 && n.err("No node type or group '" + e + "' found"), r;
}
function z2(n) {
  if (n.eat("(")) {
    let e = _d(n);
    return n.eat(")") || n.err("Missing closing paren"), e;
  } else if (/\W/.test(n.next))
    n.err("Unexpected token '" + n.next + "'");
  else {
    let e = L2(n, n.next).map((t) => (n.inline == null ? n.inline = t.isInline : n.inline != t.isInline && n.err("Mixing inline and block content"), { type: "name", value: t }));
    return n.pos++, e.length == 1 ? e[0] : { type: "choice", exprs: e };
  }
}
function B2(n) {
  let e = [[]];
  return r(s(n, 0), t()), e;
  function t() {
    return e.push([]) - 1;
  }
  function i(o, a, l) {
    let c = { term: l, to: a };
    return e[o].push(c), c;
  }
  function r(o, a) {
    o.forEach((l) => l.to = a);
  }
  function s(o, a) {
    if (o.type == "choice")
      return o.exprs.reduce((l, c) => l.concat(s(c, a)), []);
    if (o.type == "seq")
      for (let l = 0; ; l++) {
        let c = s(o.exprs[l], a);
        if (l == o.exprs.length - 1)
          return c;
        r(c, a = t());
      }
    else if (o.type == "star") {
      let l = t();
      return i(a, l), r(s(o.expr, l), l), [i(l)];
    } else if (o.type == "plus") {
      let l = t();
      return r(s(o.expr, a), l), r(s(o.expr, l), l), [i(l)];
    } else {
      if (o.type == "opt")
        return [i(a)].concat(s(o.expr, a));
      if (o.type == "range") {
        let l = a;
        for (let c = 0; c < o.min; c++) {
          let u = t();
          r(s(o.expr, l), u), l = u;
        }
        if (o.max == -1)
          r(s(o.expr, l), l);
        else
          for (let c = o.min; c < o.max; c++) {
            let u = t();
            i(l, u), r(s(o.expr, l), u), l = u;
          }
        return [i(l)];
      } else {
        if (o.type == "name")
          return [i(a, void 0, o.value)];
        throw new Error("Unknown expr type");
      }
    }
  }
}
function Nd(n, e) {
  return e - n;
}
function vl(n, e) {
  let t = [];
  return i(e), t.sort(Nd);
  function i(r) {
    let s = n[r];
    if (s.length == 1 && !s[0].term)
      return i(s[0].to);
    t.push(r);
    for (let o = 0; o < s.length; o++) {
      let { term: a, to: l } = s[o];
      !a && t.indexOf(l) == -1 && i(l);
    }
  }
}
function F2(n) {
  let e = /* @__PURE__ */ Object.create(null);
  return t(vl(n, 0));
  function t(i) {
    let r = [];
    i.forEach((o) => {
      n[o].forEach(({ term: a, to: l }) => {
        if (!a)
          return;
        let c;
        for (let u = 0; u < r.length; u++)
          r[u][0] == a && (c = r[u][1]);
        vl(n, l).forEach((u) => {
          c || r.push([a, c = []]), c.indexOf(u) == -1 && c.push(u);
        });
      });
    });
    let s = e[i.join(",")] = new jt(i.indexOf(n.length - 1) > -1);
    for (let o = 0; o < r.length; o++) {
      let a = r[o][1].sort(Nd);
      s.next.push({ type: r[o][0], next: e[a.join(",")] || t(a) });
    }
    return s;
  }
}
function V2(n, e) {
  for (let t = 0, i = [n]; t < i.length; t++) {
    let r = i[t], s = !r.validEnd, o = [];
    for (let a = 0; a < r.next.length; a++) {
      let { type: l, next: c } = r.next[a];
      o.push(l.name), s && !(l.isText || l.hasRequiredAttrs()) && (s = !1), i.indexOf(c) == -1 && i.push(c);
    }
    s && e.err("Only non-generatable nodes (" + o.join(", ") + ") in a required position (see https://prosemirror.net/docs/guide/#generatable)");
  }
}
function Ed(n) {
  let e = /* @__PURE__ */ Object.create(null);
  for (let t in n) {
    let i = n[t];
    if (!i.hasDefault)
      return null;
    e[t] = i.default;
  }
  return e;
}
function Ad(n, e) {
  let t = /* @__PURE__ */ Object.create(null);
  for (let i in n) {
    let r = e && e[i];
    if (r === void 0) {
      let s = n[i];
      if (s.hasDefault)
        r = s.default;
      else
        throw new RangeError("No value supplied for attribute " + i);
    }
    t[i] = r;
  }
  return t;
}
function Id(n, e, t, i) {
  for (let r in e)
    if (!(r in n))
      throw new RangeError("Unsupported attribute ".concat(r, " for ").concat(t, " of type ").concat(r));
  for (let r in n) {
    let s = n[r];
    s.validate && s.validate(e[r]);
  }
}
function Od(n, e) {
  let t = /* @__PURE__ */ Object.create(null);
  if (e)
    for (let i in e)
      t[i] = new j2(n, i, e[i]);
  return t;
}
let yl = class Dd {
  /**
  @internal
  */
  constructor(e, t, i) {
    this.name = e, this.schema = t, this.spec = i, this.markSet = null, this.groups = i.group ? i.group.split(" ") : [], this.attrs = Od(e, i.attrs), this.defaultAttrs = Ed(this.attrs), this.contentMatch = null, this.inlineContent = null, this.isBlock = !(i.inline || e == "text"), this.isText = e == "text";
  }
  /**
  True if this is an inline type.
  */
  get isInline() {
    return !this.isBlock;
  }
  /**
  True if this is a textblock type, a block that contains inline
  content.
  */
  get isTextblock() {
    return this.isBlock && this.inlineContent;
  }
  /**
  True for node types that allow no content.
  */
  get isLeaf() {
    return this.contentMatch == jt.empty;
  }
  /**
  True when this node is an atom, i.e. when it does not have
  directly editable content.
  */
  get isAtom() {
    return this.isLeaf || !!this.spec.atom;
  }
  /**
  Return true when this node type is part of the given
  [group](https://prosemirror.net/docs/ref/#model.NodeSpec.group).
  */
  isInGroup(e) {
    return this.groups.indexOf(e) > -1;
  }
  /**
  The node type's [whitespace](https://prosemirror.net/docs/ref/#model.NodeSpec.whitespace) option.
  */
  get whitespace() {
    return this.spec.whitespace || (this.spec.code ? "pre" : "normal");
  }
  /**
  Tells you whether this node type has any required attributes.
  */
  hasRequiredAttrs() {
    for (let e in this.attrs)
      if (this.attrs[e].isRequired)
        return !0;
    return !1;
  }
  /**
  Indicates whether this node allows some of the same content as
  the given node type.
  */
  compatibleContent(e) {
    return this == e || this.contentMatch.compatible(e.contentMatch);
  }
  /**
  @internal
  */
  computeAttrs(e) {
    return !e && this.defaultAttrs ? this.defaultAttrs : Ad(this.attrs, e);
  }
  /**
  Create a `Node` of this type. The given attributes are
  checked and defaulted (you can pass `null` to use the type's
  defaults entirely, if no required attributes exist). `content`
  may be a `Fragment`, a node, an array of nodes, or
  `null`. Similarly `marks` may be `null` to default to the empty
  set of marks.
  */
  create(e = null, t, i) {
    if (this.isText)
      throw new Error("NodeType.create can't construct text nodes");
    return new wt(this, this.computeAttrs(e), T.from(t), J.setFrom(i));
  }
  /**
  Like [`create`](https://prosemirror.net/docs/ref/#model.NodeType.create), but check the given content
  against the node type's content restrictions, and throw an error
  if it doesn't match.
  */
  createChecked(e = null, t, i) {
    return t = T.from(t), this.checkContent(t), new wt(this, this.computeAttrs(e), t, J.setFrom(i));
  }
  /**
  Like [`create`](https://prosemirror.net/docs/ref/#model.NodeType.create), but see if it is
  necessary to add nodes to the start or end of the given fragment
  to make it fit the node. If no fitting wrapping can be found,
  return null. Note that, due to the fact that required nodes can
  always be created, this will always succeed if you pass null or
  `Fragment.empty` as content.
  */
  createAndFill(e = null, t, i) {
    if (e = this.computeAttrs(e), t = T.from(t), t.size) {
      let o = this.contentMatch.fillBefore(t);
      if (!o)
        return null;
      t = o.append(t);
    }
    let r = this.contentMatch.matchFragment(t), s = r && r.fillBefore(T.empty, !0);
    return s ? new wt(this, e, t.append(s), J.setFrom(i)) : null;
  }
  /**
  Returns true if the given fragment is valid content for this node
  type.
  */
  validContent(e) {
    let t = this.contentMatch.matchFragment(e);
    if (!t || !t.validEnd)
      return !1;
    for (let i = 0; i < e.childCount; i++)
      if (!this.allowsMarks(e.child(i).marks))
        return !1;
    return !0;
  }
  /**
  Throws a RangeError if the given fragment is not valid content for this
  node type.
  @internal
  */
  checkContent(e) {
    if (!this.validContent(e))
      throw new RangeError("Invalid content for node ".concat(this.name, ": ").concat(e.toString().slice(0, 50)));
  }
  /**
  @internal
  */
  checkAttrs(e) {
    Id(this.attrs, e, "node", this.name);
  }
  /**
  Check whether the given mark type is allowed in this node.
  */
  allowsMarkType(e) {
    return this.markSet == null || this.markSet.indexOf(e) > -1;
  }
  /**
  Test whether the given set of marks are allowed in this node.
  */
  allowsMarks(e) {
    if (this.markSet == null)
      return !0;
    for (let t = 0; t < e.length; t++)
      if (!this.allowsMarkType(e[t].type))
        return !1;
    return !0;
  }
  /**
  Removes the marks that are not allowed in this node from the given set.
  */
  allowedMarks(e) {
    if (this.markSet == null)
      return e;
    let t;
    for (let i = 0; i < e.length; i++)
      this.allowsMarkType(e[i].type) ? t && t.push(e[i]) : t || (t = e.slice(0, i));
    return t ? t.length ? t : J.none : e;
  }
  /**
  @internal
  */
  static compile(e, t) {
    let i = /* @__PURE__ */ Object.create(null);
    e.forEach((s, o) => i[s] = new Dd(s, t, o));
    let r = t.spec.topNode || "doc";
    if (!i[r])
      throw new RangeError("Schema is missing its top node type ('" + r + "')");
    if (!i.text)
      throw new RangeError("Every schema needs a 'text' type");
    for (let s in i.text.attrs)
      throw new RangeError("The text node type should not have attributes");
    return i;
  }
};
function H2(n, e, t) {
  let i = t.split("|");
  return (r) => {
    let s = r === null ? "null" : typeof r;
    if (i.indexOf(s) < 0)
      throw new RangeError("Expected value of type ".concat(i, " for attribute ").concat(e, " on type ").concat(n, ", got ").concat(s));
  };
}
class j2 {
  constructor(e, t, i) {
    this.hasDefault = Object.prototype.hasOwnProperty.call(i, "default"), this.default = i.default, this.validate = typeof i.validate == "string" ? H2(e, t, i.validate) : i.validate;
  }
  get isRequired() {
    return !this.hasDefault;
  }
}
class pr {
  /**
  @internal
  */
  constructor(e, t, i, r) {
    this.name = e, this.rank = t, this.schema = i, this.spec = r, this.attrs = Od(e, r.attrs), this.excluded = null;
    let s = Ed(this.attrs);
    this.instance = s ? new J(this, s) : null;
  }
  /**
  Create a mark of this type. `attrs` may be `null` or an object
  containing only some of the mark's attributes. The others, if
  they have defaults, will be added.
  */
  create(e = null) {
    return !e && this.instance ? this.instance : new J(this, Ad(this.attrs, e));
  }
  /**
  @internal
  */
  static compile(e, t) {
    let i = /* @__PURE__ */ Object.create(null), r = 0;
    return e.forEach((s, o) => i[s] = new pr(s, r++, t, o)), i;
  }
  /**
  When there is a mark of this type in the given set, a new set
  without it is returned. Otherwise, the input set is returned.
  */
  removeFromSet(e) {
    for (var t = 0; t < e.length; t++)
      e[t].type == this && (e = e.slice(0, t).concat(e.slice(t + 1)), t--);
    return e;
  }
  /**
  Tests whether there is a mark of this type in the given set.
  */
  isInSet(e) {
    for (let t = 0; t < e.length; t++)
      if (e[t].type == this)
        return e[t];
  }
  /**
  @internal
  */
  checkAttrs(e) {
    Id(this.attrs, e, "mark", this.name);
  }
  /**
  Queries whether a given mark type is
  [excluded](https://prosemirror.net/docs/ref/#model.MarkSpec.excludes) by this one.
  */
  excludes(e) {
    return this.excluded.indexOf(e) > -1;
  }
}
class $d {
  /**
  Construct a schema from a schema [specification](https://prosemirror.net/docs/ref/#model.SchemaSpec).
  */
  constructor(e) {
    this.linebreakReplacement = null, this.cached = /* @__PURE__ */ Object.create(null);
    let t = this.spec = {};
    for (let r in e)
      t[r] = e[r];
    t.nodes = pe.from(e.nodes), t.marks = pe.from(e.marks || {}), this.nodes = yl.compile(this.spec.nodes, this), this.marks = pr.compile(this.spec.marks, this);
    let i = /* @__PURE__ */ Object.create(null);
    for (let r in this.nodes) {
      if (r in this.marks)
        throw new RangeError(r + " can not be both a node and a mark");
      let s = this.nodes[r], o = s.spec.content || "", a = s.spec.marks;
      if (s.contentMatch = i[o] || (i[o] = jt.parse(o, this.nodes)), s.inlineContent = s.contentMatch.inlineContent, s.spec.linebreakReplacement) {
        if (this.linebreakReplacement)
          throw new RangeError("Multiple linebreak nodes defined");
        if (!s.isInline || !s.isLeaf)
          throw new RangeError("Linebreak replacement nodes must be inline leaf nodes");
        this.linebreakReplacement = s;
      }
      s.markSet = a == "_" ? null : a ? bl(this, a.split(" ")) : a == "" || !s.inlineContent ? [] : null;
    }
    for (let r in this.marks) {
      let s = this.marks[r], o = s.spec.excludes;
      s.excluded = o == null ? [s] : o == "" ? [] : bl(this, o.split(" "));
    }
    this.nodeFromJSON = (r) => wt.fromJSON(this, r), this.markFromJSON = (r) => J.fromJSON(this, r), this.topNodeType = this.nodes[this.spec.topNode || "doc"], this.cached.wrappings = /* @__PURE__ */ Object.create(null);
  }
  /**
  Create a node in this schema. The `type` may be a string or a
  `NodeType` instance. Attributes will be extended with defaults,
  `content` may be a `Fragment`, `null`, a `Node`, or an array of
  nodes.
  */
  node(e, t = null, i, r) {
    if (typeof e == "string")
      e = this.nodeType(e);
    else if (e instanceof yl) {
      if (e.schema != this)
        throw new RangeError("Node type from different schema used (" + e.name + ")");
    } else
      throw new RangeError("Invalid node type: " + e);
    return e.createChecked(t, i, r);
  }
  /**
  Create a text node in the schema. Empty text nodes are not
  allowed.
  */
  text(e, t) {
    let i = this.nodes.text;
    return new Gi(i, i.defaultAttrs, e, J.setFrom(t));
  }
  /**
  Create a mark with the given type and attributes.
  */
  mark(e, t) {
    return typeof e == "string" && (e = this.marks[e]), e.create(t);
  }
  /**
  @internal
  */
  nodeType(e) {
    let t = this.nodes[e];
    if (!t)
      throw new RangeError("Unknown node type: " + e);
    return t;
  }
}
function bl(n, e) {
  let t = [];
  for (let i = 0; i < e.length; i++) {
    let r = e[i], s = n.marks[r], o = s;
    if (s)
      t.push(s);
    else
      for (let a in n.marks) {
        let l = n.marks[a];
        (r == "_" || l.spec.group && l.spec.group.split(" ").indexOf(r) > -1) && t.push(o = l);
      }
    if (!o)
      throw new SyntaxError("Unknown mark type: '" + e[i] + "'");
  }
  return t;
}
function W2(n) {
  return n.tag != null;
}
function U2(n) {
  return n.style != null;
}
let Rn = class Vs {
  /**
  Create a parser that targets the given schema, using the given
  parsing rules.
  */
  constructor(e, t) {
    this.schema = e, this.rules = t, this.tags = [], this.styles = [];
    let i = this.matchedStyles = [];
    t.forEach((r) => {
      if (W2(r))
        this.tags.push(r);
      else if (U2(r)) {
        let s = /[^=]*/.exec(r.style)[0];
        i.indexOf(s) < 0 && i.push(s), this.styles.push(r);
      }
    }), this.normalizeLists = !this.tags.some((r) => {
      if (!/^(ul|ol)\b/.test(r.tag) || !r.node)
        return !1;
      let s = e.nodes[r.node];
      return s.contentMatch.matchType(s);
    });
  }
  /**
  Parse a document from the content of a DOM node.
  */
  parse(e, t = {}) {
    let i = new Cl(this, t, !1);
    return i.addAll(e, J.none, t.from, t.to), i.finish();
  }
  /**
  Parses the content of the given DOM node, like
  [`parse`](https://prosemirror.net/docs/ref/#model.DOMParser.parse), and takes the same set of
  options. But unlike that method, which produces a whole node,
  this one returns a slice that is open at the sides, meaning that
  the schema constraints aren't applied to the start of nodes to
  the left of the input and the end of nodes at the end.
  */
  parseSlice(e, t = {}) {
    let i = new Cl(this, t, !0);
    return i.addAll(e, J.none, t.from, t.to), N.maxOpen(i.finish());
  }
  /**
  @internal
  */
  matchTag(e, t, i) {
    for (let r = i ? this.tags.indexOf(i) + 1 : 0; r < this.tags.length; r++) {
      let s = this.tags[r];
      if (J2(e, s.tag) && (s.namespace === void 0 || e.namespaceURI == s.namespace) && (!s.context || t.matchesContext(s.context))) {
        if (s.getAttrs) {
          let o = s.getAttrs(e);
          if (o === !1)
            continue;
          s.attrs = o || void 0;
        }
        return s;
      }
    }
  }
  /**
  @internal
  */
  matchStyle(e, t, i, r) {
    for (let s = r ? this.styles.indexOf(r) + 1 : 0; s < this.styles.length; s++) {
      let o = this.styles[s], a = o.style;
      if (!(a.indexOf(e) != 0 || o.context && !i.matchesContext(o.context) || // Test that the style string either precisely matches the prop,
      // or has an '=' sign after the prop, followed by the given
      // value.
      a.length > e.length && (a.charCodeAt(e.length) != 61 || a.slice(e.length + 1) != t))) {
        if (o.getAttrs) {
          let l = o.getAttrs(t);
          if (l === !1)
            continue;
          o.attrs = l || void 0;
        }
        return o;
      }
    }
  }
  /**
  @internal
  */
  static schemaRules(e) {
    let t = [];
    function i(r) {
      let s = r.priority == null ? 50 : r.priority, o = 0;
      for (; o < t.length; o++) {
        let a = t[o];
        if ((a.priority == null ? 50 : a.priority) < s)
          break;
      }
      t.splice(o, 0, r);
    }
    for (let r in e.marks) {
      let s = e.marks[r].spec.parseDOM;
      s && s.forEach((o) => {
        i(o = kl(o)), o.mark || o.ignore || o.clearMark || (o.mark = r);
      });
    }
    for (let r in e.nodes) {
      let s = e.nodes[r].spec.parseDOM;
      s && s.forEach((o) => {
        i(o = kl(o)), o.node || o.ignore || o.mark || (o.node = r);
      });
    }
    return t;
  }
  /**
  Construct a DOM parser using the parsing rules listed in a
  schema's [node specs](https://prosemirror.net/docs/ref/#model.NodeSpec.parseDOM), reordered by
  [priority](https://prosemirror.net/docs/ref/#model.GenericParseRule.priority).
  */
  static fromSchema(e) {
    return e.cached.domParser || (e.cached.domParser = new Vs(e, Vs.schemaRules(e)));
  }
};
const Rd = {
  address: !0,
  article: !0,
  aside: !0,
  blockquote: !0,
  canvas: !0,
  dd: !0,
  div: !0,
  dl: !0,
  fieldset: !0,
  figcaption: !0,
  figure: !0,
  footer: !0,
  form: !0,
  h1: !0,
  h2: !0,
  h3: !0,
  h4: !0,
  h5: !0,
  h6: !0,
  header: !0,
  hgroup: !0,
  hr: !0,
  li: !0,
  noscript: !0,
  ol: !0,
  output: !0,
  p: !0,
  pre: !0,
  section: !0,
  table: !0,
  tfoot: !0,
  ul: !0
}, q2 = {
  head: !0,
  noscript: !0,
  object: !0,
  script: !0,
  style: !0,
  title: !0
}, Pd = { ol: !0, ul: !0 }, Un = 1, Hs = 2, Pn = 4;
function wl(n, e, t) {
  return e != null ? (e ? Un : 0) | (e === "full" ? Hs : 0) : n && n.whitespace == "pre" ? Un | Hs : t & ~Pn;
}
class xi {
  constructor(e, t, i, r, s, o) {
    this.type = e, this.attrs = t, this.marks = i, this.solid = r, this.options = o, this.content = [], this.activeMarks = J.none, this.match = s || (o & Pn ? null : e.contentMatch);
  }
  findWrapping(e) {
    if (!this.match) {
      if (!this.type)
        return [];
      let t = this.type.contentMatch.fillBefore(T.from(e));
      if (t)
        this.match = this.type.contentMatch.matchFragment(t);
      else {
        let i = this.type.contentMatch, r;
        return (r = i.findWrapping(e.type)) ? (this.match = i, r) : null;
      }
    }
    return this.match.findWrapping(e.type);
  }
  finish(e) {
    if (!(this.options & Un)) {
      let i = this.content[this.content.length - 1], r;
      if (i && i.isText && (r = /[ \t\r\n\u000c]+$/.exec(i.text))) {
        let s = i;
        i.text.length == r[0].length ? this.content.pop() : this.content[this.content.length - 1] = s.withText(s.text.slice(0, s.text.length - r[0].length));
      }
    }
    let t = T.from(this.content);
    return !e && this.match && (t = t.append(this.match.fillBefore(T.empty, !0))), this.type ? this.type.create(this.attrs, t, this.marks) : t;
  }
  inlineContext(e) {
    return this.type ? this.type.inlineContent : this.content.length ? this.content[0].isInline : e.parentNode && !Rd.hasOwnProperty(e.parentNode.nodeName.toLowerCase());
  }
}
class Cl {
  constructor(e, t, i) {
    this.parser = e, this.options = t, this.isOpen = i, this.open = 0, this.localPreserveWS = !1;
    let r = t.topNode, s, o = wl(null, t.preserveWhitespace, 0) | (i ? Pn : 0);
    r ? s = new xi(r.type, r.attrs, J.none, !0, t.topMatch || r.type.contentMatch, o) : i ? s = new xi(null, null, J.none, !0, null, o) : s = new xi(e.schema.topNodeType, null, J.none, !0, null, o), this.nodes = [s], this.find = t.findPositions, this.needsBlock = !1;
  }
  get top() {
    return this.nodes[this.open];
  }
  // Add a DOM node to the content. Text is inserted as text node,
  // otherwise, the node is passed to `addElement` or, if it has a
  // `style` attribute, `addElementWithStyles`.
  addDOM(e, t) {
    e.nodeType == 3 ? this.addTextNode(e, t) : e.nodeType == 1 && this.addElement(e, t);
  }
  addTextNode(e, t) {
    let i = e.nodeValue, r = this.top, s = r.options & Hs ? "full" : this.localPreserveWS || (r.options & Un) > 0, { schema: o } = this.parser;
    if (s === "full" || r.inlineContext(e) || /[^ \t\r\n\u000c]/.test(i)) {
      if (s)
        if (s === "full")
          i = i.replace(/\r\n?/g, "\n");
        else if (o.linebreakReplacement && /[\r\n]/.test(i) && this.top.findWrapping(o.linebreakReplacement.create())) {
          let a = i.split(/\r?\n|\r/);
          for (let l = 0; l < a.length; l++)
            l && this.insertNode(o.linebreakReplacement.create(), t, !0), a[l] && this.insertNode(o.text(a[l]), t, !/\S/.test(a[l]));
          i = "";
        } else
          i = i.replace(/\r?\n|\r/g, " ");
      else if (i = i.replace(/[ \t\r\n\u000c]+/g, " "), /^[ \t\r\n\u000c]/.test(i) && this.open == this.nodes.length - 1) {
        let a = r.content[r.content.length - 1], l = e.previousSibling;
        (!a || l && l.nodeName == "BR" || a.isText && /[ \t\r\n\u000c]$/.test(a.text)) && (i = i.slice(1));
      }
      i && this.insertNode(o.text(i), t, !/\S/.test(i)), this.findInText(e);
    } else
      this.findInside(e);
  }
  // Try to find a handler for the given tag and use that to parse. If
  // none is found, the element's content nodes are added directly.
  addElement(e, t, i) {
    let r = this.localPreserveWS, s = this.top;
    (e.tagName == "PRE" || /pre/.test(e.style && e.style.whiteSpace)) && (this.localPreserveWS = !0);
    let o = e.nodeName.toLowerCase(), a;
    Pd.hasOwnProperty(o) && this.parser.normalizeLists && K2(e);
    let l = this.options.ruleFromNode && this.options.ruleFromNode(e) || (a = this.parser.matchTag(e, this, i));
    e:
      if (l ? l.ignore : q2.hasOwnProperty(o))
        this.findInside(e), this.ignoreFallback(e, t);
      else if (!l || l.skip || l.closeParent) {
        l && l.closeParent ? this.open = Math.max(0, this.open - 1) : l && l.skip.nodeType && (e = l.skip);
        let c, u = this.needsBlock;
        if (Rd.hasOwnProperty(o))
          s.content.length && s.content[0].isInline && this.open && (this.open--, s = this.top), c = !0, s.type || (this.needsBlock = !0);
        else if (!e.firstChild) {
          this.leafFallback(e, t);
          break e;
        }
        let d = l && l.skip ? t : this.readStyles(e, t);
        d && this.addAll(e, d), c && this.sync(s), this.needsBlock = u;
      } else {
        let c = this.readStyles(e, t);
        c && this.addElementByRule(e, l, c, l.consuming === !1 ? a : void 0);
      }
    this.localPreserveWS = r;
  }
  // Called for leaf DOM nodes that would otherwise be ignored
  leafFallback(e, t) {
    e.nodeName == "BR" && this.top.type && this.top.type.inlineContent && this.addTextNode(e.ownerDocument.createTextNode("\n"), t);
  }
  // Called for ignored nodes
  ignoreFallback(e, t) {
    e.nodeName == "BR" && (!this.top.type || !this.top.type.inlineContent) && this.findPlace(this.parser.schema.text("-"), t, !0);
  }
  // Run any style parser associated with the node's styles. Either
  // return an updated array of marks, or null to indicate some of the
  // styles had a rule with `ignore` set.
  readStyles(e, t) {
    let i = e.style;
    if (i && i.length)
      for (let r = 0; r < this.parser.matchedStyles.length; r++) {
        let s = this.parser.matchedStyles[r], o = i.getPropertyValue(s);
        if (o)
          for (let a = void 0; ; ) {
            let l = this.parser.matchStyle(s, o, this, a);
            if (!l)
              break;
            if (l.ignore)
              return null;
            if (l.clearMark ? t = t.filter((c) => !l.clearMark(c)) : t = t.concat(this.parser.schema.marks[l.mark].create(l.attrs)), l.consuming === !1)
              a = l;
            else
              break;
          }
      }
    return t;
  }
  // Look up a handler for the given node. If none are found, return
  // false. Otherwise, apply it, use its return value to drive the way
  // the node's content is wrapped, and return true.
  addElementByRule(e, t, i, r) {
    let s, o;
    if (t.node)
      if (o = this.parser.schema.nodes[t.node], o.isLeaf)
        this.insertNode(o.create(t.attrs), i, e.nodeName == "BR") || this.leafFallback(e, i);
      else {
        let l = this.enter(o, t.attrs || null, i, t.preserveWhitespace);
        l && (s = !0, i = l);
      }
    else {
      let l = this.parser.schema.marks[t.mark];
      i = i.concat(l.create(t.attrs));
    }
    let a = this.top;
    if (o && o.isLeaf)
      this.findInside(e);
    else if (r)
      this.addElement(e, i, r);
    else if (t.getContent)
      this.findInside(e), t.getContent(e, this.parser.schema).forEach((l) => this.insertNode(l, i, !1));
    else {
      let l = e;
      typeof t.contentElement == "string" ? l = e.querySelector(t.contentElement) : typeof t.contentElement == "function" ? l = t.contentElement(e) : t.contentElement && (l = t.contentElement), this.findAround(e, l, !0), this.addAll(l, i), this.findAround(e, l, !1);
    }
    s && this.sync(a) && this.open--;
  }
  // Add all child nodes between `startIndex` and `endIndex` (or the
  // whole node, if not given). If `sync` is passed, use it to
  // synchronize after every block element.
  addAll(e, t, i, r) {
    let s = i || 0;
    for (let o = i ? e.childNodes[i] : e.firstChild, a = r == null ? null : e.childNodes[r]; o != a; o = o.nextSibling, ++s)
      this.findAtPoint(e, s), this.addDOM(o, t);
    this.findAtPoint(e, s);
  }
  // Try to find a way to fit the given node type into the current
  // context. May add intermediate wrappers and/or leave non-solid
  // nodes that we're in.
  findPlace(e, t, i) {
    let r, s;
    for (let o = this.open, a = 0; o >= 0; o--) {
      let l = this.nodes[o], c = l.findWrapping(e);
      if (c && (!r || r.length > c.length + a) && (r = c, s = l, !c.length))
        break;
      if (l.solid) {
        if (i)
          break;
        a += 2;
      }
    }
    if (!r)
      return null;
    this.sync(s);
    for (let o = 0; o < r.length; o++)
      t = this.enterInner(r[o], null, t, !1);
    return t;
  }
  // Try to insert the given node, adjusting the context when needed.
  insertNode(e, t, i) {
    if (e.isInline && this.needsBlock && !this.top.type) {
      let s = this.textblockFromContext();
      s && (t = this.enterInner(s, null, t));
    }
    let r = this.findPlace(e, t, i);
    if (r) {
      this.closeExtra();
      let s = this.top;
      s.match && (s.match = s.match.matchType(e.type));
      let o = J.none;
      for (let a of r.concat(e.marks))
        (s.type ? s.type.allowsMarkType(a.type) : xl(a.type, e.type)) && (o = a.addToSet(o));
      return s.content.push(e.mark(o)), !0;
    }
    return !1;
  }
  // Try to start a node of the given type, adjusting the context when
  // necessary.
  enter(e, t, i, r) {
    let s = this.findPlace(e.create(t), i, !1);
    return s && (s = this.enterInner(e, t, i, !0, r)), s;
  }
  // Open a node of the given type
  enterInner(e, t, i, r = !1, s) {
    this.closeExtra();
    let o = this.top;
    o.match = o.match && o.match.matchType(e);
    let a = wl(e, s, o.options);
    o.options & Pn && o.content.length == 0 && (a |= Pn);
    let l = J.none;
    return i = i.filter((c) => (o.type ? o.type.allowsMarkType(c.type) : xl(c.type, e)) ? (l = c.addToSet(l), !1) : !0), this.nodes.push(new xi(e, t, l, r, null, a)), this.open++, i;
  }
  // Make sure all nodes above this.open are finished and added to
  // their parents
  closeExtra(e = !1) {
    let t = this.nodes.length - 1;
    if (t > this.open) {
      for (; t > this.open; t--)
        this.nodes[t - 1].content.push(this.nodes[t].finish(e));
      this.nodes.length = this.open + 1;
    }
  }
  finish() {
    return this.open = 0, this.closeExtra(this.isOpen), this.nodes[0].finish(!!(this.isOpen || this.options.topOpen));
  }
  sync(e) {
    for (let t = this.open; t >= 0; t--) {
      if (this.nodes[t] == e)
        return this.open = t, !0;
      this.localPreserveWS && (this.nodes[t].options |= Un);
    }
    return !1;
  }
  get currentPos() {
    this.closeExtra();
    let e = 0;
    for (let t = this.open; t >= 0; t--) {
      let i = this.nodes[t].content;
      for (let r = i.length - 1; r >= 0; r--)
        e += i[r].nodeSize;
      t && e++;
    }
    return e;
  }
  findAtPoint(e, t) {
    if (this.find)
      for (let i = 0; i < this.find.length; i++)
        this.find[i].node == e && this.find[i].offset == t && (this.find[i].pos = this.currentPos);
  }
  findInside(e) {
    if (this.find)
      for (let t = 0; t < this.find.length; t++)
        this.find[t].pos == null && e.nodeType == 1 && e.contains(this.find[t].node) && (this.find[t].pos = this.currentPos);
  }
  findAround(e, t, i) {
    if (e != t && this.find)
      for (let r = 0; r < this.find.length; r++)
        this.find[r].pos == null && e.nodeType == 1 && e.contains(this.find[r].node) && t.compareDocumentPosition(this.find[r].node) & (i ? 2 : 4) && (this.find[r].pos = this.currentPos);
  }
  findInText(e) {
    if (this.find)
      for (let t = 0; t < this.find.length; t++)
        this.find[t].node == e && (this.find[t].pos = this.currentPos - (e.nodeValue.length - this.find[t].offset));
  }
  // Determines whether the given context string matches this context.
  matchesContext(e) {
    if (e.indexOf("|") > -1)
      return e.split(/\s*\|\s*/).some(this.matchesContext, this);
    let t = e.split("/"), i = this.options.context, r = !this.isOpen && (!i || i.parent.type == this.nodes[0].type), s = -(i ? i.depth + 1 : 0) + (r ? 0 : 1), o = (a, l) => {
      for (; a >= 0; a--) {
        let c = t[a];
        if (c == "") {
          if (a == t.length - 1 || a == 0)
            continue;
          for (; l >= s; l--)
            if (o(a - 1, l))
              return !0;
          return !1;
        } else {
          let u = l > 0 || l == 0 && r ? this.nodes[l].type : i && l >= s ? i.node(l - s).type : null;
          if (!u || u.name != c && !u.isInGroup(c))
            return !1;
          l--;
        }
      }
      return !0;
    };
    return o(t.length - 1, this.open);
  }
  textblockFromContext() {
    let e = this.options.context;
    if (e)
      for (let t = e.depth; t >= 0; t--) {
        let i = e.node(t).contentMatchAt(e.indexAfter(t)).defaultType;
        if (i && i.isTextblock && i.defaultAttrs)
          return i;
      }
    for (let t in this.parser.schema.nodes) {
      let i = this.parser.schema.nodes[t];
      if (i.isTextblock && i.defaultAttrs)
        return i;
    }
  }
}
function K2(n) {
  for (let e = n.firstChild, t = null; e; e = e.nextSibling) {
    let i = e.nodeType == 1 ? e.nodeName.toLowerCase() : null;
    i && Pd.hasOwnProperty(i) && t ? (t.appendChild(e), e = t) : i == "li" ? t = e : i && (t = null);
  }
}
function J2(n, e) {
  return (n.matches || n.msMatchesSelector || n.webkitMatchesSelector || n.mozMatchesSelector).call(n, e);
}
function kl(n) {
  let e = {};
  for (let t in n)
    e[t] = n[t];
  return e;
}
function xl(n, e) {
  let t = e.schema.nodes;
  for (let i in t) {
    let r = t[i];
    if (!r.allowsMarkType(n))
      continue;
    let s = [], o = (a) => {
      s.push(a);
      for (let l = 0; l < a.edgeCount; l++) {
        let { type: c, next: u } = a.edge(l);
        if (c == e || s.indexOf(u) < 0 && o(u))
          return !0;
      }
    };
    if (o(r.contentMatch))
      return !0;
  }
}
class Gt {
  /**
  Create a serializer. `nodes` should map node names to functions
  that take a node and return a description of the corresponding
  DOM. `marks` does the same for mark names, but also gets an
  argument that tells it whether the mark's content is block or
  inline content (for typical use, it'll always be inline). A mark
  serializer may be `null` to indicate that marks of that type
  should not be serialized.
  */
  constructor(e, t) {
    this.nodes = e, this.marks = t;
  }
  /**
  Serialize the content of this fragment to a DOM fragment. When
  not in the browser, the `document` option, containing a DOM
  document, should be passed so that the serializer can create
  nodes.
  */
  serializeFragment(e, t = {}, i) {
    i || (i = Yr(t).createDocumentFragment());
    let r = i, s = [];
    return e.forEach((o) => {
      if (s.length || o.marks.length) {
        let a = 0, l = 0;
        for (; a < s.length && l < o.marks.length; ) {
          let c = o.marks[l];
          if (!this.marks[c.type.name]) {
            l++;
            continue;
          }
          if (!c.eq(s[a][0]) || c.type.spec.spanning === !1)
            break;
          a++, l++;
        }
        for (; a < s.length; )
          r = s.pop()[1];
        for (; l < o.marks.length; ) {
          let c = o.marks[l++], u = this.serializeMark(c, o.isInline, t);
          u && (s.push([c, r]), r.appendChild(u.dom), r = u.contentDOM || u.dom);
        }
      }
      r.appendChild(this.serializeNodeInner(o, t));
    }), i;
  }
  /**
  @internal
  */
  serializeNodeInner(e, t) {
    let { dom: i, contentDOM: r } = $i(Yr(t), this.nodes[e.type.name](e), null, e.attrs);
    if (r) {
      if (e.isLeaf)
        throw new RangeError("Content hole not allowed in a leaf node spec");
      this.serializeFragment(e.content, t, r);
    }
    return i;
  }
  /**
  Serialize this node to a DOM node. This can be useful when you
  need to serialize a part of a document, as opposed to the whole
  document. To serialize a whole document, use
  [`serializeFragment`](https://prosemirror.net/docs/ref/#model.DOMSerializer.serializeFragment) on
  its [content](https://prosemirror.net/docs/ref/#model.Node.content).
  */
  serializeNode(e, t = {}) {
    let i = this.serializeNodeInner(e, t);
    for (let r = e.marks.length - 1; r >= 0; r--) {
      let s = this.serializeMark(e.marks[r], e.isInline, t);
      s && ((s.contentDOM || s.dom).appendChild(i), i = s.dom);
    }
    return i;
  }
  /**
  @internal
  */
  serializeMark(e, t, i = {}) {
    let r = this.marks[e.type.name];
    return r && $i(Yr(i), r(e, t), null, e.attrs);
  }
  static renderSpec(e, t, i = null, r) {
    return $i(e, t, i, r);
  }
  /**
  Build a serializer using the [`toDOM`](https://prosemirror.net/docs/ref/#model.NodeSpec.toDOM)
  properties in a schema's node and mark specs.
  */
  static fromSchema(e) {
    return e.cached.domSerializer || (e.cached.domSerializer = new Gt(this.nodesFromSchema(e), this.marksFromSchema(e)));
  }
  /**
  Gather the serializers in a schema's node specs into an object.
  This can be useful as a base to build a custom serializer from.
  */
  static nodesFromSchema(e) {
    let t = Sl(e.nodes);
    return t.text || (t.text = (i) => i.text), t;
  }
  /**
  Gather the serializers in a schema's mark specs into an object.
  */
  static marksFromSchema(e) {
    return Sl(e.marks);
  }
}
function Sl(n) {
  let e = {};
  for (let t in n) {
    let i = n[t].spec.toDOM;
    i && (e[t] = i);
  }
  return e;
}
function Yr(n) {
  return n.document || window.document;
}
const Tl = /* @__PURE__ */ new WeakMap();
function G2(n) {
  let e = Tl.get(n);
  return e === void 0 && Tl.set(n, e = X2(n)), e;
}
function X2(n) {
  let e = null;
  function t(i) {
    if (i && typeof i == "object")
      if (Array.isArray(i))
        if (typeof i[0] == "string")
          e || (e = []), e.push(i);
        else
          for (let r = 0; r < i.length; r++)
            t(i[r]);
      else
        for (let r in i)
          t(i[r]);
  }
  return t(n), e;
}
function $i(n, e, t, i) {
  if (typeof e == "string")
    return { dom: n.createTextNode(e) };
  if (e.nodeType != null)
    return { dom: e };
  if (e.dom && e.dom.nodeType != null)
    return e;
  let r = e[0], s;
  if (typeof r != "string")
    throw new RangeError("Invalid array passed to renderSpec");
  if (i && (s = G2(i)) && s.indexOf(e) > -1)
    throw new RangeError("Using an array from an attribute object as a DOM spec. This may be an attempted cross site scripting attack.");
  let o = r.indexOf(" ");
  o > 0 && (t = r.slice(0, o), r = r.slice(o + 1));
  let a, l = t ? n.createElementNS(t, r) : n.createElement(r), c = e[1], u = 1;
  if (c && typeof c == "object" && c.nodeType == null && !Array.isArray(c)) {
    u = 2;
    for (let d in c)
      if (c[d] != null) {
        let f = d.indexOf(" ");
        f > 0 ? l.setAttributeNS(d.slice(0, f), d.slice(f + 1), c[d]) : d == "style" && l.style ? l.style.cssText = c[d] : l.setAttribute(d, c[d]);
      }
  }
  for (let d = u; d < e.length; d++) {
    let f = e[d];
    if (f === 0) {
      if (d < e.length - 1 || d > u)
        throw new RangeError("Content hole must be the only child of its parent node");
      return { dom: l, contentDOM: l };
    } else {
      let { dom: p, contentDOM: m } = $i(n, f, t, i);
      if (l.appendChild(p), m) {
        if (a)
          throw new RangeError("Multiple content holes");
        a = m;
      }
    }
  }
  return { dom: l, contentDOM: a };
}
const Ld = 65535, zd = Math.pow(2, 16);
function Y2(n, e) {
  return n + e * zd;
}
function Ml(n) {
  return n & Ld;
}
function Z2(n) {
  return (n - (n & Ld)) / zd;
}
const Bd = 1, Fd = 2, Ri = 4, Vd = 8;
class js {
  /**
  @internal
  */
  constructor(e, t, i) {
    this.pos = e, this.delInfo = t, this.recover = i;
  }
  /**
  Tells you whether the position was deleted, that is, whether the
  step removed the token on the side queried (via the `assoc`)
  argument from the document.
  */
  get deleted() {
    return (this.delInfo & Vd) > 0;
  }
  /**
  Tells you whether the token before the mapped position was deleted.
  */
  get deletedBefore() {
    return (this.delInfo & (Bd | Ri)) > 0;
  }
  /**
  True when the token after the mapped position was deleted.
  */
  get deletedAfter() {
    return (this.delInfo & (Fd | Ri)) > 0;
  }
  /**
  Tells whether any of the steps mapped through deletes across the
  position (including both the token before and after the
  position).
  */
  get deletedAcross() {
    return (this.delInfo & Ri) > 0;
  }
}
class Le {
  /**
  Create a position map. The modifications to the document are
  represented as an array of numbers, in which each group of three
  represents a modified chunk as `[start, oldSize, newSize]`.
  */
  constructor(e, t = !1) {
    if (this.ranges = e, this.inverted = t, !e.length && Le.empty)
      return Le.empty;
  }
  /**
  @internal
  */
  recover(e) {
    let t = 0, i = Ml(e);
    if (!this.inverted)
      for (let r = 0; r < i; r++)
        t += this.ranges[r * 3 + 2] - this.ranges[r * 3 + 1];
    return this.ranges[i * 3] + t + Z2(e);
  }
  mapResult(e, t = 1) {
    return this._map(e, t, !1);
  }
  map(e, t = 1) {
    return this._map(e, t, !0);
  }
  /**
  @internal
  */
  _map(e, t, i) {
    let r = 0, s = this.inverted ? 2 : 1, o = this.inverted ? 1 : 2;
    for (let a = 0; a < this.ranges.length; a += 3) {
      let l = this.ranges[a] - (this.inverted ? r : 0);
      if (l > e)
        break;
      let c = this.ranges[a + s], u = this.ranges[a + o], d = l + c;
      if (e <= d) {
        let f = c ? e == l ? -1 : e == d ? 1 : t : t, p = l + r + (f < 0 ? 0 : u);
        if (i)
          return p;
        let m = e == (t < 0 ? l : d) ? null : Y2(a / 3, e - l), v = e == l ? Fd : e == d ? Bd : Ri;
        return (t < 0 ? e != l : e != d) && (v |= Vd), new js(p, v, m);
      }
      r += u - c;
    }
    return i ? e + r : new js(e + r, 0, null);
  }
  /**
  @internal
  */
  touches(e, t) {
    let i = 0, r = Ml(t), s = this.inverted ? 2 : 1, o = this.inverted ? 1 : 2;
    for (let a = 0; a < this.ranges.length; a += 3) {
      let l = this.ranges[a] - (this.inverted ? i : 0);
      if (l > e)
        break;
      let c = this.ranges[a + s], u = l + c;
      if (e <= u && a == r * 3)
        return !0;
      i += this.ranges[a + o] - c;
    }
    return !1;
  }
  /**
  Calls the given function on each of the changed ranges included in
  this map.
  */
  forEach(e) {
    let t = this.inverted ? 2 : 1, i = this.inverted ? 1 : 2;
    for (let r = 0, s = 0; r < this.ranges.length; r += 3) {
      let o = this.ranges[r], a = o - (this.inverted ? s : 0), l = o + (this.inverted ? 0 : s), c = this.ranges[r + t], u = this.ranges[r + i];
      e(a, a + c, l, l + u), s += u - c;
    }
  }
  /**
  Create an inverted version of this map. The result can be used to
  map positions in the post-step document to the pre-step document.
  */
  invert() {
    return new Le(this.ranges, !this.inverted);
  }
  /**
  @internal
  */
  toString() {
    return (this.inverted ? "-" : "") + JSON.stringify(this.ranges);
  }
  /**
  Create a map that moves all positions by offset `n` (which may be
  negative). This can be useful when applying steps meant for a
  sub-document to a larger document, or vice-versa.
  */
  static offset(e) {
    return e == 0 ? Le.empty : new Le(e < 0 ? [0, -e, 0] : [0, 0, e]);
  }
}
Le.empty = new Le([]);
class qn {
  /**
  Create a new mapping with the given position maps.
  */
  constructor(e, t, i = 0, r = e ? e.length : 0) {
    this.mirror = t, this.from = i, this.to = r, this._maps = e || [], this.ownData = !(e || t);
  }
  /**
  The step maps in this mapping.
  */
  get maps() {
    return this._maps;
  }
  /**
  Create a mapping that maps only through a part of this one.
  */
  slice(e = 0, t = this.maps.length) {
    return new qn(this._maps, this.mirror, e, t);
  }
  /**
  Add a step map to the end of this mapping. If `mirrors` is
  given, it should be the index of the step map that is the mirror
  image of this one.
  */
  appendMap(e, t) {
    this.ownData || (this._maps = this._maps.slice(), this.mirror = this.mirror && this.mirror.slice(), this.ownData = !0), this.to = this._maps.push(e), t != null && this.setMirror(this._maps.length - 1, t);
  }
  /**
  Add all the step maps in a given mapping to this one (preserving
  mirroring information).
  */
  appendMapping(e) {
    for (let t = 0, i = this._maps.length; t < e._maps.length; t++) {
      let r = e.getMirror(t);
      this.appendMap(e._maps[t], r != null && r < t ? i + r : void 0);
    }
  }
  /**
  Finds the offset of the step map that mirrors the map at the
  given offset, in this mapping (as per the second argument to
  `appendMap`).
  */
  getMirror(e) {
    if (this.mirror) {
      for (let t = 0; t < this.mirror.length; t++)
        if (this.mirror[t] == e)
          return this.mirror[t + (t % 2 ? -1 : 1)];
    }
  }
  /**
  @internal
  */
  setMirror(e, t) {
    this.mirror || (this.mirror = []), this.mirror.push(e, t);
  }
  /**
  Append the inverse of the given mapping to this one.
  */
  appendMappingInverted(e) {
    for (let t = e.maps.length - 1, i = this._maps.length + e._maps.length; t >= 0; t--) {
      let r = e.getMirror(t);
      this.appendMap(e._maps[t].invert(), r != null && r > t ? i - r - 1 : void 0);
    }
  }
  /**
  Create an inverted version of this mapping.
  */
  invert() {
    let e = new qn();
    return e.appendMappingInverted(this), e;
  }
  /**
  Map a position through this mapping.
  */
  map(e, t = 1) {
    if (this.mirror)
      return this._map(e, t, !0);
    for (let i = this.from; i < this.to; i++)
      e = this._maps[i].map(e, t);
    return e;
  }
  /**
  Map a position through this mapping, returning a mapping
  result.
  */
  mapResult(e, t = 1) {
    return this._map(e, t, !1);
  }
  /**
  @internal
  */
  _map(e, t, i) {
    let r = 0;
    for (let s = this.from; s < this.to; s++) {
      let o = this._maps[s], a = o.mapResult(e, t);
      if (a.recover != null) {
        let l = this.getMirror(s);
        if (l != null && l > s && l < this.to) {
          s = l, e = this._maps[l].recover(a.recover);
          continue;
        }
      }
      r |= a.delInfo, e = a.pos;
    }
    return i ? e : new js(e, r, null);
  }
}
const Zr = /* @__PURE__ */ Object.create(null);
class Se {
  /**
  Get the step map that represents the changes made by this step,
  and which can be used to transform between positions in the old
  and the new document.
  */
  getMap() {
    return Le.empty;
  }
  /**
  Try to merge this step with another one, to be applied directly
  after it. Returns the merged step when possible, null if the
  steps can't be merged.
  */
  merge(e) {
    return null;
  }
  /**
  Deserialize a step from its JSON representation. Will call
  through to the step class' own implementation of this method.
  */
  static fromJSON(e, t) {
    if (!t || !t.stepType)
      throw new RangeError("Invalid input for Step.fromJSON");
    let i = Zr[t.stepType];
    if (!i)
      throw new RangeError("No step type ".concat(t.stepType, " defined"));
    return i.fromJSON(e, t);
  }
  /**
  To be able to serialize steps to JSON, each step needs a string
  ID to attach to its JSON representation. Use this method to
  register an ID for your step classes. Try to pick something
  that's unlikely to clash with steps from other modules.
  */
  static jsonID(e, t) {
    if (e in Zr)
      throw new RangeError("Duplicate use of step JSON ID " + e);
    return Zr[e] = t, t.prototype.jsonID = e, t;
  }
}
class ie {
  /**
  @internal
  */
  constructor(e, t) {
    this.doc = e, this.failed = t;
  }
  /**
  Create a successful step result.
  */
  static ok(e) {
    return new ie(e, null);
  }
  /**
  Create a failed step result.
  */
  static fail(e) {
    return new ie(null, e);
  }
  /**
  Call [`Node.replace`](https://prosemirror.net/docs/ref/#model.Node.replace) with the given
  arguments. Create a successful result if it succeeds, and a
  failed one if it throws a `ReplaceError`.
  */
  static fromReplace(e, t, i, r) {
    try {
      return ie.ok(e.replace(t, i, r));
    } catch (s) {
      if (s instanceof qi)
        return ie.fail(s.message);
      throw s;
    }
  }
}
function $o(n, e, t) {
  let i = [];
  for (let r = 0; r < n.childCount; r++) {
    let s = n.child(r);
    s.content.size && (s = s.copy($o(s.content, e, s))), s.isInline && (s = e(s, t, r)), i.push(s);
  }
  return T.fromArray(i);
}
class vt extends Se {
  /**
  Create a mark step.
  */
  constructor(e, t, i) {
    super(), this.from = e, this.to = t, this.mark = i;
  }
  apply(e) {
    let t = e.slice(this.from, this.to), i = e.resolve(this.from), r = i.node(i.sharedDepth(this.to)), s = new N($o(t.content, (o, a) => !o.isAtom || !a.type.allowsMarkType(this.mark.type) ? o : o.mark(this.mark.addToSet(o.marks)), r), t.openStart, t.openEnd);
    return ie.fromReplace(e, this.from, this.to, s);
  }
  invert() {
    return new Ge(this.from, this.to, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.from, 1), i = e.mapResult(this.to, -1);
    return t.deleted && i.deleted || t.pos >= i.pos ? null : new vt(t.pos, i.pos, this.mark);
  }
  merge(e) {
    return e instanceof vt && e.mark.eq(this.mark) && this.from <= e.to && this.to >= e.from ? new vt(Math.min(this.from, e.from), Math.max(this.to, e.to), this.mark) : null;
  }
  toJSON() {
    return {
      stepType: "addMark",
      mark: this.mark.toJSON(),
      from: this.from,
      to: this.to
    };
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.from != "number" || typeof t.to != "number")
      throw new RangeError("Invalid input for AddMarkStep.fromJSON");
    return new vt(t.from, t.to, e.markFromJSON(t.mark));
  }
}
Se.jsonID("addMark", vt);
class Ge extends Se {
  /**
  Create a mark-removing step.
  */
  constructor(e, t, i) {
    super(), this.from = e, this.to = t, this.mark = i;
  }
  apply(e) {
    let t = e.slice(this.from, this.to), i = new N($o(t.content, (r) => r.mark(this.mark.removeFromSet(r.marks)), e), t.openStart, t.openEnd);
    return ie.fromReplace(e, this.from, this.to, i);
  }
  invert() {
    return new vt(this.from, this.to, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.from, 1), i = e.mapResult(this.to, -1);
    return t.deleted && i.deleted || t.pos >= i.pos ? null : new Ge(t.pos, i.pos, this.mark);
  }
  merge(e) {
    return e instanceof Ge && e.mark.eq(this.mark) && this.from <= e.to && this.to >= e.from ? new Ge(Math.min(this.from, e.from), Math.max(this.to, e.to), this.mark) : null;
  }
  toJSON() {
    return {
      stepType: "removeMark",
      mark: this.mark.toJSON(),
      from: this.from,
      to: this.to
    };
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.from != "number" || typeof t.to != "number")
      throw new RangeError("Invalid input for RemoveMarkStep.fromJSON");
    return new Ge(t.from, t.to, e.markFromJSON(t.mark));
  }
}
Se.jsonID("removeMark", Ge);
class yt extends Se {
  /**
  Create a node mark step.
  */
  constructor(e, t) {
    super(), this.pos = e, this.mark = t;
  }
  apply(e) {
    let t = e.nodeAt(this.pos);
    if (!t)
      return ie.fail("No node at mark step's position");
    let i = t.type.create(t.attrs, null, this.mark.addToSet(t.marks));
    return ie.fromReplace(e, this.pos, this.pos + 1, new N(T.from(i), 0, t.isLeaf ? 0 : 1));
  }
  invert(e) {
    let t = e.nodeAt(this.pos);
    if (t) {
      let i = this.mark.addToSet(t.marks);
      if (i.length == t.marks.length) {
        for (let r = 0; r < t.marks.length; r++)
          if (!t.marks[r].isInSet(i))
            return new yt(this.pos, t.marks[r]);
        return new yt(this.pos, this.mark);
      }
    }
    return new Wt(this.pos, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.pos, 1);
    return t.deletedAfter ? null : new yt(t.pos, this.mark);
  }
  toJSON() {
    return { stepType: "addNodeMark", pos: this.pos, mark: this.mark.toJSON() };
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.pos != "number")
      throw new RangeError("Invalid input for AddNodeMarkStep.fromJSON");
    return new yt(t.pos, e.markFromJSON(t.mark));
  }
}
Se.jsonID("addNodeMark", yt);
class Wt extends Se {
  /**
  Create a mark-removing step.
  */
  constructor(e, t) {
    super(), this.pos = e, this.mark = t;
  }
  apply(e) {
    let t = e.nodeAt(this.pos);
    if (!t)
      return ie.fail("No node at mark step's position");
    let i = t.type.create(t.attrs, null, this.mark.removeFromSet(t.marks));
    return ie.fromReplace(e, this.pos, this.pos + 1, new N(T.from(i), 0, t.isLeaf ? 0 : 1));
  }
  invert(e) {
    let t = e.nodeAt(this.pos);
    return !t || !this.mark.isInSet(t.marks) ? this : new yt(this.pos, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.pos, 1);
    return t.deletedAfter ? null : new Wt(t.pos, this.mark);
  }
  toJSON() {
    return { stepType: "removeNodeMark", pos: this.pos, mark: this.mark.toJSON() };
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.pos != "number")
      throw new RangeError("Invalid input for RemoveNodeMarkStep.fromJSON");
    return new Wt(t.pos, e.markFromJSON(t.mark));
  }
}
Se.jsonID("removeNodeMark", Wt);
class ce extends Se {
  /**
  The given `slice` should fit the 'gap' between `from` and
  `to`—the depths must line up, and the surrounding nodes must be
  able to be joined with the open sides of the slice. When
  `structure` is true, the step will fail if the content between
  from and to is not just a sequence of closing and then opening
  tokens (this is to guard against rebased replace steps
  overwriting something they weren't supposed to).
  */
  constructor(e, t, i, r = !1) {
    super(), this.from = e, this.to = t, this.slice = i, this.structure = r;
  }
  apply(e) {
    return this.structure && Ws(e, this.from, this.to) ? ie.fail("Structure replace would overwrite content") : ie.fromReplace(e, this.from, this.to, this.slice);
  }
  getMap() {
    return new Le([this.from, this.to - this.from, this.slice.size]);
  }
  invert(e) {
    return new ce(this.from, this.from + this.slice.size, e.slice(this.from, this.to));
  }
  map(e) {
    let t = e.mapResult(this.from, 1), i = e.mapResult(this.to, -1);
    return t.deletedAcross && i.deletedAcross ? null : new ce(t.pos, Math.max(t.pos, i.pos), this.slice, this.structure);
  }
  merge(e) {
    if (!(e instanceof ce) || e.structure || this.structure)
      return null;
    if (this.from + this.slice.size == e.from && !this.slice.openEnd && !e.slice.openStart) {
      let t = this.slice.size + e.slice.size == 0 ? N.empty : new N(this.slice.content.append(e.slice.content), this.slice.openStart, e.slice.openEnd);
      return new ce(this.from, this.to + (e.to - e.from), t, this.structure);
    } else if (e.to == this.from && !this.slice.openStart && !e.slice.openEnd) {
      let t = this.slice.size + e.slice.size == 0 ? N.empty : new N(e.slice.content.append(this.slice.content), e.slice.openStart, this.slice.openEnd);
      return new ce(e.from, this.to, t, this.structure);
    } else
      return null;
  }
  toJSON() {
    let e = { stepType: "replace", from: this.from, to: this.to };
    return this.slice.size && (e.slice = this.slice.toJSON()), this.structure && (e.structure = !0), e;
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.from != "number" || typeof t.to != "number")
      throw new RangeError("Invalid input for ReplaceStep.fromJSON");
    return new ce(t.from, t.to, N.fromJSON(e, t.slice), !!t.structure);
  }
}
Se.jsonID("replace", ce);
class de extends Se {
  /**
  Create a replace-around step with the given range and gap.
  `insert` should be the point in the slice into which the content
  of the gap should be moved. `structure` has the same meaning as
  it has in the [`ReplaceStep`](https://prosemirror.net/docs/ref/#transform.ReplaceStep) class.
  */
  constructor(e, t, i, r, s, o, a = !1) {
    super(), this.from = e, this.to = t, this.gapFrom = i, this.gapTo = r, this.slice = s, this.insert = o, this.structure = a;
  }
  apply(e) {
    if (this.structure && (Ws(e, this.from, this.gapFrom) || Ws(e, this.gapTo, this.to)))
      return ie.fail("Structure gap-replace would overwrite content");
    let t = e.slice(this.gapFrom, this.gapTo);
    if (t.openStart || t.openEnd)
      return ie.fail("Gap is not a flat range");
    let i = this.slice.insertAt(this.insert, t.content);
    return i ? ie.fromReplace(e, this.from, this.to, i) : ie.fail("Content does not fit in gap");
  }
  getMap() {
    return new Le([
      this.from,
      this.gapFrom - this.from,
      this.insert,
      this.gapTo,
      this.to - this.gapTo,
      this.slice.size - this.insert
    ]);
  }
  invert(e) {
    let t = this.gapTo - this.gapFrom;
    return new de(this.from, this.from + this.slice.size + t, this.from + this.insert, this.from + this.insert + t, e.slice(this.from, this.to).removeBetween(this.gapFrom - this.from, this.gapTo - this.from), this.gapFrom - this.from, this.structure);
  }
  map(e) {
    let t = e.mapResult(this.from, 1), i = e.mapResult(this.to, -1), r = this.from == this.gapFrom ? t.pos : e.map(this.gapFrom, -1), s = this.to == this.gapTo ? i.pos : e.map(this.gapTo, 1);
    return t.deletedAcross && i.deletedAcross || r < t.pos || s > i.pos ? null : new de(t.pos, i.pos, r, s, this.slice, this.insert, this.structure);
  }
  toJSON() {
    let e = {
      stepType: "replaceAround",
      from: this.from,
      to: this.to,
      gapFrom: this.gapFrom,
      gapTo: this.gapTo,
      insert: this.insert
    };
    return this.slice.size && (e.slice = this.slice.toJSON()), this.structure && (e.structure = !0), e;
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.from != "number" || typeof t.to != "number" || typeof t.gapFrom != "number" || typeof t.gapTo != "number" || typeof t.insert != "number")
      throw new RangeError("Invalid input for ReplaceAroundStep.fromJSON");
    return new de(t.from, t.to, t.gapFrom, t.gapTo, N.fromJSON(e, t.slice), t.insert, !!t.structure);
  }
}
Se.jsonID("replaceAround", de);
function Ws(n, e, t) {
  let i = n.resolve(e), r = t - e, s = i.depth;
  for (; r > 0 && s > 0 && i.indexAfter(s) == i.node(s).childCount; )
    s--, r--;
  if (r > 0) {
    let o = i.node(s).maybeChild(i.indexAfter(s));
    for (; r > 0; ) {
      if (!o || o.isLeaf)
        return !0;
      o = o.firstChild, r--;
    }
  }
  return !1;
}
function Q2(n, e, t, i) {
  let r = [], s = [], o, a;
  n.doc.nodesBetween(e, t, (l, c, u) => {
    if (!l.isInline)
      return;
    let d = l.marks;
    if (!i.isInSet(d) && u.type.allowsMarkType(i.type)) {
      let f = Math.max(c, e), p = Math.min(c + l.nodeSize, t), m = i.addToSet(d);
      for (let v = 0; v < d.length; v++)
        d[v].isInSet(m) || (o && o.to == f && o.mark.eq(d[v]) ? o.to = p : r.push(o = new Ge(f, p, d[v])));
      a && a.to == f ? a.to = p : s.push(a = new vt(f, p, i));
    }
  }), r.forEach((l) => n.step(l)), s.forEach((l) => n.step(l));
}
function e6(n, e, t, i) {
  let r = [], s = 0;
  n.doc.nodesBetween(e, t, (o, a) => {
    if (!o.isInline)
      return;
    s++;
    let l = null;
    if (i instanceof pr) {
      let c = o.marks, u;
      for (; u = i.isInSet(c); )
        (l || (l = [])).push(u), c = u.removeFromSet(c);
    } else
      i ? i.isInSet(o.marks) && (l = [i]) : l = o.marks;
    if (l && l.length) {
      let c = Math.min(a + o.nodeSize, t);
      for (let u = 0; u < l.length; u++) {
        let d = l[u], f;
        for (let p = 0; p < r.length; p++) {
          let m = r[p];
          m.step == s - 1 && d.eq(r[p].style) && (f = m);
        }
        f ? (f.to = c, f.step = s) : r.push({ style: d, from: Math.max(a, e), to: c, step: s });
      }
    }
  }), r.forEach((o) => n.step(new Ge(o.from, o.to, o.style)));
}
function Ro(n, e, t, i = t.contentMatch, r = !0) {
  let s = n.doc.nodeAt(e), o = [], a = e + 1;
  for (let l = 0; l < s.childCount; l++) {
    let c = s.child(l), u = a + c.nodeSize, d = i.matchType(c.type);
    if (!d)
      o.push(new ce(a, u, N.empty));
    else {
      i = d;
      for (let f = 0; f < c.marks.length; f++)
        t.allowsMarkType(c.marks[f].type) || n.step(new Ge(a, u, c.marks[f]));
      if (r && c.isText && t.whitespace != "pre") {
        let f, p = /\r?\n|\r/g, m;
        for (; f = p.exec(c.text); )
          m || (m = new N(T.from(t.schema.text(" ", t.allowedMarks(c.marks))), 0, 0)), o.push(new ce(a + f.index, a + f.index + f[0].length, m));
      }
    }
    a = u;
  }
  if (!i.validEnd) {
    let l = i.fillBefore(T.empty, !0);
    n.replace(a, a, new N(l, 0, 0));
  }
  for (let l = o.length - 1; l >= 0; l--)
    n.step(o[l]);
}
function t6(n, e, t) {
  return (e == 0 || n.canReplace(e, n.childCount)) && (t == n.childCount || n.canReplace(0, t));
}
function Mn(n) {
  let t = n.parent.content.cutByIndex(n.startIndex, n.endIndex);
  for (let i = n.depth, r = 0, s = 0; ; --i) {
    let o = n.$from.node(i), a = n.$from.index(i) + r, l = n.$to.indexAfter(i) - s;
    if (i < n.depth && o.canReplace(a, l, t))
      return i;
    if (i == 0 || o.type.spec.isolating || !t6(o, a, l))
      break;
    a && (r = 1), l < o.childCount && (s = 1);
  }
  return null;
}
function n6(n, e, t) {
  let { $from: i, $to: r, depth: s } = e, o = i.before(s + 1), a = r.after(s + 1), l = o, c = a, u = T.empty, d = 0;
  for (let m = s, v = !1; m > t; m--)
    v || i.index(m) > 0 ? (v = !0, u = T.from(i.node(m).copy(u)), d++) : l--;
  let f = T.empty, p = 0;
  for (let m = s, v = !1; m > t; m--)
    v || r.after(m + 1) < r.end(m) ? (v = !0, f = T.from(r.node(m).copy(f)), p++) : c++;
  n.step(new de(l, c, o, a, new N(u.append(f), d, p), u.size - d, !0));
}
function Hd(n, e, t = null, i = n) {
  let r = i6(n, e), s = r && r6(i, e);
  return s ? r.map(_l).concat({ type: e, attrs: t }).concat(s.map(_l)) : null;
}
function _l(n) {
  return { type: n, attrs: null };
}
function i6(n, e) {
  let { parent: t, startIndex: i, endIndex: r } = n, s = t.contentMatchAt(i).findWrapping(e);
  if (!s)
    return null;
  let o = s.length ? s[0] : e;
  return t.canReplaceWith(i, r, o) ? s : null;
}
function r6(n, e) {
  let { parent: t, startIndex: i, endIndex: r } = n, s = t.child(i), o = e.contentMatch.findWrapping(s.type);
  if (!o)
    return null;
  let l = (o.length ? o[o.length - 1] : e).contentMatch;
  for (let c = i; l && c < r; c++)
    l = l.matchType(t.child(c).type);
  return !l || !l.validEnd ? null : o;
}
function s6(n, e, t) {
  let i = T.empty;
  for (let o = t.length - 1; o >= 0; o--) {
    if (i.size) {
      let a = t[o].type.contentMatch.matchFragment(i);
      if (!a || !a.validEnd)
        throw new RangeError("Wrapper type given to Transform.wrap does not form valid content of its parent wrapper");
    }
    i = T.from(t[o].type.create(t[o].attrs, i));
  }
  let r = e.start, s = e.end;
  n.step(new de(r, s, r, s, new N(i, 0, 0), t.length, !0));
}
function o6(n, e, t, i, r) {
  if (!i.isTextblock)
    throw new RangeError("Type given to setBlockType should be a textblock");
  let s = n.steps.length;
  n.doc.nodesBetween(e, t, (o, a) => {
    let l = typeof r == "function" ? r(o) : r;
    if (o.isTextblock && !o.hasMarkup(i, l) && a6(n.doc, n.mapping.slice(s).map(a), i)) {
      let c = null;
      if (i.schema.linebreakReplacement) {
        let p = i.whitespace == "pre", m = !!i.contentMatch.matchType(i.schema.linebreakReplacement);
        p && !m ? c = !1 : !p && m && (c = !0);
      }
      c === !1 && Wd(n, o, a, s), Ro(n, n.mapping.slice(s).map(a, 1), i, void 0, c === null);
      let u = n.mapping.slice(s), d = u.map(a, 1), f = u.map(a + o.nodeSize, 1);
      return n.step(new de(d, f, d + 1, f - 1, new N(T.from(i.create(l, null, o.marks)), 0, 0), 1, !0)), c === !0 && jd(n, o, a, s), !1;
    }
  });
}
function jd(n, e, t, i) {
  e.forEach((r, s) => {
    if (r.isText) {
      let o, a = /\r?\n|\r/g;
      for (; o = a.exec(r.text); ) {
        let l = n.mapping.slice(i).map(t + 1 + s + o.index);
        n.replaceWith(l, l + 1, e.type.schema.linebreakReplacement.create());
      }
    }
  });
}
function Wd(n, e, t, i) {
  e.forEach((r, s) => {
    if (r.type == r.type.schema.linebreakReplacement) {
      let o = n.mapping.slice(i).map(t + 1 + s);
      n.replaceWith(o, o + 1, e.type.schema.text("\n"));
    }
  });
}
function a6(n, e, t) {
  let i = n.resolve(e), r = i.index();
  return i.parent.canReplaceWith(r, r + 1, t);
}
function l6(n, e, t, i, r) {
  let s = n.doc.nodeAt(e);
  if (!s)
    throw new RangeError("No node at given position");
  t || (t = s.type);
  let o = t.create(i, null, r || s.marks);
  if (s.isLeaf)
    return n.replaceWith(e, e + s.nodeSize, o);
  if (!t.validContent(s.content))
    throw new RangeError("Invalid content for node type " + t.name);
  n.step(new de(e, e + s.nodeSize, e + 1, e + s.nodeSize - 1, new N(T.from(o), 0, 0), 1, !0));
}
function hn(n, e, t = 1, i) {
  let r = n.resolve(e), s = r.depth - t, o = i && i[i.length - 1] || r.parent;
  if (s < 0 || r.parent.type.spec.isolating || !r.parent.canReplace(r.index(), r.parent.childCount) || !o.type.validContent(r.parent.content.cutByIndex(r.index(), r.parent.childCount)))
    return !1;
  for (let c = r.depth - 1, u = t - 2; c > s; c--, u--) {
    let d = r.node(c), f = r.index(c);
    if (d.type.spec.isolating)
      return !1;
    let p = d.content.cutByIndex(f, d.childCount), m = i && i[u + 1];
    m && (p = p.replaceChild(0, m.type.create(m.attrs)));
    let v = i && i[u] || d;
    if (!d.canReplace(f + 1, d.childCount) || !v.type.validContent(p))
      return !1;
  }
  let a = r.indexAfter(s), l = i && i[0];
  return r.node(s).canReplaceWith(a, a, l ? l.type : r.node(s + 1).type);
}
function c6(n, e, t = 1, i) {
  let r = n.doc.resolve(e), s = T.empty, o = T.empty;
  for (let a = r.depth, l = r.depth - t, c = t - 1; a > l; a--, c--) {
    s = T.from(r.node(a).copy(s));
    let u = i && i[c];
    o = T.from(u ? u.type.create(u.attrs, o) : r.node(a).copy(o));
  }
  n.step(new ce(e, e, new N(s.append(o), t, t), !0));
}
function Xt(n, e) {
  let t = n.resolve(e), i = t.index();
  return Ud(t.nodeBefore, t.nodeAfter) && t.parent.canReplace(i, i + 1);
}
function u6(n, e) {
  e.content.size || n.type.compatibleContent(e.type);
  let t = n.contentMatchAt(n.childCount), { linebreakReplacement: i } = n.type.schema;
  for (let r = 0; r < e.childCount; r++) {
    let s = e.child(r), o = s.type == i ? n.type.schema.nodes.text : s.type;
    if (t = t.matchType(o), !t || !n.type.allowsMarks(s.marks))
      return !1;
  }
  return t.validEnd;
}
function Ud(n, e) {
  return !!(n && e && !n.isLeaf && u6(n, e));
}
function mr(n, e, t = -1) {
  let i = n.resolve(e);
  for (let r = i.depth; ; r--) {
    let s, o, a = i.index(r);
    if (r == i.depth ? (s = i.nodeBefore, o = i.nodeAfter) : t > 0 ? (s = i.node(r + 1), a++, o = i.node(r).maybeChild(a)) : (s = i.node(r).maybeChild(a - 1), o = i.node(r + 1)), s && !s.isTextblock && Ud(s, o) && i.node(r).canReplace(a, a + 1))
      return e;
    if (r == 0)
      break;
    e = t < 0 ? i.before(r) : i.after(r);
  }
}
function d6(n, e, t) {
  let i = null, { linebreakReplacement: r } = n.doc.type.schema, s = n.doc.resolve(e - t), o = s.node().type;
  if (r && o.inlineContent) {
    let u = o.whitespace == "pre", d = !!o.contentMatch.matchType(r);
    u && !d ? i = !1 : !u && d && (i = !0);
  }
  let a = n.steps.length;
  if (i === !1) {
    let u = n.doc.resolve(e + t);
    Wd(n, u.node(), u.before(), a);
  }
  o.inlineContent && Ro(n, e + t - 1, o, s.node().contentMatchAt(s.index()), i == null);
  let l = n.mapping.slice(a), c = l.map(e - t);
  if (n.step(new ce(c, l.map(e + t, -1), N.empty, !0)), i === !0) {
    let u = n.doc.resolve(c);
    jd(n, u.node(), u.before(), n.steps.length);
  }
  return n;
}
function h6(n, e, t) {
  let i = n.resolve(e);
  if (i.parent.canReplaceWith(i.index(), i.index(), t))
    return e;
  if (i.parentOffset == 0)
    for (let r = i.depth - 1; r >= 0; r--) {
      let s = i.index(r);
      if (i.node(r).canReplaceWith(s, s, t))
        return i.before(r + 1);
      if (s > 0)
        return null;
    }
  if (i.parentOffset == i.parent.content.size)
    for (let r = i.depth - 1; r >= 0; r--) {
      let s = i.indexAfter(r);
      if (i.node(r).canReplaceWith(s, s, t))
        return i.after(r + 1);
      if (s < i.node(r).childCount)
        return null;
    }
  return null;
}
function qd(n, e, t) {
  let i = n.resolve(e);
  if (!t.content.size)
    return e;
  let r = t.content;
  for (let s = 0; s < t.openStart; s++)
    r = r.firstChild.content;
  for (let s = 1; s <= (t.openStart == 0 && t.size ? 2 : 1); s++)
    for (let o = i.depth; o >= 0; o--) {
      let a = o == i.depth ? 0 : i.pos <= (i.start(o + 1) + i.end(o + 1)) / 2 ? -1 : 1, l = i.index(o) + (a > 0 ? 1 : 0), c = i.node(o), u = !1;
      if (s == 1)
        u = c.canReplace(l, l, r);
      else {
        let d = c.contentMatchAt(l).findWrapping(r.firstChild.type);
        u = d && c.canReplaceWith(l, l, d[0]);
      }
      if (u)
        return a == 0 ? i.pos : a < 0 ? i.before(o + 1) : i.after(o + 1);
    }
  return null;
}
function gr(n, e, t = e, i = N.empty) {
  if (e == t && !i.size)
    return null;
  let r = n.resolve(e), s = n.resolve(t);
  return Kd(r, s, i) ? new ce(e, t, i) : new f6(r, s, i).fit();
}
function Kd(n, e, t) {
  return !t.openStart && !t.openEnd && n.start() == e.start() && n.parent.canReplace(n.index(), e.index(), t.content);
}
class f6 {
  constructor(e, t, i) {
    this.$from = e, this.$to = t, this.unplaced = i, this.frontier = [], this.placed = T.empty;
    for (let r = 0; r <= e.depth; r++) {
      let s = e.node(r);
      this.frontier.push({
        type: s.type,
        match: s.contentMatchAt(e.indexAfter(r))
      });
    }
    for (let r = e.depth; r > 0; r--)
      this.placed = T.from(e.node(r).copy(this.placed));
  }
  get depth() {
    return this.frontier.length - 1;
  }
  fit() {
    for (; this.unplaced.size; ) {
      let c = this.findFittable();
      c ? this.placeNodes(c) : this.openMore() || this.dropNode();
    }
    let e = this.mustMoveInline(), t = this.placed.size - this.depth - this.$from.depth, i = this.$from, r = this.close(e < 0 ? this.$to : i.doc.resolve(e));
    if (!r)
      return null;
    let s = this.placed, o = i.depth, a = r.depth;
    for (; o && a && s.childCount == 1; )
      s = s.firstChild.content, o--, a--;
    let l = new N(s, o, a);
    return e > -1 ? new de(i.pos, e, this.$to.pos, this.$to.end(), l, t) : l.size || i.pos != this.$to.pos ? new ce(i.pos, r.pos, l) : null;
  }
  // Find a position on the start spine of `this.unplaced` that has
  // content that can be moved somewhere on the frontier. Returns two
  // depths, one for the slice and one for the frontier.
  findFittable() {
    let e = this.unplaced.openStart;
    for (let t = this.unplaced.content, i = 0, r = this.unplaced.openEnd; i < e; i++) {
      let s = t.firstChild;
      if (t.childCount > 1 && (r = 0), s.type.spec.isolating && r <= i) {
        e = i;
        break;
      }
      t = s.content;
    }
    for (let t = 1; t <= 2; t++)
      for (let i = t == 1 ? e : this.unplaced.openStart; i >= 0; i--) {
        let r, s = null;
        i ? (s = Qr(this.unplaced.content, i - 1).firstChild, r = s.content) : r = this.unplaced.content;
        let o = r.firstChild;
        for (let a = this.depth; a >= 0; a--) {
          let { type: l, match: c } = this.frontier[a], u, d = null;
          if (t == 1 && (o ? c.matchType(o.type) || (d = c.fillBefore(T.from(o), !1)) : s && l.compatibleContent(s.type)))
            return { sliceDepth: i, frontierDepth: a, parent: s, inject: d };
          if (t == 2 && o && (u = c.findWrapping(o.type)))
            return { sliceDepth: i, frontierDepth: a, parent: s, wrap: u };
          if (s && c.matchType(s.type))
            break;
        }
      }
  }
  openMore() {
    let { content: e, openStart: t, openEnd: i } = this.unplaced, r = Qr(e, t);
    return !r.childCount || r.firstChild.isLeaf ? !1 : (this.unplaced = new N(e, t + 1, Math.max(i, r.size + t >= e.size - i ? t + 1 : 0)), !0);
  }
  dropNode() {
    let { content: e, openStart: t, openEnd: i } = this.unplaced, r = Qr(e, t);
    if (r.childCount <= 1 && t > 0) {
      let s = e.size - t <= t + r.size;
      this.unplaced = new N(En(e, t - 1, 1), t - 1, s ? t - 1 : i);
    } else
      this.unplaced = new N(En(e, t, 1), t, i);
  }
  // Move content from the unplaced slice at `sliceDepth` to the
  // frontier node at `frontierDepth`. Close that frontier node when
  // applicable.
  placeNodes({ sliceDepth: e, frontierDepth: t, parent: i, inject: r, wrap: s }) {
    for (; this.depth > t; )
      this.closeFrontierNode();
    if (s)
      for (let v = 0; v < s.length; v++)
        this.openFrontierNode(s[v]);
    let o = this.unplaced, a = i ? i.content : o.content, l = o.openStart - e, c = 0, u = [], { match: d, type: f } = this.frontier[t];
    if (r) {
      for (let v = 0; v < r.childCount; v++)
        u.push(r.child(v));
      d = d.matchFragment(r);
    }
    let p = a.size + e - (o.content.size - o.openEnd);
    for (; c < a.childCount; ) {
      let v = a.child(c), y = d.matchType(v.type);
      if (!y)
        break;
      c++, (c > 1 || l == 0 || v.content.size) && (d = y, u.push(Jd(v.mark(f.allowedMarks(v.marks)), c == 1 ? l : 0, c == a.childCount ? p : -1)));
    }
    let m = c == a.childCount;
    m || (p = -1), this.placed = An(this.placed, t, T.from(u)), this.frontier[t].match = d, m && p < 0 && i && i.type == this.frontier[this.depth].type && this.frontier.length > 1 && this.closeFrontierNode();
    for (let v = 0, y = a; v < p; v++) {
      let g = y.lastChild;
      this.frontier.push({ type: g.type, match: g.contentMatchAt(g.childCount) }), y = g.content;
    }
    this.unplaced = m ? e == 0 ? N.empty : new N(En(o.content, e - 1, 1), e - 1, p < 0 ? o.openEnd : e - 1) : new N(En(o.content, e, c), o.openStart, o.openEnd);
  }
  mustMoveInline() {
    if (!this.$to.parent.isTextblock)
      return -1;
    let e = this.frontier[this.depth], t;
    if (!e.type.isTextblock || !es(this.$to, this.$to.depth, e.type, e.match, !1) || this.$to.depth == this.depth && (t = this.findCloseLevel(this.$to)) && t.depth == this.depth)
      return -1;
    let { depth: i } = this.$to, r = this.$to.after(i);
    for (; i > 1 && r == this.$to.end(--i); )
      ++r;
    return r;
  }
  findCloseLevel(e) {
    e:
      for (let t = Math.min(this.depth, e.depth); t >= 0; t--) {
        let { match: i, type: r } = this.frontier[t], s = t < e.depth && e.end(t + 1) == e.pos + (e.depth - (t + 1)), o = es(e, t, r, i, s);
        if (o) {
          for (let a = t - 1; a >= 0; a--) {
            let { match: l, type: c } = this.frontier[a], u = es(e, a, c, l, !0);
            if (!u || u.childCount)
              continue e;
          }
          return { depth: t, fit: o, move: s ? e.doc.resolve(e.after(t + 1)) : e };
        }
      }
  }
  close(e) {
    let t = this.findCloseLevel(e);
    if (!t)
      return null;
    for (; this.depth > t.depth; )
      this.closeFrontierNode();
    t.fit.childCount && (this.placed = An(this.placed, t.depth, t.fit)), e = t.move;
    for (let i = t.depth + 1; i <= e.depth; i++) {
      let r = e.node(i), s = r.type.contentMatch.fillBefore(r.content, !0, e.index(i));
      this.openFrontierNode(r.type, r.attrs, s);
    }
    return e;
  }
  openFrontierNode(e, t = null, i) {
    let r = this.frontier[this.depth];
    r.match = r.match.matchType(e), this.placed = An(this.placed, this.depth, T.from(e.create(t, i))), this.frontier.push({ type: e, match: e.contentMatch });
  }
  closeFrontierNode() {
    let t = this.frontier.pop().match.fillBefore(T.empty, !0);
    t.childCount && (this.placed = An(this.placed, this.frontier.length, t));
  }
}
function En(n, e, t) {
  return e == 0 ? n.cutByIndex(t, n.childCount) : n.replaceChild(0, n.firstChild.copy(En(n.firstChild.content, e - 1, t)));
}
function An(n, e, t) {
  return e == 0 ? n.append(t) : n.replaceChild(n.childCount - 1, n.lastChild.copy(An(n.lastChild.content, e - 1, t)));
}
function Qr(n, e) {
  for (let t = 0; t < e; t++)
    n = n.firstChild.content;
  return n;
}
function Jd(n, e, t) {
  if (e <= 0)
    return n;
  let i = n.content;
  return e > 1 && (i = i.replaceChild(0, Jd(i.firstChild, e - 1, i.childCount == 1 ? t - 1 : 0))), e > 0 && (i = n.type.contentMatch.fillBefore(i).append(i), t <= 0 && (i = i.append(n.type.contentMatch.matchFragment(i).fillBefore(T.empty, !0)))), n.copy(i);
}
function es(n, e, t, i, r) {
  let s = n.node(e), o = r ? n.indexAfter(e) : n.index(e);
  if (o == s.childCount && !t.compatibleContent(s.type))
    return null;
  let a = i.fillBefore(s.content, !0, o);
  return a && !p6(t, s.content, o) ? a : null;
}
function p6(n, e, t) {
  for (let i = t; i < e.childCount; i++)
    if (!n.allowsMarks(e.child(i).marks))
      return !0;
  return !1;
}
function m6(n) {
  return n.spec.defining || n.spec.definingForContent;
}
function g6(n, e, t, i) {
  if (!i.size)
    return n.deleteRange(e, t);
  let r = n.doc.resolve(e), s = n.doc.resolve(t);
  if (Kd(r, s, i))
    return n.step(new ce(e, t, i));
  let o = Xd(r, s);
  o[o.length - 1] == 0 && o.pop();
  let a = -(r.depth + 1);
  o.unshift(a);
  for (let f = r.depth, p = r.pos - 1; f > 0; f--, p--) {
    let m = r.node(f).type.spec;
    if (m.defining || m.definingAsContext || m.isolating)
      break;
    o.indexOf(f) > -1 ? a = f : r.before(f) == p && o.splice(1, 0, -f);
  }
  let l = o.indexOf(a), c = [], u = i.openStart;
  for (let f = i.content, p = 0; ; p++) {
    let m = f.firstChild;
    if (c.push(m), p == i.openStart)
      break;
    f = m.content;
  }
  for (let f = u - 1; f >= 0; f--) {
    let p = c[f], m = m6(p.type);
    if (m && !p.sameMarkup(r.node(Math.abs(a) - 1)))
      u = f;
    else if (m || !p.type.isTextblock)
      break;
  }
  for (let f = i.openStart; f >= 0; f--) {
    let p = (f + u + 1) % (i.openStart + 1), m = c[p];
    if (m)
      for (let v = 0; v < o.length; v++) {
        let y = o[(v + l) % o.length], g = !0;
        y < 0 && (g = !1, y = -y);
        let b = r.node(y - 1), w = r.index(y - 1);
        if (b.canReplaceWith(w, w, m.type, m.marks))
          return n.replace(r.before(y), g ? s.after(y) : t, new N(Gd(i.content, 0, i.openStart, p), p, i.openEnd));
      }
  }
  let d = n.steps.length;
  for (let f = o.length - 1; f >= 0 && (n.replace(e, t, i), !(n.steps.length > d)); f--) {
    let p = o[f];
    p < 0 || (e = r.before(p), t = s.after(p));
  }
}
function Gd(n, e, t, i, r) {
  if (e < t) {
    let s = n.firstChild;
    n = n.replaceChild(0, s.copy(Gd(s.content, e + 1, t, i, s)));
  }
  if (e > i) {
    let s = r.contentMatchAt(0), o = s.fillBefore(n).append(n);
    n = o.append(s.matchFragment(o).fillBefore(T.empty, !0));
  }
  return n;
}
function v6(n, e, t, i) {
  if (!i.isInline && e == t && n.doc.resolve(e).parent.content.size) {
    let r = h6(n.doc, e, i.type);
    r != null && (e = t = r);
  }
  n.replaceRange(e, t, new N(T.from(i), 0, 0));
}
function y6(n, e, t) {
  let i = n.doc.resolve(e), r = n.doc.resolve(t), s = Xd(i, r);
  for (let o = 0; o < s.length; o++) {
    let a = s[o], l = o == s.length - 1;
    if (l && a == 0 || i.node(a).type.contentMatch.validEnd)
      return n.delete(i.start(a), r.end(a));
    if (a > 0 && (l || i.node(a - 1).canReplace(i.index(a - 1), r.indexAfter(a - 1))))
      return n.delete(i.before(a), r.after(a));
  }
  for (let o = 1; o <= i.depth && o <= r.depth; o++)
    if (e - i.start(o) == i.depth - o && t > i.end(o) && r.end(o) - t != r.depth - o && i.start(o - 1) == r.start(o - 1) && i.node(o - 1).canReplace(i.index(o - 1), r.index(o - 1)))
      return n.delete(i.before(o), t);
  n.delete(e, t);
}
function Xd(n, e) {
  let t = [], i = Math.min(n.depth, e.depth);
  for (let r = i; r >= 0; r--) {
    let s = n.start(r);
    if (s < n.pos - (n.depth - r) || e.end(r) > e.pos + (e.depth - r) || n.node(r).type.spec.isolating || e.node(r).type.spec.isolating)
      break;
    (s == e.start(r) || r == n.depth && r == e.depth && n.parent.inlineContent && e.parent.inlineContent && r && e.start(r - 1) == s - 1) && t.push(r);
  }
  return t;
}
class fn extends Se {
  /**
  Construct an attribute step.
  */
  constructor(e, t, i) {
    super(), this.pos = e, this.attr = t, this.value = i;
  }
  apply(e) {
    let t = e.nodeAt(this.pos);
    if (!t)
      return ie.fail("No node at attribute step's position");
    let i = /* @__PURE__ */ Object.create(null);
    for (let s in t.attrs)
      i[s] = t.attrs[s];
    i[this.attr] = this.value;
    let r = t.type.create(i, null, t.marks);
    return ie.fromReplace(e, this.pos, this.pos + 1, new N(T.from(r), 0, t.isLeaf ? 0 : 1));
  }
  getMap() {
    return Le.empty;
  }
  invert(e) {
    return new fn(this.pos, this.attr, e.nodeAt(this.pos).attrs[this.attr]);
  }
  map(e) {
    let t = e.mapResult(this.pos, 1);
    return t.deletedAfter ? null : new fn(t.pos, this.attr, this.value);
  }
  toJSON() {
    return { stepType: "attr", pos: this.pos, attr: this.attr, value: this.value };
  }
  static fromJSON(e, t) {
    if (typeof t.pos != "number" || typeof t.attr != "string")
      throw new RangeError("Invalid input for AttrStep.fromJSON");
    return new fn(t.pos, t.attr, t.value);
  }
}
Se.jsonID("attr", fn);
class Kn extends Se {
  /**
  Construct an attribute step.
  */
  constructor(e, t) {
    super(), this.attr = e, this.value = t;
  }
  apply(e) {
    let t = /* @__PURE__ */ Object.create(null);
    for (let r in e.attrs)
      t[r] = e.attrs[r];
    t[this.attr] = this.value;
    let i = e.type.create(t, e.content, e.marks);
    return ie.ok(i);
  }
  getMap() {
    return Le.empty;
  }
  invert(e) {
    return new Kn(this.attr, e.attrs[this.attr]);
  }
  map(e) {
    return this;
  }
  toJSON() {
    return { stepType: "docAttr", attr: this.attr, value: this.value };
  }
  static fromJSON(e, t) {
    if (typeof t.attr != "string")
      throw new RangeError("Invalid input for DocAttrStep.fromJSON");
    return new Kn(t.attr, t.value);
  }
}
Se.jsonID("docAttr", Kn);
let vn = class extends Error {
};
vn = function n(e) {
  let t = Error.call(this, e);
  return t.__proto__ = n.prototype, t;
};
vn.prototype = Object.create(Error.prototype);
vn.prototype.constructor = vn;
vn.prototype.name = "TransformError";
class Yd {
  /**
  Create a transform that starts with the given document.
  */
  constructor(e) {
    this.doc = e, this.steps = [], this.docs = [], this.mapping = new qn();
  }
  /**
  The starting document.
  */
  get before() {
    return this.docs.length ? this.docs[0] : this.doc;
  }
  /**
  Apply a new step in this transform, saving the result. Throws an
  error when the step fails.
  */
  step(e) {
    let t = this.maybeStep(e);
    if (t.failed)
      throw new vn(t.failed);
    return this;
  }
  /**
  Try to apply a step in this transformation, ignoring it if it
  fails. Returns the step result.
  */
  maybeStep(e) {
    let t = e.apply(this.doc);
    return t.failed || this.addStep(e, t.doc), t;
  }
  /**
  True when the document has been changed (when there are any
  steps).
  */
  get docChanged() {
    return this.steps.length > 0;
  }
  /**
  @internal
  */
  addStep(e, t) {
    this.docs.push(this.doc), this.steps.push(e), this.mapping.appendMap(e.getMap()), this.doc = t;
  }
  /**
  Replace the part of the document between `from` and `to` with the
  given `slice`.
  */
  replace(e, t = e, i = N.empty) {
    let r = gr(this.doc, e, t, i);
    return r && this.step(r), this;
  }
  /**
  Replace the given range with the given content, which may be a
  fragment, node, or array of nodes.
  */
  replaceWith(e, t, i) {
    return this.replace(e, t, new N(T.from(i), 0, 0));
  }
  /**
  Delete the content between the given positions.
  */
  delete(e, t) {
    return this.replace(e, t, N.empty);
  }
  /**
  Insert the given content at the given position.
  */
  insert(e, t) {
    return this.replaceWith(e, e, t);
  }
  /**
  Replace a range of the document with a given slice, using
  `from`, `to`, and the slice's
  [`openStart`](https://prosemirror.net/docs/ref/#model.Slice.openStart) property as hints, rather
  than fixed start and end points. This method may grow the
  replaced area or close open nodes in the slice in order to get a
  fit that is more in line with WYSIWYG expectations, by dropping
  fully covered parent nodes of the replaced region when they are
  marked [non-defining as
  context](https://prosemirror.net/docs/ref/#model.NodeSpec.definingAsContext), or including an
  open parent node from the slice that _is_ marked as [defining
  its content](https://prosemirror.net/docs/ref/#model.NodeSpec.definingForContent).
  
  This is the method, for example, to handle paste. The similar
  [`replace`](https://prosemirror.net/docs/ref/#transform.Transform.replace) method is a more
  primitive tool which will _not_ move the start and end of its given
  range, and is useful in situations where you need more precise
  control over what happens.
  */
  replaceRange(e, t, i) {
    return g6(this, e, t, i), this;
  }
  /**
  Replace the given range with a node, but use `from` and `to` as
  hints, rather than precise positions. When from and to are the same
  and are at the start or end of a parent node in which the given
  node doesn't fit, this method may _move_ them out towards a parent
  that does allow the given node to be placed. When the given range
  completely covers a parent node, this method may completely replace
  that parent node.
  */
  replaceRangeWith(e, t, i) {
    return v6(this, e, t, i), this;
  }
  /**
  Delete the given range, expanding it to cover fully covered
  parent nodes until a valid replace is found.
  */
  deleteRange(e, t) {
    return y6(this, e, t), this;
  }
  /**
  Split the content in the given range off from its parent, if there
  is sibling content before or after it, and move it up the tree to
  the depth specified by `target`. You'll probably want to use
  [`liftTarget`](https://prosemirror.net/docs/ref/#transform.liftTarget) to compute `target`, to make
  sure the lift is valid.
  */
  lift(e, t) {
    return n6(this, e, t), this;
  }
  /**
  Join the blocks around the given position. If depth is 2, their
  last and first siblings are also joined, and so on.
  */
  join(e, t = 1) {
    return d6(this, e, t), this;
  }
  /**
  Wrap the given [range](https://prosemirror.net/docs/ref/#model.NodeRange) in the given set of wrappers.
  The wrappers are assumed to be valid in this position, and should
  probably be computed with [`findWrapping`](https://prosemirror.net/docs/ref/#transform.findWrapping).
  */
  wrap(e, t) {
    return s6(this, e, t), this;
  }
  /**
  Set the type of all textblocks (partly) between `from` and `to` to
  the given node type with the given attributes.
  */
  setBlockType(e, t = e, i, r = null) {
    return o6(this, e, t, i, r), this;
  }
  /**
  Change the type, attributes, and/or marks of the node at `pos`.
  When `type` isn't given, the existing node type is preserved,
  */
  setNodeMarkup(e, t, i = null, r) {
    return l6(this, e, t, i, r), this;
  }
  /**
  Set a single attribute on a given node to a new value.
  The `pos` addresses the document content. Use `setDocAttribute`
  to set attributes on the document itself.
  */
  setNodeAttribute(e, t, i) {
    return this.step(new fn(e, t, i)), this;
  }
  /**
  Set a single attribute on the document to a new value.
  */
  setDocAttribute(e, t) {
    return this.step(new Kn(e, t)), this;
  }
  /**
  Add a mark to the node at position `pos`.
  */
  addNodeMark(e, t) {
    return this.step(new yt(e, t)), this;
  }
  /**
  Remove a mark (or all marks of the given type) from the node at
  position `pos`.
  */
  removeNodeMark(e, t) {
    let i = this.doc.nodeAt(e);
    if (!i)
      throw new RangeError("No node at position " + e);
    if (t instanceof J)
      t.isInSet(i.marks) && this.step(new Wt(e, t));
    else {
      let r = i.marks, s, o = [];
      for (; s = t.isInSet(r); )
        o.push(new Wt(e, s)), r = s.removeFromSet(r);
      for (let a = o.length - 1; a >= 0; a--)
        this.step(o[a]);
    }
    return this;
  }
  /**
  Split the node at the given position, and optionally, if `depth` is
  greater than one, any number of nodes above that. By default, the
  parts split off will inherit the node type of the original node.
  This can be changed by passing an array of types and attributes to
  use after the split (with the outermost nodes coming first).
  */
  split(e, t = 1, i) {
    return c6(this, e, t, i), this;
  }
  /**
  Add the given mark to the inline content between `from` and `to`.
  */
  addMark(e, t, i) {
    return Q2(this, e, t, i), this;
  }
  /**
  Remove marks from inline nodes between `from` and `to`. When
  `mark` is a single mark, remove precisely that mark. When it is
  a mark type, remove all marks of that type. When it is null,
  remove all marks of any type.
  */
  removeMark(e, t, i) {
    return e6(this, e, t, i), this;
  }
  /**
  Removes all marks and nodes from the content of the node at
  `pos` that don't match the given new parent node type. Accepts
  an optional starting [content match](https://prosemirror.net/docs/ref/#model.ContentMatch) as
  third argument.
  */
  clearIncompatible(e, t, i) {
    return Ro(this, e, t, i), this;
  }
}
const ts = /* @__PURE__ */ Object.create(null);
class B {
  /**
  Initialize a selection with the head and anchor and ranges. If no
  ranges are given, constructs a single range across `$anchor` and
  `$head`.
  */
  constructor(e, t, i) {
    this.$anchor = e, this.$head = t, this.ranges = i || [new b6(e.min(t), e.max(t))];
  }
  /**
  The selection's anchor, as an unresolved position.
  */
  get anchor() {
    return this.$anchor.pos;
  }
  /**
  The selection's head.
  */
  get head() {
    return this.$head.pos;
  }
  /**
  The lower bound of the selection's main range.
  */
  get from() {
    return this.$from.pos;
  }
  /**
  The upper bound of the selection's main range.
  */
  get to() {
    return this.$to.pos;
  }
  /**
  The resolved lower  bound of the selection's main range.
  */
  get $from() {
    return this.ranges[0].$from;
  }
  /**
  The resolved upper bound of the selection's main range.
  */
  get $to() {
    return this.ranges[0].$to;
  }
  /**
  Indicates whether the selection contains any content.
  */
  get empty() {
    let e = this.ranges;
    for (let t = 0; t < e.length; t++)
      if (e[t].$from.pos != e[t].$to.pos)
        return !1;
    return !0;
  }
  /**
  Get the content of this selection as a slice.
  */
  content() {
    return this.$from.doc.slice(this.from, this.to, !0);
  }
  /**
  Replace the selection with a slice or, if no slice is given,
  delete the selection. Will append to the given transaction.
  */
  replace(e, t = N.empty) {
    let i = t.content.lastChild, r = null;
    for (let a = 0; a < t.openEnd; a++)
      r = i, i = i.lastChild;
    let s = e.steps.length, o = this.ranges;
    for (let a = 0; a < o.length; a++) {
      let { $from: l, $to: c } = o[a], u = e.mapping.slice(s);
      e.replaceRange(u.map(l.pos), u.map(c.pos), a ? N.empty : t), a == 0 && Al(e, s, (i ? i.isInline : r && r.isTextblock) ? -1 : 1);
    }
  }
  /**
  Replace the selection with the given node, appending the changes
  to the given transaction.
  */
  replaceWith(e, t) {
    let i = e.steps.length, r = this.ranges;
    for (let s = 0; s < r.length; s++) {
      let { $from: o, $to: a } = r[s], l = e.mapping.slice(i), c = l.map(o.pos), u = l.map(a.pos);
      s ? e.deleteRange(c, u) : (e.replaceRangeWith(c, u, t), Al(e, i, t.isInline ? -1 : 1));
    }
  }
  /**
  Find a valid cursor or leaf node selection starting at the given
  position and searching back if `dir` is negative, and forward if
  positive. When `textOnly` is true, only consider cursor
  selections. Will return null when no valid selection position is
  found.
  */
  static findFrom(e, t, i = !1) {
    let r = e.parent.inlineContent ? new z(e) : sn(e.node(0), e.parent, e.pos, e.index(), t, i);
    if (r)
      return r;
    for (let s = e.depth - 1; s >= 0; s--) {
      let o = t < 0 ? sn(e.node(0), e.node(s), e.before(s + 1), e.index(s), t, i) : sn(e.node(0), e.node(s), e.after(s + 1), e.index(s) + 1, t, i);
      if (o)
        return o;
    }
    return null;
  }
  /**
  Find a valid cursor or leaf node selection near the given
  position. Searches forward first by default, but if `bias` is
  negative, it will search backwards first.
  */
  static near(e, t = 1) {
    return this.findFrom(e, t) || this.findFrom(e, -t) || new Ve(e.node(0));
  }
  /**
  Find the cursor or leaf node selection closest to the start of
  the given document. Will return an
  [`AllSelection`](https://prosemirror.net/docs/ref/#state.AllSelection) if no valid position
  exists.
  */
  static atStart(e) {
    return sn(e, e, 0, 0, 1) || new Ve(e);
  }
  /**
  Find the cursor or leaf node selection closest to the end of the
  given document.
  */
  static atEnd(e) {
    return sn(e, e, e.content.size, e.childCount, -1) || new Ve(e);
  }
  /**
  Deserialize the JSON representation of a selection. Must be
  implemented for custom classes (as a static class method).
  */
  static fromJSON(e, t) {
    if (!t || !t.type)
      throw new RangeError("Invalid input for Selection.fromJSON");
    let i = ts[t.type];
    if (!i)
      throw new RangeError("No selection type ".concat(t.type, " defined"));
    return i.fromJSON(e, t);
  }
  /**
  To be able to deserialize selections from JSON, custom selection
  classes must register themselves with an ID string, so that they
  can be disambiguated. Try to pick something that's unlikely to
  clash with classes from other modules.
  */
  static jsonID(e, t) {
    if (e in ts)
      throw new RangeError("Duplicate use of selection JSON ID " + e);
    return ts[e] = t, t.prototype.jsonID = e, t;
  }
  /**
  Get a [bookmark](https://prosemirror.net/docs/ref/#state.SelectionBookmark) for this selection,
  which is a value that can be mapped without having access to a
  current document, and later resolved to a real selection for a
  given document again. (This is used mostly by the history to
  track and restore old selections.) The default implementation of
  this method just converts the selection to a text selection and
  returns the bookmark for that.
  */
  getBookmark() {
    return z.between(this.$anchor, this.$head).getBookmark();
  }
}
B.prototype.visible = !0;
class b6 {
  /**
  Create a range.
  */
  constructor(e, t) {
    this.$from = e, this.$to = t;
  }
}
let Nl = !1;
function El(n) {
  !Nl && !n.parent.inlineContent && (Nl = !0, console.warn("TextSelection endpoint not pointing into a node with inline content (" + n.parent.type.name + ")"));
}
class z extends B {
  /**
  Construct a text selection between the given points.
  */
  constructor(e, t = e) {
    El(e), El(t), super(e, t);
  }
  /**
  Returns a resolved position if this is a cursor selection (an
  empty text selection), and null otherwise.
  */
  get $cursor() {
    return this.$anchor.pos == this.$head.pos ? this.$head : null;
  }
  map(e, t) {
    let i = e.resolve(t.map(this.head));
    if (!i.parent.inlineContent)
      return B.near(i);
    let r = e.resolve(t.map(this.anchor));
    return new z(r.parent.inlineContent ? r : i, i);
  }
  replace(e, t = N.empty) {
    if (super.replace(e, t), t == N.empty) {
      let i = this.$from.marksAcross(this.$to);
      i && e.ensureMarks(i);
    }
  }
  eq(e) {
    return e instanceof z && e.anchor == this.anchor && e.head == this.head;
  }
  getBookmark() {
    return new vr(this.anchor, this.head);
  }
  toJSON() {
    return { type: "text", anchor: this.anchor, head: this.head };
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.anchor != "number" || typeof t.head != "number")
      throw new RangeError("Invalid input for TextSelection.fromJSON");
    return new z(e.resolve(t.anchor), e.resolve(t.head));
  }
  /**
  Create a text selection from non-resolved positions.
  */
  static create(e, t, i = t) {
    let r = e.resolve(t);
    return new this(r, i == t ? r : e.resolve(i));
  }
  /**
  Return a text selection that spans the given positions or, if
  they aren't text positions, find a text selection near them.
  `bias` determines whether the method searches forward (default)
  or backwards (negative number) first. Will fall back to calling
  [`Selection.near`](https://prosemirror.net/docs/ref/#state.Selection^near) when the document
  doesn't contain a valid text position.
  */
  static between(e, t, i) {
    let r = e.pos - t.pos;
    if ((!i || r) && (i = r >= 0 ? 1 : -1), !t.parent.inlineContent) {
      let s = B.findFrom(t, i, !0) || B.findFrom(t, -i, !0);
      if (s)
        t = s.$head;
      else
        return B.near(t, i);
    }
    return e.parent.inlineContent || (r == 0 ? e = t : (e = (B.findFrom(e, -i, !0) || B.findFrom(e, i, !0)).$anchor, e.pos < t.pos != r < 0 && (e = t))), new z(e, t);
  }
}
B.jsonID("text", z);
class vr {
  constructor(e, t) {
    this.anchor = e, this.head = t;
  }
  map(e) {
    return new vr(e.map(this.anchor), e.map(this.head));
  }
  resolve(e) {
    return z.between(e.resolve(this.anchor), e.resolve(this.head));
  }
}
class D extends B {
  /**
  Create a node selection. Does not verify the validity of its
  argument.
  */
  constructor(e) {
    let t = e.nodeAfter, i = e.node(0).resolve(e.pos + t.nodeSize);
    super(e, i), this.node = t;
  }
  map(e, t) {
    let { deleted: i, pos: r } = t.mapResult(this.anchor), s = e.resolve(r);
    return i ? B.near(s) : new D(s);
  }
  content() {
    return new N(T.from(this.node), 0, 0);
  }
  eq(e) {
    return e instanceof D && e.anchor == this.anchor;
  }
  toJSON() {
    return { type: "node", anchor: this.anchor };
  }
  getBookmark() {
    return new Po(this.anchor);
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.anchor != "number")
      throw new RangeError("Invalid input for NodeSelection.fromJSON");
    return new D(e.resolve(t.anchor));
  }
  /**
  Create a node selection from non-resolved positions.
  */
  static create(e, t) {
    return new D(e.resolve(t));
  }
  /**
  Determines whether the given node may be selected as a node
  selection.
  */
  static isSelectable(e) {
    return !e.isText && e.type.spec.selectable !== !1;
  }
}
D.prototype.visible = !1;
B.jsonID("node", D);
class Po {
  constructor(e) {
    this.anchor = e;
  }
  map(e) {
    let { deleted: t, pos: i } = e.mapResult(this.anchor);
    return t ? new vr(i, i) : new Po(i);
  }
  resolve(e) {
    let t = e.resolve(this.anchor), i = t.nodeAfter;
    return i && D.isSelectable(i) ? new D(t) : B.near(t);
  }
}
class Ve extends B {
  /**
  Create an all-selection over the given document.
  */
  constructor(e) {
    super(e.resolve(0), e.resolve(e.content.size));
  }
  replace(e, t = N.empty) {
    if (t == N.empty) {
      e.delete(0, e.doc.content.size);
      let i = B.atStart(e.doc);
      i.eq(e.selection) || e.setSelection(i);
    } else
      super.replace(e, t);
  }
  toJSON() {
    return { type: "all" };
  }
  /**
  @internal
  */
  static fromJSON(e) {
    return new Ve(e);
  }
  map(e) {
    return new Ve(e);
  }
  eq(e) {
    return e instanceof Ve;
  }
  getBookmark() {
    return w6;
  }
}
B.jsonID("all", Ve);
const w6 = {
  map() {
    return this;
  },
  resolve(n) {
    return new Ve(n);
  }
};
function sn(n, e, t, i, r, s = !1) {
  if (e.inlineContent)
    return z.create(n, t);
  for (let o = i - (r > 0 ? 0 : 1); r > 0 ? o < e.childCount : o >= 0; o += r) {
    let a = e.child(o);
    if (a.isAtom) {
      if (!s && D.isSelectable(a))
        return D.create(n, t - (r < 0 ? a.nodeSize : 0));
    } else {
      let l = sn(n, a, t + r, r < 0 ? a.childCount : 0, r, s);
      if (l)
        return l;
    }
    t += a.nodeSize * r;
  }
  return null;
}
function Al(n, e, t) {
  let i = n.steps.length - 1;
  if (i < e)
    return;
  let r = n.steps[i];
  if (!(r instanceof ce || r instanceof de))
    return;
  let s = n.mapping.maps[i], o;
  s.forEach((a, l, c, u) => {
    o == null && (o = u);
  }), n.setSelection(B.near(n.doc.resolve(o), t));
}
const Il = 1, Si = 2, Ol = 4;
class C6 extends Yd {
  /**
  @internal
  */
  constructor(e) {
    super(e.doc), this.curSelectionFor = 0, this.updated = 0, this.meta = /* @__PURE__ */ Object.create(null), this.time = Date.now(), this.curSelection = e.selection, this.storedMarks = e.storedMarks;
  }
  /**
  The transaction's current selection. This defaults to the editor
  selection [mapped](https://prosemirror.net/docs/ref/#state.Selection.map) through the steps in the
  transaction, but can be overwritten with
  [`setSelection`](https://prosemirror.net/docs/ref/#state.Transaction.setSelection).
  */
  get selection() {
    return this.curSelectionFor < this.steps.length && (this.curSelection = this.curSelection.map(this.doc, this.mapping.slice(this.curSelectionFor)), this.curSelectionFor = this.steps.length), this.curSelection;
  }
  /**
  Update the transaction's current selection. Will determine the
  selection that the editor gets when the transaction is applied.
  */
  setSelection(e) {
    if (e.$from.doc != this.doc)
      throw new RangeError("Selection passed to setSelection must point at the current document");
    return this.curSelection = e, this.curSelectionFor = this.steps.length, this.updated = (this.updated | Il) & ~Si, this.storedMarks = null, this;
  }
  /**
  Whether the selection was explicitly updated by this transaction.
  */
  get selectionSet() {
    return (this.updated & Il) > 0;
  }
  /**
  Set the current stored marks.
  */
  setStoredMarks(e) {
    return this.storedMarks = e, this.updated |= Si, this;
  }
  /**
  Make sure the current stored marks or, if that is null, the marks
  at the selection, match the given set of marks. Does nothing if
  this is already the case.
  */
  ensureMarks(e) {
    return J.sameSet(this.storedMarks || this.selection.$from.marks(), e) || this.setStoredMarks(e), this;
  }
  /**
  Add a mark to the set of stored marks.
  */
  addStoredMark(e) {
    return this.ensureMarks(e.addToSet(this.storedMarks || this.selection.$head.marks()));
  }
  /**
  Remove a mark or mark type from the set of stored marks.
  */
  removeStoredMark(e) {
    return this.ensureMarks(e.removeFromSet(this.storedMarks || this.selection.$head.marks()));
  }
  /**
  Whether the stored marks were explicitly set for this transaction.
  */
  get storedMarksSet() {
    return (this.updated & Si) > 0;
  }
  /**
  @internal
  */
  addStep(e, t) {
    super.addStep(e, t), this.updated = this.updated & ~Si, this.storedMarks = null;
  }
  /**
  Update the timestamp for the transaction.
  */
  setTime(e) {
    return this.time = e, this;
  }
  /**
  Replace the current selection with the given slice.
  */
  replaceSelection(e) {
    return this.selection.replace(this, e), this;
  }
  /**
  Replace the selection with the given node. When `inheritMarks` is
  true and the content is inline, it inherits the marks from the
  place where it is inserted.
  */
  replaceSelectionWith(e, t = !0) {
    let i = this.selection;
    return t && (e = e.mark(this.storedMarks || (i.empty ? i.$from.marks() : i.$from.marksAcross(i.$to) || J.none))), i.replaceWith(this, e), this;
  }
  /**
  Delete the selection.
  */
  deleteSelection() {
    return this.selection.replace(this), this;
  }
  /**
  Replace the given range, or the selection if no range is given,
  with a text node containing the given string.
  */
  insertText(e, t, i) {
    let r = this.doc.type.schema;
    if (t == null)
      return e ? this.replaceSelectionWith(r.text(e), !0) : this.deleteSelection();
    {
      if (i == null && (i = t), !e)
        return this.deleteRange(t, i);
      let s = this.storedMarks;
      if (!s) {
        let o = this.doc.resolve(t);
        s = i == t ? o.marks() : o.marksAcross(this.doc.resolve(i));
      }
      return this.replaceRangeWith(t, i, r.text(e, s)), !this.selection.empty && this.selection.to == t + e.length && this.setSelection(B.near(this.selection.$to)), this;
    }
  }
  /**
  Store a metadata property in this transaction, keyed either by
  name or by plugin.
  */
  setMeta(e, t) {
    return this.meta[typeof e == "string" ? e : e.key] = t, this;
  }
  /**
  Retrieve a metadata property for a given name or plugin.
  */
  getMeta(e) {
    return this.meta[typeof e == "string" ? e : e.key];
  }
  /**
  Returns true if this transaction doesn't contain any metadata,
  and can thus safely be extended.
  */
  get isGeneric() {
    for (let e in this.meta)
      return !1;
    return !0;
  }
  /**
  Indicate that the editor should scroll the selection into view
  when updated to the state produced by this transaction.
  */
  scrollIntoView() {
    return this.updated |= Ol, this;
  }
  /**
  True when this transaction has had `scrollIntoView` called on it.
  */
  get scrolledIntoView() {
    return (this.updated & Ol) > 0;
  }
}
function Dl(n, e) {
  return !e || !n ? n : n.bind(e);
}
class In {
  constructor(e, t, i) {
    this.name = e, this.init = Dl(t.init, i), this.apply = Dl(t.apply, i);
  }
}
const k6 = [
  new In("doc", {
    init(n) {
      return n.doc || n.schema.topNodeType.createAndFill();
    },
    apply(n) {
      return n.doc;
    }
  }),
  new In("selection", {
    init(n, e) {
      return n.selection || B.atStart(e.doc);
    },
    apply(n) {
      return n.selection;
    }
  }),
  new In("storedMarks", {
    init(n) {
      return n.storedMarks || null;
    },
    apply(n, e, t, i) {
      return i.selection.$cursor ? n.storedMarks : null;
    }
  }),
  new In("scrollToSelection", {
    init() {
      return 0;
    },
    apply(n, e) {
      return n.scrolledIntoView ? e + 1 : e;
    }
  })
];
class ns {
  constructor(e, t) {
    this.schema = e, this.plugins = [], this.pluginsByKey = /* @__PURE__ */ Object.create(null), this.fields = k6.slice(), t && t.forEach((i) => {
      if (this.pluginsByKey[i.key])
        throw new RangeError("Adding different instances of a keyed plugin (" + i.key + ")");
      this.plugins.push(i), this.pluginsByKey[i.key] = i, i.spec.state && this.fields.push(new In(i.key, i.spec.state, i));
    });
  }
}
class cn {
  /**
  @internal
  */
  constructor(e) {
    this.config = e;
  }
  /**
  The schema of the state's document.
  */
  get schema() {
    return this.config.schema;
  }
  /**
  The plugins that are active in this state.
  */
  get plugins() {
    return this.config.plugins;
  }
  /**
  Apply the given transaction to produce a new state.
  */
  apply(e) {
    return this.applyTransaction(e).state;
  }
  /**
  @internal
  */
  filterTransaction(e, t = -1) {
    for (let i = 0; i < this.config.plugins.length; i++)
      if (i != t) {
        let r = this.config.plugins[i];
        if (r.spec.filterTransaction && !r.spec.filterTransaction.call(r, e, this))
          return !1;
      }
    return !0;
  }
  /**
  Verbose variant of [`apply`](https://prosemirror.net/docs/ref/#state.EditorState.apply) that
  returns the precise transactions that were applied (which might
  be influenced by the [transaction
  hooks](https://prosemirror.net/docs/ref/#state.PluginSpec.filterTransaction) of
  plugins) along with the new state.
  */
  applyTransaction(e) {
    if (!this.filterTransaction(e))
      return { state: this, transactions: [] };
    let t = [e], i = this.applyInner(e), r = null;
    for (; ; ) {
      let s = !1;
      for (let o = 0; o < this.config.plugins.length; o++) {
        let a = this.config.plugins[o];
        if (a.spec.appendTransaction) {
          let l = r ? r[o].n : 0, c = r ? r[o].state : this, u = l < t.length && a.spec.appendTransaction.call(a, l ? t.slice(l) : t, c, i);
          if (u && i.filterTransaction(u, o)) {
            if (u.setMeta("appendedTransaction", e), !r) {
              r = [];
              for (let d = 0; d < this.config.plugins.length; d++)
                r.push(d < o ? { state: i, n: t.length } : { state: this, n: 0 });
            }
            t.push(u), i = i.applyInner(u), s = !0;
          }
          r && (r[o] = { state: i, n: t.length });
        }
      }
      if (!s)
        return { state: i, transactions: t };
    }
  }
  /**
  @internal
  */
  applyInner(e) {
    if (!e.before.eq(this.doc))
      throw new RangeError("Applying a mismatched transaction");
    let t = new cn(this.config), i = this.config.fields;
    for (let r = 0; r < i.length; r++) {
      let s = i[r];
      t[s.name] = s.apply(e, this[s.name], this, t);
    }
    return t;
  }
  /**
  Accessor that constructs and returns a new [transaction](https://prosemirror.net/docs/ref/#state.Transaction) from this state.
  */
  get tr() {
    return new C6(this);
  }
  /**
  Create a new state.
  */
  static create(e) {
    let t = new ns(e.doc ? e.doc.type.schema : e.schema, e.plugins), i = new cn(t);
    for (let r = 0; r < t.fields.length; r++)
      i[t.fields[r].name] = t.fields[r].init(e, i);
    return i;
  }
  /**
  Create a new state based on this one, but with an adjusted set
  of active plugins. State fields that exist in both sets of
  plugins are kept unchanged. Those that no longer exist are
  dropped, and those that are new are initialized using their
  [`init`](https://prosemirror.net/docs/ref/#state.StateField.init) method, passing in the new
  configuration object..
  */
  reconfigure(e) {
    let t = new ns(this.schema, e.plugins), i = t.fields, r = new cn(t);
    for (let s = 0; s < i.length; s++) {
      let o = i[s].name;
      r[o] = this.hasOwnProperty(o) ? this[o] : i[s].init(e, r);
    }
    return r;
  }
  /**
  Serialize this state to JSON. If you want to serialize the state
  of plugins, pass an object mapping property names to use in the
  resulting JSON object to plugin objects. The argument may also be
  a string or number, in which case it is ignored, to support the
  way `JSON.stringify` calls `toString` methods.
  */
  toJSON(e) {
    let t = { doc: this.doc.toJSON(), selection: this.selection.toJSON() };
    if (this.storedMarks && (t.storedMarks = this.storedMarks.map((i) => i.toJSON())), e && typeof e == "object")
      for (let i in e) {
        if (i == "doc" || i == "selection")
          throw new RangeError("The JSON fields `doc` and `selection` are reserved");
        let r = e[i], s = r.spec.state;
        s && s.toJSON && (t[i] = s.toJSON.call(r, this[r.key]));
      }
    return t;
  }
  /**
  Deserialize a JSON representation of a state. `config` should
  have at least a `schema` field, and should contain array of
  plugins to initialize the state with. `pluginFields` can be used
  to deserialize the state of plugins, by associating plugin
  instances with the property names they use in the JSON object.
  */
  static fromJSON(e, t, i) {
    if (!t)
      throw new RangeError("Invalid input for EditorState.fromJSON");
    if (!e.schema)
      throw new RangeError("Required config field 'schema' missing");
    let r = new ns(e.schema, e.plugins), s = new cn(r);
    return r.fields.forEach((o) => {
      if (o.name == "doc")
        s.doc = wt.fromJSON(e.schema, t.doc);
      else if (o.name == "selection")
        s.selection = B.fromJSON(s.doc, t.selection);
      else if (o.name == "storedMarks")
        t.storedMarks && (s.storedMarks = t.storedMarks.map(e.schema.markFromJSON));
      else {
        if (i)
          for (let a in i) {
            let l = i[a], c = l.spec.state;
            if (l.key == o.name && c && c.fromJSON && Object.prototype.hasOwnProperty.call(t, a)) {
              s[o.name] = c.fromJSON.call(l, e, t[a], s);
              return;
            }
          }
        s[o.name] = o.init(e, s);
      }
    }), s;
  }
}
function Zd(n, e, t) {
  for (let i in n) {
    let r = n[i];
    r instanceof Function ? r = r.bind(e) : i == "handleDOMEvents" && (r = Zd(r, e, {})), t[i] = r;
  }
  return t;
}
class re {
  /**
  Create a plugin.
  */
  constructor(e) {
    this.spec = e, this.props = {}, e.props && Zd(e.props, this, this.props), this.key = e.key ? e.key.key : Qd("plugin");
  }
  /**
  Extract the plugin's state field from an editor state.
  */
  getState(e) {
    return e[this.key];
  }
}
const is = /* @__PURE__ */ Object.create(null);
function Qd(n) {
  return n in is ? n + "$" + ++is[n] : (is[n] = 0, n + "$");
}
class be {
  /**
  Create a plugin key.
  */
  constructor(e = "key") {
    this.key = Qd(e);
  }
  /**
  Get the active plugin with this key, if any, from an editor
  state.
  */
  get(e) {
    return e.config.pluginsByKey[this.key];
  }
  /**
  Get the plugin's state from an editor state.
  */
  getState(e) {
    return e[this.key];
  }
}
const x6 = (n, e) => n.selection.empty ? !1 : (e && e(n.tr.deleteSelection().scrollIntoView()), !0);
function eh(n, e) {
  let { $cursor: t } = n.selection;
  return !t || (e ? !e.endOfTextblock("backward", n) : t.parentOffset > 0) ? null : t;
}
const S6 = (n, e, t) => {
  let i = eh(n, t);
  if (!i)
    return !1;
  let r = Lo(i);
  if (!r) {
    let o = i.blockRange(), a = o && Mn(o);
    return a == null ? !1 : (e && e(n.tr.lift(o, a).scrollIntoView()), !0);
  }
  let s = r.nodeBefore;
  if (rh(n, r, e, -1))
    return !0;
  if (i.parent.content.size == 0 && (yn(s, "end") || D.isSelectable(s)))
    for (let o = i.depth; ; o--) {
      let a = gr(n.doc, i.before(o), i.after(o), N.empty);
      if (a && a.slice.size < a.to - a.from) {
        if (e) {
          let l = n.tr.step(a);
          l.setSelection(yn(s, "end") ? B.findFrom(l.doc.resolve(l.mapping.map(r.pos, -1)), -1) : D.create(l.doc, r.pos - s.nodeSize)), e(l.scrollIntoView());
        }
        return !0;
      }
      if (o == 1 || i.node(o - 1).childCount > 1)
        break;
    }
  return s.isAtom && r.depth == i.depth - 1 ? (e && e(n.tr.delete(r.pos - s.nodeSize, r.pos).scrollIntoView()), !0) : !1;
}, T6 = (n, e, t) => {
  let i = eh(n, t);
  if (!i)
    return !1;
  let r = Lo(i);
  return r ? th(n, r, e) : !1;
}, M6 = (n, e, t) => {
  let i = nh(n, t);
  if (!i)
    return !1;
  let r = zo(i);
  return r ? th(n, r, e) : !1;
};
function th(n, e, t) {
  let i = e.nodeBefore, r = i, s = e.pos - 1;
  for (; !r.isTextblock; s--) {
    if (r.type.spec.isolating)
      return !1;
    let u = r.lastChild;
    if (!u)
      return !1;
    r = u;
  }
  let o = e.nodeAfter, a = o, l = e.pos + 1;
  for (; !a.isTextblock; l++) {
    if (a.type.spec.isolating)
      return !1;
    let u = a.firstChild;
    if (!u)
      return !1;
    a = u;
  }
  let c = gr(n.doc, s, l, N.empty);
  if (!c || c.from != s || c instanceof ce && c.slice.size >= l - s)
    return !1;
  if (t) {
    let u = n.tr.step(c);
    u.setSelection(z.create(u.doc, s)), t(u.scrollIntoView());
  }
  return !0;
}
function yn(n, e, t = !1) {
  for (let i = n; i; i = e == "start" ? i.firstChild : i.lastChild) {
    if (i.isTextblock)
      return !0;
    if (t && i.childCount != 1)
      return !1;
  }
  return !1;
}
const _6 = (n, e, t) => {
  let { $head: i, empty: r } = n.selection, s = i;
  if (!r)
    return !1;
  if (i.parent.isTextblock) {
    if (t ? !t.endOfTextblock("backward", n) : i.parentOffset > 0)
      return !1;
    s = Lo(i);
  }
  let o = s && s.nodeBefore;
  return !o || !D.isSelectable(o) ? !1 : (e && e(n.tr.setSelection(D.create(n.doc, s.pos - o.nodeSize)).scrollIntoView()), !0);
};
function Lo(n) {
  if (!n.parent.type.spec.isolating)
    for (let e = n.depth - 1; e >= 0; e--) {
      if (n.index(e) > 0)
        return n.doc.resolve(n.before(e + 1));
      if (n.node(e).type.spec.isolating)
        break;
    }
  return null;
}
function nh(n, e) {
  let { $cursor: t } = n.selection;
  return !t || (e ? !e.endOfTextblock("forward", n) : t.parentOffset < t.parent.content.size) ? null : t;
}
const N6 = (n, e, t) => {
  let i = nh(n, t);
  if (!i)
    return !1;
  let r = zo(i);
  if (!r)
    return !1;
  let s = r.nodeAfter;
  if (rh(n, r, e, 1))
    return !0;
  if (i.parent.content.size == 0 && (yn(s, "start") || D.isSelectable(s))) {
    let o = gr(n.doc, i.before(), i.after(), N.empty);
    if (o && o.slice.size < o.to - o.from) {
      if (e) {
        let a = n.tr.step(o);
        a.setSelection(yn(s, "start") ? B.findFrom(a.doc.resolve(a.mapping.map(r.pos)), 1) : D.create(a.doc, a.mapping.map(r.pos))), e(a.scrollIntoView());
      }
      return !0;
    }
  }
  return s.isAtom && r.depth == i.depth - 1 ? (e && e(n.tr.delete(r.pos, r.pos + s.nodeSize).scrollIntoView()), !0) : !1;
}, E6 = (n, e, t) => {
  let { $head: i, empty: r } = n.selection, s = i;
  if (!r)
    return !1;
  if (i.parent.isTextblock) {
    if (t ? !t.endOfTextblock("forward", n) : i.parentOffset < i.parent.content.size)
      return !1;
    s = zo(i);
  }
  let o = s && s.nodeAfter;
  return !o || !D.isSelectable(o) ? !1 : (e && e(n.tr.setSelection(D.create(n.doc, s.pos)).scrollIntoView()), !0);
};
function zo(n) {
  if (!n.parent.type.spec.isolating)
    for (let e = n.depth - 1; e >= 0; e--) {
      let t = n.node(e);
      if (n.index(e) + 1 < t.childCount)
        return n.doc.resolve(n.after(e + 1));
      if (t.type.spec.isolating)
        break;
    }
  return null;
}
const A6 = (n, e) => {
  let t = n.selection, i = t instanceof D, r;
  if (i) {
    if (t.node.isTextblock || !Xt(n.doc, t.from))
      return !1;
    r = t.from;
  } else if (r = mr(n.doc, t.from, -1), r == null)
    return !1;
  if (e) {
    let s = n.tr.join(r);
    i && s.setSelection(D.create(s.doc, r - n.doc.resolve(r).nodeBefore.nodeSize)), e(s.scrollIntoView());
  }
  return !0;
}, I6 = (n, e) => {
  let t = n.selection, i;
  if (t instanceof D) {
    if (t.node.isTextblock || !Xt(n.doc, t.to))
      return !1;
    i = t.to;
  } else if (i = mr(n.doc, t.to, 1), i == null)
    return !1;
  return e && e(n.tr.join(i).scrollIntoView()), !0;
}, O6 = (n, e) => {
  let { $from: t, $to: i } = n.selection, r = t.blockRange(i), s = r && Mn(r);
  return s == null ? !1 : (e && e(n.tr.lift(r, s).scrollIntoView()), !0);
}, D6 = (n, e) => {
  let { $head: t, $anchor: i } = n.selection;
  return !t.parent.type.spec.code || !t.sameParent(i) ? !1 : (e && e(n.tr.insertText("\n").scrollIntoView()), !0);
};
function ih(n) {
  for (let e = 0; e < n.edgeCount; e++) {
    let { type: t } = n.edge(e);
    if (t.isTextblock && !t.hasRequiredAttrs())
      return t;
  }
  return null;
}
const $6 = (n, e) => {
  let { $head: t, $anchor: i } = n.selection;
  if (!t.parent.type.spec.code || !t.sameParent(i))
    return !1;
  let r = t.node(-1), s = t.indexAfter(-1), o = ih(r.contentMatchAt(s));
  if (!o || !r.canReplaceWith(s, s, o))
    return !1;
  if (e) {
    let a = t.after(), l = n.tr.replaceWith(a, a, o.createAndFill());
    l.setSelection(B.near(l.doc.resolve(a), 1)), e(l.scrollIntoView());
  }
  return !0;
}, R6 = (n, e) => {
  let t = n.selection, { $from: i, $to: r } = t;
  if (t instanceof Ve || i.parent.inlineContent || r.parent.inlineContent)
    return !1;
  let s = ih(r.parent.contentMatchAt(r.indexAfter()));
  if (!s || !s.isTextblock)
    return !1;
  if (e) {
    let o = (!i.parentOffset && r.index() < r.parent.childCount ? i : r).pos, a = n.tr.insert(o, s.createAndFill());
    a.setSelection(z.create(a.doc, o + 1)), e(a.scrollIntoView());
  }
  return !0;
}, P6 = (n, e) => {
  let { $cursor: t } = n.selection;
  if (!t || t.parent.content.size)
    return !1;
  if (t.depth > 1 && t.after() != t.end(-1)) {
    let s = t.before();
    if (hn(n.doc, s))
      return e && e(n.tr.split(s).scrollIntoView()), !0;
  }
  let i = t.blockRange(), r = i && Mn(i);
  return r == null ? !1 : (e && e(n.tr.lift(i, r).scrollIntoView()), !0);
}, L6 = (n, e) => {
  let { $from: t, to: i } = n.selection, r, s = t.sharedDepth(i);
  return s == 0 ? !1 : (r = t.before(s), e && e(n.tr.setSelection(D.create(n.doc, r))), !0);
};
function z6(n, e, t) {
  let i = e.nodeBefore, r = e.nodeAfter, s = e.index();
  return !i || !r || !i.type.compatibleContent(r.type) ? !1 : !i.content.size && e.parent.canReplace(s - 1, s) ? (t && t(n.tr.delete(e.pos - i.nodeSize, e.pos).scrollIntoView()), !0) : !e.parent.canReplace(s, s + 1) || !(r.isTextblock || Xt(n.doc, e.pos)) ? !1 : (t && t(n.tr.join(e.pos).scrollIntoView()), !0);
}
function rh(n, e, t, i) {
  let r = e.nodeBefore, s = e.nodeAfter, o, a, l = r.type.spec.isolating || s.type.spec.isolating;
  if (!l && z6(n, e, t))
    return !0;
  let c = !l && e.parent.canReplace(e.index(), e.index() + 1);
  if (c && (o = (a = r.contentMatchAt(r.childCount)).findWrapping(s.type)) && a.matchType(o[0] || s.type).validEnd) {
    if (t) {
      let p = e.pos + s.nodeSize, m = T.empty;
      for (let g = o.length - 1; g >= 0; g--)
        m = T.from(o[g].create(null, m));
      m = T.from(r.copy(m));
      let v = n.tr.step(new de(e.pos - 1, p, e.pos, p, new N(m, 1, 0), o.length, !0)), y = v.doc.resolve(p + 2 * o.length);
      y.nodeAfter && y.nodeAfter.type == r.type && Xt(v.doc, y.pos) && v.join(y.pos), t(v.scrollIntoView());
    }
    return !0;
  }
  let u = s.type.spec.isolating || i > 0 && l ? null : B.findFrom(e, 1), d = u && u.$from.blockRange(u.$to), f = d && Mn(d);
  if (f != null && f >= e.depth)
    return t && t(n.tr.lift(d, f).scrollIntoView()), !0;
  if (c && yn(s, "start", !0) && yn(r, "end")) {
    let p = r, m = [];
    for (; m.push(p), !p.isTextblock; )
      p = p.lastChild;
    let v = s, y = 1;
    for (; !v.isTextblock; v = v.firstChild)
      y++;
    if (p.canReplace(p.childCount, p.childCount, v.content)) {
      if (t) {
        let g = T.empty;
        for (let w = m.length - 1; w >= 0; w--)
          g = T.from(m[w].copy(g));
        let b = n.tr.step(new de(e.pos - m.length, e.pos + s.nodeSize, e.pos + y, e.pos + s.nodeSize - y, new N(g, m.length, 0), 0, !0));
        t(b.scrollIntoView());
      }
      return !0;
    }
  }
  return !1;
}
function sh(n) {
  return function(e, t) {
    let i = e.selection, r = n < 0 ? i.$from : i.$to, s = r.depth;
    for (; r.node(s).isInline; ) {
      if (!s)
        return !1;
      s--;
    }
    return r.node(s).isTextblock ? (t && t(e.tr.setSelection(z.create(e.doc, n < 0 ? r.start(s) : r.end(s)))), !0) : !1;
  };
}
const B6 = sh(-1), F6 = sh(1);
function V6(n, e = null) {
  return function(t, i) {
    let { $from: r, $to: s } = t.selection, o = r.blockRange(s), a = o && Hd(o, n, e);
    return a ? (i && i(t.tr.wrap(o, a).scrollIntoView()), !0) : !1;
  };
}
function $l(n, e = null) {
  return function(t, i) {
    let r = !1;
    for (let s = 0; s < t.selection.ranges.length && !r; s++) {
      let { $from: { pos: o }, $to: { pos: a } } = t.selection.ranges[s];
      t.doc.nodesBetween(o, a, (l, c) => {
        if (r)
          return !1;
        if (!(!l.isTextblock || l.hasMarkup(n, e)))
          if (l.type == n)
            r = !0;
          else {
            let u = t.doc.resolve(c), d = u.index();
            r = u.parent.canReplaceWith(d, d + 1, n);
          }
      });
    }
    if (!r)
      return !1;
    if (i) {
      let s = t.tr;
      for (let o = 0; o < t.selection.ranges.length; o++) {
        let { $from: { pos: a }, $to: { pos: l } } = t.selection.ranges[o];
        s.setBlockType(a, l, n, e);
      }
      i(s.scrollIntoView());
    }
    return !0;
  };
}
typeof navigator < "u" ? /Mac|iP(hone|[oa]d)/.test(navigator.platform) : typeof os < "u" && os.platform && os.platform() == "darwin";
function H6(n, e = null) {
  return function(t, i) {
    let { $from: r, $to: s } = t.selection, o = r.blockRange(s);
    if (!o)
      return !1;
    let a = i ? t.tr : null;
    return j6(a, o, n, e) ? (i && i(a.scrollIntoView()), !0) : !1;
  };
}
function j6(n, e, t, i = null) {
  let r = !1, s = e, o = e.$from.doc;
  if (e.depth >= 2 && e.$from.node(e.depth - 1).type.compatibleContent(t) && e.startIndex == 0) {
    if (e.$from.index(e.depth - 1) == 0)
      return !1;
    let l = o.resolve(e.start - 2);
    s = new Ji(l, l, e.depth), e.endIndex < e.parent.childCount && (e = new Ji(e.$from, o.resolve(e.$to.end(e.depth)), e.depth)), r = !0;
  }
  let a = Hd(s, t, i, e);
  return a ? (n && W6(n, e, a, r, t), !0) : !1;
}
function W6(n, e, t, i, r) {
  let s = T.empty;
  for (let u = t.length - 1; u >= 0; u--)
    s = T.from(t[u].type.create(t[u].attrs, s));
  n.step(new de(e.start - (i ? 2 : 0), e.end, e.start, e.end, new N(s, 0, 0), t.length, !0));
  let o = 0;
  for (let u = 0; u < t.length; u++)
    t[u].type == r && (o = u + 1);
  let a = t.length - o, l = e.start + t.length - (i ? 2 : 0), c = e.parent;
  for (let u = e.startIndex, d = e.endIndex, f = !0; u < d; u++, f = !1)
    !f && hn(n.doc, l, a) && (n.split(l, a), l += 2 * a), l += c.child(u).nodeSize;
  return n;
}
function U6(n) {
  return function(e, t) {
    let { $from: i, $to: r } = e.selection, s = i.blockRange(r, (o) => o.childCount > 0 && o.firstChild.type == n);
    return s ? t ? i.node(s.depth - 1).type == n ? q6(e, t, n, s) : K6(e, t, s) : !0 : !1;
  };
}
function q6(n, e, t, i) {
  let r = n.tr, s = i.end, o = i.$to.end(i.depth);
  s < o && (r.step(new de(s - 1, o, s, o, new N(T.from(t.create(null, i.parent.copy())), 1, 0), 1, !0)), i = new Ji(r.doc.resolve(i.$from.pos), r.doc.resolve(o), i.depth));
  const a = Mn(i);
  if (a == null)
    return !1;
  r.lift(i, a);
  let l = r.doc.resolve(r.mapping.map(s, -1) - 1);
  return Xt(r.doc, l.pos) && l.nodeBefore.type == l.nodeAfter.type && r.join(l.pos), e(r.scrollIntoView()), !0;
}
function K6(n, e, t) {
  let i = n.tr, r = t.parent;
  for (let p = t.end, m = t.endIndex - 1, v = t.startIndex; m > v; m--)
    p -= r.child(m).nodeSize, i.delete(p - 1, p + 1);
  let s = i.doc.resolve(t.start), o = s.nodeAfter;
  if (i.mapping.map(t.end) != t.start + s.nodeAfter.nodeSize)
    return !1;
  let a = t.startIndex == 0, l = t.endIndex == r.childCount, c = s.node(-1), u = s.index(-1);
  if (!c.canReplace(u + (a ? 0 : 1), u + 1, o.content.append(l ? T.empty : T.from(r))))
    return !1;
  let d = s.pos, f = d + o.nodeSize;
  return i.step(new de(d - (a ? 1 : 0), f + (l ? 1 : 0), d + 1, f - 1, new N((a ? T.empty : T.from(r.copy(T.empty))).append(l ? T.empty : T.from(r.copy(T.empty))), a ? 0 : 1, l ? 0 : 1), a ? 0 : 1)), e(i.scrollIntoView()), !0;
}
function J6(n) {
  return function(e, t) {
    let { $from: i, $to: r } = e.selection, s = i.blockRange(r, (c) => c.childCount > 0 && c.firstChild.type == n);
    if (!s)
      return !1;
    let o = s.startIndex;
    if (o == 0)
      return !1;
    let a = s.parent, l = a.child(o - 1);
    if (l.type != n)
      return !1;
    if (t) {
      let c = l.lastChild && l.lastChild.type == a.type, u = T.from(c ? n.create() : null), d = new N(T.from(n.create(null, T.from(a.type.create(null, u)))), c ? 3 : 1, 0), f = s.start, p = s.end;
      t(e.tr.step(new de(f - (c ? 3 : 1), p, f, p, d, 1, !0)).scrollIntoView());
    }
    return !0;
  };
}
const me = function(n) {
  for (var e = 0; ; e++)
    if (n = n.previousSibling, !n)
      return e;
}, bn = function(n) {
  let e = n.assignedSlot || n.parentNode;
  return e && e.nodeType == 11 ? e.host : e;
};
let Us = null;
const rt = function(n, e, t) {
  let i = Us || (Us = document.createRange());
  return i.setEnd(n, t == null ? n.nodeValue.length : t), i.setStart(n, e || 0), i;
}, G6 = function() {
  Us = null;
}, Ut = function(n, e, t, i) {
  return t && (Rl(n, e, t, i, -1) || Rl(n, e, t, i, 1));
}, X6 = /^(img|br|input|textarea|hr)$/i;
function Rl(n, e, t, i, r) {
  for (var s; ; ) {
    if (n == t && e == i)
      return !0;
    if (e == (r < 0 ? 0 : Fe(n))) {
      let o = n.parentNode;
      if (!o || o.nodeType != 1 || ri(n) || X6.test(n.nodeName) || n.contentEditable == "false")
        return !1;
      e = me(n) + (r < 0 ? 0 : 1), n = o;
    } else if (n.nodeType == 1) {
      let o = n.childNodes[e + (r < 0 ? -1 : 0)];
      if (o.nodeType == 1 && o.contentEditable == "false")
        if (!((s = o.pmViewDesc) === null || s === void 0) && s.ignoreForSelection)
          e += r;
        else
          return !1;
      else
        n = o, e = r < 0 ? Fe(n) : 0;
    } else
      return !1;
  }
}
function Fe(n) {
  return n.nodeType == 3 ? n.nodeValue.length : n.childNodes.length;
}
function Y6(n, e) {
  for (; ; ) {
    if (n.nodeType == 3 && e)
      return n;
    if (n.nodeType == 1 && e > 0) {
      if (n.contentEditable == "false")
        return null;
      n = n.childNodes[e - 1], e = Fe(n);
    } else if (n.parentNode && !ri(n))
      e = me(n), n = n.parentNode;
    else
      return null;
  }
}
function Z6(n, e) {
  for (; ; ) {
    if (n.nodeType == 3 && e < n.nodeValue.length)
      return n;
    if (n.nodeType == 1 && e < n.childNodes.length) {
      if (n.contentEditable == "false")
        return null;
      n = n.childNodes[e], e = 0;
    } else if (n.parentNode && !ri(n))
      e = me(n) + 1, n = n.parentNode;
    else
      return null;
  }
}
function Q6(n, e, t) {
  for (let i = e == 0, r = e == Fe(n); i || r; ) {
    if (n == t)
      return !0;
    let s = me(n);
    if (n = n.parentNode, !n)
      return !1;
    i = i && s == 0, r = r && s == Fe(n);
  }
}
function ri(n) {
  let e;
  for (let t = n; t && !(e = t.pmViewDesc); t = t.parentNode)
    ;
  return e && e.node && e.node.isBlock && (e.dom == n || e.contentDOM == n);
}
const yr = function(n) {
  return n.focusNode && Ut(n.focusNode, n.focusOffset, n.anchorNode, n.anchorOffset);
};
function Dt(n, e) {
  let t = document.createEvent("Event");
  return t.initEvent("keydown", !0, !0), t.keyCode = n, t.key = t.code = e, t;
}
function e3(n) {
  let e = n.activeElement;
  for (; e && e.shadowRoot; )
    e = e.shadowRoot.activeElement;
  return e;
}
function t3(n, e, t) {
  if (n.caretPositionFromPoint)
    try {
      let i = n.caretPositionFromPoint(e, t);
      if (i)
        return { node: i.offsetNode, offset: Math.min(Fe(i.offsetNode), i.offset) };
    } catch (i) {
    }
  if (n.caretRangeFromPoint) {
    let i = n.caretRangeFromPoint(e, t);
    if (i)
      return { node: i.startContainer, offset: Math.min(Fe(i.startContainer), i.startOffset) };
  }
}
const et = typeof navigator < "u" ? navigator : null, Pl = typeof document < "u" ? document : null, _t = et && et.userAgent || "", qs = /Edge\/(\d+)/.exec(_t), oh = /MSIE \d/.exec(_t), Ks = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(_t), Oe = !!(oh || Ks || qs), Ct = oh ? document.documentMode : Ks ? +Ks[1] : qs ? +qs[1] : 0, He = !Oe && /gecko\/(\d+)/i.test(_t);
He && +(/Firefox\/(\d+)/.exec(_t) || [0, 0])[1];
const Js = !Oe && /Chrome\/(\d+)/.exec(_t), ue = !!Js, ah = Js ? +Js[1] : 0, xe = !Oe && !!et && /Apple Computer/.test(et.vendor), wn = xe && (/Mobile\/\w+/.test(_t) || !!et && et.maxTouchPoints > 2), Be = wn || (et ? /Mac/.test(et.platform) : !1), lh = et ? /Win/.test(et.platform) : !1, ot = /Android \d/.test(_t), si = !!Pl && "webkitFontSmoothing" in Pl.documentElement.style, n3 = si ? +(/\bAppleWebKit\/(\d+)/.exec(navigator.userAgent) || [0, 0])[1] : 0;
function i3(n) {
  let e = n.defaultView && n.defaultView.visualViewport;
  return e ? {
    left: 0,
    right: e.width,
    top: 0,
    bottom: e.height
  } : {
    left: 0,
    right: n.documentElement.clientWidth,
    top: 0,
    bottom: n.documentElement.clientHeight
  };
}
function it(n, e) {
  return typeof n == "number" ? n : n[e];
}
function r3(n) {
  let e = n.getBoundingClientRect(), t = e.width / n.offsetWidth || 1, i = e.height / n.offsetHeight || 1;
  return {
    left: e.left,
    right: e.left + n.clientWidth * t,
    top: e.top,
    bottom: e.top + n.clientHeight * i
  };
}
function Ll(n, e, t) {
  let i = n.someProp("scrollThreshold") || 0, r = n.someProp("scrollMargin") || 5, s = n.dom.ownerDocument;
  for (let o = t || n.dom; o; ) {
    if (o.nodeType != 1) {
      o = bn(o);
      continue;
    }
    let a = o, l = a == s.body, c = l ? i3(s) : r3(a), u = 0, d = 0;
    if (e.top < c.top + it(i, "top") ? d = -(c.top - e.top + it(r, "top")) : e.bottom > c.bottom - it(i, "bottom") && (d = e.bottom - e.top > c.bottom - c.top ? e.top + it(r, "top") - c.top : e.bottom - c.bottom + it(r, "bottom")), e.left < c.left + it(i, "left") ? u = -(c.left - e.left + it(r, "left")) : e.right > c.right - it(i, "right") && (u = e.right - c.right + it(r, "right")), u || d)
      if (l)
        s.defaultView.scrollBy(u, d);
      else {
        let p = a.scrollLeft, m = a.scrollTop;
        d && (a.scrollTop += d), u && (a.scrollLeft += u);
        let v = a.scrollLeft - p, y = a.scrollTop - m;
        e = { left: e.left - v, top: e.top - y, right: e.right - v, bottom: e.bottom - y };
      }
    let f = l ? "fixed" : getComputedStyle(o).position;
    if (/^(fixed|sticky)$/.test(f))
      break;
    o = f == "absolute" ? o.offsetParent : bn(o);
  }
}
function s3(n) {
  let e = n.dom.getBoundingClientRect(), t = Math.max(0, e.top), i, r;
  for (let s = (e.left + e.right) / 2, o = t + 1; o < Math.min(innerHeight, e.bottom); o += 5) {
    let a = n.root.elementFromPoint(s, o);
    if (!a || a == n.dom || !n.dom.contains(a))
      continue;
    let l = a.getBoundingClientRect();
    if (l.top >= t - 20) {
      i = a, r = l.top;
      break;
    }
  }
  return { refDOM: i, refTop: r, stack: ch(n.dom) };
}
function ch(n) {
  let e = [], t = n.ownerDocument;
  for (let i = n; i && (e.push({ dom: i, top: i.scrollTop, left: i.scrollLeft }), n != t); i = bn(i))
    ;
  return e;
}
function o3({ refDOM: n, refTop: e, stack: t }) {
  let i = n ? n.getBoundingClientRect().top : 0;
  uh(t, i == 0 ? 0 : i - e);
}
function uh(n, e) {
  for (let t = 0; t < n.length; t++) {
    let { dom: i, top: r, left: s } = n[t];
    i.scrollTop != r + e && (i.scrollTop = r + e), i.scrollLeft != s && (i.scrollLeft = s);
  }
}
let en = null;
function a3(n) {
  if (n.setActive)
    return n.setActive();
  if (en)
    return n.focus(en);
  let e = ch(n);
  n.focus(en == null ? {
    get preventScroll() {
      return en = { preventScroll: !0 }, !0;
    }
  } : void 0), en || (en = !1, uh(e, 0));
}
function dh(n, e) {
  let t, i = 2e8, r, s = 0, o = e.top, a = e.top, l, c;
  for (let u = n.firstChild, d = 0; u; u = u.nextSibling, d++) {
    let f;
    if (u.nodeType == 1)
      f = u.getClientRects();
    else if (u.nodeType == 3)
      f = rt(u).getClientRects();
    else
      continue;
    for (let p = 0; p < f.length; p++) {
      let m = f[p];
      if (m.top <= o && m.bottom >= a) {
        o = Math.max(m.bottom, o), a = Math.min(m.top, a);
        let v = m.left > e.left ? m.left - e.left : m.right < e.left ? e.left - m.right : 0;
        if (v < i) {
          t = u, i = v, r = v && t.nodeType == 3 ? {
            left: m.right < e.left ? m.right : m.left,
            top: e.top
          } : e, u.nodeType == 1 && v && (s = d + (e.left >= (m.left + m.right) / 2 ? 1 : 0));
          continue;
        }
      } else
        m.top > e.top && !l && m.left <= e.left && m.right >= e.left && (l = u, c = { left: Math.max(m.left, Math.min(m.right, e.left)), top: m.top });
      !t && (e.left >= m.right && e.top >= m.top || e.left >= m.left && e.top >= m.bottom) && (s = d + 1);
    }
  }
  return !t && l && (t = l, r = c, i = 0), t && t.nodeType == 3 ? l3(t, r) : !t || i && t.nodeType == 1 ? { node: n, offset: s } : dh(t, r);
}
function l3(n, e) {
  let t = n.nodeValue.length, i = document.createRange(), r;
  for (let s = 0; s < t; s++) {
    i.setEnd(n, s + 1), i.setStart(n, s);
    let o = ht(i, 1);
    if (o.top != o.bottom && Bo(e, o)) {
      r = { node: n, offset: s + (e.left >= (o.left + o.right) / 2 ? 1 : 0) };
      break;
    }
  }
  return i.detach(), r || { node: n, offset: 0 };
}
function Bo(n, e) {
  return n.left >= e.left - 1 && n.left <= e.right + 1 && n.top >= e.top - 1 && n.top <= e.bottom + 1;
}
function c3(n, e) {
  let t = n.parentNode;
  return t && /^li$/i.test(t.nodeName) && e.left < n.getBoundingClientRect().left ? t : n;
}
function u3(n, e, t) {
  let { node: i, offset: r } = dh(e, t), s = -1;
  if (i.nodeType == 1 && !i.firstChild) {
    let o = i.getBoundingClientRect();
    s = o.left != o.right && t.left > (o.left + o.right) / 2 ? 1 : -1;
  }
  return n.docView.posFromDOM(i, r, s);
}
function d3(n, e, t, i) {
  let r = -1;
  for (let s = e, o = !1; s != n.dom; ) {
    let a = n.docView.nearestDesc(s, !0), l;
    if (!a)
      return null;
    if (a.dom.nodeType == 1 && (a.node.isBlock && a.parent || !a.contentDOM) && // Ignore elements with zero-size bounding rectangles
    ((l = a.dom.getBoundingClientRect()).width || l.height) && (a.node.isBlock && a.parent && !/^T(R|BODY|HEAD|FOOT)$/.test(a.dom.nodeName) && (!o && l.left > i.left || l.top > i.top ? r = a.posBefore : (!o && l.right < i.left || l.bottom < i.top) && (r = a.posAfter), o = !0), !a.contentDOM && r < 0 && !a.node.isText))
      return (a.node.isBlock ? i.top < (l.top + l.bottom) / 2 : i.left < (l.left + l.right) / 2) ? a.posBefore : a.posAfter;
    s = a.dom.parentNode;
  }
  return r > -1 ? r : n.docView.posFromDOM(e, t, -1);
}
function hh(n, e, t) {
  let i = n.childNodes.length;
  if (i && t.top < t.bottom)
    for (let r = Math.max(0, Math.min(i - 1, Math.floor(i * (e.top - t.top) / (t.bottom - t.top)) - 2)), s = r; ; ) {
      let o = n.childNodes[s];
      if (o.nodeType == 1) {
        let a = o.getClientRects();
        for (let l = 0; l < a.length; l++) {
          let c = a[l];
          if (Bo(e, c))
            return hh(o, e, c);
        }
      }
      if ((s = (s + 1) % i) == r)
        break;
    }
  return n;
}
function h3(n, e) {
  let t = n.dom.ownerDocument, i, r = 0, s = t3(t, e.left, e.top);
  s && ({ node: i, offset: r } = s);
  let o = (n.root.elementFromPoint ? n.root : t).elementFromPoint(e.left, e.top), a;
  if (!o || !n.dom.contains(o.nodeType != 1 ? o.parentNode : o)) {
    let c = n.dom.getBoundingClientRect();
    if (!Bo(e, c) || (o = hh(n.dom, e, c), !o))
      return null;
  }
  if (xe)
    for (let c = o; i && c; c = bn(c))
      c.draggable && (i = void 0);
  if (o = c3(o, e), i) {
    if (He && i.nodeType == 1 && (r = Math.min(r, i.childNodes.length), r < i.childNodes.length)) {
      let u = i.childNodes[r], d;
      u.nodeName == "IMG" && (d = u.getBoundingClientRect()).right <= e.left && d.bottom > e.top && r++;
    }
    let c;
    si && r && i.nodeType == 1 && (c = i.childNodes[r - 1]).nodeType == 1 && c.contentEditable == "false" && c.getBoundingClientRect().top >= e.top && r--, i == n.dom && r == i.childNodes.length - 1 && i.lastChild.nodeType == 1 && e.top > i.lastChild.getBoundingClientRect().bottom ? a = n.state.doc.content.size : (r == 0 || i.nodeType != 1 || i.childNodes[r - 1].nodeName != "BR") && (a = d3(n, i, r, e));
  }
  a == null && (a = u3(n, o, e));
  let l = n.docView.nearestDesc(o, !0);
  return { pos: a, inside: l ? l.posAtStart - l.border : -1 };
}
function zl(n) {
  return n.top < n.bottom || n.left < n.right;
}
function ht(n, e) {
  let t = n.getClientRects();
  if (t.length) {
    let i = t[e < 0 ? 0 : t.length - 1];
    if (zl(i))
      return i;
  }
  return Array.prototype.find.call(t, zl) || n.getBoundingClientRect();
}
const f3 = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/;
function fh(n, e, t) {
  let { node: i, offset: r, atom: s } = n.docView.domFromPos(e, t < 0 ? -1 : 1), o = si || He;
  if (i.nodeType == 3)
    if (o && (f3.test(i.nodeValue) || (t < 0 ? !r : r == i.nodeValue.length))) {
      let l = ht(rt(i, r, r), t);
      if (He && r && /\s/.test(i.nodeValue[r - 1]) && r < i.nodeValue.length) {
        let c = ht(rt(i, r - 1, r - 1), -1);
        if (c.top == l.top) {
          let u = ht(rt(i, r, r + 1), -1);
          if (u.top != l.top)
            return Nn(u, u.left < c.left);
        }
      }
      return l;
    } else {
      let l = r, c = r, u = t < 0 ? 1 : -1;
      return t < 0 && !r ? (c++, u = -1) : t >= 0 && r == i.nodeValue.length ? (l--, u = 1) : t < 0 ? l-- : c++, Nn(ht(rt(i, l, c), u), u < 0);
    }
  if (!n.state.doc.resolve(e - (s || 0)).parent.inlineContent) {
    if (s == null && r && (t < 0 || r == Fe(i))) {
      let l = i.childNodes[r - 1];
      if (l.nodeType == 1)
        return rs(l.getBoundingClientRect(), !1);
    }
    if (s == null && r < Fe(i)) {
      let l = i.childNodes[r];
      if (l.nodeType == 1)
        return rs(l.getBoundingClientRect(), !0);
    }
    return rs(i.getBoundingClientRect(), t >= 0);
  }
  if (s == null && r && (t < 0 || r == Fe(i))) {
    let l = i.childNodes[r - 1], c = l.nodeType == 3 ? rt(l, Fe(l) - (o ? 0 : 1)) : l.nodeType == 1 && (l.nodeName != "BR" || !l.nextSibling) ? l : null;
    if (c)
      return Nn(ht(c, 1), !1);
  }
  if (s == null && r < Fe(i)) {
    let l = i.childNodes[r];
    for (; l.pmViewDesc && l.pmViewDesc.ignoreForCoords; )
      l = l.nextSibling;
    let c = l ? l.nodeType == 3 ? rt(l, 0, o ? 0 : 1) : l.nodeType == 1 ? l : null : null;
    if (c)
      return Nn(ht(c, -1), !0);
  }
  return Nn(ht(i.nodeType == 3 ? rt(i) : i, -t), t >= 0);
}
function Nn(n, e) {
  if (n.width == 0)
    return n;
  let t = e ? n.left : n.right;
  return { top: n.top, bottom: n.bottom, left: t, right: t };
}
function rs(n, e) {
  if (n.height == 0)
    return n;
  let t = e ? n.top : n.bottom;
  return { top: t, bottom: t, left: n.left, right: n.right };
}
function ph(n, e, t) {
  let i = n.state, r = n.root.activeElement;
  i != e && n.updateState(e), r != n.dom && n.focus();
  try {
    return t();
  } finally {
    i != e && n.updateState(i), r != n.dom && r && r.focus();
  }
}
function p3(n, e, t) {
  let i = e.selection, r = t == "up" ? i.$from : i.$to;
  return ph(n, e, () => {
    let { node: s } = n.docView.domFromPos(r.pos, t == "up" ? -1 : 1);
    for (; ; ) {
      let a = n.docView.nearestDesc(s, !0);
      if (!a)
        break;
      if (a.node.isBlock) {
        s = a.contentDOM || a.dom;
        break;
      }
      s = a.dom.parentNode;
    }
    let o = fh(n, r.pos, 1);
    for (let a = s.firstChild; a; a = a.nextSibling) {
      let l;
      if (a.nodeType == 1)
        l = a.getClientRects();
      else if (a.nodeType == 3)
        l = rt(a, 0, a.nodeValue.length).getClientRects();
      else
        continue;
      for (let c = 0; c < l.length; c++) {
        let u = l[c];
        if (u.bottom > u.top + 1 && (t == "up" ? o.top - u.top > (u.bottom - o.top) * 2 : u.bottom - o.bottom > (o.bottom - u.top) * 2))
          return !1;
      }
    }
    return !0;
  });
}
const m3 = /[\u0590-\u08ac]/;
function g3(n, e, t) {
  let { $head: i } = e.selection;
  if (!i.parent.isTextblock)
    return !1;
  let r = i.parentOffset, s = !r, o = r == i.parent.content.size, a = n.domSelection();
  return a ? !m3.test(i.parent.textContent) || !a.modify ? t == "left" || t == "backward" ? s : o : ph(n, e, () => {
    let { focusNode: l, focusOffset: c, anchorNode: u, anchorOffset: d } = n.domSelectionRange(), f = a.caretBidiLevel;
    a.modify("move", t, "character");
    let p = i.depth ? n.docView.domAfterPos(i.before()) : n.dom, { focusNode: m, focusOffset: v } = n.domSelectionRange(), y = m && !p.contains(m.nodeType == 1 ? m : m.parentNode) || l == m && c == v;
    try {
      a.collapse(u, d), l && (l != u || c != d) && a.extend && a.extend(l, c);
    } catch (g) {
    }
    return f != null && (a.caretBidiLevel = f), y;
  }) : i.pos == i.start() || i.pos == i.end();
}
let Bl = null, Fl = null, Vl = !1;
function v3(n, e, t) {
  return Bl == e && Fl == t ? Vl : (Bl = e, Fl = t, Vl = t == "up" || t == "down" ? p3(n, e, t) : g3(n, e, t));
}
const je = 0, Hl = 1, $t = 2, tt = 3;
class oi {
  constructor(e, t, i, r) {
    this.parent = e, this.children = t, this.dom = i, this.contentDOM = r, this.dirty = je, i.pmViewDesc = this;
  }
  // Used to check whether a given description corresponds to a
  // widget/mark/node.
  matchesWidget(e) {
    return !1;
  }
  matchesMark(e) {
    return !1;
  }
  matchesNode(e, t, i) {
    return !1;
  }
  matchesHack(e) {
    return !1;
  }
  // When parsing in-editor content (in domchange.js), we allow
  // descriptions to determine the parse rules that should be used to
  // parse them.
  parseRule() {
    return null;
  }
  // Used by the editor's event handler to ignore events that come
  // from certain descs.
  stopEvent(e) {
    return !1;
  }
  // The size of the content represented by this desc.
  get size() {
    let e = 0;
    for (let t = 0; t < this.children.length; t++)
      e += this.children[t].size;
    return e;
  }
  // For block nodes, this represents the space taken up by their
  // start/end tokens.
  get border() {
    return 0;
  }
  destroy() {
    this.parent = void 0, this.dom.pmViewDesc == this && (this.dom.pmViewDesc = void 0);
    for (let e = 0; e < this.children.length; e++)
      this.children[e].destroy();
  }
  posBeforeChild(e) {
    for (let t = 0, i = this.posAtStart; ; t++) {
      let r = this.children[t];
      if (r == e)
        return i;
      i += r.size;
    }
  }
  get posBefore() {
    return this.parent.posBeforeChild(this);
  }
  get posAtStart() {
    return this.parent ? this.parent.posBeforeChild(this) + this.border : 0;
  }
  get posAfter() {
    return this.posBefore + this.size;
  }
  get posAtEnd() {
    return this.posAtStart + this.size - 2 * this.border;
  }
  localPosFromDOM(e, t, i) {
    if (this.contentDOM && this.contentDOM.contains(e.nodeType == 1 ? e : e.parentNode))
      if (i < 0) {
        let s, o;
        if (e == this.contentDOM)
          s = e.childNodes[t - 1];
        else {
          for (; e.parentNode != this.contentDOM; )
            e = e.parentNode;
          s = e.previousSibling;
        }
        for (; s && !((o = s.pmViewDesc) && o.parent == this); )
          s = s.previousSibling;
        return s ? this.posBeforeChild(o) + o.size : this.posAtStart;
      } else {
        let s, o;
        if (e == this.contentDOM)
          s = e.childNodes[t];
        else {
          for (; e.parentNode != this.contentDOM; )
            e = e.parentNode;
          s = e.nextSibling;
        }
        for (; s && !((o = s.pmViewDesc) && o.parent == this); )
          s = s.nextSibling;
        return s ? this.posBeforeChild(o) : this.posAtEnd;
      }
    let r;
    if (e == this.dom && this.contentDOM)
      r = t > me(this.contentDOM);
    else if (this.contentDOM && this.contentDOM != this.dom && this.dom.contains(this.contentDOM))
      r = e.compareDocumentPosition(this.contentDOM) & 2;
    else if (this.dom.firstChild) {
      if (t == 0)
        for (let s = e; ; s = s.parentNode) {
          if (s == this.dom) {
            r = !1;
            break;
          }
          if (s.previousSibling)
            break;
        }
      if (r == null && t == e.childNodes.length)
        for (let s = e; ; s = s.parentNode) {
          if (s == this.dom) {
            r = !0;
            break;
          }
          if (s.nextSibling)
            break;
        }
    }
    return (r == null ? i > 0 : r) ? this.posAtEnd : this.posAtStart;
  }
  nearestDesc(e, t = !1) {
    for (let i = !0, r = e; r; r = r.parentNode) {
      let s = this.getDesc(r), o;
      if (s && (!t || s.node))
        if (i && (o = s.nodeDOM) && !(o.nodeType == 1 ? o.contains(e.nodeType == 1 ? e : e.parentNode) : o == e))
          i = !1;
        else
          return s;
    }
  }
  getDesc(e) {
    let t = e.pmViewDesc;
    for (let i = t; i; i = i.parent)
      if (i == this)
        return t;
  }
  posFromDOM(e, t, i) {
    for (let r = e; r; r = r.parentNode) {
      let s = this.getDesc(r);
      if (s)
        return s.localPosFromDOM(e, t, i);
    }
    return -1;
  }
  // Find the desc for the node after the given pos, if any. (When a
  // parent node overrode rendering, there might not be one.)
  descAt(e) {
    for (let t = 0, i = 0; t < this.children.length; t++) {
      let r = this.children[t], s = i + r.size;
      if (i == e && s != i) {
        for (; !r.border && r.children.length; )
          for (let o = 0; o < r.children.length; o++) {
            let a = r.children[o];
            if (a.size) {
              r = a;
              break;
            }
          }
        return r;
      }
      if (e < s)
        return r.descAt(e - i - r.border);
      i = s;
    }
  }
  domFromPos(e, t) {
    if (!this.contentDOM)
      return { node: this.dom, offset: 0, atom: e + 1 };
    let i = 0, r = 0;
    for (let s = 0; i < this.children.length; i++) {
      let o = this.children[i], a = s + o.size;
      if (a > e || o instanceof gh) {
        r = e - s;
        break;
      }
      s = a;
    }
    if (r)
      return this.children[i].domFromPos(r - this.children[i].border, t);
    for (let s; i && !(s = this.children[i - 1]).size && s instanceof mh && s.side >= 0; i--)
      ;
    if (t <= 0) {
      let s, o = !0;
      for (; s = i ? this.children[i - 1] : null, !(!s || s.dom.parentNode == this.contentDOM); i--, o = !1)
        ;
      return s && t && o && !s.border && !s.domAtom ? s.domFromPos(s.size, t) : { node: this.contentDOM, offset: s ? me(s.dom) + 1 : 0 };
    } else {
      let s, o = !0;
      for (; s = i < this.children.length ? this.children[i] : null, !(!s || s.dom.parentNode == this.contentDOM); i++, o = !1)
        ;
      return s && o && !s.border && !s.domAtom ? s.domFromPos(0, t) : { node: this.contentDOM, offset: s ? me(s.dom) : this.contentDOM.childNodes.length };
    }
  }
  // Used to find a DOM range in a single parent for a given changed
  // range.
  parseRange(e, t, i = 0) {
    if (this.children.length == 0)
      return { node: this.contentDOM, from: e, to: t, fromOffset: 0, toOffset: this.contentDOM.childNodes.length };
    let r = -1, s = -1;
    for (let o = i, a = 0; ; a++) {
      let l = this.children[a], c = o + l.size;
      if (r == -1 && e <= c) {
        let u = o + l.border;
        if (e >= u && t <= c - l.border && l.node && l.contentDOM && this.contentDOM.contains(l.contentDOM))
          return l.parseRange(e, t, u);
        e = o;
        for (let d = a; d > 0; d--) {
          let f = this.children[d - 1];
          if (f.size && f.dom.parentNode == this.contentDOM && !f.emptyChildAt(1)) {
            r = me(f.dom) + 1;
            break;
          }
          e -= f.size;
        }
        r == -1 && (r = 0);
      }
      if (r > -1 && (c > t || a == this.children.length - 1)) {
        t = c;
        for (let u = a + 1; u < this.children.length; u++) {
          let d = this.children[u];
          if (d.size && d.dom.parentNode == this.contentDOM && !d.emptyChildAt(-1)) {
            s = me(d.dom);
            break;
          }
          t += d.size;
        }
        s == -1 && (s = this.contentDOM.childNodes.length);
        break;
      }
      o = c;
    }
    return { node: this.contentDOM, from: e, to: t, fromOffset: r, toOffset: s };
  }
  emptyChildAt(e) {
    if (this.border || !this.contentDOM || !this.children.length)
      return !1;
    let t = this.children[e < 0 ? 0 : this.children.length - 1];
    return t.size == 0 || t.emptyChildAt(e);
  }
  domAfterPos(e) {
    let { node: t, offset: i } = this.domFromPos(e, 0);
    if (t.nodeType != 1 || i == t.childNodes.length)
      throw new RangeError("No node after pos " + e);
    return t.childNodes[i];
  }
  // View descs are responsible for setting any selection that falls
  // entirely inside of them, so that custom implementations can do
  // custom things with the selection. Note that this falls apart when
  // a selection starts in such a node and ends in another, in which
  // case we just use whatever domFromPos produces as a best effort.
  setSelection(e, t, i, r = !1) {
    let s = Math.min(e, t), o = Math.max(e, t);
    for (let p = 0, m = 0; p < this.children.length; p++) {
      let v = this.children[p], y = m + v.size;
      if (s > m && o < y)
        return v.setSelection(e - m - v.border, t - m - v.border, i, r);
      m = y;
    }
    let a = this.domFromPos(e, e ? -1 : 1), l = t == e ? a : this.domFromPos(t, t ? -1 : 1), c = i.root.getSelection(), u = i.domSelectionRange(), d = !1;
    if ((He || xe) && e == t) {
      let { node: p, offset: m } = a;
      if (p.nodeType == 3) {
        if (d = !!(m && p.nodeValue[m - 1] == "\n"), d && m == p.nodeValue.length)
          for (let v = p, y; v; v = v.parentNode) {
            if (y = v.nextSibling) {
              y.nodeName == "BR" && (a = l = { node: y.parentNode, offset: me(y) + 1 });
              break;
            }
            let g = v.pmViewDesc;
            if (g && g.node && g.node.isBlock)
              break;
          }
      } else {
        let v = p.childNodes[m - 1];
        d = v && (v.nodeName == "BR" || v.contentEditable == "false");
      }
    }
    if (He && u.focusNode && u.focusNode != l.node && u.focusNode.nodeType == 1) {
      let p = u.focusNode.childNodes[u.focusOffset];
      p && p.contentEditable == "false" && (r = !0);
    }
    if (!(r || d && xe) && Ut(a.node, a.offset, u.anchorNode, u.anchorOffset) && Ut(l.node, l.offset, u.focusNode, u.focusOffset))
      return;
    let f = !1;
    if ((c.extend || e == t) && !(d && He)) {
      c.collapse(a.node, a.offset);
      try {
        e != t && c.extend(l.node, l.offset), f = !0;
      } catch (p) {
      }
    }
    if (!f) {
      if (e > t) {
        let m = a;
        a = l, l = m;
      }
      let p = document.createRange();
      p.setEnd(l.node, l.offset), p.setStart(a.node, a.offset), c.removeAllRanges(), c.addRange(p);
    }
  }
  ignoreMutation(e) {
    return !this.contentDOM && e.type != "selection";
  }
  get contentLost() {
    return this.contentDOM && this.contentDOM != this.dom && !this.dom.contains(this.contentDOM);
  }
  // Remove a subtree of the element tree that has been touched
  // by a DOM change, so that the next update will redraw it.
  markDirty(e, t) {
    for (let i = 0, r = 0; r < this.children.length; r++) {
      let s = this.children[r], o = i + s.size;
      if (i == o ? e <= o && t >= i : e < o && t > i) {
        let a = i + s.border, l = o - s.border;
        if (e >= a && t <= l) {
          this.dirty = e == i || t == o ? $t : Hl, e == a && t == l && (s.contentLost || s.dom.parentNode != this.contentDOM) ? s.dirty = tt : s.markDirty(e - a, t - a);
          return;
        } else
          s.dirty = s.dom == s.contentDOM && s.dom.parentNode == this.contentDOM && !s.children.length ? $t : tt;
      }
      i = o;
    }
    this.dirty = $t;
  }
  markParentsDirty() {
    let e = 1;
    for (let t = this.parent; t; t = t.parent, e++) {
      let i = e == 1 ? $t : Hl;
      t.dirty < i && (t.dirty = i);
    }
  }
  get domAtom() {
    return !1;
  }
  get ignoreForCoords() {
    return !1;
  }
  get ignoreForSelection() {
    return !1;
  }
  isText(e) {
    return !1;
  }
}
class mh extends oi {
  constructor(e, t, i, r) {
    let s, o = t.type.toDOM;
    if (typeof o == "function" && (o = o(i, () => {
      if (!s)
        return r;
      if (s.parent)
        return s.parent.posBeforeChild(s);
    })), !t.type.spec.raw) {
      if (o.nodeType != 1) {
        let a = document.createElement("span");
        a.appendChild(o), o = a;
      }
      o.contentEditable = "false", o.classList.add("ProseMirror-widget");
    }
    super(e, [], o, null), this.widget = t, this.widget = t, s = this;
  }
  matchesWidget(e) {
    return this.dirty == je && e.type.eq(this.widget.type);
  }
  parseRule() {
    return { ignore: !0 };
  }
  stopEvent(e) {
    let t = this.widget.spec.stopEvent;
    return t ? t(e) : !1;
  }
  ignoreMutation(e) {
    return e.type != "selection" || this.widget.spec.ignoreSelection;
  }
  destroy() {
    this.widget.type.destroy(this.dom), super.destroy();
  }
  get domAtom() {
    return !0;
  }
  get ignoreForSelection() {
    return !!this.widget.type.spec.relaxedSide;
  }
  get side() {
    return this.widget.type.side;
  }
}
class y3 extends oi {
  constructor(e, t, i, r) {
    super(e, [], t, null), this.textDOM = i, this.text = r;
  }
  get size() {
    return this.text.length;
  }
  localPosFromDOM(e, t) {
    return e != this.textDOM ? this.posAtStart + (t ? this.size : 0) : this.posAtStart + t;
  }
  domFromPos(e) {
    return { node: this.textDOM, offset: e };
  }
  ignoreMutation(e) {
    return e.type === "characterData" && e.target.nodeValue == e.oldValue;
  }
}
class qt extends oi {
  constructor(e, t, i, r, s) {
    super(e, [], i, r), this.mark = t, this.spec = s;
  }
  static create(e, t, i, r) {
    let s = r.nodeViews[t.type.name], o = s && s(t, r, i);
    return (!o || !o.dom) && (o = Gt.renderSpec(document, t.type.spec.toDOM(t, i), null, t.attrs)), new qt(e, t, o.dom, o.contentDOM || o.dom, o);
  }
  parseRule() {
    return this.dirty & tt || this.mark.type.spec.reparseInView ? null : { mark: this.mark.type.name, attrs: this.mark.attrs, contentElement: this.contentDOM };
  }
  matchesMark(e) {
    return this.dirty != tt && this.mark.eq(e);
  }
  markDirty(e, t) {
    if (super.markDirty(e, t), this.dirty != je) {
      let i = this.parent;
      for (; !i.node; )
        i = i.parent;
      i.dirty < this.dirty && (i.dirty = this.dirty), this.dirty = je;
    }
  }
  slice(e, t, i) {
    let r = qt.create(this.parent, this.mark, !0, i), s = this.children, o = this.size;
    t < o && (s = Xs(s, t, o, i)), e > 0 && (s = Xs(s, 0, e, i));
    for (let a = 0; a < s.length; a++)
      s[a].parent = r;
    return r.children = s, r;
  }
  ignoreMutation(e) {
    return this.spec.ignoreMutation ? this.spec.ignoreMutation(e) : super.ignoreMutation(e);
  }
  destroy() {
    this.spec.destroy && this.spec.destroy(), super.destroy();
  }
}
class kt extends oi {
  constructor(e, t, i, r, s, o, a, l, c) {
    super(e, [], s, o), this.node = t, this.outerDeco = i, this.innerDeco = r, this.nodeDOM = a;
  }
  // By default, a node is rendered using the `toDOM` method from the
  // node type spec. But client code can use the `nodeViews` spec to
  // supply a custom node view, which can influence various aspects of
  // the way the node works.
  //
  // (Using subclassing for this was intentionally decided against,
  // since it'd require exposing a whole slew of finicky
  // implementation details to the user code that they probably will
  // never need.)
  static create(e, t, i, r, s, o) {
    let a = s.nodeViews[t.type.name], l, c = a && a(t, s, () => {
      if (!l)
        return o;
      if (l.parent)
        return l.parent.posBeforeChild(l);
    }, i, r), u = c && c.dom, d = c && c.contentDOM;
    if (t.isText) {
      if (!u)
        u = document.createTextNode(t.text);
      else if (u.nodeType != 3)
        throw new RangeError("Text must be rendered as a DOM text node");
    } else
      u || ({ dom: u, contentDOM: d } = Gt.renderSpec(document, t.type.spec.toDOM(t), null, t.attrs));
    !d && !t.isText && u.nodeName != "BR" && (u.hasAttribute("contenteditable") || (u.contentEditable = "false"), t.type.spec.draggable && (u.draggable = !0));
    let f = u;
    return u = bh(u, i, t), c ? l = new b3(e, t, i, r, u, d || null, f, c, s, o + 1) : t.isText ? new br(e, t, i, r, u, f, s) : new kt(e, t, i, r, u, d || null, f, s, o + 1);
  }
  parseRule() {
    if (this.node.type.spec.reparseInView)
      return null;
    let e = { node: this.node.type.name, attrs: this.node.attrs };
    if (this.node.type.whitespace == "pre" && (e.preserveWhitespace = "full"), !this.contentDOM)
      e.getContent = () => this.node.content;
    else if (!this.contentLost)
      e.contentElement = this.contentDOM;
    else {
      for (let t = this.children.length - 1; t >= 0; t--) {
        let i = this.children[t];
        if (this.dom.contains(i.dom.parentNode)) {
          e.contentElement = i.dom.parentNode;
          break;
        }
      }
      e.contentElement || (e.getContent = () => T.empty);
    }
    return e;
  }
  matchesNode(e, t, i) {
    return this.dirty == je && e.eq(this.node) && Xi(t, this.outerDeco) && i.eq(this.innerDeco);
  }
  get size() {
    return this.node.nodeSize;
  }
  get border() {
    return this.node.isLeaf ? 0 : 1;
  }
  // Syncs `this.children` to match `this.node.content` and the local
  // decorations, possibly introducing nesting for marks. Then, in a
  // separate step, syncs the DOM inside `this.contentDOM` to
  // `this.children`.
  updateChildren(e, t) {
    let i = this.node.inlineContent, r = t, s = e.composing ? this.localCompositionInfo(e, t) : null, o = s && s.pos > -1 ? s : null, a = s && s.pos < 0, l = new C3(this, o && o.node, e);
    S3(this.node, this.innerDeco, (c, u, d) => {
      c.spec.marks ? l.syncToMarks(c.spec.marks, i, e) : c.type.side >= 0 && !d && l.syncToMarks(u == this.node.childCount ? J.none : this.node.child(u).marks, i, e), l.placeWidget(c, e, r);
    }, (c, u, d, f) => {
      l.syncToMarks(c.marks, i, e);
      let p;
      l.findNodeMatch(c, u, d, f) || a && e.state.selection.from > r && e.state.selection.to < r + c.nodeSize && (p = l.findIndexWithChild(s.node)) > -1 && l.updateNodeAt(c, u, d, p, e) || l.updateNextNode(c, u, d, e, f, r) || l.addNode(c, u, d, e, r), r += c.nodeSize;
    }), l.syncToMarks([], i, e), this.node.isTextblock && l.addTextblockHacks(), l.destroyRest(), (l.changed || this.dirty == $t) && (o && this.protectLocalComposition(e, o), vh(this.contentDOM, this.children, e), wn && T3(this.dom));
  }
  localCompositionInfo(e, t) {
    let { from: i, to: r } = e.state.selection;
    if (!(e.state.selection instanceof z) || i < t || r > t + this.node.content.size)
      return null;
    let s = e.input.compositionNode;
    if (!s || !this.dom.contains(s.parentNode))
      return null;
    if (this.node.inlineContent) {
      let o = s.nodeValue, a = M3(this.node.content, o, i - t, r - t);
      return a < 0 ? null : { node: s, pos: a, text: o };
    } else
      return { node: s, pos: -1, text: "" };
  }
  protectLocalComposition(e, { node: t, pos: i, text: r }) {
    if (this.getDesc(t))
      return;
    let s = t;
    for (; s.parentNode != this.contentDOM; s = s.parentNode) {
      for (; s.previousSibling; )
        s.parentNode.removeChild(s.previousSibling);
      for (; s.nextSibling; )
        s.parentNode.removeChild(s.nextSibling);
      s.pmViewDesc && (s.pmViewDesc = void 0);
    }
    let o = new y3(this, s, t, r);
    e.input.compositionNodes.push(o), this.children = Xs(this.children, i, i + r.length, e, o);
  }
  // If this desc must be updated to match the given node decoration,
  // do so and return true.
  update(e, t, i, r) {
    return this.dirty == tt || !e.sameMarkup(this.node) ? !1 : (this.updateInner(e, t, i, r), !0);
  }
  updateInner(e, t, i, r) {
    this.updateOuterDeco(t), this.node = e, this.innerDeco = i, this.contentDOM && this.updateChildren(r, this.posAtStart), this.dirty = je;
  }
  updateOuterDeco(e) {
    if (Xi(e, this.outerDeco))
      return;
    let t = this.nodeDOM.nodeType != 1, i = this.dom;
    this.dom = yh(this.dom, this.nodeDOM, Gs(this.outerDeco, this.node, t), Gs(e, this.node, t)), this.dom != i && (i.pmViewDesc = void 0, this.dom.pmViewDesc = this), this.outerDeco = e;
  }
  // Mark this node as being the selected node.
  selectNode() {
    this.nodeDOM.nodeType == 1 && (this.nodeDOM.classList.add("ProseMirror-selectednode"), (this.contentDOM || !this.node.type.spec.draggable) && (this.nodeDOM.draggable = !0));
  }
  // Remove selected node marking from this node.
  deselectNode() {
    this.nodeDOM.nodeType == 1 && (this.nodeDOM.classList.remove("ProseMirror-selectednode"), (this.contentDOM || !this.node.type.spec.draggable) && this.nodeDOM.removeAttribute("draggable"));
  }
  get domAtom() {
    return this.node.isAtom;
  }
}
function jl(n, e, t, i, r) {
  bh(i, e, n);
  let s = new kt(void 0, n, e, t, i, i, i, r, 0);
  return s.contentDOM && s.updateChildren(r, 0), s;
}
class br extends kt {
  constructor(e, t, i, r, s, o, a) {
    super(e, t, i, r, s, null, o, a, 0);
  }
  parseRule() {
    let e = this.nodeDOM.parentNode;
    for (; e && e != this.dom && !e.pmIsDeco; )
      e = e.parentNode;
    return { skip: e || !0 };
  }
  update(e, t, i, r) {
    return this.dirty == tt || this.dirty != je && !this.inParent() || !e.sameMarkup(this.node) ? !1 : (this.updateOuterDeco(t), (this.dirty != je || e.text != this.node.text) && e.text != this.nodeDOM.nodeValue && (this.nodeDOM.nodeValue = e.text, r.trackWrites == this.nodeDOM && (r.trackWrites = null)), this.node = e, this.dirty = je, !0);
  }
  inParent() {
    let e = this.parent.contentDOM;
    for (let t = this.nodeDOM; t; t = t.parentNode)
      if (t == e)
        return !0;
    return !1;
  }
  domFromPos(e) {
    return { node: this.nodeDOM, offset: e };
  }
  localPosFromDOM(e, t, i) {
    return e == this.nodeDOM ? this.posAtStart + Math.min(t, this.node.text.length) : super.localPosFromDOM(e, t, i);
  }
  ignoreMutation(e) {
    return e.type != "characterData" && e.type != "selection";
  }
  slice(e, t, i) {
    let r = this.node.cut(e, t), s = document.createTextNode(r.text);
    return new br(this.parent, r, this.outerDeco, this.innerDeco, s, s, i);
  }
  markDirty(e, t) {
    super.markDirty(e, t), this.dom != this.nodeDOM && (e == 0 || t == this.nodeDOM.nodeValue.length) && (this.dirty = tt);
  }
  get domAtom() {
    return !1;
  }
  isText(e) {
    return this.node.text == e;
  }
}
class gh extends oi {
  parseRule() {
    return { ignore: !0 };
  }
  matchesHack(e) {
    return this.dirty == je && this.dom.nodeName == e;
  }
  get domAtom() {
    return !0;
  }
  get ignoreForCoords() {
    return this.dom.nodeName == "IMG";
  }
}
class b3 extends kt {
  constructor(e, t, i, r, s, o, a, l, c, u) {
    super(e, t, i, r, s, o, a, c, u), this.spec = l;
  }
  // A custom `update` method gets to decide whether the update goes
  // through. If it does, and there's a `contentDOM` node, our logic
  // updates the children.
  update(e, t, i, r) {
    if (this.dirty == tt)
      return !1;
    if (this.spec.update && (this.node.type == e.type || this.spec.multiType)) {
      let s = this.spec.update(e, t, i);
      return s && this.updateInner(e, t, i, r), s;
    } else
      return !this.contentDOM && !e.isLeaf ? !1 : super.update(e, t, i, r);
  }
  selectNode() {
    this.spec.selectNode ? this.spec.selectNode() : super.selectNode();
  }
  deselectNode() {
    this.spec.deselectNode ? this.spec.deselectNode() : super.deselectNode();
  }
  setSelection(e, t, i, r) {
    this.spec.setSelection ? this.spec.setSelection(e, t, i.root) : super.setSelection(e, t, i, r);
  }
  destroy() {
    this.spec.destroy && this.spec.destroy(), super.destroy();
  }
  stopEvent(e) {
    return this.spec.stopEvent ? this.spec.stopEvent(e) : !1;
  }
  ignoreMutation(e) {
    return this.spec.ignoreMutation ? this.spec.ignoreMutation(e) : super.ignoreMutation(e);
  }
}
function vh(n, e, t) {
  let i = n.firstChild, r = !1;
  for (let s = 0; s < e.length; s++) {
    let o = e[s], a = o.dom;
    if (a.parentNode == n) {
      for (; a != i; )
        i = Wl(i), r = !0;
      i = i.nextSibling;
    } else
      r = !0, n.insertBefore(a, i);
    if (o instanceof qt) {
      let l = i ? i.previousSibling : n.lastChild;
      vh(o.contentDOM, o.children, t), i = l ? l.nextSibling : n.firstChild;
    }
  }
  for (; i; )
    i = Wl(i), r = !0;
  r && t.trackWrites == n && (t.trackWrites = null);
}
const Ln = function(n) {
  n && (this.nodeName = n);
};
Ln.prototype = /* @__PURE__ */ Object.create(null);
const Rt = [new Ln()];
function Gs(n, e, t) {
  if (n.length == 0)
    return Rt;
  let i = t ? Rt[0] : new Ln(), r = [i];
  for (let s = 0; s < n.length; s++) {
    let o = n[s].type.attrs;
    if (o) {
      o.nodeName && r.push(i = new Ln(o.nodeName));
      for (let a in o) {
        let l = o[a];
        l != null && (t && r.length == 1 && r.push(i = new Ln(e.isInline ? "span" : "div")), a == "class" ? i.class = (i.class ? i.class + " " : "") + l : a == "style" ? i.style = (i.style ? i.style + ";" : "") + l : a != "nodeName" && (i[a] = l));
      }
    }
  }
  return r;
}
function yh(n, e, t, i) {
  if (t == Rt && i == Rt)
    return e;
  let r = e;
  for (let s = 0; s < i.length; s++) {
    let o = i[s], a = t[s];
    if (s) {
      let l;
      a && a.nodeName == o.nodeName && r != n && (l = r.parentNode) && l.nodeName.toLowerCase() == o.nodeName || (l = document.createElement(o.nodeName), l.pmIsDeco = !0, l.appendChild(r), a = Rt[0]), r = l;
    }
    w3(r, a || Rt[0], o);
  }
  return r;
}
function w3(n, e, t) {
  for (let i in e)
    i != "class" && i != "style" && i != "nodeName" && !(i in t) && n.removeAttribute(i);
  for (let i in t)
    i != "class" && i != "style" && i != "nodeName" && t[i] != e[i] && n.setAttribute(i, t[i]);
  if (e.class != t.class) {
    let i = e.class ? e.class.split(" ").filter(Boolean) : [], r = t.class ? t.class.split(" ").filter(Boolean) : [];
    for (let s = 0; s < i.length; s++)
      r.indexOf(i[s]) == -1 && n.classList.remove(i[s]);
    for (let s = 0; s < r.length; s++)
      i.indexOf(r[s]) == -1 && n.classList.add(r[s]);
    n.classList.length == 0 && n.removeAttribute("class");
  }
  if (e.style != t.style) {
    if (e.style) {
      let i = /\s*([\w\-\xa1-\uffff]+)\s*:(?:"(?:\\.|[^"])*"|'(?:\\.|[^'])*'|\(.*?\)|[^;])*/g, r;
      for (; r = i.exec(e.style); )
        n.style.removeProperty(r[1]);
    }
    t.style && (n.style.cssText += t.style);
  }
}
function bh(n, e, t) {
  return yh(n, n, Rt, Gs(e, t, n.nodeType != 1));
}
function Xi(n, e) {
  if (n.length != e.length)
    return !1;
  for (let t = 0; t < n.length; t++)
    if (!n[t].type.eq(e[t].type))
      return !1;
  return !0;
}
function Wl(n) {
  let e = n.nextSibling;
  return n.parentNode.removeChild(n), e;
}
class C3 {
  constructor(e, t, i) {
    this.lock = t, this.view = i, this.index = 0, this.stack = [], this.changed = !1, this.top = e, this.preMatch = k3(e.node.content, e);
  }
  // Destroy and remove the children between the given indices in
  // `this.top`.
  destroyBetween(e, t) {
    if (e != t) {
      for (let i = e; i < t; i++)
        this.top.children[i].destroy();
      this.top.children.splice(e, t - e), this.changed = !0;
    }
  }
  // Destroy all remaining children in `this.top`.
  destroyRest() {
    this.destroyBetween(this.index, this.top.children.length);
  }
  // Sync the current stack of mark descs with the given array of
  // marks, reusing existing mark descs when possible.
  syncToMarks(e, t, i) {
    let r = 0, s = this.stack.length >> 1, o = Math.min(s, e.length);
    for (; r < o && (r == s - 1 ? this.top : this.stack[r + 1 << 1]).matchesMark(e[r]) && e[r].type.spec.spanning !== !1; )
      r++;
    for (; r < s; )
      this.destroyRest(), this.top.dirty = je, this.index = this.stack.pop(), this.top = this.stack.pop(), s--;
    for (; s < e.length; ) {
      this.stack.push(this.top, this.index + 1);
      let a = -1;
      for (let l = this.index; l < Math.min(this.index + 3, this.top.children.length); l++) {
        let c = this.top.children[l];
        if (c.matchesMark(e[s]) && !this.isLocked(c.dom)) {
          a = l;
          break;
        }
      }
      if (a > -1)
        a > this.index && (this.changed = !0, this.destroyBetween(this.index, a)), this.top = this.top.children[this.index];
      else {
        let l = qt.create(this.top, e[s], t, i);
        this.top.children.splice(this.index, 0, l), this.top = l, this.changed = !0;
      }
      this.index = 0, s++;
    }
  }
  // Try to find a node desc matching the given data. Skip over it and
  // return true when successful.
  findNodeMatch(e, t, i, r) {
    let s = -1, o;
    if (r >= this.preMatch.index && (o = this.preMatch.matches[r - this.preMatch.index]).parent == this.top && o.matchesNode(e, t, i))
      s = this.top.children.indexOf(o, this.index);
    else
      for (let a = this.index, l = Math.min(this.top.children.length, a + 5); a < l; a++) {
        let c = this.top.children[a];
        if (c.matchesNode(e, t, i) && !this.preMatch.matched.has(c)) {
          s = a;
          break;
        }
      }
    return s < 0 ? !1 : (this.destroyBetween(this.index, s), this.index++, !0);
  }
  updateNodeAt(e, t, i, r, s) {
    let o = this.top.children[r];
    return o.dirty == tt && o.dom == o.contentDOM && (o.dirty = $t), o.update(e, t, i, s) ? (this.destroyBetween(this.index, r), this.index++, !0) : !1;
  }
  findIndexWithChild(e) {
    for (; ; ) {
      let t = e.parentNode;
      if (!t)
        return -1;
      if (t == this.top.contentDOM) {
        let i = e.pmViewDesc;
        if (i) {
          for (let r = this.index; r < this.top.children.length; r++)
            if (this.top.children[r] == i)
              return r;
        }
        return -1;
      }
      e = t;
    }
  }
  // Try to update the next node, if any, to the given data. Checks
  // pre-matches to avoid overwriting nodes that could still be used.
  updateNextNode(e, t, i, r, s, o) {
    for (let a = this.index; a < this.top.children.length; a++) {
      let l = this.top.children[a];
      if (l instanceof kt) {
        let c = this.preMatch.matched.get(l);
        if (c != null && c != s)
          return !1;
        let u = l.dom, d, f = this.isLocked(u) && !(e.isText && l.node && l.node.isText && l.nodeDOM.nodeValue == e.text && l.dirty != tt && Xi(t, l.outerDeco));
        if (!f && l.update(e, t, i, r))
          return this.destroyBetween(this.index, a), l.dom != u && (this.changed = !0), this.index++, !0;
        if (!f && (d = this.recreateWrapper(l, e, t, i, r, o)))
          return this.destroyBetween(this.index, a), this.top.children[this.index] = d, d.contentDOM && (d.dirty = $t, d.updateChildren(r, o + 1), d.dirty = je), this.changed = !0, this.index++, !0;
        break;
      }
    }
    return !1;
  }
  // When a node with content is replaced by a different node with
  // identical content, move over its children.
  recreateWrapper(e, t, i, r, s, o) {
    if (e.dirty || t.isAtom || !e.children.length || !e.node.content.eq(t.content) || !Xi(i, e.outerDeco) || !r.eq(e.innerDeco))
      return null;
    let a = kt.create(this.top, t, i, r, s, o);
    if (a.contentDOM) {
      a.children = e.children, e.children = [];
      for (let l of a.children)
        l.parent = a;
    }
    return e.destroy(), a;
  }
  // Insert the node as a newly created node desc.
  addNode(e, t, i, r, s) {
    let o = kt.create(this.top, e, t, i, r, s);
    o.contentDOM && o.updateChildren(r, s + 1), this.top.children.splice(this.index++, 0, o), this.changed = !0;
  }
  placeWidget(e, t, i) {
    let r = this.index < this.top.children.length ? this.top.children[this.index] : null;
    if (r && r.matchesWidget(e) && (e == r.widget || !r.widget.type.toDOM.parentNode))
      this.index++;
    else {
      let s = new mh(this.top, e, t, i);
      this.top.children.splice(this.index++, 0, s), this.changed = !0;
    }
  }
  // Make sure a textblock looks and behaves correctly in
  // contentEditable.
  addTextblockHacks() {
    let e = this.top.children[this.index - 1], t = this.top;
    for (; e instanceof qt; )
      t = e, e = t.children[t.children.length - 1];
    (!e || // Empty textblock
    !(e instanceof br) || /\n$/.test(e.node.text) || this.view.requiresGeckoHackNode && /\s$/.test(e.node.text)) && ((xe || ue) && e && e.dom.contentEditable == "false" && this.addHackNode("IMG", t), this.addHackNode("BR", this.top));
  }
  addHackNode(e, t) {
    if (t == this.top && this.index < t.children.length && t.children[this.index].matchesHack(e))
      this.index++;
    else {
      let i = document.createElement(e);
      e == "IMG" && (i.className = "ProseMirror-separator", i.alt = ""), e == "BR" && (i.className = "ProseMirror-trailingBreak");
      let r = new gh(this.top, [], i, null);
      t != this.top ? t.children.push(r) : t.children.splice(this.index++, 0, r), this.changed = !0;
    }
  }
  isLocked(e) {
    return this.lock && (e == this.lock || e.nodeType == 1 && e.contains(this.lock.parentNode));
  }
}
function k3(n, e) {
  let t = e, i = t.children.length, r = n.childCount, s = /* @__PURE__ */ new Map(), o = [];
  e:
    for (; r > 0; ) {
      let a;
      for (; ; )
        if (i) {
          let c = t.children[i - 1];
          if (c instanceof qt)
            t = c, i = c.children.length;
          else {
            a = c, i--;
            break;
          }
        } else {
          if (t == e)
            break e;
          i = t.parent.children.indexOf(t), t = t.parent;
        }
      let l = a.node;
      if (l) {
        if (l != n.child(r - 1))
          break;
        --r, s.set(a, r), o.push(a);
      }
    }
  return { index: r, matched: s, matches: o.reverse() };
}
function x3(n, e) {
  return n.type.side - e.type.side;
}
function S3(n, e, t, i) {
  let r = e.locals(n), s = 0;
  if (r.length == 0) {
    for (let c = 0; c < n.childCount; c++) {
      let u = n.child(c);
      i(u, r, e.forChild(s, u), c), s += u.nodeSize;
    }
    return;
  }
  let o = 0, a = [], l = null;
  for (let c = 0; ; ) {
    let u, d;
    for (; o < r.length && r[o].to == s; ) {
      let y = r[o++];
      y.widget && (u ? (d || (d = [u])).push(y) : u = y);
    }
    if (u)
      if (d) {
        d.sort(x3);
        for (let y = 0; y < d.length; y++)
          t(d[y], c, !!l);
      } else
        t(u, c, !!l);
    let f, p;
    if (l)
      p = -1, f = l, l = null;
    else if (c < n.childCount)
      p = c, f = n.child(c++);
    else
      break;
    for (let y = 0; y < a.length; y++)
      a[y].to <= s && a.splice(y--, 1);
    for (; o < r.length && r[o].from <= s && r[o].to > s; )
      a.push(r[o++]);
    let m = s + f.nodeSize;
    if (f.isText) {
      let y = m;
      o < r.length && r[o].from < y && (y = r[o].from);
      for (let g = 0; g < a.length; g++)
        a[g].to < y && (y = a[g].to);
      y < m && (l = f.cut(y - s), f = f.cut(0, y - s), m = y, p = -1);
    } else
      for (; o < r.length && r[o].to < m; )
        o++;
    let v = f.isInline && !f.isLeaf ? a.filter((y) => !y.inline) : a.slice();
    i(f, v, e.forChild(s, f), p), s = m;
  }
}
function T3(n) {
  if (n.nodeName == "UL" || n.nodeName == "OL") {
    let e = n.style.cssText;
    n.style.cssText = e + "; list-style: square !important", window.getComputedStyle(n).listStyle, n.style.cssText = e;
  }
}
function M3(n, e, t, i) {
  for (let r = 0, s = 0; r < n.childCount && s <= i; ) {
    let o = n.child(r++), a = s;
    if (s += o.nodeSize, !o.isText)
      continue;
    let l = o.text;
    for (; r < n.childCount; ) {
      let c = n.child(r++);
      if (s += c.nodeSize, !c.isText)
        break;
      l += c.text;
    }
    if (s >= t) {
      if (s >= i && l.slice(i - e.length - a, i - a) == e)
        return i - e.length;
      let c = a < i ? l.lastIndexOf(e, i - a - 1) : -1;
      if (c >= 0 && c + e.length + a >= t)
        return a + c;
      if (t == i && l.length >= i + e.length - a && l.slice(i - a, i - a + e.length) == e)
        return i;
    }
  }
  return -1;
}
function Xs(n, e, t, i, r) {
  let s = [];
  for (let o = 0, a = 0; o < n.length; o++) {
    let l = n[o], c = a, u = a += l.size;
    c >= t || u <= e ? s.push(l) : (c < e && s.push(l.slice(0, e - c, i)), r && (s.push(r), r = void 0), u > t && s.push(l.slice(t - c, l.size, i)));
  }
  return s;
}
function Fo(n, e = null) {
  let t = n.domSelectionRange(), i = n.state.doc;
  if (!t.focusNode)
    return null;
  let r = n.docView.nearestDesc(t.focusNode), s = r && r.size == 0, o = n.docView.posFromDOM(t.focusNode, t.focusOffset, 1);
  if (o < 0)
    return null;
  let a = i.resolve(o), l, c;
  if (yr(t)) {
    for (l = o; r && !r.node; )
      r = r.parent;
    let d = r.node;
    if (r && d.isAtom && D.isSelectable(d) && r.parent && !(d.isInline && Q6(t.focusNode, t.focusOffset, r.dom))) {
      let f = r.posBefore;
      c = new D(o == f ? a : i.resolve(f));
    }
  } else {
    if (t instanceof n.dom.ownerDocument.defaultView.Selection && t.rangeCount > 1) {
      let d = o, f = o;
      for (let p = 0; p < t.rangeCount; p++) {
        let m = t.getRangeAt(p);
        d = Math.min(d, n.docView.posFromDOM(m.startContainer, m.startOffset, 1)), f = Math.max(f, n.docView.posFromDOM(m.endContainer, m.endOffset, -1));
      }
      if (d < 0)
        return null;
      [l, o] = f == n.state.selection.anchor ? [f, d] : [d, f], a = i.resolve(o);
    } else
      l = n.docView.posFromDOM(t.anchorNode, t.anchorOffset, 1);
    if (l < 0)
      return null;
  }
  let u = i.resolve(l);
  if (!c) {
    let d = e == "pointer" || n.state.selection.head < a.pos && !s ? 1 : -1;
    c = Vo(n, u, a, d);
  }
  return c;
}
function wh(n) {
  return n.editable ? n.hasFocus() : kh(n) && document.activeElement && document.activeElement.contains(n.dom);
}
function lt(n, e = !1) {
  let t = n.state.selection;
  if (Ch(n, t), !!wh(n)) {
    if (!e && n.input.mouseDown && n.input.mouseDown.allowDefault && ue) {
      let i = n.domSelectionRange(), r = n.domObserver.currentSelection;
      if (i.anchorNode && r.anchorNode && Ut(i.anchorNode, i.anchorOffset, r.anchorNode, r.anchorOffset)) {
        n.input.mouseDown.delayedSelectionSync = !0, n.domObserver.setCurSelection();
        return;
      }
    }
    if (n.domObserver.disconnectSelection(), n.cursorWrapper)
      N3(n);
    else {
      let { anchor: i, head: r } = t, s, o;
      Ul && !(t instanceof z) && (t.$from.parent.inlineContent || (s = ql(n, t.from)), !t.empty && !t.$from.parent.inlineContent && (o = ql(n, t.to))), n.docView.setSelection(i, r, n, e), Ul && (s && Kl(s), o && Kl(o)), t.visible ? n.dom.classList.remove("ProseMirror-hideselection") : (n.dom.classList.add("ProseMirror-hideselection"), "onselectionchange" in document && _3(n));
    }
    n.domObserver.setCurSelection(), n.domObserver.connectSelection();
  }
}
const Ul = xe || ue && ah < 63;
function ql(n, e) {
  let { node: t, offset: i } = n.docView.domFromPos(e, 0), r = i < t.childNodes.length ? t.childNodes[i] : null, s = i ? t.childNodes[i - 1] : null;
  if (xe && r && r.contentEditable == "false")
    return ss(r);
  if ((!r || r.contentEditable == "false") && (!s || s.contentEditable == "false")) {
    if (r)
      return ss(r);
    if (s)
      return ss(s);
  }
}
function ss(n) {
  return n.contentEditable = "true", xe && n.draggable && (n.draggable = !1, n.wasDraggable = !0), n;
}
function Kl(n) {
  n.contentEditable = "false", n.wasDraggable && (n.draggable = !0, n.wasDraggable = null);
}
function _3(n) {
  let e = n.dom.ownerDocument;
  e.removeEventListener("selectionchange", n.input.hideSelectionGuard);
  let t = n.domSelectionRange(), i = t.anchorNode, r = t.anchorOffset;
  e.addEventListener("selectionchange", n.input.hideSelectionGuard = () => {
    (t.anchorNode != i || t.anchorOffset != r) && (e.removeEventListener("selectionchange", n.input.hideSelectionGuard), setTimeout(() => {
      (!wh(n) || n.state.selection.visible) && n.dom.classList.remove("ProseMirror-hideselection");
    }, 20));
  });
}
function N3(n) {
  let e = n.domSelection();
  if (!e)
    return;
  let t = n.cursorWrapper.dom, i = t.nodeName == "IMG";
  i ? e.collapse(t.parentNode, me(t) + 1) : e.collapse(t, 0), !i && !n.state.selection.visible && Oe && Ct <= 11 && (t.disabled = !0, t.disabled = !1);
}
function Ch(n, e) {
  if (e instanceof D) {
    let t = n.docView.descAt(e.from);
    t != n.lastSelectedViewDesc && (Jl(n), t && t.selectNode(), n.lastSelectedViewDesc = t);
  } else
    Jl(n);
}
function Jl(n) {
  n.lastSelectedViewDesc && (n.lastSelectedViewDesc.parent && n.lastSelectedViewDesc.deselectNode(), n.lastSelectedViewDesc = void 0);
}
function Vo(n, e, t, i) {
  return n.someProp("createSelectionBetween", (r) => r(n, e, t)) || z.between(e, t, i);
}
function Gl(n) {
  return n.editable && !n.hasFocus() ? !1 : kh(n);
}
function kh(n) {
  let e = n.domSelectionRange();
  if (!e.anchorNode)
    return !1;
  try {
    return n.dom.contains(e.anchorNode.nodeType == 3 ? e.anchorNode.parentNode : e.anchorNode) && (n.editable || n.dom.contains(e.focusNode.nodeType == 3 ? e.focusNode.parentNode : e.focusNode));
  } catch (t) {
    return !1;
  }
}
function E3(n) {
  let e = n.docView.domFromPos(n.state.selection.anchor, 0), t = n.domSelectionRange();
  return Ut(e.node, e.offset, t.anchorNode, t.anchorOffset);
}
function Ys(n, e) {
  let { $anchor: t, $head: i } = n.selection, r = e > 0 ? t.max(i) : t.min(i), s = r.parent.inlineContent ? r.depth ? n.doc.resolve(e > 0 ? r.after() : r.before()) : null : r;
  return s && B.findFrom(s, e);
}
function pt(n, e) {
  return n.dispatch(n.state.tr.setSelection(e).scrollIntoView()), !0;
}
function Xl(n, e, t) {
  let i = n.state.selection;
  if (i instanceof z)
    if (t.indexOf("s") > -1) {
      let { $head: r } = i, s = r.textOffset ? null : e < 0 ? r.nodeBefore : r.nodeAfter;
      if (!s || s.isText || !s.isLeaf)
        return !1;
      let o = n.state.doc.resolve(r.pos + s.nodeSize * (e < 0 ? -1 : 1));
      return pt(n, new z(i.$anchor, o));
    } else if (i.empty) {
      if (n.endOfTextblock(e > 0 ? "forward" : "backward")) {
        let r = Ys(n.state, e);
        return r && r instanceof D ? pt(n, r) : !1;
      } else if (!(Be && t.indexOf("m") > -1)) {
        let r = i.$head, s = r.textOffset ? null : e < 0 ? r.nodeBefore : r.nodeAfter, o;
        if (!s || s.isText)
          return !1;
        let a = e < 0 ? r.pos - s.nodeSize : r.pos;
        return s.isAtom || (o = n.docView.descAt(a)) && !o.contentDOM ? D.isSelectable(s) ? pt(n, new D(e < 0 ? n.state.doc.resolve(r.pos - s.nodeSize) : r)) : si ? pt(n, new z(n.state.doc.resolve(e < 0 ? a : a + s.nodeSize))) : !1 : !1;
      }
    } else
      return !1;
  else {
    if (i instanceof D && i.node.isInline)
      return pt(n, new z(e > 0 ? i.$to : i.$from));
    {
      let r = Ys(n.state, e);
      return r ? pt(n, r) : !1;
    }
  }
}
function Yi(n) {
  return n.nodeType == 3 ? n.nodeValue.length : n.childNodes.length;
}
function zn(n, e) {
  let t = n.pmViewDesc;
  return t && t.size == 0 && (e < 0 || n.nextSibling || n.nodeName != "BR");
}
function tn(n, e) {
  return e < 0 ? A3(n) : I3(n);
}
function A3(n) {
  let e = n.domSelectionRange(), t = e.focusNode, i = e.focusOffset;
  if (!t)
    return;
  let r, s, o = !1;
  for (He && t.nodeType == 1 && i < Yi(t) && zn(t.childNodes[i], -1) && (o = !0); ; )
    if (i > 0) {
      if (t.nodeType != 1)
        break;
      {
        let a = t.childNodes[i - 1];
        if (zn(a, -1))
          r = t, s = --i;
        else if (a.nodeType == 3)
          t = a, i = t.nodeValue.length;
        else
          break;
      }
    } else {
      if (xh(t))
        break;
      {
        let a = t.previousSibling;
        for (; a && zn(a, -1); )
          r = t.parentNode, s = me(a), a = a.previousSibling;
        if (a)
          t = a, i = Yi(t);
        else {
          if (t = t.parentNode, t == n.dom)
            break;
          i = 0;
        }
      }
    }
  o ? Zs(n, t, i) : r && Zs(n, r, s);
}
function I3(n) {
  let e = n.domSelectionRange(), t = e.focusNode, i = e.focusOffset;
  if (!t)
    return;
  let r = Yi(t), s, o;
  for (; ; )
    if (i < r) {
      if (t.nodeType != 1)
        break;
      let a = t.childNodes[i];
      if (zn(a, 1))
        s = t, o = ++i;
      else
        break;
    } else {
      if (xh(t))
        break;
      {
        let a = t.nextSibling;
        for (; a && zn(a, 1); )
          s = a.parentNode, o = me(a) + 1, a = a.nextSibling;
        if (a)
          t = a, i = 0, r = Yi(t);
        else {
          if (t = t.parentNode, t == n.dom)
            break;
          i = r = 0;
        }
      }
    }
  s && Zs(n, s, o);
}
function xh(n) {
  let e = n.pmViewDesc;
  return e && e.node && e.node.isBlock;
}
function O3(n, e) {
  for (; n && e == n.childNodes.length && !ri(n); )
    e = me(n) + 1, n = n.parentNode;
  for (; n && e < n.childNodes.length; ) {
    let t = n.childNodes[e];
    if (t.nodeType == 3)
      return t;
    if (t.nodeType == 1 && t.contentEditable == "false")
      break;
    n = t, e = 0;
  }
}
function D3(n, e) {
  for (; n && !e && !ri(n); )
    e = me(n), n = n.parentNode;
  for (; n && e; ) {
    let t = n.childNodes[e - 1];
    if (t.nodeType == 3)
      return t;
    if (t.nodeType == 1 && t.contentEditable == "false")
      break;
    n = t, e = n.childNodes.length;
  }
}
function Zs(n, e, t) {
  if (e.nodeType != 3) {
    let s, o;
    (o = O3(e, t)) ? (e = o, t = 0) : (s = D3(e, t)) && (e = s, t = s.nodeValue.length);
  }
  let i = n.domSelection();
  if (!i)
    return;
  if (yr(i)) {
    let s = document.createRange();
    s.setEnd(e, t), s.setStart(e, t), i.removeAllRanges(), i.addRange(s);
  } else
    i.extend && i.extend(e, t);
  n.domObserver.setCurSelection();
  let { state: r } = n;
  setTimeout(() => {
    n.state == r && lt(n);
  }, 50);
}
function Yl(n, e) {
  let t = n.state.doc.resolve(e);
  if (!(ue || lh) && t.parent.inlineContent) {
    let r = n.coordsAtPos(e);
    if (e > t.start()) {
      let s = n.coordsAtPos(e - 1), o = (s.top + s.bottom) / 2;
      if (o > r.top && o < r.bottom && Math.abs(s.left - r.left) > 1)
        return s.left < r.left ? "ltr" : "rtl";
    }
    if (e < t.end()) {
      let s = n.coordsAtPos(e + 1), o = (s.top + s.bottom) / 2;
      if (o > r.top && o < r.bottom && Math.abs(s.left - r.left) > 1)
        return s.left > r.left ? "ltr" : "rtl";
    }
  }
  return getComputedStyle(n.dom).direction == "rtl" ? "rtl" : "ltr";
}
function Zl(n, e, t) {
  let i = n.state.selection;
  if (i instanceof z && !i.empty || t.indexOf("s") > -1 || Be && t.indexOf("m") > -1)
    return !1;
  let { $from: r, $to: s } = i;
  if (!r.parent.inlineContent || n.endOfTextblock(e < 0 ? "up" : "down")) {
    let o = Ys(n.state, e);
    if (o && o instanceof D)
      return pt(n, o);
  }
  if (!r.parent.inlineContent) {
    let o = e < 0 ? r : s, a = i instanceof Ve ? B.near(o, e) : B.findFrom(o, e);
    return a ? pt(n, a) : !1;
  }
  return !1;
}
function Ql(n, e) {
  if (!(n.state.selection instanceof z))
    return !0;
  let { $head: t, $anchor: i, empty: r } = n.state.selection;
  if (!t.sameParent(i))
    return !0;
  if (!r)
    return !1;
  if (n.endOfTextblock(e > 0 ? "forward" : "backward"))
    return !0;
  let s = !t.textOffset && (e < 0 ? t.nodeBefore : t.nodeAfter);
  if (s && !s.isText) {
    let o = n.state.tr;
    return e < 0 ? o.delete(t.pos - s.nodeSize, t.pos) : o.delete(t.pos, t.pos + s.nodeSize), n.dispatch(o), !0;
  }
  return !1;
}
function ec(n, e, t) {
  n.domObserver.stop(), e.contentEditable = t, n.domObserver.start();
}
function $3(n) {
  if (!xe || n.state.selection.$head.parentOffset > 0)
    return !1;
  let { focusNode: e, focusOffset: t } = n.domSelectionRange();
  if (e && e.nodeType == 1 && t == 0 && e.firstChild && e.firstChild.contentEditable == "false") {
    let i = e.firstChild;
    ec(n, i, "true"), setTimeout(() => ec(n, i, "false"), 20);
  }
  return !1;
}
function R3(n) {
  let e = "";
  return n.ctrlKey && (e += "c"), n.metaKey && (e += "m"), n.altKey && (e += "a"), n.shiftKey && (e += "s"), e;
}
function P3(n, e) {
  let t = e.keyCode, i = R3(e);
  if (t == 8 || Be && t == 72 && i == "c")
    return Ql(n, -1) || tn(n, -1);
  if (t == 46 && !e.shiftKey || Be && t == 68 && i == "c")
    return Ql(n, 1) || tn(n, 1);
  if (t == 13 || t == 27)
    return !0;
  if (t == 37 || Be && t == 66 && i == "c") {
    let r = t == 37 ? Yl(n, n.state.selection.from) == "ltr" ? -1 : 1 : -1;
    return Xl(n, r, i) || tn(n, r);
  } else if (t == 39 || Be && t == 70 && i == "c") {
    let r = t == 39 ? Yl(n, n.state.selection.from) == "ltr" ? 1 : -1 : 1;
    return Xl(n, r, i) || tn(n, r);
  } else {
    if (t == 38 || Be && t == 80 && i == "c")
      return Zl(n, -1, i) || tn(n, -1);
    if (t == 40 || Be && t == 78 && i == "c")
      return $3(n) || Zl(n, 1, i) || tn(n, 1);
    if (i == (Be ? "m" : "c") && (t == 66 || t == 73 || t == 89 || t == 90))
      return !0;
  }
  return !1;
}
function Ho(n, e) {
  n.someProp("transformCopied", (p) => {
    e = p(e, n);
  });
  let t = [], { content: i, openStart: r, openEnd: s } = e;
  for (; r > 1 && s > 1 && i.childCount == 1 && i.firstChild.childCount == 1; ) {
    r--, s--;
    let p = i.firstChild;
    t.push(p.type.name, p.attrs != p.type.defaultAttrs ? p.attrs : null), i = p.content;
  }
  let o = n.someProp("clipboardSerializer") || Gt.fromSchema(n.state.schema), a = Eh(), l = a.createElement("div");
  l.appendChild(o.serializeFragment(i, { document: a }));
  let c = l.firstChild, u, d = 0;
  for (; c && c.nodeType == 1 && (u = Nh[c.nodeName.toLowerCase()]); ) {
    for (let p = u.length - 1; p >= 0; p--) {
      let m = a.createElement(u[p]);
      for (; l.firstChild; )
        m.appendChild(l.firstChild);
      l.appendChild(m), d++;
    }
    c = l.firstChild;
  }
  c && c.nodeType == 1 && c.setAttribute("data-pm-slice", "".concat(r, " ").concat(s).concat(d ? " -".concat(d) : "", " ").concat(JSON.stringify(t)));
  let f = n.someProp("clipboardTextSerializer", (p) => p(e, n)) || e.content.textBetween(0, e.content.size, "\n\n");
  return { dom: l, text: f, slice: e };
}
function Sh(n, e, t, i, r) {
  let s = r.parent.type.spec.code, o, a;
  if (!t && !e)
    return null;
  let l = !!e && (i || s || !t);
  if (l) {
    if (n.someProp("transformPastedText", (f) => {
      e = f(e, s || i, n);
    }), s)
      return a = new N(T.from(n.state.schema.text(e.replace(/\r\n?/g, "\n"))), 0, 0), n.someProp("transformPasted", (f) => {
        a = f(a, n, !0);
      }), a;
    let d = n.someProp("clipboardTextParser", (f) => f(e, r, i, n));
    if (d)
      a = d;
    else {
      let f = r.marks(), { schema: p } = n.state, m = Gt.fromSchema(p);
      o = document.createElement("div"), e.split(/(?:\r\n?|\n)+/).forEach((v) => {
        let y = o.appendChild(document.createElement("p"));
        v && y.appendChild(m.serializeNode(p.text(v, f)));
      });
    }
  } else
    n.someProp("transformPastedHTML", (d) => {
      t = d(t, n);
    }), o = F3(t), si && V3(o);
  let c = o && o.querySelector("[data-pm-slice]"), u = c && /^(\d+) (\d+)(?: -(\d+))? (.*)/.exec(c.getAttribute("data-pm-slice") || "");
  if (u && u[3])
    for (let d = +u[3]; d > 0; d--) {
      let f = o.firstChild;
      for (; f && f.nodeType != 1; )
        f = f.nextSibling;
      if (!f)
        break;
      o = f;
    }
  if (a || (a = (n.someProp("clipboardParser") || n.someProp("domParser") || Rn.fromSchema(n.state.schema)).parseSlice(o, {
    preserveWhitespace: !!(l || u),
    context: r,
    ruleFromNode(f) {
      return f.nodeName == "BR" && !f.nextSibling && f.parentNode && !L3.test(f.parentNode.nodeName) ? { ignore: !0 } : null;
    }
  })), u)
    a = H3(tc(a, +u[1], +u[2]), u[4]);
  else if (a = N.maxOpen(z3(a.content, r), !0), a.openStart || a.openEnd) {
    let d = 0, f = 0;
    for (let p = a.content.firstChild; d < a.openStart && !p.type.spec.isolating; d++, p = p.firstChild)
      ;
    for (let p = a.content.lastChild; f < a.openEnd && !p.type.spec.isolating; f++, p = p.lastChild)
      ;
    a = tc(a, d, f);
  }
  return n.someProp("transformPasted", (d) => {
    a = d(a, n, l);
  }), a;
}
const L3 = /^(a|abbr|acronym|b|cite|code|del|em|i|ins|kbd|label|output|q|ruby|s|samp|span|strong|sub|sup|time|u|tt|var)$/i;
function z3(n, e) {
  if (n.childCount < 2)
    return n;
  for (let t = e.depth; t >= 0; t--) {
    let r = e.node(t).contentMatchAt(e.index(t)), s, o = [];
    if (n.forEach((a) => {
      if (!o)
        return;
      let l = r.findWrapping(a.type), c;
      if (!l)
        return o = null;
      if (c = o.length && s.length && Mh(l, s, a, o[o.length - 1], 0))
        o[o.length - 1] = c;
      else {
        o.length && (o[o.length - 1] = _h(o[o.length - 1], s.length));
        let u = Th(a, l);
        o.push(u), r = r.matchType(u.type), s = l;
      }
    }), o)
      return T.from(o);
  }
  return n;
}
function Th(n, e, t = 0) {
  for (let i = e.length - 1; i >= t; i--)
    n = e[i].create(null, T.from(n));
  return n;
}
function Mh(n, e, t, i, r) {
  if (r < n.length && r < e.length && n[r] == e[r]) {
    let s = Mh(n, e, t, i.lastChild, r + 1);
    if (s)
      return i.copy(i.content.replaceChild(i.childCount - 1, s));
    if (i.contentMatchAt(i.childCount).matchType(r == n.length - 1 ? t.type : n[r + 1]))
      return i.copy(i.content.append(T.from(Th(t, n, r + 1))));
  }
}
function _h(n, e) {
  if (e == 0)
    return n;
  let t = n.content.replaceChild(n.childCount - 1, _h(n.lastChild, e - 1)), i = n.contentMatchAt(n.childCount).fillBefore(T.empty, !0);
  return n.copy(t.append(i));
}
function Qs(n, e, t, i, r, s) {
  let o = e < 0 ? n.firstChild : n.lastChild, a = o.content;
  return n.childCount > 1 && (s = 0), r < i - 1 && (a = Qs(a, e, t, i, r + 1, s)), r >= t && (a = e < 0 ? o.contentMatchAt(0).fillBefore(a, s <= r).append(a) : a.append(o.contentMatchAt(o.childCount).fillBefore(T.empty, !0))), n.replaceChild(e < 0 ? 0 : n.childCount - 1, o.copy(a));
}
function tc(n, e, t) {
  return e < n.openStart && (n = new N(Qs(n.content, -1, e, n.openStart, 0, n.openEnd), e, n.openEnd)), t < n.openEnd && (n = new N(Qs(n.content, 1, t, n.openEnd, 0, 0), n.openStart, t)), n;
}
const Nh = {
  thead: ["table"],
  tbody: ["table"],
  tfoot: ["table"],
  caption: ["table"],
  colgroup: ["table"],
  col: ["table", "colgroup"],
  tr: ["table", "tbody"],
  td: ["table", "tbody", "tr"],
  th: ["table", "tbody", "tr"]
};
let nc = null;
function Eh() {
  return nc || (nc = document.implementation.createHTMLDocument("title"));
}
let as = null;
function B3(n) {
  let e = window.trustedTypes;
  return e ? (as || (as = e.defaultPolicy || e.createPolicy("ProseMirrorClipboard", { createHTML: (t) => t })), as.createHTML(n)) : n;
}
function F3(n) {
  let e = /^(\s*<meta [^>]*>)*/.exec(n);
  e && (n = n.slice(e[0].length));
  let t = Eh().createElement("div"), i = /<([a-z][^>\s]+)/i.exec(n), r;
  if ((r = i && Nh[i[1].toLowerCase()]) && (n = r.map((s) => "<" + s + ">").join("") + n + r.map((s) => "</" + s + ">").reverse().join("")), t.innerHTML = B3(n), r)
    for (let s = 0; s < r.length; s++)
      t = t.querySelector(r[s]) || t;
  return t;
}
function V3(n) {
  let e = n.querySelectorAll(ue ? "span:not([class]):not([style])" : "span.Apple-converted-space");
  for (let t = 0; t < e.length; t++) {
    let i = e[t];
    i.childNodes.length == 1 && i.textContent == " " && i.parentNode && i.parentNode.replaceChild(n.ownerDocument.createTextNode(" "), i);
  }
}
function H3(n, e) {
  if (!n.size)
    return n;
  let t = n.content.firstChild.type.schema, i;
  try {
    i = JSON.parse(e);
  } catch (a) {
    return n;
  }
  let { content: r, openStart: s, openEnd: o } = n;
  for (let a = i.length - 2; a >= 0; a -= 2) {
    let l = t.nodes[i[a]];
    if (!l || l.hasRequiredAttrs())
      break;
    r = T.from(l.create(i[a + 1], r)), s++, o++;
  }
  return new N(r, s, o);
}
const Ne = {}, Ee = {}, j3 = { touchstart: !0, touchmove: !0 };
class W3 {
  constructor() {
    this.shiftKey = !1, this.mouseDown = null, this.lastKeyCode = null, this.lastKeyCodeTime = 0, this.lastClick = { time: 0, x: 0, y: 0, type: "", button: 0 }, this.lastSelectionOrigin = null, this.lastSelectionTime = 0, this.lastIOSEnter = 0, this.lastIOSEnterFallbackTimeout = -1, this.lastFocus = 0, this.lastTouch = 0, this.lastChromeDelete = 0, this.composing = !1, this.compositionNode = null, this.composingTimeout = -1, this.compositionNodes = [], this.compositionEndedAt = -2e8, this.compositionID = 1, this.compositionPendingChanges = 0, this.domChangeCount = 0, this.eventHandlers = /* @__PURE__ */ Object.create(null), this.hideSelectionGuard = null;
  }
}
function U3(n) {
  for (let e in Ne) {
    let t = Ne[e];
    n.dom.addEventListener(e, n.input.eventHandlers[e] = (i) => {
      K3(n, i) && !jo(n, i) && (n.editable || !(i.type in Ee)) && t(n, i);
    }, j3[e] ? { passive: !0 } : void 0);
  }
  xe && n.dom.addEventListener("input", () => null), eo(n);
}
function bt(n, e) {
  n.input.lastSelectionOrigin = e, n.input.lastSelectionTime = Date.now();
}
function q3(n) {
  n.domObserver.stop();
  for (let e in n.input.eventHandlers)
    n.dom.removeEventListener(e, n.input.eventHandlers[e]);
  clearTimeout(n.input.composingTimeout), clearTimeout(n.input.lastIOSEnterFallbackTimeout);
}
function eo(n) {
  n.someProp("handleDOMEvents", (e) => {
    for (let t in e)
      n.input.eventHandlers[t] || n.dom.addEventListener(t, n.input.eventHandlers[t] = (i) => jo(n, i));
  });
}
function jo(n, e) {
  return n.someProp("handleDOMEvents", (t) => {
    let i = t[e.type];
    return i ? i(n, e) || e.defaultPrevented : !1;
  });
}
function K3(n, e) {
  if (!e.bubbles)
    return !0;
  if (e.defaultPrevented)
    return !1;
  for (let t = e.target; t != n.dom; t = t.parentNode)
    if (!t || t.nodeType == 11 || t.pmViewDesc && t.pmViewDesc.stopEvent(e))
      return !1;
  return !0;
}
function J3(n, e) {
  !jo(n, e) && Ne[e.type] && (n.editable || !(e.type in Ee)) && Ne[e.type](n, e);
}
Ee.keydown = (n, e) => {
  let t = e;
  if (n.input.shiftKey = t.keyCode == 16 || t.shiftKey, !Ih(n, t) && (n.input.lastKeyCode = t.keyCode, n.input.lastKeyCodeTime = Date.now(), !(ot && ue && t.keyCode == 13)))
    if (t.keyCode != 229 && n.domObserver.forceFlush(), wn && t.keyCode == 13 && !t.ctrlKey && !t.altKey && !t.metaKey) {
      let i = Date.now();
      n.input.lastIOSEnter = i, n.input.lastIOSEnterFallbackTimeout = setTimeout(() => {
        n.input.lastIOSEnter == i && (n.someProp("handleKeyDown", (r) => r(n, Dt(13, "Enter"))), n.input.lastIOSEnter = 0);
      }, 200);
    } else
      n.someProp("handleKeyDown", (i) => i(n, t)) || P3(n, t) ? t.preventDefault() : bt(n, "key");
};
Ee.keyup = (n, e) => {
  e.keyCode == 16 && (n.input.shiftKey = !1);
};
Ee.keypress = (n, e) => {
  let t = e;
  if (Ih(n, t) || !t.charCode || t.ctrlKey && !t.altKey || Be && t.metaKey)
    return;
  if (n.someProp("handleKeyPress", (r) => r(n, t))) {
    t.preventDefault();
    return;
  }
  let i = n.state.selection;
  if (!(i instanceof z) || !i.$from.sameParent(i.$to)) {
    let r = String.fromCharCode(t.charCode), s = () => n.state.tr.insertText(r).scrollIntoView();
    !/[\r\n]/.test(r) && !n.someProp("handleTextInput", (o) => o(n, i.$from.pos, i.$to.pos, r, s)) && n.dispatch(s()), t.preventDefault();
  }
};
function wr(n) {
  return { left: n.clientX, top: n.clientY };
}
function G3(n, e) {
  let t = e.x - n.clientX, i = e.y - n.clientY;
  return t * t + i * i < 100;
}
function Wo(n, e, t, i, r) {
  if (i == -1)
    return !1;
  let s = n.state.doc.resolve(i);
  for (let o = s.depth + 1; o > 0; o--)
    if (n.someProp(e, (a) => o > s.depth ? a(n, t, s.nodeAfter, s.before(o), r, !0) : a(n, t, s.node(o), s.before(o), r, !1)))
      return !0;
  return !1;
}
function pn(n, e, t) {
  if (n.focused || n.focus(), n.state.selection.eq(e))
    return;
  let i = n.state.tr.setSelection(e);
  t == "pointer" && i.setMeta("pointer", !0), n.dispatch(i);
}
function X3(n, e) {
  if (e == -1)
    return !1;
  let t = n.state.doc.resolve(e), i = t.nodeAfter;
  return i && i.isAtom && D.isSelectable(i) ? (pn(n, new D(t), "pointer"), !0) : !1;
}
function Y3(n, e) {
  if (e == -1)
    return !1;
  let t = n.state.selection, i, r;
  t instanceof D && (i = t.node);
  let s = n.state.doc.resolve(e);
  for (let o = s.depth + 1; o > 0; o--) {
    let a = o > s.depth ? s.nodeAfter : s.node(o);
    if (D.isSelectable(a)) {
      i && t.$from.depth > 0 && o >= t.$from.depth && s.before(t.$from.depth + 1) == t.$from.pos ? r = s.before(t.$from.depth) : r = s.before(o);
      break;
    }
  }
  return r != null ? (pn(n, D.create(n.state.doc, r), "pointer"), !0) : !1;
}
function Z3(n, e, t, i, r) {
  return Wo(n, "handleClickOn", e, t, i) || n.someProp("handleClick", (s) => s(n, e, i)) || (r ? Y3(n, t) : X3(n, t));
}
function Q3(n, e, t, i) {
  return Wo(n, "handleDoubleClickOn", e, t, i) || n.someProp("handleDoubleClick", (r) => r(n, e, i));
}
function e4(n, e, t, i) {
  return Wo(n, "handleTripleClickOn", e, t, i) || n.someProp("handleTripleClick", (r) => r(n, e, i)) || t4(n, t, i);
}
function t4(n, e, t) {
  if (t.button != 0)
    return !1;
  let i = n.state.doc;
  if (e == -1)
    return i.inlineContent ? (pn(n, z.create(i, 0, i.content.size), "pointer"), !0) : !1;
  let r = i.resolve(e);
  for (let s = r.depth + 1; s > 0; s--) {
    let o = s > r.depth ? r.nodeAfter : r.node(s), a = r.before(s);
    if (o.inlineContent)
      pn(n, z.create(i, a + 1, a + 1 + o.content.size), "pointer");
    else if (D.isSelectable(o))
      pn(n, D.create(i, a), "pointer");
    else
      continue;
    return !0;
  }
}
function Uo(n) {
  return Zi(n);
}
const Ah = Be ? "metaKey" : "ctrlKey";
Ne.mousedown = (n, e) => {
  let t = e;
  n.input.shiftKey = t.shiftKey;
  let i = Uo(n), r = Date.now(), s = "singleClick";
  r - n.input.lastClick.time < 500 && G3(t, n.input.lastClick) && !t[Ah] && n.input.lastClick.button == t.button && (n.input.lastClick.type == "singleClick" ? s = "doubleClick" : n.input.lastClick.type == "doubleClick" && (s = "tripleClick")), n.input.lastClick = { time: r, x: t.clientX, y: t.clientY, type: s, button: t.button };
  let o = n.posAtCoords(wr(t));
  o && (s == "singleClick" ? (n.input.mouseDown && n.input.mouseDown.done(), n.input.mouseDown = new n4(n, o, t, !!i)) : (s == "doubleClick" ? Q3 : e4)(n, o.pos, o.inside, t) ? t.preventDefault() : bt(n, "pointer"));
};
class n4 {
  constructor(e, t, i, r) {
    this.view = e, this.pos = t, this.event = i, this.flushed = r, this.delayedSelectionSync = !1, this.mightDrag = null, this.startDoc = e.state.doc, this.selectNode = !!i[Ah], this.allowDefault = i.shiftKey;
    let s, o;
    if (t.inside > -1)
      s = e.state.doc.nodeAt(t.inside), o = t.inside;
    else {
      let u = e.state.doc.resolve(t.pos);
      s = u.parent, o = u.depth ? u.before() : 0;
    }
    const a = r ? null : i.target, l = a ? e.docView.nearestDesc(a, !0) : null;
    this.target = l && l.nodeDOM.nodeType == 1 ? l.nodeDOM : null;
    let { selection: c } = e.state;
    (i.button == 0 && s.type.spec.draggable && s.type.spec.selectable !== !1 || c instanceof D && c.from <= o && c.to > o) && (this.mightDrag = {
      node: s,
      pos: o,
      addAttr: !!(this.target && !this.target.draggable),
      setUneditable: !!(this.target && He && !this.target.hasAttribute("contentEditable"))
    }), this.target && this.mightDrag && (this.mightDrag.addAttr || this.mightDrag.setUneditable) && (this.view.domObserver.stop(), this.mightDrag.addAttr && (this.target.draggable = !0), this.mightDrag.setUneditable && setTimeout(() => {
      this.view.input.mouseDown == this && this.target.setAttribute("contentEditable", "false");
    }, 20), this.view.domObserver.start()), e.root.addEventListener("mouseup", this.up = this.up.bind(this)), e.root.addEventListener("mousemove", this.move = this.move.bind(this)), bt(e, "pointer");
  }
  done() {
    this.view.root.removeEventListener("mouseup", this.up), this.view.root.removeEventListener("mousemove", this.move), this.mightDrag && this.target && (this.view.domObserver.stop(), this.mightDrag.addAttr && this.target.removeAttribute("draggable"), this.mightDrag.setUneditable && this.target.removeAttribute("contentEditable"), this.view.domObserver.start()), this.delayedSelectionSync && setTimeout(() => lt(this.view)), this.view.input.mouseDown = null;
  }
  up(e) {
    if (this.done(), !this.view.dom.contains(e.target))
      return;
    let t = this.pos;
    this.view.state.doc != this.startDoc && (t = this.view.posAtCoords(wr(e))), this.updateAllowDefault(e), this.allowDefault || !t ? bt(this.view, "pointer") : Z3(this.view, t.pos, t.inside, e, this.selectNode) ? e.preventDefault() : e.button == 0 && (this.flushed || // Safari ignores clicks on draggable elements
    xe && this.mightDrag && !this.mightDrag.node.isAtom || // Chrome will sometimes treat a node selection as a
    // cursor, but still report that the node is selected
    // when asked through getSelection. You'll then get a
    // situation where clicking at the point where that
    // (hidden) cursor is doesn't change the selection, and
    // thus doesn't get a reaction from ProseMirror. This
    // works around that.
    ue && !this.view.state.selection.visible && Math.min(Math.abs(t.pos - this.view.state.selection.from), Math.abs(t.pos - this.view.state.selection.to)) <= 2) ? (pn(this.view, B.near(this.view.state.doc.resolve(t.pos)), "pointer"), e.preventDefault()) : bt(this.view, "pointer");
  }
  move(e) {
    this.updateAllowDefault(e), bt(this.view, "pointer"), e.buttons == 0 && this.done();
  }
  updateAllowDefault(e) {
    !this.allowDefault && (Math.abs(this.event.x - e.clientX) > 4 || Math.abs(this.event.y - e.clientY) > 4) && (this.allowDefault = !0);
  }
}
Ne.touchstart = (n) => {
  n.input.lastTouch = Date.now(), Uo(n), bt(n, "pointer");
};
Ne.touchmove = (n) => {
  n.input.lastTouch = Date.now(), bt(n, "pointer");
};
Ne.contextmenu = (n) => Uo(n);
function Ih(n, e) {
  return n.composing ? !0 : xe && Math.abs(e.timeStamp - n.input.compositionEndedAt) < 500 ? (n.input.compositionEndedAt = -2e8, !0) : !1;
}
const i4 = ot ? 5e3 : -1;
Ee.compositionstart = Ee.compositionupdate = (n) => {
  if (!n.composing) {
    n.domObserver.flush();
    let { state: e } = n, t = e.selection.$to;
    if (e.selection instanceof z && (e.storedMarks || !t.textOffset && t.parentOffset && t.nodeBefore.marks.some((i) => i.type.spec.inclusive === !1) || ue && lh && r4(n)))
      n.markCursor = n.state.storedMarks || t.marks(), Zi(n, !0), n.markCursor = null;
    else if (Zi(n, !e.selection.empty), He && e.selection.empty && t.parentOffset && !t.textOffset && t.nodeBefore.marks.length) {
      let i = n.domSelectionRange();
      for (let r = i.focusNode, s = i.focusOffset; r && r.nodeType == 1 && s != 0; ) {
        let o = s < 0 ? r.lastChild : r.childNodes[s - 1];
        if (!o)
          break;
        if (o.nodeType == 3) {
          let a = n.domSelection();
          a && a.collapse(o, o.nodeValue.length);
          break;
        } else
          r = o, s = -1;
      }
    }
    n.input.composing = !0;
  }
  Oh(n, i4);
};
function r4(n) {
  let { focusNode: e, focusOffset: t } = n.domSelectionRange();
  if (!e || e.nodeType != 1 || t >= e.childNodes.length)
    return !1;
  let i = e.childNodes[t];
  return i.nodeType == 1 && i.contentEditable == "false";
}
Ee.compositionend = (n, e) => {
  n.composing && (n.input.composing = !1, n.input.compositionEndedAt = e.timeStamp, n.input.compositionPendingChanges = n.domObserver.pendingRecords().length ? n.input.compositionID : 0, n.input.compositionNode = null, n.input.compositionPendingChanges && Promise.resolve().then(() => n.domObserver.flush()), n.input.compositionID++, Oh(n, 20));
};
function Oh(n, e) {
  clearTimeout(n.input.composingTimeout), e > -1 && (n.input.composingTimeout = setTimeout(() => Zi(n), e));
}
function Dh(n) {
  for (n.composing && (n.input.composing = !1, n.input.compositionEndedAt = o4()); n.input.compositionNodes.length > 0; )
    n.input.compositionNodes.pop().markParentsDirty();
}
function s4(n) {
  let e = n.domSelectionRange();
  if (!e.focusNode)
    return null;
  let t = Y6(e.focusNode, e.focusOffset), i = Z6(e.focusNode, e.focusOffset);
  if (t && i && t != i) {
    let r = i.pmViewDesc, s = n.domObserver.lastChangedTextNode;
    if (t == s || i == s)
      return s;
    if (!r || !r.isText(i.nodeValue))
      return i;
    if (n.input.compositionNode == i) {
      let o = t.pmViewDesc;
      if (!(!o || !o.isText(t.nodeValue)))
        return i;
    }
  }
  return t || i;
}
function o4() {
  let n = document.createEvent("Event");
  return n.initEvent("event", !0, !0), n.timeStamp;
}
function Zi(n, e = !1) {
  if (!(ot && n.domObserver.flushingSoon >= 0)) {
    if (n.domObserver.forceFlush(), Dh(n), e || n.docView && n.docView.dirty) {
      let t = Fo(n), i = n.state.selection;
      return t && !t.eq(i) ? n.dispatch(n.state.tr.setSelection(t)) : (n.markCursor || e) && !i.$from.node(i.$from.sharedDepth(i.to)).inlineContent ? n.dispatch(n.state.tr.deleteSelection()) : n.updateState(n.state), !0;
    }
    return !1;
  }
}
function a4(n, e) {
  if (!n.dom.parentNode)
    return;
  let t = n.dom.parentNode.appendChild(document.createElement("div"));
  t.appendChild(e), t.style.cssText = "position: fixed; left: -10000px; top: 10px";
  let i = getSelection(), r = document.createRange();
  r.selectNodeContents(e), n.dom.blur(), i.removeAllRanges(), i.addRange(r), setTimeout(() => {
    t.parentNode && t.parentNode.removeChild(t), n.focus();
  }, 50);
}
const Jn = Oe && Ct < 15 || wn && n3 < 604;
Ne.copy = Ee.cut = (n, e) => {
  let t = e, i = n.state.selection, r = t.type == "cut";
  if (i.empty)
    return;
  let s = Jn ? null : t.clipboardData, o = i.content(), { dom: a, text: l } = Ho(n, o);
  s ? (t.preventDefault(), s.clearData(), s.setData("text/html", a.innerHTML), s.setData("text/plain", l)) : a4(n, a), r && n.dispatch(n.state.tr.deleteSelection().scrollIntoView().setMeta("uiEvent", "cut"));
};
function l4(n) {
  return n.openStart == 0 && n.openEnd == 0 && n.content.childCount == 1 ? n.content.firstChild : null;
}
function c4(n, e) {
  if (!n.dom.parentNode)
    return;
  let t = n.input.shiftKey || n.state.selection.$from.parent.type.spec.code, i = n.dom.parentNode.appendChild(document.createElement(t ? "textarea" : "div"));
  t || (i.contentEditable = "true"), i.style.cssText = "position: fixed; left: -10000px; top: 10px", i.focus();
  let r = n.input.shiftKey && n.input.lastKeyCode != 45;
  setTimeout(() => {
    n.focus(), i.parentNode && i.parentNode.removeChild(i), t ? Gn(n, i.value, null, r, e) : Gn(n, i.textContent, i.innerHTML, r, e);
  }, 50);
}
function Gn(n, e, t, i, r) {
  let s = Sh(n, e, t, i, n.state.selection.$from);
  if (n.someProp("handlePaste", (l) => l(n, r, s || N.empty)))
    return !0;
  if (!s)
    return !1;
  let o = l4(s), a = o ? n.state.tr.replaceSelectionWith(o, i) : n.state.tr.replaceSelection(s);
  return n.dispatch(a.scrollIntoView().setMeta("paste", !0).setMeta("uiEvent", "paste")), !0;
}
function $h(n) {
  let e = n.getData("text/plain") || n.getData("Text");
  if (e)
    return e;
  let t = n.getData("text/uri-list");
  return t ? t.replace(/\r?\n/g, " ") : "";
}
Ee.paste = (n, e) => {
  let t = e;
  if (n.composing && !ot)
    return;
  let i = Jn ? null : t.clipboardData, r = n.input.shiftKey && n.input.lastKeyCode != 45;
  i && Gn(n, $h(i), i.getData("text/html"), r, t) ? t.preventDefault() : c4(n, t);
};
class Rh {
  constructor(e, t, i) {
    this.slice = e, this.move = t, this.node = i;
  }
}
const u4 = Be ? "altKey" : "ctrlKey";
function Ph(n, e) {
  let t = n.someProp("dragCopies", (i) => !i(e));
  return t != null ? t : !e[u4];
}
Ne.dragstart = (n, e) => {
  let t = e, i = n.input.mouseDown;
  if (i && i.done(), !t.dataTransfer)
    return;
  let r = n.state.selection, s = r.empty ? null : n.posAtCoords(wr(t)), o;
  if (!(s && s.pos >= r.from && s.pos <= (r instanceof D ? r.to - 1 : r.to))) {
    if (i && i.mightDrag)
      o = D.create(n.state.doc, i.mightDrag.pos);
    else if (t.target && t.target.nodeType == 1) {
      let d = n.docView.nearestDesc(t.target, !0);
      d && d.node.type.spec.draggable && d != n.docView && (o = D.create(n.state.doc, d.posBefore));
    }
  }
  let a = (o || n.state.selection).content(), { dom: l, text: c, slice: u } = Ho(n, a);
  (!t.dataTransfer.files.length || !ue || ah > 120) && t.dataTransfer.clearData(), t.dataTransfer.setData(Jn ? "Text" : "text/html", l.innerHTML), t.dataTransfer.effectAllowed = "copyMove", Jn || t.dataTransfer.setData("text/plain", c), n.dragging = new Rh(u, Ph(n, t), o);
};
Ne.dragend = (n) => {
  let e = n.dragging;
  window.setTimeout(() => {
    n.dragging == e && (n.dragging = null);
  }, 50);
};
Ee.dragover = Ee.dragenter = (n, e) => e.preventDefault();
Ee.drop = (n, e) => {
  try {
    d4(n, e, n.dragging);
  } finally {
    n.dragging = null;
  }
};
function d4(n, e, t) {
  if (!e.dataTransfer)
    return;
  let i = n.posAtCoords(wr(e));
  if (!i)
    return;
  let r = n.state.doc.resolve(i.pos), s = t && t.slice;
  s ? n.someProp("transformPasted", (p) => {
    s = p(s, n, !1);
  }) : s = Sh(n, $h(e.dataTransfer), Jn ? null : e.dataTransfer.getData("text/html"), !1, r);
  let o = !!(t && Ph(n, e));
  if (n.someProp("handleDrop", (p) => p(n, e, s || N.empty, o))) {
    e.preventDefault();
    return;
  }
  if (!s)
    return;
  e.preventDefault();
  let a = s ? qd(n.state.doc, r.pos, s) : r.pos;
  a == null && (a = r.pos);
  let l = n.state.tr;
  if (o) {
    let { node: p } = t;
    p ? p.replace(l) : l.deleteSelection();
  }
  let c = l.mapping.map(a), u = s.openStart == 0 && s.openEnd == 0 && s.content.childCount == 1, d = l.doc;
  if (u ? l.replaceRangeWith(c, c, s.content.firstChild) : l.replaceRange(c, c, s), l.doc.eq(d))
    return;
  let f = l.doc.resolve(c);
  if (u && D.isSelectable(s.content.firstChild) && f.nodeAfter && f.nodeAfter.sameMarkup(s.content.firstChild))
    l.setSelection(new D(f));
  else {
    let p = l.mapping.map(a);
    l.mapping.maps[l.mapping.maps.length - 1].forEach((m, v, y, g) => p = g), l.setSelection(Vo(n, f, l.doc.resolve(p)));
  }
  n.focus(), n.dispatch(l.setMeta("uiEvent", "drop"));
}
Ne.focus = (n) => {
  n.input.lastFocus = Date.now(), n.focused || (n.domObserver.stop(), n.dom.classList.add("ProseMirror-focused"), n.domObserver.start(), n.focused = !0, setTimeout(() => {
    n.docView && n.hasFocus() && !n.domObserver.currentSelection.eq(n.domSelectionRange()) && lt(n);
  }, 20));
};
Ne.blur = (n, e) => {
  let t = e;
  n.focused && (n.domObserver.stop(), n.dom.classList.remove("ProseMirror-focused"), n.domObserver.start(), t.relatedTarget && n.dom.contains(t.relatedTarget) && n.domObserver.currentSelection.clear(), n.focused = !1);
};
Ne.beforeinput = (n, e) => {
  if (ue && ot && e.inputType == "deleteContentBackward") {
    n.domObserver.flushSoon();
    let { domChangeCount: i } = n.input;
    setTimeout(() => {
      if (n.input.domChangeCount != i || (n.dom.blur(), n.focus(), n.someProp("handleKeyDown", (s) => s(n, Dt(8, "Backspace")))))
        return;
      let { $cursor: r } = n.state.selection;
      r && r.pos > 0 && n.dispatch(n.state.tr.delete(r.pos - 1, r.pos).scrollIntoView());
    }, 50);
  }
};
for (let n in Ee)
  Ne[n] = Ee[n];
function Xn(n, e) {
  if (n == e)
    return !0;
  for (let t in n)
    if (n[t] !== e[t])
      return !1;
  for (let t in e)
    if (!(t in n))
      return !1;
  return !0;
}
class Qi {
  constructor(e, t) {
    this.toDOM = e, this.spec = t || Bt, this.side = this.spec.side || 0;
  }
  map(e, t, i, r) {
    let { pos: s, deleted: o } = e.mapResult(t.from + r, this.side < 0 ? -1 : 1);
    return o ? null : new _e(s - i, s - i, this);
  }
  valid() {
    return !0;
  }
  eq(e) {
    return this == e || e instanceof Qi && (this.spec.key && this.spec.key == e.spec.key || this.toDOM == e.toDOM && Xn(this.spec, e.spec));
  }
  destroy(e) {
    this.spec.destroy && this.spec.destroy(e);
  }
}
class xt {
  constructor(e, t) {
    this.attrs = e, this.spec = t || Bt;
  }
  map(e, t, i, r) {
    let s = e.map(t.from + r, this.spec.inclusiveStart ? -1 : 1) - i, o = e.map(t.to + r, this.spec.inclusiveEnd ? 1 : -1) - i;
    return s >= o ? null : new _e(s, o, this);
  }
  valid(e, t) {
    return t.from < t.to;
  }
  eq(e) {
    return this == e || e instanceof xt && Xn(this.attrs, e.attrs) && Xn(this.spec, e.spec);
  }
  static is(e) {
    return e.type instanceof xt;
  }
  destroy() {
  }
}
class qo {
  constructor(e, t) {
    this.attrs = e, this.spec = t || Bt;
  }
  map(e, t, i, r) {
    let s = e.mapResult(t.from + r, 1);
    if (s.deleted)
      return null;
    let o = e.mapResult(t.to + r, -1);
    return o.deleted || o.pos <= s.pos ? null : new _e(s.pos - i, o.pos - i, this);
  }
  valid(e, t) {
    let { index: i, offset: r } = e.content.findIndex(t.from), s;
    return r == t.from && !(s = e.child(i)).isText && r + s.nodeSize == t.to;
  }
  eq(e) {
    return this == e || e instanceof qo && Xn(this.attrs, e.attrs) && Xn(this.spec, e.spec);
  }
  destroy() {
  }
}
class _e {
  /**
  @internal
  */
  constructor(e, t, i) {
    this.from = e, this.to = t, this.type = i;
  }
  /**
  @internal
  */
  copy(e, t) {
    return new _e(e, t, this.type);
  }
  /**
  @internal
  */
  eq(e, t = 0) {
    return this.type.eq(e.type) && this.from + t == e.from && this.to + t == e.to;
  }
  /**
  @internal
  */
  map(e, t, i) {
    return this.type.map(e, this, t, i);
  }
  /**
  Creates a widget decoration, which is a DOM node that's shown in
  the document at the given position. It is recommended that you
  delay rendering the widget by passing a function that will be
  called when the widget is actually drawn in a view, but you can
  also directly pass a DOM node. `getPos` can be used to find the
  widget's current document position.
  */
  static widget(e, t, i) {
    return new _e(e, e, new Qi(t, i));
  }
  /**
  Creates an inline decoration, which adds the given attributes to
  each inline node between `from` and `to`.
  */
  static inline(e, t, i, r) {
    return new _e(e, t, new xt(i, r));
  }
  /**
  Creates a node decoration. `from` and `to` should point precisely
  before and after a node in the document. That node, and only that
  node, will receive the given attributes.
  */
  static node(e, t, i, r) {
    return new _e(e, t, new qo(i, r));
  }
  /**
  The spec provided when creating this decoration. Can be useful
  if you've stored extra information in that object.
  */
  get spec() {
    return this.type.spec;
  }
  /**
  @internal
  */
  get inline() {
    return this.type instanceof xt;
  }
  /**
  @internal
  */
  get widget() {
    return this.type instanceof Qi;
  }
}
const on = [], Bt = {};
class Z {
  /**
  @internal
  */
  constructor(e, t) {
    this.local = e.length ? e : on, this.children = t.length ? t : on;
  }
  /**
  Create a set of decorations, using the structure of the given
  document. This will consume (modify) the `decorations` array, so
  you must make a copy if you want need to preserve that.
  */
  static create(e, t) {
    return t.length ? er(t, e, 0, Bt) : Ce;
  }
  /**
  Find all decorations in this set which touch the given range
  (including decorations that start or end directly at the
  boundaries) and match the given predicate on their spec. When
  `start` and `end` are omitted, all decorations in the set are
  considered. When `predicate` isn't given, all decorations are
  assumed to match.
  */
  find(e, t, i) {
    let r = [];
    return this.findInner(e == null ? 0 : e, t == null ? 1e9 : t, r, 0, i), r;
  }
  findInner(e, t, i, r, s) {
    for (let o = 0; o < this.local.length; o++) {
      let a = this.local[o];
      a.from <= t && a.to >= e && (!s || s(a.spec)) && i.push(a.copy(a.from + r, a.to + r));
    }
    for (let o = 0; o < this.children.length; o += 3)
      if (this.children[o] < t && this.children[o + 1] > e) {
        let a = this.children[o] + 1;
        this.children[o + 2].findInner(e - a, t - a, i, r + a, s);
      }
  }
  /**
  Map the set of decorations in response to a change in the
  document.
  */
  map(e, t, i) {
    return this == Ce || e.maps.length == 0 ? this : this.mapInner(e, t, 0, 0, i || Bt);
  }
  /**
  @internal
  */
  mapInner(e, t, i, r, s) {
    let o;
    for (let a = 0; a < this.local.length; a++) {
      let l = this.local[a].map(e, i, r);
      l && l.type.valid(t, l) ? (o || (o = [])).push(l) : s.onRemove && s.onRemove(this.local[a].spec);
    }
    return this.children.length ? h4(this.children, o || [], e, t, i, r, s) : o ? new Z(o.sort(Ft), on) : Ce;
  }
  /**
  Add the given array of decorations to the ones in the set,
  producing a new set. Consumes the `decorations` array. Needs
  access to the current document to create the appropriate tree
  structure.
  */
  add(e, t) {
    return t.length ? this == Ce ? Z.create(e, t) : this.addInner(e, t, 0) : this;
  }
  addInner(e, t, i) {
    let r, s = 0;
    e.forEach((a, l) => {
      let c = l + i, u;
      if (u = zh(t, a, c)) {
        for (r || (r = this.children.slice()); s < r.length && r[s] < l; )
          s += 3;
        r[s] == l ? r[s + 2] = r[s + 2].addInner(a, u, c + 1) : r.splice(s, 0, l, l + a.nodeSize, er(u, a, c + 1, Bt)), s += 3;
      }
    });
    let o = Lh(s ? Bh(t) : t, -i);
    for (let a = 0; a < o.length; a++)
      o[a].type.valid(e, o[a]) || o.splice(a--, 1);
    return new Z(o.length ? this.local.concat(o).sort(Ft) : this.local, r || this.children);
  }
  /**
  Create a new set that contains the decorations in this set, minus
  the ones in the given array.
  */
  remove(e) {
    return e.length == 0 || this == Ce ? this : this.removeInner(e, 0);
  }
  removeInner(e, t) {
    let i = this.children, r = this.local;
    for (let s = 0; s < i.length; s += 3) {
      let o, a = i[s] + t, l = i[s + 1] + t;
      for (let u = 0, d; u < e.length; u++)
        (d = e[u]) && d.from > a && d.to < l && (e[u] = null, (o || (o = [])).push(d));
      if (!o)
        continue;
      i == this.children && (i = this.children.slice());
      let c = i[s + 2].removeInner(o, a + 1);
      c != Ce ? i[s + 2] = c : (i.splice(s, 3), s -= 3);
    }
    if (r.length) {
      for (let s = 0, o; s < e.length; s++)
        if (o = e[s])
          for (let a = 0; a < r.length; a++)
            r[a].eq(o, t) && (r == this.local && (r = this.local.slice()), r.splice(a--, 1));
    }
    return i == this.children && r == this.local ? this : r.length || i.length ? new Z(r, i) : Ce;
  }
  forChild(e, t) {
    if (this == Ce)
      return this;
    if (t.isLeaf)
      return Z.empty;
    let i, r;
    for (let a = 0; a < this.children.length; a += 3)
      if (this.children[a] >= e) {
        this.children[a] == e && (i = this.children[a + 2]);
        break;
      }
    let s = e + 1, o = s + t.content.size;
    for (let a = 0; a < this.local.length; a++) {
      let l = this.local[a];
      if (l.from < o && l.to > s && l.type instanceof xt) {
        let c = Math.max(s, l.from) - s, u = Math.min(o, l.to) - s;
        c < u && (r || (r = [])).push(l.copy(c, u));
      }
    }
    if (r) {
      let a = new Z(r.sort(Ft), on);
      return i ? new gt([a, i]) : a;
    }
    return i || Ce;
  }
  /**
  @internal
  */
  eq(e) {
    if (this == e)
      return !0;
    if (!(e instanceof Z) || this.local.length != e.local.length || this.children.length != e.children.length)
      return !1;
    for (let t = 0; t < this.local.length; t++)
      if (!this.local[t].eq(e.local[t]))
        return !1;
    for (let t = 0; t < this.children.length; t += 3)
      if (this.children[t] != e.children[t] || this.children[t + 1] != e.children[t + 1] || !this.children[t + 2].eq(e.children[t + 2]))
        return !1;
    return !0;
  }
  /**
  @internal
  */
  locals(e) {
    return Ko(this.localsInner(e));
  }
  /**
  @internal
  */
  localsInner(e) {
    if (this == Ce)
      return on;
    if (e.inlineContent || !this.local.some(xt.is))
      return this.local;
    let t = [];
    for (let i = 0; i < this.local.length; i++)
      this.local[i].type instanceof xt || t.push(this.local[i]);
    return t;
  }
  forEachSet(e) {
    e(this);
  }
}
Z.empty = new Z([], []);
Z.removeOverlap = Ko;
const Ce = Z.empty;
class gt {
  constructor(e) {
    this.members = e;
  }
  map(e, t) {
    const i = this.members.map((r) => r.map(e, t, Bt));
    return gt.from(i);
  }
  forChild(e, t) {
    if (t.isLeaf)
      return Z.empty;
    let i = [];
    for (let r = 0; r < this.members.length; r++) {
      let s = this.members[r].forChild(e, t);
      s != Ce && (s instanceof gt ? i = i.concat(s.members) : i.push(s));
    }
    return gt.from(i);
  }
  eq(e) {
    if (!(e instanceof gt) || e.members.length != this.members.length)
      return !1;
    for (let t = 0; t < this.members.length; t++)
      if (!this.members[t].eq(e.members[t]))
        return !1;
    return !0;
  }
  locals(e) {
    let t, i = !0;
    for (let r = 0; r < this.members.length; r++) {
      let s = this.members[r].localsInner(e);
      if (s.length)
        if (!t)
          t = s;
        else {
          i && (t = t.slice(), i = !1);
          for (let o = 0; o < s.length; o++)
            t.push(s[o]);
        }
    }
    return t ? Ko(i ? t : t.sort(Ft)) : on;
  }
  // Create a group for the given array of decoration sets, or return
  // a single set when possible.
  static from(e) {
    switch (e.length) {
      case 0:
        return Ce;
      case 1:
        return e[0];
      default:
        return new gt(e.every((t) => t instanceof Z) ? e : e.reduce((t, i) => t.concat(i instanceof Z ? i : i.members), []));
    }
  }
  forEachSet(e) {
    for (let t = 0; t < this.members.length; t++)
      this.members[t].forEachSet(e);
  }
}
function h4(n, e, t, i, r, s, o) {
  let a = n.slice();
  for (let c = 0, u = s; c < t.maps.length; c++) {
    let d = 0;
    t.maps[c].forEach((f, p, m, v) => {
      let y = v - m - (p - f);
      for (let g = 0; g < a.length; g += 3) {
        let b = a[g + 1];
        if (b < 0 || f > b + u - d)
          continue;
        let w = a[g] + u - d;
        p >= w ? a[g + 1] = f <= w ? -2 : -1 : f >= u && y && (a[g] += y, a[g + 1] += y);
      }
      d += y;
    }), u = t.maps[c].map(u, -1);
  }
  let l = !1;
  for (let c = 0; c < a.length; c += 3)
    if (a[c + 1] < 0) {
      if (a[c + 1] == -2) {
        l = !0, a[c + 1] = -1;
        continue;
      }
      let u = t.map(n[c] + s), d = u - r;
      if (d < 0 || d >= i.content.size) {
        l = !0;
        continue;
      }
      let f = t.map(n[c + 1] + s, -1), p = f - r, { index: m, offset: v } = i.content.findIndex(d), y = i.maybeChild(m);
      if (y && v == d && v + y.nodeSize == p) {
        let g = a[c + 2].mapInner(t, y, u + 1, n[c] + s + 1, o);
        g != Ce ? (a[c] = d, a[c + 1] = p, a[c + 2] = g) : (a[c + 1] = -2, l = !0);
      } else
        l = !0;
    }
  if (l) {
    let c = f4(a, n, e, t, r, s, o), u = er(c, i, 0, o);
    e = u.local;
    for (let d = 0; d < a.length; d += 3)
      a[d + 1] < 0 && (a.splice(d, 3), d -= 3);
    for (let d = 0, f = 0; d < u.children.length; d += 3) {
      let p = u.children[d];
      for (; f < a.length && a[f] < p; )
        f += 3;
      a.splice(f, 0, u.children[d], u.children[d + 1], u.children[d + 2]);
    }
  }
  return new Z(e.sort(Ft), a);
}
function Lh(n, e) {
  if (!e || !n.length)
    return n;
  let t = [];
  for (let i = 0; i < n.length; i++) {
    let r = n[i];
    t.push(new _e(r.from + e, r.to + e, r.type));
  }
  return t;
}
function f4(n, e, t, i, r, s, o) {
  function a(l, c) {
    for (let u = 0; u < l.local.length; u++) {
      let d = l.local[u].map(i, r, c);
      d ? t.push(d) : o.onRemove && o.onRemove(l.local[u].spec);
    }
    for (let u = 0; u < l.children.length; u += 3)
      a(l.children[u + 2], l.children[u] + c + 1);
  }
  for (let l = 0; l < n.length; l += 3)
    n[l + 1] == -1 && a(n[l + 2], e[l] + s + 1);
  return t;
}
function zh(n, e, t) {
  if (e.isLeaf)
    return null;
  let i = t + e.nodeSize, r = null;
  for (let s = 0, o; s < n.length; s++)
    (o = n[s]) && o.from > t && o.to < i && ((r || (r = [])).push(o), n[s] = null);
  return r;
}
function Bh(n) {
  let e = [];
  for (let t = 0; t < n.length; t++)
    n[t] != null && e.push(n[t]);
  return e;
}
function er(n, e, t, i) {
  let r = [], s = !1;
  e.forEach((a, l) => {
    let c = zh(n, a, l + t);
    if (c) {
      s = !0;
      let u = er(c, a, t + l + 1, i);
      u != Ce && r.push(l, l + a.nodeSize, u);
    }
  });
  let o = Lh(s ? Bh(n) : n, -t).sort(Ft);
  for (let a = 0; a < o.length; a++)
    o[a].type.valid(e, o[a]) || (i.onRemove && i.onRemove(o[a].spec), o.splice(a--, 1));
  return o.length || r.length ? new Z(o, r) : Ce;
}
function Ft(n, e) {
  return n.from - e.from || n.to - e.to;
}
function Ko(n) {
  let e = n;
  for (let t = 0; t < e.length - 1; t++) {
    let i = e[t];
    if (i.from != i.to)
      for (let r = t + 1; r < e.length; r++) {
        let s = e[r];
        if (s.from == i.from) {
          s.to != i.to && (e == n && (e = n.slice()), e[r] = s.copy(s.from, i.to), ic(e, r + 1, s.copy(i.to, s.to)));
          continue;
        } else {
          s.from < i.to && (e == n && (e = n.slice()), e[t] = i.copy(i.from, s.from), ic(e, r, i.copy(s.from, i.to)));
          break;
        }
      }
  }
  return e;
}
function ic(n, e, t) {
  for (; e < n.length && Ft(t, n[e]) > 0; )
    e++;
  n.splice(e, 0, t);
}
function ls(n) {
  let e = [];
  return n.someProp("decorations", (t) => {
    let i = t(n.state);
    i && i != Ce && e.push(i);
  }), n.cursorWrapper && e.push(Z.create(n.state.doc, [n.cursorWrapper.deco])), gt.from(e);
}
const p4 = {
  childList: !0,
  characterData: !0,
  characterDataOldValue: !0,
  attributes: !0,
  attributeOldValue: !0,
  subtree: !0
}, m4 = Oe && Ct <= 11;
class g4 {
  constructor() {
    this.anchorNode = null, this.anchorOffset = 0, this.focusNode = null, this.focusOffset = 0;
  }
  set(e) {
    this.anchorNode = e.anchorNode, this.anchorOffset = e.anchorOffset, this.focusNode = e.focusNode, this.focusOffset = e.focusOffset;
  }
  clear() {
    this.anchorNode = this.focusNode = null;
  }
  eq(e) {
    return e.anchorNode == this.anchorNode && e.anchorOffset == this.anchorOffset && e.focusNode == this.focusNode && e.focusOffset == this.focusOffset;
  }
}
class v4 {
  constructor(e, t) {
    this.view = e, this.handleDOMChange = t, this.queue = [], this.flushingSoon = -1, this.observer = null, this.currentSelection = new g4(), this.onCharData = null, this.suppressingSelectionUpdates = !1, this.lastChangedTextNode = null, this.observer = window.MutationObserver && new window.MutationObserver((i) => {
      for (let r = 0; r < i.length; r++)
        this.queue.push(i[r]);
      Oe && Ct <= 11 && i.some((r) => r.type == "childList" && r.removedNodes.length || r.type == "characterData" && r.oldValue.length > r.target.nodeValue.length) ? this.flushSoon() : this.flush();
    }), m4 && (this.onCharData = (i) => {
      this.queue.push({ target: i.target, type: "characterData", oldValue: i.prevValue }), this.flushSoon();
    }), this.onSelectionChange = this.onSelectionChange.bind(this);
  }
  flushSoon() {
    this.flushingSoon < 0 && (this.flushingSoon = window.setTimeout(() => {
      this.flushingSoon = -1, this.flush();
    }, 20));
  }
  forceFlush() {
    this.flushingSoon > -1 && (window.clearTimeout(this.flushingSoon), this.flushingSoon = -1, this.flush());
  }
  start() {
    this.observer && (this.observer.takeRecords(), this.observer.observe(this.view.dom, p4)), this.onCharData && this.view.dom.addEventListener("DOMCharacterDataModified", this.onCharData), this.connectSelection();
  }
  stop() {
    if (this.observer) {
      let e = this.observer.takeRecords();
      if (e.length) {
        for (let t = 0; t < e.length; t++)
          this.queue.push(e[t]);
        window.setTimeout(() => this.flush(), 20);
      }
      this.observer.disconnect();
    }
    this.onCharData && this.view.dom.removeEventListener("DOMCharacterDataModified", this.onCharData), this.disconnectSelection();
  }
  connectSelection() {
    this.view.dom.ownerDocument.addEventListener("selectionchange", this.onSelectionChange);
  }
  disconnectSelection() {
    this.view.dom.ownerDocument.removeEventListener("selectionchange", this.onSelectionChange);
  }
  suppressSelectionUpdates() {
    this.suppressingSelectionUpdates = !0, setTimeout(() => this.suppressingSelectionUpdates = !1, 50);
  }
  onSelectionChange() {
    if (Gl(this.view)) {
      if (this.suppressingSelectionUpdates)
        return lt(this.view);
      if (Oe && Ct <= 11 && !this.view.state.selection.empty) {
        let e = this.view.domSelectionRange();
        if (e.focusNode && Ut(e.focusNode, e.focusOffset, e.anchorNode, e.anchorOffset))
          return this.flushSoon();
      }
      this.flush();
    }
  }
  setCurSelection() {
    this.currentSelection.set(this.view.domSelectionRange());
  }
  ignoreSelectionChange(e) {
    if (!e.focusNode)
      return !0;
    let t = /* @__PURE__ */ new Set(), i;
    for (let s = e.focusNode; s; s = bn(s))
      t.add(s);
    for (let s = e.anchorNode; s; s = bn(s))
      if (t.has(s)) {
        i = s;
        break;
      }
    let r = i && this.view.docView.nearestDesc(i);
    if (r && r.ignoreMutation({
      type: "selection",
      target: i.nodeType == 3 ? i.parentNode : i
    }))
      return this.setCurSelection(), !0;
  }
  pendingRecords() {
    if (this.observer)
      for (let e of this.observer.takeRecords())
        this.queue.push(e);
    return this.queue;
  }
  flush() {
    let { view: e } = this;
    if (!e.docView || this.flushingSoon > -1)
      return;
    let t = this.pendingRecords();
    t.length && (this.queue = []);
    let i = e.domSelectionRange(), r = !this.suppressingSelectionUpdates && !this.currentSelection.eq(i) && Gl(e) && !this.ignoreSelectionChange(i), s = -1, o = -1, a = !1, l = [];
    if (e.editable)
      for (let u = 0; u < t.length; u++) {
        let d = this.registerMutation(t[u], l);
        d && (s = s < 0 ? d.from : Math.min(d.from, s), o = o < 0 ? d.to : Math.max(d.to, o), d.typeOver && (a = !0));
      }
    if (He && l.length) {
      let u = l.filter((d) => d.nodeName == "BR");
      if (u.length == 2) {
        let [d, f] = u;
        d.parentNode && d.parentNode.parentNode == f.parentNode ? f.remove() : d.remove();
      } else {
        let { focusNode: d } = this.currentSelection;
        for (let f of u) {
          let p = f.parentNode;
          p && p.nodeName == "LI" && (!d || w4(e, d) != p) && f.remove();
        }
      }
    } else if ((ue || xe) && l.some((u) => u.nodeName == "BR") && (e.input.lastKeyCode == 8 || e.input.lastKeyCode == 46)) {
      for (let u of l)
        if (u.nodeName == "BR" && u.parentNode) {
          let d = u.nextSibling;
          d && d.nodeType == 1 && d.contentEditable == "false" && u.parentNode.removeChild(u);
        }
    }
    let c = null;
    s < 0 && r && e.input.lastFocus > Date.now() - 200 && Math.max(e.input.lastTouch, e.input.lastClick.time) < Date.now() - 300 && yr(i) && (c = Fo(e)) && c.eq(B.near(e.state.doc.resolve(0), 1)) ? (e.input.lastFocus = 0, lt(e), this.currentSelection.set(i), e.scrollToSelection()) : (s > -1 || r) && (s > -1 && (e.docView.markDirty(s, o), y4(e)), this.handleDOMChange(s, o, a, l), e.docView && e.docView.dirty ? e.updateState(e.state) : this.currentSelection.eq(i) || lt(e), this.currentSelection.set(i));
  }
  registerMutation(e, t) {
    if (t.indexOf(e.target) > -1)
      return null;
    let i = this.view.docView.nearestDesc(e.target);
    if (e.type == "attributes" && (i == this.view.docView || e.attributeName == "contenteditable" || // Firefox sometimes fires spurious events for null/empty styles
    e.attributeName == "style" && !e.oldValue && !e.target.getAttribute("style")) || !i || i.ignoreMutation(e))
      return null;
    if (e.type == "childList") {
      for (let u = 0; u < e.addedNodes.length; u++) {
        let d = e.addedNodes[u];
        t.push(d), d.nodeType == 3 && (this.lastChangedTextNode = d);
      }
      if (i.contentDOM && i.contentDOM != i.dom && !i.contentDOM.contains(e.target))
        return { from: i.posBefore, to: i.posAfter };
      let r = e.previousSibling, s = e.nextSibling;
      if (Oe && Ct <= 11 && e.addedNodes.length)
        for (let u = 0; u < e.addedNodes.length; u++) {
          let { previousSibling: d, nextSibling: f } = e.addedNodes[u];
          (!d || Array.prototype.indexOf.call(e.addedNodes, d) < 0) && (r = d), (!f || Array.prototype.indexOf.call(e.addedNodes, f) < 0) && (s = f);
        }
      let o = r && r.parentNode == e.target ? me(r) + 1 : 0, a = i.localPosFromDOM(e.target, o, -1), l = s && s.parentNode == e.target ? me(s) : e.target.childNodes.length, c = i.localPosFromDOM(e.target, l, 1);
      return { from: a, to: c };
    } else
      return e.type == "attributes" ? { from: i.posAtStart - i.border, to: i.posAtEnd + i.border } : (this.lastChangedTextNode = e.target, {
        from: i.posAtStart,
        to: i.posAtEnd,
        // An event was generated for a text change that didn't change
        // any text. Mark the dom change to fall back to assuming the
        // selection was typed over with an identical value if it can't
        // find another change.
        typeOver: e.target.nodeValue == e.oldValue
      });
  }
}
let rc = /* @__PURE__ */ new WeakMap(), sc = !1;
function y4(n) {
  if (!rc.has(n) && (rc.set(n, null), ["normal", "nowrap", "pre-line"].indexOf(getComputedStyle(n.dom).whiteSpace) !== -1)) {
    if (n.requiresGeckoHackNode = He, sc)
      return;
    console.warn("ProseMirror expects the CSS white-space property to be set, preferably to 'pre-wrap'. It is recommended to load style/prosemirror.css from the prosemirror-view package."), sc = !0;
  }
}
function oc(n, e) {
  let t = e.startContainer, i = e.startOffset, r = e.endContainer, s = e.endOffset, o = n.domAtPos(n.state.selection.anchor);
  return Ut(o.node, o.offset, r, s) && ([t, i, r, s] = [r, s, t, i]), { anchorNode: t, anchorOffset: i, focusNode: r, focusOffset: s };
}
function b4(n, e) {
  if (e.getComposedRanges) {
    let r = e.getComposedRanges(n.root)[0];
    if (r)
      return oc(n, r);
  }
  let t;
  function i(r) {
    r.preventDefault(), r.stopImmediatePropagation(), t = r.getTargetRanges()[0];
  }
  return n.dom.addEventListener("beforeinput", i, !0), document.execCommand("indent"), n.dom.removeEventListener("beforeinput", i, !0), t ? oc(n, t) : null;
}
function w4(n, e) {
  for (let t = e.parentNode; t && t != n.dom; t = t.parentNode) {
    let i = n.docView.nearestDesc(t, !0);
    if (i && i.node.isBlock)
      return t;
  }
  return null;
}
function C4(n, e, t) {
  let { node: i, fromOffset: r, toOffset: s, from: o, to: a } = n.docView.parseRange(e, t), l = n.domSelectionRange(), c, u = l.anchorNode;
  if (u && n.dom.contains(u.nodeType == 1 ? u : u.parentNode) && (c = [{ node: u, offset: l.anchorOffset }], yr(l) || c.push({ node: l.focusNode, offset: l.focusOffset })), ue && n.input.lastKeyCode === 8)
    for (let y = s; y > r; y--) {
      let g = i.childNodes[y - 1], b = g.pmViewDesc;
      if (g.nodeName == "BR" && !b) {
        s = y;
        break;
      }
      if (!b || b.size)
        break;
    }
  let d = n.state.doc, f = n.someProp("domParser") || Rn.fromSchema(n.state.schema), p = d.resolve(o), m = null, v = f.parse(i, {
    topNode: p.parent,
    topMatch: p.parent.contentMatchAt(p.index()),
    topOpen: !0,
    from: r,
    to: s,
    preserveWhitespace: p.parent.type.whitespace == "pre" ? "full" : !0,
    findPositions: c,
    ruleFromNode: k4,
    context: p
  });
  if (c && c[0].pos != null) {
    let y = c[0].pos, g = c[1] && c[1].pos;
    g == null && (g = y), m = { anchor: y + o, head: g + o };
  }
  return { doc: v, sel: m, from: o, to: a };
}
function k4(n) {
  let e = n.pmViewDesc;
  if (e)
    return e.parseRule();
  if (n.nodeName == "BR" && n.parentNode) {
    if (xe && /^(ul|ol)$/i.test(n.parentNode.nodeName)) {
      let t = document.createElement("div");
      return t.appendChild(document.createElement("li")), { skip: t };
    } else if (n.parentNode.lastChild == n || xe && /^(tr|table)$/i.test(n.parentNode.nodeName))
      return { ignore: !0 };
  } else if (n.nodeName == "IMG" && n.getAttribute("mark-placeholder"))
    return { ignore: !0 };
  return null;
}
const x4 = /^(a|abbr|acronym|b|bd[io]|big|br|button|cite|code|data(list)?|del|dfn|em|i|img|ins|kbd|label|map|mark|meter|output|q|ruby|s|samp|small|span|strong|su[bp]|time|u|tt|var)$/i;
function S4(n, e, t, i, r) {
  let s = n.input.compositionPendingChanges || (n.composing ? n.input.compositionID : 0);
  if (n.input.compositionPendingChanges = 0, e < 0) {
    let M = n.input.lastSelectionTime > Date.now() - 50 ? n.input.lastSelectionOrigin : null, A = Fo(n, M);
    if (A && !n.state.selection.eq(A)) {
      if (ue && ot && n.input.lastKeyCode === 13 && Date.now() - 100 < n.input.lastKeyCodeTime && n.someProp("handleKeyDown", (H) => H(n, Dt(13, "Enter"))))
        return;
      let E = n.state.tr.setSelection(A);
      M == "pointer" ? E.setMeta("pointer", !0) : M == "key" && E.scrollIntoView(), s && E.setMeta("composition", s), n.dispatch(E);
    }
    return;
  }
  let o = n.state.doc.resolve(e), a = o.sharedDepth(t);
  e = o.before(a + 1), t = n.state.doc.resolve(t).after(a + 1);
  let l = n.state.selection, c = C4(n, e, t), u = n.state.doc, d = u.slice(c.from, c.to), f, p;
  n.input.lastKeyCode === 8 && Date.now() - 100 < n.input.lastKeyCodeTime ? (f = n.state.selection.to, p = "end") : (f = n.state.selection.from, p = "start"), n.input.lastKeyCode = null;
  let m = _4(d.content, c.doc.content, c.from, f, p);
  if (m && n.input.domChangeCount++, (wn && n.input.lastIOSEnter > Date.now() - 225 || ot) && r.some((M) => M.nodeType == 1 && !x4.test(M.nodeName)) && (!m || m.endA >= m.endB) && n.someProp("handleKeyDown", (M) => M(n, Dt(13, "Enter")))) {
    n.input.lastIOSEnter = 0;
    return;
  }
  if (!m)
    if (i && l instanceof z && !l.empty && l.$head.sameParent(l.$anchor) && !n.composing && !(c.sel && c.sel.anchor != c.sel.head))
      m = { start: l.from, endA: l.to, endB: l.to };
    else {
      if (c.sel) {
        let M = ac(n, n.state.doc, c.sel);
        if (M && !M.eq(n.state.selection)) {
          let A = n.state.tr.setSelection(M);
          s && A.setMeta("composition", s), n.dispatch(A);
        }
      }
      return;
    }
  n.state.selection.from < n.state.selection.to && m.start == m.endB && n.state.selection instanceof z && (m.start > n.state.selection.from && m.start <= n.state.selection.from + 2 && n.state.selection.from >= c.from ? m.start = n.state.selection.from : m.endA < n.state.selection.to && m.endA >= n.state.selection.to - 2 && n.state.selection.to <= c.to && (m.endB += n.state.selection.to - m.endA, m.endA = n.state.selection.to)), Oe && Ct <= 11 && m.endB == m.start + 1 && m.endA == m.start && m.start > c.from && c.doc.textBetween(m.start - c.from - 1, m.start - c.from + 1) == "  " && (m.start--, m.endA--, m.endB--);
  let v = c.doc.resolveNoCache(m.start - c.from), y = c.doc.resolveNoCache(m.endB - c.from), g = u.resolve(m.start), b = v.sameParent(y) && v.parent.inlineContent && g.end() >= m.endA;
  if ((wn && n.input.lastIOSEnter > Date.now() - 225 && (!b || r.some((M) => M.nodeName == "DIV" || M.nodeName == "P")) || !b && v.pos < c.doc.content.size && (!v.sameParent(y) || !v.parent.inlineContent) && v.pos < y.pos && !/\S/.test(c.doc.textBetween(v.pos, y.pos, "", ""))) && n.someProp("handleKeyDown", (M) => M(n, Dt(13, "Enter")))) {
    n.input.lastIOSEnter = 0;
    return;
  }
  if (n.state.selection.anchor > m.start && M4(u, m.start, m.endA, v, y) && n.someProp("handleKeyDown", (M) => M(n, Dt(8, "Backspace")))) {
    ot && ue && n.domObserver.suppressSelectionUpdates();
    return;
  }
  ue && m.endB == m.start && (n.input.lastChromeDelete = Date.now()), ot && !b && v.start() != y.start() && y.parentOffset == 0 && v.depth == y.depth && c.sel && c.sel.anchor == c.sel.head && c.sel.head == m.endA && (m.endB -= 2, y = c.doc.resolveNoCache(m.endB - c.from), setTimeout(() => {
    n.someProp("handleKeyDown", function(M) {
      return M(n, Dt(13, "Enter"));
    });
  }, 20));
  let w = m.start, C = m.endA, x = (M) => {
    let A = M || n.state.tr.replace(w, C, c.doc.slice(m.start - c.from, m.endB - c.from));
    if (c.sel) {
      let E = ac(n, A.doc, c.sel);
      E && !(ue && n.composing && E.empty && (m.start != m.endB || n.input.lastChromeDelete < Date.now() - 100) && (E.head == w || E.head == A.mapping.map(C) - 1) || Oe && E.empty && E.head == w) && A.setSelection(E);
    }
    return s && A.setMeta("composition", s), A.scrollIntoView();
  }, S;
  if (b)
    if (v.pos == y.pos) {
      Oe && Ct <= 11 && v.parentOffset == 0 && (n.domObserver.suppressSelectionUpdates(), setTimeout(() => lt(n), 20));
      let M = x(n.state.tr.delete(w, C)), A = u.resolve(m.start).marksAcross(u.resolve(m.endA));
      A && M.ensureMarks(A), n.dispatch(M);
    } else if (
      // Adding or removing a mark
      m.endA == m.endB && (S = T4(v.parent.content.cut(v.parentOffset, y.parentOffset), g.parent.content.cut(g.parentOffset, m.endA - g.start())))
    ) {
      let M = x(n.state.tr);
      S.type == "add" ? M.addMark(w, C, S.mark) : M.removeMark(w, C, S.mark), n.dispatch(M);
    } else if (v.parent.child(v.index()).isText && v.index() == y.index() - (y.textOffset ? 0 : 1)) {
      let M = v.parent.textBetween(v.parentOffset, y.parentOffset), A = () => x(n.state.tr.insertText(M, w, C));
      n.someProp("handleTextInput", (E) => E(n, w, C, M, A)) || n.dispatch(A());
    } else
      n.dispatch(x());
  else
    n.dispatch(x());
}
function ac(n, e, t) {
  return Math.max(t.anchor, t.head) > e.content.size ? null : Vo(n, e.resolve(t.anchor), e.resolve(t.head));
}
function T4(n, e) {
  let t = n.firstChild.marks, i = e.firstChild.marks, r = t, s = i, o, a, l;
  for (let u = 0; u < i.length; u++)
    r = i[u].removeFromSet(r);
  for (let u = 0; u < t.length; u++)
    s = t[u].removeFromSet(s);
  if (r.length == 1 && s.length == 0)
    a = r[0], o = "add", l = (u) => u.mark(a.addToSet(u.marks));
  else if (r.length == 0 && s.length == 1)
    a = s[0], o = "remove", l = (u) => u.mark(a.removeFromSet(u.marks));
  else
    return null;
  let c = [];
  for (let u = 0; u < e.childCount; u++)
    c.push(l(e.child(u)));
  if (T.from(c).eq(n))
    return { mark: a, type: o };
}
function M4(n, e, t, i, r) {
  if (
    // The content must have shrunk
    t - e <= r.pos - i.pos || // newEnd must point directly at or after the end of the block that newStart points into
    cs(i, !0, !1) < r.pos
  )
    return !1;
  let s = n.resolve(e);
  if (!i.parent.isTextblock) {
    let a = s.nodeAfter;
    return a != null && t == e + a.nodeSize;
  }
  if (s.parentOffset < s.parent.content.size || !s.parent.isTextblock)
    return !1;
  let o = n.resolve(cs(s, !0, !0));
  return !o.parent.isTextblock || o.pos > t || cs(o, !0, !1) < t ? !1 : i.parent.content.cut(i.parentOffset).eq(o.parent.content);
}
function cs(n, e, t) {
  let i = n.depth, r = e ? n.end() : n.pos;
  for (; i > 0 && (e || n.indexAfter(i) == n.node(i).childCount); )
    i--, r++, e = !1;
  if (t) {
    let s = n.node(i).maybeChild(n.indexAfter(i));
    for (; s && !s.isLeaf; )
      s = s.firstChild, r++;
  }
  return r;
}
function _4(n, e, t, i, r) {
  let s = n.findDiffStart(e, t);
  if (s == null)
    return null;
  let { a: o, b: a } = n.findDiffEnd(e, t + n.size, t + e.size);
  if (r == "end") {
    let l = Math.max(0, s - Math.min(o, a));
    i -= o + l - s;
  }
  if (o < s && n.size < e.size) {
    let l = i <= s && i >= o ? s - i : 0;
    s -= l, s && s < e.size && lc(e.textBetween(s - 1, s + 1)) && (s += l ? 1 : -1), a = s + (a - o), o = s;
  } else if (a < s) {
    let l = i <= s && i >= a ? s - i : 0;
    s -= l, s && s < n.size && lc(n.textBetween(s - 1, s + 1)) && (s += l ? 1 : -1), o = s + (o - a), a = s;
  }
  return { start: s, endA: o, endB: a };
}
function lc(n) {
  if (n.length != 2)
    return !1;
  let e = n.charCodeAt(0), t = n.charCodeAt(1);
  return e >= 56320 && e <= 57343 && t >= 55296 && t <= 56319;
}
class Fh {
  /**
  Create a view. `place` may be a DOM node that the editor should
  be appended to, a function that will place it into the document,
  or an object whose `mount` property holds the node to use as the
  document container. If it is `null`, the editor will not be
  added to the document.
  */
  constructor(e, t) {
    this._root = null, this.focused = !1, this.trackWrites = null, this.mounted = !1, this.markCursor = null, this.cursorWrapper = null, this.lastSelectedViewDesc = void 0, this.input = new W3(), this.prevDirectPlugins = [], this.pluginViews = [], this.requiresGeckoHackNode = !1, this.dragging = null, this._props = t, this.state = t.state, this.directPlugins = t.plugins || [], this.directPlugins.forEach(fc), this.dispatch = this.dispatch.bind(this), this.dom = e && e.mount || document.createElement("div"), e && (e.appendChild ? e.appendChild(this.dom) : typeof e == "function" ? e(this.dom) : e.mount && (this.mounted = !0)), this.editable = dc(this), uc(this), this.nodeViews = hc(this), this.docView = jl(this.state.doc, cc(this), ls(this), this.dom, this), this.domObserver = new v4(this, (i, r, s, o) => S4(this, i, r, s, o)), this.domObserver.start(), U3(this), this.updatePluginViews();
  }
  /**
  Holds `true` when a
  [composition](https://w3c.github.io/uievents/#events-compositionevents)
  is active.
  */
  get composing() {
    return this.input.composing;
  }
  /**
  The view's current [props](https://prosemirror.net/docs/ref/#view.EditorProps).
  */
  get props() {
    if (this._props.state != this.state) {
      let e = this._props;
      this._props = {};
      for (let t in e)
        this._props[t] = e[t];
      this._props.state = this.state;
    }
    return this._props;
  }
  /**
  Update the view's props. Will immediately cause an update to
  the DOM.
  */
  update(e) {
    e.handleDOMEvents != this._props.handleDOMEvents && eo(this);
    let t = this._props;
    this._props = e, e.plugins && (e.plugins.forEach(fc), this.directPlugins = e.plugins), this.updateStateInner(e.state, t);
  }
  /**
  Update the view by updating existing props object with the object
  given as argument. Equivalent to `view.update(Object.assign({},
  view.props, props))`.
  */
  setProps(e) {
    let t = {};
    for (let i in this._props)
      t[i] = this._props[i];
    t.state = this.state;
    for (let i in e)
      t[i] = e[i];
    this.update(t);
  }
  /**
  Update the editor's `state` prop, without touching any of the
  other props.
  */
  updateState(e) {
    this.updateStateInner(e, this._props);
  }
  updateStateInner(e, t) {
    var i;
    let r = this.state, s = !1, o = !1;
    e.storedMarks && this.composing && (Dh(this), o = !0), this.state = e;
    let a = r.plugins != e.plugins || this._props.plugins != t.plugins;
    if (a || this._props.plugins != t.plugins || this._props.nodeViews != t.nodeViews) {
      let p = hc(this);
      E4(p, this.nodeViews) && (this.nodeViews = p, s = !0);
    }
    (a || t.handleDOMEvents != this._props.handleDOMEvents) && eo(this), this.editable = dc(this), uc(this);
    let l = ls(this), c = cc(this), u = r.plugins != e.plugins && !r.doc.eq(e.doc) ? "reset" : e.scrollToSelection > r.scrollToSelection ? "to selection" : "preserve", d = s || !this.docView.matchesNode(e.doc, c, l);
    (d || !e.selection.eq(r.selection)) && (o = !0);
    let f = u == "preserve" && o && this.dom.style.overflowAnchor == null && s3(this);
    if (o) {
      this.domObserver.stop();
      let p = d && (Oe || ue) && !this.composing && !r.selection.empty && !e.selection.empty && N4(r.selection, e.selection);
      if (d) {
        let m = ue ? this.trackWrites = this.domSelectionRange().focusNode : null;
        this.composing && (this.input.compositionNode = s4(this)), (s || !this.docView.update(e.doc, c, l, this)) && (this.docView.updateOuterDeco(c), this.docView.destroy(), this.docView = jl(e.doc, c, l, this.dom, this)), m && !this.trackWrites && (p = !0);
      }
      p || !(this.input.mouseDown && this.domObserver.currentSelection.eq(this.domSelectionRange()) && E3(this)) ? lt(this, p) : (Ch(this, e.selection), this.domObserver.setCurSelection()), this.domObserver.start();
    }
    this.updatePluginViews(r), !((i = this.dragging) === null || i === void 0) && i.node && !r.doc.eq(e.doc) && this.updateDraggedNode(this.dragging, r), u == "reset" ? this.dom.scrollTop = 0 : u == "to selection" ? this.scrollToSelection() : f && o3(f);
  }
  /**
  @internal
  */
  scrollToSelection() {
    let e = this.domSelectionRange().focusNode;
    if (!(!e || !this.dom.contains(e.nodeType == 1 ? e : e.parentNode))) {
      if (!this.someProp("handleScrollToSelection", (t) => t(this)))
        if (this.state.selection instanceof D) {
          let t = this.docView.domAfterPos(this.state.selection.from);
          t.nodeType == 1 && Ll(this, t.getBoundingClientRect(), e);
        } else
          Ll(this, this.coordsAtPos(this.state.selection.head, 1), e);
    }
  }
  destroyPluginViews() {
    let e;
    for (; e = this.pluginViews.pop(); )
      e.destroy && e.destroy();
  }
  updatePluginViews(e) {
    if (!e || e.plugins != this.state.plugins || this.directPlugins != this.prevDirectPlugins) {
      this.prevDirectPlugins = this.directPlugins, this.destroyPluginViews();
      for (let t = 0; t < this.directPlugins.length; t++) {
        let i = this.directPlugins[t];
        i.spec.view && this.pluginViews.push(i.spec.view(this));
      }
      for (let t = 0; t < this.state.plugins.length; t++) {
        let i = this.state.plugins[t];
        i.spec.view && this.pluginViews.push(i.spec.view(this));
      }
    } else
      for (let t = 0; t < this.pluginViews.length; t++) {
        let i = this.pluginViews[t];
        i.update && i.update(this, e);
      }
  }
  updateDraggedNode(e, t) {
    let i = e.node, r = -1;
    if (this.state.doc.nodeAt(i.from) == i.node)
      r = i.from;
    else {
      let s = i.from + (this.state.doc.content.size - t.doc.content.size);
      (s > 0 && this.state.doc.nodeAt(s)) == i.node && (r = s);
    }
    this.dragging = new Rh(e.slice, e.move, r < 0 ? void 0 : D.create(this.state.doc, r));
  }
  someProp(e, t) {
    let i = this._props && this._props[e], r;
    if (i != null && (r = t ? t(i) : i))
      return r;
    for (let o = 0; o < this.directPlugins.length; o++) {
      let a = this.directPlugins[o].props[e];
      if (a != null && (r = t ? t(a) : a))
        return r;
    }
    let s = this.state.plugins;
    if (s)
      for (let o = 0; o < s.length; o++) {
        let a = s[o].props[e];
        if (a != null && (r = t ? t(a) : a))
          return r;
      }
  }
  /**
  Query whether the view has focus.
  */
  hasFocus() {
    if (Oe) {
      let e = this.root.activeElement;
      if (e == this.dom)
        return !0;
      if (!e || !this.dom.contains(e))
        return !1;
      for (; e && this.dom != e && this.dom.contains(e); ) {
        if (e.contentEditable == "false")
          return !1;
        e = e.parentElement;
      }
      return !0;
    }
    return this.root.activeElement == this.dom;
  }
  /**
  Focus the editor.
  */
  focus() {
    this.domObserver.stop(), this.editable && a3(this.dom), lt(this), this.domObserver.start();
  }
  /**
  Get the document root in which the editor exists. This will
  usually be the top-level `document`, but might be a [shadow
  DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Shadow_DOM)
  root if the editor is inside one.
  */
  get root() {
    let e = this._root;
    if (e == null) {
      for (let t = this.dom.parentNode; t; t = t.parentNode)
        if (t.nodeType == 9 || t.nodeType == 11 && t.host)
          return t.getSelection || (Object.getPrototypeOf(t).getSelection = () => t.ownerDocument.getSelection()), this._root = t;
    }
    return e || document;
  }
  /**
  When an existing editor view is moved to a new document or
  shadow tree, call this to make it recompute its root.
  */
  updateRoot() {
    this._root = null;
  }
  /**
  Given a pair of viewport coordinates, return the document
  position that corresponds to them. May return null if the given
  coordinates aren't inside of the editor. When an object is
  returned, its `pos` property is the position nearest to the
  coordinates, and its `inside` property holds the position of the
  inner node that the position falls inside of, or -1 if it is at
  the top level, not in any node.
  */
  posAtCoords(e) {
    return h3(this, e);
  }
  /**
  Returns the viewport rectangle at a given document position.
  `left` and `right` will be the same number, as this returns a
  flat cursor-ish rectangle. If the position is between two things
  that aren't directly adjacent, `side` determines which element
  is used. When < 0, the element before the position is used,
  otherwise the element after.
  */
  coordsAtPos(e, t = 1) {
    return fh(this, e, t);
  }
  /**
  Find the DOM position that corresponds to the given document
  position. When `side` is negative, find the position as close as
  possible to the content before the position. When positive,
  prefer positions close to the content after the position. When
  zero, prefer as shallow a position as possible.
  
  Note that you should **not** mutate the editor's internal DOM,
  only inspect it (and even that is usually not necessary).
  */
  domAtPos(e, t = 0) {
    return this.docView.domFromPos(e, t);
  }
  /**
  Find the DOM node that represents the document node after the
  given position. May return `null` when the position doesn't point
  in front of a node or if the node is inside an opaque node view.
  
  This is intended to be able to call things like
  `getBoundingClientRect` on that DOM node. Do **not** mutate the
  editor DOM directly, or add styling this way, since that will be
  immediately overriden by the editor as it redraws the node.
  */
  nodeDOM(e) {
    let t = this.docView.descAt(e);
    return t ? t.nodeDOM : null;
  }
  /**
  Find the document position that corresponds to a given DOM
  position. (Whenever possible, it is preferable to inspect the
  document structure directly, rather than poking around in the
  DOM, but sometimes—for example when interpreting an event
  target—you don't have a choice.)
  
  The `bias` parameter can be used to influence which side of a DOM
  node to use when the position is inside a leaf node.
  */
  posAtDOM(e, t, i = -1) {
    let r = this.docView.posFromDOM(e, t, i);
    if (r == null)
      throw new RangeError("DOM position not inside the editor");
    return r;
  }
  /**
  Find out whether the selection is at the end of a textblock when
  moving in a given direction. When, for example, given `"left"`,
  it will return true if moving left from the current cursor
  position would leave that position's parent textblock. Will apply
  to the view's current state by default, but it is possible to
  pass a different state.
  */
  endOfTextblock(e, t) {
    return v3(this, t || this.state, e);
  }
  /**
  Run the editor's paste logic with the given HTML string. The
  `event`, if given, will be passed to the
  [`handlePaste`](https://prosemirror.net/docs/ref/#view.EditorProps.handlePaste) hook.
  */
  pasteHTML(e, t) {
    return Gn(this, "", e, !1, t || new ClipboardEvent("paste"));
  }
  /**
  Run the editor's paste logic with the given plain-text input.
  */
  pasteText(e, t) {
    return Gn(this, e, null, !0, t || new ClipboardEvent("paste"));
  }
  /**
  Serialize the given slice as it would be if it was copied from
  this editor. Returns a DOM element that contains a
  representation of the slice as its children, a textual
  representation, and the transformed slice (which can be
  different from the given input due to hooks like
  [`transformCopied`](https://prosemirror.net/docs/ref/#view.EditorProps.transformCopied)).
  */
  serializeForClipboard(e) {
    return Ho(this, e);
  }
  /**
  Removes the editor from the DOM and destroys all [node
  views](https://prosemirror.net/docs/ref/#view.NodeView).
  */
  destroy() {
    this.docView && (q3(this), this.destroyPluginViews(), this.mounted ? (this.docView.update(this.state.doc, [], ls(this), this), this.dom.textContent = "") : this.dom.parentNode && this.dom.parentNode.removeChild(this.dom), this.docView.destroy(), this.docView = null, G6());
  }
  /**
  This is true when the view has been
  [destroyed](https://prosemirror.net/docs/ref/#view.EditorView.destroy) (and thus should not be
  used anymore).
  */
  get isDestroyed() {
    return this.docView == null;
  }
  /**
  Used for testing.
  */
  dispatchEvent(e) {
    return J3(this, e);
  }
  /**
  @internal
  */
  domSelectionRange() {
    let e = this.domSelection();
    return e ? xe && this.root.nodeType === 11 && e3(this.dom.ownerDocument) == this.dom && b4(this, e) || e : { focusNode: null, focusOffset: 0, anchorNode: null, anchorOffset: 0 };
  }
  /**
  @internal
  */
  domSelection() {
    return this.root.getSelection();
  }
}
Fh.prototype.dispatch = function(n) {
  let e = this._props.dispatchTransaction;
  e ? e.call(this, n) : this.updateState(this.state.apply(n));
};
function cc(n) {
  let e = /* @__PURE__ */ Object.create(null);
  return e.class = "ProseMirror", e.contenteditable = String(n.editable), n.someProp("attributes", (t) => {
    if (typeof t == "function" && (t = t(n.state)), t)
      for (let i in t)
        i == "class" ? e.class += " " + t[i] : i == "style" ? e.style = (e.style ? e.style + ";" : "") + t[i] : !e[i] && i != "contenteditable" && i != "nodeName" && (e[i] = String(t[i]));
  }), e.translate || (e.translate = "no"), [_e.node(0, n.state.doc.content.size, e)];
}
function uc(n) {
  if (n.markCursor) {
    let e = document.createElement("img");
    e.className = "ProseMirror-separator", e.setAttribute("mark-placeholder", "true"), e.setAttribute("alt", ""), n.cursorWrapper = { dom: e, deco: _e.widget(n.state.selection.from, e, { raw: !0, marks: n.markCursor }) };
  } else
    n.cursorWrapper = null;
}
function dc(n) {
  return !n.someProp("editable", (e) => e(n.state) === !1);
}
function N4(n, e) {
  let t = Math.min(n.$anchor.sharedDepth(n.head), e.$anchor.sharedDepth(e.head));
  return n.$anchor.start(t) != e.$anchor.start(t);
}
function hc(n) {
  let e = /* @__PURE__ */ Object.create(null);
  function t(i) {
    for (let r in i)
      Object.prototype.hasOwnProperty.call(e, r) || (e[r] = i[r]);
  }
  return n.someProp("nodeViews", t), n.someProp("markViews", t), e;
}
function E4(n, e) {
  let t = 0, i = 0;
  for (let r in n) {
    if (n[r] != e[r])
      return !0;
    t++;
  }
  for (let r in e)
    i++;
  return t != i;
}
function fc(n) {
  if (n.spec.state || n.spec.filterTransaction || n.spec.appendTransaction)
    throw new RangeError("Plugins passed directly to the view must not have a state component");
}
var St = {
  8: "Backspace",
  9: "Tab",
  10: "Enter",
  12: "NumLock",
  13: "Enter",
  16: "Shift",
  17: "Control",
  18: "Alt",
  20: "CapsLock",
  27: "Escape",
  32: " ",
  33: "PageUp",
  34: "PageDown",
  35: "End",
  36: "Home",
  37: "ArrowLeft",
  38: "ArrowUp",
  39: "ArrowRight",
  40: "ArrowDown",
  44: "PrintScreen",
  45: "Insert",
  46: "Delete",
  59: ";",
  61: "=",
  91: "Meta",
  92: "Meta",
  106: "*",
  107: "+",
  108: ",",
  109: "-",
  110: ".",
  111: "/",
  144: "NumLock",
  145: "ScrollLock",
  160: "Shift",
  161: "Shift",
  162: "Control",
  163: "Control",
  164: "Alt",
  165: "Alt",
  173: "-",
  186: ";",
  187: "=",
  188: ",",
  189: "-",
  190: ".",
  191: "/",
  192: "`",
  219: "[",
  220: "\\",
  221: "]",
  222: "'"
}, tr = {
  48: ")",
  49: "!",
  50: "@",
  51: "#",
  52: "$",
  53: "%",
  54: "^",
  55: "&",
  56: "*",
  57: "(",
  59: ":",
  61: "+",
  173: "_",
  186: ":",
  187: "+",
  188: "<",
  189: "_",
  190: ">",
  191: "?",
  192: "~",
  219: "{",
  220: "|",
  221: "}",
  222: '"'
}, A4 = typeof navigator < "u" && /Mac/.test(navigator.platform), I4 = typeof navigator < "u" && /MSIE \d|Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(navigator.userAgent);
for (var ge = 0; ge < 10; ge++)
  St[48 + ge] = St[96 + ge] = String(ge);
for (var ge = 1; ge <= 24; ge++)
  St[ge + 111] = "F" + ge;
for (var ge = 65; ge <= 90; ge++)
  St[ge] = String.fromCharCode(ge + 32), tr[ge] = String.fromCharCode(ge);
for (var us in St)
  tr.hasOwnProperty(us) || (tr[us] = St[us]);
function O4(n) {
  var e = A4 && n.metaKey && n.shiftKey && !n.ctrlKey && !n.altKey || I4 && n.shiftKey && n.key && n.key.length == 1 || n.key == "Unidentified", t = !e && n.key || (n.shiftKey ? tr : St)[n.keyCode] || n.key || "Unidentified";
  return t == "Esc" && (t = "Escape"), t == "Del" && (t = "Delete"), t == "Left" && (t = "ArrowLeft"), t == "Up" && (t = "ArrowUp"), t == "Right" && (t = "ArrowRight"), t == "Down" && (t = "ArrowDown"), t;
}
const D4 = typeof navigator < "u" && /Mac|iP(hone|[oa]d)/.test(navigator.platform), $4 = typeof navigator < "u" && /Win/.test(navigator.platform);
function R4(n) {
  let e = n.split(/-(?!$)/), t = e[e.length - 1];
  t == "Space" && (t = " ");
  let i, r, s, o;
  for (let a = 0; a < e.length - 1; a++) {
    let l = e[a];
    if (/^(cmd|meta|m)$/i.test(l))
      o = !0;
    else if (/^a(lt)?$/i.test(l))
      i = !0;
    else if (/^(c|ctrl|control)$/i.test(l))
      r = !0;
    else if (/^s(hift)?$/i.test(l))
      s = !0;
    else if (/^mod$/i.test(l))
      D4 ? o = !0 : r = !0;
    else
      throw new Error("Unrecognized modifier name: " + l);
  }
  return i && (t = "Alt-" + t), r && (t = "Ctrl-" + t), o && (t = "Meta-" + t), s && (t = "Shift-" + t), t;
}
function P4(n) {
  let e = /* @__PURE__ */ Object.create(null);
  for (let t in n)
    e[R4(t)] = n[t];
  return e;
}
function ds(n, e, t = !0) {
  return e.altKey && (n = "Alt-" + n), e.ctrlKey && (n = "Ctrl-" + n), e.metaKey && (n = "Meta-" + n), t && e.shiftKey && (n = "Shift-" + n), n;
}
function L4(n) {
  return new re({ props: { handleKeyDown: Vh(n) } });
}
function Vh(n) {
  let e = P4(n);
  return function(t, i) {
    let r = O4(i), s, o = e[ds(r, i)];
    if (o && o(t.state, t.dispatch, t))
      return !0;
    if (r.length == 1 && r != " ") {
      if (i.shiftKey) {
        let a = e[ds(r, i, !1)];
        if (a && a(t.state, t.dispatch, t))
          return !0;
      }
      if ((i.altKey || i.metaKey || i.ctrlKey) && // Ctrl-Alt may be used for AltGr on Windows
      !($4 && i.ctrlKey && i.altKey) && (s = St[i.keyCode]) && s != r) {
        let a = e[ds(s, i)];
        if (a && a(t.state, t.dispatch, t))
          return !0;
      }
    }
    return !1;
  };
}
var z4 = Object.defineProperty, Jo = (n, e) => {
  for (var t in e)
    z4(n, t, { get: e[t], enumerable: !0 });
};
function Cr(n) {
  const { state: e, transaction: t } = n;
  let { selection: i } = t, { doc: r } = t, { storedMarks: s } = t;
  return {
    ...e,
    apply: e.apply.bind(e),
    applyTransaction: e.applyTransaction.bind(e),
    plugins: e.plugins,
    schema: e.schema,
    reconfigure: e.reconfigure.bind(e),
    toJSON: e.toJSON.bind(e),
    get storedMarks() {
      return s;
    },
    get selection() {
      return i;
    },
    get doc() {
      return r;
    },
    get tr() {
      return i = t.selection, r = t.doc, s = t.storedMarks, t;
    }
  };
}
var kr = class {
  constructor(n) {
    this.editor = n.editor, this.rawCommands = this.editor.extensionManager.commands, this.customState = n.state;
  }
  get hasCustomState() {
    return !!this.customState;
  }
  get state() {
    return this.customState || this.editor.state;
  }
  get commands() {
    const { rawCommands: n, editor: e, state: t } = this, { view: i } = e, { tr: r } = t, s = this.buildProps(r);
    return Object.fromEntries(
      Object.entries(n).map(([o, a]) => [o, (...c) => {
        const u = a(...c)(s);
        return !r.getMeta("preventDispatch") && !this.hasCustomState && i.dispatch(r), u;
      }])
    );
  }
  get chain() {
    return () => this.createChain();
  }
  get can() {
    return () => this.createCan();
  }
  createChain(n, e = !0) {
    const { rawCommands: t, editor: i, state: r } = this, { view: s } = i, o = [], a = !!n, l = n || r.tr, c = () => (!a && e && !l.getMeta("preventDispatch") && !this.hasCustomState && s.dispatch(l), o.every((d) => d === !0)), u = {
      ...Object.fromEntries(
        Object.entries(t).map(([d, f]) => [d, (...m) => {
          const v = this.buildProps(l, e), y = f(...m)(v);
          return o.push(y), u;
        }])
      ),
      run: c
    };
    return u;
  }
  createCan(n) {
    const { rawCommands: e, state: t } = this, i = !1, r = n || t.tr, s = this.buildProps(r, i);
    return {
      ...Object.fromEntries(
        Object.entries(e).map(([a, l]) => [a, (...c) => l(...c)({ ...s, dispatch: void 0 })])
      ),
      chain: () => this.createChain(r, i)
    };
  }
  buildProps(n, e = !0) {
    const { rawCommands: t, editor: i, state: r } = this, { view: s } = i, o = {
      tr: n,
      editor: i,
      view: s,
      state: Cr({
        state: r,
        transaction: n
      }),
      dispatch: e ? () => {
      } : void 0,
      chain: () => this.createChain(n, e),
      can: () => this.createCan(n),
      get commands() {
        return Object.fromEntries(
          Object.entries(t).map(([a, l]) => [a, (...c) => l(...c)(o)])
        );
      }
    };
    return o;
  }
}, Hh = {};
Jo(Hh, {
  blur: () => B4,
  clearContent: () => F4,
  clearNodes: () => V4,
  command: () => H4,
  createParagraphNear: () => j4,
  cut: () => W4,
  deleteCurrentNode: () => U4,
  deleteNode: () => q4,
  deleteRange: () => K4,
  deleteSelection: () => J4,
  enter: () => G4,
  exitCode: () => X4,
  extendMarkRange: () => Y4,
  first: () => Z4,
  focus: () => ev,
  forEach: () => tv,
  insertContent: () => nv,
  insertContentAt: () => sv,
  joinBackward: () => lv,
  joinDown: () => av,
  joinForward: () => cv,
  joinItemBackward: () => uv,
  joinItemForward: () => dv,
  joinTextblockBackward: () => hv,
  joinTextblockForward: () => fv,
  joinUp: () => ov,
  keyboardShortcut: () => mv,
  lift: () => gv,
  liftEmptyBlock: () => vv,
  liftListItem: () => yv,
  newlineInCode: () => bv,
  resetAttributes: () => wv,
  scrollIntoView: () => Cv,
  selectAll: () => kv,
  selectNodeBackward: () => xv,
  selectNodeForward: () => Sv,
  selectParentNode: () => Tv,
  selectTextblockEnd: () => Mv,
  selectTextblockStart: () => _v,
  setContent: () => Nv,
  setMark: () => Jv,
  setMeta: () => Gv,
  setNode: () => Xv,
  setNodeSelection: () => Yv,
  setTextDirection: () => Zv,
  setTextSelection: () => Qv,
  sinkListItem: () => e8,
  splitBlock: () => t8,
  splitListItem: () => n8,
  toggleList: () => i8,
  toggleMark: () => r8,
  toggleNode: () => s8,
  toggleWrap: () => o8,
  undoInputRule: () => a8,
  unsetAllMarks: () => l8,
  unsetMark: () => c8,
  unsetTextDirection: () => u8,
  updateAttributes: () => d8,
  wrapIn: () => h8,
  wrapInList: () => f8
});
var B4 = () => ({ editor: n, view: e }) => (requestAnimationFrame(() => {
  var t;
  n.isDestroyed || (e.dom.blur(), (t = window == null ? void 0 : window.getSelection()) == null || t.removeAllRanges());
}), !0), F4 = (n = !0) => ({ commands: e }) => e.setContent("", { emitUpdate: n }), V4 = () => ({ state: n, tr: e, dispatch: t }) => {
  const { selection: i } = e, { ranges: r } = i;
  return t && r.forEach(({ $from: s, $to: o }) => {
    n.doc.nodesBetween(s.pos, o.pos, (a, l) => {
      if (a.type.isText)
        return;
      const { doc: c, mapping: u } = e, d = c.resolve(u.map(l)), f = c.resolve(u.map(l + a.nodeSize)), p = d.blockRange(f);
      if (!p)
        return;
      const m = Mn(p);
      if (a.type.isTextblock) {
        const { defaultType: v } = d.parent.contentMatchAt(d.index());
        e.setNodeMarkup(p.start, v);
      }
      (m || m === 0) && e.lift(p, m);
    });
  }), !0;
}, H4 = (n) => (e) => n(e), j4 = () => ({ state: n, dispatch: e }) => R6(n, e), W4 = (n, e) => ({ editor: t, tr: i }) => {
  const { state: r } = t, s = r.doc.slice(n.from, n.to);
  i.deleteRange(n.from, n.to);
  const o = i.mapping.map(e);
  return i.insert(o, s.content), i.setSelection(new z(i.doc.resolve(Math.max(o - 1, 0)))), !0;
}, U4 = () => ({ tr: n, dispatch: e }) => {
  const { selection: t } = n, i = t.$anchor.node();
  if (i.content.size > 0)
    return !1;
  const r = n.selection.$anchor;
  for (let s = r.depth; s > 0; s -= 1)
    if (r.node(s).type === i.type) {
      if (e) {
        const a = r.before(s), l = r.after(s);
        n.delete(a, l).scrollIntoView();
      }
      return !0;
    }
  return !1;
};
function fe(n, e) {
  if (typeof n == "string") {
    if (!e.nodes[n])
      throw Error("There is no node type named '".concat(n, "'. Maybe you forgot to add the extension?"));
    return e.nodes[n];
  }
  return n;
}
var q4 = (n) => ({ tr: e, state: t, dispatch: i }) => {
  const r = fe(n, t.schema), s = e.selection.$anchor;
  for (let o = s.depth; o > 0; o -= 1)
    if (s.node(o).type === r) {
      if (i) {
        const l = s.before(o), c = s.after(o);
        e.delete(l, c).scrollIntoView();
      }
      return !0;
    }
  return !1;
}, K4 = (n) => ({ tr: e, dispatch: t }) => {
  const { from: i, to: r } = n;
  return t && e.delete(i, r), !0;
}, J4 = () => ({ state: n, dispatch: e }) => x6(n, e), G4 = () => ({ commands: n }) => n.keyboardShortcut("Enter"), X4 = () => ({ state: n, dispatch: e }) => $6(n, e);
function Go(n) {
  return Object.prototype.toString.call(n) === "[object RegExp]";
}
function nr(n, e, t = { strict: !0 }) {
  const i = Object.keys(e);
  return i.length ? i.every((r) => t.strict ? e[r] === n[r] : Go(e[r]) ? e[r].test(n[r]) : e[r] === n[r]) : !0;
}
function jh(n, e, t = {}) {
  return n.find((i) => i.type === e && nr(
    // Only check equality for the attributes that are provided
    Object.fromEntries(Object.keys(t).map((r) => [r, i.attrs[r]])),
    t
  ));
}
function pc(n, e, t = {}) {
  return !!jh(n, e, t);
}
function Wh(n, e, t) {
  var i;
  if (!n || !e)
    return;
  let r = n.parent.childAfter(n.parentOffset);
  if ((!r.node || !r.node.marks.some((u) => u.type === e)) && (r = n.parent.childBefore(n.parentOffset)), !r.node || !r.node.marks.some((u) => u.type === e) || (t = t || ((i = r.node.marks[0]) == null ? void 0 : i.attrs), !jh([...r.node.marks], e, t)))
    return;
  let o = r.index, a = n.start() + r.offset, l = o + 1, c = a + r.node.nodeSize;
  for (; o > 0 && pc([...n.parent.child(o - 1).marks], e, t); )
    o -= 1, a -= n.parent.child(o).nodeSize;
  for (; l < n.parent.childCount && pc([...n.parent.child(l).marks], e, t); )
    c += n.parent.child(l).nodeSize, l += 1;
  return {
    from: a,
    to: c
  };
}
function ct(n, e) {
  if (typeof n == "string") {
    if (!e.marks[n])
      throw Error("There is no mark type named '".concat(n, "'. Maybe you forgot to add the extension?"));
    return e.marks[n];
  }
  return n;
}
var Y4 = (n, e = {}) => ({ tr: t, state: i, dispatch: r }) => {
  const s = ct(n, i.schema), { doc: o, selection: a } = t, { $from: l, from: c, to: u } = a;
  if (r) {
    const d = Wh(l, s, e);
    if (d && d.from <= c && d.to >= u) {
      const f = z.create(o, d.from, d.to);
      t.setSelection(f);
    }
  }
  return !0;
}, Z4 = (n) => (e) => {
  const t = typeof n == "function" ? n(e) : n;
  for (let i = 0; i < t.length; i += 1)
    if (t[i](e))
      return !0;
  return !1;
};
function Uh(n) {
  return n instanceof z;
}
function Pt(n = 0, e = 0, t = 0) {
  return Math.min(Math.max(n, e), t);
}
function qh(n, e = null) {
  if (!e)
    return null;
  const t = B.atStart(n), i = B.atEnd(n);
  if (e === "start" || e === !0)
    return t;
  if (e === "end")
    return i;
  const r = t.from, s = i.to;
  return e === "all" ? z.create(n, Pt(0, r, s), Pt(n.content.size, r, s)) : z.create(n, Pt(e, r, s), Pt(e, r, s));
}
function Q4() {
  return navigator.platform === "Android" || /android/i.test(navigator.userAgent);
}
function Xo() {
  return ["iPad Simulator", "iPhone Simulator", "iPod Simulator", "iPad", "iPhone", "iPod"].includes(navigator.platform) || // iPad on iOS 13 detection
  navigator.userAgent.includes("Mac") && "ontouchend" in document;
}
var ev = (n = null, e = {}) => ({ editor: t, view: i, tr: r, dispatch: s }) => {
  e = {
    scrollIntoView: !0,
    ...e
  };
  const o = () => {
    (Xo() || Q4()) && i.dom.focus(), requestAnimationFrame(() => {
      t.isDestroyed || (i.focus(), e != null && e.scrollIntoView && t.commands.scrollIntoView());
    });
  };
  if (i.hasFocus() && n === null || n === !1)
    return !0;
  if (s && n === null && !Uh(t.state.selection))
    return o(), !0;
  const a = qh(r.doc, n) || t.state.selection, l = t.state.selection.eq(a);
  return s && (l || r.setSelection(a), l && r.storedMarks && r.setStoredMarks(r.storedMarks), o()), !0;
}, tv = (n, e) => (t) => n.every((i, r) => e(i, { ...t, index: r })), nv = (n, e) => ({ tr: t, commands: i }) => i.insertContentAt({ from: t.selection.from, to: t.selection.to }, n, e), Kh = (n) => {
  const e = n.childNodes;
  for (let t = e.length - 1; t >= 0; t -= 1) {
    const i = e[t];
    i.nodeType === 3 && i.nodeValue && /^(\n\s\s|\n)$/.test(i.nodeValue) ? n.removeChild(i) : i.nodeType === 1 && Kh(i);
  }
  return n;
};
function Ti(n) {
  if (typeof window > "u")
    throw new Error("[tiptap error]: there is no window object available, so this function cannot be used");
  const e = "<body>".concat(n, "</body>"), t = new window.DOMParser().parseFromString(e, "text/html").body;
  return Kh(t);
}
function Yn(n, e, t) {
  if (n instanceof wt || n instanceof T)
    return n;
  t = {
    slice: !0,
    parseOptions: {},
    ...t
  };
  const i = typeof n == "object" && n !== null, r = typeof n == "string";
  if (i)
    try {
      if (Array.isArray(n) && n.length > 0)
        return T.fromArray(n.map((a) => e.nodeFromJSON(a)));
      const o = e.nodeFromJSON(n);
      return t.errorOnInvalidContent && o.check(), o;
    } catch (s) {
      if (t.errorOnInvalidContent)
        throw new Error("[tiptap error]: Invalid JSON content", { cause: s });
      return console.warn("[tiptap warn]: Invalid content.", "Passed value:", n, "Error:", s), Yn("", e, t);
    }
  if (r) {
    if (t.errorOnInvalidContent) {
      let o = !1, a = "";
      const l = new $d({
        topNode: e.spec.topNode,
        marks: e.spec.marks,
        // Prosemirror's schemas are executed such that: the last to execute, matches last
        // This means that we can add a catch-all node at the end of the schema to catch any content that we don't know how to handle
        nodes: e.spec.nodes.append({
          __tiptap__private__unknown__catch__all__node: {
            content: "inline*",
            group: "block",
            parseDOM: [
              {
                tag: "*",
                getAttrs: (c) => (o = !0, a = typeof c == "string" ? c : c.outerHTML, null)
              }
            ]
          }
        })
      });
      if (t.slice ? Rn.fromSchema(l).parseSlice(Ti(n), t.parseOptions) : Rn.fromSchema(l).parse(Ti(n), t.parseOptions), t.errorOnInvalidContent && o)
        throw new Error("[tiptap error]: Invalid HTML content", {
          cause: new Error("Invalid element found: ".concat(a))
        });
    }
    const s = Rn.fromSchema(e);
    return t.slice ? s.parseSlice(Ti(n), t.parseOptions).content : s.parse(Ti(n), t.parseOptions);
  }
  return Yn("", e, t);
}
function iv(n, e, t) {
  const i = n.steps.length - 1;
  if (i < e)
    return;
  const r = n.steps[i];
  if (!(r instanceof ce || r instanceof de))
    return;
  const s = n.mapping.maps[i];
  let o = 0;
  s.forEach((a, l, c, u) => {
    o === 0 && (o = u);
  }), n.setSelection(B.near(n.doc.resolve(o), t));
}
var rv = (n) => !("type" in n), sv = (n, e, t) => ({ tr: i, dispatch: r, editor: s }) => {
  var o;
  if (r) {
    t = {
      parseOptions: s.options.parseOptions,
      updateSelection: !0,
      applyInputRules: !1,
      applyPasteRules: !1,
      ...t
    };
    let a;
    const l = (y) => {
      s.emit("contentError", {
        editor: s,
        error: y,
        disableCollaboration: () => {
          "collaboration" in s.storage && typeof s.storage.collaboration == "object" && s.storage.collaboration && (s.storage.collaboration.isDisabled = !0);
        }
      });
    }, c = {
      preserveWhitespace: "full",
      ...t.parseOptions
    };
    if (!t.errorOnInvalidContent && !s.options.enableContentCheck && s.options.emitContentError)
      try {
        Yn(e, s.schema, {
          parseOptions: c,
          errorOnInvalidContent: !0
        });
      } catch (y) {
        l(y);
      }
    try {
      a = Yn(e, s.schema, {
        parseOptions: c,
        errorOnInvalidContent: (o = t.errorOnInvalidContent) != null ? o : s.options.enableContentCheck
      });
    } catch (y) {
      return l(y), !1;
    }
    let { from: u, to: d } = typeof n == "number" ? { from: n, to: n } : { from: n.from, to: n.to }, f = !0, p = !0;
    if ((rv(a) ? a : [a]).forEach((y) => {
      y.check(), f = f ? y.isText && y.marks.length === 0 : !1, p = p ? y.isBlock : !1;
    }), u === d && p) {
      const { parent: y } = i.doc.resolve(u);
      y.isTextblock && !y.type.spec.code && !y.childCount && (u -= 1, d += 1);
    }
    let v;
    if (f) {
      if (Array.isArray(e))
        v = e.map((y) => y.text || "").join("");
      else if (e instanceof T) {
        let y = "";
        e.forEach((g) => {
          g.text && (y += g.text);
        }), v = y;
      } else
        typeof e == "object" && e && e.text ? v = e.text : v = e;
      i.insertText(v, u, d);
    } else {
      v = a;
      const y = i.doc.resolve(u), g = y.node(), b = y.parentOffset === 0, w = g.isText || g.isTextblock, C = g.content.size > 0;
      b && w && C && (u = Math.max(0, u - 1)), i.replaceWith(u, d, v);
    }
    t.updateSelection && iv(i, i.steps.length - 1, -1), t.applyInputRules && i.setMeta("applyInputRules", { from: u, text: v }), t.applyPasteRules && i.setMeta("applyPasteRules", { from: u, text: v });
  }
  return !0;
}, ov = () => ({ state: n, dispatch: e }) => A6(n, e), av = () => ({ state: n, dispatch: e }) => I6(n, e), lv = () => ({ state: n, dispatch: e }) => S6(n, e), cv = () => ({ state: n, dispatch: e }) => N6(n, e), uv = () => ({ state: n, dispatch: e, tr: t }) => {
  try {
    const i = mr(n.doc, n.selection.$from.pos, -1);
    return i == null ? !1 : (t.join(i, 2), e && e(t), !0);
  } catch (i) {
    return !1;
  }
}, dv = () => ({ state: n, dispatch: e, tr: t }) => {
  try {
    const i = mr(n.doc, n.selection.$from.pos, 1);
    return i == null ? !1 : (t.join(i, 2), e && e(t), !0);
  } catch (i) {
    return !1;
  }
}, hv = () => ({ state: n, dispatch: e }) => T6(n, e), fv = () => ({ state: n, dispatch: e }) => M6(n, e);
function Jh() {
  return typeof navigator < "u" ? /Mac/.test(navigator.platform) : !1;
}
function pv(n) {
  const e = n.split(/-(?!$)/);
  let t = e[e.length - 1];
  t === "Space" && (t = " ");
  let i, r, s, o;
  for (let a = 0; a < e.length - 1; a += 1) {
    const l = e[a];
    if (/^(cmd|meta|m)$/i.test(l))
      o = !0;
    else if (/^a(lt)?$/i.test(l))
      i = !0;
    else if (/^(c|ctrl|control)$/i.test(l))
      r = !0;
    else if (/^s(hift)?$/i.test(l))
      s = !0;
    else if (/^mod$/i.test(l))
      Xo() || Jh() ? o = !0 : r = !0;
    else
      throw new Error("Unrecognized modifier name: ".concat(l));
  }
  return i && (t = "Alt-".concat(t)), r && (t = "Ctrl-".concat(t)), o && (t = "Meta-".concat(t)), s && (t = "Shift-".concat(t)), t;
}
var mv = (n) => ({ editor: e, view: t, tr: i, dispatch: r }) => {
  const s = pv(n).split(/-(?!$)/), o = s.find((c) => !["Alt", "Ctrl", "Meta", "Shift"].includes(c)), a = new KeyboardEvent("keydown", {
    key: o === "Space" ? " " : o,
    altKey: s.includes("Alt"),
    ctrlKey: s.includes("Ctrl"),
    metaKey: s.includes("Meta"),
    shiftKey: s.includes("Shift"),
    bubbles: !0,
    cancelable: !0
  }), l = e.captureTransaction(() => {
    t.someProp("handleKeyDown", (c) => c(t, a));
  });
  return l == null || l.steps.forEach((c) => {
    const u = c.map(i.mapping);
    u && r && i.maybeStep(u);
  }), !0;
};
function Zn(n, e, t = {}) {
  const { from: i, to: r, empty: s } = n.selection, o = e ? fe(e, n.schema) : null, a = [];
  n.doc.nodesBetween(i, r, (d, f) => {
    if (d.isText)
      return;
    const p = Math.max(i, f), m = Math.min(r, f + d.nodeSize);
    a.push({
      node: d,
      from: p,
      to: m
    });
  });
  const l = r - i, c = a.filter((d) => o ? o.name === d.node.type.name : !0).filter((d) => nr(d.node.attrs, t, { strict: !1 }));
  return s ? !!c.length : c.reduce((d, f) => d + f.to - f.from, 0) >= l;
}
var gv = (n, e = {}) => ({ state: t, dispatch: i }) => {
  const r = fe(n, t.schema);
  return Zn(t, r, e) ? O6(t, i) : !1;
}, vv = () => ({ state: n, dispatch: e }) => P6(n, e), yv = (n) => ({ state: e, dispatch: t }) => {
  const i = fe(n, e.schema);
  return U6(i)(e, t);
}, bv = () => ({ state: n, dispatch: e }) => D6(n, e);
function xr(n, e) {
  return e.nodes[n] ? "node" : e.marks[n] ? "mark" : null;
}
function mc(n, e) {
  const t = typeof e == "string" ? [e] : e;
  return Object.keys(n).reduce((i, r) => (t.includes(r) || (i[r] = n[r]), i), {});
}
var wv = (n, e) => ({ tr: t, state: i, dispatch: r }) => {
  let s = null, o = null;
  const a = xr(
    typeof n == "string" ? n : n.name,
    i.schema
  );
  if (!a)
    return !1;
  a === "node" && (s = fe(n, i.schema)), a === "mark" && (o = ct(n, i.schema));
  let l = !1;
  return t.selection.ranges.forEach((c) => {
    i.doc.nodesBetween(c.$from.pos, c.$to.pos, (u, d) => {
      s && s === u.type && (l = !0, r && t.setNodeMarkup(d, void 0, mc(u.attrs, e))), o && u.marks.length && u.marks.forEach((f) => {
        o === f.type && (l = !0, r && t.addMark(d, d + u.nodeSize, o.create(mc(f.attrs, e))));
      });
    });
  }), l;
}, Cv = () => ({ tr: n, dispatch: e }) => (e && n.scrollIntoView(), !0), kv = () => ({ tr: n, dispatch: e }) => {
  if (e) {
    const t = new Ve(n.doc);
    n.setSelection(t);
  }
  return !0;
}, xv = () => ({ state: n, dispatch: e }) => _6(n, e), Sv = () => ({ state: n, dispatch: e }) => E6(n, e), Tv = () => ({ state: n, dispatch: e }) => L6(n, e), Mv = () => ({ state: n, dispatch: e }) => F6(n, e), _v = () => ({ state: n, dispatch: e }) => B6(n, e);
function to(n, e, t = {}, i = {}) {
  return Yn(n, e, {
    slice: !1,
    parseOptions: t,
    errorOnInvalidContent: i.errorOnInvalidContent
  });
}
var Nv = (n, { errorOnInvalidContent: e, emitUpdate: t = !0, parseOptions: i = {} } = {}) => ({ editor: r, tr: s, dispatch: o, commands: a }) => {
  const { doc: l } = s;
  if (i.preserveWhitespace !== "full") {
    const c = to(n, r.schema, i, {
      errorOnInvalidContent: e != null ? e : r.options.enableContentCheck
    });
    return o && s.replaceWith(0, l.content.size, c).setMeta("preventUpdate", !t), !0;
  }
  return o && s.setMeta("preventUpdate", !t), a.insertContentAt({ from: 0, to: l.content.size }, n, {
    parseOptions: i,
    errorOnInvalidContent: e != null ? e : r.options.enableContentCheck
  });
};
function Gh(n, e) {
  const t = ct(e, n.schema), { from: i, to: r, empty: s } = n.selection, o = [];
  s ? (n.storedMarks && o.push(...n.storedMarks), o.push(...n.selection.$head.marks())) : n.doc.nodesBetween(i, r, (l) => {
    o.push(...l.marks);
  });
  const a = o.find((l) => l.type.name === t.name);
  return a ? { ...a.attrs } : {};
}
function Ev(n, e) {
  const t = new Yd(n);
  return e.forEach((i) => {
    i.steps.forEach((r) => {
      t.step(r);
    });
  }), t;
}
function Av(n) {
  for (let e = 0; e < n.edgeCount; e += 1) {
    const { type: t } = n.edge(e);
    if (t.isTextblock && !t.hasRequiredAttrs())
      return t;
  }
  return null;
}
function Iv(n, e) {
  for (let t = n.depth; t > 0; t -= 1) {
    const i = n.node(t);
    if (e(i))
      return {
        pos: t > 0 ? n.before(t) : 0,
        start: n.start(t),
        depth: t,
        node: i
      };
  }
}
function Yo(n) {
  return (e) => Iv(e.$from, n);
}
function I(n, e, t) {
  return n.config[e] === void 0 && n.parent ? I(n.parent, e, t) : typeof n.config[e] == "function" ? n.config[e].bind({
    ...t,
    parent: n.parent ? I(n.parent, e, t) : null
  }) : n.config[e];
}
function Zo(n) {
  return n.map((e) => {
    const t = {
      name: e.name,
      options: e.options,
      storage: e.storage
    }, i = I(e, "addExtensions", t);
    return i ? [e, ...Zo(i())] : e;
  }).flat(10);
}
function Qo(n, e) {
  const t = Gt.fromSchema(e).serializeFragment(n), r = document.implementation.createHTMLDocument().createElement("div");
  return r.appendChild(t), r.innerHTML;
}
function Xh(n) {
  return typeof n == "function";
}
function G(n, e = void 0, ...t) {
  return Xh(n) ? e ? n.bind(e)(...t) : n(...t) : n;
}
function Ov(n = {}) {
  return Object.keys(n).length === 0 && n.constructor === Object;
}
function Cn(n) {
  const e = n.filter((r) => r.type === "extension"), t = n.filter((r) => r.type === "node"), i = n.filter((r) => r.type === "mark");
  return {
    baseExtensions: e,
    nodeExtensions: t,
    markExtensions: i
  };
}
function Yh(n) {
  const e = [], { nodeExtensions: t, markExtensions: i } = Cn(n), r = [...t, ...i], s = {
    default: null,
    validate: void 0,
    rendered: !0,
    renderHTML: null,
    parseHTML: null,
    keepOnSplit: !0,
    isRequired: !1
  };
  return n.forEach((o) => {
    const a = {
      name: o.name,
      options: o.options,
      storage: o.storage,
      extensions: r
    }, l = I(
      o,
      "addGlobalAttributes",
      a
    );
    if (!l)
      return;
    l().forEach((u) => {
      u.types.forEach((d) => {
        Object.entries(u.attributes).forEach(([f, p]) => {
          e.push({
            type: d,
            name: f,
            attribute: {
              ...s,
              ...p
            }
          });
        });
      });
    });
  }), r.forEach((o) => {
    const a = {
      name: o.name,
      options: o.options,
      storage: o.storage
    }, l = I(
      o,
      "addAttributes",
      a
    );
    if (!l)
      return;
    const c = l();
    Object.entries(c).forEach(([u, d]) => {
      const f = {
        ...s,
        ...d
      };
      typeof (f == null ? void 0 : f.default) == "function" && (f.default = f.default()), f != null && f.isRequired && (f == null ? void 0 : f.default) === void 0 && delete f.default, e.push({
        type: o.name,
        name: u,
        attribute: f
      });
    });
  }), e;
}
function Sr(...n) {
  return n.filter((e) => !!e).reduce((e, t) => {
    const i = { ...e };
    return Object.entries(t).forEach(([r, s]) => {
      if (!i[r]) {
        i[r] = s;
        return;
      }
      if (r === "class") {
        const a = s ? String(s).split(" ") : [], l = i[r] ? i[r].split(" ") : [], c = a.filter((u) => !l.includes(u));
        i[r] = [...l, ...c].join(" ");
      } else if (r === "style") {
        const a = s ? s.split(";").map((u) => u.trim()).filter(Boolean) : [], l = i[r] ? i[r].split(";").map((u) => u.trim()).filter(Boolean) : [], c = /* @__PURE__ */ new Map();
        l.forEach((u) => {
          const [d, f] = u.split(":").map((p) => p.trim());
          c.set(d, f);
        }), a.forEach((u) => {
          const [d, f] = u.split(":").map((p) => p.trim());
          c.set(d, f);
        }), i[r] = Array.from(c.entries()).map(([u, d]) => "".concat(u, ": ").concat(d)).join("; ");
      } else
        i[r] = s;
    }), i;
  }, {});
}
function ir(n, e) {
  return e.filter((t) => t.type === n.type.name).filter((t) => t.attribute.rendered).map((t) => t.attribute.renderHTML ? t.attribute.renderHTML(n.attrs) || {} : {
    [t.name]: n.attrs[t.name]
  }).reduce((t, i) => Sr(t, i), {});
}
function Dv(n) {
  return typeof n != "string" ? n : n.match(/^[+-]?(?:\d*\.)?\d+$/) ? Number(n) : n === "true" ? !0 : n === "false" ? !1 : n;
}
function gc(n, e) {
  return "style" in n ? n : {
    ...n,
    getAttrs: (t) => {
      const i = n.getAttrs ? n.getAttrs(t) : n.attrs;
      if (i === !1)
        return !1;
      const r = e.reduce((s, o) => {
        const a = o.attribute.parseHTML ? o.attribute.parseHTML(t) : Dv(t.getAttribute(o.name));
        return a == null ? s : {
          ...s,
          [o.name]: a
        };
      }, {});
      return { ...i, ...r };
    }
  };
}
function vc(n) {
  return Object.fromEntries(
    // @ts-ignore
    Object.entries(n).filter(([e, t]) => e === "attrs" && Ov(t) ? !1 : t != null)
  );
}
function yc(n) {
  var e, t;
  const i = {};
  return !((e = n == null ? void 0 : n.attribute) != null && e.isRequired) && "default" in ((n == null ? void 0 : n.attribute) || {}) && (i.default = n.attribute.default), ((t = n == null ? void 0 : n.attribute) == null ? void 0 : t.validate) !== void 0 && (i.validate = n.attribute.validate), [n.name, i];
}
function $v(n, e) {
  var t;
  const i = Yh(n), { nodeExtensions: r, markExtensions: s } = Cn(n), o = (t = r.find((c) => I(c, "topNode"))) == null ? void 0 : t.name, a = Object.fromEntries(
    r.map((c) => {
      const u = i.filter((g) => g.type === c.name), d = {
        name: c.name,
        options: c.options,
        storage: c.storage,
        editor: e
      }, f = n.reduce((g, b) => {
        const w = I(b, "extendNodeSchema", d);
        return {
          ...g,
          ...w ? w(c) : {}
        };
      }, {}), p = vc({
        ...f,
        content: G(I(c, "content", d)),
        marks: G(I(c, "marks", d)),
        group: G(I(c, "group", d)),
        inline: G(I(c, "inline", d)),
        atom: G(I(c, "atom", d)),
        selectable: G(I(c, "selectable", d)),
        draggable: G(I(c, "draggable", d)),
        code: G(I(c, "code", d)),
        whitespace: G(I(c, "whitespace", d)),
        linebreakReplacement: G(
          I(c, "linebreakReplacement", d)
        ),
        defining: G(I(c, "defining", d)),
        isolating: G(I(c, "isolating", d)),
        attrs: Object.fromEntries(u.map(yc))
      }), m = G(I(c, "parseHTML", d));
      m && (p.parseDOM = m.map(
        (g) => gc(g, u)
      ));
      const v = I(c, "renderHTML", d);
      v && (p.toDOM = (g) => v({
        node: g,
        HTMLAttributes: ir(g, u)
      }));
      const y = I(c, "renderText", d);
      return y && (p.toText = y), [c.name, p];
    })
  ), l = Object.fromEntries(
    s.map((c) => {
      const u = i.filter((y) => y.type === c.name), d = {
        name: c.name,
        options: c.options,
        storage: c.storage,
        editor: e
      }, f = n.reduce((y, g) => {
        const b = I(g, "extendMarkSchema", d);
        return {
          ...y,
          ...b ? b(c) : {}
        };
      }, {}), p = vc({
        ...f,
        inclusive: G(I(c, "inclusive", d)),
        excludes: G(I(c, "excludes", d)),
        group: G(I(c, "group", d)),
        spanning: G(I(c, "spanning", d)),
        code: G(I(c, "code", d)),
        attrs: Object.fromEntries(u.map(yc))
      }), m = G(I(c, "parseHTML", d));
      m && (p.parseDOM = m.map(
        (y) => gc(y, u)
      ));
      const v = I(c, "renderHTML", d);
      return v && (p.toDOM = (y) => v({
        mark: y,
        HTMLAttributes: ir(y, u)
      })), [c.name, p];
    })
  );
  return new $d({
    topNode: o,
    nodes: a,
    marks: l
  });
}
function Rv(n) {
  const e = n.filter((t, i) => n.indexOf(t) !== i);
  return Array.from(new Set(e));
}
function ea(n) {
  return n.sort((t, i) => {
    const r = I(t, "priority") || 100, s = I(i, "priority") || 100;
    return r > s ? -1 : r < s ? 1 : 0;
  });
}
function Zh(n) {
  const e = ea(Zo(n)), t = Rv(e.map((i) => i.name));
  return t.length && console.warn(
    "[tiptap warn]: Duplicate extension names found: [".concat(t.map((i) => "'".concat(i, "'")).join(", "), "]. This can lead to issues.")
  ), e;
}
function Qh(n, e, t) {
  const { from: i, to: r } = e, { blockSeparator: s = "\n\n", textSerializers: o = {} } = t || {};
  let a = "";
  return n.nodesBetween(i, r, (l, c, u, d) => {
    var f;
    l.isBlock && c > i && (a += s);
    const p = o == null ? void 0 : o[l.type.name];
    if (p)
      return u && (a += p({
        node: l,
        pos: c,
        parent: u,
        index: d,
        range: e
      })), !1;
    l.isText && (a += (f = l == null ? void 0 : l.text) == null ? void 0 : f.slice(Math.max(i, c) - c, r - c));
  }), a;
}
function Pv(n, e) {
  const t = {
    from: 0,
    to: n.content.size
  };
  return Qh(n, t, e);
}
function ef(n) {
  return Object.fromEntries(
    Object.entries(n.nodes).filter(([, e]) => e.spec.toText).map(([e, t]) => [e, t.spec.toText])
  );
}
function Lv(n, e) {
  const t = fe(e, n.schema), { from: i, to: r } = n.selection, s = [];
  n.doc.nodesBetween(i, r, (a) => {
    s.push(a);
  });
  const o = s.reverse().find((a) => a.type.name === t.name);
  return o ? { ...o.attrs } : {};
}
function zv(n, e) {
  const t = xr(
    typeof e == "string" ? e : e.name,
    n.schema
  );
  return t === "node" ? Lv(n, e) : t === "mark" ? Gh(n, e) : {};
}
function Bv(n, e = JSON.stringify) {
  const t = {};
  return n.filter((i) => {
    const r = e(i);
    return Object.prototype.hasOwnProperty.call(t, r) ? !1 : t[r] = !0;
  });
}
function Fv(n) {
  const e = Bv(n);
  return e.length === 1 ? e : e.filter((t, i) => !e.filter((s, o) => o !== i).some((s) => t.oldRange.from >= s.oldRange.from && t.oldRange.to <= s.oldRange.to && t.newRange.from >= s.newRange.from && t.newRange.to <= s.newRange.to));
}
function Vv(n) {
  const { mapping: e, steps: t } = n, i = [];
  return e.maps.forEach((r, s) => {
    const o = [];
    if (r.ranges.length)
      r.forEach((a, l) => {
        o.push({ from: a, to: l });
      });
    else {
      const { from: a, to: l } = t[s];
      if (a === void 0 || l === void 0)
        return;
      o.push({ from: a, to: l });
    }
    o.forEach(({ from: a, to: l }) => {
      const c = e.slice(s).map(a, -1), u = e.slice(s).map(l), d = e.invert().map(c, -1), f = e.invert().map(u);
      i.push({
        oldRange: {
          from: d,
          to: f
        },
        newRange: {
          from: c,
          to: u
        }
      });
    });
  }), Fv(i);
}
function hs(n, e) {
  return e.nodes[n] || e.marks[n] || null;
}
function Pi(n, e, t) {
  return Object.fromEntries(
    Object.entries(t).filter(([i]) => {
      const r = n.find((s) => s.type === e && s.name === i);
      return r ? r.attribute.keepOnSplit : !1;
    })
  );
}
var Hv = (n, e = 500) => {
  let t = "";
  const i = n.parentOffset;
  return n.parent.nodesBetween(Math.max(0, i - e), i, (r, s, o, a) => {
    var l, c;
    const u = ((c = (l = r.type.spec).toText) == null ? void 0 : c.call(l, {
      node: r,
      pos: s,
      parent: o,
      index: a
    })) || r.textContent || "%leaf%";
    t += r.isAtom && !r.isText ? u : u.slice(0, Math.max(0, i - s));
  }), t;
};
function no(n, e, t = {}) {
  const { empty: i, ranges: r } = n.selection, s = e ? ct(e, n.schema) : null;
  if (i)
    return !!(n.storedMarks || n.selection.$from.marks()).filter((d) => s ? s.name === d.type.name : !0).find((d) => nr(d.attrs, t, { strict: !1 }));
  let o = 0;
  const a = [];
  if (r.forEach(({ $from: d, $to: f }) => {
    const p = d.pos, m = f.pos;
    n.doc.nodesBetween(p, m, (v, y) => {
      if (!v.isText && !v.marks.length)
        return;
      const g = Math.max(p, y), b = Math.min(m, y + v.nodeSize), w = b - g;
      o += w, a.push(
        ...v.marks.map((C) => ({
          mark: C,
          from: g,
          to: b
        }))
      );
    });
  }), o === 0)
    return !1;
  const l = a.filter((d) => s ? s.name === d.mark.type.name : !0).filter((d) => nr(d.mark.attrs, t, { strict: !1 })).reduce((d, f) => d + f.to - f.from, 0), c = a.filter((d) => s ? d.mark.type !== s && d.mark.type.excludes(s) : !0).reduce((d, f) => d + f.to - f.from, 0);
  return (l > 0 ? l + c : l) >= o;
}
function jv(n, e, t = {}) {
  if (!e)
    return Zn(n, null, t) || no(n, null, t);
  const i = xr(e, n.schema);
  return i === "node" ? Zn(n, e, t) : i === "mark" ? no(n, e, t) : !1;
}
function bc(n, e) {
  return Array.isArray(e) ? e.some((t) => (typeof t == "string" ? t : t.name) === n.name) : e;
}
function wc(n, e) {
  const { nodeExtensions: t } = Cn(e), i = t.find((o) => o.name === n);
  if (!i)
    return !1;
  const r = {
    name: i.name,
    options: i.options,
    storage: i.storage
  }, s = G(I(i, "group", r));
  return typeof s != "string" ? !1 : s.split(" ").includes("list");
}
function Tr(n, {
  checkChildren: e = !0,
  ignoreWhitespace: t = !1
} = {}) {
  var i;
  if (t) {
    if (n.type.name === "hardBreak")
      return !0;
    if (n.isText)
      return /^\s*$/m.test((i = n.text) != null ? i : "");
  }
  if (n.isText)
    return !n.text;
  if (n.isAtom || n.isLeaf)
    return !1;
  if (n.content.childCount === 0)
    return !0;
  if (e) {
    let r = !0;
    return n.content.forEach((s) => {
      r !== !1 && (Tr(s, { ignoreWhitespace: t, checkChildren: e }) || (r = !1));
    }), r;
  }
  return !1;
}
function Wv(n) {
  return n instanceof D;
}
var tf = class nf {
  constructor(e) {
    this.position = e;
  }
  /**
   * Creates a MappablePosition from a JSON object.
   */
  static fromJSON(e) {
    return new nf(e.position);
  }
  /**
   * Converts the MappablePosition to a JSON object.
   */
  toJSON() {
    return {
      position: this.position
    };
  }
};
function Uv(n, e) {
  const t = e.mapping.mapResult(n.position);
  return {
    position: new tf(t.pos),
    mapResult: t
  };
}
function qv(n) {
  return new tf(n);
}
function Kv(n, e, t) {
  var i;
  const { selection: r } = e;
  let s = null;
  if (Uh(r) && (s = r.$cursor), s) {
    const a = (i = n.storedMarks) != null ? i : s.marks();
    return s.parent.type.allowsMarkType(t) && (!!t.isInSet(a) || !a.some((c) => c.type.excludes(t)));
  }
  const { ranges: o } = r;
  return o.some(({ $from: a, $to: l }) => {
    let c = a.depth === 0 ? n.doc.inlineContent && n.doc.type.allowsMarkType(t) : !1;
    return n.doc.nodesBetween(a.pos, l.pos, (u, d, f) => {
      if (c)
        return !1;
      if (u.isInline) {
        const p = !f || f.type.allowsMarkType(t), m = !!t.isInSet(u.marks) || !u.marks.some((v) => v.type.excludes(t));
        c = p && m;
      }
      return !c;
    }), c;
  });
}
var Jv = (n, e = {}) => ({ tr: t, state: i, dispatch: r }) => {
  const { selection: s } = t, { empty: o, ranges: a } = s, l = ct(n, i.schema);
  if (r)
    if (o) {
      const c = Gh(i, l);
      t.addStoredMark(
        l.create({
          ...c,
          ...e
        })
      );
    } else
      a.forEach((c) => {
        const u = c.$from.pos, d = c.$to.pos;
        i.doc.nodesBetween(u, d, (f, p) => {
          const m = Math.max(p, u), v = Math.min(p + f.nodeSize, d);
          f.marks.find((g) => g.type === l) ? f.marks.forEach((g) => {
            l === g.type && t.addMark(
              m,
              v,
              l.create({
                ...g.attrs,
                ...e
              })
            );
          }) : t.addMark(m, v, l.create(e));
        });
      });
  return Kv(i, t, l);
}, Gv = (n, e) => ({ tr: t }) => (t.setMeta(n, e), !0), Xv = (n, e = {}) => ({ state: t, dispatch: i, chain: r }) => {
  const s = fe(n, t.schema);
  let o;
  return t.selection.$anchor.sameParent(t.selection.$head) && (o = t.selection.$anchor.parent.attrs), s.isTextblock ? r().command(({ commands: a }) => $l(s, { ...o, ...e })(t) ? !0 : a.clearNodes()).command(({ state: a }) => $l(s, { ...o, ...e })(a, i)).run() : (console.warn('[tiptap warn]: Currently "setNode()" only supports text block nodes.'), !1);
}, Yv = (n) => ({ tr: e, dispatch: t }) => {
  if (t) {
    const { doc: i } = e, r = Pt(n, 0, i.content.size), s = D.create(i, r);
    e.setSelection(s);
  }
  return !0;
}, Zv = (n, e) => ({ tr: t, state: i, dispatch: r }) => {
  const { selection: s } = i;
  let o, a;
  return typeof e == "number" ? (o = e, a = e) : e && "from" in e && "to" in e ? (o = e.from, a = e.to) : (o = s.from, a = s.to), r && t.doc.nodesBetween(o, a, (l, c) => {
    l.isText || t.setNodeMarkup(c, void 0, {
      ...l.attrs,
      dir: n
    });
  }), !0;
}, Qv = (n) => ({ tr: e, dispatch: t }) => {
  if (t) {
    const { doc: i } = e, { from: r, to: s } = typeof n == "number" ? { from: n, to: n } : n, o = z.atStart(i).from, a = z.atEnd(i).to, l = Pt(r, o, a), c = Pt(s, o, a), u = z.create(i, l, c);
    e.setSelection(u);
  }
  return !0;
}, e8 = (n) => ({ state: e, dispatch: t }) => {
  const i = fe(n, e.schema);
  return J6(i)(e, t);
};
function Cc(n, e) {
  const t = n.storedMarks || n.selection.$to.parentOffset && n.selection.$from.marks();
  if (t) {
    const i = t.filter((r) => e == null ? void 0 : e.includes(r.type.name));
    n.tr.ensureMarks(i);
  }
}
var t8 = ({ keepMarks: n = !0 } = {}) => ({ tr: e, state: t, dispatch: i, editor: r }) => {
  const { selection: s, doc: o } = e, { $from: a, $to: l } = s, c = r.extensionManager.attributes, u = Pi(c, a.node().type.name, a.node().attrs);
  if (s instanceof D && s.node.isBlock)
    return !a.parentOffset || !hn(o, a.pos) ? !1 : (i && (n && Cc(t, r.extensionManager.splittableMarks), e.split(a.pos).scrollIntoView()), !0);
  if (!a.parent.isBlock)
    return !1;
  const d = l.parentOffset === l.parent.content.size, f = a.depth === 0 ? void 0 : Av(a.node(-1).contentMatchAt(a.indexAfter(-1)));
  let p = d && f ? [
    {
      type: f,
      attrs: u
    }
  ] : void 0, m = hn(e.doc, e.mapping.map(a.pos), 1, p);
  if (!p && !m && hn(e.doc, e.mapping.map(a.pos), 1, f ? [{ type: f }] : void 0) && (m = !0, p = f ? [
    {
      type: f,
      attrs: u
    }
  ] : void 0), i) {
    if (m && (s instanceof z && e.deleteSelection(), e.split(e.mapping.map(a.pos), 1, p), f && !d && !a.parentOffset && a.parent.type !== f)) {
      const v = e.mapping.map(a.before()), y = e.doc.resolve(v);
      a.node(-1).canReplaceWith(y.index(), y.index() + 1, f) && e.setNodeMarkup(e.mapping.map(a.before()), f);
    }
    n && Cc(t, r.extensionManager.splittableMarks), e.scrollIntoView();
  }
  return m;
}, n8 = (n, e = {}) => ({ tr: t, state: i, dispatch: r, editor: s }) => {
  var o;
  const a = fe(n, i.schema), { $from: l, $to: c } = i.selection, u = i.selection.node;
  if (u && u.isBlock || l.depth < 2 || !l.sameParent(c))
    return !1;
  const d = l.node(-1);
  if (d.type !== a)
    return !1;
  const f = s.extensionManager.attributes;
  if (l.parent.content.size === 0 && l.node(-1).childCount === l.indexAfter(-1)) {
    if (l.depth === 2 || l.node(-3).type !== a || l.index(-2) !== l.node(-2).childCount - 1)
      return !1;
    if (r) {
      let g = T.empty;
      const b = l.index(-1) ? 1 : l.index(-2) ? 2 : 3;
      for (let A = l.depth - b; A >= l.depth - 3; A -= 1)
        g = T.from(l.node(A).copy(g));
      const w = (
        // eslint-disable-next-line no-nested-ternary
        l.indexAfter(-1) < l.node(-2).childCount ? 1 : l.indexAfter(-2) < l.node(-3).childCount ? 2 : 3
      ), C = {
        ...Pi(f, l.node().type.name, l.node().attrs),
        ...e
      }, x = ((o = a.contentMatch.defaultType) == null ? void 0 : o.createAndFill(C)) || void 0;
      g = g.append(T.from(a.createAndFill(null, x) || void 0));
      const S = l.before(l.depth - (b - 1));
      t.replace(S, l.after(-w), new N(g, 4 - b, 0));
      let M = -1;
      t.doc.nodesBetween(S, t.doc.content.size, (A, E) => {
        if (M > -1)
          return !1;
        A.isTextblock && A.content.size === 0 && (M = E + 1);
      }), M > -1 && t.setSelection(z.near(t.doc.resolve(M))), t.scrollIntoView();
    }
    return !0;
  }
  const p = c.pos === l.end() ? d.contentMatchAt(0).defaultType : null, m = {
    ...Pi(f, d.type.name, d.attrs),
    ...e
  }, v = {
    ...Pi(f, l.node().type.name, l.node().attrs),
    ...e
  };
  t.delete(l.pos, c.pos);
  const y = p ? [
    { type: a, attrs: m },
    { type: p, attrs: v }
  ] : [{ type: a, attrs: m }];
  if (!hn(t.doc, l.pos, 2))
    return !1;
  if (r) {
    const { selection: g, storedMarks: b } = i, { splittableMarks: w } = s.extensionManager, C = b || g.$to.parentOffset && g.$from.marks();
    if (t.split(l.pos, 2, y).scrollIntoView(), !C || !r)
      return !0;
    const x = C.filter((S) => w.includes(S.type.name));
    t.ensureMarks(x);
  }
  return !0;
}, fs = (n, e) => {
  const t = Yo((o) => o.type === e)(n.selection);
  if (!t)
    return !0;
  const i = n.doc.resolve(Math.max(0, t.pos - 1)).before(t.depth);
  if (i === void 0)
    return !0;
  const r = n.doc.nodeAt(i);
  return t.node.type === (r == null ? void 0 : r.type) && Xt(n.doc, t.pos) && n.join(t.pos), !0;
}, ps = (n, e) => {
  const t = Yo((o) => o.type === e)(n.selection);
  if (!t)
    return !0;
  const i = n.doc.resolve(t.start).after(t.depth);
  if (i === void 0)
    return !0;
  const r = n.doc.nodeAt(i);
  return t.node.type === (r == null ? void 0 : r.type) && Xt(n.doc, i) && n.join(i), !0;
}, i8 = (n, e, t, i = {}) => ({ editor: r, tr: s, state: o, dispatch: a, chain: l, commands: c, can: u }) => {
  const { extensions: d, splittableMarks: f } = r.extensionManager, p = fe(n, o.schema), m = fe(e, o.schema), { selection: v, storedMarks: y } = o, { $from: g, $to: b } = v, w = g.blockRange(b), C = y || v.$to.parentOffset && v.$from.marks();
  if (!w)
    return !1;
  const x = Yo((S) => wc(S.type.name, d))(v);
  if (w.depth >= 1 && x && w.depth - x.depth <= 1) {
    if (x.node.type === p)
      return c.liftListItem(m);
    if (wc(x.node.type.name, d) && p.validContent(x.node.content) && a)
      return l().command(() => (s.setNodeMarkup(x.pos, p), !0)).command(() => fs(s, p)).command(() => ps(s, p)).run();
  }
  return !t || !C || !a ? l().command(() => u().wrapInList(p, i) ? !0 : c.clearNodes()).wrapInList(p, i).command(() => fs(s, p)).command(() => ps(s, p)).run() : l().command(() => {
    const S = u().wrapInList(p, i), M = C.filter((A) => f.includes(A.type.name));
    return s.ensureMarks(M), S ? !0 : c.clearNodes();
  }).wrapInList(p, i).command(() => fs(s, p)).command(() => ps(s, p)).run();
}, r8 = (n, e = {}, t = {}) => ({ state: i, commands: r }) => {
  const { extendEmptyMarkRange: s = !1 } = t, o = ct(n, i.schema);
  return no(i, o, e) ? r.unsetMark(o, { extendEmptyMarkRange: s }) : r.setMark(o, e);
}, s8 = (n, e, t = {}) => ({ state: i, commands: r }) => {
  const s = fe(n, i.schema), o = fe(e, i.schema), a = Zn(i, s, t);
  let l;
  return i.selection.$anchor.sameParent(i.selection.$head) && (l = i.selection.$anchor.parent.attrs), a ? r.setNode(o, l) : r.setNode(s, { ...l, ...t });
}, o8 = (n, e = {}) => ({ state: t, commands: i }) => {
  const r = fe(n, t.schema);
  return Zn(t, r, e) ? i.lift(r) : i.wrapIn(r, e);
}, a8 = () => ({ state: n, dispatch: e }) => {
  const t = n.plugins;
  for (let i = 0; i < t.length; i += 1) {
    const r = t[i];
    let s;
    if (r.spec.isInputRules && (s = r.getState(n))) {
      if (e) {
        const o = n.tr, a = s.transform;
        for (let l = a.steps.length - 1; l >= 0; l -= 1)
          o.step(a.steps[l].invert(a.docs[l]));
        if (s.text) {
          const l = o.doc.resolve(s.from).marks();
          o.replaceWith(s.from, s.to, n.schema.text(s.text, l));
        } else
          o.delete(s.from, s.to);
      }
      return !0;
    }
  }
  return !1;
}, l8 = () => ({ tr: n, dispatch: e }) => {
  const { selection: t } = n, { empty: i, ranges: r } = t;
  return i || e && r.forEach((s) => {
    n.removeMark(s.$from.pos, s.$to.pos);
  }), !0;
}, c8 = (n, e = {}) => ({ tr: t, state: i, dispatch: r }) => {
  var s;
  const { extendEmptyMarkRange: o = !1 } = e, { selection: a } = t, l = ct(n, i.schema), { $from: c, empty: u, ranges: d } = a;
  if (!r)
    return !0;
  if (u && o) {
    let { from: f, to: p } = a;
    const m = (s = c.marks().find((y) => y.type === l)) == null ? void 0 : s.attrs, v = Wh(c, l, m);
    v && (f = v.from, p = v.to), t.removeMark(f, p, l);
  } else
    d.forEach((f) => {
      t.removeMark(f.$from.pos, f.$to.pos, l);
    });
  return t.removeStoredMark(l), !0;
}, u8 = (n) => ({ tr: e, state: t, dispatch: i }) => {
  const { selection: r } = t;
  let s, o;
  return typeof n == "number" ? (s = n, o = n) : n && "from" in n && "to" in n ? (s = n.from, o = n.to) : (s = r.from, o = r.to), i && e.doc.nodesBetween(s, o, (a, l) => {
    if (a.isText)
      return;
    const c = { ...a.attrs };
    delete c.dir, e.setNodeMarkup(l, void 0, c);
  }), !0;
}, d8 = (n, e = {}) => ({ tr: t, state: i, dispatch: r }) => {
  let s = null, o = null;
  const a = xr(
    typeof n == "string" ? n : n.name,
    i.schema
  );
  if (!a)
    return !1;
  a === "node" && (s = fe(n, i.schema)), a === "mark" && (o = ct(n, i.schema));
  let l = !1;
  return t.selection.ranges.forEach((c) => {
    const u = c.$from.pos, d = c.$to.pos;
    let f, p, m, v;
    t.selection.empty ? i.doc.nodesBetween(u, d, (y, g) => {
      s && s === y.type && (l = !0, m = Math.max(g, u), v = Math.min(g + y.nodeSize, d), f = g, p = y);
    }) : i.doc.nodesBetween(u, d, (y, g) => {
      g < u && s && s === y.type && (l = !0, m = Math.max(g, u), v = Math.min(g + y.nodeSize, d), f = g, p = y), g >= u && g <= d && (s && s === y.type && (l = !0, r && t.setNodeMarkup(g, void 0, {
        ...y.attrs,
        ...e
      })), o && y.marks.length && y.marks.forEach((b) => {
        if (o === b.type && (l = !0, r)) {
          const w = Math.max(g, u), C = Math.min(g + y.nodeSize, d);
          t.addMark(
            w,
            C,
            o.create({
              ...b.attrs,
              ...e
            })
          );
        }
      }));
    }), p && (f !== void 0 && r && t.setNodeMarkup(f, void 0, {
      ...p.attrs,
      ...e
    }), o && p.marks.length && p.marks.forEach((y) => {
      o === y.type && r && t.addMark(
        m,
        v,
        o.create({
          ...y.attrs,
          ...e
        })
      );
    }));
  }), l;
}, h8 = (n, e = {}) => ({ state: t, dispatch: i }) => {
  const r = fe(n, t.schema);
  return V6(r, e)(t, i);
}, f8 = (n, e = {}) => ({ state: t, dispatch: i }) => {
  const r = fe(n, t.schema);
  return H6(r, e)(t, i);
}, p8 = class {
  constructor() {
    this.callbacks = {};
  }
  on(n, e) {
    return this.callbacks[n] || (this.callbacks[n] = []), this.callbacks[n].push(e), this;
  }
  emit(n, ...e) {
    const t = this.callbacks[n];
    return t && t.forEach((i) => i.apply(this, e)), this;
  }
  off(n, e) {
    const t = this.callbacks[n];
    return t && (e ? this.callbacks[n] = t.filter((i) => i !== e) : delete this.callbacks[n]), this;
  }
  once(n, e) {
    const t = (...i) => {
      this.off(n, t), e.apply(this, i);
    };
    return this.on(n, t);
  }
  removeAllListeners() {
    this.callbacks = {};
  }
}, m8 = class {
  constructor(n) {
    var e;
    this.find = n.find, this.handler = n.handler, this.undoable = (e = n.undoable) != null ? e : !0;
  }
}, g8 = (n, e) => {
  if (Go(e))
    return e.exec(n);
  const t = e(n);
  if (!t)
    return null;
  const i = [t.text];
  return i.index = t.index, i.input = n, i.data = t.data, t.replaceWith && (t.text.includes(t.replaceWith) || console.warn('[tiptap warn]: "inputRuleMatch.replaceWith" must be part of "inputRuleMatch.text".'), i.push(t.replaceWith)), i;
};
function Mi(n) {
  var e;
  const { editor: t, from: i, to: r, text: s, rules: o, plugin: a } = n, { view: l } = t;
  if (l.composing)
    return !1;
  const c = l.state.doc.resolve(i);
  if (
    // check for code node
    c.parent.type.spec.code || (e = c.nodeBefore || c.nodeAfter) != null && e.marks.find((f) => f.type.spec.code)
  )
    return !1;
  let u = !1;
  const d = Hv(c) + s;
  return o.forEach((f) => {
    if (u)
      return;
    const p = g8(d, f.find);
    if (!p)
      return;
    const m = l.state.tr, v = Cr({
      state: l.state,
      transaction: m
    }), y = {
      from: i - (p[0].length - s.length),
      to: r
    }, { commands: g, chain: b, can: w } = new kr({
      editor: t,
      state: v
    });
    f.handler({
      state: v,
      range: y,
      match: p,
      commands: g,
      chain: b,
      can: w
    }) === null || !m.steps.length || (f.undoable && m.setMeta(a, {
      transform: m,
      from: i,
      to: r,
      text: s
    }), l.dispatch(m), u = !0);
  }), u;
}
function v8(n) {
  const { editor: e, rules: t } = n, i = new re({
    state: {
      init() {
        return null;
      },
      apply(r, s, o) {
        const a = r.getMeta(i);
        if (a)
          return a;
        const l = r.getMeta("applyInputRules");
        return !!l && setTimeout(() => {
          let { text: u } = l;
          typeof u == "string" ? u = u : u = Qo(T.from(u), o.schema);
          const { from: d } = l, f = d + u.length;
          Mi({
            editor: e,
            from: d,
            to: f,
            text: u,
            rules: t,
            plugin: i
          });
        }), r.selectionSet || r.docChanged ? null : s;
      }
    },
    props: {
      handleTextInput(r, s, o, a) {
        return Mi({
          editor: e,
          from: s,
          to: o,
          text: a,
          rules: t,
          plugin: i
        });
      },
      handleDOMEvents: {
        compositionend: (r) => (setTimeout(() => {
          const { $cursor: s } = r.state.selection;
          s && Mi({
            editor: e,
            from: s.pos,
            to: s.pos,
            text: "",
            rules: t,
            plugin: i
          });
        }), !1)
      },
      // add support for input rules to trigger on enter
      // this is useful for example for code blocks
      handleKeyDown(r, s) {
        if (s.key !== "Enter")
          return !1;
        const { $cursor: o } = r.state.selection;
        return o ? Mi({
          editor: e,
          from: o.pos,
          to: o.pos,
          text: "\n",
          rules: t,
          plugin: i
        }) : !1;
      }
    },
    // @ts-ignore
    isInputRules: !0
  });
  return i;
}
function y8(n) {
  return Object.prototype.toString.call(n).slice(8, -1);
}
function _i(n) {
  return y8(n) !== "Object" ? !1 : n.constructor === Object && Object.getPrototypeOf(n) === Object.prototype;
}
function rf(n, e) {
  const t = { ...n };
  return _i(n) && _i(e) && Object.keys(e).forEach((i) => {
    _i(e[i]) && _i(n[i]) ? t[i] = rf(n[i], e[i]) : t[i] = e[i];
  }), t;
}
var ta = class {
  constructor(n = {}) {
    this.type = "extendable", this.parent = null, this.child = null, this.name = "", this.config = {
      name: this.name
    }, this.config = {
      ...this.config,
      ...n
    }, this.name = this.config.name;
  }
  get options() {
    return {
      ...G(
        I(this, "addOptions", {
          name: this.name
        })
      ) || {}
    };
  }
  get storage() {
    return {
      ...G(
        I(this, "addStorage", {
          name: this.name,
          options: this.options
        })
      ) || {}
    };
  }
  configure(n = {}) {
    const e = this.extend({
      ...this.config,
      addOptions: () => rf(this.options, n)
    });
    return e.name = this.name, e.parent = this.parent, e;
  }
  extend(n = {}) {
    const e = new this.constructor({ ...this.config, ...n });
    return e.parent = this, this.child = e, e.name = "name" in n ? n.name : e.parent.name, e;
  }
}, b8 = class sf extends ta {
  constructor() {
    super(...arguments), this.type = "mark";
  }
  /**
   * Create a new Mark instance
   * @param config - Mark configuration object or a function that returns a configuration object
   */
  static create(e = {}) {
    const t = typeof e == "function" ? e() : e;
    return new sf(t);
  }
  static handleExit({ editor: e, mark: t }) {
    const { tr: i } = e.state, r = e.state.selection.$from;
    if (r.pos === r.end()) {
      const o = r.marks();
      if (!!!o.find((c) => (c == null ? void 0 : c.type.name) === t.name))
        return !1;
      const l = o.find((c) => (c == null ? void 0 : c.type.name) === t.name);
      return l && i.removeStoredMark(l), i.insertText(" ", r.pos), e.view.dispatch(i), !0;
    }
    return !1;
  }
  configure(e) {
    return super.configure(e);
  }
  extend(e) {
    const t = typeof e == "function" ? e() : e;
    return super.extend(t);
  }
};
function w8(n) {
  return typeof n == "number";
}
var C8 = (n, e, t) => {
  if (Go(e))
    return [...n.matchAll(e)];
  const i = e(n, t);
  return i ? i.map((r) => {
    const s = [r.text];
    return s.index = r.index, s.input = n, s.data = r.data, r.replaceWith && (r.text.includes(r.replaceWith) || console.warn('[tiptap warn]: "pasteRuleMatch.replaceWith" must be part of "pasteRuleMatch.text".'), s.push(r.replaceWith)), s;
  }) : [];
};
function k8(n) {
  const { editor: e, state: t, from: i, to: r, rule: s, pasteEvent: o, dropEvent: a } = n, { commands: l, chain: c, can: u } = new kr({
    editor: e,
    state: t
  }), d = [];
  return t.doc.nodesBetween(i, r, (p, m) => {
    var v, y, g, b, w;
    if ((y = (v = p.type) == null ? void 0 : v.spec) != null && y.code || !(p.isText || p.isTextblock || p.isInline))
      return;
    const C = (w = (b = (g = p.content) == null ? void 0 : g.size) != null ? b : p.nodeSize) != null ? w : 0, x = Math.max(i, m), S = Math.min(r, m + C);
    if (x >= S)
      return;
    const M = p.isText ? p.text || "" : p.textBetween(x - m, S - m, void 0, "￼");
    C8(M, s.find, o).forEach((E) => {
      if (E.index === void 0)
        return;
      const H = x + E.index + 1, U = H + E[0].length, ae = {
        from: t.tr.mapping.map(H),
        to: t.tr.mapping.map(U)
      }, ut = s.handler({
        state: t,
        range: ae,
        match: E,
        commands: l,
        chain: c,
        can: u,
        pasteEvent: o,
        dropEvent: a
      });
      d.push(ut);
    });
  }), d.every((p) => p !== null);
}
var Ni = null, x8 = (n) => {
  var e;
  const t = new ClipboardEvent("paste", {
    clipboardData: new DataTransfer()
  });
  return (e = t.clipboardData) == null || e.setData("text/html", n), t;
};
function S8(n) {
  const { editor: e, rules: t } = n;
  let i = null, r = !1, s = !1, o = typeof ClipboardEvent < "u" ? new ClipboardEvent("paste") : null, a;
  try {
    a = typeof DragEvent < "u" ? new DragEvent("drop") : null;
  } catch (u) {
    a = null;
  }
  const l = ({
    state: u,
    from: d,
    to: f,
    rule: p,
    pasteEvt: m
  }) => {
    const v = u.tr, y = Cr({
      state: u,
      transaction: v
    });
    if (!(!k8({
      editor: e,
      state: y,
      from: Math.max(d - 1, 0),
      to: f.b - 1,
      rule: p,
      pasteEvent: m,
      dropEvent: a
    }) || !v.steps.length)) {
      try {
        a = typeof DragEvent < "u" ? new DragEvent("drop") : null;
      } catch (b) {
        a = null;
      }
      return o = typeof ClipboardEvent < "u" ? new ClipboardEvent("paste") : null, v;
    }
  };
  return t.map((u) => new re({
    // we register a global drag handler to track the current drag source element
    view(d) {
      const f = (m) => {
        var v;
        i = (v = d.dom.parentElement) != null && v.contains(m.target) ? d.dom.parentElement : null, i && (Ni = e);
      }, p = () => {
        Ni && (Ni = null);
      };
      return window.addEventListener("dragstart", f), window.addEventListener("dragend", p), {
        destroy() {
          window.removeEventListener("dragstart", f), window.removeEventListener("dragend", p);
        }
      };
    },
    props: {
      handleDOMEvents: {
        drop: (d, f) => {
          if (s = i === d.dom.parentElement, a = f, !s) {
            const p = Ni;
            p != null && p.isEditable && setTimeout(() => {
              const m = p.state.selection;
              m && p.commands.deleteRange({ from: m.from, to: m.to });
            }, 10);
          }
          return !1;
        },
        paste: (d, f) => {
          var p;
          const m = (p = f.clipboardData) == null ? void 0 : p.getData("text/html");
          return o = f, r = !!(m != null && m.includes("data-pm-slice")), !1;
        }
      }
    },
    appendTransaction: (d, f, p) => {
      const m = d[0], v = m.getMeta("uiEvent") === "paste" && !r, y = m.getMeta("uiEvent") === "drop" && !s, g = m.getMeta("applyPasteRules"), b = !!g;
      if (!v && !y && !b)
        return;
      if (b) {
        let { text: x } = g;
        typeof x == "string" ? x = x : x = Qo(T.from(x), p.schema);
        const { from: S } = g, M = S + x.length, A = x8(x);
        return l({
          rule: u,
          state: p,
          from: S,
          to: { b: M },
          pasteEvt: A
        });
      }
      const w = f.doc.content.findDiffStart(p.doc.content), C = f.doc.content.findDiffEnd(p.doc.content);
      if (!(!w8(w) || !C || w === C.b))
        return l({
          rule: u,
          state: p,
          from: w,
          to: C,
          pasteEvt: o
        });
    }
  }));
}
var Mr = class {
  constructor(n, e) {
    this.splittableMarks = [], this.editor = e, this.baseExtensions = n, this.extensions = Zh(n), this.schema = $v(this.extensions, e), this.setupExtensions();
  }
  /**
   * Get all commands from the extensions.
   * @returns An object with all commands where the key is the command name and the value is the command function
   */
  get commands() {
    return this.extensions.reduce((n, e) => {
      const t = {
        name: e.name,
        options: e.options,
        storage: this.editor.extensionStorage[e.name],
        editor: this.editor,
        type: hs(e.name, this.schema)
      }, i = I(e, "addCommands", t);
      return i ? {
        ...n,
        ...i()
      } : n;
    }, {});
  }
  /**
   * Get all registered Prosemirror plugins from the extensions.
   * @returns An array of Prosemirror plugins
   */
  get plugins() {
    const { editor: n } = this;
    return ea([...this.extensions].reverse()).flatMap((i) => {
      const r = {
        name: i.name,
        options: i.options,
        storage: this.editor.extensionStorage[i.name],
        editor: n,
        type: hs(i.name, this.schema)
      }, s = [], o = I(
        i,
        "addKeyboardShortcuts",
        r
      );
      let a = {};
      if (i.type === "mark" && I(i, "exitable", r) && (a.ArrowRight = () => b8.handleExit({ editor: n, mark: i })), o) {
        const f = Object.fromEntries(
          Object.entries(o()).map(([p, m]) => [p, () => m({ editor: n })])
        );
        a = { ...a, ...f };
      }
      const l = L4(a);
      s.push(l);
      const c = I(i, "addInputRules", r);
      if (bc(i, n.options.enableInputRules) && c) {
        const f = c();
        if (f && f.length) {
          const p = v8({
            editor: n,
            rules: f
          }), m = Array.isArray(p) ? p : [p];
          s.push(...m);
        }
      }
      const u = I(i, "addPasteRules", r);
      if (bc(i, n.options.enablePasteRules) && u) {
        const f = u();
        if (f && f.length) {
          const p = S8({ editor: n, rules: f });
          s.push(...p);
        }
      }
      const d = I(
        i,
        "addProseMirrorPlugins",
        r
      );
      if (d) {
        const f = d();
        s.push(...f);
      }
      return s;
    });
  }
  /**
   * Get all attributes from the extensions.
   * @returns An array of attributes
   */
  get attributes() {
    return Yh(this.extensions);
  }
  /**
   * Get all node views from the extensions.
   * @returns An object with all node views where the key is the node name and the value is the node view function
   */
  get nodeViews() {
    const { editor: n } = this, { nodeExtensions: e } = Cn(this.extensions);
    return Object.fromEntries(
      e.filter((t) => !!I(t, "addNodeView")).map((t) => {
        const i = this.attributes.filter((l) => l.type === t.name), r = {
          name: t.name,
          options: t.options,
          storage: this.editor.extensionStorage[t.name],
          editor: n,
          type: fe(t.name, this.schema)
        }, s = I(t, "addNodeView", r);
        if (!s)
          return [];
        const o = s();
        if (!o)
          return [];
        const a = (l, c, u, d, f) => {
          const p = ir(l, i);
          return o({
            // pass-through
            node: l,
            view: c,
            getPos: u,
            decorations: d,
            innerDecorations: f,
            // tiptap-specific
            editor: n,
            extension: t,
            HTMLAttributes: p
          });
        };
        return [t.name, a];
      })
    );
  }
  get markViews() {
    const { editor: n } = this, { markExtensions: e } = Cn(this.extensions);
    return Object.fromEntries(
      e.filter((t) => !!I(t, "addMarkView")).map((t) => {
        const i = this.attributes.filter((a) => a.type === t.name), r = {
          name: t.name,
          options: t.options,
          storage: this.editor.extensionStorage[t.name],
          editor: n,
          type: ct(t.name, this.schema)
        }, s = I(t, "addMarkView", r);
        if (!s)
          return [];
        const o = (a, l, c) => {
          const u = ir(a, i);
          return s()({
            // pass-through
            mark: a,
            view: l,
            inline: c,
            // tiptap-specific
            editor: n,
            extension: t,
            HTMLAttributes: u,
            updateAttributes: (d) => {
              V8(a, n, d);
            }
          });
        };
        return [t.name, o];
      })
    );
  }
  /**
   * Go through all extensions, create extension storages & setup marks
   * & bind editor event listener.
   */
  setupExtensions() {
    const n = this.extensions;
    this.editor.extensionStorage = Object.fromEntries(
      n.map((e) => [e.name, e.storage])
    ), n.forEach((e) => {
      var t;
      const i = {
        name: e.name,
        options: e.options,
        storage: this.editor.extensionStorage[e.name],
        editor: this.editor,
        type: hs(e.name, this.schema)
      };
      e.type === "mark" && ((t = G(I(e, "keepOnSplit", i))) == null || t) && this.splittableMarks.push(e.name);
      const r = I(e, "onBeforeCreate", i), s = I(e, "onCreate", i), o = I(e, "onUpdate", i), a = I(
        e,
        "onSelectionUpdate",
        i
      ), l = I(e, "onTransaction", i), c = I(e, "onFocus", i), u = I(e, "onBlur", i), d = I(e, "onDestroy", i);
      r && this.editor.on("beforeCreate", r), s && this.editor.on("create", s), o && this.editor.on("update", o), a && this.editor.on("selectionUpdate", a), l && this.editor.on("transaction", l), c && this.editor.on("focus", c), u && this.editor.on("blur", u), d && this.editor.on("destroy", d);
    });
  }
};
Mr.resolve = Zh;
Mr.sort = ea;
Mr.flatten = Zo;
var T8 = {};
Jo(T8, {
  ClipboardTextSerializer: () => af,
  Commands: () => lf,
  Delete: () => cf,
  Drop: () => uf,
  Editable: () => df,
  FocusEvents: () => ff,
  Keymap: () => pf,
  Paste: () => mf,
  Tabindex: () => gf,
  TextDirection: () => vf,
  focusEventsPluginKey: () => hf
});
var oe = class of extends ta {
  constructor() {
    super(...arguments), this.type = "extension";
  }
  /**
   * Create a new Extension instance
   * @param config - Extension configuration object or a function that returns a configuration object
   */
  static create(e = {}) {
    const t = typeof e == "function" ? e() : e;
    return new of(t);
  }
  configure(e) {
    return super.configure(e);
  }
  extend(e) {
    const t = typeof e == "function" ? e() : e;
    return super.extend(t);
  }
}, af = oe.create({
  name: "clipboardTextSerializer",
  addOptions() {
    return {
      blockSeparator: void 0
    };
  },
  addProseMirrorPlugins() {
    return [
      new re({
        key: new be("clipboardTextSerializer"),
        props: {
          clipboardTextSerializer: () => {
            const { editor: n } = this, { state: e, schema: t } = n, { doc: i, selection: r } = e, { ranges: s } = r, o = Math.min(...s.map((u) => u.$from.pos)), a = Math.max(...s.map((u) => u.$to.pos)), l = ef(t);
            return Qh(i, { from: o, to: a }, {
              ...this.options.blockSeparator !== void 0 ? { blockSeparator: this.options.blockSeparator } : {},
              textSerializers: l
            });
          }
        }
      })
    ];
  }
}), lf = oe.create({
  name: "commands",
  addCommands() {
    return {
      ...Hh
    };
  }
}), cf = oe.create({
  name: "delete",
  onUpdate({ transaction: n, appendedTransactions: e }) {
    var t, i, r;
    const s = () => {
      var o, a, l, c;
      if ((c = (l = (a = (o = this.editor.options.coreExtensionOptions) == null ? void 0 : o.delete) == null ? void 0 : a.filterTransaction) == null ? void 0 : l.call(a, n)) != null ? c : n.getMeta("y-sync$"))
        return;
      const u = Ev(n.before, [n, ...e]);
      Vv(u).forEach((p) => {
        u.mapping.mapResult(p.oldRange.from).deletedAfter && u.mapping.mapResult(p.oldRange.to).deletedBefore && u.before.nodesBetween(p.oldRange.from, p.oldRange.to, (m, v) => {
          const y = v + m.nodeSize - 2, g = p.oldRange.from <= v && y <= p.oldRange.to;
          this.editor.emit("delete", {
            type: "node",
            node: m,
            from: v,
            to: y,
            newFrom: u.mapping.map(v),
            newTo: u.mapping.map(y),
            deletedRange: p.oldRange,
            newRange: p.newRange,
            partial: !g,
            editor: this.editor,
            transaction: n,
            combinedTransform: u
          });
        });
      });
      const f = u.mapping;
      u.steps.forEach((p, m) => {
        var v, y;
        if (p instanceof Ge) {
          const g = f.slice(m).map(p.from, -1), b = f.slice(m).map(p.to), w = f.invert().map(g, -1), C = f.invert().map(b), x = (v = u.doc.nodeAt(g - 1)) == null ? void 0 : v.marks.some((M) => M.eq(p.mark)), S = (y = u.doc.nodeAt(b)) == null ? void 0 : y.marks.some((M) => M.eq(p.mark));
          this.editor.emit("delete", {
            type: "mark",
            mark: p.mark,
            from: p.from,
            to: p.to,
            deletedRange: {
              from: w,
              to: C
            },
            newRange: {
              from: g,
              to: b
            },
            partial: !!(S || x),
            editor: this.editor,
            transaction: n,
            combinedTransform: u
          });
        }
      });
    };
    (r = (i = (t = this.editor.options.coreExtensionOptions) == null ? void 0 : t.delete) == null ? void 0 : i.async) == null || r ? setTimeout(s, 0) : s();
  }
}), uf = oe.create({
  name: "drop",
  addProseMirrorPlugins() {
    return [
      new re({
        key: new be("tiptapDrop"),
        props: {
          handleDrop: (n, e, t, i) => {
            this.editor.emit("drop", {
              editor: this.editor,
              event: e,
              slice: t,
              moved: i
            });
          }
        }
      })
    ];
  }
}), df = oe.create({
  name: "editable",
  addProseMirrorPlugins() {
    return [
      new re({
        key: new be("editable"),
        props: {
          editable: () => this.editor.options.editable
        }
      })
    ];
  }
}), hf = new be("focusEvents"), ff = oe.create({
  name: "focusEvents",
  addProseMirrorPlugins() {
    const { editor: n } = this;
    return [
      new re({
        key: hf,
        props: {
          handleDOMEvents: {
            focus: (e, t) => {
              n.isFocused = !0;
              const i = n.state.tr.setMeta("focus", { event: t }).setMeta("addToHistory", !1);
              return e.dispatch(i), !1;
            },
            blur: (e, t) => {
              n.isFocused = !1;
              const i = n.state.tr.setMeta("blur", { event: t }).setMeta("addToHistory", !1);
              return e.dispatch(i), !1;
            }
          }
        }
      })
    ];
  }
}), pf = oe.create({
  name: "keymap",
  addKeyboardShortcuts() {
    const n = () => this.editor.commands.first(({ commands: o }) => [
      () => o.undoInputRule(),
      // maybe convert first text block node to default node
      () => o.command(({ tr: a }) => {
        const { selection: l, doc: c } = a, { empty: u, $anchor: d } = l, { pos: f, parent: p } = d, m = d.parent.isTextblock && f > 0 ? a.doc.resolve(f - 1) : d, v = m.parent.type.spec.isolating, y = d.pos - d.parentOffset, g = v && m.parent.childCount === 1 ? y === d.pos : B.atStart(c).from === f;
        return !u || !p.type.isTextblock || p.textContent.length || !g || g && d.parent.type.name === "paragraph" ? !1 : o.clearNodes();
      }),
      () => o.deleteSelection(),
      () => o.joinBackward(),
      () => o.selectNodeBackward()
    ]), e = () => this.editor.commands.first(({ commands: o }) => [
      () => o.deleteSelection(),
      () => o.deleteCurrentNode(),
      () => o.joinForward(),
      () => o.selectNodeForward()
    ]), i = {
      Enter: () => this.editor.commands.first(({ commands: o }) => [
        () => o.newlineInCode(),
        () => o.createParagraphNear(),
        () => o.liftEmptyBlock(),
        () => o.splitBlock()
      ]),
      "Mod-Enter": () => this.editor.commands.exitCode(),
      Backspace: n,
      "Mod-Backspace": n,
      "Shift-Backspace": n,
      Delete: e,
      "Mod-Delete": e,
      "Mod-a": () => this.editor.commands.selectAll()
    }, r = {
      ...i
    }, s = {
      ...i,
      "Ctrl-h": n,
      "Alt-Backspace": n,
      "Ctrl-d": e,
      "Ctrl-Alt-Backspace": e,
      "Alt-Delete": e,
      "Alt-d": e,
      "Ctrl-a": () => this.editor.commands.selectTextblockStart(),
      "Ctrl-e": () => this.editor.commands.selectTextblockEnd()
    };
    return Xo() || Jh() ? s : r;
  },
  addProseMirrorPlugins() {
    return [
      // With this plugin we check if the whole document was selected and deleted.
      // In this case we will additionally call `clearNodes()` to convert e.g. a heading
      // to a paragraph if necessary.
      // This is an alternative to ProseMirror's `AllSelection`, which doesn’t work well
      // with many other commands.
      new re({
        key: new be("clearDocument"),
        appendTransaction: (n, e, t) => {
          if (n.some((v) => v.getMeta("composition")))
            return;
          const i = n.some((v) => v.docChanged) && !e.doc.eq(t.doc), r = n.some((v) => v.getMeta("preventClearDocument"));
          if (!i || r)
            return;
          const { empty: s, from: o, to: a } = e.selection, l = B.atStart(e.doc).from, c = B.atEnd(e.doc).to;
          if (s || !(o === l && a === c) || !Tr(t.doc))
            return;
          const f = t.tr, p = Cr({
            state: t,
            transaction: f
          }), { commands: m } = new kr({
            editor: this.editor,
            state: p
          });
          if (m.clearNodes(), !!f.steps.length)
            return f;
        }
      })
    ];
  }
}), mf = oe.create({
  name: "paste",
  addProseMirrorPlugins() {
    return [
      new re({
        key: new be("tiptapPaste"),
        props: {
          handlePaste: (n, e, t) => {
            this.editor.emit("paste", {
              editor: this.editor,
              event: e,
              slice: t
            });
          }
        }
      })
    ];
  }
}), gf = oe.create({
  name: "tabindex",
  addProseMirrorPlugins() {
    return [
      new re({
        key: new be("tabindex"),
        props: {
          attributes: () => this.editor.isEditable ? { tabindex: "0" } : {}
        }
      })
    ];
  }
}), vf = oe.create({
  name: "textDirection",
  addOptions() {
    return {
      direction: void 0
    };
  },
  addGlobalAttributes() {
    if (!this.options.direction)
      return [];
    const { nodeExtensions: n } = Cn(this.extensions);
    return [
      {
        types: n.filter((e) => e.name !== "text").map((e) => e.name),
        attributes: {
          dir: {
            default: this.options.direction,
            parseHTML: (e) => {
              const t = e.getAttribute("dir");
              return t && (t === "ltr" || t === "rtl" || t === "auto") ? t : this.options.direction;
            },
            renderHTML: (e) => e.dir ? {
              dir: e.dir
            } : {}
          }
        }
      }
    ];
  },
  addProseMirrorPlugins() {
    return [
      new re({
        key: new be("textDirection"),
        props: {
          attributes: () => {
            const n = this.options.direction;
            return n ? {
              dir: n
            } : {};
          }
        }
      })
    ];
  }
}), M8 = class an {
  constructor(e, t, i = !1, r = null) {
    this.currentNode = null, this.actualDepth = null, this.isBlock = i, this.resolvedPos = e, this.editor = t, this.currentNode = r;
  }
  get name() {
    return this.node.type.name;
  }
  get node() {
    return this.currentNode || this.resolvedPos.node();
  }
  get element() {
    return this.editor.view.domAtPos(this.pos).node;
  }
  get depth() {
    var e;
    return (e = this.actualDepth) != null ? e : this.resolvedPos.depth;
  }
  get pos() {
    return this.resolvedPos.pos;
  }
  get content() {
    return this.node.content;
  }
  set content(e) {
    let t = this.from, i = this.to;
    if (this.isBlock) {
      if (this.content.size === 0) {
        console.error("You can’t set content on a block node. Tried to set content on ".concat(this.name, " at ").concat(this.pos));
        return;
      }
      t = this.from + 1, i = this.to - 1;
    }
    this.editor.commands.insertContentAt({ from: t, to: i }, e);
  }
  get attributes() {
    return this.node.attrs;
  }
  get textContent() {
    return this.node.textContent;
  }
  get size() {
    return this.node.nodeSize;
  }
  get from() {
    return this.isBlock ? this.pos : this.resolvedPos.start(this.resolvedPos.depth);
  }
  get range() {
    return {
      from: this.from,
      to: this.to
    };
  }
  get to() {
    return this.isBlock ? this.pos + this.size : this.resolvedPos.end(this.resolvedPos.depth) + (this.node.isText ? 0 : 1);
  }
  get parent() {
    if (this.depth === 0)
      return null;
    const e = this.resolvedPos.start(this.resolvedPos.depth - 1), t = this.resolvedPos.doc.resolve(e);
    return new an(t, this.editor);
  }
  get before() {
    let e = this.resolvedPos.doc.resolve(this.from - (this.isBlock ? 1 : 2));
    return e.depth !== this.depth && (e = this.resolvedPos.doc.resolve(this.from - 3)), new an(e, this.editor);
  }
  get after() {
    let e = this.resolvedPos.doc.resolve(this.to + (this.isBlock ? 2 : 1));
    return e.depth !== this.depth && (e = this.resolvedPos.doc.resolve(this.to + 3)), new an(e, this.editor);
  }
  get children() {
    const e = [];
    return this.node.content.forEach((t, i) => {
      const r = t.isBlock && !t.isTextblock, s = t.isAtom && !t.isText, o = this.pos + i + (s ? 0 : 1);
      if (o < 0 || o > this.resolvedPos.doc.nodeSize - 2)
        return;
      const a = this.resolvedPos.doc.resolve(o);
      if (!r && a.depth <= this.depth)
        return;
      const l = new an(a, this.editor, r, r ? t : null);
      r && (l.actualDepth = this.depth + 1), e.push(new an(a, this.editor, r, r ? t : null));
    }), e;
  }
  get firstChild() {
    return this.children[0] || null;
  }
  get lastChild() {
    const e = this.children;
    return e[e.length - 1] || null;
  }
  closest(e, t = {}) {
    let i = null, r = this.parent;
    for (; r && !i; ) {
      if (r.node.type.name === e)
        if (Object.keys(t).length > 0) {
          const s = r.node.attrs, o = Object.keys(t);
          for (let a = 0; a < o.length; a += 1) {
            const l = o[a];
            if (s[l] !== t[l])
              break;
          }
        } else
          i = r;
      r = r.parent;
    }
    return i;
  }
  querySelector(e, t = {}) {
    return this.querySelectorAll(e, t, !0)[0] || null;
  }
  querySelectorAll(e, t = {}, i = !1) {
    let r = [];
    if (!this.children || this.children.length === 0)
      return r;
    const s = Object.keys(t);
    return this.children.forEach((o) => {
      i && r.length > 0 || (o.node.type.name === e && s.every((l) => t[l] === o.node.attrs[l]) && r.push(o), !(i && r.length > 0) && (r = r.concat(o.querySelectorAll(e, t, i))));
    }), r;
  }
  setAttribute(e) {
    const { tr: t } = this.editor.state;
    t.setNodeMarkup(this.from, void 0, {
      ...this.node.attrs,
      ...e
    }), this.editor.view.dispatch(t);
  }
}, _8 = '.ProseMirror {\n  position: relative;\n}\n\n.ProseMirror {\n  word-wrap: break-word;\n  white-space: pre-wrap;\n  white-space: break-spaces;\n  -webkit-font-variant-ligatures: none;\n  font-variant-ligatures: none;\n  font-feature-settings: "liga" 0; /* the above doesn\'t seem to work in Edge */\n}\n\n.ProseMirror [contenteditable="false"] {\n  white-space: normal;\n}\n\n.ProseMirror [contenteditable="false"] [contenteditable="true"] {\n  white-space: pre-wrap;\n}\n\n.ProseMirror pre {\n  white-space: pre-wrap;\n}\n\nimg.ProseMirror-separator {\n  display: inline !important;\n  border: none !important;\n  margin: 0 !important;\n  width: 0 !important;\n  height: 0 !important;\n}\n\n.ProseMirror-gapcursor {\n  display: none;\n  pointer-events: none;\n  position: absolute;\n  margin: 0;\n}\n\n.ProseMirror-gapcursor:after {\n  content: "";\n  display: block;\n  position: absolute;\n  top: -2px;\n  width: 20px;\n  border-top: 1px solid black;\n  animation: ProseMirror-cursor-blink 1.1s steps(2, start) infinite;\n}\n\n@keyframes ProseMirror-cursor-blink {\n  to {\n    visibility: hidden;\n  }\n}\n\n.ProseMirror-hideselection *::selection {\n  background: transparent;\n}\n\n.ProseMirror-hideselection *::-moz-selection {\n  background: transparent;\n}\n\n.ProseMirror-hideselection * {\n  caret-color: transparent;\n}\n\n.ProseMirror-focused .ProseMirror-gapcursor {\n  display: block;\n}';
function N8(n, e, t) {
  const i = document.querySelector("style[data-tiptap-style".concat(t ? "-".concat(t) : "", "]"));
  if (i !== null)
    return i;
  const r = document.createElement("style");
  return e && r.setAttribute("nonce", e), r.setAttribute("data-tiptap-style".concat(t ? "-".concat(t) : ""), ""), r.innerHTML = n, document.getElementsByTagName("head")[0].appendChild(r), r;
}
var E8 = class extends p8 {
  constructor(n = {}) {
    super(), this.css = null, this.className = "tiptap", this.editorView = null, this.isFocused = !1, this.isInitialized = !1, this.extensionStorage = {}, this.instanceId = Math.random().toString(36).slice(2, 9), this.options = {
      element: typeof document < "u" ? document.createElement("div") : null,
      content: "",
      injectCSS: !0,
      injectNonce: void 0,
      extensions: [],
      autofocus: !1,
      editable: !0,
      textDirection: void 0,
      editorProps: {},
      parseOptions: {},
      coreExtensionOptions: {},
      enableInputRules: !0,
      enablePasteRules: !0,
      enableCoreExtensions: !0,
      enableContentCheck: !1,
      emitContentError: !1,
      onBeforeCreate: () => null,
      onCreate: () => null,
      onMount: () => null,
      onUnmount: () => null,
      onUpdate: () => null,
      onSelectionUpdate: () => null,
      onTransaction: () => null,
      onFocus: () => null,
      onBlur: () => null,
      onDestroy: () => null,
      onContentError: ({ error: i }) => {
        throw i;
      },
      onPaste: () => null,
      onDrop: () => null,
      onDelete: () => null
    }, this.isCapturingTransaction = !1, this.capturedTransaction = null, this.utils = {
      getUpdatedPosition: Uv,
      createMappablePosition: qv
    }, this.setOptions(n), this.createExtensionManager(), this.createCommandManager(), this.createSchema(), this.on("beforeCreate", this.options.onBeforeCreate), this.emit("beforeCreate", { editor: this }), this.on("mount", this.options.onMount), this.on("unmount", this.options.onUnmount), this.on("contentError", this.options.onContentError), this.on("create", this.options.onCreate), this.on("update", this.options.onUpdate), this.on("selectionUpdate", this.options.onSelectionUpdate), this.on("transaction", this.options.onTransaction), this.on("focus", this.options.onFocus), this.on("blur", this.options.onBlur), this.on("destroy", this.options.onDestroy), this.on("drop", ({ event: i, slice: r, moved: s }) => this.options.onDrop(i, r, s)), this.on("paste", ({ event: i, slice: r }) => this.options.onPaste(i, r)), this.on("delete", this.options.onDelete);
    const e = this.createDoc(), t = qh(e, this.options.autofocus);
    this.editorState = cn.create({
      doc: e,
      schema: this.schema,
      selection: t || void 0
    }), this.options.element && this.mount(this.options.element);
  }
  /**
   * Attach the editor to the DOM, creating a new editor view.
   */
  mount(n) {
    if (typeof document > "u")
      throw new Error(
        "[tiptap error]: The editor cannot be mounted because there is no 'document' defined in this environment."
      );
    this.createView(n), this.emit("mount", { editor: this }), this.css && !document.head.contains(this.css) && document.head.appendChild(this.css), window.setTimeout(() => {
      this.isDestroyed || (this.options.autofocus !== !1 && this.options.autofocus !== null && this.commands.focus(this.options.autofocus), this.emit("create", { editor: this }), this.isInitialized = !0);
    }, 0);
  }
  /**
   * Remove the editor from the DOM, but still allow remounting at a different point in time
   */
  unmount() {
    if (this.editorView) {
      const n = this.editorView.dom;
      n != null && n.editor && delete n.editor, this.editorView.destroy();
    }
    if (this.editorView = null, this.isInitialized = !1, this.css && !document.querySelectorAll(".".concat(this.className)).length)
      try {
        typeof this.css.remove == "function" ? this.css.remove() : this.css.parentNode && this.css.parentNode.removeChild(this.css);
      } catch (n) {
        console.warn("Failed to remove CSS element:", n);
      }
    this.css = null, this.emit("unmount", { editor: this });
  }
  /**
   * Returns the editor storage.
   */
  get storage() {
    return this.extensionStorage;
  }
  /**
   * An object of all registered commands.
   */
  get commands() {
    return this.commandManager.commands;
  }
  /**
   * Create a command chain to call multiple commands at once.
   */
  chain() {
    return this.commandManager.chain();
  }
  /**
   * Check if a command or a command chain can be executed. Without executing it.
   */
  can() {
    return this.commandManager.can();
  }
  /**
   * Inject CSS styles.
   */
  injectCSS() {
    this.options.injectCSS && typeof document < "u" && (this.css = N8(_8, this.options.injectNonce));
  }
  /**
   * Update editor options.
   *
   * @param options A list of options
   */
  setOptions(n = {}) {
    this.options = {
      ...this.options,
      ...n
    }, !(!this.editorView || !this.state || this.isDestroyed) && (this.options.editorProps && this.view.setProps(this.options.editorProps), this.view.updateState(this.state));
  }
  /**
   * Update editable state of the editor.
   */
  setEditable(n, e = !0) {
    this.setOptions({ editable: n }), e && this.emit("update", { editor: this, transaction: this.state.tr, appendedTransactions: [] });
  }
  /**
   * Returns whether the editor is editable.
   */
  get isEditable() {
    return this.options.editable && this.view && this.view.editable;
  }
  /**
   * Returns the editor state.
   */
  get view() {
    return this.editorView ? this.editorView : new Proxy(
      {
        state: this.editorState,
        updateState: (n) => {
          this.editorState = n;
        },
        dispatch: (n) => {
          this.dispatchTransaction(n);
        },
        // Stub some commonly accessed properties to prevent errors
        composing: !1,
        dragging: null,
        editable: !0,
        isDestroyed: !1
      },
      {
        get: (n, e) => {
          if (this.editorView)
            return this.editorView[e];
          if (e === "state")
            return this.editorState;
          if (e in n)
            return Reflect.get(n, e);
          throw new Error(
            "[tiptap error]: The editor view is not available. Cannot access view['".concat(e, "']. The editor may not be mounted yet.")
          );
        }
      }
    );
  }
  /**
   * Returns the editor state.
   */
  get state() {
    return this.editorView && (this.editorState = this.view.state), this.editorState;
  }
  /**
   * Register a ProseMirror plugin.
   *
   * @param plugin A ProseMirror plugin
   * @param handlePlugins Control how to merge the plugin into the existing plugins.
   * @returns The new editor state
   */
  registerPlugin(n, e) {
    const t = Xh(e) ? e(n, [...this.state.plugins]) : [...this.state.plugins, n], i = this.state.reconfigure({ plugins: t });
    return this.view.updateState(i), i;
  }
  /**
   * Unregister a ProseMirror plugin.
   *
   * @param nameOrPluginKeyToRemove The plugins name
   * @returns The new editor state or undefined if the editor is destroyed
   */
  unregisterPlugin(n) {
    if (this.isDestroyed)
      return;
    const e = this.state.plugins;
    let t = e;
    if ([].concat(n).forEach((r) => {
      const s = typeof r == "string" ? "".concat(r, "$") : r.key;
      t = t.filter((o) => !o.key.startsWith(s));
    }), e.length === t.length)
      return;
    const i = this.state.reconfigure({
      plugins: t
    });
    return this.view.updateState(i), i;
  }
  /**
   * Creates an extension manager.
   */
  createExtensionManager() {
    var n, e;
    const i = [...this.options.enableCoreExtensions ? [
      df,
      af.configure({
        blockSeparator: (e = (n = this.options.coreExtensionOptions) == null ? void 0 : n.clipboardTextSerializer) == null ? void 0 : e.blockSeparator
      }),
      lf,
      ff,
      pf,
      gf,
      uf,
      mf,
      cf,
      vf.configure({
        direction: this.options.textDirection
      })
    ].filter((r) => typeof this.options.enableCoreExtensions == "object" ? this.options.enableCoreExtensions[r.name] !== !1 : !0) : [], ...this.options.extensions].filter((r) => ["extension", "node", "mark"].includes(r == null ? void 0 : r.type));
    this.extensionManager = new Mr(i, this);
  }
  /**
   * Creates an command manager.
   */
  createCommandManager() {
    this.commandManager = new kr({
      editor: this
    });
  }
  /**
   * Creates a ProseMirror schema.
   */
  createSchema() {
    this.schema = this.extensionManager.schema;
  }
  /**
   * Creates the initial document.
   */
  createDoc() {
    let n;
    try {
      n = to(this.options.content, this.schema, this.options.parseOptions, {
        errorOnInvalidContent: this.options.enableContentCheck
      });
    } catch (e) {
      if (!(e instanceof Error) || !["[tiptap error]: Invalid JSON content", "[tiptap error]: Invalid HTML content"].includes(e.message))
        throw e;
      this.emit("contentError", {
        editor: this,
        error: e,
        disableCollaboration: () => {
          "collaboration" in this.storage && typeof this.storage.collaboration == "object" && this.storage.collaboration && (this.storage.collaboration.isDisabled = !0), this.options.extensions = this.options.extensions.filter((t) => t.name !== "collaboration"), this.createExtensionManager();
        }
      }), n = to(this.options.content, this.schema, this.options.parseOptions, {
        errorOnInvalidContent: !1
      });
    }
    return n;
  }
  /**
   * Creates a ProseMirror view.
   */
  createView(n) {
    var e;
    this.editorView = new Fh(n, {
      ...this.options.editorProps,
      attributes: {
        // add `role="textbox"` to the editor element
        role: "textbox",
        ...(e = this.options.editorProps) == null ? void 0 : e.attributes
      },
      dispatchTransaction: this.dispatchTransaction.bind(this),
      state: this.editorState,
      markViews: this.extensionManager.markViews,
      nodeViews: this.extensionManager.nodeViews
    });
    const t = this.state.reconfigure({
      plugins: this.extensionManager.plugins
    });
    this.view.updateState(t), this.prependClass(), this.injectCSS();
    const i = this.view.dom;
    i.editor = this;
  }
  /**
   * Creates all node and mark views.
   */
  createNodeViews() {
    this.view.isDestroyed || this.view.setProps({
      markViews: this.extensionManager.markViews,
      nodeViews: this.extensionManager.nodeViews
    });
  }
  /**
   * Prepend class name to element.
   */
  prependClass() {
    this.view.dom.className = "".concat(this.className, " ").concat(this.view.dom.className);
  }
  captureTransaction(n) {
    this.isCapturingTransaction = !0, n(), this.isCapturingTransaction = !1;
    const e = this.capturedTransaction;
    return this.capturedTransaction = null, e;
  }
  /**
   * The callback over which to send transactions (state updates) produced by the view.
   *
   * @param transaction An editor state transaction
   */
  dispatchTransaction(n) {
    if (this.view.isDestroyed)
      return;
    if (this.isCapturingTransaction) {
      if (!this.capturedTransaction) {
        this.capturedTransaction = n;
        return;
      }
      n.steps.forEach((c) => {
        var u;
        return (u = this.capturedTransaction) == null ? void 0 : u.step(c);
      });
      return;
    }
    const { state: e, transactions: t } = this.state.applyTransaction(n), i = !this.state.selection.eq(e.selection), r = t.includes(n), s = this.state;
    if (this.emit("beforeTransaction", {
      editor: this,
      transaction: n,
      nextState: e
    }), !r)
      return;
    this.view.updateState(e), this.emit("transaction", {
      editor: this,
      transaction: n,
      appendedTransactions: t.slice(1)
    }), i && this.emit("selectionUpdate", {
      editor: this,
      transaction: n
    });
    const o = t.findLast((c) => c.getMeta("focus") || c.getMeta("blur")), a = o == null ? void 0 : o.getMeta("focus"), l = o == null ? void 0 : o.getMeta("blur");
    a && this.emit("focus", {
      editor: this,
      event: a.event,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      transaction: o
    }), l && this.emit("blur", {
      editor: this,
      event: l.event,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      transaction: o
    }), !(n.getMeta("preventUpdate") || !t.some((c) => c.docChanged) || s.doc.eq(e.doc)) && this.emit("update", {
      editor: this,
      transaction: n,
      appendedTransactions: t.slice(1)
    });
  }
  /**
   * Get attributes of the currently selected node or mark.
   */
  getAttributes(n) {
    return zv(this.state, n);
  }
  isActive(n, e) {
    const t = typeof n == "string" ? n : null, i = typeof n == "string" ? e : n;
    return jv(this.state, t, i);
  }
  /**
   * Get the document as JSON.
   */
  getJSON() {
    return this.state.doc.toJSON();
  }
  /**
   * Get the document as HTML.
   */
  getHTML() {
    return Qo(this.state.doc.content, this.schema);
  }
  /**
   * Get the document as text.
   */
  getText(n) {
    const { blockSeparator: e = "\n\n", textSerializers: t = {} } = n || {};
    return Pv(this.state.doc, {
      blockSeparator: e,
      textSerializers: {
        ...ef(this.schema),
        ...t
      }
    });
  }
  /**
   * Check if there is no content.
   */
  get isEmpty() {
    return Tr(this.state.doc);
  }
  /**
   * Destroy the editor.
   */
  destroy() {
    this.emit("destroy"), this.unmount(), this.removeAllListeners();
  }
  /**
   * Check if the editor is already destroyed.
   */
  get isDestroyed() {
    var n, e;
    return (e = (n = this.editorView) == null ? void 0 : n.isDestroyed) != null ? e : !0;
  }
  $node(n, e) {
    var t;
    return ((t = this.$doc) == null ? void 0 : t.querySelector(n, e)) || null;
  }
  $nodes(n, e) {
    var t;
    return ((t = this.$doc) == null ? void 0 : t.querySelectorAll(n, e)) || null;
  }
  $pos(n) {
    const e = this.state.doc.resolve(n);
    return new M8(e, this);
  }
  get $doc() {
    return this.$pos(0);
  }
};
function A8(n) {
  return new m8({
    find: n.find,
    handler: ({ state: e, range: t, match: i }) => {
      const r = G(n.getAttributes, void 0, i) || {}, { tr: s } = e, o = t.from;
      let a = t.to;
      const l = n.type.create(r);
      if (i[1]) {
        const c = i[0].lastIndexOf(i[1]);
        let u = o + c;
        u > a ? u = a : a = u + i[1].length;
        const d = i[0][i[0].length - 1];
        s.insertText(d, o + i[0].length - 1), s.replaceWith(u, a, l);
      } else if (i[0]) {
        const c = n.type.isInline ? o : o - 1;
        s.insert(c, n.type.create(r)).delete(s.mapping.map(o), s.mapping.map(a));
      }
      s.scrollIntoView();
    },
    undoable: n.undoable
  });
}
var I8 = (n) => "touches" in n, O8 = class {
  /**
   * Creates a new ResizableNodeView instance.
   *
   * The constructor sets up the resize handles, applies initial sizing from
   * node attributes, and configures all resize behavior options.
   *
   * @param options - Configuration options for the resizable node view
   */
  constructor(n) {
    this.directions = ["bottom-left", "bottom-right", "top-left", "top-right"], this.minSize = {
      height: 8,
      width: 8
    }, this.preserveAspectRatio = !1, this.classNames = {
      container: "",
      wrapper: "",
      handle: "",
      resizing: ""
    }, this.initialWidth = 0, this.initialHeight = 0, this.aspectRatio = 1, this.isResizing = !1, this.activeHandle = null, this.startX = 0, this.startY = 0, this.startWidth = 0, this.startHeight = 0, this.isShiftKeyPressed = !1, this.handleMouseMove = (o) => {
      if (!this.isResizing || !this.activeHandle)
        return;
      const a = o.clientX - this.startX, l = o.clientY - this.startY;
      this.handleResize(a, l);
    }, this.handleTouchMove = (o) => {
      if (!this.isResizing || !this.activeHandle)
        return;
      const a = o.touches[0];
      if (!a)
        return;
      const l = a.clientX - this.startX, c = a.clientY - this.startY;
      this.handleResize(l, c);
    }, this.handleMouseUp = () => {
      if (!this.isResizing)
        return;
      const o = this.element.offsetWidth, a = this.element.offsetHeight;
      this.onCommit(o, a), this.isResizing = !1, this.activeHandle = null, this.container.dataset.resizeState = "false", this.classNames.resizing && this.container.classList.remove(this.classNames.resizing), document.removeEventListener("mousemove", this.handleMouseMove), document.removeEventListener("mouseup", this.handleMouseUp), document.removeEventListener("keydown", this.handleKeyDown), document.removeEventListener("keyup", this.handleKeyUp);
    }, this.handleKeyDown = (o) => {
      o.key === "Shift" && (this.isShiftKeyPressed = !0);
    }, this.handleKeyUp = (o) => {
      o.key === "Shift" && (this.isShiftKeyPressed = !1);
    };
    var e, t, i, r, s;
    this.node = n.node, this.element = n.element, this.contentElement = n.contentElement, this.getPos = n.getPos, this.onResize = n.onResize, this.onCommit = n.onCommit, this.onUpdate = n.onUpdate, (e = n.options) != null && e.min && (this.minSize = {
      ...this.minSize,
      ...n.options.min
    }), (t = n.options) != null && t.max && (this.maxSize = n.options.max), (i = n == null ? void 0 : n.options) != null && i.directions && (this.directions = n.options.directions), (r = n.options) != null && r.preserveAspectRatio && (this.preserveAspectRatio = n.options.preserveAspectRatio), (s = n.options) != null && s.className && (this.classNames = {
      container: n.options.className.container || "",
      wrapper: n.options.className.wrapper || "",
      handle: n.options.className.handle || "",
      resizing: n.options.className.resizing || ""
    }), this.wrapper = this.createWrapper(), this.container = this.createContainer(), this.applyInitialSize(), this.attachHandles();
  }
  /**
   * Returns the top-level DOM node that should be placed in the editor.
   *
   * This is required by the ProseMirror NodeView interface. The container
   * includes the wrapper, handles, and the actual content element.
   *
   * @returns The container element to be inserted into the editor
   */
  get dom() {
    return this.container;
  }
  get contentDOM() {
    return this.contentElement;
  }
  /**
   * Called when the node's content or attributes change.
   *
   * Updates the internal node reference. If a custom `onUpdate` callback
   * was provided, it will be called to handle additional update logic.
   *
   * @param node - The new/updated node
   * @param decorations - Node decorations
   * @param innerDecorations - Inner decorations
   * @returns `false` if the node type has changed (requires full rebuild), otherwise the result of `onUpdate` or `true`
   */
  update(n, e, t) {
    return n.type !== this.node.type ? !1 : (this.node = n, this.onUpdate ? this.onUpdate(n, e, t) : !0);
  }
  /**
   * Cleanup method called when the node view is being removed.
   *
   * Removes all event listeners to prevent memory leaks. This is required
   * by the ProseMirror NodeView interface. If a resize is active when
   * destroy is called, it will be properly cancelled.
   */
  destroy() {
    this.isResizing && (this.container.dataset.resizeState = "false", this.classNames.resizing && this.container.classList.remove(this.classNames.resizing), document.removeEventListener("mousemove", this.handleMouseMove), document.removeEventListener("mouseup", this.handleMouseUp), document.removeEventListener("keydown", this.handleKeyDown), document.removeEventListener("keyup", this.handleKeyUp), this.isResizing = !1, this.activeHandle = null), this.container.remove();
  }
  /**
   * Creates the outer container element.
   *
   * The container is the top-level element returned by the NodeView and
   * wraps the entire resizable node. It's set up with flexbox to handle
   * alignment and includes data attributes for styling and identification.
   *
   * @returns The container element
   */
  createContainer() {
    const n = document.createElement("div");
    return n.dataset.resizeContainer = "", n.dataset.node = this.node.type.name, n.style.display = "flex", n.style.justifyContent = "flex-start", n.style.alignItems = "flex-start", this.classNames.container && (n.className = this.classNames.container), n.appendChild(this.wrapper), n;
  }
  /**
   * Creates the wrapper element that contains the content and handles.
   *
   * The wrapper uses relative positioning so that resize handles can be
   * positioned absolutely within it. This is the direct parent of the
   * content element being made resizable.
   *
   * @returns The wrapper element
   */
  createWrapper() {
    const n = document.createElement("div");
    return n.style.position = "relative", n.style.display = "block", n.dataset.resizeWrapper = "", this.classNames.wrapper && (n.className = this.classNames.wrapper), n.appendChild(this.element), n;
  }
  /**
   * Creates a resize handle element for a specific direction.
   *
   * Each handle is absolutely positioned and includes a data attribute
   * identifying its direction for styling purposes.
   *
   * @param direction - The resize direction for this handle
   * @returns The handle element
   */
  createHandle(n) {
    const e = document.createElement("div");
    return e.dataset.resizeHandle = n, e.style.position = "absolute", this.classNames.handle && (e.className = this.classNames.handle), e;
  }
  /**
   * Positions a handle element according to its direction.
   *
   * Corner handles (e.g., 'top-left') are positioned at the intersection
   * of two edges. Edge handles (e.g., 'top') span the full width or height.
   *
   * @param handle - The handle element to position
   * @param direction - The direction determining the position
   */
  positionHandle(n, e) {
    const t = e.includes("top"), i = e.includes("bottom"), r = e.includes("left"), s = e.includes("right");
    t && (n.style.top = "0"), i && (n.style.bottom = "0"), r && (n.style.left = "0"), s && (n.style.right = "0"), (e === "top" || e === "bottom") && (n.style.left = "0", n.style.right = "0"), (e === "left" || e === "right") && (n.style.top = "0", n.style.bottom = "0");
  }
  /**
   * Creates and attaches all resize handles to the wrapper.
   *
   * Iterates through the configured directions, creates a handle for each,
   * positions it, attaches the mousedown listener, and appends it to the DOM.
   */
  attachHandles() {
    this.directions.forEach((n) => {
      const e = this.createHandle(n);
      this.positionHandle(e, n), e.addEventListener("mousedown", (t) => this.handleResizeStart(t, n)), e.addEventListener("touchstart", (t) => this.handleResizeStart(t, n)), this.wrapper.appendChild(e);
    });
  }
  /**
   * Applies initial sizing from node attributes to the element.
   *
   * If width/height attributes exist on the node, they're applied to the element.
   * Otherwise, the element's natural/current dimensions are measured. The aspect
   * ratio is calculated for later use in aspect-ratio-preserving resizes.
   */
  applyInitialSize() {
    const n = this.node.attrs.width, e = this.node.attrs.height;
    n ? (this.element.style.width = "".concat(n, "px"), this.initialWidth = n) : this.initialWidth = this.element.offsetWidth, e ? (this.element.style.height = "".concat(e, "px"), this.initialHeight = e) : this.initialHeight = this.element.offsetHeight, this.initialWidth > 0 && this.initialHeight > 0 && (this.aspectRatio = this.initialWidth / this.initialHeight);
  }
  /**
   * Initiates a resize operation when a handle is clicked.
   *
   * Captures the starting mouse position and element dimensions, sets up
   * the resize state, adds the resizing class and state attribute, and
   * attaches document-level listeners for mouse movement and keyboard input.
   *
   * @param event - The mouse down event
   * @param direction - The direction of the handle being dragged
   */
  handleResizeStart(n, e) {
    n.preventDefault(), n.stopPropagation(), this.isResizing = !0, this.activeHandle = e, I8(n) ? (this.startX = n.touches[0].clientX, this.startY = n.touches[0].clientY) : (this.startX = n.clientX, this.startY = n.clientY), this.startWidth = this.element.offsetWidth, this.startHeight = this.element.offsetHeight, this.startWidth > 0 && this.startHeight > 0 && (this.aspectRatio = this.startWidth / this.startHeight), this.getPos(), this.container.dataset.resizeState = "true", this.classNames.resizing && this.container.classList.add(this.classNames.resizing), document.addEventListener("mousemove", this.handleMouseMove), document.addEventListener("touchmove", this.handleTouchMove), document.addEventListener("mouseup", this.handleMouseUp), document.addEventListener("keydown", this.handleKeyDown), document.addEventListener("keyup", this.handleKeyUp);
  }
  handleResize(n, e) {
    if (!this.activeHandle)
      return;
    const t = this.preserveAspectRatio || this.isShiftKeyPressed, { width: i, height: r } = this.calculateNewDimensions(this.activeHandle, n, e), s = this.applyConstraints(i, r, t);
    this.element.style.width = "".concat(s.width, "px"), this.element.style.height = "".concat(s.height, "px"), this.onResize && this.onResize(s.width, s.height);
  }
  /**
   * Calculates new dimensions based on mouse delta and resize direction.
   *
   * Takes the starting dimensions and applies the mouse movement delta
   * according to the handle direction. For corner handles, both dimensions
   * are affected. For edge handles, only one dimension changes. If aspect
   * ratio should be preserved, delegates to applyAspectRatio.
   *
   * @param direction - The active resize handle direction
   * @param deltaX - Horizontal mouse movement since resize start
   * @param deltaY - Vertical mouse movement since resize start
   * @returns The calculated width and height
   */
  calculateNewDimensions(n, e, t) {
    let i = this.startWidth, r = this.startHeight;
    const s = n.includes("right"), o = n.includes("left"), a = n.includes("bottom"), l = n.includes("top");
    return s ? i = this.startWidth + e : o && (i = this.startWidth - e), a ? r = this.startHeight + t : l && (r = this.startHeight - t), (n === "right" || n === "left") && (i = this.startWidth + (s ? e : -e)), (n === "top" || n === "bottom") && (r = this.startHeight + (a ? t : -t)), this.preserveAspectRatio || this.isShiftKeyPressed ? this.applyAspectRatio(i, r, n) : { width: i, height: r };
  }
  /**
   * Applies min/max constraints to dimensions.
   *
   * When aspect ratio is NOT preserved, constraints are applied independently
   * to width and height. When aspect ratio IS preserved, constraints are
   * applied while maintaining the aspect ratio—if one dimension hits a limit,
   * the other is recalculated proportionally.
   *
   * This ensures that aspect ratio is never broken when constrained.
   *
   * @param width - The unconstrained width
   * @param height - The unconstrained height
   * @param preserveAspectRatio - Whether to maintain aspect ratio while constraining
   * @returns The constrained dimensions
   */
  applyConstraints(n, e, t) {
    var i, r, s, o;
    if (!t) {
      let c = Math.max(this.minSize.width, n), u = Math.max(this.minSize.height, e);
      return (i = this.maxSize) != null && i.width && (c = Math.min(this.maxSize.width, c)), (r = this.maxSize) != null && r.height && (u = Math.min(this.maxSize.height, u)), { width: c, height: u };
    }
    let a = n, l = e;
    return a < this.minSize.width && (a = this.minSize.width, l = a / this.aspectRatio), l < this.minSize.height && (l = this.minSize.height, a = l * this.aspectRatio), (s = this.maxSize) != null && s.width && a > this.maxSize.width && (a = this.maxSize.width, l = a / this.aspectRatio), (o = this.maxSize) != null && o.height && l > this.maxSize.height && (l = this.maxSize.height, a = l * this.aspectRatio), { width: a, height: l };
  }
  /**
   * Adjusts dimensions to maintain the original aspect ratio.
   *
   * For horizontal handles (left/right), uses width as the primary dimension
   * and calculates height from it. For vertical handles (top/bottom), uses
   * height as primary and calculates width. For corner handles, uses width
   * as the primary dimension.
   *
   * @param width - The new width
   * @param height - The new height
   * @param direction - The active resize direction
   * @returns Dimensions adjusted to preserve aspect ratio
   */
  applyAspectRatio(n, e, t) {
    const i = t === "left" || t === "right", r = t === "top" || t === "bottom";
    return i ? {
      width: n,
      height: n / this.aspectRatio
    } : r ? {
      width: e * this.aspectRatio,
      height: e
    } : {
      width: n,
      height: n / this.aspectRatio
    };
  }
}, D8 = {};
Jo(D8, {
  createAtomBlockMarkdownSpec: () => $8,
  createBlockMarkdownSpec: () => R8,
  createInlineMarkdownSpec: () => z8,
  parseAttributes: () => na,
  parseIndentedBlocks: () => B8,
  renderNestedMarkdownContent: () => F8,
  serializeAttributes: () => ia
});
function na(n) {
  if (!(n != null && n.trim()))
    return {};
  const e = {}, t = [], i = n.replace(/["']([^"']*)["']/g, (c) => (t.push(c), "__QUOTED_".concat(t.length - 1, "__"))), r = i.match(/(?:^|\s)\.([a-zA-Z][\w-]*)/g);
  if (r) {
    const c = r.map((u) => u.trim().slice(1));
    e.class = c.join(" ");
  }
  const s = i.match(/(?:^|\s)#([a-zA-Z][\w-]*)/);
  s && (e.id = s[1]);
  const o = /([a-zA-Z][\w-]*)\s*=\s*(__QUOTED_\d+__)/g;
  Array.from(i.matchAll(o)).forEach(([, c, u]) => {
    var d;
    const f = parseInt(((d = u.match(/__QUOTED_(\d+)__/)) == null ? void 0 : d[1]) || "0", 10), p = t[f];
    p && (e[c] = p.slice(1, -1));
  });
  const l = i.replace(/(?:^|\s)\.([a-zA-Z][\w-]*)/g, "").replace(/(?:^|\s)#([a-zA-Z][\w-]*)/g, "").replace(/([a-zA-Z][\w-]*)\s*=\s*__QUOTED_\d+__/g, "").trim();
  return l && l.split(/\s+/).filter(Boolean).forEach((u) => {
    u.match(/^[a-zA-Z][\w-]*$/) && (e[u] = !0);
  }), e;
}
function ia(n) {
  if (!n || Object.keys(n).length === 0)
    return "";
  const e = [];
  return n.class && String(n.class).split(/\s+/).filter(Boolean).forEach((i) => e.push(".".concat(i))), n.id && e.push("#".concat(n.id)), Object.entries(n).forEach(([t, i]) => {
    t === "class" || t === "id" || (i === !0 ? e.push(t) : i !== !1 && i != null && e.push("".concat(t, '="').concat(String(i), '"')));
  }), e.join(" ");
}
function $8(n) {
  const {
    nodeName: e,
    name: t,
    parseAttributes: i = na,
    serializeAttributes: r = ia,
    defaultAttributes: s = {},
    requiredAttributes: o = [],
    allowedAttributes: a
  } = n, l = t || e, c = (u) => {
    if (!a)
      return u;
    const d = {};
    return a.forEach((f) => {
      f in u && (d[f] = u[f]);
    }), d;
  };
  return {
    parseMarkdown: (u, d) => {
      const f = { ...s, ...u.attributes };
      return d.createNode(e, f, []);
    },
    markdownTokenizer: {
      name: e,
      level: "block",
      start(u) {
        var d;
        const f = new RegExp("^:::".concat(l, "(?:\\s|$)"), "m"), p = (d = u.match(f)) == null ? void 0 : d.index;
        return p !== void 0 ? p : -1;
      },
      tokenize(u, d, f) {
        const p = new RegExp("^:::".concat(l, "(?:\\s+\\{([^}]*)\\})?\\s*:::(?:\\n|$)")), m = u.match(p);
        if (!m)
          return;
        const v = m[1] || "", y = i(v);
        if (!o.find((b) => !(b in y)))
          return {
            type: e,
            raw: m[0],
            attributes: y
          };
      }
    },
    renderMarkdown: (u) => {
      const d = c(u.attrs || {}), f = r(d), p = f ? " {".concat(f, "}") : "";
      return ":::".concat(l).concat(p, " :::");
    }
  };
}
function R8(n) {
  const {
    nodeName: e,
    name: t,
    getContent: i,
    parseAttributes: r = na,
    serializeAttributes: s = ia,
    defaultAttributes: o = {},
    content: a = "block",
    allowedAttributes: l
  } = n, c = t || e, u = (d) => {
    if (!l)
      return d;
    const f = {};
    return l.forEach((p) => {
      p in d && (f[p] = d[p]);
    }), f;
  };
  return {
    parseMarkdown: (d, f) => {
      let p;
      if (i) {
        const v = i(d);
        p = typeof v == "string" ? [{ type: "text", text: v }] : v;
      } else
        a === "block" ? p = f.parseChildren(d.tokens || []) : p = f.parseInline(d.tokens || []);
      const m = { ...o, ...d.attributes };
      return f.createNode(e, m, p);
    },
    markdownTokenizer: {
      name: e,
      level: "block",
      start(d) {
        var f;
        const p = new RegExp("^:::".concat(c), "m"), m = (f = d.match(p)) == null ? void 0 : f.index;
        return m !== void 0 ? m : -1;
      },
      tokenize(d, f, p) {
        var m;
        const v = new RegExp("^:::".concat(c, "(?:\\s+\\{([^}]*)\\})?\\s*\\n")), y = d.match(v);
        if (!y)
          return;
        const [g, b = ""] = y, w = r(b);
        let C = 1;
        const x = g.length;
        let S = "";
        const M = /^:::([\w-]*)(\s.*)?/gm, A = d.slice(x);
        for (M.lastIndex = 0; ; ) {
          const E = M.exec(A);
          if (E === null)
            break;
          const H = E.index, U = E[1];
          if (!((m = E[2]) != null && m.endsWith(":::"))) {
            if (U)
              C += 1;
            else if (C -= 1, C === 0) {
              const ae = A.slice(0, H);
              S = ae.trim();
              const ut = d.slice(0, x + H + E[0].length);
              let q = [];
              if (S)
                if (a === "block")
                  for (q = p.blockTokens(ae), q.forEach((le) => {
                    le.text && (!le.tokens || le.tokens.length === 0) && (le.tokens = p.inlineTokens(le.text));
                  }); q.length > 0; ) {
                    const le = q[q.length - 1];
                    if (le.type === "paragraph" && (!le.text || le.text.trim() === ""))
                      q.pop();
                    else
                      break;
                  }
                else
                  q = p.inlineTokens(S);
              return {
                type: e,
                raw: ut,
                attributes: w,
                content: S,
                tokens: q
              };
            }
          }
        }
      }
    },
    renderMarkdown: (d, f) => {
      const p = u(d.attrs || {}), m = s(p), v = m ? " {".concat(m, "}") : "", y = f.renderChildren(d.content || [], "\n\n");
      return ":::".concat(c).concat(v, "\n\n").concat(y, "\n\n:::");
    }
  };
}
function P8(n) {
  if (!n.trim())
    return {};
  const e = {}, t = /(\w+)=(?:"([^"]*)"|'([^']*)')/g;
  let i = t.exec(n);
  for (; i !== null; ) {
    const [, r, s, o] = i;
    e[r] = s || o, i = t.exec(n);
  }
  return e;
}
function L8(n) {
  return Object.entries(n).filter(([, e]) => e != null).map(([e, t]) => "".concat(e, '="').concat(t, '"')).join(" ");
}
function z8(n) {
  const {
    nodeName: e,
    name: t,
    getContent: i,
    parseAttributes: r = P8,
    serializeAttributes: s = L8,
    defaultAttributes: o = {},
    selfClosing: a = !1,
    allowedAttributes: l
  } = n, c = t || e, u = (f) => {
    if (!l)
      return f;
    const p = {};
    return l.forEach((m) => {
      m in f && (p[m] = f[m]);
    }), p;
  }, d = c.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return {
    parseMarkdown: (f, p) => {
      const m = { ...o, ...f.attributes };
      if (a)
        return p.createNode(e, m);
      const v = i ? i(f) : f.content || "";
      return v ? p.createNode(e, m, [p.createTextNode(v)]) : p.createNode(e, m, []);
    },
    markdownTokenizer: {
      name: e,
      level: "inline",
      start(f) {
        const p = a ? new RegExp("\\[".concat(d, "\\s*[^\\]]*\\]")) : new RegExp("\\[".concat(d, "\\s*[^\\]]*\\][\\s\\S]*?\\[\\/").concat(d, "\\]")), m = f.match(p), v = m == null ? void 0 : m.index;
        return v !== void 0 ? v : -1;
      },
      tokenize(f, p, m) {
        const v = a ? new RegExp("^\\[".concat(d, "\\s*([^\\]]*)\\]")) : new RegExp("^\\[".concat(d, "\\s*([^\\]]*)\\]([\\s\\S]*?)\\[\\/").concat(d, "\\]")), y = f.match(v);
        if (!y)
          return;
        let g = "", b = "";
        if (a) {
          const [, C] = y;
          b = C;
        } else {
          const [, C, x] = y;
          b = C, g = x || "";
        }
        const w = r(b.trim());
        return {
          type: e,
          raw: y[0],
          content: g.trim(),
          attributes: w
        };
      }
    },
    renderMarkdown: (f) => {
      let p = "";
      i ? p = i(f) : f.content && f.content.length > 0 && (p = f.content.filter((g) => g.type === "text").map((g) => g.text).join(""));
      const m = u(f.attrs || {}), v = s(m), y = v ? " ".concat(v) : "";
      return a ? "[".concat(c).concat(y, "]") : "[".concat(c).concat(y, "]").concat(p, "[/").concat(c, "]");
    }
  };
}
function B8(n, e, t) {
  var i, r, s, o;
  const a = n.split("\n"), l = [];
  let c = "", u = 0;
  const d = e.baseIndentSize || 2;
  for (; u < a.length; ) {
    const f = a[u], p = f.match(e.itemPattern);
    if (!p) {
      if (l.length > 0)
        break;
      if (f.trim() === "") {
        u += 1, c = "".concat(c).concat(f, "\n");
        continue;
      } else
        return;
    }
    const m = e.extractItemData(p), { indentLevel: v, mainContent: y } = m;
    c = "".concat(c).concat(f, "\n");
    const g = [y];
    for (u += 1; u < a.length; ) {
      const x = a[u];
      if (x.trim() === "") {
        const M = a.slice(u + 1).findIndex((H) => H.trim() !== "");
        if (M === -1)
          break;
        if ((((r = (i = a[u + 1 + M].match(/^(\s*)/)) == null ? void 0 : i[1]) == null ? void 0 : r.length) || 0) > v) {
          g.push(x), c = "".concat(c).concat(x, "\n"), u += 1;
          continue;
        } else
          break;
      }
      if ((((o = (s = x.match(/^(\s*)/)) == null ? void 0 : s[1]) == null ? void 0 : o.length) || 0) > v)
        g.push(x), c = "".concat(c).concat(x, "\n"), u += 1;
      else
        break;
    }
    let b;
    const w = g.slice(1);
    if (w.length > 0) {
      const x = w.map((S) => S.slice(v + d)).join("\n");
      x.trim() && (e.customNestedParser ? b = e.customNestedParser(x) : b = t.blockTokens(x));
    }
    const C = e.createToken(m, b);
    l.push(C);
  }
  if (l.length !== 0)
    return {
      items: l,
      raw: c
    };
}
function F8(n, e, t, i) {
  if (!n || !Array.isArray(n.content))
    return "";
  const r = typeof t == "function" ? t(i) : t, [s, ...o] = n.content, a = e.renderChildren([s]), l = ["".concat(r).concat(a)];
  return o && o.length > 0 && o.forEach((c) => {
    const u = e.renderChildren([c]);
    if (u) {
      const d = u.split("\n").map((f) => f ? e.indent(f) : "").join("\n");
      l.push(d);
    }
  }), l.join("\n");
}
function V8(n, e, t = {}) {
  const { state: i } = e, { doc: r, tr: s } = i, o = n;
  r.descendants((a, l) => {
    const c = s.mapping.map(l), u = s.mapping.map(l) + a.nodeSize;
    let d = null;
    if (a.marks.forEach((p) => {
      if (p !== o)
        return !1;
      d = p;
    }), !d)
      return;
    let f = !1;
    if (Object.keys(t).forEach((p) => {
      t[p] !== d.attrs[p] && (f = !0);
    }), f) {
      const p = n.type.create({
        ...n.attrs,
        ...t
      });
      s.removeMark(c, u, n.type), s.addMark(c, u, p);
    }
  }), s.docChanged && e.view.dispatch(s);
}
var ai = class yf extends ta {
  constructor() {
    super(...arguments), this.type = "node";
  }
  /**
   * Create a new Node instance
   * @param config - Node configuration object or a function that returns a configuration object
   */
  static create(e = {}) {
    const t = typeof e == "function" ? e() : e;
    return new yf(t);
  }
  configure(e) {
    return super.configure(e);
  }
  extend(e) {
    const t = typeof e == "function" ? e() : e;
    return super.extend(t);
  }
}, H8 = ai.create({
  name: "doc",
  topNode: !0,
  content: "block+",
  renderMarkdown: (n, e) => n.content ? e.renderChildren(n.content, "\n\n") : ""
}), j8 = H8;
function W8(n = {}) {
  return new re({
    view(e) {
      return new U8(e, n);
    }
  });
}
class U8 {
  constructor(e, t) {
    var i;
    this.editorView = e, this.cursorPos = null, this.element = null, this.timeout = -1, this.width = (i = t.width) !== null && i !== void 0 ? i : 1, this.color = t.color === !1 ? void 0 : t.color || "black", this.class = t.class, this.handlers = ["dragover", "dragend", "drop", "dragleave"].map((r) => {
      let s = (o) => {
        this[r](o);
      };
      return e.dom.addEventListener(r, s), { name: r, handler: s };
    });
  }
  destroy() {
    this.handlers.forEach(({ name: e, handler: t }) => this.editorView.dom.removeEventListener(e, t));
  }
  update(e, t) {
    this.cursorPos != null && t.doc != e.state.doc && (this.cursorPos > e.state.doc.content.size ? this.setCursor(null) : this.updateOverlay());
  }
  setCursor(e) {
    e != this.cursorPos && (this.cursorPos = e, e == null ? (this.element.parentNode.removeChild(this.element), this.element = null) : this.updateOverlay());
  }
  updateOverlay() {
    let e = this.editorView.state.doc.resolve(this.cursorPos), t = !e.parent.inlineContent, i, r = this.editorView.dom, s = r.getBoundingClientRect(), o = s.width / r.offsetWidth, a = s.height / r.offsetHeight;
    if (t) {
      let d = e.nodeBefore, f = e.nodeAfter;
      if (d || f) {
        let p = this.editorView.nodeDOM(this.cursorPos - (d ? d.nodeSize : 0));
        if (p) {
          let m = p.getBoundingClientRect(), v = d ? m.bottom : m.top;
          d && f && (v = (v + this.editorView.nodeDOM(this.cursorPos).getBoundingClientRect().top) / 2);
          let y = this.width / 2 * a;
          i = { left: m.left, right: m.right, top: v - y, bottom: v + y };
        }
      }
    }
    if (!i) {
      let d = this.editorView.coordsAtPos(this.cursorPos), f = this.width / 2 * o;
      i = { left: d.left - f, right: d.left + f, top: d.top, bottom: d.bottom };
    }
    let l = this.editorView.dom.offsetParent;
    this.element || (this.element = l.appendChild(document.createElement("div")), this.class && (this.element.className = this.class), this.element.style.cssText = "position: absolute; z-index: 50; pointer-events: none;", this.color && (this.element.style.backgroundColor = this.color)), this.element.classList.toggle("prosemirror-dropcursor-block", t), this.element.classList.toggle("prosemirror-dropcursor-inline", !t);
    let c, u;
    if (!l || l == document.body && getComputedStyle(l).position == "static")
      c = -pageXOffset, u = -pageYOffset;
    else {
      let d = l.getBoundingClientRect(), f = d.width / l.offsetWidth, p = d.height / l.offsetHeight;
      c = d.left - l.scrollLeft * f, u = d.top - l.scrollTop * p;
    }
    this.element.style.left = (i.left - c) / o + "px", this.element.style.top = (i.top - u) / a + "px", this.element.style.width = (i.right - i.left) / o + "px", this.element.style.height = (i.bottom - i.top) / a + "px";
  }
  scheduleRemoval(e) {
    clearTimeout(this.timeout), this.timeout = setTimeout(() => this.setCursor(null), e);
  }
  dragover(e) {
    if (!this.editorView.editable)
      return;
    let t = this.editorView.posAtCoords({ left: e.clientX, top: e.clientY }), i = t && t.inside >= 0 && this.editorView.state.doc.nodeAt(t.inside), r = i && i.type.spec.disableDropCursor, s = typeof r == "function" ? r(this.editorView, t, e) : r;
    if (t && !s) {
      let o = t.pos;
      if (this.editorView.dragging && this.editorView.dragging.slice) {
        let a = qd(this.editorView.state.doc, o, this.editorView.dragging.slice);
        a != null && (o = a);
      }
      this.setCursor(o), this.scheduleRemoval(5e3);
    }
  }
  dragend() {
    this.scheduleRemoval(20);
  }
  drop() {
    this.scheduleRemoval(20);
  }
  dragleave(e) {
    this.editorView.dom.contains(e.relatedTarget) || this.setCursor(null);
  }
}
class ee extends B {
  /**
  Create a gap cursor.
  */
  constructor(e) {
    super(e, e);
  }
  map(e, t) {
    let i = e.resolve(t.map(this.head));
    return ee.valid(i) ? new ee(i) : B.near(i);
  }
  content() {
    return N.empty;
  }
  eq(e) {
    return e instanceof ee && e.head == this.head;
  }
  toJSON() {
    return { type: "gapcursor", pos: this.head };
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.pos != "number")
      throw new RangeError("Invalid input for GapCursor.fromJSON");
    return new ee(e.resolve(t.pos));
  }
  /**
  @internal
  */
  getBookmark() {
    return new ra(this.anchor);
  }
  /**
  @internal
  */
  static valid(e) {
    let t = e.parent;
    if (t.isTextblock || !q8(e) || !K8(e))
      return !1;
    let i = t.type.spec.allowGapCursor;
    if (i != null)
      return i;
    let r = t.contentMatchAt(e.index()).defaultType;
    return r && r.isTextblock;
  }
  /**
  @internal
  */
  static findGapCursorFrom(e, t, i = !1) {
    e:
      for (; ; ) {
        if (!i && ee.valid(e))
          return e;
        let r = e.pos, s = null;
        for (let o = e.depth; ; o--) {
          let a = e.node(o);
          if (t > 0 ? e.indexAfter(o) < a.childCount : e.index(o) > 0) {
            s = a.child(t > 0 ? e.indexAfter(o) : e.index(o) - 1);
            break;
          } else if (o == 0)
            return null;
          r += t;
          let l = e.doc.resolve(r);
          if (ee.valid(l))
            return l;
        }
        for (; ; ) {
          let o = t > 0 ? s.firstChild : s.lastChild;
          if (!o) {
            if (s.isAtom && !s.isText && !D.isSelectable(s)) {
              e = e.doc.resolve(r + s.nodeSize * t), i = !1;
              continue e;
            }
            break;
          }
          s = o, r += t;
          let a = e.doc.resolve(r);
          if (ee.valid(a))
            return a;
        }
        return null;
      }
  }
}
ee.prototype.visible = !1;
ee.findFrom = ee.findGapCursorFrom;
B.jsonID("gapcursor", ee);
class ra {
  constructor(e) {
    this.pos = e;
  }
  map(e) {
    return new ra(e.map(this.pos));
  }
  resolve(e) {
    let t = e.resolve(this.pos);
    return ee.valid(t) ? new ee(t) : B.near(t);
  }
}
function bf(n) {
  return n.isAtom || n.spec.isolating || n.spec.createGapCursor;
}
function q8(n) {
  for (let e = n.depth; e >= 0; e--) {
    let t = n.index(e), i = n.node(e);
    if (t == 0) {
      if (i.type.spec.isolating)
        return !0;
      continue;
    }
    for (let r = i.child(t - 1); ; r = r.lastChild) {
      if (r.childCount == 0 && !r.inlineContent || bf(r.type))
        return !0;
      if (r.inlineContent)
        return !1;
    }
  }
  return !0;
}
function K8(n) {
  for (let e = n.depth; e >= 0; e--) {
    let t = n.indexAfter(e), i = n.node(e);
    if (t == i.childCount) {
      if (i.type.spec.isolating)
        return !0;
      continue;
    }
    for (let r = i.child(t); ; r = r.firstChild) {
      if (r.childCount == 0 && !r.inlineContent || bf(r.type))
        return !0;
      if (r.inlineContent)
        return !1;
    }
  }
  return !0;
}
function J8() {
  return new re({
    props: {
      decorations: Z8,
      createSelectionBetween(n, e, t) {
        return e.pos == t.pos && ee.valid(t) ? new ee(t) : null;
      },
      handleClick: X8,
      handleKeyDown: G8,
      handleDOMEvents: { beforeinput: Y8 }
    }
  });
}
const G8 = Vh({
  ArrowLeft: Ei("horiz", -1),
  ArrowRight: Ei("horiz", 1),
  ArrowUp: Ei("vert", -1),
  ArrowDown: Ei("vert", 1)
});
function Ei(n, e) {
  const t = n == "vert" ? e > 0 ? "down" : "up" : e > 0 ? "right" : "left";
  return function(i, r, s) {
    let o = i.selection, a = e > 0 ? o.$to : o.$from, l = o.empty;
    if (o instanceof z) {
      if (!s.endOfTextblock(t) || a.depth == 0)
        return !1;
      l = !1, a = i.doc.resolve(e > 0 ? a.after() : a.before());
    }
    let c = ee.findGapCursorFrom(a, e, l);
    return c ? (r && r(i.tr.setSelection(new ee(c))), !0) : !1;
  };
}
function X8(n, e, t) {
  if (!n || !n.editable)
    return !1;
  let i = n.state.doc.resolve(e);
  if (!ee.valid(i))
    return !1;
  let r = n.posAtCoords({ left: t.clientX, top: t.clientY });
  return r && r.inside > -1 && D.isSelectable(n.state.doc.nodeAt(r.inside)) ? !1 : (n.dispatch(n.state.tr.setSelection(new ee(i))), !0);
}
function Y8(n, e) {
  if (e.inputType != "insertCompositionText" || !(n.state.selection instanceof ee))
    return !1;
  let { $from: t } = n.state.selection, i = t.parent.contentMatchAt(t.index()).findWrapping(n.state.schema.nodes.text);
  if (!i)
    return !1;
  let r = T.empty;
  for (let o = i.length - 1; o >= 0; o--)
    r = T.from(i[o].createAndFill(null, r));
  let s = n.state.tr.replace(t.pos, t.pos, new N(r, 0, 0));
  return s.setSelection(z.near(s.doc.resolve(t.pos + 1))), n.dispatch(s), !1;
}
function Z8(n) {
  if (!(n.selection instanceof ee))
    return null;
  let e = document.createElement("div");
  return e.className = "ProseMirror-gapcursor", Z.create(n.doc, [_e.widget(n.selection.head, e, { key: "gapcursor" })]);
}
var rr = 200, he = function() {
};
he.prototype.append = function(e) {
  return e.length ? (e = he.from(e), !this.length && e || e.length < rr && this.leafAppend(e) || this.length < rr && e.leafPrepend(this) || this.appendInner(e)) : this;
};
he.prototype.prepend = function(e) {
  return e.length ? he.from(e).append(this) : this;
};
he.prototype.appendInner = function(e) {
  return new Q8(this, e);
};
he.prototype.slice = function(e, t) {
  return e === void 0 && (e = 0), t === void 0 && (t = this.length), e >= t ? he.empty : this.sliceInner(Math.max(0, e), Math.min(this.length, t));
};
he.prototype.get = function(e) {
  if (!(e < 0 || e >= this.length))
    return this.getInner(e);
};
he.prototype.forEach = function(e, t, i) {
  t === void 0 && (t = 0), i === void 0 && (i = this.length), t <= i ? this.forEachInner(e, t, i, 0) : this.forEachInvertedInner(e, t, i, 0);
};
he.prototype.map = function(e, t, i) {
  t === void 0 && (t = 0), i === void 0 && (i = this.length);
  var r = [];
  return this.forEach(function(s, o) {
    return r.push(e(s, o));
  }, t, i), r;
};
he.from = function(e) {
  return e instanceof he ? e : e && e.length ? new wf(e) : he.empty;
};
var wf = /* @__PURE__ */ function(n) {
  function e(i) {
    n.call(this), this.values = i;
  }
  n && (e.__proto__ = n), e.prototype = Object.create(n && n.prototype), e.prototype.constructor = e;
  var t = { length: { configurable: !0 }, depth: { configurable: !0 } };
  return e.prototype.flatten = function() {
    return this.values;
  }, e.prototype.sliceInner = function(r, s) {
    return r == 0 && s == this.length ? this : new e(this.values.slice(r, s));
  }, e.prototype.getInner = function(r) {
    return this.values[r];
  }, e.prototype.forEachInner = function(r, s, o, a) {
    for (var l = s; l < o; l++)
      if (r(this.values[l], a + l) === !1)
        return !1;
  }, e.prototype.forEachInvertedInner = function(r, s, o, a) {
    for (var l = s - 1; l >= o; l--)
      if (r(this.values[l], a + l) === !1)
        return !1;
  }, e.prototype.leafAppend = function(r) {
    if (this.length + r.length <= rr)
      return new e(this.values.concat(r.flatten()));
  }, e.prototype.leafPrepend = function(r) {
    if (this.length + r.length <= rr)
      return new e(r.flatten().concat(this.values));
  }, t.length.get = function() {
    return this.values.length;
  }, t.depth.get = function() {
    return 0;
  }, Object.defineProperties(e.prototype, t), e;
}(he);
he.empty = new wf([]);
var Q8 = /* @__PURE__ */ function(n) {
  function e(t, i) {
    n.call(this), this.left = t, this.right = i, this.length = t.length + i.length, this.depth = Math.max(t.depth, i.depth) + 1;
  }
  return n && (e.__proto__ = n), e.prototype = Object.create(n && n.prototype), e.prototype.constructor = e, e.prototype.flatten = function() {
    return this.left.flatten().concat(this.right.flatten());
  }, e.prototype.getInner = function(i) {
    return i < this.left.length ? this.left.get(i) : this.right.get(i - this.left.length);
  }, e.prototype.forEachInner = function(i, r, s, o) {
    var a = this.left.length;
    if (r < a && this.left.forEachInner(i, r, Math.min(s, a), o) === !1 || s > a && this.right.forEachInner(i, Math.max(r - a, 0), Math.min(this.length, s) - a, o + a) === !1)
      return !1;
  }, e.prototype.forEachInvertedInner = function(i, r, s, o) {
    var a = this.left.length;
    if (r > a && this.right.forEachInvertedInner(i, r - a, Math.max(s, a) - a, o + a) === !1 || s < a && this.left.forEachInvertedInner(i, Math.min(r, a), s, o) === !1)
      return !1;
  }, e.prototype.sliceInner = function(i, r) {
    if (i == 0 && r == this.length)
      return this;
    var s = this.left.length;
    return r <= s ? this.left.slice(i, r) : i >= s ? this.right.slice(i - s, r - s) : this.left.slice(i, s).append(this.right.slice(0, r - s));
  }, e.prototype.leafAppend = function(i) {
    var r = this.right.leafAppend(i);
    if (r)
      return new e(this.left, r);
  }, e.prototype.leafPrepend = function(i) {
    var r = this.left.leafPrepend(i);
    if (r)
      return new e(r, this.right);
  }, e.prototype.appendInner = function(i) {
    return this.left.depth >= Math.max(this.right.depth, i.depth) + 1 ? new e(this.left, new e(this.right, i)) : new e(this, i);
  }, e;
}(he);
const ey = 500;
class Je {
  constructor(e, t) {
    this.items = e, this.eventCount = t;
  }
  // Pop the latest event off the branch's history and apply it
  // to a document transform.
  popEvent(e, t) {
    if (this.eventCount == 0)
      return null;
    let i = this.items.length;
    for (; ; i--)
      if (this.items.get(i - 1).selection) {
        --i;
        break;
      }
    let r, s;
    t && (r = this.remapping(i, this.items.length), s = r.maps.length);
    let o = e.tr, a, l, c = [], u = [];
    return this.items.forEach((d, f) => {
      if (!d.step) {
        r || (r = this.remapping(i, f + 1), s = r.maps.length), s--, u.push(d);
        return;
      }
      if (r) {
        u.push(new Qe(d.map));
        let p = d.step.map(r.slice(s)), m;
        p && o.maybeStep(p).doc && (m = o.mapping.maps[o.mapping.maps.length - 1], c.push(new Qe(m, void 0, void 0, c.length + u.length))), s--, m && r.appendMap(m, s);
      } else
        o.maybeStep(d.step);
      if (d.selection)
        return a = r ? d.selection.map(r.slice(s)) : d.selection, l = new Je(this.items.slice(0, i).append(u.reverse().concat(c)), this.eventCount - 1), !1;
    }, this.items.length, 0), { remaining: l, transform: o, selection: a };
  }
  // Create a new branch with the given transform added.
  addTransform(e, t, i, r) {
    let s = [], o = this.eventCount, a = this.items, l = !r && a.length ? a.get(a.length - 1) : null;
    for (let u = 0; u < e.steps.length; u++) {
      let d = e.steps[u].invert(e.docs[u]), f = new Qe(e.mapping.maps[u], d, t), p;
      (p = l && l.merge(f)) && (f = p, u ? s.pop() : a = a.slice(0, a.length - 1)), s.push(f), t && (o++, t = void 0), r || (l = f);
    }
    let c = o - i.depth;
    return c > ny && (a = ty(a, c), o -= c), new Je(a.append(s), o);
  }
  remapping(e, t) {
    let i = new qn();
    return this.items.forEach((r, s) => {
      let o = r.mirrorOffset != null && s - r.mirrorOffset >= e ? i.maps.length - r.mirrorOffset : void 0;
      i.appendMap(r.map, o);
    }, e, t), i;
  }
  addMaps(e) {
    return this.eventCount == 0 ? this : new Je(this.items.append(e.map((t) => new Qe(t))), this.eventCount);
  }
  // When the collab module receives remote changes, the history has
  // to know about those, so that it can adjust the steps that were
  // rebased on top of the remote changes, and include the position
  // maps for the remote changes in its array of items.
  rebased(e, t) {
    if (!this.eventCount)
      return this;
    let i = [], r = Math.max(0, this.items.length - t), s = e.mapping, o = e.steps.length, a = this.eventCount;
    this.items.forEach((f) => {
      f.selection && a--;
    }, r);
    let l = t;
    this.items.forEach((f) => {
      let p = s.getMirror(--l);
      if (p == null)
        return;
      o = Math.min(o, p);
      let m = s.maps[p];
      if (f.step) {
        let v = e.steps[p].invert(e.docs[p]), y = f.selection && f.selection.map(s.slice(l + 1, p));
        y && a++, i.push(new Qe(m, v, y));
      } else
        i.push(new Qe(m));
    }, r);
    let c = [];
    for (let f = t; f < o; f++)
      c.push(new Qe(s.maps[f]));
    let u = this.items.slice(0, r).append(c).append(i), d = new Je(u, a);
    return d.emptyItemCount() > ey && (d = d.compress(this.items.length - i.length)), d;
  }
  emptyItemCount() {
    let e = 0;
    return this.items.forEach((t) => {
      t.step || e++;
    }), e;
  }
  // Compressing a branch means rewriting it to push the air (map-only
  // items) out. During collaboration, these naturally accumulate
  // because each remote change adds one. The `upto` argument is used
  // to ensure that only the items below a given level are compressed,
  // because `rebased` relies on a clean, untouched set of items in
  // order to associate old items with rebased steps.
  compress(e = this.items.length) {
    let t = this.remapping(0, e), i = t.maps.length, r = [], s = 0;
    return this.items.forEach((o, a) => {
      if (a >= e)
        r.push(o), o.selection && s++;
      else if (o.step) {
        let l = o.step.map(t.slice(i)), c = l && l.getMap();
        if (i--, c && t.appendMap(c, i), l) {
          let u = o.selection && o.selection.map(t.slice(i));
          u && s++;
          let d = new Qe(c.invert(), l, u), f, p = r.length - 1;
          (f = r.length && r[p].merge(d)) ? r[p] = f : r.push(d);
        }
      } else
        o.map && i--;
    }, this.items.length, 0), new Je(he.from(r.reverse()), s);
  }
}
Je.empty = new Je(he.empty, 0);
function ty(n, e) {
  let t;
  return n.forEach((i, r) => {
    if (i.selection && e-- == 0)
      return t = r, !1;
  }), n.slice(t);
}
class Qe {
  constructor(e, t, i, r) {
    this.map = e, this.step = t, this.selection = i, this.mirrorOffset = r;
  }
  merge(e) {
    if (this.step && e.step && !e.selection) {
      let t = e.step.merge(this.step);
      if (t)
        return new Qe(t.getMap().invert(), t, this.selection);
    }
  }
}
class mt {
  constructor(e, t, i, r, s) {
    this.done = e, this.undone = t, this.prevRanges = i, this.prevTime = r, this.prevComposition = s;
  }
}
const ny = 20;
function iy(n, e, t, i) {
  let r = t.getMeta(Vt), s;
  if (r)
    return r.historyState;
  t.getMeta(oy) && (n = new mt(n.done, n.undone, null, 0, -1));
  let o = t.getMeta("appendedTransaction");
  if (t.steps.length == 0)
    return n;
  if (o && o.getMeta(Vt))
    return o.getMeta(Vt).redo ? new mt(n.done.addTransform(t, void 0, i, Li(e)), n.undone, kc(t.mapping.maps), n.prevTime, n.prevComposition) : new mt(n.done, n.undone.addTransform(t, void 0, i, Li(e)), null, n.prevTime, n.prevComposition);
  if (t.getMeta("addToHistory") !== !1 && !(o && o.getMeta("addToHistory") === !1)) {
    let a = t.getMeta("composition"), l = n.prevTime == 0 || !o && n.prevComposition != a && (n.prevTime < (t.time || 0) - i.newGroupDelay || !ry(t, n.prevRanges)), c = o ? ms(n.prevRanges, t.mapping) : kc(t.mapping.maps);
    return new mt(n.done.addTransform(t, l ? e.selection.getBookmark() : void 0, i, Li(e)), Je.empty, c, t.time, a == null ? n.prevComposition : a);
  } else
    return (s = t.getMeta("rebased")) ? new mt(n.done.rebased(t, s), n.undone.rebased(t, s), ms(n.prevRanges, t.mapping), n.prevTime, n.prevComposition) : new mt(n.done.addMaps(t.mapping.maps), n.undone.addMaps(t.mapping.maps), ms(n.prevRanges, t.mapping), n.prevTime, n.prevComposition);
}
function ry(n, e) {
  if (!e)
    return !1;
  if (!n.docChanged)
    return !0;
  let t = !1;
  return n.mapping.maps[0].forEach((i, r) => {
    for (let s = 0; s < e.length; s += 2)
      i <= e[s + 1] && r >= e[s] && (t = !0);
  }), t;
}
function kc(n) {
  let e = [];
  for (let t = n.length - 1; t >= 0 && e.length == 0; t--)
    n[t].forEach((i, r, s, o) => e.push(s, o));
  return e;
}
function ms(n, e) {
  if (!n)
    return null;
  let t = [];
  for (let i = 0; i < n.length; i += 2) {
    let r = e.map(n[i], 1), s = e.map(n[i + 1], -1);
    r <= s && t.push(r, s);
  }
  return t;
}
function sy(n, e, t) {
  let i = Li(e), r = Vt.get(e).spec.config, s = (t ? n.undone : n.done).popEvent(e, i);
  if (!s)
    return null;
  let o = s.selection.resolve(s.transform.doc), a = (t ? n.done : n.undone).addTransform(s.transform, e.selection.getBookmark(), r, i), l = new mt(t ? a : s.remaining, t ? s.remaining : a, null, 0, -1);
  return s.transform.setSelection(o).setMeta(Vt, { redo: t, historyState: l });
}
let gs = !1, xc = null;
function Li(n) {
  let e = n.plugins;
  if (xc != e) {
    gs = !1, xc = e;
    for (let t = 0; t < e.length; t++)
      if (e[t].spec.historyPreserveItems) {
        gs = !0;
        break;
      }
  }
  return gs;
}
const Vt = new be("history"), oy = new be("closeHistory");
function ay(n = {}) {
  return n = {
    depth: n.depth || 100,
    newGroupDelay: n.newGroupDelay || 500
  }, new re({
    key: Vt,
    state: {
      init() {
        return new mt(Je.empty, Je.empty, null, 0, -1);
      },
      apply(e, t, i) {
        return iy(t, i, e, n);
      }
    },
    config: n,
    props: {
      handleDOMEvents: {
        beforeinput(e, t) {
          let i = t.inputType, r = i == "historyUndo" ? kf : i == "historyRedo" ? xf : null;
          return !r || !e.editable ? !1 : (t.preventDefault(), r(e.state, e.dispatch));
        }
      }
    }
  });
}
function Cf(n, e) {
  return (t, i) => {
    let r = Vt.getState(t);
    if (!r || (n ? r.undone : r.done).eventCount == 0)
      return !1;
    if (i) {
      let s = sy(r, t, n);
      s && i(e ? s.scrollIntoView() : s);
    }
    return !0;
  };
}
const kf = Cf(!1, !0), xf = Cf(!0, !0);
oe.create({
  name: "characterCount",
  addOptions() {
    return {
      limit: null,
      mode: "textSize",
      textCounter: (n) => n.length,
      wordCounter: (n) => n.split(" ").filter((e) => e !== "").length
    };
  },
  addStorage() {
    return {
      characters: () => 0,
      words: () => 0
    };
  },
  onBeforeCreate() {
    this.storage.characters = (n) => {
      const e = (n == null ? void 0 : n.node) || this.editor.state.doc;
      if (((n == null ? void 0 : n.mode) || this.options.mode) === "textSize") {
        const i = e.textBetween(0, e.content.size, void 0, " ");
        return this.options.textCounter(i);
      }
      return e.nodeSize;
    }, this.storage.words = (n) => {
      const e = (n == null ? void 0 : n.node) || this.editor.state.doc, t = e.textBetween(0, e.content.size, " ", " ");
      return this.options.wordCounter(t);
    };
  },
  addProseMirrorPlugins() {
    let n = !1;
    return [
      new re({
        key: new be("characterCount"),
        appendTransaction: (e, t, i) => {
          if (n)
            return;
          const r = this.options.limit;
          if (r == null || r === 0) {
            n = !0;
            return;
          }
          const s = this.storage.characters({ node: i.doc });
          if (s > r) {
            const o = s - r, a = 0, l = o;
            console.warn(
              "[CharacterCount] Initial content exceeded limit of ".concat(r, " characters. Content was automatically trimmed.")
            );
            const c = i.tr.deleteRange(a, l);
            return n = !0, c;
          }
          n = !0;
        },
        filterTransaction: (e, t) => {
          const i = this.options.limit;
          if (!e.docChanged || i === 0 || i === null || i === void 0)
            return !0;
          const r = this.storage.characters({ node: t.doc }), s = this.storage.characters({ node: e.doc });
          if (s <= i || r > i && s > i && s <= r)
            return !0;
          if (r > i && s > i && s > r || !e.getMeta("paste"))
            return !1;
          const a = e.selection.$head.pos, l = s - i, c = a - l, u = a;
          return e.deleteRange(c, u), !(this.storage.characters({ node: e.doc }) > i);
        }
      })
    ];
  }
});
oe.create({
  name: "dropCursor",
  addOptions() {
    return {
      color: "currentColor",
      width: 1,
      class: void 0
    };
  },
  addProseMirrorPlugins() {
    return [W8(this.options)];
  }
});
oe.create({
  name: "focus",
  addOptions() {
    return {
      className: "has-focus",
      mode: "all"
    };
  },
  addProseMirrorPlugins() {
    return [
      new re({
        key: new be("focus"),
        props: {
          decorations: ({ doc: n, selection: e }) => {
            const { isEditable: t, isFocused: i } = this.editor, { anchor: r } = e, s = [];
            if (!t || !i)
              return Z.create(n, []);
            let o = 0;
            this.options.mode === "deepest" && n.descendants((l, c) => {
              if (l.isText)
                return;
              if (!(r >= c && r <= c + l.nodeSize - 1))
                return !1;
              o += 1;
            });
            let a = 0;
            return n.descendants((l, c) => {
              if (l.isText || !(r >= c && r <= c + l.nodeSize - 1))
                return !1;
              if (a += 1, this.options.mode === "deepest" && o - a > 0 || this.options.mode === "shallowest" && a > 1)
                return this.options.mode === "deepest";
              s.push(
                _e.node(c, c + l.nodeSize, {
                  class: this.options.className
                })
              );
            }), Z.create(n, s);
          }
        }
      })
    ];
  }
});
oe.create({
  name: "gapCursor",
  addProseMirrorPlugins() {
    return [J8()];
  },
  extendNodeSchema(n) {
    var e;
    const t = {
      name: n.name,
      options: n.options,
      storage: n.storage
    };
    return {
      allowGapCursor: (e = G(I(n, "allowGapCursor", t))) != null ? e : null
    };
  }
});
var ly = oe.create({
  name: "placeholder",
  addOptions() {
    return {
      emptyEditorClass: "is-editor-empty",
      emptyNodeClass: "is-empty",
      placeholder: "Write something …",
      showOnlyWhenEditable: !0,
      showOnlyCurrent: !0,
      includeChildren: !1
    };
  },
  addProseMirrorPlugins() {
    return [
      new re({
        key: new be("placeholder"),
        props: {
          decorations: ({ doc: n, selection: e }) => {
            const t = this.editor.isEditable || !this.options.showOnlyWhenEditable, { anchor: i } = e, r = [];
            if (!t)
              return null;
            const s = this.editor.isEmpty;
            return n.descendants((o, a) => {
              const l = i >= a && i <= a + o.nodeSize, c = !o.isLeaf && Tr(o);
              if ((l || !this.options.showOnlyCurrent) && c) {
                const u = [this.options.emptyNodeClass];
                s && u.push(this.options.emptyEditorClass);
                const d = _e.node(a, a + o.nodeSize, {
                  class: u.join(" "),
                  "data-placeholder": typeof this.options.placeholder == "function" ? this.options.placeholder({
                    editor: this.editor,
                    node: o,
                    pos: a,
                    hasAnchor: l
                  }) : this.options.placeholder
                });
                r.push(d);
              }
              return this.options.includeChildren;
            }), Z.create(n, r);
          }
        }
      })
    ];
  }
});
oe.create({
  name: "selection",
  addOptions() {
    return {
      className: "selection"
    };
  },
  addProseMirrorPlugins() {
    const { editor: n, options: e } = this;
    return [
      new re({
        key: new be("selection"),
        props: {
          decorations(t) {
            return t.selection.empty || n.isFocused || !n.isEditable || Wv(t.selection) || n.view.dragging ? null : Z.create(t.doc, [
              _e.inline(t.selection.from, t.selection.to, {
                class: e.className
              })
            ]);
          }
        }
      })
    ];
  }
});
function Sc({ types: n, node: e }) {
  return e && Array.isArray(n) && n.includes(e.type) || (e == null ? void 0 : e.type) === n;
}
oe.create({
  name: "trailingNode",
  addOptions() {
    return {
      node: void 0,
      notAfter: []
    };
  },
  addProseMirrorPlugins() {
    var n;
    const e = new be(this.name), t = this.options.node || ((n = this.editor.schema.topNodeType.contentMatch.defaultType) == null ? void 0 : n.name) || "paragraph", i = Object.entries(this.editor.schema.nodes).map(([, r]) => r).filter((r) => (this.options.notAfter || []).concat(t).includes(r.name));
    return [
      new re({
        key: e,
        appendTransaction: (r, s, o) => {
          const { doc: a, tr: l, schema: c } = o, u = e.getState(o), d = a.content.size, f = c.nodes[t];
          if (u)
            return l.insert(d, f.create());
        },
        state: {
          init: (r, s) => {
            const o = s.tr.doc.lastChild;
            return !Sc({ node: o, types: i });
          },
          apply: (r, s) => {
            if (!r.docChanged || r.getMeta("__uniqueIDTransaction"))
              return s;
            const o = r.doc.lastChild;
            return !Sc({ node: o, types: i });
          }
        }
      })
    ];
  }
});
var cy = oe.create({
  name: "undoRedo",
  addOptions() {
    return {
      depth: 100,
      newGroupDelay: 500
    };
  },
  addCommands() {
    return {
      undo: () => ({ state: n, dispatch: e }) => kf(n, e),
      redo: () => ({ state: n, dispatch: e }) => xf(n, e)
    };
  },
  addProseMirrorPlugins() {
    return [ay(this.options)];
  },
  addKeyboardShortcuts() {
    return {
      "Mod-z": () => this.editor.commands.undo(),
      "Shift-Mod-z": () => this.editor.commands.redo(),
      "Mod-y": () => this.editor.commands.redo(),
      // Russian keyboard layouts
      "Mod-я": () => this.editor.commands.undo(),
      "Shift-Mod-я": () => this.editor.commands.redo()
    };
  }
}), uy = ly, dy = ai.create({
  name: "text",
  group: "inline",
  parseMarkdown: (n) => ({
    type: "text",
    text: n.text || ""
  }),
  renderMarkdown: (n) => n.text || ""
}), hy = dy, fy = ai.create({
  name: "paragraph",
  priority: 1e3,
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  group: "block",
  content: "inline*",
  parseHTML() {
    return [{ tag: "p" }];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["p", Sr(this.options.HTMLAttributes, n), 0];
  },
  parseMarkdown: (n, e) => {
    const t = n.tokens || [];
    return t.length === 1 && t[0].type === "image" ? e.parseChildren([t[0]]) : e.createNode(
      "paragraph",
      void 0,
      // no attributes for paragraph
      e.parseInline(t)
    );
  },
  renderMarkdown: (n, e) => !n || !Array.isArray(n.content) ? "" : e.renderChildren(n.content),
  addCommands() {
    return {
      setParagraph: () => ({ commands: n }) => n.setNode(this.name)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Alt-0": () => this.editor.commands.setParagraph()
    };
  }
}), py = fy, my = ai.create({
  name: "hardBreak",
  markdownTokenName: "br",
  addOptions() {
    return {
      keepMarks: !0,
      HTMLAttributes: {}
    };
  },
  inline: !0,
  group: "inline",
  selectable: !1,
  linebreakReplacement: !0,
  parseHTML() {
    return [{ tag: "br" }];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["br", Sr(this.options.HTMLAttributes, n)];
  },
  renderText() {
    return "\n";
  },
  renderMarkdown: () => "  \n",
  parseMarkdown: () => ({
    type: "hardBreak"
  }),
  addCommands() {
    return {
      setHardBreak: () => ({ commands: n, chain: e, state: t, editor: i }) => n.first([
        () => n.exitCode(),
        () => n.command(() => {
          const { selection: r, storedMarks: s } = t;
          if (r.$from.parent.type.spec.isolating)
            return !1;
          const { keepMarks: o } = this.options, { splittableMarks: a } = i.extensionManager, l = s || r.$to.parentOffset && r.$from.marks();
          return e().insertContent({ type: this.name }).command(({ tr: c, dispatch: u }) => {
            if (u && l && o) {
              const d = l.filter((f) => a.includes(f.type.name));
              c.ensureMarks(d);
            }
            return !0;
          }).run();
        })
      ])
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Enter": () => this.editor.commands.setHardBreak(),
      "Shift-Enter": () => this.editor.commands.setHardBreak()
    };
  }
}), gy = my, vy = /(?:^|\s)(!\[(.+|:?)]\((\S+)(?:(?:\s+)["'](\S+)["'])?\))$/, yy = ai.create({
  name: "image",
  addOptions() {
    return {
      inline: !1,
      allowBase64: !1,
      HTMLAttributes: {},
      resize: !1
    };
  },
  inline() {
    return this.options.inline;
  },
  group() {
    return this.options.inline ? "inline" : "block";
  },
  draggable: !0,
  addAttributes() {
    return {
      src: {
        default: null
      },
      alt: {
        default: null
      },
      title: {
        default: null
      },
      width: {
        default: null
      },
      height: {
        default: null
      }
    };
  },
  parseHTML() {
    return [
      {
        tag: this.options.allowBase64 ? "img[src]" : 'img[src]:not([src^="data:"])'
      }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["img", Sr(this.options.HTMLAttributes, n)];
  },
  parseMarkdown: (n, e) => e.createNode("image", {
    src: n.href,
    title: n.title,
    alt: n.text
  }),
  renderMarkdown: (n) => {
    var e, t, i, r, s, o;
    const a = (t = (e = n.attrs) == null ? void 0 : e.src) != null ? t : "", l = (r = (i = n.attrs) == null ? void 0 : i.alt) != null ? r : "", c = (o = (s = n.attrs) == null ? void 0 : s.title) != null ? o : "";
    return c ? "![".concat(l, "](").concat(a, ' "').concat(c, '")') : "![".concat(l, "](").concat(a, ")");
  },
  addNodeView() {
    if (!this.options.resize || !this.options.resize.enabled || typeof document > "u" || !this.editor.isEditable)
      return null;
    const { directions: n, minWidth: e, minHeight: t, alwaysPreserveAspectRatio: i } = this.options.resize;
    return ({ node: r, getPos: s, HTMLAttributes: o }) => {
      const a = document.createElement("img");
      Object.entries(o).forEach(([u, d]) => {
        if (d != null)
          switch (u) {
            case "width":
            case "height":
              break;
            default:
              a.setAttribute(u, d);
              break;
          }
      }), a.src = o.src;
      const l = new O8({
        element: a,
        node: r,
        getPos: s,
        onResize: (u, d) => {
          a.style.width = "".concat(u, "px"), a.style.height = "".concat(d, "px");
        },
        onCommit: (u, d) => {
          const f = s();
          f !== void 0 && this.editor.chain().setNodeSelection(f).updateAttributes(this.name, {
            width: u,
            height: d
          }).run();
        },
        onUpdate: (u, d, f) => u.type === r.type,
        options: {
          directions: n,
          min: {
            width: e,
            height: t
          },
          preserveAspectRatio: i === !0
        }
      }), c = l.dom;
      return c.style.visibility = "hidden", c.style.pointerEvents = "none", a.onload = () => {
        c.style.visibility = "", c.style.pointerEvents = "";
      }, l;
    };
  },
  addCommands() {
    return {
      setImage: (n) => ({ commands: e }) => e.insertContent({
        type: this.name,
        attrs: n
      })
    };
  },
  addInputRules() {
    return [
      A8({
        find: vy,
        type: this.type,
        getAttributes: (n) => {
          const [, , e, t, i] = n;
          return { src: t, alt: e, title: i };
        }
      })
    ];
  }
}), by = yy, wy = ({ key: n, editor: e, onPaste: t, onDrop: i, allowedMimeTypes: r }) => new re({
  key: n || new be("fileHandler"),
  props: {
    handleDrop(s, o) {
      var a;
      if (!i || !((a = o.dataTransfer) != null && a.files.length))
        return !1;
      const l = s.posAtCoords({
        left: o.clientX,
        top: o.clientY
      });
      let c = Array.from(o.dataTransfer.files);
      return r && (c = c.filter((u) => r.includes(u.type))), c.length === 0 ? !1 : (o.preventDefault(), o.stopPropagation(), i(e, c, (l == null ? void 0 : l.pos) || 0), !0);
    },
    handlePaste(s, o) {
      var a;
      if (!t || !((a = o.clipboardData) != null && a.files.length))
        return !1;
      let l = Array.from(o.clipboardData.files);
      const c = o.clipboardData.getData("text/html");
      return r && (l = l.filter((u) => r.includes(u.type))), !(l.length === 0 || (o.preventDefault(), o.stopPropagation(), t(e, l, c), c.length > 0));
    }
  }
}), Cy = oe.create({
  name: "fileHandler",
  addOptions() {
    return {
      onPaste: void 0,
      onDrop: void 0,
      allowedMimeTypes: void 0
    };
  },
  addProseMirrorPlugins() {
    return [
      wy({
        key: new be(this.name),
        editor: this.editor,
        allowedMimeTypes: this.options.allowedMimeTypes,
        onDrop: this.options.onDrop,
        onPaste: this.options.onPaste
      })
    ];
  }
}), ky = Cy;
const nn = new P("chat-editor"), sa = ({
  c: n,
  value: e,
  disabled: t,
  placeholder: i,
  onCreate: r,
  onChange: s,
  onKeyDown: o
}) => {
  const a = F(null), l = F(null), c = $(!1), u = $(!1), d = () => {
    u.value || requestAnimationFrame(() => {
      if (!a.current)
        return;
      const p = a.current.view.dom;
      c.value = p.scrollHeight > p.clientHeight;
    });
  }, f = (p) => {
    n.inputExpand.value = p, u.value = p, p || d();
  };
  return L(() => {
    if (!l.current)
      return;
    const p = async (y) => {
      const g = await n.opts.uploader.onUpload(y, () => {
      }, {
        context: n.context,
        params: n.params
      });
      if (!g)
        return { name: "", url: "" };
      const b = n.opts.uploader.getDownLoadUrl(g, {
        context: n.context,
        params: n.params
      });
      return { name: g.name, url: b };
    }, m = (y) => {
      s(y), d();
    }, v = new E8({
      element: l.current,
      extensions: [
        j8,
        hy.extend({
          addKeyboardShortcuts() {
            return {
              "Mod-Enter": () => {
                var y, g;
                return (y = a.current) == null || y.commands.enter(), (g = a.current) == null || g.commands.scrollIntoView(), !0;
              },
              "Shift-Enter": () => {
                var y, g;
                return (y = a.current) == null || y.commands.setHardBreak(), (g = a.current) == null || g.commands.scrollIntoView(), !0;
              }
            };
          }
        }),
        py,
        gy,
        cy,
        uy.configure({
          placeholder: i,
          showOnlyWhenEditable: !0,
          showOnlyCurrent: !1
        }),
        by.configure({
          inline: !0,
          allowBase64: !0,
          HTMLAttributes: {
            draggable: "false"
          }
        }).extend({
          draggable: !1
        }),
        ky.configure({
          onDrop: async (y, g) => {
            if (g = g.filter((w) => w.type.startsWith("image/")), !g.length)
              return;
            const b = await Promise.all(
              g.map((w) => p(w))
            );
            y.isDestroyed || y.chain().deleteSelection().insertContentAt(
              y.state.selection.from,
              b.map((w) => ({
                type: "image",
                attrs: {
                  src: w.url,
                  alt: w.name
                }
              }))
            ).focus().scrollIntoView().run();
          },
          onPaste: async (y, g) => {
            if (g = g.filter((w) => w.type.startsWith("image/")), !g.length)
              return;
            const b = await Promise.all(
              g.map((w) => p(w))
            );
            y.isDestroyed || y.chain().deleteSelection().insertContentAt(
              y.state.selection.from,
              b.map((w) => ({
                type: "image",
                attrs: {
                  src: w.url,
                  alt: w.name
                }
              }))
            ).focus().scrollIntoView().run();
          }
        })
      ],
      content: e || "",
      editorProps: {
        handleKeyDown: (y, g) => o(g)
      },
      onUpdate: () => {
        m(v.getHTML());
      },
      onCreate: () => {
        r(v);
      }
    });
    return a.current = v, () => {
      a.current && (a.current.destroy(), a.current = null);
    };
  }, []), /* @__PURE__ */ h(
    "div",
    {
      className: "".concat(nn.b(), " ").concat(t ? nn.m("disabled") : "", " ").concat(nn.is("has-scrollbar", c.value)),
      children: [
        /* @__PURE__ */ h("div", { ref: l, className: nn.e("content") }),
        u.value ? /* @__PURE__ */ h(
          "div",
          {
            title: k.t.value("exitFullscreen"),
            className: nn.e("collapse"),
            onClick: () => f(!1),
            children: /* @__PURE__ */ h(nd, {})
          }
        ) : /* @__PURE__ */ h(
          "div",
          {
            title: k.t.value("fullscreen"),
            className: nn.e("collapse"),
            onClick: () => f(!0),
            children: /* @__PURE__ */ h(td, {})
          }
        )
      ]
    }
  );
}, se = new P("user-message-question"), xy = (n) => {
  const e = Pe(), t = $(null), i = $(135), r = $(!0), s = $(!1), o = F(null), a = De(() => un.parseMixedContent(n.message.content), [n.message.content]), l = $({
    resources: [],
    remainingText: "",
    hasResources: !1
  });
  l.value = a;
  const [c, u] = V(!1);
  u(n.message.reeditstate === !0), c && t.value && (t.value.destroy(), t.value = null);
  const d = F(null), f = () => {
    t.value || c || (t.value = new so({
      id: e,
      value: l.value.remainingText || "",
      editor: {
        defaultModel: "previewOnly"
      },
      previewer: {
        // 默认禁用
        enablePreviewerBubble: !1
      },
      engine: {
        syntax: {
          table: {
            enableChart: !1,
            // @ts-ignore
            externals: ["echarts"]
          }
        }
      }
    }));
  };
  L(() => {
    f();
  }, [l.value.remainingText, c]), L(() => {
    if (!o.current || !window.ResizeObserver)
      return;
    const b = new ResizeObserver(() => {
      var C;
      const w = (C = t.value) == null ? void 0 : C.previewer.options.previewerDom;
      w && (s.value = w.scrollHeight > i.value);
    });
    return b.observe(o.current), () => {
      b.disconnect();
    };
  }, [o.current]);
  const p = (b) => {
    !n.message || !n.controller || n.controller.refreshMessage(n.message, !0);
  }, m = (b) => {
    n.controller.reEditContent.value = b, n.controller.reEditContentChanged.value = !0;
  }, v = (b) => {
    b.stopPropagation(), n.controller.reEditCancel(n.message);
  }, y = (b) => {
    n.controller.reEditContentChanged.value && (b.stopPropagation(), n.controller.reEditSubmit(n.message));
  }, g = (b) => {
    b.code === "Enter" && b.key === "Enter" && n.controller.reEditContentChanged.value && b.shiftKey === !1 && setTimeout(() => {
      n.controller.reEditSubmit(n.message);
    }, 0);
  };
  return /* @__PURE__ */ h("div", { className: se.b(), children: [
    /* @__PURE__ */ h("div", { className: se.e("user-header"), children: [
      n.children,
      /* @__PURE__ */ h("div", { className: se.e("user"), children: k.t.value("me") })
    ] }),
    /* @__PURE__ */ h("div", { className: se.e("content"), children: [
      n.message.state === 40 && /* @__PURE__ */ h(
        "div",
        {
          className: se.em("content", "warning-container"),
          onClick: p,
          children: /* @__PURE__ */ h("div", { className: se.em("content", "warning"), children: [
            /* @__PURE__ */ h("div", { className: "warning-icon", title: k.t.value("retry"), children: /* @__PURE__ */ h(zg, {}) }),
            /* @__PURE__ */ h("div", { className: "refresh-icon", title: k.t.value("retry"), children: /* @__PURE__ */ h(Ls, {}) })
          ] })
        }
      ),
      c === !0 ? /* @__PURE__ */ h("div", { className: se.em("content", "re-edit-body"), children: [
        /* @__PURE__ */ h(
          sa,
          {
            c: n.controller,
            value: n.controller.reEditContent.value,
            disabled: n.controller.isLoading.value,
            onCreate: (b) => {
              d.current = b;
            },
            onChange: (b) => {
              m(b);
            },
            onKeyDown: (b) => {
              g(b);
            }
          }
        ),
        /* @__PURE__ */ h("div", { className: se.em("content", "re-edit-btns"), children: [
          /* @__PURE__ */ h(
            "div",
            {
              className: "".concat(se.em("content", "re-edit-btn"), " ").concat(se.em("content", "cancel-btn")),
              onClick: (b) => {
                v(b);
              },
              children: k.t.value("cancel")
            }
          ),
          /* @__PURE__ */ h(
            "div",
            {
              className: "".concat(se.em("content", "re-edit-btn"), " ").concat(se.em("content", "send-btn"), " ").concat(se.is("disabled ", !n.controller.reEditContentChanged.value)),
              onClick: (b) => {
                y(b);
              },
              children: k.t.value("send")
            }
          )
        ] })
      ] }) : /* @__PURE__ */ h("div", { className: se.em("content", "body"), children: [
        l.value.hasResources && /* @__PURE__ */ h("div", { className: se.em("content", "material"), children: l.value.resources.map((b) => /* @__PURE__ */ h(
          fr,
          {
            material: b,
            disabled: !0,
            controller: n.controller
          },
          b.id
        )) }),
        /* @__PURE__ */ h("div", { className: "pre-wrap-container", children: [
          /* @__PURE__ */ h(
            "div",
            {
              className: "".concat(se.e("text-content"), " ").concat(se.is("collapse", r.value)),
              id: e,
              ref: o,
              style: {
                maxHeight: r.value ? "".concat(i.value, "px") : ""
              }
            }
          ),
          /* @__PURE__ */ h(
            "div",
            {
              className: "".concat(se.e("collapse-btn"), " ").concat(se.is("visible", s.value)),
              title: r.value ? k.t.value("expand") : k.t.value("foldUp"),
              onClick: () => {
                r.value = !r.value;
              },
              children: r.value ? /* @__PURE__ */ h(
                "svg",
                {
                  xmlns: "http://www.w3.org/2000/svg",
                  viewBox: "0 0 1024 1024",
                  children: /* @__PURE__ */ h(
                    "path",
                    {
                      fill: "currentColor",
                      d: "M104.704 338.752a64 64 0 0 1 90.496 0l316.8 316.8 316.8-316.8a64 64 0 0 1 90.496 90.496L557.248 791.296a64 64 0 0 1-90.496 0L104.704 429.248a64 64 0 0 1 0-90.496"
                    }
                  )
                }
              ) : /* @__PURE__ */ h(
                "svg",
                {
                  xmlns: "http://www.w3.org/2000/svg",
                  viewBox: "0 0 1024 1024",
                  children: /* @__PURE__ */ h(
                    "path",
                    {
                      fill: "currentColor",
                      d: "M104.704 685.248a64 64 0 0 0 90.496 0l316.8-316.8 316.8 316.8a64 64 0 0 0 90.496-90.496L557.248 232.704a64 64 0 0 0-90.496 0L104.704 594.752a64 64 0 0 0 0 90.496"
                    }
                  )
                }
              )
            }
          )
        ] })
      ] })
    ] })
  ] });
};
const At = new P("error-message"), Sy = (n) => {
  const { message: e, size: t } = n, [i, r] = V(!0), s = $(Pe()), o = $(null), a = $({ resources: [], remainingText: "", hasResources: !1 }), l = (p) => {
    const { resources: m, remainingText: v, hasResources: y, error: g } = un.parseMixedContent(p);
    a.value = {
      resources: m,
      remainingText: v,
      hasResources: y,
      error: g
    };
  };
  e.think || (e.think = {
    title: "",
    description: "",
    collapse: !0
  });
  const c = (p, m) => {
    e.think = {
      ...e.think,
      title: p ? k.t.value("thinkThrough") : e.completed === !0 ? k.t.value("stopThinking") : k.t.value("thinking"),
      description: m || "",
      done: p || e.completed === !0
    }, e.think.done || (e.think.beginTime || (e.think.beginTime = Date.now()), e.think.endTime = void 0), e.think.done && !e.think.endTime && (e.think.endTime = Date.now(), e.think.collapse = !0);
  }, u = (p) => {
    const m = p.indexOf("<think>"), v = p.indexOf("</think>");
    let y = "", g = "", b = !1;
    return v === -1 ? (b = !1, y = p.slice(m + 7), g = "") : (b = !0, y = p.slice(m + 7, v), g = p.slice(v + 8)), { isThoughtCompleted: b, thoughtContent: y, answerContent: g };
  }, d = (p) => {
    const m = p.target, v = m == null ? void 0 : m.closest(
      'a[href^="chunkview://"], a[href^="view://"], a[href^="action://"]'
    );
    if (v) {
      p.preventDefault();
      const y = v.getAttribute("href");
      if (y) {
        let g = "";
        switch (y.startsWith("chunkview://") ? g = "chunkview" : y.startsWith("view://") ? g = "view" : y.startsWith("action://") && (g = "action"), g) {
          case "chunkview":
          case "view":
          case "action":
            n.controller.handlePredefinedClick(
              g,
              y,
              n.message,
              p
            );
            break;
          default:
            console.error(k.t.value("protocol", { protocol: g }));
            break;
        }
      }
      return !1;
    }
  };
  L(() => {
    if (t >= 0 && o.value) {
      if (e.content && e.content.indexOf("<think>") !== -1) {
        const { isThoughtCompleted: p, thoughtContent: m, answerContent: v } = u(e.content);
        c(p, m), l(v);
      } else
        l(e.content);
      o.value.setMarkdown(a.value.remainingText || "");
    }
  }, [e, t]), L(() => {
    let p = "";
    if (e.content && e.content.indexOf("<think>") !== -1) {
      const { isThoughtCompleted: m, thoughtContent: v, answerContent: y } = u(e.content);
      c(m, v), y && l(y);
    } else
      l(e.content);
    p = a.value.remainingText, o.value = new so({
      // @ts-ignore
      id: s,
      value: p || "",
      editor: {
        defaultModel: "previewOnly"
      },
      // @ts-ignore
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
            // @ts-ignore
            externals: ["echarts"]
          }
        }
      },
      callback: {
        onClickPreview: d
      }
    });
  }, []);
  const f = De(() => e.errorText || k.t.value("unknownError"), [e.errorText]);
  return /* @__PURE__ */ h("div", { className: At.b(), children: [
    /* @__PURE__ */ h("div", { className: At.b("header"), children: [
      /* @__PURE__ */ h("div", { className: At.be("header", "caption"), children: "AI " }),
      n.children
    ] }),
    /* @__PURE__ */ h("div", { className: "".concat(At.b("content"), " pre-wrap-container"), children: [
      a.value.hasResources && /* @__PURE__ */ h("div", { className: "content-material-container", children: a.value.resources.map((p) => /* @__PURE__ */ h(
        fr,
        {
          material: p,
          disabled: !0,
          controller: n.controller
        },
        p.id
      )) }),
      e.chatsteps && e.chatsteps.length > 0 && /* @__PURE__ */ h(
        yd,
        {
          items: e.chatsteps || [],
          controller: n.controller,
          onLinkClick: d
        }
      ),
      /* @__PURE__ */ h(
        Io,
        {
          toolcallCompleted: !!e.toolcallcompleted,
          items: e.toolcalls || [],
          controller: n.controller,
          onLinkClick: d
        }
      ),
      /* @__PURE__ */ h(
        Ao,
        {
          item: e.think,
          controller: n.controller
        }
      ),
      /* @__PURE__ */ h("div", { id: s })
    ] }),
    i && f && /* @__PURE__ */ h("div", { className: "".concat(At.b("footer")), children: [
      /* @__PURE__ */ h(
        "div",
        {
          className: "".concat(At.be("footer", "close")),
          onClick: () => {
            r(!1);
          },
          children: /* @__PURE__ */ h(Qu, {})
        }
      ),
      /* @__PURE__ */ h("div", { className: "".concat(At.be("footer", "text")), children: f })
    ] })
  ] });
};
const Tc = new P("unknown-message"), Ty = (n) => /* @__PURE__ */ h("div", { className: Tc.b(), children: /* @__PURE__ */ h("div", { className: "".concat(Tc.e("content"), " pre-wrap-container"), children: k.t.value("unsupportedMessageType", { type: n.message.type }) }) });
const My = new P("chat-message-item"), _y = (n) => {
  const { message: e, size: t } = n;
  let i = null;
  switch (e.type) {
    case "DEFAULT":
      i = e.role === "ASSISTANT" ? _2 : xy;
      break;
    case "ERROR":
      i = Sy;
      break;
    default:
      i = Ty;
  }
  return /* @__PURE__ */ h("div", { className: My.b(), children: ke(i, {
    size: t,
    message: e,
    controller: n.controller,
    children: n.children
  }) });
};
class ft {
  constructor(e) {
    _(this, "toolcallcompleted", !0);
    _(this, "toolcalls", []);
    _(this, "chatsteps", []);
    _(this, "chatuiactions", []);
    _(this, "think");
    _(this, "usage");
    /**
     * @description 是否为重新编辑状态，为重新编辑状态为true/不为重新编辑状态为false
     *
     * @type {boolean}
     * @memberof ChatMessage
     */
    _(this, "reeditstate", !1);
    /**
     * @description 消息的所有原始内容
     * - 用于维护工具调用消息数据
     * @type {string}
     * @memberof ChatMessage
     */
    _(this, "allcontent", "");
    this.msg = e, this.toolcalls = e.toolcalls || [], this.chatsteps = e.chatsteps || [], this.chatuiactions = e.chatuiactions || [], this.allcontent = e.content, this.think = e.think || void 0;
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
  get status() {
    return this.msg.status;
  }
  get realcontent() {
    let e = this.msg.content;
    if (e.indexOf("<think>") !== -1 && e.indexOf("</think>") === -1 || (e = e.replace(new RegExp("\\<think\\>[^]*?\\<\\/think\\>", "gs"), "").trim(), e.indexOf("<chatstep>") !== -1 && e.indexOf("</chatstep>") === -1) || (e = e.replace(new RegExp("\\<chatstep\\>[^]*?\\<\\/chatstep\\>", "gs"), "").trim(), e.indexOf("<tool_call>") !== -1 && e.indexOf("</tool_call>") === -1) || (e = e.replace(new RegExp("\\<tool_call\\>[^]*?\\<\\/tool_call\\>", "gs"), "").trim(), e.indexOf("<resources>") !== -1 && e.indexOf("</resources>") === -1))
      return "";
    e = e.replace(new RegExp("\\<resources\\>[^]*?\\<\\/resources\\>", "gs"), "").trim();
    const t = e.indexOf("<suggestions>");
    t !== -1 && (e = e.substring(0, t).trim());
    const i = e.indexOf("<chatuiaction>");
    return i !== -1 && (e = e.substring(0, i).trim()), e;
  }
  get errorText() {
    return this.msg.errorText;
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
  get islike() {
    return this.msg.islike;
  }
  get isdislike() {
    return this.msg.isdislike;
  }
  get feedbackcontent() {
    return this.msg.feedbackcontent;
  }
  get realmessageid() {
    return this.msg.realmessageid;
  }
  get metadata() {
    return this.msg.metadata;
  }
  /**
   * 更新消息
   *
   * @author chitanda
   * @date 2023-10-10 17:10:07
   * @param {IChatMessage} msg
   */
  update(e) {
    const t = e.role === "USER";
    if (e.content || (e.content = ""), this.allcontent += e.content, e.content && e.content.indexOf("<think>") !== -1 && this.msg.content && !t && (this.msg.content = ""), this.msg.content += e.content, t)
      return;
    (this.msg.content.indexOf("<tool_call>") !== -1 || this.msg.content.indexOf("</tool_call>") !== -1) && (this.msg.content = ""), this.computeToolCalls();
    const i = this.msg.content.indexOf("<chatstep>"), r = this.msg.content.indexOf("</chatstep>");
    (i !== -1 || r !== -1) && (i !== -1 && r !== -1 ? this.msg.content = this.msg.content.replace(
      new RegExp("\\<chatstep\\>[^]*?\\<\\/chatstep\\>", "gs"),
      ""
    ) : this.msg.content = ""), this.computeChatSteps();
    const s = this.msg.content.indexOf("<chatuiaction>"), o = this.msg.content.indexOf("</chatuiaction>");
    (s !== -1 || o !== -1) && (s !== -1 && o !== -1 ? this.msg.content = this.msg.content.replace(
      new RegExp("\\<chatuiaction\\>[^]*?\\<\\/chatuiaction\\>", "gs"),
      ""
    ) : this.msg.content = ""), this.computeChatUIActions();
  }
  /**
   * @description 替换消息
   * @param {IChatMessage} msg
   * @memberof ChatMessage
   */
  replace(e) {
    this.msg = e;
  }
  /**
   * 更新消息完成状态
   *
   * @author tony001
   * @date 2025-02-25 17:02:31
   * @param {boolean} completed
   */
  updateCompleted(e) {
    this.msg.completed = e, this.toolcallcompleted = e;
  }
  /**
   * @description 计算工具调用
   * @memberof ChatMessage
   */
  computeToolCalls() {
    const { completed: e, toolCalls: t } = Hu.parse(this.allcontent);
    this.toolcallcompleted = e, this.toolcalls = t;
  }
  /**
   * @description 计算聊天步骤
   */
  computeChatSteps() {
    this.chatsteps = ju.parse(this.allcontent);
  }
  /**
   * @description 计算聊天界面操作
   */
  computeChatUIActions() {
    this.chatuiactions = cg.parse(this.allcontent);
  }
}
class It {
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
    return this.data.sourceCaption;
  }
  get url() {
    return this.data.url;
  }
  get aiChat() {
    return this.data.aiChat;
  }
  get captionMode() {
    return this.data.captionMode;
  }
  get realid() {
    return this.data.realid;
  }
  get sequence() {
    return this.data.sequence;
  }
  get isTop() {
    return this.data.isTop;
  }
  get isShow() {
    var e;
    return (e = this.data.isShow) != null ? e : !0;
  }
  get disableStorage() {
    return this.data.disableStorage || !1;
  }
  get captionComputed() {
    return this.data.captionComputed || !1;
  }
}
class vs {
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
class Mc {
  constructor(e, t) {
    this.agent = e, this.defaultConfig = t;
  }
  get id() {
    return this.agent.id;
  }
  get caption() {
    return this.agent.caption;
  }
  get default() {
    return this.agent.default;
  }
  get order() {
    return this.agent.order;
  }
  get value() {
    return this.agent.id;
  }
  get label() {
    return this.agent.caption;
  }
  get knowledge_bases() {
    return this.agent.knowledge_bases;
  }
  get allow_any_knowledge_base() {
    return this.agent.allow_any_knowledge_base;
  }
  get rerank() {
    return this.agent.rerank || this.defaultConfig.chunkrerank;
  }
  get maxchunks() {
    return this.agent.maxchunks || this.defaultConfig.maxchunks;
  }
  get chunkthreshold() {
    return this.agent.chunkthreshold || this.defaultConfig.chunkthreshold;
  }
  get chunkpageindex() {
    return this.agent.chunkpageindex || this.defaultConfig.chunkpageindex;
  }
}
class _c {
  constructor(e) {
    this.knowledgeBase = e;
  }
  get id() {
    return this.knowledgeBase.id;
  }
  get name() {
    return this.knowledgeBase.name;
  }
  get value() {
    return this.knowledgeBase.id;
  }
  get label() {
    return this.knowledgeBase.name;
  }
}
const Ae = new P("chat-toolbar-item"), Ny = (n) => {
  var v, y, g;
  const {
    model: e,
    data: t,
    className: i,
    disabled: r = !1,
    buttonType: s = "default",
    onClick: o
  } = n, [a, l] = V(!1), c = F(null), u = (b) => typeof b.hidden == "function" ? b.hidden(t) : b.hidden === !0;
  if (u(e))
    return /* @__PURE__ */ h(We, {});
  const d = (b) => r ? !0 : typeof b.disabled == "function" ? b.disabled(t) : b.disabled === !0, f = (b) => {
    var w, C, x, S;
    if (typeof b.icon == "function")
      return b.icon();
    if ((w = b.icon) != null && w.showIcon && ((C = b.icon) != null && C.cssClass))
      return /* @__PURE__ */ h("i", { className: b.icon.cssClass });
    if ((x = b.icon) != null && x.showIcon && ((S = b.icon) != null && S.imagePath))
      return ni(b.icon.imagePath) ? /* @__PURE__ */ h(
        "div",
        {
          dangerouslySetInnerHTML: {
            __html: b.icon.imagePath
          }
        }
      ) : /* @__PURE__ */ h("img", { src: b.icon.imagePath });
  }, p = (b) => {
    d(e) || l(!0);
  }, m = (b, w) => {
    d(w) || (l(!1), o(b, w));
  };
  return L(() => {
    const b = (w) => {
      c.current && c.current.contains(w.target) || l(!1);
    };
    return a && document.addEventListener("mousedown", b), () => {
      document.removeEventListener("mousedown", b);
    };
  }, [a]), /* @__PURE__ */ h(
    "div",
    {
      className: "".concat(Ae.b(), " ").concat(Ae.b(s), " ").concat(e.customClass || "", " ").concat(i || "", " ").concat(Ae.is("disabled", d(e)), " ").concat(Ae.is(
        "more",
        !!((v = e.children) != null && v.length)
      )),
      children: [
        /* @__PURE__ */ h(
          "div",
          {
            title: e.title,
            className: Ae.e("content"),
            onClick: (b) => m(b, e),
            children: [
              /* @__PURE__ */ h("div", { className: Ae.em("content", "icon"), children: f(e) }),
              /* @__PURE__ */ h("div", { className: Ae.em("content", "label"), children: e.label })
            ]
          }
        ),
        ((y = e.children) == null ? void 0 : y.length) && /* @__PURE__ */ h(
          "div",
          {
            title: k.t.value("more"),
            className: Ae.e("more"),
            onClick: p,
            children: /* @__PURE__ */ h(
              "i",
              {
                "aria-hidden": "true",
                className: "fa fa-angle-down ".concat(Ae.em("more", "icon"))
              }
            )
          }
        ),
        a && /* @__PURE__ */ h("div", { ref: c, className: Ae.b("dropdown"), children: (g = e.children) == null ? void 0 : g.map((b, w) => {
          if (!u(b))
            return /* @__PURE__ */ h(
              "div",
              {
                title: b.title,
                onClick: (C) => m(C, b),
                className: "".concat(Ae.be("dropdown", "item"), " ").concat(b.customClass || "", " ").concat(Ae.is("disabled", d(b))),
                children: [
                  /* @__PURE__ */ h("div", { className: Ae.bem("dropdown", "item", "icon"), children: f(b) }),
                  /* @__PURE__ */ h("div", { className: Ae.bem("dropdown", "item", "label"), children: b.label })
                ]
              },
              w
            );
        }) })
      ]
    }
  );
};
const Ey = new P("chat-toolbar"), sr = (n) => {
  const { controller: e, items: t = [], data: i, type: r, className: s } = n, o = Co(_r);
  let a = [];
  const l = [
    {
      label: k.t.value("resetConversation"),
      title: k.t.value("resetConversation"),
      icon: () => /* @__PURE__ */ h(Dg, {}),
      onClick: () => {
        e.resetTopic();
      },
      children: [
        {
          label: k.t.value("clearConversation"),
          title: k.t.value("clearConversation"),
          icon: () => /* @__PURE__ */ h(Og, {}),
          onClick: () => {
            e.clearTopic();
          }
        }
      ]
    }
  ], c = [
    {
      label: k.t.value("refresh"),
      title: k.t.value("refresh"),
      icon: () => /* @__PURE__ */ h(Ls, {}),
      onClick: () => {
        e.refreshMessage(i);
      }
    },
    {
      label: k.t.value("delete"),
      title: k.t.value("delete"),
      hidden: () => !i.realmessageid,
      icon: () => /* @__PURE__ */ h(bg, {}),
      onClick: () => {
        e.deleteMessage(i);
      }
    }
  ];
  o.enableBackFill && c.unshift(
    {
      label: k.t.value("backfill"),
      title: k.t.value("backfill"),
      icon: () => /* @__PURE__ */ h(yg, {}),
      onClick: () => {
        e.backfill(i);
      }
    }
  );
  const u = [
    {
      label: k.t.value("refresh"),
      title: k.t.value("refresh"),
      icon: () => /* @__PURE__ */ h(Ls, {}),
      hidden: () => !!e.reEditContent.value,
      onClick: () => {
        e.refreshMessage(i, !0);
      }
    },
    {
      label: k.t.value("reedit"),
      title: k.t.value("reedit"),
      icon: () => /* @__PURE__ */ h(jg, {}),
      hidden: () => !!e.reEditContent.value || i.messageid !== e.lastUserMsgID.value || !!e.isLoading.value,
      onClick: () => {
        e.reEditEnter(i);
      }
    }
  ];
  if (r === "content")
    switch (i.type) {
      case "DEFAULT":
        i.role === "ASSISTANT" ? a = [...c, ...t] : a = [...u];
        break;
      case "ERROR":
        a = [...c, ...t];
        break;
    }
  else
    a = [...l, ...t];
  const d = (p, m) => {
    const v = {
      ...i
    };
    if (i instanceof ft ? (Object.assign(v, { topic: e.topic }), v.msg.realcontent = i.realcontent) : (v.data || (v.data = {}), Object.assign(v.data, { messages: e.messages.value })), m.onClick && typeof m.onClick == "function")
      m.onClick(p, m, e.context, e.params, v);
    else {
      const y = n.controller.opts.extendToolbarClick;
      y && typeof y == "function" && y(
        p,
        m,
        e.context,
        e.params,
        v
      );
    }
  }, f = De(() => r === "content" ? (i == null ? void 0 : i.role) === "ASSISTANT" ? (i == null ? void 0 : i.state) === 20 && (i == null ? void 0 : i.completed) !== !0 || e.isLoading.value : (i == null ? void 0 : i.role) === "USER" ? e.isLoading.value : !1 : !1, [i == null ? void 0 : i.state, i == null ? void 0 : i.completed, i == null ? void 0 : i.role, e.isLoading.value]);
  return /* @__PURE__ */ h("div", { className: "".concat(Ey.b(), " ").concat(s || ""), children: a.map((p, m) => /* @__PURE__ */ h(
    Ny,
    {
      data: i,
      model: p,
      disabled: f,
      buttonType: r === "content" ? "circle" : "default",
      onClick: d.bind(void 0)
    },
    m
  )) });
};
function Ay(n, e) {
  let t = null;
  return function(...i) {
    t || (t = setTimeout(() => {
      n.apply(this, i), t = null;
    }, e));
  };
}
const Iy = (n) => {
  const e = $(!1), t = $({}), i = new P("chat-back-bottom"), r = $(null), s = () => {
    if (r.value) {
      const l = n.visibilityHeight || 200, c = r.value.scrollHeight - r.value.scrollTop - r.value.offsetHeight;
      e.value = c >= l;
    }
  }, o = () => {
    var l;
    r.value && (r.value.scrollTo({
      top: r.value.scrollHeight,
      behavior: "smooth"
    }), (l = n.onClick) == null || l.call(n));
  }, a = Ay(s, 300);
  return De(() => {
    t.value = {
      right: "".concat(n.right, "px"),
      bottom: "".concat(n.bottom, "px")
    };
  }, [n.right, n.bottom]), L(() => {
    var l;
    if (n.target) {
      const c = (l = document.querySelector(n.target)) != null ? l : void 0;
      c && (r.value = c, c.addEventListener("scroll", a), s());
    }
  }, []), /* @__PURE__ */ h(
    "div",
    {
      className: "".concat(i.b(), " ").concat(i.is("visible", e.value)),
      style: t.value,
      onClick: o,
      children: /* @__PURE__ */ h(Ig, { className: i.e("icon") })
    }
  );
};
const Nc = new P("chat-messages"), io = (n) => {
  const e = F(null), t = 5, [i, r] = V(t), [s, o] = V(!1), [a, l] = V(!0), c = F(!1), u = n.controller.messages, d = F(u.value.length), f = De(() => {
    const g = Math.max(0, u.value.length - i);
    return u.value.slice(g);
  }, [u.value, i]), p = De(() => i < u.value.length, [u.value, i]), m = () => {
    const g = e.current;
    g && (c.current = !0, g.scrollTo({
      top: g.scrollHeight,
      behavior: "auto"
    }), setTimeout(() => {
      c.current = !1;
    }, 500));
  };
  L(() => {
    const g = u.value.length, b = d.current;
    g !== b && l(!0), a && m(), d.current = g;
  }, [u.value]);
  const v = () => {
    if (c.current)
      return;
    const g = e.current;
    if (!g)
      return;
    const { scrollTop: b, scrollHeight: w, clientHeight: C } = g;
    b < 100 && !s && p && (o(!0), setTimeout(() => {
      const S = Math.min(
        i + t,
        u.value.length
      );
      r(S);
      const M = g.scrollHeight;
      setTimeout(() => {
        const A = g.scrollHeight;
        g.scrollTop = A - M + g.scrollTop, o(!1);
      }, 0);
    }, 300));
    const x = w - (b + C) < 50;
    l(x);
  }, y = () => {
    c.current = !0, l(!0);
  };
  return /* @__PURE__ */ h("div", { ref: e, className: Nc.b(), onScroll: v, children: [
    f.map((g) => {
      var w;
      const b = ((w = g.content) == null ? void 0 : w.length) || 0;
      return g.role !== "SYSTEM" ? /* @__PURE__ */ h(
        _y,
        {
          size: b,
          message: g,
          controller: n.controller,
          children: /* @__PURE__ */ h(
            sr,
            {
              type: "content",
              mode: "DEFAULT",
              hideTopicSidebar: !1,
              data: g,
              items: n.toolbarItems,
              controller: n.controller
            }
          )
        },
        "".concat(g.messageid)
      ) : null;
    }),
    /* @__PURE__ */ h(
      Iy,
      {
        right: 20,
        bottom: 14,
        target: ".".concat(Nc.b()),
        onClick: y
      }
    )
  ] });
};
var ne = /* @__PURE__ */ ((n) => (n.STYLE_CACHE = "ai-chat-style-cache", n.MINIMIZE_STYLY_CHCHE = "ai-chat-minimize-style-cache", n.DATA_BASE_NAME = "ibiz-chat", n.DATA_TABLE_NAME = "history-message", n.DATA_TABLE_KEY_NAME = "id", n))(ne || {});
function Oy(n) {
  switch (n) {
    case "user":
      return "USER";
    case "agent":
      return "ASSISTANT";
    case "system":
      return "SYSTEM";
    default:
      return "USER";
  }
}
function Dy(n) {
  switch (n) {
    case "pending":
      return 20;
    case "sent":
      return 30;
    case "failed":
      return 40;
    case "canceled":
      return 30;
    default:
      return 30;
  }
}
function $y(n) {
  switch (n) {
    case "pending":
    case "sent":
    case "canceled":
      return "DEFAULT";
    case "failed":
      return "ERROR";
    default:
      return "DEFAULT";
  }
}
function Ry(n) {
  return {
    messageid: n.id,
    state: Dy(n.status),
    type: $y(n.status),
    role: Oy(n.sender_type),
    content: n.content,
    completed: !0,
    islike: n.is_like,
    isdislike: n.is_dislike,
    feedbackcontent: n.feedback_content,
    realmessageid: n.id,
    status: n.status,
    metadata: n.metadata ? JSON.parse(n.metadata) : void 0
  };
}
class Ec {
  /**
   * Creates an instance of AiChatController.
   *
   * @author chitanda
   * @date 2023-10-15 19:10:34
   * @param {IChatOptions} opts 聊天配置
   * @param {IChatOptions} resourceOptions 资源配置
   */
  constructor(e, t) {
    /**
     * 事件触发器
     * @type {EventBase}
     */
    _(this, "evt", new Of());
    /**
     * 聊天记录
     *
     * @author chitanda
     * @date 2023-10-16 16:10:29
     * @type {Signal<ChatMessage[]>}
     */
    _(this, "messages", X([]));
    /**
     * 素材列表
     *
     * @author tony001
     * @date 2025-02-27 18:02:46
     * @type {Signal<IMaterial[]>}
     */
    _(this, "materials", X([]));
    /**
     * 聊天框输入值
     *
     * @author chitanda
     * @date 2023-10-16 15:10:43
     * @type {Signal<string>}
     */
    _(this, "input", X(""));
    /**
     * 输入框是否展开
     * @type {Signal<boolean>}
     */
    _(this, "inputExpand", X(!1));
    /**
     * 重新编辑内容
     * @type {Signal<string>}
     */
    _(this, "reEditContent", X(""));
    /**
     * 重新编辑内容是否改变
     * @type {Signal<boolean>}
     */
    _(this, "reEditContentChanged", X(!1));
    /**
     * 最后一个用户消息ID
     * @type {Signal<string | undefined>}
     */
    _(this, "lastUserMsgID", X(void 0));
    /**
     * 是否加载中
     *
     * @author tony001
     * @date 2025-03-10 18:03:42
     * @type {Signal<boolean>}
     */
    _(this, "isLoading", X(!1));
    /**
     * 是否启用选择知识库
     *
     * @author tony001
     * @date 2026-02-03 16:38:09
     * @type {Signal<boolean>}
     */
    _(this, "enableKnowledgeBaseSelect", X(!1));
    /**
     * 是否启用知识库
     */
    _(this, "enableKnowledgeBaseState", X(!1));
    /**
     * 是否启用设置召回参数
     *
     * @author tony001
     * @date 2026-02-03 16:39:00
     * @type {Signal<boolean>}
     */
    _(this, "enableRecallConfigSetting", X(!1));
    /**
     * 是否允许切换AI代理
     */
    _(this, "enableAIAgentChange", !0);
    /**
     * 激活AI代理标识
     *
     * @type {(string | undefined)}
     */
    _(this, "activeAIAgentID");
    /**
     * AI代理列表
     *
     * @type {Signal<AIAgent[]>}
     */
    _(this, "agentList", X([]));
    /**
     * 视图参数
     *
     * @author tony001
     * @date 2025-02-24 14:02:23
     * @type {object}
     */
    _(this, "context");
    /**
     * 视图参数
     *
     * @author tony001
     * @date 2025-02-24 14:02:32
     * @type {object}
     */
    _(this, "params");
    /**
     * 应用实体标记
     *
     * @author tony001
     * @date 2025-02-24 14:02:10
     * @type {string}
     */
    _(this, "appDataEntityId");
    /**
     * 话题标识
     *
     * @author tony001
     * @date 2025-02-24 18:02:02
     * @type {(string | undefined)}
     */
    _(this, "topicId");
    /**
     * 话题数据
     *
     * @author tony001
     * @date 2025-03-10 16:03:26
     * @type {(ITopic | undefined)}
     */
    _(this, "topic");
    /**
     * 话题控制器
     */
    _(this, "aiTopic");
    /**
     * @description 聊天sessionid
     * @type {string}
     * @memberof AiChatController
     */
    _(this, "chatSessionid", "");
    /**
     * 模式参数，用于业务区分
     */
    _(this, "chatMode");
    /**
     * 聊天范围参数，用于业务区分
     */
    _(this, "chatScope");
    /**
     * 摘要是否正在处理完成
     */
    _(this, "isDigestProcessed", !1);
    /**
     * 知识库列表
     */
    _(this, "knowledgeBasesList", []);
    /**
     * 选中知识库
     */
    _(this, "selectionKnowledgeBases", X([]));
    /**
     * 当前可选知识库
     */
    _(this, "knowledgeBases", X([]));
    /**
     * 智能体召回配置
     */
    _(this, "reCallConfig", X({
      chunkrerank: 2,
      maxchunks: void 0,
      chunkthreshold: void 0,
      chunkpageindex: void 0
    }));
    /**
     * 当前正在处理的消息ID
     */
    _(this, "streamingMsgID");
    /**
     * @description 是否已完成初始化
     * @type {Signal<boolean>}
     * @memberof AiChatController
     */
    _(this, "inited", X(!1));
    this.opts = e, this.resourceOptions = t, this.context = e.context, this.params = e.params, this.appDataEntityId = e.appDataEntityId, this.aiTopic = e.aiTopic, this.topicId = e.topicId, this.topic = e.topic, this.enableAIAgentChange = !!e.enableAIAgentChange, this.chatMode = e.srfMode, this.chatScope = e.srfScope, this.chatSessionid = e.sessionid, this.enableKnowledgeBaseSelect.value = !!e.enableKnowledgeBaseSelect, this.enableKnowledgeBaseState.value = this.enableKnowledgeBaseSelect.value, this.enableRecallConfigSetting.value = !!e.enableRecallConfigSetting, this.initAIChat();
  }
  /**
   * AI资源模式
   */
  get resourceMode() {
    var e;
    return ((e = this.resourceOptions) == null ? void 0 : e.resourceMode) || "LOCAL";
  }
  /**
   * 当前话题是否禁止存储
   */
  get currentTopicDisableStorage() {
    if (this.topicId && this.aiTopic) {
      const e = this.aiTopic.getCurrentTopicByID(this.topicId);
      if (e && e.disableStorage)
        return !0;
    }
    return !1;
  }
  /**
   * 当前话题标题模式
   */
  get sessionCaptionMode() {
    if (this.aiTopic && this.topicId) {
      const e = this.aiTopic.getCurrentTopicByID(this.topicId);
      if (e && e.captionMode)
        return e.captionMode;
    }
    return "default";
  }
  /**
   * 当前话题标题
   */
  get sessionDefaultCaption() {
    if (this.aiTopic && this.topicId) {
      const e = this.aiTopic.getCurrentTopicByID(this.topicId);
      if (e && e.caption)
        return e.caption;
    }
    return this.opts.caption || k.t.value("newConversation");
  }
  /**
   * 更新会话数据（当前若存在正在处理的消息则不做处理，不存在则重新构建相关数据）
   * @returns
   */
  updateAIChat() {
    this.streamingMsgID || this.initAIChat();
  }
  /**
   * 初始化
   */
  async initAIChat() {
    this.inited.value = !1, this.messages.value = [], await this.initAIChatAgent(), await this.initAIChatKnowledge(), await this.fecthHistory(), this.inited.value = !0;
  }
  /**
   * 初始化AI代理列表
   */
  async initAIChatAgent() {
    if (this.opts.aiAgentlist && this.opts.aiAgentlist.length > 0 && this.opts.aiAgentlist.forEach((t) => {
      this.agentList.value = [
        ...this.agentList.value,
        new Mc(t, {
          chunkrerank: this.opts.reRankDefaultValue,
          maxchunks: this.opts.maxChunksDefaultValue,
          chunkthreshold: this.opts.chunkThresholdDefaultValue,
          chunkpageindex: this.opts.chunkPageIndexDefaultValue
        })
      ];
    }), this.opts.activeAIAgentID) {
      const t = this.agentList.value.find(
        (i) => i.id === this.opts.activeAIAgentID
      );
      t && (this.activeAIAgentID = t.id);
    }
    if (!this.enableRecallConfigSetting.value)
      return;
    const e = this.agentList.value.find((t) => t.id === this.activeAIAgentID);
    e && (this.reCallConfig.value = {
      chunkrerank: e.rerank,
      maxchunks: e.maxchunks,
      chunkthreshold: e.chunkthreshold,
      chunkpageindex: e.chunkpageindex
    });
  }
  /**
   * 初始化AI知识库
   */
  async initAIChatKnowledge() {
    var e;
    this.enableKnowledgeBaseSelect.value && ((e = this.opts.aiknowledgeBasesList) != null && e.length && (this.knowledgeBasesList = this.opts.aiknowledgeBasesList.map(
      (t) => new _c(t)
    )), this.computeSelectedKnowledge());
  }
  /**
   * 计算选中知识库
   */
  computeSelectedKnowledge() {
    var t, i;
    if (!this.enableKnowledgeBaseSelect.value)
      return;
    const e = this.agentList.value.find((r) => r.id === this.activeAIAgentID);
    this.knowledgeBases.value = !e || e.allow_any_knowledge_base ? [...this.knowledgeBasesList] : ((t = e.knowledge_bases) == null ? void 0 : t.map(
      (r) => new _c({
        id: r.ai_knowledge_base_id,
        name: r.ai_knowledge_base_name
      })
    )) || [], this.opts.selectAIKnowledgeBaseId ? this.selectionKnowledgeBases.value = this.knowledgeBases.value.filter((r) => {
      var s;
      return (s = this.opts.selectAIKnowledgeBaseId) == null ? void 0 : s.includes(r.id);
    }).map((r) => r.id) : e && (this.selectionKnowledgeBases.value = ((i = e.knowledge_bases) == null ? void 0 : i.map((r) => r.ai_knowledge_base_id)) || []);
  }
  /**
   * @description 知识库远程搜索
   * @param {string} query
   * @returns {*}  {Promise<{ value: string; label: string }[]>}
   * @memberof AiChatController
   */
  async knowledgeRemoteSearch(e) {
    if (!this.enableKnowledgeBaseSelect.value)
      return [];
    const t = this.agentList.value.find((i) => i.id === this.activeAIAgentID);
    if (!t || t.allow_any_knowledge_base) {
      if (this.opts.fetchKnowledgeBaseList) {
        const i = await this.opts.fetchKnowledgeBaseList(e);
        if (i && i.length > 0)
          return i.map((r) => ({
            value: r.id,
            label: r.name
          }));
      }
    } else if (t && t.knowledge_bases && t.knowledge_bases.length > 0)
      return t.knowledge_bases.map((i) => ({
        value: i.ai_knowledge_base_id,
        label: i.ai_knowledge_base_name
      })).filter((i) => i.label.toLowerCase().includes(e.toLowerCase()));
    return [];
  }
  /**
   * 获取历史记录存储key(用于适配不同智能体存在不同的历史记录)
   * @param topicId 话题标识
   * @returns 历史存储key
   */
  getHistoryStoreKey(e) {
    return "".concat(e);
  }
  /**
   * 获取查询知识库数据ID字符集
   *
   * @returns string | undefined
   */
  getQueryKnowledgeBases() {
    return this.enableKnowledgeBaseSelect.value && this.enableKnowledgeBaseState.value ? this.selectionKnowledgeBases.value.join(",") : void 0;
  }
  /**
   * 获取召回配置参数
   *
   * @returns IAIAgentConfig | undefined
   */
  getQueryRecallConfig() {
    return this.enableRecallConfigSetting.value ? this.reCallConfig.value : void 0;
  }
  /**
   * 获取历史记录
   *
   * @author tony001
   * @date 2025-02-24 13:02:52
   * @return {*}  {Promise<boolean>}
   */
  async fecthHistory() {
    if (this.opts.isSimple)
      return !0;
    if (this.topicId) {
      let t = {};
      if (this.currentTopicDisableStorage)
        t.data = [];
      else if (this.resourceMode === "LOCAL")
        t = await at.getData(
          ne.DATA_BASE_NAME,
          ne.DATA_TABLE_NAME,
          this.getHistoryStoreKey(this.topicId)
        );
      else if (this.resourceMode === "REMOTE" && this.resourceOptions) {
        const i = await this.resourceOptions.getMessages({
          n_session_id_eq: this.chatSessionid
        });
        if (i && i.length > 0) {
          const r = [];
          i.forEach((s) => {
            r.push(Ry(s));
          }), t.data = r;
        }
      }
      if (t && t.data && t.data.length > 0)
        return t.data.forEach((i) => {
          const r = {
            messageid: i.messageid,
            state: i.state,
            type: i.type,
            role: i.role,
            islike: i.islike,
            isdislike: i.isdislike,
            metadata: i.metadata,
            feedbackcontent: i.feedbackcontent,
            content: i.content,
            suggestions: i.suggestions,
            completed: !0,
            toolcalls: i.toolcalls,
            realmessageid: i.realmessageid,
            status: i.status,
            chatsteps: i.chatsteps,
            chatuiactions: i.chatuiactions
          };
          this.addMessage(r);
        }), await this.afterFecthHistory(), !0;
    }
    return await this.opts.history(this.context, this.params, {
      appDataEntityId: this.appDataEntityId,
      appendCurData: this.opts.appendCurData,
      sessionid: this.chatSessionid,
      srfaiagent: this.activeAIAgentID,
      srfmode: this.chatMode,
      srfscope: this.chatScope
    }) && await this.afterFecthHistory(), !0;
  }
  /**
   * 获取历史记录后续处理
   */
  async afterFecthHistory() {
    if (this.opts.appendCurContent && (this.addMessage({
      state: 30,
      messageid: Pe(),
      role: "USER",
      type: "DEFAULT",
      content: this.opts.appendCurContent,
      completed: !0,
      status: "sent"
    }), await this.markLastUserMessage()), this.opts.appendCurResource) {
      const { hasResources: e, resources: t } = un.parseMixedContent(this.opts.appendCurResource);
      e && t && t.length > 0 && t.forEach((i) => {
        this.replaceMaterial(i.id, i);
      });
    }
    if (this.opts.autoQuestion !== !1) {
      const e = this.messages.value.length - 1, t = this.messages.value[e];
      if (t && t.role === "USER") {
        const i = this.stringlyMaterialResource(!1);
        if (i) {
          const r = i + t.content, s = {
            ...t._origin,
            messageid: Pe(),
            content: r
          };
          this.messages.value[e] = new ft(s), this.messages.value = [...this.messages.value];
        }
        try {
          this.isLoading.value = !0, await this.opts.question(
            this,
            this.context,
            this.params,
            { appDataEntityId: this.appDataEntityId },
            this.getMessages(),
            this.chatSessionid,
            this.activeAIAgentID,
            this.chatMode,
            this.chatScope,
            this.getQueryKnowledgeBases(),
            this.getQueryRecallConfig(),
            this.opts.appendCurData,
            this.opts.srfMcpservers
          ), this.opts.action && await this.opts.action("question", t.content);
        } finally {
          this.isLoading.value = !1;
        }
      }
    }
    await this.markLastUserMessage();
  }
  /**
   * 更新数据到indexdb
   *
   * @author tony001
   * @date 2025-02-24 18:02:41
   * @return {*}  {Promise<void>}
   */
  async asyncToIndexDB() {
    if (!this.topicId || this.resourceMode !== "LOCAL" || this.currentTopicDisableStorage)
      return;
    const e = {
      id: this.getHistoryStoreKey(this.topicId),
      data: this.messages.value.map((t) => ({
        ...t._origin,
        toolcalls: t.toolcalls,
        chatsteps: t.chatsteps,
        chatuiactions: t.chatuiactions
      })),
      timestamp: (/* @__PURE__ */ new Date()).getTime()
    };
    await at.updateData(
      ne.DATA_BASE_NAME,
      ne.DATA_TABLE_NAME,
      e
    );
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
   * @description 当前消息附加agentID(ai助手消息且无metadata属性且存在激活智能体)
   * @param {IChatMessage} data
   * @memberof AiChatController
   */
  attachMessageAgentID(e) {
    e.role === "ASSISTANT" && !e.hasOwnProperty("metadata") && this.activeAIAgentID && (e.metadata = {
      agentid: this.activeAIAgentID
    });
  }
  /**
   * 新增聊天记录
   *
   * @author chitanda
   * @date 2023-10-09 15:10:15
   * @param {IMessage} data
   */
  addMessage(e) {
    this.attachMessageAgentID(e), e.state === 20 && e.status === "pending" && e.messageid && (this.streamingMsgID = e.messageid);
    const t = this.messages.value.find(
      (i) => i.messageid === e.messageid
    );
    if (t)
      t.update(e), this.messages.value = [...this.messages.value];
    else {
      const i = new ft(e);
      i.update({ ...e, content: "" }), this.messages.value = [...this.messages.value, i];
    }
    this.asyncToIndexDB();
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
    this.streamingMsgID === e && t && (this.streamingMsgID = void 0);
    const i = this.messages.value.find((r) => r.messageid === e);
    if (i && (i.updateCompleted(t), this.messages.value = [...this.messages.value], await this.asyncToIndexDB()), this.opts.autoFill === !0) {
      const r = i || this.messages.value[this.messages.value.length - 1];
      r.role === "ASSISTANT" && r.state === 30 && this.backfill(r);
    }
    this.evt.emit("onCompleteMessage", {
      messageid: e,
      completed: t
    });
  }
  /**
   * 替换已经存在的聊天消息
   *
   * @author chitanda
   * @date 2023-10-16 22:10:49
   * @param {IChatMessage} data
   */
  replaceMessage(e, t = !0) {
    var o;
    this.attachMessageAgentID(e);
    let i = [];
    if (e.content) {
      const a = e.content, l = a.indexOf("<chatuiaction>"), c = a.indexOf("</chatuiaction>");
      l !== -1 && c !== -1 && l < c && (e.content = a.replace(
        new RegExp("\\<chatuiaction\\>[^]*?\\<\\/chatuiaction\\>", "gs"),
        ""
      ));
      const u = a.indexOf("<chatstep>"), d = a.indexOf("</chatstep>");
      u !== -1 && d !== -1 && u < d && (i = ju.parse(e.content), e.content = a.replace(new RegExp("\\<chatstep\\>[^]*?\\<\\/chatstep\\>", "gs"), ""));
    }
    const r = { ...e }, s = this.messages.value.findIndex(
      (a) => a.messageid === e.messageid
    );
    if (s !== -1) {
      if (e.type === "ERROR") {
        let a = this.messages.value[s].content;
        try {
          const l = JSON.parse(a);
          l && l.choices && l.choices.length > 0 && (a = l.choices[0].content || a);
        } catch (l) {
          console.warn("Failed to parse tempContent as JSON", l);
        } finally {
          e.content = a;
        }
      }
      i.length > 0 && ((o = this.messages.value[s].chatsteps) == null || o.push(...i)), r.toolcalls = this.messages.value[s].toolcalls, r.chatsteps = this.messages.value[s].chatsteps, r.chatuiactions = this.messages.value[s].chatuiactions, r.think = this.messages.value[s].think, this.messages.value[s].replace(e), this.messages.value = [...this.messages.value];
    } else
      i.length > 0 && (e.chatsteps || (e.chatsteps = []), e.chatsteps.push(...i)), this.messages.value = [...this.messages.value, new ft(e)];
    this.asyncToIndexDB(), e.type === "DEFAULT" && this.opts.recommendPrompt && t && this.opts.recommendPrompt(this.context, this.params, {
      appDataEntityId: this.appDataEntityId,
      message: {
        messages: [
          {
            ...e,
            content: e.content.replace(
              new RegExp("\\<think\\>[^]*?\\<\\/think\\>", "gs"),
              ""
            )
          }
        ],
        sessionid: this.chatSessionid,
        srfaiagent: this.activeAIAgentID
      }
    }).then((a) => {
      a && a.content && this.updateRecommendPrompt(r, a.content);
    });
  }
  /**
   * @description 更新消息资源使用情况
   * @param {string} messageid 消息ID
   * @param {IChatMessageUsage} usage 消息资源使用情况
   * @memberof AiChatController
   */
  updateMsgUsage(e, t) {
    const i = this.messages.value.findIndex(
      (r) => r.messageid === e
    );
    i !== -1 && (this.messages.value[i].usage = t, this.messages.value = [...this.messages.value]);
  }
  /**
   * 终止消息
   *
   * @author tony001
   * @date 2025-03-10 14:03:17
   * @param {IChatMessage} data
   */
  async stopMessage(e) {
    this.attachMessageAgentID(e);
    const t = this.messages.value.findIndex(
      (i) => i.messageid === e.messageid
    );
    e.content = e.content || k.t.value("userInterrupt"), t !== -1 ? (delete this.messages.value[t].think, this.messages.value[t].replace(e), this.messages.value = [...this.messages.value]) : this.messages.value = [...this.messages.value, new ft(e)], await this.asyncToIndexDB();
  }
  /**
   * 数据对象转 XML 字符串
   *
   * @author tony001
   * @date 2025-03-03 11:03:55
   * @return {*}  {string}
   */
  stringlyMaterialResource(e = !0) {
    let t = "";
    const i = [];
    return this.materials.value && this.materials.value.length > 0 && (this.materials.value.forEach((r) => {
      if (r.type === "ossfile") {
        const s = r.metadata;
        s.state && s.state === "successed" && i.push(r);
      } else
        i.push(r);
    }), e && (this.materials.value = [])), i && i.length > 0 && (t = un.stringify(i)), t;
  }
  /**
   * @description 拷贝消息数据（排除思维链数据）
   * @private
   * @param {IChatMessage} message
   * @returns {*}  {IChatMessage}
   * @memberof AiChatController
   */
  cloneMessage(e) {
    const t = new ft(e._origin);
    return delete t.think, t;
  }
  /**
   * @description 获取当前会话的消息集合
   * @private
   * @returns {*}  {IChatMessage[]}
   * @memberof AiChatController
   */
  getMessages() {
    const e = this.messages.value.filter((t) => t.type !== "ERROR" && t.status !== "canceled").map((t) => Fc(t._origin));
    return e.forEach((t) => {
      t.role === "ASSISTANT" && (t.content = t.content.replace(new RegExp("\\<tool_call\\>[^]*?\\<\\/tool_call\\>", "gs"), "").replace(new RegExp("\\<think\\>[^]*?\\<\\/think\\>", "gs"), "").trim(), delete t.toolcalls, delete t.chatsteps, delete t.chatuiactions, delete t.think, delete t.metadata);
    }), e;
  }
  /**
   * 获取完整消息集合
   * @returns
   */
  getAllMessages() {
    return this.messages.value.map((e) => e._origin);
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
      this.isLoading.value = !0, this.reEditExit(), this.messages.value.forEach((i, r) => {
        const s = i._origin;
        s.suggestions && (s.suggestions = void 0, this.messages.value[r].replace(s));
      }), this.messages.value = [...this.messages.value], this.asyncToIndexDB();
      let t = this.stringlyMaterialResource(!0);
      t ? t += "\n".concat(e) : t = e, this.addMessage({
        state: 30,
        messageid: Pe(),
        role: "USER",
        type: "DEFAULT",
        content: t,
        status: "sent"
      }), await this.opts.question(
        this,
        this.context,
        this.params,
        { appDataEntityId: this.appDataEntityId },
        this.getMessages(),
        this.chatSessionid,
        this.activeAIAgentID,
        this.chatMode,
        this.chatScope,
        this.getQueryKnowledgeBases(),
        this.getQueryRecallConfig(),
        this.opts.appendCurData,
        this.opts.srfMcpservers
      ), await this.markLastUserMessage(), await this.updateTopicCaption(), this.opts.action && this.opts.action("question", e), this.isLoading.value = !1;
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
      await this.opts.abortQuestion(this, this.context, this.params, {
        appDataEntityId: this.appDataEntityId,
        sessionid: this.chatSessionid,
        srfaiagent: this.activeAIAgentID,
        srfmode: this.chatMode,
        srfscope: this.chatScope
      });
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
    if (this.opts.action) {
      const t = this.cloneMessage(e);
      this.opts.action("backfill", t);
    }
  }
  /**
   *
   * 删除指定消息，如果是用户提问的刷新调用的删除，则需要删除从问题开始到最后的所有记录
   * @param {IChatMessage} message
   * @param {boolean} [isuser=false]
   * @memberof AiChatController
   */
  async deleteMessage(e) {
    const t = this.messages.value.findIndex(
      (i) => i.messageid === e.messageid
    );
    if (t !== -1 && (this.messages.value.splice(t, 1), this.messages.value = [...this.messages.value]), this.asyncToIndexDB(), this.resourceMode === "REMOTE" && this.resourceOptions && e.realmessageid && await this.resourceOptions.deleteMessage(e.realmessageid), this.opts.action) {
      const i = this.cloneMessage(e);
      this.opts.action("deletemsg", i);
    }
  }
  /**
   * 刷新当前消息
   *
   * @memberof AiChatController
   */
  async refreshMessage(e, t = !1) {
    this.isLoading.value = !0;
    try {
      let i = this.messages.value.findIndex(
        (o) => o.messageid === e.messageid
      ), r = [], s;
      if (t) {
        if (e.state === 40) {
          const o = {
            ...e._origin,
            state: 30
          };
          this.replaceMessage(o, !1);
        }
        s = this.messages.value[i], r = this.messages.value.splice(
          i,
          this.messages.value.length - i
        ), this.addMessage({
          ...s._origin,
          messageid: Pe()
        }), await this.opts.question(
          this,
          this.context,
          this.params,
          { appDataEntityId: this.appDataEntityId },
          this.getMessages(),
          this.chatSessionid,
          this.activeAIAgentID,
          this.chatMode,
          this.chatScope,
          this.getQueryKnowledgeBases(),
          this.getQueryRecallConfig(),
          this.opts.appendCurData,
          this.opts.srfMcpservers
        );
      } else if (i === this.messages.value.length - 1) {
        const o = this.messages.value.pop();
        o && r.push(o), s = this.messages.value[this.messages.value.length - 1], s && (r.push(s), this.messages.value.pop(), this.addMessage({
          ...s._origin,
          messageid: Pe()
        })), this.messages.value = [...this.messages.value], await this.opts.question(
          this,
          this.context,
          this.params,
          { appDataEntityId: this.appDataEntityId },
          this.getMessages(),
          this.chatSessionid,
          this.activeAIAgentID,
          this.chatMode,
          this.chatScope,
          this.getQueryKnowledgeBases(),
          this.getQueryRecallConfig(),
          this.opts.appendCurData,
          this.opts.srfMcpservers
        );
      } else
        i >= 1 && (i -= 1, s = this.messages.value[i]), r = this.messages.value.splice(
          i,
          this.messages.value.length - i
        ), s && this.addMessage({
          ...s._origin,
          messageid: Pe()
        }), await this.opts.question(
          this,
          this.context,
          this.params,
          { appDataEntityId: this.appDataEntityId },
          this.getMessages(),
          this.chatSessionid,
          this.activeAIAgentID,
          this.chatMode,
          this.chatScope,
          this.getQueryKnowledgeBases(),
          this.getQueryRecallConfig(),
          this.opts.appendCurData,
          this.opts.srfMcpservers
        );
      if (this.asyncToIndexDB(), this.resourceMode === "REMOTE" && this.resourceOptions && r && r.length > 0) {
        const o = r.filter((a) => a.realmessageid).map((a) => a.realmessageid).join(",");
        o && await this.resourceOptions.deleteMessage(o);
      }
      if (this.opts.action) {
        const o = this.cloneMessage(e);
        this.opts.action("refreshmsg", o);
      }
    } finally {
      await this.markLastUserMessage(), this.isLoading.value = !1;
    }
  }
  /**
   * @description 复制消息
   * @param {string} text 复制的文本
   * @param {IChatMessage} message 消息
   * @memberof AiChatController
   */
  copyMessage(e, t) {
    var i;
    if (xn.copy(e), (i = this.opts.utils) == null || i.message.success(k.t.value("copied")), this.opts.action) {
      const r = this.cloneMessage(t);
      this.opts.action("copymsg", r);
    }
  }
  /**
   * 重新编辑当前消息
   *
   * @memberof AiChatController
   */
  async reEditEnter(e) {
    const t = this.messages.value.findIndex(
      (i) => i.messageid === e.messageid
    );
    t !== -1 && (this.messages.value[t].reeditstate = !0, this.reEditContent.value = og(e.content), this.messages.value = [...this.messages.value]);
  }
  /**
   * 重新编辑退出
   *
   * @memberof AiChatController
   */
  async reEditExit() {
    const e = this.messages.value.findIndex((t) => t.reeditstate === !0);
    e !== -1 && (this.messages.value[e].reeditstate = !1, this.reEditContent.value = "", this.reEditContentChanged.value = !1, this.messages.value = [...this.messages.value]);
  }
  /**
   *  重新提交当前消息
   *
   * @param message
   */
  async reEditSubmit(e) {
    const t = this.messages.value.findIndex(
      (i) => i.messageid === e.messageid
    );
    if (t !== -1) {
      const i = Vn(this.reEditContent.value), r = {
        ...e._origin,
        content: i,
        realcontent: i
      };
      this.replaceMessage(r, !1), this.messages.value[t].reeditstate = !1, this.reEditContent.value = "", this.reEditContentChanged.value = !1, await this.refreshMessage(e, !0);
    }
  }
  /**
   * 重新编辑取消
   *
   * @param message
   */
  async reEditCancel(e) {
    const t = this.messages.value.findIndex(
      (i) => i.messageid === e.messageid
    );
    t !== -1 && (this.messages.value[t].reeditstate = !1, this.reEditContent.value = "", this.reEditContentChanged.value = !1, this.messages.value = [...this.messages.value]);
  }
  /**
   * 标记最后一条用户消息
   *
   */
  async markLastUserMessage() {
    if (this.messages.value.length === 0)
      return;
    const t = [...this.messages.value].reverse().find((i) => i.role === "USER");
    this.lastUserMsgID.value = t == null ? void 0 : t.messageid;
  }
  /**
   * 重置对话（清空当前对话、查询历史）
   * @returns
   */
  async resetTopic() {
    let e = !0;
    return e = await this.clearTopic(), e && (await this.fecthHistory(), e);
  }
  /**
   * 清空对话
   * @returns
   */
  async clearTopic() {
    let e = !0;
    if (await this.abortQuestion(), this.topicId) {
      if (this.topicId && this.aiTopic) {
        if (this.currentTopicDisableStorage)
          e = !0;
        else if (this.resourceMode === "LOCAL")
          e = await at.deleteData(
            ne.DATA_BASE_NAME,
            ne.DATA_TABLE_NAME,
            this.getHistoryStoreKey(this.topicId)
          );
        else if (this.resourceMode === "REMOTE" && this.resourceOptions) {
          const t = await this.resourceOptions.getSessionList({
            n_session_id_eq: this.chatSessionid
          });
          t && t.length > 0 && (e = await this.resourceOptions.clearAllMessageBySessionId(
            t[0].realid
          ));
        }
      }
    } else if (this.resourceMode === "REMOTE" && this.resourceOptions) {
      const t = await this.resourceOptions.getSessionList({
        n_session_id_eq: this.chatSessionid
      });
      t && t.length > 0 && (e = await this.resourceOptions.clearAllMessageBySessionId(
        t[0].realid
      ));
    }
    return e && (this.messages.value = [], e);
  }
  /**
   * 新增素材资源
   *
   * @author tony001
   * @date 2025-02-27 18:02:00
   * @param {IMaterial} data
   */
  addMaterial(e) {
    this.materials.value.find((i) => i.id === e.id) ? this.materials.value = [...this.materials.value] : this.materials.value = [...this.materials.value, new vs(e)];
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
    const i = this.materials.value.findIndex((r) => r.id === e);
    i !== -1 ? (this.materials.value[i] = new vs(t), this.materials.value = [...this.materials.value]) : this.materials.value = [...this.materials.value, new vs(t)];
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
    const i = this.messages.value.findIndex(
      (s) => s.messageid === e.messageid
    ), { suggestions: r } = lg.parseMixedContent(t);
    r && r.length > 0 && (e.suggestions = r, i !== -1 ? (this.messages.value[i] = new ft(e), this.messages.value = [...this.messages.value]) : this.messages.value = [...this.messages.value, new ft(e)], this.asyncToIndexDB());
  }
  /**
   * 清空界面操作，包含当前消息的界面行为、推荐提示
   *
   * @param message
   */
  async clearUIActions(e) {
    const t = this.messages.value.findIndex(
      (i) => i.messageid === e.messageid
    );
    if (t !== -1) {
      const i = this.messages.value[t]._origin;
      i.suggestions = void 0, this.messages.value[t].replace(i), this.messages.value = [...this.messages.value];
    }
    this.asyncToIndexDB();
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
    var o;
    await this.clearUIActions(e);
    const { type: r, metadata: s } = t;
    switch (r) {
      case "action":
        if (this.opts.extendToolbarClick) {
          const a = t.data.actionid, l = t.data.appid;
          if (!a)
            throw new Error(k.t.value("actionIdCannotEmpty"));
          this.addMessage({
            messageid: Pe(),
            state: 30,
            type: "DEFAULT",
            role: "USER",
            content: s.content_name,
            status: "sent"
          });
          const c = this.cloneMessage(e);
          Object.assign(c, { topic: this.topic }), c.msg.realcontent = e.realcontent;
          const u = { ...this.context };
          if (s.action_context)
            try {
              const m = s.action_context.split(";").reduce(
                (v, y) => {
                  if (y.trim()) {
                    const [g, b] = y.split(":");
                    g && b && (v[g.trim()] = b.trim());
                  }
                  return v;
                },
                {}
              );
              m && Object.keys(m).length > 0 && Object.assign(u, { ...m });
            } catch (p) {
              throw new Error(k.t.value("actionExContext"));
            }
          const d = await this.opts.extendToolbarClick(
            i,
            {
              id: a,
              // 是否是插件应用(建议里面定义appid认为是插件应用的界面行为)
              isPluginApp: !!l,
              appId: l || this.context.srfappid
            },
            u,
            this.params,
            c
          ), f = (o = d == null ? void 0 : d.data) == null ? void 0 : o[0];
          f && f.content && this.addMessage({
            messageid: Pe(),
            state: 30,
            type: f.type || "DEFAULT",
            role: f.role || "ASSISTANT",
            content: f.content,
            status: "sent"
          });
        }
        break;
      case "raw":
        await this.question(t.data.content);
        break;
      default:
        throw new Error(k.t.value("notSupportingType", { type: r }));
    }
  }
  /**
   * 处理用户点击界面行为
   * @param message
   * @param uiAction
   * @param event
   */
  async handleUIActionClick(e, t, i) {
    var a;
    await this.clearUIActions(e);
    const { type: r, data: s, metadata: o } = t;
    switch (r) {
      case "action":
        if (this.opts.extendToolbarClick) {
          const l = s.actionid, c = s.appid;
          if (!l)
            throw new Error(k.t.value("actionIdCannotEmpty"));
          const u = this.cloneMessage(e);
          Object.assign(u, { topic: this.topic }), u.msg.realcontent = e.realcontent;
          const d = { ...this.context };
          if (o.action_context)
            try {
              const v = o.action_context.split(";").reduce(
                (y, g) => {
                  if (g.trim()) {
                    const [b, w] = g.split(":");
                    b && w && (y[b.trim()] = w.trim());
                  }
                  return y;
                },
                {}
              );
              v && Object.keys(v).length > 0 && Object.assign(d, { ...v });
            } catch (m) {
              throw new Error(k.t.value("actionExContext"));
            }
          const f = await this.opts.extendToolbarClick(
            i,
            {
              id: l,
              // 是否是插件应用(建议里面定义appid认为是插件应用的界面行为)
              isPluginApp: !!c,
              appId: c || this.context.srfappid
            },
            d,
            this.params,
            u
          ), p = (a = f == null ? void 0 : f.data) == null ? void 0 : a[0];
          p && p.content && this.addMessage({
            messageid: Pe(),
            state: 30,
            type: p.type || "DEFAULT",
            role: p.role || "ASSISTANT",
            content: p.content,
            status: "sent"
          });
        }
        break;
      case "raw":
        await this.question(s.content);
        break;
      default:
        throw new Error(k.t.value("notSupportingType", { type: r }));
    }
  }
  /**
   * 设置当前激活的AI助手ID
   * @param agentID
   */
  async setActiveAIAgentID(e) {
    if (this.activeAIAgentID !== e) {
      if (this.activeAIAgentID = e, this.topicId && this.aiTopic && this.aiTopic.updateTopicChatByID(this.topicId, {
        activeAIAgentID: e
      }), this.enableRecallConfigSetting.value) {
        const t = this.agentList.value.find(
          (i) => i.id === this.activeAIAgentID
        );
        t && (this.reCallConfig.value = {
          chunkrerank: t.rerank,
          maxchunks: t.maxchunks,
          chunkthreshold: t.chunkthreshold,
          chunkpageindex: t.chunkpageindex
        });
      }
      this.enableKnowledgeBaseSelect.value && this.computeSelectedKnowledge();
    }
  }
  /**
   * 设置智能体配置
   * @param config
   */
  setAIAgentConfig(e) {
    this.reCallConfig.value = { ...this.reCallConfig.value, ...e };
  }
  /**
   * 搜索AI智能体
   * @param query
   * @returns
   */
  async searchAIAgent(e) {
    let t = [];
    return this.opts.fetchAgentList ? t = (await this.opts.fetchAgentList(e) || []).map(
      (r) => new Mc(r, {
        chunkrerank: this.opts.reRankDefaultValue,
        maxchunks: this.opts.maxChunksDefaultValue,
        chunkthreshold: this.opts.chunkThresholdDefaultValue,
        chunkpageindex: this.opts.chunkPageIndexDefaultValue
      })
    ) : t = this.agentList.value, t;
  }
  /**
   * 设置选中知识库
   * @param ids
   */
  setSelectionKnowledge(e) {
    this.selectionKnowledgeBases.value = [...e];
  }
  /**
   * 切换知识库启用状态
   */
  switchKnowledgeEnableState() {
    this.enableKnowledgeBaseState.value = !this.enableKnowledgeBaseState.value;
  }
  /**
   * 更新当前话题标题
   */
  async updateTopicCaption() {
    if (this.topicId && this.aiTopic) {
      const t = this.aiTopic.getCurrentTopicByID(this.topicId);
      if (t && t.captionComputed)
        return;
    }
    if (this.isDigestProcessed === !0)
      return;
    const e = this.messages.value.find((t) => t.role === "USER");
    if (e) {
      let t = "";
      if (this.sessionCaptionMode)
        switch (this.sessionCaptionMode) {
          case "snippet":
            const i = e.content, { remainingText: r } = un.parseMixedContent(i);
            t = r.substring(0, 15);
            break;
          case "summary":
            const s = await this.opts.chatDigest(
              this.context,
              this.params,
              {
                appDataEntityId: this.appDataEntityId,
                message: {
                  messages: this.getMessages(),
                  sessionid: this.chatSessionid,
                  srfaiagent: this.activeAIAgentID,
                  mode: "title",
                  maxtokens: this.opts.summaryMaxTokens || 30
                }
              }
            );
            s && s.content && (t = s.content);
            break;
          default:
            t = this.sessionDefaultCaption;
            break;
        }
      if (this.resourceMode === "REMOTE" && this.resourceOptions && // 禁用存储不做处理
      !this.currentTopicDisableStorage) {
        const i = await this.resourceOptions.getSessionList({
          n_session_id_eq: this.chatSessionid
        });
        i && i.length > 0 && i[0].caption !== t && await this.resourceOptions.updateSession(i[0].realid, {
          caption: t
        });
      }
      this.topicId && this.aiTopic && this.aiTopic.updateTopicCaption(this.topicId, t), this.isDigestProcessed = !0;
    }
  }
  /**
   * @description 消息点赞
   * @param {IChatMessage} message
   * @returns {*}  {Promise<void>}
   * @memberof AiChatController
   */
  async messageLike(e) {
    const t = e.islike === "1", i = e.realmessageid;
    if (!i || !this.resourceOptions)
      return;
    (t ? await this.resourceOptions.cancelFeedback(i) : await this.resourceOptions.likeMessage(i)) && (e.islike = t ? "0" : "1", !t && e.isdislike === "1" && (e.isdislike = "0"), this.replaceMessage(e, !1));
  }
  /**
   * @description 消息点踩
   * @param {IChatMessage} message
   * @returns {*}  {Promise<void>}
   * @memberof AiChatController
   */
  async messageDisLike(e) {
    const t = e.isdislike === "1", i = e.realmessageid, r = e.feedbackcontent;
    if (!i || !this.resourceOptions)
      return;
    (t ? await this.resourceOptions.cancelFeedback(i) : await this.resourceOptions.dislikeMessage(i, r)) && (e.isdislike = t ? "0" : "1", !t && e.islike === "1" && (e.islike = "0"), this.replaceMessage(e, !1));
  }
  /**
   * 处理预定义点击
   * @param type
   * @param url
   * @param message
   * @param event
   * @returns
   */
  async handlePredefinedClick(e, t, i, r) {
    switch (e) {
      case "chunkview":
        const s = t.replace("chunkview://", "");
        if (!this.opts.chunkView) {
          console.error(k.t.value("chunkView"));
          return;
        }
        if (!this.opts.chunkEntity) {
          console.error(k.t.value("chunkEntity"));
          return;
        }
        const o = "view://".concat(this.opts.chunkView, '?srfnavctx={"').concat(this.opts.chunkEntity, '":"').concat(s, '"}');
        await this.handlePredefViewClick(o, i, r);
        break;
      case "view":
        await this.handlePredefViewClick(t, i, r);
        break;
      case "action":
        await this.handlePredefActionClick(t, i, r);
        break;
    }
  }
  /**
   * 处理预定义视图跳转点击
   * @param url
   * @param message
   * @param event
   * @returns
   */
  async handlePredefViewClick(e, t, i) {
    this.opts.openLinkView && await this.opts.openLinkView(e, t, i);
  }
  /**
   * 处理预定义界面行为点击
   * @param url
   * @param message
   * @param event
   * @returns
   */
  async handlePredefActionClick(e, t, i) {
    var m;
    if (!this.opts.extendToolbarClick)
      return;
    const { typeId: r, context: s, params: o } = sg(e), a = r, l = s.appid;
    if (!a)
      throw new Error(k.t.value("actionIdCannotEmpty"));
    const c = this.cloneMessage(t);
    Object.assign(c, { topic: this.topic }), c.msg.realcontent = t.realcontent;
    const u = { ...this.context };
    s && Object.keys(s).length > 0 && Object.assign(u, { ...s });
    const d = { ...this.params };
    o && Object.keys(o).length > 0 && Object.assign(d, { ...o });
    const f = await this.opts.extendToolbarClick(
      i,
      {
        id: a,
        // 是否是插件应用(建议里面定义appid认为是插件应用的界面行为)
        isPluginApp: !!l,
        appId: l || this.context.srfappid
      },
      u,
      d,
      c
    ), p = (m = f == null ? void 0 : f.data) == null ? void 0 : m[0];
    p && p.content && this.addMessage({
      messageid: Pe(),
      state: 30,
      type: p.type || "DEFAULT",
      role: p.role || "ASSISTANT",
      content: p.content,
      status: "sent"
    });
  }
  /**
   * 销毁
   *
   * @return {*}  {Promise<void>}
   * @memberof AiChatController
   */
  async destroyed() {
    this.evt.reset();
  }
}
class Py {
  /**
   * Creates an instance of AiTopicController.
   * @author tony001
   * @date 2025-02-24 11:02:26
   * @param {IChatController} chat
   */
  constructor(e) {
    /**
     * 话题清单
     *
     * @author tony001
     * @date 2025-02-20 16:02:38
     * @type {Signal<ChatTopic[]>}
     */
    _(this, "topics", X([]));
    /**
     * 激活话题
     *
     * @author tony001
     * @date 2025-02-24 16:02:44
     * @type {(Signal<ITopic | undefined>)}
     */
    _(this, "activedTopic", X(void 0));
    /**
     * 折叠话题侧边栏
     *
     * @author tony001
     * @date 2026-02-05 11:33:34
     * @type {Signal<boolean>}
     */
    _(this, "topicSidebarCollapse", X(!1));
    /**
     * 侧边栏宽度
     * @author tony001
     * @date 2026-02-05 13:48:34
     * @type {Signal<number>}
     */
    _(this, "topicSidebarWidth", X(0));
    /**
     * 是否是临时会话
     *
     * @author tony001
     * @date 2026-02-05 17:26:34
     * @type {Signal<boolean>}
     */
    _(this, "isTempChat", X(!1));
    /**
     * 当前话题配置备份
     *
     * @author tony001
     * @date 2025-02-24 16:02:28
     * @public
     * @type {(ITopicOptions | undefined)}
     */
    _(this, "backupOptions");
    /**
     * 上一次激活话题
     */
    _(this, "preActivedTopic");
    /**
     * 远程会话列表
     */
    _(this, "remoteSessionList", []);
    /**
     * 资源模式
     */
    _(this, "resourceMode", "LOCAL");
    /**
     * 资源选项
     */
    _(this, "resourceOptions");
    this.chat = e, this.computeTopicSidebarWidth();
  }
  /**
   * 设置激活话题
   * @param topic 话题数据
   */
  setActivedTopic(e) {
    this.preActivedTopic = this.activedTopic.value, this.activedTopic.value = e;
  }
  /**
   * 注入资源选项
   * @param resourceOptions
   */
  injectResourceOptions(e) {
    this.resourceMode = (e == null ? void 0 : e.resourceMode) || "LOCAL", this.resourceOptions = e;
  }
  /**
   * 获取历史话题
   *
   * @author tony001
   * @date 2025-02-23 16:02:37
   * @return {*}  {Promise<void>}
   */
  async fetchHistory(e) {
    this.topics.value = [];
    const i = await e.configService(
      e.appid,
      "aitopics",
      e.type
    ).load();
    i && i.length > 0 && (this.resourceMode === "REMOTE" && this.resourceOptions ? (this.remoteSessionList = await this.resourceOptions.getSessionList(), await this.asyncRemoteSession(i)) : i.forEach((r, s) => {
      Object.prototype.hasOwnProperty.call(r, "sequence") || (r.sequence = s), Object.prototype.hasOwnProperty.call(r, "isTop") || (r.isTop = 0), this.topics.value = [...this.topics.value, new It(r)];
    }));
  }
  /**
   * 同步远程会话
   * @param configList config存储数据
   */
  async asyncRemoteSession(e) {
    !this.remoteSessionList || this.remoteSessionList.length === 0 || !e || e.length === 0 || this.remoteSessionList.forEach((t) => {
      const i = e.find((r) => {
        var s;
        return ((s = r.aiChat) == null ? void 0 : s.sessionid) === t.session_id;
      });
      if (i) {
        i.realid = t.realid, i.sequence = t.sequence, i.isTop = t.is_top ? t.is_top : 0, t.caption && (i.caption = t.caption);
        const r = this.topics.value.findIndex(
          (s) => {
            var o;
            return ((o = s.aiChat) == null ? void 0 : o.sessionid) === t.session_id;
          }
        );
        r === -1 ? this.topics.value = [
          ...this.topics.value,
          new It(i)
        ] : (this.topics.value.splice(r, 1, new It(i)), this.topics.value = [...this.topics.value]);
      }
    });
  }
  /**
   * 同步当前话题
   *
   * @author tony001
   * @date 2025-02-23 17:02:43
   * @param {ITopicOptions} options
   * @return {*}  {Promise<void>}
   */
  async asyncTopic(e) {
    this.backupOptions = e;
    const t = this.topics.value.findIndex(
      (r) => r.id === e.id
    ), i = new It(e);
    t !== -1 ? this.topics.value.splice(t, 1, i) : this.topics.value = [...this.topics.value, i], await this.updateTopic(e), this.setActivedTopic(i);
  }
  /**
   * 获取指定标识话题
   * @param topicid
   * @returns
   */
  getCurrentTopicByID(e) {
    const t = this.topics.value.find((i) => i.id === e);
    return t && t.data ? new It({ ...t.data }) : void 0;
  }
  /**
   * 基于话题标识更新当前话题
   * @param topicid 话题标识
   */
  async updateTopicChatByID(e, t) {
    if (!e || !t || !this.backupOptions)
      return;
    const i = this.topics.value.findIndex(
      (r) => r.id === e
    );
    i === -1 || !this.topics.value[i].data.aiChat || (this.topics.value[i].data.aiChat = {
      ...this.topics.value[i].data.aiChat,
      ...t
    }, await this.updateTopic(this.backupOptions));
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
  async removeTopic(e, t, i, r, s) {
    var c;
    let o = !0;
    if (e.beforeDelete && (o = await e.beforeDelete(t, i, r, s)), !o)
      return;
    let a = !1;
    if (r && r.disableStorage)
      a = !0;
    else if (this.resourceMode === "LOCAL")
      a = await at.deleteData(
        ne.DATA_BASE_NAME,
        ne.DATA_TABLE_NAME,
        r.id
      );
    else if (this.resourceMode === "REMOTE" && this.resourceOptions) {
      if (r.realid)
        a = await this.resourceOptions.deleteSession(r.realid);
      else if (r.aiChat && r.aiChat.sessionid) {
        const u = await this.resourceOptions.getSessionList({
          n_session_id_eq: r.aiChat.sessionid
        });
        u && u.length > 0 ? a = await this.resourceOptions.deleteSession(
          u[0].realid
        ) : a = !0;
      }
    }
    if (!a)
      return;
    const l = this.topics.value.findIndex(
      (u) => u.id === r.id
    );
    l !== -1 && (this.topics.value.splice(l, 1), this.topics.value = [...this.topics.value]), await this.updateTopic(e), this.topics.value.length > 0 && r.id === ((c = this.activedTopic.value) == null ? void 0 : c.id) && this.handleTopicChange(this.topics.value[0]);
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
    ((t = this.activedTopic.value) == null ? void 0 : t.id) !== e.id && (this.setActivedTopic(e), this.chat.switchAiChatController(e));
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
    var s, o;
    const r = this.topics.value.find((a) => a.id === t.id);
    if (this.backupOptions && r && r.aiChat) {
      const { context: a, params: l } = r.aiChat;
      switch (e) {
        case "DELETE":
          await this.removeTopic(
            this.backupOptions,
            a,
            l,
            r,
            i
          );
          break;
        case "RENAME":
        case "PINNED":
          if (e === "PINNED" && (t.data.isTop = t.data.isTop === 0 ? 1 : 0, this.topics.value = [...this.topics.value]), t && !t.disableStorage && (await this.updateTopic(this.backupOptions), t && this.resourceMode === "REMOTE" && this.resourceOptions)) {
            if (t.realid)
              await this.resourceOptions.updateSession(t.realid, {
                caption: t.caption,
                is_top: t.isTop
              });
            else if (t.aiChat && t.aiChat.sessionid) {
              const c = await this.resourceOptions.getSessionList({
                n_session_id_eq: t.aiChat.sessionid
              });
              c && c.length > 0 && await this.resourceOptions.updateSession(
                c[0].realid,
                {
                  caption: t.caption,
                  is_top: t.isTop
                }
              );
            }
          }
          break;
      }
      (o = (s = this.backupOptions).action) == null || o.call(s, e, a, l, t, i);
    }
  }
  /**
   * 新建对话
   *
   * @author tony001
   * @date 2025-03-18 18:03:49
   * @return {*}  {Promise<void>}
   */
  async newTopic(e, t) {
    var u;
    if (!e)
      return;
    const i = this.getCurrentTopicByID(e);
    if (!i)
      return;
    const r = gi(i.id), s = this.topics.value.filter((d) => d.id.startsWith(r));
    t && i.aiChat && (i.data.aiChat = {
      ...i.aiChat,
      ...t
    });
    let o = "";
    i.captionMode === "default" ? o = "".concat((u = i.sourceCaption) == null ? void 0 : u.split("_")[0], "_").concat(s.length) : o = k.t.value("newConversation");
    const a = Math.max(
      ...this.topics.value.map((d) => d.sequence)
    ), l = {
      appid: i.appid,
      // 源头数据id@当前时间戳
      id: "".concat(r, "@").concat(Date.now()),
      type: i.type,
      captionMode: i.captionMode,
      caption: o,
      sourceCaption: i.sourceCaption,
      url: i.url,
      aiChat: i.aiChat,
      sequence: a + 1,
      isTop: 0,
      disableStorage: i.disableStorage
    }, c = new It(l);
    this.topics.value = [...this.topics.value, c], this.backupOptions && await this.updateTopic(this.backupOptions), this.handleTopicChange(c);
  }
  /**
   * 清空话题
   * - 当前激活项不清空
   * @return {*}  {Promise<void>}
   * @memberof AiTopicController
   */
  async clearTopic() {
    var r;
    const e = this.topics.value.find(
      (s) => {
        var o;
        return s.id === ((o = this.activedTopic.value) == null ? void 0 : o.id);
      }
    );
    if (!this.backupOptions || !e)
      return;
    let t = !0;
    if (this.backupOptions.beforeDelete && (t = await this.backupOptions.beforeDelete(
      e.aiChat.context,
      e.aiChat.params,
      e,
      void 0,
      !0
    )), !t)
      return;
    let i = !1;
    if (this.resourceMode === "LOCAL")
      await Promise.all(
        this.topics.value.map((s) => {
          if (s.id !== (e == null ? void 0 : e.id) && !s.disableStorage)
            return at.deleteData(
              ne.DATA_BASE_NAME,
              ne.DATA_TABLE_NAME,
              s.id
            );
        })
      ), i = !0;
    else if (this.resourceMode === "REMOTE")
      if (e && this.resourceOptions) {
        const s = (r = e.aiChat) == null ? void 0 : r.sessionid;
        s ? i = await this.resourceOptions.clearAllSession(s) : i = !0;
      } else
        i = !0;
    i && (this.topics.value = e ? [e] : [], await this.updateTopic(this.backupOptions));
  }
  /**
   * 更新话题标题
   * @param topicId
   * @param message
   */
  async updateTopicCaption(e, t) {
    const i = this.topics.value.find((r) => r.id === e);
    i && i.caption !== t && (i.data.caption = t, i.data.captionComputed = !0, this.topics.value = [...this.topics.value], this.backupOptions && await this.updateTopic(this.backupOptions));
  }
  /**
   * 更新话题数据
   *
   * @param {ITopicOptions} options 话题配置
   * @return {*}  {Promise<void>}
   * @memberof AiTopicController
   */
  async updateTopic(e) {
    if (!e)
      return;
    const t = [];
    this.topics.value.forEach((r) => {
      r.disableStorage || t.push({
        appid: r.appid,
        id: r.id,
        type: r.type,
        captionMode: r.captionMode,
        captionComputed: !!r.captionComputed,
        caption: r.caption || r.sourceCaption,
        sourceCaption: r.sourceCaption,
        url: r.url,
        aiChat: r.aiChat,
        isTop: r.isTop,
        sequence: r.sequence
      });
    });
    const i = e.configService(
      e.appid,
      "aitopics",
      e.type
    );
    await (i == null ? void 0 : i.save(t));
  }
  /**
   * 计算话题侧边栏宽度
   */
  computeTopicSidebarWidth() {
    this.topicSidebarWidth.value = this.topicSidebarCollapse.value === !0 ? 42 : 200;
  }
  /**
   * 切换话题侧边栏折叠状态
   */
  switchTopicSidebarCollapse() {
    this.topicSidebarCollapse.value = !this.topicSidebarCollapse.value, this.computeTopicSidebarWidth();
  }
  /**
   * 全局新建会话
   * @returns
   */
  globalNewTopic() {
    if (this.activedTopic.value)
      if (this.isTempChat.value) {
        if (!this.backupOptions)
          return;
        this.exitTempChat();
        const e = this.backupOptions.aiChat;
        this.newTopic(this.backupOptions.id, {
          activeAIAgentID: e.activeAIAgentID,
          sessionid: "".concat(gi(
            e.sessionid
          ), "@").concat((/* @__PURE__ */ new Date()).getTime())
        });
      } else {
        const e = this.activedTopic.value.aiChat;
        this.newTopic(this.activedTopic.value.id, {
          activeAIAgentID: e.activeAIAgentID,
          sessionid: "".concat(gi(e.sessionid), "@").concat((/* @__PURE__ */ new Date()).getTime())
        });
      }
  }
  /**
   * 进入临时会话
   */
  enterTempChat() {
    if (this.isTempChat.value = !0, !this.backupOptions) {
      console.error(k.t.value("temporarySessionFailed"));
      return;
    }
    const e = gi(this.backupOptions.id), t = Fu("TEMP"), i = Math.max(
      ...this.topics.value.map((a) => a.sequence)
    ), r = {
      ...this.backupOptions.aiChat,
      sessionid: t
    }, s = {
      appid: this.backupOptions.appid,
      id: "".concat(e, "@").concat(Date.now()),
      type: this.backupOptions.type,
      captionMode: this.backupOptions.captionMode,
      caption: k.t.value("temporarySession"),
      sourceCaption: k.t.value("temporarySession"),
      url: this.backupOptions.url,
      aiChat: r,
      sequence: i + 1,
      isTop: 0,
      disableStorage: !0,
      isShow: !1
    }, o = new It(s);
    this.topics.value = [...this.topics.value, o], this.handleTopicChange(o);
  }
  /**
   * 退出临时会话
   * @param isSwitchTopic 是否切换激活会话
   * @returns
   */
  exitTempChat() {
    this.isTempChat.value = !1;
    const e = this.topics.value.findIndex(
      (t) => t.disableStorage === !0 && t.isShow === !1
    );
    e !== -1 && (this.topics.value.splice(e, 1), this.topics.value = [...this.topics.value]);
  }
}
class Sf {
  constructor(e) {
    this.aiChat = e;
  }
}
class Ly extends Sf {
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
      i = await t.onClick(
        e,
        t,
        this.aiChat.context,
        this.aiChat.params
      );
    else {
      const r = this.aiChat.opts.extendToolbarClick;
      r ? i = await r(
        e,
        t,
        this.aiChat.context,
        this.aiChat.params,
        {}
      ) : console.error(k.t.value("extensionToolbarClick"));
    }
    i && i.data && i.data.length > 0 && i.data.forEach((r) => {
      const s = {
        id: r.id,
        type: r.type,
        data: r.data || {},
        metadata: r.metadata || {}
      };
      t.id && Object.assign(s.metadata, { actionId: t.id }), this.aiChat.addMaterial(s);
    });
  }
}
class zy extends Sf {
  /**
   * 执行操作
   *
   * @author tony001
   * @date 2025-02-28 15:02:27
   * @return {*}  {Promise<void>}
   */
  async excuteAction(e, t) {
    const i = this.aiChat.opts.uploader, {
      folder: r,
      accept: s,
      maxSize: o,
      multiple: a,
      onError: l,
      onSelect: c,
      onUpload: u,
      onSuccess: d,
      onDownLoad: f,
      getDownLoadUrl: p,
      onProgress: m,
      globalDownloadPrifix: v
    } = i, y = {
      folder: r,
      globalDownloadPrifix: v,
      multiple: a || !0,
      accept: s || "*/*",
      maxSize: o || 5 * 1024 * 1024,
      onSelect: (b) => {
        c == null || c(b), b.length > 0 && b.forEach((w) => {
          const C = this.buildMaterialObject(r, w);
          Object.assign(C.metadata, { state: "uploading" }), this.aiChat.addMaterial(C);
        });
      },
      onUpload: async (b, w) => u(b, w, {
        context: this.aiChat.context,
        params: this.aiChat.params
      }),
      onDownLoad: f,
      getDownLoadUrl: p,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onSuccess: (b, w) => {
        const C = {
          id: b.id,
          type: "ossfile",
          data: {
            id: b.id,
            name: b.name,
            folder: r
          },
          metadata: {
            ext: b.ext,
            fileext: b.fileext,
            fileid: b.fileid,
            filename: b.filename,
            size: b.size,
            filesize: b.filesize,
            state: "successed",
            folder: r
          }
        };
        this.aiChat.replaceMaterial(w.name, C), d == null || d(b, w);
      },
      onError: (b, w) => {
        const C = this.buildMaterialObject(r, w);
        Object.assign(C.metadata, { state: "failed" }), this.aiChat.replaceMaterial(w.name, C), l == null || l(b, w);
      },
      onProgress: (b, w) => {
        m == null || m(b, w);
      }
    };
    new ag(y).openFilePicker();
  }
  /**
   * 构建素材对象
   * @param folder
   * @param file
   * @returns
   */
  buildMaterialObject(e, t) {
    return {
      id: t.name,
      type: "ossfile",
      data: {
        name: t.name,
        id: t.name,
        folder: e
      },
      metadata: {
        size: t.size,
        type: t.type,
        lastModified: t.lastModified,
        folder: e
      }
    };
  }
}
class or {
  static getMaterialHelper(e, t) {
    switch (e) {
      case "ossfile":
        return new zy(t);
      default:
        return new Ly(t);
    }
  }
}
class Tf {
  /**
   * Creates an instance of ChatBaseController.
   * @author tony001
   * @date 2026-05-15 14:05:01
   * @memberof ChatBaseController
   */
  constructor() {
    /**
     * @description 默认模式（聊天框）和话题模式（支持多话题切换），聊天框为默认模式
     * @author tony001
     * @date 2026-05-15 13:05:03
     * @protected
     * @type {('DEFAULT' | 'TOPIC')}
     * @memberof ChatBaseController
     */
    _(this, "mode", "DEFAULT");
    /**
     * @description 容器配置备份
     * @author tony001
     * @date 2026-05-15 13:05:26
     * @protected
     * @type {(IContainerOptions | undefined)}
     * @memberof ChatBaseController
     */
    _(this, "backupChatOptions");
    /**
     * @description 资源配置数据
     * @author tony001
     * @date 2026-05-15 13:05:16
     * @type {(IResourceOptions | undefined)}
     * @memberof ChatBaseController
     */
    _(this, "resourceOptions");
    /**
     * @description 话题控制器
     * @author tony001
     * @date 2026-05-15 13:05:38
     * @type {AiTopicController}
     * @memberof ChatBaseController
     */
    _(this, "aiTopic");
    /**
     * @description 话题map
     * @author tony001
     * @date 2026-05-15 13:05:17
     * @protected
     * @type {Map<string, AiChatController>}
     * @memberof ChatBaseController
     */
    _(this, "aiTopicMap", /* @__PURE__ */ new Map());
    this.aiTopic = new Py(this);
  }
  /**
   * @description 聊天控制器
   * @author tony001
   * @date 2026-05-15 13:05:55
   * @readonly
   * @type {(AiChatController | undefined)}
   * @memberof ChatBaseController
   */
  get aiChat() {
    var t;
    let e = this.aiTopicMap.get("".concat((t = this.aiTopic.activedTopic.value) == null ? void 0 : t.id));
    if (!e && this.backupChatOptions && this.backupChatOptions.topicOptions && this.backupChatOptions.topicOptions.ingnoreAsyncTopic) {
      const i = this.aiTopicMap.entries().next().value;
      e = i ? i[1] : void 0;
    }
    return e;
  }
  /**
   * @description 初始化IndexDB
   * @author tony001
   * @date 2026-05-15 13:05:37
   * @returns {*}  {Promise<void>}
   * @memberof ChatBaseController
   */
  async initIndexDB() {
    await at.checkTableExists(
      ne.DATA_BASE_NAME,
      ne.DATA_TABLE_NAME
    ) || await at.createTable(
      ne.DATA_BASE_NAME,
      ne.DATA_TABLE_NAME,
      ne.DATA_TABLE_KEY_NAME,
      !1
    );
  }
  /**
   * @description 创建聊天窗口(会同时显示出来)
   * @author tony001
   * @date 2026-05-15 14:05:11
   * @param {IContainerOptions} opts
   * @returns {*}  {Promise<AiChatController>}
   * @memberof ChatBaseController
   */
  async create(e) {
    var o;
    e.chatOptions.language && k.setLanguage(e.chatOptions.language), e.chatOptions.locale && k.setLocale(e.chatOptions.locale), this.resourceOptions = e.resourceOptions, (((o = e.resourceOptions) == null ? void 0 : o.resourceMode) || "LOCAL") === "LOCAL" && await this.initIndexDB(), this.backupChatOptions = e;
    const i = e.chatOptions;
    this.setupContainer(e, i), !i.aiAgentlist && i.fetchAgentList && (i.aiAgentlist = await i.fetchAgentList()), !i.aiknowledgeBasesList && i.fetchKnowledgeBaseList && i.enableKnowledgeBaseSelect ? i.aiknowledgeBasesList = await i.fetchKnowledgeBaseList() : i.aiknowledgeBasesList = [];
    let r;
    !e.chatOptions.isSimple && e.mode && e.mode === "TOPIC" ? (this.aiTopic.injectResourceOptions(e.resourceOptions), await this.aiTopic.fetchHistory(e.topicOptions), r = e.topicOptions, Object.assign(r, {
      aiChat: {
        caption: i.caption,
        context: i.context,
        params: i.params,
        appDataEntityId: i.appDataEntityId,
        sessionid: i.sessionid,
        contentToolbarItems: i.contentToolbarItems,
        footerToolbarItems: i.footerToolbarItems,
        questionToolbarItems: i.questionToolbarItems,
        otherToolbarItems: i.otherToolbarItems,
        appendCurData: i.appendCurData,
        appendCurContent: i.appendCurContent,
        enableAIAgentChange: i.enableAIAgentChange,
        activeAIAgentID: i.activeAIAgentID,
        srfMode: i.srfMode,
        srfScope: i.srfScope,
        appendCurResource: i.appendCurResource
      }
    }), r.ingnoreAsyncTopic ? this.aiTopic.setActivedTopic(void 0) : (this.syncHistoryOptions(
      r,
      i,
      e.resourceOptions
    ), await this.aiTopic.asyncTopic(r))) : this.aiTopic.setActivedTopic(void 0), Object.assign(i, {
      topicId: r == null ? void 0 : r.id,
      topic: r,
      aiTopic: this.aiTopic
    });
    const s = new Ec(i, this.resourceOptions);
    return this.aiTopicMap.set("".concat(r == null ? void 0 : r.id), s), e.mode && e.mode === "TOPIC" && this.aiTopic.isTempChat.value ? this.aiTopic.enterTempChat() : this.renderChatContent(e, i, s), s;
  }
  /**
   * @description 同步历史参数(历史激活标识、历史会话标识)
   * @author tony001
   * @date 2026-05-15 14:05:40
   * @protected
   * @param {Record<string, any>} topicOptions
   * @param {Record<string, any>} chatOptions
   * @param {IResourceOptions} resourceOptions
   * @returns {*}  {void}
   * @memberof ChatBaseController
   */
  syncHistoryOptions(e, t, i) {
    if (e.disableStorage) {
      const o = Fu("TEMP");
      t.sessionid = o, e.aiChat.sessionid = o, e.caption = k.t.value("temporarySession"), e.sourceCaption = k.t.value("temporarySession");
      return;
    }
    const r = this.aiTopic.getCurrentTopicByID(
      e.id
    );
    if (r && (e.sequence = r.sequence, e.isTop = r.isTop), !t.activeAIAgentID) {
      if (r && r.aiChat && r.aiChat.activeAIAgentID)
        t.activeAIAgentID = r.aiChat.activeAIAgentID, e.aiChat.activeAIAgentID = r.aiChat.activeAIAgentID;
      else if (t.aiAgentlist && t.aiAgentlist.length > 0 && !t.activeAIAgentID) {
        const o = t.aiAgentlist.find(
          (a) => a.default === 1
        );
        o ? (t.activeAIAgentID = o.id, e.aiChat.activeAIAgentID = o.id) : (t.activeAIAgentID = t.aiAgentlist[0].id, e.aiChat.activeAIAgentID = t.aiAgentlist[0].id);
      }
    }
    r && r.aiChat && r.aiChat.sessionid && (t.sessionid = r.aiChat.sessionid, e.aiChat.sessionid = r.aiChat.sessionid);
    const s = i.resourceMode;
    s === "LOCAL" ? e.captionMode !== "default" ? (e.sourceCaption = k.t.value("newConversation"), r && r.caption ? e.caption = r.caption : e.caption = k.t.value("newConversation")) : e.sourceCaption = e.caption : s === "REMOTE" && (e.sourceCaption = e.caption, r && r.caption && (e.caption = r.caption)), r && (e.captionComputed = !!r.captionComputed), s === "REMOTE" && r && r.realid && (e.realid = r.realid);
  }
  /**
   * @description 切换聊天控制器
   * @author tony001
   * @date 2026-05-15 14:05:04
   * @param {ChatTopic} topic
   * @memberof ChatBaseController
   */
  switchAiChatController(e) {
    const t = {
      ...this.backupChatOptions.chatOptions
    };
    e.aiChat && Object.assign(t, {
      caption: e.aiChat.caption,
      context: e.aiChat.context,
      params: e.aiChat.params,
      sessionid: e.aiChat.sessionid,
      contentToolbarItems: e.aiChat.contentToolbarItems,
      footerToolbarItems: e.aiChat.footerToolbarItems,
      questionToolbarItems: e.aiChat.questionToolbarItems,
      otherToolbarItems: e.aiChat.otherToolbarItems,
      appendCurData: e.aiChat.appendCurData,
      appendCurContent: void 0,
      activeAIAgentID: e.aiChat.activeAIAgentID,
      enableAIAgentChange: e.aiChat.enableAIAgentChange,
      srfMode: e.aiChat.srfMode,
      srfScope: e.aiChat.srfScope,
      appendCurResource: e.aiChat.appendCurResource,
      appDataEntityId: e.aiChat.appDataEntityId,
      topicId: e.id,
      topic: e,
      aiTopic: this.aiTopic,
      extendToolbarClick: this.backupChatOptions.chatOptions.extendToolbarClick,
      recommendPrompt: this.backupChatOptions.chatOptions.recommendPrompt,
      chatDigest: this.backupChatOptions.chatOptions.chatDigest,
      openLinkView: this.backupChatOptions.chatOptions.openLinkView
    });
    let i;
    this.aiTopicMap.has("".concat(e.id)) ? (i = this.aiTopicMap.get("".concat(e.id)), i.updateAIChat()) : (i = new Ec(t, this.resourceOptions), this.aiTopicMap.set("".concat(e.id), i)), this.renderSwitchedContent(t, i);
  }
  /**
   * @description 关闭聊天窗口
   * @author tony001
   * @date 2026-05-15 14:05:06
   * @memberof ChatBaseController
   */
  close() {
    this.aiTopicMap.forEach((e) => {
      e.destroyed();
    });
  }
}
class By extends Tf {
  constructor() {
    super(...arguments);
    /**
     * @description 聊天框容器
     * @author tony001
     * @date 2026-05-15 13:05:46
     * @protected
     * @type {HTMLDivElement}
     * @memberof ModalChatController
     */
    _(this, "container");
  }
  /**
   * @description 创建容器，渲染loading状态
   * @author tony001
   * @date 2026-05-15 14:05:47
   * @protected
   * @param {IContainerOptions} opts
   * @param {Record<string, any>} chatOptions
   * @memberof ModalChatController
   */
  setupContainer(t, i) {
    var r, s, o;
    this.close(), this.container = document.createElement("div"), this.container.classList.add("ibiz-ai-chat"), document.body.appendChild(this.container), Ie(
      ke(ys, {
        mode: t.mode ? t.mode : "DEFAULT",
        containerOptions: t.containerOptions,
        caption: i.caption,
        autoClose: (r = t.containerOptions) == null ? void 0 : r.autoClose,
        openMode: (s = t.containerOptions) == null ? void 0 : s.openMode,
        hideTopicSidebar: ((o = t.topicOptions) == null ? void 0 : o.hideTopicSidebar) || !1,
        close: () => {
          this.close(), i && i.closed && i.closed(i.context, i.params, []);
        },
        fullscreen: (a) => {
          i && i.fullscreen && i.fullscreen(
            a,
            i.context,
            i.params
          );
        },
        minimize: (a) => {
          i && i.minimize && i.minimize(
            a,
            i.context,
            i.params
          );
        },
        isLoading: !0
      }),
      this.container
    );
  }
  /**
   * @description 渲染正式聊天内容
   * @author tony001
   * @date 2026-05-15 14:05:02
   * @protected
   * @param {IContainerOptions} opts
   * @param {Record<string, any>} chatOptions
   * @param {AiChatController} aiChat
   * @memberof ModalChatController
   */
  renderChatContent(t, i, r) {
    var s, o, a, l;
    Ie(
      ke(ys, {
        aiChat: r,
        aiTopic: this.aiTopic,
        mode: t.mode ? t.mode : "DEFAULT",
        containerOptions: t.containerOptions,
        caption: i.caption,
        enableBackFill: (s = t.containerOptions) == null ? void 0 : s.enableBackFill,
        contentToolbarItems: i.contentToolbarItems,
        footerToolbarItems: i.footerToolbarItems,
        questionToolbarItems: i.questionToolbarItems,
        autoClose: (o = t.containerOptions) == null ? void 0 : o.autoClose,
        openMode: (a = t.containerOptions) == null ? void 0 : a.openMode,
        hideTopicSidebar: ((l = t.topicOptions) == null ? void 0 : l.hideTopicSidebar) || !1,
        close: () => {
          this.close(), i.closed && i.closed(
            i.context,
            i.params,
            r.getAllMessages()
          );
        },
        fullscreen: (c) => {
          i.fullscreen && i.fullscreen(
            c,
            i.context,
            i.params
          );
        },
        minimize: (c) => {
          i.minimize && i.minimize(
            c,
            i.context,
            i.params
          );
        },
        isLoading: !1
      }),
      this.container
    );
  }
  /**
   * @description 渲染切换后的内容
   * @author tony001
   * @date 2026-05-15 14:05:38
   * @protected
   * @param {Record<string, any>} opts
   * @param {AiChatController} aiChat
   * @memberof ModalChatController
   */
  renderSwitchedContent(t, i) {
    var r, s, o, a, l, c, u, d, f, p;
    this.container && (Ie(null, this.container), Ie(
      ke(ys, {
        aiChat: i,
        aiTopic: this.aiTopic,
        mode: (r = this.backupChatOptions) != null && r.mode ? this.backupChatOptions.mode : "DEFAULT",
        containerOptions: (s = this.backupChatOptions) == null ? void 0 : s.containerOptions,
        caption: t.caption,
        enableBackFill: (a = (o = this.backupChatOptions) == null ? void 0 : o.containerOptions) == null ? void 0 : a.enableBackFill,
        contentToolbarItems: t.contentToolbarItems,
        footerToolbarItems: t.footerToolbarItems,
        questionToolbarItems: t.questionToolbarItems,
        autoClose: (c = (l = this.backupChatOptions) == null ? void 0 : l.containerOptions) == null ? void 0 : c.autoClose,
        openMode: (d = (u = this.backupChatOptions) == null ? void 0 : u.containerOptions) == null ? void 0 : d.openMode,
        hideTopicSidebar: ((p = (f = this.backupChatOptions) == null ? void 0 : f.topicOptions) == null ? void 0 : p.hideTopicSidebar) || !1,
        close: () => {
          this.close(), t.closed && t.closed(t.context, t.params, i.getAllMessages());
        },
        fullscreen: (m) => {
          t.fullscreen && t.fullscreen(m, t.context, t.params);
        },
        minimize: (m) => {
          t.minimize && t.minimize(m, t.context, t.params);
        },
        isLoading: !1
      }),
      this.container
    ));
  }
  /**
   * @description 隐藏聊天窗口(必须先创建)
   * @author tony001
   * @date 2026-05-15 13:05:41
   * @memberof ModalChatController
   */
  hidden() {
    this.container && (this.container.style.display = "none");
  }
  /**
   * @description 显示聊天窗窗口(必须先创建)
   * @author tony001
   * @date 2026-05-15 13:05:53
   * @memberof ModalChatController
   */
  show() {
    this.container && (this.container.style.display = "flex");
  }
  /**
   * @description 关闭聊天窗口
   * @author tony001
   * @date 2026-05-15 13:05:06
   * @memberof ModalChatController
   */
  close() {
    super.close(), this.container && (Ie(null, this.container), this.container.remove(), this.container = void 0);
  }
}
const Zy = new By();
class Fy extends Tf {
  constructor() {
    super(...arguments);
    /**
     * @description 挂载容器
     * @author tony001
     * @date 2026-05-15 15:05:30
     * @protected
     * @type {HTMLElement}
     * @memberof FlatChatController
     */
    _(this, "container");
  }
  /**
   * @description 创建平铺聊天
   * @author tony001
   * @date 2026-05-15 15:05:15
   * @param {IContainerOptions} opts
   * @returns {*}  {Promise<AiChatController>}
   * @memberof FlatChatController
   */
  async create(t) {
    var i;
    if (this.container = (i = t.containerOptions) == null ? void 0 : i.container, !this.container)
      throw new Error("container is required");
    return t.chatOptions.isSimple && (t.chatOptions.autoQuestion = !1), super.create(t);
  }
  /**
   * @description 创建容器，渲染loading状态
   * @author tony001
   * @date 2026-05-15 15:05:33
   * @protected
   * @param {IContainerOptions} opts
   * @param {Record<string, any>} chatOptions
   * @memberof FlatChatController
   */
  setupContainer(t, i) {
    var r, s;
    if (t.chatOptions.isSimple)
      return Ie(
        ke(Oc, {
          isLoading: !0,
          placeholder: t.placeholder
        }),
        this.container
      );
    Ie(
      ke(bs, {
        mode: t.mode ? t.mode : "DEFAULT",
        caption: i.caption,
        enableBackFill: (r = t.containerOptions) == null ? void 0 : r.enableBackFill,
        hideTopicSidebar: ((s = t.topicOptions) == null ? void 0 : s.hideTopicSidebar) || !1,
        isLoading: !0
      }),
      this.container
    );
  }
  /**
   * @description 渲染正式聊天内容
   * @author tony001
   * @date 2026-05-15 15:05:51
   * @protected
   * @param {IContainerOptions} opts
   * @param {Record<string, any>} chatOptions
   * @param {AiChatController} aiChat
   * @memberof FlatChatController
   */
  renderChatContent(t, i, r) {
    var s, o;
    if (t.chatOptions.isSimple)
      return Ie(
        ke(Oc, {
          aiChat: r,
          isLoading: !1,
          placeholder: t.placeholder,
          questionToolbarItems: i.questionToolbarItems
        }),
        this.container
      );
    Ie(
      ke(bs, {
        aiChat: r,
        aiTopic: this.aiTopic,
        mode: t.mode ? t.mode : "DEFAULT",
        caption: i.caption,
        enableBackFill: (s = t.containerOptions) == null ? void 0 : s.enableBackFill,
        contentToolbarItems: i.contentToolbarItems,
        footerToolbarItems: i.footerToolbarItems,
        questionToolbarItems: i.questionToolbarItems,
        hideTopicSidebar: ((o = t.topicOptions) == null ? void 0 : o.hideTopicSidebar) || !1,
        isLoading: !1
      }),
      this.container
    );
  }
  /**
   * @description 渲染切换聊天后的内容
   * @author tony001
   * @date 2026-05-15 15:05:08
   * @protected
   * @param {Record<string, any>} opts
   * @param {AiChatController} aiChat
   * @memberof FlatChatController
   */
  renderSwitchedContent(t, i) {
    var r, s, o, a, l;
    this.container && (Ie(null, this.container), Ie(
      ke(bs, {
        aiChat: i,
        aiTopic: this.aiTopic,
        mode: (r = this.backupChatOptions) != null && r.mode ? this.backupChatOptions.mode : "DEFAULT",
        caption: t.caption,
        enableBackFill: (o = (s = this.backupChatOptions) == null ? void 0 : s.containerOptions) == null ? void 0 : o.enableBackFill,
        contentToolbarItems: t.contentToolbarItems,
        footerToolbarItems: t.footerToolbarItems,
        questionToolbarItems: t.questionToolbarItems,
        hideTopicSidebar: ((l = (a = this.backupChatOptions) == null ? void 0 : a.topicOptions) == null ? void 0 : l.hideTopicSidebar) || !1,
        isLoading: !1
      }),
      this.container
    ));
  }
  /**
   * @description 清空聊天窗口
   * @author tony001
   * @date 2026-05-15 18:05:08
   * @memberof FlatChatController
   */
  close() {
    super.close(), this.container && Ie(null, this.container);
  }
}
function Qy() {
  return new Fy();
}
const Vy = new P("chat-input-material"), Mf = (n) => {
  const e = n.controller.materials;
  return /* @__PURE__ */ h("div", { className: Vy.b(), children: e.value.map((t) => /* @__PURE__ */ h(
    fr,
    {
      material: t,
      disabled: !1,
      controller: n.controller
    },
    t.id
  )) });
};
const $e = new P("chat-agent-setting"), Hy = (n) => {
  const { controller: e } = n, t = [
    { label: k.t.value("disabled"), value: 0 },
    { label: k.t.value("enable"), value: 1 },
    { label: k.t.value("automatic"), value: 2 }
  ], i = [
    { label: k.t.value("chunkRerank"), value: "chunkrerank" },
    { label: k.t.value("chunkPageIndex"), value: "chunkpageindex" },
    { label: k.t.value("maxChunks"), value: "maxchunks" },
    { label: k.t.value("chunkThreshold"), value: "chunkthreshold" }
  ], r = $({
    chunkrerank: !1,
    maxchunks: !1,
    chunkthreshold: !1,
    chunkpageindex: !1
  });
  L(() => {
    const p = e.reCallConfig.value;
    r.value = {
      chunkrerank: p.chunkrerank !== 2,
      maxchunks: p.maxchunks !== void 0,
      chunkthreshold: p.chunkthreshold !== void 0,
      chunkpageindex: p.chunkpageindex !== void 0
    };
  }, [e.activeAIAgentID]);
  const s = F(null), o = F(null), [a, l] = V(!1);
  L(() => {
    const p = (m) => {
      var v, y;
      m.target && ((v = o.current) != null && v.contains(m.target)) || ((y = s.current) != null && y.contains(m.target) ? l((g) => !g) : l(!1));
    };
    return document.addEventListener("mousedown", p), () => {
      document.removeEventListener("mousedown", p);
    };
  }, []);
  const c = (p, m) => {
    e.setAIAgentConfig({ [p]: m });
  }, u = (p) => {
    const m = !r.value[p];
    r.value = {
      ...r.value,
      [p]: m
    }, m ? ["maxchunks", "chunkthreshold"].includes(p) && c(p, 0) : c(p, p === "chunkrerank" ? 2 : void 0);
  }, d = (p) => {
    switch (p) {
      case "chunkrerank":
        return /* @__PURE__ */ h(
          Do,
          {
            popperStyle: {
              width: "100%",
              bottom: "inherit",
              top: "calc(100% + 4px)"
            },
            options: t,
            className: $e.e("select"),
            value: e.reCallConfig.value[p],
            onChange: (m) => c(p, m)
          }
        );
      case "chunkpageindex":
        return /* @__PURE__ */ h(
          x2,
          {
            showText: !0,
            className: $e.e("switch"),
            value: e.reCallConfig.value[p],
            onChange: (m) => c(p, m)
          }
        );
      case "maxchunks":
        return /* @__PURE__ */ h(
          pl,
          {
            min: 0,
            max: 20,
            step: 1,
            showText: !0,
            onChange: (m) => c(p, m),
            value: e.reCallConfig.value[p]
          }
        );
      case "chunkthreshold":
        return /* @__PURE__ */ h(
          pl,
          {
            min: 0,
            max: 1,
            step: 0.01,
            showText: !0,
            onChange: (m) => c(p, m),
            value: e.reCallConfig.value[p]
          }
        );
    }
  }, f = (p) => /* @__PURE__ */ h("li", { className: "".concat($e.em("dropdown", "item")), children: [
    /* @__PURE__ */ h("div", { className: $e.em("dropdown", "label"), children: [
      /* @__PURE__ */ h("div", { className: $e.em("dropdown", "label-left"), children: p.label }),
      /* @__PURE__ */ h(
        "div",
        {
          className: $e.em("dropdown", "label-right"),
          onClick: () => u(p.value),
          children: r.value[p.value] ? k.t.value("customize") : k.t.value("default")
        }
      )
    ] }),
    r.value[p.value] ? /* @__PURE__ */ h("div", { className: $e.em("dropdown", "config"), children: d(p.value) }) : void 0
  ] });
  return /* @__PURE__ */ h("div", { className: "".concat($e.b(), " ").concat(n.className ? n.className : ""), children: [
    /* @__PURE__ */ h("div", { className: $e.e("button"), ref: s, children: /* @__PURE__ */ h(
      "span",
      {
        title: k.t.value("recallSettings"),
        className: "".concat($e.em("button", "icon"), " ").concat($e.em("button", "prefix")),
        children: Rg()
      }
    ) }),
    a ? /* @__PURE__ */ h("div", { className: $e.e("dropdown"), ref: o, children: /* @__PURE__ */ h("ul", { className: $e.em("dropdown", "list"), children: i.map((p) => f(p)) }) }) : null
  ] });
};
const K = new P("chat-input"), Ac = window.SpeechRecognition || window.webkitSpeechRecognition, ro = (n) => {
  var w;
  const [e, t] = V(!1);
  Co(_r);
  const i = n.controller.input, r = $(!1), s = F(), o = F(null);
  Ac && !s.current && (s.current = new Ac(), s.current.onstart = () => {
    r.value = !0;
  }, s.current.onend = () => {
    r.value = !1;
  }, s.current.onresult = (C) => {
    var S, M, A, E;
    const x = (A = (M = (S = C.results) == null ? void 0 : S[0]) == null ? void 0 : M[0]) == null ? void 0 : A.transcript;
    x && ((E = o.current) == null || E.commands.insertContent(x));
  });
  const a = () => {
    s.current && (r.value ? s.current.stop() : s.current.start());
  }, l = ve(() => Vn(i.value).length <= 0), c = Ga(async () => {
    var C;
    try {
      const x = Vn(i.value);
      i.value = "", (C = o.current) == null || C.chain().clearContent().run(), await n.controller.question(x);
    } catch (x) {
      console.error(x);
    } finally {
      setTimeout(() => {
        o.current && !o.current.isDestroyed && o.current.chain().focus().run();
      }, 100);
    }
  }, [i]), u = Ga(async () => {
    try {
      n.controller.abortQuestion();
    } catch (C) {
      console.error(C);
    }
  }, [i]), d = (C) => {
    if (C.code === "Enter" && C.key === "Enter" && C.shiftKey === !1)
      return c(), !0;
  }, f = async (C) => {
    await or.getMaterialHelper(
      "ossfile",
      n.controller
    ).excuteAction(C), t(!1);
  }, p = async (C, x) => {
    await or.getMaterialHelper(
      "common",
      n.controller
    ).excuteAction(C, x), t(!1);
  }, m = (C) => {
    n.controller.setActiveAIAgentID(C);
  }, v = (C) => {
    n.controller.setSelectionKnowledge(C);
  }, y = () => {
    n.controller.switchKnowledgeEnableState();
  }, g = async (C) => await n.controller.knowledgeRemoteSearch(C), b = async (C) => await n.controller.searchAIAgent(C);
  return /* @__PURE__ */ h(
    "div",
    {
      className: "".concat(K.b("wrapper"), " ").concat(K.is("expand", n.controller.inputExpand.value)),
      children: [
        /* @__PURE__ */ h("div", { className: K.b("material-wrapper"), children: /* @__PURE__ */ h(Mf, { controller: n.controller }) }),
        /* @__PURE__ */ h("div", { className: K.b("main-wrapper"), children: [
          /* @__PURE__ */ h(
            sa,
            {
              c: n.controller,
              value: i.value,
              disabled: n.controller.isLoading.value,
              onCreate: (C) => {
                o.current = C;
              },
              onChange: (C) => {
                i.value = C;
              },
              onKeyDown: d
            }
          ),
          /* @__PURE__ */ h("div", { className: K.b("action-wrapper"), children: [
            /* @__PURE__ */ h("div", { className: K.b("left-action-wrapper"), children: [
              /* @__PURE__ */ h(
                Do,
                {
                  showBorder: !1,
                  enableSearch: !0,
                  placeholder: "Auto",
                  className: K.b("agent-select"),
                  popperStyle: { height: "220px" },
                  value: n.controller.activeAIAgentID,
                  options: n.controller.agentList.value,
                  icon: () => /* @__PURE__ */ h("div", { title: k.t.value("agent"), children: ad() }),
                  disabled: !n.controller.enableAIAgentChange,
                  onSearch: b,
                  onChange: (C) => m(C)
                }
              ),
              n.controller.enableKnowledgeBaseSelect.value && /* @__PURE__ */ h(
                fd,
                {
                  className: "".concat(K.b("setting-wrapper"), " ").concat(K.is(
                    "disabled",
                    !n.controller.enableKnowledgeBaseState.value
                  )),
                  enableSearch: !0,
                  popperStyle: { height: "220px" },
                  options: n.controller.knowledgeBases.value,
                  icon: () => /* @__PURE__ */ h("div", { title: k.t.value("knowledge"), children: Eo }),
                  placeholder: k.t.value("knowledgeSearch"),
                  value: n.controller.selectionKnowledgeBases.value,
                  onSearch: (C) => g(C),
                  onChange: v,
                  onEnableChange: y
                }
              ),
              n.controller.enableRecallConfigSetting.value && n.controller.agentList.value.length > 0 ? /* @__PURE__ */ h(Hy, { controller: n.controller }) : null
            ] }),
            /* @__PURE__ */ h("div", { className: K.b("right-action-wrapper"), children: [
              /* @__PURE__ */ h(
                "div",
                {
                  className: "".concat(K.be("right-action-wrapper", "action-item"), " ").concat(K.is(
                    "disabled",
                    n.controller.isLoading.value
                  )),
                  title: k.t.value("uploadDocument"),
                  children: /* @__PURE__ */ h(
                    jn,
                    {
                      triggerMode: "hover",
                      content: /* @__PURE__ */ h("div", { className: K.b("pop-actions"), children: [
                        /* @__PURE__ */ h(
                          "div",
                          {
                            className: K.b("pop-action-item"),
                            onClick: (C) => {
                              f(C);
                            },
                            children: [
                              /* @__PURE__ */ h("span", { className: K.b("pop-action-item-icon"), children: /* @__PURE__ */ h(_o, {}) }),
                              /* @__PURE__ */ h("span", { className: K.b("pop-action-item-title"), children: k.t.value("documentation") })
                            ]
                          }
                        ),
                        (w = n.questionToolbarItems) == null ? void 0 : w.map((C) => {
                          var x, S, M;
                          return /* @__PURE__ */ h(
                            "div",
                            {
                              className: K.b("pop-action-item"),
                              onClick: (A) => {
                                p(A, C);
                              },
                              children: [
                                /* @__PURE__ */ h("span", { className: K.b("pop-action-item-icon"), children: typeof C.icon == "function" ? C.icon() : ((x = C.icon) == null ? void 0 : x.showIcon) && /* @__PURE__ */ h(We, { children: (S = C.icon) != null && S.cssClass ? /* @__PURE__ */ h("i", { className: C.icon.cssClass }) : (M = C.icon) != null && M.imagePath ? ni(C.icon.imagePath) ? /* @__PURE__ */ h(
                                  "div",
                                  {
                                    dangerouslySetInnerHTML: {
                                      __html: C.icon.imagePath
                                    }
                                  }
                                ) : /* @__PURE__ */ h("img", { src: C.icon.imagePath }) : null }) }),
                                /* @__PURE__ */ h("span", { className: K.b("pop-action-item-title"), children: C.label })
                              ]
                            },
                            C.id
                          );
                        })
                      ] }),
                      position: "top-left",
                      isOpen: e,
                      onToggleOpen: t,
                      children: /* @__PURE__ */ h(od, {})
                    }
                  )
                }
              ),
              /* @__PURE__ */ h(
                "div",
                {
                  title: r.value ? k.t.value("voiceInputProgress") : k.t.value("voiceInput"),
                  className: "".concat(K.be("right-action-wrapper", "action-item"), " ").concat(K.is(
                    "disabled",
                    n.controller.isLoading.value
                  )),
                  onClick: a,
                  children: r.value ? /* @__PURE__ */ h(rd, {}) : /* @__PURE__ */ h(id, {})
                }
              ),
              n.controller.isLoading.value ? /* @__PURE__ */ h(
                "div",
                {
                  title: k.t.value("stopGenerating"),
                  className: "".concat(K.be("right-action-wrapper", "action-item"), " ").concat(K.is("send", !0)),
                  onClick: u,
                  children: /* @__PURE__ */ h(Ag, {})
                }
              ) : /* @__PURE__ */ h(
                "div",
                {
                  title: k.t.value("sendMessage"),
                  className: "".concat(K.be("right-action-wrapper", "action-item"), " ").concat(K.is(
                    "disabled",
                    l.value
                  ), " ").concat(K.is("send", !0)),
                  onClick: c,
                  children: /* @__PURE__ */ h(ed, { className: K.e("send-icon") })
                }
              )
            ] })
          ] })
        ] })
      ]
    }
  );
};
const Re = new P("chat-topic-item"), jy = (n) => {
  const { hasMoreThanOne: e, controller: t, topic: i, onClick: r, onAction: s } = n, o = F(null), a = ve(() => {
    var b;
    return ((b = t.activedTopic.value) == null ? void 0 : b.id) === i.id;
  }), [l, c] = V(!1), u = $([]);
  e ? u.value = [
    {
      id: "PINNED",
      caption: i.isTop ? k.t.value("unpin") : k.t.value("pinTop"),
      icon: i.isTop ? /* @__PURE__ */ h(Qa, {}) : /* @__PURE__ */ h(Kr, {})
    },
    { id: "RENAME", caption: k.t.value("rename"), icon: /* @__PURE__ */ h(Ya, {}) },
    {
      id: "DELETE",
      caption: k.t.value("deleteTopic"),
      icon: /* @__PURE__ */ h(sd, {})
    }
  ] : u.value = [
    {
      id: "PINNED",
      caption: i.isTop ? k.t.value("unpin") : k.t.value("pinTop"),
      icon: i.isTop ? /* @__PURE__ */ h(Qa, {}) : /* @__PURE__ */ h(Kr, {})
    },
    { id: "RENAME", caption: k.t.value("rename"), icon: /* @__PURE__ */ h(Ya, {}) }
  ];
  const d = $(!1), f = (g) => {
    g.stopPropagation(), s("LINK", g);
  }, p = (g, b) => {
    g === "RENAME" ? (d.value = !0, setTimeout(() => {
      var w;
      (w = o.current) == null || w.focus();
    }, 100)) : s(g, b), c(!1);
  }, m = (g) => {
    var b;
    g.stopPropagation(), i.data.caption = (b = g.target) == null ? void 0 : b.value;
  }, v = (g) => {
    g.stopPropagation(), d.value = !1, s("RENAME", g);
  }, y = (g) => {
    g.stopPropagation(), g.key === "Enter" && (d.value = !1);
  };
  return /* @__PURE__ */ h(
    "div",
    {
      className: "".concat(Re.b(), " ").concat(Re.is("active", a.value), " ").concat(Re.is(
        "edit",
        d.value
      )),
      onClick: r.bind(void 0),
      children: [
        /* @__PURE__ */ h("div", { className: Re.e("caption"), title: i.caption, children: d.value ? /* @__PURE__ */ h(
          "input",
          {
            ref: o,
            value: i.caption,
            onBlur: v,
            onKeyDown: y,
            onClick: (g) => g.stopPropagation(),
            onChange: (g) => m(g),
            className: Re.em("caption", "editor")
          }
        ) : /* @__PURE__ */ h("div", { className: Re.em("caption", "readonly"), children: [
          /* @__PURE__ */ h("span", { className: Re.em("caption", "text"), children: i.caption }),
          i.isTop ? /* @__PURE__ */ h("span", { className: Re.em("caption", "icon"), children: /* @__PURE__ */ h(Kr, {}) }) : null
        ] }) }),
        !d.value && /* @__PURE__ */ h("div", { className: Re.e("icon"), children: [
          /* @__PURE__ */ h(
            "span",
            {
              title: k.t.value("jumpMainView"),
              className: Re.em("icon", "item"),
              onClick: f.bind(void 0),
              children: /* @__PURE__ */ h(Tg, { className: Re.b("link-icon") })
            }
          ),
          /* @__PURE__ */ h(
            jn,
            {
              triggerMode: "click",
              actions: u.value,
              position: "bottom",
              isOpen: l,
              onToggleOpen: c,
              onAction: p.bind(void 0),
              children: /* @__PURE__ */ h(
                "span",
                {
                  className: Re.em("icon", "item"),
                  title: k.t.value("more"),
                  children: /* @__PURE__ */ h(Sg, { className: Re.e("more-icon") })
                }
              )
            }
          )
        ] })
      ]
    }
  );
};
const Me = new P("chat-topics"), _f = (n) => {
  const e = F(null), t = $(void 0), i = $([]);
  L(() => {
    const d = [...n.controller.topics.value].sort((f, p) => f.isTop !== p.isTop ? p.isTop ? 1 : -1 : p.sequence - f.sequence);
    i.value = d.filter(
      (f) => {
        var p, m;
        return (m = f.caption) == null ? void 0 : m.toLowerCase().includes(((p = t.value) == null ? void 0 : p.trim().toLowerCase()) || "");
      }
    );
  }, [n.controller.topics.value]);
  const r = ve(() => i.value.length > 1), s = (d) => {
    n.controller.isTempChat.value && n.controller.exitTempChat(), n.controller.handleTopicChange(d);
  }, o = (d, f, p) => {
    n.controller.handleTopicAction(d, f, p);
  }, a = (d) => {
    t.value = d, i.value = n.controller.topics.value.filter(
      (f) => {
        var p, m;
        return (m = f.caption) == null ? void 0 : m.toLowerCase().includes(((p = t.value) == null ? void 0 : p.trim().toLowerCase()) || "");
      }
    );
  };
  L(() => {
    const d = e.current;
    if (!d)
      return;
    const f = setTimeout(() => {
      const p = d.querySelector(
        ".ibiz-chat-topic-item.is-active"
      );
      p == null || p.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 0);
    return () => clearTimeout(f);
  }, [n.controller.activedTopic.value, i.value]);
  const l = () => {
    n.controller.switchTopicSidebarCollapse();
  }, c = (d) => {
    if (d)
      n.controller.enterTempChat();
    else {
      n.controller.exitTempChat();
      let f = n.controller.preActivedTopic;
      if (f || (f = n.controller.topics.value[0]), !f)
        return;
      n.controller.handleTopicChange(f);
    }
  }, u = () => {
    n.controller.globalNewTopic();
  };
  return /* @__PURE__ */ h("div", { className: Me.b(), children: n.controller.topicSidebarCollapse.value === !0 ? /* @__PURE__ */ h("div", { className: Me.e("collapse-container"), children: [
    /* @__PURE__ */ h(
      "div",
      {
        className: Me.e("icon-item"),
        title: k.t.value("openSidebar"),
        onClick: () => l(),
        children: /* @__PURE__ */ h(el, {})
      }
    ),
    n.controller.isTempChat.value === !1 ? /* @__PURE__ */ h(
      "div",
      {
        className: Me.e("icon-item"),
        title: k.t.value("enterSession"),
        onClick: () => c(!0),
        children: /* @__PURE__ */ h(tl, {})
      }
    ) : /* @__PURE__ */ h(
      "div",
      {
        className: Me.e("icon-item"),
        title: k.t.value("exitSession"),
        onClick: () => c(!1),
        children: /* @__PURE__ */ h(nl, {})
      }
    )
  ] }) : /* @__PURE__ */ h(We, { children: [
    /* @__PURE__ */ h("div", { className: Me.e("header"), children: [
      /* @__PURE__ */ h("div", { className: Me.e("icon-container"), children: [
        /* @__PURE__ */ h(
          "div",
          {
            className: Me.e("icon-item"),
            title: k.t.value("collapseSidebar"),
            onClick: () => l(),
            children: /* @__PURE__ */ h(el, {})
          }
        ),
        /* @__PURE__ */ h(
          "div",
          {
            className: Me.e("icon-item"),
            title: k.t.value("newCreateConversation"),
            onClick: () => u(),
            children: /* @__PURE__ */ h(xg, {})
          }
        ),
        n.controller.isTempChat.value === !1 ? /* @__PURE__ */ h(
          "div",
          {
            className: Me.e("icon-item"),
            title: k.t.value("enterSession"),
            onClick: () => c(!0),
            children: /* @__PURE__ */ h(tl, {})
          }
        ) : /* @__PURE__ */ h(
          "div",
          {
            className: Me.e("icon-item"),
            title: k.t.value("exitSession"),
            onClick: () => c(!1),
            children: /* @__PURE__ */ h(nl, {})
          }
        )
      ] }),
      /* @__PURE__ */ h(
        Oo,
        {
          value: t.value,
          placeholder: k.t.value("searchTopics"),
          onChange: a.bind(void 0)
        }
      )
    ] }),
    /* @__PURE__ */ h("div", { ref: e, className: Me.e("main"), children: i.value && i.value.length > 0 ? i.value.map((d) => d.isShow === !1 ? null : /* @__PURE__ */ h(
      jy,
      {
        hasMoreThanOne: r.value,
        topic: d,
        controller: n.controller,
        onClick: () => s(d),
        onAction: (f, p) => o(f, d, p)
      },
      d.id
    )) : /* @__PURE__ */ h("div", { className: Me.e("empty"), children: k.t.value("noTopic") }) }),
    r.value === !0 && /* @__PURE__ */ h("div", { className: Me.e("footer"), children: /* @__PURE__ */ h(
      "div",
      {
        title: k.t.value("clearSession"),
        className: Me.e("action"),
        onClick: () => n.controller.clearTopic(),
        children: [
          /* @__PURE__ */ h(sd, {}),
          /* @__PURE__ */ h("span", { children: k.t.value("clearSession") })
        ]
      }
    ) })
  ] }) });
};
const rn = new P("chat-minimize"), Wy = (n) => {
  const e = F(null), [t, i] = V(""), [r, s] = V(0), o = F(!1), a = {
    x: (window.innerWidth - 86) / window.innerWidth,
    y: (window.innerHeight - 86) / window.innerHeight
  }, l = ve(() => {
    const m = n.controller.messages.value[n.controller.messages.value.length - 1];
    return m ? m.role === "ASSISTANT" && m.state === 20 && m.completed !== !0 : !1;
  }), c = (m) => {
    const v = m.indexOf("<think>"), y = m.indexOf("</think>");
    let g = "", b = "";
    return y === -1 ? (g = m.slice(v + 7), b = "") : (g = m.slice(v + 7, y), b = m.slice(y + 8)), { thoughtContent: g, answerContent: b };
  }, u = ve(() => {
    let m = "";
    if (!l.value)
      return i(""), s(0), m;
    const v = n.controller.messages.value[n.controller.messages.value.length - 1];
    if (m = v.content, v.content && v.content.indexOf("<think>") !== -1) {
      const { thoughtContent: y, answerContent: g } = c(
        v.content
      );
      m = y + g;
    }
    return m;
  }), d = () => {
    Object.assign(e.current.style, {
      left: "".concat(a.x * 100, "%"),
      top: "".concat(a.y * 100, "%")
    }), localStorage.setItem(
      ne.MINIMIZE_STYLY_CHCHE,
      JSON.stringify(a)
    );
  }, f = () => {
    const m = e.current;
    m && (m.onmousedown = (v) => {
      document.body.style.userSelect = "none";
      const y = v.clientX - m.offsetLeft, g = v.clientY - m.offsetTop, b = Date.now(), w = (x) => {
        const S = 56 / window.innerWidth, M = 56 / window.innerHeight, { x: A, y: E } = Vu(
          x.clientX - y,
          x.clientY - g,
          S,
          M
        );
        Object.assign(a, { x: A, y: E }), requestAnimationFrame(() => {
          d();
        });
      }, C = () => {
        const x = Date.now();
        o.current = x - b > 300, document.body.style.userSelect = "", document.removeEventListener("mousemove", w), document.removeEventListener("mouseup", C);
      };
      document.addEventListener("mousemove", w), document.addEventListener("mouseup", C);
    });
  }, p = () => {
    o.current || n.onClick();
  };
  return L(() => {
    const m = localStorage.getItem(ne.MINIMIZE_STYLY_CHCHE);
    if (m) {
      const v = JSON.parse(m);
      $s(v) && Object.assign(a, v);
    }
    d(), f();
  }, []), L(() => {
    if (r < u.value.length) {
      const m = setTimeout(() => {
        i((v) => v + u.value[r]), s((v) => v + 1);
      }, 100);
      return () => clearTimeout(m);
    }
  }, [r, u.value]), /* @__PURE__ */ h(
    "div",
    {
      ref: e,
      title: n.title,
      className: "".concat(rn.b(), " ").concat(rn.is("hidden", !n.isMinimize), " ").concat(rn.is(
        "show-halo",
        l.value
      )),
      onClick: p,
      children: /* @__PURE__ */ h(
        "div",
        {
          className: "".concat(rn.e("content"), " ").concat(rn.is(
            "show-border",
            !l.value
          )),
          children: [
            t && /* @__PURE__ */ h("div", { className: "".concat(rn.em("content", "popover")), children: /* @__PURE__ */ h("div", { className: "typewriter", children: t }) }),
            /* @__PURE__ */ h(kg, {})
          ]
        }
      )
    }
  );
};
const _r = Bu({
  zIndex: 10,
  enableBackFill: !0
});
var Dc, $c, Rc, Pc;
class ys extends ze {
  constructor(t) {
    var i, r;
    super(t);
    _(this, "ns", new P("chat-container"));
    _(this, "containerRef", za());
    _(this, "dragHandle", za());
    /**
     * 窗口样式数据
     *
     * @memberof ChatContainer
     */
    _(this, "data", {
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
    _(this, "disabled", !1);
    /**
     * 最小化是否在拖拽中
     * - 在拖拽时不应触发点击事件
     * @type {boolean}
     * @memberof ChatContainer
     */
    _(this, "isDragging", !1);
    /**
     * 容器上下文
     *
     * @author tony001
     * @date 2025-03-03 16:03:44
     * @type {ContainerContext}
     */
    _(this, "containerContext", {
      zIndex: ((Dc = this.props.containerOptions) == null ? void 0 : Dc.zIndex) || 10,
      enableBackFill: (($c = this.props) == null ? void 0 : $c.enableBackFill) !== void 0 && ((Rc = this.props) == null ? void 0 : Rc.enableBackFill) !== null ? (Pc = this.props) == null ? void 0 : Pc.enableBackFill : !0
    });
    this.state = {
      isFullScreen: !1,
      isMinimize: (t == null ? void 0 : t.openMode) === "minimize" || (t == null ? void 0 : t.openMode) === "autoexpand",
      enableAIMinimize: ((i = t == null ? void 0 : t.containerOptions) == null ? void 0 : i.enableAIMinimize) === !0
    }, (r = t == null ? void 0 : t.aiChat) == null || r.evt.on("onCompleteMessage", () => {
      if (t.autoClose) {
        const { mode: s, duration: o = 3 } = t.autoClose;
        switch (s) {
          case "minimize":
            this.minimize();
            break;
          case "close":
            this.close();
            break;
          case "closetime":
            setTimeout(() => {
              this.close();
            }, o * 1e3);
            break;
        }
      }
      t.openMode === "autoexpand" && this.exitMinimize();
    });
  }
  /**
   * 计算AI窗口样式
   *
   * @return {*}
   * @memberof ChatContainer
   */
  calcWindowStyle() {
    var i, r;
    const t = this.data.showMode === "window" ? this.data.window : this.data.side;
    return {
      left: "".concat(t.x * 100, "%"),
      top: "".concat(t.y * 100, "%"),
      width: "".concat(t.width * 100, "%"),
      height: "".concat(t.height * 100, "%"),
      minWidth: "".concat(this.data.minWidth, "px"),
      minHeight: "".concat(this.data.minHeight, "px"),
      "z-index": ((r = (i = this.props.containerOptions) == null ? void 0 : i.zIndex) == null ? void 0 : r.toString()) || "10"
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
    Object.assign(this.containerRef.current.style, this.calcWindowStyle()), localStorage.setItem(ne.STYLE_CACHE, JSON.stringify(this.data));
  }
  /**
   * 吸附边缘（窗口模式）
   * - 靠近窗口上下边缘(20px) - 自动吸附
   * - 靠近窗口左右边缘(20px) - 靠边模式
   * @memberof ChatContainer
   */
  snapToEdge() {
    const t = 20 / window.innerWidth, i = 20 / window.innerHeight, { x: r, y: s, width: o, height: a } = this.data.window;
    r < t || r + o > 1 - t ? this.calcSideModeStyle(r < t ? "left" : "right") : (s < i && (this.data.window.y = 0), s + a > 1 - i && (this.data.window.y = 1 - a)), this.setStyle();
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
      const i = t.clientX - this.containerRef.current.offsetLeft, r = t.clientY - this.containerRef.current.offsetTop, s = (a) => {
        if (this.disabled)
          return;
        this.data.showMode = "window";
        const { x: l, y: c } = Vu(
          a.clientX - i,
          a.clientY - r,
          this.data.window.width,
          this.data.window.height
        );
        Object.assign(this.data.window, { x: l, y: c }), this.setStyle();
      }, o = () => {
        document.body.style.userSelect = "", document.removeEventListener("mousemove", s), document.removeEventListener("mouseup", o), !this.disabled && this.snapToEdge();
      };
      document.addEventListener("mousemove", s), document.addEventListener("mouseup", o);
    };
  }
  /**
   * 注册对话框边界拖拽
   *
   * @memberof ChatContainer
   */
  registerDragDialogBorder() {
    Nr(this.containerRef.current).resizable({
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
        Nr.modifiers.restrictEdges({ outer: document.body }),
        // 缩放最小宽度
        Nr.modifiers.restrictSize({
          min: { width: this.data.minWidth, height: this.data.minHeight }
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
    this.setState({ isFullScreen: document.fullscreenElement !== null });
  }
  componentDidMount() {
    this.handleFullScreenChange = this.handleFullScreenChange.bind(this);
    const t = localStorage.getItem(ne.STYLE_CACHE);
    if (t) {
      const i = JSON.parse(t);
      i.side && $s(i.side) && i.window && $s(i.window) && Object.assign(this.data, i);
    }
    this.setStyle(), this.registerDragDialog(), this.registerDragDialogBorder(), document.addEventListener("fullscreenchange", this.handleFullScreenChange);
  }
  componentWillUnmount() {
    document.removeEventListener(
      "fullscreenchange",
      this.handleFullScreenChange
    );
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
    this.closeFullScreen(), this.setState({ isMinimize: !0 }), this.props.minimize(!0);
  }
  /**
   * 退出最小化
   *
   * @memberof ChatContainer
   */
  exitMinimize() {
    this.setState({ isMinimize: !1 }), this.props.minimize(!1);
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
    return /* @__PURE__ */ h(_r.Provider, { value: this.containerContext, children: /* @__PURE__ */ h("div", { className: "".concat(this.ns.b()), children: [
      /* @__PURE__ */ h(
        "div",
        {
          className: "".concat(this.ns.e("dialog"), " ").concat(this.ns.is(
            "full-screen",
            this.state.isFullScreen
          ), " ").concat(this.ns.is("hidden", this.state.isMinimize)),
          ref: this.containerRef,
          children: [
            /* @__PURE__ */ h("div", { ref: this.dragHandle, className: this.ns.b("header"), children: [
              /* @__PURE__ */ h("div", { className: this.ns.b("header-caption"), children: this.props.caption || k.t.value("aiAssistant") }),
              /* @__PURE__ */ h("div", { className: this.ns.b("header-action-wrapper"), children: [
                this.state.enableAIMinimize && /* @__PURE__ */ h(
                  "div",
                  {
                    title: k.t.value("minimize"),
                    className: "".concat(this.ns.be(
                      "header-action-wrapper",
                      "action-item"
                    ), " ").concat(this.ns.be("header-action-wrapper", "minimize")),
                    onMouseDown: this.stopPropagation.bind(this),
                    onClick: this.minimize.bind(this),
                    children: /* @__PURE__ */ h(Cg, {})
                  }
                ),
                this.state.isFullScreen ? /* @__PURE__ */ h(
                  "div",
                  {
                    title: k.t.value("exitFullscreen"),
                    className: "".concat(this.ns.be(
                      "header-action-wrapper",
                      "action-item"
                    ), " ").concat(this.ns.be(
                      "header-action-wrapper",
                      "close-full-screen"
                    )),
                    onMouseDown: this.stopPropagation.bind(this),
                    onClick: this.closeFullScreen.bind(this),
                    children: /* @__PURE__ */ h(nd, {})
                  }
                ) : /* @__PURE__ */ h(
                  "div",
                  {
                    title: k.t.value("fullscreen"),
                    className: "".concat(this.ns.be(
                      "header-action-wrapper",
                      "action-item"
                    ), " ").concat(this.ns.be("header-action-wrapper", "full-screen")),
                    onMouseDown: this.stopPropagation.bind(this),
                    onClick: this.fullScreen.bind(this),
                    children: /* @__PURE__ */ h(td, {})
                  }
                ),
                /* @__PURE__ */ h(
                  "div",
                  {
                    title: k.t.value("close"),
                    className: "".concat(this.ns.be(
                      "header-action-wrapper",
                      "action-item"
                    ), " ").concat(this.ns.be("header-action-wrapper", "action-close")),
                    onMouseDown: this.stopPropagation.bind(this),
                    onClick: this.close.bind(this),
                    children: /* @__PURE__ */ h(Qu, {})
                  }
                )
              ] })
            ] }),
            this.props.isLoading ? /* @__PURE__ */ h("div", { className: "".concat(this.ns.be("main", "loading")), children: [
              /* @__PURE__ */ h("div", { className: "".concat(this.ns.be("main", "spinner")) }),
              /* @__PURE__ */ h("div", { className: "".concat(this.ns.be("main", "text")), children: k.t.value("loading") })
            ] }) : this.props.mode === "TOPIC" ? /* @__PURE__ */ h("div", { className: "".concat(this.ns.b("main")), children: [
              !this.props.hideTopicSidebar && /* @__PURE__ */ h(
                "div",
                {
                  className: "".concat(this.ns.be("main", "left")),
                  style: {
                    width: "".concat(this.props.aiTopic.topicSidebarWidth.value, "px")
                  },
                  children: /* @__PURE__ */ h(_f, { controller: this.props.aiTopic })
                }
              ),
              /* @__PURE__ */ h(
                "div",
                {
                  className: "".concat(this.ns.be("main", "right")),
                  style: {
                    width: this.props.hideTopicSidebar ? "100%" : "calc(100% - ".concat(this.props.aiTopic.topicSidebarWidth.value, "px)")
                  },
                  children: [
                    /* @__PURE__ */ h("div", { className: this.ns.b("content"), children: /* @__PURE__ */ h(
                      io,
                      {
                        controller: this.props.aiChat,
                        toolbarItems: this.props.contentToolbarItems
                      }
                    ) }),
                    /* @__PURE__ */ h(
                      sr,
                      {
                        type: "footer",
                        mode: this.props.mode,
                        hideTopicSidebar: this.props.hideTopicSidebar,
                        data: this.props.aiTopic.activedTopic.value,
                        className: "".concat(this.ns.e("toolbar"), " ").concat(this.ns.is(
                          "has-materials",
                          this.props.aiChat.materials.value.length > 0
                        )),
                        controller: this.props.aiChat,
                        items: this.props.footerToolbarItems
                      }
                    ),
                    /* @__PURE__ */ h("div", { className: this.ns.b("footer"), children: /* @__PURE__ */ h(
                      ro,
                      {
                        controller: this.props.aiChat,
                        questionToolbarItems: this.props.questionToolbarItems
                      }
                    ) })
                  ]
                }
              )
            ] }) : /* @__PURE__ */ h("div", { className: "".concat(this.ns.be("main", "default")), children: [
              /* @__PURE__ */ h("div", { className: this.ns.b("content"), children: /* @__PURE__ */ h(
                io,
                {
                  controller: this.props.aiChat,
                  toolbarItems: this.props.contentToolbarItems
                }
              ) }),
              /* @__PURE__ */ h(
                sr,
                {
                  type: "footer",
                  mode: this.props.mode,
                  hideTopicSidebar: this.props.hideTopicSidebar,
                  data: this.props.aiTopic.activedTopic.value,
                  className: "".concat(this.ns.e("toolbar"), " ").concat(this.ns.is(
                    "has-materials",
                    this.props.aiChat.materials.value.length > 0
                  )),
                  controller: this.props.aiChat,
                  items: this.props.footerToolbarItems
                }
              ),
              /* @__PURE__ */ h("div", { className: this.ns.b("footer"), children: /* @__PURE__ */ h(
                ro,
                {
                  controller: this.props.aiChat,
                  questionToolbarItems: this.props.questionToolbarItems
                }
              ) })
            ] })
          ]
        }
      ),
      !this.props.isLoading && /* @__PURE__ */ h(
        Wy,
        {
          title: this.props.caption || k.t.value("aiAssistant"),
          controller: this.props.aiChat,
          isMinimize: this.state.isMinimize,
          onClick: this.exitMinimize.bind(this)
        }
      )
    ] }) });
  }
}
const Uy = Bu({
  enableBackFill: !0
});
var Lc, zc, Bc;
class bs extends ze {
  constructor() {
    super(...arguments);
    _(this, "ns", new P("flat-chat-container"));
    /**
     * 容器上下文
     */
    _(this, "containerContext", {
      enableBackFill: ((Lc = this.props) == null ? void 0 : Lc.enableBackFill) !== void 0 && ((zc = this.props) == null ? void 0 : zc.enableBackFill) !== null ? (Bc = this.props) == null ? void 0 : Bc.enableBackFill : !0
    });
  }
  /**
   * @description 绘制loading
   * @returns {*}
   * @memberof FlatChatContainer
   */
  renderLoading() {
    return /* @__PURE__ */ h("div", { className: "".concat(this.ns.be("main", "loading")), children: [
      /* @__PURE__ */ h("div", { className: "".concat(this.ns.be("main", "spinner")) }),
      /* @__PURE__ */ h("div", { className: "".concat(this.ns.be("main", "text")), children: k.t.value("loading") })
    ] });
  }
  /**
   * @description 绘制内容
   * @memberof FlatChatContainer
   */
  renderContent() {
    if (this.props.aiChat)
      return this.props.aiChat.inited.value ? [
        /* @__PURE__ */ h("div", { className: this.ns.b("content"), children: /* @__PURE__ */ h(
          io,
          {
            controller: this.props.aiChat,
            toolbarItems: this.props.contentToolbarItems
          }
        ) }, 1),
        /* @__PURE__ */ h(
          sr,
          {
            type: "footer",
            mode: this.props.mode,
            hideTopicSidebar: this.props.hideTopicSidebar,
            data: this.props.aiTopic.activedTopic.value,
            className: "".concat(this.ns.e("toolbar"), " ").concat(this.ns.is(
              "has-materials",
              this.props.aiChat.materials.value.length > 0
            )),
            controller: this.props.aiChat,
            items: this.props.footerToolbarItems
          },
          2
        ),
        /* @__PURE__ */ h("div", { className: this.ns.b("footer"), children: /* @__PURE__ */ h(
          ro,
          {
            controller: this.props.aiChat,
            questionToolbarItems: this.props.questionToolbarItems
          }
        ) }, 3)
      ] : this.renderLoading();
  }
  render() {
    return /* @__PURE__ */ h(Uy.Provider, { value: this.containerContext, children: /* @__PURE__ */ h(
      "div",
      {
        className: "".concat(this.ns.b(), " ").concat(this.ns.is("empty-message", !(this.props.aiChat && this.props.aiChat.messages.value.length > 0))),
        children: [
          /* @__PURE__ */ h("div", { className: this.ns.b("header"), children: /* @__PURE__ */ h("div", { className: this.ns.b("header-caption"), children: this.props.caption || k.t.value("aiAssistant") }) }),
          this.props.isLoading ? this.renderLoading() : this.props.mode === "TOPIC" ? /* @__PURE__ */ h("div", { className: "".concat(this.ns.b("main")), children: [
            !this.props.hideTopicSidebar && /* @__PURE__ */ h(
              "div",
              {
                className: "".concat(this.ns.be("main", "left")),
                style: {
                  width: "".concat(this.props.aiTopic.topicSidebarWidth.value, "px")
                },
                children: /* @__PURE__ */ h(_f, { controller: this.props.aiTopic })
              }
            ),
            /* @__PURE__ */ h(
              "div",
              {
                className: "".concat(this.ns.be("main", "right")),
                style: {
                  width: this.props.hideTopicSidebar ? "100%" : "calc(100% - ".concat(this.props.aiTopic.topicSidebarWidth.value, "px)")
                },
                children: this.renderContent()
              }
            )
          ] }) : /* @__PURE__ */ h("div", { className: "".concat(this.ns.be("main", "default")), children: this.renderContent() })
        ]
      }
    ) });
  }
}
const Ic = window.SpeechRecognition || window.webkitSpeechRecognition, W = new P("simple-chat-input"), qy = (n) => {
  var b;
  const [e, t] = V(!1), i = n.controller.input, r = $(!1), s = F(), o = F(null);
  Ic && !s.current && (s.current = new Ic(), s.current.onstart = () => {
    r.value = !0;
  }, s.current.onend = () => {
    r.value = !1;
  }, s.current.onresult = (w) => {
    var x, S, M, A;
    const C = (M = (S = (x = w.results) == null ? void 0 : x[0]) == null ? void 0 : S[0]) == null ? void 0 : M.transcript;
    C && ((A = o.current) == null || A.commands.insertContent(C));
  });
  const a = () => {
    s.current && (r.value ? s.current.abort() : s.current.start());
  }, l = ve(() => Vn(i.value).length <= 0), c = () => {
    var w, C, x;
    try {
      const S = Vn(i.value);
      i.value = "", (w = o.current) == null || w.chain().clearContent().run();
      const M = n.controller.stringlyMaterialResource(!0);
      (x = (C = n.controller.opts).action) == null || x.call(C, "send", {
        content: S,
        resources: M,
        agentId: n.controller.activeAIAgentID,
        knowledgeId: n.controller.getQueryKnowledgeBases()
      });
    } catch (S) {
      console.error(S);
    }
  }, u = (w) => {
    !l.value && w.code === "Enter" && w.key === "Enter" && w.shiftKey === !1 && c();
  }, d = async (w) => {
    await or.getMaterialHelper(
      "ossfile",
      n.controller
    ).excuteAction(w), t(!1);
  }, f = async (w, C) => {
    await or.getMaterialHelper(
      "common",
      n.controller
    ).excuteAction(w, C), t(!1);
  }, p = (w) => {
    n.controller.setActiveAIAgentID(w);
  }, m = (w) => {
    n.controller.setSelectionKnowledge(w);
  }, v = () => {
    n.controller.switchKnowledgeEnableState();
  }, y = async (w) => await n.controller.knowledgeRemoteSearch(w), g = async (w) => await n.controller.searchAIAgent(w);
  return /* @__PURE__ */ h("div", { className: W.b(), children: [
    /* @__PURE__ */ h("div", { className: W.e("body"), children: [
      /* @__PURE__ */ h("div", { className: W.em("body", "wrapper"), children: [
        /* @__PURE__ */ h(Mf, { controller: n.controller }),
        /* @__PURE__ */ h(
          sa,
          {
            value: i.value,
            c: n.controller,
            onCreate: (w) => {
              o.current = w;
            },
            onChange: (w) => {
              i.value = w;
            },
            onKeyDown: u,
            placeholder: n.placeholder,
            disabled: n.controller.isLoading.value
          }
        )
      ] }),
      /* @__PURE__ */ h("div", { className: W.em("body", "operation"), children: [
        /* @__PURE__ */ h(
          jn,
          {
            position: "top",
            triggerMode: "click",
            isOpen: e,
            onToggleOpen: t,
            content: /* @__PURE__ */ h("div", { className: W.b("popup"), children: [
              /* @__PURE__ */ h("div", { onClick: d, className: W.be("popup", "item"), children: [
                /* @__PURE__ */ h("div", { className: W.bem("popup", "item", "icon"), children: /* @__PURE__ */ h(_o, {}) }),
                /* @__PURE__ */ h("div", { className: W.bem("popup", "item", "title"), children: k.t.value("documentation") })
              ] }),
              (b = n.questionToolbarItems) == null ? void 0 : b.map((w) => {
                var C, x, S;
                return /* @__PURE__ */ h(
                  "div",
                  {
                    className: W.be("popup", "item"),
                    onClick: (M) => f(M, w),
                    children: [
                      /* @__PURE__ */ h("div", { className: W.bem("popup", "item", "icon"), children: typeof w.icon == "function" ? w.icon() : ((C = w.icon) == null ? void 0 : C.showIcon) && /* @__PURE__ */ h(We, { children: (x = w.icon) != null && x.cssClass ? /* @__PURE__ */ h("i", { className: w.icon.cssClass }) : (S = w.icon) != null && S.imagePath ? ni(w.icon.imagePath) ? /* @__PURE__ */ h(
                        "div",
                        {
                          dangerouslySetInnerHTML: {
                            __html: w.icon.imagePath
                          }
                        }
                      ) : /* @__PURE__ */ h("img", { src: w.icon.imagePath }) : null }) }),
                      /* @__PURE__ */ h("div", { className: W.bem("popup", "item", "title"), children: w.label })
                    ]
                  },
                  w.id
                );
              })
            ] }),
            children: /* @__PURE__ */ h(
              "div",
              {
                className: "".concat(W.e("icon"), " ").concat(W.em("icon", "upload"), " ").concat(W.em("body", "left")),
                title: k.t.value("uploadDocument"),
                children: /* @__PURE__ */ h(od, {})
              }
            )
          }
        ),
        /* @__PURE__ */ h("div", { className: W.em("body", "right"), children: [
          /* @__PURE__ */ h(
            "div",
            {
              className: "".concat(W.e("icon"), " ").concat(W.em("icon", "voice"), " ").concat(W.is("recording", r.value)),
              title: r.value ? k.t.value("voiceInputProgress") : k.t.value("voiceInput"),
              onClick: a,
              children: r.value ? /* @__PURE__ */ h(rd, {}) : /* @__PURE__ */ h(id, {})
            }
          ),
          /* @__PURE__ */ h(
            "div",
            {
              onClick: c,
              title: k.t.value("sendMessage"),
              className: "".concat(W.e("icon"), " ").concat(W.em("icon", "send"), " ").concat(W.is("disabled", l.value)),
              children: /* @__PURE__ */ h(ed, { className: W.e("send-icon") })
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ h("div", { className: W.e("footer"), children: [
      /* @__PURE__ */ h(
        Do,
        {
          showBorder: !1,
          enableSearch: !0,
          placeholder: "Auto",
          popperStyle: { height: "220px" },
          className: "".concat(W.e("action"), " ").concat(W.em("action", "agent")),
          value: n.controller.activeAIAgentID,
          options: n.controller.agentList.value,
          icon: () => /* @__PURE__ */ h("div", { title: k.t.value("agent"), children: ad() }),
          disabled: !n.controller.enableAIAgentChange,
          onSearch: g,
          onChange: (w) => p(w)
        }
      ),
      n.controller.enableKnowledgeBaseSelect.value && /* @__PURE__ */ h(
        fd,
        {
          className: "".concat(W.e("action"), " ").concat(W.em("action", "knowledge"), " ").concat(W.is(
            "active",
            n.controller.enableKnowledgeBaseState.value
          )),
          enableSearch: !0,
          popperStyle: { height: "220px" },
          options: n.controller.knowledgeBases.value,
          icon: () => /* @__PURE__ */ h("div", { title: k.t.value("knowledge"), children: Eo }),
          placeholder: k.t.value("knowledgeSearch"),
          value: n.controller.selectionKnowledgeBases.value,
          onSearch: (w) => y(w),
          onChange: m,
          onEnableChange: v
        }
      )
    ] })
  ] });
};
class Oc extends ze {
  constructor() {
    super(...arguments);
    _(this, "ns", new P("simple-chat-container"));
  }
  render() {
    return /* @__PURE__ */ h("div", { className: this.ns.b(), children: this.props.isLoading ? /* @__PURE__ */ h("div", { className: this.ns.e("loading"), children: [
      /* @__PURE__ */ h("div", { className: this.ns.em("loading", "spinner") }),
      /* @__PURE__ */ h("div", { className: this.ns.em("loading", "text"), children: k.t.value("loading") })
    ] }) : /* @__PURE__ */ h(
      qy,
      {
        controller: this.props.aiChat,
        placeholder: this.props.placeholder,
        questionToolbarItems: this.props.questionToolbarItems
      }
    ) });
  }
}
export {
  ys as ChatContainer,
  bs as FlatChatContainer,
  Zy as chat,
  Qy as createFlatChat
};
