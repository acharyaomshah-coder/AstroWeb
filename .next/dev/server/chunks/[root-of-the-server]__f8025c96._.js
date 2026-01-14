module.exports = [
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/@supabase/supabase-js [external] (@supabase/supabase-js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("@supabase/supabase-js", () => require("@supabase/supabase-js"));

module.exports = mod;
}),
"[project]/DEMO-PROJECTS/AstroWeb/src/lib/supabase.ts [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getAuthToken",
    ()=>getAuthToken,
    "getCurrentUser",
    ()=>getCurrentUser,
    "signIn",
    ()=>signIn,
    "signOut",
    ()=>signOut,
    "signUp",
    ()=>signUp,
    "supabase",
    ()=>supabase
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$supabase$2f$supabase$2d$js__$5b$external$5d$__$2840$supabase$2f$supabase$2d$js$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/@supabase/supabase-js [external] (@supabase/supabase-js, cjs)");
;
const supabaseUrl = ("TURBOPACK compile-time value", "https://muvycgcnmqdhgivrjpry.supabase.co") || "https://your-project.supabase.co";
const supabaseAnonKey = ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im11dnljZ2NubXFkaGdpdnJqcHJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc0NDcyNDcsImV4cCI6MjA4MzAyMzI0N30.gtPh-MkpeH-_YmA1o9M1tPXVkDy0yMO-4vsFd9SfjTQ") || "your-anon-key";
const supabase = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$supabase$2f$supabase$2d$js__$5b$external$5d$__$2840$supabase$2f$supabase$2d$js$2c$__cjs$29$__["createClient"])(supabaseUrl, supabaseAnonKey);
async function getAuthToken() {
    try {
        const { data: { session } } = await supabase.auth.getSession();
        return session?.access_token || null;
    } catch (error) {
        console.error("Error getting auth token:", error);
        return null;
    }
}
async function signUp(email, password) {
    return await supabase.auth.signUp({
        email,
        password
    });
}
async function signIn(email, password) {
    return await supabase.auth.signInWithPassword({
        email,
        password
    });
}
async function signOut() {
    return await supabase.auth.signOut();
}
async function getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
}
}),
"[project]/DEMO-PROJECTS/AstroWeb/src/pages/api/products/[id].ts [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>handler
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$DEMO$2d$PROJECTS$2f$AstroWeb$2f$src$2f$lib$2f$supabase$2e$ts__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/DEMO-PROJECTS/AstroWeb/src/lib/supabase.ts [api] (ecmascript)");
;
async function handler(req, res) {
    const { id } = req.query;
    if (req.method === "GET") {
        if (!id || typeof id !== "string") {
            return res.status(400).json({
                error: "Invalid product ID"
            });
        }
        try {
            const { data: product, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$DEMO$2d$PROJECTS$2f$AstroWeb$2f$src$2f$lib$2f$supabase$2e$ts__$5b$api$5d$__$28$ecmascript$29$__["supabase"].from("products").select("*").eq("id", id).single();
            if (error) throw error;
            if (!product) {
                return res.status(404).json({
                    error: "Product not found"
                });
            }
            // Transform snake_case to camelCase
            const formattedProduct = {
                id: product.id,
                name: product.name,
                description: product.description,
                price: product.price,
                category: product.category,
                images: product.images || [],
                benefits: product.benefits || [],
                rating: product.rating || 0,
                reviewCount: product.review_count || 0,
                certified: product.certified || false,
                inStock: product.in_stock || true
            };
            return res.status(200).json(formattedProduct);
        } catch (error) {
            console.error("Error fetching product:", error);
            return res.status(500).json({
                error: "Failed to fetch product"
            });
        }
    }
    return res.status(405).json({
        error: "Method not allowed"
    });
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__f8025c96._.js.map