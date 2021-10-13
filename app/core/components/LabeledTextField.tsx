import { forwardRef, PropsWithoutRef } from "react"
import { useField, UseFieldConfig } from "react-final-form"
import TextField from "@mui/material/TextField"

export interface LabeledTextFieldProps extends PropsWithoutRef<JSX.IntrinsicElements["input"]> {
  name: string
  label: string
  type?: "text" | "password" | "email" | "number"
  fieldProps?: UseFieldConfig<string>
}

export const LabeledTextField = forwardRef<HTMLInputElement, LabeledTextFieldProps>(
  ({ name, label, fieldProps, ...props }, ref) => {
    const {
      input,
      meta: { error, submitError, submitting },
    } = useField(name, {
      parse:
        props.type === "number"
          ? (Number as any)
          : // Converting `""` to `null` ensures empty values will be set to null in the DB
            (v) => (v === "" ? null : v),
      ...fieldProps,
    })

    const normalizedError = Array.isArray(error) ? error.join(", ") : error || submitError

    return (
      <TextField
        type={props.type}
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

export default LabeledTextField
