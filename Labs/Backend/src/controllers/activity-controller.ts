import { Router, Express } from "express";
import { create, getAll, getById } from "../repository/activity-repository";
import {
  createRelations,
  getActivitiesByUserId,
} from "../repository/user-activity-repository";
import authGuard from "../middlewares/auth-guard";

const activityController = (server: Express) => {
  const router = Router();
  router.use(authGuard);

  router.get("/", async (request, response) => {
    const activities = await getAll();
    response.status(200).send(activities);
  });

  router.get("/:id", async (request, response) => {
    const activityId = request.params.id;
    const activity = await getById(activityId);

    response.status(200).send(activity);
  });

  router.get("/user/:userId", async (request, response) => {
    const userId = request.params.userId;
    const activities = await getActivitiesByUserId(userId);
    const mappedActivities = activities.map(({ activity }) => activity);

    response.status(200).send(mappedActivities);
  });

  router.post("/new", async (request, response) => {
    const { title, description, userIds } = request.body;
    const activity = await create({ title, description });
    const relations = userIds.map((userId: string) => ({
      activityId: activity.id,
      userId,
    }));

    await createRelations(relations);
    response.status(201).send(activity);
  });

  server.use("/activities", router);
};

export default activityController;