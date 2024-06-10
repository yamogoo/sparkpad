import { Request, Response } from "express";
import {
  ApiResponse,
  Authenticated,
  NoteGroupCreationAttributes,
  NoteGroup,
  NoteGroups,
  NoteCreationRequestParams,
  NoteGroupDeletedAttributes,
} from "@/typings";

import { db } from "@/models";

const UserModel = db.models.User;
const NoteGroupModel = db.models.NoteGroup;
const NoteModel = db.models.Note;

const getAll = (
  req: Request<{}, {}, Authenticated<{}>>,
  res: Response<ApiResponse<NoteGroups>>
) => {
  const { userId } = req.body;

  UserModel.findOne({ where: { id: userId } }).then((user) => {
    if (!user) res.status(401).send({ error: "User not exists" });
  });

  NoteGroupModel.findAll({ where: { userId } })
    .then((foundNotes) => {
      const groups = foundNotes.map((group) => {
        const _group: NoteGroup = {
          id: group.id,
          title: group.title,
          parentId: group.parentId,
          description: group.description,
        };

        return _group;
      });

      res.status(200).send({ payload: groups });
    })
    .catch((_err) => {
      res.status(500).send({ error: "Error when finding groups" });
    });
};

const create = (
  req: Request<{}, {}, Authenticated<NoteGroupCreationAttributes>>,
  res: Response<ApiResponse<NoteGroup>>
) => {
  const group = req.body;

  NoteGroupModel.create(group)
    .then((createdNote) => {
      const noteResponse: NoteGroup = {
        id: createdNote.id,
        title: createdNote.title,
        description: createdNote.description,
        parentId: createdNote.parentId,
      };

      res.status(201).send({ payload: noteResponse });
    })
    .catch(() => {
      res.status(400).send({ error: "Group not created" });
    });
};

const findDescendents = async (
  id: string,
  userId: string
): Promise<Array<NoteGroup>> => {
  const descendants: any = [];

  const findChildren = async (parentId: string) => {
    const children = await NoteGroupModel.findAll({
      where: { parentId, userId },
    });

    for (const child of children) {
      descendants.push(child);
      await findChildren(child.id);
    }
  };

  await findChildren(id);
  return descendants;
};

const deleteOne = async (
  req: Request<NoteCreationRequestParams, {}, Authenticated<{}>>,
  res: Response<ApiResponse<NoteGroupDeletedAttributes>>
) => {
  const { id } = req.params;
  const { userId } = req.body;

  // deleting all nested items

  const descendants = await findDescendents(id, userId);

  const groupIds = descendants.map((descendant) => {
    return { id: descendant.id };
  });

  // groupIds.push({ id });

  const noteIds: Array<{ id: string }> = [];

  for (const group of groupIds) {
    const notes = await NoteModel.findAll({
      where: { parentId: group.id, userId },
    });

    notes.map(async (note) => {
      const { id } = note;
      noteIds.push({ id });

      await NoteModel.destroy({ where: { id, userId } });
    });
  }

  for (const group of groupIds) {
    const id = group.id;
    await NoteGroupModel.destroy({ where: { id, userId } })
      .then((status) => {
        // if (status === 0)
        //   return res.status(204).send({ error: "Group not found" });
      })
      .catch((error) => {
        // return res
        //   .status(400)
        //   .send({ error: `Error when deleting the group ${error}` });
      });
  }

  return res.status(200).send({
    payload: { groups: groupIds, notes: noteIds },
  });
};

const deleteAll = () => {};

export const noteGroupsController = {
  getAll,
  create,
  deleteOne,
  deleteAll,
  // updateNote,
};
