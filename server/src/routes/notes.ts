import { noteController } from "@/controllers/noteController";
import { auth } from "@/middleware/verifyAuthentication";
import express from "express";

const router = express.Router();

// getAll
router.get("/", [auth.verifyAuthentication, noteController.getAllNotes]);

// create
router.post("/", [auth.verifyAuthentication, noteController.createNote]);

// delete
router.delete("/:uid", [auth.verifyAuthentication, noteController.deleteNote]);

// router.put("/", noteController.updateNote);

router.delete("/", [auth.verifyAuthentication, noteController.deleteAllNote]);

export default router;
