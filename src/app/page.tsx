'use client'
import React, { useEffect, useRef } from 'react';
import Image from "next/image";
import { Gradient } from './gradient';
// import { ProsodyWidgets } from "../../components/widgets/ProsodyWidgets";
import { ProsodyWidgets } from './widgets/ProsodyWidgets';



export default function Home() {

  // const canvasRef = useRef(null);

  useEffect(() => {
    const canvasElement = document.getElementsByClassName("#gradient-canvas");
    const gradient: any = new Gradient();
    if (canvasElement) {
      gradient.initGradient("#gradient-canvas");
    } else {
      gradient.pause();
    }
  }, []);


  return (
    <main className="">
      {/* <canvas id="gradient-canvas" data-transition-in /> */}
      <ProsodyWidgets />
    </main>
  )
}