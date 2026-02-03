import { Shield, Leaf, Globe, Award, Headphones } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

const TrustStrip = () => {
  const { t } = useLanguage();

  const trustItems = [
    {
      icon: Shield,
      title: t.trust.certified,
      description: t.trust.certifiedDesc,
    },
    {
      icon: Leaf,
      title: t.trust.ethical,
      description: t.trust.ethicalDesc,
    },
    {
      icon: Globe,
      title: t.trust.shipping,
      description: t.trust.shippingDesc,
    },
    {
      icon: Award,
      title: t.trust.guarantee,
      description: t.trust.guaranteeDesc,
    },
    {
      icon: Headphones,
      title: t.trust.support,
      description: t.trust.supportDesc,
    },
  ];

  return (
    <section className="py-12 bg-card border-y border-border/50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
          {trustItems.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-14 h-14 rounded-full bg-primary/5 flex items-center justify-center mb-3 group-hover:bg-primary/10 transition-colors">
                <item.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium text-sm text-foreground mb-1">
                {item.title}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustStrip;
