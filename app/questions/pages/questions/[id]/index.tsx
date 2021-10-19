import { BlitzPage, Link, useMutation, useParam, useQuery, useRouter } from "blitz"
import Layout from "app/core/layouts/Layout"
import Box from "@mui/material/Box"
import React, { Suspense } from "react"
import CircularProgress from "@mui/material/CircularProgress"
import getQuestion from "app/questions/queries/getQuestion"
import IconButton from "@mui/material/IconButton"
import EditIcon from "@mui/icons-material/Edit"
import DeleteButton from "app/core/components/DeleteButton"
import deleteQuestion from "app/questions/mutations/deleteQuestion"
import AnswerForm from "app/questions/components/AnswerForm"
import createAnswer from "app/questions/mutations/createAnswer"
import { CreateAnswer } from "app/questions/types"
import AnswerBox from "app/questions/components/AnswerBox"
import Typography from "@mui/material/Typography"

const Content = () => {
  const questionId = useParam("id", "number")!
  const [question] = useQuery(getQuestion, questionId)
  const [createQuestionMutation] = useMutation(createAnswer)
  const router = useRouter()

  const onDeleteQuestion = async () => {
    await deleteQuestion(questionId)
    await router.push("/questions")
  }

  const onCreateAnswer = async (question: CreateAnswer) => {
    try {
      await createQuestionMutation(question)
      router.reload()
    } catch (e: any) {
      console.log(e)
    }
  }

  return (
    <Box>
      <Box>
        <Typography variant="h1" component="h1">
          {question.title}{" "}
          <Link href={`/questions/${questionId}/edit`} passHref>
            <IconButton color="secondary">
              <EditIcon />
            </IconButton>
          </Link>
          <DeleteButton name="question" onSubmit={onDeleteQuestion} />
        </Typography>
      </Box>
      <Typography>Status: {question.status}</Typography>
      <Typography>
        Assigned to:{" "}
        {question.assignments.map((assignment) => assignment.person.name).join(", ") || "nobody"}
      </Typography>

      <Typography variant="h2" component="h2">
        New Answer
      </Typography>
      <AnswerForm
        initialValues={{ description: "", questionId: questionId, personId: 0 }}
        onSubmit={onCreateAnswer}
      />

      {question.answers.length ? (
        <Typography variant="h2" component="h2">
          Answers
        </Typography>
      ) : (
        ""
      )}
      {question.answers.map((answer) => (
        <AnswerBox key={answer.id} answer={answer} />
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
