import { Router } from "express";

import * as authController from "../controllers/AuthController";

const router = Router();

router.post(
  "/register",
  async (request, response) =>
    await authController.postRegister(request, response)
);

router.post(
  "login",
  async (request, response) => await authController.postLogin(request, response)
);

export default router;
