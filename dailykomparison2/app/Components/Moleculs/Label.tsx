import React from 'react'
import { StyleSheet, Text } from 'react-native'

interface props {
    title : string;
}

const Label : React.FC <props> = ({title}) => {
  return (
    <Text style={styles.textLabel}>{title}</Text>
  )
}

export default Label

const styles = StyleSheet.create({
    textLabel: {
        fontWeight: "bold",
        fontSize: 18,
        paddingHorizontal: 3,
    },
});
