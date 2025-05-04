import {defineField} from 'sanity'
import {LinkedinIcon} from '@sanity/icons'

export const socialLinksDocument = defineField({
  name: 'socialLink',
  type: 'document',
  icon: LinkedinIcon,
  fields: [
    {
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    },
    {
      name: 'socialLinkIcon',
      type: 'inlineSvg',
      validation: (rule) => rule.required(),
    },
    {
      name: 'externalLink',
      type: 'object',
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
  ],
})
