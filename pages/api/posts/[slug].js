import connectDB from "../../../lib/mongodb";
import Post from "../../../models/Post";

export default async function handler(req, res) {
  const { slug } = req.query;

  await connectDB();

  if (req.method === "GET") {
    try {
      const post = await Post.findOne({ slug });

      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      res.status(200).json({
        success: true,
        post: {
          id: post._id,
          title: post.title,
          content: post.content,
          slug: post.slug,
          createdAt: post.createdAt,
          updatedAt: post.updatedAt,
        },
      });
    } catch (error) {
      console.error("Error fetching post:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  } else if (req.method === "PUT") {
    try {
      const { title, content } = req.body;

      if (!title || !content) {
        return res
          .status(400)
          .json({ message: "Title and content are required" });
      }

      const post = await Post.findOneAndUpdate(
        { slug },
        { title, content, updatedAt: new Date() },
        { new: true }
      );

      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      res.status(200).json({
        success: true,
        message: "Post updated successfully",
        post: {
          id: post._id,
          title: post.title,
          content: post.content,
          slug: post.slug,
          updatedAt: post.updatedAt,
        },
      });
    } catch (error) {
      console.error("Error updating post:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  } else if (req.method === "DELETE") {
    try {
      const post = await Post.findOneAndDelete({ slug });

      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      res.status(200).json({
        success: true,
        message: "Post deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting post:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
