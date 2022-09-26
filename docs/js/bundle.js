(function () {
  function r(e, n, t) {
    function o(i, f) {
      if (!n[i]) {
        if (!e[i]) {
          var c = "function" == typeof require && require;
          if (!f && c) return c(i, !0);
          if (u) return u(i, !0);
          var a = new Error("Cannot find module '" + i + "'");
          throw ((a.code = "MODULE_NOT_FOUND"), a);
        }
        var p = (n[i] = { exports: {} });
        e[i][0].call(
          p.exports,
          function (r) {
            var n = e[i][1][r];
            return o(n || r);
          },
          p,
          p.exports,
          r,
          e,
          n,
          t
        );
      }
      return n[i].exports;
    }
    for (
      var u = "function" == typeof require && require, i = 0;
      i < t.length;
      i++
    )
      o(t[i]);
    return o;
  }
  return r;
})()(
  {
    1: [
      function (require, module, exports) {
        (function (global) {
          (function () {
            "undefined" != typeof globalThis
              ? globalThis
              : "undefined" != typeof window
              ? window
              : "undefined" != typeof global
              ? global
              : "undefined" != typeof self && self;
            var e = (function (e, t) {
                return (
                  (function (e, t) {
                    e.exports = (function () {
                      var e =
                        /^v?(?:\d+)(\.(?:[x*]|\d+)(\.(?:[x*]|\d+)(\.(?:[x*]|\d+))?(?:-[\da-z\-]+(?:\.[\da-z\-]+)*)?(?:\+[\da-z\-]+(?:\.[\da-z\-]+)*)?)?)?$/i;
                      function t(e) {
                        var t,
                          r = e.replace(/^v/, "").replace(/\+.*$/, ""),
                          n =
                            -1 === (t = r).indexOf("-")
                              ? t.length
                              : t.indexOf("-"),
                          i = r.substring(0, n).split(".");
                        return i.push(r.substring(n + 1)), i;
                      }
                      function r(e) {
                        return isNaN(Number(e)) ? e : Number(e);
                      }
                      function n(t) {
                        if ("string" != typeof t)
                          throw new TypeError(
                            "Invalid argument expected string"
                          );
                        if (!e.test(t))
                          throw new Error(
                            "Invalid argument not valid semver ('" +
                              t +
                              "' received)"
                          );
                      }
                      function i(e, i) {
                        [e, i].forEach(n);
                        for (
                          var s = t(e), o = t(i), a = 0;
                          a < Math.max(s.length - 1, o.length - 1);
                          a++
                        ) {
                          var c = parseInt(s[a] || 0, 10),
                            u = parseInt(o[a] || 0, 10);
                          if (c > u) return 1;
                          if (u > c) return -1;
                        }
                        var f = s[s.length - 1],
                          h = o[o.length - 1];
                        if (f && h) {
                          var d = f.split(".").map(r),
                            p = h.split(".").map(r);
                          for (a = 0; a < Math.max(d.length, p.length); a++) {
                            if (
                              void 0 === d[a] ||
                              ("string" == typeof p[a] &&
                                "number" == typeof d[a])
                            )
                              return -1;
                            if (
                              void 0 === p[a] ||
                              ("string" == typeof d[a] &&
                                "number" == typeof p[a])
                            )
                              return 1;
                            if (d[a] > p[a]) return 1;
                            if (p[a] > d[a]) return -1;
                          }
                        } else if (f || h) return f ? -1 : 1;
                        return 0;
                      }
                      var s = [">", ">=", "=", "<", "<="],
                        o = {
                          ">": [1],
                          ">=": [0, 1],
                          "=": [0],
                          "<=": [-1, 0],
                          "<": [-1],
                        };
                      return (
                        (i.validate = function (t) {
                          return "string" == typeof t && e.test(t);
                        }),
                        (i.compare = function (e, t, r) {
                          !(function (e) {
                            if ("string" != typeof e)
                              throw new TypeError(
                                "Invalid operator type, expected string but got " +
                                  typeof e
                              );
                            if (-1 === s.indexOf(e))
                              throw new TypeError(
                                "Invalid operator, expected one of " +
                                  s.join("|")
                              );
                          })(r);
                          var n = i(e, t);
                          return o[r].indexOf(n) > -1;
                        }),
                        i
                      );
                    })();
                  })((t = { exports: {} })),
                  t.exports
                );
              })(),
              t = function (e) {
                return null == e;
              },
              r = function (e) {
                return Object.getPrototypeOf(e) === Object.prototype;
              },
              n = function (e) {
                return Array.isArray(e);
              },
              i = function (e, s) {
                return (
                  Object.entries(e).forEach(function (o) {
                    var a = o[0],
                      c = o[1];
                    t(c) || (!r(c) && !n(c)) || (e[a] = i(c, s));
                  }),
                  new Proxy(e, {
                    set: function (e, n, o, a) {
                      return (
                        !t(o) && r(o) && (o = i(o, s)),
                        s.set(e, n, (e[n] = o), a),
                        !0
                      );
                    },
                  })
                );
              },
              s = {
                stores: {},
                persistenceDriver: window.localStorage,
                persisted: [],
                subscribers: [],
                watchers: {},
                disableReactivity: !1,
                startingCallbacks: [],
                startedCallbacks: [],
                hasStarted: !1,
                start: function () {
                  var e = this;
                  this.startingCallbacks.forEach(function (e) {
                    return e();
                  }),
                    this.attach(),
                    (this.stores = i(this.stores, {
                      set: function (t, r, n, i) {
                        if (!e.disableReactivity) {
                          e.updateSubscribers(),
                            e.runWatchers(t, r, n, i),
                            (e.disableReactivity = !0);
                          try {
                            e.persisted.forEach(e.updateLocalStorage.bind(e));
                          } catch (e) {}
                          e.disableReactivity = !1;
                        }
                      },
                    })),
                    (this.hasStarted = !0),
                    (this.disableReactivity = !0),
                    Object.entries(this.watchers).forEach(function (t) {
                      var r = t[0];
                      t[1].forEach(function (t) {
                        return e.watch(r, t);
                      });
                    }),
                    (this.disableReactivity = !1),
                    this.startedCallbacks.forEach(function (e) {
                      return e();
                    });
                },
                starting: function (e) {
                  this.startingCallbacks.push(e);
                },
                started: function (e) {
                  this.startedCallbacks.push(e);
                },
                attach: function () {
                  if (
                    !(
                      navigator.userAgent.includes("Node.js") ||
                      navigator.userAgent.includes("jsdom") ||
                      (window.Alpine &&
                        e.compare(window.Alpine.version, "2.7.0", ">="))
                    )
                  )
                    throw new Error(
                      "[Spruce] You must be using Alpine >= 2.5.0 to use Spruce."
                    );
                  var t = this;
                  window.Alpine.addMagicProperty("store", function (e) {
                    return t.subscribe(e), t.stores;
                  });
                },
                store: function (e, t, r) {
                  if (
                    (void 0 === r && (r = !1),
                    "function" == typeof t && (t = t()),
                    r)
                  )
                    try {
                      (this.stores[e] = this.retrieveFromLocalStorage(
                        e,
                        ((n = {}),
                        Object.entries(t)
                          .filter(function (e) {
                            return "function" == typeof e[1];
                          })
                          .forEach(function (e) {
                            return (n[e[0]] = e[1]);
                          }),
                        n)
                      )),
                        this.persisted.includes(e) || this.persisted.push(e);
                    } catch (e) {}
                  var n;
                  return this.stores[e] || (this.stores[e] = t), this.stores[e];
                },
                reset: function (e, t) {
                  this.stores[e] = t;
                },
                subscribe: function (e) {
                  return (
                    this.subscribers.includes(e) || this.subscribers.push(e),
                    this.stores
                  );
                },
                updateSubscribers: function () {
                  this.subscribers
                    .filter(function (e) {
                      return !!e.__x;
                    })
                    .forEach(function (e) {
                      e.__x.updateElements(e);
                    });
                },
                retrieveFromLocalStorage: function (e, t) {
                  void 0 === t && (t = {});
                  var r = this.persistenceDriver.getItem("__spruce:" + e);
                  if (!r) return null;
                  var n = JSON.parse(r);
                  return (
                    "object" == typeof n &&
                      (delete (n = Object.assign(t, n)).__watchers,
                      delete n.__key_name),
                    n
                  );
                },
                updateLocalStorage: function (e) {
                  var t = this.store(e);
                  delete t.__watchers,
                    delete t.__key_name,
                    this.persistenceDriver.setItem(
                      "__spruce:" + e,
                      JSON.stringify(this.store(e))
                    );
                },
                get: function (e) {
                  return e.split(".").reduce(function (e, t) {
                    return e[t];
                  }, this.stores);
                },
                watch: function (e, i) {
                  if (!this.hasStarted)
                    return (
                      this.watchers[e] || (this.watchers[e] = []),
                      void this.watchers[e].push(i)
                    );
                  var s = e.split("."),
                    o = s.reduce(function (e, i) {
                      var s = e[i];
                      return t(s) || (!r(s) && !n(s)) ? e : s;
                    }, this.stores),
                    a = Object.is(o, this.get(e)) ? "__self" : s[s.length - 1];
                  o.__watchers || (o.__watchers = new Map()),
                    o.__watchers.has(a) || o.__watchers.set(a, new Set()),
                    o.__watchers.get(a).add(i);
                },
                runWatchers: function (e, t, r) {
                  e.__watchers &&
                    (e.__watchers.has(t) &&
                      e.__watchers.get(t).forEach(function (e) {
                        return e(r);
                      }),
                    e.__watchers.has("__self") &&
                      e.__watchers.get("__self").forEach(function (e) {
                        return e(r, t);
                      }));
                },
                persistUsing: function (e) {
                  if (
                    (this.persisted.length > 0 &&
                      console.warn(
                        "[Spruce] You have already initialised a persisted store. Changing the driver may cause issues."
                      ),
                    "function" != typeof e.getItem)
                  )
                    throw new Error(
                      "[Spruce] The persistence driver must have a `getItem(key)` method."
                    );
                  if ("function" != typeof e.setItem)
                    throw new Error(
                      "[Spruce] The persistence driver must have a `setItem(key, value)` method."
                    );
                  this.persistenceDriver = e;
                },
              };
            window.Spruce = s;
            var o =
              window.deferLoadingAlpine ||
              function (e) {
                e();
              };
            (window.deferLoadingAlpine = function (e) {
              window.Spruce.start(), o(e);
            }),
              (module.exports = s);
          }.call(this));
        }.call(
          this,
          typeof global !== "undefined"
            ? global
            : typeof self !== "undefined"
            ? self
            : typeof window !== "undefined"
            ? window
            : {}
        ));
      },
      {},
    ],
    2: [
      function (require, module, exports) {
        (function (global, factory) {
          typeof exports === "object" && typeof module !== "undefined"
            ? (module.exports = factory())
            : typeof define === "function" && define.amd
            ? define(factory)
            : ((global = global || self), (global.Alpine = factory()));
        })(this, function () {
          "use strict";

          function _defineProperty(obj, key, value) {
            if (key in obj) {
              Object.defineProperty(obj, key, {
                value: value,
                enumerable: true,
                configurable: true,
                writable: true,
              });
            } else {
              obj[key] = value;
            }

            return obj;
          }

          function ownKeys(object, enumerableOnly) {
            var keys = Object.keys(object);

            if (Object.getOwnPropertySymbols) {
              var symbols = Object.getOwnPropertySymbols(object);
              if (enumerableOnly)
                symbols = symbols.filter(function (sym) {
                  return Object.getOwnPropertyDescriptor(
                    object,
                    sym
                  ).enumerable;
                });
              keys.push.apply(keys, symbols);
            }

            return keys;
          }

          function _objectSpread2(target) {
            for (var i = 1; i < arguments.length; i++) {
              var source = arguments[i] != null ? arguments[i] : {};

              if (i % 2) {
                ownKeys(Object(source), true).forEach(function (key) {
                  _defineProperty(target, key, source[key]);
                });
              } else if (Object.getOwnPropertyDescriptors) {
                Object.defineProperties(
                  target,
                  Object.getOwnPropertyDescriptors(source)
                );
              } else {
                ownKeys(Object(source)).forEach(function (key) {
                  Object.defineProperty(
                    target,
                    key,
                    Object.getOwnPropertyDescriptor(source, key)
                  );
                });
              }
            }

            return target;
          }

          // Thanks @stimulus:
          // https://github.com/stimulusjs/stimulus/blob/master/packages/%40stimulus/core/src/application.ts
          function domReady() {
            return new Promise((resolve) => {
              if (document.readyState == "loading") {
                document.addEventListener("DOMContentLoaded", resolve);
              } else {
                resolve();
              }
            });
          }
          function arrayUnique(array) {
            return Array.from(new Set(array));
          }
          function isTesting() {
            return (
              navigator.userAgent.includes("Node.js") ||
              navigator.userAgent.includes("jsdom")
            );
          }
          function checkedAttrLooseCompare(valueA, valueB) {
            return valueA == valueB;
          }
          function warnIfMalformedTemplate(el, directive) {
            if (el.tagName.toLowerCase() !== "template") {
              console.warn(
                `Alpine: [${directive}] directive should only be added to <template> tags. See https://github.com/alpinejs/alpine#${directive}`
              );
            } else if (el.content.childElementCount !== 1) {
              console.warn(
                `Alpine: <template> tag with [${directive}] encountered with multiple element roots. Make sure <template> only has a single child element.`
              );
            }
          }
          function kebabCase(subject) {
            return subject
              .replace(/([a-z])([A-Z])/g, "$1-$2")
              .replace(/[_\s]/, "-")
              .toLowerCase();
          }
          function camelCase(subject) {
            return subject
              .toLowerCase()
              .replace(/-(\w)/g, (match, char) => char.toUpperCase());
          }
          function walk(el, callback) {
            if (callback(el) === false) return;
            let node = el.firstElementChild;

            while (node) {
              walk(node, callback);
              node = node.nextElementSibling;
            }
          }
          function debounce(func, wait) {
            var timeout;
            return function () {
              var context = this,
                args = arguments;

              var later = function later() {
                timeout = null;
                func.apply(context, args);
              };

              clearTimeout(timeout);
              timeout = setTimeout(later, wait);
            };
          }

          const handleError = (el, expression, error) => {
            console.warn(
              `Alpine Error: "${error}"\n\nExpression: "${expression}"\nElement:`,
              el
            );

            if (!isTesting()) {
              throw error;
            }
          };

          function tryCatch(cb, { el, expression }) {
            try {
              const value = cb();
              return value instanceof Promise
                ? value.catch((e) => handleError(el, expression, e))
                : value;
            } catch (e) {
              handleError(el, expression, e);
            }
          }

          function saferEval(
            el,
            expression,
            dataContext,
            additionalHelperVariables = {}
          ) {
            return tryCatch(
              () => {
                if (typeof expression === "function") {
                  return expression.call(dataContext);
                }

                return new Function(
                  ["$data", ...Object.keys(additionalHelperVariables)],
                  `var __alpine_result; with($data) { __alpine_result = ${expression} }; return __alpine_result`
                )(dataContext, ...Object.values(additionalHelperVariables));
              },
              {
                el,
                expression,
              }
            );
          }
          function saferEvalNoReturn(
            el,
            expression,
            dataContext,
            additionalHelperVariables = {}
          ) {
            return tryCatch(
              () => {
                if (typeof expression === "function") {
                  return Promise.resolve(
                    expression.call(
                      dataContext,
                      additionalHelperVariables["$event"]
                    )
                  );
                }

                let AsyncFunction = Function;
                /* MODERN-ONLY:START */

                AsyncFunction = Object.getPrototypeOf(
                  async function () {}
                ).constructor;
                /* MODERN-ONLY:END */
                // For the cases when users pass only a function reference to the caller: `x-on:click="foo"`
                // Where "foo" is a function. Also, we'll pass the function the event instance when we call it.

                if (Object.keys(dataContext).includes(expression)) {
                  let methodReference = new Function(
                    ["dataContext", ...Object.keys(additionalHelperVariables)],
                    `with(dataContext) { return ${expression} }`
                  )(dataContext, ...Object.values(additionalHelperVariables));

                  if (typeof methodReference === "function") {
                    return Promise.resolve(
                      methodReference.call(
                        dataContext,
                        additionalHelperVariables["$event"]
                      )
                    );
                  } else {
                    return Promise.resolve();
                  }
                }

                return Promise.resolve(
                  new AsyncFunction(
                    ["dataContext", ...Object.keys(additionalHelperVariables)],
                    `with(dataContext) { ${expression} }`
                  )(dataContext, ...Object.values(additionalHelperVariables))
                );
              },
              {
                el,
                expression,
              }
            );
          }
          const xAttrRE =
            /^x-(on|bind|data|text|html|model|if|for|show|cloak|transition|ref|spread)\b/;
          function isXAttr(attr) {
            const name = replaceAtAndColonWithStandardSyntax(attr.name);
            return xAttrRE.test(name);
          }
          function getXAttrs(el, component, type) {
            let directives = Array.from(el.attributes)
              .filter(isXAttr)
              .map(parseHtmlAttribute); // Get an object of directives from x-spread.

            let spreadDirective = directives.filter(
              (directive) => directive.type === "spread"
            )[0];

            if (spreadDirective) {
              let spreadObject = saferEval(
                el,
                spreadDirective.expression,
                component.$data
              ); // Add x-spread directives to the pile of existing directives.

              directives = directives.concat(
                Object.entries(spreadObject).map(([name, value]) =>
                  parseHtmlAttribute({
                    name,
                    value,
                  })
                )
              );
            }

            if (type) return directives.filter((i) => i.type === type);
            return sortDirectives(directives);
          }

          function sortDirectives(directives) {
            let directiveOrder = ["bind", "model", "show", "catch-all"];
            return directives.sort((a, b) => {
              let typeA =
                directiveOrder.indexOf(a.type) === -1 ? "catch-all" : a.type;
              let typeB =
                directiveOrder.indexOf(b.type) === -1 ? "catch-all" : b.type;
              return (
                directiveOrder.indexOf(typeA) - directiveOrder.indexOf(typeB)
              );
            });
          }

          function parseHtmlAttribute({ name, value }) {
            const normalizedName = replaceAtAndColonWithStandardSyntax(name);
            const typeMatch = normalizedName.match(xAttrRE);
            const valueMatch = normalizedName.match(/:([a-zA-Z0-9\-:]+)/);
            const modifiers =
              normalizedName.match(/\.[^.\]]+(?=[^\]]*$)/g) || [];
            return {
              type: typeMatch ? typeMatch[1] : null,
              value: valueMatch ? valueMatch[1] : null,
              modifiers: modifiers.map((i) => i.replace(".", "")),
              expression: value,
            };
          }
          function isBooleanAttr(attrName) {
            // As per HTML spec table https://html.spec.whatwg.org/multipage/indices.html#attributes-3:boolean-attribute
            // Array roughly ordered by estimated usage
            const booleanAttributes = [
              "disabled",
              "checked",
              "required",
              "readonly",
              "hidden",
              "open",
              "selected",
              "autofocus",
              "itemscope",
              "multiple",
              "novalidate",
              "allowfullscreen",
              "allowpaymentrequest",
              "formnovalidate",
              "autoplay",
              "controls",
              "loop",
              "muted",
              "playsinline",
              "default",
              "ismap",
              "reversed",
              "async",
              "defer",
              "nomodule",
            ];
            return booleanAttributes.includes(attrName);
          }
          function replaceAtAndColonWithStandardSyntax(name) {
            if (name.startsWith("@")) {
              return name.replace("@", "x-on:");
            } else if (name.startsWith(":")) {
              return name.replace(":", "x-bind:");
            }

            return name;
          }
          function convertClassStringToArray(classList, filterFn = Boolean) {
            return classList.split(" ").filter(filterFn);
          }
          const TRANSITION_TYPE_IN = "in";
          const TRANSITION_TYPE_OUT = "out";
          const TRANSITION_CANCELLED = "cancelled";
          function transitionIn(
            el,
            show,
            reject,
            component,
            forceSkip = false
          ) {
            // We don't want to transition on the initial page load.
            if (forceSkip) return show();

            if (
              el.__x_transition &&
              el.__x_transition.type === TRANSITION_TYPE_IN
            ) {
              // there is already a similar transition going on, this was probably triggered by
              // a change in a different property, let's just leave the previous one doing its job
              return;
            }

            const attrs = getXAttrs(el, component, "transition");
            const showAttr = getXAttrs(el, component, "show")[0]; // If this is triggered by a x-show.transition.

            if (showAttr && showAttr.modifiers.includes("transition")) {
              let modifiers = showAttr.modifiers; // If x-show.transition.out, we'll skip the "in" transition.

              if (modifiers.includes("out") && !modifiers.includes("in"))
                return show();
              const settingBothSidesOfTransition =
                modifiers.includes("in") && modifiers.includes("out"); // If x-show.transition.in...out... only use "in" related modifiers for this transition.

              modifiers = settingBothSidesOfTransition
                ? modifiers.filter(
                    (i, index) => index < modifiers.indexOf("out")
                  )
                : modifiers;
              transitionHelperIn(el, modifiers, show, reject); // Otherwise, we can assume x-transition:enter.
            } else if (
              attrs.some((attr) =>
                ["enter", "enter-start", "enter-end"].includes(attr.value)
              )
            ) {
              transitionClassesIn(el, component, attrs, show, reject);
            } else {
              // If neither, just show that damn thing.
              show();
            }
          }
          function transitionOut(
            el,
            hide,
            reject,
            component,
            forceSkip = false
          ) {
            // We don't want to transition on the initial page load.
            if (forceSkip) return hide();

            if (
              el.__x_transition &&
              el.__x_transition.type === TRANSITION_TYPE_OUT
            ) {
              // there is already a similar transition going on, this was probably triggered by
              // a change in a different property, let's just leave the previous one doing its job
              return;
            }

            const attrs = getXAttrs(el, component, "transition");
            const showAttr = getXAttrs(el, component, "show")[0];

            if (showAttr && showAttr.modifiers.includes("transition")) {
              let modifiers = showAttr.modifiers;
              if (modifiers.includes("in") && !modifiers.includes("out"))
                return hide();
              const settingBothSidesOfTransition =
                modifiers.includes("in") && modifiers.includes("out");
              modifiers = settingBothSidesOfTransition
                ? modifiers.filter(
                    (i, index) => index > modifiers.indexOf("out")
                  )
                : modifiers;
              transitionHelperOut(
                el,
                modifiers,
                settingBothSidesOfTransition,
                hide,
                reject
              );
            } else if (
              attrs.some((attr) =>
                ["leave", "leave-start", "leave-end"].includes(attr.value)
              )
            ) {
              transitionClassesOut(el, component, attrs, hide, reject);
            } else {
              hide();
            }
          }
          function transitionHelperIn(el, modifiers, showCallback, reject) {
            // Default values inspired by: https://material.io/design/motion/speed.html#duration
            const styleValues = {
              duration: modifierValue(modifiers, "duration", 150),
              origin: modifierValue(modifiers, "origin", "center"),
              first: {
                opacity: 0,
                scale: modifierValue(modifiers, "scale", 95),
              },
              second: {
                opacity: 1,
                scale: 100,
              },
            };
            transitionHelper(
              el,
              modifiers,
              showCallback,
              () => {},
              reject,
              styleValues,
              TRANSITION_TYPE_IN
            );
          }
          function transitionHelperOut(
            el,
            modifiers,
            settingBothSidesOfTransition,
            hideCallback,
            reject
          ) {
            // Make the "out" transition .5x slower than the "in". (Visually better)
            // HOWEVER, if they explicitly set a duration for the "out" transition,
            // use that.
            const duration = settingBothSidesOfTransition
              ? modifierValue(modifiers, "duration", 150)
              : modifierValue(modifiers, "duration", 150) / 2;
            const styleValues = {
              duration: duration,
              origin: modifierValue(modifiers, "origin", "center"),
              first: {
                opacity: 1,
                scale: 100,
              },
              second: {
                opacity: 0,
                scale: modifierValue(modifiers, "scale", 95),
              },
            };
            transitionHelper(
              el,
              modifiers,
              () => {},
              hideCallback,
              reject,
              styleValues,
              TRANSITION_TYPE_OUT
            );
          }

          function modifierValue(modifiers, key, fallback) {
            // If the modifier isn't present, use the default.
            if (modifiers.indexOf(key) === -1) return fallback; // If it IS present, grab the value after it: x-show.transition.duration.500ms

            const rawValue = modifiers[modifiers.indexOf(key) + 1];
            if (!rawValue) return fallback;

            if (key === "scale") {
              // Check if the very next value is NOT a number and return the fallback.
              // If x-show.transition.scale, we'll use the default scale value.
              // That is how a user opts out of the opacity transition.
              if (!isNumeric(rawValue)) return fallback;
            }

            if (key === "duration") {
              // Support x-show.transition.duration.500ms && duration.500
              let match = rawValue.match(/([0-9]+)ms/);
              if (match) return match[1];
            }

            if (key === "origin") {
              // Support chaining origin directions: x-show.transition.top.right
              if (
                ["top", "right", "left", "center", "bottom"].includes(
                  modifiers[modifiers.indexOf(key) + 2]
                )
              ) {
                return [rawValue, modifiers[modifiers.indexOf(key) + 2]].join(
                  " "
                );
              }
            }

            return rawValue;
          }

          function transitionHelper(
            el,
            modifiers,
            hook1,
            hook2,
            reject,
            styleValues,
            type
          ) {
            // clear the previous transition if exists to avoid caching the wrong styles
            if (el.__x_transition) {
              el.__x_transition.cancel && el.__x_transition.cancel();
            } // If the user set these style values, we'll put them back when we're done with them.

            const opacityCache = el.style.opacity;
            const transformCache = el.style.transform;
            const transformOriginCache = el.style.transformOrigin; // If no modifiers are present: x-show.transition, we'll default to both opacity and scale.

            const noModifiers =
              !modifiers.includes("opacity") && !modifiers.includes("scale");
            const transitionOpacity =
              noModifiers || modifiers.includes("opacity");
            const transitionScale = noModifiers || modifiers.includes("scale"); // These are the explicit stages of a transition (same stages for in and for out).
            // This way you can get a birds eye view of the hooks, and the differences
            // between them.

            const stages = {
              start() {
                if (transitionOpacity)
                  el.style.opacity = styleValues.first.opacity;
                if (transitionScale)
                  el.style.transform = `scale(${
                    styleValues.first.scale / 100
                  })`;
              },

              during() {
                if (transitionScale)
                  el.style.transformOrigin = styleValues.origin;
                el.style.transitionProperty = [
                  transitionOpacity ? `opacity` : ``,
                  transitionScale ? `transform` : ``,
                ]
                  .join(" ")
                  .trim();
                el.style.transitionDuration = `${styleValues.duration / 1000}s`;
                el.style.transitionTimingFunction = `cubic-bezier(0.4, 0.0, 0.2, 1)`;
              },

              show() {
                hook1();
              },

              end() {
                if (transitionOpacity)
                  el.style.opacity = styleValues.second.opacity;
                if (transitionScale)
                  el.style.transform = `scale(${
                    styleValues.second.scale / 100
                  })`;
              },

              hide() {
                hook2();
              },

              cleanup() {
                if (transitionOpacity) el.style.opacity = opacityCache;
                if (transitionScale) el.style.transform = transformCache;
                if (transitionScale)
                  el.style.transformOrigin = transformOriginCache;
                el.style.transitionProperty = null;
                el.style.transitionDuration = null;
                el.style.transitionTimingFunction = null;
              },
            };
            transition(el, stages, type, reject);
          }

          const ensureStringExpression = (expression, el, component) => {
            return typeof expression === "function"
              ? component.evaluateReturnExpression(el, expression)
              : expression;
          };

          function transitionClassesIn(
            el,
            component,
            directives,
            showCallback,
            reject
          ) {
            const enter = convertClassStringToArray(
              ensureStringExpression(
                (
                  directives.find((i) => i.value === "enter") || {
                    expression: "",
                  }
                ).expression,
                el,
                component
              )
            );
            const enterStart = convertClassStringToArray(
              ensureStringExpression(
                (
                  directives.find((i) => i.value === "enter-start") || {
                    expression: "",
                  }
                ).expression,
                el,
                component
              )
            );
            const enterEnd = convertClassStringToArray(
              ensureStringExpression(
                (
                  directives.find((i) => i.value === "enter-end") || {
                    expression: "",
                  }
                ).expression,
                el,
                component
              )
            );
            transitionClasses(
              el,
              enter,
              enterStart,
              enterEnd,
              showCallback,
              () => {},
              TRANSITION_TYPE_IN,
              reject
            );
          }
          function transitionClassesOut(
            el,
            component,
            directives,
            hideCallback,
            reject
          ) {
            const leave = convertClassStringToArray(
              ensureStringExpression(
                (
                  directives.find((i) => i.value === "leave") || {
                    expression: "",
                  }
                ).expression,
                el,
                component
              )
            );
            const leaveStart = convertClassStringToArray(
              ensureStringExpression(
                (
                  directives.find((i) => i.value === "leave-start") || {
                    expression: "",
                  }
                ).expression,
                el,
                component
              )
            );
            const leaveEnd = convertClassStringToArray(
              ensureStringExpression(
                (
                  directives.find((i) => i.value === "leave-end") || {
                    expression: "",
                  }
                ).expression,
                el,
                component
              )
            );
            transitionClasses(
              el,
              leave,
              leaveStart,
              leaveEnd,
              () => {},
              hideCallback,
              TRANSITION_TYPE_OUT,
              reject
            );
          }
          function transitionClasses(
            el,
            classesDuring,
            classesStart,
            classesEnd,
            hook1,
            hook2,
            type,
            reject
          ) {
            // clear the previous transition if exists to avoid caching the wrong classes
            if (el.__x_transition) {
              el.__x_transition.cancel && el.__x_transition.cancel();
            }

            const originalClasses = el.__x_original_classes || [];
            const stages = {
              start() {
                el.classList.add(...classesStart);
              },

              during() {
                el.classList.add(...classesDuring);
              },

              show() {
                hook1();
              },

              end() {
                // Don't remove classes that were in the original class attribute.
                el.classList.remove(
                  ...classesStart.filter((i) => !originalClasses.includes(i))
                );
                el.classList.add(...classesEnd);
              },

              hide() {
                hook2();
              },

              cleanup() {
                el.classList.remove(
                  ...classesDuring.filter((i) => !originalClasses.includes(i))
                );
                el.classList.remove(
                  ...classesEnd.filter((i) => !originalClasses.includes(i))
                );
              },
            };
            transition(el, stages, type, reject);
          }
          function transition(el, stages, type, reject) {
            const finish = once(() => {
              stages.hide(); // Adding an "isConnected" check, in case the callback
              // removed the element from the DOM.

              if (el.isConnected) {
                stages.cleanup();
              }

              delete el.__x_transition;
            });
            el.__x_transition = {
              // Set transition type so we can avoid clearing transition if the direction is the same
              type: type,
              // create a callback for the last stages of the transition so we can call it
              // from different point and early terminate it. Once will ensure that function
              // is only called one time.
              cancel: once(() => {
                reject(TRANSITION_CANCELLED);
                finish();
              }),
              finish,
              // This store the next animation frame so we can cancel it
              nextFrame: null,
            };
            stages.start();
            stages.during();
            el.__x_transition.nextFrame = requestAnimationFrame(() => {
              // Note: Safari's transitionDuration property will list out comma separated transition durations
              // for every single transition property. Let's grab the first one and call it a day.
              let duration =
                Number(
                  getComputedStyle(el)
                    .transitionDuration.replace(/,.*/, "")
                    .replace("s", "")
                ) * 1000;

              if (duration === 0) {
                duration =
                  Number(
                    getComputedStyle(el).animationDuration.replace("s", "")
                  ) * 1000;
              }

              stages.show();
              el.__x_transition.nextFrame = requestAnimationFrame(() => {
                stages.end();
                setTimeout(el.__x_transition.finish, duration);
              });
            });
          }
          function isNumeric(subject) {
            return !Array.isArray(subject) && !isNaN(subject);
          } // Thanks @vuejs
          // https://github.com/vuejs/vue/blob/4de4649d9637262a9b007720b59f80ac72a5620c/src/shared/util.js

          function once(callback) {
            let called = false;
            return function () {
              if (!called) {
                called = true;
                callback.apply(this, arguments);
              }
            };
          }

          function handleForDirective(
            component,
            templateEl,
            expression,
            initialUpdate,
            extraVars
          ) {
            warnIfMalformedTemplate(templateEl, "x-for");
            let iteratorNames =
              typeof expression === "function"
                ? parseForExpression(
                    component.evaluateReturnExpression(templateEl, expression)
                  )
                : parseForExpression(expression);
            let items =
              evaluateItemsAndReturnEmptyIfXIfIsPresentAndFalseOnElement(
                component,
                templateEl,
                iteratorNames,
                extraVars
              ); // As we walk the array, we'll also walk the DOM (updating/creating as we go).

            let currentEl = templateEl;
            items.forEach((item, index) => {
              let iterationScopeVariables = getIterationScopeVariables(
                iteratorNames,
                item,
                index,
                items,
                extraVars()
              );
              let currentKey = generateKeyForIteration(
                component,
                templateEl,
                index,
                iterationScopeVariables
              );
              let nextEl = lookAheadForMatchingKeyedElementAndMoveItIfFound(
                currentEl.nextElementSibling,
                currentKey
              ); // If we haven't found a matching key, insert the element at the current position.

              if (!nextEl) {
                nextEl = addElementInLoopAfterCurrentEl(templateEl, currentEl); // And transition it in if it's not the first page load.

                transitionIn(
                  nextEl,
                  () => {},
                  () => {},
                  component,
                  initialUpdate
                );
                nextEl.__x_for = iterationScopeVariables;
                component.initializeElements(nextEl, () => nextEl.__x_for); // Otherwise update the element we found.
              } else {
                // Temporarily remove the key indicator to allow the normal "updateElements" to work.
                delete nextEl.__x_for_key;
                nextEl.__x_for = iterationScopeVariables;
                component.updateElements(nextEl, () => nextEl.__x_for);
              }

              currentEl = nextEl;
              currentEl.__x_for_key = currentKey;
            });
            removeAnyLeftOverElementsFromPreviousUpdate(currentEl, component);
          } // This was taken from VueJS 2.* core. Thanks Vue!

          function parseForExpression(expression) {
            let forIteratorRE = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/;
            let stripParensRE = /^\(|\)$/g;
            let forAliasRE = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/;
            let inMatch = expression.match(forAliasRE);
            if (!inMatch) return;
            let res = {};
            res.items = inMatch[2].trim();
            let item = inMatch[1].trim().replace(stripParensRE, "");
            let iteratorMatch = item.match(forIteratorRE);

            if (iteratorMatch) {
              res.item = item.replace(forIteratorRE, "").trim();
              res.index = iteratorMatch[1].trim();

              if (iteratorMatch[2]) {
                res.collection = iteratorMatch[2].trim();
              }
            } else {
              res.item = item;
            }

            return res;
          }

          function getIterationScopeVariables(
            iteratorNames,
            item,
            index,
            items,
            extraVars
          ) {
            // We must create a new object, so each iteration has a new scope
            let scopeVariables = extraVars ? _objectSpread2({}, extraVars) : {};
            scopeVariables[iteratorNames.item] = item;
            if (iteratorNames.index)
              scopeVariables[iteratorNames.index] = index;
            if (iteratorNames.collection)
              scopeVariables[iteratorNames.collection] = items;
            return scopeVariables;
          }

          function generateKeyForIteration(
            component,
            el,
            index,
            iterationScopeVariables
          ) {
            let bindKeyAttribute = getXAttrs(el, component, "bind").filter(
              (attr) => attr.value === "key"
            )[0]; // If the dev hasn't specified a key, just return the index of the iteration.

            if (!bindKeyAttribute) return index;
            return component.evaluateReturnExpression(
              el,
              bindKeyAttribute.expression,
              () => iterationScopeVariables
            );
          }

          function evaluateItemsAndReturnEmptyIfXIfIsPresentAndFalseOnElement(
            component,
            el,
            iteratorNames,
            extraVars
          ) {
            let ifAttribute = getXAttrs(el, component, "if")[0];

            if (
              ifAttribute &&
              !component.evaluateReturnExpression(el, ifAttribute.expression)
            ) {
              return [];
            }

            let items = component.evaluateReturnExpression(
              el,
              iteratorNames.items,
              extraVars
            ); // This adds support for the `i in n` syntax.

            if (isNumeric(items) && items > 0) {
              items = Array.from(Array(items).keys(), (i) => i + 1);
            }

            return items;
          }

          function addElementInLoopAfterCurrentEl(templateEl, currentEl) {
            let clone = document.importNode(templateEl.content, true);
            currentEl.parentElement.insertBefore(
              clone,
              currentEl.nextElementSibling
            );
            return currentEl.nextElementSibling;
          }

          function lookAheadForMatchingKeyedElementAndMoveItIfFound(
            nextEl,
            currentKey
          ) {
            if (!nextEl) return; // If we are already past the x-for generated elements, we don't need to look ahead.

            if (nextEl.__x_for_key === undefined) return; // If the the key's DO match, no need to look ahead.

            if (nextEl.__x_for_key === currentKey) return nextEl; // If they don't, we'll look ahead for a match.
            // If we find it, we'll move it to the current position in the loop.

            let tmpNextEl = nextEl;

            while (tmpNextEl) {
              if (tmpNextEl.__x_for_key === currentKey) {
                return tmpNextEl.parentElement.insertBefore(tmpNextEl, nextEl);
              }

              tmpNextEl =
                tmpNextEl.nextElementSibling &&
                tmpNextEl.nextElementSibling.__x_for_key !== undefined
                  ? tmpNextEl.nextElementSibling
                  : false;
            }
          }

          function removeAnyLeftOverElementsFromPreviousUpdate(
            currentEl,
            component
          ) {
            var nextElementFromOldLoop =
              currentEl.nextElementSibling &&
              currentEl.nextElementSibling.__x_for_key !== undefined
                ? currentEl.nextElementSibling
                : false;

            while (nextElementFromOldLoop) {
              let nextElementFromOldLoopImmutable = nextElementFromOldLoop;
              let nextSibling = nextElementFromOldLoop.nextElementSibling;
              transitionOut(
                nextElementFromOldLoop,
                () => {
                  nextElementFromOldLoopImmutable.remove();
                },
                () => {},
                component
              );
              nextElementFromOldLoop =
                nextSibling && nextSibling.__x_for_key !== undefined
                  ? nextSibling
                  : false;
            }
          }

          function handleAttributeBindingDirective(
            component,
            el,
            attrName,
            expression,
            extraVars,
            attrType,
            modifiers
          ) {
            var value = component.evaluateReturnExpression(
              el,
              expression,
              extraVars
            );

            if (attrName === "value") {
              if (
                Alpine.ignoreFocusedForValueBinding &&
                document.activeElement.isSameNode(el)
              )
                return; // If nested model key is undefined, set the default value to empty string.

              if (value === undefined && expression.match(/\./)) {
                value = "";
              }

              if (el.type === "radio") {
                // Set radio value from x-bind:value, if no "value" attribute exists.
                // If there are any initial state values, radio will have a correct
                // "checked" value since x-bind:value is processed before x-model.
                if (el.attributes.value === undefined && attrType === "bind") {
                  el.value = value;
                } else if (attrType !== "bind") {
                  el.checked = checkedAttrLooseCompare(el.value, value);
                }
              } else if (el.type === "checkbox") {
                // If we are explicitly binding a string to the :value, set the string,
                // If the value is a boolean, leave it alone, it will be set to "on"
                // automatically.
                if (
                  typeof value !== "boolean" &&
                  ![null, undefined].includes(value) &&
                  attrType === "bind"
                ) {
                  el.value = String(value);
                } else if (attrType !== "bind") {
                  if (Array.isArray(value)) {
                    // I'm purposely not using Array.includes here because it's
                    // strict, and because of Numeric/String mis-casting, I
                    // want the "includes" to be "fuzzy".
                    el.checked = value.some((val) =>
                      checkedAttrLooseCompare(val, el.value)
                    );
                  } else {
                    el.checked = !!value;
                  }
                }
              } else if (el.tagName === "SELECT") {
                updateSelect(el, value);
              } else {
                if (el.value === value) return;
                el.value = value;
              }
            } else if (attrName === "class") {
              if (Array.isArray(value)) {
                const originalClasses = el.__x_original_classes || [];
                el.setAttribute(
                  "class",
                  arrayUnique(originalClasses.concat(value)).join(" ")
                );
              } else if (typeof value === "object") {
                // Sorting the keys / class names by their boolean value will ensure that
                // anything that evaluates to `false` and needs to remove classes is run first.
                const keysSortedByBooleanValue = Object.keys(value).sort(
                  (a, b) => value[a] - value[b]
                );
                keysSortedByBooleanValue.forEach((classNames) => {
                  if (value[classNames]) {
                    convertClassStringToArray(classNames).forEach((className) =>
                      el.classList.add(className)
                    );
                  } else {
                    convertClassStringToArray(classNames).forEach((className) =>
                      el.classList.remove(className)
                    );
                  }
                });
              } else {
                const originalClasses = el.__x_original_classes || [];
                const newClasses = value
                  ? convertClassStringToArray(value)
                  : [];
                el.setAttribute(
                  "class",
                  arrayUnique(originalClasses.concat(newClasses)).join(" ")
                );
              }
            } else {
              attrName = modifiers.includes("camel")
                ? camelCase(attrName)
                : attrName; // If an attribute's bound value is null, undefined or false, remove the attribute

              if ([null, undefined, false].includes(value)) {
                el.removeAttribute(attrName);
              } else {
                isBooleanAttr(attrName)
                  ? setIfChanged(el, attrName, attrName)
                  : setIfChanged(el, attrName, value);
              }
            }
          }

          function setIfChanged(el, attrName, value) {
            if (el.getAttribute(attrName) != value) {
              el.setAttribute(attrName, value);
            }
          }

          function updateSelect(el, value) {
            const arrayWrappedValue = [].concat(value).map((value) => {
              return value + "";
            });
            Array.from(el.options).forEach((option) => {
              option.selected = arrayWrappedValue.includes(
                option.value || option.text
              );
            });
          }

          function handleTextDirective(el, output, expression) {
            // If nested model key is undefined, set the default value to empty string.
            if (output === undefined && expression.match(/\./)) {
              output = "";
            }

            el.textContent = output;
          }

          function handleHtmlDirective(component, el, expression, extraVars) {
            el.innerHTML = component.evaluateReturnExpression(
              el,
              expression,
              extraVars
            );
          }

          function handleShowDirective(
            component,
            el,
            value,
            modifiers,
            initialUpdate = false
          ) {
            const hide = () => {
              el.style.display = "none";
              el.__x_is_shown = false;
            };

            const show = () => {
              if (el.style.length === 1 && el.style.display === "none") {
                el.removeAttribute("style");
              } else {
                el.style.removeProperty("display");
              }

              el.__x_is_shown = true;
            };

            if (initialUpdate === true) {
              if (value) {
                show();
              } else {
                hide();
              }

              return;
            }

            const handle = (resolve, reject) => {
              if (value) {
                if (el.style.display === "none" || el.__x_transition) {
                  transitionIn(
                    el,
                    () => {
                      show();
                    },
                    reject,
                    component
                  );
                }

                resolve(() => {});
              } else {
                if (el.style.display !== "none") {
                  transitionOut(
                    el,
                    () => {
                      resolve(() => {
                        hide();
                      });
                    },
                    reject,
                    component
                  );
                } else {
                  resolve(() => {});
                }
              }
            }; // The working of x-show is a bit complex because we need to
            // wait for any child transitions to finish before hiding
            // some element. Also, this has to be done recursively.
            // If x-show.immediate, foregoe the waiting.

            if (modifiers.includes("immediate")) {
              handle(
                (finish) => finish(),
                () => {}
              );
              return;
            } // x-show is encountered during a DOM tree walk. If an element
            // we encounter is NOT a child of another x-show element we
            // can execute the previous x-show stack (if one exists).

            if (
              component.showDirectiveLastElement &&
              !component.showDirectiveLastElement.contains(el)
            ) {
              component.executeAndClearRemainingShowDirectiveStack();
            }

            component.showDirectiveStack.push(handle);
            component.showDirectiveLastElement = el;
          }

          function handleIfDirective(
            component,
            el,
            expressionResult,
            initialUpdate,
            extraVars
          ) {
            warnIfMalformedTemplate(el, "x-if");
            const elementHasAlreadyBeenAdded =
              el.nextElementSibling &&
              el.nextElementSibling.__x_inserted_me === true;

            if (
              expressionResult &&
              (!elementHasAlreadyBeenAdded || el.__x_transition)
            ) {
              const clone = document.importNode(el.content, true);
              el.parentElement.insertBefore(clone, el.nextElementSibling);
              transitionIn(
                el.nextElementSibling,
                () => {},
                () => {},
                component,
                initialUpdate
              );
              component.initializeElements(el.nextElementSibling, extraVars);
              el.nextElementSibling.__x_inserted_me = true;
            } else if (!expressionResult && elementHasAlreadyBeenAdded) {
              transitionOut(
                el.nextElementSibling,
                () => {
                  el.nextElementSibling.remove();
                },
                () => {},
                component,
                initialUpdate
              );
            }
          }

          function registerListener(
            component,
            el,
            event,
            modifiers,
            expression,
            extraVars = {}
          ) {
            const options = {
              passive: modifiers.includes("passive"),
            };

            if (modifiers.includes("camel")) {
              event = camelCase(event);
            }

            if (modifiers.includes("away")) {
              let handler = (e) => {
                // Don't do anything if the click came from the element or within it.
                if (el.contains(e.target)) return; // Don't do anything if this element isn't currently visible.

                if (el.offsetWidth < 1 && el.offsetHeight < 1) return; // Now that we are sure the element is visible, AND the click
                // is from outside it, let's run the expression.

                runListenerHandler(component, expression, e, extraVars);

                if (modifiers.includes("once")) {
                  document.removeEventListener(event, handler, options);
                }
              }; // Listen for this event at the root level.

              document.addEventListener(event, handler, options);
            } else {
              let listenerTarget = modifiers.includes("window")
                ? window
                : modifiers.includes("document")
                ? document
                : el;

              let handler = (e) => {
                // Remove this global event handler if the element that declared it
                // has been removed. It's now stale.
                if (listenerTarget === window || listenerTarget === document) {
                  if (!document.body.contains(el)) {
                    listenerTarget.removeEventListener(event, handler, options);
                    return;
                  }
                }

                if (isKeyEvent(event)) {
                  if (
                    isListeningForASpecificKeyThatHasntBeenPressed(e, modifiers)
                  ) {
                    return;
                  }
                }

                if (modifiers.includes("prevent")) e.preventDefault();
                if (modifiers.includes("stop")) e.stopPropagation(); // If the .self modifier isn't present, or if it is present and
                // the target element matches the element we are registering the
                // event on, run the handler

                if (!modifiers.includes("self") || e.target === el) {
                  const returnValue = runListenerHandler(
                    component,
                    expression,
                    e,
                    extraVars
                  );
                  returnValue.then((value) => {
                    if (value === false) {
                      e.preventDefault();
                    } else {
                      if (modifiers.includes("once")) {
                        listenerTarget.removeEventListener(
                          event,
                          handler,
                          options
                        );
                      }
                    }
                  });
                }
              };

              if (modifiers.includes("debounce")) {
                let nextModifier =
                  modifiers[modifiers.indexOf("debounce") + 1] ||
                  "invalid-wait";
                let wait = isNumeric(nextModifier.split("ms")[0])
                  ? Number(nextModifier.split("ms")[0])
                  : 250;
                handler = debounce(handler, wait);
              }

              listenerTarget.addEventListener(event, handler, options);
            }
          }

          function runListenerHandler(component, expression, e, extraVars) {
            return component.evaluateCommandExpression(
              e.target,
              expression,
              () => {
                return _objectSpread2(
                  _objectSpread2({}, extraVars()),
                  {},
                  {
                    $event: e,
                  }
                );
              }
            );
          }

          function isKeyEvent(event) {
            return ["keydown", "keyup"].includes(event);
          }

          function isListeningForASpecificKeyThatHasntBeenPressed(
            e,
            modifiers
          ) {
            let keyModifiers = modifiers.filter((i) => {
              return !["window", "document", "prevent", "stop"].includes(i);
            });

            if (keyModifiers.includes("debounce")) {
              let debounceIndex = keyModifiers.indexOf("debounce");
              keyModifiers.splice(
                debounceIndex,
                isNumeric(
                  (keyModifiers[debounceIndex + 1] || "invalid-wait").split(
                    "ms"
                  )[0]
                )
                  ? 2
                  : 1
              );
            } // If no modifier is specified, we'll call it a press.

            if (keyModifiers.length === 0) return false; // If one is passed, AND it matches the key pressed, we'll call it a press.

            if (
              keyModifiers.length === 1 &&
              keyModifiers[0] === keyToModifier(e.key)
            )
              return false; // The user is listening for key combinations.

            const systemKeyModifiers = [
              "ctrl",
              "shift",
              "alt",
              "meta",
              "cmd",
              "super",
            ];
            const selectedSystemKeyModifiers = systemKeyModifiers.filter(
              (modifier) => keyModifiers.includes(modifier)
            );
            keyModifiers = keyModifiers.filter(
              (i) => !selectedSystemKeyModifiers.includes(i)
            );

            if (selectedSystemKeyModifiers.length > 0) {
              const activelyPressedKeyModifiers =
                selectedSystemKeyModifiers.filter((modifier) => {
                  // Alias "cmd" and "super" to "meta"
                  if (modifier === "cmd" || modifier === "super")
                    modifier = "meta";
                  return e[`${modifier}Key`];
                }); // If all the modifiers selected are pressed, ...

              if (
                activelyPressedKeyModifiers.length ===
                selectedSystemKeyModifiers.length
              ) {
                // AND the remaining key is pressed as well. It's a press.
                if (keyModifiers[0] === keyToModifier(e.key)) return false;
              }
            } // We'll call it NOT a valid keypress.

            return true;
          }

          function keyToModifier(key) {
            switch (key) {
              case "/":
                return "slash";

              case " ":
              case "Spacebar":
                return "space";

              default:
                return key && kebabCase(key);
            }
          }

          function registerModelListener(
            component,
            el,
            modifiers,
            expression,
            extraVars
          ) {
            // If the element we are binding to is a select, a radio, or checkbox
            // we'll listen for the change event instead of the "input" event.
            var event =
              el.tagName.toLowerCase() === "select" ||
              ["checkbox", "radio"].includes(el.type) ||
              modifiers.includes("lazy")
                ? "change"
                : "input";
            const listenerExpression = `${expression} = rightSideOfExpression($event, ${expression})`;
            registerListener(
              component,
              el,
              event,
              modifiers,
              listenerExpression,
              () => {
                return _objectSpread2(
                  _objectSpread2({}, extraVars()),
                  {},
                  {
                    rightSideOfExpression: generateModelAssignmentFunction(
                      el,
                      modifiers,
                      expression
                    ),
                  }
                );
              }
            );
          }

          function generateModelAssignmentFunction(el, modifiers, expression) {
            if (el.type === "radio") {
              // Radio buttons only work properly when they share a name attribute.
              // People might assume we take care of that for them, because
              // they already set a shared "x-model" attribute.
              if (!el.hasAttribute("name")) el.setAttribute("name", expression);
            }

            return (event, currentValue) => {
              // Check for event.detail due to an issue where IE11 handles other events as a CustomEvent.
              if (event instanceof CustomEvent && event.detail) {
                return event.detail;
              } else if (el.type === "checkbox") {
                // If the data we are binding to is an array, toggle its value inside the array.
                if (Array.isArray(currentValue)) {
                  const newValue = modifiers.includes("number")
                    ? safeParseNumber(event.target.value)
                    : event.target.value;
                  return event.target.checked
                    ? currentValue.concat([newValue])
                    : currentValue.filter(
                        (el) => !checkedAttrLooseCompare(el, newValue)
                      );
                } else {
                  return event.target.checked;
                }
              } else if (el.tagName.toLowerCase() === "select" && el.multiple) {
                return modifiers.includes("number")
                  ? Array.from(event.target.selectedOptions).map((option) => {
                      const rawValue = option.value || option.text;
                      return safeParseNumber(rawValue);
                    })
                  : Array.from(event.target.selectedOptions).map((option) => {
                      return option.value || option.text;
                    });
              } else {
                const rawValue = event.target.value;
                return modifiers.includes("number")
                  ? safeParseNumber(rawValue)
                  : modifiers.includes("trim")
                  ? rawValue.trim()
                  : rawValue;
              }
            };
          }

          function safeParseNumber(rawValue) {
            const number = rawValue ? parseFloat(rawValue) : null;
            return isNumeric(number) ? number : rawValue;
          }

          /**
           * Copyright (C) 2017 salesforce.com, inc.
           */
          const { isArray } = Array;
          const {
            getPrototypeOf,
            create: ObjectCreate,
            defineProperty: ObjectDefineProperty,
            defineProperties: ObjectDefineProperties,
            isExtensible,
            getOwnPropertyDescriptor,
            getOwnPropertyNames,
            getOwnPropertySymbols,
            preventExtensions,
            hasOwnProperty,
          } = Object;
          const {
            push: ArrayPush,
            concat: ArrayConcat,
            map: ArrayMap,
          } = Array.prototype;
          function isUndefined(obj) {
            return obj === undefined;
          }
          function isFunction(obj) {
            return typeof obj === "function";
          }
          function isObject(obj) {
            return typeof obj === "object";
          }
          const proxyToValueMap = new WeakMap();
          function registerProxy(proxy, value) {
            proxyToValueMap.set(proxy, value);
          }
          const unwrap = (replicaOrAny) =>
            proxyToValueMap.get(replicaOrAny) || replicaOrAny;

          function wrapValue(membrane, value) {
            return membrane.valueIsObservable(value)
              ? membrane.getProxy(value)
              : value;
          }
          /**
           * Unwrap property descriptors will set value on original descriptor
           * We only need to unwrap if value is specified
           * @param descriptor external descrpitor provided to define new property on original value
           */
          function unwrapDescriptor(descriptor) {
            if (hasOwnProperty.call(descriptor, "value")) {
              descriptor.value = unwrap(descriptor.value);
            }
            return descriptor;
          }
          function lockShadowTarget(membrane, shadowTarget, originalTarget) {
            const targetKeys = ArrayConcat.call(
              getOwnPropertyNames(originalTarget),
              getOwnPropertySymbols(originalTarget)
            );
            targetKeys.forEach((key) => {
              let descriptor = getOwnPropertyDescriptor(originalTarget, key);
              // We do not need to wrap the descriptor if configurable
              // Because we can deal with wrapping it when user goes through
              // Get own property descriptor. There is also a chance that this descriptor
              // could change sometime in the future, so we can defer wrapping
              // until we need to
              if (!descriptor.configurable) {
                descriptor = wrapDescriptor(membrane, descriptor, wrapValue);
              }
              ObjectDefineProperty(shadowTarget, key, descriptor);
            });
            preventExtensions(shadowTarget);
          }
          class ReactiveProxyHandler {
            constructor(membrane, value) {
              this.originalTarget = value;
              this.membrane = membrane;
            }
            get(shadowTarget, key) {
              const { originalTarget, membrane } = this;
              const value = originalTarget[key];
              const { valueObserved } = membrane;
              valueObserved(originalTarget, key);
              return membrane.getProxy(value);
            }
            set(shadowTarget, key, value) {
              const {
                originalTarget,
                membrane: { valueMutated },
              } = this;
              const oldValue = originalTarget[key];
              if (oldValue !== value) {
                originalTarget[key] = value;
                valueMutated(originalTarget, key);
              } else if (key === "length" && isArray(originalTarget)) {
                // fix for issue #236: push will add the new index, and by the time length
                // is updated, the internal length is already equal to the new length value
                // therefore, the oldValue is equal to the value. This is the forking logic
                // to support this use case.
                valueMutated(originalTarget, key);
              }
              return true;
            }
            deleteProperty(shadowTarget, key) {
              const {
                originalTarget,
                membrane: { valueMutated },
              } = this;
              delete originalTarget[key];
              valueMutated(originalTarget, key);
              return true;
            }
            apply(shadowTarget, thisArg, argArray) {
              /* No op */
            }
            construct(target, argArray, newTarget) {
              /* No op */
            }
            has(shadowTarget, key) {
              const {
                originalTarget,
                membrane: { valueObserved },
              } = this;
              valueObserved(originalTarget, key);
              return key in originalTarget;
            }
            ownKeys(shadowTarget) {
              const { originalTarget } = this;
              return ArrayConcat.call(
                getOwnPropertyNames(originalTarget),
                getOwnPropertySymbols(originalTarget)
              );
            }
            isExtensible(shadowTarget) {
              const shadowIsExtensible = isExtensible(shadowTarget);
              if (!shadowIsExtensible) {
                return shadowIsExtensible;
              }
              const { originalTarget, membrane } = this;
              const targetIsExtensible = isExtensible(originalTarget);
              if (!targetIsExtensible) {
                lockShadowTarget(membrane, shadowTarget, originalTarget);
              }
              return targetIsExtensible;
            }
            setPrototypeOf(shadowTarget, prototype) {}
            getPrototypeOf(shadowTarget) {
              const { originalTarget } = this;
              return getPrototypeOf(originalTarget);
            }
            getOwnPropertyDescriptor(shadowTarget, key) {
              const { originalTarget, membrane } = this;
              const { valueObserved } = this.membrane;
              // keys looked up via hasOwnProperty need to be reactive
              valueObserved(originalTarget, key);
              let desc = getOwnPropertyDescriptor(originalTarget, key);
              if (isUndefined(desc)) {
                return desc;
              }
              const shadowDescriptor = getOwnPropertyDescriptor(
                shadowTarget,
                key
              );
              if (!isUndefined(shadowDescriptor)) {
                return shadowDescriptor;
              }
              // Note: by accessing the descriptor, the key is marked as observed
              // but access to the value, setter or getter (if available) cannot observe
              // mutations, just like regular methods, in which case we just do nothing.
              desc = wrapDescriptor(membrane, desc, wrapValue);
              if (!desc.configurable) {
                // If descriptor from original target is not configurable,
                // We must copy the wrapped descriptor over to the shadow target.
                // Otherwise, proxy will throw an invariant error.
                // This is our last chance to lock the value.
                // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/getOwnPropertyDescriptor#Invariants
                ObjectDefineProperty(shadowTarget, key, desc);
              }
              return desc;
            }
            preventExtensions(shadowTarget) {
              const { originalTarget, membrane } = this;
              lockShadowTarget(membrane, shadowTarget, originalTarget);
              preventExtensions(originalTarget);
              return true;
            }
            defineProperty(shadowTarget, key, descriptor) {
              const { originalTarget, membrane } = this;
              const { valueMutated } = membrane;
              const { configurable } = descriptor;
              // We have to check for value in descriptor
              // because Object.freeze(proxy) calls this method
              // with only { configurable: false, writeable: false }
              // Additionally, method will only be called with writeable:false
              // if the descriptor has a value, as opposed to getter/setter
              // So we can just check if writable is present and then see if
              // value is present. This eliminates getter and setter descriptors
              if (
                hasOwnProperty.call(descriptor, "writable") &&
                !hasOwnProperty.call(descriptor, "value")
              ) {
                const originalDescriptor = getOwnPropertyDescriptor(
                  originalTarget,
                  key
                );
                descriptor.value = originalDescriptor.value;
              }
              ObjectDefineProperty(
                originalTarget,
                key,
                unwrapDescriptor(descriptor)
              );
              if (configurable === false) {
                ObjectDefineProperty(
                  shadowTarget,
                  key,
                  wrapDescriptor(membrane, descriptor, wrapValue)
                );
              }
              valueMutated(originalTarget, key);
              return true;
            }
          }

          function wrapReadOnlyValue(membrane, value) {
            return membrane.valueIsObservable(value)
              ? membrane.getReadOnlyProxy(value)
              : value;
          }
          class ReadOnlyHandler {
            constructor(membrane, value) {
              this.originalTarget = value;
              this.membrane = membrane;
            }
            get(shadowTarget, key) {
              const { membrane, originalTarget } = this;
              const value = originalTarget[key];
              const { valueObserved } = membrane;
              valueObserved(originalTarget, key);
              return membrane.getReadOnlyProxy(value);
            }
            set(shadowTarget, key, value) {
              return false;
            }
            deleteProperty(shadowTarget, key) {
              return false;
            }
            apply(shadowTarget, thisArg, argArray) {
              /* No op */
            }
            construct(target, argArray, newTarget) {
              /* No op */
            }
            has(shadowTarget, key) {
              const {
                originalTarget,
                membrane: { valueObserved },
              } = this;
              valueObserved(originalTarget, key);
              return key in originalTarget;
            }
            ownKeys(shadowTarget) {
              const { originalTarget } = this;
              return ArrayConcat.call(
                getOwnPropertyNames(originalTarget),
                getOwnPropertySymbols(originalTarget)
              );
            }
            setPrototypeOf(shadowTarget, prototype) {}
            getOwnPropertyDescriptor(shadowTarget, key) {
              const { originalTarget, membrane } = this;
              const { valueObserved } = membrane;
              // keys looked up via hasOwnProperty need to be reactive
              valueObserved(originalTarget, key);
              let desc = getOwnPropertyDescriptor(originalTarget, key);
              if (isUndefined(desc)) {
                return desc;
              }
              const shadowDescriptor = getOwnPropertyDescriptor(
                shadowTarget,
                key
              );
              if (!isUndefined(shadowDescriptor)) {
                return shadowDescriptor;
              }
              // Note: by accessing the descriptor, the key is marked as observed
              // but access to the value or getter (if available) cannot be observed,
              // just like regular methods, in which case we just do nothing.
              desc = wrapDescriptor(membrane, desc, wrapReadOnlyValue);
              if (hasOwnProperty.call(desc, "set")) {
                desc.set = undefined; // readOnly membrane does not allow setters
              }
              if (!desc.configurable) {
                // If descriptor from original target is not configurable,
                // We must copy the wrapped descriptor over to the shadow target.
                // Otherwise, proxy will throw an invariant error.
                // This is our last chance to lock the value.
                // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/getOwnPropertyDescriptor#Invariants
                ObjectDefineProperty(shadowTarget, key, desc);
              }
              return desc;
            }
            preventExtensions(shadowTarget) {
              return false;
            }
            defineProperty(shadowTarget, key, descriptor) {
              return false;
            }
          }
          function createShadowTarget(value) {
            let shadowTarget = undefined;
            if (isArray(value)) {
              shadowTarget = [];
            } else if (isObject(value)) {
              shadowTarget = {};
            }
            return shadowTarget;
          }
          const ObjectDotPrototype = Object.prototype;
          function defaultValueIsObservable(value) {
            // intentionally checking for null
            if (value === null) {
              return false;
            }
            // treat all non-object types, including undefined, as non-observable values
            if (typeof value !== "object") {
              return false;
            }
            if (isArray(value)) {
              return true;
            }
            const proto = getPrototypeOf(value);
            return (
              proto === ObjectDotPrototype ||
              proto === null ||
              getPrototypeOf(proto) === null
            );
          }
          const defaultValueObserved = (obj, key) => {
            /* do nothing */
          };
          const defaultValueMutated = (obj, key) => {
            /* do nothing */
          };
          const defaultValueDistortion = (value) => value;
          function wrapDescriptor(membrane, descriptor, getValue) {
            const { set, get } = descriptor;
            if (hasOwnProperty.call(descriptor, "value")) {
              descriptor.value = getValue(membrane, descriptor.value);
            } else {
              if (!isUndefined(get)) {
                descriptor.get = function () {
                  // invoking the original getter with the original target
                  return getValue(membrane, get.call(unwrap(this)));
                };
              }
              if (!isUndefined(set)) {
                descriptor.set = function (value) {
                  // At this point we don't have a clear indication of whether
                  // or not a valid mutation will occur, we don't have the key,
                  // and we are not sure why and how they are invoking this setter.
                  // Nevertheless we preserve the original semantics by invoking the
                  // original setter with the original target and the unwrapped value
                  set.call(unwrap(this), membrane.unwrapProxy(value));
                };
              }
            }
            return descriptor;
          }
          class ReactiveMembrane {
            constructor(options) {
              this.valueDistortion = defaultValueDistortion;
              this.valueMutated = defaultValueMutated;
              this.valueObserved = defaultValueObserved;
              this.valueIsObservable = defaultValueIsObservable;
              this.objectGraph = new WeakMap();
              if (!isUndefined(options)) {
                const {
                  valueDistortion,
                  valueMutated,
                  valueObserved,
                  valueIsObservable,
                } = options;
                this.valueDistortion = isFunction(valueDistortion)
                  ? valueDistortion
                  : defaultValueDistortion;
                this.valueMutated = isFunction(valueMutated)
                  ? valueMutated
                  : defaultValueMutated;
                this.valueObserved = isFunction(valueObserved)
                  ? valueObserved
                  : defaultValueObserved;
                this.valueIsObservable = isFunction(valueIsObservable)
                  ? valueIsObservable
                  : defaultValueIsObservable;
              }
            }
            getProxy(value) {
              const unwrappedValue = unwrap(value);
              const distorted = this.valueDistortion(unwrappedValue);
              if (this.valueIsObservable(distorted)) {
                const o = this.getReactiveState(unwrappedValue, distorted);
                // when trying to extract the writable version of a readonly
                // we return the readonly.
                return o.readOnly === value ? value : o.reactive;
              }
              return distorted;
            }
            getReadOnlyProxy(value) {
              value = unwrap(value);
              const distorted = this.valueDistortion(value);
              if (this.valueIsObservable(distorted)) {
                return this.getReactiveState(value, distorted).readOnly;
              }
              return distorted;
            }
            unwrapProxy(p) {
              return unwrap(p);
            }
            getReactiveState(value, distortedValue) {
              const { objectGraph } = this;
              let reactiveState = objectGraph.get(distortedValue);
              if (reactiveState) {
                return reactiveState;
              }
              const membrane = this;
              reactiveState = {
                get reactive() {
                  const reactiveHandler = new ReactiveProxyHandler(
                    membrane,
                    distortedValue
                  );
                  // caching the reactive proxy after the first time it is accessed
                  const proxy = new Proxy(
                    createShadowTarget(distortedValue),
                    reactiveHandler
                  );
                  registerProxy(proxy, value);
                  ObjectDefineProperty(this, "reactive", { value: proxy });
                  return proxy;
                },
                get readOnly() {
                  const readOnlyHandler = new ReadOnlyHandler(
                    membrane,
                    distortedValue
                  );
                  // caching the readOnly proxy after the first time it is accessed
                  const proxy = new Proxy(
                    createShadowTarget(distortedValue),
                    readOnlyHandler
                  );
                  registerProxy(proxy, value);
                  ObjectDefineProperty(this, "readOnly", { value: proxy });
                  return proxy;
                },
              };
              objectGraph.set(distortedValue, reactiveState);
              return reactiveState;
            }
          }
          /** version: 0.26.0 */

          function wrap(data, mutationCallback) {
            let membrane = new ReactiveMembrane({
              valueMutated(target, key) {
                mutationCallback(target, key);
              },
            });
            return {
              data: membrane.getProxy(data),
              membrane: membrane,
            };
          }
          function unwrap$1(membrane, observable) {
            let unwrappedData = membrane.unwrapProxy(observable);
            let copy = {};
            Object.keys(unwrappedData).forEach((key) => {
              if (["$el", "$refs", "$nextTick", "$watch"].includes(key)) return;
              copy[key] = unwrappedData[key];
            });
            return copy;
          }

          class Component {
            constructor(el, componentForClone = null) {
              this.$el = el;
              const dataAttr = this.$el.getAttribute("x-data");
              const dataExpression = dataAttr === "" ? "{}" : dataAttr;
              const initExpression = this.$el.getAttribute("x-init");
              let dataExtras = {
                $el: this.$el,
              };
              let canonicalComponentElementReference = componentForClone
                ? componentForClone.$el
                : this.$el;
              Object.entries(Alpine.magicProperties).forEach(
                ([name, callback]) => {
                  Object.defineProperty(dataExtras, `$${name}`, {
                    get: function get() {
                      return callback(canonicalComponentElementReference);
                    },
                  });
                }
              );
              this.unobservedData = componentForClone
                ? componentForClone.getUnobservedData()
                : saferEval(el, dataExpression, dataExtras);
              // Construct a Proxy-based observable. This will be used to handle reactivity.

              let { membrane, data } = this.wrapDataInObservable(
                this.unobservedData
              );
              this.$data = data;
              this.membrane = membrane; // After making user-supplied data methods reactive, we can now add
              // our magic properties to the original data for access.

              this.unobservedData.$el = this.$el;
              this.unobservedData.$refs = this.getRefsProxy();
              this.nextTickStack = [];

              this.unobservedData.$nextTick = (callback) => {
                this.nextTickStack.push(callback);
              };

              this.watchers = {};

              this.unobservedData.$watch = (property, callback) => {
                if (!this.watchers[property]) this.watchers[property] = [];
                this.watchers[property].push(callback);
              };
              /* MODERN-ONLY:START */
              // We remove this piece of code from the legacy build.
              // In IE11, we have already defined our helpers at this point.
              // Register custom magic properties.

              Object.entries(Alpine.magicProperties).forEach(
                ([name, callback]) => {
                  Object.defineProperty(this.unobservedData, `$${name}`, {
                    get: function get() {
                      return callback(
                        canonicalComponentElementReference,
                        this.$el
                      );
                    },
                  });
                }
              );
              /* MODERN-ONLY:END */

              this.showDirectiveStack = [];
              this.showDirectiveLastElement;
              componentForClone ||
                Alpine.onBeforeComponentInitializeds.forEach((callback) =>
                  callback(this)
                );
              var initReturnedCallback; // If x-init is present AND we aren't cloning (skip x-init on clone)

              if (initExpression && !componentForClone) {
                // We want to allow data manipulation, but not trigger DOM updates just yet.
                // We haven't even initialized the elements with their Alpine bindings. I mean c'mon.
                this.pauseReactivity = true;
                initReturnedCallback = this.evaluateReturnExpression(
                  this.$el,
                  initExpression
                );
                this.pauseReactivity = false;
              } // Register all our listeners and set all our attribute bindings.

              this.initializeElements(this.$el); // Use mutation observer to detect new elements being added within this component at run-time.
              // Alpine's just so darn flexible amirite?

              this.listenForNewElementsToInitialize();

              if (typeof initReturnedCallback === "function") {
                // Run the callback returned from the "x-init" hook to allow the user to do stuff after
                // Alpine's got it's grubby little paws all over everything.
                initReturnedCallback.call(this.$data);
              }

              componentForClone ||
                setTimeout(() => {
                  Alpine.onComponentInitializeds.forEach((callback) =>
                    callback(this)
                  );
                }, 0);
            }

            getUnobservedData() {
              return unwrap$1(this.membrane, this.$data);
            }

            wrapDataInObservable(data) {
              var self = this;
              let updateDom = debounce(function () {
                self.updateElements(self.$el);
              }, 0);
              return wrap(data, (target, key) => {
                if (self.watchers[key]) {
                  // If there's a watcher for this specific key, run it.
                  self.watchers[key].forEach((callback) =>
                    callback(target[key])
                  );
                } else if (Array.isArray(target)) {
                  // Arrays are special cases, if any of the items change, we consider the array as mutated.
                  Object.keys(self.watchers).forEach((fullDotNotationKey) => {
                    let dotNotationParts = fullDotNotationKey.split("."); // Ignore length mutations since they would result in duplicate calls.
                    // For example, when calling push, we would get a mutation for the item's key
                    // and a second mutation for the length property.

                    if (key === "length") return;
                    dotNotationParts.reduce((comparisonData, part) => {
                      if (Object.is(target, comparisonData[part])) {
                        self.watchers[fullDotNotationKey].forEach((callback) =>
                          callback(target)
                        );
                      }

                      return comparisonData[part];
                    }, self.unobservedData);
                  });
                } else {
                  // Let's walk through the watchers with "dot-notation" (foo.bar) and see
                  // if this mutation fits any of them.
                  Object.keys(self.watchers)
                    .filter((i) => i.includes("."))
                    .forEach((fullDotNotationKey) => {
                      let dotNotationParts = fullDotNotationKey.split("."); // If this dot-notation watcher's last "part" doesn't match the current
                      // key, then skip it early for performance reasons.

                      if (key !== dotNotationParts[dotNotationParts.length - 1])
                        return; // Now, walk through the dot-notation "parts" recursively to find
                      // a match, and call the watcher if one's found.

                      dotNotationParts.reduce((comparisonData, part) => {
                        if (Object.is(target, comparisonData)) {
                          // Run the watchers.
                          self.watchers[fullDotNotationKey].forEach(
                            (callback) => callback(target[key])
                          );
                        }

                        return comparisonData[part];
                      }, self.unobservedData);
                    });
                } // Don't react to data changes for cases like the `x-created` hook.

                if (self.pauseReactivity) return;
                updateDom();
              });
            }

            walkAndSkipNestedComponents(
              el,
              callback,
              initializeComponentCallback = () => {}
            ) {
              walk(el, (el) => {
                // We've hit a component.
                if (el.hasAttribute("x-data")) {
                  // If it's not the current one.
                  if (!el.isSameNode(this.$el)) {
                    // Initialize it if it's not.
                    if (!el.__x) initializeComponentCallback(el); // Now we'll let that sub-component deal with itself.

                    return false;
                  }
                }

                return callback(el);
              });
            }

            initializeElements(rootEl, extraVars = () => {}) {
              this.walkAndSkipNestedComponents(
                rootEl,
                (el) => {
                  // Don't touch spawns from for loop
                  if (el.__x_for_key !== undefined) return false; // Don't touch spawns from if directives

                  if (el.__x_inserted_me !== undefined) return false;
                  this.initializeElement(el, extraVars);
                },
                (el) => {
                  el.__x = new Component(el);
                }
              );
              this.executeAndClearRemainingShowDirectiveStack();
              this.executeAndClearNextTickStack(rootEl);
            }

            initializeElement(el, extraVars) {
              // To support class attribute merging, we have to know what the element's
              // original class attribute looked like for reference.
              if (el.hasAttribute("class") && getXAttrs(el, this).length > 0) {
                el.__x_original_classes = convertClassStringToArray(
                  el.getAttribute("class")
                );
              }

              this.registerListeners(el, extraVars);
              this.resolveBoundAttributes(el, true, extraVars);
            }

            updateElements(rootEl, extraVars = () => {}) {
              this.walkAndSkipNestedComponents(
                rootEl,
                (el) => {
                  // Don't touch spawns from for loop (and check if the root is actually a for loop in a parent, don't skip it.)
                  if (el.__x_for_key !== undefined && !el.isSameNode(this.$el))
                    return false;
                  this.updateElement(el, extraVars);
                },
                (el) => {
                  el.__x = new Component(el);
                }
              );
              this.executeAndClearRemainingShowDirectiveStack();
              this.executeAndClearNextTickStack(rootEl);
            }

            executeAndClearNextTickStack(el) {
              // Skip spawns from alpine directives
              if (el === this.$el && this.nextTickStack.length > 0) {
                // We run the tick stack after the next frame to allow any
                // running transitions to pass the initial show stage.
                requestAnimationFrame(() => {
                  while (this.nextTickStack.length > 0) {
                    this.nextTickStack.shift()();
                  }
                });
              }
            }

            executeAndClearRemainingShowDirectiveStack() {
              // The goal here is to start all the x-show transitions
              // and build a nested promise chain so that elements
              // only hide when the children are finished hiding.
              this.showDirectiveStack
                .reverse()
                .map((handler) => {
                  return new Promise((resolve, reject) => {
                    handler(resolve, reject);
                  });
                })
                .reduce(
                  (promiseChain, promise) => {
                    return promiseChain.then(() => {
                      return promise.then((finishElement) => {
                        finishElement();
                      });
                    });
                  },
                  Promise.resolve(() => {})
                )
                .catch((e) => {
                  if (e !== TRANSITION_CANCELLED) throw e;
                }); // We've processed the handler stack. let's clear it.

              this.showDirectiveStack = [];
              this.showDirectiveLastElement = undefined;
            }

            updateElement(el, extraVars) {
              this.resolveBoundAttributes(el, false, extraVars);
            }

            registerListeners(el, extraVars) {
              getXAttrs(el, this).forEach(
                ({ type, value, modifiers, expression }) => {
                  switch (type) {
                    case "on":
                      registerListener(
                        this,
                        el,
                        value,
                        modifiers,
                        expression,
                        extraVars
                      );
                      break;

                    case "model":
                      registerModelListener(
                        this,
                        el,
                        modifiers,
                        expression,
                        extraVars
                      );
                      break;
                  }
                }
              );
            }

            resolveBoundAttributes(el, initialUpdate = false, extraVars) {
              let attrs = getXAttrs(el, this);
              attrs.forEach(({ type, value, modifiers, expression }) => {
                switch (type) {
                  case "model":
                    handleAttributeBindingDirective(
                      this,
                      el,
                      "value",
                      expression,
                      extraVars,
                      type,
                      modifiers
                    );
                    break;

                  case "bind":
                    // The :key binding on an x-for is special, ignore it.
                    if (
                      el.tagName.toLowerCase() === "template" &&
                      value === "key"
                    )
                      return;
                    handleAttributeBindingDirective(
                      this,
                      el,
                      value,
                      expression,
                      extraVars,
                      type,
                      modifiers
                    );
                    break;

                  case "text":
                    var output = this.evaluateReturnExpression(
                      el,
                      expression,
                      extraVars
                    );
                    handleTextDirective(el, output, expression);
                    break;

                  case "html":
                    handleHtmlDirective(this, el, expression, extraVars);
                    break;

                  case "show":
                    var output = this.evaluateReturnExpression(
                      el,
                      expression,
                      extraVars
                    );
                    handleShowDirective(
                      this,
                      el,
                      output,
                      modifiers,
                      initialUpdate
                    );
                    break;

                  case "if":
                    // If this element also has x-for on it, don't process x-if.
                    // We will let the "x-for" directive handle the "if"ing.
                    if (attrs.some((i) => i.type === "for")) return;
                    var output = this.evaluateReturnExpression(
                      el,
                      expression,
                      extraVars
                    );
                    handleIfDirective(
                      this,
                      el,
                      output,
                      initialUpdate,
                      extraVars
                    );
                    break;

                  case "for":
                    handleForDirective(
                      this,
                      el,
                      expression,
                      initialUpdate,
                      extraVars
                    );
                    break;

                  case "cloak":
                    el.removeAttribute("x-cloak");
                    break;
                }
              });
            }

            evaluateReturnExpression(el, expression, extraVars = () => {}) {
              return saferEval(
                el,
                expression,
                this.$data,
                _objectSpread2(
                  _objectSpread2({}, extraVars()),
                  {},
                  {
                    $dispatch: this.getDispatchFunction(el),
                  }
                )
              );
            }

            evaluateCommandExpression(el, expression, extraVars = () => {}) {
              return saferEvalNoReturn(
                el,
                expression,
                this.$data,
                _objectSpread2(
                  _objectSpread2({}, extraVars()),
                  {},
                  {
                    $dispatch: this.getDispatchFunction(el),
                  }
                )
              );
            }

            getDispatchFunction(el) {
              return (event, detail = {}) => {
                el.dispatchEvent(
                  new CustomEvent(event, {
                    detail,
                    bubbles: true,
                  })
                );
              };
            }

            listenForNewElementsToInitialize() {
              const targetNode = this.$el;
              const observerOptions = {
                childList: true,
                attributes: true,
                subtree: true,
              };
              const observer = new MutationObserver((mutations) => {
                for (let i = 0; i < mutations.length; i++) {
                  // Filter out mutations triggered from child components.
                  const closestParentComponent =
                    mutations[i].target.closest("[x-data]");
                  if (
                    !(
                      closestParentComponent &&
                      closestParentComponent.isSameNode(this.$el)
                    )
                  )
                    continue;

                  if (
                    mutations[i].type === "attributes" &&
                    mutations[i].attributeName === "x-data"
                  ) {
                    const xAttr =
                      mutations[i].target.getAttribute("x-data") || "{}";
                    const rawData = saferEval(this.$el, xAttr, {
                      $el: this.$el,
                    });
                    Object.keys(rawData).forEach((key) => {
                      if (this.$data[key] !== rawData[key]) {
                        this.$data[key] = rawData[key];
                      }
                    });
                  }

                  if (mutations[i].addedNodes.length > 0) {
                    mutations[i].addedNodes.forEach((node) => {
                      if (node.nodeType !== 1 || node.__x_inserted_me) return;

                      if (node.matches("[x-data]") && !node.__x) {
                        node.__x = new Component(node);
                        return;
                      }

                      this.initializeElements(node);
                    });
                  }
                }
              });
              observer.observe(targetNode, observerOptions);
            }

            getRefsProxy() {
              var self = this;
              var refObj = {};
              // One of the goals of this is to not hold elements in memory, but rather re-evaluate
              // the DOM when the system needs something from it. This way, the framework is flexible and
              // friendly to outside DOM changes from libraries like Vue/Livewire.
              // For this reason, I'm using an "on-demand" proxy to fake a "$refs" object.

              return new Proxy(refObj, {
                get(object, property) {
                  if (property === "$isAlpineProxy") return true;
                  var ref; // We can't just query the DOM because it's hard to filter out refs in
                  // nested components.

                  self.walkAndSkipNestedComponents(self.$el, (el) => {
                    if (
                      el.hasAttribute("x-ref") &&
                      el.getAttribute("x-ref") === property
                    ) {
                      ref = el;
                    }
                  });
                  return ref;
                },
              });
            }
          }

          const Alpine = {
            version: "2.8.0",
            pauseMutationObserver: false,
            magicProperties: {},
            onComponentInitializeds: [],
            onBeforeComponentInitializeds: [],
            ignoreFocusedForValueBinding: false,
            start: async function start() {
              if (!isTesting()) {
                await domReady();
              }

              this.discoverComponents((el) => {
                this.initializeComponent(el);
              }); // It's easier and more performant to just support Turbolinks than listen
              // to MutationObserver mutations at the document level.

              document.addEventListener("turbolinks:load", () => {
                this.discoverUninitializedComponents((el) => {
                  this.initializeComponent(el);
                });
              });
              this.listenForNewUninitializedComponentsAtRunTime();
            },
            discoverComponents: function discoverComponents(callback) {
              const rootEls = document.querySelectorAll("[x-data]");
              rootEls.forEach((rootEl) => {
                callback(rootEl);
              });
            },
            discoverUninitializedComponents:
              function discoverUninitializedComponents(callback, el = null) {
                const rootEls = (el || document).querySelectorAll("[x-data]");
                Array.from(rootEls)
                  .filter((el) => el.__x === undefined)
                  .forEach((rootEl) => {
                    callback(rootEl);
                  });
              },
            listenForNewUninitializedComponentsAtRunTime:
              function listenForNewUninitializedComponentsAtRunTime() {
                const targetNode = document.querySelector("body");
                const observerOptions = {
                  childList: true,
                  attributes: true,
                  subtree: true,
                };
                const observer = new MutationObserver((mutations) => {
                  if (this.pauseMutationObserver) return;

                  for (let i = 0; i < mutations.length; i++) {
                    if (mutations[i].addedNodes.length > 0) {
                      mutations[i].addedNodes.forEach((node) => {
                        // Discard non-element nodes (like line-breaks)
                        if (node.nodeType !== 1) return; // Discard any changes happening within an existing component.
                        // They will take care of themselves.

                        if (
                          node.parentElement &&
                          node.parentElement.closest("[x-data]")
                        )
                          return;
                        this.discoverUninitializedComponents((el) => {
                          this.initializeComponent(el);
                        }, node.parentElement);
                      });
                    }
                  }
                });
                observer.observe(targetNode, observerOptions);
              },
            initializeComponent: function initializeComponent(el) {
              if (!el.__x) {
                // Wrap in a try/catch so that we don't prevent other components
                // from initializing when one component contains an error.
                try {
                  el.__x = new Component(el);
                } catch (error) {
                  setTimeout(() => {
                    throw error;
                  }, 0);
                }
              }
            },
            clone: function clone(component, newEl) {
              if (!newEl.__x) {
                newEl.__x = new Component(newEl, component);
              }
            },
            addMagicProperty: function addMagicProperty(name, callback) {
              this.magicProperties[name] = callback;
            },
            onComponentInitialized: function onComponentInitialized(callback) {
              this.onComponentInitializeds.push(callback);
            },
            onBeforeComponentInitialized: function onBeforeComponentInitialized(
              callback
            ) {
              this.onBeforeComponentInitializeds.push(callback);
            },
          };

          if (!isTesting()) {
            window.Alpine = Alpine;

            if (window.deferLoadingAlpine) {
              window.deferLoadingAlpine(function () {
                window.Alpine.start();
              });
            } else {
              window.Alpine.start();
            }
          }

          return Alpine;
        });
      },
      {},
    ],
    3: [
      function (require, module, exports) {
        (function webpackUniversalModuleDefinition(root, factory) {
          if (typeof exports === "object" && typeof module === "object")
            module.exports = factory();
          else if (typeof define === "function" && define.amd)
            define([], factory);
          else if (typeof exports === "object") exports["feather"] = factory();
          else root["feather"] = factory();
        })(typeof self !== "undefined" ? self : this, function () {
          return /******/ (function (modules) {
            // webpackBootstrap
            /******/ // The module cache
            /******/ var installedModules = {};
            /******/
            /******/ // The require function
            /******/ function __webpack_require__(moduleId) {
              /******/
              /******/ // Check if module is in cache
              /******/ if (installedModules[moduleId]) {
                /******/ return installedModules[moduleId].exports;
                /******/
              }
              /******/ // Create a new module (and put it into the cache)
              /******/ var module = (installedModules[moduleId] = {
                /******/ i: moduleId,
                /******/ l: false,
                /******/ exports: {},
                /******/
              });
              /******/
              /******/ // Execute the module function
              /******/ modules[moduleId].call(
                module.exports,
                module,
                module.exports,
                __webpack_require__
              );
              /******/
              /******/ // Flag the module as loaded
              /******/ module.l = true;
              /******/
              /******/ // Return the exports of the module
              /******/ return module.exports;
              /******/
            }
            /******/
            /******/
            /******/ // expose the modules object (__webpack_modules__)
            /******/ __webpack_require__.m = modules;
            /******/
            /******/ // expose the module cache
            /******/ __webpack_require__.c = installedModules;
            /******/
            /******/ // define getter function for harmony exports
            /******/ __webpack_require__.d = function (exports, name, getter) {
              /******/ if (!__webpack_require__.o(exports, name)) {
                /******/ Object.defineProperty(exports, name, {
                  /******/ configurable: false,
                  /******/ enumerable: true,
                  /******/ get: getter,
                  /******/
                });
                /******/
              }
              /******/
            };
            /******/
            /******/ // define __esModule on exports
            /******/ __webpack_require__.r = function (exports) {
              /******/ Object.defineProperty(exports, "__esModule", {
                value: true,
              });
              /******/
            };
            /******/
            /******/ // getDefaultExport function for compatibility with non-harmony modules
            /******/ __webpack_require__.n = function (module) {
              /******/ var getter =
                module && module.__esModule
                  ? /******/ function getDefault() {
                      return module["default"];
                    }
                  : /******/ function getModuleExports() {
                      return module;
                    };
              /******/ __webpack_require__.d(getter, "a", getter);
              /******/ return getter;
              /******/
            };
            /******/
            /******/ // Object.prototype.hasOwnProperty.call
            /******/ __webpack_require__.o = function (object, property) {
              return Object.prototype.hasOwnProperty.call(object, property);
            };
            /******/
            /******/ // __webpack_public_path__
            /******/ __webpack_require__.p = "";
            /******/
            /******/
            /******/ // Load entry module and return exports
            /******/ return __webpack_require__((__webpack_require__.s = 0));
            /******/
          })(
            /************************************************************************/
            /******/ {
              /***/ "./dist/icons.json":
                /*!*************************!*\
  !*** ./dist/icons.json ***!
  \*************************/
                /*! exports provided: activity, airplay, alert-circle, alert-octagon, alert-triangle, align-center, align-justify, align-left, align-right, anchor, aperture, archive, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, award, bar-chart-2, bar-chart, battery-charging, battery, bell-off, bell, bluetooth, bold, book-open, book, bookmark, box, briefcase, calendar, camera-off, camera, cast, check-circle, check-square, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, chrome, circle, clipboard, clock, cloud-drizzle, cloud-lightning, cloud-off, cloud-rain, cloud-snow, cloud, code, codepen, codesandbox, coffee, columns, command, compass, copy, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, cpu, credit-card, crop, crosshair, database, delete, disc, divide-circle, divide-square, divide, dollar-sign, download-cloud, download, dribbble, droplet, edit-2, edit-3, edit, external-link, eye-off, eye, facebook, fast-forward, feather, figma, file-minus, file-plus, file-text, file, film, filter, flag, folder-minus, folder-plus, folder, framer, frown, gift, git-branch, git-commit, git-merge, git-pull-request, github, gitlab, globe, grid, hard-drive, hash, headphones, heart, help-circle, hexagon, home, image, inbox, info, instagram, italic, key, layers, layout, life-buoy, link-2, link, linkedin, list, loader, lock, log-in, log-out, mail, map-pin, map, maximize-2, maximize, meh, menu, message-circle, message-square, mic-off, mic, minimize-2, minimize, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, mouse-pointer, move, music, navigation-2, navigation, octagon, package, paperclip, pause-circle, pause, pen-tool, percent, phone-call, phone-forwarded, phone-incoming, phone-missed, phone-off, phone-outgoing, phone, pie-chart, play-circle, play, plus-circle, plus-square, plus, pocket, power, printer, radio, refresh-ccw, refresh-cw, repeat, rewind, rotate-ccw, rotate-cw, rss, save, scissors, search, send, server, settings, share-2, share, shield-off, shield, shopping-bag, shopping-cart, shuffle, sidebar, skip-back, skip-forward, slack, slash, sliders, smartphone, smile, speaker, square, star, stop-circle, sun, sunrise, sunset, tablet, tag, target, terminal, thermometer, thumbs-down, thumbs-up, toggle-left, toggle-right, tool, trash-2, trash, trello, trending-down, trending-up, triangle, truck, tv, twitch, twitter, type, umbrella, underline, unlock, upload-cloud, upload, user-check, user-minus, user-plus, user-x, user, users, video-off, video, voicemail, volume-1, volume-2, volume-x, volume, watch, wifi-off, wifi, wind, x-circle, x-octagon, x-square, x, youtube, zap-off, zap, zoom-in, zoom-out, default */
                /***/ function (module) {
                  module.exports = {
                    activity:
                      '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>',
                    airplay:
                      '<path d="M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1"></path><polygon points="12 15 17 21 7 21 12 15"></polygon>',
                    "alert-circle":
                      '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line>',
                    "alert-octagon":
                      '<polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"></polygon><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line>',
                    "alert-triangle":
                      '<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line>',
                    "align-center":
                      '<line x1="18" y1="10" x2="6" y2="10"></line><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="14" x2="3" y2="14"></line><line x1="18" y1="18" x2="6" y2="18"></line>',
                    "align-justify":
                      '<line x1="21" y1="10" x2="3" y2="10"></line><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="14" x2="3" y2="14"></line><line x1="21" y1="18" x2="3" y2="18"></line>',
                    "align-left":
                      '<line x1="17" y1="10" x2="3" y2="10"></line><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="14" x2="3" y2="14"></line><line x1="17" y1="18" x2="3" y2="18"></line>',
                    "align-right":
                      '<line x1="21" y1="10" x2="7" y2="10"></line><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="14" x2="3" y2="14"></line><line x1="21" y1="18" x2="7" y2="18"></line>',
                    anchor:
                      '<circle cx="12" cy="5" r="3"></circle><line x1="12" y1="22" x2="12" y2="8"></line><path d="M5 12H2a10 10 0 0 0 20 0h-3"></path>',
                    aperture:
                      '<circle cx="12" cy="12" r="10"></circle><line x1="14.31" y1="8" x2="20.05" y2="17.94"></line><line x1="9.69" y1="8" x2="21.17" y2="8"></line><line x1="7.38" y1="12" x2="13.12" y2="2.06"></line><line x1="9.69" y1="16" x2="3.95" y2="6.06"></line><line x1="14.31" y1="16" x2="2.83" y2="16"></line><line x1="16.62" y1="12" x2="10.88" y2="21.94"></line>',
                    archive:
                      '<polyline points="21 8 21 21 3 21 3 8"></polyline><rect x="1" y="3" width="22" height="5"></rect><line x1="10" y1="12" x2="14" y2="12"></line>',
                    "arrow-down-circle":
                      '<circle cx="12" cy="12" r="10"></circle><polyline points="8 12 12 16 16 12"></polyline><line x1="12" y1="8" x2="12" y2="16"></line>',
                    "arrow-down-left":
                      '<line x1="17" y1="7" x2="7" y2="17"></line><polyline points="17 17 7 17 7 7"></polyline>',
                    "arrow-down-right":
                      '<line x1="7" y1="7" x2="17" y2="17"></line><polyline points="17 7 17 17 7 17"></polyline>',
                    "arrow-down":
                      '<line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline>',
                    "arrow-left-circle":
                      '<circle cx="12" cy="12" r="10"></circle><polyline points="12 8 8 12 12 16"></polyline><line x1="16" y1="12" x2="8" y2="12"></line>',
                    "arrow-left":
                      '<line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline>',
                    "arrow-right-circle":
                      '<circle cx="12" cy="12" r="10"></circle><polyline points="12 16 16 12 12 8"></polyline><line x1="8" y1="12" x2="16" y2="12"></line>',
                    "arrow-right":
                      '<line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline>',
                    "arrow-up-circle":
                      '<circle cx="12" cy="12" r="10"></circle><polyline points="16 12 12 8 8 12"></polyline><line x1="12" y1="16" x2="12" y2="8"></line>',
                    "arrow-up-left":
                      '<line x1="17" y1="17" x2="7" y2="7"></line><polyline points="7 17 7 7 17 7"></polyline>',
                    "arrow-up-right":
                      '<line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline>',
                    "arrow-up":
                      '<line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline>',
                    "at-sign":
                      '<circle cx="12" cy="12" r="4"></circle><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94"></path>',
                    award:
                      '<circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>',
                    "bar-chart-2":
                      '<line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line>',
                    "bar-chart":
                      '<line x1="12" y1="20" x2="12" y2="10"></line><line x1="18" y1="20" x2="18" y2="4"></line><line x1="6" y1="20" x2="6" y2="16"></line>',
                    "battery-charging":
                      '<path d="M5 18H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3.19M15 6h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-3.19"></path><line x1="23" y1="13" x2="23" y2="11"></line><polyline points="11 6 7 12 13 12 9 18"></polyline>',
                    battery:
                      '<rect x="1" y="6" width="18" height="12" rx="2" ry="2"></rect><line x1="23" y1="13" x2="23" y2="11"></line>',
                    "bell-off":
                      '<path d="M13.73 21a2 2 0 0 1-3.46 0"></path><path d="M18.63 13A17.89 17.89 0 0 1 18 8"></path><path d="M6.26 6.26A5.86 5.86 0 0 0 6 8c0 7-3 9-3 9h14"></path><path d="M18 8a6 6 0 0 0-9.33-5"></path><line x1="1" y1="1" x2="23" y2="23"></line>',
                    bell: '<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path>',
                    bluetooth:
                      '<polyline points="6.5 6.5 17.5 17.5 12 23 12 1 17.5 6.5 6.5 17.5"></polyline>',
                    bold: '<path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path><path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path>',
                    "book-open":
                      '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>',
                    book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>',
                    bookmark:
                      '<path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>',
                    box: '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line>',
                    briefcase:
                      '<rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>',
                    calendar:
                      '<rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line>',
                    "camera-off":
                      '<line x1="1" y1="1" x2="23" y2="23"></line><path d="M21 21H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3m3-3h6l2 3h4a2 2 0 0 1 2 2v9.34m-7.72-2.06a4 4 0 1 1-5.56-5.56"></path>',
                    camera:
                      '<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle>',
                    cast: '<path d="M2 16.1A5 5 0 0 1 5.9 20M2 12.05A9 9 0 0 1 9.95 20M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6"></path><line x1="2" y1="20" x2="2.01" y2="20"></line>',
                    "check-circle":
                      '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>',
                    "check-square":
                      '<polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>',
                    check: '<polyline points="20 6 9 17 4 12"></polyline>',
                    "chevron-down":
                      '<polyline points="6 9 12 15 18 9"></polyline>',
                    "chevron-left":
                      '<polyline points="15 18 9 12 15 6"></polyline>',
                    "chevron-right":
                      '<polyline points="9 18 15 12 9 6"></polyline>',
                    "chevron-up":
                      '<polyline points="18 15 12 9 6 15"></polyline>',
                    "chevrons-down":
                      '<polyline points="7 13 12 18 17 13"></polyline><polyline points="7 6 12 11 17 6"></polyline>',
                    "chevrons-left":
                      '<polyline points="11 17 6 12 11 7"></polyline><polyline points="18 17 13 12 18 7"></polyline>',
                    "chevrons-right":
                      '<polyline points="13 17 18 12 13 7"></polyline><polyline points="6 17 11 12 6 7"></polyline>',
                    "chevrons-up":
                      '<polyline points="17 11 12 6 7 11"></polyline><polyline points="17 18 12 13 7 18"></polyline>',
                    chrome:
                      '<circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="4"></circle><line x1="21.17" y1="8" x2="12" y2="8"></line><line x1="3.95" y1="6.06" x2="8.54" y2="14"></line><line x1="10.88" y1="21.94" x2="15.46" y2="14"></line>',
                    circle: '<circle cx="12" cy="12" r="10"></circle>',
                    clipboard:
                      '<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>',
                    clock:
                      '<circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline>',
                    "cloud-drizzle":
                      '<line x1="8" y1="19" x2="8" y2="21"></line><line x1="8" y1="13" x2="8" y2="15"></line><line x1="16" y1="19" x2="16" y2="21"></line><line x1="16" y1="13" x2="16" y2="15"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="12" y1="15" x2="12" y2="17"></line><path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"></path>',
                    "cloud-lightning":
                      '<path d="M19 16.9A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 9"></path><polyline points="13 11 9 17 15 17 11 23"></polyline>',
                    "cloud-off":
                      '<path d="M22.61 16.95A5 5 0 0 0 18 10h-1.26a8 8 0 0 0-7.05-6M5 5a8 8 0 0 0 4 15h9a5 5 0 0 0 1.7-.3"></path><line x1="1" y1="1" x2="23" y2="23"></line>',
                    "cloud-rain":
                      '<line x1="16" y1="13" x2="16" y2="21"></line><line x1="8" y1="13" x2="8" y2="21"></line><line x1="12" y1="15" x2="12" y2="23"></line><path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"></path>',
                    "cloud-snow":
                      '<path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25"></path><line x1="8" y1="16" x2="8.01" y2="16"></line><line x1="8" y1="20" x2="8.01" y2="20"></line><line x1="12" y1="18" x2="12.01" y2="18"></line><line x1="12" y1="22" x2="12.01" y2="22"></line><line x1="16" y1="16" x2="16.01" y2="16"></line><line x1="16" y1="20" x2="16.01" y2="20"></line>',
                    cloud:
                      '<path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>',
                    code: '<polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline>',
                    codepen:
                      '<polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"></polygon><line x1="12" y1="22" x2="12" y2="15.5"></line><polyline points="22 8.5 12 15.5 2 8.5"></polyline><polyline points="2 15.5 12 8.5 22 15.5"></polyline><line x1="12" y1="2" x2="12" y2="8.5"></line>',
                    codesandbox:
                      '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="7.5 4.21 12 6.81 16.5 4.21"></polyline><polyline points="7.5 19.79 7.5 14.6 3 12"></polyline><polyline points="21 12 16.5 14.6 16.5 19.79"></polyline><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line>',
                    coffee:
                      '<path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="1" x2="6" y2="4"></line><line x1="10" y1="1" x2="10" y2="4"></line><line x1="14" y1="1" x2="14" y2="4"></line>',
                    columns:
                      '<path d="M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7m0-18H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7m0-18v18"></path>',
                    command:
                      '<path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path>',
                    compass:
                      '<circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>',
                    copy: '<rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>',
                    "corner-down-left":
                      '<polyline points="9 10 4 15 9 20"></polyline><path d="M20 4v7a4 4 0 0 1-4 4H4"></path>',
                    "corner-down-right":
                      '<polyline points="15 10 20 15 15 20"></polyline><path d="M4 4v7a4 4 0 0 0 4 4h12"></path>',
                    "corner-left-down":
                      '<polyline points="14 15 9 20 4 15"></polyline><path d="M20 4h-7a4 4 0 0 0-4 4v12"></path>',
                    "corner-left-up":
                      '<polyline points="14 9 9 4 4 9"></polyline><path d="M20 20h-7a4 4 0 0 1-4-4V4"></path>',
                    "corner-right-down":
                      '<polyline points="10 15 15 20 20 15"></polyline><path d="M4 4h7a4 4 0 0 1 4 4v12"></path>',
                    "corner-right-up":
                      '<polyline points="10 9 15 4 20 9"></polyline><path d="M4 20h7a4 4 0 0 0 4-4V4"></path>',
                    "corner-up-left":
                      '<polyline points="9 14 4 9 9 4"></polyline><path d="M20 20v-7a4 4 0 0 0-4-4H4"></path>',
                    "corner-up-right":
                      '<polyline points="15 14 20 9 15 4"></polyline><path d="M4 20v-7a4 4 0 0 1 4-4h12"></path>',
                    cpu: '<rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line>',
                    "credit-card":
                      '<rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line>',
                    crop: '<path d="M6.13 1L6 16a2 2 0 0 0 2 2h15"></path><path d="M1 6.13L16 6a2 2 0 0 1 2 2v15"></path>',
                    crosshair:
                      '<circle cx="12" cy="12" r="10"></circle><line x1="22" y1="12" x2="18" y2="12"></line><line x1="6" y1="12" x2="2" y2="12"></line><line x1="12" y1="6" x2="12" y2="2"></line><line x1="12" y1="22" x2="12" y2="18"></line>',
                    database:
                      '<ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>',
                    delete:
                      '<path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"></path><line x1="18" y1="9" x2="12" y2="15"></line><line x1="12" y1="9" x2="18" y2="15"></line>',
                    disc: '<circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="3"></circle>',
                    "divide-circle":
                      '<line x1="8" y1="12" x2="16" y2="12"></line><line x1="12" y1="16" x2="12" y2="16"></line><line x1="12" y1="8" x2="12" y2="8"></line><circle cx="12" cy="12" r="10"></circle>',
                    "divide-square":
                      '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="8" y1="12" x2="16" y2="12"></line><line x1="12" y1="16" x2="12" y2="16"></line><line x1="12" y1="8" x2="12" y2="8"></line>',
                    divide:
                      '<circle cx="12" cy="6" r="2"></circle><line x1="5" y1="12" x2="19" y2="12"></line><circle cx="12" cy="18" r="2"></circle>',
                    "dollar-sign":
                      '<line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>',
                    "download-cloud":
                      '<polyline points="8 17 12 21 16 17"></polyline><line x1="12" y1="12" x2="12" y2="21"></line><path d="M20.88 18.09A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.29"></path>',
                    download:
                      '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line>',
                    dribbble:
                      '<circle cx="12" cy="12" r="10"></circle><path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"></path>',
                    droplet:
                      '<path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>',
                    "edit-2":
                      '<path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>',
                    "edit-3":
                      '<path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>',
                    edit: '<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>',
                    "external-link":
                      '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line>',
                    "eye-off":
                      '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line>',
                    eye: '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>',
                    facebook:
                      '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>',
                    "fast-forward":
                      '<polygon points="13 19 22 12 13 5 13 19"></polygon><polygon points="2 19 11 12 2 5 2 19"></polygon>',
                    feather:
                      '<path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path><line x1="16" y1="8" x2="2" y2="22"></line><line x1="17.5" y1="15" x2="9" y2="15"></line>',
                    figma:
                      '<path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z"></path><path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z"></path><path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z"></path><path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z"></path><path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z"></path>',
                    "file-minus":
                      '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="9" y1="15" x2="15" y2="15"></line>',
                    "file-plus":
                      '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="12" y1="18" x2="12" y2="12"></line><line x1="9" y1="15" x2="15" y2="15"></line>',
                    "file-text":
                      '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline>',
                    file: '<path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline>',
                    film: '<rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect><line x1="7" y1="2" x2="7" y2="22"></line><line x1="17" y1="2" x2="17" y2="22"></line><line x1="2" y1="12" x2="22" y2="12"></line><line x1="2" y1="7" x2="7" y2="7"></line><line x1="2" y1="17" x2="7" y2="17"></line><line x1="17" y1="17" x2="22" y2="17"></line><line x1="17" y1="7" x2="22" y2="7"></line>',
                    filter:
                      '<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>',
                    flag: '<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line>',
                    "folder-minus":
                      '<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path><line x1="9" y1="14" x2="15" y2="14"></line>',
                    "folder-plus":
                      '<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path><line x1="12" y1="11" x2="12" y2="17"></line><line x1="9" y1="14" x2="15" y2="14"></line>',
                    folder:
                      '<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>',
                    framer:
                      '<path d="M5 16V9h14V2H5l14 14h-7m-7 0l7 7v-7m-7 0h7"></path>',
                    frown:
                      '<circle cx="12" cy="12" r="10"></circle><path d="M16 16s-1.5-2-4-2-4 2-4 2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line>',
                    gift: '<polyline points="20 12 20 22 4 22 4 12"></polyline><rect x="2" y="7" width="20" height="5"></rect><line x1="12" y1="22" x2="12" y2="7"></line><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path>',
                    "git-branch":
                      '<line x1="6" y1="3" x2="6" y2="15"></line><circle cx="18" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle><path d="M18 9a9 9 0 0 1-9 9"></path>',
                    "git-commit":
                      '<circle cx="12" cy="12" r="4"></circle><line x1="1.05" y1="12" x2="7" y2="12"></line><line x1="17.01" y1="12" x2="22.96" y2="12"></line>',
                    "git-merge":
                      '<circle cx="18" cy="18" r="3"></circle><circle cx="6" cy="6" r="3"></circle><path d="M6 21V9a9 9 0 0 0 9 9"></path>',
                    "git-pull-request":
                      '<circle cx="18" cy="18" r="3"></circle><circle cx="6" cy="6" r="3"></circle><path d="M13 6h3a2 2 0 0 1 2 2v7"></path><line x1="6" y1="9" x2="6" y2="21"></line>',
                    github:
                      '<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>',
                    gitlab:
                      '<path d="M22.65 14.39L12 22.13 1.35 14.39a.84.84 0 0 1-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 0 1 4.82 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.49h8.1l2.44-7.51A.42.42 0 0 1 18.6 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.51L23 13.45a.84.84 0 0 1-.35.94z"></path>',
                    globe:
                      '<circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>',
                    grid: '<rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect>',
                    "hard-drive":
                      '<line x1="22" y1="12" x2="2" y2="12"></line><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path><line x1="6" y1="16" x2="6.01" y2="16"></line><line x1="10" y1="16" x2="10.01" y2="16"></line>',
                    hash: '<line x1="4" y1="9" x2="20" y2="9"></line><line x1="4" y1="15" x2="20" y2="15"></line><line x1="10" y1="3" x2="8" y2="21"></line><line x1="16" y1="3" x2="14" y2="21"></line>',
                    headphones:
                      '<path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>',
                    heart:
                      '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>',
                    "help-circle":
                      '<circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line>',
                    hexagon:
                      '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>',
                    home: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline>',
                    image:
                      '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline>',
                    inbox:
                      '<polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>',
                    info: '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line>',
                    instagram:
                      '<rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>',
                    italic:
                      '<line x1="19" y1="4" x2="10" y2="4"></line><line x1="14" y1="20" x2="5" y2="20"></line><line x1="15" y1="4" x2="9" y2="20"></line>',
                    key: '<path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path>',
                    layers:
                      '<polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline>',
                    layout:
                      '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line>',
                    "life-buoy":
                      '<circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="4"></circle><line x1="4.93" y1="4.93" x2="9.17" y2="9.17"></line><line x1="14.83" y1="14.83" x2="19.07" y2="19.07"></line><line x1="14.83" y1="9.17" x2="19.07" y2="4.93"></line><line x1="14.83" y1="9.17" x2="18.36" y2="5.64"></line><line x1="4.93" y1="19.07" x2="9.17" y2="14.83"></line>',
                    "link-2":
                      '<path d="M15 7h3a5 5 0 0 1 5 5 5 5 0 0 1-5 5h-3m-6 0H6a5 5 0 0 1-5-5 5 5 0 0 1 5-5h3"></path><line x1="8" y1="12" x2="16" y2="12"></line>',
                    link: '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>',
                    linkedin:
                      '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle>',
                    list: '<line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line>',
                    loader:
                      '<line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>',
                    lock: '<rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path>',
                    "log-in":
                      '<path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path><polyline points="10 17 15 12 10 7"></polyline><line x1="15" y1="12" x2="3" y2="12"></line>',
                    "log-out":
                      '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line>',
                    mail: '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline>',
                    "map-pin":
                      '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle>',
                    map: '<polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon><line x1="8" y1="2" x2="8" y2="18"></line><line x1="16" y1="6" x2="16" y2="22"></line>',
                    "maximize-2":
                      '<polyline points="15 3 21 3 21 9"></polyline><polyline points="9 21 3 21 3 15"></polyline><line x1="21" y1="3" x2="14" y2="10"></line><line x1="3" y1="21" x2="10" y2="14"></line>',
                    maximize:
                      '<path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>',
                    meh: '<circle cx="12" cy="12" r="10"></circle><line x1="8" y1="15" x2="16" y2="15"></line><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line>',
                    menu: '<line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line>',
                    "message-circle":
                      '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>',
                    "message-square":
                      '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>',
                    "mic-off":
                      '<line x1="1" y1="1" x2="23" y2="23"></line><path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"></path><path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line>',
                    mic: '<path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line>',
                    "minimize-2":
                      '<polyline points="4 14 10 14 10 20"></polyline><polyline points="20 10 14 10 14 4"></polyline><line x1="14" y1="10" x2="21" y2="3"></line><line x1="3" y1="21" x2="10" y2="14"></line>',
                    minimize:
                      '<path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"></path>',
                    "minus-circle":
                      '<circle cx="12" cy="12" r="10"></circle><line x1="8" y1="12" x2="16" y2="12"></line>',
                    "minus-square":
                      '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="8" y1="12" x2="16" y2="12"></line>',
                    minus: '<line x1="5" y1="12" x2="19" y2="12"></line>',
                    monitor:
                      '<rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line>',
                    moon: '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>',
                    "more-horizontal":
                      '<circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle>',
                    "more-vertical":
                      '<circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle>',
                    "mouse-pointer":
                      '<path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"></path><path d="M13 13l6 6"></path>',
                    move: '<polyline points="5 9 2 12 5 15"></polyline><polyline points="9 5 12 2 15 5"></polyline><polyline points="15 19 12 22 9 19"></polyline><polyline points="19 9 22 12 19 15"></polyline><line x1="2" y1="12" x2="22" y2="12"></line><line x1="12" y1="2" x2="12" y2="22"></line>',
                    music:
                      '<path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle>',
                    "navigation-2":
                      '<polygon points="12 2 19 21 12 17 5 21 12 2"></polygon>',
                    navigation:
                      '<polygon points="3 11 22 2 13 21 11 13 3 11"></polygon>',
                    octagon:
                      '<polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"></polygon>',
                    package:
                      '<line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line>',
                    paperclip:
                      '<path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>',
                    "pause-circle":
                      '<circle cx="12" cy="12" r="10"></circle><line x1="10" y1="15" x2="10" y2="9"></line><line x1="14" y1="15" x2="14" y2="9"></line>',
                    pause:
                      '<rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect>',
                    "pen-tool":
                      '<path d="M12 19l7-7 3 3-7 7-3-3z"></path><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path><path d="M2 2l7.586 7.586"></path><circle cx="11" cy="11" r="2"></circle>',
                    percent:
                      '<line x1="19" y1="5" x2="5" y2="19"></line><circle cx="6.5" cy="6.5" r="2.5"></circle><circle cx="17.5" cy="17.5" r="2.5"></circle>',
                    "phone-call":
                      '<path d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>',
                    "phone-forwarded":
                      '<polyline points="19 1 23 5 19 9"></polyline><line x1="15" y1="5" x2="23" y2="5"></line><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>',
                    "phone-incoming":
                      '<polyline points="16 2 16 8 22 8"></polyline><line x1="23" y1="1" x2="16" y2="8"></line><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>',
                    "phone-missed":
                      '<line x1="23" y1="1" x2="17" y2="7"></line><line x1="17" y1="1" x2="23" y2="7"></line><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>',
                    "phone-off":
                      '<path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67m-2.67-3.34a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91"></path><line x1="23" y1="1" x2="1" y2="23"></line>',
                    "phone-outgoing":
                      '<polyline points="23 7 23 1 17 1"></polyline><line x1="16" y1="8" x2="23" y2="1"></line><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>',
                    phone:
                      '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>',
                    "pie-chart":
                      '<path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path><path d="M22 12A10 10 0 0 0 12 2v10z"></path>',
                    "play-circle":
                      '<circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8"></polygon>',
                    play: '<polygon points="5 3 19 12 5 21 5 3"></polygon>',
                    "plus-circle":
                      '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line>',
                    "plus-square":
                      '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line>',
                    plus: '<line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line>',
                    pocket:
                      '<path d="M4 3h16a2 2 0 0 1 2 2v6a10 10 0 0 1-10 10A10 10 0 0 1 2 11V5a2 2 0 0 1 2-2z"></path><polyline points="8 10 12 14 16 10"></polyline>',
                    power:
                      '<path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path><line x1="12" y1="2" x2="12" y2="12"></line>',
                    printer:
                      '<polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect>',
                    radio:
                      '<circle cx="12" cy="12" r="2"></circle><path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14"></path>',
                    "refresh-ccw":
                      '<polyline points="1 4 1 10 7 10"></polyline><polyline points="23 20 23 14 17 14"></polyline><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>',
                    "refresh-cw":
                      '<polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>',
                    repeat:
                      '<polyline points="17 1 21 5 17 9"></polyline><path d="M3 11V9a4 4 0 0 1 4-4h14"></path><polyline points="7 23 3 19 7 15"></polyline><path d="M21 13v2a4 4 0 0 1-4 4H3"></path>',
                    rewind:
                      '<polygon points="11 19 2 12 11 5 11 19"></polygon><polygon points="22 19 13 12 22 5 22 19"></polygon>',
                    "rotate-ccw":
                      '<polyline points="1 4 1 10 7 10"></polyline><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>',
                    "rotate-cw":
                      '<polyline points="23 4 23 10 17 10"></polyline><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>',
                    rss: '<path d="M4 11a9 9 0 0 1 9 9"></path><path d="M4 4a16 16 0 0 1 16 16"></path><circle cx="5" cy="19" r="1"></circle>',
                    save: '<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline>',
                    scissors:
                      '<circle cx="6" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle><line x1="20" y1="4" x2="8.12" y2="15.88"></line><line x1="14.47" y1="14.48" x2="20" y2="20"></line><line x1="8.12" y1="8.12" x2="12" y2="12"></line>',
                    search:
                      '<circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>',
                    send: '<line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>',
                    server:
                      '<rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line>',
                    settings:
                      '<circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>',
                    "share-2":
                      '<circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>',
                    share:
                      '<path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line>',
                    "shield-off":
                      '<path d="M19.69 14a6.9 6.9 0 0 0 .31-2V5l-8-3-3.16 1.18"></path><path d="M4.73 4.73L4 5v7c0 6 8 10 8 10a20.29 20.29 0 0 0 5.62-4.38"></path><line x1="1" y1="1" x2="23" y2="23"></line>',
                    shield:
                      '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>',
                    "shopping-bag":
                      '<path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path>',
                    "shopping-cart":
                      '<circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>',
                    shuffle:
                      '<polyline points="16 3 21 3 21 8"></polyline><line x1="4" y1="20" x2="21" y2="3"></line><polyline points="21 16 21 21 16 21"></polyline><line x1="15" y1="15" x2="21" y2="21"></line><line x1="4" y1="4" x2="9" y2="9"></line>',
                    sidebar:
                      '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line>',
                    "skip-back":
                      '<polygon points="19 20 9 12 19 4 19 20"></polygon><line x1="5" y1="19" x2="5" y2="5"></line>',
                    "skip-forward":
                      '<polygon points="5 4 15 12 5 20 5 4"></polygon><line x1="19" y1="5" x2="19" y2="19"></line>',
                    slack:
                      '<path d="M14.5 10c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5z"></path><path d="M20.5 10H19V8.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"></path><path d="M9.5 14c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5S8 21.33 8 20.5v-5c0-.83.67-1.5 1.5-1.5z"></path><path d="M3.5 14H5v1.5c0 .83-.67 1.5-1.5 1.5S2 16.33 2 15.5 2.67 14 3.5 14z"></path><path d="M14 14.5c0-.83.67-1.5 1.5-1.5h5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-5c-.83 0-1.5-.67-1.5-1.5z"></path><path d="M15.5 19H14v1.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z"></path><path d="M10 9.5C10 8.67 9.33 8 8.5 8h-5C2.67 8 2 8.67 2 9.5S2.67 11 3.5 11h5c.83 0 1.5-.67 1.5-1.5z"></path><path d="M8.5 5H10V3.5C10 2.67 9.33 2 8.5 2S7 2.67 7 3.5 7.67 5 8.5 5z"></path>',
                    slash:
                      '<circle cx="12" cy="12" r="10"></circle><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>',
                    sliders:
                      '<line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line>',
                    smartphone:
                      '<rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line>',
                    smile:
                      '<circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line>',
                    speaker:
                      '<rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><circle cx="12" cy="14" r="4"></circle><line x1="12" y1="6" x2="12.01" y2="6"></line>',
                    square:
                      '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>',
                    star: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>',
                    "stop-circle":
                      '<circle cx="12" cy="12" r="10"></circle><rect x="9" y="9" width="6" height="6"></rect>',
                    sun: '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>',
                    sunrise:
                      '<path d="M17 18a5 5 0 0 0-10 0"></path><line x1="12" y1="2" x2="12" y2="9"></line><line x1="4.22" y1="10.22" x2="5.64" y2="11.64"></line><line x1="1" y1="18" x2="3" y2="18"></line><line x1="21" y1="18" x2="23" y2="18"></line><line x1="18.36" y1="11.64" x2="19.78" y2="10.22"></line><line x1="23" y1="22" x2="1" y2="22"></line><polyline points="8 6 12 2 16 6"></polyline>',
                    sunset:
                      '<path d="M17 18a5 5 0 0 0-10 0"></path><line x1="12" y1="9" x2="12" y2="2"></line><line x1="4.22" y1="10.22" x2="5.64" y2="11.64"></line><line x1="1" y1="18" x2="3" y2="18"></line><line x1="21" y1="18" x2="23" y2="18"></line><line x1="18.36" y1="11.64" x2="19.78" y2="10.22"></line><line x1="23" y1="22" x2="1" y2="22"></line><polyline points="16 5 12 9 8 5"></polyline>',
                    tablet:
                      '<rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line>',
                    tag: '<path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line>',
                    target:
                      '<circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle>',
                    terminal:
                      '<polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line>',
                    thermometer:
                      '<path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"></path>',
                    "thumbs-down":
                      '<path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"></path>',
                    "thumbs-up":
                      '<path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>',
                    "toggle-left":
                      '<rect x="1" y="5" width="22" height="14" rx="7" ry="7"></rect><circle cx="8" cy="12" r="3"></circle>',
                    "toggle-right":
                      '<rect x="1" y="5" width="22" height="14" rx="7" ry="7"></rect><circle cx="16" cy="12" r="3"></circle>',
                    tool: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>',
                    "trash-2":
                      '<polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line>',
                    trash:
                      '<polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>',
                    trello:
                      '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><rect x="7" y="7" width="3" height="9"></rect><rect x="14" y="7" width="3" height="5"></rect>',
                    "trending-down":
                      '<polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline><polyline points="17 18 23 18 23 12"></polyline>',
                    "trending-up":
                      '<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline>',
                    triangle:
                      '<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>',
                    truck:
                      '<rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle>',
                    tv: '<rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect><polyline points="17 2 12 7 7 2"></polyline>',
                    twitch:
                      '<path d="M21 2H3v16h5v4l4-4h5l4-4V2zm-10 9V7m5 4V7"></path>',
                    twitter:
                      '<path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>',
                    type: '<polyline points="4 7 4 4 20 4 20 7"></polyline><line x1="9" y1="20" x2="15" y2="20"></line><line x1="12" y1="4" x2="12" y2="20"></line>',
                    umbrella:
                      '<path d="M23 12a11.05 11.05 0 0 0-22 0zm-5 7a3 3 0 0 1-6 0v-7"></path>',
                    underline:
                      '<path d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3"></path><line x1="4" y1="21" x2="20" y2="21"></line>',
                    unlock:
                      '<rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 9.9-1"></path>',
                    "upload-cloud":
                      '<polyline points="16 16 12 12 8 16"></polyline><line x1="12" y1="12" x2="12" y2="21"></line><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path><polyline points="16 16 12 12 8 16"></polyline>',
                    upload:
                      '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line>',
                    "user-check":
                      '<path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><polyline points="17 11 19 13 23 9"></polyline>',
                    "user-minus":
                      '<path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="23" y1="11" x2="17" y2="11"></line>',
                    "user-plus":
                      '<path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line>',
                    "user-x":
                      '<path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="18" y1="8" x2="23" y2="13"></line><line x1="23" y1="8" x2="18" y2="13"></line>',
                    user: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>',
                    users:
                      '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>',
                    "video-off":
                      '<path d="M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2m5.66 0H14a2 2 0 0 1 2 2v3.34l1 1L23 7v10"></path><line x1="1" y1="1" x2="23" y2="23"></line>',
                    video:
                      '<polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>',
                    voicemail:
                      '<circle cx="5.5" cy="11.5" r="4.5"></circle><circle cx="18.5" cy="11.5" r="4.5"></circle><line x1="5.5" y1="16" x2="18.5" y2="16"></line>',
                    "volume-1":
                      '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>',
                    "volume-2":
                      '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>',
                    "volume-x":
                      '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line>',
                    volume:
                      '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>',
                    watch:
                      '<circle cx="12" cy="12" r="7"></circle><polyline points="12 9 12 12 13.5 13.5"></polyline><path d="M16.51 17.35l-.35 3.83a2 2 0 0 1-2 1.82H9.83a2 2 0 0 1-2-1.82l-.35-3.83m.01-10.7l.35-3.83A2 2 0 0 1 9.83 1h4.35a2 2 0 0 1 2 1.82l.35 3.83"></path>',
                    "wifi-off":
                      '<line x1="1" y1="1" x2="23" y2="23"></line><path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55"></path><path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39"></path><path d="M10.71 5.05A16 16 0 0 1 22.58 9"></path><path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88"></path><path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path><line x1="12" y1="20" x2="12.01" y2="20"></line>',
                    wifi: '<path d="M5 12.55a11 11 0 0 1 14.08 0"></path><path d="M1.42 9a16 16 0 0 1 21.16 0"></path><path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path><line x1="12" y1="20" x2="12.01" y2="20"></line>',
                    wind: '<path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"></path>',
                    "x-circle":
                      '<circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line>',
                    "x-octagon":
                      '<polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"></polygon><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line>',
                    "x-square":
                      '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="9" x2="15" y2="15"></line><line x1="15" y1="9" x2="9" y2="15"></line>',
                    x: '<line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>',
                    youtube:
                      '<path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>',
                    "zap-off":
                      '<polyline points="12.41 6.75 13 2 10.57 4.92"></polyline><polyline points="18.57 12.91 21 10 15.66 10"></polyline><polyline points="8 8 3 14 12 14 11 22 16 16"></polyline><line x1="1" y1="1" x2="23" y2="23"></line>',
                    zap: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>',
                    "zoom-in":
                      '<circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line>',
                    "zoom-out":
                      '<circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="8" y1="11" x2="14" y2="11"></line>',
                  };

                  /***/
                },

              /***/ "./node_modules/classnames/dedupe.js":
                /*!*******************************************!*\
  !*** ./node_modules/classnames/dedupe.js ***!
  \*******************************************/
                /*! no static exports found */
                /***/ function (module, exports, __webpack_require__) {
                  var __WEBPACK_AMD_DEFINE_ARRAY__,
                    __WEBPACK_AMD_DEFINE_RESULT__; /*!
  Copyright (c) 2016 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
                  /* global define */

                  (function () {
                    "use strict";

                    var classNames = (function () {
                      // don't inherit from Object so we can skip hasOwnProperty check later
                      // http://stackoverflow.com/questions/15518328/creating-js-object-with-object-createnull#answer-21079232
                      function StorageObject() {}
                      StorageObject.prototype = Object.create(null);

                      function _parseArray(resultSet, array) {
                        var length = array.length;

                        for (var i = 0; i < length; ++i) {
                          _parse(resultSet, array[i]);
                        }
                      }

                      var hasOwn = {}.hasOwnProperty;

                      function _parseNumber(resultSet, num) {
                        resultSet[num] = true;
                      }

                      function _parseObject(resultSet, object) {
                        for (var k in object) {
                          if (hasOwn.call(object, k)) {
                            // set value to false instead of deleting it to avoid changing object structure
                            // https://www.smashingmagazine.com/2012/11/writing-fast-memory-efficient-javascript/#de-referencing-misconceptions
                            resultSet[k] = !!object[k];
                          }
                        }
                      }

                      var SPACE = /\s+/;
                      function _parseString(resultSet, str) {
                        var array = str.split(SPACE);
                        var length = array.length;

                        for (var i = 0; i < length; ++i) {
                          resultSet[array[i]] = true;
                        }
                      }

                      function _parse(resultSet, arg) {
                        if (!arg) return;
                        var argType = typeof arg;

                        // 'foo bar'
                        if (argType === "string") {
                          _parseString(resultSet, arg);

                          // ['foo', 'bar', ...]
                        } else if (Array.isArray(arg)) {
                          _parseArray(resultSet, arg);

                          // { 'foo': true, ... }
                        } else if (argType === "object") {
                          _parseObject(resultSet, arg);

                          // '130'
                        } else if (argType === "number") {
                          _parseNumber(resultSet, arg);
                        }
                      }

                      function _classNames() {
                        // don't leak arguments
                        // https://github.com/petkaantonov/bluebird/wiki/Optimization-killers#32-leaking-arguments
                        var len = arguments.length;
                        var args = Array(len);
                        for (var i = 0; i < len; i++) {
                          args[i] = arguments[i];
                        }

                        var classSet = new StorageObject();
                        _parseArray(classSet, args);

                        var list = [];

                        for (var k in classSet) {
                          if (classSet[k]) {
                            list.push(k);
                          }
                        }

                        return list.join(" ");
                      }

                      return _classNames;
                    })();

                    if (typeof module !== "undefined" && module.exports) {
                      module.exports = classNames;
                    } else if (true) {
                      // register as 'classnames', consistent with npm package name
                      !((__WEBPACK_AMD_DEFINE_ARRAY__ = []),
                      (__WEBPACK_AMD_DEFINE_RESULT__ = function () {
                        return classNames;
                      }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)),
                      __WEBPACK_AMD_DEFINE_RESULT__ !== undefined &&
                        (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
                    } else {
                    }
                  })();

                  /***/
                },

              /***/ "./node_modules/core-js/es/array/from.js":
                /*!***********************************************!*\
  !*** ./node_modules/core-js/es/array/from.js ***!
  \***********************************************/
                /*! no static exports found */
                /***/ function (module, exports, __webpack_require__) {
                  __webpack_require__(
                    /*! ../../modules/es.string.iterator */ "./node_modules/core-js/modules/es.string.iterator.js"
                  );
                  __webpack_require__(
                    /*! ../../modules/es.array.from */ "./node_modules/core-js/modules/es.array.from.js"
                  );
                  var path = __webpack_require__(
                    /*! ../../internals/path */ "./node_modules/core-js/internals/path.js"
                  );

                  module.exports = path.Array.from;

                  /***/
                },

              /***/ "./node_modules/core-js/internals/a-function.js":
                /*!******************************************************!*\
  !*** ./node_modules/core-js/internals/a-function.js ***!
  \******************************************************/
                /*! no static exports found */
                /***/ function (module, exports) {
                  module.exports = function (it) {
                    if (typeof it != "function") {
                      throw TypeError(String(it) + " is not a function");
                    }
                    return it;
                  };

                  /***/
                },

              /***/ "./node_modules/core-js/internals/an-object.js":
                /*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/an-object.js ***!
  \*****************************************************/
                /*! no static exports found */
                /***/ function (module, exports, __webpack_require__) {
                  var isObject = __webpack_require__(
                    /*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js"
                  );

                  module.exports = function (it) {
                    if (!isObject(it)) {
                      throw TypeError(String(it) + " is not an object");
                    }
                    return it;
                  };

                  /***/
                },

              /***/ "./node_modules/core-js/internals/array-from.js":
                /*!******************************************************!*\
  !*** ./node_modules/core-js/internals/array-from.js ***!
  \******************************************************/
                /*! no static exports found */
                /***/ function (module, exports, __webpack_require__) {
                  "use strict";

                  var bind = __webpack_require__(
                    /*! ../internals/bind-context */ "./node_modules/core-js/internals/bind-context.js"
                  );
                  var toObject = __webpack_require__(
                    /*! ../internals/to-object */ "./node_modules/core-js/internals/to-object.js"
                  );
                  var callWithSafeIterationClosing = __webpack_require__(
                    /*! ../internals/call-with-safe-iteration-closing */ "./node_modules/core-js/internals/call-with-safe-iteration-closing.js"
                  );
                  var isArrayIteratorMethod = __webpack_require__(
                    /*! ../internals/is-array-iterator-method */ "./node_modules/core-js/internals/is-array-iterator-method.js"
                  );
                  var toLength = __webpack_require__(
                    /*! ../internals/to-length */ "./node_modules/core-js/internals/to-length.js"
                  );
                  var createProperty = __webpack_require__(
                    /*! ../internals/create-property */ "./node_modules/core-js/internals/create-property.js"
                  );
                  var getIteratorMethod = __webpack_require__(
                    /*! ../internals/get-iterator-method */ "./node_modules/core-js/internals/get-iterator-method.js"
                  );

                  // `Array.from` method
                  // https://tc39.github.io/ecma262/#sec-array.from
                  module.exports = function from(
                    arrayLike /* , mapfn = undefined, thisArg = undefined */
                  ) {
                    var O = toObject(arrayLike);
                    var C = typeof this == "function" ? this : Array;
                    var argumentsLength = arguments.length;
                    var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
                    var mapping = mapfn !== undefined;
                    var index = 0;
                    var iteratorMethod = getIteratorMethod(O);
                    var length, result, step, iterator;
                    if (mapping)
                      mapfn = bind(
                        mapfn,
                        argumentsLength > 2 ? arguments[2] : undefined,
                        2
                      );
                    // if the target is not iterable or it's an array with the default iterator - use a simple case
                    if (
                      iteratorMethod != undefined &&
                      !(C == Array && isArrayIteratorMethod(iteratorMethod))
                    ) {
                      iterator = iteratorMethod.call(O);
                      result = new C();
                      for (; !(step = iterator.next()).done; index++) {
                        createProperty(
                          result,
                          index,
                          mapping
                            ? callWithSafeIterationClosing(
                                iterator,
                                mapfn,
                                [step.value, index],
                                true
                              )
                            : step.value
                        );
                      }
                    } else {
                      length = toLength(O.length);
                      result = new C(length);
                      for (; length > index; index++) {
                        createProperty(
                          result,
                          index,
                          mapping ? mapfn(O[index], index) : O[index]
                        );
                      }
                    }
                    result.length = index;
                    return result;
                  };

                  /***/
                },

              /***/ "./node_modules/core-js/internals/array-includes.js":
                /*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/array-includes.js ***!
  \**********************************************************/
                /*! no static exports found */
                /***/ function (module, exports, __webpack_require__) {
                  var toIndexedObject = __webpack_require__(
                    /*! ../internals/to-indexed-object */ "./node_modules/core-js/internals/to-indexed-object.js"
                  );
                  var toLength = __webpack_require__(
                    /*! ../internals/to-length */ "./node_modules/core-js/internals/to-length.js"
                  );
                  var toAbsoluteIndex = __webpack_require__(
                    /*! ../internals/to-absolute-index */ "./node_modules/core-js/internals/to-absolute-index.js"
                  );

                  // `Array.prototype.{ indexOf, includes }` methods implementation
                  // false -> Array#indexOf
                  // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
                  // true  -> Array#includes
                  // https://tc39.github.io/ecma262/#sec-array.prototype.includes
                  module.exports = function (IS_INCLUDES) {
                    return function ($this, el, fromIndex) {
                      var O = toIndexedObject($this);
                      var length = toLength(O.length);
                      var index = toAbsoluteIndex(fromIndex, length);
                      var value;
                      // Array#includes uses SameValueZero equality algorithm
                      // eslint-disable-next-line no-self-compare
                      if (IS_INCLUDES && el != el)
                        while (length > index) {
                          value = O[index++];
                          // eslint-disable-next-line no-self-compare
                          if (value != value) return true;
                          // Array#indexOf ignores holes, Array#includes - not
                        }
                      else
                        for (; length > index; index++)
                          if (IS_INCLUDES || index in O) {
                            if (O[index] === el)
                              return IS_INCLUDES || index || 0;
                          }
                      return !IS_INCLUDES && -1;
                    };
                  };

                  /***/
                },

              /***/ "./node_modules/core-js/internals/bind-context.js":
                /*!********************************************************!*\
  !*** ./node_modules/core-js/internals/bind-context.js ***!
  \********************************************************/
                /*! no static exports found */
                /***/ function (module, exports, __webpack_require__) {
                  var aFunction = __webpack_require__(
                    /*! ../internals/a-function */ "./node_modules/core-js/internals/a-function.js"
                  );

                  // optional / simple context binding
                  module.exports = function (fn, that, length) {
                    aFunction(fn);
                    if (that === undefined) return fn;
                    switch (length) {
                      case 0:
                        return function () {
                          return fn.call(that);
                        };
                      case 1:
                        return function (a) {
                          return fn.call(that, a);
                        };
                      case 2:
                        return function (a, b) {
                          return fn.call(that, a, b);
                        };
                      case 3:
                        return function (a, b, c) {
                          return fn.call(that, a, b, c);
                        };
                    }
                    return function (/* ...args */) {
                      return fn.apply(that, arguments);
                    };
                  };

                  /***/
                },

              /***/ "./node_modules/core-js/internals/call-with-safe-iteration-closing.js":
                /*!****************************************************************************!*\
  !*** ./node_modules/core-js/internals/call-with-safe-iteration-closing.js ***!
  \****************************************************************************/
                /*! no static exports found */
                /***/ function (module, exports, __webpack_require__) {
                  var anObject = __webpack_require__(
                    /*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js"
                  );

                  // call something on iterator step with safe closing on error
                  module.exports = function (iterator, fn, value, ENTRIES) {
                    try {
                      return ENTRIES
                        ? fn(anObject(value)[0], value[1])
                        : fn(value);
                      // 7.4.6 IteratorClose(iterator, completion)
                    } catch (error) {
                      var returnMethod = iterator["return"];
                      if (returnMethod !== undefined)
                        anObject(returnMethod.call(iterator));
                      throw error;
                    }
                  };

                  /***/
                },

              /***/ "./node_modules/core-js/internals/check-correctness-of-iteration.js":
                /*!**************************************************************************!*\
  !*** ./node_modules/core-js/internals/check-correctness-of-iteration.js ***!
  \**************************************************************************/
                /*! no static exports found */
                /***/ function (module, exports, __webpack_require__) {
                  var wellKnownSymbol = __webpack_require__(
                    /*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js"
                  );

                  var ITERATOR = wellKnownSymbol("iterator");
                  var SAFE_CLOSING = false;

                  try {
                    var called = 0;
                    var iteratorWithReturn = {
                      next: function () {
                        return { done: !!called++ };
                      },
                      return: function () {
                        SAFE_CLOSING = true;
                      },
                    };
                    iteratorWithReturn[ITERATOR] = function () {
                      return this;
                    };
                    // eslint-disable-next-line no-throw-literal
                    Array.from(iteratorWithReturn, function () {
                      throw 2;
                    });
                  } catch (error) {
                    /* empty */
                  }

                  module.exports = function (exec, SKIP_CLOSING) {
                    if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
                    var ITERATION_SUPPORT = false;
                    try {
                      var object = {};
                      object[ITERATOR] = function () {
                        return {
                          next: function () {
                            return { done: (ITERATION_SUPPORT = true) };
                          },
                        };
                      };
                      exec(object);
                    } catch (error) {
                      /* empty */
                    }
                    return ITERATION_SUPPORT;
                  };

                  /***/
                },

              /***/ "./node_modules/core-js/internals/classof-raw.js":
                /*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/classof-raw.js ***!
  \*******************************************************/
                /*! no static exports found */
                /***/ function (module, exports) {
                  var toString = {}.toString;

                  module.exports = function (it) {
                    return toString.call(it).slice(8, -1);
                  };

                  /***/
                },

              /***/ "./node_modules/core-js/internals/classof.js":
                /*!***************************************************!*\
  !*** ./node_modules/core-js/internals/classof.js ***!
  \***************************************************/
                /*! no static exports found */
                /***/ function (module, exports, __webpack_require__) {
                  var classofRaw = __webpack_require__(
                    /*! ../internals/classof-raw */ "./node_modules/core-js/internals/classof-raw.js"
                  );
                  var wellKnownSymbol = __webpack_require__(
                    /*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js"
                  );

                  var TO_STRING_TAG = wellKnownSymbol("toStringTag");
                  // ES3 wrong here
                  var CORRECT_ARGUMENTS =
                    classofRaw(
                      (function () {
                        return arguments;
                      })()
                    ) == "Arguments";

                  // fallback for IE11 Script Access Denied error
                  var tryGet = function (it, key) {
                    try {
                      return it[key];
                    } catch (error) {
                      /* empty */
                    }
                  };

                  // getting tag from ES6+ `Object.prototype.toString`
                  module.exports = function (it) {
                    var O, tag, result;
                    return it === undefined
                      ? "Undefined"
                      : it === null
                      ? "Null"
                      : // @@toStringTag case
                      typeof (tag = tryGet((O = Object(it)), TO_STRING_TAG)) ==
                        "string"
                      ? tag
                      : // builtinTag case
                      CORRECT_ARGUMENTS
                      ? classofRaw(O)
                      : // ES3 arguments fallback
                      (result = classofRaw(O)) == "Object" &&
                        typeof O.callee == "function"
                      ? "Arguments"
                      : result;
                  };

                  /***/
                },

              /***/ "./node_modules/core-js/internals/copy-constructor-properties.js":
                /*!***********************************************************************!*\
  !*** ./node_modules/core-js/internals/copy-constructor-properties.js ***!
  \***********************************************************************/
                /*! no static exports found */
                /***/ function (module, exports, __webpack_require__) {
                  var has = __webpack_require__(
                    /*! ../internals/has */ "./node_modules/core-js/internals/has.js"
                  );
                  var ownKeys = __webpack_require__(
                    /*! ../internals/own-keys */ "./node_modules/core-js/internals/own-keys.js"
                  );
                  var getOwnPropertyDescriptorModule = __webpack_require__(
                    /*! ../internals/object-get-own-property-descriptor */ "./node_modules/core-js/internals/object-get-own-property-descriptor.js"
                  );
                  var definePropertyModule = __webpack_require__(
                    /*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js"
                  );

                  module.exports = function (target, source) {
                    var keys = ownKeys(source);
                    var defineProperty = definePropertyModule.f;
                    var getOwnPropertyDescriptor =
                      getOwnPropertyDescriptorModule.f;
                    for (var i = 0; i < keys.length; i++) {
                      var key = keys[i];
                      if (!has(target, key))
                        defineProperty(
                          target,
                          key,
                          getOwnPropertyDescriptor(source, key)
                        );
                    }
                  };

                  /***/
                },

              /***/ "./node_modules/core-js/internals/correct-prototype-getter.js":
                /*!********************************************************************!*\
  !*** ./node_modules/core-js/internals/correct-prototype-getter.js ***!
  \********************************************************************/
                /*! no static exports found */
                /***/ function (module, exports, __webpack_require__) {
                  var fails = __webpack_require__(
                    /*! ../internals/fails */ "./node_modules/core-js/internals/fails.js"
                  );

                  module.exports = !fails(function () {
                    function F() {
                      /* empty */
                    }
                    F.prototype.constructor = null;
                    return Object.getPrototypeOf(new F()) !== F.prototype;
                  });

                  /***/
                },

              /***/ "./node_modules/core-js/internals/create-iterator-constructor.js":
                /*!***********************************************************************!*\
  !*** ./node_modules/core-js/internals/create-iterator-constructor.js ***!
  \***********************************************************************/
                /*! no static exports found */
                /***/ function (module, exports, __webpack_require__) {
                  "use strict";

                  var IteratorPrototype = __webpack_require__(
                    /*! ../internals/iterators-core */ "./node_modules/core-js/internals/iterators-core.js"
                  ).IteratorPrototype;
                  var create = __webpack_require__(
                    /*! ../internals/object-create */ "./node_modules/core-js/internals/object-create.js"
                  );
                  var createPropertyDescriptor = __webpack_require__(
                    /*! ../internals/create-property-descriptor */ "./node_modules/core-js/internals/create-property-descriptor.js"
                  );
                  var setToStringTag = __webpack_require__(
                    /*! ../internals/set-to-string-tag */ "./node_modules/core-js/internals/set-to-string-tag.js"
                  );
                  var Iterators = __webpack_require__(
                    /*! ../internals/iterators */ "./node_modules/core-js/internals/iterators.js"
                  );

                  var returnThis = function () {
                    return this;
                  };

                  module.exports = function (IteratorConstructor, NAME, next) {
                    var TO_STRING_TAG = NAME + " Iterator";
                    IteratorConstructor.prototype = create(IteratorPrototype, {
                      next: createPropertyDescriptor(1, next),
                    });
                    setToStringTag(
                      IteratorConstructor,
                      TO_STRING_TAG,
                      false,
                      true
                    );
                    Iterators[TO_STRING_TAG] = returnThis;
                    return IteratorConstructor;
                  };

                  /***/
                },

              /***/ "./node_modules/core-js/internals/create-property-descriptor.js":
                /*!**********************************************************************!*\
  !*** ./node_modules/core-js/internals/create-property-descriptor.js ***!
  \**********************************************************************/
                /*! no static exports found */
                /***/ function (module, exports) {
                  module.exports = function (bitmap, value) {
                    return {
                      enumerable: !(bitmap & 1),
                      configurable: !(bitmap & 2),
                      writable: !(bitmap & 4),
                      value: value,
                    };
                  };

                  /***/
                },

              /***/ "./node_modules/core-js/internals/create-property.js":
                /*!***********************************************************!*\
  !*** ./node_modules/core-js/internals/create-property.js ***!
  \***********************************************************/
                /*! no static exports found */
                /***/ function (module, exports, __webpack_require__) {
                  "use strict";

                  var toPrimitive = __webpack_require__(
                    /*! ../internals/to-primitive */ "./node_modules/core-js/internals/to-primitive.js"
                  );
                  var definePropertyModule = __webpack_require__(
                    /*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js"
                  );
                  var createPropertyDescriptor = __webpack_require__(
                    /*! ../internals/create-property-descriptor */ "./node_modules/core-js/internals/create-property-descriptor.js"
                  );

                  module.exports = function (object, key, value) {
                    var propertyKey = toPrimitive(key);
                    if (propertyKey in object)
                      definePropertyModule.f(
                        object,
                        propertyKey,
                        createPropertyDescriptor(0, value)
                      );
                    else object[propertyKey] = value;
                  };

                  /***/
                },

              /***/ "./node_modules/core-js/internals/define-iterator.js":
                /*!***********************************************************!*\
  !*** ./node_modules/core-js/internals/define-iterator.js ***!
  \***********************************************************/
                /*! no static exports found */
                /***/ function (module, exports, __webpack_require__) {
                  "use strict";

                  var $ = __webpack_require__(
                    /*! ../internals/export */ "./node_modules/core-js/internals/export.js"
                  );
                  var createIteratorConstructor = __webpack_require__(
                    /*! ../internals/create-iterator-constructor */ "./node_modules/core-js/internals/create-iterator-constructor.js"
                  );
                  var getPrototypeOf = __webpack_require__(
                    /*! ../internals/object-get-prototype-of */ "./node_modules/core-js/internals/object-get-prototype-of.js"
                  );
                  var setPrototypeOf = __webpack_require__(
                    /*! ../internals/object-set-prototype-of */ "./node_modules/core-js/internals/object-set-prototype-of.js"
                  );
                  var setToStringTag = __webpack_require__(
                    /*! ../internals/set-to-string-tag */ "./node_modules/core-js/internals/set-to-string-tag.js"
                  );
                  var hide = __webpack_require__(
                    /*! ../internals/hide */ "./node_modules/core-js/internals/hide.js"
                  );
                  var redefine = __webpack_require__(
                    /*! ../internals/redefine */ "./node_modules/core-js/internals/redefine.js"
                  );
                  var wellKnownSymbol = __webpack_require__(
                    /*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js"
                  );
                  var IS_PURE = __webpack_require__(
                    /*! ../internals/is-pure */ "./node_modules/core-js/internals/is-pure.js"
                  );
                  var Iterators = __webpack_require__(
                    /*! ../internals/iterators */ "./node_modules/core-js/internals/iterators.js"
                  );
                  var IteratorsCore = __webpack_require__(
                    /*! ../internals/iterators-core */ "./node_modules/core-js/internals/iterators-core.js"
                  );

                  var IteratorPrototype = IteratorsCore.IteratorPrototype;
                  var BUGGY_SAFARI_ITERATORS =
                    IteratorsCore.BUGGY_SAFARI_ITERATORS;
                  var ITERATOR = wellKnownSymbol("iterator");
                  var KEYS = "keys";
                  var VALUES = "values";
                  var ENTRIES = "entries";

                  var returnThis = function () {
                    return this;
                  };

                  module.exports = function (
                    Iterable,
                    NAME,
                    IteratorConstructor,
                    next,
                    DEFAULT,
                    IS_SET,
                    FORCED
                  ) {
                    createIteratorConstructor(IteratorConstructor, NAME, next);

                    var getIterationMethod = function (KIND) {
                      if (KIND === DEFAULT && defaultIterator)
                        return defaultIterator;
                      if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype)
                        return IterablePrototype[KIND];
                      switch (KIND) {
                        case KEYS:
                          return function keys() {
                            return new IteratorConstructor(this, KIND);
                          };
                        case VALUES:
                          return function values() {
                            return new IteratorConstructor(this, KIND);
                          };
                        case ENTRIES:
                          return function entries() {
                            return new IteratorConstructor(this, KIND);
                          };
                      }
                      return function () {
                        return new IteratorConstructor(this);
                      };
                    };

                    var TO_STRING_TAG = NAME + " Iterator";
                    var INCORRECT_VALUES_NAME = false;
                    var IterablePrototype = Iterable.prototype;
                    var nativeIterator =
                      IterablePrototype[ITERATOR] ||
                      IterablePrototype["@@iterator"] ||
                      (DEFAULT && IterablePrototype[DEFAULT]);
                    var defaultIterator =
                      (!BUGGY_SAFARI_ITERATORS && nativeIterator) ||
                      getIterationMethod(DEFAULT);
                    var anyNativeIterator =
                      NAME == "Array"
                        ? IterablePrototype.entries || nativeIterator
                        : nativeIterator;
                    var CurrentIteratorPrototype, methods, KEY;

                    // fix native
                    if (anyNativeIterator) {
                      CurrentIteratorPrototype = getPrototypeOf(
                        anyNativeIterator.call(new Iterable())
                      );
                      if (
                        IteratorPrototype !== Object.prototype &&
                        CurrentIteratorPrototype.next
                      ) {
                        if (
                          !IS_PURE &&
                          getPrototypeOf(CurrentIteratorPrototype) !==
                            IteratorPrototype
                        ) {
                          if (setPrototypeOf) {
                            setPrototypeOf(
                              CurrentIteratorPrototype,
                              IteratorPrototype
                            );
                          } else if (
                            typeof CurrentIteratorPrototype[ITERATOR] !=
                            "function"
                          ) {
                            hide(
                              CurrentIteratorPrototype,
                              ITERATOR,
                              returnThis
                            );
                          }
                        }
                        // Set @@toStringTag to native iterators
                        setToStringTag(
                          CurrentIteratorPrototype,
                          TO_STRING_TAG,
                          true,
                          true
                        );
                        if (IS_PURE) Iterators[TO_STRING_TAG] = returnThis;
                      }
                    }

                    // fix Array#{values, @@iterator}.name in V8 / FF
                    if (
                      DEFAULT == VALUES &&
                      nativeIterator &&
                      nativeIterator.name !== VALUES
                    ) {
                      INCORRECT_VALUES_NAME = true;
                      defaultIterator = function values() {
                        return nativeIterator.call(this);
                      };
                    }

                    // define iterator
                    if (
                      (!IS_PURE || FORCED) &&
                      IterablePrototype[ITERATOR] !== defaultIterator
                    ) {
                      hide(IterablePrototype, ITERATOR, defaultIterator);
                    }
                    Iterators[NAME] = defaultIterator;

                    // export additional methods
                    if (DEFAULT) {
                      methods = {
                        values: getIterationMethod(VALUES),
                        keys: IS_SET
                          ? defaultIterator
                          : getIterationMethod(KEYS),
                        entries: getIterationMethod(ENTRIES),
                      };
                      if (FORCED)
                        for (KEY in methods) {
                          if (
                            BUGGY_SAFARI_ITERATORS ||
                            INCORRECT_VALUES_NAME ||
                            !(KEY in IterablePrototype)
                          ) {
                            redefine(IterablePrototype, KEY, methods[KEY]);
                          }
                        }
                      else
                        $(
                          {
                            target: NAME,
                            proto: true,
                            forced:
                              BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME,
                          },
                          methods
                        );
                    }

                    return methods;
                  };

                  /***/
                },

              /***/ "./node_modules/core-js/internals/descriptors.js":
                /*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/descriptors.js ***!
  \*******************************************************/
                /*! no static exports found */
                /***/ function (module, exports, __webpack_require__) {
                  var fails = __webpack_require__(
                    /*! ../internals/fails */ "./node_modules/core-js/internals/fails.js"
                  );

                  // Thank's IE8 for his funny defineProperty
                  module.exports = !fails(function () {
                    return (
                      Object.defineProperty({}, "a", {
                        get: function () {
                          return 7;
                        },
                      }).a != 7
                    );
                  });

                  /***/
                },

              /***/ "./node_modules/core-js/internals/document-create-element.js":
                /*!*******************************************************************!*\
  !*** ./node_modules/core-js/internals/document-create-element.js ***!
  \*******************************************************************/
                /*! no static exports found */
                /***/ function (module, exports, __webpack_require__) {
                  var global = __webpack_require__(
                    /*! ../internals/global */ "./node_modules/core-js/internals/global.js"
                  );
                  var isObject = __webpack_require__(
                    /*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js"
                  );

                  var document = global.document;
                  // typeof document.createElement is 'object' in old IE
                  var exist =
                    isObject(document) && isObject(document.createElement);

                  module.exports = function (it) {
                    return exist ? document.createElement(it) : {};
                  };

                  /***/
                },

              /***/ "./node_modules/core-js/internals/enum-bug-keys.js":
                /*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/enum-bug-keys.js ***!
  \*********************************************************/
                /*! no static exports found */
                /***/ function (module, exports) {
                  // IE8- don't enum bug keys
                  module.exports = [
                    "constructor",
                    "hasOwnProperty",
                    "isPrototypeOf",
                    "propertyIsEnumerable",
                    "toLocaleString",
                    "toString",
                    "valueOf",
                  ];

                  /***/
                },

              /***/ "./node_modules/core-js/internals/export.js":
                /*!**************************************************!*\
  !*** ./node_modules/core-js/internals/export.js ***!
  \**************************************************/
                /*! no static exports found */
                /***/ function (module, exports, __webpack_require__) {
                  var global = __webpack_require__(
                    /*! ../internals/global */ "./node_modules/core-js/internals/global.js"
                  );
                  var getOwnPropertyDescriptor = __webpack_require__(
                    /*! ../internals/object-get-own-property-descriptor */ "./node_modules/core-js/internals/object-get-own-property-descriptor.js"
                  ).f;
                  var hide = __webpack_require__(
                    /*! ../internals/hide */ "./node_modules/core-js/internals/hide.js"
                  );
                  var redefine = __webpack_require__(
                    /*! ../internals/redefine */ "./node_modules/core-js/internals/redefine.js"
                  );
                  var setGlobal = __webpack_require__(
                    /*! ../internals/set-global */ "./node_modules/core-js/internals/set-global.js"
                  );
                  var copyConstructorProperties = __webpack_require__(
                    /*! ../internals/copy-constructor-properties */ "./node_modules/core-js/internals/copy-constructor-properties.js"
                  );
                  var isForced = __webpack_require__(
                    /*! ../internals/is-forced */ "./node_modules/core-js/internals/is-forced.js"
                  );

                  /*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
*/
                  module.exports = function (options, source) {
                    var TARGET = options.target;
                    var GLOBAL = options.global;
                    var STATIC = options.stat;
                    var FORCED,
                      target,
                      key,
                      targetProperty,
                      sourceProperty,
                      descriptor;
                    if (GLOBAL) {
                      target = global;
                    } else if (STATIC) {
                      target = global[TARGET] || setGlobal(TARGET, {});
                    } else {
                      target = (global[TARGET] || {}).prototype;
                    }
                    if (target)
                      for (key in source) {
                        sourceProperty = source[key];
                        if (options.noTargetGet) {
                          descriptor = getOwnPropertyDescriptor(target, key);
                          targetProperty = descriptor && descriptor.value;
                        } else targetProperty = target[key];
                        FORCED = isForced(
                          GLOBAL ? key : TARGET + (STATIC ? "." : "#") + key,
                          options.forced
                        );
                        // contained in target
                        if (!FORCED && targetProperty !== undefined) {
                          if (typeof sourceProperty === typeof targetProperty)
                            continue;
                          copyConstructorProperties(
                            sourceProperty,
                            targetProperty
                          );
                        }
                        // add a flag to not completely full polyfills
                        if (
                          options.sham ||
                          (targetProperty && targetProperty.sham)
                        ) {
                          hide(sourceProperty, "sham", true);
                        }
                        // extend global
                        redefine(target, key, sourceProperty, options);
                      }
                  };

                  /***/
                },

              /***/ "./node_modules/core-js/internals/fails.js":
                /*!*************************************************!*\
  !*** ./node_modules/core-js/internals/fails.js ***!
  \*************************************************/
                /*! no static exports found */
                /***/ function (module, exports) {
                  module.exports = function (exec) {
                    try {
                      return !!exec();
                    } catch (error) {
                      return true;
                    }
                  };

                  /***/
                },

              /***/ "./node_modules/core-js/internals/function-to-string.js":
                /*!**************************************************************!*\
  !*** ./node_modules/core-js/internals/function-to-string.js ***!
  \**************************************************************/
                /*! no static exports found */
                /***/ function (module, exports, __webpack_require__) {
                  var shared = __webpack_require__(
                    /*! ../internals/shared */ "./node_modules/core-js/internals/shared.js"
                  );

                  module.exports = shared(
                    "native-function-to-string",
                    Function.toString
                  );

                  /***/
                },

              /***/ "./node_modules/core-js/internals/get-iterator-method.js":
                /*!***************************************************************!*\
  !*** ./node_modules/core-js/internals/get-iterator-method.js ***!
  \***************************************************************/
                /*! no static exports found */
                /***/ function (module, exports, __webpack_require__) {
                  var classof = __webpack_require__(
                    /*! ../internals/classof */ "./node_modules/core-js/internals/classof.js"
                  );
                  var Iterators = __webpack_require__(
                    /*! ../internals/iterators */ "./node_modules/core-js/internals/iterators.js"
                  );
                  var wellKnownSymbol = __webpack_require__(
                    /*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js"
                  );

                  var ITERATOR = wellKnownSymbol("iterator");

                  module.exports = function (it) {
                    if (it != undefined)
                      return (
                        it[ITERATOR] ||
                        it["@@iterator"] ||
                        Iterators[classof(it)]
                      );
                  };

                  /***/
                },

              /***/ "./node_modules/core-js/internals/global.js":
                /*!**************************************************!*\
  !*** ./node_modules/core-js/internals/global.js ***!
  \**************************************************/
                /*! no static exports found */
                /***/ function (module, exports, __webpack_require__) {
                  /* WEBPACK VAR INJECTION */ (function (global) {
                    var O = "object";
                    var check = function (it) {
                      return it && it.Math == Math && it;
                    };

                    // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
                    module.exports =
                      // eslint-disable-next-line no-undef
                      check(typeof globalThis == O && globalThis) ||
                      check(typeof window == O && window) ||
                      check(typeof self == O && self) ||
                      check(typeof global == O && global) ||
                      // eslint-disable-next-line no-new-func
                      Function("return this")();

                    /* WEBPACK VAR INJECTION */
                  }.call(
                    this,
                    __webpack_require__(
                      /*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js"
                    )
                  ));

                  /***/
                },

              /***/ "./node_modules/core-js/internals/has.js":
                /*!***********************************************!*\
  !*** ./node_modules/core-js/internals/has.js ***!
  \***********************************************/
                /*! no static exports found */
                /***/ function (module, exports) {
                  var hasOwnProperty = {}.hasOwnProperty;

                  module.exports = function (it, key) {
                    return hasOwnProperty.call(it, key);
                  };

                  /***/
                },

              /***/ "./node_modules/core-js/internals/hidden-keys.js":
                /*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/hidden-keys.js ***!
  \*******************************************************/
                /*! no static exports found */
                /***/ function (module, exports) {
                  module.exports = {};

                  /***/
                },

              /***/ "./node_modules/core-js/internals/hide.js":
                /*!************************************************!*\
  !*** ./node_modules/core-js/internals/hide.js ***!
  \************************************************/
                /*! no static exports found */
                /***/ function (module, exports, __webpack_require__) {
                  var DESCRIPTORS = __webpack_require__(
                    /*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js"
                  );
                  var definePropertyModule = __webpack_require__(
                    /*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js"
                  );
                  var createPropertyDescriptor = __webpack_require__(
                    /*! ../internals/create-property-descriptor */ "./node_modules/core-js/internals/create-property-descriptor.js"
                  );

                  module.exports = DESCRIPTORS
                    ? function (object, key, value) {
                        return definePropertyModule.f(
                          object,
                          key,
                          createPropertyDescriptor(1, value)
                        );
                      }
                    : function (object, key, value) {
                        object[key] = value;
                        return object;
                      };

                  /***/
                },

              /***/ "./node_modules/core-js/internals/html.js":
                /*!************************************************!*\
  !*** ./node_modules/core-js/internals/html.js ***!
  \************************************************/
                /*! no static exports found */
                /***/ function (module, exports, __webpack_require__) {
                  var global = __webpack_require__(
                    /*! ../internals/global */ "./node_modules/core-js/internals/global.js"
                  );

                  var document = global.document;

                  module.exports = document && document.documentElement;

                  /***/
                },

              /***/ "./node_modules/core-js/internals/ie8-dom-define.js":
                /*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/ie8-dom-define.js ***!
  \**********************************************************/
                /*! no static exports found */
                /***/ function (module, exports, __webpack_require__) {
                  var DESCRIPTORS = __webpack_require__(
                    /*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js"
                  );
                  var fails = __webpack_require__(
                    /*! ../internals/fails */ "./node_modules/core-js/internals/fails.js"
                  );
                  var createElement = __webpack_require__(
                    /*! ../internals/document-create-element */ "./node_modules/core-js/internals/document-create-element.js"
                  );

                  // Thank's IE8 for his funny defineProperty
                  module.exports =
                    !DESCRIPTORS &&
                    !fails(function () {
                      return (
                        Object.defineProperty(createElement("div"), "a", {
                          get: function () {
                            return 7;
                          },
                        }).a != 7
                      );
                    });

                  /***/
                },

              /***/ "./node_modules/core-js/internals/indexed-object.js":
                /*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/indexed-object.js ***!
  \**********************************************************/
                /*! no static exports found */
                /***/ function (module, exports, __webpack_require__) {
                  // fallback for non-array-like ES3 and non-enumerable old V8 strings
                  var fails = __webpack_require__(
                    /*! ../internals/fails */ "./node_modules/core-js/internals/fails.js"
                  );
                  var classof = __webpack_require__(
                    /*! ../internals/classof-raw */ "./node_modules/core-js/internals/classof-raw.js"
                  );

                  var split = "".split;

                  module.exports = fails(function () {
                    // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
                    // eslint-disable-next-line no-prototype-builtins
                    return !Object("z").propertyIsEnumerable(0);
                  })
                    ? function (it) {
                        return classof(it) == "String"
                          ? split.call(it, "")
                          : Object(it);
                      }
                    : Object;

                  /***/
                },

              /***/ "./node_modules/core-js/internals/internal-state.js":
                /*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/internal-state.js ***!
  \**********************************************************/
                /*! no static exports found */
                /***/ function (module, exports, __webpack_require__) {
                  var NATIVE_WEAK_MAP = __webpack_require__(
                    /*! ../internals/native-weak-map */ "./node_modules/core-js/internals/native-weak-map.js"
                  );
                  var global = __webpack_require__(
                    /*! ../internals/global */ "./node_modules/core-js/internals/global.js"
                  );
                  var isObject = __webpack_require__(
                    /*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js"
                  );
                  var hide = __webpack_require__(
                    /*! ../internals/hide */ "./node_modules/core-js/internals/hide.js"
                  );
                  var objectHas = __webpack_require__(
                    /*! ../internals/has */ "./node_modules/core-js/internals/has.js"
                  );
                  var sharedKey = __webpack_require__(
                    /*! ../internals/shared-key */ "./node_modules/core-js/internals/shared-key.js"
                  );
                  var hiddenKeys = __webpack_require__(
                    /*! ../internals/hidden-keys */ "./node_modules/core-js/internals/hidden-keys.js"
                  );

                  var WeakMap = global.WeakMap;
                  var set, get, has;

                  var enforce = function (it) {
                    return has(it) ? get(it) : set(it, {});
                  };

                  var getterFor = function (TYPE) {
                    return function (it) {
                      var state;
                      if (!isObject(it) || (state = get(it)).type !== TYPE) {
                        throw TypeError(
                          "Incompatible receiver, " + TYPE + " required"
                        );
                      }
                      return state;
                    };
                  };

                  if (NATIVE_WEAK_MAP) {
                    var store = new WeakMap();
                    var wmget = store.get;
                    var wmhas = store.has;
                    var wmset = store.set;
                    set = function (it, metadata) {
                      wmset.call(store, it, metadata);
                      return metadata;
                    };
                    get = function (it) {
                      return wmget.call(store, it) || {};
                    };
                    has = function (it) {
                      return wmhas.call(store, it);
                    };
                  } else {
                    var STATE = sharedKey("state");
                    hiddenKeys[STATE] = true;
                    set = function (it, metadata) {
                      hide(it, STATE, metadata);
                      return metadata;
                    };
                    get = function (it) {
                      return objectHas(it, STATE) ? it[STATE] : {};
                    };
                    has = function (it) {
                      return objectHas(it, STATE);
                    };
                  }

                  module.exports = {
                    set: set,
                    get: get,
                    has: has,
                    enforce: enforce,
                    getterFor: getterFor,
                  };

                  /***/
                },

              /***/ "./node_modules/core-js/internals/is-array-iterator-method.js":
                /*!********************************************************************!*\
  !*** ./node_modules/core-js/internals/is-array-iterator-method.js ***!
  \********************************************************************/
                /*! no static exports found */
                /***/ function (module, exports, __webpack_require__) {
                  var wellKnownSymbol = __webpack_require__(
                    /*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js"
                  );
                  var Iterators = __webpack_require__(
                    /*! ../internals/iterators */ "./node_modules/core-js/internals/iterators.js"
                  );

                  var ITERATOR = wellKnownSymbol("iterator");
                  var ArrayPrototype = Array.prototype;

                  // check on default Array iterator
                  module.exports = function (it) {
                    return (
                      it !== undefined &&
                      (Iterators.Array === it ||
                        ArrayPrototype[ITERATOR] === it)
                    );
                  };

                  /***/
                },

              /***/ "./node_modules/core-js/internals/is-forced.js":
                /*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/is-forced.js ***!
  \*****************************************************/
                /*! no static exports found */
                /***/ function (module, exports, __webpack_require__) {
                  var fails = __webpack_require__(
                    /*! ../internals/fails */ "./node_modules/core-js/internals/fails.js"
                  );

                  var replacement = /#|\.prototype\./;

                  var isForced = function (feature, detection) {
                    var value = data[normalize(feature)];
                    return value == POLYFILL
                      ? true
                      : value == NATIVE
                      ? false
                      : typeof detection == "function"
                      ? fails(detection)
                      : !!detection;
                  };

                  var normalize = (isForced.normalize = function (string) {
                    return String(string)
                      .replace(replacement, ".")
                      .toLowerCase();
                  });

                  var data = (isForced.data = {});
                  var NATIVE = (isForced.NATIVE = "N");
                  var POLYFILL = (isForced.POLYFILL = "P");

                  module.exports = isForced;

                  /***/
                },

              /***/ "./node_modules/core-js/internals/is-object.js":
                /*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/is-object.js ***!
  \*****************************************************/
                /*! no static exports found */
                /***/ function (module, exports) {
                  module.exports = function (it) {
                    return typeof it === "object"
                      ? it !== null
                      : typeof it === "function";
                  };

                  /***/
                },

              /***/ "./node_modules/core-js/internals/is-pure.js":
                /*!***************************************************!*\
  !*** ./node_modules/core-js/internals/is-pure.js ***!
  \***************************************************/
                /*! no static exports found */
                /***/ function (module, exports) {
                  module.exports = false;

                  /***/
                },

              /***/ "./node_modules/core-js/internals/iterators-core.js":
                /*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/iterators-core.js ***!
  \**********************************************************/
                /*! no static exports found */
                /***/ function (module, exports, __webpack_require__) {
                  "use strict";

                  var getPrototypeOf = __webpack_require__(
                    /*! ../internals/object-get-prototype-of */ "./node_modules/core-js/internals/object-get-prototype-of.js"
                  );
                  var hide = __webpack_require__(
                    /*! ../internals/hide */ "./node_modules/core-js/internals/hide.js"
                  );
                  var has = __webpack_require__(
                    /*! ../internals/has */ "./node_modules/core-js/internals/has.js"
                  );
                  var wellKnownSymbol = __webpack_require__(
                    /*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js"
                  );
                  var IS_PURE = __webpack_require__(
                    /*! ../internals/is-pure */ "./node_modules/core-js/internals/is-pure.js"
                  );

                  var ITERATOR = wellKnownSymbol("iterator");
                  var BUGGY_SAFARI_ITERATORS = false;

                  var returnThis = function () {
                    return this;
                  };

                  // `%IteratorPrototype%` object
                  // https://tc39.github.io/ecma262/#sec-%iteratorprototype%-object
                  var IteratorPrototype,
                    PrototypeOfArrayIteratorPrototype,
                    arrayIterator;

                  if ([].keys) {
                    arrayIterator = [].keys();
                    // Safari 8 has buggy iterators w/o `next`
                    if (!("next" in arrayIterator))
                      BUGGY_SAFARI_ITERATORS = true;
                    else {
                      PrototypeOfArrayIteratorPrototype = getPrototypeOf(
                        getPrototypeOf(arrayIterator)
                      );
                      if (
                        PrototypeOfArrayIteratorPrototype !== Object.prototype
                      )
                        IteratorPrototype = PrototypeOfArrayIteratorPrototype;
                    }
                  }

                  if (IteratorPrototype == undefined) IteratorPrototype = {};

                  // 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
                  if (!IS_PURE && !has(IteratorPrototype, ITERATOR))
                    hide(IteratorPrototype, ITERATOR, returnThis);

                  module.exports = {
                    IteratorPrototype: IteratorPrototype,
                    BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS,
                  };

                  /***/
                },

              /***/ "./node_modules/core-js/internals/iterators.js":
                /*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/iterators.js ***!
  \*****************************************************/
                /*! no static exports found */
                /***/ function (module, exports) {
                  module.exports = {};

                  /***/
                },

              /***/ "./node_modules/core-js/internals/native-symbol.js":
                /*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/native-symbol.js ***!
  \*********************************************************/
                /*! no static exports found */
                /***/ function (module, exports, __webpack_require__) {
                  var fails = __webpack_require__(
                    /*! ../internals/fails */ "./node_modules/core-js/internals/fails.js"
                  );

                  module.exports =
                    !!Object.getOwnPropertySymbols &&
                    !fails(function () {
                      // Chrome 38 Symbol has incorrect toString conversion
                      // eslint-disable-next-line no-undef
                      return !String(Symbol());
                    });

                  /***/
                },

              /***/ "./node_modules/core-js/internals/native-weak-map.js":
                /*!***********************************************************!*\
  !*** ./node_modules/core-js/internals/native-weak-map.js ***!
  \***********************************************************/
                /*! no static exports found */
                /***/ function (module, exports, __webpack_require__) {
                  var global = __webpack_require__(
                    /*! ../internals/global */ "./node_modules/core-js/internals/global.js"
                  );
                  var nativeFunctionToString = __webpack_require__(
                    /*! ../internals/function-to-string */ "./node_modules/core-js/internals/function-to-string.js"
                  );

                  var WeakMap = global.WeakMap;

                  module.exports =
                    typeof WeakMap === "function" &&
                    /native code/.test(nativeFunctionToString.call(WeakMap));

                  /***/
                },

              /***/ "./node_modules/core-js/internals/object-create.js":
                /*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/object-create.js ***!
  \*********************************************************/
                /*! no static exports found */
                /***/ function (module, exports, __webpack_require__) {
                  var anObject = __webpack_require__(
                    /*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js"
                  );
                  var defineProperties = __webpack_require__(
                    /*! ../internals/object-define-properties */ "./node_modules/core-js/internals/object-define-properties.js"
                  );
                  var enumBugKeys = __webpack_require__(
                    /*! ../internals/enum-bug-keys */ "./node_modules/core-js/internals/enum-bug-keys.js"
                  );
                  var hiddenKeys = __webpack_require__(
                    /*! ../internals/hidden-keys */ "./node_modules/core-js/internals/hidden-keys.js"
                  );
                  var html = __webpack_require__(
                    /*! ../internals/html */ "./node_modules/core-js/internals/html.js"
                  );
                  var documentCreateElement = __webpack_require__(
                    /*! ../internals/document-create-element */ "./node_modules/core-js/internals/document-create-element.js"
                  );
                  var sharedKey = __webpack_require__(
                    /*! ../internals/shared-key */ "./node_modules/core-js/internals/shared-key.js"
                  );
                  var IE_PROTO = sharedKey("IE_PROTO");

                  var PROTOTYPE = "prototype";
                  var Empty = function () {
                    /* empty */
                  };

                  // Create object with fake `null` prototype: use iframe Object with cleared prototype
                  var createDict = function () {
                    // Thrash, waste and sodomy: IE GC bug
                    var iframe = documentCreateElement("iframe");
                    var length = enumBugKeys.length;
                    var lt = "<";
                    var script = "script";
                    var gt = ">";
                    var js = "java" + script + ":";
                    var iframeDocument;
                    iframe.style.display = "none";
                    html.appendChild(iframe);
                    iframe.src = String(js);
                    iframeDocument = iframe.contentWindow.document;
                    iframeDocument.open();
                    iframeDocument.write(
                      lt +
                        script +
                        gt +
                        "document.F=Object" +
                        lt +
                        "/" +
                        script +
                        gt
                    );
                    iframeDocument.close();
                    createDict = iframeDocument.F;
                    while (length--)
                      delete createDict[PROTOTYPE][enumBugKeys[length]];
                    return createDict();
                  };

                  // 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
                  module.exports =
                    Object.create ||
                    function create(O, Properties) {
                      var result;
                      if (O !== null) {
                        Empty[PROTOTYPE] = anObject(O);
                        result = new Empty();
                        Empty[PROTOTYPE] = null;
                        // add "__proto__" for Object.getPrototypeOf polyfill
                        result[IE_PROTO] = O;
                      } else result = createDict();
                      return Properties === undefined
                        ? result
                        : defineProperties(result, Properties);
                    };

                  hiddenKeys[IE_PROTO] = true;

                  /***/
                },

              /***/ "./node_modules/core-js/internals/object-define-properties.js":
                /*!********************************************************************!*\
  !*** ./node_modules/core-js/internals/object-define-properties.js ***!
  \********************************************************************/
                /*! no static exports found */
                /***/ function (module, exports, __webpack_require__) {
                  var DESCRIPTORS = __webpack_require__(
                    /*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js"
                  );
                  var definePropertyModule = __webpack_require__(
                    /*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js"
                  );
                  var anObject = __webpack_require__(
                    /*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js"
                  );
                  var objectKeys = __webpack_require__(
                    /*! ../internals/object-keys */ "./node_modules/core-js/internals/object-keys.js"
                  );

                  module.exports = DESCRIPTORS
                    ? Object.defineProperties
                    : function defineProperties(O, Properties) {
                        anObject(O);
                        var keys = objectKeys(Properties);
                        var length = keys.length;
                        var i = 0;
                        var key;
                        while (length > i)
                          definePropertyModule.f(
                            O,
                            (key = keys[i++]),
                            Properties[key]
                          );
                        return O;
                      };

                  /***/
                },

              /***/ "./node_modules/core-js/internals/object-define-property.js":
                /*!******************************************************************!*\
  !*** ./node_modules/core-js/internals/object-define-property.js ***!
  \******************************************************************/
                /*! no static exports found */
                /***/ function (module, exports, __webpack_require__) {
                  var DESCRIPTORS = __webpack_require__(
                    /*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js"
                  );
                  var IE8_DOM_DEFINE = __webpack_require__(
                    /*! ../internals/ie8-dom-define */ "./node_modules/core-js/internals/ie8-dom-define.js"
                  );
                  var anObject = __webpack_require__(
                    /*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js"
                  );
                  var toPrimitive = __webpack_require__(
                    /*! ../internals/to-primitive */ "./node_modules/core-js/internals/to-primitive.js"
                  );

                  var nativeDefineProperty = Object.defineProperty;

                  exports.f = DESCRIPTORS
                    ? nativeDefineProperty
                    : function defineProperty(O, P, Attributes) {
                        anObject(O);
                        P = toPrimitive(P, true);
                        anObject(Attributes);
                        if (IE8_DOM_DEFINE)
                          try {
                            return nativeDefineProperty(O, P, Attributes);
                          } catch (error) {
                            /* empty */
                          }
                        if ("get" in Attributes || "set" in Attributes)
                          throw TypeError("Accessors not supported");
                        if ("value" in Attributes) O[P] = Attributes.value;
                        return O;
                      };

                  /***/
                },

              /***/ "./node_modules/core-js/internals/object-get-own-property-descriptor.js":
                /*!******************************************************************************!*\
  !*** ./node_modules/core-js/internals/object-get-own-property-descriptor.js ***!
  \******************************************************************************/
                /*! no static exports found */
                /***/ function (module, exports, __webpack_require__) {
                  var DESCRIPTORS = __webpack_require__(
                    /*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js"
                  );
                  var propertyIsEnumerableModule = __webpack_require__(
                    /*! ../internals/object-property-is-enumerable */ "./node_modules/core-js/internals/object-property-is-enumerable.js"
                  );
                  var createPropertyDescriptor = __webpack_require__(
                    /*! ../internals/create-property-descriptor */ "./node_modules/core-js/internals/create-property-descriptor.js"
                  );
                  var toIndexedObject = __webpack_require__(
                    /*! ../internals/to-indexed-object */ "./node_modules/core-js/internals/to-indexed-object.js"
                  );
                  var toPrimitive = __webpack_require__(
                    /*! ../internals/to-primitive */ "./node_modules/core-js/internals/to-primitive.js"
                  );
                  var has = __webpack_require__(
                    /*! ../internals/has */ "./node_modules/core-js/internals/has.js"
                  );
                  var IE8_DOM_DEFINE = __webpack_require__(
                    /*! ../internals/ie8-dom-define */ "./node_modules/core-js/internals/ie8-dom-define.js"
                  );

                  var nativeGetOwnPropertyDescriptor =
                    Object.getOwnPropertyDescriptor;

                  exports.f = DESCRIPTORS
                    ? nativeGetOwnPropertyDescriptor
                    : function getOwnPropertyDescriptor(O, P) {
                        O = toIndexedObject(O);
                        P = toPrimitive(P, true);
                        if (IE8_DOM_DEFINE)
                          try {
                            return nativeGetOwnPropertyDescriptor(O, P);
                          } catch (error) {
                            /* empty */
                          }
                        if (has(O, P))
                          return createPropertyDescriptor(
                            !propertyIsEnumerableModule.f.call(O, P),
                            O[P]
                          );
                      };

                  /***/
                },

              /***/ "./node_modules/core-js/internals/object-get-own-property-names.js":
                /*!*************************************************************************!*\
  !*** ./node_modules/core-js/internals/object-get-own-property-names.js ***!
  \*************************************************************************/
                /*! no static exports found */
                /***/ function (module, exports, __webpack_require__) {
                  // 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
                  var internalObjectKeys = __webpack_require__(
                    /*! ../internals/object-keys-internal */ "./node_modules/core-js/internals/object-keys-internal.js"
                  );
                  var enumBugKeys = __webpack_require__(
                    /*! ../internals/enum-bug-keys */ "./node_modules/core-js/internals/enum-bug-keys.js"
                  );

                  var hiddenKeys = enumBugKeys.concat("length", "prototype");

                  exports.f =
                    Object.getOwnPropertyNames ||
                    function getOwnPropertyNames(O) {
                      return internalObjectKeys(O, hiddenKeys);
                    };

                  /***/
                },

              /***/ "./node_modules/core-js/internals/object-get-own-property-symbols.js":
                /*!***************************************************************************!*\
  !*** ./node_modules/core-js/internals/object-get-own-property-symbols.js ***!
  \***************************************************************************/
                /*! no static exports found */
                /***/ function (module, exports) {
                  exports.f = Object.getOwnPropertySymbols;

                  /***/
                },

              /***/ "./node_modules/core-js/internals/object-get-prototype-of.js":
                /*!*******************************************************************!*\
  !*** ./node_modules/core-js/internals/object-get-prototype-of.js ***!
  \*******************************************************************/
                /*! no static exports found */
                /***/ function (module, exports, __webpack_require__) {
                  var has = __webpack_require__(
                    /*! ../internals/has */ "./node_modules/core-js/internals/has.js"
                  );
                  var toObject = __webpack_require__(
                    /*! ../internals/to-object */ "./node_modules/core-js/internals/to-object.js"
                  );
                  var sharedKey = __webpack_require__(
                    /*! ../internals/shared-key */ "./node_modules/core-js/internals/shared-key.js"
                  );
                  var CORRECT_PROTOTYPE_GETTER = __webpack_require__(
                    /*! ../internals/correct-prototype-getter */ "./node_modules/core-js/internals/correct-prototype-getter.js"
                  );

                  var IE_PROTO = sharedKey("IE_PROTO");
                  var ObjectPrototype = Object.prototype;

                  // 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
                  module.exports = CORRECT_PROTOTYPE_GETTER
                    ? Object.getPrototypeOf
                    : function (O) {
                        O = toObject(O);
                        if (has(O, IE_PROTO)) return O[IE_PROTO];
                        if (
                          typeof O.constructor == "function" &&
                          O instanceof O.constructor
                        ) {
                          return O.constructor.prototype;
                        }
                        return O instanceof Object ? ObjectPrototype : null;
                      };

                  /***/
                },

              /***/ "./node_modules/core-js/internals/object-keys-internal.js":
                /*!****************************************************************!*\
  !*** ./node_modules/core-js/internals/object-keys-internal.js ***!
  \****************************************************************/
                /*! no static exports found */
                /***/ function (module, exports, __webpack_require__) {
                  var has = __webpack_require__(
                    /*! ../internals/has */ "./node_modules/core-js/internals/has.js"
                  );
                  var toIndexedObject = __webpack_require__(
                    /*! ../internals/to-indexed-object */ "./node_modules/core-js/internals/to-indexed-object.js"
                  );
                  var arrayIncludes = __webpack_require__(
                    /*! ../internals/array-includes */ "./node_modules/core-js/internals/array-includes.js"
                  );
                  var hiddenKeys = __webpack_require__(
                    /*! ../internals/hidden-keys */ "./node_modules/core-js/internals/hidden-keys.js"
                  );

                  var arrayIndexOf = arrayIncludes(false);

                  module.exports = function (object, names) {
                    var O = toIndexedObject(object);
                    var i = 0;
                    var result = [];
                    var key;
                    for (key in O)
                      !has(hiddenKeys, key) && has(O, key) && result.push(key);
                    // Don't enum bug & hidden keys
                    while (names.length > i)
                      if (has(O, (key = names[i++]))) {
                        ~arrayIndexOf(result, key) || result.push(key);
                      }
                    return result;
                  };

                  /***/
                },

              /***/ "./node_modules/core-js/internals/object-keys.js":
                /*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/object-keys.js ***!
  \*******************************************************/
                /*! no static exports found */
                /***/ function (module, exports, __webpack_require__) {
                  var internalObjectKeys = __webpack_require__(
                    /*! ../internals/object-keys-internal */ "./node_modules/core-js/internals/object-keys-internal.js"
                  );
                  var enumBugKeys = __webpack_require__(
                    /*! ../internals/enum-bug-keys */ "./node_modules/core-js/internals/enum-bug-keys.js"
                  );

                  // 19.1.2.14 / 15.2.3.14 Object.keys(O)
                  module.exports =
                    Object.keys ||
                    function keys(O) {
                      return internalObjectKeys(O, enumBugKeys);
                    };

                  /***/
                },

              /***/ "./node_modules/core-js/internals/object-property-is-enumerable.js":
                /*!*************************************************************************!*\
  !*** ./node_modules/core-js/internals/object-property-is-enumerable.js ***!
  \*************************************************************************/
                /*! no static exports found */
                /***/ function (module, exports, __webpack_require__) {
                  "use strict";

                  var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
                  var getOwnPropertyDescriptor =
                    Object.getOwnPropertyDescriptor;

                  // Nashorn ~ JDK8 bug
                  var NASHORN_BUG =
                    getOwnPropertyDescriptor &&
                    !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

                  exports.f = NASHORN_BUG
                    ? function propertyIsEnumerable(V) {
                        var descriptor = getOwnPropertyDescriptor(this, V);
                        return !!descriptor && descriptor.enumerable;
                      }
                    : nativePropertyIsEnumerable;

                  /***/
                },

              /***/ "./node_modules/core-js/internals/object-set-prototype-of.js":
                /*!*******************************************************************!*\
  !*** ./node_modules/core-js/internals/object-set-prototype-of.js ***!
  \*******************************************************************/
                /*! no static exports found */
                /***/ function (module, exports, __webpack_require__) {
                  var validateSetPrototypeOfArguments = __webpack_require__(
                    /*! ../internals/validate-set-prototype-of-arguments */ "./node_modules/core-js/internals/validate-set-prototype-of-arguments.js"
                  );

                  // Works with __proto__ only. Old v8 can't work with null proto objects.
                  /* eslint-disable no-proto */
                  module.exports =
                    Object.setPrototypeOf ||
                    ("__proto__" in {}
                      ? (function () {
                          var correctSetter = false;
                          var test = {};
                          var setter;
                          try {
                            setter = Object.getOwnPropertyDescriptor(
                              Object.prototype,
                              "__proto__"
                            ).set;
                            setter.call(test, []);
                            correctSetter = test instanceof Array;
                          } catch (error) {
                            /* empty */
                          }
                          return function setPrototypeOf(O, proto) {
                            validateSetPrototypeOfArguments(O, proto);
                            if (correctSetter) setter.call(O, proto);
                            else O.__proto__ = proto;
                            return O;
                          };
                        })()
                      : undefined);

                  /***/
                },

              /***/ "./node_modules/core-js/internals/own-keys.js":
                /*!****************************************************!*\
  !*** ./node_modules/core-js/internals/own-keys.js ***!
  \****************************************************/
                /*! no static exports found */
                /***/ function (module, exports, __webpack_require__) {
                  var global = __webpack_require__(
                    /*! ../internals/global */ "./node_modules/core-js/internals/global.js"
                  );
                  var getOwnPropertyNamesModule = __webpack_require__(
                    /*! ../internals/object-get-own-property-names */ "./node_modules/core-js/internals/object-get-own-property-names.js"
                  );
                  var getOwnPropertySymbolsModule = __webpack_require__(
                    /*! ../internals/object-get-own-property-symbols */ "./node_modules/core-js/internals/object-get-own-property-symbols.js"
                  );
                  var anObject = __webpack_require__(
                    /*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js"
                  );

                  var Reflect = global.Reflect;

                  // all object keys, includes non-enumerable and symbols
                  module.exports =
                    (Reflect && Reflect.ownKeys) ||
                    function ownKeys(it) {
                      var keys = getOwnPropertyNamesModule.f(anObject(it));
                      var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
                      return getOwnPropertySymbols
                        ? keys.concat(getOwnPropertySymbols(it))
                        : keys;
                    };

                  /***/
                },

              /***/ "./node_modules/core-js/internals/path.js":
                /*!************************************************!*\
  !*** ./node_modules/core-js/internals/path.js ***!
  \************************************************/
                /*! no static exports found */
                /***/ function (module, exports, __webpack_require__) {
                  module.exports = __webpack_require__(
                    /*! ../internals/global */ "./node_modules/core-js/internals/global.js"
                  );

                  /***/
                },

              /***/ "./node_modules/core-js/internals/redefine.js":
                /*!****************************************************!*\
  !*** ./node_modules/core-js/internals/redefine.js ***!
  \****************************************************/
                /*! no static exports found */
                /***/ function (module, exports, __webpack_require__) {
                  var global = __webpack_require__(
                    /*! ../internals/global */ "./node_modules/core-js/internals/global.js"
                  );
                  var shared = __webpack_require__(
                    /*! ../internals/shared */ "./node_modules/core-js/internals/shared.js"
                  );
                  var hide = __webpack_require__(
                    /*! ../internals/hide */ "./node_modules/core-js/internals/hide.js"
                  );
                  var has = __webpack_require__(
                    /*! ../internals/has */ "./node_modules/core-js/internals/has.js"
                  );
                  var setGlobal = __webpack_require__(
                    /*! ../internals/set-global */ "./node_modules/core-js/internals/set-global.js"
                  );
                  var nativeFunctionToString = __webpack_require__(
                    /*! ../internals/function-to-string */ "./node_modules/core-js/internals/function-to-string.js"
                  );
                  var InternalStateModule = __webpack_require__(
                    /*! ../internals/internal-state */ "./node_modules/core-js/internals/internal-state.js"
                  );

                  var getInternalState = InternalStateModule.get;
                  var enforceInternalState = InternalStateModule.enforce;
                  var TEMPLATE = String(nativeFunctionToString).split(
                    "toString"
                  );

                  shared("inspectSource", function (it) {
                    return nativeFunctionToString.call(it);
                  });

                  (module.exports = function (O, key, value, options) {
                    var unsafe = options ? !!options.unsafe : false;
                    var simple = options ? !!options.enumerable : false;
                    var noTargetGet = options ? !!options.noTargetGet : false;
                    if (typeof value == "function") {
                      if (typeof key == "string" && !has(value, "name"))
                        hide(value, "name", key);
                      enforceInternalState(value).source = TEMPLATE.join(
                        typeof key == "string" ? key : ""
                      );
                    }
                    if (O === global) {
                      if (simple) O[key] = value;
                      else setGlobal(key, value);
                      return;
                    } else if (!unsafe) {
                      delete O[key];
                    } else if (!noTargetGet && O[key]) {
                      simple = true;
                    }
                    if (simple) O[key] = value;
                    else hide(O, key, value);
                    // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
                  })(Function.prototype, "toString", function toString() {
                    return (
                      (typeof this == "function" &&
                        getInternalState(this).source) ||
                      nativeFunctionToString.call(this)
                    );
                  });

                  /***/
                },

              /***/ "./node_modules/core-js/internals/require-object-coercible.js":
                /*!********************************************************************!*\
  !*** ./node_modules/core-js/internals/require-object-coercible.js ***!
  \********************************************************************/
                /*! no static exports found */
                /***/ function (module, exports) {
                  // `RequireObjectCoercible` abstract operation
                  // https://tc39.github.io/ecma262/#sec-requireobjectcoercible
                  module.exports = function (it) {
                    if (it == undefined)
                      throw TypeError("Can't call method on " + it);
                    return it;
                  };

                  /***/
                },

              /***/ "./node_modules/core-js/internals/set-global.js":
                /*!******************************************************!*\
  !*** ./node_modules/core-js/internals/set-global.js ***!
  \******************************************************/
                /*! no static exports found */
                /***/ function (module, exports, __webpack_require__) {
                  var global = __webpack_require__(
                    /*! ../internals/global */ "./node_modules/core-js/internals/global.js"
                  );
                  var hide = __webpack_require__(
                    /*! ../internals/hide */ "./node_modules/core-js/internals/hide.js"
                  );

                  module.exports = function (key, value) {
                    try {
                      hide(global, key, value);
                    } catch (error) {
                      global[key] = value;
                    }
                    return value;
                  };

                  /***/
                },

              /***/ "./node_modules/core-js/internals/set-to-string-tag.js":
                /*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/set-to-string-tag.js ***!
  \*************************************************************/
                /*! no static exports found */
                /***/ function (module, exports, __webpack_require__) {
                  var defineProperty = __webpack_require__(
                    /*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js"
                  ).f;
                  var has = __webpack_require__(
                    /*! ../internals/has */ "./node_modules/core-js/internals/has.js"
                  );
                  var wellKnownSymbol = __webpack_require__(
                    /*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js"
                  );

                  var TO_STRING_TAG = wellKnownSymbol("toStringTag");

                  module.exports = function (it, TAG, STATIC) {
                    if (
                      it &&
                      !has((it = STATIC ? it : it.prototype), TO_STRING_TAG)
                    ) {
                      defineProperty(it, TO_STRING_TAG, {
                        configurable: true,
                        value: TAG,
                      });
                    }
                  };

                  /***/
                },

              /***/ "./node_modules/core-js/internals/shared-key.js":
                /*!******************************************************!*\
  !*** ./node_modules/core-js/internals/shared-key.js ***!
  \******************************************************/
                /*! no static exports found */
                /***/ function (module, exports, __webpack_require__) {
                  var shared = __webpack_require__(
                    /*! ../internals/shared */ "./node_modules/core-js/internals/shared.js"
                  );
                  var uid = __webpack_require__(
                    /*! ../internals/uid */ "./node_modules/core-js/internals/uid.js"
                  );

                  var keys = shared("keys");

                  module.exports = function (key) {
                    return keys[key] || (keys[key] = uid(key));
                  };

                  /***/
                },

              /***/ "./node_modules/core-js/internals/shared.js":
                /*!**************************************************!*\
  !*** ./node_modules/core-js/internals/shared.js ***!
  \**************************************************/
                /*! no static exports found */
                /***/ function (module, exports, __webpack_require__) {
                  var global = __webpack_require__(
                    /*! ../internals/global */ "./node_modules/core-js/internals/global.js"
                  );
                  var setGlobal = __webpack_require__(
                    /*! ../internals/set-global */ "./node_modules/core-js/internals/set-global.js"
                  );
                  var IS_PURE = __webpack_require__(
                    /*! ../internals/is-pure */ "./node_modules/core-js/internals/is-pure.js"
                  );

                  var SHARED = "__core-js_shared__";
                  var store = global[SHARED] || setGlobal(SHARED, {});

                  (module.exports = function (key, value) {
                    return (
                      store[key] ||
                      (store[key] = value !== undefined ? value : {})
                    );
                  })("versions", []).push({
                    version: "3.1.3",
                    mode: IS_PURE ? "pure" : "global",
                    copyright: "© 2019 Denis Pushkarev (zloirock.ru)",
                  });

                  /***/
                },

              /***/ "./node_modules/core-js/internals/string-at.js":
                /*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/string-at.js ***!
  \*****************************************************/
                /*! no static exports found */
                /***/ function (module, exports, __webpack_require__) {
                  var toInteger = __webpack_require__(
                    /*! ../internals/to-integer */ "./node_modules/core-js/internals/to-integer.js"
                  );
                  var requireObjectCoercible = __webpack_require__(
                    /*! ../internals/require-object-coercible */ "./node_modules/core-js/internals/require-object-coercible.js"
                  );

                  // CONVERT_TO_STRING: true  -> String#at
                  // CONVERT_TO_STRING: false -> String#codePointAt
                  module.exports = function (that, pos, CONVERT_TO_STRING) {
                    var S = String(requireObjectCoercible(that));
                    var position = toInteger(pos);
                    var size = S.length;
                    var first, second;
                    if (position < 0 || position >= size)
                      return CONVERT_TO_STRING ? "" : undefined;
                    first = S.charCodeAt(position);
                    return first < 0xd800 ||
                      first > 0xdbff ||
                      position + 1 === size ||
                      (second = S.charCodeAt(position + 1)) < 0xdc00 ||
                      second > 0xdfff
                      ? CONVERT_TO_STRING
                        ? S.charAt(position)
                        : first
                      : CONVERT_TO_STRING
                      ? S.slice(position, position + 2)
                      : ((first - 0xd800) << 10) + (second - 0xdc00) + 0x10000;
                  };

                  /***/
                },

              /***/ "./node_modules/core-js/internals/to-absolute-index.js":
                /*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/to-absolute-index.js ***!
  \*************************************************************/
                /*! no static exports found */
                /***/ function (module, exports, __webpack_require__) {
                  var toInteger = __webpack_require__(
                    /*! ../internals/to-integer */ "./node_modules/core-js/internals/to-integer.js"
                  );

                  var max = Math.max;
                  var min = Math.min;

                  // Helper for a popular repeating case of the spec:
                  // Let integer be ? ToInteger(index).
                  // If integer < 0, let result be max((length + integer), 0); else let result be min(length, length).
                  module.exports = function (index, length) {
                    var integer = toInteger(index);
                    return integer < 0
                      ? max(integer + length, 0)
                      : min(integer, length);
                  };

                  /***/
                },

              /***/ "./node_modules/core-js/internals/to-indexed-object.js":
                /*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/to-indexed-object.js ***!
  \*************************************************************/
                /*! no static exports found */
                /***/ function (module, exports, __webpack_require__) {
                  // toObject with fallback for non-array-like ES3 strings
                  var IndexedObject = __webpack_require__(
                    /*! ../internals/indexed-object */ "./node_modules/core-js/internals/indexed-object.js"
                  );
                  var requireObjectCoercible = __webpack_require__(
                    /*! ../internals/require-object-coercible */ "./node_modules/core-js/internals/require-object-coercible.js"
                  );

                  module.exports = function (it) {
                    return IndexedObject(requireObjectCoercible(it));
                  };

                  /***/
                },

              /***/ "./node_modules/core-js/internals/to-integer.js":
                /*!******************************************************!*\
  !*** ./node_modules/core-js/internals/to-integer.js ***!
  \******************************************************/
                /*! no static exports found */
                /***/ function (module, exports) {
                  var ceil = Math.ceil;
                  var floor = Math.floor;

                  // `ToInteger` abstract operation
                  // https://tc39.github.io/ecma262/#sec-tointeger
                  module.exports = function (argument) {
                    return isNaN((argument = +argument))
                      ? 0
                      : (argument > 0 ? floor : ceil)(argument);
                  };

                  /***/
                },

              /***/ "./node_modules/core-js/internals/to-length.js":
                /*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/to-length.js ***!
  \*****************************************************/
                /*! no static exports found */
                /***/ function (module, exports, __webpack_require__) {
                  var toInteger = __webpack_require__(
                    /*! ../internals/to-integer */ "./node_modules/core-js/internals/to-integer.js"
                  );

                  var min = Math.min;

                  // `ToLength` abstract operation
                  // https://tc39.github.io/ecma262/#sec-tolength
                  module.exports = function (argument) {
                    return argument > 0
                      ? min(toInteger(argument), 0x1fffffffffffff)
                      : 0; // 2 ** 53 - 1 == 9007199254740991
                  };

                  /***/
                },

              /***/ "./node_modules/core-js/internals/to-object.js":
                /*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/to-object.js ***!
  \*****************************************************/
                /*! no static exports found */
                /***/ function (module, exports, __webpack_require__) {
                  var requireObjectCoercible = __webpack_require__(
                    /*! ../internals/require-object-coercible */ "./node_modules/core-js/internals/require-object-coercible.js"
                  );

                  // `ToObject` abstract operation
                  // https://tc39.github.io/ecma262/#sec-toobject
                  module.exports = function (argument) {
                    return Object(requireObjectCoercible(argument));
                  };

                  /***/
                },

              /***/ "./node_modules/core-js/internals/to-primitive.js":
                /*!********************************************************!*\
  !*** ./node_modules/core-js/internals/to-primitive.js ***!
  \********************************************************/
                /*! no static exports found */
                /***/ function (module, exports, __webpack_require__) {
                  var isObject = __webpack_require__(
                    /*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js"
                  );

                  // 7.1.1 ToPrimitive(input [, PreferredType])
                  // instead of the ES6 spec version, we didn't implement @@toPrimitive case
                  // and the second argument - flag - preferred type is a string
                  module.exports = function (it, S) {
                    if (!isObject(it)) return it;
                    var fn, val;
                    if (
                      S &&
                      typeof (fn = it.toString) == "function" &&
                      !isObject((val = fn.call(it)))
                    )
                      return val;
                    if (
                      typeof (fn = it.valueOf) == "function" &&
                      !isObject((val = fn.call(it)))
                    )
                      return val;
                    if (
                      !S &&
                      typeof (fn = it.toString) == "function" &&
                      !isObject((val = fn.call(it)))
                    )
                      return val;
                    throw TypeError("Can't convert object to primitive value");
                  };

                  /***/
                },

              /***/ "./node_modules/core-js/internals/uid.js":
                /*!***********************************************!*\
  !*** ./node_modules/core-js/internals/uid.js ***!
  \***********************************************/
                /*! no static exports found */
                /***/ function (module, exports) {
                  var id = 0;
                  var postfix = Math.random();

                  module.exports = function (key) {
                    return "Symbol(".concat(
                      key === undefined ? "" : key,
                      ")_",
                      (++id + postfix).toString(36)
                    );
                  };

                  /***/
                },

              /***/ "./node_modules/core-js/internals/validate-set-prototype-of-arguments.js":
                /*!*******************************************************************************!*\
  !*** ./node_modules/core-js/internals/validate-set-prototype-of-arguments.js ***!
  \*******************************************************************************/
                /*! no static exports found */
                /***/ function (module, exports, __webpack_require__) {
                  var isObject = __webpack_require__(
                    /*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js"
                  );
                  var anObject = __webpack_require__(
                    /*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js"
                  );

                  module.exports = function (O, proto) {
                    anObject(O);
                    if (!isObject(proto) && proto !== null) {
                      throw TypeError(
                        "Can't set " + String(proto) + " as a prototype"
                      );
                    }
                  };

                  /***/
                },

              /***/ "./node_modules/core-js/internals/well-known-symbol.js":
                /*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/well-known-symbol.js ***!
  \*************************************************************/
                /*! no static exports found */
                /***/ function (module, exports, __webpack_require__) {
                  var global = __webpack_require__(
                    /*! ../internals/global */ "./node_modules/core-js/internals/global.js"
                  );
                  var shared = __webpack_require__(
                    /*! ../internals/shared */ "./node_modules/core-js/internals/shared.js"
                  );
                  var uid = __webpack_require__(
                    /*! ../internals/uid */ "./node_modules/core-js/internals/uid.js"
                  );
                  var NATIVE_SYMBOL = __webpack_require__(
                    /*! ../internals/native-symbol */ "./node_modules/core-js/internals/native-symbol.js"
                  );

                  var Symbol = global.Symbol;
                  var store = shared("wks");

                  module.exports = function (name) {
                    return (
                      store[name] ||
                      (store[name] =
                        (NATIVE_SYMBOL && Symbol[name]) ||
                        (NATIVE_SYMBOL ? Symbol : uid)("Symbol." + name))
                    );
                  };

                  /***/
                },

              /***/ "./node_modules/core-js/modules/es.array.from.js":
                /*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es.array.from.js ***!
  \*******************************************************/
                /*! no static exports found */
                /***/ function (module, exports, __webpack_require__) {
                  var $ = __webpack_require__(
                    /*! ../internals/export */ "./node_modules/core-js/internals/export.js"
                  );
                  var from = __webpack_require__(
                    /*! ../internals/array-from */ "./node_modules/core-js/internals/array-from.js"
                  );
                  var checkCorrectnessOfIteration = __webpack_require__(
                    /*! ../internals/check-correctness-of-iteration */ "./node_modules/core-js/internals/check-correctness-of-iteration.js"
                  );

                  var INCORRECT_ITERATION = !checkCorrectnessOfIteration(
                    function (iterable) {
                      Array.from(iterable);
                    }
                  );

                  // `Array.from` method
                  // https://tc39.github.io/ecma262/#sec-array.from
                  $(
                    {
                      target: "Array",
                      stat: true,
                      forced: INCORRECT_ITERATION,
                    },
                    {
                      from: from,
                    }
                  );

                  /***/
                },

              /***/ "./node_modules/core-js/modules/es.string.iterator.js":
                /*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es.string.iterator.js ***!
  \************************************************************/
                /*! no static exports found */
                /***/ function (module, exports, __webpack_require__) {
                  "use strict";

                  var codePointAt = __webpack_require__(
                    /*! ../internals/string-at */ "./node_modules/core-js/internals/string-at.js"
                  );
                  var InternalStateModule = __webpack_require__(
                    /*! ../internals/internal-state */ "./node_modules/core-js/internals/internal-state.js"
                  );
                  var defineIterator = __webpack_require__(
                    /*! ../internals/define-iterator */ "./node_modules/core-js/internals/define-iterator.js"
                  );

                  var STRING_ITERATOR = "String Iterator";
                  var setInternalState = InternalStateModule.set;
                  var getInternalState =
                    InternalStateModule.getterFor(STRING_ITERATOR);

                  // `String.prototype[@@iterator]` method
                  // https://tc39.github.io/ecma262/#sec-string.prototype-@@iterator
                  defineIterator(
                    String,
                    "String",
                    function (iterated) {
                      setInternalState(this, {
                        type: STRING_ITERATOR,
                        string: String(iterated),
                        index: 0,
                      });
                      // `%StringIteratorPrototype%.next` method
                      // https://tc39.github.io/ecma262/#sec-%stringiteratorprototype%.next
                    },
                    function next() {
                      var state = getInternalState(this);
                      var string = state.string;
                      var index = state.index;
                      var point;
                      if (index >= string.length)
                        return { value: undefined, done: true };
                      point = codePointAt(string, index, true);
                      state.index += point.length;
                      return { value: point, done: false };
                    }
                  );

                  /***/
                },

              /***/ "./node_modules/webpack/buildin/global.js":
                /*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
                /*! no static exports found */
                /***/ function (module, exports) {
                  var g;

                  // This works in non-strict mode
                  g = (function () {
                    return this;
                  })();

                  try {
                    // This works if eval is allowed (see CSP)
                    g = g || Function("return this")() || (1, eval)("this");
                  } catch (e) {
                    // This works if the window reference is available
                    if (typeof window === "object") g = window;
                  }

                  // g can still be undefined, but nothing to do about it...
                  // We return undefined, instead of nothing here, so it's
                  // easier to handle this case. if(!global) { ...}

                  module.exports = g;

                  /***/
                },

              /***/ "./src/default-attrs.json":
                /*!********************************!*\
  !*** ./src/default-attrs.json ***!
  \********************************/
                /*! exports provided: xmlns, width, height, viewBox, fill, stroke, stroke-width, stroke-linecap, stroke-linejoin, default */
                /***/ function (module) {
                  module.exports = {
                    xmlns: "http://www.w3.org/2000/svg",
                    width: 24,
                    height: 24,
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    "stroke-width": 2,
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                  };

                  /***/
                },

              /***/ "./src/icon.js":
                /*!*********************!*\
  !*** ./src/icon.js ***!
  \*********************/
                /*! no static exports found */
                /***/ function (module, exports, __webpack_require__) {
                  "use strict";

                  Object.defineProperty(exports, "__esModule", {
                    value: true,
                  });

                  var _extends =
                    Object.assign ||
                    function (target) {
                      for (var i = 1; i < arguments.length; i++) {
                        var source = arguments[i];
                        for (var key in source) {
                          if (
                            Object.prototype.hasOwnProperty.call(source, key)
                          ) {
                            target[key] = source[key];
                          }
                        }
                      }
                      return target;
                    };

                  var _createClass = (function () {
                    function defineProperties(target, props) {
                      for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(
                          target,
                          descriptor.key,
                          descriptor
                        );
                      }
                    }
                    return function (Constructor, protoProps, staticProps) {
                      if (protoProps)
                        defineProperties(Constructor.prototype, protoProps);
                      if (staticProps)
                        defineProperties(Constructor, staticProps);
                      return Constructor;
                    };
                  })();

                  var _dedupe = __webpack_require__(
                    /*! classnames/dedupe */ "./node_modules/classnames/dedupe.js"
                  );

                  var _dedupe2 = _interopRequireDefault(_dedupe);

                  var _defaultAttrs = __webpack_require__(
                    /*! ./default-attrs.json */ "./src/default-attrs.json"
                  );

                  var _defaultAttrs2 = _interopRequireDefault(_defaultAttrs);

                  function _interopRequireDefault(obj) {
                    return obj && obj.__esModule ? obj : { default: obj };
                  }

                  function _classCallCheck(instance, Constructor) {
                    if (!(instance instanceof Constructor)) {
                      throw new TypeError("Cannot call a class as a function");
                    }
                  }

                  var Icon = (function () {
                    function Icon(name, contents) {
                      var tags =
                        arguments.length > 2 && arguments[2] !== undefined
                          ? arguments[2]
                          : [];

                      _classCallCheck(this, Icon);

                      this.name = name;
                      this.contents = contents;
                      this.tags = tags;
                      this.attrs = _extends({}, _defaultAttrs2.default, {
                        class: "feather feather-" + name,
                      });
                    }

                    /**
                     * Create an SVG string.
                     * @param {Object} attrs
                     * @returns {string}
                     */

                    _createClass(Icon, [
                      {
                        key: "toSvg",
                        value: function toSvg() {
                          var attrs =
                            arguments.length > 0 && arguments[0] !== undefined
                              ? arguments[0]
                              : {};

                          var combinedAttrs = _extends({}, this.attrs, attrs, {
                            class: (0, _dedupe2.default)(
                              this.attrs.class,
                              attrs.class
                            ),
                          });

                          return (
                            "<svg " +
                            attrsToString(combinedAttrs) +
                            ">" +
                            this.contents +
                            "</svg>"
                          );
                        },

                        /**
                         * Return string representation of an `Icon`.
                         *
                         * Added for backward compatibility. If old code expects `feather.icons.<name>`
                         * to be a string, `toString()` will get implicitly called.
                         *
                         * @returns {string}
                         */
                      },
                      {
                        key: "toString",
                        value: function toString() {
                          return this.contents;
                        },
                      },
                    ]);

                    return Icon;
                  })();

                  /**
                   * Convert attributes object to string of HTML attributes.
                   * @param {Object} attrs
                   * @returns {string}
                   */

                  function attrsToString(attrs) {
                    return Object.keys(attrs)
                      .map(function (key) {
                        return key + '="' + attrs[key] + '"';
                      })
                      .join(" ");
                  }

                  exports.default = Icon;

                  /***/
                },

              /***/ "./src/icons.js":
                /*!**********************!*\
  !*** ./src/icons.js ***!
  \**********************/
                /*! no static exports found */
                /***/ function (module, exports, __webpack_require__) {
                  "use strict";

                  Object.defineProperty(exports, "__esModule", {
                    value: true,
                  });

                  var _icon = __webpack_require__(
                    /*! ./icon */ "./src/icon.js"
                  );

                  var _icon2 = _interopRequireDefault(_icon);

                  var _icons = __webpack_require__(
                    /*! ../dist/icons.json */ "./dist/icons.json"
                  );

                  var _icons2 = _interopRequireDefault(_icons);

                  var _tags = __webpack_require__(
                    /*! ./tags.json */ "./src/tags.json"
                  );

                  var _tags2 = _interopRequireDefault(_tags);

                  function _interopRequireDefault(obj) {
                    return obj && obj.__esModule ? obj : { default: obj };
                  }

                  exports.default = Object.keys(_icons2.default)
                    .map(function (key) {
                      return new _icon2.default(
                        key,
                        _icons2.default[key],
                        _tags2.default[key]
                      );
                    })
                    .reduce(function (object, icon) {
                      object[icon.name] = icon;
                      return object;
                    }, {});

                  /***/
                },

              /***/ "./src/index.js":
                /*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
                /*! no static exports found */
                /***/ function (module, exports, __webpack_require__) {
                  "use strict";

                  var _icons = __webpack_require__(
                    /*! ./icons */ "./src/icons.js"
                  );

                  var _icons2 = _interopRequireDefault(_icons);

                  var _toSvg = __webpack_require__(
                    /*! ./to-svg */ "./src/to-svg.js"
                  );

                  var _toSvg2 = _interopRequireDefault(_toSvg);

                  var _replace = __webpack_require__(
                    /*! ./replace */ "./src/replace.js"
                  );

                  var _replace2 = _interopRequireDefault(_replace);

                  function _interopRequireDefault(obj) {
                    return obj && obj.__esModule ? obj : { default: obj };
                  }

                  module.exports = {
                    icons: _icons2.default,
                    toSvg: _toSvg2.default,
                    replace: _replace2.default,
                  };

                  /***/
                },

              /***/ "./src/replace.js":
                /*!************************!*\
  !*** ./src/replace.js ***!
  \************************/
                /*! no static exports found */
                /***/ function (module, exports, __webpack_require__) {
                  "use strict";

                  Object.defineProperty(exports, "__esModule", {
                    value: true,
                  });

                  var _extends =
                    Object.assign ||
                    function (target) {
                      for (var i = 1; i < arguments.length; i++) {
                        var source = arguments[i];
                        for (var key in source) {
                          if (
                            Object.prototype.hasOwnProperty.call(source, key)
                          ) {
                            target[key] = source[key];
                          }
                        }
                      }
                      return target;
                    }; /* eslint-env browser */

                  var _dedupe = __webpack_require__(
                    /*! classnames/dedupe */ "./node_modules/classnames/dedupe.js"
                  );

                  var _dedupe2 = _interopRequireDefault(_dedupe);

                  var _icons = __webpack_require__(
                    /*! ./icons */ "./src/icons.js"
                  );

                  var _icons2 = _interopRequireDefault(_icons);

                  function _interopRequireDefault(obj) {
                    return obj && obj.__esModule ? obj : { default: obj };
                  }

                  /**
                   * Replace all HTML elements that have a `data-feather` attribute with SVG markup
                   * corresponding to the element's `data-feather` attribute value.
                   * @param {Object} attrs
                   */
                  function replace() {
                    var attrs =
                      arguments.length > 0 && arguments[0] !== undefined
                        ? arguments[0]
                        : {};

                    if (typeof document === "undefined") {
                      throw new Error(
                        "`feather.replace()` only works in a browser environment."
                      );
                    }

                    var elementsToReplace =
                      document.querySelectorAll("[data-feather]");

                    Array.from(elementsToReplace).forEach(function (element) {
                      return replaceElement(element, attrs);
                    });
                  }

                  /**
                   * Replace a single HTML element with SVG markup
                   * corresponding to the element's `data-feather` attribute value.
                   * @param {HTMLElement} element
                   * @param {Object} attrs
                   */
                  function replaceElement(element) {
                    var attrs =
                      arguments.length > 1 && arguments[1] !== undefined
                        ? arguments[1]
                        : {};

                    var elementAttrs = getAttrs(element);
                    var name = elementAttrs["data-feather"];
                    delete elementAttrs["data-feather"];

                    var svgString = _icons2.default[name].toSvg(
                      _extends({}, attrs, elementAttrs, {
                        class: (0, _dedupe2.default)(
                          attrs.class,
                          elementAttrs.class
                        ),
                      })
                    );
                    var svgDocument = new DOMParser().parseFromString(
                      svgString,
                      "image/svg+xml"
                    );
                    var svgElement = svgDocument.querySelector("svg");

                    element.parentNode.replaceChild(svgElement, element);
                  }

                  /**
                   * Get the attributes of an HTML element.
                   * @param {HTMLElement} element
                   * @returns {Object}
                   */
                  function getAttrs(element) {
                    return Array.from(element.attributes).reduce(function (
                      attrs,
                      attr
                    ) {
                      attrs[attr.name] = attr.value;
                      return attrs;
                    },
                    {});
                  }

                  exports.default = replace;

                  /***/
                },

              /***/ "./src/tags.json":
                /*!***********************!*\
  !*** ./src/tags.json ***!
  \***********************/
                /*! exports provided: activity, airplay, alert-circle, alert-octagon, alert-triangle, align-center, align-justify, align-left, align-right, anchor, archive, at-sign, award, aperture, bar-chart, bar-chart-2, battery, battery-charging, bell, bell-off, bluetooth, book-open, book, bookmark, box, briefcase, calendar, camera, cast, circle, clipboard, clock, cloud-drizzle, cloud-lightning, cloud-rain, cloud-snow, cloud, codepen, codesandbox, code, coffee, columns, command, compass, copy, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, cpu, credit-card, crop, crosshair, database, delete, disc, dollar-sign, droplet, edit, edit-2, edit-3, eye, eye-off, external-link, facebook, fast-forward, figma, file-minus, file-plus, file-text, film, filter, flag, folder-minus, folder-plus, folder, framer, frown, gift, git-branch, git-commit, git-merge, git-pull-request, github, gitlab, globe, hard-drive, hash, headphones, heart, help-circle, hexagon, home, image, inbox, instagram, key, layers, layout, life-bouy, link, link-2, linkedin, list, lock, log-in, log-out, mail, map-pin, map, maximize, maximize-2, meh, menu, message-circle, message-square, mic-off, mic, minimize, minimize-2, minus, monitor, moon, more-horizontal, more-vertical, mouse-pointer, move, music, navigation, navigation-2, octagon, package, paperclip, pause, pause-circle, pen-tool, percent, phone-call, phone-forwarded, phone-incoming, phone-missed, phone-off, phone-outgoing, phone, play, pie-chart, play-circle, plus, plus-circle, plus-square, pocket, power, printer, radio, refresh-cw, refresh-ccw, repeat, rewind, rotate-ccw, rotate-cw, rss, save, scissors, search, send, settings, share-2, shield, shield-off, shopping-bag, shopping-cart, shuffle, skip-back, skip-forward, slack, slash, sliders, smartphone, smile, speaker, star, stop-circle, sun, sunrise, sunset, tablet, tag, target, terminal, thermometer, thumbs-down, thumbs-up, toggle-left, toggle-right, tool, trash, trash-2, triangle, truck, tv, twitch, twitter, type, umbrella, unlock, user-check, user-minus, user-plus, user-x, user, users, video-off, video, voicemail, volume, volume-1, volume-2, volume-x, watch, wifi-off, wifi, wind, x-circle, x-octagon, x-square, x, youtube, zap-off, zap, zoom-in, zoom-out, default */
                /***/ function (module) {
                  module.exports = {
                    activity: ["pulse", "health", "action", "motion"],
                    airplay: ["stream", "cast", "mirroring"],
                    "alert-circle": ["warning", "alert", "danger"],
                    "alert-octagon": ["warning", "alert", "danger"],
                    "alert-triangle": ["warning", "alert", "danger"],
                    "align-center": ["text alignment", "center"],
                    "align-justify": ["text alignment", "justified"],
                    "align-left": ["text alignment", "left"],
                    "align-right": ["text alignment", "right"],
                    anchor: [],
                    archive: ["index", "box"],
                    "at-sign": ["mention", "at", "email", "message"],
                    award: ["achievement", "badge"],
                    aperture: ["camera", "photo"],
                    "bar-chart": ["statistics", "diagram", "graph"],
                    "bar-chart-2": ["statistics", "diagram", "graph"],
                    battery: ["power", "electricity"],
                    "battery-charging": ["power", "electricity"],
                    bell: ["alarm", "notification", "sound"],
                    "bell-off": ["alarm", "notification", "silent"],
                    bluetooth: ["wireless"],
                    "book-open": ["read", "library"],
                    book: [
                      "read",
                      "dictionary",
                      "booklet",
                      "magazine",
                      "library",
                    ],
                    bookmark: ["read", "clip", "marker", "tag"],
                    box: ["cube"],
                    briefcase: ["work", "bag", "baggage", "folder"],
                    calendar: ["date"],
                    camera: ["photo"],
                    cast: ["chromecast", "airplay"],
                    circle: ["off", "zero", "record"],
                    clipboard: ["copy"],
                    clock: ["time", "watch", "alarm"],
                    "cloud-drizzle": ["weather", "shower"],
                    "cloud-lightning": ["weather", "bolt"],
                    "cloud-rain": ["weather"],
                    "cloud-snow": ["weather", "blizzard"],
                    cloud: ["weather"],
                    codepen: ["logo"],
                    codesandbox: ["logo"],
                    code: ["source", "programming"],
                    coffee: [
                      "drink",
                      "cup",
                      "mug",
                      "tea",
                      "cafe",
                      "hot",
                      "beverage",
                    ],
                    columns: ["layout"],
                    command: ["keyboard", "cmd", "terminal", "prompt"],
                    compass: ["navigation", "safari", "travel", "direction"],
                    copy: ["clone", "duplicate"],
                    "corner-down-left": ["arrow", "return"],
                    "corner-down-right": ["arrow"],
                    "corner-left-down": ["arrow"],
                    "corner-left-up": ["arrow"],
                    "corner-right-down": ["arrow"],
                    "corner-right-up": ["arrow"],
                    "corner-up-left": ["arrow"],
                    "corner-up-right": ["arrow"],
                    cpu: ["processor", "technology"],
                    "credit-card": ["purchase", "payment", "cc"],
                    crop: ["photo", "image"],
                    crosshair: ["aim", "target"],
                    database: ["storage", "memory"],
                    delete: ["remove"],
                    disc: ["album", "cd", "dvd", "music"],
                    "dollar-sign": ["currency", "money", "payment"],
                    droplet: ["water"],
                    edit: ["pencil", "change"],
                    "edit-2": ["pencil", "change"],
                    "edit-3": ["pencil", "change"],
                    eye: ["view", "watch"],
                    "eye-off": ["view", "watch", "hide", "hidden"],
                    "external-link": ["outbound"],
                    facebook: ["logo", "social"],
                    "fast-forward": ["music"],
                    figma: ["logo", "design", "tool"],
                    "file-minus": ["delete", "remove", "erase"],
                    "file-plus": ["add", "create", "new"],
                    "file-text": ["data", "txt", "pdf"],
                    film: ["movie", "video"],
                    filter: ["funnel", "hopper"],
                    flag: ["report"],
                    "folder-minus": ["directory"],
                    "folder-plus": ["directory"],
                    folder: ["directory"],
                    framer: ["logo", "design", "tool"],
                    frown: ["emoji", "face", "bad", "sad", "emotion"],
                    gift: ["present", "box", "birthday", "party"],
                    "git-branch": ["code", "version control"],
                    "git-commit": ["code", "version control"],
                    "git-merge": ["code", "version control"],
                    "git-pull-request": ["code", "version control"],
                    github: ["logo", "version control"],
                    gitlab: ["logo", "version control"],
                    globe: ["world", "browser", "language", "translate"],
                    "hard-drive": ["computer", "server", "memory", "data"],
                    hash: ["hashtag", "number", "pound"],
                    headphones: ["music", "audio", "sound"],
                    heart: ["like", "love", "emotion"],
                    "help-circle": ["question mark"],
                    hexagon: ["shape", "node.js", "logo"],
                    home: ["house", "living"],
                    image: ["picture"],
                    inbox: ["email"],
                    instagram: ["logo", "camera"],
                    key: ["password", "login", "authentication", "secure"],
                    layers: ["stack"],
                    layout: ["window", "webpage"],
                    "life-bouy": ["help", "life ring", "support"],
                    link: ["chain", "url"],
                    "link-2": ["chain", "url"],
                    linkedin: ["logo", "social media"],
                    list: ["options"],
                    lock: ["security", "password", "secure"],
                    "log-in": ["sign in", "arrow", "enter"],
                    "log-out": ["sign out", "arrow", "exit"],
                    mail: ["email", "message"],
                    "map-pin": ["location", "navigation", "travel", "marker"],
                    map: ["location", "navigation", "travel"],
                    maximize: ["fullscreen"],
                    "maximize-2": ["fullscreen", "arrows", "expand"],
                    meh: ["emoji", "face", "neutral", "emotion"],
                    menu: ["bars", "navigation", "hamburger"],
                    "message-circle": ["comment", "chat"],
                    "message-square": ["comment", "chat"],
                    "mic-off": ["record", "sound", "mute"],
                    mic: ["record", "sound", "listen"],
                    minimize: ["exit fullscreen", "close"],
                    "minimize-2": ["exit fullscreen", "arrows", "close"],
                    minus: ["subtract"],
                    monitor: ["tv", "screen", "display"],
                    moon: ["dark", "night"],
                    "more-horizontal": ["ellipsis"],
                    "more-vertical": ["ellipsis"],
                    "mouse-pointer": ["arrow", "cursor"],
                    move: ["arrows"],
                    music: ["note"],
                    navigation: ["location", "travel"],
                    "navigation-2": ["location", "travel"],
                    octagon: ["stop"],
                    package: ["box", "container"],
                    paperclip: ["attachment"],
                    pause: ["music", "stop"],
                    "pause-circle": ["music", "audio", "stop"],
                    "pen-tool": ["vector", "drawing"],
                    percent: ["discount"],
                    "phone-call": ["ring"],
                    "phone-forwarded": ["call"],
                    "phone-incoming": ["call"],
                    "phone-missed": ["call"],
                    "phone-off": ["call", "mute"],
                    "phone-outgoing": ["call"],
                    phone: ["call"],
                    play: ["music", "start"],
                    "pie-chart": ["statistics", "diagram"],
                    "play-circle": ["music", "start"],
                    plus: ["add", "new"],
                    "plus-circle": ["add", "new"],
                    "plus-square": ["add", "new"],
                    pocket: ["logo", "save"],
                    power: ["on", "off"],
                    printer: ["fax", "office", "device"],
                    radio: ["signal"],
                    "refresh-cw": ["synchronise", "arrows"],
                    "refresh-ccw": ["arrows"],
                    repeat: ["loop", "arrows"],
                    rewind: ["music"],
                    "rotate-ccw": ["arrow"],
                    "rotate-cw": ["arrow"],
                    rss: ["feed", "subscribe"],
                    save: ["floppy disk"],
                    scissors: ["cut"],
                    search: ["find", "magnifier", "magnifying glass"],
                    send: [
                      "message",
                      "mail",
                      "email",
                      "paper airplane",
                      "paper aeroplane",
                    ],
                    settings: ["cog", "edit", "gear", "preferences"],
                    "share-2": ["network", "connections"],
                    shield: ["security", "secure"],
                    "shield-off": ["security", "insecure"],
                    "shopping-bag": ["ecommerce", "cart", "purchase", "store"],
                    "shopping-cart": ["ecommerce", "cart", "purchase", "store"],
                    shuffle: ["music"],
                    "skip-back": ["music"],
                    "skip-forward": ["music"],
                    slack: ["logo"],
                    slash: ["ban", "no"],
                    sliders: ["settings", "controls"],
                    smartphone: ["cellphone", "device"],
                    smile: ["emoji", "face", "happy", "good", "emotion"],
                    speaker: ["audio", "music"],
                    star: ["bookmark", "favorite", "like"],
                    "stop-circle": ["media", "music"],
                    sun: ["brightness", "weather", "light"],
                    sunrise: ["weather", "time", "morning", "day"],
                    sunset: ["weather", "time", "evening", "night"],
                    tablet: ["device"],
                    tag: ["label"],
                    target: ["logo", "bullseye"],
                    terminal: ["code", "command line", "prompt"],
                    thermometer: [
                      "temperature",
                      "celsius",
                      "fahrenheit",
                      "weather",
                    ],
                    "thumbs-down": ["dislike", "bad", "emotion"],
                    "thumbs-up": ["like", "good", "emotion"],
                    "toggle-left": ["on", "off", "switch"],
                    "toggle-right": ["on", "off", "switch"],
                    tool: ["settings", "spanner"],
                    trash: ["garbage", "delete", "remove", "bin"],
                    "trash-2": ["garbage", "delete", "remove", "bin"],
                    triangle: ["delta"],
                    truck: [
                      "delivery",
                      "van",
                      "shipping",
                      "transport",
                      "lorry",
                    ],
                    tv: ["television", "stream"],
                    twitch: ["logo"],
                    twitter: ["logo", "social"],
                    type: ["text"],
                    umbrella: ["rain", "weather"],
                    unlock: ["security"],
                    "user-check": ["followed", "subscribed"],
                    "user-minus": [
                      "delete",
                      "remove",
                      "unfollow",
                      "unsubscribe",
                    ],
                    "user-plus": [
                      "new",
                      "add",
                      "create",
                      "follow",
                      "subscribe",
                    ],
                    "user-x": [
                      "delete",
                      "remove",
                      "unfollow",
                      "unsubscribe",
                      "unavailable",
                    ],
                    user: ["person", "account"],
                    users: ["group"],
                    "video-off": ["camera", "movie", "film"],
                    video: ["camera", "movie", "film"],
                    voicemail: ["phone"],
                    volume: ["music", "sound", "mute"],
                    "volume-1": ["music", "sound"],
                    "volume-2": ["music", "sound"],
                    "volume-x": ["music", "sound", "mute"],
                    watch: ["clock", "time"],
                    "wifi-off": ["disabled"],
                    wifi: ["connection", "signal", "wireless"],
                    wind: ["weather", "air"],
                    "x-circle": [
                      "cancel",
                      "close",
                      "delete",
                      "remove",
                      "times",
                      "clear",
                    ],
                    "x-octagon": [
                      "delete",
                      "stop",
                      "alert",
                      "warning",
                      "times",
                      "clear",
                    ],
                    "x-square": [
                      "cancel",
                      "close",
                      "delete",
                      "remove",
                      "times",
                      "clear",
                    ],
                    x: [
                      "cancel",
                      "close",
                      "delete",
                      "remove",
                      "times",
                      "clear",
                    ],
                    youtube: ["logo", "video", "play"],
                    "zap-off": ["flash", "camera", "lightning"],
                    zap: ["flash", "camera", "lightning"],
                    "zoom-in": ["magnifying glass"],
                    "zoom-out": ["magnifying glass"],
                  };

                  /***/
                },

              /***/ "./src/to-svg.js":
                /*!***********************!*\
  !*** ./src/to-svg.js ***!
  \***********************/
                /*! no static exports found */
                /***/ function (module, exports, __webpack_require__) {
                  "use strict";

                  Object.defineProperty(exports, "__esModule", {
                    value: true,
                  });

                  var _icons = __webpack_require__(
                    /*! ./icons */ "./src/icons.js"
                  );

                  var _icons2 = _interopRequireDefault(_icons);

                  function _interopRequireDefault(obj) {
                    return obj && obj.__esModule ? obj : { default: obj };
                  }

                  /**
                   * Create an SVG string.
                   * @deprecated
                   * @param {string} name
                   * @param {Object} attrs
                   * @returns {string}
                   */
                  function toSvg(name) {
                    var attrs =
                      arguments.length > 1 && arguments[1] !== undefined
                        ? arguments[1]
                        : {};

                    console.warn(
                      "feather.toSvg() is deprecated. Please use feather.icons[name].toSvg() instead."
                    );

                    if (!name) {
                      throw new Error(
                        "The required `key` (icon name) parameter is missing."
                      );
                    }

                    if (!_icons2.default[name]) {
                      throw new Error(
                        "No icon matching '" +
                          name +
                          "'. See the complete list of icons at https://feathericons.com"
                      );
                    }

                    return _icons2.default[name].toSvg(attrs);
                  }

                  exports.default = toSvg;

                  /***/
                },

              /***/ 0:
                /*!**************************************************!*\
  !*** multi core-js/es/array/from ./src/index.js ***!
  \**************************************************/
                /*! no static exports found */
                /***/ function (module, exports, __webpack_require__) {
                  __webpack_require__(
                    /*! core-js/es/array/from */ "./node_modules/core-js/es/array/from.js"
                  );
                  module.exports = __webpack_require__(
                    /*! /home/travis/build/feathericons/feather/src/index.js */ "./src/index.js"
                  );

                  /***/
                },

              /******/
            }
          );
        });
      },
      {},
    ],
    4: [
      function (require, module, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true,
        });
        exports.initBackToTop = initBackToTop;

        function initBackToTop() {
          return {
            scrolled: false,
            height: 600,
            scroll: function scroll(e) {
              var button = document.getElementById("backtotop");
              var scrollValue = window.scrollY;

              if (scrollValue >= this.height) {
                this.scrolled = true;
                button.classList.add("visible");
              } else {
                this.scrolled = false;
                button.classList.remove("visible");
              }
            },
            goTop: function goTop(e) {
              var elementPosition = e.target.offsetTop;
              window.scrollTo({
                top: elementPosition,
                behavior: "smooth",
              });
            },
          };
        }
      },
      {},
    ],
    5: [
      function (require, module, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true,
        });
        exports.initCountdown = initCountdown;

        function initCountdown() {
          return {
            setupCountdown: function setupCountdown() {
              // Set the date we're counting down to
              var countDownDate = new Date("Oct 24, 2023 07:00:00").getTime(); // Update the count down every 1 second

              var x = setInterval(function () {
                // Get todays date and time
                var now = new Date().getTime(); // Find the distance between now and the count down date

                var distance = countDownDate - now;
                var d = document;
                var daysElement = d.querySelector("#days-count");
                var hoursElement = d.querySelector("#hours-count");
                var minutesElement = d.querySelector("#minutes-count");
                var secondsElement = d.querySelector("#seconds-count"); // Time calculations for days, hours, minutes and seconds

                daysElement.textContent = Math.floor(
                  distance / (1000 * 60 * 60 * 24)
                );
                hoursElement.textContent = Math.floor(
                  (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
                );
                minutesElement.textContent = Math.floor(
                  (distance % (1000 * 60 * 60)) / (1000 * 60)
                );
                secondsElement.textContent = Math.floor(
                  (distance % (1000 * 60)) / 1000
                ); // If the count down is finished, write some text

                if (distance < 0) {
                  clearInterval(x);
                }
              }, 1000);
            },
          };
        }
      },
      {},
    ],
    6: [
      function (require, module, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true,
        });
        exports.initHero = initHero;

        function initHero() {
          return {
            initParticles: function initParticles() {
              tsParticles.load("tsparticles", {
                fullScreen: {
                  enable: false
                },
                particles: {
                  number: {
                    value: 50,
                    density: {
                      enable: true,
                      area: 1000,
                    },
                  },
                  color: {
                    value: "#5507fc"
                  },
                  shape: {
                    type: "circle"
                  },
                  stroke: {
                    width: 0,
                    color: "#5507fc"
                  },
                  opacity: {
                    value: 0.6
                  },
                  size: {
                    value: { min: 0, max: 2 }
                  },
                  links: {
                    enable: true,
                    distance: 120,
                    color: "#5507fc",
                    opacity: 0.2,
                    width: 1.6,
                  },
                  move: {
                    enable: true,
                    speed: 1.5,
                    direction: "top",
                    outModes: "out"
                  },
                },
                interactivity: {
                  detectsOn: "window",
                  events: {
                    onHover: {
                      enable: true,
                      mode: "grab",
                    }
                  },
                  modes: {
                    grab: {
                      distance: 140,
                      links: {
                        opacity: 1,
                      },
                    }
                  }
                }
              });
            },
          };
        }
      },
      {},
    ],
    7: [
      function (require, module, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true,
        });
        exports.initLike = initLike;

        function initLike() {
          return {
            isLiked: false,
            likeAction: function likeAction() {
              this.isLiked = !this.isLiked;
            },
          };
        }
      },
      {},
    ],
    8: [
      function (require, module, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true,
        });
        exports.initNavbar = initNavbar;

        function initNavbar() {
          return {
            scrolled: false,
            height: 60,
            mobileOpen: false,
            scroll: function scroll() {
              var scrollValue = window.scrollY;

              if (scrollValue >= this.height) {
                this.scrolled = true;
              } else {
                this.scrolled = false;
              }

              this.searchExpanded = false;
            },
            openMobileMenu: function openMobileMenu() {
              this.mobileOpen = !this.mobileOpen;
            },
            openSidebar: function openSidebar() {
              this.$store.app.isSiderbarOpen = true;
              console.log("clicked");
            },
          };
        }
      },
      {},
    ],
    9: [
      function (require, module, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true,
        });
        exports.initPageLoader = initPageLoader;

        function initPageLoader() {
          window.addEventListener("load", function () {
            var pageloader = document.getElementById("pageloader");
            var infraloader = document.getElementById("infraloader");
            pageloader.classList.toggle("is-active");
            var pageloaderTimeout = setTimeout(function () {
              infraloader.classList.remove("is-active");
              pageloader.classList.toggle("is-active");
              clearTimeout(pageloaderTimeout);
            }, 1200);
          });
        }
      },
      {},
    ],
    10: [
      function (require, module, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true,
        });
        exports.initRoadmap = initRoadmap;

        function initRoadmap() {
          return {
            setupRoadmap: function setupRoadmap() {
              // define variables
              var items = document.querySelectorAll(".main-timeline li"); // check if an element is in viewport
              // http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport

              function isElementInViewport(el) {
                var rect = el.getBoundingClientRect();
                return (
                  rect.top >= 0 &&
                  rect.left >= 0 &&
                  rect.bottom <=
                    (window.innerHeight ||
                      document.documentElement.clientHeight) &&
                  rect.right <=
                    (window.innerWidth || document.documentElement.clientWidth)
                );
              }

              function callbackFunc() {
                for (var i = 0; i < items.length; i++) {
                  if (isElementInViewport(items[i])) {
                    items[i].classList.add("in-view");
                  }
                }
              } // listen for events

              window.addEventListener("load", callbackFunc);
              window.addEventListener("resize", callbackFunc);
              window.addEventListener("scroll", callbackFunc);
            },
          };
        }
      },
      {},
    ],
    11: [
      function (require, module, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true,
        });
        exports.initTabs = initTabs;

        function initTabs() {
          return {
            activeTab: "tab-1",
            switchTabs: function switchTabs(e) {
              var tab = e.target.getAttribute("data-tab");
              this.activeTab = tab;
            },
            setupCountdown: function setupCountdown() {
              // Set the date we're counting down to
              var countDownDate = new Date("Oct 24, 2021 07:00:00").getTime(); // Update the count down every 1 second

              var x = setInterval(function () {
                // Get todays date and time
                var now = new Date().getTime(); // Find the distance between now and the count down date

                var distance = countDownDate - now;
                var d = document;
                var daysElement = d.querySelector("#days-count");
                var hoursElement = d.querySelector("#hours-count");
                var minutesElement = d.querySelector("#minutes-count");
                var secondsElement = d.querySelector("#seconds-count"); // Time calculations for days, hours, minutes and seconds

                daysElement.textContent = Math.floor(
                  distance / (1000 * 60 * 60 * 24)
                );
                hoursElement.textContent = Math.floor(
                  (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
                );
                minutesElement.textContent = Math.floor(
                  (distance % (1000 * 60 * 60)) / (1000 * 60)
                );
                secondsElement.textContent = Math.floor(
                  (distance % (1000 * 60)) / 1000
                ); // If the count down is finished, write some text

                if (distance < 0) {
                  clearInterval(x);
                }
              }, 1000);
            },
          };
        }
      },
      {},
    ],
    12: [
      function (require, module, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true,
        });
        exports.demoData = exports.themeColors = exports.env = void 0;
        var env = "development";
        exports.env = env;
        var themeColors = {
          primary: "#00d1b2",
          secondary: "#00d1b2",
          accent: "#797bf2",
          success: "#06d6a0",
          info: "#039BE5",
          warning: "#faae42",
          danger: "#FF7273",
          purple: "#8269B2",
          blue: "#37C3FF",
          green: "#93E088",
          lightGreen: "#63ebc6",
          yellow: "#FFD66E",
          orange: "#FFA981",
          lightText: "#a2a5b9",
          fadeGrey: "#ededed",
          chartGrey: "#B0BDC4",
        };
        exports.themeColors = themeColors;
        var demoData = [
          {
            type: "user",
            title: "Helen Miller",
            content: "Los Angeles",
            photoUrl: "/img/avatars/helen.jpg",
            color: null,
          },
          {
            type: "user",
            title: "Shane Black",
            content: "Los Angeles",
            photoUrl: null,
            color: "#7F00FF",
          },
          {
            type: "user",
            title: "Daniella Walters",
            content: "San Francisco",
            photoUrl: null,
            color: "#00D1B2",
          },
          {
            type: "user",
            title: "Elie Daniels",
            content: "Dublin",
            photoUrl: "/img/avatars/elie.jpg",
            color: null,
          },
          {
            type: "user",
            title: "Terry Daniels",
            content: "New York",
            photoUrl: "/img/avatars/terry.jpg",
            color: null,
          },
          {
            type: "user",
            title: "Alex Walsh",
            content: "Irvine",
            photoUrl: "/img/avatars/alex.jpg",
            color: null,
          },
          {
            type: "user",
            title: "Adam Klinsky",
            content: "Seattle",
            photoUrl: "/img/avatars/eric.png",
            color: null,
          },
          {
            type: "user",
            title: "Christina Song",
            content: "Mystic Falls",
            photoUrl: "/img/avatars/christina.jpg",
            color: null,
          },
          {
            type: "user",
            title: "Barry Smithers",
            content: "Miami",
            photoUrl: "/img/avatars/barry.jpg",
            color: null,
          },
          {
            type: "user",
            title: "Sally Mitchells",
            content: "San Francisco",
            photoUrl: "/img/avatars/sally.jpg",
            color: null,
          },
          {
            type: "file",
            title: "INV-49465",
            content: "Pending invoice",
            photoUrl: "/img/icons/search/1.svg",
            color: null,
          },
          {
            type: "file",
            title: "INV-49789",
            content: "Pending invoice",
            photoUrl: "/img/icons/search/1.svg",
            color: null,
          },
          {
            type: "transaction",
            title: "TR-8066",
            content: "Transaction amount: + $874.99",
            photoUrl: "/img/icons/search/2.svg",
            color: null,
          },
          {
            type: "transaction",
            title: "TR-8067",
            content: "Transaction amount: + $1042.99",
            photoUrl: "/img/icons/search/2.svg",
            color: null,
          },
          {
            type: "transaction",
            title: "TR-9078",
            content: "Transaction amount: - $2500.00",
            photoUrl: "/img/icons/search/2.svg",
            color: null,
          },
          {
            type: "transaction",
            title: "TR-8066",
            content: "Transaction amount: - $139.99",
            photoUrl: "/img/icons/search/2.svg",
            color: null,
          },
          {
            type: "company",
            title: "Airbnb",
            content: "Company",
            photoUrl: "/img/logo/companies/airbnb.svg",
            color: null,
          },
          {
            type: "company",
            title: "Tesla",
            content: "Company",
            photoUrl: "/img/logo/companies/tesla.svg",
            color: null,
          },
          {
            type: "company",
            title: "Alfresco",
            content: "Company",
            photoUrl: "/img/logo/companies/alfresco.svg",
            color: null,
          },
          {
            type: "company",
            title: "H&M",
            content: "Company",
            photoUrl: "/img/logo/companies/hm.svg",
            color: null,
          },
          {
            type: "company",
            title: "Amazon",
            content: "Company",
            photoUrl: "/img/logo/companies/amazon.svg",
            color: null,
          },
        ];
        exports.demoData = demoData;
      },
      {},
    ],
    13: [
      function (require, module, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true,
        });
        exports.getUrlParams = getUrlParams;
        exports.switchDemoImages = switchDemoImages;
        exports.insertBgImages = insertBgImages;

        function getUrlParams(param) {
          var queryString = window.location.search;
          var urlParams = new URLSearchParams(queryString);
          return urlParams.get(param);
        }

        function switchDemoImages(environment) {
          if (environment === "development") {
            var targets = document.querySelectorAll("[data-demo-src]");
            var bgTargets = document.querySelectorAll("[data-demo-background]");

            if (typeof targets != "undefined" && targets != null) {
              for (var i = 0, len = targets.length; i < len; i++) {
                var demoUrl = targets[i].getAttribute("data-demo-src");
                targets[i].setAttribute("src", demoUrl);
              }
            }

            if (typeof bgTargets != "undefined" && bgTargets != null) {
              for (var i = 0, len = bgTargets.length; i < len; i++) {
                var demoBgUrl = bgTargets[i].getAttribute(
                  "data-demo-background"
                );
                bgTargets[i].setAttribute("data-background", demoBgUrl);
              }
            }
          }
        }

        function insertBgImages() {
          var targets = document.querySelectorAll("[data-background]");

          if (typeof targets != "undefined" && targets != null) {
            for (var i = 0, len = targets.length; i < len; i++) {
              var bgUrl = targets[i].getAttribute("data-background");
              targets[i].style.backgroundSize = "cover";
              targets[i].style.backgroundRepeat = "no-repeat";
              targets[i].style.backgroundImage = "url(".concat(bgUrl, ")");
            }
          }
        }
      },
      {},
    ],
    14: [
      function (require, module, exports) {
        "use strict";

        require("./store/store");

        require("alpinejs");

        var _constants = require("./libs/utils/constants");

        var _pageloader = require("./libs/components/pageloader");

        var _utils = require("./libs/utils/utils");

        var _navbar = require("./libs/components/navbar");

        var _hero = require("./libs/components/hero");

        var _tabs = require("./libs/components/tabs");

        var _countdown = require("./libs/components/countdown");

        var _roadmap = require("./libs/components/roadmap");

        var _like = require("./libs/components/like");

        var _backtotop = require("./libs/components/backtotop");

        var feather = require("feather-icons");

        window.initNavbar = _navbar.initNavbar;
        window.initHero = _hero.initHero;
        window.initTabs = _tabs.initTabs;
        window.initCountdown = _countdown.initCountdown;
        window.initRoadmap = _roadmap.initRoadmap;
        window.initLike = _like.initLike;
        window.initBackToTop = _backtotop.initBackToTop;
        var showPageloader = (0, _pageloader.initPageLoader)();

        document.onreadystatechange = function () {
          if (document.readyState == "complete") {
            //Switch demo images
            var changeImages = (0, _utils.switchDemoImages)(_constants.env); //Switch backgrounds

            var changeBackgrounds = (0, _utils.insertBgImages)(); //Feather Icons

            var featherIcons = feather.replace();
          }
        };
      },
      {
        "./libs/components/backtotop": 4,
        "./libs/components/countdown": 5,
        "./libs/components/hero": 6,
        "./libs/components/like": 7,
        "./libs/components/navbar": 8,
        "./libs/components/pageloader": 9,
        "./libs/components/roadmap": 10,
        "./libs/components/tabs": 11,
        "./libs/utils/constants": 12,
        "./libs/utils/utils": 13,
        "./store/store": 15,
        alpinejs: 2,
        "feather-icons": 3,
      },
    ],
    15: [
      function (require, module, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true,
        });
        exports["default"] = void 0;

        require("@ryangjchandler/spruce");

        Spruce.store(
          "app",
          {
            isSiderbarOpen: false,
          },
          true
        );
        var _default = Spruce;
        exports["default"] = _default;
      },
      { "@ryangjchandler/spruce": 1 },
    ],
  },
  {},
  [14]
);
