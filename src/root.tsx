import React from 'react';
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { CartProvider } from 'context/CartContext';
import env from 'environment';
import './index.css';

const client = new ApolloClient({
  uri: env().uri,
  cache: new InMemoryCache(),
});

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Lambda.Digital | NFT Marketplace" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#9f00a7" />
        <meta name="msapplication-TileColor" content="#9f00a7" />
        <meta name="theme-color" content="#e6e6e6" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins&display=swap&wght@400..800"
          rel="stylesheet"
        />
        <title>Lambda.Digital | NFT Marketplace</title>
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function Root() {
  return (
    <ApolloProvider client={client}>
      <CartProvider>
        <Outlet />
      </CartProvider>
    </ApolloProvider>
  );
}
