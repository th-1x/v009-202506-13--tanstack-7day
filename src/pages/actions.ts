// 🚀 Day 6: React Router Actions กับ Zod Validation
import { QueryClient } from '@tanstack/react-query';
import { redirect } from 'react-router-dom';
import { createUser } from '../services/api';
import { createUserSchema } from '../schemas/user.schema';

// Factory function เพื่อความสะดวกในการส่ง queryClient เข้าไป
export const createActions = (queryClient: QueryClient) => ({
  // Action สำหรับสร้าง User ใหม่
  createUser: async ({ request }: { request: Request }) => {
    console.log('🎯 Action: createUser triggered');
    
    try {
      // ดึงข้อมูลจาก FormData
      const formData = await request.formData();
      const data = Object.fromEntries(formData);
      
      console.log('📝 Form data received:', data);
      
      // แปลง nested object สำหรับ address
      const processedData = {
        name: data.name as string,
        username: data.username as string,
        email: data.email as string,
        phone: data.phone as string,
        website: data.website as string,
        address: {
          street: data['address.street'] as string,
          suite: data['address.suite'] as string,
          city: data['address.city'] as string,
          zipcode: data['address.zipcode'] as string,
          geo: {
            lat: data['address.geo.lat'] as string,
            lng: data['address.geo.lng'] as string,
          }
        },
        company: {
          name: data['company.name'] as string,
          catchPhrase: data['company.catchPhrase'] as string,
          bs: data['company.bs'] as string,
        }
      };
      
      console.log('🔄 Processing data for validation:', processedData);
      
      // ใช้ Zod เพื่อ validate ข้อมูล
      const result = createUserSchema.safeParse(processedData);
      
      if (!result.success) {
        console.error('❌ Validation failed:', result.error);
        // ถ้าข้อมูลไม่ถูกต้อง ส่ง error กลับไป
        return { 
          errors: result.error.flatten().fieldErrors,
          formData: data // ส่งข้อมูลกลับไปเพื่อให้ฟอร์มไม่ต้องกรอกใหม่
        };
      }
      
      console.log('✅ Validation successful, creating user...');
      
      // เรียก API เพื่อสร้าง user
      const newUser = await createUser(result.data);
      console.log('✅ User created successfully:', newUser);
      
      // ทำให้ query list เก่าลงและโหลดใหม่
      await queryClient.invalidateQueries({ queryKey: ['users'] });
      console.log('🔄 Cache invalidated');
      
      // Redirect กลับไปหน้า users list
      return redirect('/users');
      
    } catch (error) {
      console.error('❌ Server error:', error);
      return { 
        errors: { 
          _server: ['Failed to create user. Please try again.'] 
        } 
      };
    }
  },

  // Action สำหรับอัปเดต User (เพิ่มเติมในอนาคต)
  updateUser: async ({ request, params }: { request: Request; params: any }) => {
    console.log('🎯 Action: updateUser triggered for user', params.userId);
    
    // TODO: Implement update logic
    return { message: 'Update functionality coming soon!' };
  },

  // Action สำหรับลบ User (เพิ่มเติมในอนาคต)
  deleteUser: async ({ params }: { params: any }) => {
    console.log('🎯 Action: deleteUser triggered for user', params.userId);
    
    // TODO: Implement delete logic
    return { message: 'Delete functionality coming soon!' };
  },
});

// Type definitions for better TypeScript support
export type ActionData = {
  errors?: Record<string, string[]>;
  formData?: Record<string, any>;
  message?: string;
};

// Helper function to create typed actions
export const createTypedActions = (queryClient: QueryClient) => {
  const actions = createActions(queryClient);
  
  return {
    ...actions,
    // Add any additional typed helpers here
  };
};
