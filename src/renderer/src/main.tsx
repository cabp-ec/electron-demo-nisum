import React from 'react';
import ReactDOM from 'react-dom/client';
import Booster from './app/index';
import App from './App';

document.addEventListener(Booster.startRenderEventName, () => {
  console.log('START REACT RENDER');

  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});

// Do pre-rendering magic here
setTimeout(() => Booster.init(), 2000);
