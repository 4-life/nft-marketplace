import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { createMemoryRouter, RouterProvider } from 'react-router';
import Market from './index';

test('renders page title', async () => {
  const router = createMemoryRouter(
    [
      {
        path: '/',
        element: (
          <MockedProvider mocks={[]} addTypename={false}>
            <Market />
          </MockedProvider>
        ),
        loader: () => ({ initialItems: [] }),
      },
    ],
    { initialEntries: ['/'] },
  );

  render(<RouterProvider router={router} />);
  const title = await screen.findByText(/Market/i);
  expect(title).toBeInTheDocument();
});
