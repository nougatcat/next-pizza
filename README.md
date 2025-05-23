### Краткое описание
Сделал фуллстек-сайт по [гайду из интернета](https://www.youtube.com/watch?v=GUwizGbY4cc). До этого я писал верстку, фронтенд на React+Redux и небольшое бэкенд-приложение на Express.js. Данный проект объединяет и дополняет концепции, которые я изучал на предыдущих этапах, а также дает представление о библиотеке Next.js и её окружению, и о подключении базы данных к сайту с помощью Prisma. 
### Причина делать эту работу
Понять, как сделать фуллстек-приложение с базой данных. Это было нужно, чтобы делать мои собственные проекты, которые я концептуализировал, но не мог реализовать.


This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Запуск

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
# update db - выполнять после каждого изменения схемы
npm run prisma:push
# prisma studio
npm run prisma:studio
# prisma generate | postinstall - обновить типизацию без обновления бд (вместо пуш)
npm run prisma:generate
# prisma seed - для тестовых данных
npm run prisma:seed
# localtunnel для ответов с юкассы
lt --port 3000
```
Figma-дизайн: https://www.figma.com/design/cYz4fOSK74EJoqHxoNr1hT/Next-Pizza

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
