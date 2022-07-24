import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { store } from 'redux/store';

import * as serviceWorker from './serviceWorker';

import App from './App';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
	<Provider store={store}>
    	<App />
	</Provider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
