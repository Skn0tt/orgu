import { BlitzPage, useQuery, Link, useRouter } from "blitz"
import Layout from "app/core/layouts/Layout"
import Box from "@mui/material/Box"
import getQuestions from "app/questions/queries/getQuestions"
import { Suspense, useState } from "react"
import CircularProgress from "@mui/material/CircularProgress"
import Button from "@mui/material/Button"
import { Question } from "db"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"
import CardActionArea from "@mui/material/CardActionArea"
import Chip from "@mui/material/Chip"
import Markdown from "app/core/components/Markdown"

const QuestionCard = ({ question }: { question: Question }) => {
  const router = useRouter()
  return (
    <Card sx={{ mb: 1 }}>
      <CardActionArea onClick={() => router.push("/questions/" + question.id)}>
        <CardContent>
          <Typography variant="h3" component="h2" mt={0}>
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
  const [value, setValue] = useState("")
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
      <textarea value={value} onChange={(e) => setValue(e.target.value)}></textarea>
      <Markdown value={value} />

      <Suspense fallback={<CircularProgress />}>
        <QuestionsList />
      </Suspense>
    </Box>
  )
}

QuestionsPage.suppressFirstRenderFlicker = true
QuestionsPage.getLayout = (page) => <Layout>{page}</Layout>

export default QuestionsPage
