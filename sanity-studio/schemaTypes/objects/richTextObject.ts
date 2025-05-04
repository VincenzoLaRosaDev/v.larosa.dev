import {defineField} from 'sanity'
import {BlockContentIcon} from '@sanity/icons'

export const richTextObject = defineField({
  name: 'richTextObj',
  title: 'Rich Text',
  type: 'object',
  icon: BlockContentIcon,
  preview: {
    select: {
      title: 'value',
    },
  },
  fields: [
    {
      name: 'value',
      type: 'richText',
    },
  ],
})
