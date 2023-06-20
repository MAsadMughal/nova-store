import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { SpeechProvider } from '@speechly/react-client';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SpeechProvider
      appId="e57875da-96da-4e75-bcc3-f4a2696a35f9"
      debug
      logSegments
    >
      <App />
    </SpeechProvider>
  </React.StrictMode>
);

