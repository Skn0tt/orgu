import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import React, { useState } from "react"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"

const DeleteButton = (props: { name: string; onSubmit: () => void }) => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleCancel = () => {
    setOpen(false)
  }

  const handleDelete = () => {
    setOpen(false)
    props.onSubmit()
  }

  return (
    <>
      <IconButton color="secondary" onClick={handleOpen} id="delete">
        <DeleteIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Do you really want to delete this {props.name}?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {"This action can't be undone."}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button id="confirm" onClick={handleDelete} variant="contained" color="error">
            Delete
          </Button>
          <Button id="cancel" onClick={handleCancel} variant="contained" autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default DeleteButton
