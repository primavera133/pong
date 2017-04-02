import React, {Component} from 'react'
import {connect} from 'react-redux'
import {translate} from 'react-i18next'
import {browserHistory} from 'react-router'
import MatchItem from '../MatchItem';

export class YourTurn extends Component {
  constructor(props) {
    super(props)

    this.state = {
      matches: []
    }
  }

  static matchFilterFactory = (id) => {
    return (match) => (match.playerOne.playerId === id && match.turn === 'playerOne') || (match.playerTwo.playerId === id && match.turn === 'playerTwo')
  }

  componentWillMount() {
    if (this.props.matches) {
      this.state.matches = this.props.matches.filter(YourTurn.matchFilterFactory(this.props.auth._id))
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.matches) {
      this.state.matches = nextProps.matches.filter(YourTurn.matchFilterFactory(nextProps.auth._id))
    }
  }

  static handlePlayersTurn(match) {
    browserHistory.push(`/match/${match._id}`);
  }

  render() {
    const {t} = this.props

    if (this.state.matches.length) {
      return (<div>
        <h3 className="h4">{t('header')}</h3>
        <ul>
          {this.state.matches.map((match, idx) => <MatchItem match={match} key={idx} onMatchClick={YourTurn.handlePlayersTurn}/>)}
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

export default connect(mapStateToProps)(translate('yourTurn')(YourTurn))
