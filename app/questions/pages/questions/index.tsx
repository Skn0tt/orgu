import { BlitzPage, Link, useQuery, useRouter } from "blitz"
import Layout from "app/core/layouts/Layout"
import Box from "@mui/material/Box"
import getQuestions from "app/questions/queries/getQuestions"
import { Suspense } from "react"
import CircularProgress from "@mui/material/CircularProgress"
import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"
import CardActionArea from "@mui/material/CardActionArea"
import Chip from "@mui/material/Chip"
import { PreviewQuestion } from "app/questions/types"

const QuestionCard = ({ question }: { question: PreviewQuestion }) => {
  const router = useRouter()
  return (
    <Card sx={{ mb: 1 }}>
      <CardActionArea onClick={() => router.push("/questions/" + question.id)}>
        <CardContent>
          <Typography variant="h3" component="h2" mt={0}>
            {question.title}
          </Typography>
          <Box>
            <Chip label={question.status} color="primary" size="small" />
            {question.tags.map((tag) => (
              <Chip key={tag.id} label={tag.name} color="secondary" size="small" />
            ))}
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
        <Typography variant="h1" component="h1">
          Questions
        </Typography>
        <Link href="/questions/new" passHref>
          <Button variant="contained" color="secondary">
            New Question
          </Button>
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
