import { NoteAttributes, NoteCreationAttributes } from "@/typings";

import { DataTypes, Model, Sequelize } from "sequelize";

class NoteModel extends Model<NoteAttributes, NoteCreationAttributes> {
  declare id: string;
  declare title: string;
  declare content: string;
  declare parentId: string;
  declare userId: string;
}

export default (sequelize: Sequelize): typeof NoteModel => {
  NoteModel.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
      },
      content: {
        type: DataTypes.STRING,
      },
      parentId: {
        type: DataTypes.STRING,
        allowNull: true,
        references: {
          model: "note_groups",
          key: "id",
        },
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
