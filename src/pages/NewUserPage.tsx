// 🚀 Day 6: Advanced Form Handling with React Router Actions
import React from 'react';
import { Form, useActionData, Link, useNavigation } from 'react-router-dom';
import type { ActionData } from './actions';

const NewUserPage: React.FC = () => {
  const actionData = useActionData() as ActionData;
  const navigation = useNavigation();
  
  // Check if form is being submitted
  const isSubmitting = navigation.state === 'submitting';
  
  console.log('🔍 NewUserPage Debug:', {
    actionData,
    navigationState: navigation.state,
    isSubmitting
  });

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <Link to="/users" style={{ color: '#007bff', textDecoration: 'none' }}>
          ← กลับไปหน้ารายชื่อผู้ใช้
        </Link>
      </div>

      <h1>➕ สร้างผู้ใช้ใหม่ - Day 6</h1>
      <p>ฟอร์มขั้นสูงด้วย React Router Actions และ Zod Validation</p>

      {/* Day 6 Info */}
      <div style={{ 
        marginBottom: '30px', 
        padding: '15px', 
        backgroundColor: '#f0f8ff', 
        borderRadius: '8px',
        border: '1px solid #b3d9ff'
      }}>
        <h3>📝 Day 6: React Router Actions + Zod</h3>
        <p><strong>เปิด DevTools (F12)</strong> เพื่อดู:</p>
        <ul>
          <li>✅ Action function logs: "🎯 Action: createUser triggered"</li>
          <li>✅ Form data processing และ validation</li>
          <li>✅ Progressive Enhancement pattern</li>
          <li>✅ Server-side validation กับ client-side UX</li>
        </ul>
        <p style={{ fontSize: '14px', color: '#666', marginTop: '10px' }}>
          💡 ฟอร์มนี้ทำงานได้แม้ JavaScript ปิด (Progressive Enhancement)!
        </p>
      </div>

      {/* Server Error Display */}
      {actionData?.errors?._server && (
        <div style={{ 
          marginBottom: '20px',
          padding: '15px', 
          backgroundColor: '#f8d7da', 
          color: '#721c24', 
          borderRadius: '8px',
          border: '1px solid #f5c6cb'
        }}>
          <h4>❌ เกิดข้อผิดพลาดจากเซิร์ฟเวอร์</h4>
          {actionData.errors._server.map((error, index) => (
            <p key={index} style={{ margin: '5px 0' }}>{error}</p>
          ))}
        </div>
      )}

      {/* Form */}
      <Form 
        method="post" 
        style={{ 
          maxWidth: '600px',
          padding: '20px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          border: '1px solid #dee2e6'
        }}
      >
        <div style={{ display: 'grid', gap: '20px' }}>
          {/* Basic Information */}
          <fieldset style={{ border: '1px solid #ced4da', borderRadius: '4px', padding: '15px' }}>
            <legend style={{ fontWeight: 'bold', color: '#495057' }}>ข้อมูลพื้นฐาน</legend>
            
            <div style={{ marginBottom: '15px' }}>
              <label htmlFor="name" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                ชื่อ *
              </label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                required
                defaultValue={actionData?.formData?.name || ''}
                disabled={isSubmitting}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: actionData?.errors?.name ? '2px solid #dc3545' : '1px solid #ced4da',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}
                placeholder="เช่น John Doe"
              />
              {actionData?.errors?.name && (
                <p style={{ color: '#dc3545', fontSize: '12px', margin: '5px 0 0 0' }}>
                  {actionData.errors.name[0]}
                </p>
              )}
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label htmlFor="username" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Username *
              </label>
              <input 
                type="text" 
                id="username" 
                name="username" 
                required
                defaultValue={actionData?.formData?.username || ''}
                disabled={isSubmitting}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: actionData?.errors?.username ? '2px solid #dc3545' : '1px solid #ced4da',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}
                placeholder="เช่น johndoe"
              />
              {actionData?.errors?.username && (
                <p style={{ color: '#dc3545', fontSize: '12px', margin: '5px 0 0 0' }}>
                  {actionData.errors.username[0]}
                </p>
              )}
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label htmlFor="email" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                อีเมล *
              </label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                required
                defaultValue={actionData?.formData?.email || ''}
                disabled={isSubmitting}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: actionData?.errors?.email ? '2px solid #dc3545' : '1px solid #ced4da',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}
                placeholder="เช่น john@example.com"
              />
              {actionData?.errors?.email && (
                <p style={{ color: '#dc3545', fontSize: '12px', margin: '5px 0 0 0' }}>
                  {actionData.errors.email[0]}
                </p>
              )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div>
                <label htmlFor="phone" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  เบอร์โทร
                </label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  defaultValue={actionData?.formData?.phone || '02-xxx-xxxx'}
                  disabled={isSubmitting}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #ced4da',
                    borderRadius: '4px',
                    fontSize: '14px'
                  }}
                />
              </div>
              
              <div>
                <label htmlFor="website" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  เว็บไซต์
                </label>
                <input 
                  type="text" 
                  id="website" 
                  name="website" 
                  defaultValue={actionData?.formData?.website || 'example.com'}
                  disabled={isSubmitting}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #ced4da',
                    borderRadius: '4px',
                    fontSize: '14px'
                  }}
                />
              </div>
            </div>
          </fieldset>

          {/* Address Information */}
          <fieldset style={{ border: '1px solid #ced4da', borderRadius: '4px', padding: '15px' }}>
            <legend style={{ fontWeight: 'bold', color: '#495057' }}>ที่อยู่</legend>
            
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '15px', marginBottom: '15px' }}>
              <div>
                <label htmlFor="address.street" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  ถนน
                </label>
                <input 
                  type="text" 
                  id="address.street" 
                  name="address.street" 
                  defaultValue={actionData?.formData?.['address.street'] || '123 Main St'}
                  disabled={isSubmitting}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #ced4da',
                    borderRadius: '4px',
                    fontSize: '14px'
                  }}
                />
              </div>
              
              <div>
                <label htmlFor="address.suite" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  ห้อง/อาคาร
                </label>
                <input 
                  type="text" 
                  id="address.suite" 
                  name="address.suite" 
                  defaultValue={actionData?.formData?.['address.suite'] || 'Apt. 1'}
                  disabled={isSubmitting}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #ced4da',
                    borderRadius: '4px',
                    fontSize: '14px'
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '15px' }}>
              <div>
                <label htmlFor="address.city" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  เมือง
                </label>
                <input 
                  type="text" 
                  id="address.city" 
                  name="address.city" 
                  defaultValue={actionData?.formData?.['address.city'] || 'Bangkok'}
                  disabled={isSubmitting}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #ced4da',
                    borderRadius: '4px',
                    fontSize: '14px'
                  }}
                />
              </div>
              
              <div>
                <label htmlFor="address.zipcode" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  รหัสไปรษณีย์
                </label>
                <input 
                  type="text" 
                  id="address.zipcode" 
                  name="address.zipcode" 
                  defaultValue={actionData?.formData?.['address.zipcode'] || '10110'}
                  disabled={isSubmitting}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #ced4da',
                    borderRadius: '4px',
                    fontSize: '14px'
                  }}
                />
              </div>
            </div>

            {/* Hidden geo coordinates */}
            <input type="hidden" name="address.geo.lat" value="13.7563" />
            <input type="hidden" name="address.geo.lng" value="100.5018" />
          </fieldset>

          {/* Company Information */}
          <fieldset style={{ border: '1px solid #ced4da', borderRadius: '4px', padding: '15px' }}>
            <legend style={{ fontWeight: 'bold', color: '#495057' }}>บริษัท</legend>
            
            <div style={{ marginBottom: '15px' }}>
              <label htmlFor="company.name" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                ชื่อบริษัท
              </label>
              <input 
                type="text" 
                id="company.name" 
                name="company.name" 
                defaultValue={actionData?.formData?.['company.name'] || 'Example Company'}
                disabled={isSubmitting}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #ced4da',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label htmlFor="company.catchPhrase" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                สโลแกน
              </label>
              <input 
                type="text" 
                id="company.catchPhrase" 
                name="company.catchPhrase" 
                defaultValue={actionData?.formData?.['company.catchPhrase'] || 'Innovation at its best'}
                disabled={isSubmitting}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #ced4da',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}
              />
            </div>

            <div>
              <label htmlFor="company.bs" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                ธุรกิจ
              </label>
              <input 
                type="text" 
                id="company.bs" 
                name="company.bs" 
                defaultValue={actionData?.formData?.['company.bs'] || 'synergistic solutions'}
                disabled={isSubmitting}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #ced4da',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}
              />
            </div>
          </fieldset>

          {/* Submit Buttons */}
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <Link 
              to="/users"
              style={{
                padding: '10px 20px',
                backgroundColor: '#6c757d',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '4px',
                fontSize: '16px'
              }}
            >
              ยกเลิก
            </Link>
            
            <button 
              type="submit" 
              disabled={isSubmitting}
              style={{
                padding: '10px 20px',
                backgroundColor: isSubmitting ? '#6c757d' : '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: isSubmitting ? 'not-allowed' : 'pointer'
              }}
            >
              {isSubmitting ? '🔄 กำลังบันทึก...' : '💾 บันทึก'}
            </button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default NewUserPage;
