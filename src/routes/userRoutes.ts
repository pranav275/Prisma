import express from "express"
import { signUp ,logIn} from "../controllers/userController";

const router : express.Router = express.Router();



router.route('/register').post(signUp);
router.route('/login').post(logIn);

export default router;