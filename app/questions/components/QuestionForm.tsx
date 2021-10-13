import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import Select from "@mui/material/Select"
import { useMutation } from "blitz"
import createQuestion from "../mutations/createQuestion"
import { Form } from "app/core/components/Form"
import LabeledTextField from "app/core/components/LabeledTextField"
import { CreateQuestion } from "../types"
import { Field } from "react-final-form"

export const QuestionForm = () => {
  const [createQuestionMutation] = useMutation(createQuestion)

  return (
    <Form
      submitText="Create Question"
      schema={CreateQuestion}
      initialValues={{
        title: "",
        status: "unanswered",
        assignedToPersonId: 1,
      }}
      onSubmit={async (values) => {
        try {
          const res = await createQuestionMutation(values)
          console.log(res)
        } catch (error: any) {
          console.log(error)
        }
      }}
    >
      <LabeledTextField name="title" label="Title" />
      <LabeledTextField
        name="assignedToPersonId"
        label="Assigned to Person with Id"
        type="number"
      />
      <Field name="status">
        {(props) => (
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              name={props.input.name}
              value={props.input.value}
              onChange={props.input.onChange}
              label="Status"
            >
              <MenuItem value="answered">answered</MenuItem>
              <MenuItem value="unanswered">unanswered</MenuItem>
              <MenuItem value="ongoing">ongoing</MenuItem>
            </Select>
          </FormControl>
        )}
      </Field>
    </Form>
  )
}

export default QuestionForm
