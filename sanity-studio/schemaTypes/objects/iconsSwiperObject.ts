import {defineField} from 'sanity'
import {ImagesIcon} from '@sanity/icons'

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
    prepare: () => {
      return {
        title: 'Images Swiper',
      }
    },
  },
  fields: [
    {
      name: 'icons',
      type: 'array',
      validation: (rule) => rule.required(),
      of: [iconItem],
    },
  ],
})
