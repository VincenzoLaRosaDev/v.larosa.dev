import {defineField} from 'sanity'

export const customLink = defineField({
  name: 'customLink',
  type: 'string',
  hidden: ({parent}) => parent?.ctaType !== 'custom',
  validation: (rule) =>
    rule.custom((value, context) => {
      if (context.parent?.ctaType === 'custom' && !value) {
        return 'Custom link is required when selected'
      }
      return true
    }),
})

export const externalLink = defineField({
  name: 'externalLink',
  type: 'object',
  hidden: ({parent}) => parent?.ctaType !== 'external',
  fields: [
    {
      name: 'href',
      type: 'url',
      title: 'URL',
      validation: (rule) =>
        rule.custom((value, context) => {
          if (context.parent?.ctaType === 'external' && !value) {
            return 'External link is required when selected'
          }
          return true
        }),
    },
    {
      title: 'Open in new tab',
      name: 'blank',
      type: 'boolean',
    },
  ],
})

export const internalLink = defineField({
  name: 'internalLink',
  type: 'reference',
  hidden: ({parent}) => parent?.ctaType !== 'internal',
  validation: (rule) =>
    rule.custom((value, context) => {
      if (context.parent?.ctaType === 'internal' && !value) {
        return 'Internal link is required when selected'
      }
      return true
    }),
  to: [{type: 'page'}],
})

export const ctaLink = defineField({
  name: 'ctaLink',
  type: 'object',
  fields: [
    {
      name: 'ctaType',
      type: 'string',
      options: {
        list: [
          {title: 'Internal', value: 'internal'},
          {title: 'External', value: 'external'},
          {title: 'Custom', value: 'custom'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
    },
    externalLink,
    internalLink,
    customLink,
  ],
})

export const ctaObject = defineField({
  name: 'cta',
  type: 'object',
  preview: {
    select: {
      title: 'ctaLabel',
    },
  },
  fields: [
    {
      name: 'ctaLabel',
      type: 'string',
      validation: (rule) => rule.required(),
    },
    {
      name: 'ctaLink',
      type: 'ctaLink',
    },
  ],
})
