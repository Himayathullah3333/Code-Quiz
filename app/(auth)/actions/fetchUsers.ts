"use server"
import {prisma} from "@/lib/prisma"
import { currentUser } from "@clerk/nextjs"

export const fetchUsers = async () => {
  try {
    const clerkUser = await currentUser()
    
    if (!clerkUser) {
      throw new Error("No authenticated user found")
    }

    let mongoUser = await prisma.user.findUnique({
      where: {
        clerkUserId: clerkUser.id
      }
    })

    if (!mongoUser) {
      let username = clerkUser.username
      if (!username) {
        username = `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim()
      }
      if (!username) {
        username = clerkUser.emailAddresses[0]?.emailAddress?.split('@')[0] || 'User'
      }

      const newUser = {
        clerkUserId: clerkUser.id,
        username,
        email: clerkUser.emailAddresses[0]?.emailAddress || '',
        profilePic: clerkUser.imageUrl || ''
      }
      
      mongoUser = await prisma.user.create({
        data: newUser
      })
    }

    const quizResults = await prisma.quizResult.findMany({
      where: {
        userId: mongoUser.id
      }
    })

    return {
      data: {
        user: mongoUser,
        quizResults
      }
    }
  } catch (error) {
    console.error("fetchUsers error:", error)
    throw new Error("Failed to fetch user data")
  }
}