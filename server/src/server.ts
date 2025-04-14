import http from "http";
import mongoose from "mongoose";
import process from "process";
import app from "./app";
import config from "./app/config";

/** We'll store our server and io references so we can export them. */
let server: http.Server;

/**
 * Connect to MongoDB
 */
async function connectToDatabase(): Promise<void> {
  try {
    await mongoose.connect(config.db_url as string);
    console.log("🛢️  Database connected successfully");
  } catch (error) {
    console.error("Failed to connect to database:", error);
    process.exit(1);
  }
}

/**
 * Perform graceful shutdown of the HTTP server
 */
function gracefulShutdown(signal: string): void {
  console.log(`Received ${signal}. Closing server...`);

  if (server) {
    server.close(() => {
      console.log("Server closed gracefully");
      // Exit cleanly
      process.exit(0);
    });
  } else {
    // If the server is somehow not set, just exit
    process.exit(0);
  }
}

/**
 * Main bootstrap function
 */
async function bootstrap(): Promise<void> {
  try {
    await connectToDatabase();

    server = http.createServer(app);

    // 5. Start the server listening
    server.listen(config.port, () => {
      console.log(`🚀 Application is running on port ${config.port}`);
    });

    // 6. Handle process signals for graceful shutdown
    process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
    process.on("SIGINT", () => gracefulShutdown("SIGINT"));

    // 7. Handle uncaught exceptions and unhandled rejections
    process.on("uncaughtException", (error) => {
      console.error("Uncaught Exception:", error);
      gracefulShutdown("uncaughtException");
    });
    process.on("unhandledRejection", (reason) => {
      console.error("Unhandled Rejection:", reason);
      gracefulShutdown("unhandledRejection");
    });
  } catch (error) {
    console.error("Error during bootstrap:", error);
    process.exit(1);
  }
}

// Start the application
bootstrap();
