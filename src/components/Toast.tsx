'use client';

import { Toaster } from 'react-hot-toast';

const Toast = () => {
  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      toastOptions={{
        style: {
          background: '#333',
          color: '#fff',
        },
      }}
    />
  );
};

export default Toast;
