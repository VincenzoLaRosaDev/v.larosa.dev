import {defineConfig} from 'sanity'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {vercelDeployTool} from 'sanity-plugin-vercel-deploy'
import {inlineSvgInput} from '@focus-reactive/sanity-plugin-inline-svg-input'
import {structureTool} from 'sanity/structure'
import {media} from 'sanity-plugin-media'
import {documentInternationalization} from '@sanity/document-internationalization'

export default defineConfig({
  name: 'default',
  title: 'v.larosa.dev',

  projectId: '7df35jdq',
  dataset: 'production',

  plugins: [
    structureTool({}),
    media(),
    visionTool({}),
    vercelDeployTool(),
    inlineSvgInput(),
    documentInternationalization({
      supportedLanguages: [
        {id: 'it', title: 'Italian 🇮🇹'},
        {id: 'en', title: 'English 🇬🇧'},
        {id: 'nl', title: 'Dutch 🇳🇱'},
      ],
      schemaTypes: ['page'],
      languageField: 'language',
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})
