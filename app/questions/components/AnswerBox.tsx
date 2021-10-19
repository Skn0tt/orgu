import { useMutation, useRouter } from "blitz"
import Box from "@mui/system/Box"
import DeleteButton from "app/core/components/DeleteButton"
import React, { useState } from "react"
import IconButton from "@mui/material/IconButton"
import EditIcon from "@mui/icons-material/Edit"
import deleteAnswer from "../mutations/deleteAnswer"
import { Answer, UpdateAnswer } from "../types"
import AnswerForm from "./AnswerForm"
import updateAnswer from "../mutations/updateAnswer"
import Typography from "@mui/material/Typography"
import { TextField } from "@mui/material"
import Markdown from "app/core/components/Markdown"

const AnswerBox = ({ answer }: { answer: Answer }) => {
  const [deleteAnswerMutation] = useMutation(deleteAnswer)
  const [updateAnswerMutation] = useMutation(updateAnswer)
  const [inUpdateMode, setInUpdateMode] = useState<boolean>(false)
  const router = useRouter()
  const onDeleteAnswer = async () => {
    await deleteAnswerMutation(answer.id)
    router.reload()
  }
  const onUpdateAnswer = async (answer: UpdateAnswer) => {
    await updateAnswerMutation(answer)
    router.reload()
  }

  return (
    <Box key={answer.id}>
      {inUpdateMode ? (
        <AnswerForm
          initialValues={answer}
          onSubmit={onUpdateAnswer}
          onCancel={() => setInUpdateMode(false)}
        />
      ) : (
        <Box>
          <Typography variant="h3" component="h3">
            {answer.person.name}
            <IconButton color="secondary" onClick={() => setInUpdateMode(true)}>
              <EditIcon />
            </IconButton>
            <DeleteButton name={"answer"} onSubmit={onDeleteAnswer} />
          </Typography>
          <Typography>{answer.description}</Typography>
        </Box>
      )}
    </Box>
  )
}
export const PersonAnswerBox = ({
  description,
  setDescription,
  inUpdateMode,
}: {
  description: string
  setDescription: (v: string) => void
  inUpdateMode: boolean
}) => {
  return (
    <Box>
      {inUpdateMode ? (
        <TextField
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          multiline
        />
      ) : (
        <Box sx={{ ml: "15px" }}>
          <Markdown value={description} />
        </Box>
      )}
    </Box>
  )
}

export default AnswerBox
