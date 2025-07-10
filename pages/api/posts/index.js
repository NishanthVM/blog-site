import connectDB from "../../../lib/mongodb";
import Post from "../../../models/Post";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    await connectDB();

    const posts = await Post.find({})
      .sort({ createdAt: -1 })
      .select("title slug createdAt updatedAt");

    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
