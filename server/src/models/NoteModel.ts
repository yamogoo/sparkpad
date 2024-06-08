import { NoteAttributes, NoteCreationAttributes } from "@/typings";

import { DataTypes, Model, Sequelize } from "sequelize";

class NoteModel extends Model<NoteAttributes, NoteCreationAttributes> {
  declare id: number;
  declare uid: string;
  declare path: string;
  declare title: string;
  declare content: string;
  declare noteGroupId: number;
  declare userId: string;
}

export default (sequelize: Sequelize): typeof NoteModel => {
  NoteModel.init(
    {
      uid: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      path: {
        type: DataTypes.STRING,
      },
      title: {
        type: DataTypes.STRING,
      },
      content: {
        type: DataTypes.STRING,
      },
      noteGroupId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        // references: {
        //   model: "note_groups",
        //   key: "id",
        // },
      },
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "note",
      // tableName: "notes",
      timestamps: false,
    }
  );

  return NoteModel;
};
