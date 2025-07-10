# Blog Website

A full-stack blog application built with Next.js, MongoDB, and TailwindCSS that mimics the functionality of Medium.

## Features

- **Rich Text Editor**: WYSIWYG editor using React Quill
- **SEO-friendly URLs**: Auto-generated slugs from post titles
- **Admin Dashboard**: Full CRUD operations for blog posts
- **MongoDB Integration**: Persistent data storage
- **Responsive Design**: Mobile-friendly interface
- **Dynamic Meta Tags**: SEO optimization for individual posts

## Tech Stack

- **Frontend**: Next.js, React, TailwindCSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose
- **Rich Text Editor**: React Quill
- **Styling**: TailwindCSS v3+

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd medium-blog-clone
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:
   Create a `.env.local` file in the root directory:

```
MONGODB_URI=mongodb://localhost:27017/medium-blog
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── components/
│   └── RichTextEditor.js    # Rich text editor component
├── lib/
│   └── mongodb.js           # MongoDB connection utility
├── models/
│   └── Post.js              # MongoDB Post model
├── pages/
│   ├── api/
│   │   └── posts/           # API routes for posts
│   ├── admin/               # Admin dashboard pages
│   ├── posts/               # Public post pages
│   ├── _app.js              # App configuration
│   └── index.js             # Home page
├── styles/
│   └── globals.css          # Global styles
├── utils/
│   └── slug.js              # Slug generation utility
└── README.md
```

## API Endpoints

- `GET /api/posts` - Get all posts
- `POST /api/posts/create` - Create a new post
- `GET /api/posts/[slug]` - Get a specific post
- `PUT /api/posts/[slug]` - Update a post
- `DELETE /api/posts/[slug]` - Delete a post

## Usage

### Admin Dashboard

1. Navigate to `/admin` to access the admin dashboard
2. Create new posts with the rich text editor
3. Edit or delete existing posts
4. View all posts in a list format

### Public View

1. Visit the home page to see all published posts
2. Click on any post to read the full content
3. Posts are accessible via SEO-friendly URLs like `/posts/post-title-slug`

## Database Schema

```javascript
{
  title: String,        // Post title
  content: String,      // HTML content from rich text editor
  slug: String,         // SEO-friendly URL slug
  createdAt: Date,      // Auto-generated creation date
  updatedAt: Date       // Auto-generated update date
}
```

## Security Features

- Input sanitization for rich text content
- Unique slug generation and validation
- Error handling for all API endpoints
- MongoDB injection protection via Mongoose

## Deployment

### Vercel Deployment

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### MongoDB Atlas Setup

1. Create a MongoDB Atlas account
2. Create a new cluster
3. Get connection string
4. Update `MONGODB_URI` in environment variables

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, please open an issue in the repository or contact the maintainers.
