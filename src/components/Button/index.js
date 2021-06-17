import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const Button = ({text, color = '#FFC700', textColor = '#020202', onPress}) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <View style={styles.container(color)}>
        <Text style={styles.text(textColor)}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  text: textColor => ({
    fontSize: 14,
    color: textColor,
    textAlign: 'center',
    fontWeight: '500',
  }),
  container: color => ({
    backgroundColor: color,
    padding: 12,
    borderRadius: 8,
  }),
});
