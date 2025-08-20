import express from "express";
import "dotenv/config";
import * as Sentry from "@sentry/node";

import usersRouter from './routes/users.js';
import reviewsRouter from './routes/reviews.js';
import propertiesRouter from './routes/properties.js';
import hostsRouter from './routes/hosts.js';
import bookingsRouter from './routes/bookings.js';
import loginRouter from './routes/login.js';
import log from './middleware/logMiddleware.js'
import errorHandler from './middleware/errorHandler.js';

const app = express();

app.get("/", (req, res) => {
  res.send("Hello world!");
});

// Sentry
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({
      tracing: true,
    }),
    // enable Express.js middleware tracing
    new Sentry.Integrations.Express({
      app,
    }),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!,
});

// Trace incoming requests
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

// global middleware
app.use(express.json());
app.use(log);

// resource routes
app.use("/users", usersRouter);
app.use("/reviews", reviewsRouter);
app.use("/properties", propertiesRouter);
app.use("/hosts", hostsRouter);
app.use("/bookings", bookingsRouter);

// login
app.use("/login", loginRouter);

// error handeling
app.use(errorHandler);


app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
