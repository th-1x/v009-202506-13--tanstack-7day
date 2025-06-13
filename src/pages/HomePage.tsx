import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div>
      <h1>🏠 หน้าแรก (Home Page)</h1>
      <p>ยินดีต้อนรับสู่ Workshop React Router + Zod!</p>

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
              fontWeight: 'bold'
            }}
          >
            🧪 ทดลอง Zod Validation
          </Link>
          <p style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
            คลิกเพื่อไปหน้า Users และเปิด DevTools (F12) เพื่อดูผลลัพธ์การ validate!
          </p>
        </div>
      </div>

      {/* Key Concepts */}
      <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#fff3cd', borderRadius: '8px', border: '1px solid #ffeaa7' }}>
        <h3>💡 แนวคิดสำคัญ</h3>
        <div style={{ display: 'grid', gap: '15px', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          <div>
            <h4>🎯 DTO (Data Transfer Object)</h4>
            <p>รูปแบบการออกแบบ Object สำหรับส่งข้อมูล - เป็น "สัญญา" ระหว่าง Frontend และ Backend</p>
          </div>
          <div>
            <h4>🛡️ Runtime Validation</h4>
            <p>TypeScript types หายไปตอนคอมไพล์ แต่ Zod ช่วยตรวจสอบข้อมูลตอนรันจริง</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
