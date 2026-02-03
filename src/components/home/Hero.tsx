import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Button } from '@/components/ui/button';
import { generateWhatsAppUrl } from '@/components/layout/WhatsAppButton';

const Hero = () => {
  const { t, isRTL } = useLanguage();

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--primary)) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-gold/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Tagline */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 rounded-full mb-6 animate-fade-in">
            <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
            <span className="text-sm font-medium text-muted-foreground tracking-wide uppercase">
              Certified & Sustainable
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium text-primary mb-4 animate-fade-in [animation-delay:100ms]">
            {t.hero.title}
          </h1>
          <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-secondary mb-8 animate-fade-in [animation-delay:200ms]">
            {t.hero.subtitle}
          </h2>

          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in [animation-delay:300ms]">
            {t.hero.description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in [animation-delay:400ms]">
            <Button
              asChild
              size="lg"
              className="luxury-gradient text-primary-foreground px-8 py-6 text-base font-medium shadow-elevated hover:shadow-2xl transition-all duration-300 hover:-translate-y-0.5"
            >
              <Link to="/diamonds">
                {t.common.exploreDiamonds}
                <ArrowRight className={`h-5 w-5 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'}`} />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-primary/20 hover:border-primary/40 px-8 py-6 text-base font-medium bg-card/50 backdrop-blur-sm"
            >
              <a
                href={generateWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className={`h-5 w-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                {t.common.chatOnWhatsApp}
              </a>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 pt-16 border-t border-border/50 animate-fade-in [animation-delay:500ms]">
            <div className="text-center">
              <div className="font-serif text-3xl md:text-4xl font-semibold text-primary mb-1">5000+</div>
              <div className="text-sm text-muted-foreground">Diamonds</div>
            </div>
            <div className="text-center">
              <div className="font-serif text-3xl md:text-4xl font-semibold text-primary mb-1">50+</div>
              <div className="text-sm text-muted-foreground">Countries</div>
            </div>
            <div className="text-center">
              <div className="font-serif text-3xl md:text-4xl font-semibold text-primary mb-1">100%</div>
              <div className="text-sm text-muted-foreground">Certified</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
