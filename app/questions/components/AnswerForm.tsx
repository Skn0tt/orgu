import { Box } from "@mui/material"
import { TextField } from "app/core/components/Fields"
import { Form } from "app/core/components/Form"
import React from "react"
import { CreateAnswer, CreateAnswerSchema, UpdateAnswer } from "../types"
import PersonSelection from "./PersonSelection"

type CreateUpdateAnswer = CreateAnswer | UpdateAnswer

export const AnswerForm = ({
  initialValues,
  onSubmit,
  onCancel,
}: {
  initialValues: CreateUpdateAnswer
  onSubmit: (answer: CreateUpdateAnswer) => void
  onCancel?: () => void
}) => {
  return (
    <Box>
      <Form
        submitText="Submit"
        schema={CreateAnswerSchema}
        initialValues={initialValues}
        onSubmit={onSubmit}
        onCancel={onCancel}
      >
        <TextField name="description" label="Description" type="textarea" />
        <PersonSelection name={"personId"} label={"From person"} allowMultiple={false} />
      </Form>
    </Box>
  )
}

export default AnswerForm
