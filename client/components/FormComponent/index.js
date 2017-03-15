import React, { Component } from 'react';
import { HelpBlock } from 'react-bootstrap';

class FormComponent extends Component {
	constructor (props) {
		super(props);

		this.hasBeenValidated = {};

		this.getValidatorData = this.getValidatorData.bind(this);
		this.getValidationState = this.getValidationState.bind(this);
		this.renderHelpText = this.renderHelpText.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleFocus = this.handleFocus.bind(this);
		this.handleBlur = this.handleBlur.bind(this);
		this.isValid = this.isValid.bind(this);
	}

	getValidationState (name) {
		if (!this.props.isValid(name)) return 'error';
		if (name in this.hasBeenValidated) return 'success';
	}

	getValidatorData () {
		return this.state;
	}

	renderHelpText (name) {
		return (
			<HelpBlock>{this.props.getValidationMessages(name)}</HelpBlock>
		);
	}

	isValid () {
		return this.props.getValidationMessages().length === 0;
	}

	handleChange (name) {
		return (e) => {
			this.setState({ [name]: e.target.value });
		};
	}

	handleFocus (name) {
		return (e) => {
			if (name in this.hasBeenValidated) {
				delete this.hasBeenValidated[name];
			}
		};
	}

	handleBlur (name) {
		return (e) => {
			this.setState(
				{
					[name]: e.target.value
				},
				() => {
					this.props.handleValidation(name)();
					this.hasBeenValidated[name] = true;
				}
			);
		};
	}
}

export default FormComponent;
