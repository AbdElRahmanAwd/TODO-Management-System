import "dotenv/config";
import { app } from "../src/app";
import { AppDataSource } from "../src/config/data-source";

let initPromise: Promise<void> | null = null;

export default async function handler(req: any, res: any) {
  if (!AppDataSource.isInitialized) {
    if (!initPromise) {
      initPromise = AppDataSource.initialize().then(() => {
        console.log("Data Source initialized (Vercel)");
      });
    }
    await initPromise;
  }

  return app(req, res);
}
