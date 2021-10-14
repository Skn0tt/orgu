import { BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import Box from "@mui/material/Box"
import QuestionForm from "../../components/QuestionForm"
import { CreateQuestion } from "app/questions/types"
import { useMutation, useRouter } from "blitz"
import createQuestion from "app/questions/mutations/createQuestion"

const NewQuestionPage: BlitzPage = () => {
  const [createQuestionMutation] = useMutation(createQuestion)
  const router = useRouter()

  const onSubmit = async (question: CreateQuestion) => {
    try {
      const createdQuestion = await createQuestionMutation(question)
      router.push("/questions/" + createdQuestion.id)
    } catch (e: any) {
      console.log(e)
    }
  }

  return (
    <Box>
      <h1>New Question</h1>
      <QuestionForm
        initialValues={{
          title: "",
          status: "unanswered",
          assignedToPersonId: 1,
        }}
        onSubmit={onSubmit}
      />
    </Box>
  )
}

NewQuestionPage.suppressFirstRenderFlicker = true
NewQuestionPage.getLayout = (page) => <Layout>{page}</Layout>

export default NewQuestionPage
