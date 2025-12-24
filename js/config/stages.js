export const stages = [
    {
        cols: 16,
        rows: 7,
        time: 180,
        foodImg: "תמונות/food/הורדה (7).gif",
        backgroundImage: `url("תמונות/רקעים/zxc.png")`,
        minFoodToPass: 20,
        pipePositions: [
            // { position: 10, type: 'pipe-horizontal' },
            // { position: 11, type: 'pipe-horizontal' },
            // { position: 12, type: 'pipe-horizontal' },
            // { position: 28, type: 'pipe-vertical' },
            // { position: 44, type: 'pipe-vertical' },
            // { position: 60, type: 'pipe-up-right' },
            // { position: 61, type: 'pipe-horizontal' },
            // { position: 62, type: 'pipe-horizontal' },
            // { position: 63, type: 'pipe-horizontal' }
        ]
    },
    {
        cols: 16,
        rows: 7,
        color: 'rgb(245, 15, 180)',
        time: 300,
        foodImg: "תמונות/food/lovepik-cream-chocolate-png-image_401144726_wh300-removebg-preview.png",
        backgroundImage: `url("תמונות/רקעים/תמונה.JPG")`,
        minFoodToPass: 12,
        pipePositions: [
            { position: 21, type: 'pipe-horizontal' },
            { position: 22, type: 'pipe-horizontal' },
            { position: 23, type: 'pipe-horizontal' },
            { position: 24, type: 'pipe-down-left' },
            { position: 40, type: 'pipe-vertical' },
            { position: 56, type: 'pipe-vertical' },
            { position: 72, type: 'pipe-up-left' },
            { position: 71, type: 'pipe-horizontal' },
            { position: 70, type: 'pipe-cross' },
            { position: 69, type: 'pipe-horizontal' },
            { position: 68, type: 'pipe-up-right' },
            { position: 13, type: 'pipe-horizontal' },

            { position: 36, type: 'pipe-vertical' },
            { position: 52, type: 'pipe-vertical' },

            { position: 20, type: 'pipe-down-right' },  // פניה אנכי → אופקי
        ]
    },
    {
        cols: 16,
        rows: 7,
        color: 'yellow',
        time: 250,
        foodImg: "תמונות/food/an-illustration-of-a-fish-swimming-underwater-vector-made-in_671408_wh860-removebg-preview.png",
        backgroundImage: `url("תמונות/רקעים/3.jpg")`,
        minFoodToPass: 14,
        pipePositions: [
            { position: 20, type: 'pipe-horizontal' },
            { position: 21, type: 'pipe-horizontal' },
            { position: 22, type: 'pipe-horizontal' },

            { position: 38, type: 'pipe-vertical' },
            { position: 54, type: 'pipe-vertical' },

            { position: 70, type: 'pipe-down-right' },
            { position: 71, type: 'pipe-horizontal' },
            { position: 72, type: 'pipe-horizontal' },
            { position: 73, type: 'pipe-horizontal' }
        ]
    },
    {
        cols: 16,
        rows: 7,
        color: 'rgb(86, 39, 12)',
        time: 200,
        foodImg: "תמונות/food/יתרונות-באכילת-תפוח1-removebg-preview.png",
        backgroundPosition: "center",
        backgroundImage: `url("תמונות/רקעים/2617.jpg_wh860.jpg")`,
        stonePositions: [80, 81, 82],
        minFoodToPass: 16,
        pipePositions: [
            { position: 5, type: 'pipe-horizontal' },
            { position: 6, type: 'pipe-horizontal' },
            { position: 7, type: 'pipe-horizontal' },

            { position: 23, type: 'pipe-vertical' },
            { position: 39, type: 'pipe-vertical' },

            { position: 55, type: 'pipe-down-right' },
            { position: 56, type: 'pipe-horizontal' },
            { position: 57, type: 'pipe-horizontal' },
            { position: 58, type: 'pipe-horizontal' }
        ]
    },
    {
        cols: 16,
        rows: 7,
        time: 150,
        foodImg: "תמונות/food/הורדה (7).gif",
        backgroundImage: `url("תמונות/רקעים/הורדה (1).gif")`,
        stonePositions: [100, 101],
        minFoodToPass: 18,
        pipePositions: [
            { position: 12, type: 'pipe-horizontal' },
            { position: 13, type: 'pipe-horizontal' },
            { position: 14, type: 'pipe-horizontal' },

            { position: 30, type: 'pipe-vertical' },
            { position: 46, type: 'pipe-vertical' },

            { position: 62, type: 'pipe-down-right' },
            { position: 63, type: 'pipe-horizontal' },
            { position: 64, type: 'pipe-horizontal' },
            { position: 65, type: 'pipe-horizontal' }
        ]
    },
];





export const stageIndex = (JSON.parse(localStorage.getItem('stage')) || 1) - 1;
export const gameSettings = stages[stageIndex];
export const numberOfStages = stages.length - 1;
