const SPRITE = ["01110", "11111", "10101", "11111", "01110", "01010", "11011"];

/** A tiny code-native sprite used only in the retro player-status bar. */
export function PixelAvatar() {
  return (
    <span className="pixel-avatar" aria-hidden="true">
      {SPRITE.flatMap((row, y) =>
        [...row].map((cell, x) => (
          <span
            key={`${x}-${y}`}
            className={cell === "1" ? "pixel-avatar-cell is-on" : "pixel-avatar-cell"}
          />
        )),
      )}
    </span>
  );
}
