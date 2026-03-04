import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";

import useAppSelector from "@hooks/useAppSelector";
import useAppDispatch from "@hooks/useAppDispatch";
import { getPrimaryPlayer, getSecondaryPlayer } from "@helpers";
import { setSecondaryPlayback } from "@redux/slices/video";

const playLabel = "Play secondary video";
const pauseLabel = "Pause secondary video";

const SecondaryPlayPause = () => {
  const dispatch = useAppDispatch();
  const { secondaryVideo, syncPlayback, isComparisonMode } = useAppSelector(
    (state) => state.video,
  );
  const { isPlaying } = secondaryVideo;

  const handlePause = () => {
    const player = getSecondaryPlayer();
    if (player !== null) {
      player.pause();
    }

    // If sync is enabled, also pause primary video
    if (syncPlayback && isComparisonMode) {
      getPrimaryPlayer().pause();
    }

    dispatch(setSecondaryPlayback(false));
  };

  const handlePlay = () => {
    const player = getSecondaryPlayer();
    if (player !== null) {
      void player.play();
    }

    // If sync is enabled, also play primary video
    if (syncPlayback && isComparisonMode) {
      void getPrimaryPlayer().play();
    }

    dispatch(setSecondaryPlayback(true));
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

export default SecondaryPlayPause;
