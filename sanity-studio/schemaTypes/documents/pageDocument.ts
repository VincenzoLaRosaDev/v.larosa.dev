import {defineField} from 'sanity'
import {DocumentIcon} from '@sanity/icons'

export const pageDocument = defineField({
  name: 'page',
  type: 'document',
  icon: DocumentIcon,
  preview: {
    select: {
      title: 'title',
    },
  },
  fields: [
    {
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
    },
    {
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    },
    {
      name: 'textTitle',
      type: 'string',
    },
    {
      name: 'subTextTitle',
      type: 'richText',
    },
    {
      name: 'subText',
      type: 'richText',
    },
    {
      name: 'pageBlocks',
      type: 'array',
      of: [
        {
          name: 'richText',
          type: 'richTextObj',
        },
        {
          name: 'contentsBlock',
          type: 'contentsBlock',
        },
        {
          name: 'experiences',
          type: 'experiences',
        },
        {
          name: 'blogs',
          type: 'blogs',
        },
        {
          name: 'projects',
          type: 'projects',
        },
        {
          name: 'iconsSwiper',
          type: 'iconsSwiper',
        },
      ],
    },
    {
      name: 'richText',
      type: 'richText',
    },
    {
      name: 'seo',
      type: 'seo',
    },
  ],
})
