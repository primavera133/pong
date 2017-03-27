import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import DwarfMatch from '../../games/DwarfThrow/components/DwarfMatch'

export class Match extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isPlayersTurn: null
    }
  }

  componentWillMount() {
    this.setState({isPlayersTurn: (this.props.match[this.props.match.turn].playerId === this.props.auth._id)})
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match) {
      this.setState({isPlayersTurn: (nextProps.match[nextProps.match.turn].playerId === this.props.auth._id)})
    }
  }

  render() {
    const {match, auth} = this.props

    return (
      <div id="matchWrapper">
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
    match: state.matches.match
  }
}

export default connect(mapStateToProps)(Match)
