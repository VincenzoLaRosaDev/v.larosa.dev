import {defineField} from 'sanity'
import {BlockContentIcon} from '@sanity/icons'
import {paddingBlock} from '../atoms'

export const richTextObject = defineField({
  name: 'richTextObj',
  title: 'Rich Text',
  type: 'object',
  icon: BlockContentIcon,
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
      name: 'value',
      type: 'richText',
    },
  ],
})
