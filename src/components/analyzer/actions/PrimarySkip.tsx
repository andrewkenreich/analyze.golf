import { BsFillSkipForwardFill, BsFillSkipBackwardFill } from "react-icons/bs";
import useAppSelector from "@hooks/useAppSelector";
import useAppDispatch from "@hooks/useAppDispatch";
import { getPrimaryPlayer, getSecondaryPlayer } from "@helpers";
import { setPrimaryCurrentTime } from "@redux/slices/video";

const skipBackLabel = "Skip primary video back";
const skipForwardLabel = "Skip primary video forward";

const PrimarySkip = () => {
  const dispatch = useAppDispatch();
  const { syncPlayback, isComparisonMode } = useAppSelector(
    (state) => state.video,
  );

  const handleSkipForward = () => {
    const primaryPlayer = getPrimaryPlayer();
    primaryPlayer.currentTime += 0.05;

    // If sync is enabled, also skip secondary video
    if (syncPlayback && isComparisonMode) {
      const secondaryPlayer = getSecondaryPlayer();
      if (secondaryPlayer !== null) {
        secondaryPlayer.currentTime += 0.05;
      }
    }

    dispatch(setPrimaryCurrentTime(primaryPlayer.currentTime));
  };

  const handleSkipBackward = () => {
    const primaryPlayer = getPrimaryPlayer();
    primaryPlayer.currentTime -= 0.05;

    // If sync is enabled, also skip secondary video
    if (syncPlayback && isComparisonMode) {
      const secondaryPlayer = getSecondaryPlayer();
      if (secondaryPlayer !== null) {
        secondaryPlayer.currentTime -= 0.05;
      }
    }

    dispatch(setPrimaryCurrentTime(primaryPlayer.currentTime));
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

export default PrimarySkip;
