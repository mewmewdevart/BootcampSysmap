import { v4 as uuidv4 } from "uuid";

const generateMockData = (count: number, template: () => object) =>
  Array(count).fill(null).map(template);

export const useMockData = () => {
  const cardsRecommendation = generateMockData(8, () => ({
    id: uuidv4(),
    pathImage: "https://plus.unsplash.com/premium_photo-1701090939615-1794bbac5c06?fm=jpg&q=60&w=3000&i2xlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z3JheSUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D",
    nameActivity: "Exercises with Jumping Rope",
    date: "28/01/2025 08:00",
    participants: 4,
  }));

  const cardIconsTypesOfActivity = generateMockData(8, () => ({
    id: uuidv4(),
    pathImage: "https://vestingh.nl/cdn/shop/products/Emerald_Green_48b5299c-0bff-4061-989b-05b91882f3fe_1800x1800.jpg?v=1664375667",
    nameActivity: "Yoga",
  }));

  const runningActivities = generateMockData(6, () => ({
    id: uuidv4(),
    image: "https://plus.unsplash.com/premium_photo-1701090939615-1794bbac5c06?fm=jpg&q=60&w=3000",
    name: "Exercises with Jumping Rope",
    date: "28/01/2025 08:00",
    participants: 4,
  }));

  const swimmingActivities = [...runningActivities];
  const userActivities = generateMockData(4, () => ({ ...runningActivities[0] }));
  const userActivitiesHistory = generateMockData(20, () => ({ ...runningActivities[0] }));
  const categoryPopular = [...cardsRecommendation];

  return {
    cardsRecommendation,
    cardIconsTypesOfActivity,
    runningActivities,
    swimmingActivities,
    userActivities,
    userActivitiesHistory,
    categoryPopular,
  };
};
