import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn: false, // explicitly set to false since 'useCdn' is not imported
  // revalidate every 10 seconds
})
   