import {Router} from "express"
import getuserdata from "../controllers/getuserdata.js"
import registerUser from "../controllers/userRegistration.js"
import { userRegistrationValidator } from "../utils/registrationValidation.js";
const router = Router();



router.route("/getdata").get(getuserdata);
router.route("/registeruser").post(userRegistrationValidator,registerUser);



export default router;