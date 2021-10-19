import QuestionForm from "app/questions/components/QuestionForm"
import { UpdateQuestion } from "app/questions/types"
import { BlitzPage, useMutation, useParam, useQuery, useRouter } from "blitz"
import Layout from "app/core/layouts/Layout"
import Box from "@mui/material/Box"
import { Suspense } from "react"
import CircularProgress from "@mui/material/CircularProgress"
import getQuestion from "app/questions/queries/getQuestion"
import updateQuestion from "app/questions/mutations/updateQuestion"
import Typography from "@mui/material/Typography"

const Content = () => {
  const questionId = useParam("id", "number")!
  const [question] = useQuery(getQuestion, questionId)
  const [updateQuestionMutation] = useMutation(updateQuestion)
  const router = useRouter()

  const onSubmit = async (question: UpdateQuestion) => {
    try {
      const updatedQuestion = await updateQuestionMutation(question)
      await router.push("/questions/" + updatedQuestion.id)
    } catch (e: any) {
      console.log(e)
    }
  }

  return (
    <Box>
      <Typography variant="h1" component="h1">
        Edit Question
      </Typography>
      <QuestionForm
        initialValues={
          {
            ...question,
            assignedToPersonIds: new Set(
              question.personToQuestions.map((personToQuestion) => personToQuestion.personId)
            ),
          } as UpdateQuestion
        }
        onSubmit={onSubmit}
        onCancel={() => router.push("/questions/" + questionId)}
      />
    </Box>
  )
}

const EditQuestionPage: BlitzPage = () => {
  return (
    <Box>
      <Suspense fallback={<CircularProgress />}>
        <Content />
      </Suspense>
    </Box>
  )
}

EditQuestionPage.suppressFirstRenderFlicker = true
EditQuestionPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditQuestionPage
