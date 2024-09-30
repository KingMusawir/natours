/* eslint-disable */
import axios from 'axios';
import showAlert from './alert';

export async function login(email, password) {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:3001/api/v1/users/login',
      data: {
        email,
        password,
      },
    });
    console.log(res.data.status);
    if (res.data.status === 'success') {
      showAlert('success', 'Logged in sucessfully');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
    console.log(res);
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
}

export const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: 'http://127.0.0.1:3001/api/v1/users/logout',
    });
    if (res.data.status === 'success') location.reload(true);
  } catch (error) {
    showAlert('error', 'Error Logging out! Try again.');
  }
};
