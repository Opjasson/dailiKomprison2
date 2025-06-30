import React from "react"
import { Text, TouchableOpacity } from "react-native"

interface Buttonprops {
    children: React.ReactNode,
    aksi : () => void,
    style : any,
    disabled? : boolean
}

const Button = ({style,aksi,children,disabled} : Buttonprops) => {
  return (
    <TouchableOpacity disabled={disabled} style={style} onPress={aksi}>
        <Text style={{ color:"white", fontWeight: 800 }}>{children}</Text>
    </TouchableOpacity>
  )
}

export default Button
