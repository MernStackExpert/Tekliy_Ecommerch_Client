import axios from "axios";
import HeroContent from "./HeroContent";

export const dynamic = "force-dynamic";

const Hero = async () => {
  let banners = [];
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/banners?t=${Date.now()}`);
    banners = res.data;
  } catch (error) {
    console.error("Error fetching banners:", error.message);
  }

  return (
    <section className="relative bg-[var(--surface)]">
      <HeroContent banners={banners} />
    </section>
  );
};

export default Hero;