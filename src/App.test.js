import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import App from './App';

describe('App component', () => {
  it('renders header and router components', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    // Check if Header component is rendered
    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
