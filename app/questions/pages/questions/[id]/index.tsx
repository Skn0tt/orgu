import { BlitzPage, Link, useMutation, useParam, useQuery, useRouter } from "blitz"
import Layout from "app/core/layouts/Layout"
import Box from "@mui/material/Box"
import React from "react"
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
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material"
import TagsList from "app/questions/components/TagsList"
import StatusChip from "app/questions/components/StatusChip"

const QuestionPage: BlitzPage = () => {
  const questionId = useParam("id", "number")!
  const [question] = useQuery(getQuestion, questionId)
  const [createQuestionMutation] = useMutation(createAnswer)
  const [deleteQuestionMutation] = useMutation(deleteQuestion)
  const router = useRouter()

  const onDeleteQuestion = async () => {
    await deleteQuestionMutation(questionId)
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
      <Typography>
        Status: <StatusChip status={question.status} />
      </Typography>
      <Typography>
        Assigned to: {question.persons.map((person) => person.name).join(", ") || "nobody"}
      </Typography>
      {!!question.tags.length && (
        <Typography>
          Tags: <TagsList tags={question.tags} />
        </Typography>
      )}

      <Accordion>
        <AccordionSummary>
          <Typography variant="h3" component="h3">
            New Answer
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <AnswerForm
            initialValues={{ description: "", questionId: questionId, personId: 0 }}
            onSubmit={onCreateAnswer}
          />
        </AccordionDetails>
      </Accordion>

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

QuestionPage.suppressFirstRenderFlicker = true
QuestionPage.getLayout = (page) => <Layout>{page}</Layout>

export default QuestionPage
