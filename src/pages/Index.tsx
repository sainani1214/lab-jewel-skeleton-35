import Layout from '@/components/layout/Layout';
import Hero from '@/components/home/Hero';
import TrustStrip from '@/components/home/TrustStrip';
import FeaturedGroups from '@/components/home/FeaturedGroups';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import Testimonials from '@/components/home/Testimonials';
import FAQ from '@/components/home/FAQ';
import FinalCTA from '@/components/home/FinalCTA';

const Index = () => {
  return (
    <Layout>
      <Hero />
      <TrustStrip />
      <FeaturedGroups />
      <FeaturedProducts />
      <Testimonials />
      <FAQ />
      <FinalCTA />
    </Layout>
  );
};

export default Index;
