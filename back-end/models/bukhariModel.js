import db from "../config/db.js";
import { Sequelize } from "sequelize";
const {DataTypes} = Sequelize;

export const Bukhari = db.define('bukhari',
    {
        No: {
          type: DataTypes.INTEGER,
          primaryKey:true
        },
        Kitab: DataTypes.STRING,
        Arab: DataTypes.STRING,
        Terjemah: DataTypes.STRING,
        PreprocessingText: DataTypes.STRING,
        Label:DataTypes.STRING
    },
    {
      createdAt: false,
      updatedAt:false,
      freezeTableName:true,
    });