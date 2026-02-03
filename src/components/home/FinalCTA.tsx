import { MessageCircle, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Button } from '@/components/ui/button';
import { generateWhatsAppUrl } from '@/components/layout/WhatsAppButton';
import { cn } from '@/lib/utils';

const FinalCTA = () => {
  const { t, isRTL } = useLanguage();

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-3xl luxury-gradient p-8 md:p-16 text-center">
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="font-serif text-3xl md:text-5xl text-primary-foreground mb-4">
              Ready to Find Your Perfect Diamond?
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8">
              Chat with our diamond experts on WhatsApp. We're here to help you
              find the perfect stone at the best price.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 px-8 py-6 text-base font-medium shadow-elevated"
            >
              <a
                href={generateWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className={cn('h-5 w-5', isRTL ? 'ml-2' : 'mr-2')} />
                {t.common.chatOnWhatsApp}
                <ArrowRight className={cn('h-5 w-5', isRTL ? 'mr-2 rotate-180' : 'ml-2')} />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
