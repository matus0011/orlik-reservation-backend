import type { Context } from "hono";
import type { InsertTeam } from "../lib/db/schema.js";
import {
  createTeam as createTeamService,
  getTeams as getTeamsService,
  updateTeam as updateTeamService,
  deleteTeam as deleteTeamService,
} from "../services/teams.js";

export const getTeams = async (c: Context) => {
  try {
    const teams = await getTeamsService();
    return c.json({ success: true, data: teams });
  } catch (error) {
    return c.json({ error: "Failed to get teams" }, 500);
  }
};

export const createTeam = async (c: Context) => {
  try {
    const validatedData = await c.req.json();
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

export const updateTeam = async (c: Context) => {
  try {
    const validatedData = await c.req.json();

    const result = await updateTeamService({
      id: Number(c.req.param("id")),
      ...validatedData,
    });

    return c.json({ success: true, data: result });
  } catch (error) {
    return c.json({ error: "Failed to update team" }, 500);
  }
};

export const deleteTeam = async (c: Context) => {
  try {
    const result = await deleteTeamService(Number(c.req.param("id")));
    return c.json({ success: true, data: result });
  } catch (error) {
    console.error(error);
    return c.json({ error: "Failed to delete team" }, 500);
  }
};
