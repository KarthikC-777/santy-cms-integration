import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'images',
  type: 'document',
  title: 'Images',
  options: {
    hotspot: true,
  },
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Image',
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      imageUrl: 'image.asset.url',
      title: 'name',
      media: 'image',
    },
  },
})
