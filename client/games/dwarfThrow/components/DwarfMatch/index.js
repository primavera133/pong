import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import NotYourTurn from './NotYourTurn'
import {throwDwarf} from '../../actions/game'

export class DwarfMatch extends Component {
  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.props.dispatch(throwDwarf(this.props.match, this.props.auth))
  }

  render() {
    const {match} = this.props;
    return (
      <div>
        <h1>{match.game.name}</h1>
        <h2>{match.playerOne.name} vs {match.playerTwo.name}</h2>
        {(() => {
          if (!this.props.isPlayersTurn) {
            return <NotYourTurn/>
          } else {
            if (match)
              return <div>
                <p>Antal lyckade dvärgkrigarkast {match.gameState.dwarvesThrown}</p>
                <a className="btn btn-primary" onClick={this.handleClick}>Kasta dvärgkrigaren</a>
              </div>
          }
        })()}
      </div>)
  }
}

export default connect()(DwarfMatch)
