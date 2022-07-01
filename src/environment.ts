export default function env() {
  if (process.env.NODE_ENV === 'production') {
    return {
      PRODUCTION: true,
      imagesUrl: 'https://nft-images.4life.work',
      avatarsUrls: 'https://nft-images.4life.work/avatars',
    };
  }

  return {
    PRODUCTION: false,
    imagesUrl: 'https://nft-images.4life.work',
    avatarsUrls: 'https://nft-images.4life.work/avatars',
  };
}
