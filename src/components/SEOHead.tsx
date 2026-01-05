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
}

export const SEOHead = ({
    title,
    description,
    keywords = [],
    image = "/favicon.png", // Default image
    type = 'website',
    publishedTime,
    schema
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
        "@type": "Organization",
        "name": "Vedic Intuition",
        "url": siteUrl,
        "logo": `${siteUrl}/favicon.png`,
        "sameAs": [
            // Add social media links here if known, e.g.
            // "https://www.facebook.com/vedicintuition",
            // "https://www.instagram.com/vedicintuition"
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
