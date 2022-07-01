import env from 'environment';

const { imagesUrl, avatarsUrls } = env();

export const getImageUrl = (image?: string): string => {
  if (!image) {
    return 'images/dummy-image.webp';
  }

  return `${imagesUrl}/${image}`;
};

export const getAvatarsUrl = (avatar?: string): string => {
  if (!avatar) {
    return 'images/dummy-avatar.webp';
  }

  return `${avatarsUrls}/${avatar}`;
};
