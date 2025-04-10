export type TutorFormData = {
  name: string;
  email: string;
  password: string;
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  phone: string;
  availability: {
    day: string;
    startTime: string;
    endTime: string;
  }[];
  subjects: string[];
  hourRate: number;
};
