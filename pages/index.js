import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
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

  return (
    <>
      <Head>
        <title>Blog - Medium Clone</title>
        <meta
          name="description"
          content="A Medium-like blog platform with rich text editing"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-white">
        {/* Header */}
        <header className="border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div className="flex items-center">
                <h1 className="text-3xl font-bold text-gray-900">Blog</h1>
              </div>
              <nav className="flex space-x-8">
                <Link
                  href="/admin"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Admin Dashboard
                </Link>
              </nav>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Welcome to Our Blog
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover stories, thinking, and expertise from writers on any
                topic.
              </p>
            </div>

            {/* Posts Section */}
            <div className="space-y-8">
              {loading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
                  <p className="mt-4 text-gray-600">Loading posts...</p>
                </div>
              ) : posts.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-gray-500 mb-4">
                    <svg
                      className="mx-auto h-12 w-12"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No posts yet
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Get started by creating your first blog post.
                  </p>
                  <Link
                    href="/admin/create"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                  >
                    Create your first post
                  </Link>
                </div>
              ) : (
                posts.map((post) => (
                  <article
                    key={post._id}
                    className="border-b border-gray-200 pb-8 last:border-b-0"
                  >
                    <div className="group">
                      <Link href={`/posts/${post.slug}`}>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors cursor-pointer">
                          {post.title}
                        </h3>
                      </Link>

                      <div className="flex items-center text-sm text-gray-500 mb-4">
                        <time dateTime={post.createdAt}>
                          {new Date(post.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </time>
                        {post.updatedAt !== post.createdAt && (
                          <span className="ml-2">
                            • Updated{" "}
                            {new Date(post.updatedAt).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                              }
                            )}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <Link
                          href={`/posts/${post.slug}`}
                          className="text-green-600 hover:text-green-700 font-medium"
                        >
                          Read more →
                        </Link>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <Link
                            href={`/admin/edit/${post.slug}`}
                            className="hover:text-gray-700"
                          >
                            Edit
                          </Link>
                        </div>
                      </div>
                    </div>
                  </article>
                ))
              )}
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-200 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <p className="text-gray-600">
                © {new Date().getFullYear()} Blog. Built with Next.js, MongoDB,
                and TailwindCSS.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
