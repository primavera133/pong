import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { loadGame } from '../../actions/games'
import DwarfMatch from '../../../games/DwarfThrow/components/DwarfMatch'

export class Match extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isPlayersTurn: null
    }
  }

  componentWillMount () {
    this.setState({ isPlayersTurn: (this.props.match[this.props.match.turn].playerId === this.props.auth._id) })
    this.props.dispatch(loadGame(this.props.match.game.gameId))
  }

  render () {
    const { match, auth } = this.props

    return (
      <div>
        {(() => {
          console.log(111, this.state.isPlayersTurn)

          //console.log(this.props.game)
          if (this.props.game.codeName == 'dwarfThrow') {
            return <DwarfMatch match={match} auth={auth}/>
          }
        })()}

      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    game: state.games.game,
    auth: state.auth,
    match: state.matches.match
  }
}

export default connect(mapStateToProps)(Match)
