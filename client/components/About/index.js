import React, {Component} from 'react'
import {connect} from 'react-redux'
import {translate} from 'react-i18next'

export class About extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {t} = this.props

    return (
      <div>
        <h1 className="h3">{t('header')}</h1>
        <p>{t('text')}</p>
      </div>
    )
  }
}

export default connect()(translate('aboutView')(About))
