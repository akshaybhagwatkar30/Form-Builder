# 🚀 Dynamic Form Builder

A **React-based dynamic form generator** that builds forms from a **JSON schema** using recursion. The form supports **text inputs, dropdowns, checkboxes**.

## ✨ Features
- 🔄 **Dynamic form rendering** based on JSON.
- ♻️ **Recursive component structure** for nested sections.
- 📩 **Real-time state updates** and form submission handling.
- ✅ **Basic validation** for required fields.
- 🎨 **Styled with Tailwind CSS** for a modern look.

---

## 📌 **Getting Started**
Follow these steps to set up and run the project.

### 1️⃣ **Install Dependencies**
npm create vite@latest

### 2️⃣ **Install and Configure Tailwind CSS**
npm install tailwindcss @tailwindcss/vite

### 3️⃣ **Edit tailwind.config.js**
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
})

### 4️⃣ **Import Tailwind CSS**
@import "tailwindcss"; -- index.css

### 4️⃣ **Run the Development Server**
npm run dev

### **Approach**
- The form fields are generated dynamically by iterating over a JSON schema.
- If a field contains nested fields (like "Education"), the function calls itself recursively.
- Used useState to store form data dynamically.
- Updates form data in real-time as users type.
- Required fields ensure inputs are not left empty.
- Checkboxes toggle between true/false.





