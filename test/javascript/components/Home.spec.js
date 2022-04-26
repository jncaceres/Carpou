import * as React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Home from '../../../app/javascript/components/Home'

it('Home test', () => {
  const { getByText } = render(<Home />);
  expect(getByText('Encuentra viajes en auto, a precio barato')).toBeInTheDocument();
});