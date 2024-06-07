import { DataTypes, Model, Sequelize } from "sequelize";

export type Path = string;

interface NotesGroupAttributes {
  id: number;
  path: Path;
  name: string;
  description: string;
  parentId: number;
  userId: string;
}

type NotesGroupCreationAttributes = NotesGroupAttributes;

class NoteGroup extends Model<
  NotesGroupAttributes,
  NotesGroupCreationAttributes
> {
  declare id: number;
  declare path: Path;
  declare name: string;
  declare description: string;
  declare parentId: number;
  declare userId: string;
}

export default (sequelize: Sequelize): typeof NoteGroup => {
  NoteGroup.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      path: {
        type: DataTypes.STRING,
      },
      name: {
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
        type: DataTypes.INTEGER,
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

  NoteGroup.hasMany(NoteGroup, { as: "children", foreignKey: "parentId" });
  NoteGroup.belongsTo(NoteGroup, { as: "parent", foreignKey: "parentId" });

  return NoteGroup;
};
