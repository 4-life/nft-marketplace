import {
  ComponentType,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import type { Styles } from 'react-modal';
import ItemComponent from 'components/Item';
import { useQuery, gql } from '@apollo/client';
import './index.scss';
import { Item, ItemsData, ItemsVars } from 'types';
import ItemDetails from 'components/ItemDetails';
import Loader from 'components/Loader';
import { useLoaderData } from 'react-router';
import env from 'environment';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ModalComp = ComponentType<any>;

const PAGE_SIZE = 12;
const INITIAL_VARS = { range: 365, limit: PAGE_SIZE, offset: 0 };

const GET_ITEMS_QUERY = `
  query GetItems($range: Int!, $limit: Int!, $offset: Int!) {
    items(range: $range, limit: $limit, offset: $offset) {
      id pic views title price likes comments publishDate
      author { name avatar }
    }
  }
`;

export async function loader() {
  try {
    const res = await fetch(env().uri, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: GET_ITEMS_QUERY,
        variables: INITIAL_VARS,
      }),
    });
    const json = await res.json();
    return { initialItems: (json.data?.items ?? []) as Item[] };
  } catch {
    return { initialItems: [] as Item[] };
  }
}

const GET_ITEMS = gql`
  query GetItems($range: Int!, $limit: Int!, $offset: Int!) {
    items(range: $range, limit: $limit, offset: $offset) {
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

function Market() {
  const { initialItems } = useLoaderData<typeof loader>();
  const { loading, error, fetchMore, refetch } = useQuery<ItemsData, ItemsVars>(
    GET_ITEMS,
    {
      variables: INITIAL_VARS,
      notifyOnNetworkStatusChange: true,
      skip: initialItems.length > 0,
    },
  );

  const [itemDetails, setItemDetails] = useState<Item | undefined>(undefined);
  const [allItems, setAllItems] = useState<Item[]>(initialItems);
  const [hasMore, setHasMore] = useState(initialItems.length === PAGE_SIZE);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [Modal, setModal] = useState<ModalComp | null>(null);
  const [Selector, setSelector] = useState<ModalComp | null>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    import('react-modal').then(({ default: ReactModal }) => {
      ReactModal.setAppElement('body');
      setModal(() => ReactModal as ModalComp);
    });
    import('components/Select').then(({ default: Select }) => {
      setSelector(() => Select as ModalComp);
    });
  }, []);

  const loadMore = useCallback(async () => {
    if (isFetchingMore || !hasMore) return;
    setIsFetchingMore(true);
    try {
      const { data: more } = await fetchMore({
        variables: { offset: allItems.length },
      });
      const next = more?.items ?? [];
      setAllItems((prev) => [...prev, ...next]);
      setHasMore(next.length === PAGE_SIZE);
    } finally {
      setIsFetchingMore(false);
    }
  }, [fetchMore, allItems.length, hasMore, isFetchingMore]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadMore();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(sentinel);
    // eslint-disable-next-line consistent-return
    return () => observer.disconnect();
  }, [loadMore]);

  const onChangeRange = useCallback(
    (newRange: number) => {
      setAllItems([]);
      setHasMore(true);
      refetch({ range: newRange, limit: PAGE_SIZE, offset: 0 });
    },
    [refetch],
  );

  const openModal = (details: Item) => setItemDetails(details);
  const closeModal = () => setItemDetails(undefined);

  return (
    <div className="Market">
      <div className="subheader">
        <h2>Market</h2>
        {Selector && <Selector onChange={(e: { value: number } | null) => onChangeRange(e?.value ?? 0)} />}
      </div>
      <main>
        {error && <p>Can&apos;t load items</p>}
        {!loading && !allItems.length && !error && <p>No items</p>}
        {allItems.map((d: Item) => (
          <ItemComponent key={d.id} item={d} show={openModal} />
        ))}
        {hasMore && !isFetchingMore && (
          <div ref={sentinelRef} style={{ width: '100%', height: 1 }} />
        )}
        <div className="itemsLoader">
          {(loading || isFetchingMore) && <Loader />}
        </div>
      </main>
      {Modal && (
        <Modal
          isOpen={!!itemDetails}
          onRequestClose={closeModal}
          style={customStyles}
        >
          {itemDetails && <ItemDetails item={itemDetails} close={closeModal} />}
        </Modal>
      )}
    </div>
  );
}

export default Market;
