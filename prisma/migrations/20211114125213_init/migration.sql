-- CreateTable
CREATE TABLE "Player" (
    "id" BIGSERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "UpdatedAt" TIMESTAMP(3) NOT NULL,
    "Deleted" BOOLEAN NOT NULL,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Topic" (
    "id" BIGSERIAL NOT NULL,
    "topicName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "UpdatedAt" TIMESTAMP(3) NOT NULL,
    "Deleted" BOOLEAN NOT NULL,

    CONSTRAINT "Topic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Article" (
    "id" BIGINT NOT NULL,
    "link" TEXT NOT NULL,

    CONSTRAINT "Article_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayersTopics" (
    "playerId" BIGINT NOT NULL,
    "topicId" BIGINT NOT NULL,
    "points" INTEGER NOT NULL,
    "addAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlayersTopics_pkey" PRIMARY KEY ("playerId","topicId")
);

-- CreateTable
CREATE TABLE "PlayersArticles" (
    "playerId" BIGINT NOT NULL,
    "articleId" BIGINT NOT NULL,
    "read" BOOLEAN NOT NULL,
    "readAt" TIMESTAMP(3),

    CONSTRAINT "PlayersArticles_pkey" PRIMARY KEY ("playerId","articleId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Player_username_key" ON "Player"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Player_email_key" ON "Player"("email");

-- AddForeignKey
ALTER TABLE "PlayersTopics" ADD CONSTRAINT "PlayersTopics_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayersTopics" ADD CONSTRAINT "PlayersTopics_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayersArticles" ADD CONSTRAINT "PlayersArticles_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayersArticles" ADD CONSTRAINT "PlayersArticles_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
