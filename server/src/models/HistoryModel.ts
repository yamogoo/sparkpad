import { DataTypes, Model, Sequelize } from "sequelize";

interface HistoryAttributes {
  uid: string;
}

type HistoryCreationAttributes = HistoryAttributes;

export class Hystory extends Model<
  HistoryCreationAttributes,
  HistoryAttributes
> {
  declare uid: string;
}

export default (sequelize: Sequelize): typeof Hystory => {
  Hystory.init(
    {
      uid: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "note_history",
      tableName: "note_history",
    }
  );

  return Hystory;
};
