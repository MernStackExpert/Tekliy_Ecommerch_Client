import BrandSlider from "./BrandSlider";

const brands = [
  {
    id: 1,
    name: "Apple",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
  },
  {
    id: 2,
    name: "Samsung",
    logo: "https://www.vectorlogo.zone/logos/samsung/samsung-ar21.svg",
  },
  {
    id: 3,
    name: "Sony",
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/ca/Sony_logo.svg",
  },
  {
    id: 4,
    name: "Asus",
    logo: "https://www.vectorlogo.zone/logos/asus/asus-ar21.svg",
  },
  {
    id: 5,
    name: "Logitech",
    logo: "https://upload.wikimedia.org/wikipedia/commons/1/17/Logitech_logo.svg",
  },
  {
    id: 6,
    name: "Razer",
    logo: "https://upload.wikimedia.org/wikipedia/en/4/40/Razer_snake_logo.svg",
  },
  {
    id: 7,
    name: "HP",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/ad/HP_logo_2012.svg",
  },
  {
    id: 8,
    name: "Lenovo",
    logo: "https://upload.wikimedia.org/wikipedia/commons/b/b8/Lenovo_logo_2015.svg",
  },
  {
    id: 9,
    name: "Intel",
    logo: "https://www.vectorlogo.zone/logos/intel/intel-ar21.svg",
  },
  {
    id: 10,
    name: "Nvidia",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/21/Nvidia_logo.svg",
  },
];

const BrandShowcase = () => {
  return (
    <section className="py-16 bg-white/30 backdrop-blur-sm border-y border-white/10 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 mb-10 text-center md:text-left">
        <h2 className="text-2xl md:text-3xl font-black text-[#001B3D] uppercase tracking-tighter">
          Authorized <span className="text-[#007FFF]">Brand Partners</span>
        </h2>
        <div className="w-16 h-1 bg-[#007FFF] mt-2 rounded-full mx-auto md:mx-0"></div>
      </div>

      <BrandSlider brands={brands} />
    </section>
  );
};

export default BrandShowcase;
