import { env } from "./config/env";
import { connectDB } from "./config/db";
import { logger } from "./utils/logger";
import app from "./app";

async function bootstrap() {
  const server = app.listen(env.PORT, () => {
    logger.info(`Server running on port ${env.PORT} [${env.NODE_ENV}]`);
    logger.info(`API: http://localhost:${env.PORT}/api/v1`);
  });

  await connectDB().catch((err) => {
    logger.error("Could not connect to MongoDB, server will continue without DB:", err.message);
  });

  // Graceful shutdown
  const shutdown = (signal: string) => {
    logger.warn(`${signal} received — shutting down gracefully`);
    server.close(() => {
      logger.info("HTTP server closed");
      process.exit(0);
    });
    // Force exit if not closed in 10s
    setTimeout(() => {
      logger.error("Forced shutdown after timeout");
      process.exit(1);
    }, 10_000);
  };

  process.on("SIGTERM", () => shutdown("SIGTERM"));
  process.on("SIGINT",  () => shutdown("SIGINT"));

  process.on("unhandledRejection", (reason) => {
    logger.error("Unhandled rejection:", reason);
    shutdown("unhandledRejection");
  });

  process.on("uncaughtException", (err) => {
    logger.error("Uncaught exception:", err);
    shutdown("uncaughtException");
  });
}

bootstrap();
