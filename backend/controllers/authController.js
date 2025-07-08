import Login from "../models/loginModels.js";
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

    function generateRandomString(length) {
        const characters =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let result = "";
        for (let i = 0; i < length; i++) {
            result += characters.charAt(
                Math.floor(Math.random() * characters.length)
            );
        }
        return result;
    }

    const randomString = generateRandomString(10);
    Login.create({
        userId: user.id,
        token: randomString,
    });
    res.status(201).json({ message: "Login succesfully", response: user });
};
