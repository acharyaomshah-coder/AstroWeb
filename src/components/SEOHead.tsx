import Head from 'next/head';
import { useRouter } from 'next/router';

interface SEOHeadProps {
    title: string;
    description: string;
    keywords?: string[];
    image?: string;
    type?: 'website' | 'article' | 'profile';
    publishedTime?: string;
    schema?: Record<string, any>;
    googleBot?: string; // Optional: "index, follow" override
    verification?: {
        google?: string;
        bing?: string;
    };
}

export const SEOHead = ({
    title,
    description,
    keywords = [],
    image = "/favicon.png", // Default image
    type = 'website',
    publishedTime,
    schema,
    verification
}: SEOHeadProps) => {
    const router = useRouter();
    const siteUrl = "https://vedicintuition.com"; // Replace with actual domain
    const canonicalUrl = `${siteUrl}${router.asPath === '/' ? '' : router.asPath}`.split('?')[0];
    const fullTitle = title.startsWith("Vedic Intuition") ? title : `${title} | Vedic Intuition`;

    // Default keywords combined with page-specific ones
    const allKeywords = [
        "Vedic Astrology", "Astrology Consultation", "Horoscope", "Online Astrologer",
        "Vastu Shastra", "Gemstones", "Healing Crystals", "Rudraksha",
        "Vedic Intuition", "Acharya Om Shah", ...keywords
    ].join(", ");

    const structuredData = schema || {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "Vedic Intuition",
        "image": [`${siteUrl}/favicon.png`, `${siteUrl}/WhatsApp Image 2026-01-03 at 17.07.18.jpeg`],
        "url": siteUrl,
        "telephone": "+91-8527530910",
        "priceRange": "₹₹",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "133 D, India Expo Plaza, Knowledge Park II Metro",
            "addressLocality": "Greater Noida",
            "addressRegion": "UP",
            "postalCode": "201310",
            "addressCountry": "IN"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 28.4744,
            "longitude": 77.5040
        },
        "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday"
            ],
            "opens": "11:00",
            "closes": "20:00"
        },
        "sameAs": [
            "https://www.youtube.com/@VedicIntuition", // Assuming based on content
            // Add other social links here
        ],
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+91-8527530910",
            "contactType": "customer service"
        }
    };

    return (
        <Head>
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={allKeywords} />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="canonical" href={canonicalUrl} />

            {/* Verification Tags */}
            {verification?.google && <meta name="google-site-verification" content={verification.google} />}
            {verification?.bing && <meta name="msvalidate.01" content={verification.bing} />}

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image.startsWith("http") ? image : `${siteUrl}${image}`} />
            <meta property="og:site_name" content="Vedic Intuition" />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={canonicalUrl} />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image.startsWith("http") ? image : `${siteUrl}${image}`} />

            {/* Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />
        </Head>
    );
};
