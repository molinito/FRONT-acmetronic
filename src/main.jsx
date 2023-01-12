import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { Provider } from 'react-redux';
import { store } from './redux/store/index';
import { BrowserRouter } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import axios from 'axios';

//axios.defaults.baseURL = 'http://localhost:3001';
axios.defaults.baseURL = 'https://back-acmetronics-production.up.railway.app/';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<Provider store={store}>
		<BrowserRouter>
			<Auth0Provider
				domain='dev-v4zip3s68wx2qvly.us.auth0.com'
				clientId='Y0Yi1Al44qS2Aq6mm7zEvIxC8nCrvpXZ'
				redirectUri={window.location.origin}
				cacheLocation={'localstorage'}
			>
				<App />
			</Auth0Provider>
		</BrowserRouter>
	</Provider>
);
