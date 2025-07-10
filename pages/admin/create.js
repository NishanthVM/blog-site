import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import RichTextEditor from "../../components/RichTextEditor";
import { generateSlug } from "../../utils/slug";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const slug = title ? generateSlug(title) : "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/posts/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });

      const data = await response.json();

      if (data.success) {
        router.push("/admin");
      } else {
        setError(data.message || "Failed to create post");
      }
    } catch (err) {
      setError("An error occurred while creating the post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Create New Post - Admin</title>
      </Head>

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Create New Post
              </h1>
              <button
                onClick={() => router.back()}
                className="text-blue-600 hover:text-blue-900"
              >
                ← Back to Dashboard
              </button>
            </div>

            {error && (
              <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4">
                <p className="text-red-600">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter post title..."
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="slug"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Slug (Auto-generated)
                </label>
                <input
                  type="text"
                  id="slug"
                  value={slug}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600"
                  placeholder="Slug will be generated from title..."
                />
              </div>

              <div>
                <label
                  htmlFor="content"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Content
                </label>
                <RichTextEditor
                  value={content}
                  onChange={setContent}
                  placeholder="Write your story..."
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading || !title || !content}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Creating..." : "Create Post"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
