import * as React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import RequestNew from '../../../app/javascript/components/RequestNew'

const trip = [
  {
    from_address: 'address1.1',
    to_address: 'address1.2',
    available_seats: 5,
    leaving_at: '2023-09-02T18:24:00.000Z',
    price: '12345678',
    comments: 'comments1.1',
    car_license_plate: 'AA-5656',
    car_brand: 'Volvo',
    car_model: 'XC60',
    car_color: 'rojo',
    user_id: '22',
    from_id: '05',
    to_id: '22',
    from: {
      lat: '10',
      long: '10',
    },
    to: {
      lat: '10',
      long: '10',
    },
    user: {
      name: "Fake",
      last_name: "Name"
    }
  }]

let metaElement;
beforeAll(() => {
  metaElement = document.createElement("meta");
  metaElement.name = "csrf-token";
  metaElement.content = "test_token";
  document.head.append(metaElement);
})

afterAll(() => {
  metaElement.remove();
})

it('New Request is render', () => {
  const { getByText } = render(<RequestNew trip={trip} />);
  expect(getByText('Agrega un comentario que le pueda interesar al conductor (Opcional)')).toBeInTheDocument();
});
it('New Request has comment input', () => {
  const {getByRole} = render(<RequestNew trip={trip} />);
  expect(getByRole('textbox')).toBeInTheDocument();
});

it('New Request has submit button', () => {
  const {getByRole} = render(<RequestNew trip={trip} />);
  expect(getByRole('button', {name: "Enviar solicitud"})).toBeInTheDocument();
});