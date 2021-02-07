import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import App from './components/App';
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

Sentry.init({
    dsn: "https://51981a9f845b4f7fa7b1d8f67b75b834@o36588.ingest.sentry.io/5626429",
    integrations: [new Integrations.BrowserTracing()],
  
    // We recommend adjusting this value in production, or using tracesSampler
    // for finer control
    tracesSampleRate: 1.0,
  });

ReactDOM.render(<App />, document.getElementById('root'));
