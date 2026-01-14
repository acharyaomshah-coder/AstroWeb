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
    { image: "/bio.jpeg", title: "Leading Spiritual Guide", subtitle: "25+ Years of Service", colSpan: "md:col-span-2 lg:col-span-1 row-span-2" },
    { image: "/award.jpeg", title: "Excellence Award", subtitle: "Best Astrologer 2023" },
    { image: "/gold medal.jpeg", title: "Gold Medalist", subtitle: "Academic Excellence" },
    { image: "/degree.jpeg", title: "Certified Degree", subtitle: "Master in Astrology" },
    { image: "/result.jpeg", title: "Outstanding Results", subtitle: "Proven Track Record" },
    { image: "/bio2.jpeg", title: "Dedicated Mentor", subtitle: "Teaching Future Astrologers", colSpan: "lg:col-span-2" },
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

        {/* Hero Bio Section */}
        <section className="relative flex items-start justify-center overflow-hidden pt-4 pb-12 lg:pt-8 lg:pb-16 bg-[#f8fafc]">
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

              {/* Bio Text */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="space-y-6 order-2 lg:order-1 mt-4 lg:mt-6"
              >
                <div className="space-y-3">
                  <Badge className="bg-blue-50 text-blue-600 hover:bg-blue-100 border-blue-100 px-4 py-1 text-[10px] font-bold uppercase tracking-widest shadow-sm">
                    Vedic Astrologer & Mentor
                  </Badge>
                  <h1 className="font-serif text-5xl md:text-6xl font-bold leading-tight">
                    <span className="text-slate-900">Aacharya</span> <br />
                    <span className="text-accent italic drop-shadow-sm font-serif">Om Shah</span>
                  </h1>
                </div>

                <div className="space-y-4 text-md md:text-lg text-slate-600 leading-relaxed font-light">
                  <p>
                    <span className="font-semibold text-slate-900">Aacharya Om Shah</span> is a <span className="text-accent font-semibold underline decoration-accent/20 underline-offset-4">Gold Medalist Astrologer</span> (Jyotish Aacharya) from K.N. Rao Institute of Astrology, Bhartiya Vidya Bhawan & Batch Topper (Diploma in Medical Astrology) from SLBS National Sanskrit University, New Delhi.
                  </p>

                  <p>
                    He also holds a <span className="font-medium text-slate-900 border-b border-slate-200">Master's Degree in Medical Microbiology</span> & Pre PhD in Molecular Medicine.
                  </p>

                  <div className="pl-4 border-l-4 border-accent/20 italic bg-white/50 py-3 rounded-r-xl text-sm md:text-base">
                    <p className="text-slate-500">
                      "His expertise includes Financial Astrology, Medical Astrology, Career Counseling, Marriage/Relationship Astrology, Prashna, Varshaphal, Muhurta & Astro-Vaastu."
                    </p>
                  </div>

                  <p className="text-sm md:text-base">
                    He actively teaches Astrology and Vaastu to Diploma and M.A. students, sharing rare techniques like <span className="text-accent font-medium">Sarbatobhadra Chakra</span>.
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200">
                  <p className="font-serif text-2xl text-slate-900">Aacharya Om Shah</p>
                  <p className="text-[10px] text-slate-400 uppercase tracking-[0.3em] mt-1 font-bold">Spiritual Guide & Mentor</p>
                </div>
              </motion.div>

              {/* Side Photo - Gold Medal */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="relative order-1 lg:order-2 cursor-pointer pt-2 lg:pt-4"
                onClick={() => setSelectedImage("/gold medal.jpeg")}
              >
                <div className="relative aspect-[4/5] w-full max-w-[340px] md:max-w-[380px] lg:ml-auto rounded-xl overflow-hidden border-[10px] border-white bg-white shadow-[0_15px_40px_rgba(0,0,0,0.08)] hover:shadow-[0_25px_50px_rgba(0,0,0,0.12)] transition-all duration-500 group">
                  <div className="absolute inset-0 border border-slate-100 z-10 pointer-events-none rounded-sm"></div>
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
                {/* Decorative elements */}
                <div className="absolute -z-10 top-[-30px] right-[-30px] w-64 h-64 bg-blue-100/50 rounded-full blur-3xl"></div>
                <div className="absolute -z-10 bottom-[-30px] left-[-30px] w-64 h-64 bg-accent/10 rounded-full blur-3xl"></div>
              </motion.div>

            </div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1, repeat: Infinity, repeatType: "reverse" }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-300"
          >
            <div className="w-px h-12 bg-gradient-to-b from-transparent via-current to-transparent mx-auto mb-2"></div>
            <p className="text-[9px] uppercase tracking-[0.3em] font-bold">Discover More</p>
          </motion.div>
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 auto-rows-[300px]">
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
