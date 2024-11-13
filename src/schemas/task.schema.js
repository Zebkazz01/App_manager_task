import { z } from "zod";

export const crearteTaskSchecma = z.object({
  title: z.string({
    required_error: "El titulo es requerido",
  }),
  description: z.string({
    required_error: "La descripción no puede ir vacia",
  }),
  date: z.string().datetime().optional(),
  orden: z
    .number({
      required_error: "El orden es requerido",
    })
    .optional(),
  numeronota: z
    .number({
      required_error: "El numero de nota es requerido",
    })
    .optional(),
});
