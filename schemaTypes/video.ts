import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'video',
  title: 'Video',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Title of the video',
      validation: (Rule) => Rule.required().min(5).max(100),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Description of the video',
    }),
    defineField({
      name: 'videoUrl',
      title: 'Vimeo URL',
      type: 'url',
      description: 'URL of the video from Vimeo (optional if using Vimeo selector)',
      validation: (Rule) => Rule.uri({allowRelative: true, scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'videoFile',
      title: 'Video File',
      type: 'file',
      description: 'Upload a video file if not using a Vimeo URL',
    }),
    defineField({
      name: 'vimeoVideo',
      title: 'Vimeo Video',
      type: 'reference',
      to: {type: 'vimeoVideo'}, // Reference to a Vimeo video type (if you define one)
    }),
  ],

  // preview: {
  //   select: {
  //     title: 'video.title',
  //     media: 'image',
  //   },
  //   prepare({title, media}) {
  //     console.log(title)
  //     return {
  //       title,
  //       media: media,
  //     }
  //   },
  // },
})
