import React, {Component, PropTypes} from 'react'
import FormComponent from '../../FormComponent'
import {connect} from 'react-redux'
import validation from 'react-validation-mixin'
import {translate} from 'react-i18next'
import strategy from 'joi-validation-strategy'
import {FormGroup, FormControl, ControlLabel} from 'react-bootstrap'
import {findFriend} from '../../../actions/friends'
import {startMatch} from '../../../actions/matches'
import {playerFriendValidationSchema} from '../../../../validators/friends'
import Opponent from '../Opponent'

export class ChooseOpponent extends FormComponent {
  constructor(props) {
    super(props)

    this.state = {
      name: ''
    }

    this.validatorTypes = playerFriendValidationSchema;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.chooseOpponent = this.chooseOpponent.bind(this);
  }

  handleChange(event, field) {
    const v = event.target.value;
    this.setState({[field]: v}, () => {
      if (v.length > 3) {
        this.searchFriendsForm.submit()
      }
    });
  }


  handleSubmit(event) {
    event.preventDefault();

    this.props.validate((error) => {
      if (error) {
        console.error(error)
      }
      if (!error) {
        this.props.dispatch(findFriend(this.state.name))
      }
    });
  }

  chooseOpponent(opponent) {
    //this.setState({chosenOpponent: opponent})
    this.props.dispatch(startMatch(opponent))
  }

  render() {
    const {t} = this.props;

    return (
      <form id="searchFriendsForm" onSubmit={this.handleSubmit.bind(this)}>
        <h2>{t('headerFindAFriend')}</h2>

        <FormGroup validationState={this.getValidationState('name')}>
          <ControlLabel htmlFor="form-name">{t('name')}</ControlLabel>
          <FormControl
            id="form-name"
            value={this.state.name}
            type="text"
            onChange={(e) => this.handleChange(e, 'name')}
            onFocus={this.handleFocus('name')}
            onBlur={this.handleBlur('name')}/>
          <FormControl.Feedback />
        </FormGroup>

        {(() => {
          if (this.props.suggestions.length) {
            return <div>
              <h3>{t('headerSuggestions')}</h3>
              <ul>
                {this.props.suggestions.map(suggestion =>
                  <Opponent key={suggestion._id} opponent={suggestion} />
                )}
              </ul>
            </div>
          }
        })()}


      </form>
    )
  }
}

function mapStateToProps(state) {
  return {
    friends: state.friends.list,
    suggestions: state.friends.suggestions
  }
}

export default connect(mapStateToProps)(translate('matchStartView')(validation(strategy)(ChooseOpponent)))
