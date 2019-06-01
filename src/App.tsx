import * as React from 'react';
import {withTranslation, WithTranslation} from 'react-i18next';
import {connect} from 'react-redux';
import {HashRouter as Router, Link, Route, Switch} from 'react-router-dom';
import './App.css';
import ErrorBoundary from './components/ErrorBoundary';
import PrivateRoute from './components/PrivateRoute';
import logo from './logo.svg';
import {IReduxState} from './reducers';
import Broken from './views/Broken';
import ErrorView from './views/Error';
import Home from './views/Home';
import Login from './views/Login';
import Secret from './views/Secret';

type Props = WithTranslation & IPropsState;

class App extends React.Component<Props> {
	constructor(props: Props) {
		super(props);
		this.handleChangeLanguage = this.handleChangeLanguage.bind(this);
	}

	public render() {
		const {isLoggedIn, t} = this.props;
		return (
			<Router>
				<div className="App">
					<header className="App-header">
						<img src={logo} className="App-logo" alt="logo" />
						<h1 className="App-title">Welcome to React</h1>
					</header>
					<button value="fi-FI" onClick={this.handleChangeLanguage}>
						{t('fin')}
					</button>
					<button value="en-EN" onClick={this.handleChangeLanguage}>
						{t('eng')}
					</button>
					<button value="sv-SV" onClick={this.handleChangeLanguage}>
						{t('sve')}
					</button>
					<br />
					{this.props.isLoading ? 'Fetching API data ..' : ''}
					<br />
					{this.props.error ? <h2 style={{color: 'red'}}>Error: {this.props.error}</h2> : null}
					<br />
					<div>
						<ErrorBoundary onError={ErrorView}>
							<div>
								<Link to="/">
									<button>{t('home')}</button>
								</Link>
								<Link to="/login">
									<button>{t('login')}</button>
								</Link>
								<Link to="/secret">
									<button disabled={isLoggedIn ? false : true}>{t('secret')}</button>
								</Link>
								<Link to="/broken">
									<button>{t('broken')}</button>
								</Link>
							</div>
							<br />
							<Switch>
								<Route exact={true} path="/" component={Home} />
								<Route exact={true} path="/login" component={Login} />
								<PrivateRoute isValid={isLoggedIn} failPath="/login" exact={true} path="/secret" component={Secret} />
								<Route exact={true} path="/broken" component={Broken} />
							</Switch>
						</ErrorBoundary>
					</div>
				</div>
			</Router>
		);
	}
	private handleChangeLanguage(event: React.SyntheticEvent<HTMLButtonElement>) {
		const target = event.target as HTMLButtonElement;
		this.props.i18n.changeLanguage(target.value);
	}
}

// redux state props
const mapStateToProps = (state: IReduxState) => {
	return {
		error: state.app.error,
		isLoading: state.app.isLoading,
		isLoggedIn: state.app.isLoggedIn,
	};
};
type IPropsState = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(withTranslation()(App));
