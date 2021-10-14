import { BlitzPage, useQuery, Link } from "blitz"
import Layout from "app/core/layouts/Layout"
import Box from "@mui/material/Box"
import getQuestions from "app/questions/queries/getQuestions"
import { Suspense } from "react"
import CircularProgress from "@mui/material/CircularProgress"
import Button from "@mui/material/Button"

const QuestionsList = () => {
  const [questions] = useQuery(getQuestions, null)
  return (
    <Box>
      {questions.map((question) => (
        <Box key={question.id}>
          <h2>{question.title}</h2>
          <p>
            Status: {question.status} - Assigned to: {question.assignedToPerson.name}
          </p>
        </Box>
      ))}
    </Box>
  )
}

const Questions: BlitzPage = () => {
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Questions</h1>
        <Link href="/questions/new" passHref>
          <Button variant="contained">New Question</Button>
        </Link>
      </Box>

      <Suspense fallback={<CircularProgress />}>
        <QuestionsList />
      </Suspense>
    </Box>
  )
}

Questions.suppressFirstRenderFlicker = true
Questions.getLayout = (page) => <Layout>{page}</Layout>

export default Questions
