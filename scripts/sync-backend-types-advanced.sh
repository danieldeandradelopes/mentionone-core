#!/bin/bash

# Script avançado para sincronização de tipos do backend
# Uso: ./sync-backend-types-advanced.sh [branch] [--force] [--clean]

# Configurações
REPO_URL="git@github.com:danieldeandradelopes/mentionone-api.git"
SPARSE_FOLDER_ENTITIES="src/entities"
SPARSE_FOLDER_TYPES="src/types"
TARGET_DIR="./src/@backend-types"
TEMP_DIR=".temp_backend_entities"

# Variáveis de controle
BRANCH="main"
FORCE=false
CLEAN=false

# Função para mostrar ajuda
show_help() {
    echo "Uso: $0 [opções] [branch]"
    echo ""
    echo "Opções:"
    echo "  -h, --help     Mostra esta ajuda"
    echo "  -f, --force    Força a sincronização mesmo se houver erros"
    echo "  -c, --clean    Limpa completamente a pasta de tipos antes de sincronizar"
    echo ""
    echo "Exemplos:"
    echo "  $0                    # Sincroniza da branch main"
    echo "  $0 develop            # Sincroniza da branch develop"
    echo "  $0 feature/new-types  # Sincroniza da branch feature/new-types"
    echo "  $0 --force develop    # Força sincronização da branch develop"
    echo "  $0 --clean main       # Limpa e sincroniza da branch main"
}

# Processa argumentos
while [[ $# -gt 0 ]]; do
    case $1 in
        -h|--help)
            show_help
            exit 0
            ;;
        -f|--force)
            FORCE=true
            shift
            ;;
        -c|--clean)
            CLEAN=true
            shift
            ;;
        -*)
            echo "❌ Opção desconhecida: $1"
            show_help
            exit 1
            ;;
        *)
            BRANCH="$1"
            shift
            ;;
    esac
done

echo "🔄 Sincronizando tipos do backend da branch: $BRANCH"
if [ "$FORCE" = true ]; then
    echo "⚠️  Modo force ativado"
fi
if [ "$CLEAN" = true ]; then
    echo "🧹 Modo clean ativado"
fi

# 1. Limpeza inicial
if [ "$CLEAN" = true ]; then
    echo "🧹 Limpando pasta de tipos existente..."
    rm -rf "$TARGET_DIR"
fi

rm -rf "$TEMP_DIR"

# 2. Clona repositório com sparse-checkout na branch especificada
echo "📥 Clonando repositório da branch '$BRANCH'..."
git clone --depth 1 --filter=blob:none --sparse --branch "$BRANCH" "$REPO_URL" "$TEMP_DIR"

# Verifica se o clone foi bem-sucedido
if [ $? -ne 0 ]; then
    echo "❌ Erro ao clonar a branch '$BRANCH'. Verifique se a branch existe."
    if [ "$FORCE" = true ]; then
        echo "⚠️  Continuando em modo force..."
    else
        exit 1
    fi
fi

cd "$TEMP_DIR"
git sparse-checkout set "$SPARSE_FOLDER_ENTITIES" "$SPARSE_FOLDER_TYPES"

# 3. Copia arquivos para o frontend
cd ..
mkdir -p "$TARGET_DIR"

# Contadores para estatísticas
ENTITIES_COUNT=0
TYPES_COUNT=0

# Copia entities (ignorando pasta express)
if [ -d "$TEMP_DIR/$SPARSE_FOLDER_ENTITIES" ]; then
    echo "📁 Copiando entities..."
    ENTITIES_COUNT=$(find "$TEMP_DIR/$SPARSE_FOLDER_ENTITIES" -type f -not -path "*/express/*" | wc -l)
    find "$TEMP_DIR/$SPARSE_FOLDER_ENTITIES" -type f -not -path "*/express/*" -exec cp {} "$TARGET_DIR/" \;
    echo "✅ $ENTITIES_COUNT arquivos de entities copiados"
else
    echo "⚠️  Pasta entities não encontrada na branch $BRANCH"
fi

# Copia types (ignorando pasta express)
if [ -d "$TEMP_DIR/$SPARSE_FOLDER_TYPES" ]; then
    echo "📁 Copiando types..."
    TYPES_COUNT=$(find "$TEMP_DIR/$SPARSE_FOLDER_TYPES" -type f -not -path "*/express/*" | wc -l)
    find "$TEMP_DIR/$SPARSE_FOLDER_TYPES" -type f -not -path "*/express/*" -exec cp {} "$TARGET_DIR/" \;
    echo "✅ $TYPES_COUNT arquivos de types copiados"
else
    echo "⚠️  Pasta types não encontrada na branch $BRANCH"
fi

# 4. Limpeza
rm -rf "$TEMP_DIR"

# 5. Estatísticas finais
TOTAL_FILES=$((ENTITIES_COUNT + TYPES_COUNT))
echo ""
echo "📊 Resumo da sincronização:"
echo "   Branch: $BRANCH"
echo "   Entities: $ENTITIES_COUNT arquivos"
echo "   Types: $TYPES_COUNT arquivos"
echo "   Total: $TOTAL_FILES arquivos"
echo "   Destino: $TARGET_DIR"
echo ""
echo "✅ Tipos sincronizados com sucesso da branch '$BRANCH'!" 