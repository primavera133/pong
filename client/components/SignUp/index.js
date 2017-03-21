import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import validation from 'react-validation-mixin'
import strategy from 'joi-validation-strategy'
import {signUp} from '../../actions/player'
import {translate} from 'react-i18next'
import {PageHeader, Panel, FormGroup, FormControl, ControlLabel, Button} from 'react-bootstrap'
import FormComponent from '../FormComponent'
import {playerValidationSchema} from '../../../validators/player'

export class SignUp extends FormComponent {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      email: '',
      password: '',
      passwordMatch: '',
      phone: ''
    }

    this.validatorTypes = playerValidationSchema;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event, field) {
    this.setState({[field]: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();

    this.props.validate((error) => {
      if(error){
        console.error(error)
      }
      if (!error) {
        this.props.dispatch(signUp(this.state, '/list'))
      }
    });
  }

  render() {
    const {t} = this.props;

    return (
      <div className="container">

        <PageHeader>Pong <small>back and forth</small></PageHeader>

        <Panel header={t('signUpHeader')}>
          <form id="signUpForm" onSubmit={this.handleSubmit.bind(this)}>

            <FormGroup validationState={this.getValidationState('name')}>
              <ControlLabel htmlFor="form-name">{t('name')}</ControlLabel>
              <FormControl
                id="form-name"
                value={this.state.name}
                type="text"
                onChange={(e) => this.handleChange(e, 'name')}
                onFocus={this.handleFocus('name')}
                onBlur={this.handleBlur('name')}/>
              <FormControl.Feedback />
            </FormGroup>

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

            <FormGroup validationState={this.getValidationState('passwordMatch')}>
              <ControlLabel htmlFor="form-name">{t('passwordMatch')}</ControlLabel>
              <FormControl
                id="form-passwordMatch"
                value={this.state.passwordMatch}
                type="password"
                onChange={(e) => this.handleChange(e, 'passwordMatch')}
                onFocus={this.handleFocus('passwordMatch')}
                onBlur={this.handleBlur('passwordMatch')}/>
              <FormControl.Feedback />
            </FormGroup>

            <FormGroup validationState={this.getValidationState('phone')}>
              <ControlLabel htmlFor="form-phone">{t('phone')}</ControlLabel>
              <FormControl
                id="form-phone"
                value={this.state.phone}
                type="text"
                onChange={(e) => this.handleChange(e, 'phone')}
                onFocus={this.handleFocus('phone')}
                onBlur={this.handleBlur('phone')}/>
              <FormControl.Feedback />
            </FormGroup>

            <Button
              type="submit"
              form="signUpForm"
              bsStyle="primary"
              onClick={this.handleSubmit}>
              {t('signUpSubmit')}
            </Button>

          </form>
        </Panel>

        <a href="/login">{t('loginLink')}</a>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    scope: state.auth.scope
  };
};

export default connect(mapStateToProps)(translate('signUpView')(validation(strategy)(SignUp)))
