import * as z from "zod";

const UserSchema = z.object({
  name: z.string(),
  email: z.string(),
  nummer: z.string(),
  role: z.string(),
  studyCode: z.nullable(z.string()),
  secondNumber: z.nullable(z.string()),
  birthDate: z.nullable(z.string()),
  nationality: z.nullable(z.string()),
});

const OpenAnswerSchema = z.object({
  id: z.number().optional(),
  answer: z.string().min(1, { message: "Gelieve een antwoord te geven" }),
  rating: z.number().nullable(),
  user: UserSchema.optional(),
});

const RatingAnswerSchema = z.object({
  id: z.number().optional(),
  answer: z.string().nullable(),
  rating: z.coerce.number().min(1, { message: "Gelieve een rating te geven" }),
  user: UserSchema.optional(),
});

const BulletAnswerSchema = z.object({
  id: z.number().optional(),
  type: z.string(),
  answer: z.string().nullable(),
  rating: z.number().nullable(),
  user: UserSchema.optional(),
});

const QuestionSchema = z.object({
  id: z.number(),
  question: z.string(),
  description: z.string().nullable(),
  type: z.string(),
  answers: z.array(
    z.union([OpenAnswerSchema, RatingAnswerSchema, BulletAnswerSchema])
  ),
});

const OpoSchema = z.object({
  code: z.string(),
  name: z.string(),
  studyCode: z.string(),
  loops: z.number(),
});

const TemplateSchema = z.object({
  id: z.number(),
  title: z.string(),
  type: z.string(),
  questions: z.array(QuestionSchema),
  opo: OpoSchema,
});

export {
  UserSchema,
  OpenAnswerSchema,
  RatingAnswerSchema,
  BulletAnswerSchema,
  QuestionSchema,
  OpoSchema,
  TemplateSchema,
};
