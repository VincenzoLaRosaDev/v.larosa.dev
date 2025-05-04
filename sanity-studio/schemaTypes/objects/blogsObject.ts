import {InlineElementIcon} from '@sanity/icons'
import {ComposeIcon} from '@sanity/icons'
import {defineField} from 'sanity'

export const blogsObject = defineField({
  name: 'blogs',
  type: 'object',
  icon: ComposeIcon,
  preview: {
    prepare: () => {
      return {
        title: 'Blogs',
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
              type: 'object',
              validation: (rule) => rule.required(),
              fields: [
                {
                  name: 'href',
                  type: 'url',
                  title: 'URL',
                  validation: (rule) => rule.required(),
                },
                {
                  title: 'Open in new tab',
                  name: 'blank',
                  type: 'boolean',
                },
              ],
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
