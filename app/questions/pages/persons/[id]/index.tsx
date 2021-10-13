import { BlitzPage, useQuery, useParam } from "blitz"
import Layout from "app/core/layouts/Layout"
import Box from "@mui/material/Box"
import { Suspense } from "react"
import CircularProgress from "@mui/material/CircularProgress"
import getPerson from "app/questions/queries/getPerson"

const Content = () => {
  const personId = useParam("id", "number")
  const [person] = useQuery(getPerson, personId)

  return (
    <Box>
      <h1>{person.name}</h1>
      <p>{person.description}</p>
    </Box>
  )
}

const PersonPage: BlitzPage = () => {
  return (
    <Box>
      <Suspense fallback={<CircularProgress />}>
        <Content />
      </Suspense>
    </Box>
  )
}

PersonPage.suppressFirstRenderFlicker = true
PersonPage.getLayout = (page) => <Layout>{page}</Layout>

export default PersonPage
