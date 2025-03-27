import { ApolloServer } from "@apollo/server"
import { startServerAndCreateNextHandler } from "@as-integrations/next"
import { typeDefs } from "@/lib/api/graphql/schema"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

// Create Apollo Server
const server = new ApolloServer({
  typeDefs,
})

// Create handler for Next.js API route
const handler = startServerAndCreateNextHandler(server, {
  context: async (req) => {
    // Get the user session for authentication
    const session = await getServerSession(authOptions)

    // Return context object with session
    return {
      session,
      req,
    }
  },
})

export { handler as GET, handler as POST }

