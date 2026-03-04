import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface VideoState {
  blob: string | undefined;
  isPlaying: boolean;
  isMuted: boolean;
  isFlipped: boolean;
  currentTime: number;
  duration: number;
  speed: number;
}

interface DualVideoState {
  primaryVideo: VideoState;
  secondaryVideo: VideoState;
  isComparisonMode: boolean;
  syncPlayback: boolean;
  shouldStartAnalysis: boolean;
}

const initialVideoState: VideoState = {
  blob: undefined,
  isPlaying: false,
  isMuted: true,
  isFlipped: false,
  currentTime: 0,
  duration: 0,
  speed: 1,
};

const initialState: DualVideoState = {
  primaryVideo: initialVideoState,
  secondaryVideo: initialVideoState,
  isComparisonMode: false,
  syncPlayback: false,
  shouldStartAnalysis: false,
};

export const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    reset: () => initialState,
    setBlob: (state, action: PayloadAction<string>) => {
      if (state.primaryVideo.blob === undefined) {
        state.primaryVideo.blob = action.payload;
      } else if (state.secondaryVideo.blob === undefined) {
        state.secondaryVideo.blob = action.payload;
        state.isComparisonMode = true;
      } else {
        // Replace primary video if both slots are filled
        state.primaryVideo.blob = action.payload;
      }
    },
    setPrimaryBlob: (state, action: PayloadAction<string>) => {
      state.primaryVideo.blob = action.payload;
    },
    setSecondaryBlob: (state, action: PayloadAction<string>) => {
      state.secondaryVideo.blob = action.payload;
      state.isComparisonMode = true;
    },
    removePrimaryVideo: (state) => {
      state.primaryVideo = initialVideoState;
      if (state.secondaryVideo.blob === undefined) {
        state.isComparisonMode = false;
      }
    },
    removeSecondaryVideo: (state) => {
      state.secondaryVideo = initialVideoState;
      state.isComparisonMode = false;
    },
    setComparisonMode: (state, action: PayloadAction<boolean>) => {
      state.isComparisonMode = action.payload;
    },
    setSyncPlayback: (state, action: PayloadAction<boolean>) => {
      state.syncPlayback = action.payload;
    },
    startAnalysis: (state) => {
      state.shouldStartAnalysis = true;
    },
    // Primary video controls
    setPrimaryPlayback: (state, action: PayloadAction<boolean>) => {
      state.primaryVideo.isPlaying = action.payload;
      if (state.syncPlayback && state.isComparisonMode) {
        state.secondaryVideo.isPlaying = action.payload;
      }
    },
    setPrimaryMuted: (state, action: PayloadAction<boolean>) => {
      state.primaryVideo.isMuted = action.payload;
    },
    setPrimaryFlipped: (state, action: PayloadAction<boolean>) => {
      state.primaryVideo.isFlipped = action.payload;
    },
    setPrimaryCurrentTime: (state, action: PayloadAction<number>) => {
      state.primaryVideo.currentTime = action.payload;
    },
    setPrimaryDuration: (state, action: PayloadAction<number>) => {
      state.primaryVideo.duration = action.payload;
    },
    setPrimarySpeed: (state, action: PayloadAction<number>) => {
      state.primaryVideo.speed = action.payload;
      if (state.syncPlayback && state.isComparisonMode) {
        state.secondaryVideo.speed = action.payload;
      }
    },
    // Secondary video controls
    setSecondaryPlayback: (state, action: PayloadAction<boolean>) => {
      state.secondaryVideo.isPlaying = action.payload;
      if (state.syncPlayback && state.isComparisonMode) {
        state.primaryVideo.isPlaying = action.payload;
      }
    },
    setSecondaryMuted: (state, action: PayloadAction<boolean>) => {
      state.secondaryVideo.isMuted = action.payload;
    },
    setSecondaryFlipped: (state, action: PayloadAction<boolean>) => {
      state.secondaryVideo.isFlipped = action.payload;
    },
    setSecondaryCurrentTime: (state, action: PayloadAction<number>) => {
      state.secondaryVideo.currentTime = action.payload;
    },
    setSecondaryDuration: (state, action: PayloadAction<number>) => {
      state.secondaryVideo.duration = action.payload;
    },
    setSecondarySpeed: (state, action: PayloadAction<number>) => {
      state.secondaryVideo.speed = action.payload;
      if (state.syncPlayback && state.isComparisonMode) {
        state.primaryVideo.speed = action.payload;
      }
    },
    // Legacy support for existing code
    setPlayback: (state, action: PayloadAction<boolean>) => {
      state.primaryVideo.isPlaying = action.payload;
      if (state.syncPlayback && state.isComparisonMode) {
        state.secondaryVideo.isPlaying = action.payload;
      }
    },
    setMuted: (state, action: PayloadAction<boolean>) => {
      state.primaryVideo.isMuted = action.payload;
    },
    setFlipped: (state, action: PayloadAction<boolean>) => {
      state.primaryVideo.isFlipped = action.payload;
    },
    setCurrentTime: (state, action: PayloadAction<number>) => {
      state.primaryVideo.currentTime = action.payload;
      if (state.syncPlayback && state.isComparisonMode) {
        state.secondaryVideo.currentTime = action.payload;
      }
    },
    setDuration: (state, action: PayloadAction<number>) => {
      state.primaryVideo.duration = action.payload;
    },
    setSpeed: (state, action: PayloadAction<number>) => {
      state.primaryVideo.speed = action.payload;
      if (state.syncPlayback && state.isComparisonMode) {
        state.secondaryVideo.speed = action.payload;
      }
    },
  },
});

export const {
  reset,
  setBlob,
  setPrimaryBlob,
  setSecondaryBlob,
  removePrimaryVideo,
  removeSecondaryVideo,
  setComparisonMode,
  setSyncPlayback,
  startAnalysis,
  setPrimaryPlayback,
  setPrimaryMuted,
  setPrimaryFlipped,
  setPrimaryCurrentTime,
  setPrimaryDuration,
  setPrimarySpeed,
  setSecondaryPlayback,
  setSecondaryMuted,
  setSecondaryFlipped,
  setSecondaryCurrentTime,
  setSecondaryDuration,
  setSecondarySpeed,
  setPlayback,
  setMuted,
  setFlipped,
  setCurrentTime,
  setDuration,
  setSpeed,
} = videoSlice.actions;

export default videoSlice.reducer;
