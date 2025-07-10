import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";

export default function AdminDashboard() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/posts");
      const data = await response.json();
      if (data.success) {
        setPosts(data.posts);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (slug) => {
    if (confirm("Are you sure you want to delete this post?")) {
      try {
        const response = await fetch(`/api/posts/${slug}`, {
          method: "DELETE",
        });

        if (response.ok) {
          fetchPosts();
        }
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };

  return (
    <>
      <Head>
        <title>Admin Dashboard - Blog</title>
      </Head>

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-gray-900">
                Admin Dashboard
              </h1>
              <Link
                href="/admin/create"
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
              >
                Create New Post
              </Link>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading posts...</p>
              </div>
            ) : (
              <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                  {posts.length === 0 ? (
                    <li className="px-6 py-4 text-center text-gray-500">
                      No posts yet. Create your first post!
                    </li>
                  ) : (
                    posts.map((post) => (
                      <li key={post._id} className="px-6 py-4 hover:bg-gray-50">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h3 className="text-lg font-medium text-gray-900">
                              {post.title}
                            </h3>
                            <p className="text-sm text-gray-500">
                              Created:{" "}
                              {new Date(post.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            <Link
                              href={`/posts/${post.slug}`}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              View
                            </Link>
                            <Link
                              href={`/admin/edit/${post.slug}`}
                              className="text-green-600 hover:text-green-900"
                            >
                              Edit
                            </Link>
                            <button
                              onClick={() => handleDelete(post.slug)}
                              className="text-red-600 hover:text-red-900"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
