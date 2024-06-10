import { Request, Response } from "express";
import {
  ApiResponse,
  Authenticated,
  NoteCreationAttributes,
  Notes,
  Note,
  NoteCreationRequestParams,
  NoteId,
} from "@/typings";

import { db } from "@/models";

const UserModel = db.models.User;
const NoteModel = db.models.Note;

const getAll = (
  req: Request<{}, {}, Authenticated<{}>>,
  res: Response<ApiResponse<Notes>>
) => {
  const { userId } = req.body;

  UserModel.findOne({ where: { id: userId } }).then((user) => {
    if (!user) res.status(401).send({ error: "User not exists" });
  });

  NoteModel.findAll({ where: { userId } })
    .then((foundNotes) => {
      const notes = foundNotes.map((note) => {
        const _note: Note = {
          id: note.id,
          title: note.title,
          content: note.content,
          parentId: note.parentId,
        };

        return _note;
      });

      res.status(200).send({ payload: notes });
    })
    .catch((_err) => {
      res.status(500).send({ error: "Error when finding notes" });
    });
};

const create = (
  req: Request<
    NoteCreationRequestParams,
    {},
    Authenticated<NoteCreationAttributes>
  >,
  res: Response<ApiResponse<Note>>
) => {
  const note = req.body;

  NoteModel.create(note)
    .then((createdNote) => {
      const noteResponse: Note = {
        id: createdNote.id,
        title: createdNote.title,
        content: createdNote.content,
        parentId: createdNote.parentId,
      };

      res.status(201).send({ payload: noteResponse });
    })
    .catch(() => {
      res.status(400).send({ error: "Note not created" });
    });
};

const deleteOne = (
  req: Request<NoteCreationRequestParams, {}, Authenticated<{}>>,
  res: Response<ApiResponse<NoteCreationRequestParams>>
) => {
  const { parentId, id } = req.params;
  const { userId } = req.body;

  NoteModel.destroy({ where: { id, userId } })
    .then((status) => {
      if (status === 0)
        return res.status(204).send({ error: "Note not found" });
      return res.status(200).send({ payload: { parentId: parentId, id } });
    })
    .catch((error) => {
      res.status(400).send({ error });
    });
};

const deleteAll = (
  req: Request<Pick<Note, "parentId">, {}, Authenticated<{}>>,
  res: Response<ApiResponse<Array<NoteId>>>
) => {
  console.log("deleteAll");
  const { parentId } = req.params;
  const { userId } = req.body;

  NoteModel.findAll({ where: { parentId, userId } })
    .then((foundNotes) => {
      if (foundNotes.length > 0) {
        const noteIds: Array<NoteId> = foundNotes.map((note) => {
          return { id: note.id };
        });
        NoteModel.destroy({ where: { userId } }).then((status) => {
          if (status === 0)
            return res.status(204).send({ error: "Notes not found" });
          return res.status(200).send({ payload: noteIds });
        });
      } else {
        return res.status(204).send({ error: "Notes not found" });
      }
    })
    .catch(() => {
      res.status(400).send({ error: `Error when deleting notes in the group` });
    });
};

// const update = (req: Request, res: Response, next: NextFunction) => {};

export const noteController = {
  getAll,
  create,
  deleteOne,
  deleteAll,
  // update,
};
