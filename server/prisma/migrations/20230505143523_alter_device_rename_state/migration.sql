/*
  Warnings:

  - You are about to drop the column `state` on the `devices` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_devices" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'disconnected',
    "registeredAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_devices" ("address", "id", "name", "registeredAt", "updatedAt") SELECT "address", "id", "name", "registeredAt", "updatedAt" FROM "devices";
DROP TABLE "devices";
ALTER TABLE "new_devices" RENAME TO "devices";
CREATE UNIQUE INDEX "devices_address_key" ON "devices"("address");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
