import { Suspense, lazy } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import SelectFile from "@components/selectFile/SelectFile";
import useVhHeight from "@hooks/useVhHeight";
import useAppSelector from "@hooks/useAppSelector";

// eslint-disable-next-line @typescript-eslint/promise-function-async
const Analyzer = lazy(() => import("@components/analyzer/Analyzer"));

function App() {
  useVhHeight();
  const { primaryVideo, shouldStartAnalysis } = useAppSelector(
    (state) => state.video,
  );

  const hasVideo = primaryVideo.blob !== undefined;
  const shouldShowAnalyzer = hasVideo && shouldStartAnalysis;

  if (shouldShowAnalyzer) {
    return (
      <Suspense
        fallback={
          <div
            className="fixed inset-0 flex items-center justify-center"
            role="alert"
            aria-busy="true"
          >
            <AiOutlineLoading3Quarters className="animate-spin" />
          </div>
        }
      >
        <Analyzer />
      </Suspense>
    );
  }

  return <SelectFile />;
}

export default App;
