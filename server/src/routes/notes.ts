import express from "express";

import { noteController } from "@/controllers/noteController";
import { noteGroupsController } from "@/controllers/noteGroupController";
import { auth } from "@/middleware/verifyAuthentication";

const router = express.Router();

enum ParamKeys {
  PARENT_ID = "parentId",
  ID = "id",
}

/* * * Groups * * */

router.get("/", [auth.verifyAuthentication, noteGroupsController.getAll]);

router.get(`/:${ParamKeys.ID}`, [
  auth.verifyAuthentication,
  noteGroupsController.getAll,
]);

router.post("/", [auth.verifyAuthentication, noteGroupsController.create]);

router.delete(`/:${ParamKeys.ID}`, [
  auth.verifyAuthentication,
  noteGroupsController.deleteOne,
]);

// router.delete("/", [auth.verifyAuthentication, noteGroupsController.deleteAll]);

/* * * Notes * * */

router.get(`/:${ParamKeys.PARENT_ID}/notes/`, [
  auth.verifyAuthentication,
  noteController.getAll,
]);

router.post(`/:${ParamKeys.PARENT_ID}/notes/`, [
  auth.verifyAuthentication,
  noteController.create,
]);

router.delete(`/:${ParamKeys.PARENT_ID}/notes/:${ParamKeys.ID}`, [
  auth.verifyAuthentication,
  noteController.deleteOne,
]);

// // router.put(`/:${ParamKeys.PARENT_ID}/notes/:${ParamKeys.ID}`, noteController.updateNote);

router.delete(`/:${ParamKeys.PARENT_ID}/notes/`, [
  auth.verifyAuthentication,
  noteController.deleteAll,
]);

export default router;
