import { Buy } from 'types';

const data: Buy[] = [
  {
    author: {
      name: 'Hayden',
      avatar: '../public/images/dummy-avatar.webp',
    },
    title: '#4 Cloud Cofee',
    views: 32123,
    pic: '../public/images/dummy-image.png',
    likes: 457,
    comments: 923,
    price: '0.0000123',
    publishDate: new Date(2022, 6, 1),
  },
  {
    author: {
      name: 'Hayden',
      avatar: 'images/dummy-avatar.webp',
    },
    title: 'Magestico',
    views: 32123,
    pic: 'images/dummy-image.png',
    likes: 457,
    comments: 923,
    price: '0.0000123',
    publishDate: new Date(2022, 6, 1),
  },
  {
    author: {
      name: 'Hayden',
      avatar: 'images/dummy-avatar.webp',
    },
    title: 'Magestico',
    views: 32123,
    pic: 'images/dummy-image.png',
    likes: 457,
    comments: 923,
    price: '0.0000123',
    publishDate: new Date(2022, 6, 1),
  },
  {
    author: {
      name: 'Hayden',
      avatar: 'images/dummy-avatar.webp',
    },
    title: 'Magestico',
    views: 32123,
    pic: 'images/dummy-image.png',
    likes: 457,
    comments: 923,
    price: '0.0000123',
    publishDate: new Date(2022, 6, 1),
  },
  {
    author: {
      name: 'Hayden',
      avatar: 'images/dummy-avatar.webp',
    },
    title: 'Magestico',
    views: 32123,
    pic: 'images/dummy-image.png',
    likes: 457,
    comments: 923,
    price: '0.0000123',
    publishDate: new Date(2022, 6, 1),
  },
  {
    author: {
      name: 'Hayden',
      avatar: 'images/dummy-avatar.webp',
    },
    title: 'Magestico',
    views: 32123,
    pic: 'images/dummy-image.png',
    likes: 457,
    comments: 923,
    price: '0.0000123',
    publishDate: new Date(2022, 6, 1),
  },
  {
    author: {
      name: 'Hayden',
      avatar: 'images/dummy-avatar.webp',
    },
    title: 'Magestico',
    views: 32123,
    pic: 'images/dummy-image.png',
    likes: 457,
    comments: 923,
    price: '0.0000123',
    publishDate: new Date(2022, 6, 1),
  },
  {
    author: {
      name: 'Hayden',
      avatar: 'images/dummy-avatar.webp',
    },
    title: 'Magestico',
    views: 32123,
    pic: 'images/dummy-image.png',
    likes: 457,
    comments: 923,
    price: '0.0000123',
    publishDate: new Date(2022, 6, 1),
  },
  {
    author: {
      name: 'Hayden',
      avatar: './images/dummy-avatar.webp',
    },
    title: 'Magestico',
    views: 32123,
    pic: 'images/dummy-image.png',
    likes: 457,
    comments: 923,
    price: '0.0000123',
    publishDate: new Date(2022, 1, 1),
  },
  {
    author: {
      name: 'Hayden',
      avatar: 'images/dummy-avatar.webp',
    },
    title: 'Magestico',
    views: 32123,
    pic: 'images/dummy-image.png',
    likes: 457,
    comments: 923,
    price: '0.0000123',
    publishDate: new Date(2021, 5, 6),
  },
  {
    author: {
      name: 'Hayden',
      avatar: 'images/dummy-avatar.webp',
    },
    title: 'Magestico',
    views: 32123,
    pic: 'images/dummy-image.png',
    likes: 457,
    comments: 923,
    price: '0.0000123',
    publishDate: new Date(2021, 5, 6),
  },
].map((e, index) => ({
  ...e,
  id: index + 1,
}));

export default data;
