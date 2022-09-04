import React, { useCallback, useEffect, useState } from 'react';
import Modal, { Styles } from 'react-modal';
import Item from 'components/Item';
import { useQuery, gql } from '@apollo/client';
import './App.scss';
import Selector from 'components/Select';
import { Buy } from 'types';
import ItemDetails from 'components/ItemDetails';
import Footer from 'components/Footer';
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
  query getItems {
    items {
      id
      pic
      author {
        id
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

function App() {
  const { loading, error, data } = useQuery(GET_ITEMS);

  const [items, setItems] = useState<Buy[]>([]);
  const [itemDetails, setItemDetails] = useState<Buy | undefined>(undefined);

  useEffect(() => {
    if (data?.items) {
      setItems(data?.items);
    }
  }, [data]);

  const onChangeRange = useCallback(
    (range: number) => {
      const diff = new Date().getTime() - range * 24 * 60 * 60 * 1000;
      setItems(items.filter((val) => val.publishDate.getTime() >= diff));
    },
    [items]
  );

  const openModal = (details: Buy) => {
    setItemDetails(details);
  };

  const closeModal = () => {
    setItemDetails(undefined);
  };

  return (
    <div className="App">
      <div className="bg-shapes" />
      <div className="bg-noise" />

      <div className="scroll">
        <header className="App-header">
          <div className="Logo">
            <figure />
            <h1>lambda.Digital</h1>
          </div>

          <div className="subheader">
            <h2>Market</h2>

            <Selector onChange={(e) => onChangeRange(e?.value || 0)} />
          </div>
        </header>

        <main>
          {loading && (
            <div className="itemsLoader">
              <Loader />
            </div>
          )}
          {error && <div className="itemsLoader">Can&apos;t load items</div>}
          {items.map((d) => (
            <Item key={d.id} item={d} show={openModal} />
          ))}
          {items.map((d) => (
            <Item key={`hidden${d.id}`} item={undefined} />
          ))}
        </main>

        <Footer />
      </div>
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

export default App;
