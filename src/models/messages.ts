import { DataTypes, Model } from "sequelize";
import sequelize from "../utils/db"
import type { UUID } from "node:crypto";

export interface messageAttributes extends Model {
    id: UUID;
    senderId: UUID;
    receiverId: UUID;
}

const Message = sequelize.define<messageAttributes>('message', {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    senderId:{
        type: DataTypes.UUID,
        allowNull: false,
        references:{
            model: "Users",
            key: "id"
        }
    },
    receiverId:{
        type: DataTypes.UUID,
        allowNull: false,
        references:{
            model: "Users",
            key: "id"
        }
    },
    message:{
        type: DataTypes.STRING,
        allowNull: false
    }
})

export default Message;