import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, BookOpen, CheckCircle2 } from "lucide-react";

interface Course {
    id: string;
    title: string;
    description: string;
    price: string;
    thumbnail: string;
}

export default function CoursesPage() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const { data, error } = await supabase
                .from("courses")
                .select("*")
                .order("created_at", { ascending: false });

            if (error) throw error;
            setCourses(data || []);
        } catch (error) {
            console.error("Error fetching courses:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Head>
                <title>Our Courses | Vedic Intuition</title>
                <meta name="description" content="Explore our expertly curated courses on Vedic Astrology, Vaastu Shastra, and more." />
            </Head>

            <div className="min-h-screen bg-background pb-12">
                {/* Hero Section */}
                <div className="relative bg-primary py-10 md:py-16 mb-8 overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=2574&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
                    <div className="container relative z-10 mx-auto px-4 text-center text-primary-foreground">
                        <h1 className="mb-2 font-serif text-3xl font-bold md:text-5xl lg:text-5xl">
                            Educate with Vedic Intuition
                        </h1>
                        <p className="mx-auto max-w-2xl text-base opacity-90 md:text-lg">
                            Master the sacred sciences of Vedic Astrology and Vaastu Shastra with our comprehensive courses.
                        </p>
                    </div>
                </div>

                <div className="container mx-auto px-4 lg:px-8">
                    {loading ? (
                        <div className="flex justify-center py-20">
                            <Loader2 className="h-10 w-10 animate-spin text-primary" />
                        </div>
                    ) : courses.length === 0 ? (
                        <div className="text-center py-20">
                            <BookOpen className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
                            <h2 className="text-2xl font-bold mb-2">No Courses Available Yet</h2>
                            <p className="text-muted-foreground">Please check back later for our upcoming courses.</p>
                        </div>
                    ) : (
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {courses.map((course) => (
                                <Card key={course.id} className="flex flex-col overflow-hidden hover-elevate transition-all duration-300 border-primary/10 group">
                                    <div className="relative aspect-video overflow-hidden">
                                        <img
                                            src={course.thumbnail}
                                            alt={course.title}
                                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            onError={(e) => {
                                                e.currentTarget.src = "https://via.placeholder.com/600x400?text=Course+Thumbnail";
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                            <span className="text-white font-medium">View Course Details</span>
                                        </div>
                                    </div>

                                    <CardHeader>
                                        <CardTitle className="line-clamp-2 text-xl text-primary font-serif font-bold tracking-tight">
                                            {course.title}
                                        </CardTitle>
                                        <div className="mt-2 flex items-baseline gap-2">
                                            <span className="text-2xl font-bold text-foreground">₹{Math.floor(parseFloat(course.price)).toLocaleString()}</span>
                                            <span className="text-sm text-muted-foreground line-through">₹{Math.floor(parseFloat(course.price) * 1.4).toLocaleString()}</span>
                                        </div>
                                    </CardHeader>

                                    <CardContent className="flex-grow">
                                        <div className="text-sm text-foreground/80 mb-4 whitespace-pre-line leading-relaxed space-y-1 line-clamp-3">
                                            {course.description}
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                <CheckCircle2 className="h-3 w-3 text-green-500" />
                                                <span>Lifetime Access</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                <CheckCircle2 className="h-3 w-3 text-green-500" />
                                                <span>Certificate of Completion</span>
                                            </div>
                                        </div>
                                    </CardContent>

                                    <CardFooter className="pt-0">
                                        <Link href={`/courses/enquiry/${course.id}`} className="w-full">
                                            <Button className="w-full font-semibold" size="lg">
                                                Get Course
                                            </Button>
                                        </Link>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
