import { useState } from "react";
import { createPortal } from "react-dom";
import { BsFillExclamationCircleFill } from "react-icons/bs";
import FocusLock from "react-focus-lock";

import useAppSelector from "@hooks/useAppSelector";
import useAppDispatch from "@hooks/useAppDispatch";
import PrimaryPlayPause from "../actions/PrimaryPlayPause";
import PrimaryProgress from "../actions/PrimaryProgress";
import PrimarySkip from "../actions/PrimarySkip";
import PrimarySpeed from "../actions/PrimarySpeed";
import SecondaryPlayPause from "../actions/SecondaryPlayPause";
import SecondaryProgress from "../actions/SecondaryProgress";
import SecondarySkip from "../actions/SecondarySkip";
import SecondarySpeed from "../actions/SecondarySpeed";
import {
  setPrimaryPlayback,
  setPrimaryDuration,
  setPrimaryCurrentTime,
  setPrimarySpeed,
  setPrimaryMuted,
  setSecondaryPlayback,
  setSecondaryDuration,
  setSecondaryCurrentTime,
  setSecondarySpeed,
  setSecondaryMuted,
  reset,
} from "@redux/slices/video";

interface VideoPlayerProps {
  blob: string;
  isFlipped: boolean;
  isPrimary: boolean;
}

const VideoPlayer = ({ blob, isFlipped, isPrimary }: VideoPlayerProps) => {
  const [playbackError, setPlaybackError] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const onPlay = () => {
    if (isPrimary) {
      dispatch(setPrimaryPlayback(true));
    } else {
      dispatch(setSecondaryPlayback(true));
    }
  };

  const onPause = () => {
    if (isPrimary) {
      dispatch(setPrimaryPlayback(false));
    } else {
      dispatch(setSecondaryPlayback(false));
    }
  };

  const onDurationChange = (e: React.SyntheticEvent) => {
    const currentTarget = e.currentTarget as HTMLVideoElement;
    if (isPrimary) {
      dispatch(setPrimaryDuration(currentTarget.duration));
    } else {
      dispatch(setSecondaryDuration(currentTarget.duration));
    }
  };

  const onTimeUpdate = (e: React.SyntheticEvent) => {
    const currentTarget = e.currentTarget as HTMLVideoElement;
    if (isPrimary) {
      dispatch(setPrimaryCurrentTime(currentTarget.currentTime));
      dispatch(setPrimaryDuration(currentTarget.duration));
    } else {
      dispatch(setSecondaryCurrentTime(currentTarget.currentTime));
      dispatch(setSecondaryDuration(currentTarget.duration));
    }
  };

  const onRateChange = (e: React.SyntheticEvent) => {
    const currentTarget = e.currentTarget as HTMLVideoElement;
    if (isPrimary) {
      dispatch(setPrimarySpeed(currentTarget.playbackRate));
    } else {
      dispatch(setSecondarySpeed(currentTarget.playbackRate));
    }
  };

  const onVolumeChange = (e: React.SyntheticEvent) => {
    const currentTarget = e.currentTarget as HTMLVideoElement;
    if (isPrimary) {
      dispatch(setPrimaryMuted(currentTarget.muted));
    } else {
      dispatch(setSecondaryMuted(currentTarget.muted));
    }
  };

  const handleReset = () => {
    dispatch(reset());
  };

  const onError = () => {
    setPlaybackError(true);
  };

  if (playbackError) {
    return createPortal(
      <FocusLock>
        <div className="fixed inset-0 flex items-center justify-center z-[100000] bg-white dark:bg-black bg-opacity-90">
          <div className="text-center">
            <BsFillExclamationCircleFill className="text-4xl mb-2 mx-auto" />
            <h2 className="text-lg uppercase font-bold mb-4">
              A Playback Error Occurred
            </h2>
            <button
              type="button"
              className="uppercase text-brand-blue font-semibold"
              onClick={handleReset}
            >
              Return Home
            </button>
          </div>
        </div>
      </FocusLock>,
      document.body,
    );
  }

  return (
    <video
      src={blob}
      loop
      muted
      autoPlay
      playsInline
      data-flipped={isFlipped}
      data-video-type={isPrimary ? "primary" : "secondary"}
      className={`block max-h-full w-full h-full pointer-events-none ${
        isFlipped ? "-scale-x-100" : "scale-x-100"
      }`}
      onPlay={onPlay}
      onPlaying={onPlay}
      onPause={onPause}
      onLoadedData={onDurationChange}
      onDurationChange={onDurationChange}
      onTimeUpdate={onTimeUpdate}
      onRateChange={onRateChange}
      onVolumeChange={onVolumeChange}
      onError={onError}
    />
  );
};

const DualVideo = () => {
  const { primaryVideo, secondaryVideo } = useAppSelector(
    (state) => state.video,
  );
  const { isDrawing } = useAppSelector((state) => state.draw);

  return (
    <div className="flex w-full h-full">
      {/* Primary Video */}
      <div className="flex-1 relative">
        {primaryVideo.blob !== undefined && (
          <VideoPlayer
            blob={primaryVideo.blob}
            isFlipped={primaryVideo.isFlipped}
            isPrimary={true}
          />
        )}
        <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
          Primary
        </div>
        {/* Primary Video Controls */}
        <div
          className={`absolute bottom-0 left-0 right-0 p-4 flex items-center gap-1 z-[2] opacity-100 transition-opacity ${
            isDrawing ? "opacity-0 pointer-events-none" : ""
          }`}
        >
          <PrimaryPlayPause />
          <PrimaryProgress />
          <PrimarySkip />
          <PrimarySpeed />
        </div>
      </div>

      {/* Divider */}
      <div className="w-px bg-gray-300 dark:bg-gray-600"></div>

      {/* Secondary Video */}
      <div className="flex-1 relative">
        {secondaryVideo.blob !== undefined && (
          <VideoPlayer
            blob={secondaryVideo.blob}
            isFlipped={secondaryVideo.isFlipped}
            isPrimary={false}
          />
        )}
        <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
          Secondary
        </div>
        {/* Secondary Video Controls */}
        <div
          className={`absolute bottom-0 left-0 right-0 p-4 flex items-center gap-1 z-[2] opacity-100 transition-opacity ${
            isDrawing ? "opacity-0 pointer-events-none" : ""
          }`}
        >
          <SecondaryPlayPause />
          <SecondaryProgress />
          <SecondarySkip />
          <SecondarySpeed />
        </div>
      </div>
    </div>
  );
};

export default DualVideo;
