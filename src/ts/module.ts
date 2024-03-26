import { registerSettings } from "./settings";

Hooks.once("init", () => {
  registerSettings();
});

Hooks.on("ready", () => {
  game.user?.unsetFlag("birb", "active");
  addEventListener("visibilitychange", clientVisibilityChange);

  Hooks.on("renderChatMessage", chatMessage);
  Hooks.on("renderPlayerList", renderPlayerList);

  console.log("Birb ready");

  // create the playlist if it doesn't exist
  // createPlaylistIfNeeded();
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

function chatMessage() {
  const alertSound = game.settings.get(
    "birb",
    "inactivityAlertSound",
  ) as string;
  if (game.user?.getFlag("birb", "active") === false) {
    console.log(`Birb: playing alert "${alertSound}"`);
    if (alertSound) {
      AudioHelper.play(
        {
          src: alertSound,
          loop: false,
          autoplay: true,
        },
        false,
      );
    }
  }
}

function renderPlayerList(_app, html) {
  const gmInactivity = game.settings.get("birb", "gmInactivity") as boolean;
  const inactivityVisibility = game.settings.get(
    "birb",
    "inactivityVisibility",
  ) as string;
  html.find("li.player").each((_i, elem) => {
    const user_id = elem.dataset.userId;
    const user = game?.users?.get(user_id);
    if (user && user.getFlag("birb", "active") === false) {
      // logic to determine if we show the indicator for an idle user
      // current user is gm? - yes, always
      // user is idle? - yes, if current user or if set to display for all
      // user is not idle - no worries
      if (
        game?.user?.isGM ||
        (user.isGM && gmInactivity) ||
        (user_id === game.userId &&
          ["gm_and_inactive", "everyone"].includes(inactivityVisibility)) ||
        game.settings.get("birb", "inactivityVisibility") === "everyone"
      ) {
        $(elem).append(
          `<span style="flex: 0">${game.settings.get("birb", "inactivityIndicator")}</span>`,
        );
      }
    }
  });
}

// function createPlaylistIfNeeded() {
//   const playlistName = game.settings.get('birb', 'playlistName');
//   const existing = game?.playlists?.find(p => p.name === playlistName);
//   // if (!existing) {
//   //   game?.playlists?
//   // }
// }
