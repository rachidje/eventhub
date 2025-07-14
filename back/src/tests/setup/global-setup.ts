import { execSync } from "child_process";
import { getDatabaseUrl, startDocker } from "./docker-manager";
import fs from "fs";

const setup = async () => {
    await startDocker();
    const url = getDatabaseUrl();
    console.log("Database URL:", url);

    fs.writeFileSync(".env.test", `DATABASE_URL=${url}\n`);

    const prismaEnv = {
        ...process.env,
        DATABASE_URL: url, // ← injecté explicitement pour Prisma
    };

    // Synchroniser le schéma dans la base (db push = sans historique, pour tests)
    try {
        execSync("npx prisma generate", {
            stdio: "inherit",
            env: prismaEnv,
        });

        execSync("npx prisma db push --force-reset", {
            stdio: "inherit",
            env: prismaEnv,
        });
    } catch (err) {
        console.error("Erreur Prisma", err);
        throw err;
    }
}

export default setup;