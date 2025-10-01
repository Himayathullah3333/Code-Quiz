import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, useCdn } from '../env'

export const client = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn: false, // fetch straight from the database every time
  next: { revalidate: 10 }, // revalidate every 10 seconds
})
   