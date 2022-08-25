import React, { useCallback, useState } from 'react';
import Item from 'components/Item';
import data from 'dummy';
import './App.scss';
import Selector from 'components/Select';
import { Buy } from 'types';

function App() {
  const [items, setItems] = useState<Buy[]>(data);
  const onChangeRange = useCallback((range: number) => {
    const diff = new Date().getTime() - range * 24 * 60 * 60 * 1000;
    setItems(data.filter((val) => val.publishDate.getTime() >= diff));
  }, []);

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

            <div className="selector-wrap">
              <Selector onChange={(e) => onChangeRange(e?.value || 0)} />
            </div>
          </div>
        </header>
        <main>
          {items.map((d) => (
            <Item key={d.id} item={d} />
          ))}
          {items.map((d) => (
            <Item key={`hidden${d.id}`} item={undefined} />
          ))}
        </main>
      </div>
    </div>
  );
}

export default App;
