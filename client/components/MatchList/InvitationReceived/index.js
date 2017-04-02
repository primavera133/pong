import React, {Component} from 'react'
import {connect} from 'react-redux'
import {translate} from 'react-i18next'
import {cancelMatch, acceptMatch} from '../../../actions/matches'
import MatchItem from '../MatchItem';
import Dialog from 'react-bootstrap-dialog'

export class InvitationsReceived extends Component {
  constructor(props) {
    super(props)

    this.state = {
      invitations: []
    }

    this.handleInvitation = this.handleInvitation.bind(this)
  }

  static matchFilterFactory = (id) => {
    return (match) => (match.playerTwo.playerId === id && !match.accepted)
  }

  componentWillMount() {
    if (this.props.matches) {
      this.state.invitations = this.props.matches.filter(InvitationsReceived.matchFilterFactory(this.props.auth._id))
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.matches) {
      this.state.invitations = nextProps.matches.filter(InvitationsReceived.matchFilterFactory(nextProps.auth._id))
    }
  }

  handleInvitation(match) {
    Dialog.setOptions({
      defaultOkLabel: 'Kör!',
      defaultCancelLabel: 'Nej, tack'
    })
    this.refs.dialog.show({
      body: `${match.playerOne.name} har bjudit in dig till en match "${match.game.name}"`,
      actions: [
        Dialog.CancelAction(() => {
          this.props.dispatch(cancelMatch(match))
        }),
        Dialog.OKAction(() => {
          this.props.dispatch(acceptMatch(match))
        })
      ]
    })
  }

  render() {

    if (this.state.invitations.length) {
      return (<div>
        <h3 className="h4">{t('header')}</h3>
        <ul>
          {this.state.invitations.map((match, idx) => <MatchItem match={match} key={idx}
                                                                 onMatchClick={this.handleInvitation}/>)}
        </ul>
        <Dialog ref='dialog'/>
      </div>)
    } else {
      return null
    }
  }
}

function mapStateToProps(state) {
  return {
    matches: state.matches.list,
    auth: state.auth
  }
}

export default connect(mapStateToProps)(translate('invitationsReceived')(InvitationsReceived))
