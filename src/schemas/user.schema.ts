import { z } from 'zod';

// เราสามารถสร้าง schema ย่อยๆ แล้วนำมาประกอบกันได้
const addressSchema = z.object({
  street: z.string(),
  suite: z.string(),
  city: z.string(),
  zipcode: z.string(),
});

// Schema สำหรับ Geo coordinates (เพิ่มเติมจาก JSONPlaceholder)
const geoSchema = z.object({
  lat: z.string(),
  lng: z.string(),
});

// Schema สำหรับ Company (เพิ่มเติมจาก JSONPlaceholder)
const companySchema = z.object({
  name: z.string(),
  catchPhrase: z.string(),
  bs: z.string(),
});

// Address schema แบบเต็ม (รวม geo)
const fullAddressSchema = addressSchema.extend({
  geo: geoSchema,
});

// User Schema หลัก - อ้างอิงจาก JSONPlaceholder API
export const userSchema = z.object({
  id: z.number().int().positive({ message: "ID must be a positive integer" }),
  name: z.string().min(1, { message: "Name is required" }),
  username: z.string().min(1, { message: "Username is required" }),
  email: z.string().email({ message: "Invalid email format" }),
  address: fullAddressSchema,
  phone: z.string().optional(),
  website: z.string().optional(),
  company: companySchema.optional(),
});

// User Schema แบบง่าย (สำหรับ mock data ในโปรเจกต์)
export const simpleUserSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email format" }),
  role: z.string(),
  phone: z.string().optional(),
  department: z.string().optional(),
  joinDate: z.string().optional(),
});

// Schema สำหรับสร้าง user ใหม่ (ไม่ต้องมี id เพราะ server จะสร้างให้)
export const createUserSchema = userSchema.omit({ id: true });

// นี่คือ DTO ของเรา! 🎉
export type User = z.infer<typeof userSchema>;
export type CreateUser = z.infer<typeof createUserSchema>;
export type SimpleUser = z.infer<typeof simpleUserSchema>;

// Helper functions สำหรับการ validate
export const validateUser = (data: unknown) => {
  return userSchema.parse(data);
};

export const safeValidateUser = (data: unknown) => {
  return userSchema.safeParse(data);
};

export const validateSimpleUser = (data: unknown) => {
  return simpleUserSchema.parse(data);
};

export const safeValidateSimpleUser = (data: unknown) => {
  return simpleUserSchema.safeParse(data);
};
