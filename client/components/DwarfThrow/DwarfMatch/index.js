import React, {Component} from 'react'
import {connect} from 'react-redux'
import NotYourTurn from '../NotYourTurn'
import {translate} from 'react-i18next'
import {throwDwarf} from '../../../actions/dwarfthrow'

export class DwarfMatch extends Component {
  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.props.dispatch(throwDwarf(this.props.match, this.props.auth))
  }

  render() {
    const {t, match} = this.props;
    return (
      <div>
        <h1 className="h3">{match.game.name}</h1>
        <h2 className="h4">{match.playerOne.name} vs {match.playerTwo.name}</h2>
        {(() => {
          if (!this.props.isPlayersTurn) {
            return <NotYourTurn match={match} />
          } else {
            if (match)
              return <div>
                <p>{t('dwarfThrow.throws')} {match.gameState.dwarvesThrown}</p>
                <a className="btn btn-primary" onClick={this.handleClick}>{t('dwarfThrow.throw')}</a>
              </div>
          }
        })()}
      </div>)
  }
}

export default connect()(translate('games')(DwarfMatch))
