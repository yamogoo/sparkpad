import { NoteGroup } from "@/typings";

import { DataTypes, Model, Sequelize } from "sequelize";

interface NotesGroupAttributes extends NoteGroup {
  userId: string;
}

type NotesGroupCreationAttributes = NotesGroupAttributes;

class NoteGroupModel extends Model<
  NotesGroupAttributes,
  NotesGroupCreationAttributes
> {
  declare id: number;
  declare path: string;
  declare title: string;
  declare description: string;
  declare parentId: number;
  declare userId: string;
}

export default (sequelize: Sequelize): typeof NoteGroupModel => {
  NoteGroupModel.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        allowNull: false,
      },
      path: {
        type: DataTypes.STRING,
      },
      title: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.STRING,
      },
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      parentId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        references: {
          model: "note_groups",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "note_group",
      tableName: "note_groups",
    }
  );

  NoteGroupModel.hasMany(NoteGroupModel, {
    as: "children",
    foreignKey: "parentId",
  });
  NoteGroupModel.belongsTo(NoteGroupModel, {
    as: "parent",
    foreignKey: "parentId",
  });

  return NoteGroupModel;
};
