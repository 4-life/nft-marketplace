import React, { memo } from 'react';
import { Buy } from 'types';
import kFormatter from 'utils/kFormatter';
import getTimeAgo from 'utils/timeAgo';
import { getImageUrl, getAvatarsUrl } from 'utils/getImagesUrl';
import './style.scss';

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
          style={{ backgroundImage: `url(${getImageUrl(item.pic)})` }}
        />

        <div className="description">
          <div className="author">
            <div className="authorData">
              <figure
                className="authorAvatar"
                style={{
                  backgroundImage: `url(${getAvatarsUrl(item.author.avatar)})`,
                }}
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
            <div className="priceVal">{item.price} ETH</div>
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

export default memo(Item);
