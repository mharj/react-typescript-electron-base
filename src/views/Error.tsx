import * as React from 'react';
import {Helmet} from 'react-helmet';
import {withTranslation, WithTranslation} from 'react-i18next';
import {connect} from 'react-redux';
import {RouteComponentProps, withRouter} from 'react-router';
import {bindActionCreators} from 'redux';
import {doReset} from '../actions/globalActions';
import {IErrorProps} from '../components/ErrorBoundary';
import {IReduxState, RootThunkDispatch} from '../reducers';

type Props = IPropsState & WithTranslation & ActionList & RouteComponentProps;

class ErrorView extends React.Component<Props> {
	constructor(props: Props) {
		super(props);
		this.handleReset = this.handleReset.bind(this);
	}
	public render() {
		const {t} = this.props;
		return (
			<div>
				<Helmet>
					<title>Error</title>
				</Helmet>
				<div className="App-intro">
					<h1 style={{color: 'red'}}>{t('fatal_error')}</h1>
					<h2>{this.props.error ? this.props.error.message : null}</h2>
					<button onClick={this.handleReset}>Reset</button>
				</div>
			</div>
		);
	}
	private handleReset() {
		this.props.doReset();
		this.props.history.push('/');
	}
}

const mapStateToProps = (state: IReduxState, ownprops: IErrorProps) => {
	return {
		error: ownprops.error,
	};
};
type IPropsState = ReturnType<typeof mapStateToProps>;

const mapDispatchToProps = (dispatch: RootThunkDispatch) =>
	bindActionCreators(
		{
			doReset,
		},
		dispatch,
	);
type ActionList = ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withTranslation()(ErrorView)));
