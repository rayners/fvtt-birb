import { registerSettings } from "./settings";

class BirbPlayerList extends PlayerList {
  _getDisplayName(user) {
    const displayParts: Array<string> = [user.name];
    if (user.isGM) {
      displayParts.push("[GM]");
    } else {
      displayParts.push(`[${user.charname}]`);
    }

    if (user.flags.birb && user.flags.birb.active == false) {
      if (!user.isGM || game.settings.get("birb", "gmInactivity")) {
        displayParts.push(
          game.settings.get("birb", "inactivityIndicator") as string,
        );
      }
    }

    return displayParts.join(" ");
  }
}

Hooks.once("init", () => {
  CONFIG.ui.players = BirbPlayerList;
  registerSettings();
});

Hooks.on("ready", () => {
  game.user?.unsetFlag("birb", "active");
  addEventListener("visibilitychange", clientVisibilityChange);
  console.log("Birb ready");
});

let hiddenTimeout;
function clientVisibilityChange(): void {
  if (document.hidden) {
    hiddenTimeout = setTimeout(
      () => {
        game.user?.setFlag("birb", "active", !document.hidden);
      },
      (game.settings.get("birb", "inactivityTimeout") as number) * 1000,
    );
  } else {
    if (hiddenTimeout) {
      clearTimeout(hiddenTimeout);
    }
    game.user?.setFlag("birb", "active", !document.hidden);
  }
}
