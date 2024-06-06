import { DataTypes, Model, Sequelize } from "sequelize";

export type Path = string;

interface NoteAttributes {
  id: number;
  uid: string;
  path: Path;
  name: string;
  content: string;
  noteGroupId: number;
  userId: string;
}

type NoteCreationAttributes = NoteAttributes;

class Note extends Model<NoteAttributes, NoteCreationAttributes> {
  declare id: string;
  declare uid: string;
  declare path: Path;
  declare name: string;
  declare content: string;
  declare noteGroupId: number;
  declare userId: string;
}

export default (sequelize: Sequelize): typeof Note => {
  Note.init(
    {
      uid: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      path: {
        type: DataTypes.STRING,
      },
      name: {
        type: DataTypes.STRING,
      },
      content: {
        type: DataTypes.STRING,
      },
      noteGroupId: {
        type: DataTypes.INTEGER,
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
      tableName: "notes",
    }
  );

  return Note;
};
