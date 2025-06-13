import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { userSchema, simpleUserSchema, safeValidateUser, safeValidateSimpleUser } from '../schemas/user.schema';

// Mock data สำหรับ users (แบบง่าย)
const mockUsers = [
  { id: 1, name: 'สมชาย ใจดี', email: 'somchai@example.com', role: 'Admin' },
  { id: 2, name: 'สมหญิง รักเรียน', email: 'somying@example.com', role: 'User' },
  { id: 3, name: 'วิชัย ขยันทำงาน', email: 'wichai@example.com', role: 'Manager' },
  { id: 4, name: 'มาลี สวยงาม', email: 'malee@example.com', role: 'User' },
  { id: 5, name: 'ประยุทธ์ เก่งมาก', email: 'prayuth@example.com', role: 'Developer' },
];

// ข้อมูลจำลองที่ถูกต้อง (ตาม JSONPlaceholder format)
const mockValidUser = {
  id: 1,
  name: "Leanne Graham",
  username: "Bret",
  email: "Sincere@april.biz",
  address: {
    street: "Kulas Light",
    suite: "Apt. 556",
    city: "Gwenborough",
    zipcode: "92998-3874",
    geo: {
      lat: "-37.3159",
      lng: "81.1496"
    }
  },
  phone: "1-770-736-8031 x56442",
  website: "https://hildegard.org",
  company: {
    name: "Romaguera-Crona",
    catchPhrase: "Multi-layered client-server neural-net",
    bs: "harness real-time e-markets"
  }
};

// ข้อมูลจำลองที่ผิด (email ไม่ถูกต้อง)
const mockInvalidUser = { ...mockValidUser, email: "not-an-email" };

// ข้อมูลจำลองแบบง่ายที่ถูกต้อง
const mockValidSimpleUser = {
  id: 1,
  name: "สมชาย ใจดี",
  email: "somchai@example.com",
  role: "Admin"
};

// ข้อมูลจำลองแบบง่ายที่ผิด (id เป็น string)
const mockInvalidSimpleUser = { ...mockValidSimpleUser, id: "1" };

const UsersPage: React.FC = () => {
  // ทดลอง Zod Validation เมื่อ component โหลด
  useEffect(() => {
    console.log('🚀 === Day 2: DTO และการตรวจสอบข้อมูลด้วย Zod ===');

    // === ทดลอง 1: Full User Schema (JSONPlaceholder format) ===
    console.log('\n📋 ทดลองที่ 1: Full User Schema');

    // ทดลอง parse ข้อมูลที่ถูกต้อง
    try {
      const parsedUser = userSchema.parse(mockValidUser);
      console.log("✅ Full User Validation successful:", parsedUser);
    } catch (error) {
      console.error("❌ Full User Validation failed:", error);
    }

    // ทดลอง parse ข้อมูลที่ผิด
    try {
      userSchema.parse(mockInvalidUser);
    } catch (error) {
      console.error("❌ Full User Validation failed as expected (invalid email):", error);
    }

    // === ทดลอง 2: Simple User Schema ===
    console.log('\n📋 ทดลองที่ 2: Simple User Schema');

    // ทดลอง safeParse กับข้อมูลที่ถูกต้อง
    const validResult = safeValidateSimpleUser(mockValidSimpleUser);
    if (validResult.success) {
      console.log("✅ Simple User Validation successful:", validResult.data);
    } else {
      console.error("❌ Simple User Validation failed:", validResult.error);
    }

    // ทดลอง safeParse กับข้อมูลที่ผิด
    const invalidResult = safeValidateSimpleUser(mockInvalidSimpleUser);
    if (invalidResult.success) {
      console.log("✅ Simple User Validation successful:", invalidResult.data);
    } else {
      console.error("❌ Simple User Validation failed as expected (id should be number):", invalidResult.error.issues);
    }

    // === ทดลอง 3: Validate Mock Users ===
    console.log('\n📋 ทดลองที่ 3: Validate Mock Users');
    mockUsers.forEach((user, index) => {
      const result = safeValidateSimpleUser(user);
      if (result.success) {
        console.log(`✅ User ${index + 1} (${user.name}) validation successful`);
      } else {
        console.error(`❌ User ${index + 1} (${user.name}) validation failed:`, result.error.issues);
      }
    });

    console.log('\n🎉 เปิด DevTools (F12) เพื่อดูผลลัพธ์การ validate!');
  }, []);

  return (
    <div>
      <h1>👥 รายชื่อผู้ใช้ (Users Page) - Day 2</h1>
      <p>รายการผู้ใช้ทั้งหมดในระบบ + ทดลอง Zod Validation</p>

      <div style={{
        marginBottom: '20px',
        padding: '15px',
        backgroundColor: '#e3f2fd',
        borderRadius: '8px',
        border: '1px solid #2196f3'
      }}>
        <h3>🔍 Day 2: DTO และ Zod Validation</h3>
        <p><strong>เปิด DevTools (F12)</strong> และดูที่ Console เพื่อดูผลลัพธ์การ validate ข้อมูล!</p>
        <ul>
          <li>✅ ทดลอง Full User Schema (JSONPlaceholder format)</li>
          <li>✅ ทดลอง Simple User Schema</li>
          <li>✅ ทดลอง .parse() vs .safeParse()</li>
          <li>✅ ดู Error messages ที่ละเอียด</li>
        </ul>
      </div>
      
      <div style={{ marginTop: '20px' }}>
        <div style={{ display: 'grid', gap: '15px' }}>
          {mockUsers.map(user => (
            <div 
              key={user.id} 
              style={{ 
                padding: '15px', 
                border: '1px solid #ddd', 
                borderRadius: '8px',
                backgroundColor: '#f9f9f9'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ margin: '0 0 5px 0' }}>{user.name}</h3>
                  <p style={{ margin: '0 0 5px 0', color: '#666' }}>{user.email}</p>
                  <span 
                    style={{ 
                      padding: '2px 8px', 
                      backgroundColor: '#007bff', 
                      color: 'white', 
                      borderRadius: '4px', 
                      fontSize: '12px' 
                    }}
                  >
                    {user.role}
                  </span>
                </div>
                <Link 
                  to={`/users/${user.id}`}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#28a745',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '4px',
                    fontSize: '14px'
                  }}
                >
                  ดูรายละเอียด
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
