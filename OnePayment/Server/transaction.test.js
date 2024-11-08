// transaction.test.js
const request = require("supertest");
const app = require("./server");

describe("POST /auth/transaction", () => {
  test("ควร return 201 และ response ที่ถูกต้องเมื่อข้อมูลถูกต้อง", async () => {
    const response = await request(app).post("/auth/transaction").send({
      bank_id: 123,
      divided: 3,
      amount: 500.0,
      timestamp: new Date().toISOString(),
    });

    expect(response.statusCode).toBe(201); // ตรวจสอบว่าการตอบสนอง HTTP Status Code เป็น 200
    expect(response.body).toHaveProperty("success", true); // ตรวจสอบว่าผลตอบสนองมีคีย์ 'success' ที่เป็น true
    expect(response.body).toHaveProperty("data"); // ตรวจสอบว่าผลตอบสนองมีคีย์ 'data'
  });

  test("ควร return 400 เมื่อ parameter bank_id ไม่ได้ส่งไป", async () => {
    const response = await request(app).post("/auth/transaction").send({
      divided: 3,
      amount: 500.0,
      timestamp: new Date().toISOString(),
    });

    expect(response.statusCode).toBe(400); // ตรวจสอบว่าการตอบสนอง HTTP Status Code เป็น 400
    expect(response.body).toHaveProperty("error"); // ตรวจสอบว่าผลตอบสนองมีคีย์ 'error'
  });

  test("ควร return 400 เมื่อ amount มีค่าเป็นลบ", async () => {
    const response = await request(app).post("/auth/transaction").send({
      bank_id: 123,
      divided: 3,
      amount: -500.0,
      timestamp: new Date().toISOString(),
    });

    expect(response.statusCode).toBe(400); // ตรวจสอบว่าการตอบสนอง HTTP Status Code เป็น 400
    expect(response.body).toHaveProperty("error"); // ตรวจสอบว่าผลตอบสนองมีคีย์ 'error'
  });

  test("ควร return 400 เมื่อ divided มีค่าที่ไม่ใช่ตัวเลข", async () => {
    const response = await request(app).post("/auth/transaction").send({
      bank_id: 123,
      divided: "invalid",
      amount: 500.0,
      timestamp: new Date().toISOString(),
    });

    expect(response.statusCode).toBe(400); // ตรวจสอบว่าการตอบสนอง HTTP Status Code เป็น 400
    expect(response.body).toHaveProperty("error"); // ตรวจสอบว่าผลตอบสนองมีคีย์ 'error'
  });
});

describe("GET /auth/showlogs", () => {
  test("ควร return 200 และ response ที่ถูกต้องเมื่อข้อมูลถูกต้อง", async () => {
    const response = await request(app).get("/auth/showlogs").send();

    expect(response.statusCode).toBe(200); // ตรวจสอบว่าการตอบสนอง HTTP Status Code เป็น 200
    expect(response.body).toHaveProperty("success", true); // ตรวจสอบว่าผลตอบสนองมีคีย์ 'success' ที่เป็น true
  });
});
