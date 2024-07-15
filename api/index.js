import express from "express";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import cookieParser from "cookie-parser";
import multer from "multer";
import { db } from "./db.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../client/public/uploads');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});

const upload = multer({ storage });

app.post('/api/upload', upload.single('file'), function (req, res) {
  const file = req.file;

  if (!file) {
    // Handle the case where no file was uploaded
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // Access file.filename only if the file object is defined
  return res.status(200).json(file.filename);
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

app.get('/admin', (req, res) => {
  // Fetch total number of posts
  db.query('SELECT COUNT(*) AS totalPosts FROM posts', (err, result) => {
    if (err) {
      console.error('Error fetching total posts:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    const totalPosts = result[0].totalPosts;

    // Fetch reported posts
    db.query('SELECT id, title, desc FROM posts WHERE reported = 1', (err, reportedPosts) => {
      if (err) {
        console.error('Error fetching reported posts:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      const responseData = {
        total_posts: totalPosts,
        reported_posts: reportedPosts
      };

      return res.json(responseData);
    });
  });
});

app.listen(8800, () => {
  console.log("Connected!");
});
