import { BlitzPage, useQuery, useParam, Link, useRouter } from "blitz"
import Layout from "app/core/layouts/Layout"
import Box from "@mui/material/Box"
import { Suspense } from "react"
import CircularProgress from "@mui/material/CircularProgress"
import getQuestion from "app/questions/queries/getQuestion"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import EditIcon from "@mui/icons-material/Edit"
import DeleteButton from "app/core/components/DeleteButton"
import deleteQuestion from "app/questions/mutations/deleteQuestion"

const Content = () => {
  const questionId = useParam("id", "number")
  const [question] = useQuery(getQuestion, questionId)
  const router = useRouter()

  const onDeleteQuestion = async () => {
    if (questionId !== undefined) {
      await deleteQuestion(questionId)
      router.push("/questions")
    }
  }

  return (
    <Box>
      <Box>
        <h1>
          {question.title}{" "}
          <Link href={`/questions/${questionId}/edit`} passHref>
            <IconButton color="secondary">
              <EditIcon />
            </IconButton>
          </Link>
          <DeleteButton name="question" onSubmit={onDeleteQuestion} />
        </h1>
      </Box>
      <p>{question.status}</p>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Answers</h2>
        <Button variant="contained">New Answer</Button>
      </Box>

      {question.answers.map((answer) => (
        <Box key={answer.id}>
          <h3>{answer.personId}</h3>
          <p>{answer.description}</p>
        </Box>
      ))}
    </Box>
  )
}

const QuestionPage: BlitzPage = () => {
  return (
    <Box>
      <Suspense fallback={<CircularProgress />}>
        <Content />
      </Suspense>
    </Box>
  )
}

QuestionPage.suppressFirstRenderFlicker = true
QuestionPage.getLayout = (page) => <Layout>{page}</Layout>

export default QuestionPage
