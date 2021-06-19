import React, {PureComponent} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
const {height, width} = Dimensions.get('window');

class ListEmpty extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
        {this.props.type == 1 ? (
          <Text
            style={[
              styles.listEmpty,
              {
                marginTop: height / 3,
              },
            ]}>
            {' '}
            No Data Available...
          </Text>
        ) : (
          <Text style={styles.listEmpty}> No Data Available...</Text>
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  listEmpty: {
    marginTop: height / 5,
    textAlign: 'center',
    fontSize: 13,
    fontWeight: 'normal',
    color: '#999999',
  },
});
export default ListEmpty;
