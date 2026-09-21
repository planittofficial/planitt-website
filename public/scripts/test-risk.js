async function test() {
  const baseUrl = 'http://localhost:3000/api/wealth-advisory/chat';
  
  let state = {
    name: "Shivam",
    profession: "Doctor",
    durationYears: 10,
    investmentMode: "sip",
    fundCount: 3
  };
  
  console.log("\n--- Moderate Risk (Default for Doctor) ---");
  const res1 = await fetch(baseUrl, { method: 'POST', body: JSON.stringify({ message: "Recommend funds", state }), headers: { 'Content-Type': 'application/json' } });
  const data1 = await res1.json();
  console.log(data1.reply);

  console.log("\n--- Low Risk (Specified) ---");
  const res2 = await fetch(baseUrl, { method: 'POST', body: JSON.stringify({ message: "Filter funds for low risk", state }), headers: { 'Content-Type': 'application/json' } });
  const data2 = await res2.json();
  console.log(data2.reply);
}
test();
