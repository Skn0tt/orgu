import { forwardRef, PropsWithoutRef } from "react"
import { useField } from "react-final-form"
import MuiTextField from "@mui/material/TextField"
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import MuiSelect from "@mui/material/Select"

interface TextFieldProps extends PropsWithoutRef<JSX.IntrinsicElements["input"]> {
  name: string
  label: string
  type?: "text" | "password" | "email" | "number"
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ name, label, ...props }, ref) => {
    const {
      input,
      meta: { error, submitError, submitting },
    } = useField(name, {
      parse:
        props.type === "number"
          ? (Number as any)
          : // Converting `""` to `null` ensures empty values will be set to null in the DB
            (v) => (v === "" ? null : v),
    })

    const normalizedError = Array.isArray(error) ? error.join(", ") : error || submitError

    return (
      <MuiTextField
        type={props.type ?? "text"}
        name={input.name}
        value={input.value}
        onChange={input.onChange}
        helperText={normalizedError}
        ref={ref}
        disabled={submitting}
        label={label}
        fullWidth
        variant="outlined"
        sx={{
          my: 1,
        }}
      />
    )
  }
)

interface SelectItem {
  value: string
  label: string
}

interface SelectProps {
  name: string
  label: string
  items: SelectItem[]
}

export const Select = ({ name, label, items }: SelectProps) => {
  const { input, meta } = useField(name)

  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <MuiSelect
        name={name}
        value={input.value}
        onChange={input.onChange}
        disabled={meta.submitting}
        label={label}
      >
        {items.map(({ value, label }) => (
          <MenuItem key={value} value={value}>
            {label}
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  )
}
