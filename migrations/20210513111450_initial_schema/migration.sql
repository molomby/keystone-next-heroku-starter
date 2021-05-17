-- CreateEnum
CREATE TYPE "TaskPriorityEnum" AS ENUM ('low', 'medium', 'high');

-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "label" TEXT,
    "priority" "TaskPriorityEnum",
    "isComplete" BOOLEAN,
    "finishBy" TIMESTAMP(3),
    "assignedTo" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Person" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "password" TEXT,
    "isAdmin" BOOLEAN,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Task.assignedTo_index" ON "Task"("assignedTo");

-- CreateIndex
CREATE UNIQUE INDEX "Person.email_unique" ON "Person"("email");

-- AddForeignKey
ALTER TABLE "Task" ADD FOREIGN KEY ("assignedTo") REFERENCES "Person"("id") ON DELETE SET NULL ON UPDATE CASCADE;
