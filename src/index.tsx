import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import env from 'environment';
import Layout from 'components/Layout';
import Market from 'pages/market';
import Metaverse from 'pages/metaverse';
import reportWebVitals from './reportWebVitals';

import './index.css';

const { PRODUCTION, uri } = env();

const client = new ApolloClient({
  uri,
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Market />} />
            <Route path="metaverse" element={<Metaverse />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>
);

if (!PRODUCTION) {
  // eslint-disable-next-line no-console
  reportWebVitals(console.log);
}
