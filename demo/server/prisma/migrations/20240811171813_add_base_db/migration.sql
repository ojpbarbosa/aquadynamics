-- CreateEnum
CREATE TYPE "ControllerStatus" AS ENUM ('unknown', 'booting', 'idling', 'logging', 'restarting', 'crashed');

-- CreateTable
CREATE TABLE "aquariums" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "registeredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "aquariums_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "controllers" (
    "id" TEXT NOT NULL,
    "aquariumId" TEXT NOT NULL,
    "status" "ControllerStatus" NOT NULL,
    "registeredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "controllers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "logs" (
    "id" TEXT NOT NULL,
    "aquariumId" TEXT NOT NULL,
    "controllerId" TEXT NOT NULL,
    "temperature" DOUBLE PRECISION NOT NULL,
    "ph" DOUBLE PRECISION NOT NULL,
    "lightning" BOOLEAN NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "aquariums_name_key" ON "aquariums"("name");

-- CreateIndex
CREATE UNIQUE INDEX "controllers_aquariumId_key" ON "controllers"("aquariumId");

-- CreateIndex
CREATE INDEX "logs_aquariumId_idx" ON "logs"("aquariumId");

-- CreateIndex
CREATE INDEX "logs_controllerId_idx" ON "logs"("controllerId");

-- AddForeignKey
ALTER TABLE "controllers" ADD CONSTRAINT "controllers_aquariumId_fkey" FOREIGN KEY ("aquariumId") REFERENCES "aquariums"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "logs" ADD CONSTRAINT "logs_aquariumId_fkey" FOREIGN KEY ("aquariumId") REFERENCES "aquariums"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "logs" ADD CONSTRAINT "logs_controllerId_fkey" FOREIGN KEY ("controllerId") REFERENCES "controllers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
