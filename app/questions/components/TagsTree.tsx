import React, { useState } from "react"
import TreeView from "@mui/lab/TreeView"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import Box from "@mui/material/Box"
import { IconButton, TextField, Typography } from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"
import CheckIcon from "@mui/icons-material/Check"
import TreeItem, { TreeItemProps, useTreeItem, TreeItemContentProps } from "@mui/lab/TreeItem"
import clsx from "clsx"
import { TagNode } from "../types"
import getTagsTree from "../queries/getTagsTree"
import { useQuery } from "blitz"
import getTagsArray from "../queries/getTagsArray"

export const updateName = (node: TagNode, id: number, updatedName: string): void => {
  if (node.id === id) {
    node.name = updatedName
    return
  }
  for (const child of node.children) {
    updateName(child, id, updatedName)
  }
}

export default function TagNodesTree() {
  const [tagsTree] = useQuery(getTagsTree, null)
  const [tagsArray] = useQuery(getTagsArray, null)
  const [tree, setTree] = useState<TagNode>(tagsTree)

  const CustomTreeItem = (props: TreeItemProps) => (
    <TreeItem ContentComponent={CustomContent} {...props} />
  )

  const renderTree = (node: TagNode, tree: TagNode, setTree: (v: TagNode) => void) => (
    <CustomTreeItem key={node.id} nodeId={node.id.toString()} label={node.name}>
      {node.children.length ? node.children.map((child) => renderTree(child, tree, setTree)) : null}
    </CustomTreeItem>
  )

  const CustomContent = React.forwardRef(function CustomContent(props: TreeItemContentProps, ref) {
    const { classes, className, label, nodeId, icon: iconProp, expansionIcon, displayIcon } = props
    const { disabled, expanded, selected, focused, handleExpansion } = useTreeItem(nodeId)
    const icon = iconProp || expansionIcon || displayIcon

    const handleExpansionClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      handleExpansion(event)
    }

    const [inUpdateMode, setInUpdateMode] = useState<boolean>(false)
    const [updatedName, setUpdatedName] = useState<string>(label as string)

    return (
      <div
        className={clsx(className, classes.root, {
          [classes.expanded]: expanded,
          [classes.selected]: selected,
          [classes.focused]: focused,
          [classes.disabled]: disabled,
        })}
        ref={ref as React.Ref<HTMLDivElement>}
      >
        <div onClick={handleExpansionClick} className={classes.iconContainer}>
          {icon}
        </div>
        <Box>
          {inUpdateMode ? (
            <Box>
              <TextField value={updatedName} onChange={(e) => setUpdatedName(e.target.value)} />
              <IconButton
                onClick={() => {
                  const treeClone = JSON.parse(JSON.stringify(tree)) // clone object in js :D - see https://stackoverflow.com/questions/122102
                  updateName(treeClone, parseInt(nodeId), updatedName)
                  setTree(treeClone)
                  setInUpdateMode(false)
                }}
              >
                <CheckIcon />
              </IconButton>
            </Box>
          ) : (
            <Typography>
              {label}
              {/* <IconButton
                onClick={() => {
                  setInUpdateMode(true)
                }}
              >
                <EditIcon />
              </IconButton> */}
            </Typography>
          )}
        </Box>
      </div>
    )
  })

  return (
    <TreeView
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpanded={["0", ...tagsArray.map((tag) => tag.id.toString())]}
      defaultExpandIcon={<ChevronRightIcon />}
      disableSelection
    >
      {renderTree(tree, tree, setTree)}
    </TreeView>
  )
}
