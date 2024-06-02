import UserModel from "./UserModel";
import RoleModel from "./RoleModel";
import NoteModel from "./NoteModel";

import { Dialect, Sequelize } from "sequelize";
import { config } from "@/config/dbConfig";
import { v4 } from "uuid";

export class Models {
  public User;
  public Role;
  public Note;

  constructor(sequlize: Sequelize) {
    this.User = UserModel(sequlize);
    this.Role = RoleModel(sequlize);
    this.Note = NoteModel(sequlize);

    this.init();
  }

  private setAssociations() {
    /* * * Associations * * */

    this.Role.belongsToMany(this.User, {
      through: "user_roles",
    });

    this.User.belongsToMany(this.Role, {
      through: "user_roles",
    });

    this.User.hasMany(this.Note);
    this.Note.belongsTo(this.User);
  }

  private init() {
    this.setAssociations();
  }
}

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
    await this.orm.sync();

    const roles = await this.models.Role.findAll();
    const _roles = this.models.Role.Roles;

    _roles.forEach((roleName) => {
      try {
        const isRoleExists = roles.find((role) => role.name === roleName);

        if (!isRoleExists) {
          this.models.Role.create({
            id: v4(),
            name: roleName,
          });
        }
      } catch (error) {
        // !!! ADD debug level
        console.log(error);
      }
    });

    await this.orm.sync();

    // this.testConnection();
  }
}

export const db = new DataBase();
