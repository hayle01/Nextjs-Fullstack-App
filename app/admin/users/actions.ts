"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export async function getUsers() {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })
    return { success: true, data: users }
  } catch (error) {
    return { success: false, error: "Failed to fetch users" }
  }
}

export async function createUser(data: any) {
  try {
    const { name, email, password, role } = data

    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return { success: false, error: "User already exists" }
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
    })

    revalidatePath("/admin/users")
    return { success: true }
  } catch (error) {
    return { success: false, error: "Failed to create user" }
  }
}

export async function updateUserRole(userId: string, role: string) {
  try {
    await prisma.user.update({
      where: { id: userId },
      data: { role },
    })

    revalidatePath("/admin/users")
    return { success: true }
  } catch (error) {
    return { success: false, error: "Failed to update user role" }
  }
}

export async function deleteUser(userId: string) {
  try {
    await prisma.user.delete({
      where: { id: userId },
    })

    revalidatePath("/admin/users")
    return { success: true }
  } catch (error) {
    return { success: false, error: "Failed to delete user" }
  }
}
