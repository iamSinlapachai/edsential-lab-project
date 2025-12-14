// components/Modal.js
import React, { FC, ReactNode } from 'react';
import styles from './Modal.module.css'; // สมมติว่ามีไฟล์ CSS สำหรับ styling

// 1. กำหนด Interface สำหรับ Props
interface ModalProps {
  // isOpen เป็น boolean (จริง/เท็จ)
  isOpen: boolean; 
  
  // onClose เป็นฟังก์ชันที่ไม่มี Argument และไม่คืนค่า (void)
  onClose: () => void; 
  
  // children เป็นเนื้อหาใดๆ ที่อยู่ระหว่างแท็ก Modal 
  children: ReactNode; 
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
  // ถ้า isOpen เป็น false ให้ return null คือไม่แสดงอะไรเลย
  if (!isOpen) {
    return null;
  }

  return (
    // Backdrop: พื้นหลังสีทึบ/โปร่งแสงที่อยู่เบื้องหลัง Modal
    <div className={styles.modalBackdrop} onClick={onClose}>
      {/* Modal Container: ส่วน Pop-up ที่มีเนื้อหาอยู่ตรงกลาง */}
      <div 
        className={styles.modalContent} 
        // สำคัญ: ป้องกันการคลิกที่เนื้อหา Modal แล้วไปสั่งปิด Modal (เนื่องจาก onClick={onClose} อยู่ที่ Backdrop)
        onClick={(e) => e.stopPropagation()} 
      >
        {/* ปุ่มปิด (X) ที่มุมบนขวา */}
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        
        {/* เนื้อหาหลักของ Modal */}
        {children}
      </div>
    </div>
  );
};

export default Modal;