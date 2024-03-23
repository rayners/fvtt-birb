export function registerSettings(): void {
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
}
