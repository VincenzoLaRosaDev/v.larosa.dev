import {defineField} from 'sanity'
import {ThListIcon} from '@sanity/icons'
import {StackIcon} from '@sanity/icons'
import {paddingBlock} from '../atoms'

export const experiencesObject = defineField({
  name: 'experiences',
  type: 'object',
  icon: ThListIcon,
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
          icon: StackIcon,
          preview: {
            select: {
              title: 'company',
            },
          },
          fields: [
            {
              name: 'startDate',
              type: 'date',
              options: {
                dateFormat: 'YYYY',
              },
              validation: (rule) => rule.required(),
            },
            {
              name: 'endDate',
              type: 'date',
              options: {
                dateFormat: 'YYYY',
              },
            },
            {
              name: 'role',
              type: 'string',
              validation: (rule) => rule.required(),
            },
            {
              name: 'company',
              type: 'string',
              validation: (rule) => rule.required(),
            },
            {
              name: 'companyLink',
              type: 'object',
              fields: [
                {
                  name: 'href',
                  type: 'url',
                  title: 'URL',
                },
                {
                  title: 'Open in new tab',
                  name: 'blank',
                  type: 'boolean',
                },
              ],
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
                  type: 'object',
                  fields: [
                    {
                      name: 'label',
                      type: 'string',
                    },
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
              ],
            },
            {
              name: 'skills',
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
