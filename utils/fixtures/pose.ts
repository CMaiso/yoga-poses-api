import {Pose, PoseFromDatabase} from "../../types/Pose";

export const poseDataFromDatabaseFixture: PoseFromDatabase =
    {
        "id": "7d192604-e58a-468a-b697-683fba03b32b",
        "english_name": "Mountain Pose",
        "sanskrit_name": "Tadasana",
        "level": "Beginner",
        "description": "Stand tall with feet together, shoulders relaxed, weight evenly distributed through your soles, arms at sides.",
        "categoryId": "490a5e9c-31a9-4159-a4a5-ee4b6e168ef3",
        "category": {
            "id": "490a5e9c-31a9-4159-a4a5-ee4b6e168ef3",
            "name": "Standing",
            "description": "The Standing category is a type of asana where the practitioner maintains an upright position, balancing on their feet. This category of postures plays an essential role in yoga sequences, often serving as the starting point for most practices. Ranging from simple to complex, Standing poses encompass a wide array of postures. Physically, they improve strength, stability, and posture. Mentally, they aid in fostering concentration and mindfulness. Moreover, the act of grounding through the feet in these poses, coupled with reaching or opening the upper body, establishes a profound sense of connection to the earth and space"
        },
        "styles": [
            {
                "styleId": "16a4d332-cf11-48ab-a07c-7f7218466dca",
                "poseId": "7d192604-e58a-468a-b697-683fba03b32b",
                "style": {
                    "id": "16a4d332-cf11-48ab-a07c-7f7218466dca",
                    "name": "Vinyasa",
                    "description": "A dynamic and fluid style of yoga where movements are synchronized with breath. It's a series of poses that flow smoothly into one another, creating a dance-like sequence. Often used to build heat and increase flexibility."
                }
            },
            {
                "styleId": "aba0d9cd-9f0f-4fb6-86d8-fdad3ca283d1",
                "poseId": "7d192604-e58a-468a-b697-683fba03b32b",
                "style": {
                    "id": "aba0d9cd-9f0f-4fb6-86d8-fdad3ca283d1",
                    "name": "Hatha",
                    "description": "A traditional form of yoga focusing on physical postures and breath control. It is often slow-paced, with emphasis on mastering the pose and aligning the body properly. Suitable for beginners."
                }
            }
        ]
    }

export const poseFixture: Pose = {
    "id": "7d192604-e58a-468a-b697-683fba03b32b",
    "english_name": "Mountain Pose",
    "sanskrit_name": "Tadasana",
    "level": "Beginner",
    "description": "Stand tall with feet together, shoulders relaxed, weight evenly distributed through your soles, arms at sides.",
    "category": "Standing",
    "styles": [
        {
            "id": "16a4d332-cf11-48ab-a07c-7f7218466dca",
            "name": "Vinyasa",
            "description": "A dynamic and fluid style of yoga where movements are synchronized with breath. It's a series of poses that flow smoothly into one another, creating a dance-like sequence. Often used to build heat and increase flexibility."
        },
        {
            "id": "aba0d9cd-9f0f-4fb6-86d8-fdad3ca283d1",
            "name": "Hatha",
            "description": "A traditional form of yoga focusing on physical postures and breath control. It is often slow-paced, with emphasis on mastering the pose and aligning the body properly. Suitable for beginners."
        }
    ]
}