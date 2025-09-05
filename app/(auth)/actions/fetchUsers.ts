"use server"
import {prisma} from "@/lib/prisma"
import { currentUser } from "@clerk/nextjs"

export const fetchUsers = async () => {
  try {
    const clerkUser = await currentUser()
    
    if (!clerkUser) {
      console.log("No authenticated user found")
      return null
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
      
      try {
        mongoUser = await prisma.user.create({
          data: newUser
        })
      } catch (createError) {
        console.error("Error creating user:", createError)
        throw new Error("Failed to create user")
      }
    }

    const quizResults = await prisma.quizResult.findMany({
      where: {
        userId: mongoUser.id
      },
      orderBy: {
        createdAt: 'desc'
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
    if (error instanceof Error) {
      throw error
    }
    throw new Error("Failed to fetch user data")
  }
}
