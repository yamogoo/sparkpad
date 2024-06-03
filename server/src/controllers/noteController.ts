import { Request, Response, NextFunction } from "express";
import { db } from "@/models";
import { v4 } from "uuid";

const User = db.models.User;
const Note = db.models.Note;

const getAllNotes = (req: Request, res: Response) => {
  const { userId } = req.body;

  User.findOne({ where: { id: userId } }).then((user) => {
    if (!user) res.status(401).send("User not exists");
  });

  Note.findAll({
    where: {
      userId,
    },
  })
    .then((notes) => {
      res.status(200).send({ notes });
    })
    .catch((err) => {
      res.status(500).send("Error when finding notes");
    });
};

const createNote = (req: Request, res: Response) => {
  const { userId, id, name, content } = req.body;

  Note.create({
    id,
    name,
    content,
    userId,
  })
    .then((note) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(res.status(201).send({ name: note, content }));
        }, 3000);
      });
    })
    .catch((err) => {
      console.log(err);
    });

  //   const { userName } = req.payload;

  //   console.log("userName: ", userName);

  // Find User:

  //   Note.create({
  //     name, content
  //   })
};

const deleteNote = (req: Request, res: Response, next: NextFunction) => {
  const { params } = req.params;
  console.log(params);
};

const deleteAllNote = (req: Request, res: Response, next: NextFunction) => {};

const updateNote = (req: Request, res: Response, next: NextFunction) => {};

export const noteController = {
  getAllNotes,
  createNote,
  deleteNote,
  deleteAllNote,
  updateNote,
};
