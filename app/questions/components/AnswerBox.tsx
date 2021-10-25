import { useMutation, useRouter, Link } from "blitz"
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
import { Card, CardContent, TextField } from "@mui/material"
import Markdown from "app/core/components/Markdown"

const AnswerCard = ({ answer }: { answer: Answer }) => {
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
    <Card key={answer.id} sx={{ mb: 1 }}>
      {inUpdateMode ? (
        <CardContent>
          <AnswerForm
            initialValues={answer}
            onSubmit={onUpdateAnswer}
            onCancel={() => setInUpdateMode(false)}
          />
        </CardContent>
      ) : (
        <Box>
          <CardContent
            sx={{
              pt: 0,
              ":last-child": {
                paddingBottom: 2,
              },
            }}
          >
            <Markdown value={answer.description} />
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Box />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: "background.default",
                  borderRadius: 8,
                  pl: 3,
                  pr: 1,
                }}
              >
                <Link href={("/persons/" + answer.personId) as string} passHref>
                  <Typography
                    align={"center"}
                    sx={{
                      ":hover": {
                        cursor: "pointer",
                        textDecoration: "underline",
                      },
                    }}
                  >
                    {answer.person.name}
                  </Typography>
                </Link>
                <IconButton color="secondary" onClick={() => setInUpdateMode(true)}>
                  <EditIcon />
                </IconButton>
                <DeleteButton name={"answer"} onSubmit={onDeleteAnswer} />
              </Box>
            </Box>
          </CardContent>
        </Box>
      )}
    </Card>
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

export default AnswerCard
