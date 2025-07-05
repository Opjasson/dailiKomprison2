import Users from "../models/userModel.js";
import argon2 from "argon2";

export const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await Users.findOne({ where: { email } });
    if (!user) {
        return res.status(401).json({
            message: "Email yang anda masukan salah",
        });
    }
    const isValidPassword = await argon2.verify(user.password, password);
    if (!isValidPassword) {
        return res.status(401).json({ message: "password salah" });
    }
    res.status(201).json({ message: "Login succesfully", response: user });
};
