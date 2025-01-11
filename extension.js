(function (Scratch) {
  "use strict";

  class ScratchYGExtension {
    log(message){
      console.log(
        "%cScratch%cYG%c "+message,
        "background-color: #4f1bbe; color: #fed265; padding: 2px; padding-right:none; padding-left:5px; border-radius:5px 0px 0px 5px; box-shadow: inset 0px -8px 15px 0px rgba(0, 0, 0, 0.7), inset 0px 10px 15px 0px rgba(255, 255, 255, 0.7);",
        "background-color: #fed265; color: #4f1bbe; padding: 2px; padding-left:none; padding-right:5px; border-radius:0px 5px 5px 0px; box-shadow: inset 0px -8px 15px 0px rgba(0, 0, 0, 0.7), inset 0px 10px 15px 0px rgba(255, 255, 255, 0.7);",
        "");
    }

    getInfo(){
      return {
        id: "scratchyg",
        name: "ScratchYG",
        color1: "#4f1bbe",
        blocks: [
          {
            opcode: "initsdk",
            blockType: Scratch.BlockType.COMMAND,
            text: "Встроить SDK Яндекс.Игр",
          },
          {
            opcode: "setdebug",
            blockType: Scratch.BlockType.COMMAND,
            text: "Включить режим отладки",
          },
          {
            opcode: "getsavedvar",
            blockType: Scratch.BlockType.REPORTER,
            text: "Получить сохраненное значение переменной [NAME] по умолчанию [DEFVAL]",
            arguments: {
              NAME: {
                defaultValue: "money",
                type: Scratch.ArgumentType.STRING,
              },
              DEFVAL: {
                defaultValue: "100",
                type: Scratch.ArgumentType.STRING,
              },
            },
          },
          {
            opcode: "setsavedvar",
            blockType: Scratch.BlockType.COMMAND,
            text: "Установить переменную [NAME] в значение [VALUE]",
            arguments: {
              NAME: {
                defaultValue: "money",
                type: Scratch.ArgumentType.STRING,
              },
              VALUE: {
                defaultValue: "100",
                type: Scratch.ArgumentType.STRING,
              },
            },
          },
          {
            opcode: "sdkenabled",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "SDK загружен?",
          },
          {
            opcode: "savevars",
            blockType: Scratch.BlockType.COMMAND,
            text: "Сохранить прогресс",
          },
          {
            opcode: "loadvars",
            blockType: Scratch.BlockType.COMMAND,
            text: "Загрузить прогресс",
          },
          {
            opcode: "dataloaded",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "Данные загружены?",
          },
          {
            opcode: "resetprogress",
            blockType: Scratch.BlockType.COMMAND,
            text: "Сброс прогреса",
          },
          {
            opcode: "showfullscreen",
            blockType: Scratch.BlockType.COMMAND,
            text: "Показать рекламу",
          },
          {
            opcode: "whenFullscreenClosed",
            blockType: Scratch.BlockType.HAT,
            text: "При закрытии рекламы",
          },
          {
            opcode: "fullscreenClosed",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "Закрыта ли реклама?",
          },
          {
            opcode: "showrewarded",
            blockType: Scratch.BlockType.COMMAND,
            text: "Показать рекламу с вознаграждением",
          },
          {
            opcode: "whenRewardedWatched",
            blockType: Scratch.BlockType.HAT,
            text: "При закрытии рекламы с вознаграждением",
          },
          {
            opcode: "rewardedRewarded",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "Вознаграждение за рекламу получено?",
          },
          {
            opcode: "canRateGame",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "Можно оценить игру?",
          },
          {
            opcode: "openRatePopup",
            blockType: Scratch.BlockType.COMMAND,
            text: "Открыть всплывающее окно оценки",
          },
          {
            opcode: "getDeviceType",
            blockType: Scratch.BlockType.REPORTER,
            text: "Тип устройства",
          },
          {
            opcode: "isDesktop",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "Игра открыта на компьютере?",
          },
          {
            opcode: "isMobile",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "Игра открыта на телефоне?",
          },
          {
            opcode: "isTablet",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "Игра открыта на планшете?",
          },
          {
            opcode: "isTV",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "Игра открыта на телевизоре?",
          },
          {
            opcode: "getPayingStatus",
            blockType: Scratch.BlockType.REPORTER,
            text: "Платёжный статус игрока",
          },
          {
            opcode: "loadFlags",
            blockType: Scratch.BlockType.COMMAND,
            text: "Загрузить флаги",
          },
          {
            opcode: "flagsloaded",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "Флаги загружены?",
          },
          {
            opcode: "getFlag",
            blockType: Scratch.BlockType.REPORTER,
            text: "Получить значение флага [NAME], по умолчанию [DEFVAL]",
            arguments: {
              NAME: {
                defaultValue: "bonus",
                type: Scratch.ArgumentType.STRING,
              },
              DEFVAL: {
                defaultValue: "1",
                type: Scratch.ArgumentType.STRING,
              },
            },
          },
        ],
      };
    }
    getDeviceType() {
      if (window.ysdkdebug == true) {
        return "desktop";
      }
      return ysdk.deviceInfo.type;
    }
    isDesktop() {
      if (window.ysdkdebug == true) {
        return true;
      }
      return ysdk.deviceInfo.isDesktop();
    }
    isMobile() {
      if (window.ysdkdebug == true) {
        return false;
      }
      return ysdk.deviceInfo.isMobile();
    }
    isTablet() {
      if (window.ysdkdebug == true) {
        return false;
      }
      return ysdk.deviceInfo.isTablet();
    }
    isTV() {
      if (window.ysdkdebug == true) {
        return false;
      }
      return ysdk.deviceInfo.isTV();
    }
    canRateGame() {
      if (window.ysdkdebug == true) {
        return !(window.alreadyrated == true);
      }
      var can;
      ysdk.feedback.canReview().then(({ value, reason }) => {
        can = value;
      });
      return can;
    }
    openRatePopup() {
      if (window.ysdkdebug == true) {
        window.alreadyrated = true;
        alert("[ОТЛАДКА] Оцените нашу игру!");
        return;
      }
      ysdk.feedback.requestReview();
    }
    rewardedRewarded() {
      return window.isrewarded == true;
    }
    fullscreenClosed() {
      return window.isfullscreenclosed == true;
    }

    async initsdk() {
      function onBlur() {
        if (window.isAdOpened == false) {
          Scratch.vm.runtime.audioEngine.inputNode.gain.value = 0;
        }
      }
      function onFocus() {
        if (window.isAdOpened == false) {
          Scratch.vm.runtime.audioEngine.inputNode.gain.value = 1;
        }
      }
      window.onfocus = onFocus;
      window.onblur = onBlur;
      window.isAdOpened = false;
      window.ysdkloaded = false;
      document.addEventListener(
        "visibilitychange",
        function () {
          if (window.isAdOpened == false) {
            if (document.hidden) {
              Scratch.vm.runtime.audioEngine.inputNode.gain.value = 0;
            } else {
              Scratch.vm.runtime.audioEngine.inputNode.gain.value = 1;
            }
          }
        },
        false,
      );
      window.savedData = "";
      if (window.ysdkdebug == true) {
        window.ysdk = {};
        window.ysdkplayer = {};
        window.ysdkloaded = true;
        return;
      }
      var script = document.createElement("script");
      script.src = "/sdk.js";
      document.head.appendChild(script);
      script.onload = async function () {
        await YaGames.init().then((ysdk) => {
          window.ysdk = ysdk;
          ysdk.features.LoadingAPI.ready();
          ysdk
            .getPlayer({ scopes: false })
            .then((_player) => {
              var player = _player;
              window.ysdkplayer = player;
              window.ysdkloaded = true;
              console.log("ScratchYG v0.1 ready");
            })
            .catch((err) => {window.ysdkloaded = true});
        });
      };
    }
    async loadvars() {
      if (window.ysdkdebug != true) {
        if (window.ysdkplayer != undefined) {
          var data = await window.ysdkplayer.getData();
          window.ysdkdata = data;
          console.log("Succesfully loaded data!");
        }
      } else {
        window.ysdkdata = {};
      }
    }
    async loadFlags() {
      if (window.ysdkdebug != true) {
        if (window.ysdk != undefined) {
          const flags = await window.ysdk.getFlags();
          window.ysdkflags = flags;
          console.log("Succesfully loaded flags!");
        }
      } else {
        window.ysdkflags = {};
      }
    }
    getFlag(args) {
      return window.ysdkflags[args.NAME] || args.DEFVAL;
    }
    getPayingStatus() {
      if(window.ysdkdebug == true){
        return "paying"
      }
      return window.ysdkplayer.getPayingStatus();
    }
    setdebug() {
      window.alreadyrated = false;
      window.ysdkdebug = true;
    }
    setsavedvar(args) {
      window.ysdkdata[args.NAME] = args.VALUE;
      return;
    }
    getsavedvar(args) {
      return window.ysdkdata[args.NAME] || args.DEFVAL;
    }
    savevars() {
      if (
        window.ysdkplayer != undefined &&
        window.ysdkdata != undefined &&
        window.savedData !== JSON.stringify(window.ysdkdata)
      )
        window.ysdkplayer.setData(window.ysdkdata, true).then(() => {
          window.savedData = JSON.stringify(window.ysdkdata);
          console.log("Successfully saved data!");
        });
    }
    resetprogress() {
      window.ysdkdata = {};
      if (
        window.ysdkplayer != undefined &&
        window.ysdkdata != undefined &&
        window.savedData !== JSON.stringify(window.ysdkdata)
      )
        window.ysdkplayer.setData(window.ysdkdata, true).then(() => {
          window.savedData = JSON.stringify(window.ysdkdata);
          console.log("Successfully saved data!");
        });
    }
    sdkenabled() {
      return window.ysdkloaded;
    }
    dataloaded() {
      return window.ysdkplayer != undefined && window.ysdkdata != undefined;
    }
    flagsloaded() {
      return window.ysdkflags != undefined;
    }
    deafAE() {
      Scratch.vm.runtime.audioEngine.inputNode.gain.value = 0;
    }
    undeafAE() {
      Scratch.vm.runtime.audioEngine.inputNode.gain.value = 1;
    }
    showfullscreen() {
      window.isfullscreenclosed = false;
      window.isAdOpened = true;
      Scratch.vm.runtime.audioEngine.inputNode.gain.value = 0;
      if (window.ysdkdebug == true) {
        alert("[ОТЛАДКА] Показ рекламы");
        window.isfullscreenclosed = true;
        Scratch.vm.runtime.audioEngine.inputNode.gain.value = 1;
        window.isAdOpened = false;
        Scratch.vm.runtime.startHats('scratchyg_whenFullscreenClosed');
        return;
      }
      if (window.ysdk != undefined) {
        window.ysdk.adv.showFullscreenAdv({
          callbacks: {
            onClose: function (wasShown) {
              window.isfullscreenclosed = true;
              window.isAdOpened = false;
              Scratch.vm.runtime.audioEngine.inputNode.gain.value = 1;
              Scratch.vm.runtime.startHats('scratchyg_whenFullscreenClosed');
            },
            onError: function (error) {
              window.isfullscreenclosed = false;
              window.isAdOpened = false;
              Scratch.vm.runtime.startHats('scratchyg_whenFullscreenClosed');
            },
          },
        });
      }
    }
    showrewarded() {
      window.isrewarded = false;
      window.isAdOpened = true;
      this.deafAE();
      if (window.ysdkdebug == true) {
        var pr = prompt(
          "[ОТЛАДКА] REWARDED РЕКЛАМА. Нажмите Q, чтобы закрыть без просмотра. Нажмите R - чтобы закрыть с просмотром.",
        );
        if (pr.toLowerCase() == "q") {
          window.isrewarded = false;
        } else if (pr.toLowerCase() == "r") {
          window.isrewarded = true;
        }
        window.isAdOpened = false;
        Scratch.vm.runtime.startHats('scratchyg_whenRewardedWatched');
        return;
      }
      window.ysdk.adv.showRewardedVideo({
        callbacks: {
          onOpen: () => {
            window.isrewarded = false;
          },
          onRewarded: () => {
            window.isrewarded = true;
            window.isAdOpened = false;
            Scratch.vm.runtime.startHats('scratchyg_whenRewardedWatched');
          },
          onClose: () => {
            window.isAdOpened = false;
            this.undeafAE();
            Scratch.vm.runtime.startHats('scratchyg_whenRewardedWatched');
          },
          onError: (e) => {
            window.isrewarded = false;
            window.isAdOpened = false;
          },
        },
      });
    }
  }
  Scratch.extensions.register(new ScratchYGExtension());
})(Scratch);