'use client';

import Link from 'next/link';
import { ArrowRight, TrendingUp, Shield, Users, Zap, MapPin, Search, Star, Sparkles, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ProductCard, ProductGrid } from '@/components/product-card';
import { CategoryGrid } from '@/components/category-card';
import { categories, regions, formatTZS } from '@/lib/data';
import { getAllProducts } from '@/lib/mock-data';
import { useThemeStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import { useMemo } from 'react';

export default function HomePage() {
  const allProducts = useMemo(() => getAllProducts(), []);
  const featuredProducts = allProducts.filter((p) => p.featured);
  const recentProducts = allProducts.slice(0, 8);
  const { themeId } = useThemeStore();

  return (
    <div className="min-h-screen">
      {/* SAFARI THEME HERO */}
      {themeId === 'safari' && (
        <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
          <div className="container mx-auto px-4 py-12 md:py-20 relative">
            <div className="max-w-3xl mx-auto text-center">
              <Badge variant="secondary" className="mb-4">
                Karibu Soko Tanzania
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
                Buy & Sell{' '}
                <span className="text-primary">Anything</span> in Tanzania
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto text-pretty">
                Tanzania&apos;s largest online marketplace. Find the best deals on electronics,
                vehicles, property, fashion and more across all regions.
              </p>
              <SearchBox />
              <PopularSearches />
            </div>
          </div>
          <StatsBar />
        </section>
      )}

      {/* OCEAN THEME HERO - Split layout with glass morphism */}
      {themeId === 'ocean' && (
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/10" />
          <div className="absolute inset-0 backdrop-blur-3xl" />
          <div className="container mx-auto px-4 py-16 md:py-24 relative">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <Badge className="mb-4 rounded-full px-4 py-1 bg-primary/10 text-primary border-primary/20">
                  <Sparkles className="w-3 h-3 mr-1" /> Tanzania&apos;s #1 Marketplace
                </Badge>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6 text-balance leading-tight">
                  Discover Amazing
                  <span className="block font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Products & Services
                  </span>
                </h1>
                <p className="text-lg text-muted-foreground mb-8 text-pretty">
                  From Dar es Salaam to Zanzibar, connect with trusted buyers and sellers across Tanzania.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/categories">
                    <Button size="lg" className="rounded-full gap-2 px-6">
                      Start Exploring <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Link href="/sell">
                    <Button size="lg" variant="outline" className="rounded-full px-6">
                      Post Free Ad
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-3xl" />
                <div className="relative bg-card/60 backdrop-blur-xl rounded-3xl p-6 border border-border/50">
                  <SearchBox variant="ocean" />
                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <StatCard icon={<Users />} value="100K+" label="Active Users" />
                    <StatCard icon={<Star />} value="50K+" label="Listings" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* KILIMANJARO THEME HERO - Full width bold design */}
      {themeId === 'kilimanjaro' && (
        <section className="relative bg-foreground text-background overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_25%,rgba(255,255,255,0.05)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.05)_75%)] bg-[length:64px_64px]" />
          <div className="container mx-auto px-4 py-16 md:py-24 relative">
            <div className="max-w-4xl">
              <div className="inline-block bg-primary text-primary-foreground px-4 py-2 mb-6">
                <span className="text-sm font-bold uppercase tracking-wider">Tanzania Marketplace</span>
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 uppercase tracking-tight leading-none">
                Buy.<br />Sell.<br />
                <span className="text-primary">Win.</span>
              </h1>
              <p className="text-xl text-background/70 mb-8 max-w-xl font-light">
                The boldest marketplace in East Africa. No limits. No boundaries. Just pure commerce.
              </p>
              <div className="flex flex-wrap gap-2">
                <Link href="/categories">
                  <Button size="lg" className="rounded-none h-14 px-8 text-lg font-bold uppercase bg-primary hover:bg-primary/90">
                    Shop Now
                  </Button>
                </Link>
                <Link href="/sell">
                  <Button size="lg" variant="outline" className="rounded-none h-14 px-8 text-lg font-bold uppercase border-2 border-background text-background hover:bg-background hover:text-foreground">
                    Sell Yours
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          <div className="border-t-4 border-primary">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-background/20">
                <KiliStat value="50K+" label="Products" />
                <KiliStat value="100K+" label="Users" />
                <KiliStat value="26" label="Regions" />
                <KiliStat value="24/7" label="Support" />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SERENGETI THEME HERO - Minimal organic design */}
      {themeId === 'serengeti' && (
        <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background">
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
          <div className="container mx-auto px-4 py-20 md:py-32 relative">
            <div className="max-w-2xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-8">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span className="text-sm text-primary font-medium">Live in All 26 Regions</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance leading-tight">
                Your Marketplace for
                <span className="block text-primary">Authentic Tanzania</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-10 text-pretty leading-relaxed">
                Connect with real people, find genuine products, and support local businesses across the beautiful land of Tanzania.
              </p>
              <SearchBox variant="serengeti" />
              <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" /> Verified Sellers
                </span>
                <span className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-primary" /> Instant Connect
                </span>
                <span className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" /> Local First
                </span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Categories Section */}
      <section className={cn('py-12',
        themeId === 'ocean' && 'py-16 bg-gradient-to-b from-muted/30 to-background',
        themeId === 'kilimanjaro' && 'py-16 bg-muted',
        themeId === 'serengeti' && 'py-20'
      )}>
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Browse Categories"
            subtitle="Find what you need by category"
            link="/categories"
            linkText="View All"
          />
          <CategoryGrid variant="large" />
        </div>
      </section>

      {/* Featured Products */}
      <section className={cn('py-12',
        themeId === 'safari' && 'bg-muted/30',
        themeId === 'ocean' && 'py-16',
        themeId === 'kilimanjaro' && 'py-16 bg-background',
        themeId === 'serengeti' && 'py-20 bg-muted/20'
      )}>
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Featured Listings"
            subtitle="Hand-picked top quality ads"
            link="/featured"
            linkText="See All"
            icon={<Star className="w-5 h-5" />}
          />
          <ProductGrid products={featuredProducts} columns={4} />
        </div>
      </section>

      {/* Recent Products */}
      <section className={cn('py-12',
        themeId === 'ocean' && 'py-16 bg-muted/30',
        themeId === 'kilimanjaro' && 'py-16 bg-muted',
        themeId === 'serengeti' && 'py-20'
      )}>
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Latest Listings"
            subtitle="Fresh ads just posted"
            link="/recent"
            linkText="View More"
            icon={<TrendingUp className="w-5 h-5" />}
          />
          <ProductGrid products={recentProducts} columns={4} />
        </div>
      </section>

      {/* Regions Section */}
      <section className={cn('py-12',
        themeId === 'safari' && 'bg-muted/30',
        themeId === 'ocean' && 'py-16',
        themeId === 'kilimanjaro' && 'py-16 bg-background',
        themeId === 'serengeti' && 'py-20 bg-muted/20'
      )}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className={cn('text-2xl font-bold mb-2',
              themeId === 'kilimanjaro' && 'text-3xl uppercase tracking-tight'
            )}>Shop by Region</h2>
            <p className="text-muted-foreground">Find items near you across Tanzania</p>
          </div>
          <div className={cn('grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3',
            themeId === 'ocean' && 'gap-4',
            themeId === 'kilimanjaro' && 'gap-1',
            themeId === 'serengeti' && 'gap-5'
          )}>
            {regions.slice(0, 12).map((region) => (
              <RegionCard key={region} region={region} />
            ))}
          </div>
          <div className="text-center mt-6">
            <Link href="/regions">
              <Button variant="outline" className={cn('gap-2',
                themeId === 'ocean' && 'rounded-full',
                themeId === 'kilimanjaro' && 'rounded-none uppercase font-bold',
                themeId === 'serengeti' && 'rounded-2xl'
              )}>
                View All Regions <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <FeaturesSection />

      {/* CTA Section */}
      <CTASection />
    </div>
  );
}

// Reusable Components
function SearchBox({ variant = 'default' }: { variant?: 'default' | 'ocean' | 'serengeti' }) {
  const { themeId } = useThemeStore();
  const effectiveVariant = variant === 'default' ? themeId : variant;

  if (effectiveVariant === 'ocean') {
    return (
      <form className="space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="What are you looking for?"
            className="pl-12 h-14 text-lg rounded-2xl border-border/50 bg-background/50 backdrop-blur-sm"
          />
        </div>
        <div className="flex gap-2">
          <select className="flex-1 h-12 px-4 rounded-xl bg-background/50 backdrop-blur-sm border border-border/50 text-sm">
            <option value="">All Categories</option>
            {categories.slice(0, 6).map((cat) => (
              <option key={cat.id} value={cat.slug}>{cat.name}</option>
            ))}
          </select>
          <Button className="h-12 px-8 rounded-xl">Search</Button>
        </div>
      </form>
    );
  }

  if (effectiveVariant === 'serengeti') {
    return (
      <form className="max-w-xl mx-auto">
        <div className="flex items-center gap-2 p-2 bg-card rounded-full border shadow-lg">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products, services..."
              className="pl-12 h-12 border-0 bg-transparent focus-visible:ring-0 text-base"
            />
          </div>
          <Button size="lg" className="h-12 px-8 rounded-full">
            Search
          </Button>
        </div>
      </form>
    );
  }

  if (effectiveVariant === 'kilimanjaro') {
    return (
      <form className="max-w-2xl">
        <div className="flex">
          <Input
            type="search"
            placeholder="SEARCH ANYTHING..."
            className="h-14 rounded-none border-2 border-background bg-transparent text-background placeholder:text-background/50 text-lg font-medium uppercase"
          />
          <Button size="lg" className="h-14 px-8 rounded-none bg-primary text-primary-foreground font-bold uppercase">
            Go
          </Button>
        </div>
      </form>
    );
  }

  // Safari default
  return (
    <div className="max-w-2xl mx-auto">
      <form className="flex flex-col sm:flex-row gap-3 p-2 bg-card rounded-2xl border border-border shadow-lg">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="What are you looking for?"
            className="pl-10 h-12 border-0 bg-transparent focus-visible:ring-0"
          />
        </div>
        <div className="relative flex-1 hidden sm:block">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <select className="w-full h-12 pl-10 pr-4 rounded-xl bg-muted/50 border-0 text-sm focus:ring-2 focus:ring-primary appearance-none cursor-pointer">
            <option value="">All Tanzania</option>
            {regions.slice(0, 10).map((region) => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>
        </div>
        <Button size="lg" className="h-12 px-8">Search</Button>
      </form>
    </div>
  );
}

function PopularSearches() {
  return (
    <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
      <span className="text-sm text-muted-foreground">Popular:</span>
      {['iPhone', 'Toyota', 'House Rent', 'Laptop', 'Furniture'].map((term) => (
        <Link
          key={term}
          href={`/search?q=${term}`}
          className="px-3 py-1 rounded-full bg-muted text-sm hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          {term}
        </Link>
      ))}
    </div>
  );
}

function StatsBar() {
  return (
    <div className="border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <p className="text-2xl md:text-3xl font-bold text-primary">50K+</p>
            <p className="text-sm text-muted-foreground">Active Listings</p>
          </div>
          <div>
            <p className="text-2xl md:text-3xl font-bold text-primary">100K+</p>
            <p className="text-sm text-muted-foreground">Happy Users</p>
          </div>
          <div>
            <p className="text-2xl md:text-3xl font-bold text-primary">26</p>
            <p className="text-sm text-muted-foreground">Regions Covered</p>
          </div>
          <div>
            <p className="text-2xl md:text-3xl font-bold text-primary">8</p>
            <p className="text-sm text-muted-foreground">Categories</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="text-center p-4 rounded-xl bg-background/50 backdrop-blur-sm">
      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2 text-primary">
        {icon}
      </div>
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}

function KiliStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="py-6 text-center">
      <p className="text-3xl md:text-4xl font-black text-primary">{value}</p>
      <p className="text-sm uppercase tracking-wider text-background/60">{label}</p>
    </div>
  );
}

function SectionHeader({ title, subtitle, link, linkText, icon }: {
  title: string;
  subtitle: string;
  link: string;
  linkText: string;
  icon?: React.ReactNode;
}) {
  const { themeId } = useThemeStore();

  return (
    <div className={cn('flex items-center justify-between mb-8',
      themeId === 'serengeti' && 'mb-12'
    )}>
      <div className={cn('flex items-center gap-3',
        themeId === 'kilimanjaro' && 'gap-4'
      )}>
        {icon && (
          <div className={cn(
            'w-10 h-10 flex items-center justify-center',
            themeId === 'safari' && 'rounded-xl bg-primary/10 text-primary',
            themeId === 'ocean' && 'rounded-full bg-primary/10 text-primary',
            themeId === 'kilimanjaro' && 'bg-primary text-primary-foreground',
            themeId === 'serengeti' && 'rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 text-primary'
          )}>
            {icon}
          </div>
        )}
        <div>
          <h2 className={cn('text-2xl font-bold',
            themeId === 'kilimanjaro' && 'text-3xl uppercase tracking-tight',
            themeId === 'serengeti' && 'text-3xl'
          )}>{title}</h2>
          <p className="text-muted-foreground">{subtitle}</p>
        </div>
      </div>
      <Link href={link}>
        <Button variant="outline" className={cn('gap-2',
          themeId === 'ocean' && 'rounded-full',
          themeId === 'kilimanjaro' && 'rounded-none uppercase font-bold',
          themeId === 'serengeti' && 'rounded-2xl'
        )}>
          {linkText} <ArrowRight className="w-4 h-4" />
        </Button>
      </Link>
    </div>
  );
}

function RegionCard({ region }: { region: string }) {
  const { themeId } = useThemeStore();

  return (
    <Link href={`/region/${region.toLowerCase().replace(' ', '-')}`}>
      <Card className={cn('hover:shadow-md transition-all hover:border-primary/50 cursor-pointer',
        themeId === 'ocean' && 'rounded-2xl bg-card/60 backdrop-blur-sm border-border/50 hover:bg-card',
        themeId === 'kilimanjaro' && 'rounded-none border-2 hover:border-primary hover:bg-primary/5',
        themeId === 'serengeti' && 'rounded-2xl hover:shadow-lg hover:-translate-y-0.5'
      )}>
        <CardContent className={cn('p-4 text-center',
          themeId === 'serengeti' && 'p-5'
        )}>
          <MapPin className={cn('w-6 h-6 mx-auto mb-2',
            themeId === 'safari' && 'text-primary',
            themeId === 'ocean' && 'text-primary/80',
            themeId === 'kilimanjaro' && 'text-primary',
            themeId === 'serengeti' && 'text-primary'
          )} />
          <p className={cn('font-medium text-sm',
            themeId === 'kilimanjaro' && 'uppercase tracking-wide text-xs font-bold'
          )}>{region}</p>
        </CardContent>
      </Card>
    </Link>
  );
}

function FeaturesSection() {
  const { themeId } = useThemeStore();

  const features = [
    {
      icon: <Shield className="w-7 h-7" />,
      title: 'Secure Transactions',
      description: 'Verified sellers and secure payment options including M-Pesa',
    },
    {
      icon: <Users className="w-7 h-7" />,
      title: 'Large Community',
      description: 'Over 100,000 active buyers and sellers across Tanzania',
    },
    {
      icon: <Zap className="w-7 h-7" />,
      title: 'Easy to Use',
      description: 'Post your ad in minutes and reach thousands of buyers instantly',
    },
    {
      icon: <MapPin className="w-7 h-7" />,
      title: 'All Regions',
      description: 'Available in all 26 regions of Tanzania including Zanzibar',
    },
  ];

  return (
    <section className={cn('py-16',
      themeId === 'kilimanjaro' && 'py-20 bg-foreground text-background',
      themeId === 'serengeti' && 'py-24'
    )}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className={cn('text-2xl md:text-3xl font-bold mb-3',
            themeId === 'kilimanjaro' && 'text-4xl uppercase tracking-tight'
          )}>Why Choose Soko Tanzania?</h2>
          <p className={cn('max-w-2xl mx-auto',
            themeId === 'kilimanjaro' ? 'text-background/70' : 'text-muted-foreground'
          )}>
            We provide a safe, secure, and easy way to buy and sell in Tanzania
          </p>
        </div>
        <div className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6',
          themeId === 'serengeti' && 'gap-8'
        )}>
          {features.map((feature, i) => (
            <Card key={i} className={cn('border-0 shadow-none bg-transparent',
              themeId === 'ocean' && 'bg-card/60 backdrop-blur-sm rounded-2xl border border-border/50 shadow-sm',
              themeId === 'kilimanjaro' && 'bg-background/10 rounded-none border-2 border-background/20',
              themeId === 'serengeti' && 'bg-card rounded-3xl shadow-lg'
            )}>
              <CardContent className={cn('p-6 text-center',
                themeId === 'serengeti' && 'p-8'
              )}>
                <div className={cn(
                  'w-14 h-14 flex items-center justify-center mx-auto mb-4',
                  themeId === 'safari' && 'rounded-2xl bg-primary/10 text-primary',
                  themeId === 'ocean' && 'rounded-full bg-gradient-to-br from-primary/20 to-accent/20 text-primary',
                  themeId === 'kilimanjaro' && 'bg-primary text-primary-foreground',
                  themeId === 'serengeti' && 'rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 text-primary'
                )}>
                  {feature.icon}
                </div>
                <h3 className={cn('font-semibold text-lg mb-2',
                  themeId === 'kilimanjaro' && 'uppercase tracking-wide'
                )}>{feature.title}</h3>
                <p className={cn('text-sm',
                  themeId === 'kilimanjaro' ? 'text-background/60' : 'text-muted-foreground'
                )}>
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  const { themeId } = useThemeStore();

  return (
    <section className={cn(
      'py-16',
      themeId === 'safari' && 'bg-primary text-primary-foreground',
      themeId === 'ocean' && 'bg-gradient-to-r from-primary to-accent text-white',
      themeId === 'kilimanjaro' && 'bg-primary',
      themeId === 'serengeti' && 'bg-gradient-to-br from-primary via-primary to-accent text-primary-foreground'
    )}>
      <div className="container mx-auto px-4 text-center">
        <h2 className={cn('text-2xl md:text-3xl font-bold mb-4',
          themeId === 'kilimanjaro' && 'text-4xl uppercase tracking-tight text-primary-foreground'
        )}>
          Ready to Start Selling?
        </h2>
        <p className={cn('mb-8 max-w-xl mx-auto',
          themeId === 'safari' && 'text-primary-foreground/80',
          themeId === 'ocean' && 'text-white/80',
          themeId === 'kilimanjaro' && 'text-primary-foreground/70',
          themeId === 'serengeti' && 'text-primary-foreground/80'
        )}>
          Join thousands of sellers making money on Soko Tanzania. Post your first ad for free today!
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/sell">
            <Button size="lg" variant="secondary" className={cn('gap-2',
              themeId === 'ocean' && 'rounded-full',
              themeId === 'kilimanjaro' && 'rounded-none uppercase font-bold',
              themeId === 'serengeti' && 'rounded-full'
            )}>
              Post Free Ad
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link href="/auth/register?role=seller">
            <Button
              size="lg"
              variant="outline"
              className={cn(
                themeId === 'safari' && 'border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10',
                themeId === 'ocean' && 'border-white/30 text-white hover:bg-white/10 rounded-full',
                themeId === 'kilimanjaro' && 'border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary rounded-none uppercase font-bold',
                themeId === 'serengeti' && 'border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 rounded-full'
              )}
            >
              Become a Seller
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
