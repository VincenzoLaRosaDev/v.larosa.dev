import {defineField} from 'sanity'

export const padding = defineField({
  name: 'padding',
  type: 'object',
  options: {
    collapsible: false,
  },
  fields: [
    {
      name: 'value',
      type: 'string',
      options: {
        list: [
          {title: 'None', value: '0'},
          {title: 'Small', value: 'S'},
          {title: 'Medium', value: 'M'},
          {title: 'Large', value: 'L'},
        ],
        layout: 'radio',
        direction: 'horizontal',
        default: null,
      },
    },
  ],
})

export const paddingBlock = defineField({
  name: 'paddingBlock',
  type: 'object',
  options: {
    collapsible: true,
  },
  fields: [
    {
      name: 'paddingTop',
      type: 'padding',
    },
    {
      name: 'paddingBottom',
      type: 'padding',
    },
  ],
})
