#!/bin/sh
set -e

npm install --no-audit
npx prisma generate
npx prisma migrate deploy
echo "✅ Prisma migrations applied"
