// src/tests/setup/load-env.ts
import { config } from "dotenv";
import path from "path";

// Ce fichier charge le fichier .env généré par le global-setup
config({ path: path.resolve(__dirname, "../../../.env.test") });
