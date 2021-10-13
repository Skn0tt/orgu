import { BlitzPage, useQuery } from "blitz"
import Layout from "app/core/layouts/Layout"
import Box from "@mui/material/Box"
import getPersons from "app/questions/queries/getPersons"
import { Suspense } from "react"
import CircularProgress from "@mui/material/CircularProgress"

const PersonsList = () => {
  const [persons] = useQuery(getPersons, null)
  return (
    <Box>
      {persons.map((person) => (
        <Box key={person.id}>
          <h2>{person.name}</h2>
          <p>{person.description}</p>
        </Box>
      ))}
    </Box>
  )
}

const Persons: BlitzPage = () => {
  return (
    <Box>
      <h1>People</h1>
      <Suspense fallback={<CircularProgress />}>
        <PersonsList />
      </Suspense>
    </Box>
  )
}

Persons.suppressFirstRenderFlicker = true
Persons.getLayout = (page) => <Layout>{page}</Layout>

export default Persons
