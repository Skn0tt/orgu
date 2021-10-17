import { ReactNode } from "react"
import { Head, Link } from "blitz"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Toolbar from "@mui/material/Toolbar"
import { styled } from "@mui/material/styles"

const MainContainer = styled("main")(({ theme }) => ({
  padding: theme.spacing(1),
  margin: "auto",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
  [theme.breakpoints.up("md")]: {
    width: "75%",
  },
  [theme.breakpoints.up("lg")]: {
    width: "60%",
  },
}))

const Navbar = () => {
  return (
    <AppBar position="static" id="main-menu" color="primary">
      <Toolbar>
        <Box mr="auto" style={{ flex: 1 }}>
          <Link href="/" passHref>
            <Button color="inherit">Home</Button>
          </Link>
        </Box>
        <Link href="/questions" passHref>
          <Button color="inherit">Questions</Button>
        </Link>
        <Link href="/persons" passHref>
          <Button color="inherit">People</Button>
        </Link>
        <Link href="/tags" passHref>
          <Button color="inherit">Tags</Button>
        </Link>
      </Toolbar>
    </AppBar>
  )
}

type LayoutProps = {
  title?: string
  children: ReactNode
}

const Layout = ({ title, children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title || "Orgu"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <MainContainer>{children}</MainContainer>
    </>
  )
}

export default Layout
