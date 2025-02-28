import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const location = searchParams.get("location");

    if (!location) {
        return NextResponse.json({ error: "Location is required" }, { status: 400 });
    }

    // Load API key from env variables
    const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
    if (!apiKey) {
        console.error("🚨 Missing API Key! Check your .env.local file.");
        return NextResponse.json({ error: "API Key is missing" }, { status: 500 });
    }

    // Construct the API URL
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
    console.log(`🔗 Fetching from: ${url}`);

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
            console.error("❌ OpenWeatherMap API Error:", data);
            return NextResponse.json({ error: "Failed to fetch weather data", details: data }, { status: response.status });
        }

        console.log("✅ Weather Data:", data);
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error("❌ Fetch error:", error);
        return NextResponse.json({ error: "Error fetching weather data" }, { status: 500 });
    }
}
