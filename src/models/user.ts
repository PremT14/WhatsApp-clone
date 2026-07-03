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
        unique: true
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    mobileNumber:{
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true
    },
    imageUrl:{
        type: DataTypes.STRING,
        defaultValue: "https://i.pinimg.com/236x/15/0f/a8/150fa8800b0a0d5633abc1d1c4db3d87.jpg?nii=t",
        allowNull: true,
    }
})

export default User;