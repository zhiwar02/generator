import{D as o}from"./index.0c486574.js";const t=new o("PowerManagementSystem");t.version(1).stores({users:"++id, name, phone, amps"});const d=async s=>await t.users.add(s),c=async(s=0,e=30)=>await t.users.offset(s).limit(e).toArray(),u=async(s,e)=>await t.users.update(s,e),f=async s=>await t.users.delete(s),m=async(s=1,e=10,a="")=>{const n=(s-1)*e;return await t.users.orderBy("id").reverse().filter(r=>r.name.toLowerCase().includes(a.toLowerCase())||r.phone.includes(a)||r.amps.toString().includes(a)).offset(n).limit(e).toArray()};export{d as a,f as d,m as f,c as g,u};
