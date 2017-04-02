import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {loadMatchList} from '../../actions/matches'
import {translate} from 'react-i18next'
import InvitationReceived from './InvitationReceived'
import YourTurn from './YourTurn'
import OpponentsTurn from './OpponentsTurn'
import {InvitationsSent} from "./InvitationsSent/index";

export class MatchList extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.dispatch(loadMatchList())
  }

  render() {
    const {t} = this.props
    const matches = this.props.matches || [];

    return (
      <div>
        <h1 className="h3">{t('header')}</h1>
        {(() => {
          if (matches.length) {
            return <div>
              <InvitationReceived />
              <YourTurn />
              <OpponentsTurn />
              <InvitationsSent />
              <nav>
                <Link to="/startmatch">{t('startANewMatch')}</Link>
              </nav>
            </div>
          } else {
            return (<div>
              <nav>
                {t('noMatchesFound')}
                <Link to="/startmatch">{t('startAMatch')}</Link>
              </nav>
            </div>)
          }
        })()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    matches: state.matches.list,
    action: state.socketio.action
  }
}

export default connect(mapStateToProps)(translate('matchListView')(MatchList))
