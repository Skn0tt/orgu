import { Box } from "@mui/material"
import React from "react"
import ReactMarkdown from "react-markdown"

const Markdown = ({ value }: { value: string }) => {
  return (
    <Box
      sx={{
        "& > *": {
          mb: 0,
          mt: 0,
        },
      }}
    >
      <ReactMarkdown>{value}</ReactMarkdown>
    </Box>
  )
}

export default Markdown
