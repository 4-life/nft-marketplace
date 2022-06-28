export const avatars = [
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
];

export const getAvatarUrl = (avatar: string) => {
  const exist = avatars.includes(avatar);

  if (!exist) {
    return '';
  }

  return `/images/avatars/${avatar}.webp`;
};
