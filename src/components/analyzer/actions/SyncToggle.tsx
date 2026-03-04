import { BsLock, BsUnlock } from "react-icons/bs";
import { track } from "@vercel/analytics";

import useAppSelector from "@hooks/useAppSelector";
import useAppDispatch from "@hooks/useAppDispatch";
import { setSyncPlayback } from "@redux/slices/video";

const SyncToggle = () => {
  const dispatch = useAppDispatch();
  const { syncPlayback } = useAppSelector((state) => state.video);

  const handleToggleSync = () => {
    dispatch(setSyncPlayback(!syncPlayback));
    track("Toggle sync playback", { enabled: !syncPlayback });
  };

  const label = syncPlayback ? "Disable sync playback" : "Enable sync playback";

  return (
    <button
      type="button"
      className={`btn-action ${
        syncPlayback
          ? "bg-brand-blue bg-opacity-80 text-white"
          : "bg-transparent"
      }`}
      onClick={handleToggleSync}
      aria-label={label}
      title={label}
    >
      {syncPlayback ? <BsLock /> : <BsUnlock />}
    </button>
  );
};

export default SyncToggle;
