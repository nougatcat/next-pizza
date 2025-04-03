//? Эта директория и этот файл написаны по примеру из документации NextAuth

import NextAuth from "next-auth"
import GitHubProvider from "next-auth/providers/github";

const authOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID || '',
            clientSecret: process.env.GITHUB_SECRET || '',
        })
    ],
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }


// export default NextAuth(authOptions) или так или handler