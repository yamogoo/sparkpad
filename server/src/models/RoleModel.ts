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

class Role extends Model<RoleAttributes, RoleCreationAttributes> {
  static Roles = [Roles.ADMIN, Roles.USER];

  declare id: string;
  declare name: Roles;
}

export default (sequelize: Sequelize): typeof Role => {
  Role.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "role",
      tableName: "roles",
      timestamps: false,
    }
  );
  return Role;
};
