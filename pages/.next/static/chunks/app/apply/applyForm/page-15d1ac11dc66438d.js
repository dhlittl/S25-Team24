(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[20],{25177:(e,t,a)=>{Promise.resolve().then(a.bind(a,5502))},5502:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>i});var s=a(95155),m=a(12115);function i(){let[e,t]=(0,m.useState)({firstName:"",lastName:"",email:"",phone:""}),[a,i]=(0,m.useState)({}),l=()=>{let t={};return e.firstName.trim()||(t.firstName="First name is required."),e.lastName.trim()||(t.lastName="Last name is required."),e.email.trim()&&/\S+@\S+\.\S+/.test(e.email)||(t.email="Valid email is required."),e.phone.trim()&&/^\d{10}$/.test(e.phone)||(t.phone="Valid phone number is required."),i(t),0===Object.keys(t).length},r=a=>{t({...e,[a.target.name]:a.target.value})};return(0,s.jsxs)("div",{className:"max-w-md mx-auto bg-white p-6 shadow-md rounded-lg",children:[(0,s.jsx)("h2",{className:"text-xl font-semibold mb-4",children:"Application Form"}),(0,s.jsxs)("form",{onSubmit:t=>{t.PreventDefault(),l()&&console.log("Form submitted.",e)},className:"space-y-4",children:[["firstName","lastName","email","phone"].map(t=>(0,s.jsxs)("div",{children:[(0,s.jsx)("label",{className:"block text-sm font-medium capitalize",children:t.replace(/([A-Z])/g," $1")}),(0,s.jsx)("input",{type:"email"===t?"email":"text",name:t,value:e[t],onChange:r,className:"mt-1 p-2 w-full border rounded-md"}),a[t]&&(0,s.jsx)("p",{className:"text-red-500 text-sm",children:a[t]})]},t)),(0,s.jsx)("button",{type:"submit",className:"bg-blue-500 text-white px-4 py-2 rounded-md",children:"Submit"})]})]})}}},e=>{var t=t=>e(e.s=t);e.O(0,[441,517,358],()=>t(25177)),_N_E=e.O()}]);