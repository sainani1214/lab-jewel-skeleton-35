import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { generateWhatsAppUrl } from '@/components/layout/WhatsAppButton';

const Contact = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect to WhatsApp with form data
    const message = `Hi The Lab Jewel,

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Subject: ${formData.subject}

Message:
${formData.message}`;

    const whatsappUrl = `https://wa.me/[WHATSAPP_NUMBER]?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const contactInfo = [
    {
      icon: Phone,
      title: t.contact.info.phone,
      value: '[OFFICE_NUMBER]',
      href: 'tel:[OFFICE_NUMBER]',
    },
    {
      icon: Mail,
      title: t.contact.info.email,
      value: '[EMAIL]',
      href: 'mailto:[EMAIL]',
    },
    {
      icon: MapPin,
      title: t.contact.info.address,
      value: '[ADDRESS]',
      href: '#',
    },
    {
      icon: Clock,
      title: t.contact.info.hours,
      value: t.contact.info.hoursText,
      href: '#',
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="font-serif text-4xl md:text-5xl text-primary mb-4">
              {t.contact.title}
            </h1>
            <p className="text-xl text-muted-foreground">
              {t.contact.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Form */}
            <div>
              <div className="bg-card rounded-2xl border border-border/50 p-6 md:p-8 shadow-soft">
                <h2 className="font-serif text-2xl text-primary mb-6">
                  Send us a Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="name">{t.contact.form.name}</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">{t.contact.form.email}</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="phone">{t.contact.form.phone}</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">{t.contact.form.subject}</Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">{t.contact.form.message}</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full luxury-gradient text-primary-foreground"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    {t.contact.form.submit}
                  </Button>
                </form>
              </div>
            </div>

            {/* Contact Info + Map */}
            <div className="space-y-8">
              {/* Quick Contact */}
              <div>
                <h2 className="font-serif text-2xl text-primary mb-6">
                  {t.contact.info.title}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {contactInfo.map((info, index) => (
                    <a
                      key={index}
                      href={info.href}
                      className="flex items-start gap-4 p-4 bg-card rounded-xl border border-border/50 hover:shadow-soft transition-shadow group"
                    >
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                        <info.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">
                          {info.title}
                        </div>
                        <div className="font-medium text-foreground text-sm">
                          {info.value}
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* WhatsApp CTA */}
              <div className="bg-card rounded-2xl border border-border/50 p-6 text-center">
                <MessageCircle className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-serif text-xl text-primary mb-2">
                  Prefer WhatsApp?
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Get instant responses from our team
                </p>
                <Button
                  asChild
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                >
                  <a
                    href={generateWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    {t.common.chatOnWhatsApp}
                  </a>
                </Button>
              </div>

              {/* Map Placeholder */}
              <div className="aspect-video bg-muted/30 rounded-2xl border border-border/50 flex items-center justify-center">
                <span className="text-muted-foreground text-sm">
                  [PLACEHOLDER: Google Maps Embed]
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
