/* eslint-disable */

import axios from 'axios';
import showAlert from './alert';

// Type is either password or 'data'
export async function updateSettings(data, type) {
  try {
    const url = `http://127.0.0.1:3001/api/v1/users/${type === 'password' ? 'updateMyPassword' : 'updateMe'}`;

    const res = await axios({
      method: 'PATCH',
      url,
      data,
    });
    if (res.data.status === 'success') {
      showAlert('success', `${type.toUpperCase()}  updated sucessfully!`);
      location.reload(true);
    }
  } catch (error) {
    showAlert('error', error.response.data.message);
  }
}
