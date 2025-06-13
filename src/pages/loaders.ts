// 🚀 Day 5: React Router Loaders กับ React Query Integration
import { QueryClient } from '@tanstack/react-query';
import { getUsers, getUserById } from '../services/api';

// Factory function เพื่อความสะดวกในการส่ง queryClient เข้าไป
export const createLoaders = (queryClient: QueryClient) => ({
  // Loader สำหรับหน้า Users List
  users: async () => {
    console.log('🔗 Router Loader: Loading users...');
    
    const query = { 
      queryKey: ['users'], 
      queryFn: getUsers 
    };
    
    // ensureQueryData จะ:
    // - เช็คว่ามีข้อมูลใน cache หรือไม่
    // - ถ้ามีและยังไม่ stale -> return ทันที
    // - ถ้าไม่มี หรือ stale -> fetch ใหม่แล้ว return
    const users = await queryClient.ensureQueryData(query);
    console.log('✅ Router Loader: Users loaded successfully', users.length, 'users');
    
    return users;
  },

  // Loader สำหรับหน้า User Detail
  user: async ({ params }: { params: any }) => {
    const userId = Number(params.userId);
    console.log(`🔗 Router Loader: Loading user ${userId}...`);
    
    if (!userId || isNaN(userId)) {
      throw new Error('Invalid user ID');
    }

    const query = {
      queryKey: ['user', userId],
      queryFn: () => getUserById(userId),
    };
    
    const user = await queryClient.ensureQueryData(query);
    console.log(`✅ Router Loader: User ${userId} loaded successfully`, user.name);
    
    return user;
  },

  // Loader สำหรับ User Posts (เพิ่มเติม)
  userPosts: async ({ params }: { params: any }) => {
    const userId = Number(params.userId);
    console.log(`🔗 Router Loader: Loading posts for user ${userId}...`);
    
    if (!userId || isNaN(userId)) {
      throw new Error('Invalid user ID');
    }

    // Import getUserPosts dynamically to avoid circular dependency
    const { getUserPosts } = await import('../services/api');
    
    const query = {
      queryKey: ['user-posts', userId],
      queryFn: () => getUserPosts(userId),
    };
    
    const posts = await queryClient.ensureQueryData(query);
    console.log(`✅ Router Loader: Posts for user ${userId} loaded successfully`, posts.length, 'posts');
    
    return posts;
  },
});

// Type definitions for better TypeScript support
export type LoaderData = {
  users: Awaited<ReturnType<ReturnType<typeof createLoaders>['users']>>;
  user: Awaited<ReturnType<ReturnType<typeof createLoaders>['user']>>;
  userPosts: Awaited<ReturnType<ReturnType<typeof createLoaders>['userPosts']>>;
};

// Helper function to create typed loaders
export const createTypedLoaders = (queryClient: QueryClient) => {
  const loaders = createLoaders(queryClient);
  
  return {
    ...loaders,
    // Add any additional typed helpers here
  };
};
