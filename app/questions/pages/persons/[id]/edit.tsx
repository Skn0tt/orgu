import PersonForm from "app/questions/components/PersonForm"
import { UpdatePerson } from "app/questions/types"
import { useMutation, useRouter } from "blitz"
import { BlitzPage, useQuery, useParam } from "blitz"
import Layout from "app/core/layouts/Layout"
import Box from "@mui/material/Box"
import { Suspense } from "react"
import CircularProgress from "@mui/material/CircularProgress"
import getPerson from "app/questions/queries/getPerson"
import updatePerson from "app/questions/mutations/updatePerson"

const Content = () => {
  const personId = useParam("id", "number")!
  const [person] = useQuery(getPerson, personId)
  const [updatePersonMutation] = useMutation(updatePerson)
  const router = useRouter()

  const onSubmit = async (person: UpdatePerson) => {
    try {
      const updatedPerson = await updatePersonMutation(person)
      router.push("/persons/" + updatedPerson.id)
    } catch (e: any) {
      console.log(e)
    }
  }

  return (
    <Box>
      <h1>Edit Person</h1>
      <PersonForm
        initialValues={person}
        onSubmit={onSubmit}
        onCancel={() => router.push("/persons/" + personId)}
      />
    </Box>
  )
}

const EditPersonPage: BlitzPage = () => {
  return (
    <Box>
      <Suspense fallback={<CircularProgress />}>
        <Content />
      </Suspense>
    </Box>
  )
}

EditPersonPage.suppressFirstRenderFlicker = true
EditPersonPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditPersonPage
