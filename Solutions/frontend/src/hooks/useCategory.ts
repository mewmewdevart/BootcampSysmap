import { useState } from 'react';
import { v4 as uuidv4 } from "uuid";

const useCategory = () => {
    const [categories] = useState([
        { 
            name: "Yoga", 
            pathImage: "https://wallpapers.com/images/featured/roxo-liso-5b82hc3u20ocqa4x.jpg",
            activities: [
                { id: uuidv4(), image: "https://wallpapers.com/images/featured/roxo-liso-5b82hc3u20ocqa4x.jpg", name: "Exercises with Morning Yoga", date: "2023-10-01", participants: 10 },
                { id: uuidv4(), image: "https://wallpapers.com/images/featured/roxo-liso-5b82hc3u20ocqa4x.jpg", name: "Exercises with Evening Yoga", date: "2023-10-02", participants: 15 },
                { id: uuidv4(), image: "https://wallpapers.com/images/featured/roxo-liso-5b82hc3u20ocqa4x.jpg", name: "Exercises with Evening Yoga", date: "2023-10-02", participants: 3 },
                { id: uuidv4(), image: "https://wallpapers.com/images/featured/roxo-liso-5b82hc3u20ocqa4x.jpg", name: "Exercises with Evening Yoga", date: "2023-10-02", participants: 5 },
                { id: uuidv4(), image: "https://wallpapers.com/images/featured/roxo-liso-5b82hc3u20ocqa4x.jpg", name: "Exercises with Evening Yoga", date: "2023-10-02", participants: 18 },
                { id: uuidv4(), image: "https://wallpapers.com/images/featured/roxo-liso-5b82hc3u20ocqa4x.jpg", name: "Exercises with Evening Yoga", date: "2023-10-02", participants: 3 },
                { id: uuidv4(), image: "https://wallpapers.com/images/featured/roxo-liso-5b82hc3u20ocqa4x.jpg", name: "Exercises with Evening Yoga", date: "2023-10-02", participants: 5 },
                { id: uuidv4(), image: "https://wallpapers.com/images/featured/roxo-liso-5b82hc3u20ocqa4x.jpg", name: "Exercises with Evening Yoga", date: "2023-10-02", participants: 18 },
                { id: uuidv4(), image: "https://wallpapers.com/images/featured/roxo-liso-5b82hc3u20ocqa4x.jpg", name: "Exercises with Evening Yoga", date: "2023-10-02", participants: 18 },
                { id: uuidv4(), image: "https://wallpapers.com/images/featured/roxo-liso-5b82hc3u20ocqa4x.jpg", name: "Exercises with Evening Yoga", date: "2023-10-02", participants: 3 },
                { id: uuidv4(), image: "https://wallpapers.com/images/featured/roxo-liso-5b82hc3u20ocqa4x.jpg", name: "Exercises with Evening Yoga", date: "2023-10-02", participants: 5 },
                { id: uuidv4(), image: "https://wallpapers.com/images/featured/roxo-liso-5b82hc3u20ocqa4x.jpg", name: "Exercises with Evening Yoga", date: "2023-10-02", participants: 18 }
            ]
        },
        { 
            name: "Volei", 
            pathImage: "https://wallpapers.com/images/featured/roxo-liso-5b82hc3u20ocqa4x.jpg",
            activities: [
                { id: uuidv4(), image: "https://wallpapers.com/images/featured/roxo-liso-5b82hc3u20ocqa4x.jpg", name: "Exercises with Beach Volleyball", date: "2023-10-03", participants: 8 },
                { id: uuidv4(), image: "https://wallpapers.com/images/featured/roxo-liso-5b82hc3u20ocqa4x.jpg", name: "Exercises with Indoor Volleyball", date: "2023-10-04", participants: 12 },
                { id: uuidv4(), image: "https://wallpapers.com/images/featured/roxo-liso-5b82hc3u20ocqa4x.jpg", name: "Exercises with Evening Volleyball", date: "2023-10-02", participants: 3 },
                { id: uuidv4(), image: "https://wallpapers.com/images/featured/roxo-liso-5b82hc3u20ocqa4x.jpg", name: "Exercises with Evening Volleyball", date: "2023-10-02", participants: 5 },
                { id: uuidv4(), image: "https://wallpapers.com/images/featured/roxo-liso-5b82hc3u20ocqa4x.jpg", name: "Exercises with Evening Volleyball", date: "2023-10-02", participants: 18 },
                { id: uuidv4(), image: "https://wallpapers.com/images/featured/roxo-liso-5b82hc3u20ocqa4x.jpg", name: "Exercises with Evening Volleyball", date: "2023-10-02", participants: 3 },
                { id: uuidv4(), image: "https://wallpapers.com/images/featured/roxo-liso-5b82hc3u20ocqa4x.jpg", name: "Exercises with Evening Volleyball", date: "2023-10-02", participants: 5 },
                { id: uuidv4(), image: "https://wallpapers.com/images/featured/roxo-liso-5b82hc3u20ocqa4x.jpg", name: "Exercises with Evening Volleyball", date: "2023-10-02", participants: 18 }
            ]
        },
        { 
            name: "Natação", 
            pathImage: "https://wallpapers.com/images/featured/roxo-liso-5b82hc3u20ocqa4x.jpg",
            activities: [
                { id: uuidv4(), image: "https://wallpapers.com/images/featured/roxo-liso-5b82hc3u20ocqa4x.jpg", name: "Exercises with Freestyle Swimming", date: "2023-10-05", participants: 6 },
                { id: uuidv4(), image: "https://wallpapers.com/images/featured/roxo-liso-5b82hc3u20ocqa4x.jpg", name: "Exercises with Butterfly Swimming", date: "2023-10-06", participants: 5 },
                { id: uuidv4(), image: "https://wallpapers.com/images/featured/roxo-liso-5b82hc3u20ocqa4x.jpg", name: "Exercises with Evening Swimming", date: "2023-10-02", participants: 3 },
                { id: uuidv4(), image: "https://wallpapers.com/images/featured/roxo-liso-5b82hc3u20ocqa4x.jpg", name: "Exercises with Evening Swimming", date: "2023-10-02", participants: 5 },
                { id: uuidv4(), image: "https://wallpapers.com/images/featured/roxo-liso-5b82hc3u20ocqa4x.jpg", name: "Exercises with Evening Swimming", date: "2023-10-02", participants: 18 },
                { id: uuidv4(), image: "https://wallpapers.com/images/featured/roxo-liso-5b82hc3u20ocqa4x.jpg", name: "Exercises with Evening Swimming", date: "2023-10-02", participants: 3 },
                { id: uuidv4(), image: "https://wallpapers.com/images/featured/roxo-liso-5b82hc3u20ocqa4x.jpg", name: "Exercises with Evening Swimming", date: "2023-10-02", participants: 5 },
                { id: uuidv4(), image: "https://wallpapers.com/images/featured/roxo-liso-5b82hc3u20ocqa4x.jpg", name: "Exercises with Evening Swimming", date: "2023-10-02", participants: 18 }
            ]
        },
        { 
            name: "Capoeira", 
            pathImage: "https://wallpapers.com/images/featured/roxo-liso-5b82hc3u20ocqa4x.jpg",
            activities: [
                { id: uuidv4(), image: "https://wallpapers.com/images/featured/roxo-liso-5b82hc3u20ocqa4x.jpg", name: "Exercises with Basic Capoeira", date: "2023-10-07", participants: 20 },
                { id: uuidv4(), image: "https://wallpapers.com/images/featured/roxo-liso-5b82hc3u20ocqa4x.jpg", name: "Exercises with Advanced Capoeira", date: "2023-10-08", participants: 10 },
                { id: uuidv4(), image: "https://wallpapers.com/images/featured/roxo-liso-5b82hc3u20ocqa4x.jpg", name: "Exercises with Evening Capoeira", date: "2023-10-02", participants: 3 },
                { id: uuidv4(), image: "https://wallpapers.com/images/featured/roxo-liso-5b82hc3u20ocqa4x.jpg", name: "Exercises with Evening Capoeira", date: "2023-10-02", participants: 5 },
                { id: uuidv4(), image: "https://wallpapers.com/images/featured/roxo-liso-5b82hc3u20ocqa4x.jpg", name: "Exercises with Evening Capoeira", date: "2023-10-02", participants: 18 },
                { id: uuidv4(), image: "https://wallpapers.com/images/featured/roxo-liso-5b82hc3u20ocqa4x.jpg", name: "Exercises with Evening Capoeira", date: "2023-10-02", participants: 3 },
                { id: uuidv4(), image: "https://wallpapers.com/images/featured/roxo-liso-5b82hc3u20ocqa4x.jpg", name: "Exercises with Evening Capoeira", date: "2023-10-02", participants: 5 },
                { id: uuidv4(), image: "https://wallpapers.com/images/featured/roxo-liso-5b82hc3u20ocqa4x.jpg", name: "Exercises with Evening Capoeira", date: "2023-10-02", participants: 18 }
            ]
        },
        { 
            name: "Skate", 
            pathImage: "https://wallpapers.com/images/featured/roxo-liso-5b82hc3u20ocqa4x.jpg",
            activities: [
                { id: uuidv4(), image: "https://wallpapers.com/images/featured/roxo-liso-5b82hc3u20ocqa4x.jpg", name: "Exercises with Street Skating", date: "2023-10-09", participants: 12 },
                { id: uuidv4(), image: "https://wallpapers.com/images/featured/roxo-liso-5b82hc3u20ocqa4x.jpg", name: "Exercises with Park Skating", date: "2023-10-10", participants: 8 },
                { id: uuidv4(), image: "https://wallpapers.com/images/featured/roxo-liso-5b82hc3u20ocqa4x.jpg", name: "Exercises with Evening Skating", date: "2023-10-02", participants: 3 },
                { id: uuidv4(), image: "https://wallpapers.com/images/featured/roxo-liso-5b82hc3u20ocqa4x.jpg", name: "Exercises with Evening Skating", date: "2023-10-02", participants: 5 },
                { id: uuidv4(), image: "https://wallpapers.com/images/featured/roxo-liso-5b82hc3u20ocqa4x.jpg", name: "Exercises with Evening Skating", date: "2023-10-02", participants: 18 },
                { id: uuidv4(), image: "https://wallpapers.com/images/featured/roxo-liso-5b82hc3u20ocqa4x.jpg", name: "Exercises with Evening Skating", date: "2023-10-02", participants: 3 },
                { id: uuidv4(), image: "https://wallpapers.com/images/featured/roxo-liso-5b82hc3u20ocqa4x.jpg", name: "Exercises with Evening Skating", date: "2023-10-02", participants: 5 },
                { id: uuidv4(), image: "https://wallpapers.com/images/featured/roxo-liso-5b82hc3u20ocqa4x.jpg", name: "Exercises with Evening Skating", date: "2023-10-02", participants: 18 }
            ]
        },
        { 
            name: "Corrida", 
            pathImage: "https://wallpapers.com/images/featured/roxo-liso-5b82hc3u20ocqa4x.jpg",
            activities: [
                { id: uuidv4(), image: "https://wallpapers.com/images/featured/roxo-liso-5b82hc3u20ocqa4x.jpg", name: "Exercises with 5K Run", date: "2023-10-11", participants: 50 },
                { id: uuidv4(), image: "https://wallpapers.com/images/featured/roxo-liso-5b82hc3u20ocqa4x.jpg", name: "Exercises with Marathon", date: "2023-10-12", participants: 100 },
                { id: uuidv4(), image: "https://wallpapers.com/images/featured/roxo-liso-5b82hc3u20ocqa4x.jpg", name: "Exercises with Evening Marathon", date: "2023-10-02", participants: 3 },
                { id: uuidv4(), image: "https://wallpapers.com/images/featured/roxo-liso-5b82hc3u20ocqa4x.jpg", name: "Exercises with Evening Marathon", date: "2023-10-02", participants: 5 },
                { id: uuidv4(), image: "https://wallpapers.com/images/featured/roxo-liso-5b82hc3u20ocqa4x.jpg", name: "Exercises with Evening Marathon", date: "2023-10-02", participants: 18 },
                { id: uuidv4(), image: "https://wallpapers.com/images/featured/roxo-liso-5b82hc3u20ocqa4x.jpg", name: "Exercises with Evening Marathon", date: "2023-10-02", participants: 3 },
                { id: uuidv4(), image: "https://wallpapers.com/images/featured/roxo-liso-5b82hc3u20ocqa4x.jpg", name: "Exercises with Evening Marathon", date: "2023-10-02", participants: 5 },
                { id: uuidv4(), image: "https://wallpapers.com/images/featured/roxo-liso-5b82hc3u20ocqa4x.jpg", name: "Exercises with Evening Marathon da Larissa", date: "2023-10-02", participants: 39 }
            ]
        }
    ]);

    const cardIconsTypesOfActivity = categories.map(category => ({
        id: uuidv4(),
        nameActivity: category.name,
        pathImage: category.pathImage
    }));

    return { categories, cardIconsTypesOfActivity };
};

export default useCategory;
