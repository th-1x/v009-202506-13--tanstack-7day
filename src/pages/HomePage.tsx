import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div>
      <h1>🏠 หน้าแรก (Home Page)</h1>
      <p>ยินดีต้อนรับสู่ Workshop React Router + Zod + React Query + Mutations!</p>

      {/* Day 1 Summary */}
      <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        <h2>📚 Day 1: พื้นฐาน React Router</h2>
        <ul>
          <li>✅ Vite: เครื่องมือสร้างโปรเจกต์ React ที่เร็ว</li>
          <li>✅ React Router: การนำทางแบบ Client-side</li>
          <li>✅ createBrowserRouter: การตั้งค่า Router</li>
          <li>✅ Component พื้นฐาน: RouterProvider, Link, Outlet</li>
        </ul>
      </div>

      {/* Day 4 Summary */}
      <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#fff3cd', borderRadius: '8px' }}>
        <h2>💾 Day 4: การจัดการข้อมูลด้วย Mutations</h2>
        <ul>
          <li>✅ useMutation: Hook สำหรับการเปลี่ยนแปลงข้อมูลบนเซิร์ฟเวอร์</li>
          <li>✅ mutationFn: ฟังก์ชัน async สำหรับ POST, PUT, PATCH, DELETE</li>
          <li>✅ mutate vs mutateAsync: วิธีการเรียกใช้ mutation</li>
          <li>✅ Cache Invalidation: การอัปเดต cache หลัง mutation สำเร็จ</li>
          <li>✅ useQueryClient: การเข้าถึง queryClient instance</li>
          <li>✅ Form Handling: การจัดการฟอร์มและ validation</li>
        </ul>
        <div style={{ marginTop: '15px' }}>
          <Link
            to="/users"
            style={{
              display: 'inline-block',
              padding: '10px 20px',
              backgroundColor: '#ffc107',
              color: '#212529',
              textDecoration: 'none',
              borderRadius: '5px',
              fontWeight: 'bold',
              marginRight: '10px'
            }}
          >
            💾 ทดลอง Mutations
          </Link>
          <p style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
            คลิกเพื่อทดลองสร้างผู้ใช้ใหม่และดู cache invalidation!
          </p>
        </div>
      </div>

      {/* Day 3 Summary */}
      <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#e1f5fe', borderRadius: '8px' }}>
        <h2>⚡️ Day 3: ดึงข้อมูลจาก Server ด้วย React Query</h2>
        <ul>
          <li>✅ Server State vs Client State: ความแตกต่างและความสำคัญ</li>
          <li>✅ QueryClient และ QueryClientProvider: การตั้งค่าพื้นฐาน</li>
          <li>✅ useQuery: queryKey, queryFn, และ return values</li>
          <li>✅ Loading, Error, และ Success states</li>
          <li>✅ API Integration กับ JSONPlaceholder</li>
          <li>✅ Data Validation ด้วย Zod ใน Service Layer</li>
        </ul>
      </div>

      {/* Day 2 Summary */}
      <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#e8f5e8', borderRadius: '8px' }}>
        <h2>🔍 Day 2: DTO และการตรวจสอบข้อมูลด้วย Zod</h2>
        <ul>
          <li>✅ DTO คือ "สัญญาข้อมูล" ระหว่าง Frontend และ Backend</li>
          <li>✅ Zod: Schema validation ที่ใช้ได้ทั้งตอนพัฒนาและตอนรัน</li>
          <li>✅ z.infer: การสร้าง TypeScript type จาก Schema</li>
          <li>✅ .parse() vs .safeParse(): วิธีการ validate ข้อมูล</li>
          <li>✅ Error handling ที่ละเอียดและชัดเจน</li>
        </ul>
      </div>

      {/* Key Concepts */}
      <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px', border: '1px solid #dee2e6' }}>
        <h3>💡 แนวคิดสำคัญ</h3>
        <div style={{ display: 'grid', gap: '15px', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
          <div>
            <h4>🎯 DTO (Data Transfer Object)</h4>
            <p>รูปแบบการออกแบบ Object สำหรับส่งข้อมูล - เป็น "สัญญา" ระหว่าง Frontend และ Backend</p>
          </div>
          <div>
            <h4>🛡️ Runtime Validation</h4>
            <p>TypeScript types หายไปตอนคอมไพล์ แต่ Zod ช่วยตรวจสอบข้อมูลตอนรันจริง</p>
          </div>
          <div>
            <h4>⚡️ Server State Management</h4>
            <p>React Query จัดการ Server State ที่ซับซ้อน พร้อม caching, loading states, และ error handling</p>
          </div>
          <div>
            <h4>🔄 Query Key Strategy</h4>
            <p>Query Key เป็น unique identifier สำหรับแต่ละ query - เปลี่ยน key = เปลี่ยน query</p>
          </div>
          <div>
            <h4>💾 Mutations & Cache Invalidation</h4>
            <p>useMutation จัดการการเปลี่ยนแปลงข้อมูล พร้อม invalidateQueries เพื่ออัปเดต UI อัตโนมัติ</p>
          </div>
          <div>
            <h4>📝 Form State Management</h4>
            <p>การจัดการ form state ร่วมกับ mutation states เพื่อ UX ที่ดี</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
