import * as Separator from "@radix-ui/react-separator";

import useAppSelector from "@hooks/useAppSelector";
import Canvas from "./draw/Canvas";
import Video from "./video/Video";
import DualVideo from "./video/DualVideo";
import PlayPause from "./actions/PlayPause";
import Progress from "./actions/Progress";
import Skip from "./actions/Skip";
import Speed from "./actions/Speed";
import Close from "./actions/Close";
import Muted from "./actions/Muted";
import Flip from "./actions/Flip";
import FullScreen from "./actions/FullScreen";
import DrawType from "./actions/DrawType";
import DrawColor from "./actions/DrawColor";
import Erase from "./actions/Erase";
import Undo from "./actions/Undo";
import SyncToggle from "./actions/SyncToggle";

const Analyzer = () => {
  const { isDrawing } = useAppSelector((state) => state.draw);
  const { isComparisonMode } = useAppSelector((state) => state.video);

  return (
    <div className="absolute inset-0">
      <div className="h-full relative flex items-stretch justify-center text-white">
        <div
          className={`absolute top-0 left-0 grid gap-1 p-4 z-[2] opacity-100 transition-opacity ${
            isDrawing ? "opacity-0 pointer-events-none" : ""
          }`}
        >
          <Close />
          <Separator.Root
            orientation="horizontal"
            className="w-full h-[1px] my-1 bg-transparent"
          />
          <Muted />
          <Flip />
          <FullScreen />
          {isComparisonMode && <SyncToggle />}
        </div>
        <div
          className={`absolute top-0 right-0 grid gap-1 p-4 z-[2]  opacity-100 transition-opacity ${
            isDrawing ? "opacity-0 pointer-events-none" : ""
          }`}
        >
          <DrawType />
          <DrawColor />
          <Undo />
          <Erase />
        </div>
        {isComparisonMode ? <DualVideo /> : <Video />}
        {!isComparisonMode && (
          <div
            className={`absolute bottom-0 left-0 right-0  p-4 flex items-center gap-1 z-[2] opacity-100 transition-opacity  ${
              isDrawing ? "opacity-0 pointer-events-none" : ""
            }`}
          >
            <PlayPause />
            <Progress />
            <Skip />
            <Speed />
          </div>
        )}
      </div>
      <Canvas />
    </div>
  );
};

export default Analyzer;
