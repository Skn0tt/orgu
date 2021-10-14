import { Box } from "@mui/material"
import DeleteButton from "app/core/components/DeleteButton"
import { TextField } from "app/core/components/Fields"
import { Form } from "app/core/components/Form"
import { useRouter } from "blitz"
import React from "react"
import deleteAnswer from "../mutations/deleteAnswer"
import { CreateAnswer, CreateAnswerSchema } from "../types"

export const AnswerForm = ({
  initialValues,
  onSubmit,
}: {
  initialValues: CreateAnswer
  onSubmit: (answer: CreateAnswer) => void
}) => {
  const router = useRouter()
  const onDeletePerson = async () => {
    // await deleteAnswer(initialValues.id)
    router.reload()
  }

  return (
    <Box>
      <Form
        submitText="Submit"
        schema={CreateAnswerSchema}
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
        <TextField name="description" label="Description" />
        <TextField name="personId" label="Person Id" type="number" />
      </Form>
      <DeleteButton name={"answer"} onSubmit={() => {}} />
    </Box>
  )
}

export default AnswerForm
