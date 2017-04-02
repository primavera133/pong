import React from 'react'
import FormComponent from '../FormComponent'
import {connect} from 'react-redux'
import {translate} from 'react-i18next'
import ChooseOpponent from './ChooseOpponent'
import SearchForOpponent from './SearchForOpponent'
import ChooseGame from './ChooseGame'

export class MatchList extends FormComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const {t, opponent} = this.props;

    return (
      <div>
        <h1 className="h3">{t('header1')}</h1>
        {(() => {
          if (!opponent) {
            return <div>
              <ChooseOpponent />
              <SearchForOpponent />
            </div>
          } else {
            return <ChooseGame opponent={opponent} />
          }
        })()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    opponent: state.matches.opponent
  }
}

export default connect(mapStateToProps)(translate('matchStartView')(MatchList))
