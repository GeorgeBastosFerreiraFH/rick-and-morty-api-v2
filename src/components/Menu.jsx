import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Icone from "../assets/images/rick-and-morty-logo.png";
import Personagens from "../assets/images/personagens.svg";
import Episodios from "../assets/images/episodios.svg";
import Localizacao from "../assets/images/localizacao.svg";

export const Menu = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const itemAtivo = location.pathname.includes("localizacoes")
    ? "localizacoes"
    : location.pathname.includes("episodios")
    ? "episodios"
    : "personagens";

  const menuItems = [
    { key: "personagens", label: "Personagens", icon: Personagens, path: "/" },
    { key: "localizacoes", label: "Localizações", icon: Localizacao, path: "/localizacoes" },
    { key: "episodios", label: "Episódios", icon: Episodios, path: "/episodios" }
  ];

  return (
    <div className="navbar bg-gradient-to-r from-slate-800 via-slate-750 to-slate-700 shadow-lg sticky top-0 z-50">
      <div className="navbar-start">
        <div className="relative group p-2">
          <img
            src={Icone}
            alt="Ícone"
            className="w-12 h-12 lg:w-16 lg:h-16 cursor-pointer transition-transform duration-300 transform group-hover:scale-110 hover:rotate-3 filter invert"
            onClick={() => navigate("/")}
          />
        </div>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 flex items-center gap-8">
          {menuItems.map((item) => (
            <li key={item.key} className="relative">
              <a
                className={`flex items-center gap-3 text-lg font-bold py-2 px-4 rounded-lg transition-all duration-300 ${
                  itemAtivo === item.key ? "bg-purple-700 text-white" : "text-white hover:bg-purple-700/30"
                }`}
                onClick={() => navigate(item.path)}
              >
                <img
                  src={item.icon}
                  alt={item.label}
                  className="w-7 h-7 transition-transform duration-300 hover:rotate-12"
                />
                {item.label}
                {itemAtivo === item.key && (
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-green-400"></div>
                )}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="navbar-end hidden lg:flex">   
      </div>

      {/* Botões de ação para mobile e tablets */}
      <div className="navbar-center lg:hidden flex gap-1">
        {menuItems.map((item) => (
          <button
            key={item.key}
            className={`btn btn-sm border-none rounded-lg ${
              itemAtivo === item.key ? "bg-purple-700 text-white" : "bg-transparent hover:bg-purple-700/30 text-white"
            }`}
            onClick={() => navigate(item.path)}
          >
            <img src={item.icon} alt={item.label} className="w-6 h-6" />
          </button>
        ))}
      </div>
    </div>
  );
};
