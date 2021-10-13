import { useMutation, useRouter } from "blitz"
import createQuestion from "../mutations/createQuestion"
import { Form } from "app/core/components/Form"
import { TextField, Select } from "app/core/components/Fields"
import { CreateQuestion, CreateQuestionSchema } from "../types"

export const QuestionForm = () => {
  const [createQuestionMutation] = useMutation(createQuestion)
  const router = useRouter()

  return (
    <Form
      submitText="Create Question"
      schema={CreateQuestionSchema}
      initialValues={
        {
          title: "",
          status: "unanswered",
          assignedToPersonId: 1,
        } as CreateQuestion
      }
      onSubmit={async (values) => {
        try {
          await createQuestionMutation(values)
          router.reload()
        } catch (error: any) {
          console.log(error)
        }
      }}
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
