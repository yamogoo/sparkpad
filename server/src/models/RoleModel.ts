import { DataTypes, Model, Sequelize } from "sequelize";

export enum Roles {
  USER = "user",
  ADMIN = "admin",
}

export interface RoleAttributes {
  id: string;
  name: Roles;
}

type RoleCreationAttributes = RoleAttributes;

class Role extends Model<RoleAttributes, RoleCreationAttributes> {}

export default (sequelize: Sequelize): typeof Role => {
  Role.init(
    {
      id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "role",
    }
  );
  return Role;
};
