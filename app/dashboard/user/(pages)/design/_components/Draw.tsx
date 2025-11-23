"use client";
import React from "react";
import { Tldraw } from "tldraw";
import "tldraw/tldraw.css"; 
import GenerateButton from "./GenerateButton";

const Draw = () => {
  return (
    <div className="relative w-full h-[calc(100vh-80px)] overflow-hidden bg-gray-50">
      <div className="absolute inset-0">
        <Tldraw persistenceKey="saasify-app" />
      </div>
      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 z-50">
        <GenerateButton />
      </div>
    </div>
  );
};

export default Draw;
