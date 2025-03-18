
import Hero from "@/components/Hero";
import Layout from "@/components/Layout";
import Statistics from "@/components/Statistics";
import HowItWorks from "@/components/HowItWorks";
import CTASection from "@/components/CTASection";

const Index = () => {
  return (
    <Layout>
      <Hero />
      <Statistics />
      <HowItWorks />
      <CTASection />
    </Layout>
  );
};

export default Index;
