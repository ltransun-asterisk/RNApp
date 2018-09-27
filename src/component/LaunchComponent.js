import React, { Component } from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { setRootToHomeScreen, setRootToLoginScreen } from '../navigation/root';

export default class LaunchComponent extends Component {

  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
  }

  componentDidAppear() {
    // let cancel
    // const CancelToken = axios.CancelToken;
    // const source = CancelToken.source();
    // setTimeout(() => {
      this.props.getAppInfo()
      // this.props.getAppInfo()
      this.props.login({ username: 'ltranframgia', password: '12345678' })
      this.props.login({ username: 'ltranframgia', password: '12345678' })
      this.props.getAppInfo()
      this.props.getAppInfo()
      // source.cancel('')
      // this.props.cancelAppInfo()
    // }, 3000);
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps')
    // console.log(Store.getState())
    console.log(this.props)
    console.log(nextProps)
    // if (nextProps.appInfo !== this.props.appInfo) {
    //   // console.log('appInfo')
    //   this.props.getUserInfo()
    // }
    // if (nextProps.user !== this.props.user) {
    //   // console.log('user')
    //   goToHomeScreen()
    // }
  }

  touchOnHomeButtonAction = () => {
    setRootToHomeScreen()
  }

  touchOnLoginButtonAction = () => {
    setRootToLoginScreen()
  }

  render() {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <Text style={styles.logo}>RNApp</Text>
        <ActivityIndicator size="small" />
      </View>
      // <View style={styles.container}>
      //   <Text style={styles.instructions}>{this.props.id + " " + this.props.text}</Text>
      //   <Button
      //     title='Home'
      //     onPress={this.touchOnHomeButtonAction}
      //   />
      //    <Button
      //     title='Login'
      //     onPress={this.touchOnLoginButtonAction}
      //   />
      // </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // backgroundColor: 'green'
  },
  horizontal: {
    flexDirection: 'column',
    padding: 20
  },
  logo: {
    textAlign: 'center',
    color: 'green',
    marginBottom: 5,
    fontSize: 36
  },
})

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });
