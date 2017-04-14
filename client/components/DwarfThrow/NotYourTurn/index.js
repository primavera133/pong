import React, {Component} from 'react'
import {translate} from 'react-i18next'

export class NotYourTurn extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {t, match} = this.props;
    return (
      <div>
        <p>{t('dwarfThrow.throws')} {match.gameState.dwarvesThrown}</p>
        <p>{t('dwarfThrow.notYourTurn')}</p>
      </div>
    )
  }
}


export default (translate('games')(NotYourTurn))
