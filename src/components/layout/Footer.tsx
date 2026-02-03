import { Link } from 'react-router-dom';
import { Diamond, Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer = () => {
  const { t, isRTL } = useLanguage();

  const quickLinks = [
    { href: '/', label: t.nav.home },
    { href: '/diamonds', label: t.nav.diamonds },
    { href: '/about', label: t.nav.about },
    { href: '/contact', label: t.nav.contact },
  ];

  const categories = [
    { href: '/diamonds?group=white', label: t.groups.white },
    { href: '/diamonds?group=color', label: t.groups.color },
    { href: '/diamonds?group=melee', label: t.groups.melee },
    { href: '/diamonds?group=fancy', label: t.groups.fancy },
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Diamond className="h-8 w-8" />
              <span className="font-serif text-2xl font-semibold">The Lab Jewel</span>
            </Link>
            <p className="text-primary-foreground/80 text-sm mb-6">
              {t.footer.tagline}
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="tel:[OFFICE_NUMBER]"
                className="flex items-center gap-2 text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>[OFFICE_NUMBER]</span>
              </a>
              <a
                href="mailto:[EMAIL]"
                className="flex items-center gap-2 text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span>[EMAIL]</span>
              </a>
              <div className="flex items-start gap-2 text-sm text-primary-foreground/80">
                <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" />
                <span>[ADDRESS]</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-medium mb-4">{t.footer.quickLinks}</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-serif text-lg font-medium mb-4">{t.footer.categories}</h4>
            <ul className="space-y-2">
              {categories.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* WhatsApp CTA + Newsletter */}
          <div>
            <h4 className="font-serif text-lg font-medium mb-4">{t.footer.support}</h4>
            <Button
              asChild
              variant="secondary"
              className="w-full mb-6 bg-green-600 hover:bg-green-700 text-white border-0"
            >
              <a
                href="https://wa.me/[WHATSAPP_NUMBER]?text=Hi%20The%20Lab%20Jewel%2C%20I%20would%20like%20to%20know%20more%20about%20your%20lab-grown%20diamonds."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <MessageCircle className="h-4 w-4" />
                {t.common.chatOnWhatsApp}
              </a>
            </Button>

            <h4 className="font-serif text-lg font-medium mb-3">{t.footer.newsletter}</h4>
            <p className="text-sm text-primary-foreground/80 mb-3">
              {t.footer.newsletterText}
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Email"
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
              />
              <Button variant="secondary" size="sm" className="flex-shrink-0">
                {t.footer.subscribe}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-primary-foreground/60">
            <p>{t.footer.copyright}</p>
            <div className="flex items-center gap-4">
              <Link to="/privacy" className="hover:text-primary-foreground transition-colors">
                {t.footer.privacy}
              </Link>
              <Link to="/terms" className="hover:text-primary-foreground transition-colors">
                {t.footer.terms}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
