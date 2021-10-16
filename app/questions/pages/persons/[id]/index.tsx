import { BlitzPage, useQuery, useParam, Link, useRouter, useMutation } from "blitz"
import Layout from "app/core/layouts/Layout"
import Box from "@mui/material/Box"
import { Suspense } from "react"
import CircularProgress from "@mui/material/CircularProgress"
import getPerson from "app/questions/queries/getPerson"
import React from "react"
import IconButton from "@mui/material/IconButton"
import EditIcon from "@mui/icons-material/Edit"
import DeleteButton from "app/core/components/DeleteButton"
import deletePerson from "app/questions/mutations/deletePerson"
import AnswerBox from "app/questions/components/AnswerBox"
import Typography from "@mui/material/Typography"
import Markdown from "app/core/components/Markdown"

const Content = () => {
  const personId = useParam("id", "number")!
  const [person] = useQuery(getPerson, personId)
  const [deletePersonMutation] = useMutation(deletePerson)
  const router = useRouter()

  const onDeletePerson = async () => {
    await deletePersonMutation(personId)
    router.push("/persons")
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
      <Typography variant="h2" component="h2">
        Assigned Questions
      </Typography>
      {person.assignments.map(({ question }) => (
        <Box key={question.id}>
          <Typography variant="h3" component="h3">
            {question.title} ({question.status})
          </Typography>
          {question.answers.map((answer) => (
            <AnswerBox key={answer.id} answer={answer} />
          ))}
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
