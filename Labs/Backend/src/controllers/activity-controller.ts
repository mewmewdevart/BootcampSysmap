import { Router, Express } from "express";
import { create, getAll, getById } from "../repository/activity-repository";
import { createRelations, getActivitiesByUserId } from "../repository/user-activity-repository";

// 1. Define o controlador de atividade
const activityController = (server: Express) => {
  const router = Router();

  // 2. Rota para obter todas as atividades
  router.get("/", async (request, response) => {
    const activities = await getAll();
    response.status(200).send(activities);
  });

  // 3. Rota para obter uma atividade pelo ID
  router.get("/:id", async (request, response) => {
    const activityId = request.params.id;
    const activity = await getById(activityId);

    response.status(200).send(activity);
  });

  // 4. Rota para obter atividades por ID de usuário
  router.get("/user/:userId", async (request, response) => {
    const userId = request.params.userId;
    const activities = await getActivitiesByUserId(userId);
    const mappedActivities = activities.map(({ activity }) => activity);

    response.status(200).send(mappedActivities);
  });

  // 5. Rota para criar uma nova atividade
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

  // 6. Adiciona o roteador ao servidor na rota /activities
  server.use("/activities", router);
};

// 7. Exporta o controlador de atividade como padrão
export default activityController;
