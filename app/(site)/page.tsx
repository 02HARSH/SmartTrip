import AuthForm from './components/AuthForm';
import Image from 'next/image';

import WeatherWidget from "@/app/components/WeatherWidget";

 // Make sure the path is correct

export default function Home() {
    return (
        <main className="flex flex-col-reverse lg:flex-row min-h-screen">
            {/* Left Column (CTA & Weather Widget) */}
            <div
                className="lg:w-1/2 p-10 flex flex-col justify-center"
                style={{ background: 'linear-gradient(45deg, #00BFFF, #0099CC)' }}
            >
                <h1 className="text-4xl font-bold mb-2 text-center text-white">
                    Welcome to SmartTrip!
                </h1>
                <p className="text-lg my-6 mx-auto text-center text-white">
                    Your Ultimate Travel Companion
                </p>
                <p className="text-sm opacity-90 mx-auto text-center text-white">
                    Join SmartTrip today and enjoy hassle-free travel.
                </p>

                {/* Weather Widget */}
                <div className="mt-6">
                    <WeatherWidget />
                </div>
            </div>

            {/* Right Column (Auth Form) */}
            <div className="lg:w-1/2 bg-gray-100 p-10 flex flex-col justify-center">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <h2 className="mt-6 text-center text-3xl font-bold text-gray-900 tracking-tight">
                        Join SmartTrip Today!
                    </h2>

                    {/* Auth Form */}
                    <AuthForm />
                </div>
            </div>
        </main>
    );
}
