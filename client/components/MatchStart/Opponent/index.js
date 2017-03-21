import React, {Component, PropTypes} from 'react'
import FormComponent from '../../FormComponent'
import {connect} from 'react-redux'
import {translate} from 'react-i18next'
import {chooseOpponent} from '../../../actions/matches'

export class ChooseOpponent extends FormComponent {
  constructor(props) {
    super(props)

    this.chooseOpponent = this.chooseOpponent.bind(this);
  }

  chooseOpponent() {
    this.props.dispatch(chooseOpponent(this.props.opponent))
  }

  render() {
    const {t} = this.props;
    const name = this.props.opponent ? this.props.opponent.name : '';

    return (
      <li>
        <a onClick={this.chooseOpponent}>{name}</a>
      </li>
    )
  }
}

function mapStateToProps(state) {
  return {}
}

export default connect(mapStateToProps)(translate('matchStartView')(ChooseOpponent))
