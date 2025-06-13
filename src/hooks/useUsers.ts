// 🚀 Day 7: Custom Hooks - Best Practices
// ห่อหุ้ม React Query logic ให้ใช้งานง่ายและนำกลับมาใช้ได้

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUsers, getUserById, createUser, getUserPosts } from '../services/api';
import { userKeys, invalidateUserQueries } from '../lib/queryKeys';
import { userSchema, createUserSchema } from '../schemas/user.schema';
import type { z } from 'zod';

// Create the types inline to avoid import issues
type User = z.infer<typeof userSchema>;
type CreateUser = z.infer<typeof createUserSchema>;

/**
 * Hook สำหรับดึงรายชื่อผู้ใช้ทั้งหมด
 */
export function useGetUsers() {
  return useQuery({
    queryKey: userKeys.lists(),
    queryFn: getUsers,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Hook สำหรับดึงข้อมูลผู้ใช้คนเดียว
 */
export function useGetUser(id: number, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: () => getUserById(id),
    enabled: options?.enabled ?? (!!id && id > 0),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Hook สำหรับดึงโพสต์ของผู้ใช้
 */
export function useGetUserPosts(userId: number, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: userKeys.posts(userId),
    queryFn: () => getUserPosts(userId),
    enabled: options?.enabled ?? (!!userId && userId > 0),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

/**
 * Hook สำหรับสร้างผู้ใช้ใหม่
 */
export function useCreateUser() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (newUser: CreateUser) => createUser(newUser),
    onSuccess: (newUser) => {
      console.log('✅ User created successfully:', newUser);
      
      // 🚀 Day 7: Optimistic Update with Query Key Factory
      const currentUsers = queryClient.getQueryData(userKeys.lists()) as User[] || [];
      const optimisticUser = {
        ...newUser,
        id: Math.max(...currentUsers.map(u => u.id), 10) + 1,
      };
      
      // อัปเดต cache โดยตรง
      queryClient.setQueryData(userKeys.lists(), [optimisticUser, ...currentUsers]);
      console.log('🔄 Cache updated with new user (Custom Hook):', optimisticUser);
    },
    onError: (error) => {
      console.error('❌ Failed to create user:', error);
    },
  });
}

/**
 * Hook สำหรับอัปเดตผู้ใช้ (สำหรับอนาคต)
 */
export function useUpdateUser() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<CreateUser> }) => {
      // TODO: Implement update API
      throw new Error('Update API not implemented yet');
    },
    onSuccess: (updatedUser, { id }) => {
      // อัปเดต cache สำหรับ user detail
      queryClient.setQueryData(userKeys.detail(id), updatedUser);
      // Invalidate lists เพื่อให้แสดงข้อมูลใหม่
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
  });
}

/**
 * Hook สำหรับลบผู้ใช้ (สำหรับอนาคต)
 */
export function useDeleteUser() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => {
      // TODO: Implement delete API
      throw new Error('Delete API not implemented yet');
    },
    onSuccess: (_, deletedId) => {
      // ลบออกจาก cache
      queryClient.removeQueries({ queryKey: userKeys.detail(deletedId) });
      // Invalidate lists
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
  });
}

/**
 * Hook สำหรับ prefetch user data
 */
export function usePrefetchUser() {
  const queryClient = useQueryClient();
  
  return (id: number) => {
    queryClient.prefetchQuery({
      queryKey: userKeys.detail(id),
      queryFn: () => getUserById(id),
      staleTime: 5 * 60 * 1000,
    });
  };
}

/**
 * Hook สำหรับ invalidate user queries
 */
export function useInvalidateUsers() {
  const queryClient = useQueryClient();
  
  return {
    invalidateAll: () => invalidateUserQueries(queryClient),
    invalidateLists: () => queryClient.invalidateQueries({ queryKey: userKeys.lists() }),
    invalidateDetail: (id: number) => queryClient.invalidateQueries({ queryKey: userKeys.detail(id) }),
  };
}
