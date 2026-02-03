import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, Diamond, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { languages } from '@/i18n/translations';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t, language, setLanguage, isRTL } = useLanguage();
  const location = useLocation();

  const navLinks = [
    { href: '/', label: t.nav.home },
    { href: '/diamonds', label: t.nav.diamonds },
    { href: '/jewellery', label: t.nav.jewellery },
    { href: '/about', label: t.nav.about },
    { href: '/contact', label: t.nav.contact },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border/50 shadow-soft">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              <Diamond className="h-8 w-8 text-primary transition-transform group-hover:scale-110" />
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl md:text-2xl font-semibold text-primary tracking-tight">
                The Lab Jewel
              </span>
              <span className="text-[10px] text-muted-foreground tracking-widest uppercase hidden md:block">
                Lab-Grown Diamonds
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  'px-4 py-2 text-sm font-medium rounded-md transition-all duration-200',
                  isActive(link.href)
                    ? 'text-primary bg-primary/5'
                    : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side - Language + CTA */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground">
                  <Globe className="h-4 w-4" />
                  <span className="hidden sm:inline text-xs uppercase">{language}</span>
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align={isRTL ? 'start' : 'end'} className="min-w-[140px]">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={cn(
                      'cursor-pointer',
                      language === lang.code && 'bg-primary/5 text-primary'
                    )}
                  >
                    <span className={lang.dir === 'rtl' ? 'font-arabic' : ''}>
                      {lang.nativeName}
                    </span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Desktop CTA */}
            <Button
              asChild
              className="hidden md:inline-flex luxury-gradient text-primary-foreground hover:opacity-90"
            >
              <a
                href="https://wa.me/[WHATSAPP_NUMBER]?text=Hi%20The%20Lab%20Jewel%2C%20I%20would%20like%20to%20know%20more%20about%20your%20lab-grown%20diamonds."
                target="_blank"
                rel="noopener noreferrer"
              >
                {t.common.chatOnWhatsApp}
              </a>
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-border/50 py-4 animate-fade-in">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'px-4 py-3 text-sm font-medium rounded-md transition-colors',
                    isActive(link.href)
                      ? 'text-primary bg-primary/5'
                      : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 mt-2 border-t border-border/50">
                <Button
                  asChild
                  className="w-full luxury-gradient text-primary-foreground"
                >
                  <a
                    href="https://wa.me/[WHATSAPP_NUMBER]?text=Hi%20The%20Lab%20Jewel%2C%20I%20would%20like%20to%20know%20more%20about%20your%20lab-grown%20diamonds."
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t.common.chatOnWhatsApp}
                  </a>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
