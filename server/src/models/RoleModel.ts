import { UserRoles } from "@/typings";

import { DataTypes, Model, Sequelize } from "sequelize";

export interface RoleAttributes {
  id: string;
  name: UserRoles;
}

type RoleCreationAttributes = RoleAttributes;

class Role extends Model<RoleAttributes, RoleCreationAttributes> {
  static Roles = [UserRoles.ADMIN, UserRoles.USER];

  declare id: string;
  declare name: UserRoles;
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
