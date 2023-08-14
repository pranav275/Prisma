import express from "express"
import { getMyNotes ,addNotes} from "../controllers/postController";
import { isAuthenticated } from "../middlewares/auth";
const router = express.Router();

router.route("/getNotes").get(isAuthenticated,getMyNotes);
router.route("/addNotes").post(isAuthenticated,addNotes);

export default router;

