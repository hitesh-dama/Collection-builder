import { ShoppingBag, Gift, RefreshCw, Ticket, Package, DollarSign, Tag, Activity } from 'lucide-react';

interface CollectionType {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: 'collection' | 'fundraiser';
  badge?: string;
  available: boolean;
}

interface LandingPageProps {
  onSelectType: (typeId: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onSelectType }) => {
  const collectionTypes: CollectionType[] = [
    {
      id: 'online-shop',
      title: 'Online Shop',
      description: 'Sell items online to optimize sales',
      icon: <ShoppingBag className="w-6 h-6" />,
      category: 'collection',
      available: false,
    },
    {
      id: 'group-gifts',
      title: 'Group Gifts',
      description: 'Easily collect money for group gifts',
      icon: <Gift className="w-6 h-6" />,
      category: 'collection',
      available: true,
    },
    {
      id: 'forms',
      title: 'Forms',
      description: 'Sign ups, forms, waivers and registrations',
      icon: <Package className="w-6 h-6" />,
      category: 'collection',
      available: false,
    },
    {
      id: 'recurring-payments',
      title: 'Recurring Payments',
      description: 'Membership registration or subscription dues',
      icon: <RefreshCw className="w-6 h-6" />,
      category: 'collection',
      available: false,
    },
    {
      id: 'event-tickets',
      title: 'Event Tickets',
      description: 'Sell tickets and accept payments',
      icon: <Ticket className="w-6 h-6" />,
      category: 'collection',
      badge: 'Pro plan',
      available: false,
    },
    {
      id: 'custom-all-in-one',
      title: 'Custom All-in-One',
      description: 'Sell or collect anything (items, tickets, forms, etc.)',
      icon: <Package className="w-6 h-6" />,
      category: 'collection',
      badge: 'Pro plan',
      available: false,
    },
  ];

  const fundraiserTypes: CollectionType[] = [
    {
      id: 'flat-donations',
      title: 'Flat Donations',
      description: 'Supporters to contribute a one-time donation',
      icon: <DollarSign className="w-6 h-6" />,
      category: 'fundraiser',
      available: false,
    },
    {
      id: 'product-sales',
      title: 'Product Sales',
      description: 'Supporters purchase from an online sales catalog',
      icon: <Tag className="w-6 h-6" />,
      category: 'fundraiser',
      available: false,
    },
    {
      id: 'activity-based',
      title: 'Activity-based "Athon"',
      description: 'Supporters pledge amount per participant activity',
      icon: <Activity className="w-6 h-6" />,
      category: 'fundraiser',
      available: false,
    },
  ];

  const handleCardClick = (type: CollectionType) => {
    if (type.available) {
      onSelectType(type.id);
    }
  };

  const renderCard = (type: CollectionType) => (
    <button
      key={type.id}
      onClick={() => handleCardClick(type)}
      disabled={!type.available}
      role="button"
      aria-label={type.title}
      className={`
        relative p-6 rounded-lg border-2 text-left transition-all
        ${type.available
          ? 'border-cheddar-gray-300 hover:border-cheddar-orange hover:shadow-md cursor-pointer bg-white'
          : 'border-cheddar-gray-200 bg-cheddar-gray-50 cursor-not-allowed opacity-60'
        }
      `}
    >
      <div className="flex items-start gap-4">
        <div className={`
          p-2 rounded-lg
          ${type.available ? 'text-cheddar-orange bg-cheddar-orange/10' : 'text-cheddar-gray-400 bg-cheddar-gray-100'}
        `}>
          {type.icon}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-cheddar-gray-900">
              {type.title}
            </h3>
            {type.badge && (
              <span className="px-2 py-0.5 text-xs font-medium text-cheddar-orange bg-cheddar-teal rounded-full">
                {type.badge}
              </span>
            )}
          </div>
          <p className="text-sm text-cheddar-gray-600">
            {type.description}
          </p>
        </div>
      </div>
    </button>
  );

  return (
    <div className="min-h-screen bg-cheddar-gray-50">
      {/* Header */}
      <div className="border-b border-cheddar-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <button className="flex items-center gap-2 text-cheddar-orange hover:text-cheddar-orange-hover transition-colors text-sm font-medium">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </button>
          <img src="/Logo.png" alt="CheddarUp" className="h-8 w-auto" />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-serif text-cheddar-gray-900 mb-12">
          What would you like to build today?
        </h1>

        {/* Collection Section */}
        <div className="mb-12">
          <h2 className="text-sm font-semibold text-cheddar-gray-500 uppercase tracking-wide mb-6">
            COLLECTION
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {collectionTypes.map(renderCard)}
          </div>
        </div>

        {/* Fundraiser Section */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <h2 className="text-sm font-semibold text-cheddar-gray-500 uppercase tracking-wide">
              FUNDRAISER
            </h2>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              Learn more
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {fundraiserTypes.map(renderCard)}
          </div>
        </div>
      </div>
    </div>
  );
};
