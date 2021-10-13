import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import Select from "@mui/material/Select"
import TextField from "@mui/material/TextField"
import { useState } from "react"
import { NewQuestion, QuestionStatus } from "../types"
import { useMutation } from "blitz"
import createQuestion from "../mutations/createQuestion"

const emptyQuestion: NewQuestion = {
  title: "",
  status: "unanswered",
  assignedToPersonId: 1,
}

const QuestionForm = () => {
  const [question, setQuestion] = useState<NewQuestion>(emptyQuestion)
  const [createQuestionMutation] = useMutation(createQuestion)
  const submitQuestion = async () => {
    const res = await createQuestionMutation(question)
    console.log(res)
    setQuestion(emptyQuestion)
  }
  return (
    <Box>
      <TextField
        fullWidth
        label="Title"
        variant="outlined"
        value={question.title}
        onChange={(e) =>
          setQuestion({
            ...question,
            title: e.target.value,
          })
        }
      />
      <TextField
        fullWidth
        label="Assigned to Person with ID"
        variant="outlined"
        value={question.assignedToPersonId}
        onChange={(e) =>
          setQuestion({
            ...question,
            assignedToPersonId: parseInt(e.target.value),
          })
        }
      />
      <FormControl fullWidth>
        <InputLabel id="status-select-label">Status</InputLabel>
        <Select
          labelId="status-select-label"
          id="status-select"
          value={question.status}
          label="Status"
          onChange={(e) =>
            setQuestion({
              ...question,
              status: e.target.value as QuestionStatus,
            })
          }
        >
          <MenuItem value="answered">answered</MenuItem>
          <MenuItem value="unanswered">unanswered</MenuItem>
          <MenuItem value="ongoing">ongoing</MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained" onClick={submitQuestion}>
        Create Question
      </Button>
    </Box>
  )
}
export default QuestionForm
