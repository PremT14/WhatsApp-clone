import { DataTypes, Model } from "sequelize";
import sequelize from "../utils/db"
import type { UUID } from "node:crypto";

export interface connectionAttributes extends Model {
    id: UUID;
    userId: UUID;
    receiverId: UUID;
}

const Connection = sequelize.define<connectionAttributes>('connection', {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
        primaryKey: true
    },
})

export default Connection;