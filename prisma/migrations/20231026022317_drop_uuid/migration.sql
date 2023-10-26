/*
  Warnings:

  - You are about to drop the column `uuid` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `uuid` on the `users` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "users.uuid_unique";

-- DropIndex
DROP INDEX "posts.uuid_unique";

-- AlterTable
ALTER TABLE "posts" DROP COLUMN "uuid";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "uuid";
