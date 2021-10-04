import  mongoose from "mongoose";
const Schema = mongoose.Schema;   //alias for mongoose Schema

const GameSchema = new Schema
({
    name: String,
    genre: String,
    developer: String,
    cost: Number
},
{
    collection: "games"
}
);

const Model = mongoose.model("Game", GameSchema);
export default Model;