import {definePlugin} from 'sanity'
import VimeoBrowser from './components/VimeoBrowser'

export default definePlugin(() => ({
  name: 'vimeo-browser',
  tools: [
    {
      name: 'vimeo-browser',
      title: 'Vimeo Browser',
      component: VimeoBrowser,
    },
  ],
}))
