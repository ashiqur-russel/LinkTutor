export const commonLinks = [
  { label: "HOME", href: "/" },
  { label: "ABOUT US", href: "/about-us" },
  { label: "CONTACT", href: "#" },
  { label: "FAQ", href: "/faq" },
  { label: "BLOG", href: "/blog" },
];

export const studentLinks = [
  { label: "TUTORS", href: "/tutor" },
  { label: "MY REQUEST", href: "/student/lesson-request" },
];

export const tutorLinks = [{ label: "MY OFFER", href: "/tutor/lesson-offer" }];

export const roleBasedLinks: Record<string, { label: string; href: string }[]> =
  {
    student: studentLinks,
    tutor: tutorLinks,
  };
