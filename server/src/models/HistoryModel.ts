import { History } from "@/typings";

import { DataTypes, Model, Sequelize } from "sequelize";

interface HistoryAttributes extends History {}

type HistoryCreationAttributes = HistoryAttributes;

export class HystoryModel extends Model<
  HistoryCreationAttributes,
  HistoryAttributes
> {
  declare id: string;
  declare noteId: string;
}

export default (sequelize: Sequelize): typeof HystoryModel => {
  HystoryModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      noteId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "note_history",
      tableName: "note_history",
      timestamps: false,
    }
  );

  return HystoryModel;
};
