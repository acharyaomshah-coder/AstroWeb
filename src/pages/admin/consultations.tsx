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
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Loader2, Plus, Trash2, Edit, X, ClipboardList, ArrowUp, ArrowDown } from "lucide-react";

interface Consultation {
    id: string;
    name: string;
    description: string;
    price: string;
    category: string;
    position: number;
}

export default function AdminConsultations() {
    const router = useRouter();
    const { isAdmin, loading } = useAuth();
    const [consultations, setConsultations] = useState<Consultation[]>([]);
    const [loadingData, setLoadingData] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    // Form state
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");

    useEffect(() => {
        if (!loading && !isAdmin) {
            router.push("/");
        }
    }, [loading, isAdmin, router]);

    useEffect(() => {
        if (isAdmin) {
            fetchConsultations();
        }
    }, [isAdmin]);

    const fetchConsultations = async () => {
        try {
            setLoadingData(true);
            const { data, error } = await supabase
                .from("consultations")
                .select("*")
                .order("position", { ascending: true })
                .order("created_at", { ascending: false });

            if (error) throw error;

            if (data) {
                setConsultations(data as Consultation[]);
            } else {
                setConsultations([]);
            }
        } catch (error) {
            console.error("Error fetching consultations:", error);
        } finally {
            setLoadingData(false);
        }
    };

    const resetForm = () => {
        setName("");
        setPrice("");
        setDescription("");
        setCategory("");
        setEditingId(null);
    };

    const handleEdit = (consultation: Consultation) => {
        setEditingId(consultation.id);
        setName(consultation.name);
        setPrice(consultation.price);
        setDescription(consultation.description);
        setCategory(consultation.category || "");
        setShowForm(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name || !price || !description) {
            alert("Please fill in all required fields");
            return;
        }

        try {
            setIsSubmitting(true);
            const customId = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

            const consultationData = {
                name,
                price,
                description,
                category,
                custom_id: customId,
                position: editingId ? undefined : consultations.length + 1
            };

            if (editingId) {
                const { error } = await supabase
                    .from("consultations")
                    .update({ name, price, description, category, custom_id: customId })
                    .eq("id", editingId);

                if (error) throw error;

                setConsultations(prev =>
                    prev.map(c => c.id === editingId ? { ...c, ...consultationData, id: c.id } as Consultation : c)
                );
                alert("Consultation updated successfully!");
            } else {
                const { data, error } = await supabase
                    .from("consultations")
                    .insert([consultationData])
                    .select()
                    .single();

                if (error) throw error;

                setConsultations(prev => [...prev, data as Consultation]);
                alert("Consultation added successfully!");
            }

            resetForm();
            setShowForm(false);
        } catch (error: any) {
            console.error("Error saving consultation:", error);
            alert(`Failed to save consultation: ${error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    const deleteConsultation = async (id: string) => {
        if (!confirm("Are you sure you want to delete this consultation service?")) {
            return;
        }

        try {
            setDeletingId(id);
            const { error } = await supabase
                .from("consultations")
                .delete()
                .eq("id", id);

            if (error) throw error;

            setConsultations(prev => prev.filter(c => c.id !== id));
            alert("Consultation deleted successfully!");
        } catch (error) {
            console.error("Error deleting consultation:", error);
            alert("Failed to delete consultation");
        } finally {
            setDeletingId(null);
        }
    };

    const movePosition = async (index: number, direction: 'up' | 'down') => {
        if (direction === 'up' && index === 0) return;
        if (direction === 'down' && index === consultations.length - 1) return;

        const newIndex = direction === 'up' ? index - 1 : index + 1;
        const currentItem = consultations[index];
        const swapItem = consultations[newIndex];

        // Optimistically update UI
        const newConsultations = [...consultations];
        newConsultations[index] = swapItem;
        newConsultations[newIndex] = currentItem;
        setConsultations(newConsultations);

        try {
            // Update in DB
            await supabase.from("consultations").update({ position: newIndex + 1 }).eq("id", currentItem.id);
            await supabase.from("consultations").update({ position: index + 1 }).eq("id", swapItem.id);
        } catch (error) {
            console.error("Failed to move position:", error);
            // Revert on error
            fetchConsultations();
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
                <title>Manage Consultations - Admin Dashboard</title>
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
                                <h1 className="font-serif text-4xl font-bold mb-2">Consultations</h1>
                                <p className="text-primary-foreground/90">Manage astrology & vaastu consultation offerings</p>
                            </div>
                            <Button
                                onClick={() => {
                                    resetForm();
                                    setShowForm(!showForm);
                                }}
                                className="bg-accent text-accent-foreground hover:bg-accent/90"
                            >
                                <Plus className="h-4 w-4 mr-2" />
                                {showForm ? "Cancel" : "Add Consultation"}
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
                                        <CardTitle>{editingId ? "Edit Consultation" : "Add New Consultation"}</CardTitle>
                                        <CardDescription>Fill in the consultation details (Prices, description, category).</CardDescription>
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
                                            <Label htmlFor="name">Consultation Name *</Label>
                                            <Input
                                                id="name"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                placeholder="e.g., Horoscope Analysis"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <Label htmlFor="price">Price (Text) *</Label>
                                            <Input
                                                id="price"
                                                value={price}
                                                onChange={(e) => setPrice(e.target.value)}
                                                placeholder="e.g., ₹3,000 + 18% GST"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <Label htmlFor="category">Category</Label>
                                        <Input
                                            id="category"
                                            value={category}
                                            onChange={(e) => setCategory(e.target.value)}
                                            placeholder="e.g., horoscope, vastu, remedial"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="description">Description *</Label>
                                        <Textarea
                                            id="description"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            placeholder="Enter detailed consultation description..."
                                            rows={4}
                                            required
                                        />
                                    </div>

                                    <div className="flex gap-2">
                                        <Button type="submit" disabled={isSubmitting}>
                                            {isSubmitting ? (
                                                <>
                                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                                    Saving...
                                                </>
                                            ) : (
                                                <>{editingId ? "Update Consultation" : "Add Consultation"}</>
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
                            <p className="mt-4 text-muted-foreground">Loading consultations...</p>
                        </div>
                    ) : consultations.length === 0 ? (
                        <Card>
                            <CardContent className="py-12 text-center">
                                <ClipboardList className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                <p className="text-muted-foreground mb-4">No consultation items found</p>
                                <Button onClick={() => setShowForm(true)}>
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add Your First Consultation
                                </Button>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="flex flex-col gap-4">
                            {consultations.map((consultation, index) => (
                                <Card key={consultation.id} className="overflow-hidden bg-card hover:border-primary/30 transition-all border">
                                    <CardContent className="p-0">
                                        <div className="flex items-center h-full">
                                            {/* Reorder Controls */}
                                            <div className="flex flex-col items-center justify-center p-4 bg-muted/30 border-r border-border h-full gap-1">
                                                <Button 
                                                    variant="ghost" 
                                                    size="icon" 
                                                    className="h-8 w-8" 
                                                    onClick={() => movePosition(index, 'up')}
                                                    disabled={index === 0}
                                                >
                                                    <ArrowUp className="h-4 w-4" />
                                                </Button>
                                                <div className="text-xs font-mono font-medium text-muted-foreground">{index + 1}</div>
                                                <Button 
                                                    variant="ghost" 
                                                    size="icon" 
                                                    className="h-8 w-8" 
                                                    onClick={() => movePosition(index, 'down')}
                                                    disabled={index === consultations.length - 1}
                                                >
                                                    <ArrowDown className="h-4 w-4" />
                                                </Button>
                                            </div>

                                            {/* Content */}
                                            <div className="p-6 flex-1 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
                                                <div className="flex-1 space-y-2">
                                                    <div className="flex items-center gap-3">
                                                        <h3 className="font-serif font-bold text-xl">{consultation.name}</h3>
                                                        {consultation.category && (
                                                            <Badge variant="outline" className="uppercase tracking-wide text-[10px]">
                                                                {consultation.category}
                                                            </Badge>
                                                        )}
                                                    </div>
                                                    <p className="font-bold text-accent">{consultation.price}</p>
                                                    <p className="text-sm text-muted-foreground line-clamp-2">
                                                        {consultation.description}
                                                    </p>
                                                </div>

                                                {/* Actions */}
                                                <div className="flex flex-row md:flex-col gap-2 shrink-0">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => handleEdit(consultation)}
                                                        className="w-full justify-start"
                                                    >
                                                        <Edit className="h-4 w-4 mr-2" />
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        variant="destructive"
                                                        size="sm"
                                                        onClick={() => deleteConsultation(consultation.id)}
                                                        disabled={deletingId === consultation.id}
                                                        className="w-full justify-start"
                                                    >
                                                        {deletingId === consultation.id ? (
                                                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                                        ) : (
                                                            <Trash2 className="h-4 w-4 mr-2" />
                                                        )}
                                                        Delete
                                                    </Button>
                                                </div>
                                            </div>
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
