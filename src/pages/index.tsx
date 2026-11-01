import Link from "next/link";
import Image from "next/image";
import { SEOHead } from "@/components/SEOHead";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Shield, Award, TrendingUp, CheckCircle2, ArrowRight, Zap, Sunrise, Clock, Sun, Moon, Settings, Home as HomeIcon, XCircle, Car, ShoppingBag, Info } from "lucide-react";
import { BlogSection } from "@/components/BlogSection";
import { FAQSection } from "@/components/FAQSection";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Mail, Phone, MapPin, Play, ExternalLink, GraduationCap, Microscope, BookOpen, Calendar as CalendarIcon } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { toast } from "@/hooks/use-toast";
import { Calendar } from "@/components/ui/calendar";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface Course {
  id: string;
  title: string;
  description: string;
  price: string;
  thumbnail: string;
}

export default function Home() {
  // Zodiac sign metadata (symbols and colors)
  const zodiacMeta: Record<string, { symbol: string; color: string; image: string }> = {
    aries: { symbol: "♈", color: "from-red-500 to-orange-500", image: "/aries.jpeg" },
    taurus: { symbol: "♉", color: "from-green-600 to-emerald-500", image: "/tauraus.jpeg" },
    gemini: { symbol: "♊", color: "from-yellow-500 to-amber-500", image: "/gemini.jpeg" },
    cancer: { symbol: "♋", color: "from-blue-600 to-cyan-500", image: "/cancer.jpeg" },
    leo: { symbol: "♌", color: "from-orange-500 to-red-500", image: "/leo.jpeg" },
    virgo: { symbol: "♍", color: "from-emerald-600 to-teal-500", image: "/virgo.jpeg" },
    libra: { symbol: "♎", color: "from-pink-500 to-rose-500", image: "/libra.jpeg" },
    scorpio: { symbol: "♏", color: "from-purple-600 to-indigo-500", image: "/scorpio.jpeg" },
    sagittarius: { symbol: "♐", color: "from-violet-600 to-purple-500", image: "/sagittarius.jpeg" },
    capricorn: { symbol: "♑", color: "from-slate-600 to-gray-600", image: "/capricon.jpeg" },
    aquarius: { symbol: "♒", color: "from-cyan-500 to-blue-500", image: "/aqarius.jpeg" },
    pisces: { symbol: "♓", color: "from-teal-500 to-green-500", image: "/pisces.jpeg" },
  };

  // State for horoscope data
  const [horoscope, setHoroscope] = useState<Array<{ sign: string; prediction: string; symbol: string; color: string; image: string }>>([]);
  const [isLoadingHoroscope, setIsLoadingHoroscope] = useState(true);

  // Fetch horoscope data from API
  useEffect(() => {
    const fetchHoroscopes = async () => {
      try {
        const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
        const response = await fetch(`/api/horoscope?date=${today}`);

        if (response.ok) {
          const data = await response.json();

          // Define the serial order
          const signOrder = [
            "aries", "taurus", "gemini", "cancer", "leo", "virgo",
            "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces"
          ];

          // Create a map of existing data
          const dataMap = new Map();
          data.forEach((item: any) => dataMap.set(item.sign.toLowerCase(), item));

          // Generate all 12 signs in order
          const formattedHoroscopes = signOrder.map(signKey => {
            const item = dataMap.get(signKey);
            return {
              sign: signKey.charAt(0).toUpperCase() + signKey.slice(1),
              prediction: item?.love || "Discover what the stars have in store for " + signKey + " today. Check back later for your update.",
              symbol: zodiacMeta[signKey]?.symbol || "⭐",
              color: zodiacMeta[signKey]?.color || "from-blue-900 to-blue-800",
              image: zodiacMeta[signKey]?.image || ""
            };
          });

          setHoroscope(formattedHoroscopes);
        } else {
          // Fallback to default message if no data (already ordered by Object.keys if defined in order)
          const signOrder = ["aries", "taurus", "gemini", "cancer", "leo", "virgo", "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces"];
          setHoroscope(signOrder.map(sign => ({
            sign: sign.charAt(0).toUpperCase() + sign.slice(1),
            prediction: "Check back later for your daily prediction.",
            symbol: zodiacMeta[sign].symbol,
            color: zodiacMeta[sign].color,
            image: zodiacMeta[sign].image
          })));
        }
      } catch (error) {
        console.error("Error fetching horoscopes:", error);
        // Fallback to default message on error
        setHoroscope(Object.keys(zodiacMeta).map(sign => ({
          sign: sign.charAt(0).toUpperCase() + sign.slice(1),
          prediction: "Check back later for your daily prediction.",
          symbol: zodiacMeta[sign].symbol,
          color: zodiacMeta[sign].color,
          image: zodiacMeta[sign].image
        })));
      } finally {
        setIsLoadingHoroscope(false);
      }
    };

    fetchHoroscopes();
  }, []);

  // State for muhurat data
  const [muhurat, setMuhurat] = useState<any>(null);
  const [isLoadingMuhurat, setIsLoadingMuhurat] = useState(true);

  // Fetch monthly muhurat data from API
  useEffect(() => {
    const fetchMuhurat = async () => {
      try {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const currentMonth = `${year}-${month}`; // YYYY-MM
        const response = await fetch(`/api/muhurat?month=${currentMonth}`);

        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) {
            setMuhurat(data[0]);
          }
        }
      } catch (error) {
        console.error("Error fetching muhurat:", error);
      } finally {
        setIsLoadingMuhurat(false);
      }
    };

    fetchMuhurat();
  }, []);

  // State for panchang data
  const [panchang, setPanchang] = useState<any>(null);
  const [isLoadingPanchang, setIsLoadingPanchang] = useState(true);

  // Fetch daily panchang data from API
  useEffect(() => {
    const fetchPanchang = async () => {
      try {
        const today = new Date().toISOString().split('T')[0];
        const response = await fetch(`/api/panchang?date=${today}`);

        if (response.ok) {
          const data = await response.json();
          setPanchang(data);
        }
      } catch (error) {
        console.error("Error fetching panchang:", error);
      } finally {
        setIsLoadingPanchang(false);
      }
    };
    fetchPanchang();
  }, []);

  // State for videos
  const { data: videos, isLoading: isLoadingVideos } = useQuery<any[]>({
    queryKey: ["/api/videos"],
    queryFn: async () => {
      const response = await fetch("/api/videos");
      if (!response.ok) throw new Error("Failed to fetch videos");
      return response.json();
    }
  });

  // State for courses
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoadingCourses, setIsLoadingCourses] = useState(true);

  // Fetch courses data from Supabase
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data, error } = await supabase
          .from("courses")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;

        if (data) {
          const sortedCourses = [...data].sort((a, b) => {
            const getIndex = (title: string) => {
              const t = title.toLowerCase();
              if (t.includes("basic vaastu")) return 0;
              if (t.includes("advanced vaastu")) return 1;
              if (t.includes("predictive astrology")) {
                if (t.includes("ii")) return 3;
                if (t.includes("i")) return 2;
              }
              if (t.includes("remedial")) return 4;
              if (t.includes("mundane")) return 5;
              return 6;
            };
            return getIndex(a.title) - getIndex(b.title);
          });
          setCourses(sortedCourses.slice(0, 3));
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setIsLoadingCourses(false);
      }
    };

    fetchCourses();
  }, []);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const credentials = [
    { image: "/gold medal.jpeg", title: "Gold Medalist", subtitle: "Jyotish Aacharya , BVB-Delhi", colSpan: "lg:row-span-2" },
    { image: "/award.jpeg", title: "Excellence Award", subtitle: "Best Astrologer 2023", colSpan: "lg:row-span-2" },
    { image: "/photo_2026-10-28_22-43-11.jpg", title: "M.A. in Astrology", subtitle: "Uttarakhand Open University (First Div)", colSpan: "lg:row-span-2" },
    { image: "/result.jpeg", title: "Outstanding Result", subtitle: "Proven Track Record", colSpan: "lg:row-span-1" },
    { image: "/degree.jpeg", title: "Certified Degree", subtitle: "Diploma in Medical Astrology", colSpan: "lg:row-span-1" },
  ];


  // Booking state
  const [bookingDate, setBookingDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [consultationType, setConsultationType] = useState("");

  const [services, setServices] = useState<any[]>([]);
  const [isLoadingServices, setIsLoadingServices] = useState(true);

  // Fetch consultations dynamically
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data, error } = await supabase
          .from("consultations")
          .select("*")
          .order("position", { ascending: true });

        if (!error && data) {
          setServices(data);
        } else {
            setServices([]); // fallback
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setIsLoadingServices(false);
      }
    };
    fetchServices();
  }, []);

  const timeSlots = [
    { label: "09:00 AM - 10:00 AM", short: "9:00 - 10:00 AM", period: "Morning Slot 1" },
    { label: "10:00 AM - 11:00 AM", short: "10:00 - 11:00 AM", period: "Morning Slot 2" },
    { label: "11:00 AM - 12:00 PM", short: "11:00 AM - 12:00 PM", period: "Midday Slot 1" },
    { label: "12:00 PM - 01:00 PM", short: "12:00 - 1:00 PM", period: "Midday Slot 2" },
  ];

  const handleBookingSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (!consultationType) {
      toast({
        title: "Selection Required",
        description: "Please select a consultation service first.",
        variant: "destructive"
      });
      return;
    }

    const name = (form.querySelector("#name") as HTMLInputElement)?.value;
    const phone = (form.querySelector("#phone") as HTMLInputElement)?.value;
    const birthDetails = (form.querySelector("#birth-details") as HTMLInputElement)?.value;
    const birthPlace = (form.querySelector("#birth-place") as HTMLInputElement)?.value;
    const message = (form.querySelector("#message") as HTMLTextAreaElement)?.value;

    const whatsappMessage = `Hello Aacharya Om shah,%0A%0AI would like to book a *${consultationType}* consultation.%0A%0A*Name:* ${name}%0A*Phone:* ${phone}%0A*Birth Details:* ${birthDetails}%0A*Birth Place:* ${birthPlace}%0A*Preferred Date:* ${bookingDate?.toLocaleDateString()}%0A*Preferred Time:* ${selectedTime}%0A%0A*Additional Message:* ${message || "N/A"}`;
    const adminPhoneNumber = "918527530910";
    window.open(`https://wa.me/${adminPhoneNumber}?text=${whatsappMessage}`, "_blank");
  };


  const features = [
    {
      icon: Shield,
      title: "100% Authentic",
      description: "Vedic wisdom backed by scientific research & ancient scriptures"
    },
    {
      icon: Award,
      title: "Academic Excellence",
      description: "Guidance from Gold Medalist Jyotish Acharya and researchers"
    },
    {
      icon: TrendingUp,
      title: "Proven Results",
      description: "Thousands of satisfied clients with life transformations"
    }
  ];

  const benefits = [
    "Expert astrology consultations",
    "Comprehensive Astrology & Vaastu Courses",
    "Personalized recommendations",
    "Secure online payments",
    "100% satisfaction guarantee"
  ];

  return (
    <>
      <SEOHead
        title="Vedic Intuition - Expert Astrology & Vaastu Consultations & Courses"
        description="Vedic Intuition offers expert Astrology and Vaastu consultation and certified courses to engineer your karma and holistic prosperity with scientific remedies."
        keywords={["Astrology Courses", "Vaastu Courses", "Spiritual Guidance", "Remedies", "Vedic Astrology", "Vastu Shastra"]}
        image="/favicon.png"
      />
      <div className="min-h-screen">
        {/* 1. Hero Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 w-full h-full">
            <video
              className="absolute top-1/2 left-1/2 w-full h-full object-cover -translate-x-1/2 -translate-y-1/2"
              autoPlay
              muted
              loop
              playsInline
            >
              <source src="/videoplayback.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-b from-blue-950/50 via-blue-950/40 to-slate-950/60"></div>
          </div>

          <div className="relative z-10 px-8 text-center">
            {/* SEO Optimized H1 - Visually Hidden */}
            <h1 className="sr-only">Vedic Intuition</h1>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 max-w-4xl mx-auto leading-tight"
            >
              Decode Your <span className="text-[#D4AF37] font-serif   decoration-double decoration-[#D4AF37]/50">Prārabdha</span> & <br />
              Engineer Your <span className="text-[#D4AF37]  font-serif decoration-double decoration-[#D4AF37]/50">Karma</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base md:text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto leading-relaxed"
            >
              Transform your life with personalized Astrology & Vaastu guidance!
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link href="/book-appointment">
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 min-w-[200px]">
                  Book Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/courses">
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 min-w-[200px]">
                  Astrology & Vaastu Courses
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* 2. About Section */}
        <section className="py-20 bg-background overflow-hidden">
          <div className="max-w-6xl mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative flex justify-center order-2 lg:order-1"
              >
                <div
                  className="max-w-md w-full aspect-[4/5] rounded-2xl overflow-hidden border-8 border-muted shadow-2xl relative cursor-pointer group"
                  onClick={() => setSelectedImage("/WhatsApp Image 2026-01-03 at 17.07.18.jpeg")}
                >
                  <Image src="/WhatsApp Image 2026-01-03 at 17.07.18.jpeg" alt="Aacharya Om Shah" fill className="object-cover object-top transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500"></div>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="order-1 lg:order-2"
              >
                <h2 className="font-serif text-4xl md:text-5xl font-bold mb-8 leading-tight">
                  Aacharya <span className="text-accent italic">Om Shah</span>
                </h2>

                <div className="space-y-6 text-base text-muted-foreground leading-relaxed">
                  <p className="border-l-4 border-accent/30 pl-6 py-2">
                    <span className="font-bold text-foreground">Acharya Om Shah</span> is an acclaimed Vedic Astrologer, currently pursuing <span className="text-foreground font-bold">Ph.D. in Astrology</span> from <span className="text-foreground font-medium">Kumar Bhaskar Varma Sanskrit & Ancient Studies University</span>, Assam. He holds <span className="text-foreground font-bold">M.A. in Astrology</span> from <span className="text-foreground font-medium">UOU, Uttarakhand</span>.
                  </p>

                  <p>
                    He was awarded <span className="text-[#D4AF37] font-extrabold decoration-accent/20">Gold Medal</span> in <span className="text-foreground font-bold">Jyotish Acharya</span> from <span className="text-foreground font-medium">Bhartiya Vidya Bhawan, Delhi-Kendra</span> & <span className="text-foreground font-bold">Diploma in Medical Astrology</span> from <span className="text-foreground font-medium">Shri Lal Bahadur Shastri National Sanskrit University</span>, New Delhi.
                  </p>

                  <p>
                    He is an ex-microbiologist (<span className="text-foreground font-bold">M.Sc. Medical Microbiology</span> from <span className="text-foreground font-medium">TU, Kathmandu</span> & <span className="text-foreground font-bold">Pre Ph.D. Molecular Medicine</span> from <span className="text-foreground font-medium">JNU, New Delhi</span>).
                  </p>

                  <p>
                    With over <span className="text-foreground font-bold">eight years of experience</span> in <span className="text-foreground font-bold">Vedic Astrology</span> & solid academic foundation in astrology and natural science, he has developed a scientific method to understand one’s karmic problems and try to solve with <span className="text-foreground font-bold">validated & practical remedies</span>. His predictions are accurate and deep rooted in <span className="text-foreground font-bold">complex astrological mathematics and techniques</span>.
                  </p>
                </div>
              </motion.div>
            </div>


          </div>
        </section>

        {/* 3. Book Consultation Section */}
        <section className="py-20 bg-muted/30">
          <div className="max-w-6xl mx-auto px-4 lg:px-8 mb-12">
            <div className="vedic-header py-10 text-center relative z-10 rounded-2xl shadow-lg border border-white/5">
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Book Your Consultation</h2>
              <p className="text-white/90 text-base max-w-2xl mx-auto">Get personalized astrology guidance from our expert Astrologers</p>
            </div>
          </div>
          <div className="max-w-6xl mx-auto px-4 lg:px-8">

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="lg:col-span-1">
                <Card className="h-full">
                  <CardContent className="p-6 text-center space-y-4">
                    <div className="relative mb-2">
                      <Avatar className="w-32 h-32 mx-auto border-4 border-accent/20">
                        <AvatarImage src="/WhatsApp Image 2026-01-03 at 17.07.18.jpeg" className="object-cover" />
                        <AvatarFallback>AOS</AvatarFallback>
                      </Avatar>
                    </div>
                    <div>
                      <h3 className="font-serif text-2xl font-bold">Aacharya Om Shah</h3>
                      <p className="text-accent font-medium text-sm">Astrologer</p>
                      <p className="text-muted-foreground text-xs italic">(Karmic Consultant)</p>
                    </div>

                    <div className="space-y-3 text-[11px] text-muted-foreground border-t pt-4 text-left">
                      <p className="flex items-start gap-3">
                        <Badge variant="outline" className="w-[60px] h-4 px-0 justify-center text-[9px] uppercase flex-shrink-0">Acharya</Badge>
                        <span className="flex-1">Jyotish, BVB-Delhi (Gold Medal)</span>
                      </p>
                      <p className="flex items-start gap-3">
                        <Badge variant="outline" className="w-[60px] h-4 px-0 justify-center text-[9px] uppercase flex-shrink-0">Diploma</Badge>
                        <span className="flex-1">Medical Astrology, Vaastu Shastra & Palmistry</span>
                      </p>
                      <p className="flex items-start gap-3">
                        <Badge variant="outline" className="w-[60px] h-4 px-0 justify-center text-[9px] uppercase flex-shrink-0">Academic</Badge>
                        <span className="flex-1">PhD(Astrology) Research Scholar <br /> M.A.(Astrology) <br /> Pre-PhD (Molecular Medicine) <br /> M.Sc.(Medical Microbiology)</span>
                      </p>
                    </div>

                    <div className="pt-4 border-t">
                      <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Consultation Fee</p>
                      <div className="font-bold text-accent text-lg">
                        {services.find(s => s.name === consultationType)?.price || "Select Service"}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="lg:col-span-2">
                <Card>
                  <CardContent className="p-8">
                    <form onSubmit={handleBookingSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Full Name</Label>
                          <Input id="name" placeholder="Your Name" required />
                        </div>
                        <div className="space-y-2">
                          <Label>Phone Number</Label>
                          <Input id="phone" placeholder="Your Phone" required />
                        </div>
                        <div className="space-y-2">
                          <Label>Date & Time of Birth</Label>
                          <Input id="birth-details" placeholder="15 Aug 1990, 10:30 AM" required />
                        </div>
                        <div className="space-y-2">
                          <Label>Place of Birth</Label>
                          <Input id="birth-place" placeholder="City, State, Country" required />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <Label>Select Service</Label>
                        <div className="grid grid-cols-1 gap-3">
                          {services.map((service) => (
                            <div
                              key={service.id}
                              onClick={() => setConsultationType(service.name)}
                              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${consultationType === service.name ? "border-accent bg-accent/5" : "border-border"
                                }`}
                            >
                              <div className="flex justify-between items-center mb-1">
                                <h4 className="font-bold">{service.name}</h4>
                                <span className="text-accent font-bold">{service.price}</span>
                              </div>
                              <p className="text-xs text-muted-foreground">{service.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label>Select Date</Label>
                          <div className="border rounded-md p-2 flex justify-center bg-background">
                            <Calendar
                              mode="single"
                              selected={bookingDate}
                              onSelect={setBookingDate}
                              disabled={(d) => d < new Date() || d.getDay() === 0}
                            />
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <Label className="text-sm font-semibold">Select Time Slot</Label>
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5 text-accent" /> 60 mins / slot
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {timeSlots.map((slot) => {
                              const isSelected = selectedTime === slot.label;
                              return (
                                <button
                                  key={slot.label}
                                  type="button"
                                  onClick={() => setSelectedTime(slot.label)}
                                  className={`relative text-left p-3 rounded-xl border transition-all duration-200 flex items-center justify-between group ${
                                    isSelected
                                      ? "bg-accent/10 border-accent shadow-sm ring-2 ring-accent/30"
                                      : "bg-background/80 hover:bg-muted/50 border-border/70 hover:border-accent/40"
                                  }`}
                                >
                                  <div className="space-y-0.5">
                                    <div className="flex items-center gap-1.5">
                                      <span className={`text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-full ${
                                        isSelected ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"
                                      }`}>
                                        {slot.period}
                                      </span>
                                    </div>
                                    <p className={`text-xs font-semibold ${isSelected ? "text-accent" : "text-foreground group-hover:text-accent"} transition-colors`}>
                                      {slot.label}
                                    </p>
                                  </div>

                                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                                    isSelected
                                      ? "bg-accent border-accent text-white"
                                      : "border-muted-foreground/30 group-hover:border-accent/50"
                                  }`}>
                                    {isSelected ? (
                                      <CheckCircle2 className="w-3.5 h-3.5" />
                                    ) : (
                                      <span className="w-1.5 h-1.5 rounded-full bg-transparent group-hover:bg-accent/40" />
                                    )}
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                          <div className="space-y-2">
                            <Label>Additional Message</Label>
                            <Textarea id="message" placeholder="Optional questions..." rows={3} />
                          </div>
                        </div>
                      </div>

                      <Button type="submit" size="lg" className="w-full bg-accent hover:bg-accent/90">
                        Book via WhatsApp
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* 3.5. Educational Courses Section */}
        <section className="py-20 bg-background">
          <div className="max-w-6xl mx-auto px-4 lg:px-8 mb-12">
            <div className="vedic-header py-10 text-center relative z-10 rounded-2xl shadow-lg border border-white/5">
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Astrology & Vaastu  Courses</h2>
              <p className="text-white/90 text-base max-w-2xl mx-auto">Learn the ancient Vedic Astrology and Vaastu with Aacharya Om Shah.</p>
            </div>
          </div>
          <div className="max-w-6xl mx-auto px-4 lg:px-8">
            {isLoadingCourses ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-[400px] bg-muted animate-pulse rounded-2xl" />
                ))}
              </div>
            ) : courses.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {courses.map((course) => (
                    <motion.div
                      key={course.id}
                      whileHover={{ y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="group"
                    >
                      <Card className="h-full flex flex-col overflow-hidden border-primary/10 hover:shadow-2xl transition-all duration-500">
                        <div className="relative aspect-video overflow-hidden">
                          <Image
                            src={course.thumbnail}
                            alt={course.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                            <span className="text-white font-medium">View Course Details</span>
                          </div>
                        </div>

                        <CardContent className="p-6 flex-grow flex flex-col">
                          <h3 className="font-serif text-xl font-bold text-primary mb-3 line-clamp-2">
                            {course.title}
                          </h3>
                          <div className="flex items-baseline gap-2">
                            <span className="text-lg font-bold text-accent">₹{Math.floor(parseFloat(course.price)).toLocaleString()} + 18% GST</span>
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-3 mb-6 flex-grow">
                            {course.description}
                          </p>
                          <Link href={`/courses/enquiry/${course.id}`} className="w-full">
                            <Button className="w-full bg-accent hover:bg-accent/90">
                              Enroll Now
                            </Button>
                          </Link>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
                <div className="text-center mt-12">
                  <Link href="/courses">
                    <Button variant="outline" size="lg" className="border-accent text-accent hover:bg-accent hover:text-white">
                      See More Courses
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No courses available at the moment. Please check back later.</p>
              </div>
            )}
          </div>
        </section>



        {/* 5. Academic Excellence Section */}
        <section className="py-20 bg-muted/30">
          <div className="max-w-6xl mx-auto px-4 lg:px-8 mb-12">
            <div className="vedic-header py-10 text-center relative z-10 rounded-2xl shadow-lg border border-white/5">
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Academic Excellence & Recognition</h2>
              <div className="w-24 h-1 bg-accent mx-auto"></div>
            </div>
          </div>
          <div className="max-w-6xl mx-auto px-4 lg:px-8">

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[350px] md:auto-rows-[280px]">
              {credentials.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative group overflow-hidden rounded-xl shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer ${item.colSpan || ""}`}
                  onClick={() => setSelectedImage(item.image)}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover object-top transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <h4 className="text-white font-serif text-2xl font-bold mb-1">{item.title}</h4>
                      <p className="text-white/80 text-sm tracking-wide font-light">{item.subtitle}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Blogs Section */}
        <section className="py-20 bg-background">
          <div className="max-w-6xl mx-auto px-4 lg:px-8 mb-12">
            <div className="vedic-header py-10 text-center relative z-10 rounded-2xl shadow-lg border border-white/5">
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Vedic Intuition Blogs</h2>
              <p className="text-white/90 text-base max-w-2xl mx-auto">Knowledge and wisdom for your modern lifestyle</p>
            </div>
          </div>
          <div className="max-w-6xl mx-auto px-4 lg:px-8">
            <BlogSection limit={3} />
            <div className="text-center mt-12">
              <Link href="/blog">
                <Button variant="outline" size="lg">View All Blogs</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* 7. Videos Section */}
        <section className="py-20 bg-muted/30">
          <div className="max-w-6xl mx-auto px-4 lg:px-8 mb-12">
            <div className="vedic-header py-10 text-center relative z-10 rounded-2xl shadow-lg border border-white/5">
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Vedic Intuition Videos</h2>
              <p className="text-white/90 text-base max-w-2xl mx-auto">Watch guidances and insights from Aacharya Om Shah</p>
            </div>
          </div>
          <div className="max-w-6xl mx-auto px-4 lg:px-8">

            {isLoadingVideos ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
                {[1, 2, 3].map(i => <div key={i} className="aspect-video bg-muted rounded-xl" />)}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {videos?.slice(0, 3).map((video: any) => (
                  <motion.div key={video.id} whileHover={{ scale: 1.02 }} className="group">
                    <a href={video.youtubeUrl} target="_blank" rel="noopener noreferrer">
                      <div className="relative aspect-video rounded-xl overflow-hidden shadow-xl mb-4">
                        <Image src={video.thumbnailUrl} alt={video.title} fill className="object-cover" />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-all">
                          <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center text-white shadow-2xl">
                            <Play className="fill-current w-6 h-6 ml-1" />
                          </div>
                        </div>
                      </div>
                      <h3 className="font-serif text-xl font-bold line-clamp-2">{video.title}</h3>
                    </a>
                  </motion.div>
                ))}
              </div>
            )}
            <div className="text-center mt-12">
              <Link href="/videos">
                <Button variant="outline" size="lg">See More Videos</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* 8. Daily Horoscope Section */}
        <section className="py-20 bg-background">
          <div className="max-w-6xl mx-auto px-4 lg:px-8 mb-12">
            <div className="vedic-header py-10 text-center relative z-10 rounded-2xl shadow-lg border border-white/5">
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">Daily Horoscope</h2>
              <p className="text-white/90 text-lg max-w-2xl mx-auto">Discover what the stars have in store for you today</p>
            </div>
          </div>
          <div className="max-w-6xl mx-auto px-4 lg:px-8">

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-5 max-w-6xl mx-auto">
              {horoscope.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <Card className="bg-background/50 backdrop-blur-sm border-blue-900/10 hover:border-accent/40 transition-all hover:shadow-xl group overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex items-center gap-6 p-4">
                        {/* Left Side: Circular Image and Name */}
                        <div className="flex flex-col items-center flex-shrink-0 w-24">
                          <div className="relative w-20 h-20 mb-2">
                            <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${item.color} blur-md opacity-40`}></div>
                            <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-accent/20 shadow-lg bg-white">
                              <Image
                                src={item.image}
                                alt={item.sign}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                              />
                            </div>
                          </div>
                          <span className="text-sm font-bold text-accent uppercase tracking-tighter">{item.sign}</span>
                        </div>

                        {/* Right Side: Content */}
                        <div className="flex-1 min-h-[80px] flex items-center">
                          <p className="text-sm text-foreground/80 leading-relaxed line-clamp-3">
                            {item.prediction}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 9. Today's Panchang Section */}
        <section className="py-20 bg-muted/30">
          <div className="max-w-6xl mx-auto px-4 lg:px-8 mb-12">
            <div className="vedic-header py-10 text-center relative z-10 rounded-2xl shadow-lg border border-white/5">
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">Today's Panchang</h2>
              <p className="text-white/90 text-lg max-w-2xl mx-auto">
                {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
          </div>
          <div className="max-w-6xl mx-auto px-4 lg:px-8">

            {panchang ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
                {[
                  { l: "Tithi", v: panchang.tithi, s: "तिथि", icon: Moon },
                  { l: "Vaar", v: panchang.vaar, s: "वार", icon: Sun },
                  { l: "Nakshatra", v: panchang.nakshatr, s: "नक्षत्र", icon: Sparkles },
                  { l: "Yoga", v: panchang.yoga, s: "योग", icon: Zap },
                  { l: "Karan", v: panchang.karan, s: "करण", icon: Clock }
                ].map((x, i) => {
                  const Icon = x.icon;
                  return (
                    <Card key={i} className="bg-background border border-border/70 shadow-sm hover:shadow-md transition-shadow">
                      <CardContent className="p-5 flex flex-col justify-between h-full space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="p-2.5 bg-blue-500/10 rounded-xl text-blue-600 flex-shrink-0">
                            <Icon className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="text-xs text-blue-600 font-bold uppercase tracking-wider">{x.l}</p>
                            <p className="text-[10px] text-muted-foreground/75 font-medium">{x.s}</p>
                          </div>
                        </div>
                        <p className="text-sm sm:text-base font-medium text-foreground leading-snug break-words pt-1">
                          {x.v || "—"}
                        </p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <div className="text-center p-12 bg-muted/20 rounded-2xl max-w-2xl mx-auto">
                <p className="text-muted-foreground">Panchang data not available for today.</p>
              </div>
            )}
          </div>
        </section>

        {/* 10. Auspicious Muhurat Section */}
        <section className="py-20 bg-background">
          <div className="max-w-6xl mx-auto px-4 lg:px-8 mb-12">
            <div className="vedic-header py-10 text-center relative z-10 rounded-2xl shadow-lg border border-white/5">
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">Auspicious Muhurat</h2>
              <p className="text-white/90 text-lg max-w-2xl mx-auto">Plan your auspicious beginnings with divine timing</p>
            </div>
          </div>
          <div className="max-w-6xl mx-auto px-4 lg:px-8">

            {muhurat ? (
              (() => {
                // Helper to format dot-separated dates into comma-separated dates (e.g. 2.5.7.9 -> 2, 5, 7, 9)
                const formatDates = (val?: string) => {
                  if (!val) return "";
                  // Replace sequences of dots with comma and space if used as date separators
                  return val
                    .replace(/\.+/g, ', ')
                    .replace(/,\s*,+/g, ', ')
                    .replace(/^,\s*|,\s*$/g, '');
                };

                return (
                  <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
                    {muhurat.auspiciousDays && (
                      <Card className="bg-background shadow-sm hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-600 flex-shrink-0">
                              <CheckCircle2 className="h-6 w-6" />
                            </div>
                            <div className="space-y-1">
                              <p className="text-xs text-blue-600 font-bold uppercase tracking-wider">General Auspicious Days</p>
                              <p className="text-base sm:text-lg font-medium text-foreground leading-relaxed">
                                {formatDates(muhurat.auspiciousDays)}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {muhurat.newHome && (
                      <Card className="bg-background shadow-sm hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-600 flex-shrink-0">
                              <HomeIcon className="h-6 w-6" />
                            </div>
                            <div className="space-y-1">
                              <p className="text-xs text-blue-600 font-bold uppercase tracking-wider">Griha Pravesh (New Home)</p>
                              <p className="text-base sm:text-lg font-medium text-foreground leading-relaxed">
                                {formatDates(muhurat.newHome)}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {muhurat.vehiclePurchase && (
                      <Card className="bg-background shadow-sm hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-600 flex-shrink-0">
                              <Car className="h-6 w-6" />
                            </div>
                            <div className="space-y-1">
                              <p className="text-xs text-blue-600 font-bold uppercase tracking-wider">Vehicle Purchase</p>
                              <p className="text-base sm:text-lg font-medium text-foreground leading-relaxed">
                                {formatDates(muhurat.vehiclePurchase)}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {muhurat.miscellaneousPurchase && (
                      <Card className="bg-background shadow-sm hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-600 flex-shrink-0">
                              <ShoppingBag className="h-6 w-6" />
                            </div>
                            <div className="space-y-1">
                              <p className="text-xs text-blue-600 font-bold uppercase tracking-wider">Property & Miscellaneous Purchase</p>
                              <p className="text-base sm:text-lg font-medium text-foreground leading-relaxed">
                                {formatDates(muhurat.miscellaneousPurchase)}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {muhurat.inauspiciousDays && (
                      <Card className="bg-background shadow-sm hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-600 flex-shrink-0">
                              <XCircle className="h-6 w-6" />
                            </div>
                            <div className="space-y-1">
                              <p className="text-xs text-blue-600 font-bold uppercase tracking-wider">Inauspicious Days (Varjya)</p>
                              <p className="text-base sm:text-lg font-medium text-foreground leading-relaxed">
                                {formatDates(muhurat.inauspiciousDays)}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {muhurat.note && (
                      <Card className="bg-background shadow-sm hover:shadow-md transition-shadow md:col-span-2">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-600 flex-shrink-0">
                              <Info className="h-6 w-6" />
                            </div>
                            <div className="space-y-1">
                              <p className="text-xs text-blue-600 font-bold uppercase tracking-wider">Important Astrological Note</p>
                              <p className="text-sm sm:text-base font-normal text-muted-foreground leading-relaxed">{muhurat.note}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                );
              })()
            ) : (
              <div className="text-center p-12 bg-background/50 rounded-2xl max-w-2xl mx-auto border border-dashed border-muted-foreground/30">
                <p className="text-muted-foreground">No auspicious muhurats listed for this month.</p>
              </div>
            )}
          </div>
        </section>

        {/* 11. Contact Us Section */}
        <section className="py-20 bg-muted/30">
          <div className="max-w-6xl mx-auto px-4 lg:px-8">
            <div className="max-w-6xl mx-auto shadow-2xl rounded-3xl overflow-hidden bg-muted/10 border border-muted flex flex-col lg:flex-row">
              <div className="lg:w-1/2 p-12 bg-primary text-primary-foreground space-y-8">
                <div>
                  <h2 className="font-serif text-4xl font-bold mb-4">Get in Touch</h2>
                  <p className="text-primary-foreground/80 leading-relaxed">
                    We're here to answer your questions and guide you on your spiritual journey. Reach out to us through any channel.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs opacity-70">Phone</p>
                      <p className="font-bold">+91 85275 30910</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs opacity-70">Email</p>
                      <p className="font-bold">acharyaomshah@gmail.com</p>
                    </div>
                  </div>
                </div>

                <div className="pt-8">
                  <a href="https://wa.me/918527530910" target="_blank" rel="noopener noreferrer">
                    <Button size="lg" className="w-full bg-green-600 hover:bg-green-700 text-white">
                      <SiWhatsapp className="w-5 h-5 mr-3" />
                      Chat on WhatsApp
                    </Button>
                  </a>
                </div>
              </div>

              <div className="lg:w-1/2 p-12 bg-background">
                <form className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="c-name">Full Name</Label>
                    <Input id="c-name" placeholder="Your Name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="c-email">Email Address</Label>
                    <Input id="c-email" type="email" placeholder="Your Email" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="c-message">How can we help you?</Label>
                    <Textarea id="c-message" placeholder="Your message here..." rows={6} />
                  </div>
                  <Button className="w-full" size="lg">Send Message</Button>
                </form>
              </div>
            </div>
          </div>
        </section>



        {/* 12. FAQ Section */}
        <section className="py-20 bg-background">
          <div className="max-w-6xl mx-auto px-4 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-3xl font-bold mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-muted-foreground text-lg">
                Everything you need to know about our consultations and courses
              </p>
            </div>

            <FAQSection />
          </div>
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
    </>
  );
}
