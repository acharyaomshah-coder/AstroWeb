import { useRouter } from "next/router";
import Head from "next/head";
import { ProductGrid } from "@/components/ProductGrid";

export default function ProductsCategory() {
  const router = useRouter();
  const { category } = router.query;

  const categoryTitles: Record<string, string> = {
    gemstones: "Premium Gemstones",
    "healing-crystals": "Healing Crystal Bracelets",
    rudraksha: "Authentic Rudraksha Beads",
    vaastu: "Sacred Vaastu Products",
    "spiritual-remedies": "Spiritual Remedies",
    others: "More Spiritual Items"
  };

  const categoryDescriptions: Record<string, string> = {
    gemstones: "Certified natural gemstones carefully selected for their astrological properties and healing powers",
    "healing-crystals": "Handcrafted crystal bracelets designed to balance your energy and promote well-being",
    rudraksha: "Sacred Rudraksha beads blessed and authenticated by expert astrologers",
    vaastu: "Powerful geometric yantras and vaastu tools energized for prosperity and protection",
    "spiritual-remedies": "Traditional spiritual remedies and products for specific planetary afflictions",
    others: "Browse our collection of authentic spiritual products"
  };

  const categoryStr = typeof category === "string" ? category : "";
  const title = categoryTitles[categoryStr] || "All Products";
  const description = categoryDescriptions[categoryStr] || "Browse our collection of authentic spiritual products";

  return (
    <>
      <Head>
        <title>{title} - Divine Astrology</title>
      </Head>
      <div className="min-h-screen bg-background">
        <div className="vedic-header py-10 md:py-10">
          <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-white">
              {title}
            </h1>
            <p className="text-white/90 text-lg max-w-2xl mx-auto">
              {description}
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 lg:px-8 py-10">
          <ProductGrid category={categoryStr} />
        </div>
      </div>
    </>
  );
}
