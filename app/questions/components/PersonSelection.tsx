import { useField } from "react-final-form"
import Box from "@mui/material/Box"
import Checkbox from "@mui/material/Checkbox"
import { useQuery } from "blitz"
import getPersons from "../queries/getPersons"
import Typography from "@mui/material/Typography"

interface SelectProps {
  name: string
  label: string
}

const PersonSelection = ({ name, label }: SelectProps) => {
  const { input } = useField<Set<number>>(name)
  const [persons] = useQuery(getPersons, null)

  return (
    <Box>
      <Typography variant="h3" component="h3">
        {label}
      </Typography>
      {persons.map((person) => (
        <span key={person.id}>
          <Checkbox
            checked={input.value.has(person.id)}
            onChange={() => {
              const newValue = new Set(input.value)
              if (input.value.has(person.id)) {
                newValue.delete(person.id)
              } else {
                newValue.add(person.id)
              }
              input.onChange(newValue)
            }}
          />
          {person.name}
        </span>
      ))}
    </Box>
  )
}

export default PersonSelection
