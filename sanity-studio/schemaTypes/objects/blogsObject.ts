import {ComposeIcon} from '@sanity/icons'
import {defineField} from 'sanity'
import {paddingBlock} from '../atoms'

export const blogsObject = defineField({
  name: 'blogs',
  type: 'object',
  icon: ComposeIcon,
  preview: {
    select: {
      title: 'title',
      paddingTop: 'paddingBlock.paddingTop.value',
      paddingBottom: 'paddingBlock.paddingBottom.value',
    },
    prepare: ({title, paddingTop, paddingBottom}) => {
      return {
        title: title,
        subtitle: `padding top: ${paddingTop} - padding bottom: ${paddingBottom}`,
      }
    },
  },
  fields: [
    {
      name: 'id',
      type: 'string',
      validation: (rule) => rule.required(),
    },
    {
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    },
    paddingBlock,
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
