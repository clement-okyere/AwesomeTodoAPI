import request from "supertest";
import server from "../../../index";
import Todo from "../../models/todo";

describe('/api/todos', () => {
    beforeEach(() => {

    })

    afterEach(async () => {
        server.close();
        await Todo.remove({});
    })

      describe("GET/", () => {
            it('should return all todos', async () => {
                const res = await request(server).get("/api/todos");
                expect(res.status).toBe(200);
                //expect(res.text).toBe("todo list");
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
    
    describe('PUT/', () => {

       it('should not find deleted todo after delete', async () => {
            const todo = new Todo({
                name: 'newTodo',
                completed: false,
            });
           
           await todo.save();

           const res = await request(server)
               .put(`/api/todos/${todo._id}/complete`)
               .send(todo);
           
           //check update updated todo complete status
           const updatedTodo = await Todo.findById(todo._id);
           expect(updatedTodo?.completed).toBe(true);
       });
   });
})
