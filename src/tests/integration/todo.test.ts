import request from "supertest";
import server from "../../../index";

describe('/api/todos', () => {
    beforeEach(() => {

    })

    afterEach(() => {
        server.close();
    })

      describe("GET/", () => {
            it('should return all todos', async () => {
                const res = await request(server).get("/api/todos");
                expect(res.status).toBe(200);
                expect(res.text).toBe("todo list");
            });
        });

        describe('POST/', () => {
            it('should save the todo if it is valid', async () => {
                const todo = {
                    name: "tests",
                    completed: false
               }

                const res = await request(server)
                    .post('/api/todos')
                    .send(todo);
                const { name } = res.body;
                expect(res.status).toBe(200);
                expect(name).toBe('tests');
            });
        });
})
