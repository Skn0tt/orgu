import { Form } from "app/core/components/Form"
import { TextField } from "app/core/components/Fields"
import { CreatePerson, CreatePersonSchema } from "../types"

export const PersonForm = ({
  initialValues,
  onSubmit,
}: {
  initialValues: CreatePerson
  onSubmit: (person: CreatePerson) => void
}) => {
  return (
    <Form
      submitText="Submit"
      schema={CreatePersonSchema}
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      <TextField name="name" label="Name" />
      <TextField name="description" label="Description" />
    </Form>
  )
}

export default PersonForm
