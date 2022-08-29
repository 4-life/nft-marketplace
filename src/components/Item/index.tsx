import React, { memo, useState } from 'react';
import { Buy } from 'types';
import kFormatter from 'utils/kFormatter';
import getTimeAgo from 'utils/timeAgo';
import { getImageUrl, getAvatarsUrl } from 'utils/getImagesUrl';
import Loader from '../Loader';
import './style.scss';

type Props = { item: Buy | undefined; show?: (details: Buy) => void };

function Item({ item, show }: Props) {
  const [loaded, setLoaded] = useState(false);
  if (!item) {
    return <div className="Item hidden" />;
  }

  const imageUrl = getImageUrl(item.pic);

  return (
    <button
      className="Item"
      onClick={() => loaded && show?.(item)}
      type="button"
    >
      {/* use img only for loaded event */}
      <img
        alt=""
        style={{ display: 'none' }}
        src={imageUrl}
        onLoad={() => setLoaded(true)}
      />
      <div className="content">
        <figure
          className="itemPic"
          style={{ backgroundImage: loaded ? `url(${imageUrl})` : 'none' }}
        >
          {!loaded ? <Loader /> : null}
        </figure>

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
    </button>
  );
}

export default memo(Item);
