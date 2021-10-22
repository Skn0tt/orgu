import QuestionForm from "app/questions/components/QuestionForm"
import { UpdateQuestion } from "app/questions/types"
import { BlitzPage, useMutation, useParam, useQuery, useRouter } from "blitz"
import Layout from "app/core/layouts/Layout"
import Box from "@mui/material/Box"
import getQuestion from "app/questions/queries/getQuestion"
import updateQuestion from "app/questions/mutations/updateQuestion"
import Typography from "@mui/material/Typography"

const EditQuestionPage: BlitzPage = () => {
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
            personIds: new Set(question.persons.map((person) => person.id)),
            tagIds: new Set(question.tags.map((tag) => tag.id)),
          } as UpdateQuestion
        }
        onSubmit={onSubmit}
        onCancel={() => router.push("/questions/" + questionId)}
      />
    </Box>
  )
}

EditQuestionPage.suppressFirstRenderFlicker = true
EditQuestionPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditQuestionPage
