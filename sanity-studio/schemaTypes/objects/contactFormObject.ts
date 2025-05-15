import {defineField} from 'sanity'
import {ctaObject} from './ctaObject'
import {EnvelopeIcon} from '@sanity/icons'
import {paddingBlock} from '../atoms'

export const contactFormObject = defineField({
  name: 'contactForm',
  type: 'object',
  icon: EnvelopeIcon,
  preview: {
    select: {
      paddingTop: 'paddingBlock.paddingTop.value',
      paddingBottom: 'paddingBlock.paddingBottom.value',
    },
    prepare: ({paddingTop, paddingBottom}) => {
      return {
        title: 'Contact Form',
        subtitle: `padding top: ${paddingTop} - padding bottom: ${paddingBottom}`,
      }
    },
  },
  fields: [paddingBlock, ctaObject],
})
