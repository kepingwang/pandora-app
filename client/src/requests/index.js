
export const getRoomInfo = () => fetch('/api/db/scan', {
  method: 'GET',
}).then(res => res.json());

export const signup = (email, username, password) =>
  fetch('/api/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, username, password }),
  });

export const login = (email, password) =>
  fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
