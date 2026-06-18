import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const faqSchema = z.array(
  z.object({
    question: z.string(),
    answer: z.string()
  })
).default([]);

const conditions = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/conditions' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    status: z.enum(['published', 'draft']),
    order: z.number().default(99),
    symptoms: z.array(z.string()).default([]),
    evaluation: z.array(z.string()).default([]),
    relatedStudies: z.array(z.string()).default([]),
    faq: faqSchema,
    seoDescription: z.string()
  })
});

const studies = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/studies' }),
  schema: z.object({
    title: z.string(),
    shortTitle: z.string().optional(),
    summary: z.string(),
    status: z.enum(['published', 'draft']),
    category: z.enum(['cerebro', 'nervios-musculos', 'sueno', 'audicion', 'cirugia', 'cognicion']),
    order: z.number().default(99),
    purpose: z.string(),
    procedure: z.string(),
    duration: z.string().optional(),
    relatedConditions: z.array(z.string()).default([]),
    faq: faqSchema,
    seoDescription: z.string()
  })
});

const doctors = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/doctors' }),
  schema: z.object({
    name: z.string(),
    status: z.enum(['published', 'draft']),
    role: z.string().optional(),
    summary: z.string(),
    areas: z.array(z.string()).default([]),
    seoDescription: z.string()
  })
});

const resources = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/resources' }),
  schema: z.object({
    title: z.string(),
    type: z.enum(['article', 'video', 'event']),
    status: z.enum(['published', 'draft', 'archive']),
    topic: z.string(),
    year: z.number().optional(),
    summary: z.string(),
    seoDescription: z.string()
  })
});

export const collections = { conditions, studies, doctors, resources };
