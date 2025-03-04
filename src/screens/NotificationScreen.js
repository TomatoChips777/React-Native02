import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const NotifcationScreen = () => {
  return (
    <View style= {styles.container}>
      <Text>Notification</Text>
    </View>
  )
}

export default NotifcationScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },

  });