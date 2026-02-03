import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/i18n/LanguageContext';
import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Jewellery = () => {
  const { t } = useLanguage();

  return (
    <Layout>
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Clock className="h-10 w-10 text-primary" />
          </div>
          <h1 className="font-serif text-3xl md:text-4xl text-primary mb-4">
            {t.nav.jewellery}
          </h1>
          <p className="text-muted-foreground mb-8">
            {t.common.comingSoon}. We're crafting an exquisite collection of fine jewellery. 
            Stay tuned for stunning pieces that will take your breath away.
          </p>
          <Button asChild>
            <Link to="/diamonds">{t.common.exploreDiamonds}</Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Jewellery;
