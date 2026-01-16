import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2, ArrowLeft } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import Link from "next/link";

interface Course {
    id: string;
    title: string;
    description: string;
    price: string;
    thumbnail: string;
}

export default function CourseEnquiry() {
    const router = useRouter();
    const { id } = router.query;

    const [course, setCourse] = useState<Course | null>(null);
    const [loading, setLoading] = useState(true);

    const [formData, setFormData] = useState({
        fullName: "",
        mobileNumber: "",
        email: "",
        city: "",
        age: "",
        gender: "Male"
    });

    useEffect(() => {
        if (id) {
            fetchCourseDetails();
        }
    }, [id]);

    const fetchCourseDetails = async () => {
        try {
            const { data, error } = await supabase
                .from("courses")
                .select("*")
                .eq("id", id)
                .single();

            if (error) throw error;
            setCourse(data);
        } catch (error) {
            console.error("Error fetching course details:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSendEnquiry = (e: React.FormEvent) => {
        e.preventDefault();

        if (!course) return;

        const message = `Hello, I am interested in ${course.title}.
Name: ${formData.fullName}
Mobile: ${formData.mobileNumber}
Email: ${formData.email || 'N/A'}
City: ${formData.city}
Age: ${formData.age}
Gender: ${formData.gender}`;

        const phoneNumber = "918527530910"; // Updated phone number
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

        window.open(whatsappUrl, "_blank");
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!course) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4">
                <h1 className="text-2xl font-bold mb-4">Course Not Found</h1>
                <Link href="/courses">
                    <Button>Back to Courses</Button>
                </Link>
            </div>
        );
    }

    return (
        <>
            <Head>
                <title>Enquire about {course.title} | Vedic Intuition</title>
            </Head>

            <div className="min-h-screen bg-background py-12 px-4">
                <div className="max-w-4xl mx-auto">
                    <Link href="/courses">
                        <Button variant="ghost" className="mb-6 hover:bg-accent/10">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Courses
                        </Button>
                    </Link>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Course Summary Card */}
                        <Card className="h-fit">
                            <div className="aspect-video relative overflow-hidden rounded-t-lg">
                                <img
                                    src={course.thumbnail}
                                    alt={course.title}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.currentTarget.src = "https://via.placeholder.com/600x400?text=Course";
                                    }}
                                />
                            </div>
                            <CardHeader>
                                <CardTitle className="text-2xl font-serif text-primary">{course.title}</CardTitle>
                                <CardDescription>
                                    <div className="flex items-baseline gap-2 mt-2">
                                        <span className="text-3xl font-bold text-foreground">₹{parseFloat(course.price).toFixed(2)}</span>
                                        <span className="text-lg text-muted-foreground line-through">₹{Math.floor(parseFloat(course.price) * 1.4).toLocaleString()}</span>
                                    </div>
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <h3 className="font-semibold text-lg border-b pb-2 mb-4">Course Details</h3>
                                    <div className="text-sm text-foreground/90 whitespace-pre-wrap leading-relaxed space-y-1">
                                        {course.description.split('\n').map((line: string, i: number) => {
                                            const trimmedLine = line.trim();
                                            if (!trimmedLine) return <br key={i} className="leading-none" />;

                                            // 1. "Course Coverage" specifically bold and larger
                                            if (/^course coverage[:]?/i.test(trimmedLine)) {
                                                return <p key={i} className="font-bold text-base pt-2 text-primary">{trimmedLine}</p>;
                                            }

                                            // 2. Sub-headings (lines ending with :)
                                            if (trimmedLine.endsWith(':')) {
                                                return <p key={i} className="font-semibold text-sm pt-1 text-foreground">{trimmedLine}</p>;
                                            }

                                            // 3. Regular points and bullets
                                            const isBullet = trimmedLine.startsWith('-') || trimmedLine.startsWith('•');
                                            return (
                                                <p key={i} className={`text-sm text-muted-foreground ${isBullet ? 'ml-4' : ''}`}>
                                                    {trimmedLine}
                                                </p>
                                            );
                                        })}
                                    </div>
                                    <div className="pt-4 border-t flex flex-col gap-2">
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                                            <span>Lifetime Access</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                                            <span>Certificate of Completion</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                                            <span>Expert Support</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Enquiry Form */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Course Enrollment Enquiry</CardTitle>
                                <CardDescription>Please provide your details below.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSendEnquiry} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="fullName">Full Name *</Label>
                                        <Input
                                            id="fullName"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="Enter your full name"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="mobileNumber">Mobile Number (WhatsApp) *</Label>
                                        <Input
                                            id="mobileNumber"
                                            name="mobileNumber"
                                            value={formData.mobileNumber}
                                            onChange={handleInputChange}
                                            required
                                            type="tel"
                                            placeholder="+91 9999999999"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email Address (Optional)</Label>
                                        <Input
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            type="email"
                                            placeholder="you@example.com"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="city">City / Country *</Label>
                                        <Input
                                            id="city"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="e.g. Mumbai, India"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="age">Age *</Label>
                                            <Input
                                                id="age"
                                                name="age"
                                                value={formData.age}
                                                onChange={handleInputChange}
                                                required
                                                type="number"
                                                placeholder="25"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="gender">Gender *</Label>
                                            <select
                                                id="gender"
                                                name="gender"
                                                value={formData.gender}
                                                onChange={handleInputChange}
                                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                            >
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>
                                    </div>

                                    <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white mt-4">
                                        <SiWhatsapp className="mr-2 h-4 w-4" />
                                        Send Enquiry on WhatsApp
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}
