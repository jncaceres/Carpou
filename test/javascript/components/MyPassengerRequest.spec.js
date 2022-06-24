import * as React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MyPassengerRequests from '../../../app/javascript/components/MyPassengerRequests';

const users_passenger_requests = [
  {
    id: 1,
    status: 'pending',
    formatted_created_at: '2022/05/30 10:37',
    trip: {
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
        user_id: 8,
        from_id: '05',
        to_id: '22',
    },
    user: {
      name: "Fake",
      last_name: "Name"
    }
  },
  {
    id: 2,
    status: 'accepted',
    formatted_created_at: '2022/06/30 10:37',
    trip: {
        from_address: 'address2.1',
        to_address: 'address2.2',
        available_seats: 5,
        leaving_at: '2023-09-02T18:24:00.000Z',
        price: '12345678',
        comments: 'comments1.1',
        car_license_plate: 'AA-5656',
        car_brand: 'Volvo',
        car_model: 'XC60',
        car_color: 'rojo',
        user_id: 3,
        from_id: '05',
        to_id: '22',
    },
    user: {
      name: "Fake",
      last_name: "Name"
    }
  }
];

const usersFromTrips = [
 {
  id: 3,
  name: 'user1',
  last_name: 'userLastName',
  rut: '11111111-1',
  phone: '12345678',
  gender: 'male',
  email: 'test@test.cl'
 },
 {
  id: 8,
  name: 'user2',
  last_name: 'userLastName',
  rut: '11111111-1',
  phone: '12345678',
  gender: 'female',
  email: 'test@test.cl'
 }
]

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

it('PassengerRequest has from and to address', () => {
  const { getByText } = render(<MyPassengerRequests users_passenger_requests={users_passenger_requests} users_from_trips={usersFromTrips}/>);
  expect(getByText('Sale desde address1.1 a address1.2')).toBeInTheDocument();
});

it('PassengerRequest has from and to address', () => {
  const { getByText } = render(<MyPassengerRequests users_passenger_requests={users_passenger_requests} users_from_trips={usersFromTrips}/>);
  expect(getByText('Información de Usuario')).toBeInTheDocument();
  expect(getByText('Nombre: user1 userLastName')).toBeInTheDocument();
});

