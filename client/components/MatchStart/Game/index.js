import React from 'react'
import FormComponent from '../../FormComponent'
import {connect} from 'react-redux'
import {translate} from 'react-i18next'
import {startMatch} from '../../../actions/matches'

export class Game extends FormComponent {
  constructor(props) {
    super(props)

    this.chooseGame = this.chooseGame.bind(this);
  }

  chooseGame() {
    this.props.dispatch(startMatch(this.props.opponent, this.props.game))
  }

  render() {
    const {t} = this.props;
    const name = this.props.game ? this.props.game.name : '';

    return (
      <li>
        <a onClick={this.chooseGame}>{name}</a>
      </li>
    )
  }
}

function mapStateToProps(state) {
  return {}
}

export default connect(mapStateToProps)(translate('matchStartView')(Game))
