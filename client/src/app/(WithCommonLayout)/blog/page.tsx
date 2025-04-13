"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Calendar, User, ChevronRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

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

const BlogPage = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setPosts(mockBlogPosts);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeInOut" },
    },
  };

  return (
    <div className="bg-white text-gray-900 min-h-screen">
      <header className="py-20 bg-gradient-to-br from-blue-100 to-white shadow-sm">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold">
            Latest News & Articles
          </h1>
          <p className="text-gray-600 text-lg sm:text-xl mt-4 max-w-3xl mx-auto">
            Stay up-to-date with the latest insights and expert opinions.
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="animate-spin text-4xl text-gray-500" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {posts.map((post) => (
              <motion.div
                key={post.id}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
              >
                <Card className="hover:shadow-xl transition-shadow duration-300">
                  <div className="relative w-full h-56">
                    <Image
                      src={post.imageUrl}
                      alt={post.title}
                      fill
                      priority
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover rounded-t-lg"
                    />
                    <Badge className="absolute top-4 left-4 bg-blue-600 text-white">
                      {post.category}
                    </Badge>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-gray-500 text-sm mb-2">
                      <User className="mr-1 h-4 w-4" />
                      <span>{post.author}</span>
                      <span className="mx-2">•</span>
                      <Calendar className="mr-1 h-4 w-4" />
                      <span>{post.date}</span>
                    </div>
                    <p className="text-gray-700 line-clamp-3">{post.details}</p>
                    <Button
                      variant="link"
                      className="text-blue-600 pl-0 mt-3 hover:text-blue-500"
                      onClick={() => router.push(`/blog/${post.id}`)}
                    >
                      Read More <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default BlogPage;
