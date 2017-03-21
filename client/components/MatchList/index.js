import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {loadMatchList} from '../../actions/matches'

export class MatchList extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.dispatch(loadMatchList())
  }

  render() {
    return (
      <div>
        <h1>Matches</h1>
        {(() => {
          if (this.props.matches.length) {
            return <div>
              <ul>
                {this.props.matches.map(match =>
                  <li key={match._id}>
                    <span>{match.game.name}</span>
                    <span>{match.playerOne.name}</span>
                    <span>{match.playerTwo.name}</span>
                  </li>
                )}
              </ul>
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
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    matches: state.matches.list
  }
}

export default connect(mapStateToProps)(MatchList)
