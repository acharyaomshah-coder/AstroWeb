import { SEOHead } from "@/components/SEOHead";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Users, Star, Heart, Sparkles, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export default function About() {
  const credentials = [
    { image: "/gold medal.jpeg", title: "Gold Medalist", subtitle: "Jyotish Aacharya , BVB-Delhi", colSpan: "lg:row-span-2" },
    { image: "/award.jpeg", title: "Excellence Award", subtitle: "Best Astrologer 2023", colSpan: "lg:row-span-2" },
    { image: "/result.jpeg", title: "Outstanding Result", subtitle: "Proven Track Record", colSpan: "lg:row-span-1" },
    { image: "/degree.jpeg", title: "Certified Degree", subtitle: "M.A (Astrology)", colSpan: "lg:row-span-1" },
  ];

  const values = [
    {
      title: "Authenticity",
      description: "Every product is certified and verified by expert gemologists and astrologers"
    },
    {
      title: "Expertise",
      description: "Over 25 years of experience in Vedic astrology and spiritual guidance"
    },
    {
      title: "Quality",
      description: "Premium products sourced from trusted suppliers worldwide"
    },
    {
      title: "Care",
      description: "Personalized attention and support for every customer's spiritual journey"
    }
  ];

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      <SEOHead
        title="About Vedic Intuition - Aacharya Om Shah"
        description="Learn about Aacharya Om Shah and Vedic Intuition, a leading source for Vedic Astrology, Vaastu Shastra, and authentic spiritual products."
        keywords={["About Aacharya Om Shah", "Vedic Intuition Profile", "Astrologer Biography"]}
      />
      <div className="min-h-screen bg-background pb-12">

        {/* About Section */}
        <section className="py-20 bg-background overflow-hidden relative">
          <div className="max-w-6xl mx-auto px-4 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

              {/* Image Side (Matching Homepage Position) */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative flex justify-center order-2 lg:order-1"
                onClick={() => setSelectedImage("/gold medal.jpeg")}
              >
                <div className="relative aspect-[4/5] w-full max-w-[400px] md:max-w-[450px] rounded-xl overflow-hidden border-[12px] border-white bg-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.15)] transition-all duration-500 group">
                  <Image
                    src="/gold medal.jpeg"
                    alt="Gold Medal Achievement"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute bottom-4 right-4 z-20 bg-white/95 backdrop-blur-md p-4 shadow-xl max-w-[180px] text-right pointer-events-none border border-slate-100 rounded-lg">
                    <p className="font-serif text-3xl font-bold text-accent mb-0.5">1st</p>
                    <p className="text-[9px] uppercase tracking-widest font-bold text-slate-800">Gold Medalist</p>
                    <p className="text-[8px] text-slate-400 mt-1 leading-tight">K.N. Rao Institute of Astrology</p>
                  </div>
                </div>
              </motion.div>

              {/* Bio Text Side */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="order-1 lg:order-2"
              >
                <Badge className="bg-accent/10 text-accent mb-6 px-4 py-1.5 uppercase tracking-wider font-semibold">Vedic Astrologer & Vaastu consultant</Badge>
                <h2 className="font-serif text-5xl md:text-6xl font-bold mb-8 leading-tight">
                  Aacharya <span className="text-accent italic">Om Shah</span>
                </h2>

                <div className="space-y-8 text-lg text-muted-foreground leading-relaxed">
                  <p className="border-l-4 border-accent/30 pl-6 py-2">
                    <span className="font-bold text-foreground">Aacharya Om Shah</span> is a <span className="text-[#D4AF37] font-extrabold underline decoration-[#D4AF37]/50">Gold Medalist</span> Astrologer from K.N.Rao Institute of Astrology, Bharati Vidya Bhavan, New Delhi.
                  </p>

                  <p>
                    He holds <span className="text-foreground font-medium">M.A. (Astrology)</span> from UOU , <span className="text-foreground font-medium">Diploma</span> in <span className="text-foreground font-medium">(Vaastu Shastra)</span> from BVB-Delhi & Diploma in <span className="text-foreground font-medium">(Medical Astrology)</span> from SLBS National Sanskrit University.
                    Aacharya Shah is an ex-microbiologist , <span className="text-foreground font-medium">M.Sc. (Microbiology)</span> and <span className="text-foreground font-medium">Pre-PhD (Molecular Medicine).</span> <br />
                    <br /> With Over <span className="text-foreground font-medium">6 years of experience</span> in Vedic Astrology and Vaastu Shastra, he brings remarkable changes in one's life using his astrological predictions, Vaastu, and karmic remedies.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Credentials & Achievements Section (One by One Animation) */}
        <section className="py-20 bg-muted/20">
          <div className="max-w-6xl mx-auto px-4 lg:px-8">
            <div className="text-center mb-20">
              <span className="text-accent text-sm font-bold tracking-widest uppercase mb-2 block">Excellence</span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-foreground">
                Credentials & Recognition
              </h2>
              <div className="w-24 h-1 bg-accent mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[350px] md:auto-rows-[280px]">
              {credentials.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.15 }} // Staggered delay
                  className={`relative group overflow-hidden rounded-xl shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer ${item.colSpan || ""}`}
                  onClick={() => setSelectedImage(item.image)}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-white font-serif text-2xl font-bold mb-1">{item.title}</h3>
                      <p className="text-white/80 text-sm tracking-wide font-light">{item.subtitle}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Core Values Section */}
        <section className="py-20 bg-background">
          <div className="max-w-6xl mx-auto px-4 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Values That Guide Us</h2>
              <p className="text-muted-foreground text-lg">The principles behind our spiritual practice</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:border-accent/50 transition-colors duration-300">
                    <CardContent className="p-8">
                      <h3 className="font-serif text-2xl font-bold mb-3 text-foreground">{value.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <div className="max-w-6xl mx-auto px-4 lg:px-8 mb-20">
          <section className="py-20 vedic-header rounded-[2.5rem]">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="px-4 lg:px-8 text-center relative z-10"
            >
              <Sparkles className="h-12 w-12 text-accent mx-auto mb-6" />
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
                Begin Your Spiritual Transformation
              </h2>
              <p className="text-white/90 text-xl max-w-2xl mx-auto mb-10 font-light">
                Join thousands of satisfied students and clients who have illuminated their paths with Aacharya Om Shah's guidance.
              </p>
            </motion.div>
          </section>
        </div>

        {/* Image Modal */}
        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-[90vw] md:max-w-[80vw] lg:max-w-4xl p-0 bg-transparent border-none shadow-none text-white overflow-hidden flex items-center justify-center">
            <div className="relative w-full h-[80vh]">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-10 right-0 p-2 text-white/80 hover:text-white transition-colors"
                aria-label="Close image"
              >
                <X className="w-8 h-8" />
              </button>
              {selectedImage && (
                <img
                  src={selectedImage}
                  alt="Full view"
                  className="w-full h-full object-contain"
                />
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
