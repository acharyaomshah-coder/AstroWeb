import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { useAuth } from "@/lib/authContext";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Package, Loader2, Plus, Trash2, Edit, X, Upload, BookOpen } from "lucide-react";

interface Course {
    id: string;
    title: string;
    description: string;
    price: string;
    thumbnail: string;
}

export default function AdminCourses() {
    const router = useRouter();
    const { isAdmin, loading } = useAuth();
    const [courses, setCourses] = useState<Course[]>([]);
    const [loadingData, setLoadingData] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    // Form state
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [thumbnail, setThumbnail] = useState("");

    useEffect(() => {
        if (!loading && !isAdmin) {
            router.push("/");
        }
    }, [loading, isAdmin, router]);

    useEffect(() => {
        if (isAdmin) {
            fetchCourses();
        }
    }, [isAdmin]);

    const fetchCourses = async () => {
        try {
            setLoadingData(true);
            const { data, error } = await supabase
                .from("courses")
                .select("*")
                .order("created_at", { ascending: false });

            if (error) throw error;
            setCourses(data || []);
        } catch (error) {
            console.error("Error fetching courses:", error);
            // Fallback for demo if table doesn't exist yet, avoiding crash loop
            // setCourses([]); 
        } finally {
            setLoadingData(false);
        }
    };

    const resetForm = () => {
        setTitle("");
        setPrice("");
        setDescription("");
        setThumbnail("");
        setEditingId(null);
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            alert("File size too large. Please upload an image smaller than 5MB.");
            return;
        }

        try {
            setIsUploading(true);
            const fileExt = file.name.split('.').pop();
            const fileName = `course_${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
            const filePath = `courses/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('images')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('images')
                .getPublicUrl(filePath);

            setThumbnail(publicUrl);
            alert("Image uploaded successfully!");
        } catch (error: any) {
            console.error('Error uploading image:', error);
            alert(`Error uploading image: ${error.message}. Ensure 'images' bucket exists.`);
        } finally {
            setIsUploading(false);
        }
    };

    const handleEdit = (course: Course) => {
        setEditingId(course.id);
        setTitle(course.title);
        setPrice(course.price);
        setDescription(course.description);
        setThumbnail(course.thumbnail);
        setShowForm(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title || !price || !description || !thumbnail) {
            alert("Please fill in all required fields");
            return;
        }

        try {
            setIsSubmitting(true);

            const courseData = {
                title,
                price: parseFloat(price).toFixed(2),
                description,
                thumbnail,
            };

            if (editingId) {
                const { error } = await supabase
                    .from("courses")
                    .update(courseData)
                    .eq("id", editingId);

                if (error) throw error;

                setCourses(prev =>
                    prev.map(c => c.id === editingId ? { ...c, ...courseData, id: c.id } : c)
                );
                alert("Course updated successfully!");
            } else {
                const { data, error } = await supabase
                    .from("courses")
                    .insert([courseData])
                    .select()
                    .single();

                if (error) throw error;

                setCourses(prev => [data, ...prev]);
                alert("Course added successfully!");
            }

            resetForm();
            setShowForm(false);
        } catch (error: any) {
            console.error("Error saving course:", error);
            alert(`Failed to save course: ${error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    const deleteCourse = async (id: string) => {
        if (!confirm("Are you sure you want to delete this course?")) {
            return;
        }

        try {
            setDeletingId(id);
            const { error } = await supabase
                .from("courses")
                .delete()
                .eq("id", id);

            if (error) throw error;

            setCourses(prev => prev.filter(c => c.id !== id));
            alert("Course deleted successfully!");
        } catch (error) {
            console.error("Error deleting course:", error);
            alert("Failed to delete course");
        } finally {
            setDeletingId(null);
        }
    };

    if (loading || !isAdmin) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <>
            <Head>
                <title>Manage Courses - Admin Dashboard</title>
            </Head>

            <div className="min-h-screen bg-background">
                <div className="bg-primary text-primary-foreground py-8">
                    <div className="container mx-auto px-4 lg:px-8">
                        <Link href="/admin">
                            <Button variant="ghost" className="mb-4 text-primary-foreground hover:bg-primary-foreground/10">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to Dashboard
                            </Button>
                        </Link>
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="font-serif text-4xl font-bold mb-2">Courses</h1>
                                <p className="text-primary-foreground/90">Manage your educational courses</p>
                            </div>
                            <Button
                                onClick={() => {
                                    resetForm();
                                    setShowForm(!showForm);
                                }}
                                className="bg-accent text-accent-foreground hover:bg-accent/90"
                            >
                                <Plus className="h-4 w-4 mr-2" />
                                {showForm ? "Cancel" : "Add Course"}
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-4 lg:px-8 py-8">
                    {showForm && (
                        <Card className="mb-8 border-primary/20">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle>{editingId ? "Edit Course" : "Add New Course"}</CardTitle>
                                        <CardDescription>Fill in the course details</CardDescription>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => {
                                            resetForm();
                                            setShowForm(false);
                                        }}
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="title">Course Title *</Label>
                                            <Input
                                                id="title"
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                                placeholder="e.g., Vedic Astrology for Beginners"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <Label htmlFor="price">Price (₹) *</Label>
                                            <Input
                                                id="price"
                                                type="number"
                                                step="0.01"
                                                value={price}
                                                onChange={(e) => setPrice(e.target.value)}
                                                placeholder="4999.00"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <Label htmlFor="description">Description *</Label>
                                        <Textarea
                                            id="description"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            placeholder="Enter detailed course description..."
                                            rows={4}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="thumbnail">Thumbnail Image *</Label>
                                        <div className="flex gap-2 mb-2">
                                            <Input
                                                id="thumbnail"
                                                value={thumbnail}
                                                onChange={(e) => setThumbnail(e.target.value)}
                                                placeholder="https://example.com/image.jpg"
                                                required
                                            />
                                            <div className="relative">
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    disabled={isUploading}
                                                >
                                                    {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                                                </Button>
                                                <Input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleImageUpload}
                                                    className="absolute inset-0 opacity-0 cursor-pointer disabled:cursor-not-allowed"
                                                    disabled={isUploading}
                                                />
                                            </div>
                                        </div>
                                        {thumbnail && (
                                            <div className="mt-2 relative w-32 h-20 rounded overflow-hidden border">
                                                <img src={thumbnail} alt="Preview" className="w-full h-full object-cover" />
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex gap-2">
                                        <Button type="submit" disabled={isSubmitting}>
                                            {isSubmitting ? (
                                                <>
                                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                                    Saving...
                                                </>
                                            ) : (
                                                <>{editingId ? "Update Course" : "Add Course"}</>
                                            )}
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    )}

                    {loadingData ? (
                        <div className="text-center py-12">
                            <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
                            <p className="mt-4 text-muted-foreground">Loading courses...</p>
                        </div>
                    ) : courses.length === 0 ? (
                        <Card>
                            <CardContent className="py-12 text-center">
                                <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                <p className="text-muted-foreground mb-4">No courses found</p>
                                <Button onClick={() => setShowForm(true)}>
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add Your First Course
                                </Button>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {courses.map((course) => (
                                <Card key={course.id} className="overflow-hidden hover-elevate transition-all">
                                    <div className="relative aspect-video">
                                        <img
                                            src={course.thumbnail}
                                            alt={course.title}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.currentTarget.src = "https://via.placeholder.com/400?text=Course";
                                            }}
                                        />
                                    </div>
                                    <CardHeader>
                                        <CardTitle className="line-clamp-2">{course.title}</CardTitle>
                                        <CardDescription>
                                            <span className="font-bold text-primary text-lg">₹{parseFloat(course.price).toFixed(2)}</span>
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                                            {course.description}
                                        </p>
                                        <div className="flex gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="flex-1"
                                                onClick={() => handleEdit(course)}
                                            >
                                                <Edit className="h-4 w-4 mr-1" />
                                                Edit
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => deleteCourse(course.id)}
                                                disabled={deletingId === course.id}
                                            >
                                                {deletingId === course.id ? (
                                                    <Loader2 className="h-4 w-4 animate-spin" />
                                                ) : (
                                                    <Trash2 className="h-4 w-4" />
                                                )}
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
