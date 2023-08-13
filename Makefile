webhook:
	ngrok.exe http 3000

migrate:
	yarn prisma db push

studio:
	yarn prisma studio

init:
	yarn && yarn dev
