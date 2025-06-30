import { Sequelize } from "sequelize";

const db = new Sequelize("dailyComparison", "root", "", {
    host: "localhost",
    dialect: "mysql",
});

export default db;
