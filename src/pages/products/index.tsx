import { SEOHead } from "@/components/SEOHead";
import { ProductGrid } from "@/components/ProductGrid";

export default function Products() {
  return (
    <>
      <SEOHead
        title="Spiritual Products & Gemstones - Vedic Intuition"
        description="Browse our collection of authentic, certified gemstones, rudrakshas, and healing crystals."
        keywords={["Buy Gemstones", "Healing Crystals", "Rudraksha", "Vastu Products", "Online Astrological Shop"]}
      />
      <div className="min-h-screen bg-background">
        <div className="vedic-header py-10 md:py-16">
          <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
              All Products
            </h1>
            <p className="text-white/90 text-lg max-w-2xl mx-auto">
              Explore our complete collection of authentic spiritual products and gemstones carefully curated for your well-being
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 lg:px-8 py-10">
          <ProductGrid />
        </div>
      </div>
    </>
  );
}
