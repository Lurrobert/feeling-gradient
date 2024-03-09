'use client'
import React, { useEffect, useRef } from 'react';
import Image from "next/image";
import { Gradient } from '@/app/gradient';
// import { ProsodyWidgets } from "../../components/widgets/ProsodyWidgets";
// import { ProsodyWidgets } from './widgets/ProsodyWidgets';
import { ProsodyWidgets } from '@/app/widgets/ProsodyWidgets';



export default function Home() {

    const gradientRef = useRef<any>(new Gradient([[255, 0, 0], [211, 84, 0], [153, 45, 34], [127, 140, 141]]));

    useEffect(() => {
        const canvasElement = document.querySelector("#gradient-canvas") as HTMLCanvasElement;
        if (canvasElement) {
            gradientRef.current.initGradient("#gradient-canvas", [[255, 0, 0], [211, 84, 0], [153, 45, 34], [127, 140, 141]]);
        }

        const updateColors = () => {
            // Generate four new random colors
            const newColors = Array.from({ length: 4 }, () => [
                Math.random(), // R
                Math.random(), // G
                Math.random(),  // B
            ]);

            gradientRef.current.updateSectionColorsSmoothly(newColors);
        };

        const intervalId = setInterval(updateColors, 4000); // Update colors every 10 seconds

        return () => clearInterval(intervalId); // Cleanup on component unmount
    }, []);

    return (
        <main className="">
            <canvas id="gradient-canvas" />
        </main>
    )
}