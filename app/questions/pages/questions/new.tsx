import { BlitzPage, useMutation, useRouter } from "blitz"
import Layout from "app/core/layouts/Layout"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import QuestionForm from "../../components/QuestionForm"
import { CreateQuestion } from "app/questions/types"
import createQuestion from "app/questions/mutations/createQuestion"
import { Suspense } from "react"
import CircularProgress from "@mui/material/CircularProgress"

const Content = () => {
  const [createQuestionMutation] = useMutation(createQuestion)
  const router = useRouter()

  const onSubmit = async (question: CreateQuestion) => {
    try {
      const createdQuestion = await createQuestionMutation(question)
      await router.push("/questions/" + createdQuestion.id)
    } catch (e: any) {
      console.log(e)
    }
  }

  return (
    <Box>
      <Typography variant="h1" component="h1">
        New Question
      </Typography>
      <QuestionForm
        initialValues={{
          title: "",
          status: "unanswered",
          assignedToPersonIds: new Set(),
        }}
        onSubmit={onSubmit}
        onCancel={() => router.push("/questions")}
      />
    </Box>
  )
}
const NewQuestionPage: BlitzPage = () => {
  return (
    <Box>
      <Suspense fallback={<CircularProgress />}>
        <Content />
      </Suspense>
    </Box>
  )
}

NewQuestionPage.suppressFirstRenderFlicker = true
NewQuestionPage.getLayout = (page) => <Layout>{page}</Layout>

export default NewQuestionPage
