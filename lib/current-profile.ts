import { auth } from "@clerk/nextjs/server"

import { db } from "@/lib/db"

export const currentProfile = async () => {

    const authData  = await auth();
    const { userId } = authData

    if(!userId) {
        return null;
    }

    const profile = await db.profile.findUnique({
        where: {
            userId
        }
    })

    return profile
}