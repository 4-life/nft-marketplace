import React, { useCallback, useState } from 'react';
import Modal, { Styles } from 'react-modal';
import Item from 'components/Item';
import data from 'dummy';
import './App.scss';
import Selector from 'components/Select';
import { Buy } from 'types';
import ItemDetails from 'components/ItemDetails';

Modal.setAppElement('#root');
const customStyles: Styles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'visible',
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

function App() {
  const [items, setItems] = useState<Buy[]>(data);
  const [itemDetails, setItemDetails] = useState<Buy | undefined>(undefined);
  const onChangeRange = useCallback((range: number) => {
    const diff = new Date().getTime() - range * 24 * 60 * 60 * 1000;
    setItems(data.filter((val) => val.publishDate.getTime() >= diff));
  }, []);

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
            <h1>Digital</h1>
          </div>

          <div className="subheader">
            <h2>Market</h2>

            <Selector onChange={(e) => onChangeRange(e?.value || 0)} />
          </div>
        </header>
        <main>
          {items.map((d) => (
            <Item key={d.id} item={d} show={openModal} />
          ))}
          {items.map((d) => (
            <Item key={`hidden${d.id}`} item={undefined} />
          ))}
        </main>
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
