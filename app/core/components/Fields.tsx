import { forwardRef, PropsWithoutRef, useState } from "react"
import { useField } from "react-final-form"
import MuiTextField from "@mui/material/TextField"
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import MuiSelect from "@mui/material/Select"
import Box from "@mui/material/Box"
import Markdown from "./Markdown"
import Typography from "@mui/material/Typography"
import { IconButton } from "@mui/material"
import VisibilityIcon from "@mui/icons-material/Visibility"
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"
import { AutocompleteSelect, AutocompleteOption } from "./AutocompleteSelection"
import { TagsSelection } from "app/questions/components/TagsSelection"

const MarkdownPreview = ({ value }: { value: string }) => {
  const [visible, setVisible] = useState<boolean>(false)
  return (
    <Box>
      <Typography>
        Markdown Preview{" "}
        <IconButton onClick={() => setVisible(!visible)}>
          {visible ? <VisibilityOffIcon /> : <VisibilityIcon />}
        </IconButton>
      </Typography>
      {visible && (
        <Box sx={{ border: "1px solid #666", padding: "10px", borderRadius: "4px" }}>
          <Markdown value={value} />
        </Box>
      )}
    </Box>
  )
}

interface TextFieldProps extends PropsWithoutRef<JSX.IntrinsicElements["input"]> {
  name: string
  label: string
  type?: "text" | "password" | "email" | "number" | "textarea"
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ name, label, type, ...props }, ref) => {
    const {
      input,
      meta: { error, submitError, submitting },
    } = useField(name, {
      parse:
        type === "number"
          ? Number
          : // Converting `""` to `null` ensures empty values will be set to null in the DB
            (v) => (v === "" ? null : v),
    })

    const normalizedError = Array.isArray(error) ? error.join(", ") : error || submitError

    return (
      <Box>
        <MuiTextField
          type={type === "textarea" || type === undefined ? "text" : type}
          multiline={type === "textarea"}
          rows={10}
          name={input.name}
          value={input.value}
          onChange={input.onChange}
          helperText={normalizedError}
          ref={ref}
          disabled={submitting}
          label={label}
          fullWidth
          variant="outlined"
          color="secondary"
          sx={{
            my: 1,
          }}
        />
        {type === "textarea" && <MarkdownPreview value={input.value} />}
      </Box>
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
      <InputLabel color="secondary">{label}</InputLabel>
      <MuiSelect
        name={name}
        value={input.value}
        onChange={input.onChange}
        disabled={meta.submitting}
        label={label}
        color="secondary"
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

interface AutocompleteProps {
  name: string
  label: string
  options: AutocompleteOption[]
  getOptionDisabled?: (option: AutocompleteOption) => boolean
}

export const AutocompleteSingleSelectField = ({
  name,
  label,
  options,
  getOptionDisabled = () => false,
}: AutocompleteProps) => {
  const { input } = useField<number>(name)
  return AutocompleteSelect({
    value: input.value,
    onChange: input.onChange,
    label,
    options,
    getOptionDisabled,
    multiple: false,
  })
}

export const AutocompleteMultiSelectField = ({
  name,
  label,
  options,
  getOptionDisabled = () => false,
}: AutocompleteProps) => {
  const { input } = useField<Set<number>>(name)
  return AutocompleteSelect({
    value: input.value,
    onChange: input.onChange,
    label,
    options,
    getOptionDisabled,
    multiple: true,
  })
}

export const TagsSelectionField = ({ name, label }: { name: string; label: string }) => {
  const { input } = useField<Set<number>>(name)
  return TagsSelection({
    tagIds: input.value,
    setTagIds: input.onChange,
  })
}
