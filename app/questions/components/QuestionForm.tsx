import { Form } from "app/core/components/Form"
import { Select, TextField } from "app/core/components/Fields"
import { CreateQuestion, CreateQuestionSchema, UpdateQuestion } from "../types"
import PersonSelection from "../components/PersonSelection"

type CreateUpdateQuestion = CreateQuestion | UpdateQuestion

export const QuestionForm = ({
  initialValues,
  onSubmit,
  onCancel,
}: {
  initialValues: CreateUpdateQuestion
  onSubmit: (question: CreateUpdateQuestion) => void
  onCancel: () => void
}) => {
  return (
    <Form
      submitText="Submit"
      schema={CreateQuestionSchema}
      initialValues={initialValues}
      onSubmit={onSubmit}
      onCancel={onCancel}
    >
      <TextField name="title" label="Title" />
      <PersonSelection name="assignedToPersonIds" label="Assigned to people" />
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
