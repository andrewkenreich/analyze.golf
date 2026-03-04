import { BsFillArrowLeftCircleFill } from "react-icons/bs";

import useAppSelector from "@hooks/useAppSelector";
import useAppDispatch from "@hooks/useAppDispatch";
import { reset } from "@redux/slices/video";

const label = "Close video";

const Close = () => {
  const { primaryVideo, secondaryVideo } = useAppSelector(
    (state) => state.video,
  );
  const dispatch = useAppDispatch();

  const handleClose = () => {
    // Clean up video blob URLs to prevent memory leaks
    if (typeof primaryVideo.blob === "string") {
      URL.revokeObjectURL(primaryVideo.blob);
    }
    if (typeof secondaryVideo.blob === "string") {
      URL.revokeObjectURL(secondaryVideo.blob);
    }
    dispatch(reset());
  };

  return (
    <button
      type="button"
      className="btn-action"
      onClick={handleClose}
      aria-label={label}
      title={label}
    >
      <BsFillArrowLeftCircleFill />
    </button>
  );
};

export default Close;
