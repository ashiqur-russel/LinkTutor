import Image from "next/image";
import heroImage from "../../../../public/assets/hero/hero3.svg";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="bg-primary text-white py-16">
      <div className="container mx-auto px-8 flex flex-col md:flex-row items-center gap-8">
        {/* Left Text Content */}
        <div className="md:w-1/2 flex-1 text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            Professional online tutoring <br />
          </h1>
          <p className="mt-4 text-lg">
            With your personal learning partner, you will achieve the success
            you deserve.
          </p>
          <Link href="/tutor">
  <button className="mt-6 btn-primary cursor-pointer text-white px-6 py-3 rounded-md text-lg shadow-md">
    Find a tutor now
  </button>
</Link>
        </div>

        {/* Right Image Content */}

        <div className="flex-none">
          <Image
            src={heroImage}
            alt="Tutoring Session"
            className="w-full rounded-lg shadow-lg"
            style={{ objectFit: "contain", height: "400px", width: "400px" }}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
