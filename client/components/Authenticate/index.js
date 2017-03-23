import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import validation from 'react-validation-mixin';
import strategy from 'joi-validation-strategy';
import {signIn} from '../../actions/auth.js'
import {translate} from 'react-i18next';
import {PageHeader, Panel, FormGroup, FormControl, ControlLabel, Button} from 'react-bootstrap';
import FormComponent from '../FormComponent';
import {loginValidationSchema} from '../../../validators/login';

export class Authenticate extends FormComponent {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: ''
    }

    this.validatorTypes = loginValidationSchema;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event, field) {
    this.setState({[field]: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();

    this.props.validate((error) => {
      if (!error) {
        this.props.dispatch(signIn(this.state, '/matches'))
      }
    });
  }

  render() {
    const {t} = this.props;

    return (
      <div className="container">
        <PageHeader>Pong <small>back and forth</small></PageHeader>
        <Panel header={t('loginHeader')}>
          <form id="loginForm" onSubmit={this.handleSubmit.bind(this)}>
            <FormGroup validationState={this.getValidationState('email')}>
              <ControlLabel htmlFor="form-name">{t('email')}</ControlLabel>
              <FormControl
                id="form-email"
                value={this.state.email}
                type="text"
                onChange={(e) => this.handleChange(e, 'email')}
                onFocus={this.handleFocus('email')}
                onBlur={this.handleBlur('email')}/>
              <FormControl.Feedback />
            </FormGroup>

            <FormGroup validationState={this.getValidationState('password')}>
              <ControlLabel htmlFor="form-name">{t('password')}</ControlLabel>
              <FormControl
                id="form-password"
                value={this.state.password}
                type="password"
                onChange={(e) => this.handleChange(e, 'password')}
                onFocus={this.handleFocus('password')}
                onBlur={this.handleBlur('password')}/>
              <FormControl.Feedback />
            </FormGroup>

            <Button
              type="submit"
              form="loginForm"
              bsStyle="primary"
              onClick={this.handleSubmit}>
              {t('loggIn')}
            </Button>

          </form>
        </Panel>

        <a href="/signup">Sign up</a>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    scope: state.auth.scope
  };
};

export default connect(mapStateToProps)(translate('authenticateView')(validation(strategy)(Authenticate)))
