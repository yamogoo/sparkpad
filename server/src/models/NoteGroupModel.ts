import { NotesGroupAttributes, NoteGroupCreationAttributes } from "@/typings";

import { DataTypes, Model, Sequelize } from "sequelize";

class NoteGroupModel extends Model<
  NotesGroupAttributes,
  NoteGroupCreationAttributes
> {
  declare id: string;
  declare title: string;
  declare description: string;
  declare parentId: string;
  declare userId: string;
}

export default (sequelize: Sequelize): typeof NoteGroupModel => {
  NoteGroupModel.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
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
        type: DataTypes.STRING,
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
      // tableName: "note_groups",
    }
  );

  // NoteGroupModel.hasMany(NoteGroupModel, {
  //   as: "children",
  //   foreignKey: "parentId",
  // });
  // NoteGroupModel.belongsTo(NoteGroupModel, {
  //   as: "parent",
  //   foreignKey: "parentId",
  // });

  return NoteGroupModel;
};
