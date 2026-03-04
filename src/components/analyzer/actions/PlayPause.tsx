import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";

import useAppSelector from "@hooks/useAppSelector";
import { getPrimaryPlayer, getAllPlayers } from "@helpers";

const playLabel = "Play video";
const pauseLabel = "Pause video";

const PlayPause = () => {
  const { primaryVideo, isComparisonMode, syncPlayback } = useAppSelector(
    (state) => state.video,
  );
  const { isPlaying } = primaryVideo;

  const handlePause = () => {
    if (isComparisonMode && syncPlayback) {
      getAllPlayers().forEach((player) => {
        player.pause();
      });
    } else {
      getPrimaryPlayer().pause();
    }
  };

  const handlePlay = () => {
    if (isComparisonMode && syncPlayback) {
      getAllPlayers().forEach((player) => {
        void player.play();
      });
    } else {
      void getPrimaryPlayer().play();
    }
  };

  if (isPlaying) {
    return (
      <button
        type="button"
        className="btn-action"
        onClick={handlePause}
        aria-label={pauseLabel}
        title={pauseLabel}
      >
        <BsFillPauseFill />
      </button>
    );
  }

  return (
    <button
      type="button"
      className="btn-action"
      onClick={handlePlay}
      aria-label={playLabel}
      title={playLabel}
    >
      <BsFillPlayFill />
    </button>
  );
};

export default PlayPause;
