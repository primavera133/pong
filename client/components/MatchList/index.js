import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {loadMatchList, cancelMatch, acceptMatch} from '../../actions/matches'
import MatchItem from './MatchItem';
import Dialog from 'react-bootstrap-dialog'

export class MatchList extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.dispatch(loadMatchList())

    this.handleInvitation = this.handleInvitation.bind(this)
    this.handlePlayersTurn = this.handlePlayersTurn.bind(this)
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

    //this.props.dispatch((match)
  }

  handlePlayersTurn() {
  }

  render() {
    const {auth} = this.props
    const matches = this.props.matches || [];

    const invitationSent = matches.filter(match => (match.playerOne.playerId === auth._id && !match.accepted))
    const invitationReceived = matches.filter(match => (match.playerTwo.playerId === auth._id && !match.accepted))
    const playersTurn = matches.filter(match => (match.playerOne.playerId === auth._id && match.turn === 'playerOne') || (match.playerTwo.playerId === auth._id && match.turn === 'playerTwo'))
    const opponentsTurn = matches.filter(match => (match.playerOne.playerId === auth._id && match.turn === 'playerTwo') || (match.playerTwo.playerId === auth._id && match.turn === 'playerOne'))

    return (
      <div>
        <h1>Matches</h1>
        {(() => {
          if (matches.length) {
            return <div>
              {(() => {
                if (invitationReceived.length) {
                  return (<div>
                    <h3>Du är inbjuden</h3>
                    <ul>
                      {invitationReceived.map((match, idx) =>
                        <MatchItem
                          match={match}
                          key={idx}
                          onMatchClick={this.handleInvitation}
                        />
                      )}
                    </ul>
                  </div>)
                }
              })()}
              {(() => {
                if (playersTurn.length) {
                  return (<div>
                    <h3>Din tur</h3>
                    <ul>
                      {playersTurn.map((match, idx) =>
                        <MatchItem
                          match={match}
                          key={idx}
                          onMatchClick={this.handlePlayersTurn}
                        />
                      )}
                    </ul>
                  </div>)
                }
              })()}
              {(() => {
                if (invitationSent.length) {
                  return (<div>
                    <h3>Inbjudan skickad</h3>
                    < ul >
                      {invitationSent.map((match, idx) =>
                        <MatchItem
                          match={match}
                          key={idx}
                          disabled={true}
                        />
                      )
                      }
                    </ul>
                  </div>)
                }
              })()}
              {(() => {
                if (opponentsTurn.length) {
                  return (<div>
                    <h3>Motståndarens tur</h3>
                    <ul>
                      {opponentsTurn.map((match, idx) =>
                        <MatchItem
                          match={match}
                          key={idx}
                          disabled={true}
                        />
                      )}
                    </ul>
                  </div>)
                }
              })()}
              <nav>
                <Link to="/startmatch">Start a new match</Link>
              </nav>
            </div>
          } else {
            return <div>
              <nav>
                Inga matcher hittades men <Link to="/startmatch">starta en match!</Link>
              </nav>
            </div>
          }
        })()}

        <Dialog ref='dialog'/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    matches: state.matches.list,
    auth: state.auth
  }
}

export default connect(mapStateToProps)(MatchList)
