import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Project from "@/lib/models/Project";
import { isAuthenticated } from "@/lib/auth";

// Default seed projects for showcase when DB is not configured
const defaultProjects = [
  {
    _id: "seed-p1",
    title: "WordPress Business Website",
    description: "A premium corporate website built for an enterprise consultancy. Features custom Gutenberg layouts, fast performance optimization, contact pipelines, and full responsiveness.",
    category: "WordPress Projects",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80",
    liveUrl: "https://wordpress.org",
    githubUrl: "https://github.com",
    techStack: ["WordPress", "Elementor Pro", "Custom CSS", "MySQL", "Yoast SEO"],
    featured: true,
    order: 1,
    createdAt: new Date().toISOString(),
  },
  {
    _id: "seed-p2",
    title: "PHP MySQL Login System",
    description: "A secure authentication module featuring user registration, salted password hashing, login verification, session validation, and account settings panels.",
    category: "PHP MySQL Projects",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80",
    liveUrl: "https://github.com",
    githubUrl: "https://github.com",
    techStack: ["PHP", "MySQL", "HTML/CSS", "JavaScript", "XAMPP"],
    featured: true,
    order: 2,
    createdAt: new Date().toISOString(),
  },
  {
    _id: "seed-p3",
    title: "Responsive Portfolio Website",
    description: "An ultra-premium personal portfolio website featuring smooth animations, space visuals, custom SVG assets, contact logs, and full responsive support.",
    category: "Responsive Design",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80",
    liveUrl: "https://github.com",
    githubUrl: "https://github.com",
    techStack: ["HTML5", "CSS3", "JavaScript", "Bootstrap", "Framer Motion"],
    featured: true,
    order: 3,
    createdAt: new Date().toISOString(),
  },
  {
    _id: "seed-p4",
    title: "Bootstrap Landing Page",
    description: "A fast, fully optimized lead generation landing page built on Bootstrap v5 grids with clean layouts and basic SEO setup.",
    category: "Frontend",
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&auto=format&fit=crop&q=80",
    liveUrl: "https://github.com",
    githubUrl: "https://github.com",
    techStack: ["HTML5", "CSS3", "Bootstrap", "JavaScript", "SEO Basics"],
    featured: true,
    order: 4,
    createdAt: new Date().toISOString(),
  },
  {
    _id: "seed-p5",
    title: "Contact Form with Database",
    description: "A fully validated client submission form that sanitizes input parameters and records structured query entries inside relational MySQL tables.",
    category: "PHP MySQL Projects",
    image: "https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=800&auto=format&fit=crop&q=80",
    liveUrl: "https://github.com",
    githubUrl: "https://github.com",
    techStack: ["PHP Backend", "MySQL", "Bootstrap", "AJAX", "Git"],
    featured: false,
    order: 5,
    createdAt: new Date().toISOString(),
  },
  {
    _id: "seed-p6",
    title: "Blog Website",
    description: "A content-heavy publishing platform utilizing custom WordPress post types, custom taxologies, and dynamic templates, optimized for Core Web Vitals and SEO basics.",
    category: "WordPress Projects",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&auto=format&fit=crop&q=80",
    liveUrl: "https://wordpress.org",
    githubUrl: "https://github.com",
    techStack: ["WordPress CMS", "PHP", "Bootstrap", "Git", "XAMPP"],
    featured: false,
    order: 6,
    createdAt: new Date().toISOString(),
  },
  {
    _id: "seed-p7",
    title: "Product Gallery Website",
    description: "An interactive digital gallery designed for a creative studio. Features advanced filtering, smooth lightbox previews, WooCommerce integrations, and custom template loops.",
    category: "WordPress Projects",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&auto=format&fit=crop&q=80",
    liveUrl: "https://wordpress.org",
    githubUrl: "https://github.com",
    techStack: ["WordPress CMS", "WooCommerce", "Advanced Custom Fields", "JavaScript"],
    featured: false,
    order: 7,
    createdAt: new Date().toISOString(),
  },
  {
    _id: "seed-p8",
    title: "Admin Dashboard UI",
    description: "A sleek, responsive administration control panel interface featuring statistics charts, message boards, and interactive tables.",
    category: "Frontend",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=80",
    liveUrl: "https://github.com",
    githubUrl: "https://github.com",
    techStack: ["HTML5", "CSS3", "Bootstrap", "JavaScript", "ChartJS"],
    featured: false,
    order: 8,
    createdAt: new Date().toISOString(),
  }
];

export async function GET() {
  try {
    const db = await connectDB();
    if (!db) {
      return NextResponse.json(defaultProjects);
    }
    
    // Seed default projects if database is connected but empty
    const count = await Project.countDocuments();
    if (count === 0) {
      // Stripping _id fields to let Mongoose assign proper MongoDB ObjectIds
      const seedData = defaultProjects.map(({ _id, ...rest }) => rest);
      await Project.insertMany(seedData);
    }

    const projects = await Project.find({}).sort({ order: 1, createdAt: -1 });
    return NextResponse.json(projects);
  } catch (error: any) {
    console.error("Projects GET error:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch projects" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    if (!isAuthenticated(req)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { title, description, category, image, liveUrl, githubUrl, techStack, featured, order } = body;

    if (!title || !description || !category || !image) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const db = await connectDB();
    if (!db) {
      // In mock mode, generate a pseudo project with random ID and return it
      const mockProject = {
        _id: "mock-p-" + Math.random().toString(36).substring(2, 9),
        title,
        description,
        category,
        image,
        liveUrl,
        githubUrl,
        techStack: techStack || [],
        featured: !!featured,
        order: Number(order) || 0,
        createdAt: new Date().toISOString(),
      };
      return NextResponse.json({ success: true, project: mockProject, message: "Project created (Mock Mode)" });
    }

    const newProject = await Project.create({
      title,
      description,
      category,
      image,
      liveUrl: liveUrl || "",
      githubUrl: githubUrl || "",
      techStack: techStack || [],
      featured: !!featured,
      order: Number(order) || 0,
    });

    return NextResponse.json({ success: true, project: newProject, message: "Project created successfully" });
  } catch (error: any) {
    console.error("Projects POST error:", error);
    return NextResponse.json({ error: error.message || "Failed to create project" }, { status: 500 });
  }
}
