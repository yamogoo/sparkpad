import express from "express";

import { noteController } from "@/controllers/noteController";
import { noteGroupsController } from "@/controllers/noteGroupController";
import { auth } from "@/middleware/useVerifyAuthentication";

const router = express.Router();

enum ParamKeys {
  PARENT_ID = "parentId",
  ID = "id",
}

/* * * Groups * * */

/**
 * Get all groups
 */
router.get("/", [auth.useVerifyAuthentication, noteGroupsController.getAll]);

/**
 * Get by ID
 */
router.get(`/:${ParamKeys.ID}`, [
  auth.useVerifyAuthentication,
  noteGroupsController.getAll,
]);

/**
 * Create one
 */
router.post("/", [auth.useVerifyAuthentication, noteGroupsController.create]);

/**
 * Delete by ID
 */
router.delete(`/:${ParamKeys.ID}`, [
  auth.useVerifyAuthentication,
  noteGroupsController.deleteOne,
]);

/**
 * Update by ID
 */
router.put(`/:${ParamKeys.ID}`, [
  auth.useVerifyAuthentication,
  noteGroupsController.update,
]);

// router.delete("/", [auth.useVerifyAuthentication, noteGroupsController.deleteAll]);

/* * * Notes * * */

/**
 * Get all notes
 */
router.get(`/all/notes/`, [
  auth.useVerifyAuthentication,
  noteController.getAll,
]);

/**
 * Get all notes by group
 */

// router.get(`/:${ParamKeys.PARENT_ID}/notes/`, [
//   auth.useVerifyAuthentication,
//   noteController.getAllByGroup,
// ]);

/**
 * Create one
 */
router.post(`/:${ParamKeys.PARENT_ID}/notes/`, [
  auth.useVerifyAuthentication,
  noteController.create,
]);

/**
 * Delete by ID
 */
router.delete(`/:${ParamKeys.PARENT_ID}/notes/:${ParamKeys.ID}`, [
  auth.useVerifyAuthentication,
  noteController.deleteOne,
]);

/**
 * Update by ID
 */
router.put(`/:${ParamKeys.PARENT_ID}/notes/:${ParamKeys.ID}`, [
  auth.useVerifyAuthentication,
  noteController.update,
]);

/**
 * Delete All by group
 */
router.delete(`/:${ParamKeys.PARENT_ID}/notes/`, [
  auth.useVerifyAuthentication,
  noteController.deleteAll,
]);

export default router;
