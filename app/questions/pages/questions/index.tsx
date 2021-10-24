import { BlitzPage, Link, useQuery, useRouter } from "blitz"
import Layout from "app/core/layouts/Layout"
import Box from "@mui/material/Box"
import getQuestions from "app/questions/queries/getQuestions"
import { useState } from "react"
import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"
import CardActionArea from "@mui/material/CardActionArea"
import { PreviewQuestion, QuestionStatus } from "app/questions/types"
import TagsList from "app/questions/components/TagsList"
import StatusChip from "app/questions/components/StatusChip"
import QuestionSearchForm, {
  QuestionSearchParams,
} from "app/questions/components/QuestionSearchForm"
import { intersection } from "app/utils/set"

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
            <StatusChip status={question.status} />
            <TagsList tags={question.tags} />
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export const filterQuestions = (
  searchParams: QuestionSearchParams,
  questions: PreviewQuestion[]
) => {
  return questions.filter((question) => {
    const leafTagIds = new Set(question.tags.filter((tag) => tag.isLeaf).map((tag) => tag.id))
    const textExpression = question.title.toLowerCase().includes(searchParams.text.toLowerCase())
    const tagIdsExpression = intersection(leafTagIds, searchParams.tagIds).size
    const statusesExpression = searchParams.statuses.has(question.status)
    const personsExpression = intersection(question.personIds, searchParams.personIds).size
    if (searchParams.logicalOperator === "AND") {
      return (
        textExpression &&
        (tagIdsExpression || !searchParams.tagIds.size) &&
        (statusesExpression || !searchParams.statuses.size) &&
        (personsExpression || !searchParams.personIds.size)
      )
    } else {
      return (
        textExpression &&
        (tagIdsExpression ||
          statusesExpression ||
          personsExpression ||
          (!searchParams.tagIds.size &&
            !searchParams.statuses.size &&
            !searchParams.personIds.size))
      )
    }
  })
}

const QuestionsList = ({ searchParams }: { searchParams: QuestionSearchParams }) => {
  const [questions] = useQuery(getQuestions, null)
  const filteredQuestions = filterQuestions(searchParams, questions)

  return (
    <Box>
      {filteredQuestions.length
        ? filteredQuestions.map((question) => (
            <QuestionCard key={question.id} question={question} />
          ))
        : "No questions found."}
    </Box>
  )
}

const QuestionsPage: BlitzPage = () => {
  const [searchParams, setSearchParams] = useState<QuestionSearchParams>({
    text: "",
    tagIds: new Set(),
    statuses: new Set<QuestionStatus>(),
    personIds: new Set(),
    logicalOperator: "AND",
  })

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
      <QuestionSearchForm searchParams={searchParams} setSearchParams={setSearchParams} />
      <QuestionsList searchParams={searchParams} />
    </Box>
  )
}

QuestionsPage.suppressFirstRenderFlicker = true
QuestionsPage.getLayout = (page) => <Layout>{page}</Layout>

export default QuestionsPage
