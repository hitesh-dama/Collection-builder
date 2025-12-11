// src/constants/templates.ts
import { Template } from '../types';

export const DEFAULT_TEMPLATE_FIELDS = {
  suggestedAmounts: [25, 50, 100],
  customAmountEnabled: true,
  theme: { primaryColor: '#FF6B35', accentColor: '#F4A261' },
};

export const STATIC_TEMPLATES: Template[] = [
  {
    id: 'wedding-gift',
    title: 'Wedding Gift',
    description: 'A wedding gift collection.',
    category: 'wedding',
    ...DEFAULT_TEMPLATE_FIELDS,
  },
  {
    id: 'baby-shower',
    title: 'Secret! Baby Shower + Gift',
    description: 'A baby shower collection.',
    category: 'baby',
    ...DEFAULT_TEMPLATE_FIELDS,
  },
  {
    id: 'volleyball-coach',
    title: 'Volleyball Coach Gift',
    description: 'A volleyball coach gift collection.',
    category: 'coach',
    ...DEFAULT_TEMPLATE_FIELDS,
  },
  {
    id: 'coworker-retirement',
    title: 'Coworker Retirement Lunch + Gift',
    description: 'A retirement collection.',
    category: 'retirement',
    ...DEFAULT_TEMPLATE_FIELDS,
  },
  {
    id: 'staff-appreciation',
    title: 'Staff Appreciation Superheroes',
    description: 'A staff appreciation collection.',
    category: 'staff',
    ...DEFAULT_TEMPLATE_FIELDS,
  },
  {
    id: 'secret-santa',
    title: 'Secret Santa Sign Up Sheet',
    description: 'A secret santa collection.',
    category: 'santa',
    ...DEFAULT_TEMPLATE_FIELDS,
  },
  {
    id: 'end-of-year',
    title: 'End-of-Year Staff Giving',
    description: 'An end-of-year giving collection.',
    category: 'giving',
    ...DEFAULT_TEMPLATE_FIELDS,
  },
  {
    id: 'birthday-surprise',
    title: 'Birthday surprises!',
    description: 'A birthday surprise collection.',
    category: 'birthday',
    ...DEFAULT_TEMPLATE_FIELDS,
  },
];
