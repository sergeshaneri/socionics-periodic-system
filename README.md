<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Socionics Periodic System

Визуализация фрактальных моделей соционики по исследованиям Семёна Чурюмова: Квадрат Чурюмова и Проективная Модель.

## Локальный запуск

```bash
npm install
npm run dev
```

## Деплой на GitHub Pages

### Автоматический (рекомендуется)

При пуше в `main` ветку сайт автоматически деплоится через GitHub Actions.

URL: `https://<username>.github.io/socionics-periodic-system/`

### Ручной деплой

```bash
npm install
npm run build
npx gh-pages -d dist
```

Или через deploy-скрипт:

```bash
npm run deploy
```

### Настройка репозитория

1. В репозитории: **Settings → Pages → Build and deployment**
2. Выбрать **GitHub Actions** вместо Deploy from a branch
3. При пуше в main проект автоматически соберётся и задеплоится
