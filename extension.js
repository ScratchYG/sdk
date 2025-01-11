(function (Scratch) {
  "use strict";
  class ScratchYGExtension {
    getInfo() {
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
            opcode: "dataloaded",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "Данные загружены?",
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

    initsdk() {
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
        return;
      }
      var script = document.createElement("script");
      script.src = "/sdk.js";
      document.head.appendChild(script);
      script.onload = async function () {
        console.log(YaGames);
        await YaGames.init().then((ysdk) => {
          window.ysdk = ysdk;
          ysdk.features.LoadingAPI.ready();
          ysdk
            .getPlayer({ scopes: false })
            .then((_player) => {
              var player = _player;
              window.ysdkplayer = player;
              console.log(window.ysdkplayer);
            })
            .catch((err) => {});
        });
        console.log("ScratchYG v0.1 ready");
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
    leaderboard() {
      setLeaderboardScore({
        leaderboardName: [args.leaderboardName],
        score: [args.score],
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
      return window.ysdk != undefined;
    }
    dataloaded() {
      return window.ysdkplayer != undefined && window.ysdkdata != undefined;
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