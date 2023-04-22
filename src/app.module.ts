import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ProductsModule } from './products/products.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'
import { join } from 'path'
import { AwsS3Module } from './aws-s3/aws-s3.module'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'
import { APP_GUARD } from '@nestjs/core'
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard'

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
		UsersModule,
		AuthModule
	],
	controllers: [AppController],
	providers: [
		AppService,
		{
			provide: APP_GUARD,
			useClass: JwtAuthGuard
		}
	]
})
export class AppModule {}
