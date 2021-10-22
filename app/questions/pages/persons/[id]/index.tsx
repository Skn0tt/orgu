import { BlitzPage, Link, useMutation, useParam, useQuery, useRouter } from "blitz"
import Layout from "app/core/layouts/Layout"
import Box from "@mui/material/Box"
import React, { useState } from "react"
import CircularProgress from "@mui/material/CircularProgress"
import getPerson from "app/questions/queries/getPerson"
import IconButton from "@mui/material/IconButton"
import EditIcon from "@mui/icons-material/Edit"
import DeleteButton from "app/core/components/DeleteButton"
import deletePerson from "app/questions/mutations/deletePerson"
import { PersonAnswerBox } from "app/questions/components/AnswerBox"
import Typography from "@mui/material/Typography"
import Markdown from "app/core/components/Markdown"
import Button from "@mui/material/Button"
import updateAnswerDescriptions from "app/questions/mutations/updateAnswerDescriptions"
import StatusChip from "app/questions/components/StatusChip"
import TagsList from "app/questions/components/TagsList"

const PersonPage: BlitzPage = () => {
  const personId = useParam("id", "number")!
  const [person] = useQuery(getPerson, personId)
  const [deletePersonMutation] = useMutation(deletePerson)
  const [updateAnswerDescriptionsMutation, { isLoading: updatingAnswerDescriptions }] =
    useMutation(updateAnswerDescriptions)
  const router = useRouter()
  const [inUpdateMode, setInUpdateMode] = useState<boolean>(true)
  const [answerDescriptions, setAnswerDescriptions] = useState<Map<number, string>>(
    new Map(
      person.questions.map((question) => [
        question.id,
        question.answers.length ? question.answers[0]!.description : "",
      ])
    )
  )

  const onUpdateAnswerDescriptions = async () => {
    await updateAnswerDescriptionsMutation({ answerDescriptions, personId })
  }

  const onDeletePerson = async () => {
    await deletePersonMutation(personId)
    await router.push("/persons")
  }

  return (
    <Box>
      <Typography variant="h1" component="h1">
        {person.name}
        <Link href={`/persons/${personId}/edit`} passHref>
          <IconButton color="secondary">
            <EditIcon />
          </IconButton>
        </Link>
        <DeleteButton name="person" onSubmit={onDeletePerson} />
      </Typography>
      <Markdown value={person.description} />
      {!!person.tags.length && (
        <Box>
          Assigned Tags:{" "}
          <TagsList
            tags={person.tags.map((tag) => {
              return { ...tag, isLeaf: true }
            })}
          />
        </Box>
      )}
      <Typography variant="h2" component="h2">
        Assigned Questions{" "}
        <Button
          onClick={async () => {
            if (inUpdateMode) {
              await onUpdateAnswerDescriptions()
            }
            setInUpdateMode(!inUpdateMode)
          }}
          variant="contained"
          color="secondary"
        >
          {inUpdateMode ? "Save" : "Edit"}
        </Button>
      </Typography>
      {!updatingAnswerDescriptions ? (
        person.questions.map((question) => (
          <Box key={question.id}>
            <Typography variant="h3" component="h3">
              <Link href={"/questions/" + question.id} passHref>
                <Box
                  component="span"
                  sx={{
                    ":hover": {
                      cursor: "pointer",
                      textDecoration: "underline",
                    },
                  }}
                >
                  {question.title}
                </Box>
              </Link>
              <StatusChip status={question.status} />
              <TagsList tags={question.tags} />
            </Typography>
            <PersonAnswerBox
              description={answerDescriptions.get(question.id)!}
              setDescription={(value: string) => {
                const newAnswerDescriptions = new Map(answerDescriptions.entries())
                newAnswerDescriptions.set(question.id, value)
                setAnswerDescriptions(newAnswerDescriptions)
              }}
              inUpdateMode={inUpdateMode}
            />
          </Box>
        ))
      ) : (
        <CircularProgress />
      )}
    </Box>
  )
}

PersonPage.suppressFirstRenderFlicker = true
PersonPage.getLayout = (page) => <Layout>{page}</Layout>

export default PersonPage
