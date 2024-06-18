import UserModel from "./UserModel";
import RoleModel from "./RoleModel";
import NoteModel from "./NoteModel";
import NoteGroupModel from "./NoteGroupModel";
import HistoryModel from "./HistoryModel";

import { Dialect, Sequelize } from "sequelize";
import { v4 } from "uuid";

import { config } from "@/config/dbConfig";
import { logger } from "@/utils/logger";

export class Models {
  public User;
  public Role;

  public NoteGroup;
  public Note;
  public History;

  constructor(sequlize: Sequelize) {
    this.User = UserModel(sequlize);
    this.Role = RoleModel(sequlize);

    this.NoteGroup = NoteGroupModel(sequlize);
    this.Note = NoteModel(sequlize);
    this.History = HistoryModel(sequlize);

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

    // Note Group

    this.User.hasMany(this.NoteGroup, {
      foreignKey: "userId",
    });
    this.NoteGroup.belongsTo(this.User, {
      foreignKey: "userId",
    });

    // Note

    // this.NoteGroup.hasMany(this.Note, {
    //   foreignKey: "parentId",
    // });

    // this.Note.belongsTo(this.NoteGroup, {
    //   foreignKey: "parentId",
    // });

    // History

    this.User.hasMany(this.History, {
      foreignKey: "userId",
    });
    this.History.belongsTo(this.User, {
      foreignKey: "userId",
    });
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
      logger.debug("Connection has been established successfully.");
    } catch (err) {
      logger.error("Unable to connect to the database:", err);
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
        logger.error(`Error while init db connection`, { error });
      }
    });

    await this.orm.sync();
  }
}

export const db = new DataBase();
