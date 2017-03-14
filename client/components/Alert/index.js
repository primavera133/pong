import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Alert} from 'react-bootstrap';
import {showInfo} from '../../actions/alert';
import styles from './styles.css';

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      timeout: false,
      message: '',
      type: 'info'
    };

    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    if (this.props.message) {
      this.setState({
        show: true,
        ...this.props
      });

      // Hide alert after some time
      clearTimeout(this.state.timeout);
      this.setState({
        timeout: setTimeout(this.handleClose, 3000)
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.message) {
      this.setState({
        show: true,
        ...nextProps
      });

      // Hide alert after some time
      clearTimeout(this.state.timeout);
      this.setState({
        timeout: setTimeout(this.handleClose, 3000)
      });
    } else {
      this.setState({
        show: false
      });
    }
  }

  handleClose() {
    // Hide alert by setting an empty message
    this.props.dispatch(showInfo(''));
  }

  render() {
    if (this.state.show) {
      return (
        <Alert
          bsStyle={this.state.type}
          className={styles.alert}
          onDismiss={this.handleClose}>
          {this.state.message}
        </Alert>
      )
    } else {
      return null;
    }
  }
}

const mapStateToProps = (state) => ({...state.alert});

export default connect(mapStateToProps)(App);
