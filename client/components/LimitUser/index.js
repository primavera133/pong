import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

export class LimitUser extends Component {
	render () {
		if (this.props.auth.email && (
				this.props.scope === '*' ||
				(this.props.scope === this.props.auth.scope || this.props.scope.includes(this.props.auth.scope))
			)
		) {
			return this.props.children;
		} else {
			return null;
		}
	}
}

LimitUser.propTypes = {
	children: PropTypes.object.isRequired,
	scope: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.array
	]).isRequired
};

const mapStateToProps = (state) => ({ auth: state.auth });

export default connect(mapStateToProps)(LimitUser);
