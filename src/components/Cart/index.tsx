/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentType, useEffect, useState } from 'react';
import { useCart } from 'context/CartContext';
import { getAvatarsUrl, getImageUrl } from 'utils/getImagesUrl';
import './style.scss';

type ModalComp = ComponentType<any>;

const CONTRACT_INFO = {
  address: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b',
  tokenStandard: 'ERC-721',
  chain: 'Ethereum',
  royalty: '5%',
  metadata: 'Decentralized',
};

const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: 0,
    background: 'transparent',
    border: 'none',
    maxWidth: '480px',
    width: '100%',
    maxHeight: '80vh',
  },
  overlay: { backgroundColor: 'rgba(0, 0, 0, 0.6)' },
};

function Cart() {
  const { items, removeFromCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [Modal, setModal] = useState<ModalComp | null>(null);

  useEffect(() => {
    import('react-modal').then(({ default: ReactModal }) => {
      setModal(() => ReactModal as ModalComp);
    });
  }, []);

  const total = items
    .reduce((sum, item) => sum + parseFloat(item.price), 0)
    .toFixed(3);

  return (
    <>
      <button
        className="CartIcon"
        type="button"
        onClick={() => setIsOpen(true)}
      >
        <span className="icon" />
        {items.length > 0 && <span className="badge">{items.length}</span>}
      </button>

      {Modal && (
        <Modal
          isOpen={isOpen}
          onRequestClose={() => setIsOpen(false)}
          style={modalStyles}
        >
          <div className="CartModal">
            <div className="cartHeader">
              <h2>Cart</h2>
            </div>

            {items.length === 0 ? (
              <p className="empty">Your cart is empty</p>
            ) : (
              <>
                <ul className="cartList">
                  {items.map((item) => (
                    <li key={item.id} className="cartItem">
                      <figure
                        className="thumb"
                        style={{
                          backgroundImage: `url(${getImageUrl(item.pic)})`,
                        }}
                      />
                      <div className="info">
                        <figure
                          className="avatar"
                          style={{
                            backgroundImage: `url(${getAvatarsUrl(item.author.avatar)})`,
                          }}
                        />
                        <div className="meta">
                          <span className="title">{item.title}</span>
                          <span className="author">{item.author.name}</span>
                        </div>
                        <span className="price">{item.price} ETH</span>
                      </div>
                      <button
                        type="button"
                        className="removeBtn"
                        onClick={() => item.id && removeFromCart(item.id)}
                      >
                        <span className="icon" />
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="cartFooter">
                  <span className="total">Total: {total} ETH</span>
                  <dl className="contractInfo">
                    <div>
                      <dt>Contract</dt>
                      <dd title={CONTRACT_INFO.address}>
                        {CONTRACT_INFO.address.slice(0, 6)}…
                        {CONTRACT_INFO.address.slice(-4)}
                      </dd>
                    </div>
                    <div>
                      <dt>Token standard</dt>
                      <dd>{CONTRACT_INFO.tokenStandard}</dd>
                    </div>
                    <div>
                      <dt>Chain</dt>
                      <dd>{CONTRACT_INFO.chain}</dd>
                    </div>
                    <div>
                      <dt>Royalty</dt>
                      <dd>{CONTRACT_INFO.royalty}</dd>
                    </div>
                    <div>
                      <dt>Metadata</dt>
                      <dd>{CONTRACT_INFO.metadata}</dd>
                    </div>
                  </dl>
                  <div className="actions">
                    <button type="button" className="checkoutBtn">
                      Checkout
                      <span className="icon" />
                    </button>
                    <button
                      type="button"
                      className="close"
                      onClick={() => setIsOpen(false)}
                    >
                      Close
                      <span className="icon" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </Modal>
      )}
    </>
  );
}

export default Cart;
