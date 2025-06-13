import { z } from 'zod';
import { userSchema, createUserSchema } from '../schemas/user.schema';

// Create types inline to avoid import issues
type User = z.infer<typeof userSchema>;
type CreateUser = z.infer<typeof createUserSchema>;

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

// สร้าง schema สำหรับ array ของ user
const usersSchema = z.array(userSchema);

// ฟังก์ชันสำหรับดึงรายชื่อผู้ใช้ทั้งหมด
export async function getUsers(): Promise<User[]> {
  console.log('🌐 Fetching users from API...');
  
  const res = await fetch(`${API_BASE_URL}/users`);
  
  if (!res.ok) {
    throw new Error(`Failed to fetch users: ${res.status} ${res.statusText}`);
  }
  
  const data = await res.json();
  console.log('📦 Raw API data:', data);
  
  try {
    // Validate ข้อมูลที่ได้รับจาก API ด้วย Zod
    const validatedUsers = usersSchema.parse(data);
    console.log('✅ Data validation successful:', validatedUsers.length, 'users');
    return validatedUsers;
  } catch (error) {
    console.error('❌ Data validation failed:', error);
    throw new Error('Invalid data format received from API');
  }
}

// ฟังก์ชันสำหรับดึงข้อมูลผู้ใช้คนเดียว
export async function getUser(userId: number): Promise<User> {
  console.log(`🌐 Fetching user ${userId} from API...`);

  const res = await fetch(`${API_BASE_URL}/users/${userId}`);

  if (!res.ok) {
    if (res.status === 404) {
      throw new Error(`User with ID ${userId} not found`);
    }
    throw new Error(`Failed to fetch user: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  console.log(`📦 Raw API data for user ${userId}:`, data);

  try {
    // Validate ข้อมูลที่ได้รับจาก API ด้วย Zod
    const validatedUser = userSchema.parse(data);
    console.log(`✅ User ${userId} validation successful:`, validatedUser);
    return validatedUser;
  } catch (error) {
    console.error(`❌ User ${userId} validation failed:`, error);
    throw new Error('Invalid user data format received from API');
  }
}

// 🚀 Day 5: Alias สำหรับ loader (ชื่อที่ชัดเจนกว่า)
export const getUserById = getUser;

// 🚀 Day 4: ฟังก์ชันสำหรับสร้างผู้ใช้ใหม่ (POST)
export async function createUser(newUser: CreateUser): Promise<User> {
  console.log('🌐 Creating new user:', newUser);

  const res = await fetch(`${API_BASE_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newUser),
  });

  if (!res.ok) {
    throw new Error(`Failed to create user: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  console.log('📦 Created user response:', data);

  try {
    // แม้ API จะส่งข้อมูลกลับมา ควร validate ด้วย
    // JSONPlaceholder จะ return id กลับมาด้วย เราจึงใช้ userSchema ได้
    const validatedUser = userSchema.parse(data);
    console.log('✅ User creation successful:', validatedUser);
    return validatedUser;
  } catch (error) {
    console.error('❌ User creation validation failed:', error);
    throw new Error('Invalid user data format received from API');
  }
}

// ฟังก์ชันจำลองการดึงข้อมูล posts ของผู้ใช้ (สำหรับตัวอย่างเพิ่มเติม)
const postSchema = z.object({
  userId: z.number(),
  id: z.number(),
  title: z.string(),
  body: z.string(),
});

const postsSchema = z.array(postSchema);
export type Post = z.infer<typeof postSchema>;

export async function getUserPosts(userId: number): Promise<Post[]> {
  console.log(`🌐 Fetching posts for user ${userId}...`);
  
  const res = await fetch(`${API_BASE_URL}/posts?userId=${userId}`);
  
  if (!res.ok) {
    throw new Error(`Failed to fetch posts: ${res.status} ${res.statusText}`);
  }
  
  const data = await res.json();
  
  try {
    const validatedPosts = postsSchema.parse(data);
    console.log(`✅ Posts validation successful: ${validatedPosts.length} posts for user ${userId}`);
    return validatedPosts;
  } catch (error) {
    console.error(`❌ Posts validation failed:`, error);
    throw new Error('Invalid posts data format received from API');
  }
}

// Helper function สำหรับจำลองการ delay (เพื่อดู loading state)
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
