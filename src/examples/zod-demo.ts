// 🚀 Day 2: DTO และการตรวจสอบข้อมูลด้วย Zod - Demo Examples
// ไฟล์นี้แสดงตัวอย่างการใช้งาน Zod แบบละเอียด

import { z } from 'zod';

// === 1. Schema พื้นฐาน ===
console.log('=== 1. Schema พื้นฐาน ===');

// สร้าง Schema สำหรับ User แบบง่าย
const userSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  age: z.number().min(0).max(120).optional(),
});

// สร้าง TypeScript type จาก Schema
type User = z.infer<typeof userSchema>;

// ตัวอย่างข้อมูล
const validUser = {
  id: 1,
  name: "John Doe",
  email: "john@example.com",
  age: 25
};

const invalidUser = {
  id: -1, // ผิด: ต้องเป็นจำนวนบวก
  name: "", // ผิด: ต้องไม่ว่าง
  email: "not-email", // ผิด: รูปแบบ email ไม่ถูกต้อง
  age: 150 // ผิด: เกิน 120
};

// === 2. การใช้ .parse() ===
console.log('\n=== 2. การใช้ .parse() ===');

try {
  const parsed = userSchema.parse(validUser);
  console.log('✅ Parse successful:', parsed);
} catch (error) {
  console.error('❌ Parse failed:', error);
}

try {
  const parsed = userSchema.parse(invalidUser);
  console.log('✅ Parse successful:', parsed);
} catch (error) {
  console.error('❌ Parse failed as expected:', error);
}

// === 3. การใช้ .safeParse() ===
console.log('\n=== 3. การใช้ .safeParse() ===');

const validResult = userSchema.safeParse(validUser);
if (validResult.success) {
  console.log('✅ SafeParse successful:', validResult.data);
} else {
  console.error('❌ SafeParse failed:', validResult.error.issues);
}

const invalidResult = userSchema.safeParse(invalidUser);
if (invalidResult.success) {
  console.log('✅ SafeParse successful:', invalidResult.data);
} else {
  console.error('❌ SafeParse failed as expected:');
  invalidResult.error.issues.forEach(issue => {
    console.error(`  - ${issue.path.join('.')}: ${issue.message}`);
  });
}

// === 4. Schema ซับซ้อน ===
console.log('\n=== 4. Schema ซับซ้อน ===');

const addressSchema = z.object({
  street: z.string(),
  city: z.string(),
  country: z.string(),
  zipCode: z.string().regex(/^\d{5}$/, "Zip code must be 5 digits")
});

const companySchema = z.object({
  name: z.string(),
  industry: z.enum(['tech', 'finance', 'healthcare', 'education']),
  employees: z.number().min(1)
});

const fullUserSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1),
  email: z.string().email(),
  address: addressSchema,
  company: companySchema.optional(),
  hobbies: z.array(z.string()).min(1, "At least one hobby required"),
  isActive: z.boolean().default(true)
});

type FullUser = z.infer<typeof fullUserSchema>;

const complexUser = {
  id: 1,
  name: "Jane Smith",
  email: "jane@example.com",
  address: {
    street: "123 Main St",
    city: "Bangkok",
    country: "Thailand",
    zipCode: "10110"
  },
  company: {
    name: "Tech Corp",
    industry: "tech" as const,
    employees: 100
  },
  hobbies: ["reading", "coding", "traveling"],
  isActive: true
};

const complexResult = fullUserSchema.safeParse(complexUser);
if (complexResult.success) {
  console.log('✅ Complex validation successful:', complexResult.data);
} else {
  console.error('❌ Complex validation failed:', complexResult.error.issues);
}

// === 5. การใช้ .transform() ===
console.log('\n=== 5. การใช้ .transform() ===');

const dateSchema = z.string().transform((str) => new Date(str));
const userWithDateSchema = z.object({
  id: z.number(),
  name: z.string(),
  createdAt: dateSchema
});

const userWithDate = {
  id: 1,
  name: "Bob",
  createdAt: "2024-01-01"
};

const dateResult = userWithDateSchema.safeParse(userWithDate);
if (dateResult.success) {
  console.log('✅ Transform successful:', dateResult.data);
  console.log('  createdAt type:', typeof dateResult.data.createdAt);
} else {
  console.error('❌ Transform failed:', dateResult.error.issues);
}

export { userSchema, fullUserSchema, type User, type FullUser };
