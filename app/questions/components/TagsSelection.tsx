import Box from "@mui/material/Box"
import React, { useState } from "react"
import TreeView from "@mui/lab/TreeView"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import {
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  Typography,
} from "@mui/material"
import TreeItem, { TreeItemProps, useTreeItem, TreeItemContentProps } from "@mui/lab/TreeItem"
import clsx from "clsx"
import { Tag, TagNode } from "../types"
import getTagsTrees from "../queries/getTagsTrees"
import { useQuery } from "blitz"
import getTagsMap from "../queries/getTagsMap"
import { AutocompleteOption } from "app/core/components/AutocompleteSelection"
import Autocomplete from "@mui/material/Autocomplete"
import TextField from "@mui/material/TextField"
import { difference } from "app/utils/set"
import CheckIcon from "@mui/icons-material/Check"

const ScrollDialog = ({
  children,
  onClose = () => {},
}: {
  children: React.ReactNode
  onClose?: () => void
}) => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    onClose()
    setOpen(false)
  }

  return (
    <span>
      <Button color="secondary" variant="contained" type="button" onClick={handleOpen}>
        Tree
      </Button>
      <Dialog open={open} onClose={handleClose} scroll="paper" fullWidth maxWidth="md">
        <DialogTitle>
          <Typography>Tags</Typography>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 10,
              top: 10,
            }}
          >
            <CheckIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>{children}</DialogContent>
      </Dialog>
    </span>
  )
}

export const getParentTagIds = (tagsMap: Map<number, Tag>, tagId: number): Set<number> => {
  const parentIds: Set<number> = new Set()
  let parentId = tagsMap.get(tagId)?.parentId
  while (parentId) {
    parentIds.add(parentId)
    parentId = tagsMap.get(parentId)?.parentId
  }
  return parentIds
}

export const getChildTagIds = (tagsMap: Map<number, Tag>, tagId: number): Set<number> => {
  const childIds: Set<number> = new Set()
  const tag = tagsMap.get(tagId)
  const remainingTags: Tag[] = tag ? [tag] : []
  while (remainingTags.length) {
    const remainingTag = remainingTags.pop()!
    childIds.add(remainingTag.id)
    for (const tag of tagsMap.values()) {
      if (tag.parentId === remainingTag.id) {
        remainingTags.push(tag)
      }
    }
  }
  childIds.delete(tagId)
  return childIds
}

interface TagsSelectProps {
  tagIds: Set<number>
  onSelectOperation: (v: SelectOperation) => void
}

export const TagsTreeSelection = ({ tagIds, onSelectOperation }: TagsSelectProps) => {
  const [tagsTrees] = useQuery(getTagsTrees, null)
  const [tagsMap] = useQuery(getTagsMap, null)

  const CustomTreeItem = (props: TreeItemProps) => (
    <TreeItem ContentComponent={CustomContent} {...props} />
  )

  const renderTree = (node: TagNode) => (
    <CustomTreeItem key={node.id} nodeId={node.id.toString()} label={node.name}>
      {node.children.length ? node.children.map((child) => renderTree(child)) : null}
    </CustomTreeItem>
  )

  const CustomContent = React.forwardRef(function CustomContent(props: TreeItemContentProps, ref) {
    const { classes, className, label, nodeId, icon: iconProp, expansionIcon, displayIcon } = props
    const { disabled, expanded, selected, handleExpansion, handleSelection } = useTreeItem(nodeId)
    const icon = iconProp || expansionIcon || displayIcon

    const handleExpansionClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      handleExpansion(event)
    }

    return (
      <div
        className={clsx(className, classes.root, {
          [classes.expanded]: expanded,
          [classes.disabled]: disabled,
        })}
        ref={ref as React.Ref<HTMLDivElement>}
      >
        <div onClick={handleExpansionClick} className={classes.iconContainer}>
          {icon}
        </div>
        <Box ml={1}>
          <FormControlLabel
            label={label}
            control={<Checkbox checked={selected} onChange={handleSelection} color="secondary" />}
          />
        </Box>
      </div>
    )
  })

  return (
    <Box>
      {tagsTrees.map((tagsTree, i) => (
        <TreeView
          key={i}
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpanded={Array.from(tagsMap.values()).map((tag) => tag.id.toString())}
          defaultExpandIcon={<ChevronRightIcon />}
          selected={Array.from(tagIds).map((tagId) => tagId.toString())}
          multiSelect
          onNodeSelect={(event, nodeIds) => {
            if (nodeIds.length === 1) {
              const tagId = parseInt(nodeIds[0]!)
              if (tagIds.has(tagId)) {
                onSelectOperation({ tagId, operation: "deselect" })
              } else {
                onSelectOperation({ tagId, operation: "select" })
              }
            }
          }}
        >
          {renderTree(tagsTree)}
        </TreeView>
      ))}
    </Box>
  )
}

const TagsAutocomplete = ({ tagIds, onSelectOperation }: TagsSelectProps) => {
  const [tagsMap] = useQuery(getTagsMap, null)
  const options: AutocompleteOption[] = Array.from(tagsMap.values()).map((tag) => {
    return { id: tag.id, label: tag.name }
  })
  const optionMap = new Map(options.map((option) => [option.id, option]))

  return (
    <Autocomplete
      sx={{ flex: 1, mr: 1 }}
      multiple
      options={options}
      value={Array.from(tagIds.values()).map((id) => optionMap.get(id))}
      renderInput={(params) => {
        return <TextField {...params} label="Tags" color="secondary" />
      }}
      isOptionEqualToValue={(option, value) => {
        return option?.id === value?.id
      }}
      onChange={(_event, values) => {
        if (Array.isArray(values)) {
          const newTagIds = new Set(values.map((entry) => entry?.id))
          newTagIds.delete(undefined)

          if (difference(tagIds, newTagIds).size === 1) {
            onSelectOperation({
              tagId: Array.from(difference(tagIds, newTagIds))[0]!,
              operation: "deselect",
            })
          }
          if (difference(newTagIds, tagIds).size === 1) {
            onSelectOperation({
              tagId: Array.from(difference(newTagIds, tagIds))[0]!,
              operation: "select",
            })
          }
        }
      }}
    />
  )
}

interface SelectOperation {
  tagId: number
  operation: "select" | "deselect"
}

const TagsSelection = ({
  tagIds,
  setTagIds,
  cascade,
}: {
  tagIds: Set<number>
  setTagIds: (v: Set<number>) => void
  cascade: boolean
}) => {
  const [tagsMap] = useQuery(getTagsMap, null)

  const onSelectOperation = ({ tagId, operation }: SelectOperation) => {
    const newTagIds = new Set(tagIds.values())
    if (operation === "deselect") {
      newTagIds.delete(tagId)
      if (cascade) {
        const childTagIds = getChildTagIds(tagsMap, tagId)
        childTagIds.forEach((childTagId) => newTagIds.delete(childTagId))
      }
    } else {
      newTagIds.add(tagId)
      if (cascade) {
        const parentTagIds = getParentTagIds(tagsMap, tagId)
        parentTagIds.forEach((parentTagId) => newTagIds.add(parentTagId))
      }
    }
    setTagIds(newTagIds)
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
      <TagsAutocomplete tagIds={tagIds} onSelectOperation={onSelectOperation} />
      <ScrollDialog>
        <TagsTreeSelection tagIds={tagIds} onSelectOperation={onSelectOperation} />
      </ScrollDialog>
    </Box>
  )
}

export default TagsSelection
