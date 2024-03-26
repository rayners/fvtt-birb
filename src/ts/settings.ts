export function registerSettings(): void {
  game.settings.register("birb", "inactivityVisibility", {
    name: "birb.settings.inactivityVisibilityName",
    hint: "birb.settings.inactivityVisibilityHint",
    config: true,
    scope: "world",
    type: String,
    default: "gm",
    choices: {
      gm: "GM Only",
      gm_and_inactive: "GM / Inactive player",
      everyone: "Everyone",
    } as Record<string, string>,
  });
  game.settings.register("birb", "inactivityTimeout", {
    name: "birb.settings.inactivityTimeoutName",
    hint: "birb.settings.inactivityTimeoutHint",
    config: true,
    scope: "world",
    type: Number,
    default: 5,
  });
  game.settings.register("birb", "inactivityIndicator", {
    name: "birb.settings.inactivityIndicatorName",
    hint: "birb.settings.inactivityIndicatorHint",
    config: true,
    scope: "world",
    type: String,
    default: "😴",
  });

  game.settings.register("birb", "gmInactivity", {
    name: "birb.settings.gmInactivityName",
    hint: "birb.settings.gmInactivityHint",
    config: true,
    scope: "world",
    type: Boolean,
    default: true,
  });

  game.settings.register("birb", "inactivityAlertSound", {
    name: "birb.settings.inactivityAlertSoundName",
    hint: "birb.settings.inactivityAlertSoundHint",
    config: true,
    scope: "world",
    // type: String,
    filePicker: "audio",
    default: "/modules/birb/assets/sounds/lark.ogg",
  });
}
