import { Module } from '@nestjs/common'
import { CategoriesService } from './categories.service'
import { CategoriesController } from './categories.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AwsS3Module } from 'src/aws-s3/aws-s3.module'
import { Category } from './entities/category.entity'

@Module({
	imports: [TypeOrmModule.forFeature([Category]), AwsS3Module],
	controllers: [CategoriesController],
	providers: [CategoriesService],
	exports: [CategoriesService]
})
export class CategoriesModule {}
