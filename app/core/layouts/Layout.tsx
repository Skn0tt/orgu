import { ReactNode } from "react"
import { Head, Link, useMutation, useSession, useRouter } from "blitz"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Toolbar from "@mui/material/Toolbar"
import { styled } from "@mui/material/styles"
import logoutMutation from "app/auth/mutations/logout"
import { Suspense } from "react"
import CircularProgress from "@mui/material/CircularProgress"

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

export const authenticationRequired = process.env.BLITZ_PUBLIC_AUTHENTICATION_REQUIRED === "true"

const Navbar = () => {
  const [logout] = useMutation(logoutMutation)
  const session = useSession({ suspense: false })
  const router = useRouter()
  return (
    <AppBar position="static" id="main-menu" color="primary">
      <Toolbar>
        <Box mr="auto" style={{ flex: 1 }}>
          <Link href="/" passHref>
            <Button color="inherit">Home</Button>
          </Link>
        </Box>
        {(!authenticationRequired || session.role === "ADMIN") && (
          <Box>
            <Link href="/questions" passHref>
              <Button color="inherit">Questions</Button>
            </Link>
            <Link href="/persons" passHref>
              <Button color="inherit">People</Button>
            </Link>
          </Box>
        )}
        {authenticationRequired &&
          !session.isLoading &&
          (!session.userId ? (
            <a href="/api/auth/github">
              <Button color="inherit" sx={{ color: "white" }}>
                Login
              </Button>
            </a>
          ) : (
            <Button
              color="inherit"
              onClick={async () => {
                await logout()
                router.push("/")
              }}
            >
              Logout
            </Button>
          ))}
      </Toolbar>
    </AppBar>
  )
}

const Layout = ({
  title,
  children,
  isHome = false,
}: {
  title?: string
  isHome?: boolean
  children: ReactNode
}) => {
  const session = useSession({ suspense: false })

  return (
    <>
      <Head>
        <title>{title || "Orgu"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <MainContainer>
        <Suspense fallback={<CircularProgress />}>
          {isHome || !authenticationRequired || session.role === "ADMIN" ? (
            children
          ) : (
            <Box>You are not authenticated or authorized to access this page.</Box>
          )}
        </Suspense>
      </MainContainer>
    </>
  )
}

export default Layout
