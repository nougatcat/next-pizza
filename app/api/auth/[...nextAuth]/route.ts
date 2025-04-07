import { authOptions } from "@/shared/constants/auth-options"
import NextAuth from "next-auth"


const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
// export default NextAuth(authOptions) //! так нельзя в App Router