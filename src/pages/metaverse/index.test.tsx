import React from 'react';
import { render, screen } from '@testing-library/react';
import Market from './index';

test('renders page title', () => {
  render(<Market />);
  const title = screen.getByText(/Metaverse/i);
  expect(title).toBeInTheDocument();
});
