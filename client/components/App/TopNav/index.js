import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {Navbar, Nav, NavItem} from 'react-bootstrap'
import {translate} from 'react-i18next'
import {signOut} from '../../../actions/auth'

export class TopNav extends Component {
  constructor(props) {
    super(props)

    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    this.props.dispatch(signOut())
  }

  render() {
    const {t} = this.props

    return (
      <Navbar fixedTop={true}>
        <Navbar.Header>
          <Navbar.Brand>
            {(() => {
              if (this.props.auth.scope) {
                return (
                  <a href="/">{t('appName')}</a>
                )
              } else {
                return (<a href="/login">{t('appName')}</a>)
              }
            })()}
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>

        {(() => {
          if (this.props.auth.scope) {
            return (
              <Navbar.Collapse>
                <Nav>
                  <NavItem eventKey={1} href="/matches">{t('matchlist')}</NavItem>
                  <NavItem eventKey={2} href="/startmatch">{t('startmatch')}</NavItem>
                </Nav>
                <Nav pullRight>
                  <NavItem eventKey={3} href="/account">{this.props.auth.name}</NavItem>
                  <NavItem eventKey={4} href="/about">{t('about')}</NavItem>
                  <NavItem eventKey={5} onClick={this.handleLogout}>{t('logout')}</NavItem>
                </Nav>
                <Navbar.Text pullRight>

                </Navbar.Text>
              </Navbar.Collapse>
            )
          } else {
            return (
              <Navbar.Collapse>
                <Nav pullRight>
                  <NavItem eventKey={2} href="/about">{t('about')}</NavItem>
                  <NavItem eventKey={1} href="/login">{t('login')}</NavItem>
                </Nav>
              </Navbar.Collapse>
            )
          }
        })()}
      </Navbar>
    )
  }
}

const mapStateToProps = (state) => ({auth: state.auth});

export default connect(mapStateToProps)(translate('topNav')(TopNav))
