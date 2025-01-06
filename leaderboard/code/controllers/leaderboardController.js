
const db = require('../config/db');

// Fetch top 50 users by saved money
const getTop50Users = async (req, res) => {
    try {
        // const users = await db('users')
        //     .select('username', 'savedMoney')
        //     .orderBy('savedMoney', 'desc')
        //     .limit(50);

        const users = await db('users')
        .select('username')
        .limit(50);


        res.status(200).json({
            success: true,
            data: users,
        });
    } catch (error) {
        console.error('Error fetching leaderboard data:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch leaderboard data.',
            error: error.message, // Agrega el mensaje del error para depuración
        });
    }
};

module.exports = { getTop50Users };
