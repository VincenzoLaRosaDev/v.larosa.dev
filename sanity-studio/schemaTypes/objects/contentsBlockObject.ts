import {defineField} from 'sanity'
import {BlockElementIcon} from '@sanity/icons'
import {InlineElementIcon} from '@sanity/icons'

export const contentsBlockObject = defineField({
  name: 'contentsBlock',
  type: 'object',
  icon: BlockElementIcon,
  preview: {
    prepare: () => {
      return {
        title: 'Contents Block',
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
          icon: InlineElementIcon,
          preview: {
            select: {
              title: 'title',
            },
          },
          fields: [
            {
              name: 'size',
              type: 'string',
              initialValue: 'full',
              options: {
                list: [
                  {title: 'Full', value: 'full'},
                  {title: 'Half', value: 'half'},
                ],
                layout: 'radio',
                direction: 'horizontal',
              },
            },
            {
              name: 'icon',
              type: 'inlineSvg',
              validation: (rule) => rule.required(),
            },
            {
              name: 'tagTitle',
              type: 'string',
              validation: (rule) => rule.required(),
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
          ],
        },
      ],
    },
  ],
})
