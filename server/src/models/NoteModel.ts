import { DataTypes, Model, Sequelize } from "sequelize";

interface NoteAttributes {
  id: string;
  name: string;
  content: string;
  userId: string;
}

type NoteCreationAttributes = NoteAttributes;

class Note extends Model<NoteAttributes, NoteCreationAttributes> {
  declare id: string;
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
