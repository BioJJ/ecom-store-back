import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ProductsModule } from './products/products.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'
import { join } from 'path'
import { AwsS3Module } from './aws-s3/aws-s3.module'
import { UsersModule } from './users/users.module'

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: '.env',
			isGlobal: true
		}),
		ProductsModule,
		TypeOrmModule.forRoot({
			type: 'mongodb',
			// url: process.env.MONGO_URL,
			// database: process.env.MONGO_DATABASE,
			// username: process.env.MONGO_USERNAME,
			// password: process.env.MONGO_PASSWORD,
			url: process.env.MONGO_CONNECT,
			entities: [join(__dirname, '**/**.entity{.ts,.js}')],
			synchronize: true,
			useNewUrlParser: true,
			logging: true
		}),
		AwsS3Module,
		UsersModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
