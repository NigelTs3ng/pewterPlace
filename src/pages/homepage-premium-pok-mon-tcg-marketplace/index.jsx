import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import HeroCarousel from './components/HeroCarousel';
import LiveInventoryTicker from './components/LiveInventoryTicker';
import CategoryPortals from './components/CategoryPortals';
import RecentPulls from './components/RecentPulls';
import CollectorSpotlight from './components/CollectorSpotlight';
import TrustSignals from './components/TrustSignals';
import Footer from './components/Footer';

const Homepage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>PewterPlace - Premium Pokémon TCG Marketplace | Authentic Cards & Fast Shipping</title>
        <meta name="description" content="Discover authentic Pokémon Trading Cards at PewterPlace. From vintage Base Set to latest releases, we offer graded cards, sealed products, and singles with 100% authenticity guarantee and same-day shipping." />
        <meta name="keywords" content="Pokemon cards, TCG marketplace, graded cards, PSA, BGS, authentic Pokemon, trading cards, booster packs, singles" />
        <meta property="og:title" content="PewterPlace - Premium Pokémon TCG Marketplace" />
        <meta property="og:description" content="The collector-first marketplace for authentic Pokémon Trading Cards with lightning-fast fulfillment." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/homepage-premium-pok-mon-tcg-marketplace" />
      </Helmet>

      <Header />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-7xl mx-auto">
            <HeroCarousel />
          </div>
        </section>

        {/* Live Inventory Ticker */}
        <section className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <LiveInventoryTicker />
          </div>
        </section>

        {/* Category Portals */}
        <section className="px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-7xl mx-auto">
            <CategoryPortals />
          </div>
        </section>

        {/* Recent Pulls Community Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-8 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <RecentPulls />
          </div>
        </section>

        {/* Collector Spotlight */}
        <section className="px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-7xl mx-auto">
            <CollectorSpotlight />
          </div>
        </section>

        {/* Trust Signals */}
        <section className="px-4 sm:px-6 lg:px-8 py-8 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <TrustSignals />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Homepage;