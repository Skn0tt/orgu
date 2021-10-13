import { BlitzPage, useQuery, useRouter, Router, useParam } from "blitz"
import Layout from "app/core/layouts/Layout"
import Box from "@mui/material/Box"
import getPersons from "app/questions/queries/getPersons"
import { Suspense } from "react"
import CircularProgress from "@mui/material/CircularProgress"
import getPerson from "app/questions/queries/getPerson"

const Content = () => {
  const personId = useParam("id", "number")!
  const [person] = useQuery(getPerson, personId)

  if (person == null || personId == null) Router.push("/404")

  return (
    <Box>
      <h1>Person {JSON.stringify(person)}</h1>
      <h1>Person {typeof personId}</h1>
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
