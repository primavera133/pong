import React, {Component} from 'react'
import {connect} from 'react-redux'
import {loadMatch} from '../../actions/matches'
import DwarfMatch from '../../games/dwarfThrow/components/DwarfMatch'

export class Match extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isPlayersTurn: null
    }
  }

  componentWillMount() {
    this.props.dispatch({type: 'server/room/join', data: {room: this.props.match._id, player: this.props.auth._id}});
    this.setState({isPlayersTurn: (this.props.match[this.props.match.turn].playerId === this.props.auth._id)})
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match) {
      this.setState({isPlayersTurn: (nextProps.match[nextProps.match.turn].playerId === this.props.auth._id)})
    }

    if (nextProps.action) {
      if (nextProps.action._id !== this.props.action._id) {
        switch (nextProps.action.command) {
          case 'update':
            nextProps.dispatch(loadMatch(nextProps.match._id))
            break
        }
      }
    }
  }

  render() {
    const {match, auth} = this.props

    return (
      <div>
        {(() => {
          if (match.game.codeName == 'dwarfThrow') {
            return <DwarfMatch
              match={match}
              auth={auth}
              isPlayersTurn={this.state.isPlayersTurn}
            />
          }
        })()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    match: state.matches.match,
    action: state.socketio.action
  }
}

export default connect(mapStateToProps)(Match)
