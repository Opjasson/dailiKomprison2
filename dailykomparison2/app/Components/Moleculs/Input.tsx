import React from "react";
import { TextInput, KeyboardTypeOptions } from "react-native";

interface props {
    onChangeText: (text : string) => void;
    keyboardType: KeyboardTypeOptions;
    placeholder: string;
    secureTextEntry? : boolean;
}

const Input: React.FC<props> = ({
    onChangeText,
    keyboardType,
    placeholder,
    secureTextEntry
}) => {
    return (
        <TextInput
            style={{
                borderWidth: 1,
                marginBottom: 5,
                borderRadius: 5,
            }}
            keyboardType={keyboardType}
            placeholder={placeholder}
            onChangeText={onChangeText}
            secureTextEntry = {secureTextEntry}
        />
    );
};

export default Input;
