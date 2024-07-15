import express from "express"
import { addPost, deletePost, updatePost, getPosts, getPost, unreportBlog, reportBlog, getAdminInfo } from "../controllers/post.js"

const router = express.Router()

router.get("/",getPosts)
router.get("/:id",getPost)
router.post("/",addPost)
router.delete("/:id",deletePost)
router.put("/:id",updatePost)
router.post("/unreportBlog/:id", unreportBlog);
router.post("/:id/report", reportBlog);
//router.get('/:id/report-reasons', getReportReasons);
router.get('/admin-info', getAdminInfo);




export default router