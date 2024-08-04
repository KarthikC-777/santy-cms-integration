import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'videoDocument',
  title: 'Video Document',
  type: 'document',
  fields: [
    defineField({name: 'title', type: 'string', title: 'Title'}),
    defineField({name: 'description', type: 'text', title: 'Description'}),
    defineField({
      name: 'videoFile',
      title: 'Video File',
      type: 'file',
      options: {
        accept: 'video/*',
      },
    }),
  ],
})
