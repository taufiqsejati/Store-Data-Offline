import React, {PureComponent} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

class NetworkError extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.isError}>
        <Text style={styles.isErrorText}>Network Error</Text>
        <TouchableOpacity
          style={styles.touchableOpacityRefresh}
          onPress={this.props.handleRefresh}>
          <FontAwesome5
            name={'sync'}
            color={'#58595B'}
            size={26}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  isError: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    height: 356,
  },
  isErrorText: {
    fontSize: 13,
    fontWeight: 'normal',
    color: '#999999',
  },
  touchableOpacityRefresh: {marginTop: 25},
});

export default NetworkError;
