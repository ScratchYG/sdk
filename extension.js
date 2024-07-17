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
            id: 'onsdkload',
            isEdgeActivated: false,
            blockType: Scratch.BlockType.EVENT,
            text: 'Когда SDK полностью загружен',
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
            text: 'Реклама'
          },
          {
            opcode: 'show_fullscreen',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Показать Fullscreen-рекламу',
            filter: [Scratch.TargetType.STAGE]
          },
          {
            id: 'onfullscreenclosed',
            isEdgeActivated: false,
            blockType: Scratch.BlockType.EVENT,
            text: 'Когда Fullscreen-рекламу закрыли',
            filter: [Scratch.TargetType.STAGE]
          },
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
        Scratch.vm.runtime.startHats('yagames_onsdkload');
        return;
      }

      async function onSDKload() {
        console.log(YaGames);
        YaGames
          .init()
          .then(ysdk => {
            console.log('Yandex SDK initialized');
            ysdk.getPlayer().then(_player => {
              Scratch.YaGames.player = _player;
              Scratch.YaGames.player.getData().then(d => {
                Scratch.YaGames.saveData = d;
                console.log("loaded data");
              });
            }).catch(err => {
              // Ошибка при инициализации объекта Player.
            });
            Scratch.YaGames.sdk = ysdk;
            Scratch.YaGames.sdkReady = true;
            Scratch.vm.runtime.startHats('yagames_onsdkload');
          });
      }
      (function (d) {
        var s = d.createElement('script');
        s.src = "https://sdk.games.s3.yandex.net/sdk.js";
        s.async = true;
        s.onload = onSDKload;
        d.body.append(s);
      })(document);
    }
    wait_sdk_load(args, util) {
      if (Scratch.YaGames.debug.enabled) {
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
        player.setData(Scratch.YaGames.saveData, true).then(() => {
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
