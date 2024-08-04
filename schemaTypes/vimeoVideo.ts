import {defineType, defineField} from 'sanity'
import VimeoBrowser from '../plugins/vimeo-selector/src/components/VimeoBrowser'

export default defineType({
  name: 'vimeoVideo',
  title: 'Vimeo Video',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Title of the video',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Description of the video',
    }),
    defineField({
      name: 'vimeoVideo',
      title: 'Vimeo Video',
      type: 'vimeoVideo',
      description: 'Select a Vimeo video',
      components: {
        input: VimeoBrowser,
      },
    }),
  ],
})
