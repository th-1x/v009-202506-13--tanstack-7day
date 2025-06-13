import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div>
      <h1>🏠 หน้าแรก (Home Page)</h1>
      <p>ยินดีต้อนรับสู่ Workshop React Router + Zod + React Query + Mutations + Loaders + Actions + Best Practices!</p>

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

      {/* Day 7 Summary */}
      <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
        <h2>✨ Day 7: Best Practices และการ Refactor</h2>
        <ul>
          <li>✅ Query Key Factories: แก้ปัญหา "Magic Strings" ด้วย Autocomplete</li>
          <li>✅ Custom Hooks: ห่อหุ้ม React Query logic ให้ใช้งานง่าย</li>
          <li>✅ API Service Layer: จัดระเบียบการสื่อสารกับ API</li>
          <li>✅ Component Refactoring: โค้ดสะอาดและนำกลับมาใช้ได้</li>
          <li>✅ Error Handling Strategy: จัดการ error อย่างเป็นระบบ</li>
          <li>✅ Production-Ready Structure: โครงสร้างพร้อมใช้งานจริง</li>
        </ul>
        <div style={{ marginTop: '15px' }}>
          <Link
            to="/users"
            style={{
              display: 'inline-block',
              padding: '10px 20px',
              backgroundColor: '#28a745',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '5px',
              fontWeight: 'bold',
              marginRight: '10px'
            }}
          >
            ✨ ดูโค้ดที่ Refactor แล้ว
          </Link>
          <p style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
            คลิกเพื่อดูโค้ดที่สะอาดและเป็นระเบียบแล้ว!
          </p>
        </div>
      </div>

      {/* Day 6 Summary */}
      <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#f0f8ff', borderRadius: '8px' }}>
        <h2>📝 Day 6: จัดการฟอร์มขั้นสูงด้วย Actions และ Zod</h2>
        <ul>
          <li>✅ action Function: จัดการการเปลี่ยนแปลงข้อมูลหลัง form submit</li>
          <li>✅ &lt;Form&gt; Component: Progressive Enhancement pattern</li>
          <li>✅ request.formData(): เข้าถึงข้อมูลฟอร์มใน action</li>
          <li>✅ Server-side Validation: Zod validation ใน action</li>
          <li>✅ useActionData: รับ error และข้อมูลกลับจาก action</li>
          <li>✅ useNavigation: ตรวจสอบสถานะการ submit</li>
        </ul>
        <div style={{ marginTop: '15px' }}>
          <Link
            to="/users/new"
            style={{
              display: 'inline-block',
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '5px',
              fontWeight: 'bold',
              marginRight: '10px'
            }}
          >
            📝 ทดลอง Advanced Form
          </Link>
          <p style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
            คลิกเพื่อทดลองฟอร์มขั้นสูงด้วย Actions และ Zod validation!
          </p>
        </div>
      </div>

      {/* Day 5 Summary */}
      <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#e8f5e8', borderRadius: '8px' }}>
        <h2>🔗 Day 5: ผสาน React Router Loaders กับ React Query</h2>
        <ul>
          <li>✅ Render-as-You-Fetch vs Fetch-on-Render: ปรับปรุง UX</li>
          <li>✅ loader function: ฟังก์ชัน async ที่ผูกกับ Route</li>
          <li>✅ queryClient.ensureQueryData: เมธอดมหัศจรรย์สำหรับ cache</li>
          <li>✅ useLoaderData: Hook เข้าถึงข้อมูลจาก loader</li>
          <li>✅ กำจัด Loading states ใน Component</li>
          <li>✅ Navigation ที่เร็วขึ้นด้วย pre-loading</li>
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
          <div>
            <h4>🔗 Router Loaders Integration</h4>
            <p>ผสาน React Router loaders กับ React Query เพื่อ pre-loading และ UX ที่ดีขึ้น</p>
          </div>
          <div>
            <h4>⚡️ Render-as-You-Fetch</h4>
            <p>Pattern ใหม่ที่โหลดข้อมูลก่อนที่ component จะ render เพื่อลด loading states</p>
          </div>
          <div>
            <h4>📝 Progressive Enhancement</h4>
            <p>ฟอร์มที่ทำงานได้แม้ JavaScript ปิด แต่ดีขึ้นเมื่อ JavaScript เปิด</p>
          </div>
          <div>
            <h4>🎯 Server-side Actions</h4>
            <p>จัดการ form submission และ validation ฝั่งเซิร์ฟเวอร์ด้วย React Router Actions</p>
          </div>
          <div>
            <h4>🏭 Query Key Factories</h4>
            <p>แก้ปัญหา Magic Strings ด้วยการสร้าง Factory functions สำหรับ query keys</p>
          </div>
          <div>
            <h4>🎣 Custom Hooks</h4>
            <p>ห่อหุ้ม React Query logic ให้ใช้งานง่าย นำกลับมาใช้ได้ และทดสอบได้</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
