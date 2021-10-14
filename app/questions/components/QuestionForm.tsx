import { Form } from "app/core/components/Form"
import { TextField, Select } from "app/core/components/Fields"
import { CreateQuestion, CreateQuestionSchema } from "../types"

export const QuestionForm = ({
  initialValues,
  onSubmit,
}: {
  initialValues: CreateQuestion
  onSubmit: (question: CreateQuestion) => void
}) => {
  return (
    <Form
      submitText="Submit"
      schema={CreateQuestionSchema}
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      <TextField name="title" label="Title" />
      <TextField name="assignedToPersonId" label="Assigned to Person with Id" type="number" />
      <Select
        name="status"
        label="Status"
        items={[
          {
            value: "unanswered",
            label: "unanswered",
          },
          {
            value: "answered",
            label: "answered",
          },
          {
            value: "ongoing",
            label: "ongoing",
          },
        ]}
      />
    </Form>
  )
}

export default QuestionForm
