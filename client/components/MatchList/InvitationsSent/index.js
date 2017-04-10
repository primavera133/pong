import React, {Component} from 'react'
import {connect} from 'react-redux'
import {translate} from 'react-i18next'
import MatchItem from '../MatchItem';

export class InvitationsSent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      invitations: []
    }
  }

  static matchFilterFactory = (id) => {
    return (match) => (match.playerOne.playerId === id && !match.accepted)
  }

  componentWillMount() {
    console.log(0, this.props)
    if (this.props.matches) {
      console.log(1, this.props.matches)
      this.state.invitations = this.props.matches.filter(InvitationsSent.matchFilterFactory(this.props.auth._id))
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.matches) {
      this.state.invitations = nextProps.matches.filter(InvitationsSent.matchFilterFactory(nextProps.auth._id))
    }
  }

  render() {
    if (this.state.invitations.length) {
      return (<div>
        <h3 className="h4">{t('header')}</h3>
        <ul>
          {this.state.invitations.map((match, idx) => <MatchItem match={match} key={idx} disabled={true}/>) }
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

export default connect(mapStateToProps)(translate('invitationsSent')(InvitationsSent))
