'use client'
import React, { useEffect, useRef } from 'react';
import Image from "next/image";
import { Gradient } from '@/app/gradient';
// import { ProsodyWidgets } from "../../components/widgets/ProsodyWidgets";
// import { ProsodyWidgets } from './widgets/ProsodyWidgets';
import { ProsodyWidgets } from '@/app/widgets/ProsodyWidgets';




export default function Home() {

    const gradientRef = useRef<any>(new Gradient(["#FF0000", "#D35400", "#992D22", "#7F8C8D"]));

    const emotions1 = [
        { name: 'Anger', score: 95, color: '#FF0000' }, // Example color in hex
        { name: 'Frustration', score: 90, color: '#FF0000' },
        { name: 'Irritation', score: 85, color: '#D35400' },
        { name: 'Rage', score: 100, color: '#992D22' },
        { name: 'Disgust', score: 80, color: '#7F8C8D' },
        { name: 'Envy', score: 75, color: '#27AE60' }
    ];

    const emotions2 = [
        { name: 'Anger', score: 95, color: '#FF0000' }, // Example color in hex
        { name: 'Frustration', score: 90, color: '#FF0000' },
        { name: 'Irritation', score: 85, color: '#D35400' },
        { name: 'Rage', score: 100, color: '#992D22' },
        { name: 'Disgust', score: 80, color: '#7F8C8D' },
        { name: 'Envy', score: 75, color: '#27AE60' }
    ];

    useEffect(() => {
        const canvasElement = document.querySelector("#gradient-canvas") as HTMLCanvasElement;
        if (canvasElement) {
            gradientRef.current.initGradient("#gradient-canvas", ["#FF0000", "#D35400", "#992D22", "#7F8C8D"]);
        }
    }, []);




    return (
        <main className="">
            <button onClick={() => gradientRef.current.updateSectionColorsSmoothly(["#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF"])}>Update</button>
            <canvas id="gradient-canvas" data-transition-in />
            <button onClick={() => gradientRef.current.updateSectionColors(["#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF"])}>Update</button>
        </main>
    )
}