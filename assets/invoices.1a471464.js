import{D as v}from"./index.0c486574.js";const t=new v("PowerManagementSystem");t.version(1).stores({users:"++id, name,amps",invoices:"++id, user_id,price, date",settings:"key, value"});const p=async e=>await t.invoices.add(e),w=async(e,n)=>await t.invoices.update(e,n),f=async e=>await t.invoices.delete(e),y=async()=>{const e=await t.invoices.toArray(),n=await t.users.toArray(),r=Object.fromEntries(n.map(a=>[a.id,a]));return e.map(a=>({...a,user:r[a.user_id]}))},g=async(e=1,n=100,r={month:null,year:null,invoice_user:""})=>{const a=(e-1)*n,u=await t.invoices.orderBy("id").reverse().filter(s=>{let i=!0;if(r.month!==null){const c=new Date(s.date).getMonth()+1;i=i&&c===r.month}if(r.year!==null){const c=new Date(s.date).getFullYear();i=i&&c===r.year}return r.invoice_user&&(i=i&&s.user_id===r.invoice_user),i}).offset(a).limit(n).toArray(),d=await t.users.toArray(),l=Object.fromEntries(d.map(s=>[s.id,s]));return u.map(s=>({...s,user:l[s.user_id]}))};let o=null;const h=async e=>{if(typeof e!="number"||e<0)throw new Error("Price must be a positive number");try{await t.settings.put({key:"price",value:e}),o=e}catch(n){throw console.error("Failed to save price:",n),new Error("Could not save price")}},b=async()=>{if(o!==null)return o;const e=await t.settings.get("price");return o=e?e.value:0,o};export{p as a,y as b,f as d,g as f,b as g,h as s,w as u};