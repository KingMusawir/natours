import axios from 'axios';
import showAlert from './alert';

/* eslint-disable */
const stripe = Stripe(
  'pk_test_51Q4ShQGax5xEPqHUtxY8I8BlWxU2uUYJS70JZfWoAjxZ7QQNt59KHvwtIrncqztIqrgoYXfG4xD2OfIcvczsqASd003v0KEZVW',
);

export const bookTour = async (tourId) => {
  try {
    // 1) Get checkout session from API
    const session = await axios(
      `http://127.0.0.1:3001/api/v1/bookings/checkout-session/${tourId}`,
    );

    console.log('Checkout session:', session.data);

    // 2) Redirect to Stripe checkout
    const result = await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });

    if (result.error) {
      console.error('Stripe redirect error:', result.error);
      showAlert('error', result.error.message);
    }
  } catch (error) {
    console.error('Booking error:', error);
    if (error.response) {
      console.error('Error response:', error.response.data);
    }
    showAlert('error', error.message || 'An error occurred. Please try again.');
  }
};
