import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import VimeoBrowser from './plugins/vimeo-selector/src/plugin.js'
import {unsplashImageAsset} from 'sanity-plugin-asset-source-unsplash'

export default defineConfig({
  name: 'default',
  title: 'video-test-sanity',

  projectId: 'tlab0v6f',
  dataset: 'staging',

  plugins: [structureTool(), visionTool(), VimeoBrowser(), unsplashImageAsset()],

  schema: {
    types: schemaTypes,
  },
})
