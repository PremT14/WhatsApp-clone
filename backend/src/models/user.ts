import { DataTypes, Model } from "sequelize";
import sequelize from "../utils/db"
import type { UUID } from "node:crypto";

export interface userAttributes extends Model {
    id: UUID;
    username: string;
    email: string;
    password: string;
}

const User = sequelize.define<userAttributes>('user', {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    username:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
    }
})

export default User;