import { Router } from "express";
import multer from "multer";

import uploadConfig from "./config/upload";

import orphanagesController from "./controllers/orphanagesController";

const routes = Router();
const upload = multer(uploadConfig);

routes.get("/orphanages", orphanagesController.index);
routes.get("/orphanages/:id", orphanagesController.show);
routes.post("/orphanages", upload.array("images"), orphanagesController.create);

export default routes;
