import { BlitzPage, useQuery, Link, useRouter } from "blitz"
import Layout from "app/core/layouts/Layout"
import Box from "@mui/material/Box"
import getQuestions from "app/questions/queries/getQuestions"
import { Suspense } from "react"
import CircularProgress from "@mui/material/CircularProgress"
import Button from "@mui/material/Button"
import { Question } from "db"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"
import CardActionArea from "@mui/material/CardActionArea"
import Chip from "@mui/material/Chip"

const QuestionCard = ({ question }: { question: Question }) => {
  const router = useRouter()
  return (
    <Card sx={{ mb: 1 }}>
      <CardActionArea onClick={() => router.push("/questions/" + question.id)}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {question.title}
          </Typography>
          <Box>
            <Chip label={question.status} color="secondary" size="small" />
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

const QuestionsList = () => {
  const [questions] = useQuery(getQuestions, null)
  return (
    <Box>
      {questions.map((question) => (
        <QuestionCard key={question.id} question={question} />
      ))}
    </Box>
  )
}

const QuestionsPage: BlitzPage = () => {
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

QuestionsPage.suppressFirstRenderFlicker = true
QuestionsPage.getLayout = (page) => <Layout>{page}</Layout>

export default QuestionsPage
