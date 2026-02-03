import { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Filter, X, ChevronDown, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import {
  diamonds,
  Diamond,
  DiamondGroup,
  shapes,
  whiteColors,
  fancyColors,
  clarities,
  cuts,
  certifications,
} from '@/data/diamonds';
import { generateWhatsAppUrl } from '@/components/layout/WhatsAppButton';
import { cn } from '@/lib/utils';

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'carat-asc' | 'carat-desc';

const DiamondCard = ({ diamond }: { diamond: Diamond }) => {
  const { t } = useLanguage();

  return (
    <Link
      to={`/diamonds/${diamond.id}`}
      className="group bg-card rounded-xl border border-border/50 overflow-hidden transition-all duration-300 hover:shadow-card hover:-translate-y-1"
    >
      {/* Image */}
      <div className="aspect-square relative bg-muted/30 overflow-hidden">
        <img
          src={diamond.image}
          alt={diamond.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          <span className="px-2 py-1 bg-primary text-primary-foreground text-xs font-medium rounded">
            {diamond.certification}
          </span>
          {!diamond.inStock && (
            <span className="px-2 py-1 bg-muted text-muted-foreground text-xs font-medium rounded">
              {t.common.outOfStock}
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-serif text-lg text-primary mb-1 truncate">
          {diamond.name}
        </h3>
        <div className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground mb-3">
          <span className="bg-muted px-2 py-0.5 rounded">{diamond.shape}</span>
          <span className="bg-muted px-2 py-0.5 rounded">{diamond.carat}ct</span>
          <span className="bg-muted px-2 py-0.5 rounded">{diamond.color}</span>
          <span className="bg-muted px-2 py-0.5 rounded">{diamond.clarity}</span>
          <span className="bg-muted px-2 py-0.5 rounded">{diamond.cut}</span>
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
            onClick={(e) => e.stopPropagation()}
          >
            <a
              href={generateWhatsAppUrl(diamond.name, diamond.id, diamond.group)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </Link>
  );
};

interface FiltersProps {
  selectedShapes: string[];
  setSelectedShapes: (shapes: string[]) => void;
  selectedColors: string[];
  setSelectedColors: (colors: string[]) => void;
  selectedClarities: string[];
  setSelectedClarities: (clarities: string[]) => void;
  selectedCuts: string[];
  setSelectedCuts: (cuts: string[]) => void;
  selectedCerts: string[];
  setSelectedCerts: (certs: string[]) => void;
  caratRange: [number, number];
  setCaratRange: (range: [number, number]) => void;
  inStockOnly: boolean;
  setInStockOnly: (value: boolean) => void;
  activeGroup: DiamondGroup;
  onClearAll: () => void;
}

const FilterSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="py-4 border-b border-border/50">
    <h4 className="font-medium text-sm text-foreground mb-3">{title}</h4>
    {children}
  </div>
);

const Filters = ({
  selectedShapes,
  setSelectedShapes,
  selectedColors,
  setSelectedColors,
  selectedClarities,
  setSelectedClarities,
  selectedCuts,
  setSelectedCuts,
  selectedCerts,
  setSelectedCerts,
  caratRange,
  setCaratRange,
  inStockOnly,
  setInStockOnly,
  activeGroup,
  onClearAll,
}: FiltersProps) => {
  const { t } = useLanguage();

  const colorOptions = activeGroup === 'color' ? fancyColors : whiteColors;

  const toggleFilter = (
    value: string,
    selected: string[],
    setter: (val: string[]) => void
  ) => {
    if (selected.includes(value)) {
      setter(selected.filter((s) => s !== value));
    } else {
      setter([...selected, value]);
    }
  };

  const hasFilters =
    selectedShapes.length > 0 ||
    selectedColors.length > 0 ||
    selectedClarities.length > 0 ||
    selectedCuts.length > 0 ||
    selectedCerts.length > 0 ||
    inStockOnly ||
    caratRange[0] !== 0 ||
    caratRange[1] !== 5;

  return (
    <div className="space-y-0">
      {hasFilters && (
        <div className="py-4 border-b border-border/50">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearAll}
            className="text-destructive hover:text-destructive"
          >
            <X className="h-4 w-4 mr-1" />
            {t.common.clearAll}
          </Button>
        </div>
      )}

      {/* Shape */}
      <FilterSection title={t.filters.shape}>
        <div className="flex flex-wrap gap-2">
          {shapes.map((shape) => (
            <button
              key={shape}
              onClick={() => toggleFilter(shape, selectedShapes, setSelectedShapes)}
              className={cn(
                'px-3 py-1.5 text-xs rounded-full border transition-colors',
                selectedShapes.includes(shape)
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-transparent text-muted-foreground border-border hover:border-primary/50'
              )}
            >
              {shape}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Carat */}
      <FilterSection title={`${t.filters.carat}: ${caratRange[0]} - ${caratRange[1]}ct`}>
        <Slider
          value={caratRange}
          onValueChange={(val) => setCaratRange(val as [number, number])}
          min={0}
          max={5}
          step={0.1}
          className="mt-6"
        />
      </FilterSection>

      {/* Color */}
      <FilterSection title={t.filters.color}>
        <div className="flex flex-wrap gap-2">
          {colorOptions.map((color) => (
            <button
              key={color}
              onClick={() => toggleFilter(color, selectedColors, setSelectedColors)}
              className={cn(
                'px-3 py-1.5 text-xs rounded-full border transition-colors',
                selectedColors.includes(color)
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-transparent text-muted-foreground border-border hover:border-primary/50'
              )}
            >
              {color}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Clarity */}
      <FilterSection title={t.filters.clarity}>
        <div className="flex flex-wrap gap-2">
          {clarities.map((clarity) => (
            <button
              key={clarity}
              onClick={() => toggleFilter(clarity, selectedClarities, setSelectedClarities)}
              className={cn(
                'px-3 py-1.5 text-xs rounded-full border transition-colors',
                selectedClarities.includes(clarity)
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-transparent text-muted-foreground border-border hover:border-primary/50'
              )}
            >
              {clarity}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Cut */}
      <FilterSection title={t.filters.cut}>
        <div className="flex flex-wrap gap-2">
          {cuts.map((cut) => (
            <button
              key={cut}
              onClick={() => toggleFilter(cut, selectedCuts, setSelectedCuts)}
              className={cn(
                'px-3 py-1.5 text-xs rounded-full border transition-colors',
                selectedCuts.includes(cut)
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-transparent text-muted-foreground border-border hover:border-primary/50'
              )}
            >
              {cut}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Certification */}
      <FilterSection title={t.filters.certification}>
        <div className="flex flex-wrap gap-2">
          {certifications.map((cert) => (
            <button
              key={cert}
              onClick={() => toggleFilter(cert, selectedCerts, setSelectedCerts)}
              className={cn(
                'px-3 py-1.5 text-xs rounded-full border transition-colors',
                selectedCerts.includes(cert)
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-transparent text-muted-foreground border-border hover:border-primary/50'
              )}
            >
              {cert}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Availability */}
      <FilterSection title={t.filters.availability}>
        <label className="flex items-center gap-2 cursor-pointer">
          <Checkbox
            checked={inStockOnly}
            onCheckedChange={(checked) => setInStockOnly(checked === true)}
          />
          <span className="text-sm text-muted-foreground">{t.common.inStock}</span>
        </label>
      </FilterSection>
    </div>
  );
};

const Diamonds = () => {
  const { t, isRTL } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialGroup = (searchParams.get('group') as DiamondGroup) || 'white';

  const [activeGroup, setActiveGroup] = useState<DiamondGroup>(initialGroup);
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [selectedShapes, setSelectedShapes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedClarities, setSelectedClarities] = useState<string[]>([]);
  const [selectedCuts, setSelectedCuts] = useState<string[]>([]);
  const [selectedCerts, setSelectedCerts] = useState<string[]>([]);
  const [caratRange, setCaratRange] = useState<[number, number]>([0, 5]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const handleGroupChange = (group: string) => {
    setActiveGroup(group as DiamondGroup);
    setSearchParams({ group });
    clearAllFilters();
  };

  const clearAllFilters = () => {
    setSelectedShapes([]);
    setSelectedColors([]);
    setSelectedClarities([]);
    setSelectedCuts([]);
    setSelectedCerts([]);
    setCaratRange([0, 5]);
    setInStockOnly(false);
  };

  const filteredDiamonds = useMemo(() => {
    let result = diamonds.filter((d) => d.group === activeGroup);

    if (selectedShapes.length > 0) {
      result = result.filter((d) => selectedShapes.includes(d.shape));
    }
    if (selectedColors.length > 0) {
      result = result.filter((d) => selectedColors.includes(d.color));
    }
    if (selectedClarities.length > 0) {
      result = result.filter((d) => selectedClarities.includes(d.clarity));
    }
    if (selectedCuts.length > 0) {
      result = result.filter((d) => selectedCuts.includes(d.cut));
    }
    if (selectedCerts.length > 0) {
      result = result.filter((d) => selectedCerts.includes(d.certification));
    }
    result = result.filter(
      (d) => d.carat >= caratRange[0] && d.carat <= caratRange[1]
    );
    if (inStockOnly) {
      result = result.filter((d) => d.inStock);
    }

    // Sorting
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => (a.price || 9999999) - (b.price || 9999999));
        break;
      case 'price-desc':
        result.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case 'carat-asc':
        result.sort((a, b) => a.carat - b.carat);
        break;
      case 'carat-desc':
        result.sort((a, b) => b.carat - a.carat);
        break;
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [
    activeGroup,
    selectedShapes,
    selectedColors,
    selectedClarities,
    selectedCuts,
    selectedCerts,
    caratRange,
    inStockOnly,
    sortBy,
  ]);

  const filterCount =
    selectedShapes.length +
    selectedColors.length +
    selectedClarities.length +
    selectedCuts.length +
    selectedCerts.length +
    (inStockOnly ? 1 : 0) +
    (caratRange[0] !== 0 || caratRange[1] !== 5 ? 1 : 0);

  const groups: { id: DiamondGroup; label: string }[] = [
    { id: 'white', label: t.groups.white },
    { id: 'color', label: t.groups.color },
    { id: 'melee', label: t.groups.melee },
    { id: 'fancy', label: t.groups.fancy },
  ];

  return (
    <Layout>
      <div className="min-h-screen">
        {/* Header */}
        <div className="bg-card border-b border-border/50 py-8 md:py-12">
          <div className="container mx-auto px-4">
            <h1 className="font-serif text-3xl md:text-4xl text-primary mb-2">
              {t.nav.diamonds}
            </h1>
            <p className="text-muted-foreground">
              Explore our collection of certified lab-grown diamonds
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="sticky top-16 md:top-20 z-40 bg-background border-b border-border/50">
          <div className="container mx-auto px-4">
            <Tabs value={activeGroup} onValueChange={handleGroupChange}>
              <TabsList className="h-auto p-0 bg-transparent gap-0 w-full justify-start overflow-x-auto">
                {groups.map((group) => (
                  <TabsTrigger
                    key={group.id}
                    value={group.id}
                    className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-6 py-4 text-sm font-medium"
                  >
                    {group.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex gap-8">
            {/* Desktop Sidebar Filters */}
            <aside className="hidden lg:block w-72 flex-shrink-0">
              <div className="sticky top-40 bg-card rounded-xl border border-border/50 p-4">
                <h3 className="font-medium text-foreground mb-2">{t.common.filter}</h3>
                <Filters
                  selectedShapes={selectedShapes}
                  setSelectedShapes={setSelectedShapes}
                  selectedColors={selectedColors}
                  setSelectedColors={setSelectedColors}
                  selectedClarities={selectedClarities}
                  setSelectedClarities={setSelectedClarities}
                  selectedCuts={selectedCuts}
                  setSelectedCuts={setSelectedCuts}
                  selectedCerts={selectedCerts}
                  setSelectedCerts={setSelectedCerts}
                  caratRange={caratRange}
                  setCaratRange={setCaratRange}
                  inStockOnly={inStockOnly}
                  setInStockOnly={setInStockOnly}
                  activeGroup={activeGroup}
                  onClearAll={clearAllFilters}
                />
              </div>
            </aside>

            {/* Main Grid */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="flex items-center justify-between mb-6 gap-4">
                <div className="flex items-center gap-2">
                  {/* Mobile Filter Button */}
                  <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
                    <SheetTrigger asChild>
                      <Button variant="outline" size="sm" className="lg:hidden">
                        <Filter className="h-4 w-4 mr-2" />
                        {t.common.filter}
                        {filterCount > 0 && (
                          <Badge variant="secondary" className="ml-2">
                            {filterCount}
                          </Badge>
                        )}
                      </Button>
                    </SheetTrigger>
                    <SheetContent side={isRTL ? 'right' : 'left'} className="w-80 overflow-y-auto">
                      <SheetHeader>
                        <SheetTitle>{t.common.filter}</SheetTitle>
                      </SheetHeader>
                      <Filters
                        selectedShapes={selectedShapes}
                        setSelectedShapes={setSelectedShapes}
                        selectedColors={selectedColors}
                        setSelectedColors={setSelectedColors}
                        selectedClarities={selectedClarities}
                        setSelectedClarities={setSelectedClarities}
                        selectedCuts={selectedCuts}
                        setSelectedCuts={setSelectedCuts}
                        selectedCerts={selectedCerts}
                        setSelectedCerts={setSelectedCerts}
                        caratRange={caratRange}
                        setCaratRange={setCaratRange}
                        inStockOnly={inStockOnly}
                        setInStockOnly={setInStockOnly}
                        activeGroup={activeGroup}
                        onClearAll={clearAllFilters}
                      />
                    </SheetContent>
                  </Sheet>

                  <span className="text-sm text-muted-foreground">
                    {filteredDiamonds.length} diamonds
                  </span>
                </div>

                {/* Sort */}
                <Select value={sortBy} onValueChange={(val) => setSortBy(val as SortOption)}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder={t.common.sort} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">{t.sorting.featured}</SelectItem>
                    <SelectItem value="price-asc">{t.sorting.priceLowHigh}</SelectItem>
                    <SelectItem value="price-desc">{t.sorting.priceHighLow}</SelectItem>
                    <SelectItem value="carat-asc">{t.sorting.caratLowHigh}</SelectItem>
                    <SelectItem value="carat-desc">{t.sorting.caratHighLow}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Grid */}
              {filteredDiamonds.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredDiamonds.map((diamond) => (
                    <DiamondCard key={diamond.id} diamond={diamond} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-muted-foreground">No diamonds found matching your criteria.</p>
                  <Button variant="link" onClick={clearAllFilters} className="mt-2">
                    {t.common.clearAll}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Diamonds;
