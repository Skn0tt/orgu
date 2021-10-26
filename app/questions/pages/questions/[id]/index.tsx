import { BlitzPage, Link, useMutation, useParam, useQuery, useRouter } from "blitz"
import Layout from "app/core/layouts/Layout"
import Box from "@mui/material/Box"
import React, { useState } from "react"
import getQuestion from "app/questions/queries/getQuestion"
import IconButton from "@mui/material/IconButton"
import EditIcon from "@mui/icons-material/Edit"
import DeleteButton from "app/core/components/DeleteButton"
import deleteQuestion from "app/questions/mutations/deleteQuestion"
import AnswerForm from "app/questions/components/AnswerForm"
import createAnswer from "app/questions/mutations/createAnswer"
import { CreateAnswer } from "app/questions/types"
import Typography from "@mui/material/Typography"
import { Accordion, AccordionDetails, AccordionSummary, Divider, TextField } from "@mui/material"
import TagsList from "app/questions/components/TagsList"
import StatusChip from "app/questions/components/StatusChip"
import Markdown from "../../../../core/components/Markdown"
import AnswerCard from "app/questions/components/AnswerCard"

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

  const [searchText, setSearchText] = useState<string>("")

  return (
    <Box>
      <Box
        sx={{
          border: 0.2,
          backgroundColor: "readonlyField.background",
          borderColor: "readonlyField.background",
          borderRadius: 2,
          padding: 1,
          mb: 1,
        }}
      >
        <Typography variant="h1" component="h1" sx={{ mb: 0, mt: 0 }}>
          {question.title}{" "}
          <Link href={`/questions/${questionId}/edit`} passHref>
            <IconButton color="secondary">
              <EditIcon />
            </IconButton>
          </Link>
          <DeleteButton name="question" onSubmit={onDeleteQuestion} />
        </Typography>

        <Divider sx={{ mt: 0.5, mb: 0.5 }} />
        <Markdown value={question.description ?? ""} />
      </Box>
      <Typography>
        Status: <StatusChip status={question.status} />
      </Typography>
      {!!question.persons.length && (
        <Typography>
          Assigned to: {question.persons.map((person) => person.name).join(", ")}
        </Typography>
      )}
      {!!question.tags.length && (
        <Typography>
          Tags: <TagsList tags={question.tags} />
        </Typography>
      )}

      <Divider sx={{ mt: 0.5, mb: 3 }} />

      <Accordion disableGutters>
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

      <Divider sx={{ mt: 0.5, mb: 3 }} />

      {question.answers.length ? (
        <Box>
          <Typography variant="h2" component="h2">
            Answers
          </Typography>
          <TextField
            label="Text Search"
            value={searchText}
            fullWidth
            onChange={(e) => setSearchText(e.target.value)}
            sx={{ mb: 1, mr: 1 }}
            color="secondary"
          />
        </Box>
      ) : (
        ""
      )}
      {question.answers
        .filter(
          (answer) =>
            answer.description.toLowerCase().includes(searchText.toLowerCase()) ||
            answer.person.name.toLowerCase().includes(searchText.toLowerCase())
        )
        .map((answer) => (
          <AnswerCard key={answer.id} answer={answer} />
        ))}
    </Box>
  )
}

QuestionPage.suppressFirstRenderFlicker = true
QuestionPage.getLayout = (page) => <Layout>{page}</Layout>

export default QuestionPage
