import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Swal from "sweetalert2";
import Acciones from "./Acciones.js";
import {atk_basico} from "./interfaz.js";
import {atk_especial} from "./interfaz.js";
import {carga_energia} from "./interfaz.js";
import { usar_semilla } from "./interfaz.js";
const btn_player1 = document.getElementById("btn_player1");
const btn_player2 = document.getElementById("btn_player2");
//
const atkB1 = document.getElementById("atkB1");
const atkE1 = document.getElementById("atkE1");
const atkC1 = document.getElementById("atkC1");
const atkS1 = document.getElementById("atkS1");
//
const atkB2 = document.getElementById("atkB2");
const atkE2 = document.getElementById("atkE2");
const atkC2 = document.getElementById("atkC2");
const atkS2 = document.getElementById("atkS2");

const player1 = document.getElementById("py1");
const player2 = document.getElementById("py2");
const nombre1 = document.getElementById("player1");
const nombre2 = document.getElementById("player2");
const nombres=document.getElementById("nombres")
const username1=document.getElementById("username1");
const personaje1=document.getElementById("personaje1");
const img1=document.getElementById("img1");
const username2 = document.getElementById("username2");
const personaje2 = document.getElementById("personaje2");
const img2 = document.getElementById("img2");
//Jugador1
const energia1 =document.getElementById("energia1");
const ki1=document.getElementById("ki1");
const vida1 =document.getElementById("vida1");

//jugador2
const energia2 =document.getElementById("energia2");
const ki2=document.getElementById("ki2");
const vida2 =document.getElementById("vida2");



let pj1 = "", pj2 = "";
let jugador1, jugador2;

const iniciar_juego = () =>{
    username1.innerText = nombre1.value;
    personaje1.innerText = pj1;
    img1.src = `./public/img/${pj1}/base.png`;
    username2.innerText = nombre2.value;
    personaje2.innerText = pj2;
    img2.src = `./public/img/${pj2}/base.png`;
}
//Barra de personajes
const barras = ()=>{
    //Jugador1
    energia1.style.width=`${jugador1.getEnergia()}%`;
    energia1.innerText=`${jugador1.getEnergia()}%`;
    ki1.style.width=`${jugador1.getEnergia()}%`;
    ki1.innerText=`${jugador1.getEnergia()}%`;
    vida1.style.width=`${jugador1.getVida()}%`;
    vida1.innerText=`${jugador1.getVida()}%`;
    const badgeS1 = atkS1.querySelector(".badge");
    atkS1.disabled = jugador1.getSemilla() <= 0 ? true : false;
    //Jugador2
    energia2.style.width=`${jugador2.getEnergia()}%`;
    energia2.innerText=`${jugador2.getEnergia()}%`;
    ki2.style.width=`${jugador2.getEnergia()}%`;
    ki2.innerText=`${jugador2.getEnergia()}%`;
    vida2.style.width=`${jugador2.getVida()}%`;
    vida2.innerText=`${jugador2.getVida()}%`;
    const badgeS2 = atkS2.querySelector(".badge");
    atkS2.disabled = jugador2.getSemilla() <= 0 ? true : false;
}
nombre1.addEventListener("input",(event) =>{
    event.target.value = event.target.value.replace(/[^a-zA-Z0-9]+/,"");
});
nombre2.addEventListener("input",(event) =>{
    event.target.value = event.target.value.replace(/[^a-zA-Z0-9]+/,"");
});

const remover_seleccion = (color,...elementos) =>{
    elementos.map((elemento)=>{
        elemento.classList.remove("bg-warning");
        elemento.classList.add("bg-"+color);
    });
}

const msj_error = (msj) =>{
    Swal.fire({
        icon:"warning",
        title:"Error!",
        text:msj
    });
}

[...player1.querySelectorAll("img")].map((imagen) => {
    imagen.addEventListener('click',(event)=>{
        remover_seleccion("danger",...player1.querySelectorAll("img"));
        event.target.classList.remove("bg-danger");
        event.target.classList.add("bg-warning");
        pj1 = event.target.alt;
    });
});
[...player2.querySelectorAll("img")].map((imagen) => {
    imagen.addEventListener('click',(event)=>{
        remover_seleccion("primary",...player2.querySelectorAll("img"));
        event.target.classList.remove("bg-danger");
        event.target.classList.add("bg-warning");
        pj2 = event.target.alt;
    });
});

btn_player1.addEventListener("click",() =>{
    if(nombre1.value == ""){
        return msj_error("El jugador 1 no ha ingresado un nombre de usuario!");
    }else if(pj1 == ""){
        return msj_error("El jugador 1 debe seleccionar un personaje!");
    }
    jugador1 = new Acciones(nombre1.value,pj1);
    nombre1.disabled=true;
    player1.classList.add("d-none");
    if(jugador1 && jugador2){
        nombres.classList.add("d-none");
        iniciar_juego();
    }
});

btn_player2.addEventListener("click",() =>{
    if(jugador1 && jugador2){
        nombres.classList.add("d-none");
    }
    if(nombre2.value == ""){
        return msj_error("El jugador 2 no ha ingresado un nombre de usuario!");
    }else if(pj2 == ""){
        return msj_error("El jugador 2 debe seleccionar un personaje!");
    }
    jugador2 = new Acciones(nombre2.value,pj2);
    nombre2.disabled=true;
    player2.classList.add("d-none");
    iniciar_juego();
});

[...document.getElementById("btn_py1").querySelectorAll("button")].map((boton) => {
    boton.addEventListener("click",()=>{

        if(boton.id == "atkB1"){
            atk_basico(jugador1,jugador2);
        }

        if(boton.id == "atkE1"){
            atk_especial(jugador1,jugador2);
        }

        if(boton.id == "atkC1"){
            carga_energia(jugador1);
        }

        if(boton.id == "atkS1"){
            usar_semilla(jugador1);
        }

        barras();
    });
});

[...document.getElementById("btn_py2").querySelectorAll("button")].map((boton) => {
    boton.addEventListener("click",()=>{

        if(boton.id == "atkB2"){
            atk_basico(jugador2,jugador1);
        }

        if(boton.id == "atkE2"){
            atk_especial(jugador2,jugador1);
        }

        if(boton.id == "atkC2"){
            carga_energia(jugador2);
        }

        if(boton.id == "atkS2"){
            usar_semilla(jugador2);
        }

        barras();
    });
});