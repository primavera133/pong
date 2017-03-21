import React, {Component, PropTypes} from 'react'
import FormComponent from '../../FormComponent'
import {connect} from 'react-redux'
import validation from 'react-validation-mixin'
import {translate} from 'react-i18next'
import strategy from 'joi-validation-strategy'
import {loadFriends} from '../../../actions/friends'
import Opponent from '../Opponent'

export class ChooseOpponent extends FormComponent {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.dispatch(loadFriends())
  }

  render() {
    const {t} = this.props;

    if (this.props.friends.length) {
      return (
        <div>
          <h2>{t('headerFriendslist')}</h2>
          <ul>
            {this.props.friends.map(friend =>
              <Opponent key={friend._id} opponent={friend} />
            )}
          </ul>
        </div>
      )
    } else {
      return null
    }
  }
}

function mapStateToProps(state) {
  return {
    friends: state.friends.list,
    suggestions: state.friends.suggestions
  }
}

export default connect(mapStateToProps)(translate('matchStartView')(validation(strategy)(ChooseOpponent)))
