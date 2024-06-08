import { Request, Response } from "express";
import {
  ApiResponse,
  Authenticated,
  NoteCreationAttributes,
  Notes,
  Note,
  NoteUid,
} from "@/typings";

import { db } from "@/models";

const UserModel = db.models.User;
const NoteModel = db.models.Note;

const getAllNotes = (
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
          id: Number(note.id),
          uid: note.uid,
          path: note.path,
          title: note.title,
          content: note.content,
          noteGroupId: note.noteGroupId,
        };

        return _note;
      });

      res.status(200).send({ payload: notes });
    })
    .catch((_err) => {
      res.status(500).send({ error: "Error when finding notes" });
    });
};

const createNote = (
  req: Request<{}, {}, Authenticated<NoteCreationAttributes>>,
  res: Response<ApiResponse<Note>>
) => {
  const note = req.body;

  NoteModel.create(note)
    .then((createdNote) => {
      const noteResponse: Note = {
        id: createdNote.id,
        uid: createdNote.uid,
        path: createdNote.path,
        title: createdNote.title,
        content: createdNote.content,
        noteGroupId: createdNote.noteGroupId,
      };

      res.status(201).send({ payload: noteResponse });
    })
    .catch(() => {
      res.status(400).send({ error: "Note not created" });
    });
};

const deleteNote = (
  req: Request<NoteUid, {}, Authenticated<{}>>,
  res: Response<ApiResponse<NoteUid>>
) => {
  const { uid } = req.params;
  const { userId } = req.body;

  NoteModel.destroy({ where: { uid, userId } }).then((status) => {
    if (status === 0) res.status(204).send({ error: "Note not found" });
    res.status(200).send({ payload: { uid } });
  });
};

const deleteAllNote = (
  req: Request<{}, {}, Authenticated<{}>>,
  res: Response<ApiResponse<Array<NoteUid>>>
) => {
  const { userId } = req.body;

  NoteModel.findAll({ where: { userId } }).then((foundNotes) => {
    const note_uids = foundNotes.map((note) => {
      const _note: NoteUid = {
        uid: note.uid,
      };
      return _note;
    });

    NoteModel.destroy({ where: { userId } }).then((status) => {
      if (status === 0) res.status(204).send({ error: "Notes not found" });
      res.status(200).send({ payload: note_uids });
    });
  });
};

// const updateNote = (req: Request, res: Response, next: NextFunction) => {};

export const noteController = {
  getAllNotes,
  createNote,
  deleteNote,
  deleteAllNote,
  // updateNote,
};
