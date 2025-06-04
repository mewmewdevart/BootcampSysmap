import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

import { SUCCESS_USER_REGISTERED, SUCCESS_SEED_COMPLETED } from '@constants/successMessages';
import { ERROR_USER_ALREADY_EXISTS, ERROR_SEED_FAILED } from '@constants/errorMessages';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  console.log('Iniciando o processo de população de dados no banco de dados...');

  const adminEmail = 'example@example.com';
  const existingUser = await prisma.users.findUnique({
    where: { email: adminEmail },
  });

  let adminUser;
  if (!existingUser) {
    const hashedPassword = await bcrypt.hash('password123', 10);
    adminUser = await prisma.users.create({
      data: {
        name: 'Example',
        email: adminEmail,
        cpf: '12345678901',
        password: hashedPassword,
        avatar: '/resources/user-default.jpg',
        xp: 0,
        level: 1,
      },
    });
    console.log(SUCCESS_USER_REGISTERED);
  } else {
    adminUser = existingUser;
    console.log(ERROR_USER_ALREADY_EXISTS);
  }

  const achievementData = [
    { name: 'Primeiro Check-in', criterion: 'Realizar o primeiro check-in em uma atividade.' },
    { name: 'Criador Inicial', criterion: 'Criar sua primeira atividade.' },
    { name: 'Atuação Consistente', criterion: 'Confirmar presença em 5 atividades.' }
  ];

  for (const achData of achievementData) {
    const existingAchievement = await prisma.achievements.findFirst({
      where: { name: achData.name },
    });
    if (!existingAchievement) {
      await prisma.achievements.create({ data: achData });
      console.log(`Achievement "${achData.name}" criada.`);
    } else {
      console.log(`Achievement "${achData.name}" já existe.`);
    }
  }

  const firstCheckinAchievement = await prisma.achievements.findFirst({
    where: { name: 'Primeiro Check-in' },
  });
  if (firstCheckinAchievement) {
    const userAchievement = await prisma.userAchievements.findUnique({
      where: {
        achievementId_userId: {
          achievementId: firstCheckinAchievement.id,
          userId: adminUser.id,
        },
      },
    });
    if (!userAchievement) {
      await prisma.userAchievements.create({
        data: {
          userId: adminUser.id,
          achievementId: firstCheckinAchievement.id,
        },
      });
      console.log(`Achievement "${firstCheckinAchievement.name}" atribuída ao admin.`);
    } else {
      console.log(`Achievement "${firstCheckinAchievement.name}" já atribuída ao admin.`);
    }
  }

  console.log(SUCCESS_SEED_COMPLETED);
}

main()
  .catch((e) => {
    console.error(ERROR_SEED_FAILED, e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
