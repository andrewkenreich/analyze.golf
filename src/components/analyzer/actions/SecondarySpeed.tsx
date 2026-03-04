import { useState } from "react";
import { BsSpeedometer } from "react-icons/bs";
import * as Popover from "@radix-ui/react-popover";
import { track } from "@vercel/analytics";

import useAppSelector from "@hooks/useAppSelector";
import useAppDispatch from "@hooks/useAppDispatch";
import { getPrimaryPlayer, getSecondaryPlayer } from "@helpers";
import { setSecondarySpeed } from "@redux/slices/video";

const SecondarySpeed = () => {
  const dispatch = useAppDispatch();
  const { secondaryVideo, syncPlayback, isComparisonMode } = useAppSelector(
    (state) => state.video,
  );
  const { speed } = secondaryVideo;
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  const handleChangePlaybackRate = (speed: number) => {
    const player = getSecondaryPlayer();
    if (player !== null) {
      player.playbackRate = speed;

      // If sync is enabled, also update primary video speed
      if (syncPlayback && isComparisonMode) {
        getPrimaryPlayer().playbackRate = speed;
      }

      dispatch(setSecondarySpeed(speed));
      track("Change secondary playback rate", { speed });
    }
  };

  return (
    <Popover.Root onOpenChange={handleOpenChange} open={isOpen}>
      <Popover.Trigger asChild>
        <button
          type="button"
          className="btn-action"
          aria-label="Change secondary video playback rate"
        >
          <BsSpeedometer />
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className="p-2 dark:bg-black bg-white border border-black dark:border-white shadow rounded duration-300 ease-in-out will-change-auto grid gap-2 ">
          {[0.1, 0.25, 0.5, 0.75, 1, 1.5, 2.0].map((rate) => (
            <button
              key={rate}
              type="button"
              onClick={() => {
                handleChangePlaybackRate(rate);
              }}
              className={`block text-center py-1 px-4 rounded ${
                rate === speed ? "text-white bg-brand-blue" : "text-current"
              }`}
            >
              {rate}x
            </button>
          ))}

          <Popover.Arrow className="fill-black dark:fill-white" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default SecondarySpeed;
