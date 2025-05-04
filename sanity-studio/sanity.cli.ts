import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '7df35jdq',
    dataset: 'production',
  },
  graphql: [
    {
      playground: true,
    },
  ],
  autoUpdates: true,
})
