.PHONY: help up down restart logs logs-frontend logs-backend clean build rebuild dev up-dev down-dev status

# Cores para output
RED := \033[0;31m
GREEN := \033[0;32m
YELLOW := \033[0;33m
BLUE := \033[0;34m
NC := \033[0m # No Color

# Comando padrão
help: ## Mostra esta ajuda
	@echo "$(GREEN)Comandos disponíveis:$(NC)"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  $(BLUE)%-15s$(NC) %s\n", $$1, $$2}'

# Comandos básicos
up: ## Sobe todos os serviços em modo produção
	@echo "$(GREEN)Iniciando ambiente...$(NC)"
	docker-compose up -d
	@echo "$(GREEN)Ambiente iniciado!$(NC)"
	@echo "$(YELLOW)Frontend: http://localhost:3000$(NC)"
	@echo "$(YELLOW)Backend: http://localhost:3001$(NC)"

down: ## Desliga todos os serviços
	@echo "$(RED)Desligando ambiente...$(NC)"
	docker-compose down
	@echo "$(GREEN)Ambiente desligado!$(NC)"

# Comandos de desenvolvimento
up-dev: ## Sobe ambiente em modo desenvolvimento com hot-reload
	@echo "$(GREEN)Iniciando ambiente de desenvolvimento...$(NC)"
	docker-compose -f docker-compose.yml -f docker-compose.override.yml up -d
	@echo "$(GREEN)Ambiente de desenvolvimento iniciado!$(NC)"
	@echo "$(YELLOW)Frontend: http://localhost:3000 (com hot-reload)$(NC)"
	@echo "$(YELLOW)Backend: http://localhost:3001$(NC)"

down-dev: ## Desliga ambiente de desenvolvimento
	@echo "$(RED)Desligando ambiente de desenvolvimento...$(NC)"
	docker-compose -f docker-compose.yml -f docker-compose.override.yml down
	@echo "$(GREEN)Ambiente de desenvolvimento desligado!$(NC)"

# Comandos de build
build: ## Builda as imagens sem subir
	@echo "$(YELLOW)Buildando imagens...$(NC)"
	docker-compose build

rebuild: ## Rebuilda todas as imagens do zero
	@echo "$(YELLOW)Reconstruindo todas as imagens...$(NC)"
	docker-compose down
	docker-compose build --no-cache
	docker-compose up -d
	@echo "$(GREEN)Rebuild completo!$(NC)"

# Logs
logs: ## Mostra logs de todos os serviços
	docker-compose logs -f

logs-frontend: ## Mostra logs do frontend
	docker-compose logs -f frontend

logs-backend: ## Mostra logs do backend
	docker-compose logs -f backend

logs-db: ## Mostra logs do MongoDB
	docker-compose logs -f mongodb

# Status e limpeza
status: ## Mostra status dos containers
	@echo "$(BLUE)Status dos containers:$(NC)"
	docker-compose ps

clean: ## Remove containers, imagens e volumes
	@echo "$(RED)Limpando ambiente...$(NC)"
	docker-compose down -v --remove-orphans
	docker system prune -f
	@echo "$(GREEN)Limpeza concluída!$(NC)"

# Comandos úteis
shell-frontend: ## Acessa shell do container frontend
	docker-compose exec frontend sh

shell-backend: ## Acessa shell do container backend
	docker-compose exec backend sh

restart: ## Reinicia todos os serviços
	docker-compose restart

restart-frontend: ## Reinicia apenas o frontend
	docker-compose restart frontend

restart-backend: ## Reinicia apenas o backend
	docker-compose restart backend