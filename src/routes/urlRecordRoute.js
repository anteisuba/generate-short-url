import { Router } from "express";
import { urlRecordController } from "../controlles/urlRecordController.js";

const urlRecordRouter = new Router();

urlRecordRouter.route("/urlRecord").post(urlRecordController);

export default urlRecordRouter;
