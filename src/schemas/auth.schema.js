import { z } from "zod";

export const regiterSchema = z.object({
  username: z.string({
    required_error: "El nombre de usuario es necesario",
  }),
  email: z
    .string({
      required_error: "El correo de usuario es necesario",
    })
    .email({
      required_error: "El correo ingresado es invalido",
    }),
  password: z
    .string({
      required_error: "La contraseña de usuario es necesario",
    })
    .min(6, {
      required_error: "El mínimo de caracteres para la contraseña es de 6",
    }),
  photo: z.string().optional(),
  background: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string({
    required_error: "El correo de usuario o nombre de usuario es necesario",
  }),
  password: z
    .string({
      required_error: "La contraseña de usuario es necesario",
    })
    .min(6, {
      required_error: "El mínimo de caracteres para la contraseña es de 6",
    }),
});
