import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import Docente from "../pages/Docente/Docente";
import { AdminLayout } from "../routers/Layouts/AdminLayout";
import { RouterProvider, createMemoryRouter } from "react-router";
import NuevoDocente from "../pages/Docente/ModalNuevoDocente/NuevoDocente";
import EditarDocente from "../pages/Docente/ModalEditarDocente/EditarDocente";
import VerDocente from "../pages/Docente/ModalVerDocente/VerDocente";
import EliminarDocente from "../pages/Docente/ModalEliminarDocente/EliminarDocente";

const docentes_datos = () => {
  return {
    docentes: [
      {
        usuario: {
          rol: {
            nombre: "Docente",
            id: 3,
            descripcion: "Acceso a modulos de calificaciones",
          },
          django_user: {
            nombre_usuario: "jose.escobedo@reich.edu.pe",
            ultima_sesion: null,
            fecha_registro: "2023-12-18 12:44:13.228492",
            id: 30,
          },
          id: 29,
        },
        tipo_documento: 1,
        documento: "67567543",
        primer_nombre: "Jose",
        segundo_nombre: "Antonio",
        apellido_materno: "Ocaña",
        apellido_paterno: "Escobedo",
        fecha_nacimiento: "1996-02-08",
        direccion: "Asoc. Sin Numero Calle M",
        ubigeo: "020401",
        telefono: "944682912",
        experiencia: "Colegio Gardenias",
        especialidad: "Matemáticas",
        id: 2,
      },
    ],
    informacion: {
      tipodocumentos: [
        {
          id: 1,
          TipDocTip: "string",
          TipDocDesCor: "DNI",
          TipDocDesLar: "DNI",
        },
      ],
    },
  };
};

const getDocente = () => {
  return {
    usuario: {
      rol: {
        nombre: "Docente",
        id: 3,
        descripcion: "Acceso a modulos de calificaciones",
      },
      django_user: {
        nombre_usuario: "jose.escobedo@reich.edu.pe",
        ultima_sesion: null,
        fecha_registro: "2023-12-18 12:44:13.228492",
        id: 30,
      },
      id: 29,
    },
    tipo_documento: 1,
    documento: "67567543",
    primer_nombre: "Jose",
    segundo_nombre: "Antonio",
    apellido_materno: "Ocaña",
    apellido_paterno: "Escobedo",
    fecha_nacimiento: "1996-02-08",
    direccion: "Asoc. Sin Numero Calle M",
    ubigeo: "020401",
    telefono: "944682912",
    telefonos_alternativos: [],
    codigo_cursos: [],
    experiencia: "Colegio Gardenias",
    especialidad: "Matemáticas",
    id: 2,
  };
};

const routes = [
  {
    path: "/",
    element: <AdminLayout />,
    children: [
      {
        path: "docente",
        id: "docenteRaiz",
        element: <Docente />,
        loader: () => docentes_datos(),
        children: [
          {
            path: "crear",
            element: <NuevoDocente />,
          },
          {
            path: "editar/:docenteId",
            loader: () => getDocente(),
            element: <EditarDocente />,
          },
          {
            path: "ver/:docenteId",
            loader: () => getDocente(),
            element: <VerDocente />,
          },
          {
            path: "eliminar/:docenteId",
            loader: () => getDocente(),
            element: <EliminarDocente />,
          },
        ],
      },
    ],
  },
];

const router = createMemoryRouter(routes, {
  initialEntries: ["/", "/docente"],
  initialIndex: 1,
});

const routerCrearDocente = createMemoryRouter(routes, {
  initialEntries: ["/", "/docente/crear"],
  initialIndex: 1,
});

const routerEliminarDocente = createMemoryRouter(routes, {
  initialEntries: ["/", "/docente/eliminar/2"],
  initialIndex: 1,
});

const routerVerDocente = createMemoryRouter(routes, {
  initialEntries: ["/", "/docente/ver/2"],
  initialIndex: 1,
});

describe("Docente", () => {
  afterEach(cleanup);

  it("debe renderizarse", () => {
    render(<RouterProvider router={router} />);
  });

  it("debe renderizarse correctamente", () => {
    render(<RouterProvider router={router} />);

    screen.getByLabelText("NOMBRE DEL DOCENTE:");
    screen.getByLabelText("DOCUMENTO:");
    screen.getByRole("table");
    //screen.getByRole('textbox', {name: 'NOMBRE DEL DOCENTE'})
    //screen.getByTestId("_docNomFil")
  });

  it("Debe visualizarse la información del docente", () => {
    render(<RouterProvider router={router} />);

    screen.getByRole("cell", { name: /DNI \- 67567543/i });
    screen.getByRole("cell", {
      name: /Jose Antonio Escobedo Ocaña/i,
    });
  });

  it("Debe visualizarse los botones de acciones por cada docente", () => {
    render(<RouterProvider router={router} />);

    screen.getByTestId("_docVerBtn");
    screen.getByTestId("_docEditBtn");
    screen.getByTestId("_docEliBtn");
  });

  it('Debe visualizarse "Crear docente" vista cuando el botón NUEVO DOCENTE es pulsado', () => {
    render(<RouterProvider router={router} />);

    const btnNueDoc = screen.getByText("NUEVO DOCENTE");
    fireEvent.click(btnNueDoc);
    screen.getByRole("heading", { level: 6 });
  });

  it('Debe visualizarse "Ver docente" vista cuando el botón VER DOCENTE es pulsado', () => {
    render(<RouterProvider router={router} />);

    const btnVerDoc = screen.getByTestId("_docVerBtn");
    fireEvent.click(btnVerDoc);
    screen.getByRole("heading", { level: 6 });
  });

  it('Debe visualizarse "Editar docente" vista cuando el botón EDITAR DOCENTE es pulsado', () => {
    render(<RouterProvider router={router} />);

    const btnVerDoc = screen.getByTestId("_docEditBtn");
    fireEvent.click(btnVerDoc);
    screen.getByRole("heading", { level: 6 });
  });

  it('Debe visualizarse "Eliminar docente" vista cuando el botón ELIMINAR DOCENTE es pulsado', () => {
    render(<RouterProvider router={router} />);

    const btnVerDoc = screen.getByTestId("_docEliBtn");
    fireEvent.click(btnVerDoc);
    screen.getByRole("heading", { level: 6 });
  });
});

describe("Nuevo docente", () => {
  afterEach(cleanup);

  it("debe renderizarse", () => {
    render(<RouterProvider router={routerCrearDocente} />);
  });

  it("debe renderizarse correctamente", () => {
    render(<RouterProvider router={routerCrearDocente} />);

    screen.getByRole("heading", { level: 6 });

    screen.getByPlaceholderText("INGRESE DOCUMENTO");
    screen.getByPlaceholderText("PRIMER NOMBRE");
    screen.getByPlaceholderText("SEGUNDO NOMBRE");
    screen.getByPlaceholderText("APELLIDO PATERNO");
    screen.getByPlaceholderText("APELLIDO MATERNO");
    screen.getByLabelText(/fecha de nacimiento:/i);
    screen.getByRole("textbox", { name: /teléfono #1:/i });
    screen.getByRole("textbox", { name: /teléfono #2:/i });
    screen.getByRole("combobox", { name: /departamento:/i });
    screen.getByRole("combobox", { name: /provincia:/i });
    screen.getByRole("combobox", { name: /distrito:/i });

    screen.getByRole("textbox", { name: /dirección:/i });
    screen.getByRole("textbox", { name: /ubigeo:/i });
    screen.getByRole("textbox", { name: /experiencia:/i });

    screen.getByRole("textbox", { name: /especialidad:/i });
    screen.getByRole("textbox", { name: /cursos:/i });
  });

  it('Debe cerrarse "Crear Docente" vista cuando el botón GUARDAR es pulsado', () => {
    render(<RouterProvider router={routerCrearDocente} />);

    //screen.getByRole("button", { name: "GUARDAR"});
    screen.getByTestId("_docGuaBtn");
    //fireEvent.click(btnGuaCreDoc);
    //const titulo = screen.queryByRole("heading", { level: 6 });
    //expect(titulo).toBeNull();
  });

  it('Debe cerrarse "Crear docente" vista cuando el botón CANCELAR es pulsado', () => {
    render(<RouterProvider router={routerCrearDocente} />);

    const btnCanCreDoc = screen.getByRole("button", { name: /SALIR/i });
    fireEvent.click(btnCanCreDoc);
    const titulo = screen.queryByRole("heading", { level: 6 });
    expect(titulo).toBeNull();
  });
});

describe("Ver docente", () => {
  afterEach(cleanup);

  it("debe renderizarse", () => {
    render(<RouterProvider router={routerVerDocente} />);
  });

  it("debe renderizarse correctamente", () => {
    render(<RouterProvider router={routerVerDocente} />);

    screen.getByRole("heading", { level: 6 });

    const document = screen.getByRole('document');
    within(document).getByText(/dni/i);
    within(document).getByText(/67567543/i);
    
    within(document).getByText(/Jose/i);
    within(document).getByText(/Antonio/i);
    within(document).getByText(/Escobedo/i);
    within(document).getByText(/Ocaña/i);

    screen.getByText(/áncash/i);
    screen.getByText(/asunción/i);
    screen.getByText(/chacas/i);
    screen.getByText(/asoc\. sin numero calle m/i);
    screen.getByText(/020401/i);
    screen.getByText(/1996\-02\-08/i);
    screen.getByText(/Colegio Gardenias/i);
    screen.getByText(/Matemáticas/i);
  });

  it('Debe cerrarse "Ver docente" vista cuando el botón CANCELAR es pulsado', () => {
    render(<RouterProvider router={routerVerDocente} />);

    const btnCanCreDoc = screen.getByRole("button", { name: /CANCELAR/i });
    fireEvent.click(btnCanCreDoc);
    const titulo = screen.queryByRole("heading", { level: 6 });
    expect(titulo).toBeNull();
  });
});

describe("Eliminar docente", () => {
  afterEach(cleanup);

  it("debe renderizarse", () => {
    render(<RouterProvider router={routerEliminarDocente} />);
  });

  it("debe renderizarse correctamente", () => {
    render(<RouterProvider router={routerEliminarDocente} />);

    screen.getByRole("heading", { level: 6 });
    screen.getByRole("button", { name: /SÍ, ELIMINAR DOCENTE/i });
    screen.getByRole("button", { name: /CANCELAR/i });
  });

  it('Debe cerrarse "Eliminar Docente" vista cuando el botón GUARDAR es pulsado', () => {
    render(<RouterProvider router={routerEliminarDocente} />);

    screen.getByRole("button", { name: /SÍ, ELIMINAR DOCENTE/i });
    //fireEvent.click(btnGuaCreDoc);
    //const titulo = screen.queryByRole("heading", { level: 6 });
    //expect(titulo).toBeNull();
  });

  it('Debe cerrarse "Eliminar docente" vista cuando el botón CANCELAR es pulsado', () => {
    render(<RouterProvider router={routerEliminarDocente} />);

    const btnCanCreDoc = screen.getByRole("button", { name: /CANCELAR/i });
    fireEvent.click(btnCanCreDoc);
    const titulo = screen.queryByRole("heading", { level: 6 });
    expect(titulo).toBeNull();
  });
});
