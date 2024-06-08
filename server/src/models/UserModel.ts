import { User } from "@/typings";

import { DataTypes, Model, Sequelize } from "sequelize";

type UserAttributes = Omit<User, "roles">;

export type UserCreationAttributes = UserAttributes;

class UserModel extends Model<UserAttributes, UserCreationAttributes> {
  [x: string]: any;
  declare id: string;
  declare login: string;
  declare email: string;
  declare password: string;
}

export default (sequelize: Sequelize): typeof UserModel => {
  UserModel.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      login: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "user",
      tableName: "users",
    }
  );

  return UserModel;
};
