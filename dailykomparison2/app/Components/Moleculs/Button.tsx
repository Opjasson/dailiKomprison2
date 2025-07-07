import React from "react"
import { Text, TouchableOpacity } from "react-native"


interface Buttonprops {
    children: React.ReactNode;
    aksi: () => void;
    style: any;
    disabled?: boolean;
    simbol: React.ReactNode;
}

const Button = ({style,aksi,children,disabled, simbol} : Buttonprops) => {
  return (
      <TouchableOpacity disabled={disabled} style={style} onPress={aksi}>
        {simbol}
          
          <Text style={{ color: "white", fontWeight: 800 }}>{children}</Text>
      </TouchableOpacity>
  );
}

export default Button
