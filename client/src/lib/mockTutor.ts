export const getMockTutorById = (id: string) => {
  const tutors = [
    {
      id: "1",
      shortBio:
        "I have been a full-time English teacher for 10 years with 6–8 contact hours a day.",
      fullBio:
        "I have met a wide range of students from different nationalities and backgrounds...",
      languages: ["English: Native", "Dutch: Intermediate B1"],
      tagline: "Improve Your Fluency, Accuracy and Confidence With Me",
      price: 24,
      popularity: "12 lesson bookings in the last 48 hours",
      responseTime: "Usually responds in less than an hour",
      reviews: [
        {
          id: 1,
          author: "Duygu",
          date: "April 7, 2025",
          rating: 5,
          comment: "Great tutor, very patient and knowledgeable.",
        },
        {
          id: 2,
          author: "Lucia",
          date: "March 25, 2025",
          rating: 5,
          comment: "Excellent at explaining complex topics.",
        },
      ],
    },
  ];
  return tutors.find((t) => t.id === id);
};
