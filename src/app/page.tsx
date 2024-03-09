'use client'
import React, { useEffect, useRef, useState } from 'react';
import Image from "next/image";
import { Gradient } from './gradient';
// import { ProsodyWidgets } from "../../components/widgets/ProsodyWidgets";
import { ProsodyWidgets } from './widgets/ProsodyWidgets';
// import AudioWidgets from './widgets/AudioWidgets'; // Assuming you export it correctly
import { AudioWidgets } from './widgets/AudioWidgets';
import { AudioPrediction } from './lib/data/audioPrediction';
import { RetellClient } from "retell-sdk";
import { RetellWebClient } from "retell-client-js-sdk";

const retell = new RetellClient({
    apiKey: "aef5783c-6d8f-4d5a-bf2f-d2122f313bd7",
});

const sdk = new RetellWebClient()

const emotionColors = {
    Admiration: [0.85, 0.75, 0.4], // Warm yellow
    Adoration: [0.9, 0.7, 0.5], // Soft orange
    Aesthetic_Appreciation: [0.6, 0.4, 0.7], // Muted purple
    Amusement: [1.0, 0.84, 0.0], // Bright yellow
    Anger: [1.0, 0.0, 0.0], // Red
    Annoyance: [0.9, 0.5, 0.0], // Orange
    Anxiety: [0.5, 0.5, 0.5], // Grey
    Awe: [0.2, 0.6, 1.0], // Sky blue
    Awkwardness: [0.7, 0.6, 0.6], // Dusty pink
    Boredom: [0.5, 0.5, 0.6], // Slate
    Calmness: [0.0, 0.5, 1.0], // Blue
    Concentration: [0.0, 0.65, 0.5], // Teal
    Confusion: [0.6, 0.6, 0.0], // Mustard
    Contemplation: [0.3, 0.3, 0.7], // Indigo
    Contempt: [0.5, 0.0, 0.5], // Purple
    Contentment: [0.3, 0.7, 0.7], // Sea green
    Craving: [0.7, 0.3, 0.0], // Burnt orange
    Desire: [0.8, 0.0, 0.4], // Magenta
    Determination: [0.9, 0.4, 0.2], // Rust
    Disappointment: [0.6, 0.3, 0.3], // Maroon
    Disapproval: [0.4, 0.4, 0.4], // Dark grey
    Disgust: [0.2, 0.5, 0.2], // Olive green
    Distress: [0.3, 0.2, 0.5], // Deep purple
    Doubt: [0.5, 0.4, 0.3], // Taupe
    Ecstasy: [1.0, 0.5, 0.0], // Bright orange
    Embarrassment: [0.8, 0.6, 0.7], // Pale violet
    Empathic_Pain: [0.3, 0.3, 0.3], // Dark grey
    Enthusiasm: [1.0, 0.65, 0.0], // Tangerine
    Entrancement: [0.4, 0.6, 0.8], // Soft blue
    Envy: [0.0, 0.6, 0.0], // Green
    Excitement: [1.0, 0.2, 0.2], // Bright red
    Fear: [0.1, 0.1, 0.1], // Black
    Gratitude: [0.7, 0.8, 0.4], // Light olive
    Guilt: [0.5, 0.25, 0.25], // Brick
    Horror: [0.0, 0.0, 0.0], // Absolute black
    Interest: [0.9, 0.8, 0.2], // Sunflower
    Joy: [1.0, 1.0, 0.0], // Yellow
    Love: [1.0, 0.4, 0.7], // Pink
    Nostalgia: [0.7, 0.5, 0.4], // Sepia
    Pain: [0.8, 0.0, 0.0], // Dark red
    Pride: [0.5, 0.0, 1.0], // Violet
    Realization: [0.8, 0.8, 0.3], // Lemon
    Relief: [0.0, 0.8, 0.6], // Aquamarine
    Romance: [0.9, 0.3, 0.5], // Soft red
    Sadness: [0.0, 0.0, 0.5], // Navy
    Sarcasm: [0.6, 0.5, 0.4], // Bronze
    Satisfaction: [0.2, 0.7, 0.5], // Jade
    Shame: [0.7, 0.3, 0.6], // Mauve
    "Surprise (negative)": [0.9, 0.6, 0], // Gold
    "Surprise (positive)": [0.7, 0.9, 0.1], // Lime
    Sympathy: [0.4, 0.7, 0.9], // Powder blue
    Tiredness: [0.2, 0.2, 0.3], // Midnight blue
    Triumph: [0.8, 0.7, 0.2], // Gold
    "Aesthetic Appreciation": [0.6, 0.4, 0.7], // Muted purple
    "Empathic Pain": [0.3, 0.3, 0.3], // Dark grey
};


export default function Home() {
    const [predictions, setPredictions] = useState<AudioPrediction[]>([]); // Define the state here
    const gradientRef = useRef<any>(new Gradient([[255, 0, 0], [211, 84, 0], [153, 45, 34], [127, 140, 141]]));


    useEffect(() => {
        const canvasElement = document.querySelector("#gradient-canvas") as HTMLCanvasElement;
        if (canvasElement) {
            gradientRef.current.initGradient("#gradient-canvas", [[255, 0, 0], [211, 84, 0], [153, 45, 34], [127, 140, 141]]);
        }

    }, []);
    useEffect(() => {
        if (predictions.length > 0) {
            const topEmotions = predictions[0].emotions
                .sort((a, b) => b.score - a.score)
                .slice(0, 4);
            topEmotions.forEach(emotion => {
                const top_4_colors = topEmotions.map(emotion => emotionColors[emotion.name]);
                console.log(predictions[0].emotions)
                gradientRef.current.updateSectionColorsSmoothly(top_4_colors);
            });
        }


    }, [predictions]);

    sdk.on("conversationStarted", () => {
        console.log("Conversation started");
    });

    // When the whole agent and user conversation ends
    sdk.on("conversationEnded", () => {
        console.log("Conversation ended");
    });

    sdk.on("error", (error) => {
        console.error("An error occurred:", error);
    });

    // Update message such as transcript
    sdk.on("update", (update) => {
        // Print live transcript as needed
        console.log("update", update);
        // sdk.me
    });

    // When the client receives the audio from server to play
    sdk.on("audio", (audio: Uint8Array) => {
        console.log("There is audio");
        if (predictions[0]) {
            const emotionsString = predictions[0].emotions.map(emotion => `${emotion.name}: ${emotion.score}`).join(", ");
            fetch(`http://0.0.0.0:8080/current-user-emotions/${encodeURIComponent(emotionsString)}`)
                .then(response => response.json())
                .then(data => console.log(data))
                .catch(error => console.error("Error sending emotions:", error));
        }

    });


    useEffect(() => {
        const registerAudio = async () => {
            const registerCallResponse = await retell.registerCall({
                agentId: 'a8b62e62e844f5d80c05ba71f9763573',
                audioWebsocketProtocol: 'web',
                audioEncoding: 's16le',
                sampleRate: 24000,
            });
            console.log(registerCallResponse); // Assuming you want to log the response for now
            sdk.startConversation({
                callId: registerCallResponse.callDetail?.callId ?? '',
                sampleRate: 24000,
                // enableUpdate: true
            })

            // res.callDetail?.callId
        };
        registerAudio();
    }, []);

    // Now you can use predictions directly in Home, for example, to display them
    return (
        <main className="">
            <div style={{ position: "absolute", top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none' }}>
                {predictions.slice(0, 1).map((prediction) => (
                    <div key={prediction.time.begin} style={{ position: 'relative', margin: '20px', backgroundColor: 'rgba(255, 255, 255, 0.5)', padding: '10px', borderRadius: '10px' }}>
                        <div>Time: {prediction.time.begin} - {prediction.time.end}</div>
                        <ul>
                            {prediction.emotions.sort((a, b) => b.score - a.score).slice(0, 4).map((emotion, index) => (
                                <li key={index}>{emotion.name}: {emotion.score}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            <div>
                <canvas id="gradient-canvas" />
            </div>
            <AudioWidgets predictions={predictions} setPredictions={setPredictions} modelName="prosody" recordingLengthMs={400} streamWindowLengthMs={10000} />
        </main >
    )
}