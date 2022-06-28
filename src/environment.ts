export default function env() {
  if (process.env.NODE_ENV === 'production') {
    return {
      PRODUCTION: true,
    };
  }

  return {
    PRODUCTION: false,
  };
}
