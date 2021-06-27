export interface TodoDoc extends Document {
    name: string,
    completed: boolean
}

export interface UserDoc extends Document {
    firstname: string,
    lastname: string,
    email: string,
    password: string
}