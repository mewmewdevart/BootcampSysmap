-- CreateTable
CREATE TABLE "Users" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "avatar" TEXT NOT NULL DEFAULT '/resources/user-default.jpg',
    "xp" INTEGER NOT NULL DEFAULT 0,
    "level" INTEGER NOT NULL DEFAULT 1,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Preferences" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "typeId" UUID NOT NULL,

    CONSTRAINT "Preferences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Achievements" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "criterion" TEXT NOT NULL,

    CONSTRAINT "Achievements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserAchievements" (
    "id" UUID NOT NULL,
    "achievementId" UUID NOT NULL,
    "userId" UUID NOT NULL,

    CONSTRAINT "UserAchievements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Activities" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "confirmationCode" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "scheduledDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "private" BOOLEAN NOT NULL,
    "type" UUID NOT NULL,
    "creatorId" UUID NOT NULL,

    CONSTRAINT "Activities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActivityAddresses" (
    "id" UUID NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "activityId" UUID NOT NULL,

    CONSTRAINT "ActivityAddresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActivityParticipants" (
    "id" UUID NOT NULL,
    "approved" BOOLEAN NOT NULL,
    "confirmedAt" TIMESTAMP(3),
    "activityId" UUID NOT NULL,
    "userId" UUID NOT NULL,

    CONSTRAINT "ActivityParticipants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActivityTypes" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "ActivityTypes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Users_cpf_key" ON "Users"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Preferences_userId_typeId_key" ON "Preferences"("userId", "typeId");

-- CreateIndex
CREATE UNIQUE INDEX "UserAchievements_achievementId_userId_key" ON "UserAchievements"("achievementId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "ActivityAddresses_activityId_key" ON "ActivityAddresses"("activityId");

-- CreateIndex
CREATE UNIQUE INDEX "ActivityParticipants_activityId_userId_key" ON "ActivityParticipants"("activityId", "userId");

-- AddForeignKey
ALTER TABLE "Preferences" ADD CONSTRAINT "Preferences_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "ActivityTypes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Preferences" ADD CONSTRAINT "Preferences_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAchievements" ADD CONSTRAINT "UserAchievements_achievementId_fkey" FOREIGN KEY ("achievementId") REFERENCES "Achievements"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAchievements" ADD CONSTRAINT "UserAchievements_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activities" ADD CONSTRAINT "Activities_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activities" ADD CONSTRAINT "Activities_type_fkey" FOREIGN KEY ("type") REFERENCES "ActivityTypes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityAddresses" ADD CONSTRAINT "ActivityAddresses_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityParticipants" ADD CONSTRAINT "ActivityParticipants_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityParticipants" ADD CONSTRAINT "ActivityParticipants_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
