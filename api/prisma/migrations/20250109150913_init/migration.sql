-- CreateTable
CREATE TABLE "tb_cliente" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome_reduzido" TEXT NOT NULL,
    "razao_social" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,
    "versao_sp" TEXT NOT NULL,
    "uf" TEXT NOT NULL,
    "reponsavel_pauta" TEXT NOT NULL,
    "reponsavel_email" TEXT NOT NULL,
    "reponsavel_telefone" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "tb_cliente_codigo_key" ON "tb_cliente"("codigo");
