import {defineField} from 'sanity'
import {ImagesIcon} from '@sanity/icons'
import {paddingBlock} from '../atoms'

const iconItem = defineField({
  name: 'icons',
  type: 'inlineSvg',
  validation: (rule) => rule.required(),
})

export const iconsSwiperObject = defineField({
  name: 'iconsSwiper',
  type: 'object',
  icon: ImagesIcon,
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
      name: 'icons',
      type: 'array',
      validation: (rule) => rule.required(),
      of: [iconItem],
    },
  ],
})
