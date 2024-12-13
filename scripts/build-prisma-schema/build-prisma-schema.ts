import fs from 'fs/promises'
import path from 'path'

import {
  PRISMA_SCHEMA_REGEX,
  PRISMA_GENERATED_FILENAME,
  PRISMA_FOLDER_NAME
} from './build-prisma-schema.const'
import { isDirExists } from './build-prisma-schema.utils'

export default class PrismaSchemaBuilder {
  private _schema = ''

  constructor() {
    this.addSchemaGenerator()
  }

  public get raw() {
    return this._schema
  }

  public appendSchema(schemaData: string) {
    this._schema += schemaData
  }

  public nextLine() {
    this._schema += '\n'
  }

  public static isValidFileExt(filepath: string) {
    return PRISMA_SCHEMA_REGEX.test(filepath)
  }

  public async generateTypes() {
    const schemasDir = path.resolve(process.cwd(), PRISMA_FOLDER_NAME)
    const schemaFilePath = path.resolve(schemasDir, PRISMA_GENERATED_FILENAME)

    try {
      const isExists = await isDirExists(schemasDir)

      if (!isExists) return

      await fs.writeFile(schemaFilePath, this._schema, {
        encoding: 'utf8',
        flag: 'w'
      })
    } catch (error) {
      await fs.rm(schemaFilePath, { force: true })
      throw error
    }
  }

  private addSchemaGenerator() {
    this._schema += `
datasource db {
	provider = "postgresql"
	url = env("DB_URL")
	directUrl = env("DB_DIRECT_URL")
}

generator client {
	provider = \"prisma-client-js\"
}
`
  }
}
