import { BlitzPage, useMutation, useQuery, useRouter } from "blitz"
import Layout from "app/core/layouts/Layout"
import Box from "@mui/material/Box"
import PersonForm from "../../components/PersonForm"
import { CreatePerson } from "app/questions/types"
import createPerson from "app/questions/mutations/createPerson"
import Typography from "@mui/material/Typography"
import getPersons from "../../queries/getPersons"

const NewPersonPage: BlitzPage = () => {
  const [persons, personsContext] = useQuery(getPersons, null)
  const [createPersonMutation] = useMutation(createPerson)
  const router = useRouter()

  const onSubmit = async (person: CreatePerson) => {
    try {
      const createdPerson = await createPersonMutation(person)
      await personsContext.refetch() // todo: this should be replaceable by invalidateQuery()
      await router.push("/persons/" + createdPerson.id)
    } catch (e: any) {
      console.log(e)
    }
  }

  return (
    <Box>
      <Typography variant="h1" component="h1">
        New Person
      </Typography>
      <PersonForm
        initialValues={{
          name: "",
          description: "",
          tagIds: new Set(),
        }}
        onSubmit={onSubmit}
        onCancel={() => router.push("/persons")}
      />
    </Box>
  )
}

NewPersonPage.suppressFirstRenderFlicker = true
NewPersonPage.getLayout = (page) => <Layout>{page}</Layout>

export default NewPersonPage
