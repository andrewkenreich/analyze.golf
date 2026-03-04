import { BsFillSkipForwardFill, BsFillSkipBackwardFill } from "react-icons/bs";
import useAppSelector from "@hooks/useAppSelector";
import useAppDispatch from "@hooks/useAppDispatch";
import { getPrimaryPlayer, getSecondaryPlayer } from "@helpers";
import { setSecondaryCurrentTime } from "@redux/slices/video";

const skipBackLabel = "Skip secondary video back";
const skipForwardLabel = "Skip secondary video forward";

const SecondarySkip = () => {
  const dispatch = useAppDispatch();
  const { syncPlayback, isComparisonMode } = useAppSelector(
    (state) => state.video,
  );

  const handleSkipForward = () => {
    const player = getSecondaryPlayer();
    if (player !== null) {
      player.currentTime += 0.05;

      // If sync is enabled, also skip primary video
      if (syncPlayback && isComparisonMode) {
        getPrimaryPlayer().currentTime += 0.05;
      }

      dispatch(setSecondaryCurrentTime(player.currentTime));
    }
  };

  const handleSkipBackward = () => {
    const player = getSecondaryPlayer();
    if (player !== null) {
      player.currentTime -= 0.05;

      // If sync is enabled, also skip primary video
      if (syncPlayback && isComparisonMode) {
        getPrimaryPlayer().currentTime -= 0.05;
      }

      dispatch(setSecondaryCurrentTime(player.currentTime));
    }
  };

  return (
    <>
      <button
        type="button"
        className="btn-action"
        onClick={handleSkipBackward}
        aria-label={skipBackLabel}
        title={skipBackLabel}
      >
        <BsFillSkipBackwardFill />
      </button>
      <button
        type="button"
        className="btn-action"
        onClick={handleSkipForward}
        aria-label={skipForwardLabel}
        title={skipForwardLabel}
      >
        <BsFillSkipForwardFill />
      </button>
    </>
  );
};

export default SecondarySkip;
