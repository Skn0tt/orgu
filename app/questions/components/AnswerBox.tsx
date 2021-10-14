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
        <AnswerForm initialValues={answer} onSubmit={onUpdateAnswer} />
      ) : (
        <Box>
          <h3>
            {answer.person.name}
            <IconButton color="secondary" onClick={() => setInUpdateMode(true)}>
              <EditIcon />
            </IconButton>
            <DeleteButton name={"answer"} onSubmit={onDeleteAnswer} />
          </h3>
          <p>{answer.description}</p>
        </Box>
      )}
    </Box>
  )
}
export default AnswerBox
