import * as React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MyTrips from '../../../app/javascript/components/MyTrips'

const today_trips = [
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
  },
  {
    from_address: 'address2.1',
    to_address: 'address2.2',
    available_seats: 5,
    leaving_at: '2023-09-02T18:24:00.000Z',
    price: '12345678',
    comments: 'comments2.1',
    car_license_plate: 'AA-5656',
    car_brand: 'Volvo',
    car_model: 'XC60',
    car_color: 'rojo',
    user_id: '16',
    from_id: '09',
    to_id: '35',
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
  }
]

const future_trips = [
  {
    from_address: 'address3.1',
    to_address: 'address3.2',
    available_seats: 5,
    leaving_at: '2023-09-02T18:24:00.000Z',
    price: '12345678',
    comments: 'comments3.1',
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
  },
  {
    from_address: 'address4.1',
    to_address: 'address4.2',
    available_seats: 5,
    leaving_at: '2023-09-02T18:24:00.000Z',
    price: '12345678',
    comments: 'comments4.1',
    car_license_plate: 'AA-5656',
    car_brand: 'Volvo',
    car_model: 'XC60',
    car_color: 'rojo',
    user_id: '16',
    from_id: '09',
    to_id: '35',
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
  }
]

const previous_trips = [
  {
    from_address: 'address5.1',
    to_address: 'address5.2',
    available_seats: 5,
    leaving_at: '2023-09-02T18:24:00.000Z',
    price: '12345678',
    comments: 'comments5.1',
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
  },
  {
    from_address: 'address6.1',
    to_address: 'address6.2',
    available_seats: 5,
    leaving_at: '2023-09-02T18:24:00.000Z',
    price: '12345678',
    comments: 'comments6.1',
    car_license_plate: 'AA-5656',
    car_brand: 'Volvo',
    car_model: 'XC60',
    car_color: 'rojo',
    user_id: '16',
    from_id: '09',
    to_id: '35',
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
  }
]

it('MyTrips show today_trips', () => {
  const { getByText } = render(<MyTrips today_trips={today_trips}
                                        future_trips={future_trips}
                                        previous_trips={previous_trips}/>);
  expect(getByText('comments1.1')).toBeInTheDocument();
});
