import { useRef } from 'react';
import { ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { diamonds } from '@/data/diamonds';
import { Button } from '@/components/ui/button';
import { generateWhatsAppUrl } from '@/components/layout/WhatsAppButton';
import { cn } from '@/lib/utils';

const FeaturedProducts = () => {
  const { t, isRTL } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);

  const featuredDiamonds = diamonds.filter((d) => d.featured);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="py-16 md:py-24 bg-card">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl text-primary mb-2">
              Featured Diamonds
            </h2>
            <p className="text-muted-foreground">
              Hand-picked stones with exceptional brilliance
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll('left')}
              className="rounded-full"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll('right')}
              className="rounded-full"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Products Carousel */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {featuredDiamonds.map((diamond) => (
            <div
              key={diamond.id}
              className="flex-shrink-0 w-[280px] md:w-[300px] snap-start"
            >
              <div className="group bg-background rounded-xl border border-border/50 overflow-hidden transition-all duration-300 hover:shadow-card hover:-translate-y-1">
                {/* Image */}
                <div className="aspect-square relative bg-muted/30 overflow-hidden">
                  <img
                    src={diamond.image}
                    alt={diamond.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Badge */}
                  <div className="absolute top-3 left-3 px-2 py-1 bg-primary text-primary-foreground text-xs font-medium rounded">
                    {diamond.certification}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-serif text-lg text-primary mb-1 truncate">
                    {diamond.name}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <span>{diamond.shape}</span>
                    <span>•</span>
                    <span>{diamond.carat}ct</span>
                    <span>•</span>
                    <span>{diamond.color}</span>
                    <span>•</span>
                    <span>{diamond.clarity}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="font-semibold text-primary">
                      {diamond.price
                        ? `$${diamond.price.toLocaleString()}`
                        : t.common.onRequest}
                    </div>
                    <Button
                      asChild
                      size="sm"
                      variant="outline"
                      className="border-primary/20 hover:bg-primary hover:text-primary-foreground"
                    >
                      <a
                        href={generateWhatsAppUrl(
                          diamond.name,
                          diamond.id,
                          diamond.group
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <MessageCircle className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
