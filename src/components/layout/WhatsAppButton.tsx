import { MessageCircle } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { cn } from '@/lib/utils';

interface WhatsAppButtonProps {
  productName?: string;
  productId?: string;
  category?: string;
  filters?: string;
  className?: string;
}

export const generateWhatsAppUrl = (
  productName?: string,
  productId?: string,
  category?: string,
  filters?: string
): string => {
  const baseUrl = 'https://wa.me/[WHATSAPP_NUMBER]';
  
  let message = 'Hi The Lab Jewel';
  
  if (productName && productId) {
    message += `, I'm interested in: ${productName} (${productId}).`;
    if (category) {
      message += ` Category: ${category}.`;
    }
    if (filters) {
      message += ` Filters: ${filters}.`;
    }
    message += ' Please share details and price.';
  } else {
    message += ', I would like to know more about your lab-grown diamonds.';
  }

  return `${baseUrl}?text=${encodeURIComponent(message)}`;
};

const WhatsAppButton = ({
  productName,
  productId,
  category,
  filters,
  className,
}: WhatsAppButtonProps) => {
  const { isRTL } = useLanguage();
  const url = generateWhatsAppUrl(productName, productId, category, filters);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'fixed z-50 flex items-center justify-center',
        'w-14 h-14 md:w-16 md:h-16',
        'bg-green-500 hover:bg-green-600 text-white',
        'rounded-full shadow-elevated hover:shadow-2xl',
        'transition-all duration-300 hover:scale-110',
        'bottom-6 animate-float',
        isRTL ? 'left-6' : 'right-6',
        className
      )}
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-7 w-7 md:h-8 md:w-8" />
      <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse" />
    </a>
  );
};

export default WhatsAppButton;
