import { ArgsType, Field, IntersectionType } from '@nestjs/graphql'
import { PaginationArgs } from 'src/common/dto/pagination.input'

@ArgsType()
class AnimeFilterArgs {
  @Field({ nullable: true })
  sort?: string
}

@ArgsType()
export class AnimesArgs extends IntersectionType(
  PaginationArgs,
  AnimeFilterArgs
) {}
