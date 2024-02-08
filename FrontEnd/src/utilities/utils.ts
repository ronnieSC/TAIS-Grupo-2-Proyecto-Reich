export const NUMERO_REGISTROS = 5;

// Map RHF's dirtyFields over the `data` received by `handleSubmit` and return the changed subset of that data.
export function dirtyValues(
  dirtyFields: object | boolean | any,
  allValues: object | any
): object {
  // If *any* item in an array was modified, the entire array must be submitted, because there's no way to indicate
  // "placeholders" for unchanged elements. `dirtyFields` is `true` for leaves.
  if (dirtyFields === true || Array.isArray(dirtyFields)) return allValues;

  // Here, we have an object
  const filteredEntries = Object.entries(dirtyFields)
    .map(([key, value]) => {
      const modifiedValue = dirtyValues(value, allValues[key]);

      // Exclude fields with empty values
      if (
        modifiedValue !== null &&
        typeof modifiedValue !== "object" &&
        modifiedValue !== undefined &&
        modifiedValue !== ""
      ) {
        return [key, modifiedValue];
      } else if (typeof modifiedValue === "object" && modifiedValue !== null) {
        return [key, modifiedValue];
      }

      return undefined;
    })
    .filter(Boolean) as [string, any][]; // Assert the type of the array

  return Object.fromEntries(filteredEntries);
}

export interface Errors {
  ok: boolean;
  status: number
  message: string
  errors: {
    [key: string]: any;
  };
}

export const parseDateToString = (date: Date) => {
  let formattedDate = `${date!.getFullYear()}-${
    date!.getMonth() + 1
  }-${date!.getDate()}`;
  return formattedDate;
};

interface Par {
  nombre: string;
  codigo: string;
}

const departamentos: Par[] = [
  { nombre: "Amazonas", codigo: "01" },
  { nombre: "Áncash", codigo: "02" },
  { nombre: "Apurímac", codigo: "03" },
  { nombre: "Arequipa", codigo: "04" },
  { nombre: "Ayacucho", codigo: "05" },
  { nombre: "Cajamarca", codigo: "06" },
  { nombre: "Callao", codigo: "07" },
  { nombre: "Cusco", codigo: "08" },
  { nombre: "Huancavelica", codigo: "09" },
  { nombre: "Huánuco", codigo: "10" },
  { nombre: "Ica", codigo: "11" },
  { nombre: "Junín", codigo: "12" },
  { nombre: "La Libertad", codigo: "13" },
  { nombre: "Lambayeque", codigo: "14" },
  { nombre: "Lima", codigo: "15" },
  { nombre: "Loreto", codigo: "16" },
  { nombre: "Madre de Dios", codigo: "17" },
  { nombre: "Moquegua", codigo: "18" },
  { nombre: "Pasco", codigo: "19" },
  { nombre: "Piura", codigo: "20" },
  { nombre: "Puno", codigo: "21" },
  { nombre: "San Martín", codigo: "22" },
  { nombre: "Tacna", codigo: "23" },
  { nombre: "Tumbes", codigo: "24" },
  { nombre: "Ucayali", codigo: "25" },
];

export default { departamentos };
