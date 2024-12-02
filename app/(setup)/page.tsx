import { InitialModal } from "@/components/modals/create-server-modal";
import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile"
import { RedirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const SetupPage = async () => {
    
    let profile ;

    try {
        profile = await initialProfile()
    } catch (error) {
        return <RedirectToSignIn />
    }

    const server = await db.server.findFirst({
        where : {
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    })

    if (server) {
        return redirect(`/servers/${server.id}`)
    }
    
    return <InitialModal />
}

export default SetupPage