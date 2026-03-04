import { useRef, useState } from "react";
import { track } from "@vercel/analytics";

import useAppDispatch from "@hooks/useAppDispatch";
import useAppSelector from "@hooks/useAppSelector";
import {
  setPrimaryBlob,
  setSecondaryBlob,
  startAnalysis,
} from "@redux/slices/video";

const FilePicker = () => {
  const dispatch = useAppDispatch();
  const { primaryVideo, secondaryVideo, isComparisonMode } = useAppSelector(
    (state) => state.video,
  );
  const primaryInputRef = useRef<HTMLInputElement>(null);
  const secondaryInputRef = useRef<HTMLInputElement>(null);
  const [isCreatingBlob, setIsCreatingBlob] = useState<boolean>(false);
  const [primaryFileName, setPrimaryFileName] = useState<string>("");
  const [secondaryFileName, setSecondaryFileName] = useState<string>("");

  const handleOpenPrimaryFile = () => {
    if (primaryInputRef.current != null) {
      primaryInputRef.current.click();
    }
  };

  const handleOpenSecondaryFile = () => {
    if (secondaryInputRef.current != null) {
      secondaryInputRef.current.click();
    }
  };

  const handleSelectPrimaryFile = (e: React.SyntheticEvent) => {
    setIsCreatingBlob(true);
    track("Select primary file");

    try {
      const target = e.target as HTMLInputElement;
      const files = target.files;
      if (files != null && files.length > 0) {
        const file = files[0];
        const blob = URL.createObjectURL(file);
        setPrimaryFileName(file.name);
        dispatch(setPrimaryBlob(blob));
      }
    } catch (err) {
      console.error("Error creating primary video blob:", err);
    } finally {
      setIsCreatingBlob(false);
    }
  };

  const handleSelectSecondaryFile = (e: React.SyntheticEvent) => {
    setIsCreatingBlob(true);
    track("Select secondary file");

    try {
      const target = e.target as HTMLInputElement;
      const files = target.files;
      if (files != null && files.length > 0) {
        const file = files[0];
        const blob = URL.createObjectURL(file);
        setSecondaryFileName(file.name);
        dispatch(setSecondaryBlob(blob));
      }
    } catch (err) {
      console.error("Error creating secondary video blob:", err);
    } finally {
      setIsCreatingBlob(false);
    }
  };

  const handleStartAnalysis = () => {
    track("Start analysis", {
      hasSecondaryVideo: secondaryVideo.blob !== undefined,
      isComparisonMode,
    });
    dispatch(startAnalysis());
  };

  const hasAnyVideo =
    primaryVideo.blob !== undefined || secondaryVideo.blob !== undefined;
  const hasBothVideos =
    primaryVideo.blob !== undefined && secondaryVideo.blob !== undefined;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-lg font-semibold mb-4">
          Select Video(s) for Analysis
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          Upload one video to analyze, or two videos to compare side by side
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Primary Video */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Primary Video
          </label>
          {primaryVideo.blob !== undefined && (
            <div className="text-xs text-green-600 dark:text-green-400 font-medium bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded border border-green-200 dark:border-green-800">
              📹 {primaryFileName}
            </div>
          )}
          <button
            type="button"
            onClick={handleOpenPrimaryFile}
            disabled={isCreatingBlob}
            className={`w-full px-4 py-3 bg-transparent rounded uppercase border-2 border-dashed font-semibold text-lg tracking-wide relative transition-all ${
              primaryVideo.blob !== undefined
                ? "border-green-500 text-green-500 hover:bg-green-500 focus:bg-green-500"
                : "border-brand-blue text-brand-blue hover:bg-brand-blue focus:bg-brand-blue"
            } hover:border-current focus:border-current hover:text-white focus:text-white`}
          >
            {primaryVideo.blob !== undefined
              ? "Replace Primary Video"
              : "Select Primary Video"}
          </button>
          <input
            className="hidden"
            ref={primaryInputRef}
            accept="video/mp4,video/x-m4v,video/*"
            multiple={false}
            onChange={handleSelectPrimaryFile}
            type="file"
          />
        </div>

        {/* Secondary Video */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Secondary Video (Optional)
          </label>
          {secondaryVideo.blob !== undefined && (
            <div className="text-xs text-green-600 dark:text-green-400 font-medium bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded border border-green-200 dark:border-green-800">
              📹 {secondaryFileName}
            </div>
          )}
          <button
            type="button"
            onClick={handleOpenSecondaryFile}
            disabled={isCreatingBlob}
            className={`w-full px-4 py-3 bg-transparent rounded uppercase border-2 border-dashed font-semibold text-lg tracking-wide relative transition-all ${
              secondaryVideo.blob !== undefined
                ? "border-green-500 text-green-500 hover:bg-green-500 focus:bg-green-500"
                : "border-gray-400 text-gray-400 hover:bg-gray-400 focus:bg-gray-400"
            } hover:border-current focus:border-current hover:text-white focus:text-white`}
          >
            {secondaryVideo.blob !== undefined
              ? "Replace Secondary Video"
              : "Select Secondary Video"}
          </button>
          <input
            className="hidden"
            ref={secondaryInputRef}
            accept="video/mp4,video/x-m4v,video/*"
            multiple={false}
            onChange={handleSelectSecondaryFile}
            type="file"
          />
        </div>
      </div>

      {hasAnyVideo && (
        <div className="text-center space-y-4">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {hasBothVideos
              ? "Both videos selected! Ready for comparison analysis."
              : primaryVideo.blob !== undefined
                ? "Primary video selected! You can add a secondary video for comparison, or start analysis now."
                : "Secondary video selected! Add a primary video or start analysis now."}
          </div>
          <button
            type="button"
            onClick={handleStartAnalysis}
            disabled={isCreatingBlob}
            className="px-8 py-3 bg-brand-blue hover:bg-blue-600 focus:bg-blue-600 text-white font-semibold text-lg uppercase rounded transition-all shadow-lg hover:shadow-xl focus:shadow-xl"
          >
            Start Analysis
          </button>
        </div>
      )}
    </div>
  );
};

export default FilePicker;
