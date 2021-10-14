import { BlitzPage, useQuery, useParam, Link, useRouter } from "blitz"
import Layout from "app/core/layouts/Layout"
import Box from "@mui/material/Box"
import { Suspense } from "react"
import CircularProgress from "@mui/material/CircularProgress"
import getPerson from "app/questions/queries/getPerson"
import TextField from "@mui/material/TextField"
import React from "react"
import IconButton from "@mui/material/IconButton"
import EditIcon from "@mui/icons-material/Edit"
import DeleteButton from "app/core/components/DeleteButton"
import deletePerson from "app/questions/mutations/deletePerson"

const Content = () => {
  const personId = useParam("id", "number")
  const [person] = useQuery(getPerson, personId)
  const router = useRouter()

  const onDeletePerson = async () => {
    if (personId !== undefined) {
      await deletePerson(personId)
      router.push("/questions")
    }
  }

  return (
    <Box>
      <h1>
        {person.name}
        <Link href={`/persons/${personId}/edit`} passHref>
          <IconButton color="secondary">
            <EditIcon />
          </IconButton>
        </Link>
        <DeleteButton name="person" onSubmit={onDeletePerson} />
      </h1>
      <p>{person.description}</p>
      <h2>Assigned Questions</h2>
      {person.assignedQuestions.map((question) => (
        <Box key={question.id}>
          <h3>
            {question.title} ({question.status})
          </h3>
          {question.answers.map((answer) =>
            answer.personId === person.id ? (
              <TextField
                fullWidth
                label="Answer"
                variant="outlined"
                multiline
                rows={3}
                value={answer.description}
              />
            ) : (
              <Box key={answer.id}>{answer.description}</Box>
            )
          )}
        </Box>
      ))}
    </Box>
  )
}

const PersonPage: BlitzPage = () => {
  return (
    <Box>
      <Suspense fallback={<CircularProgress />}>
        <Content />
      </Suspense>
    </Box>
  )
}

PersonPage.suppressFirstRenderFlicker = true
PersonPage.getLayout = (page) => <Layout>{page}</Layout>

export default PersonPage
