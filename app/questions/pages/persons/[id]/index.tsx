import { BlitzPage, useQuery, useParam } from "blitz"
import Layout from "app/core/layouts/Layout"
import Box from "@mui/material/Box"
import { Suspense } from "react"
import CircularProgress from "@mui/material/CircularProgress"
import getPerson from "app/questions/queries/getPerson"
import TextField from "@mui/material/TextField"

const Content = () => {
  const personId = useParam("id", "number")
  const [person] = useQuery(getPerson, personId)

  return (
    <Box>
      <h1>{person.name}</h1>
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
