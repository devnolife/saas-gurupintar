import { ApolloServer } from "@apollo/server"
import { startServerAndCreateNextHandler } from "@as-integrations/next"
import { typeDefs } from "@/lib/api/graphql/schema"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

// Create Apollo Server
const server = new ApolloServer({
  typeDefs,
})

const handler = startServerAndCreateNextHandler(server, {
  context: async (req) => {
    // Get the user session for authentication
    const session = await getServerSession(authOptions)

    return {
      session,
      req,
    }
  },
})

export { handler as GET, handler as POST }

