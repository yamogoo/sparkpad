import { DataTypes, Model, Sequelize } from "sequelize";

export type Path = string;

interface NoteAttributes {
  id: string;
  path: Path;
  name: string;
  content: string;
  userId: string;
}

type NoteCreationAttributes = NoteAttributes;

class Note extends Model<NoteAttributes, NoteCreationAttributes> {
  declare id: string;
  declare path: Path;
  declare name: string;
  declare content: string;
  declare userId: string;
}

export default (sequelize: Sequelize): typeof Note => {
  Note.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
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
      userId: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "note",
    }
  );

  return Note;
};
