import {Router} from "express"
import getuserdata from "../controllers/getuserdata.js"
const router = Router();



router.route("/getdata").get(getuserdata);



export default router;