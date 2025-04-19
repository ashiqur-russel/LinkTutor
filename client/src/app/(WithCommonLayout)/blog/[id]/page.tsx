import { notFound } from "next/navigation";
import { Calendar, User } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
interface BlogPost {
  id: string;
  title: string;
  imageUrl: string;
  author: string;
  date: string;
  details: string;
  category: string;
}

const mockBlogPosts: BlogPost[] = [
  {
    id: "1",
    title: "When are GCSE and A-Level exam results days 2024?",
    imageUrl:
      "https://www.mytutor.co.uk/blog/wp-content/uploads/2024/04/Exam-dates-.jpg",
    author: "John Smith",
    date: "2025-04-10",
    details: `With GCSE and A-Level exams about to begin, we know that a key question for many teens (and their parents too!) is when are results days this year? 

Whether you’re planning when to celebrate or checking your summer holiday won’t clash, we have the dates you need.`,
    category: "Education",
  },
  {
    id: "2",
    title: "A* student: How I revised for my GCSE’s and A Levels",
    imageUrl:
      "https://www.mytutor.co.uk/blog/wp-content/uploads/2025/01/A-tutor-revision-tips.png",
    author: "Jane Doe",
    date: "2025-04-08",
    details: `Hi! I’m Luca – a long-term tutor at LinkTutor and, very proudly, an A* student at both GCSE and A-level. 

I found my preparation for both GCSEs and A-levels very tough but looking back now, I can see how much that experience shaped not only my results but also the way I deal with challenges now. Revision is rarely easy, but I figured out what worked for me, and hopefully, sharing it might be helpful to whoever is reading this..`,
    category: "Technology",
  },
  {
    id: "3",
    title: "MyTutor’s UCAS personal statement toolkit",
    imageUrl:
      "https://www.mytutor.co.uk/blog/wp-content/uploads/2022/07/page-2.jpeg",
    author: "Alice Johnson",
    date: "2025-04-05",
    details: `If you’re thinking of going to uni next year, you’ll need to write your UCAS personal statement as part of your application. If you’re feeling overwhelmed by the thought of getting started – fear not. 

Here, we explain what you should include, how to start and end a personal statement and include some helpful personal statement examples from our tutors (who got into top UK universities). `,
    category: "Lifestyle",
  },
];



export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const {id} = await params;
  const post = await mockBlogPosts.find((p) => p.id === id);

  if (!post) return notFound();

  return (
    <div className="bg-white min-h-screen py-10">
      <div className="container mx-auto px-4 max-w-4xl">
        <Badge className="mb-4 bg-blue-600 text-white">{post.category}</Badge>
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="flex items-center text-gray-600 mb-6">
          <User className="w-4 h-4 mr-2" />
          <span>{post.author}</span>
          <span className="mx-2">•</span>
          <Calendar className="w-4 h-4 mr-2" />
          <span>{post.date}</span>
        </div>
        <div className="relative w-full h-96 mb-6">
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover rounded-md"
          />
        </div>
        <div className="text-lg text-gray-800 leading-relaxed space-y-4">
          {post.details.split("  ").map((para, idx) => (
            <p key={idx}>{para.trim()}</p>
          ))}
        </div>
        <div className="mt-10">
          <Button variant="link" className="text-blue-600">
            <Link href="/blog"> ← Back to articles</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
