import {defineField} from 'sanity'
import {LinkedinIcon} from '@sanity/icons'

export const linksDocument = defineField({
  name: 'link',
  type: 'document',
  icon: LinkedinIcon,
  fields: [
    {
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    },
    {
      name: 'linkIcon',
      type: 'inlineSvg',
      validation: (rule) => rule.required(),
    },
    {
      name: 'link',
      type: 'ctaLink',
    },
  ],
})
