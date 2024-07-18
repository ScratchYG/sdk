function loadYG(){
var YaGamesLoader;
(() => {
    "use strict";
    var e = {
        r: e => {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
                value: "Module"
            }), Object.defineProperty(e, "__esModule", {
                value: !0
            })
        }
    };
    (() => {
        if (void 0 !== e) {
            var r = e.u,
                o = e.e,
                n = {},
                t = {};
            e.u = function(e) {
                return r(e) + (n.hasOwnProperty(e) ? "?" + n[e] : "")
            }, e.e = function(n) {
                return o(n).catch((function(o) {
                    var a = t.hasOwnProperty(n) ? t[n] : 3;
                    if (a < 1) {
                        var s = r(n);
                        throw o.message = "Loading chunk " + n + " failed after 3 retries.\n(" + s + ")", o.request = s, o
                    }
                    return new Promise((function(r) {
                        setTimeout((function() {
                            t[n] = a - 1, r(e.e(n))
                        }), 0)
                    }))
                }))
            }
        }
    })();
    var r = {};
    e.r(r);
    const o = () => {
        return e = void 0, r = null, o = function*() {
            return new Promise(((e, r) => {
                const o = `${Date.now()}-${Math.random()}`,
                    n = setTimeout((() => {
                        r(new Error("Get external iframe timeout"))
                    }), 500);
                window.addEventListener("message", (function r(t) {
                    const {
                        data: a
                    } = function(e) {
                        try {
                            return {
                                data: JSON.parse(e),
                                error: null
                            }
                        } catch (e) {
                            return {
                                data: null,
                                error: e
                            }
                        }
                    }(t.data);
                    a && a.messageId === o && (window.removeEventListener("message", r), clearTimeout(n), e(a.payload))
                })), window.parent.postMessage(JSON.stringify({
                    source: "YandexGamesSDK",
                    actionName: "GET_IFRAME_ORIGIN_SRC",
                    channel: "EARLY_SDK_EVENT",
                    messageId: o
                }), "*")
            }))
        }, new Promise(((n, t) => {
            var a = e => {
                    try {
                        i(o.next(e))
                    } catch (e) {
                        t(e)
                    }
                },
                s = e => {
                    try {
                        i(o.throw(e))
                    } catch (e) {
                        t(e)
                    }
                },
                i = e => e.done ? n(e.value) : Promise.resolve(e.value).then(a, s);
            i((o = o.apply(e, r)).next())
        }));
        var e, r, o
    };
    var n = Object.defineProperty,
        t = Object.getOwnPropertySymbols,
        a = Object.prototype.hasOwnProperty,
        s = Object.prototype.propertyIsEnumerable,
        i = (e, r, o) => r in e ? n(e, r, {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: o
        }) : e[r] = o,
        d = (e, r) => {
            for (var o in r || (r = {})) a.call(r, o) && i(e, o, r[o]);
            if (t)
                for (var o of t(r)) s.call(r, o) && i(e, o, r[o]);
            return e
        };
    if (window === window.top || window.sdkLoaderWasInited) {
        const e = window.sdkLoaderWasInited ? "The SDK Loader was loaded more than once" : "SDK initialization outside of frame";
        console.warn(e)
    } else {
        let e, r, n, t;
        window.sdkLoaderWasInited = !0;
        let a = !1,
            s = !1,
            i = !1;
        window.isSdkLoader = !0, window.YaGames = {
            init: o => {
                var d;
                return s ? null == (d = window.YaGames) ? void 0 : d.init(o) : i ? Promise.reject(f) : t ? (console.warn("YaGames was initialized"), t) : (t = new Promise(((t, s) => {
                    e = t, r = s, n = o, a = !0
                })), t)
            }
        };
        const c = {
                type: "unknown",
                isMobile: () => !1,
                isTablet: () => !1,
                isDesktop: () => !1,
                isTV: () => !1
            },
            l = (e, r = {}) => {
                var o, n;
                window.parent.postMessage({
                    source: "YandexGamesSDK",
                    messageId: `${Date.now()}-${Math.random()}`,
                    type: "error",
                    data: {
                        block: "ErrorCounter/common: sdk-loader",
                        error: {
                            message: `[SDK LOADER]: ${e}`
                        },
                        additional: d(d(d({}, r), (null == (o = r.error) ? void 0 : o.message) ? {
                            originalMessage: null == (n = r.error) ? void 0 : n.message
                        } : {}), r.source ? {
                            originalSource: r.source
                        } : {}),
                        level: "error",
                        source: "sdk-loader",
                        type: "error"
                    }
                }, "*")
            };
        Object.defineProperty(window.YaGames, "deviceInfo", {
            get: () => (l("accessing deviceInfo in YaGames"), c)
        });
        const u = e => {
                const r = document.querySelectorAll(`script[src="${e}"]`);
                for (let e of r) e.remove()
            },
            w = /^(https|yandexgames):\/\/[\w.\/\-]+\/sdk\/v2(\?|$)/,
            m = /^\/sdk\/(v\d+|_)\/v2(\.[0-9a-f]*)?\.js/,
            v = "url sdk not valid",
            f = "load sdk file error",
            p = 3,
            g = (o, t) => {
                const d = document.createElement("script");
                d.src = o, d.onload = () => {
                    var o;
                    s = !0, a && (null == (o = window.YaGames) || o.init(n).then((r => {
                        e(r)
                    })).catch((e => {
                        l("Error while init sdk", {
                            error: e
                        }), r(e)
                    })))
                }, d.onerror = (e, n, s, d, c) => {
                    u(o), t > 0 ? g(o, --t) : (i = !0, l(f, {
                        event: e,
                        error: c,
                        source: n
                    }), a && r(f))
                }, (document.head || document.documentElement).append(d)
            },
            h = (e, o = "") => {
                if (e && (w.test(e) || m.test(e))) {
                    const r = new URL(e, window.location.origin);
                    o && r.searchParams.set("dvh", o), g(r.toString(), p)
                } else i = !0, a && r(v), l(v)
            },
            y = new URLSearchParams(window.location.search).get("sdk");
        y ? h(y) : o().then((e => {
            const r = new URL(e).searchParams,
                o = r.get("sdk"),
                n = r.get("dvh") || "";
            if (o) h(o, n);
            else {
                const e = new URLSearchParams(window.location.search).get("sdk");
                h(e)
            }
        })).catch((e => {
            l("Error while get iframe src", {
                error: e
            }), console.error("SDK initialization failed", e)
        }))
    }
    YaGamesLoader = r
})();
}
(function (Scratch) {
  'use strict';
  class YaGamesSDKExtension {
    getInfo() {
      console.log("≽^•⩊•^≼ ScratchYG SDK loaded\nhttps://github.com/ScratchYG/sdk");
      return {
        id: 'yagames2',
        name: 'Яндекс.Игры SDK',
        color1: '#4C1CBA',
        color2: '#fac641',
        color3: '#3c1791',
        blocks: [
          {
            blockType: Scratch.BlockType.LABEL,
            text: 'Блоки доступны в коде сцены',
            filter: [Scratch.TargetType.SPRITE]
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: 'Загрузка SDK',
            filter: [Scratch.TargetType.STAGE]
          },
          {
            opcode: 'sdk_load',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Загрузить SDK [DEBUG]',
            arguments: {
              DEBUG: {
                type: Scratch.ArgumentType.BOOLEAN,
                menu: 'debugMode'
              }
            },
            filter: [Scratch.TargetType.STAGE]
          },
          {
            opcode: 'wait_sdk_load',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Ждать до полной загрузки SDK',
            filter: [Scratch.TargetType.STAGE]
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: 'Сохранения',
            filter: [Scratch.TargetType.STAGE]
          },
          {
            opcode: 'set_var',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Сохранить значение [DATA] как [NAME]',
            arguments: {
              DATA: {
                defaultValue: '100',
                type: Scratch.ArgumentType.STRING
              },
              NAME: {
                defaultValue: 'money',
                type: Scratch.ArgumentType.STRING
              }
            },
            filter: [Scratch.TargetType.STAGE]
          },
          {
            opcode: 'get_var',
            blockType: Scratch.BlockType.REPORTER,
            text: 'Получить значение [NAME], или вернуть [DEFVAL]',
            arguments: {
              NAME: {
                defaultValue: 'money',
                type: Scratch.ArgumentType.STRING
              },
              DEFVAL: {
                defaultValue: '5',
                type: Scratch.ArgumentType.STRING
              }
            },
            filter: [Scratch.TargetType.STAGE]
          },
          {
            opcode: 'save_progress',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Сохранить значения',
            filter: [Scratch.TargetType.STAGE]
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: 'Реклама',
            filter: [Scratch.TargetType.STAGE]
          },
          {
            opcode: 'show_fullscreen',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Показать Fullscreen-рекламу и ждать закрытия',
            filter: [Scratch.TargetType.STAGE]
          }
        ],
        menus: {
          debugMode: {
            items: [
              {
                text: 'без режима отладки',
                value: '0'
              },
              {
                text: 'с режимом отладки',
                value: '1'
              }
            ]
          }
        }
      };
    }
    onsdkload() {
      return false;
    }
    show_fullscreen(args, util) {
      if(Scratch.YaGames.isAdOpened){
        util.yield();
        return;
      }
      Scratch.YaGames.isAdOpened = true;
      Scratch.vm.runtime.audioEngine.inputNode.gain.value = 0;
      if (Scratch.YaGames.debug.enabled) {
        alert("Fullscreen ad!");
        Scratch.vm.runtime.audioEngine.inputNode.gain.value = 1;
        Scratch.YaGames.isAdOpened = false;
        Scratch.vm.runtime.startHats('yagames_onfullscreenclosed');
        return;
      }
      Scratch.YaGames.sdk.adv.showFullscreenAdv({
        callbacks: {
          onClose: function (wasShown) {
            Scratch.YaGames.isAdOpened = false;
            Scratch.vm.runtime.startHats('yagames_onfullscreenclosed');
            Scratch.vm.runtime.audioEngine.inputNode.gain.value = 1;
          },
          onError: function (error) {
            Scratch.YaGames.isAdOpened = false;
            Scratch.vm.runtime.startHats('yagames_onfullscreenclosed');
          }
        }
      });
    }
    sdk_load(args, util) {
      function onBlur() {
        if (Scratch.YaGames == false) {
          Scratch.vm.runtime.audioEngine.inputNode.gain.value = 0;
        }
      };
      function onFocus() {
        if (Scratch.YaGames == false) {
          Scratch.vm.runtime.audioEngine.inputNode.gain.value = 1;
        }
      };
      window.onfocus = onFocus;
      window.onblur = onBlur;
      Scratch.YaGames = { isAdOpened: false, sdkReady: false, sdk: undefined, player: undefined, debug: { enabled: false }, saveData: {} };
      document.addEventListener('visibilitychange', function () {
        if (Scratch.YaGames.isAdOpened == false) {
          if (document.hidden) {
            Scratch.vm.runtime.audioEngine.inputNode.gain.value = 0;
          } else {
            Scratch.vm.runtime.audioEngine.inputNode.gain.value = 1;
          }
        }
      }, false);

      if (args.DEBUG == '1') {
        console.log('DEBUG');
        Scratch.YaGames.saveData = JSON.parse(window.localStorage.getItem("debugSaveData"));
        if(Scratch.YaGames.saveData == null){
          Scratch.YaGames.saveData = {};
        }
        Scratch.YaGames.debug.enabled = true;
        return;
      }

      async function onSDKload() {
        console.log(YaGames);
        YaGames
          .init()
          .then(ysdk => {
            console.log('Yandex SDK initialized');
            window.ysdk = ysdk;
            ysdk.getPlayer().then(_player => {
              Scratch.YaGames.player = _player;
              Scratch.YaGames.player.getData().then(d => {
                Scratch.YaGames.saveData = d;
                console.log("loaded data");
                Scratch.YaGames.sdkReady = true;
              });
            }).catch(err => {
              // Ошибка при инициализации объекта Player.
            });
            Scratch.YaGames.sdk = ysdk;
            Scratch.vm.runtime.startHats('yagames_onsdkload');
          });
      }
      loadYG();
      onSDKload();
    }
    wait_sdk_load(args, util) {
      if (Scratch.YaGames.debug.enabled) {
        // fake load
        if (Math.floor(Date.now() / 2000) % 2 != 0) {
          util.yield();
        }
      } else {
        if (!Scratch.YaGames.sdkReady) {
          util.yield();
        }
      }
    }
    set_var(args, util) {
      Scratch.YaGames.saveData[args.NAME] = args.DATA;
    }
    get_var(args, util) {
      if(Object.keys(Scratch.YaGames.saveData).includes(args.NAME)){
        return Scratch.YaGames.saveData[args.NAME];
      }
      return args.DEFVAL;
    }
    save_progress(args, util) {
      if(Scratch.YaGames.debug.enabled){
        window.localStorage.setItem("debugSaveData", JSON.stringify(Scratch.YaGames.saveData));
      }else{
        Scratch.YaGames.player.setData(Scratch.YaGames.saveData, true).then(() => {
          console.log('data is set');
        });
      }
    }
    when_save(args, util) {
      return true;
    }
  }
  window.scratch = Scratch;
  Scratch.extensions.register(new YaGamesSDKExtension());
})(Scratch);
