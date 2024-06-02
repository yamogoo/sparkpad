import { DataTypes, Model, Sequelize } from "sequelize";

interface NoteAttributes {
  id: string;
  name: string;
  content: string;
}

type NoteCreationAttributes = NoteAttributes;

class Note extends Model<NoteAttributes, NoteCreationAttributes> {
  declare id: string;
  declare name: string;
  declare content: string;
}

export default (sequelize: Sequelize): typeof Note => {
  Note.init(
    {
      id: {
        type: DataTypes.STRING,
      },
      name: {
        type: DataTypes.STRING,
      },
      content: {
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
