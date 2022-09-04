import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import env from 'environment';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const { PRODUCTION } = env();

const client = new ApolloClient({
  uri: 'https://zfk6ldinl5.execute-api.eu-central-1.amazonaws.com/dev/',
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);

if (!PRODUCTION) {
  // eslint-disable-next-line no-console
  reportWebVitals(console.log);
}
