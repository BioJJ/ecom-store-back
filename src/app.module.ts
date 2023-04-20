import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ProductsModule } from './products/products.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'
import { join } from 'path'

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: '.env'
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
		})
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
