import type { Context } from "hono";
import type { InsertMembership } from "../lib/db/schema.js";
import {
  createMembership as createMembershipService,
  getMemberships as getMembershipsService,
  getMembership as getMembershipService,
  getMembershipsByUserId as getMembershipsByUserIdService,
  getMembershipsByTeamId as getMembershipsByTeamIdService,
  updateMembership as updateMembershipService,
  deleteMembership as deleteMembershipService,
  deleteMembershipByUserAndTeam as deleteMembershipByUserAndTeamService,
} from "../services/memberships.js";

export const getMemberships = async (c: Context) => {
  try {
    const memberships = await getMembershipsService();
    return c.json({ success: true, data: memberships });
  } catch (error) {
    return c.json({ error: "Failed to get memberships" }, 500);
  }
};

export const getMembership = async (c: Context) => {
  try {
    const membership = await getMembershipService(Number(c.req.param("id")));
    if (!membership) {
      return c.json({ error: "Membership not found" }, 404);
    }
    return c.json({ success: true, data: membership });
  } catch (error) {
    return c.json({ error: "Failed to get membership" }, 500);
  }
};

export const getMembershipsByUserId = async (c: Context) => {
  try {
    const userId = Number(c.req.param("userId"));
    const memberships = await getMembershipsByUserIdService(userId);
    return c.json({ success: true, data: memberships });
  } catch (error) {
    return c.json({ error: "Failed to get memberships by user ID" }, 500);
  }
};

export const getMembershipsByTeamId = async (c: Context) => {
  try {
    const teamId = Number(c.req.param("teamId"));
    const memberships = await getMembershipsByTeamIdService(teamId);
    return c.json({ success: true, data: memberships });
  } catch (error) {
    return c.json({ error: "Failed to get memberships by team ID" }, 500);
  }
};

export const createMembership = async (c: Context) => {
  try {
    const validatedData = await c.req.json();
    const result = await createMembershipService(validatedData);
    return c.json({ success: true, data: result });
  } catch (error) {
    return c.json({ error: "Failed to create membership" }, 500);
  }
};

export const updateMembership = async (c: Context) => {
  try {
    const validatedData = await c.req.json();
    const result = await updateMembershipService({
      id: Number(c.req.param("id")),
      ...validatedData,
    });
    return c.json({ success: true, data: result });
  } catch (error) {
    return c.json({ error: "Failed to update membership" }, 500);
  }
};

export const deleteMembership = async (c: Context) => {
  try {
    const result = await deleteMembershipService(Number(c.req.param("id")));
    return c.json({ success: true, data: result });
  } catch (error) {
    console.error(error);
    return c.json({ error: "Failed to delete membership" }, 500);
  }
};

export const deleteMembershipByUserAndTeam = async (c: Context) => {
  try {
    const userId = Number(c.req.param("userId"));
    const teamId = Number(c.req.param("teamId"));
    const result = await deleteMembershipByUserAndTeamService(userId, teamId);
    return c.json({ success: true, data: result });
  } catch (error) {
    console.error(error);
    return c.json({ error: "Failed to delete membership by user and team" }, 500);
  }
};
