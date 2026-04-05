import CollectionSlider from "./CollectionSlider";

const collections = [
  {
    id: 1,
    title: "Trending",
    imageUrl: "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?q=80&w=600&auto=format&fit=crop", 
    link: "/trending",
  },
  {
    id: 2,
    title: "New Arrival",
    imageUrl: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=600&auto=format&fit=crop",
    link: "/new-arrival",
  },
  {
    id: 3,
    title: "Signature",
    imageUrl: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?q=80&w=600&auto=format&fit=crop",
    link: "/signature",
  },
  {
    id: 4,
    title: "Stock clearance",
    imageUrl: "https://images.unsplash.com/photo-1511385348-a52b4a160dc2?q=80&w=600&auto=format&fit=crop",
    link: "/clearance",
  },
  {
    id: 5,
    title: "Eco-Friendly",
    imageUrl: "https://images.unsplash.com/photo-1542744095-2918e2f3956c?q=80&w=600&auto=format&fit=crop",
    link: "/eco",
  },
];

const Collection = () => {
  return (
    <section className="max-w-[1440px] mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-6xl font-black text-[#001B3D] tracking-tighter">
          Shop by collection
        </h2>
        <div className="w-24 h-1.5 bg-[#007FFF] mx-auto mt-4 rounded-full"></div>
      </div>

      <CollectionSlider collections={collections} />
    </section>
  );
};

export default Collection;