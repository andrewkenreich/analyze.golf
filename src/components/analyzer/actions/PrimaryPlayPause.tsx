import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";

import useAppSelector from "@hooks/useAppSelector";
import useAppDispatch from "@hooks/useAppDispatch";
import { getPrimaryPlayer, getSecondaryPlayer } from "@helpers";
import { setPrimaryPlayback } from "@redux/slices/video";

const playLabel = "Play primary video";
const pauseLabel = "Pause primary video";

const PrimaryPlayPause = () => {
  const dispatch = useAppDispatch();
  const { primaryVideo, syncPlayback, isComparisonMode } = useAppSelector(
    (state) => state.video,
  );
  const { isPlaying } = primaryVideo;

  const handlePause = () => {
    getPrimaryPlayer().pause();

    // If sync is enabled, also pause secondary video
    if (syncPlayback && isComparisonMode) {
      const secondaryPlayer = getSecondaryPlayer();
      if (secondaryPlayer !== null) {
        secondaryPlayer.pause();
      }
    }

    dispatch(setPrimaryPlayback(false));
  };

  const handlePlay = () => {
    void getPrimaryPlayer().play();

    // If sync is enabled, also play secondary video
    if (syncPlayback && isComparisonMode) {
      const secondaryPlayer = getSecondaryPlayer();
      if (secondaryPlayer !== null) {
        void secondaryPlayer.play();
      }
    }

    dispatch(setPrimaryPlayback(true));
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

export default PrimaryPlayPause;
