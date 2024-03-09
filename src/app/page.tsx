'use client'
import React, { useEffect, useRef, useState } from 'react';
import Image from "next/image";
import { Gradient } from './gradient';
// import { ProsodyWidgets } from "../../components/widgets/ProsodyWidgets";
import { ProsodyWidgets } from './widgets/ProsodyWidgets';
// import AudioWidgets from './widgets/AudioWidgets'; // Assuming you export it correctly
import { AudioWidgets } from './widgets/AudioWidgets';
import { AudioPrediction } from './lib/data/audioPrediction';


export default function Home() {
    const [predictions, setPredictions] = useState<AudioPrediction[]>([]); // Define the state here

    useEffect(() => {
        const canvasElement = document.getElementsByClassName("#gradient-canvas");
        const gradient: any = new Gradient();
        if (canvasElement) {
            gradient.initGradient("#gradient-canvas");
        } else {
            gradient.pause();
        }
    }, []);


    // Now you can use predictions directly in Home, for example, to display them
    return (
        <main className="">
            <div>
                {predictions.map((prediction) => (
                    <div>
                        <div>Time: {prediction.time.begin} - {prediction.time.end}</div>
                        <ul>
                            {prediction.emotions.map((emotion, index) => (
                                <li key={index}>{emotion.name}: {emotion.score}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            {/* <canvas id="gradient-canvas" data-transition-in /> */}
            {/* <AudioWidgets modelName="prosody" recordingLengthMs={500} streamWindowLengthMs={5000} /> */}

            {/* <AudioWidgets predictions={predictions} setPredictions={setPredictions} /> Pass state as props */}
            <AudioWidgets predictions={predictions} setPredictions={setPredictions} modelName="prosody" recordingLengthMs={500} streamWindowLengthMs={5000} />
        </main>
    )
}