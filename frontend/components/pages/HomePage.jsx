import Navbar from '../layout/Navbar';
import HeroSection from '../sections/HeroSection';
import FeatureShowcase from '../sections/FeatureShowcase';
import ServicesSection from '../sections/ServicesSection';
import Layout from '../layout/Layout';

export default function HomePage() {
  return (
    <Layout>
      <Navbar />
      <main className="relative min-h-screen overflow-hidden">
        <HeroSection />
        <FeatureShowcase />
        <ServicesSection />
      </main>
    </Layout>
  );
}

