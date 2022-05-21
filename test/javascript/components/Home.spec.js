import * as React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Home from '../../../app/javascript/components/Home'

const places = [
  {
    id: 1,
    name: 'RM'
  },
  {
    id: 2,
    name: 'Iquique'
  }
]

it('Home test', () => {
  const { getByText } = render(<Home places={places} />);
  expect(getByText('Encuentra viajes en auto, a precio barato')).toBeInTheDocument();
});