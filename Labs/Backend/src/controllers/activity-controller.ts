// 1. Importa o Router e o Express do express
import { Router, Express } from "express";

// 2. Importa as funções do repositório de atividade
import { create, getAll, getById } from "../repository/activity-repository";

// 3. Importa as funções do repositório de atividades de usuário
import { createRelations, getActivitiesByUserId } from "../repository/user-activity-repository";

// 4. Define o controlador de atividade
const activityController = (server: Express) => {
  const router = Router();

  // 5. Rota para obter todas as atividades
  router.get("/", async (request, response) => {
    const activities = await getAll();
    response.status(200).send(activities);
  });

  // 6. Rota para obter uma atividade pelo ID
  router.get("/:id", async (request, response) => {
    const activityId = request.params.id;
    const activity = await getById(activityId);

    response.status(200).send(activity);
  });

  // 7. Rota para obter atividades por ID de usuário
  router.get("/user/:userId", async (request, response) => {
    const userId = request.params.userId;
    const activities = await getActivitiesByUserId(userId);
    const mappedActivities = activities.map(({ activity }) => activity);

    response.status(200).send(mappedActivities);
  });

  // 8. Rota para criar uma nova atividade
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

  // 9. Adiciona o roteador ao servidor na rota /activities
  server.use("/activities", router);
};

// 10. Exporta o controlador de atividade como padrão
export default activityController;
