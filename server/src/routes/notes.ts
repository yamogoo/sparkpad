import { noteController } from "@/controllers/noteController";
import { auth } from "@/middleware/verifyAuthentication";
import express from "express";

const router = express.Router();

router.get("/", [auth.verifyAuthentication, noteController.getAllNotes]);

router.post("/", [auth.verifyAuthentication, noteController.createNote]);

// router.delete("/", noteController.deleteNote);

// router.put("/", noteController.updateNote);

// router.delete("/", noteController.deleteAllNote);

export default router;
