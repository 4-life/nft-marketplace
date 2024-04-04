export default function env() {
  if (process.env.NODE_ENV === 'production') {
    return {
      PRODUCTION: true,
      imagesUrl: 'https://nft-images.4life.work',
      avatarsUrls: 'https://nft-images.4life.work/avatars',
      uri: 'https://jm6q63pax3.execute-api.eu-central-1.amazonaws.com/production/',
    };
  }

  return {
    PRODUCTION: false,
    imagesUrl: 'https://nft-images.4life.work',
    avatarsUrls: 'https://nft-images.4life.work/avatars',
    uri: 'http://localhost:3005',
  };
}
