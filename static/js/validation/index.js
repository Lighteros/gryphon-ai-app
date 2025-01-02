import { z, ZodError } from "zod";

export function validate(body, schema) {
  try {
    const validate = schema.parse(body);
    return {
      success: true,
      data: validate,
    };
  } catch (error) {
    if (error instanceof ZodError) {
      const errorMessages = error.errors.map((issue) => ({
        message: `- ${issue.message}`,
      }));

      return {
        success: false,
        message: errorMessages.flatMap((x) => x.message).join("\n"),
      };
    } else {
      return {
        success: false,
        message: "Error",
      };
    }
  }
}
export async function validateAsync(body, schema) {
  try {
    const validate = await schema.parse(body);
    return {
      success: true,
      data: validate,
    };
  } catch (error) {
    if (error instanceof ZodError) {
      const errorMessages = error.errors.map((issue) => ({
        message: `- ${issue.message}`,
      }));

      return {
        success: false,
        message: errorMessages.flatMap((x) => x.message).join("\n"),
      };
    } else {
      return {
        success: false,
        message: "Error",
      };
    }
  }
}
