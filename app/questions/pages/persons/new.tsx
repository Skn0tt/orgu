import { BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import Box from "@mui/material/Box"
import PersonForm from "../../components/PersonForm"
import { CreatePerson } from "app/questions/types"
import { useMutation, useRouter } from "blitz"
import createPerson from "app/questions/mutations/createPerson"
import Typography from "@mui/material/Typography"

const NewPersonPage: BlitzPage = () => {
  const [createPersonMutation] = useMutation(createPerson)
  const router = useRouter()

  const onSubmit = async (person: CreatePerson) => {
    try {
      const createdPerson = await createPersonMutation(person)
      router.push("/persons/" + createdPerson.id)
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
