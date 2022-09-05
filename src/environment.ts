export default function env() {
  if (process.env.NODE_ENV === 'production') {
    return {
      PRODUCTION: true,
      imagesUrl: 'https://nft-images.4life.work',
      avatarsUrls: 'https://nft-images.4life.work/avatars',
      uri: 'https://0lqd6iq4ba.execute-api.eu-central-1.amazonaws.com/prod/',
    };
  }

  return {
    PRODUCTION: false,
    imagesUrl: 'https://nft-images.4life.work',
    avatarsUrls: 'https://nft-images.4life.work/avatars',
    uri: 'https://0lqd6iq4ba.execute-api.eu-central-1.amazonaws.com/dev/',
  };
}
