-- CreateTable
CREATE TABLE "tb_config" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "tb_config_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_logrequest" (
    "id" SERIAL NOT NULL,
    "route" TEXT NOT NULL,
    "method" TEXT NOT NULL,
    "body" JSONB NOT NULL,
    "timestamp" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tb_logrequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_user" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "email_confirmation" BOOLEAN NOT NULL DEFAULT false,
    "token_confirmation" TEXT,
    "token_expiration" TIMESTAMP(3),
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "tb_user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "tb_config_key_idx" ON "tb_config"("key");

-- CreateIndex
CREATE INDEX "tb_logrequest_route_idx" ON "tb_logrequest"("route");

-- CreateIndex
CREATE UNIQUE INDEX "tb_user_email_key" ON "tb_user"("email");

-- CreateIndex
CREATE INDEX "tb_user_token_confirmation_idx" ON "tb_user"("token_confirmation");

-- CreateIndex
CREATE INDEX "tb_user_status_idx" ON "tb_user"("status");
