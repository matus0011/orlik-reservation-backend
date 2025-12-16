import type { Context } from "hono";
import type { InsertTeam } from "../lib/db/schema.js";
import { createTeam as createTeamService } from "../services/teams.js";

export const getTeams = (c: Context) => {
  //   return c.json([
  //     { id: 1, title: "Konferencja JS" },
  //     { id: 2, title: "Meetup Hono" },
  //   ]);
};

export const deleteTeam = (c: Context) => {
  //   const id = c.req.param("id");
  //   return c.json({ id, title: "Konferencja JS" });
};

export const createTeam = async (c: Context) => {
  try {
    const validatedData = (await c.req.valid("json")) as InsertTeam;
    const getLoggedInUserId = c.get("user")?.id;

    const result = await createTeamService({
      ...validatedData,
      createdBy: Number(getLoggedInUserId),
    });

    return c.json({ success: true, data: result });
  } catch (error) {
    return c.json({ error: "Failed to create team" }, 500);
  }
};

export const updateTeam = (c: Context) => {
  //   const id = c.req.param("id");
  //   const event = c.req.json();
  //   return c.json({ id, ...event });
};
