import { Router } from "express";
import multer from "multer";
import * as userController from "../controllers/file.controller.js";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/file", upload.single("file"), userController.storeFile);

export default router;
