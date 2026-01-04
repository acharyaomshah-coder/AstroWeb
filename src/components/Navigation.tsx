import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Menu, X, Sparkles, Phone, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/lib/authContext";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Badge } from "@/components/ui/badge";

export function Navigation() {
  const router = useRouter();
  const location = router.pathname;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAdmin, signOut, loading } = useAuth();

  if (loading) {
    return <header className="sticky top-0 z-50 w-full border-b bg-card/95 h-16" />;
  }

  const productCategories = [
    { name: "Gemstones", href: "/products/gemstones", description: "Certified natural gemstones" },
    { name: "Healing Crystals", href: "/products/healing-crystals", description: "Powerful healing crystals" },
    { name: "Rudrakshas", href: "/products/rudrakshas", description: "Authentic Rudraksha beads" },
    { name: "Vaastu Products", href: "/products/vaastu", description: "Energy balancing vaastu tools" },
    { name: "Others", href: "/products/others", description: "Other spiritual items" },
  ];

  const consultationServices = [
    {
      title: "Horoscope Analysis",
      price: "₹3,000",
      description: "Comprehensive birth chart analysis for insights into personality, health, marriage, and career.",
      href: "/book-appointment?service=horoscope-analysis",
    },
    {
      title: "Varshaphala (Annual Forecast)",
      price: "₹6,000",
      description: "Detailed one-year astrological guidance using Janma and Varsha Kundali for yearly trends.",
      href: "/book-appointment?service=varshaphala",
    },
    {
      title: "Muhurta Selection",
      price: "₹6,000",
      description: "Auspicious moments for significant life events including marriage, travel, and business.",
      href: "/book-appointment?service=muhurta-selection",
    },
    {
      title: "Residential Vaastu Analysis",
      price: "₹20/sq.ft",
      description: "Detailed home Vaastu report with remedies to optimize energy flow for peace.",
      href: "/book-appointment?service=residential-Vaastu",
    },
    {
      title: "Commercial Vaastu Analysis",
      price: "₹20/sq.ft",
      description: "Specialized assessment for offices and factories to identify growth-oriented remedies.",
      href: "/book-appointment?service=commercial-Vaastu",
    },
    {
      title: "Astrological (Karmic) Remedial",
      price: "₹20,000",
      description: "Vedic remedies including mantra, hawan, panch tatwa treatment and yantra therapy.",
      href: "/book-appointment?service=karmic-remedial",
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" data-testid="link-home">
            <div className="flex items-center gap-2 cursor-pointer hover-elevate active-elevate-2 rounded-md px-2 -ml-2 py-1">
              <span className="font-serif text-xl font-bold text-foreground">Vedic Intuition</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link href="/about">
              <Button variant="ghost" size="sm" data-testid="link-about" className={location === "/about" ? "bg-accent/10" : ""}>
                About Us
              </Button>
            </Link>

            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium bg-transparent hover:bg-accent/10 data-[state=open]:bg-accent/10" data-testid="button-consultation-menu">
                    Book a Consultation Now
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[700px] gap-3 p-6 md:grid-cols-2">
                      {consultationServices.map((service) => (
                        <Link key={service.href} href={service.href}>
                          <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent/10 active-elevate-2">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm font-bold leading-none">{service.title}</span>
                              <Badge variant="outline" className="text-[10px] py-0 h-4 px-1.5 font-bold border-accent/30 text-accent">{service.price}</Badge>
                            </div>
                            <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
                              {service.description}
                            </p>
                          </NavigationMenuLink>
                        </Link>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium" data-testid="button-products-menu">
                    Products
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[600px] gap-3 p-6 md:grid-cols-2">
                      {productCategories.map((category) => (
                        <Link key={category.href} href={category.href}>
                          <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover-elevate active-elevate-2" data-testid={`link-category-${category.name.toLowerCase()}`}>
                            <div className="text-sm font-medium leading-none">{category.name}</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {category.description}
                            </p>
                          </NavigationMenuLink>
                        </Link>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <Link href="/blog">
              <Button variant="ghost" size="sm" data-testid="link-blog" className={location === "/blog" ? "bg-accent/10" : ""}>
                Blogs
              </Button>
            </Link>

            <Link href="/videos">
              <Button variant="ghost" size="sm" data-testid="link-videos" className={location === "/videos" ? "bg-accent/10" : ""}>
                Videos
              </Button>
            </Link>

            <Link href="/contact">
              <Button variant="ghost" size="sm" data-testid="link-contact" className={location === "/contact" ? "bg-accent/10" : ""}>
                Contact Us
              </Button>
            </Link>
          </nav>

          {/* Right Icons */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="hidden lg:flex" data-testid="button-phone">
              <Phone className="h-5 w-5" />
            </Button>


            {user ? (
              <div className="flex items-center gap-2">
                <Link href="/profile">
                  <Button variant="ghost" size="icon" data-testid="button-profile">
                    <User className="h-5 w-5" />
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => signOut()}
                  data-testid="button-logout"
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login">
                  <Button variant="outline" size="sm" data-testid="button-login">
                    Login
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button size="sm" data-testid="button-signup">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" data-testid="button-mobile-menu">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4 mt-8">
                  <div className="space-y-1">
                    <Link href="/about">
                      <Button variant="ghost" className="w-full justify-start" onClick={() => setMobileMenuOpen(false)} data-testid="link-mobile-about">
                        About Us
                      </Button>
                    </Link>
                  </div>

                  <div className="border-t pt-4 space-y-1">
                    <p className="text-sm font-semibold text-muted-foreground px-2">Book a Consultation</p>
                    {consultationServices.map((service) => (
                      <Link key={service.href} href={service.href}>
                        <Button
                          variant="ghost"
                          className="w-full justify-start py-6 h-auto"
                          onClick={() => setMobileMenuOpen(false)}
                          data-testid={`link-mobile-consultation-${service.title.toLowerCase().replace(/\s+/g, "-")}`}
                        >
                          <div className="flex flex-col items-start gap-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{service.title}</span>
                              <Badge variant="secondary" className="text-[10px] py-0 px-1">{service.price}</Badge>
                            </div>
                            <span className="text-[10px] text-muted-foreground leading-tight line-clamp-1">{service.description}</span>
                          </div>
                        </Button>
                      </Link>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-muted-foreground px-2">Products</p>
                    {productCategories.map((category) => (
                      <Link key={category.href} href={category.href}>
                        <Button
                          variant="ghost"
                          className="w-full justify-start"
                          onClick={() => setMobileMenuOpen(false)}
                          data-testid={`link-mobile-${category.name.toLowerCase()}`}
                        >
                          {category.name}
                        </Button>
                      </Link>
                    ))}
                  </div>

                  <div className="border-t pt-4 space-y-1">
                    <Link href="/blog">
                      <Button variant="ghost" className="w-full justify-start" onClick={() => setMobileMenuOpen(false)} data-testid="link-mobile-blog">
                        Blogs
                      </Button>
                    </Link>
                    <Link href="/videos">
                      <Button variant="ghost" className="w-full justify-start" onClick={() => setMobileMenuOpen(false)} data-testid="link-mobile-videos">
                        Videos
                      </Button>
                    </Link>
                    <Link href="/contact">
                      <Button variant="ghost" className="w-full justify-start" onClick={() => setMobileMenuOpen(false)} data-testid="link-mobile-contact">
                        Contact Us
                      </Button>
                    </Link>
                  </div>

                  <div className="border-t pt-4 space-y-2">
                    {user ? (
                      <>
                        <Link href="/profile">
                          <Button variant="ghost" className="w-full justify-start" onClick={() => setMobileMenuOpen(false)} data-testid="link-mobile-profile">
                            <User className="w-4 h-4 mr-2" />
                            Profile
                          </Button>
                        </Link>
                        {isAdmin && (
                          <Link href="/admin">
                            <Button variant="ghost" className="w-full justify-start" onClick={() => setMobileMenuOpen(false)} data-testid="link-mobile-admin">
                              Admin Dashboard
                            </Button>
                          </Link>
                        )}
                        <Button
                          variant="outline"
                          className="w-full justify-start"
                          onClick={() => {
                            signOut();
                            setMobileMenuOpen(false);
                          }}
                          data-testid="button-mobile-logout"
                        >
                          <LogOut className="w-4 h-4 mr-2" />
                          Logout
                        </Button>
                      </>
                    ) : (
                      <>
                        <Link href="/login">
                          <Button variant="outline" className="w-full justify-start" onClick={() => setMobileMenuOpen(false)} data-testid="link-mobile-login">
                            Login
                          </Button>
                        </Link>
                        <Link href="/signup">
                          <Button className="w-full justify-start" onClick={() => setMobileMenuOpen(false)} data-testid="link-mobile-signup">
                            Sign Up
                          </Button>
                        </Link>
                      </>
                    )}
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
