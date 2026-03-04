export const getPlayer = (): HTMLVideoElement => {
  try {
    const player = document.getElementsByTagName("video")[0];
    return player;
  } catch (err) {
    throw Error("Player not found");
  }
};

export const getPrimaryPlayer = (): HTMLVideoElement => {
  try {
    const player = document.querySelector(
      'video[data-video-type="primary"]',
    ) as HTMLVideoElement;
    if (player === null) {
      // Fallback to first video if no primary video found
      return document.getElementsByTagName("video")[0];
    }
    return player;
  } catch (err) {
    throw Error("Primary player not found");
  }
};

export const getSecondaryPlayer = (): HTMLVideoElement | null => {
  try {
    const player = document.querySelector(
      'video[data-video-type="secondary"]',
    ) as HTMLVideoElement;
    return player;
  } catch (err) {
    return null;
  }
};

export const getAllPlayers = (): HTMLVideoElement[] => {
  try {
    return Array.from(document.getElementsByTagName("video"));
  } catch (err) {
    return [];
  }
};
