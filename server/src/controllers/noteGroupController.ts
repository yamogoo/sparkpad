import { Request, Response } from "express";
import {
  ApiResponse,
  Authenticated,
  NoteGroupCreationAttributes,
  NoteGroup,
  NoteGroups,
  NoteCreationRequestParams,
  NoteGroupDeletedAttributes,
  NoteId,
  NoteGroupId,
} from "@/typings";

import { db } from "@/models";
import { logger } from "@/utils/logger";

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

/**
 * @description Delete all descedents (groups and notes) by root group ID
 */
async function deleteGroupAndNotes(
  id: string,
  userId: string,
  groups: Array<NoteGroupId>,
  notes: Array<NoteId>
) {
  const _notes = await NoteModel.findAll({
    where: { parentId: id },
  });

  for (const note of _notes) {
    notes.push({ id: note.id });
  }

  await NoteModel.destroy({ where: { parentId: id } });

  const descendantGroups = await NoteGroupModel.findAll({
    where: { parentId: id },
  });

  for (const group of descendantGroups) {
    await deleteGroupAndNotes(group.id, userId, groups, notes);
  }

  groups.push({ id });

  await NoteGroupModel.destroy({ where: { id } });
}

const deleteOne = async (
  req: Request<NoteCreationRequestParams, {}, Authenticated<{}>>,
  res: Response<ApiResponse<NoteGroupDeletedAttributes>>
) => {
  const { id } = req.params;
  const { userId } = req.body;

  const groups: Array<NoteGroupId> = [];
  const notes: Array<NoteId> = [];

  try {
    await deleteGroupAndNotes(id, userId, groups, notes);

    logger.debug("deleted items", { groups, notes });

    res.status(200).send({
      payload: { groups: groups, notes: notes },
    });
  } catch (error) {
    res.status(400).send({ error: JSON.stringify(error) });
  }
};

const deleteAll = () => {};

const update = async (
  req: Request<Pick<NoteGroup, "id">>,
  res: Response<ApiResponse<NoteGroup>>
) => {
  const { id } = req.params;
  const { title, userId } = req.body;

  logger.debug("req.body", { body: req.body });
  logger.debug("req.params", { body: req.params });

  NoteGroupModel.findOne({ where: { id, userId } })
    .then((group) => {
      if (!group) return res.status(204).send({ error: "Note not found" });
      else {
        group.update({ title }).then((updated) => {
          logger.debug("updated group", { group: updated });
          res.status(200).send({ payload: JSON.parse(JSON.stringify(group)) });
        });
      }
    })
    .catch((error) => {
      res.status(400).send({ error: JSON.stringify(error) });
    });
};

export const noteGroupsController = {
  getAll,
  create,
  deleteOne,
  deleteAll,
  update,
};
