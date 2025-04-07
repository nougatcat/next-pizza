
import { getUserSession } from "@/shared/lib/get-user-session"
import { redirect } from "next/navigation"

export default async function ProfilePage() {
    // const {data: session} = useSession();
    // if (!session) {
    //     return redirect('/not-auth')
    // } //! не будет нормально работать, нужно использовать getUserSession (в который прописан getServerSession)

    const session = await getUserSession()
    if (!session) {
        return redirect('/not-auth')
    }

    return <div>это твой профиль</div>
}