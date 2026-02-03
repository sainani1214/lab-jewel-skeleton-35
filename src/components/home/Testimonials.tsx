import { Star, Quote } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

const testimonials = [
  {
    name: 'Sarah M.',
    location: 'Dubai, UAE',
    text: 'Absolutely stunning diamond! The quality exceeded my expectations and the customer service was impeccable. Highly recommend The Lab Jewel.',
    rating: 5,
  },
  {
    name: 'James L.',
    location: 'Manila, Philippines',
    text: 'I was skeptical about lab-grown diamonds at first, but after seeing mine in person, I am completely convinced. Beautiful, ethical, and affordable.',
    rating: 5,
  },
  {
    name: 'Aisha K.',
    location: 'Riyadh, Saudi Arabia',
    text: 'The certification process gave me complete peace of mind. My engagement ring is perfect and I love knowing it was ethically sourced.',
    rating: 5,
  },
];

const Testimonials = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-serif text-3xl md:text-4xl text-primary mb-4">
            {t.testimonials.title}
          </h2>
          <p className="text-muted-foreground">{t.testimonials.subtitle}</p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="relative bg-card rounded-2xl p-6 md:p-8 border border-border/50 shadow-soft animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Quote Icon */}
              <Quote className="absolute top-6 right-6 h-8 w-8 text-primary/10" />

              {/* Stars */}
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-gold text-gold"
                  />
                ))}
              </div>

              {/* Text */}
              <p className="text-foreground/90 mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="font-serif text-lg text-primary">
                    {testimonial.name[0]}
                  </span>
                </div>
                <div>
                  <div className="font-medium text-foreground">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.location}
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

export default Testimonials;
