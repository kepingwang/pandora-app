import React from 'react';

export default function Header() {
  fetch('/api/hello')
    .then(res => res.body)
    .then(res => console.log(res));

  return (
    <p>hello</p>
  );
}
