import React from 'react';

const Footer = () => {
  return (
    <footer
      className='flex justify-center items-center h-16 bg-mainRed text-mainBeige'
    >
      <p>&copy; {new Date().getFullYear()} Diane Kim. Website designed + developed by me. </p>
    </footer>
  );
};

export default Footer;