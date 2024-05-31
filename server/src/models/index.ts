import UserModel from "./UserModel";
import RoleModel from "./RoleModel";

import { Dialect, Sequelize } from "sequelize";
import { config } from "@/config/dbConfig";

export class Models {
  public User;
  public Role;

  constructor(sequlize: Sequelize) {
    this.User = UserModel(sequlize);
    this.Role = RoleModel(sequlize);

    this.init();
  }

  private setAssociations() {
    /* * * Associations * * */

    this.Role.belongsToMany(this.Role, {
      through: "user_roles",
    });

    this.User.belongsToMany(this.User, {
      through: "user_roles",
    });
  }

  private init() {
    this.setAssociations();
  }
}

// class ORM {
//   public orm: Sequelize;

//   constructor(config) {
//     this.orm = new Sequelize(config);
//   }
// }

export class DataBase {
  public orm: Sequelize;
  public models: Models;

  constructor() {
    this.orm = new Sequelize(config.DB, config.USER, config.PASSWORD, {
      host: config.HOST,
      port: config.PORT,
      dialect: config.dialect as Dialect,
      pool: {
        max: config.pool.max,
        min: config.pool.min,
        acquire: config.pool.acquire,
        idle: config.pool.idle,
      },
    });

    this.models = new Models(this.orm);
  }

  public async testConnection() {
    try {
      await this.orm.authenticate();
      console.log("Connection has been established successfully.");
      // !!! ADD logger (DEBUG level)
    } catch (err) {
      console.error("Unable to connect to the database:", err);
      // !!! ADD logger (DEBUG level)
    }
  }

  public async init() {
    //...
  }
}

export const db = new DataBase();
