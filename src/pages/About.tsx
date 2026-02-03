import { Leaf, Shield, Eye, Lightbulb, Diamond, Heart } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { generateWhatsAppUrl } from '@/components/layout/WhatsAppButton';
import { cn } from '@/lib/utils';

const About = () => {
  const { t, isRTL } = useLanguage();

  const values = [
    {
      icon: Leaf,
      title: t.about.value1,
      description: t.about.value1Desc,
    },
    {
      icon: Eye,
      title: t.about.value2,
      description: t.about.value2Desc,
    },
    {
      icon: Shield,
      title: t.about.value3,
      description: t.about.value3Desc,
    },
    {
      icon: Lightbulb,
      title: t.about.value4,
      description: t.about.value4Desc,
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
              <Diamond className="h-8 w-8 text-primary" />
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-primary mb-4">
              {t.about.title}
            </h1>
            <p className="text-xl text-muted-foreground">
              {t.about.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="font-serif text-3xl md:text-4xl text-primary mb-6">
                {t.about.story}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {t.about.storyText}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                [PLACEHOLDER: Add more details about the company's founding story, 
                the journey, and what inspired the creation of The Lab Jewel. 
                Include information about the team, expertise, and commitment to quality.]
              </p>
            </div>
            <div className="order-1 lg:order-2">
              <div className="aspect-[4/3] bg-muted/30 rounded-2xl border border-border/50 flex items-center justify-center">
                <span className="text-muted-foreground text-sm">
                  [PLACEHOLDER: Brand Story Image]
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="aspect-[4/3] bg-muted/30 rounded-2xl border border-border/50 flex items-center justify-center">
                <span className="text-muted-foreground text-sm">
                  [PLACEHOLDER: Mission Image]
                </span>
              </div>
            </div>
            <div>
              <h2 className="font-serif text-3xl md:text-4xl text-primary mb-6">
                {t.about.mission}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {t.about.missionText}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                [PLACEHOLDER: Expand on the company mission, including specific goals, 
                customer promises, and the vision for the future of sustainable luxury.]
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-serif text-3xl md:text-4xl text-primary mb-4">
              {t.about.values}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-card rounded-xl border border-border/50 p-6 text-center hover:shadow-card transition-shadow"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-serif text-xl text-primary mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Lab-Grown Section */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <h2 className="font-serif text-3xl md:text-4xl text-primary mb-4">
                {t.about.whyLabGrown}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {t.about.whyLabGrownText}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="p-6">
                <div className="font-serif text-4xl text-primary mb-2">30-50%</div>
                <div className="text-sm text-muted-foreground">Lower Cost</div>
              </div>
              <div className="p-6">
                <div className="font-serif text-4xl text-primary mb-2">0%</div>
                <div className="text-sm text-muted-foreground">Mining Impact</div>
              </div>
              <div className="p-6">
                <div className="font-serif text-4xl text-primary mb-2">100%</div>
                <div className="text-sm text-muted-foreground">Real Diamond</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl text-primary mb-4">
              Ready to Experience the Difference?
            </h2>
            <p className="text-muted-foreground mb-8">
              Connect with our diamond experts and discover the perfect stone for your needs.
            </p>
            <Button
              asChild
              size="lg"
              className="luxury-gradient text-primary-foreground"
            >
              <a
                href={generateWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t.common.chatOnWhatsApp}
              </a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
