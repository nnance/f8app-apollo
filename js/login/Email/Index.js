'use strict';

import React from 'React';
import {BackAndroid, Navigator, Text} from 'react-native';
import {connect} from 'react-redux';

import {actions, selector} from '../../../web/features/auth';

import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';
import ForgotPasswordScreen from './ForgotPasswordScreen';
import SuccessScreen from './SuccessScreen';

class Index extends React.Component {
  constructor() {
    super();
    this.goToLogin = this.goToLogin.bind(this);
    this.pushPage = this.pushPage.bind(this);
    this.goBack = this.goBack.bind(this);
    this.renderScene = this.renderScene.bind(this);
    this.handleBackButton = this.handleBackButton.bind(this);
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.handleBackButton);
    this.props.clearError();
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.forgotPasswordState === 'ed') {
      this.props.clearState();
      this.pushPage('success', {successText: 'mail has been sent'});
    }
    if (nextProps.signUpState === 'ed') {
      this.props.clearState();
      this.pushPage('success', {successText: 'signed up'});
    }
  }

  render() {
    return (
      <Navigator
        ref="navigator"
        initialRoute={{page: 'login'}}
        renderScene={this.renderScene}
      />
    );
  }

  renderScene(route, navigator) {
    if (route.page === 'login') {
      return <LoginScreen user={this.props.user} error={this.props.error} logIn={this.props.logIn} pushPage={this.pushPage}/>;
    }
    if (route.page === 'signup') {
      return <SignupScreen error={this.props.error} signUp={this.props.signUp} pushPage={this.pushPage} goBack={this.goBack}/>;
    }
    if (route.page === 'forgotPassword') {
      return <ForgotPasswordScreen error={this.props.error} forgotPassword={this.props.forgotPassword} pushPage={this.pushPage} goBack={this.goBack}/>;
    }
    if (route.page === 'success') {
      return <SuccessScreen successText={route.payload.successText} goToLogin={this.goToLogin}/>;
    }
    return <Text>Page not found</Text>;
  }

  handleBackButton() {
    const navigator = this.refs.navigator;
    if (navigator && navigator.getCurrentRoutes().length > 1 ) {
      navigator.pop();
      return true;
    }
    return false;
  }

  goToLogin() {
    this.props.clearError();
    const navigator = this.refs.navigator;
    let N = navigator.getCurrentRoutes().length;
    while(N-- > 1) {
      navigator.pop();
    }
  }

  pushPage(page, payload) {
    this.props.clearError();
    this.refs.navigator.push({page, payload});
  }

  goBack() {
    this.props.clearError();
    this.refs.navigator.pop();
  }
}

const select = state => ({
  user: selector.user(state),
  error: selector.error(state),
  forgotPasswordState: selector.forgotPasswordState(state),
  signUpState: selector.signUpState(state)
})

const actionsMaping = {
  clearError: actions.clearError,
  logIn: actions.logIn,
  signUp: actions.signUp,
  forgotPassword: actions.forgotPassword,
  clearState: actions.clearState
}

export default connect(select, actionsMaping)(Index);
