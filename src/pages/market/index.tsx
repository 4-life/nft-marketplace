import React, { useCallback, useState } from 'react';
import Modal, { Styles } from 'react-modal';
import ItemComponent from 'components/Item';
import { useQuery, gql } from '@apollo/client';
import './index.scss';
import Selector from 'components/Select';
import { Item, ItemsData, ItemsVars } from 'types';
import ItemDetails from 'components/ItemDetails';
import Loader from 'components/Loader';

Modal.setAppElement('#root');
const customStyles: Styles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    overflow: 'visible',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: 0,
    background: 'transparent',
    border: 'none',
    maxWidth: '650px',
    maxHeight: '750px',
    height: '100%',
    width: '100%',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
};

const GET_ITEMS = gql`
  query GetItems($range: Int!) {
    items(range: $range) {
      id
      pic
      author {
        name
        avatar
      }
      views
      title
      price
      likes
      comments
      publishDate
    }
  }
`;

function Market() {
  const { loading, error, data, refetch } = useQuery<ItemsData, ItemsVars>(
    GET_ITEMS,
    {
      variables: { range: 365 },
      notifyOnNetworkStatusChange: true,
    }
  );

  const [itemDetails, setItemDetails] = useState<Item | undefined>(undefined);

  const onChangeRange = useCallback(
    (newRange: number) => refetch({ range: newRange }),
    [refetch]
  );

  const openModal = (details: Item) => {
    setItemDetails(details);
  };

  const closeModal = () => {
    setItemDetails(undefined);
  };

  return (
    <div className="Market">
      <div className="subheader">
        <h2>Market</h2>
        <Selector onChange={(e) => onChangeRange(e?.value || 0)} />
      </div>
      <main>
        <div className="itemsLoader">{loading && <Loader />}</div>
        {error && <p>Can&apos;t load items</p>}
        {!loading && !data?.items.length && <p>No items</p>}
        {data?.items.map((d) => (
          <ItemComponent key={d.id} item={d} show={openModal} />
        ))}
        {/* hidden items for saving flex grid */}
        {[...Array(10)].map((_d, i) => (
          <ItemComponent key={`hidden${i + 1}`} item={undefined} />
        ))}
      </main>
      <Modal
        isOpen={!!itemDetails}
        onRequestClose={closeModal}
        style={customStyles}
      >
        {itemDetails && <ItemDetails item={itemDetails} close={closeModal} />}
      </Modal>
    </div>
  );
}

export default Market;
