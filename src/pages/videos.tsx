import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Head from "next/head";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Play, ExternalLink } from "lucide-react";
import { useAuth } from "@/lib/authContext";
import { getAuthToken } from "@/lib/supabase";

interface Video {
  id: string;
  title: string;
  youtubeUrl: string;
  thumbnailUrl: string;
  createdAt?: string;
}

export default function Videos() {
  const { user, isAdmin } = useAuth();
  const [showAddForm, setShowAddForm] = useState(false);
  const [videoTitle, setVideoTitle] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");

  const { data: videos, isLoading, refetch } = useQuery<Video[]>({
    queryKey: ["/api/videos"],
    queryFn: async () => {
      const response = await fetch("/api/videos");
      if (!response.ok) throw new Error("Failed to fetch videos");
      return response.json();
    }
  });

  const extractYoutubeId = (url: string): string | null => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
      /youtube\.com\/embed\/([^&\n?#]+)/
    ];
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return null;
  };

  const getThumbnailUrl = (youtubeId: string): string => {
    return `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;
  };

  const handleAddVideo = async () => {
    const youtubeId = extractYoutubeId(youtubeUrl);
    if (!youtubeId || !videoTitle.trim()) {
      alert("Please enter a valid YouTube URL and title");
      return;
    }

    try {
      const token = await getAuthToken();
      if (!token) {
        alert("Authentication required");
        return;
      }

      const response = await fetch("/api/videos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          title: videoTitle,
          youtubeUrl: youtubeUrl,
          thumbnailUrl: getThumbnailUrl(youtubeId)
        })
      });

      if (!response.ok) throw new Error("Failed to add video");

      setVideoTitle("");
      setYoutubeUrl("");
      setShowAddForm(false);
      refetch();
    } catch (error) {
      console.error("Error adding video:", error);
      alert("Failed to add video");
    }
  };

  return (
    <>
      <Head>
        <title>Videos - Divine Astrology</title>
      </Head>
      <div className="min-h-screen bg-background">
        <div className="vedic-header py-16 md:py-24">
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="text-center mb-0">
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-3">
                Vedic Intuition Videos
              </h1>
              <p className="text-white/80 text-lg max-w-2xl mx-auto">
                Watch our expert astrologers share wisdom, guidance, and spiritual insights
              </p>
            </div>

            {user && isAdmin && (
              <div className="max-w-2xl mx-auto mt-8">
                {!showAddForm ? (
                  <Button
                    onClick={() => setShowAddForm(true)}
                    className="w-full bg-accent hover:bg-accent/90 text-white"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Video
                  </Button>
                ) : (
                  <Card className="p-6 bg-card/50 backdrop-blur border-white/10">
                    <h3 className="font-serif text-xl font-bold mb-4">Add YouTube Video</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Video Title</label>
                        <Input
                          placeholder="Enter video title..."
                          value={videoTitle}
                          onChange={(e) => setVideoTitle(e.target.value)}
                          className="bg-background/20"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">YouTube URL</label>
                        <Input
                          placeholder="https://www.youtube.com/watch?v=..."
                          value={youtubeUrl}
                          onChange={(e) => setYoutubeUrl(e.target.value)}
                          className="bg-background/20"
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Paste full YouTube URL or shortened youtu.be link
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={handleAddVideo}
                          className="flex-1"
                        >
                          Add Video
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setShowAddForm(false)}
                          className="flex-1 text-white border-white/20 hover:bg-white/10"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </Card>
                )}
              </div>
            )}
          </div>
        </div>

        <section className="py-10">
          <div className="max-w-6xl mx-auto px-4 lg:px-8">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-muted animate-pulse rounded-lg h-64" />
                ))}
              </div>
            ) : videos && videos.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map((video) => (
                  <Card
                    key={video.id}
                    className="overflow-hidden hover-elevate cursor-pointer group"
                  >
                    <div className="relative overflow-hidden bg-muted h-48">
                      <img
                        src={video.thumbnailUrl}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Play className="w-12 h-12 text-white fill-white" />
                      </div>
                    </div>

                    <div className="p-4">
                      <h3 className="font-serif text-lg font-bold text-foreground mb-3 line-clamp-2">
                        {video.title}
                      </h3>
                      <a
                        href={video.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          variant="default"
                          className="w-full"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Watch on YouTube
                        </Button>
                      </a>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  No videos yet.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
