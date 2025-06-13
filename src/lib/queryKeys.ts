// 🚀 Day 7: Query Key Factories - Best Practices
// แก้ปัญหา "Magic Strings" และให้ Autocomplete ที่ดี

/**
 * User-related query keys
 * ใช้ pattern ที่แนะนำโดย TanStack Query team
 */
export const userKeys = {
  // Base key สำหรับ users ทั้งหมด
  all: ['users'] as const,
  
  // Keys สำหรับ lists (รายการผู้ใช้)
  lists: () => [...userKeys.all, 'list'] as const,
  list: (filters?: Record<string, any>) => [...userKeys.lists(), filters] as const,
  
  // Keys สำหรับ details (รายละเอียดผู้ใช้)
  details: () => [...userKeys.all, 'detail'] as const,
  detail: (id: number) => [...userKeys.details(), id] as const,
  
  // Keys สำหรับ related data
  posts: (userId: number) => [...userKeys.detail(userId), 'posts'] as const,
} as const;

/**
 * Post-related query keys (สำหรับอนาคต)
 */
export const postKeys = {
  all: ['posts'] as const,
  lists: () => [...postKeys.all, 'list'] as const,
  list: (filters?: Record<string, any>) => [...postKeys.lists(), filters] as const,
  details: () => [...postKeys.all, 'detail'] as const,
  detail: (id: number) => [...postKeys.details(), id] as const,
} as const;

/**
 * Helper function สำหรับ invalidate ทุก query ของ user
 */
export const invalidateUserQueries = (queryClient: any) => {
  return queryClient.invalidateQueries({ queryKey: userKeys.all });
};

/**
 * Helper function สำหรับ invalidate เฉพาะ user lists
 */
export const invalidateUserLists = (queryClient: any) => {
  return queryClient.invalidateQueries({ queryKey: userKeys.lists() });
};

/**
 * Helper function สำหรับ invalidate เฉพาะ user detail
 */
export const invalidateUserDetail = (queryClient: any, userId: number) => {
  return queryClient.invalidateQueries({ queryKey: userKeys.detail(userId) });
};

// Type definitions สำหรับ TypeScript
export type UserQueryKey = ReturnType<typeof userKeys[keyof typeof userKeys]>;
export type PostQueryKey = ReturnType<typeof postKeys[keyof typeof postKeys]>;

// Export ทั้งหมดเพื่อความสะดวก
export const queryKeys = {
  users: userKeys,
  posts: postKeys,
} as const;
