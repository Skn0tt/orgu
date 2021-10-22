import PersonForm from "app/questions/components/PersonForm"
import { UpdatePerson } from "app/questions/types"
import { BlitzPage, useMutation, useParam, useQuery, useRouter } from "blitz"
import Layout from "app/core/layouts/Layout"
import Box from "@mui/material/Box"
import getPerson from "app/questions/queries/getPerson"
import updatePerson from "app/questions/mutations/updatePerson"
import Typography from "@mui/material/Typography"

const EditPersonPage: BlitzPage = () => {
  const personId = useParam("id", "number")!
  const [person] = useQuery(getPerson, personId)
  const [updatePersonMutation] = useMutation(updatePerson)
  const router = useRouter()

  const onSubmit = async (person: UpdatePerson) => {
    try {
      const updatedPerson = await updatePersonMutation(person)
      await router.push("/persons/" + updatedPerson.id)
    } catch (e: any) {
      console.log(e)
    }
  }

  return (
    <Box>
      <Typography variant="h1" component="h1">
        Edit Person
      </Typography>
      <PersonForm
        initialValues={{
          id: person.id,
          name: person.name,
          description: person.description,
          tagIds: new Set(person.tags.map((tag) => tag.id)),
        }}
        onSubmit={onSubmit}
        onCancel={() => router.push("/persons/" + personId)}
      />
    </Box>
  )
}

EditPersonPage.suppressFirstRenderFlicker = true
EditPersonPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditPersonPage
