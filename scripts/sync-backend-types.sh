#!/bin/bash

# Configurações
REPO_URL="git@github.com:danieldeandradelopes/mentionone-api.git"
SPARSE_FOLDER_ENTITIES="src/entities"
SPARSE_FOLDER_TYPES="src/types"
TARGET_DIR="./src/@backend-types"
TEMP_DIR=".temp_backend_entities"

# Verifica se foi passada uma branch
BRANCH=${1:-"main"}

echo "🔄 Sincronizando tipos do backend da branch: $BRANCH"

# 1. Limpa temporário
rm -rf $TEMP_DIR

# 2. Clona repositório com sparse-checkout na branch especificada
git clone --depth 1 --filter=blob:none --sparse --branch "$BRANCH" "$REPO_URL" $TEMP_DIR

# Verifica se o clone foi bem-sucedido
if [ $? -ne 0 ]; then
    echo "❌ Erro ao clonar a branch '$BRANCH'. Verifique se a branch existe."
    exit 1
fi

cd $TEMP_DIR
git sparse-checkout set "$SPARSE_FOLDER_ENTITIES" "$SPARSE_FOLDER_TYPES"

# 3. Copia arquivos para o frontend
cd ..
rm -rf $TARGET_DIR
mkdir -p $TARGET_DIR

# Copia entities (ignorando pasta express)
if [ -d "$TEMP_DIR/$SPARSE_FOLDER_ENTITIES" ]; then
  find $TEMP_DIR/$SPARSE_FOLDER_ENTITIES -type f -not -path "*/express/*" -exec cp {} $TARGET_DIR/ \;
  echo "📁 Entities copiadas com sucesso"
else
  echo "⚠️  Pasta entities não encontrada na branch $BRANCH"
fi

# Copia types (ignorando pasta express)
if [ -d "$TEMP_DIR/$SPARSE_FOLDER_TYPES" ]; then
  find $TEMP_DIR/$SPARSE_FOLDER_TYPES -type f -not -path "*/express/*" -exec cp {} $TARGET_DIR/ \;
  echo "📁 Types copiados com sucesso"
else
  echo "⚠️  Pasta types não encontrada na branch $BRANCH"
fi

# 4. Limpeza
rm -rf $TEMP_DIR

echo "✅ Tipos sincronizados da branch '$BRANCH' de $REPO_URL/$SPARSE_FOLDER_ENTITIES e $SPARSE_FOLDER_TYPES para $TARGET_DIR"