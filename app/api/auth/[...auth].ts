import { passportAuth, PublicData, VerifyCallbackResult } from "blitz"
import db from "db"
import { Strategy as GitHubStrategy } from "passport-github2"
import { Role } from "types"

function assert(condition: any, message: string): asserts condition {
  if (!condition) throw new Error(message)
}

assert(process.env.GITHUB_CLIENT_ID, "You must provide the GITHUB_CLIENT_ID env variable")
assert(process.env.GITHUB_CLIENT_SECRET, "You must provide the GITHUB_CLIENT_SECRET env variable")

export default passportAuth({
  successRedirectUrl: "/",
  errorRedirectUrl: "/questions",
  strategies: [
    {
      strategy: new GitHubStrategy(
        {
          clientID: process.env.GITHUB_CLIENT_ID as string,
          clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
          callbackURL: process.env.BASE_URL + "/api/auth/github/callback",
        },
        async (
          _token: string,
          _tokenSecret: string,
          profile: any,
          done: (err: Error | null, data?: { publicData: PublicData }) => void
        ) => {
          const email = profile.emails && profile.emails[0]?.value

          if (!email) {
            return done(new Error("GitHub OAuth response doesn't have email."))
          }

          const user = await db.user.upsert({
            where: { email },
            create: {
              email,
              name: profile.displayName,
            },
            update: { email },
          })

          const publicData = {
            userId: user.id,
            role: user.role as Role,
            source: "github",
            githubUsername: profile.username as string,
          }
          done(null, { publicData } as VerifyCallbackResult)
        }
      ),
    },
  ],
})
