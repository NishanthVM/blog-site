import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";

export default function PostPage() {
  const router = useRouter();
  const { slug } = router.query;
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (slug) {
      fetchPost();
    }
  }, [slug]);

  const fetchPost = async () => {
    try {
      const response = await fetch(`/api/posts/${slug}`);
      const data = await response.json();

      if (data.success) {
        setPost(data.post);
      } else {
        setError("Post not found");
      }
    } catch (err) {
      setError("Failed to fetch post");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading post...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Post Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            {error || "The post you are looking for does not exist."}
          </p>
          <Link
            href="/"
            className="text-green-600 hover:text-green-700 font-medium"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{post.title} - Blog</title>
        <meta
          name="description"
          content={post.content.replace(/<[^>]*>/g, "").substring(0, 160)}
        />
        <meta property="og:title" content={post.title} />
        <meta
          property="og:description"
          content={post.content.replace(/<[^>]*>/g, "").substring(0, 160)}
        />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`${process.env.NEXT_PUBLIC_SITE_URL}/posts/${post.slug}`}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta
          name="twitter:description"
          content={post.content.replace(/<[^>]*>/g, "").substring(0, 160)}
        />
      </Head>

      <article className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link
              href="/admin"
              className="text-green-600 hover:text-green-700 font-medium"
            >
              ← Back to Admin Dashboard
            </Link>
          </div>

          <header className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center text-gray-500 text-sm space-x-4">
              <time dateTime={post.createdAt}>
                {new Date(post.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              {post.updatedAt !== post.createdAt && (
                <span>
                  • Updated{" "}
                  {new Date(post.updatedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              )}
            </div>
          </header>

          <div
            className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-green-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-blockquote:border-green-500 prose-blockquote:text-gray-700"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <footer className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">
                Published on {new Date(post.createdAt).toLocaleDateString()}
              </div>
              <Link
                href={`/admin/edit/${post.slug}`}
                className="text-green-600 hover:text-green-700 font-medium"
              >
                Edit Post
              </Link>
            </div>
          </footer>
        </div>
      </article>
    </>
  );
}
