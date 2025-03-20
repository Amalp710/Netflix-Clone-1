import React from 'react'

const Sfooter = () => {
  const today = new Date();
  const year = today.getFullYear();
  return (
    <footer>
      <p>
        <small>Copywrite © 1997- {year} Netflix, Inc.</small>
      </p>
    </footer>
  );
};

export default Sfooter;