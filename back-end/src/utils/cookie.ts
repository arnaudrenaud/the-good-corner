import { Response } from "express";
import UserSession from "../entities/userSession";

export function setUserSessionIdInCookie(
  expressResponse: Response,
  session: UserSession
) {
  expressResponse.cookie("userSessionId", session.id, {
    secure: true,
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });
}
