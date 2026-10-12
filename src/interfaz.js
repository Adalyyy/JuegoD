import Swal from "sweetalert2";

const atributosPersonaje={
    "Goku": {
        atk_basico: "¡Toma esto!",
        atk_especial: "¡Kame Hame Ha!",
        fondo: "rgba(7, 38, 237, 0.5)",
    },

    "Cell": {
        atk_basico: "¡Toma esto, sabandija!",
        atk_especial: "¡Kame Hame Ha Solar!",
        fondo: "rgb(8, 97, 28)",
    },

    "Gogueta": {
        atk_basico: "¡Haaah!",
        atk_especial: "¡Polvo Estelar!",
        fondo: "rgb(0, 224, 183)",
    },

    "Gohan": {
        atk_basico: "¡No te lo perdonaré!",
        atk_especial: "¡Masenko!",
        fondo: "rgba(118, 253, 255, 0.5)",
    },

    "Pikoro": {
        atk_basico: "¡Desaparece!",
        atk_especial: "¡Makankosappo!",
        fondo: "rgb(95, 237, 7)",
    },

    "Trunks": {
        atk_basico: "¡Siente la fuerza de mi espada!",
        atk_especial: "¡Ataque Ardiente!",
        fondo: "rgb(249, 245, 9)",
    },

    "Veguetta": {
        atk_basico: "¡Insecto miserable!",
        atk_especial: "¡Resplandor Final!",
        fondo: "rgb(7, 168, 237)",
    },

    "Veguito": {
        atk_basico: "¡Es todo lo que tienes!",
        atk_especial: "¡Espada de Espíritu!",
        fondo: "rgba(8, 82, 255, 0.5)",
    }
}

const finalizarTurno = (jugadorEnTurno, adversario) => {
    jugadorEnTurno.setEsSuTurno(false);
    adversario.setEsSuTurno(true);
};


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
    backdrop:atributosPersonaje[j1.getPersonaje()].fondo,
    background: "none",
    imageAlt: "Ataque Basico",
    showConfirmButton: false,
    timer: 1500
  });
  j1.aumentarContadorEspecial();
  finalizarTurno(j1, j2);
};
export {atk_basico}

const atk_especial = (j1, j2) => {
        if (j1.getContadorEspecial() >= 2){
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
                backdrop:atributosPersonaje[j1.getPersonaje()].fondo,
                background: "none",
                imageAlt: "Ataque Especial",
                showConfirmButton: false,
                timer: 1500
            });

            j1.setContadorEspecial(0);
            finalizarTurno(j1, j2);
        } else {
            const turnosFaltantes = 2 - j1.getContadorEspecial();
            Swal.fire({
                icon: "warning",
                title: "Habilidad en recarga",
                text: `Debes esperar ${turnosFaltantes} turnos mas para usar el ataque especial`
            })
        }
};


export {atk_especial};

const carga_energia = (j1, j2) => {
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
    j1.aumentarContadorEspecial();
    finalizarTurno(j1, j2);
};
export {carga_energia};

//Estadisticas
const estadisticasJ1 = (j1) => {
    return j1.getVida() == 100 &&
           j1.getKi() == 100 &&
           j1.getEnergia() == 100;
};

const usar_semilla = (j1, j2) => {

    if (j1.getSemilla() > 0) {

        if (estadisticasJ1(j1)) {
            Swal.fire({
                icon: "warning",
                title: "¡No puedes usar la semilla!",
                text: "Tus estadísticas ya están al máximo"
            });
            return;
        }

        j1.curacion();

        Swal.fire({
            text: "¡Salud, Ki y Energía restaurados!",
            title: "Semilla del Ermitaño",
            imageUrl: `./public/img/${j1.getPersonaje()}/curar.png`,
            imageWidth: 300,
            imageHeight: 300,
            position: "center",
            width: 600,
            color: "#fff",
            background: "none",
            showConfirmButton: false,
            timer: 1500
        });

        j1.aumentarContadorEspecial();
        finalizarTurno(j1, j2);

    } else {
        Swal.fire({
            icon: "warning",
            title: "¡Error!",
            text: "No tienes semillas para curarte"
        });
    }
};

export { usar_semilla };


//Contador de pelea 
const alertaJuego = () =>{
    let timerInterval;
    Swal.fire({
    title: "Elcombate empieza en ",
    imageUrl:`./public/img/pelea.jpg`,
    html: "Preparate.",
    background: "#fff",
    timer: 3000,
    timerProgressBar: true,
    didOpen: () => {
        Swal.showLoading();
        const timer = Swal.getPopup().querySelector("b");
    },
    willClose: () => {
        clearInterval(timerInterval);
    }
    }).then((result) => {
    if (result.dismiss === Swal.DismissReason.timer) console.log("I was closed by the timer");
    });  
   
}

export { alertaJuego };

