
type horaBloqueHorario = number;

class BloqueService {
    private valor: horaBloqueHorario | null = null;

    guardarBloqueHora(valor: horaBloqueHorario): void {
        this.valor = valor;
    }

    obtenerBloqueHora(): horaBloqueHorario| null {
        console.log('valor del horario devuelto',this.valor)
        return this.valor;
    }
}

export const bloqueService = new BloqueService();