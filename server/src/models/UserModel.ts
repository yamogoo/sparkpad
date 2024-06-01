import { DataTypes, Model, Sequelize } from "sequelize";

interface UserAttributes {
  id: string;
  login: string;
  email: string;
  password: string;
}

export type UserCreationAttributes = UserAttributes;

class User extends Model<UserAttributes, UserCreationAttributes> {
  [x: string]: any;
  declare id: string;
  declare login: string;
  declare email: string;
  declare password: string;
}

export default (sequelize: Sequelize): typeof User => {
  User.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
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
    }
  );

  return User;
};
