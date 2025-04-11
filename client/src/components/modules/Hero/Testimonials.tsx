import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

const Testimonials = () => {
  const testimonials = [
    {
      quote:
        "TutorLink has made managing my tutoring business incredibly easy. My students love the streamlined scheduling!",
      name: "Emily Watson",
      designation: "Private Tutor",
      src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3",
    },
    {
      quote:
        "The payment and session tracking features have saved me so much time. I feel more professional and organized.",
      name: "Michael Rodriguez",
      designation: "Math Tutor",
      src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3",
    },
    {
      quote:
        "Learning has become so much smoother. As a student, I appreciate how easy it is to connect and follow up with my tutor.",
      name: "Sarah Chen",
      designation: "High School Student",
      src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3",
    },
  ];
  return <AnimatedTestimonials testimonials={testimonials} />;
};

export default Testimonials;
