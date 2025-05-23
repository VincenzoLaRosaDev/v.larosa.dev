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
    media(),
    structureTool({}),
    visionTool({}),
    vercelDeployTool(),
    inlineSvgInput(),
    // locales: [
    // {code: 'it', title: 'Italian', label: '🇮🇹'},
    // {code: 'en', title: 'English', label: '🇬🇧'},
    // {code: 'nl', title: 'Dutch', label: '🇳🇱'}
    // ]
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
