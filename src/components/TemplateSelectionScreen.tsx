import { ChevronLeft, Sparkles, Star } from 'lucide-react';

interface Template {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  featured?: boolean;
}

interface TemplateSelectionScreenProps {
  onSelectAICreator: () => void;
  onSelectScratch: () => void;
  onSelectTemplate: (templateId: string) => void;
  onBack: () => void;
}

export const TemplateSelectionScreen: React.FC<TemplateSelectionScreenProps> = ({
  onSelectAICreator,
  onSelectScratch,
  onSelectTemplate,
  onBack,
}) => {
  const templates: Template[] = [
    {
      id: 'wedding-gift',
      title: 'Wedding Gift',
      subtitle: 'By: Cheddar Up',
      imageUrl: 'https://picsum.photos/seed/wedding/400/300',
    },
    {
      id: 'baby-shower',
      title: 'Secret! Baby Shower + Gift',
      subtitle: 'By: Cheddar Up',
      imageUrl: 'https://picsum.photos/seed/baby/400/300',
    },
    {
      id: 'volleyball-coach',
      title: 'Volleyball Coach Gift',
      subtitle: 'By: Cheddar Up',
      imageUrl: 'https://picsum.photos/seed/volleyball/400/300',
    },
    {
      id: 'coworker-retirement',
      title: 'Coworker Retirement Lunch + Gift',
      subtitle: 'By: Cheddar Up',
      imageUrl: 'https://picsum.photos/seed/retirement/400/300',
    },
    {
      id: 'staff-appreciation',
      title: 'Staff Appreciation Superheroes',
      subtitle: 'By: Cheddar Up',
      imageUrl: 'https://picsum.photos/seed/staff/400/300',
    },
    {
      id: 'secret-santa',
      title: 'Secret Santa Sign Up Sheet',
      subtitle: 'By: Cheddar Up',
      imageUrl: 'https://picsum.photos/seed/santa/400/300',
      featured: true,
    },
    {
      id: 'end-of-year',
      title: 'End-of-Year Staff Giving',
      subtitle: 'By: Cheddar Up',
      imageUrl: 'https://picsum.photos/seed/year/400/300',
      featured: true,
    },
    {
      id: 'birthday-surprise',
      title: 'Birthday surprises!',
      subtitle: 'By: Cheddar Up',
      imageUrl: 'https://picsum.photos/seed/birthday/400/300',
      featured: true,
    },
  ];

  return (
    <div className="min-h-screen bg-cheddar-gray-50">
      {/* Header */}
      <div className="border-b border-cheddar-gray-200 bg-white sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-cheddar-orange hover:text-cheddar-orange-hover transition-colors text-sm font-medium"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="text-cheddar-orange hover:text-cheddar-orange-hover transition-colors text-sm font-medium"
            >
              Back to Dashboard
            </button>
            <img src="/Logo.png" alt="CheddarUp" className="h-8 w-auto" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-4xl font-serif text-cheddar-gray-900 mb-2">
            Collection: Group Gifts
          </h1>
          <p className="text-base text-cheddar-gray-600">
            Collecting money for group gift is now easier than ever. Jump start your collection from the options below:
          </p>
        </div>

        {/* Create From Scratch Section */}
        <div className="mb-12">
          <h2 className="text-sm font-semibold text-cheddar-gray-500 uppercase tracking-wide mb-6">
            CREATE FROM SCRATCH
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Create from scratch card */}
            <div className="bg-white border-2 border-cheddar-gray-200 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-cheddar-gray-900 mb-2">
                Create from scratch
              </h2>
              <p className="text-sm text-cheddar-gray-600 mb-6">
                You can jump right in and start building your collection from scratch. Customize it exactly how you like!
              </p>
              <button
                onClick={onSelectScratch}
                className="px-6 py-2.5 bg-cheddar-gray-300 text-cheddar-gray-900 rounded-lg hover:bg-cheddar-gray-400 font-medium text-sm"
              >
                Get Started
              </button>
            </div>

            {/* Get Recommendations card */}
            <div className="bg-white border-2 border-cheddar-gray-200 rounded-lg p-6 relative">
              <div className="flex items-start gap-2 mb-2">
                <h2 className="text-lg font-semibold text-cheddar-gray-900">
                  Get Recommendations
                </h2>
                <Sparkles className="w-5 h-5 text-yellow-500" />
              </div>
              <p className="text-sm text-cheddar-gray-600 mb-6">
                Not sure where to start? Get recommended layouts or templates based on your needs.
              </p>
              <button
                onClick={onSelectAICreator}
                className="px-6 py-2.5 bg-cheddar-teal text-cheddar-gray-900 rounded-lg hover:bg-cheddar-teal/80 transition-colors font-medium text-sm"
                aria-label="Get Recommendations"
              >
                Get Recommendations
              </button>
            </div>
          </div>
        </div>

        {/* Ready to Use Templates Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm font-semibold text-cheddar-gray-500 uppercase tracking-wide">
              READY TO USE TEMPLATES
            </h2>
            <select className="text-sm border border-cheddar-gray-300 rounded-lg px-3 py-2 bg-white text-cheddar-gray-700">
              <option>Sort: Free Templates</option>
              <option>Sort: Most Popular</option>
              <option>Sort: Newest</option>
            </select>
          </div>

          {/* Templates Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {templates.map((template) => (
              <button
                key={template.id}
                type="button"
                className="bg-white border-2 border-cheddar-gray-200 rounded-lg overflow-hidden text-left hover:shadow-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-cheddar-orange"
                onClick={() => onSelectTemplate(template.id)}
                aria-label={`Select template ${template.title}`}
              >
                <div className="aspect-[4/3] bg-cheddar-gray-100 relative overflow-hidden">
                  <img
                    src={template.imageUrl}
                    alt={template.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between mb-1 gap-2">
                    <h3 className="font-semibold text-cheddar-gray-900 text-sm truncate flex-1">
                      {template.title}
                    </h3>
                    {template.featured && (
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-cheddar-gray-500">{template.subtitle}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
