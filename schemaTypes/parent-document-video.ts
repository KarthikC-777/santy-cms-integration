import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'parentDocument',
  title: 'Parent Document',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'videoReference',
      title: 'Video Reference',
      type: 'reference',
      to: [{type: 'videoDocument'}, {type: 'vimeoVideo'}],
    }),
  ],
})
