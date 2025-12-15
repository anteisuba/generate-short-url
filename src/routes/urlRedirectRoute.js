import Router from "express";
import { getOriginURL } from "../controlles/urlRedirectController.js";

const urlRedirectRouter = new Router();
urlRedirectRouter.route("/:urlCode").get(getOriginURL);

export default urlRedirectRouter;
