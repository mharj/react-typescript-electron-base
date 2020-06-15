import {getStore} from '../configureStore';
import {HttpClient} from './httpClient';
import {appLoading} from '../actions/appActions';

// this hooks global loading state updates from HttpClient
const store = getStore();
const client = HttpClient.getInstance();
client.onLoading((isLoading) => {
	store.dispatch(appLoading(isLoading));
});
export const httpFetch = client.fetch;
