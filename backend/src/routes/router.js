import {Router} from "express"
import getuserdata from "../controllers/getuserdata.js"
import registerUser from "../controllers/userRegistration.js"
import { userRegistrationValidator } from "../utils/registrationValidation.js";
import { loginUser } from "../controllers/userLogin.js";
import { createcontest } from "../controllers/createContest.js";
import { checkrole } from "../middlewares/checkRole.js";
import { checkauth } from "../middlewares/checkAuth.js";
import { loginValidator } from "../utils/loginValidator.js";
import { contestValidationRules } from "../utils/contestValidator.js";
import { localUpload } from "../config/multerlocal.js";
import { createSubmission } from "../controllers/submission.js";
import { deleteContest } from "../controllers/deleteContest.js";
import { logoutUser } from "../controllers/logout.js";
import { forgotPassword } from "../controllers/forgotPassword.js";
import { resetPassword } from "../controllers/resetPassword.js";
import { deleteUser } from "../controllers/deleteUser.js";
const router = Router();



router.route("/getdata").get(getuserdata);
router.route("/registeruser").post(userRegistrationValidator,registerUser);

router.route("/userlogin").post(loginValidator,loginUser);

router.route("/createcontest").post(contestValidationRules,checkauth,checkrole,createcontest);
router.route("/submitcontest").post(checkauth,localUpload.array('uiuxfiles',5),createSubmission);
router.route("deletecontest/:id").delete(checkauth,checkrole,deleteContest);
router.route("/logoutuser").post(checkauth,logoutUser);
router.route("/forgotpassword").post(forgotPassword);
router.route("/resetpassword").post(resetPassword);
router.route("deleteuser/:id").delete(checkauth,checkrole,deleteUser);

export default router;