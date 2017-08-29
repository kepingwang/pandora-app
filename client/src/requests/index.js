
export const getRoomInfo = () => fetch('/api/db/scan', {
  method: 'GET',
}).then(res => res.json());

