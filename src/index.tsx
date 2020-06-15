import 'cross-fetch/polyfill'; // tslint:disable-next-line
import 'react-app-polyfill/ie9'; // tslint:disable-next-line
import React, {Suspense} from 'react';
import * as ReactDOM from 'react-dom';
import {I18nextProvider} from 'react-i18next';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import App from './App';
import configureStore from './configureStore';
import i18n from './i18n';
import './index.css';

const {store, persistor} = configureStore();

ReactDOM.render(
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			<Suspense fallback={<div>Loading</div>}>
				<I18nextProvider i18n={i18n}>
					<App />
				</I18nextProvider>
			</Suspense>
		</PersistGate>
	</Provider>,
	document.getElementById('root') as HTMLElement,
);
