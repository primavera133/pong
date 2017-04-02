import React, {Component} from 'react'
import {translate} from 'react-i18next'
import {connect} from 'react-redux'
import MatchItem from '../MatchItem';

export class OpponentsTurn extends Component {
  constructor(props) {
    super(props)

    this.state = {
      opponentsTurn: []
    }
  }

  static matchFilterFactory = (id) => {
    return (match) => (match.playerOne.playerId === id && match.turn === 'playerTwo') || (match.playerTwo.playerId === id && match.turn === 'playerOne')
  }

  componentWillMount() {
    if (this.props.matches) {
      this.state.opponentsTurn = this.props.matches.filter(OpponentsTurn.matchFilterFactory(this.props.auth._id))
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.matches) {
      this.state.opponentsTurn = nextProps.matches.filter(OpponentsTurn.matchFilterFactory(nextProps.auth._id))
    }
  }

  render() {
    const {t} = this.props

    if (this.state.opponentsTurn.length) {
      return (<div>
        <h3 className="h4">{t('header')}</h3>
        <ul>
          {this.state.opponentsTurn.map((match, idx) => <MatchItem match={match} key={idx} disabled={true}/>)}
        </ul>
      </div>)
    } else {
      return null;
    }
  }
}

function mapStateToProps(state) {
  return {
    matches: state.matches.list,
    auth: state.auth
  }
}

export default connect(mapStateToProps)(translate('opponentsTurn')(OpponentsTurn))
