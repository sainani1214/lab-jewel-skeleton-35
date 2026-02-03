import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { DiamondGroup } from '@/data/diamonds';
import { cn } from '@/lib/utils';

const FeaturedGroups = () => {
  const { t, isRTL } = useLanguage();

  const groups: {
    id: DiamondGroup;
    title: string;
    description: string;
    gradient: string;
  }[] = [
    {
      id: 'color',
      title: t.groups.color,
      description: t.groups.colorDesc,
      gradient: 'from-pink-500/20 via-purple-500/20 to-blue-500/20',
    },
    {
      id: 'melee',
      title: t.groups.melee,
      description: t.groups.meleeDesc,
      gradient: 'from-amber-500/20 via-yellow-500/20 to-orange-500/20',
    },
    {
      id: 'white',
      title: t.groups.white,
      description: t.groups.whiteDesc,
      gradient: 'from-slate-200/40 via-white/50 to-slate-100/40',
    },
    {
      id: 'fancy',
      title: t.groups.fancy,
      description: t.groups.fancyDesc,
      gradient: 'from-emerald-500/20 via-teal-500/20 to-cyan-500/20',
    },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-serif text-3xl md:text-4xl text-primary mb-4">
            Discover Our Collections
          </h2>
          <p className="text-muted-foreground">
            Explore our curated selection of lab-grown diamonds, crafted to perfection
          </p>
        </div>

        {/* Groups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {groups.map((group, index) => (
            <Link
              key={group.id}
              to={`/diamonds?group=${group.id}`}
              className={cn(
                'group relative overflow-hidden rounded-2xl p-8 md:p-10',
                'bg-card border border-border/50',
                'transition-all duration-500 hover:shadow-elevated hover:-translate-y-1',
                'animate-fade-in'
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Background Gradient */}
              <div
                className={cn(
                  'absolute inset-0 bg-gradient-to-br opacity-50 transition-opacity group-hover:opacity-70',
                  group.gradient
                )}
              />

              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="font-serif text-2xl md:text-3xl text-primary mb-2">
                      {group.title}
                    </h3>
                    <p className="text-muted-foreground text-sm md:text-base max-w-xs">
                      {group.description}
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    <Sparkles className="h-5 w-5" />
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm font-medium text-primary group-hover:gap-3 transition-all">
                  <span>{t.common.viewAll}</span>
                  <ArrowRight className={cn('h-4 w-4', isRTL && 'rotate-180')} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedGroups;
