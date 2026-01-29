// api/steam.js
// Vercel Serverless Function - Steam API Proxy

export default async function handler(req, res) {
    // 允许CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    // Handle OPTIONS request
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    // 只允许GET请求
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    
    // 从环境变量获取API Key（更安全）
    const STEAM_API_KEY = process.env.STEAM_API_KEY || 'DAEE69AD10C58AB1591E5FBD0ADBE52C';
    const STEAM_ID = process.env.STEAM_ID || '76561198313678147';
    
    // 获取请求的endpoint
    const { endpoint } = req.query;
    
    if (!endpoint) {
        return res.status(400).json({ error: 'Missing endpoint parameter' });
    }
    
    // 构建Steam API URL
    let steamUrl;
    
    switch(endpoint) {
        case 'profile':
            steamUrl = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${STEAM_API_KEY}&steamids=${STEAM_ID}`;
            break;
        case 'level':
            steamUrl = `https://api.steampowered.com/IPlayerService/GetSteamLevel/v1/?key=${STEAM_API_KEY}&steamid=${STEAM_ID}`;
            break;
        case 'games':
            steamUrl = `https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${STEAM_API_KEY}&steamid=${STEAM_ID}&include_appinfo=true&format=json`;
            break;
        case 'recent':
            steamUrl = `https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${STEAM_API_KEY}&steamid=${STEAM_ID}&count=50&format=json`;
            break;
        default:
            return res.status(400).json({ error: 'Invalid endpoint' });
    }
    
    try {
        // 调用Steam API
        const response = await fetch(steamUrl);
        
        if (!response.ok) {
            throw new Error(`Steam API returned ${response.status}`);
        }
        
        const data = await response.json();
        
        // 返回数据
        return res.status(200).json(data);
        
    } catch (error) {
        console.error('Steam API Error:', error);
        return res.status(500).json({ 
            error: 'Failed to fetch from Steam API',
            message: error.message 
        });
    }
}
