import {CodeBlockIcon} from '@sanity/icons'
import {defineField} from 'sanity'

export const projectsObject = defineField({
  name: 'projects',
  type: 'object',
  icon: CodeBlockIcon,
  preview: {
    prepare: () => {
      return {
        title: 'Projects',
      }
    },
  },
  fields: [
    {
      name: 'items',
      type: 'array',
      validation: (rule) => rule.required(),
      of: [
        {
          name: 'item',
          type: 'object',
          preview: {
            select: {
              title: 'title',
              media: 'image',
            },
          },
          fields: [
            {
              name: 'link',
              type: 'ctaLink',
            },
            {
              name: 'image',
              type: 'image',
              validation: (rule) => rule.required(),
              options: {hotspot: true},
              fields: [
                {
                  name: 'alt',
                  type: 'string',
                  title: 'Alternative text',
                },
              ],
            },
            {
              name: 'title',
              type: 'string',
              validation: (rule) => rule.required(),
            },
            {
              name: 'richText',
              type: 'richText',
            },
            {
              name: 'tag',
              type: 'array',
              of: [
                {
                  name: 'value',
                  type: 'string',
                  validation: (rule) => rule.required(),
                },
              ],
            },
          ],
        },
      ],
    },
  ],
})
