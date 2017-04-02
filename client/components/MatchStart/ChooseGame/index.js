import React from 'react'
import {connect} from 'react-redux'
import {translate} from 'react-i18next'
import FormComponent from '../../FormComponent'
import {loadGames} from '../../../actions/games'
import Game from '../Game'

export class MatchList extends FormComponent {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.dispatch(loadGames())
  }

  render() {
    const {t, opponent, games} = this.props;

    return (
      <div>
        <h3>{t('opponent')}: {opponent.name}</h3>
        <ul>
          {(() => {
            return games.map((game, idx) => {
              return <Game key={idx} game={game} opponent={opponent}/>
            })
          })()}
        </ul>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    games: state.games.list
  }
}

export default connect(mapStateToProps)(translate('matchStartView')(MatchList))
