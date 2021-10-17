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

export interface TagNode {
  id: string
  name: string
  children?: TagNode[]
}

export const defaultTree: TagNode = {
  id: "root",
  name: "Parent",
  children: [
    {
      id: "1",
      name: "Child - 1",
    },
    {
      id: "3",
      name: "Child - 3",
      children: [
        {
          id: "4",
          name: "Child - 4",
        },
      ],
    },
  ],
}

export const updateName = (node: TagNode, id: string, updatedName: string): void => {
  if (node.id === id) {
    node.name = updatedName
    return
  }
  if (node.children) {
    for (const child of node.children) {
      updateName(child, id, updatedName)
    }
  }
}

export default function TagNodesTree() {
  const [tree, setTree] = useState<TagNode>(defaultTree)

  const CustomTreeItem = (props: TreeItemProps) => (
    <TreeItem ContentComponent={CustomContent} {...props} />
  )

  const renderTree = (node: TagNode, tree: TagNode, setTree: (v: TagNode) => void) => (
    <CustomTreeItem key={node.id} nodeId={node.id} label={node.name}>
      {Array.isArray(node.children)
        ? node.children.map((child) => renderTree(child, tree, setTree))
        : null}
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
                  updateName(treeClone, nodeId, updatedName)
                  setTree(treeClone)
                  setInUpdateMode(false)
                }}
              >
                <CheckIcon />
              </IconButton>
            </Box>
          ) : (
            <Typography>
              {label}{" "}
              <IconButton
                onClick={() => {
                  setInUpdateMode(true)
                }}
              >
                <EditIcon />
              </IconButton>
            </Typography>
          )}
        </Box>
      </div>
    )
  })

  return (
    <TreeView
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpanded={["root"]}
      defaultExpandIcon={<ChevronRightIcon />}
      disableSelection
    >
      {renderTree(tree, tree, setTree)}
    </TreeView>
  )
}
