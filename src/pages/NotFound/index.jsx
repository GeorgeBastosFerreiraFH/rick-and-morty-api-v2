import React from "react"
import { Link } from "react-router-dom"

export const NotFound = () => {
  return (
    <div className="bg-gradient-to-b from-slate-800 via-slate-750 to-slate-800 flex flex-col items-center justify-center text-base-content p-4 overflow-hidden">
      <div className="relative w-full max-w-[300px] h-[400px] mb-8">
        {/* UFO */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-24 animate-hover">
          {/* UFO Body */}
          <div className="absolute bottom-0 w-full h-10 bg-gradient-to-r from-neutral-600 via-neutral-400 to-neutral-600 rounded-full shadow-lg"></div>
          {/* UFO Dome */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-32 h-20 bg-gradient-to-b from-info/80 to-info/50 rounded-full"></div>
          {/* UFO Lights */}
          <div className="absolute bottom-1 w-full flex justify-around px-6">
            <div className="w-3 h-3 bg-warning rounded-full animate-pulse"></div>
            <div className="w-3 h-3 bg-error rounded-full animate-pulse delay-75"></div>
            <div className="w-3 h-3 bg-success rounded-full animate-pulse delay-150"></div>
            <div className="w-3 h-3 bg-info rounded-full animate-pulse delay-300"></div>
          </div>
          {/* Tractor Beam */}
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-50 h-64 p-4">
            <div className="w-full h-full bg-gradient-to-b from-info/20 to-transparent animate-pulse"></div>
          </div>
        </div>

        

        {/* Portal */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-40">
          <div className="w-full h-full rounded-full bg-success/30 border-4 border-success animate-portal">
            <div className="w-10 h-10 bg-base-100 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-disappear"></div>
          </div>
        </div>
      </div>

      <h1 className="text-4xl font-bold mb-4 text-success">Wubba Lubba Dub Dub!</h1>
      <p className="text-xl mb-8 text-center text-base-100 ">Parece que você se perdeu em uma dimensão errada, Morty!</p>
      <Link to="/" className="btn btn-primary bg-success hover:bg-success-focus text-base-100 border-none">
        Voltar para a Dimensão C-137
      </Link>
    </div>
  )
}