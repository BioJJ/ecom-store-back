import { Module } from '@nestjs/common'
import { ProductsService } from './products.service'
import { ProductsController } from './products.controller'
import { Product } from './entities/product.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AwsS3Module } from 'src/aws-s3/aws-s3.module'
import { CategoriesModule } from 'src/categories/categories.module'

@Module({
	imports: [TypeOrmModule.forFeature([Product]), AwsS3Module, CategoriesModule],
	controllers: [ProductsController],
	providers: [ProductsService],
	exports: [ProductsService]
})
export class ProductsModule {}
