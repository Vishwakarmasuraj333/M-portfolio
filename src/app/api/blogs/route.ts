import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Blog from "@/lib/models/Blog";
import { isAuthenticated } from "@/lib/auth";

const defaultBlogs = [
  {
    _id: "seed-b1",
    title: "Mastering Framer Motion: Volumetric UI & Animations",
    slug: "mastering-framer-motion-volumetric-ui",
    summary: "Discover how to combine webgl canvas elements with Framer Motion spring physics to build fluid, high-fidelity landing pages that feel alive.",
    content: "## The Visual Frontier\n\nFramer motion provides incredibly clean APIs to orchestrate spring physics, layouts, and drag motions. When paired with WebGL or HTML5 canvas backgrounds, it unlocks cinematic fidelity.\n\n### Key Techniques\n\n- **Spring Orchestration**: Avoid linear animations. Use spring stiffness and damping.\n- **Layout Transitions**: Use `layoutId` to animate elements shifting between lists.\n- **Exit Animations**: Always wrap dynamic elements inside `<AnimatePresence>` to achieve fade-out transitions.",
    image: "https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?w=800&auto=format&fit=crop&q=80",
    tags: ["Frontend", "Framer Motion", "React"],
    published: true,
    createdAt: new Date().toISOString(),
  },
  {
    _id: "seed-b2",
    title: "Inside Next.js 16: Dynamic Server Actions & Stream Hooks",
    slug: "inside-nextjs-16-server-actions-stream-hooks",
    summary: "A deep dive into the newest concurrent rendering capabilities of Next.js 16, detailing the optimization of server components.",
    content: "## Next-Gen Server Routing\n\nNext.js 16 standardizes concurrent streaming hooks. We can leverage high-speed static rendering while deferring slow dynamic sections through `<Suspense>` streams.\n\n### Optimization Tips\n\n1. Use partial prerendering for header/hero layers.\n2. Fetch slow API metrics asynchronously via Server Actions.\n3. Cache mongoose connection scopes to bypass redundant database handshakes.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80",
    tags: ["Next.js", "React", "Web Development"],
    published: true,
    createdAt: new Date().toISOString(),
  },
  {
    _id: "seed-b3",
    title: "Building Production-Ready AI Agents with Next.js",
    slug: "building-production-ready-ai-agents",
    summary: "Learn how to architect context-aware AI agents in a Next.js framework, managing conversation histories and streams.",
    content: "## The AI Interface Shift\n\nDeveloping client-facing AI assistants requires rapid text streaming and model orchestrations. By deploying Next.js Route Handlers, we can pipe streaming payloads directly from Gemini or OpenAI APIs.\n\n### Recommended Stack\n\n- **Router**: Next.js App Router API Route Handlers.\n- **Streaming**: Server-Sent Events (SSE).\n- **Database**: MongoDB for conversation histories and cache layers.",
    image: "https://images.unsplash.com/photo-1677442136019-21780efad99a?w=800&auto=format&fit=crop&q=80",
    tags: ["AI", "Next.js", "TypeScript"],
    published: true,
    createdAt: new Date().toISOString(),
  }
];

export async function GET() {
  try {
    const db = await connectDB();
    if (!db) {
      return NextResponse.json(defaultBlogs);
    }

    // Seed default blogs if database is connected but empty
    const count = await Blog.countDocuments();
    if (count === 0) {
      const seedData = defaultBlogs.map(({ _id, ...rest }) => rest);
      await Blog.insertMany(seedData);
    }

    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    return NextResponse.json(blogs);
  } catch (error: any) {
    console.error("Blogs GET error:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch blogs" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    if (!isAuthenticated(req)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { title, slug, summary, content, image, tags, published } = body;

    if (!title || !slug || !summary || !content || !image) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const db = await connectDB();
    if (!db) {
      // Mock mode create
      const mockBlog = {
        _id: "mock-b-" + Math.random().toString(36).substring(2, 9),
        title,
        slug: slug.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        summary,
        content,
        image,
        tags: tags || [],
        published: !!published,
        createdAt: new Date().toISOString(),
      };
      return NextResponse.json({ success: true, blog: mockBlog, message: "Blog created (Mock Mode)" });
    }

    const newBlog = await Blog.create({
      title,
      slug: slug.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      summary,
      content,
      image,
      tags: tags || [],
      published: !!published,
    });

    return NextResponse.json({ success: true, blog: newBlog, message: "Blog created successfully" });
  } catch (error: any) {
    console.error("Blogs POST error:", error);
    return NextResponse.json({ error: error.message || "Failed to create blog" }, { status: 500 });
  }
}
