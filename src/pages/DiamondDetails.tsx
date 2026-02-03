import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MessageCircle, Shield, Award, Sparkles } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { diamonds } from '@/data/diamonds';
import { generateWhatsAppUrl } from '@/components/layout/WhatsAppButton';
import { cn } from '@/lib/utils';

const DiamondDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { t, isRTL } = useLanguage();

  const diamond = diamonds.find((d) => d.id === id);

  if (!diamond) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="font-serif text-2xl text-primary mb-4">Diamond Not Found</h1>
          <Button asChild variant="outline">
            <Link to="/diamonds">
              <ArrowLeft className={cn('h-4 w-4', isRTL ? 'ml-2 rotate-180' : 'mr-2')} />
              Back to Diamonds
            </Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const specs = [
    { label: t.diamond.shape, value: diamond.shape },
    { label: t.diamond.carat, value: `${diamond.carat}ct` },
    { label: t.diamond.color, value: diamond.color },
    { label: t.diamond.clarity, value: diamond.clarity },
    { label: t.diamond.cut, value: diamond.cut },
    { label: t.diamond.polish, value: diamond.polish },
    { label: t.diamond.symmetry, value: diamond.symmetry },
    { label: t.diamond.certification, value: diamond.certification },
    { label: t.diamond.measurements, value: diamond.measurements },
  ];

  return (
    <Layout>
      <div className="min-h-screen">
        {/* Breadcrumb */}
        <div className="bg-card border-b border-border/50">
          <div className="container mx-auto px-4 py-4">
            <Link
              to="/diamonds"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className={cn('h-4 w-4', isRTL ? 'ml-2 rotate-180' : 'mr-2')} />
              Back to Diamonds
            </Link>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Gallery */}
            <div className="space-y-4">
              <div className="aspect-square bg-card rounded-2xl border border-border/50 overflow-hidden">
                <img
                  src={diamond.image}
                  alt={diamond.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Thumbnail placeholders */}
              <div className="grid grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="aspect-square bg-muted/30 rounded-lg border border-border/50 cursor-pointer hover:border-primary/50 transition-colors"
                  />
                ))}
              </div>
            </div>

            {/* Details */}
            <div className="space-y-6">
              {/* Header */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 bg-primary text-primary-foreground text-xs font-medium rounded">
                    {diamond.certification}
                  </span>
                  {diamond.inStock ? (
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">
                      {t.common.inStock}
                    </span>
                  ) : (
                    <span className="px-2 py-1 bg-muted text-muted-foreground text-xs font-medium rounded">
                      {t.common.outOfStock}
                    </span>
                  )}
                </div>
                <h1 className="font-serif text-3xl md:text-4xl text-primary mb-2">
                  {diamond.name}
                </h1>
                <p className="text-muted-foreground">
                  {diamond.shape} • {diamond.carat}ct • {diamond.color} • {diamond.clarity}
                </p>
              </div>

              {/* Price */}
              <div className="text-3xl font-semibold text-primary">
                {diamond.price
                  ? `$${diamond.price.toLocaleString()}`
                  : t.common.onRequest}
              </div>

              {/* CTA */}
              <Button
                asChild
                size="lg"
                className="w-full luxury-gradient text-primary-foreground"
              >
                <a
                  href={generateWhatsAppUrl(
                    diamond.name,
                    diamond.id,
                    diamond.group,
                    `${diamond.shape}, ${diamond.carat}ct, ${diamond.color}, ${diamond.clarity}`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className={cn('h-5 w-5', isRTL ? 'ml-2' : 'mr-2')} />
                  {t.common.getDetails}
                </a>
              </Button>

              {/* Trust Items */}
              <div className="grid grid-cols-3 gap-4 py-6 border-y border-border/50">
                <div className="text-center">
                  <Shield className="h-6 w-6 text-primary mx-auto mb-2" />
                  <span className="text-xs text-muted-foreground">Certified</span>
                </div>
                <div className="text-center">
                  <Award className="h-6 w-6 text-primary mx-auto mb-2" />
                  <span className="text-xs text-muted-foreground">Guaranteed</span>
                </div>
                <div className="text-center">
                  <Sparkles className="h-6 w-6 text-primary mx-auto mb-2" />
                  <span className="text-xs text-muted-foreground">Lab-Grown</span>
                </div>
              </div>

              {/* Specifications */}
              <div>
                <h2 className="font-serif text-xl text-primary mb-4">
                  {t.diamond.specifications}
                </h2>
                <div className="bg-card rounded-xl border border-border/50 overflow-hidden">
                  <table className="w-full">
                    <tbody>
                      {specs.map((spec, index) => (
                        <tr
                          key={spec.label}
                          className={cn(
                            'border-b border-border/50 last:border-0',
                            index % 2 === 0 && 'bg-muted/30'
                          )}
                        >
                          <td className="px-4 py-3 text-sm text-muted-foreground">
                            {spec.label}
                          </td>
                          <td className="px-4 py-3 text-sm font-medium text-foreground text-right">
                            {spec.value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DiamondDetails;
