import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { prismaClient } from "../server";
import { HealthcareProvider, Patient } from "@prisma/client";

interface CustomRequest extends Request {
  user?: Patient | HealthcareProvider;
}

const providerAuthMiddleware = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  console.log("Here", req.params);
  const token = req.cookies.token; // Retrieve the token from cookies

  // If no token, respond with an error
  if (!token) {
    return res.status(401).json({
      error: "Please authenticate using a valid token",
    });
  }

  try {
    const payload = jwt.verify(
      token,
      process.env.PROVIDER_JWT_SECRET as string
    ) as any;
    const user = await prismaClient.healthcareProvider.findFirst({
      where: { id: payload.userId },
    });

    if (!user) {
      return res.status(401).json({
        error: "Please authenticate using a valid token",
      });
    }

    // Reset the token expiry by issuing a new token
    const newToken = jwt.sign(
      { userId: user.id },
      process.env.PROVIDER_JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    // Set the new token in the cookie
    res.cookie("token", newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    req.user = user;
    console.log(req.params);
    next();
  } catch (error) {
    // Return error with status code
    res.status(401).json({
      error: "Token verification failed",
    });
  }
};

export default providerAuthMiddleware;
