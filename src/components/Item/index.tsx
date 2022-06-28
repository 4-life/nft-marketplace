import React from 'react';
import { Buy } from 'types';
import kFormatter from 'utils/kFormatter';
import getTimeAgo from 'utils/timeAgo';
import './style.scss';

const dummyAvatar = 'images/dummy-avatar.webp';
const dummyImage = 'images/dummy-image.png';

type Props = { item: Buy | undefined };

function Item({ item }: Props) {
  if (!item) {
    return <div className="Item hidden" />;
  }

  return (
    <div className="Item">
      <div className="content">
        <figure
          className="itemPic"
          style={{ backgroundImage: item.pic || dummyImage, color: '#ccc' }}
        />

        <div className="description">
          <div className="author">
            <div className="authorData">
              <figure
                className="authorAvatar"
                style={{ backgroundImage: item.author.avatar || dummyAvatar }}
              />
              <div className="name">
                {item.author.name}
                <div className="date">{getTimeAgo(item.publishDate)} ago</div>
              </div>
            </div>
            <div className="views">{kFormatter(item.views)}</div>
          </div>

          <div className="price">
            <div className="name">{item.title}</div>
            <div className="priceVal">{item.price}</div>
          </div>

          <div className="activity">
            <div className="likes">{kFormatter(item.likes)}</div>
            <div className="comments">{kFormatter(item.comments)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Item;
