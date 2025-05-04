import {defineField, SlugValidationContext} from 'sanity'

export const seoObject = defineField({
  name: 'seo',
  type: 'object',
  validation: (rule) => rule.required(),
  fields: [
    {
      name: 'seoSlug',
      type: 'string',
      validation: (rule) => rule.required(),

      options: {
        source: 'title',
        maxLength: 200,
      },
    },
    {
      name: 'seoTitle',
      type: 'string',
      validation: (rule) => rule.required(),
    },
    {
      name: 'seoDescription',
      type: 'text',
      validation: (rule) => rule.required(),
    },
  ],
})
