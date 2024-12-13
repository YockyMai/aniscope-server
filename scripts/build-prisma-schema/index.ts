import fs from 'fs/promises'
import path from 'path'

import PrismaSchemaBuilder from './build-prisma-schema'
import {
  PRISMA_FOLDER_NAME,
  PRISMA_GENERATED_FILENAME
} from './build-prisma-schema.const'
import { isDirExists } from './build-prisma-schema.utils'

async function run() {
  try {
    const prismaFolder = path.resolve(process.cwd(), PRISMA_FOLDER_NAME)
    const isPrismaFolderExists = await isDirExists(prismaFolder)

    if (!isPrismaFolderExists) {
      throw new Error('Prisma folder does not exists')
    }

    const folders = await fs.readdir(prismaFolder, { withFileTypes: true })
    const schemaFiles = folders.filter((folder) => {
      return (
        PrismaSchemaBuilder.isValidFileExt(folder.name) &&
        folder.name !== PRISMA_GENERATED_FILENAME
      )
    })

    if (!schemaFiles.length) {
      throw new Error('There is no schema files')
    }

    const builder = new PrismaSchemaBuilder()

    for (const schemaFile of schemaFiles) {
      const schemaPath = path.resolve(prismaFolder, schemaFile.name)
      const schemaData = await fs.readFile(schemaPath, { encoding: 'utf8' })

      builder.appendSchema(schemaData)
      builder.nextLine()
    }

    await builder.generateTypes()
  } catch (error) {
    console.error(error)
  }
}

run()
