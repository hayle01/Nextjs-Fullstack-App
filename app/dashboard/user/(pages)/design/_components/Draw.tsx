"use client";
import React from "react";
import { Tldraw } from "tldraw";
import "tldraw/tldraw.css"; // 👈 REQUIRED for the editor UI
import GenerateButton from "./GenerateButton";

const Draw = () => {
  return (
    <div className="relative w-full h-[calc(100vh-80px)] overflow-hidden bg-gray-50">
      {/* Tldraw Canvas */}
      <div className="absolute inset-0">
        <Tldraw persistenceKey="saasify-app" />
      </div>

      {/* Floating button on top */}
      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 z-50">
        <GenerateButton />
      </div>
    </div>
  );
};

export default Draw;
