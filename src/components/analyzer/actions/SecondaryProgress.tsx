import { useRef } from "react";
import * as Slider from "@radix-ui/react-slider";
import * as Tooltip from "@radix-ui/react-tooltip";

import useAppSelector from "@hooks/useAppSelector";
import useAppDispatch from "@hooks/useAppDispatch";
import { getPrimaryPlayer, getSecondaryPlayer } from "@helpers";
import {
  setSecondaryCurrentTime,
  setSecondaryPlayback,
} from "@redux/slices/video";

const SecondaryProgress = () => {
  const dispatch = useAppDispatch();
  const { secondaryVideo, syncPlayback, isComparisonMode } = useAppSelector(
    (state) => state.video,
  );
  const { duration, currentTime, isPlaying } = secondaryVideo;
  const { isDrawing } = useAppSelector((state) => state.draw);
  const isPlayingAtStartOfSliderChange = useRef<boolean>(false);
  const isDragging = useRef<boolean>(false);

  const handleChange = (values: number[]) => {
    const player = getSecondaryPlayer();
    if (player === null) return;

    if (!isDragging.current) {
      isPlayingAtStartOfSliderChange.current = isPlaying;
    }

    isDragging.current = true;

    if (isPlaying) {
      player.pause();

      // If sync is enabled, also pause primary video
      if (syncPlayback && isComparisonMode) {
        getPrimaryPlayer().pause();
      }

      dispatch(setSecondaryPlayback(false));
    }

    player.currentTime = values[0];

    // If sync is enabled, also update primary video time
    if (syncPlayback && isComparisonMode) {
      getPrimaryPlayer().currentTime = values[0];
    }

    dispatch(setSecondaryCurrentTime(values[0]));
  };

  const handleCommit = () => {
    const player = getSecondaryPlayer();
    if (player === null) return;

    if (isPlayingAtStartOfSliderChange.current) {
      void player.play();

      // If sync is enabled, also play primary video
      if (syncPlayback && isComparisonMode) {
        void getPrimaryPlayer().play();
      }

      dispatch(setSecondaryPlayback(true));
    }
    isDragging.current = false;
  };

  return (
    <div className="px-2 w-full">
      <Slider.Root
        className="relative select-none touch-none w-full h-[36px] sm:h-[42px] flex items-center rounded"
        value={[currentTime]}
        step={0.01}
        min={0}
        max={duration}
        aria-label="Secondary video playback time"
        onValueChange={handleChange}
        onValueCommit={handleCommit}
      >
        <Slider.Track className="bg-black dark:bg-white relative grow rounded w-full h-full overflow-hidden !bg-opacity-40">
          <Slider.Range className="absolute bg-brand-blue bg-opacity-70 h-full" />
        </Slider.Track>
        <Tooltip.Provider>
          <Tooltip.Root open>
            <Tooltip.Trigger asChild>
              <Slider.Thumb className="block w-3 border border-blue-800 h-[42px] sm:h-[48px] shadow rounded-full focus:shadow-lg bg-brand-blue " />
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content
                className={`bg-black rounded  p-1 text-xs z-[100] text-white ${
                  isDrawing ? "opacity-0" : ""
                }`}
              >
                <Tooltip.Arrow />
                {currentTime.toFixed(2)}
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
      </Slider.Root>
    </div>
  );
};

export default SecondaryProgress;
