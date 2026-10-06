import Swal from "sweetalert2";

const atributosPersonaje={
        "Goku":{
        atk_basico:"kame Hame Ha!",
        atk_especial:"Muereeee!",
        fondo: "rgba(237,22,7,0.5)",
    },

    "Cell":{
        atk_basico:"Toma eso!",
        atk_especial:"Kame Hame Ha!",
        fondo: "rgba(237,22,7,0.5)",
    },

    "Gogueta":{
        atk_basico:"Haaah!",
        atk_especial:"Mueree!",
        fondo: "rgba(237,22,7,0.5)",
    },

    "Gohan":{
        atk_basico:"kame Hame Ha!",
        atk_especial:"Muereeee!",
        fondo: "rgba(237,22,7,0.5)",
    },

    "Pikoro":{
        atk_basico:"kame Hame Ha!",
        atk_especial:"Muereeee!",
        fondo: "rgba(237,22,7,0.5)",
    },

    "Trunks":{
        atk_basico:"kame Hame Ha!",
        atk_especial:"Muereeee!",
        fondo: "rgba(237,22,7,0.5)",
    },

    "Veguetta":{
        atk_basico:"kame Hame Ha!",
        atk_especial:"Muereeee!",
        fondo: "rgba(237,22,7,0.5)",
    },


    "Veguito":{
        atk_basico:"kame Hame Ha!",
        atk_especial:"Muereeee!",
        fondo: "rgba(237,22,7,0.5)",
    }   
}

const atk_basico = (j1, j2) => {
    j1.atkBasico(),
    j2.setVida(j2.getVida() - 10 < 1 ? 0 : j2.getVida() - 10);
    Swal.fire({
    text: atributosPersonaje[j1.getPersonaje()].atk_basico,
    title: "Ataque basico",
    imageUrl: `./public/img/${j1.getPersonaje()}/basico.png`,
    imageWidth: 300,
    imageHeight: 300,
    position: "center-center",
    width: 600,
    color: "#fff",
    background: "none",
    imageAlt: "Ataque Basico",
    showConfirmButton: false,
    timer: 1500
  });
};
export {atk_basico}
const atk_especial = (j1, j2) => {
    j1.atkEspecial();
    j2.setVida(j2.getVida() - 20 < 1 ? 0 : j2.getVida() - 20);

    Swal.fire({
        text: atributosPersonaje[j1.getPersonaje()].atk_especial,
        title: "Ataque Especial",
        imageUrl: `./public/img/${j1.getPersonaje()}/especial.png`,
        imageWidth: 300,
        imageHeight: 300,
        position: "center-center",
        width: 600,
        color: "#fff",
        background: "none",
        imageAlt: "Ataque Especial",
        showConfirmButton: false,
        timer: 1500
    });
};

export {atk_especial};

const carga_energia = (j1) => {
    j1.cargaEnergia();

    Swal.fire({
        text: "¡Recuperando energía!",
        title: "Cargar Ki",
        imageUrl: `./public/img/${j1.getPersonaje()}/base.png`,
        imageWidth: 300,
        imageHeight: 300,
        position: "center-center",
        width: 600,
        color: "#fff",
        background: "none",
        showConfirmButton: false,
        timer: 1500
    });
};

const usar_semilla = (j1) => {
    if (j1.getSemilla() > 0) {
        j1.curacion();
        Swal.fire({
            text: "Salud, Ki y Energía restaurados!",
            title: "Semilla del Ermitaño",
            imageUrl: `./public/img/${j1.getPersonaje()}/curar.png`,
            imageWidth: 300,
            imageHeight: 300,
            position: "center-center",
            width: 600,
            color: "#fff",
            background: "none",
            showConfirmButton: false,
            timer: 1500
        });
    }
};

export {carga_energia};
export { usar_semilla };