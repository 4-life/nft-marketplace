import React from 'react';
import Item from 'components/Item';
import data from 'dummy';
import './App.scss';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="Logo">
          <figure />
          <h1>System32</h1>
        </div>

        <h2>Market</h2>
      </header>
      <main>
        {data.map((d) => (
          <Item key={d.id} item={d} />
        ))}
        <Item item={undefined} />
      </main>
    </div>
  );
}

export default App;
